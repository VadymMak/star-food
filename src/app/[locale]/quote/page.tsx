import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import QuotePageClient from "./QuotePageClient";

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

  let title = "Request a Quote | Wholesale Food Products — UB Market";
  let description = "Get competitive wholesale prices for sunflower oil and food products. Free quote, no obligation.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("quoteTitle");
    description = t("quoteDescription");
  } catch {
    // Use fallback values
  }

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/quote`;
  }
  languages["x-default"] = `${baseUrl}/en/quote`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}/quote`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/quote`,
      siteName: "Star Food — UB Market",
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function QuotePagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <QuotePageClient />;
}
