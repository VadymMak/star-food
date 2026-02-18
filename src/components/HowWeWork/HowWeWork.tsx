"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./HowWeWork.module.css";

export default function HowWeWork() {
  const { t } = useLanguage();
  const hw = t?.howWeWork || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{hw.label || "How We Work"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {hw.title || "Simple Process, Reliable Results"}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {hw.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {(hw.steps || []).map((step: { title: string; text: string }, i: number) => (
            <div key={i} className={styles.step}>
              <div className={styles.number}>{i + 1}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
