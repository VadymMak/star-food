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

export default async function StarFoodBrandPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StarFoodBrandPageClient />;
}
