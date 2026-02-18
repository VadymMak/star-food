"use client";

import Link from "next/link";
import { FaEnvelope, FaBoxOpen } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

export default function Hero() {
  const { locale, t } = useLanguage();
  const h = t?.hero || {};

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.badge}>{h.badge || "International Food Trading"}</span>
        <h1 className={styles.title}>
          {h.title1 || "Premium"}{" "}
          <span className={styles.gold}>{h.titleHighlight || "Sunflower Oil"}</span>{" "}
          {h.title2 || "& Food Products for Europe"}
        </h1>
        <p className={styles.subtitle}>{h.subtitle}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <Link href={`/${locale}/contacts`} className="btn btn-primary">
            <FaEnvelope /> {h.cta1 || "Request a Quote"}
          </Link>
          <Link href={`/${locale}/products`} className="btn btn-outline">
            <FaBoxOpen /> {h.cta2 || "View Products"}
          </Link>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}
