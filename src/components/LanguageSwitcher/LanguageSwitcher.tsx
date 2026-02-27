"use client";

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

  const handleSwitch = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={styles.switcher}>
      <button className={styles.current} aria-label="Change language">
        {FLAGS[locale] || "🌐"} {locale.toUpperCase()}
      </button>
      <div className={styles.dropdown}>
        {routing.locales.map((loc) => (
          <button
            key={loc}
            className={`${styles.option} ${loc === locale ? styles.active : ""}`}
            onClick={() => handleSwitch(loc)}
          >
            {FLAGS[loc]} {LABELS[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
