// src/context/LanguageContext.tsx — URL-based locale routing
// t = translations OBJECT (backward compatible: t.hero.badge works)
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { locales, defaultLocale } from "@/lib/locale";
import enTranslations from "@/i18n/en.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Translations = Record<string, any>;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  translate: (key: string) => string;
  switchLocale: (newLocale: Locale) => void;
  availableLocales: readonly Locale[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translationCache: Partial<Record<Locale, Translations>> = {};

async function loadTranslations(locale: Locale): Promise<Translations> {
  if (translationCache[locale]) {
    return translationCache[locale]!;
  }
  try {
    const module = await import(`@/i18n/${locale}.json`);
    translationCache[locale] = module.default;
    return module.default;
  } catch {
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale);
    }
    return enTranslations;
  }
}

export function LanguageProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Default to English translations — prevents t.hero.badge crash on first render
  const [translations, setTranslations] =
    useState<Translations>(enTranslations);
  const [availableLocales, setAvailableLocales] =
    useState<readonly Locale[]>(locales);

  useEffect(() => {
    loadTranslations(locale).then(setTranslations);
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
