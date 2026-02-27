"use client";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

const FLAGS: Record<string, string> = {
  en: "🇬🇧",
  bg: "🇧🇬",
  tr: "🇹🇷",
  ro: "🇷🇴",
  de: "🇩🇪",
  ua: "🇺🇦",
};

const LABELS: Record<string, string> = {
  en: "English",
  bg: "Български",
  tr: "Türkçe",
  ro: "Română",
  de: "Deutsch",
  ua: "Українська",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSwitch = (newLocale: Locale) => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        className={styles.trigger}
        aria-label="Change language"
        onClick={() => setOpen(!open)}
      >
        <span className={styles.flag}>{FLAGS[locale]}</span>
        <span className={styles.code}>{locale.toUpperCase()}</span>
        <span className={`${styles.arrow} ${open ? styles.arrowUp : ""}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className={styles.dropdown}>
          {routing.locales.map((loc) => (
            <button
              key={loc}
              className={`${styles.option} ${loc === locale ? styles.active : ""}`}
              onClick={() => handleSwitch(loc)}
            >
              <span className={styles.flag}>{FLAGS[loc]}</span>
              <span className={styles.langName}>{LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
