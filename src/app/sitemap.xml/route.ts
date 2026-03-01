// src/app/sitemap.xml/route.ts — Full XML sitemap with hreflang
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

function urlEntries(
  path: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const mod = lastmod || new Date().toISOString();

  const alternates = locales
    .map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflangMap[loc]}" href="${BASE_URL}/${loc}${path}"/>`,
    )
    .join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}"/>`;
  const allAlternates = `${alternates}\n${xDefault}`;

  // Generate one <url> per locale, each with ALL alternates
  return locales
    .map(
      (loc) => `  <url>
    <loc>${BASE_URL}/${loc}${path}</loc>
    <lastmod>${mod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${allAlternates}
  </url>`,
    )
    .join("\n");
}

export async function GET() {
  const now = new Date().toISOString();

  const staticPages = [
    urlEntries("", "monthly", "1.0", now),
    urlEntries("/about", "monthly", "0.8", now),
    urlEntries("/products", "weekly", "0.9", now),
    urlEntries("/contacts", "monthly", "0.7", now),
    urlEntries("/blog", "weekly", "0.8", now),
    urlEntries("/brands/star-food", "monthly", "0.8", now),
    urlEntries("/partners", "monthly", "0.7", now),
    urlEntries("/quote", "monthly", "0.7", now),
    urlEntries("/services/private-label", "monthly", "0.7", now),
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
    urlEntries(`/products/${slug}`, "monthly", "0.7", now),
  );

  const blogPages = getPostSlugs().map((slug) => {
    const post = getPostBySlug(slug, "en");
    return urlEntries(
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
