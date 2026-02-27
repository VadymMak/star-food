import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AboutPageClient from "./AboutPageClient";

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

  let title = "About UB Market LTD | EU Food Trading Company Bulgaria";
  let description = "International food trading company specializing in sunflower oil export/import. EU-registered, based in Varna, Bulgaria.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("aboutTitle");
    description = t("aboutDescription");
  } catch {
    // Use fallback values
  }

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/about`;
  }
  languages["x-default"] = `${baseUrl}/en/about`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}/about`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/about`,
      siteName: "Star Food — UB Market",
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function AboutPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageClient />;
}
