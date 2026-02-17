"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";

import en from "@/i18n/en.json";
import bg from "@/i18n/bg.json";
import ua from "@/i18n/ua.json";

export type Lang = "en" | "bg" | "ua";

const translations: Record<Lang, typeof en> = { en, bg, ua };

export const langLabels: Record<Lang, { label: string }> = {
  en: { label: "EN" },
  bg: { label: "BG" },
  ua: { label: "UA" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof en;
  availableLangs: Lang[];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: en,
  availableLangs: ["en", "bg"],
});

function readSavedLang(): Lang {
  try {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && translations[saved]) return saved;
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "bg") return "bg";
    if (browserLang === "uk") return "ua";
  } catch {
    // localStorage may be blocked
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangRaw] = useState<Lang>("en");
  const [availableLangs, setAvailableLangs] = useState<Lang[]>(["en", "bg"]);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    // Detect country and set available languages
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        const data = await res.json();
        const country = data.country_code;

        if (country === "UA") {
          // Users in Ukraine see EN, BG, UA
          setAvailableLangs(["en", "bg", "ua"]);
        } else {
          // Rest of world sees only EN, BG
          setAvailableLangs(["en", "bg"]);
        }
      } catch {
        // On error, default to EN + BG only
        setAvailableLangs(["en", "bg"]);
      }
    };

    // Set saved language
    const saved = readSavedLang();
    // If saved lang is UA but user is not in Ukraine, it will be overridden below
    setLangRaw(saved);

    detectCountry().then(() => {
      // After geo check, if current lang is UA but not available, reset to EN
      setLangRaw((current) => {
        if (current === "ua") {
          // Will be checked against availableLangs in next render
          return current;
        }
        return current;
      });
    });
  }, []);

  // If lang is not in available list, reset to EN
  useEffect(() => {
    if (!availableLangs.includes(lang)) {
      setLangRaw("en");
      try { localStorage.setItem("lang", "en"); } catch { /* ignore */ }
    }
  }, [availableLangs, lang]);

  const setLang = useCallback((l: Lang) => {
    setLangRaw(l);
    try { localStorage.setItem("lang", l); } catch { /* ignore */ }
  }, []);

  const t = translations[lang] || en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, availableLangs }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}