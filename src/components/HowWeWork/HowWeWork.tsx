"use client";

import { useTranslations } from "next-intl";
import styles from "./HowWeWork.module.css";

export default function HowWeWork() {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{t("howWeWork.label")}</span>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("howWeWork.title")}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {t("howWeWork.subtitle")}
          </p>
        </div>

        <div className={styles.grid}>
          {(t.raw("howWeWork.steps") as { title: string; text: string }[]).map(
            (step, i: number) => (
              <div key={i} className={styles.step}>
                <div className={styles.number}>{i + 1}</div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
