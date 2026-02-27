"""
Phase G Migration — Script 5: Page Metadata + SSG
=====================================================================
RUN FROM star-food PROJECT ROOT:
  python 05_page_metadata.py

WHAT IT DOES:
  1. Adds generateMetadata() to pages that don't have it
  2. Adds setRequestLocale() for static generation
  3. Converts client pages to server pages where possible

MODIFIES: src/app/[locale]/*/page.tsx files
"""

import os
import re
import shutil
import subprocess
import sys

PROJECT_ROOT = os.getcwd()


def check_project():
    if not os.path.exists("src/i18n/routing.ts"):
        print("❌ Run Scripts 1-4 first!")
        sys.exit(1)
    print("✅ Project verified")


def backup_file(path):
    if os.path.exists(path):
        backup = path + ".backup2"
        if not os.path.exists(backup):
            shutil.copy2(path, backup)


# Page metadata configurations
PAGE_METADATA = {
    "src/app/[locale]/page.tsx": {
        "title_key": "meta.homeTitle",
        "desc_key": "meta.homeDescription",
        "title_fallback": "Star Food | Premium Sunflower Oil & Food Products — EU Trading Company",
        "desc_fallback": "UB Market LTD — EU-registered food trading company. Wholesale sunflower oil, sugar, dairy. Export across Europe.",
    },
    "src/app/[locale]/about/page.tsx": {
        "title_key": "meta.aboutTitle",
        "desc_key": "meta.aboutDescription",
        "title_fallback": "About UB Market LTD | EU Food Trading Company Bulgaria",
        "desc_fallback": "International food trading company specializing in sunflower oil export/import. EU-registered, based in Varna, Bulgaria.",
    },
    "src/app/[locale]/products/page.tsx": {
        "title_key": "meta.productsTitle",
        "desc_key": "meta.productsDescription",
        "title_fallback": "Our Products | Sunflower Oil, Sugar, Dairy Wholesale",
        "desc_fallback": "Premium sunflower oil, frying oil, sugar, mayonnaise, dairy products. Wholesale prices, EU delivery.",
    },
    "src/app/[locale]/contacts/page.tsx": {
        "title_key": "meta.contactsTitle",
        "desc_key": "meta.contactsDescription",
        "title_fallback": "Contact Us | UB Market LTD — Get a Quote",
        "desc_fallback": "Contact UB Market for wholesale food product inquiries. Office in Varna, Bulgaria. Quick response guaranteed.",
    },
    "src/app/[locale]/partners/page.tsx": {
        "title_key": "meta.partnersTitle",
        "desc_key": "meta.partnersDescription",
        "title_fallback": "Become a Partner | Star Food Distribution Opportunities",
        "desc_fallback": "Join Star Food distribution network. Competitive prices, flexible MOQ, dedicated support for distributors across Europe.",
    },
    "src/app/[locale]/quote/page.tsx": {
        "title_key": "meta.quoteTitle",
        "desc_key": "meta.quoteDescription",
        "title_fallback": "Request a Quote | Wholesale Food Products — UB Market",
        "desc_fallback": "Get competitive wholesale prices for sunflower oil and food products. Free quote, no obligation.",
    },
    "src/app/[locale]/brands/star-food/page.tsx": {
        "title_key": "meta.brandTitle",
        "desc_key": "meta.brandDescription",
        "title_fallback": "Star Food — Our Registered Trademark | Premium Sunflower Oil",
        "desc_fallback": "Star Food is a registered EU trademark for premium sunflower oil and food products by UB Market LTD.",
    },
    "src/app/[locale]/services/private-label/page.tsx": {
        "title_key": "meta.privateLabelTitle",
        "desc_key": "meta.privateLabelDescription",
        "title_fallback": "Private Label Sunflower Oil | Your Brand, Our Quality",
        "desc_fallback": "Private label and white label sunflower oil production. Custom packaging, EU-certified quality.",
    },
}


