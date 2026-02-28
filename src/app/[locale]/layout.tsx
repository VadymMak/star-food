// src/app/[locale]/layout.tsx — Locale layout with next-intl
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import ChatWidget from "@/components/chat/ChatWidget";
import SchemaOrg from "@/components/SchemaOrg";
import SetHtmlLang from "@/components/SetHtmlLang";

// Generate static params for all locales (build time)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Dynamic metadata with hreflang
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://ub-market.com";

  // Hreflang codes (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en",
    bg: "bg",
    ua: "uk",
    tr: "tr",
    ro: "ro",
    de: "de",
  };

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${baseUrl}/${loc}`;
  }
  languages["x-default"] = `${baseUrl}/en`;

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load all translations for this locale (server-side)
  const messages = await getMessages();

  const htmlLang = locale === "ua" ? "uk" : locale;

  return (
    <>
      <SchemaOrg locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SetHtmlLang lang={htmlLang} />
        <div className="pageWrapper">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <ChatWidget />
        <WhatsAppButton />
        <CookieConsent />
      </NextIntlClientProvider>
    </>
  );
}
