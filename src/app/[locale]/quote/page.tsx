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

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
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