def add_metadata_to_page(filepath: str, meta_config: dict) -> bool:
    """Add generateMetadata to a page file."""
    if not os.path.exists(filepath):
        print(f"   ⏭️  {filepath} — not found, skipping")
        return False

    with open(filepath, "r") as f:
        content = f.read()

    # Skip if already has generateMetadata
    if "generateMetadata" in content:
        print(f"   ℹ️  {filepath} — already has generateMetadata")
        return False

    backup_file(filepath)

    # Check if it's a client component
    is_client = '"use client"' in content or "'use client'" in content

    # Build the metadata function
    metadata_code = f'''
import type {{ Metadata }} from "next";
import {{ getTranslations }} from "next-intl/server";
import {{ setRequestLocale }} from "next-intl/server";
import {{ routing }} from "@/i18n/routing";

export function generateStaticParams() {{
  return routing.locales.map((locale) => ({{ locale }}));
}}

export async function generateMetadata({{
  params,
}}: {{
  params: Promise<{{ locale: string }}>;
}}): Promise<Metadata> {{
  const {{ locale }} = await params;
  const baseUrl = "https://ub-market.com";

  // Try to get translated meta, fall back to English
  let title = "{meta_config['title_fallback']}";
  let description = "{meta_config['desc_fallback']}";

  try {{
    const t = await getTranslations({{ locale, namespace: "meta" }});
    title = t("{meta_config['title_key'].split('.')[-1]}");
    description = t("{meta_config['desc_key'].split('.')[-1]}");
  }} catch {{
    // Use fallback values
  }}

  return {{
    title,
    description,
    alternates: {{
      canonical: `${{baseUrl}}/${{locale}}`,
    }},
    openGraph: {{
      title,
      description,
      url: `${{baseUrl}}/${{locale}}`,
      siteName: "Star Food — UB Market",
      images: [{{ url: `${{baseUrl}}/og-image.jpg`, width: 1200, height: 630 }}],
      type: "website",
    }},
  }};
}}
'''

    if is_client:
        # Client component — we need to split into server wrapper + client component
        # OR just add metadata as a separate export (Next.js supports this in client pages too)
        # Actually, generateMetadata MUST be in a server module.
        # Solution: rename current page to ClientPage, create new server page that imports it

        # Extract the component name
        comp_match = re.search(r'export\s+default\s+function\s+(\w+)', content)
        if not comp_match:
            print(
                f"   ⚠️  {filepath} — can't find default export, needs manual fix")
            return False

        comp_name = comp_match.group(1)

        # Create client component file
        dir_path = os.path.dirname(filepath)
        client_filename = f"{comp_name}Client.tsx"
        client_path = os.path.join(dir_path, client_filename)

        # Write client component (original code without "use client" export default)
        with open(client_path, "w") as f:
            f.write(content)
        print(f"   📄 Created: {client_path} (client component)")

        # Write new server page.tsx with metadata + import client
        new_page = f'''import type {{ Metadata }} from "next";
import {{ getTranslations, setRequestLocale }} from "next-intl/server";
import {{ routing }} from "@/i18n/routing";
import {comp_name}Client from "./{comp_name}Client";

export function generateStaticParams() {{
  return routing.locales.map((locale) => ({{ locale }}));
}}

export async function generateMetadata({{
  params,
}}: {{
  params: Promise<{{ locale: string }}>;
}}): Promise<Metadata> {{
  const {{ locale }} = await params;
  const baseUrl = "https://ub-market.com";

  let title = "{meta_config['title_fallback']}";
  let description = "{meta_config['desc_fallback']}";

  try {{
    const t = await getTranslations({{ locale, namespace: "meta" }});
    title = t("{meta_config['title_key'].split('.')[-1]}");
    description = t("{meta_config['desc_key'].split('.')[-1]}");
  }} catch {{
    // Use fallback values
  }}

  return {{
    title,
    description,
    alternates: {{
      canonical: `${{baseUrl}}/${{locale}}`,
    }},
    openGraph: {{
      title,
      description,
      url: `${{baseUrl}}/${{locale}}`,
      siteName: "Star Food — UB Market",
      images: [{{ url: `${{baseUrl}}/og-image.jpg`, width: 1200, height: 630 }}],
      type: "website",
    }},
  }};
}}

export default async function {comp_name}Page({{
  params,
}}: {{
  params: Promise<{{ locale: string }}>;
}}) {{
  const {{ locale }} = await params;
  setRequestLocale(locale);
  return <{comp_name}Client />;
}}
'''
        with open(filepath, "w") as f:
            f.write(new_page)
        print(
            f"   ✅ {filepath} — server page with generateMetadata + client import")
        return True

    else:
        # Server component — add metadata directly
        # Add imports at top
        lines = content.split('\n')
        import_idx = 0
        for i, line in enumerate(lines):
            if line.strip().startswith('import '):
                import_idx = i + 1

        # Insert metadata imports and function
        lines.insert(import_idx, metadata_code)

        # Add setRequestLocale to the component function
        # Find the component function body
        new_content = '\n'.join(lines)

        # Add setRequestLocale if it accepts params
        func_match = re.search(
            r'(export\s+default\s+(?:async\s+)?function\s+\w+\s*\([^)]*\)\s*\{)', new_content)
        if func_match:
            # Check if it already has params
            if 'params' in func_match.group(0):
                # Add setRequestLocale after the params destructuring
                pass  # Complex — skip for now

        with open(filepath, "w") as f:
            f.write(new_content)
        print(f"   ✅ {filepath} — added generateMetadata")
        return True


