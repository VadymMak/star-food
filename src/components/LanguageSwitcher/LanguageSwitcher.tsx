"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, langLabels, Lang } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";

/* Inline SVG flags */
const flags: Record<Lang, React.ReactNode> = {
  en: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="12">
      <clipPath id="en"><path d="M0 0v30h60V0z"/></clipPath>
      <g clipPath="url(#en)">
        <path fill="#012169" d="M0 0v30h60V0z"/>
        <path stroke="#fff" strokeWidth="6" d="M0 0l60 30m0-30L0 30"/>
        <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30m0-30L0 30" clipPath="url(#en)"/>
        <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/>
        <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60"/>
      </g>
    </svg>
  ),
  bg: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="20" height="12">
      <rect width="5" height="1" fill="#fff"/>
      <rect width="5" height="1" y="1" fill="#00966E"/>
      <rect width="5" height="1" y="2" fill="#D62612"/>
    </svg>
  ),
  ua: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3" width="20" height="12">
      <rect width="4" height="1.5" fill="#005BBB"/>
      <rect width="4" height="1.5" y="1.5" fill="#FFD500"/>
    </svg>
  ),
};

export default function LanguageSwitcher() {
  const { lang, setLang, availableLangs } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = langLabels[lang];

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        <span className={styles.flag}>{flags[lang]}</span>
        {current.label}
      </button>

      {open && (
        <div className={styles.dropdown}>
          {availableLangs.map((l) => (
            <button
              key={l}
              className={`${styles.option} ${l === lang ? styles.active : ""}`}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
            >
              <span className={styles.flag}>{flags[l]}</span>
              {langLabels[l].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}