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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
