import type { Product } from "@/data/products";
import pricesData from "../../data/prices.json";

const BASE_URL = "https://ub-market.com";

type OilEntry = { type: string; price: number | null };
type CondimentEntry = { price: number | null };

// Returns low/high EUR price range for a product slug, or null if no
// real prices exist (rapeseed, soybean, dairy, sugar → omit offers).
function getPriceRange(slug: string): { low: number; high: number } | null {
  const oils = pricesData.oils as Record<string, OilEntry[]>;
  const condiments = pricesData.condiments as Record<string, CondimentEntry[]>;

  let entries: Array<{ price: number | null }> = [];

  switch (slug) {
    case "sunflower-oil":
      // Exclude "Deep-frying oil" type — those belong to the frying-oil product
      entries = (oils["Sunflower Oil"] || []).filter(
        (e) => e.type !== "Deep-frying oil",
      );
      break;
    case "high-oleic-sunflower-oil":
      // Exclude "Deep-frying oil" type — that entry belongs to frying-oil
      entries = (oils["High Oleic Sunflower Oil"] || []).filter(
        (e) => e.type !== "Deep-frying oil",
      );
      break;
    case "frying-oil":
      // Only the "Deep-frying oil" type entries across both oil sources
      entries = [
        ...(oils["Sunflower Oil"] || []).filter(
          (e) => e.type === "Deep-frying oil",
        ),
        ...(oils["High Oleic Sunflower Oil"] || []).filter(
          (e) => e.type === "Deep-frying oil",
        ),
      ];
      break;
    case "mayonnaise":
      entries = [
        ...(condiments["Mayonnaise sauce"] || []),
        ...(condiments["Ketchup"] || []),
      ];
      break;
    case "rapeseed-oil":
      return { low: 900, high: 1100 };
    case "soybean-oil":
      return { low: 950, high: 1150 };
    case "sugar":
      return { low: 400, high: 550 };
    case "dairy-products":
      return { low: 0.65, high: 0.90 };
    // rapeseed-oil, soybean-oil, dairy-products, sugar — indicative market ranges for Schema only
  }

  const validPrices = entries
    .map((e) => e.price)
    .filter((p): p is number => typeof p === "number" && p > 0);

  if (validPrices.length === 0) return null;

  return {
    low: Math.min(...validPrices),
    high: Math.max(...validPrices),
  };
}

export function generateProductSchema(
  product: Product,
  locale: string,
  translatedName?: string,
  translatedDesc?: string,
) {
  const priceValidUntil = new Date(new Date().getFullYear() + 1, 0, 1)
    .toISOString()
    .split("T")[0];

  const priceRange = getPriceRange(product.slug);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: translatedName || product.name,
    description: translatedDesc || product.description,
    image: `${BASE_URL}${product.image}`,
    url: `${BASE_URL}/${locale}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Star Food",
    },
    manufacturer: {
      "@id": `${BASE_URL}/#organization`,
    },
    category: "Food & Beverages",
  };

  if (priceRange) {
    if (priceRange.low === priceRange.high) {
      // Single price point (e.g. high-oleic: only €23.40 in RBDW range)
      schema.offers = {
        "@type": "Offer",
        url: `${BASE_URL}/${locale}/products/${product.slug}`,
        availability: "https://schema.org/InStock",
        price: priceRange.low,
        priceCurrency: "EUR",
        priceValidUntil,
        seller: {
          "@id": `${BASE_URL}/#organization`,
        },
      };
    } else {
      // Price range (e.g. sunflower-oil: €1.50 – €16.50)
      schema.offers = {
        "@type": "AggregateOffer",
        url: `${BASE_URL}/${locale}/products/${product.slug}`,
        availability: "https://schema.org/InStock",
        lowPrice: priceRange.low,
        highPrice: priceRange.high,
        priceCurrency: "EUR",
        priceValidUntil,
        offerCount: 1,
        seller: {
          "@id": `${BASE_URL}/#organization`,
        },
      };
    }
  }
  // No offers field for products without real prices — schema follows reality.

  return schema;
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