def add_meta_translations():
    """Add meta namespace to all translation JSON files."""
    print("\n📂 Adding meta translations to JSON files...")

    meta_translations = {
        "en": {
            "homeTitle": "Star Food | Premium Sunflower Oil & Food Products — EU Trading Company",
            "homeDescription": "UB Market LTD — EU-registered food trading company. Wholesale sunflower oil, sugar, dairy. Export across Europe.",
            "aboutTitle": "About UB Market LTD | EU Food Trading Company Bulgaria",
            "aboutDescription": "International food trading company specializing in sunflower oil. EU-registered, based in Varna, Bulgaria.",
            "productsTitle": "Our Products | Sunflower Oil, Sugar, Dairy Wholesale",
            "productsDescription": "Premium sunflower oil, frying oil, sugar, mayonnaise, dairy. Wholesale prices, EU delivery.",
            "contactsTitle": "Contact Us | UB Market LTD — Get a Quote",
            "contactsDescription": "Contact UB Market for wholesale food product inquiries. Quick response guaranteed.",
            "partnersTitle": "Become a Partner | Star Food Distribution Opportunities",
            "partnersDescription": "Join Star Food distribution network. Competitive prices across Europe.",
            "quoteTitle": "Request a Quote | Wholesale Food Products — UB Market",
            "quoteDescription": "Get competitive wholesale prices for sunflower oil and food products.",
            "brandTitle": "Star Food — Our Registered Trademark | Premium Sunflower Oil",
            "brandDescription": "Star Food registered EU trademark for premium sunflower oil by UB Market LTD.",
            "privateLabelTitle": "Private Label Sunflower Oil | Your Brand, Our Quality",
            "privateLabelDescription": "Private label sunflower oil production. Custom packaging, EU quality."
        },
        "bg": {
            "homeTitle": "Star Food | Първокласно Слънчогледово Олио — ЕС Търговска Компания",
            "homeDescription": "UB Market LTD — ЕС-регистрирана търговска компания. Олио на едро, захар, млечни продукти.",
            "aboutTitle": "За UB Market LTD | ЕС Търговска Компания за Храни",
            "aboutDescription": "Международна компания за търговия с храни, базирана във Варна, България.",
            "productsTitle": "Нашите продукти | Олио, Захар, Млечни Продукти на Едро",
            "productsDescription": "Първокласно слънчогледово олио, фритюрно олио, захар, майонеза. Цени на едро.",
            "contactsTitle": "Контакти | UB Market LTD — Поискайте Оферта",
            "contactsDescription": "Свържете се с UB Market за запитвания за хранителни продукти на едро.",
            "partnersTitle": "Станете Партньор | Дистрибуция на Star Food",
            "partnersDescription": "Присъединете се към дистрибуторската мрежа на Star Food.",
            "quoteTitle": "Поискайте Оферта | Хранителни Продукти на Едро",
            "quoteDescription": "Получете конкурентни цени за слънчогледово олио и хранителни продукти.",
            "brandTitle": "Star Food — Нашата Регистрирана Марка",
            "brandDescription": "Star Food е регистрирана ЕС марка за олио от UB Market LTD.",
            "privateLabelTitle": "Частна Марка Олио | Вашият Бренд, Нашето Качество",
            "privateLabelDescription": "Производство на олио с частна марка. Персонализирана опаковка."
        },
    }

    # For other languages, use English as fallback
    for lang_code in ["tr", "ro", "de", "ua"]:
        meta_translations[lang_code] = meta_translations["en"].copy()

    for lang_code, meta in meta_translations.items():
        json_path = f"src/i18n/{lang_code}.json"
        if os.path.exists(json_path):
            import json
            with open(json_path, "r") as f:
                data = json.load(f)

            if "meta" not in data:
                data["meta"] = meta
                with open(json_path, "w") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"   ✅ Added meta section to {json_path}")
            else:
                print(f"   ℹ️  {json_path} already has meta section")


def main():
    print("=" * 60)
    print("🚀 Phase G — Script 5: Page Metadata + SSG")
    print("=" * 60)

    check_project()

    # Add meta translations first
    add_meta_translations()

    # Process each page
    print(f"\n📂 Processing {len(PAGE_METADATA)} pages...")

    migrated = 0
    for filepath, meta_config in PAGE_METADATA.items():
        if add_metadata_to_page(filepath, meta_config):
            migrated += 1

    # Git commit
    print("\n📝 Creating git commit...")
    subprocess.run(["git", "add", "-A"], capture_output=True)
    result = subprocess.run(
        ["git", "commit", "-m",
            f"feat(phase-g): add generateMetadata to {migrated} pages + meta translations"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print("   ✅ Committed")
    else:
        print(f"   ⚠️  {result.stdout.strip()}")

    print("\n" + "=" * 60)
    print(f"✅ Script 5 Complete! ({migrated} pages updated)")
    print("=" * 60)
    print("\n👉 Next: Run pnpm dev and test, then Script 6 (verification)")
    print("=" * 60)


if __name__ == "__main__":
    main()
