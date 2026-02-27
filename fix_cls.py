"""
CLS Fix: Synchronous translations
RUN FROM star-food PROJECT ROOT:
  python fix_cls.py

Root cause: LanguageContext starts with EN translations, then async loads
the correct locale → text changes → CLS 0.200

Fix: Import ALL translation files statically, pick correct one immediately.
No async loading = no text swap = zero CLS from translations.

Also removes stale .content block from Header CSS.
"""

import os

# ============================================================
# FIX: LanguageContext — synchronous translations
# ============================================================
language_context = '''\
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
'''

# ============================================================
# FIX: Remove stale .content block from Header CSS
# ============================================================
header_css_path = "src/components/Header/Header.module.css"

# ============================================================
# WRITE FILES
# ============================================================

# 1. LanguageContext
path = "src/context/LanguageContext.tsx"
os.makedirs(os.path.dirname(path), exist_ok=True)
with open(path, "w", encoding="utf-8") as f:
    f.write(language_context)
print(f"✅ Fixed: {path}")

# 2. Remove stale .content block from Header CSS
if os.path.exists(header_css_path):
    with open(header_css_path, "r", encoding="utf-8") as f:
        css = f.read()

    # Remove the misplaced .content block (belongs to Hero, not Header)
    stale_block = """.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 80px 20px 0;
  animation: fadeUp 1s ease-out;
}"""

    if stale_block in css:
        css = css.replace(stale_block, "")
        # Clean up double blank lines
        while "\n\n\n" in css:
            css = css.replace("\n\n\n", "\n\n")
        with open(header_css_path, "w", encoding="utf-8") as f:
            f.write(css)
        print(f"✅ Cleaned: {header_css_path} (removed stale .content block)")
    else:
        print(f"ℹ️  {header_css_path} — stale block not found (already clean)")

print()
print("✅ CLS fix applied!")
print()
print("What changed:")
print("  LanguageContext: async import() → static import")
print("  Translations load SYNCHRONOUSLY from first render")
print("  No EN→UA text swap = zero CLS from translations")
print("  Header CSS: removed orphaned .content block")
print()
print("Expected: CLS 0.202 → ~0.002 (only font shift remains)")
print()
print("Deploy:")
print("  git add . && git commit -m 'perf: sync translations, fix CLS 0.202' && git push")
print("  Test on PRODUCTION /ua page in incognito!")
