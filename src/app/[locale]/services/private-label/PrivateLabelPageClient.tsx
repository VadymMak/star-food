"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  FaBoxOpen,
  FaPaintBrush,
  FaTruck,
  FaHandshake,
  FaEnvelope,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./private-label.module.css";

export default function PrivateLabelPage() {
  const locale = useLocale();
  const t = useTranslations();
const breadcrumbItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("privateLabelPage.breadcrumb") },
  ];

  const steps = [
    {
      icon: FaHandshake,
      number: "01",
      title: t("privateLabelPage.step1Title"),
      text:
        t("privateLabelPage.step1Text"),
    },
    {
      icon: FaPaintBrush,
      number: "02",
      title: t("privateLabelPage.step2Title"),
      text:
        t("privateLabelPage.step2Text"),
    },
    {
      icon: FaTruck,
      number: "03",
      title: t("privateLabelPage.step3Title"),
      text:
        t("privateLabelPage.step3Text"),
    },
  ];

  const benefits = [
    {
      text:
        t("privateLabelPage.benefit1"),
    },
    { text: t("privateLabelPage.benefit2") },
    { text: t("privateLabelPage.benefit3") },
    {
      text:
        t("privateLabelPage.benefit4"),
    },
    {
      text:
        t("privateLabelPage.benefit5"),
    },
    { text: t("privateLabelPage.benefit6") },
  ];

  const products = [
    t("privateLabelPage.product1"),
    t("privateLabelPage.product2"),
    t("privateLabelPage.product3"),
    t("privateLabelPage.product4"),
    t("privateLabelPage.product5"),
  ];

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className="section-label">
            {t("privateLabelPage.label")}
          </span>
          <h1 className={styles.heroTitle}>
            {t("privateLabelPage.title")}
          </h1>
          <p className={styles.heroSubtitle}>
            {t("privateLabelPage.subtitle")}
          </p>
          <div
            className="btn-group"
            style={{ justifyContent: "center", display: "flex", gap: "16px" }}
          >
            <Link
              href={`/${locale}/quote`}
              className="btn btn-primary"
              style={{
                minWidth: "280px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <FaEnvelope /> {t("privateLabelPage.ctaQuote")}
            </Link>
            <Link
              href={`/${locale}/contacts`}
              className="btn btn-outline"
              style={{
                minWidth: "280px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {t("privateLabelPage.ctaContact")}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works — 3 steps */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>
            {t("privateLabelPage.howItWorksTitle")}
          </h2>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <Icon className={styles.stepIcon} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits + Products side by side */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <div className={styles.twoCol}>
            {/* Benefits */}
            <div>
              <h2 className={styles.colTitle}>
                {t("privateLabelPage.benefitsTitle")}
              </h2>
              <ul className={styles.benefitsList}>
                {benefits.map((b, i) => (
                  <li key={i}>
                    <FaCheckCircle className={styles.checkIcon} />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Available Products */}
            <div>
              <h2 className={styles.colTitle}>
                {t("privateLabelPage.productsTitle")}
              </h2>
              <div className={styles.productsList}>
                {products.map((p, i) => (
                  <div key={i} className={styles.productItem}>
                    <FaBoxOpen className={styles.productIcon} />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <div className={styles.orBlock}>
                <p className={styles.orText}>
                  {t("privateLabelPage.orText")}
                </p>
                <Link
                  href={`/${locale}/brands/star-food`}
                  className={styles.brandLink}
                >
                  <Image
                    src="/images/star-food-logo.webp"
                    alt="Star Food"
                    width={32}
                    height={32}
                    style={{ borderRadius: "50%" }}
                  />
                  <span>
                    Star Food <FaArrowRight />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <h2 className={styles.ctaTitle}>
            {t("privateLabelPage.ctaTitle")}
          </h2>
          <p className={styles.ctaText}>
            {t("privateLabelPage.ctaText")}
          </p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaEnvelope /> {t("privateLabelPage.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
