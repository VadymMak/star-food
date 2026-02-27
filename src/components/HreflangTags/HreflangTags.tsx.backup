"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const BASE_URL = "https://ub-market.com";

const locales = ["en", "bg", "tr", "ro", "de", "ua"];

// ISO 639-1: Ukrainian = "uk", not "ua"
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  tr: "tr",
  ro: "ro",
  de: "de",
  ua: "uk",
};

export default function HreflangTags() {
  const pathname = usePathname();
  const { locale } = useLanguage();

  // Remove current locale prefix to get clean path
  const cleanPath = pathname.replace(/^\/(en|bg|tr|ro|de|ua)/, "") || "/";

  return (
    <>
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={hreflangMap[loc]}
          href={`${BASE_URL}/${loc}${cleanPath === "/" ? "" : cleanPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${cleanPath === "/" ? "" : cleanPath}`}
      />
      <link
        rel="canonical"
        href={`${BASE_URL}/${locale}${cleanPath === "/" ? "" : cleanPath}`}
      />
    </>
  );
}
