"use client";

// src/components/FAQ/FAQ.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./FAQ.module.css";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(0);

  const items: FAQItem[] = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
  ];

  // FAQPage JSON-LD schema — Google читает это и показывает в выдаче
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className={styles.faq}>
      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t("eyebrow")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.list}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={styles.icon}>{open === i ? "−" : "+"}</span>
              </button>
              <div className={styles.answer}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
