"""
PHASE E: SEO Polish (Step 19)
RUN FROM star-food ROOT:
  python phase_e_seo.py

Creates/Updates:
  src/app/sitemap.ts       — Dynamic multilingual sitemap with hreflang
  src/app/robots.ts        — Dynamic robots.txt
  src/components/HreflangTags/HreflangTags.tsx  — Hreflang meta tags
  src/components/SchemaOrg/SchemaOrg.tsx         — WebSite + Organization schema
  Updates layout.tsx to include schemas and hreflang
"""

import os

files = {}

# ============================================================
# 1. DYNAMIC SITEMAP with hreflang
# ============================================================
files["src/app/sitemap.ts"] = '''import { MetadataRoute } from "next";

const BASE_URL = "https://ub-market.com";

const locales = ["en", "bg", "tr", "ro", "de", "ua"];

// ISO 639-1: Ukrainian = "uk", not "ua"
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  tr: "tr",
  ro: "ro",
  de: "de",
  ua: "uk",
};

// All static pages
const staticPages = [
  { path: "", changeFreq: "monthly" as const, priority: 1.0 },
  { path: "/about", changeFreq: "monthly" as const, priority: 0.8 },
  { path: "/products", changeFreq: "weekly" as const, priority: 0.9 },
  { path: "/contacts", changeFreq: "monthly" as const, priority: 0.7 },
  { path: "/blog", changeFreq: "weekly" as const, priority: 0.8 },
  { path: "/brands/star-food", changeFreq: "monthly" as const, priority: 0.8 },
  { path: "/partners", changeFreq: "monthly" as const, priority: 0.7 },
  { path: "/quote", changeFreq: "monthly" as const, priority: 0.7 },
  { path: "/services/private-label", changeFreq: "monthly" as const, priority: 0.7 },
];

// Product pages
const productSlugs = [
  "sunflower-oil",
  "frying-oil",
  "sugar",
  "mayonnaise",
  "dry-milk",
  "powdered-milk",
  "palm-oil",
];

// Blog post slugs
const blogSlugs = [
  "sunflower-oil-wholesale-guide",
  "sunflower-oil-prices-europe-2026",
  "how-we-created-star-food-labels",
  "fob-cif-dap-explained",
];

function createEntry(
  path: string,
  changeFreq: "daily" | "weekly" | "monthly",
  priority: number,
  lastMod?: string
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};

  for (const loc of locales) {
    const hreflang = hreflangMap[loc];
    languages[hreflang] = `${BASE_URL}/${loc}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/en${path}`;

  return {
    url: `${BASE_URL}/en${path}`,
    lastModified: lastMod ? new Date(lastMod) : new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    entries.push(createEntry(page.path, page.changeFreq, page.priority));
  }

  // Product pages
  for (const slug of productSlugs) {
    entries.push(createEntry(`/products/${slug}`, "monthly", 0.7));
  }

  // Blog posts
  for (const slug of blogSlugs) {
    entries.push(createEntry(`/blog/${slug}`, "monthly", 0.6));
  }

  return entries;
}
'''

# ============================================================
# 2. DYNAMIC ROBOTS.TS
# ============================================================
files["src/app/robots.ts"] = '''import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://ub-market.com/sitemap.xml",
  };
}
'''

# ============================================================
# 3. HREFLANG TAGS COMPONENT
# ============================================================
files["src/components/HreflangTags/HreflangTags.tsx"] = '''"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const BASE_URL = "https://ub-market.com";

const locales = ["en", "bg", "tr", "ro", "de", "ua"];

// ISO 639-1: Ukrainian = "uk", not "ua"
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  tr: "tr",
  ro: "ro",
  de: "de",
  ua: "uk",
};

export default function HreflangTags() {
  const pathname = usePathname();
  const { locale } = useLanguage();

  // Remove current locale prefix to get clean path
  const cleanPath = pathname.replace(/^\\/(en|bg|tr|ro|de|ua)/, "") || "/";

  return (
    <>
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={hreflangMap[loc]}
          href={`${BASE_URL}/${loc}${cleanPath === "/" ? "" : cleanPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${cleanPath === "/" ? "" : cleanPath}`}
      />
      <link
        rel="canonical"
        href={`${BASE_URL}/${locale}${cleanPath === "/" ? "" : cleanPath}`}
      />
    </>
  );
}
'''

files["src/components/HreflangTags/index.ts"] = '''export { default } from "./HreflangTags";
'''

# ============================================================
# 4. SCHEMA.ORG COMPONENT — WebSite + Organization
# ============================================================
files["src/components/SchemaOrg/SchemaOrg.tsx"] = '''"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function SchemaOrg() {
  const { locale } = useLanguage();
  const BASE_URL = "https://ub-market.com";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UB Market — Star Food",
    alternateName: "Star Food by UB Market",
    url: BASE_URL,
    inLanguage: ["en", "bg", "tr", "ro", "de", "uk"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UB Market LTD",
    alternateName: "Star Food",
    url: BASE_URL,
    logo: `${BASE_URL}/images/star-food-logo.webp`,
    description:
      "EU-registered international food trading company based in Bulgaria. Wholesale sunflower oil, vegetable oil, and food products for European markets.",
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
      availableLanguage: ["English", "Bulgarian", "Turkish", "Romanian", "German", "Ukrainian"],
    },
    sameAs: [
      "https://www.instagram.com/ub_market_ltd/",
      "https://t.me/ub_market_ltd",
    ],
    brand: {
      "@type": "Brand",
      name: "Star Food",
      logo: `${BASE_URL}/images/star-food-logo.webp`,
    },
    foundingLocation: {
      "@type": "Place",
      name: "Varna, Bulgaria",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.2141,
        longitude: 27.9147,
      },
      geoRadius: "3000000",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Star Food Sunflower Oil",
          category: "Sunflower Oil",
        },
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
'''

files["src/components/SchemaOrg/index.ts"] = '''export { default } from "./SchemaOrg";
'''

# ============================================================
# WRITE FILES
# ============================================================
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"  ✅ {path}")

# ============================================================
# 5. INSTRUCTIONS for layout.tsx update
# ============================================================
print(f"""
{'='*60}
✅ Phase E files created!
{'='*60}

NOW — manually update src/app/layout.tsx:

Add imports at the top:
  import HreflangTags from "@/components/HreflangTags";
  import SchemaOrg from "@/components/SchemaOrg";

Add inside <head> (or inside <body> at the top):
  <HreflangTags />
  <SchemaOrg />

Example layout.tsx structure:
  export default function RootLayout({{ children }}) {{
    return (
      <html>
        <head>
          <HreflangTags />
          <SchemaOrg />
        </head>
        <body>
          ...
          {{children}}
        </body>
      </html>
    );
  }}

NOTE: If your layout.tsx is a server component,
wrap HreflangTags and SchemaOrg in a client wrapper,
OR add them to [locale]/layout.tsx instead (which is
likely already "use client" or has client providers).

ALSO:
  Delete the old static file: public/robots.txt
  (Now generated dynamically by src/app/robots.ts)

Test:
  pnpm dev
  http://localhost:3000/sitemap.xml  → should show all pages × 6 languages
  http://localhost:3000/robots.txt   → should show dynamic robots
  View source on any page → check for hreflang + JSON-LD schemas

Verify:
  • Google Rich Results Test: search.google.com/test/rich-results
  • Paste any page URL → check WebSite + Organization schemas
  • Check hreflang: view-source → search "hreflang"
""")
