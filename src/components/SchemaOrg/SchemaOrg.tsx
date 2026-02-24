"use client";

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
