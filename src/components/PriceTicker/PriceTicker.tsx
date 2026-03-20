"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./PriceTicker.module.css";

interface PriceData {
  price: number | null;
  date: string | null;
  source: string;
  fallback: boolean;
}

interface OilEntry {
  volume: string;
  packaging: string;
  type: string;
  price: number | null;
}

interface ProductPrices {
  updatedAt: string;
  oils: Record<string, OilEntry[]>;
}

// Wholesale (рыночные цены IMF/FRED) — меняются редко вручную
const WHOLESALE = {
  refined: { from: 1500, to: 1800 },
  highOleic: { from: 1650, to: 1950 },
  meal: { from: 230, to: 320 },
};

function fMT(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}
function fEUR(n: number) {
  return `€${n.toFixed(2)}`;
}

// Из массива вариантов находим цену по объёму
function findPrice(items: OilEntry[], volume: string): number | null {
  const found = items.find((i) => i.volume === volume && i.price !== null);
  return found?.price ?? null;
}

export default function PriceTicker() {
  const t = useTranslations();
  const [fredData, setFredData] = useState<PriceData | null>(null);
  const [prices, setPrices] = useState<ProductPrices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FRED API (wholesale benchmark)
    fetch("/api/prices")
      .then((r) => r.json())
      .then((d: PriceData) => setFredData(d))
      .catch(() =>
        setFredData({ price: null, date: null, source: "IMF", fallback: true }),
      );

    // Client prices from prices.json
    fetch("/api/product-prices")
      .then((r) => r.json())
      .then((d: ProductPrices) => {
        setPrices(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Retail prices from prices.json
  const sunflowerItems = prices?.oils?.["Sunflower Oil"] ?? [];
  const highOleicItems = prices?.oils?.["High Oleic Sunflower Oil"] ?? [];

  const refined1L = findPrice(sunflowerItems, "1L");
  const refined10L = findPrice(sunflowerItems, "10L");
  const highOleic10 = findPrice(highOleicItems, "10L");

  return (
    <div className={styles.ticker}>
      {/* LEFT: live indicator */}
      <div className={styles.left}>
        <span className={styles.liveDot} />
        <div className={styles.leftText}>
          <span className={styles.liveLabel}>{t("ticker.marketUpdate")}</span>
          {fredData?.date && (
            <span className={styles.date}>{fredData.date}</span>
          )}
        </div>
      </div>

      {/* CENTER: two rows */}
      <div className={styles.rows}>
        {/* Row 1 — Wholesale */}
        <div className={styles.row}>
          <span className={styles.rowBadge + " " + styles.badgeWholesale}>
            {t("ticker.wholesale")}
          </span>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.benchmark")}</span>
              <span className={styles.itemValue}>
                {loading ? (
                  <span className={styles.skeleton} />
                ) : fredData?.price ? (
                  <>
                    {fMT(fredData.price)}
                    <span className={styles.unit}>/MT</span>
                  </>
                ) : (
                  <span className={styles.na}>—</span>
                )}
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.refined")}</span>
              <span className={styles.itemValue}>
                {fMT(WHOLESALE.refined.from)}–{fMT(WHOLESALE.refined.to)}
                <span className={styles.unit}>/MT</span>
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.highOleic")}</span>
              <span className={styles.itemValue}>
                {fMT(WHOLESALE.highOleic.from)}–{fMT(WHOLESALE.highOleic.to)}
                <span className={styles.unit}>/MT</span>
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.meal")}</span>
              <span className={styles.itemValue}>
                {fMT(WHOLESALE.meal.from)}–{fMT(WHOLESALE.meal.to)}
                <span className={styles.unit}>/MT</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rowDivider} />

        {/* Row 2 — Retail (from prices.json) */}
        <div className={styles.row}>
          <span className={styles.rowBadge + " " + styles.badgeRetail}>
            {t("ticker.retail")}
          </span>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.refined")} 1L</span>
              <span className={styles.itemValueRetail}>
                {loading ? (
                  <span className={styles.skeleton} />
                ) : refined1L ? (
                  <>
                    {fEUR(refined1L)}
                    <span className={styles.unit}>/btl</span>
                  </>
                ) : (
                  <span className={styles.na}>—</span>
                )}
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>
                {t("ticker.refined")} 10L
              </span>
              <span className={styles.itemValueRetail}>
                {loading ? (
                  <span className={styles.skeleton} />
                ) : refined10L ? (
                  <>
                    {fEUR(refined10L)}
                    <span className={styles.unit}>/btl</span>
                  </>
                ) : (
                  <span className={styles.na}>—</span>
                )}
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>
                {t("ticker.highOleic")} 10L
              </span>
              <span className={styles.itemValueRetail}>
                {loading ? (
                  <span className={styles.skeleton} />
                ) : highOleic10 ? (
                  <>
                    {fEUR(highOleic10)}
                    <span className={styles.unit}>/btl</span>
                  </>
                ) : (
                  <span className={styles.na}>—</span>
                )}
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.bottles")}</span>
              <span className={styles.itemValueRetail}>
                {t("ticker.bottleSizes")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: source */}
      <div className={styles.right}>
        <span className={styles.sourceText}>{t("ticker.source")}</span>
      </div>
    </div>
  );
}
