// src/components/SchemaOrg/index.tsx
// SERVER component — JSON-LD must be in server HTML, never via useEffect

const baseUrl = "https://ub-market.com";

export default function SchemaOrg({ locale }: { locale: string }) {
  const langCode = locale === "ua" ? "uk" : locale;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Star Food by UB Market",
    alternateName: "UB Market LTD",
    url: baseUrl,
    inLanguage: langCode,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,

    name: "UB Market",
    legalName: "U B MARKET LTD.",
    alternateName: [
      "UB Market LTD",
      "U B MARKET LTD.",
      "Ю Би Маркет",
      "Ю Би Маркет ЕООД",
      "Star Food",
    ],

    url: baseUrl,
    logo: `${baseUrl}/icons/logo-no-background.webp`,
    image: `${baseUrl}/og-image.jpg`,

    description:
      "EU-registered international food trading company specializing in wholesale sunflower oil, vegetable oils, and food commodities supply across Europe.",

    identifier: {
      "@type": "PropertyValue",
      propertyID: "EIK",
      value: "207067808",
    },
    vatID: "BG207067808",
    foundingDate: "2022-08-30",

    founder: {
      "@type": "Person",
      name: "Sergiy Kurichev",
      nationality: "UA",
      jobTitle: "Director",
    },

    address: {
      "@type": "PostalAddress",
      streetAddress: "Sirma Voyvoda Str. 1, vh. 1, et. 7, ap. 21",
      addressLocality: "Varna",
      addressRegion: "Primorski",
      postalCode: "9000",
      addressCountry: "BG",
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+359-8844-69860",
      contactType: "sales",
      email: "ubmarket2022@gmail.com",
      availableLanguage: [
        "English",
        "Bulgarian",
        "Ukrainian",
        "Turkish",
        "Romanian",
        "German",
        "Greek",
      ],
    },

    sameAs: [
      "https://www.instagram.com/ub_market_ltd",
      "https://t.me/ub_market_ltd",
      "https://www.linkedin.com/company/ub-market-ltd",
      "https://www.europages.co.uk/en/company/ub-market-ltd-22384280",
      "https://papagal.bg/eik/207067808/3830",
      "https://ensun.io/company/u-b-market-ltd-69f447f68657b15bb2dc7345",
      "https://app.usetorg.com/supplier-profile/u-b-market-ltd",
    ],

    knowsAbout: [
      "Sunflower oil wholesale",
      "Bulk vegetable oil trading",
      "Refined sunflower oil RBDW",
      "High-oleic sunflower oil",
      "Rapeseed oil wholesale",
      "Soybean oil wholesale",
      "Frying oil HoReCa",
      "Mayonnaise wholesale",
      "Beet sugar wholesale",
      "B2B food trading Europe",
      "FOB Black Sea shipping",
      "CIF delivery Europe",
      "Private label food production",
      "ISO 22000 food safety",
      "HACCP certification",
    ],

    areaServed: [
      "Bulgaria",
      "Germany",
      "Romania",
      "Turkey",
      "Greece",
      "Ukraine",
      "Czech Republic",
      "European Union",
    ],

    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 10,
    },

    additionalType: [
      "https://www.wikidata.org/wiki/Q1400827",
      "https://www.wikidata.org/wiki/Q768148",
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "UB Market Wholesale Food Products",
      url: "https://ub-market.com/en/products",
      numberOfItems: 8,
      itemListElement: [
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Sunflower Oil",
            description:
              "Refined RBDW and unrefined sunflower oil, bulk and packaged, ISO 22000 certified",
            url: "https://ub-market.com/en/products/sunflower-oil",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "High-Oleic Sunflower Oil",
            description:
              "High-oleic RBDW sunflower oil for HoReCa and premium food segment",
            url: "https://ub-market.com/en/products/high-oleic-sunflower-oil",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Rapeseed Oil (Canola)",
            description:
              "Refined and deodorized rapeseed oil for food manufacturing and wholesale",
            url: "https://ub-market.com/en/products/rapeseed-oil",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Soybean Oil",
            description:
              "Refined and deodorized soybean oil, wholesale supply for EU food manufacturers",
            url: "https://ub-market.com/en/products/soybean-oil",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Deep-Frying Oil",
            description:
              "Professional deep-frying oil for HoReCa, sunflower and high-oleic grades",
            url: "https://ub-market.com/en/products/frying-oil",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Mayonnaise and Ketchup",
            description:
              "Wholesale mayonnaise sauce 30% and 67% fat, ketchup, bulk buckets for food service",
            url: "https://ub-market.com/en/products/mayonnaise",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Milk UHT",
            description:
              "UHT long shelf life milk, Tetra Pak 1L, wholesale supply for EU distributors",
            url: "https://ub-market.com/en/products/dairy-products",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://ub-market.com/#organization" },
          businessFunction: "https://purl.org/goodrelations/v1#Sell",
          itemOffered: {
            "@type": "Product",
            name: "Beet Sugar",
            description:
              "Premium white beet sugar, 25kg and 50kg bags, 1000kg big bags, EU wholesale",
            url: "https://ub-market.com/en/products/sugar",
            brand: { "@id": "https://ub-market.com/#organization" },
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
