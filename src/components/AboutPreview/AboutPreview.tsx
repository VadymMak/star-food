"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  const locale = useLocale();
  const t = useTranslations();

  const features = t.raw("aboutPreview.features") as string[];

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
            <span className="section-label">{t("aboutPreview.label")}</span>
            <h2
              className="section-title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("aboutPreview.title")}
            </h2>
            <p className={styles.desc}>{t("aboutPreview.p1")}</p>
            <p className={styles.desc}>{t("aboutPreview.p2")}</p>
            <div className={styles.features}>
              {features.map((f: string) => (
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
              {t("aboutPreview.cta")} <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
