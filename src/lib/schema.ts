// src/lib/schema.ts — Schema.org JSON-LD generators

import type { Product } from "@/data/products";

const BASE_URL = "https://ub-market.com";

export function generateProductSchema(product: Product, locale: string, translatedName?: string, translatedDesc?: string) {
  return {
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
      "@type": "Organization",
      name: "UB Market LTD",
      url: BASE_URL,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "UB Market LTD",
      },
    },
    category: "Food & Beverages",
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
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
