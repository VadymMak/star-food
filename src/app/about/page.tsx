"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaGlobeEurope,
  FaHandshake,
  FaTruck,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./about.module.css";

const valueIcons = [FaGlobeEurope, FaHandshake, FaTruck, FaShieldAlt];

export default function AboutPage() {
  const { t } = useLanguage();
  const ap = t.aboutPage;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{ap.label}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {ap.heroTitle}
          </h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid2col}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-us.webp"
              alt="UB Market warehouse and operations"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
              {ap.whoWeAre}
            </h2>
            <p className={styles.text}>{ap.whoP1}</p>
            <p className={styles.text}>{ap.whoP2}</p>
            <p className={styles.text}>{ap.whoP3}</p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <div className={styles.headerCenter}>
            <span className="section-label">{ap.whyLabel}</span>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
              {ap.whyTitle}
            </h2>
          </div>
          <div className={styles.grid4col}>
            {ap.values.map((v: { title: string; text: string }, i: number) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className={styles.valueCard}>
                  <div className={styles.valueIcon}><Icon /></div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.headerCenter}>
          <span className="section-label">{ap.rangeLabel}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {ap.rangeTitle}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 40px" }}>
            {ap.rangeSubtitle}
          </p>
        </div>
        <div className={styles.productList}>
          {ap.productList.map((p: string) => (
            <div key={p} className={styles.productItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {ap.ctaTitle}
          </h2>
          <p className={styles.ctaText}>{ap.ctaText}</p>
          <Link href="/contacts" className="btn btn-primary">
            <FaEnvelope /> {ap.ctaCta}
          </Link>
        </div>
      </section>
    </>
  );
}