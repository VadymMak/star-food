#!/usr/bin/env python3
import json
import sys
import os
from datetime import datetime, timezone
try:
    import pandas as pd
except ImportError:
    print("pip install pandas openpyxl")
    sys.exit(1)


def parse_price(val):
    if val is None or str(val).strip() in ("—", "", "nan", "On request"):
        return None
    s = str(val).replace("€", "").replace(",", ".").strip()
    try:
        return float(s)
    except:
        return None


def parse_volume(val):
    if val is None or str(val).strip() in ("—", "", "nan"):
        return None
    try:
        v = float(val)
        return f"{v:g}L"
    except:
        return None


SKIP_NAMES = {"nan", "Names", "Available vegetable oils",
              "Product Name and Types", "Other Products"}
SKIP_TYPES = {"nan", "Types", "Product Name and Types"}


def build_prices(xlsx_path):
    xl = pd.read_excel(xlsx_path, sheet_name=None, header=None)
    prices = {"updatedAt": datetime.now(timezone.utc).strftime(
        "%Y-%m-%d"), "oils": {}, "condiments": {}}

    # Sheet 1
    current_product = current_type = None
    current_pkg = "PET Bottle"
    for _, row in xl["Vegetable oils"].iterrows():
        raw_name = str(row[1]).strip() if pd.notna(row[1]) else "nan"
        raw_type = str(row[2]).strip() if pd.notna(row[2]) else "nan"
        raw_pkg = str(row[3]).strip() if pd.notna(row[3]) else "nan"
        vol = row[4]
        price = parse_price(row[6])
        if raw_name not in SKIP_NAMES:
            current_product = raw_name
            if current_product not in prices["oils"]:
                prices["oils"][current_product] = []
        if raw_type not in SKIP_TYPES:
            current_type = raw_type
        if raw_pkg not in ("nan", "Bulk in a tanker", "Type"):
            current_pkg = raw_pkg
        if not current_product or raw_pkg == "Bulk in a tanker":
            continue
        vol_str = parse_volume(vol)
        if not vol_str:
            continue
        prices["oils"][current_product].append(
            {"volume": vol_str, "packaging": current_pkg, "type": current_type, "price": price})

    # Sheet 2
    current_product = current_type = None
    for _, row in xl["Other Products"].iterrows():
        raw_name = str(row[1]).strip() if pd.notna(row[1]) else "nan"
        raw_type = str(row[2]).strip() if pd.notna(row[2]) else "nan"
        weight = row[5]
        vol = row[4]
        price = parse_price(row[6])
        if raw_name not in SKIP_NAMES:
            current_product = raw_name
            if current_product not in prices["condiments"]:
                prices["condiments"][current_product] = []
        if raw_type not in SKIP_TYPES:
            current_type = str(raw_type).strip()
        if not current_product:
            continue
        if current_product == "Milk":
            vol_str = parse_volume(vol)
            if vol_str:
                prices["condiments"][current_product].append(
                    {"volume": vol_str, "type": current_type, "price": price})
            continue
        try:
            w = float(weight)
        except:
            continue
        prices["condiments"][current_product].append(
            {"weight": f"{w:g}kg", "type": current_type, "price": price})

    return prices


def main():
    if len(sys.argv) < 2:
        print("Использование: python3 scripts/update-prices.py <xlsx>")
        sys.exit(1)
    xlsx_path = sys.argv[1]
    if not os.path.exists(xlsx_path):
        print(f"❌ Не найден: {xlsx_path}")
        sys.exit(1)
    print(f"📂 Читаю: {xlsx_path}")
    prices = build_prices(xlsx_path)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.normpath(os.path.join(script_dir, "..", "prices.json"))
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(prices, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Сохранено: {out_path}")
    print(f"📅 Дата:      {prices['updatedAt']}")
    print(f"\n🛢  Масла ({len(prices['oils'])} продуктов):")
    for p, items in prices["oils"].items():
        priced = [i for i in items if i["price"]]
        print(f"   {p}: {len(items)} вариантов, {len(priced)} с ценой")
    print(f"\n🥫 Соусы/молоко ({len(prices['condiments'])} продуктов):")
    for p, items in prices["condiments"].items():
        priced = [i for i in items if i["price"]]
        print(f"   {p}: {len(items)} вариантов, {len(priced)} с ценой")
    print("\n📦 Следующие шаги:")
    print("   git add data/prices.json")
    print('   git commit -m "chore: update prices"')
    print("   git push\n")


if __name__ == "__main__":
    main()
