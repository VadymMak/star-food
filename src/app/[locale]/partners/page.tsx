import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PartnersPageClient from "./PartnersPageClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://ub-market.com";

  let title = "Become a Partner | Star Food Distribution Opportunities";
  let description = "Join Star Food distribution network. Competitive prices, flexible MOQ, dedicated support for distributors across Europe.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("partnersTitle");
    description = t("partnersDescription");
  } catch {
    // Use fallback values
  }

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/partners`;
  }
  languages["x-default"] = `${baseUrl}/en/partners`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}/partners`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/partners`,
      siteName: "Star Food — UB Market",
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function PartnersPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersPageClient />;
}
