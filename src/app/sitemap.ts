import { MetadataRoute } from "next";

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
  {
    path: "/services/private-label",
    changeFreq: "monthly" as const,
    priority: 0.7,
  },
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
  "refined-vs-crude-sunflower-oil",
  "high-oleic-sunflower-oil-horeca",
  "how-food-trading-works-europe",
  "food-trading-bulgaria-eu-advantage",
  "best-frying-oil-restaurants",
  "wholesale-beet-sugar-europe",
  "sunflower-oil-packaging-guide",
  "how-to-choose-food-supplier",
];

function createEntry(
  path: string,
  changeFreq: "daily" | "weekly" | "monthly",
  priority: number,
  lastMod?: string,
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
