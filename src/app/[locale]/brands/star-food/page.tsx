import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import StarFoodBrandPageClient from "./StarFoodBrandPageClient";

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

  let title = "Star Food — Our Registered Trademark | Premium Sunflower Oil";
  let description = "Star Food is a registered EU trademark for premium sunflower oil and food products by UB Market LTD.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("brandTitle");
    description = t("brandDescription");
  } catch {
    // Use fallback values
  }

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/brands/star-food`;
  }
  languages["x-default"] = `${baseUrl}/en/brands/star-food`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}/brands/star-food`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/brands/star-food`,
      siteName: "Star Food — UB Market",
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function StarFoodBrandPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StarFoodBrandPageClient />;
}
