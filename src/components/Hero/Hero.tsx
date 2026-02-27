"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaBoxOpen } from "react-icons/fa";
import styles from "./Hero.module.css";

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations();
return (
    <section className={styles.hero}>
      <Image
        src="/images/top.webp"
        alt="Sunflower oil field"
        fill
        priority
        sizes="100vw"
        quality={75}
        className={styles.bgImage}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.badge}>
          {t("hero.badge")}
        </span>
        <h1 className={styles.title}>
          {t("hero.title1")}{" "}
          <span className={styles.gold}>
            {t("hero.titleHighlight")}
          </span>{" "}
          {t("hero.title2")}
        </h1>
        <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <Link href={`/${locale}/contacts`} className="btn btn-primary">
            <FaEnvelope /> {t("hero.cta1")}
          </Link>
          <Link href={`/${locale}/products`} className="btn btn-outline">
            <FaBoxOpen /> {t("hero.cta2")}
          </Link>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}
