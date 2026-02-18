// src/lib/locale.ts — Locale configuration for star-food

export const locales = ["en", "bg", "ua", "tr", "ro", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Locale display names (in their own language)
export const localeNames: Record<Locale, string> = {
  en: "English",
  bg: "Български",
  ua: "Українська",
  tr: "Türkçe",
  ro: "Română",
  de: "Deutsch",
};

// Flag emojis for language switcher
export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  bg: "🇧🇬",
  ua: "🇺🇦",
  tr: "🇹🇷",
  ro: "🇷🇴",
  de: "🇩🇪",
};

// Map browser language codes to our locales
const browserLangMap: Record<string, Locale> = {
  en: "en",
  bg: "bg",
  uk: "ua", // Ukrainian ISO code is "uk"
  ua: "ua",
  tr: "tr",
  ro: "ro",
  de: "de",
};

// Hreflang codes (ISO standard — "uk" for Ukrainian, not "ua")
export const hreflangCodes: Record<Locale, string> = {
  en: "en",
  bg: "bg",
  ua: "uk", // ISO 639-1 for Ukrainian
  tr: "tr",
  ro: "ro",
  de: "de",
};

/**
 * Detect best locale from browser Accept-Language header
 */
export function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language: "en-US,en;q=0.9,tr;q=0.8"
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return {
        code: code.split("-")[0].toLowerCase(), // "en-US" → "en"
        quality: q ? parseFloat(q) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const lang of languages) {
    const mapped = browserLangMap[lang.code];
    if (mapped) return mapped;
  }

  return defaultLocale;
}

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Get locale from URL pathname
 * "/en/about" → "en"
 * "/tr/products" → "tr"
 * "/unknown/page" → null
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  if (segment && isValidLocale(segment)) {
    return segment;
  }
  return null;
}
