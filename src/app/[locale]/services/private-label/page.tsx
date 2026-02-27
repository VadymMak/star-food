import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PrivateLabelPageClient from "./PrivateLabelPageClient";

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

  let title = "Private Label Sunflower Oil | Your Brand, Our Quality";
  let description = "Private label and white label sunflower oil production. Custom packaging, EU-certified quality.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("privateLabelTitle");
    description = t("privateLabelDescription");
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

export default async function PrivateLabelPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivateLabelPageClient />;
}
