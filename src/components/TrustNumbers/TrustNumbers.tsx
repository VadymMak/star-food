"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./TrustNumbers.module.css";

export default function TrustNumbers() {
  const { t } = useLanguage();
  const tr = t?.trust || {};

  const stats = [
    { number: "3+", label: tr.years || "Years in Business" },
    { number: "12+", label: tr.countries || "Countries Served" },
    { number: "500+", label: tr.tons || "Tons Delivered" },
    { number: "50+", label: tr.partners || "Partner Companies" },
  ];

  return (
    <section className={styles.trust}>
      <div className={styles.grid}>
        {stats.map((item) => (
          <div key={item.label} className={styles.item}>
            <div className={styles.number}>{item.number}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
