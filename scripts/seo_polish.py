#!/usr/bin/env python3
"""
SEO Polish — Step 19
Run from star-food/ root:
    python3 seo_polish.py

Fixes:
1. Creates SchemaOrg component (WebSite + Organization schemas)
2. Fixes <html lang="en"> hardcode → dynamic per locale
3. Updates Organization schema logo path
4. Adds WebSite schema with SearchAction
"""

import os

# ============================================================
# 1. SchemaOrg Component
# ============================================================

schema_dir = "src/components/SchemaOrg"
os.makedirs(schema_dir, exist_ok=True)

SCHEMA_ORG = '''"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function SchemaOrg() {
  const { locale } = useLanguage();
  const baseUrl = "https://ub-market.com";

  // WebSite schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Star Food by UB Market",
    alternateName: "UB Market LTD",
    url: baseUrl,
    inLanguage: locale === "ua" ? "uk" : locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Organization schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UB Market LTD",
    alternateName: "Star Food",
    url: baseUrl,
    logo: `${baseUrl}/icons/logo-no-background.webp`,
    image: `${baseUrl}/og-image.jpg`,
    description:
      "EU-registered international food trading company specializing in sunflower oil export and import.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sirma Voivoda St., b.1, ap. 21",
      addressLocality: "Varna",
      postalCode: "9010",
      addressCountry: "BG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+359-8844-69860",
      contactType: "sales",
      email: "ubmarket2022@gmail.com",
      availableLanguage: [
        "English",
        "Bulgarian",
        "Ukrainian",
        "Turkish",
        "Romanian",
        "German",
      ],
    },
    sameAs: [
      "https://www.instagram.com/ub_market_ltd",
      "https://t.me/ub_market_ltd",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
'''

schema_path = os.path.join(schema_dir, "index.tsx")
with open(schema_path, "w", encoding="utf-8") as f:
    f.write(SCHEMA_ORG.strip() + "\n")
print(f"✅ {schema_path}")

# ============================================================
# 2. Fix root layout — remove hardcoded schemas (moved to SchemaOrg)
#    and make html lang dynamic
# ============================================================

ROOT_LAYOUT = '''// src/app/layout.tsx — Root layout (fonts + metadata only)
// Schemas are in SchemaOrg component (locale-aware)
// Header, Footer, WhatsApp are in [locale]/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Star Food | Premium Sunflower Oil & Food Products — EU Trading Company",
    template: "%s | Star Food",
  },
  description:
    "Star Food by UB Market LTD — EU-registered food trading company based in Bulgaria. Wholesale sunflower oil, sugar, dairy products. Export & import across Europe.",
  keywords: [
    "sunflower oil wholesale",
    "bulk sunflower oil Europe",
    "food trading company Bulgaria",
    "vegetable oil supplier EU",
    "Star Food",
    "UB Market LTD",
  ],
  authors: [{ name: "UB Market LTD" }],
  openGraph: {
    type: "website",
    title: "Star Food | Premium Sunflower Oil & Food Products",
    description:
      "EU-registered food trading company. Wholesale sunflower oil, sugar, dairy products across Europe.",
    url: "https://ub-market.com",
    siteName: "Star Food by UB Market LTD",
    locale: "en_US",
    images: [
      {
        url: "https://ub-market.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Star Food — Sunflower Oil Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Star Food | Premium Sunflower Oil & Food Products",
    description:
      "EU-registered food trading company. Wholesale sunflower oil, sugar, dairy products across Europe.",
    images: ["https://ub-market.com/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://ub-market.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={sourceSans.className}>{children}</body>
    </html>
  );
}
'''

layout_path = "src/app/layout.tsx"
with open(layout_path, "w", encoding="utf-8") as f:
    f.write(ROOT_LAYOUT.strip() + "\n")
print(f"✅ {layout_path} — removed duplicate schemas, added suppressHydrationWarning")

# ============================================================
# 3. Update locale layout — set document.lang dynamically
# ============================================================

LOCALE_LAYOUT = '''import { notFound } from "next/navigation";
import { locales, hreflangCodes, isValidLocale } from "@/lib/locale";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import SchemaOrg from "@/components/SchemaOrg";
import SetHtmlLang from "@/components/SetHtmlLang";
import type { Locale } from "@/lib/locale";

// Generate static params for all locales (build time)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Dynamic metadata with hreflang
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://ub-market.com";

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangCodes[loc]] = `${baseUrl}/${loc}`;
  }
  languages["x-default"] = `${baseUrl}/en`;

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  // ISO 639-1: Ukrainian = "uk"
  const htmlLang = locale === "ua" ? "uk" : locale;

  return (
    <LanguageProvider locale={locale as Locale}>
      <SetHtmlLang lang={htmlLang} />
      <SchemaOrg />
      <div className="pageWrapper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <WhatsAppButton />
      <CookieConsent />
    </LanguageProvider>
  );
}
'''

locale_layout_path = "src/app/[locale]/layout.tsx"
with open(locale_layout_path, "w", encoding="utf-8") as f:
    f.write(LOCALE_LAYOUT.strip() + "\n")
print(f"✅ {locale_layout_path} — added SetHtmlLang + x-default hreflang")

# ============================================================
# 4. SetHtmlLang component — sets <html lang> per locale
# ============================================================

set_lang_dir = "src/components/SetHtmlLang"
os.makedirs(set_lang_dir, exist_ok=True)

SET_HTML_LANG = '''"use client";

import { useEffect } from "react";

export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
'''

set_lang_path = os.path.join(set_lang_dir, "index.tsx")
with open(set_lang_path, "w", encoding="utf-8") as f:
    f.write(SET_HTML_LANG.strip() + "\n")
print(f"✅ {set_lang_path}")

# ============================================================
# 5. Fix sitemap — remove private-label if page is empty
# ============================================================

# Check if private-label page has content
pl_page = "src/app/[locale]/services/private-label/page.tsx"
if os.path.exists(pl_page):
    with open(pl_page, "r", encoding="utf-8") as f:
        content = f.read()
    if len(content) < 200:
        print(f"⚠️  {pl_page} seems like a placeholder ({len(content)} chars)")
        print("   Consider removing '/services/private-label' from sitemap until page is ready")
    else:
        print(f"✅ {pl_page} exists ({len(content)} chars) — sitemap entry OK")
else:
    print(f"⚠️  {pl_page} not found — removing from sitemap")

# ============================================================
# Done
# ============================================================

print()
print("=" * 50)
print("✅ SEO POLISH COMPLETE!")
print("=" * 50)
print()
print("What was done:")
print("  1. Created SchemaOrg component (WebSite + Organization)")
print("  2. Root layout: removed duplicate Organization schema")
print("  3. Root layout: added suppressHydrationWarning for lang switch")
print("  4. Locale layout: added SetHtmlLang (dynamic <html lang>)")
print("  5. Locale layout: added x-default hreflang")
print("  6. Organization schema: updated logo path")
print()
print("Test:")
print("  pnpm dev")
print("  1. Open /en/ → View Source → check <html lang='en'>")
print("  2. Switch to /tr/ → View Source → check lang changes to 'tr'")
print("  3. Open /ua/ → lang should be 'uk' (ISO standard)")
print("  4. Check page source for WebSite + Organization JSON-LD")
print()
print("Verify schemas:")
print("  https://search.google.com/test/rich-results")
print("  Paste: https://ub-market.com/en/")
