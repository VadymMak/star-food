"use client";

import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./CTASection.module.css";

export default function CTASection() {
  const { t } = useLanguage();
  const c = t?.cta || {};

  return (
    <section className={styles.cta}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className="section-label">{c.label || "Let's Work Together"}</span>
        <h2
          className="section-title"
          style={{ fontFamily: "var(--font-display)", maxWidth: 700, margin: "0 auto 20px" }}
        >
          {c.title || "Ready to Source Quality Food Products?"}
        </h2>
        <p className={styles.text}>{c.subtitle}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <a href="mailto:ubmarket2022@gmail.com" className="btn btn-primary">
            <FaEnvelope /> {c.cta1 || "Request a Quote"}
          </a>
          <a href="tel:+359884469860" className="btn btn-outline">
            <FaPhone /> {c.cta2 || "Call Us Now"}
          </a>
        </div>
      </div>
    </section>
  );
}
