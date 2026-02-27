import { MetadataRoute } from "next";
import { getPostSlugs, getPostBySlug } from "@/lib/blog";
import { getAllSlugs } from "@/data/products";

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

function createEntries(
  path: string,
  changeFreq: "daily" | "weekly" | "monthly",
  priority: number,
  lastMod?: string,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangMap[loc]] = `${BASE_URL}/${loc}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/en${path}`;

  // One <url> per locale, all sharing the same hreflang alternates
  return locales.map((loc) => ({
    url: `${BASE_URL}/${loc}${path}`,
    lastModified: lastMod ? new Date(lastMod) : new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages (9 pages × 6 locales = 54 entries)
  for (const page of staticPages) {
    entries.push(...createEntries(page.path, page.changeFreq, page.priority));
  }

  // Product pages — dynamic from data (6 products × 6 locales = 36 entries)
  const productSlugs = getAllSlugs();
  for (const slug of productSlugs) {
    entries.push(...createEntries(`/products/${slug}`, "monthly", 0.7));
  }

  // Blog posts — auto-discovered (12 posts × 6 locales = 72 entries)
  const blogSlugs = getPostSlugs();
  for (const slug of blogSlugs) {
    const post = getPostBySlug(slug, "en");
    const lastMod = post?.date || undefined;
    entries.push(...createEntries(`/blog/${slug}`, "monthly", 0.6, lastMod));
  }

  return entries;
}
