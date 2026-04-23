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
      url: `${BASE_URL}/${locale}/products/${product.slug}`,
      availability: "https://schema.org/InStock",
      price: 0,
      priceCurrency: "EUR",
      priceValidUntil: new Date(new Date().getFullYear() + 1, 0, 1)
        .toISOString()
        .split("T")[0],
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

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "UB Market LTD",
    "alternateName": "Star Food",
    "url": "https://ub-market.com",
    "logo": "https://ub-market.com/icons/logo.webp",
    "email": "ubmarket2022@gmail.com",
    "telephone": "+359884469860",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sirma Voivoda St., b.1, ap. 21",
      "addressLocality": "Varna",
      "postalCode": "9010",
      "addressCountry": "BG"
    },
    "sameAs": [
      "https://www.linkedin.com/company/ub-market-ltd",
      "https://www.europages.co.uk/en/company/ub-market-ltd-22384280",
      "https://www.instagram.com/ub_market_ltd"
    ],
    "foundingLocation": {
      "@type": "Place",
      "name": "Varna, Bulgaria"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Europe"
    },
    "knowsAbout": [
      "Sunflower Oil Wholesale",
      "Vegetable Oil Trading",
      "Food Commodities Europe",
      "B2B Food Supply"
    ]
  };
}
