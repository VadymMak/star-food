// src/components/CookieConsent/CookieConsent.tsx
"use client";

import { useLocale } from "next-intl";

import { useState, useEffect } from "react";
import Script from "next/script";
import styles from "./CookieConsent.module.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

const translations: Record<
  string,
  { message: string; accept: string; decline: string }
> = {
  en: {
    message:
      "We use cookies to analyze site traffic and improve your experience. No personal data is shared with third parties.",
    accept: "Accept",
    decline: "Decline",
  },
  bg: {
    message:
      "Използваме бисквитки за анализ на трафика и подобряване на вашето изживяване. Лични данни не се споделят с трети страни.",
    accept: "Приемам",
    decline: "Отказвам",
  },
  tr: {
    message:
      "Site trafiğini analiz etmek ve deneyiminizi iyileştirmek için çerezler kullanıyoruz. Kişisel veriler üçüncü taraflarla paylaşılmaz.",
    accept: "Kabul Et",
    decline: "Reddet",
  },
  ro: {
    message:
      "Folosim cookie-uri pentru a analiza traficul și a îmbunătăți experiența dvs. Datele personale nu sunt partajate cu terți.",
    accept: "Accept",
    decline: "Refuz",
  },
  de: {
    message:
      "Wir verwenden Cookies zur Analyse des Datenverkehrs und zur Verbesserung Ihrer Erfahrung. Personenbezogene Daten werden nicht an Dritte weitergegeben.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
  },
  ua: {
    message:
      "Ми використовуємо cookie для аналізу трафіку та покращення вашого досвіду. Персональні дані не передаються третім особам.",
    accept: "Прийняти",
    decline: "Відхилити",
  },
};

export default function CookieConsent() {
  const locale = useLocale();
  const [consent, setConsent] = useState<"pending" | "accepted" | "declined">(
    "pending",
  );
  const [visible, setVisible] = useState(false);

  const t = translations[locale] || translations.en;

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved === "accepted") {
      setConsent("accepted");
    } else if (saved === "declined") {
      setConsent("declined");
    } else {
      // Show banner after short delay (less intrusive)
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {/* GA4 — loads ONLY after consent */}
      {consent === "accepted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Cookie banner */}
      {visible && (
        <div className={styles.banner}>
          <div className={styles.inner}>
            <p className={styles.message}>{t.message}</p>
            <div className={styles.buttons}>
              <button className={styles.decline} onClick={handleDecline}>
                {t.decline}
              </button>
              <button className={styles.accept} onClick={handleAccept}>
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
