"use client";

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
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./private-label.module.css";

export default function PrivateLabelPage() {
  const { locale, t } = useLanguage();
  const pl = t?.privateLabelPage || {};

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: pl.breadcrumb || "Private Label" },
  ];

  const steps = [
    {
      icon: FaHandshake,
      number: "01",
      title: pl.step1Title || "Tell Us Your Needs",
      text:
        pl.step1Text ||
        "Share your brand requirements — volumes, packaging format, target market, and label design preferences.",
    },
    {
      icon: FaPaintBrush,
      number: "02",
      title: pl.step2Title || "We Develop Your Product",
      text:
        pl.step2Text ||
        "Our team handles sourcing, quality control, label design, and packaging to match your brand identity.",
    },
    {
      icon: FaTruck,
      number: "03",
      title: pl.step3Title || "Production & Delivery",
      text:
        pl.step3Text ||
        "We produce, pack, and deliver your branded products directly to your warehouse across Europe.",
    },
  ];

  const benefits = [
    {
      text:
        pl.benefit1 ||
        "No factory investment needed — use our production capacity",
    },
    { text: pl.benefit2 || "Flexible MOQ starting from 20 tons" },
    { text: pl.benefit3 || "Custom label design included in the service" },
    {
      text:
        pl.benefit4 ||
        "Full EU compliance — documentation, certificates, labeling",
    },
    {
      text:
        pl.benefit5 ||
        "Multiple packaging options: 1L, 3L, 5L, 10L PET, IBC, bulk",
    },
    { text: pl.benefit6 || "Fast turnaround — first batch within 3-4 weeks" },
  ];

  const products = [
    pl.product1 || "Refined Sunflower Oil",
    pl.product2 || "Crude Sunflower Oil",
    pl.product3 || "High-Oleic Sunflower Oil",
    pl.product4 || "Vegetable Frying Oil",
    pl.product5 || "Blended Cooking Oil",
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
            {pl.label || "Private Label Service"}
          </span>
          <h1 className={styles.heroTitle}>
            {pl.title || "Your Brand, Our Quality Oil"}
          </h1>
          <p className={styles.heroSubtitle}>
            {pl.subtitle ||
              "Launch your own branded sunflower oil line without investing in production. We handle everything — from sourcing to delivery."}
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
              <FaEnvelope /> {pl.ctaQuote || "Request Private Label Quote"}
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
              {pl.ctaContact || "Talk to Our Team"}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works — 3 steps */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>
            {pl.howItWorksTitle || "How Private Label Works"}
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
                {pl.benefitsTitle || "Why Choose Our Private Label"}
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
                {pl.productsTitle || "Available for Private Label"}
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
                  {pl.orText || "Or distribute under our existing brand:"}
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
            {pl.ctaTitle || "Ready to Launch Your Brand?"}
          </h2>
          <p className={styles.ctaText}>
            {pl.ctaText ||
              "Tell us about your project and we'll prepare a custom proposal within 48 hours."}
          </p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaEnvelope /> {pl.ctaButton || "Get a Free Quote"}
          </Link>
        </div>
      </section>
    </>
  );
}
