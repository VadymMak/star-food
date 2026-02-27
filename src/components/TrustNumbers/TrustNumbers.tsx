"use client";

import { useTranslations } from "next-intl";
import styles from "./TrustNumbers.module.css";

export default function TrustNumbers() {
  const t = useTranslations();
const stats = [
    { number: "3+", label: t("trust.years") },
    { number: "12+", label: t("trust.countries") },
    { number: "500+", label: t("trust.tons") },
    { number: "50+", label: t("trust.partners") },
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
