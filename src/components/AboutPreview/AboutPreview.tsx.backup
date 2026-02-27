"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  const { locale, t } = useLanguage();
  const ap = t?.aboutPreview || {};

  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-us.webp"
              alt="Sunflower oil production facility"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.text}>
            <span className="section-label">{ap.label || "About Us"}</span>
            <h2
              className="section-title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {ap.title || "Your Trusted Partner in Food Export & Import"}
            </h2>
            <p className={styles.desc}>{ap.p1}</p>
            <p className={styles.desc}>{ap.p2}</p>

            <div className={styles.features}>
              {(ap.features || []).map((f: string) => (
                <div key={f} className={styles.feature}>
                  <FaCheckCircle className={styles.featureIcon} />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/about`}
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              {ap.cta || "Learn More About UB Market"} <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
