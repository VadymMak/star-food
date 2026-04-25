import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { products, getProductBySlug } from "@/data/products";
import ProductPageClient from "./ProductPageClient";

const BASE_URL = "https://ub-market.com";

// Generate static params for all locale × slug combinations
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const product of products) {
      params.push({ locale, slug: product.slug });
    }
  }
  return params;
}

// Hreflang map (ua → uk per ISO 639-1)
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  ua: "uk",
  tr: "tr",
  ro: "ro",
  de: "de",
  el: "el",
};

// Per-locale keyword sets for product pages
const localeKeywords: Record<string, string[]> = {
  en: [
    "wholesale sunflower oil",
    "bulk vegetable oil",
    "edible oil wholesale",
    "sunflower oil supplier Europe",
    "UB Market LTD",
  ],
  de: [
    "sonnenblumenöl großhandel",
    "pflanzenöl großhandel",
    "speiseöl großhandel",
    "sonnenblumenöl lieferant",
    "UB Market LTD",
  ],
  bg: [
    "слънчогледово олио на едро",
    "хранителни стоки на едро",
    "олио на едро",
    "доставчик на олио",
    "UB Market LTD",
  ],
  tr: [
    "toptan ayçiçek yağı",
    "gıda toptancısı",
    "toptan gıda",
    "toptan yağ",
    "UB Market LTD",
  ],
  ro: [
    "ulei floarea soarelui en-gros",
    "ulei vegetal en-gros",
    "furnizor ulei",
    "comerț alimentar",
    "UB Market LTD",
  ],
  ua: [
    "соняшникова олія оптом",
    "рослинна олія оптом",
    "постачальник олії",
    "оптова торгівля",
    "UB Market LTD",
  ],
  el: [
    "χονδρική ηλιέλαιο",
    "χονδρική φυτικό έλαιο",
    "προμηθευτής λαδιού",
    "χονδρικό εμπόριο τροφίμων",
    "UB Market LTD",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  // Find the product
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product page does not exist.",
    };
  }

  // Get translated product data
  let translatedName = product.name;
  let translatedDesc = product.description;

  try {
    const t = await getTranslations({ locale, namespace: "products.items" });
    const nameKey = `${product.id}.name`;
    const descKey = `${product.id}.description`;
    try {
      translatedName = t(nameKey);
    } catch {
      // fallback to English
    }
    try {
      translatedDesc = t(descKey);
    } catch {
      // fallback to English
    }
  } catch {
    // Translation namespace not available, use fallbacks
  }

  // Build hreflang alternates
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const code = hreflangMap[loc] || loc;
    languages[code] = `${BASE_URL}/${loc}/products/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/en/products/${slug}`;

  // Build keywords for this locale
  const keywords = localeKeywords[locale] || localeKeywords.en;

  // Title uses root template "%s | Star Food" automatically
  const title = `${translatedName} Wholesale Europe`;
  const description = translatedDesc;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${slug}`,
      languages,
    },
    openGraph: {
      title: `${translatedName} | Star Food Wholesale`,
      description,
      url: `${BASE_URL}/${locale}/products/${slug}`,
      siteName: "Star Food by UB Market LTD",
      images: [
        {
          url: `${BASE_URL}${product.image}`,
          width: 1200,
          height: 630,
          alt: translatedName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${translatedName} | Star Food`,
      description,
      images: [`${BASE_URL}${product.image}`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Validate product exists; if not, return 404
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  // Render the client component which handles UI/interactivity
  return <ProductPageClient />;
}
