// src/components/LanguageSwitcher/LanguageSwitcher.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { localeNames, localeFlags } from "@/lib/locale";
import type { Locale } from "@/lib/locale";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale, switchLocale, availableLocales } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    if (newLocale !== locale) {
      switchLocale(newLocale);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.switcher} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className={styles.flag}>{localeFlags[locale]}</span>
        <span className={styles.code}>{locale.toUpperCase()}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {availableLocales.map((loc) => (
            <button
              key={loc}
              className={`${styles.option} ${
                loc === locale ? styles.active : ""
              }`}
              onClick={() => handleSelect(loc)}
            >
              <span className={styles.flag}>{localeFlags[loc]}</span>
              <span className={styles.langName}>{localeNames[loc]}</span>
              <span className={styles.langCode}>{loc.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
