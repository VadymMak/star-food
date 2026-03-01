// src/app/sitemap.ts — Dynamic sitemap with hreflang alternates
import { MetadataRoute } from "next";
import { getPostSlugs, getPostBySlug } from "@/lib/blog";

const BASE_URL = "https://ub-market.com";
const locales = ["en", "bg", "tr", "ro", "de", "ua"];

// ISO 639-1 mapping (important: ua → uk for Ukrainian)
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  tr: "tr",
  ro: "ro",
  de: "de",
  ua: "uk", // Ukrainian ISO 639-1 = "uk", NOT "ua"
};

function localizedEntry(
  path: string,
  changeFrequency: "daily" | "weekly" | "monthly",
  priority: number,
  lastModified?: Date,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangMap[loc]] = `${BASE_URL}/${loc}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/en${path}`;

  return {
    url: `${BASE_URL}/en${path}`,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = [
    localizedEntry("", "monthly", 1.0, now),
    localizedEntry("/about", "monthly", 0.8, now),
    localizedEntry("/products", "weekly", 0.9, now),
    localizedEntry("/contacts", "monthly", 0.7, now),
    localizedEntry("/blog", "weekly", 0.8, now),
    localizedEntry("/brands/star-food", "monthly", 0.8, now),
    localizedEntry("/partners", "monthly", 0.7, now),
    localizedEntry("/quote", "monthly", 0.7, now),
    localizedEntry("/services/private-label", "monthly", 0.7, now),
  ];

  // Product pages
  const productSlugs = [
    "sunflower-oil",
    "frying-oil",
    "sugar",
    "high-oleic-sunflower-oil",
    "dairy-products",
    "mayonnaise",
  ];
  const productPages = productSlugs.map((slug) =>
    localizedEntry(`/products/${slug}`, "monthly", 0.7, now),
  );

  // Blog posts — dynamically from blog-posts.ts
  const blogPages = getPostSlugs().map((slug) => {
    const post = getPostBySlug(slug, "en");
    return localizedEntry(
      `/blog/${slug}`,
      "monthly",
      0.6,
      post?.date ? new Date(post.date) : now,
    );
  });
  return [...staticPages, ...productPages, ...blogPages];
}
