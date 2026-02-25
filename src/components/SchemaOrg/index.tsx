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
    name: "UB Market LTD",
    alternateName: "Star Food",
    url: baseUrl,
    logo: `${baseUrl}/icons/logo-no-background.webp`,
    image: `${baseUrl}/og-image.jpg`,
    description:
      "EU-registered international food trading company specializing in sunflower oil export and import.",
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
      email: "ubmarket2022@gmail.com",
      availableLanguage: [
        "English",
        "Bulgarian",
        "Ukrainian",
        "Turkish",
        "Romanian",
        "German",
      ],
    },
    sameAs: [
      "https://www.instagram.com/ub_market_ltd",
      "https://t.me/ub_market_ltd",
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
