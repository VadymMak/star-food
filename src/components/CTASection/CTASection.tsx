"use client";

import { useTranslations } from "next-intl";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "./CTASection.module.css";

export default function CTASection() {
  const t = useTranslations();
return (
    <section className={styles.cta}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className="section-label">{t("cta.label")}</span>
        <h2
          className="section-title"
          style={{ fontFamily: "var(--font-display)", maxWidth: 700, margin: "0 auto 20px" }}
        >
          {t("cta.title")}
        </h2>
        <p className={styles.text}>{t("cta.subtitle")}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <a href="mailto:ubmarket2022@gmail.com" className="btn btn-primary">
            <FaEnvelope /> {t("cta.cta1")}
          </a>
          <a href="tel:+359884469860" className="btn btn-outline">
            <FaPhone /> {t("cta.cta2")}
          </a>
        </div>
      </div>
    </section>
  );
}
