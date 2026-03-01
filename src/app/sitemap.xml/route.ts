// src/app/sitemap.xml/route.ts — Manual XML sitemap with hreflang
import { getPostSlugs, getPostBySlug } from "@/lib/blog";

const BASE_URL = "https://ub-market.com";
const locales = ["en", "bg", "tr", "ro", "de", "ua"];
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  tr: "tr",
  ro: "ro",
  de: "de",
  ua: "uk",
};

function urlEntry(
  path: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const alternates = locales
    .map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflangMap[loc]}" href="${BASE_URL}/${loc}${path}"/>`,
    )
    .join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}"/>`;

  return `  <url>
    <loc>${BASE_URL}/en${path}</loc>
    <lastmod>${lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
${xDefault}
  </url>`;
}

export async function GET() {
  const now = new Date().toISOString();

  const staticPages = [
    urlEntry("", "monthly", "1.0", now),
    urlEntry("/about", "monthly", "0.8", now),
    urlEntry("/products", "weekly", "0.9", now),
    urlEntry("/contacts", "monthly", "0.7", now),
    urlEntry("/blog", "weekly", "0.8", now),
    urlEntry("/brands/star-food", "monthly", "0.8", now),
    urlEntry("/partners", "monthly", "0.7", now),
    urlEntry("/quote", "monthly", "0.7", now),
    urlEntry("/services/private-label", "monthly", "0.7", now),
  ];

  const productSlugs = [
    "sunflower-oil",
    "frying-oil",
    "sugar",
    "high-oleic-sunflower-oil",
    "dairy-products",
    "mayonnaise",
  ];
  const productPages = productSlugs.map((slug) =>
    urlEntry(`/products/${slug}`, "monthly", "0.7", now),
  );

  const blogPages = getPostSlugs().map((slug) => {
    const post = getPostBySlug(slug, "en");
    return urlEntry(
      `/blog/${slug}`,
      "monthly",
      "0.6",
      post?.date ? new Date(post.date).toISOString() : now,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticPages, ...productPages, ...blogPages].join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
