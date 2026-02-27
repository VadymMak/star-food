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

export default async function ContactsPagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactsPageClient />;
}
