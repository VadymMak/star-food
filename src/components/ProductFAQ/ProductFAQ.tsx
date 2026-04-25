"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ProductFAQ.module.css";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  productSlug: string;
}

export default function ProductFAQ({ productSlug }: Props) {
  const t = useTranslations("productFAQ");
  const [open, setOpen] = useState<number | null>(0);

  const allItems = t.raw("items") as Record<string, FAQItem[]>;
  const items = allItems?.[productSlug];

  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className={styles.faq}>
        <div className={styles.inner}>
          <h2 className={styles.title}>{t("title")}</h2>
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li
                key={i}
                className={`${styles.item}${open === i ? ` ${styles.itemOpen}` : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {item.q}
                  <span className={styles.icon} aria-hidden="true">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                <div className={styles.answer}>
                  <p>{item.a}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
