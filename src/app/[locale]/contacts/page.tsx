import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ContactsPageClient from "./ContactsPageClient";

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

  let title = "Contact Us | UB Market LTD — Get a Quote";
  let description = "Contact UB Market for wholesale food product inquiries. Office in Varna, Bulgaria. Quick response guaranteed.";

  try {
    const t = await getTranslations({ locale, namespace: "meta" });
    title = t("contactsTitle");
    description = t("contactsDescription");
  } catch {
    // Use fallback values
  }

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}/contacts`;
  }
  languages["x-default"] = `${baseUrl}/en/contacts`;

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}/contacts`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/contacts`,
      siteName: "Star Food — UB Market",
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function ContactsPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactsPageClient />;
}
