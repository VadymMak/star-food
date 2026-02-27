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

export default async function PartnersPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersPageClient />;
}
