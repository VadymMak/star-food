"use client";

import Link from "next/link";
import { FaEnvelope, FaBoxOpen } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.badge}>{t.hero.badge}</span>
        <h1 className={styles.title}>
          {t.hero.title1}{" "}
          <span className={styles.gold}>{t.hero.titleHighlight}</span>{" "}
          {t.hero.title2}
        </h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <Link href="/contacts" className="btn btn-primary">
            <FaEnvelope /> {t.hero.cta1}
          </Link>
          <Link href="/products" className="btn btn-outline">
            <FaBoxOpen /> {t.hero.cta2}
          </Link>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}