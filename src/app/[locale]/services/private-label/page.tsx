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

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/services/private-label`;
  }
  languages["x-default"] = `${baseUrl}/en/services/private-label`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}/services/private-label`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/services/private-label`,
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
