import { notFound } from "next/navigation";
import { locales, hreflangCodes, isValidLocale } from "@/lib/locale";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import SchemaOrg from "@/components/SchemaOrg";
import SetHtmlLang from "@/components/SetHtmlLang";
import type { Locale } from "@/lib/locale";

// Generate static params for all locales (build time)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Dynamic metadata with hreflang
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://ub-market.com";

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangCodes[loc]] = `${baseUrl}/${loc}`;
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

  if (!isValidLocale(locale)) {
    notFound();
  }

  const htmlLang = locale === "ua" ? "uk" : locale;

  return (
    <>
      <SchemaOrg locale={locale} />
      <LanguageProvider locale={locale as Locale}>
        <SetHtmlLang lang={htmlLang} />
        <div className="pageWrapper">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <CookieConsent />
      </LanguageProvider>
    </>
  );
}
