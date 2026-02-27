// DEPRECATED: This file is no longer used after next-intl migration.
// All components now use useTranslations() from "next-intl".
// Safe to delete after verifying everything works.

// src/context/LanguageContext.tsx — Synchronous translations (zero CLS)
"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { locales, defaultLocale } from "@/lib/locale";

// Static imports — all loaded at bundle time, no async swap
import en from "@/i18n/en.json";
import bg from "@/i18n/bg.json";
import ua from "@/i18n/ua.json";
import tr from "@/i18n/tr.json";
import ro from "@/i18n/ro.json";
import de from "@/i18n/de.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Translations = Record<string, any>;

const allTranslations: Record<string, Translations> = { en, bg, ua, tr, ro, de };

function getTranslations(locale: Locale): Translations {
  return allTranslations[locale] || allTranslations[defaultLocale] || en;
}

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  translate: (key: string) => string;
  switchLocale: (newLocale: Locale) => void;
  availableLocales: readonly Locale[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // SYNCHRONOUS: correct translations from first render — zero CLS
  const [translations, setTranslations] = useState<Translations>(
    () => getTranslations(locale)
  );
  const [availableLocales, setAvailableLocales] =
    useState<readonly Locale[]>(locales);

  // Update translations when locale changes (e.g. language switcher)
  useEffect(() => {
    setTranslations(getTranslations(locale));
  }, [locale]);

  useEffect(() => {
    setAvailableLocales(locales);
  }, []);

  const translate = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: unknown = translations;
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof value === "string" ? value : key;
    },
    [translations],
  );

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      const currentLocalePrefix = `/${locale}`;
      let newPath: string;
      if (pathname.startsWith(currentLocalePrefix)) {
        newPath = pathname.replace(currentLocalePrefix, `/${newLocale}`);
      } else {
        newPath = `/${newLocale}${pathname}`;
      }
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 30}`;
      router.push(newPath);
    },
    [locale, pathname, router],
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: translations,
        translate,
        switchLocale,
        availableLocales,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
