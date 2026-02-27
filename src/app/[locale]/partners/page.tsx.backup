"use client";

import Link from "next/link";
import { FaCheckCircle, FaTruck, FaHandshake, FaChartLine, FaUserTie, FaGlobeEurope, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./partners.module.css";

export default function PartnersPage() {
  const { locale, t } = useLanguage();
  const pp = t?.partnersPage || {};

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: pp.breadcrumb || "Partners" },
  ];

  const benefits = [
    { icon: FaChartLine, title: pp.benefit1Title || "Competitive Pricing", text: pp.benefit1Text || "Direct access to factory prices with transparent margin structure." },
    { icon: FaTruck, title: pp.benefit2Title || "Reliable Logistics", text: pp.benefit2Text || "Road transport delivery across 12+ EU countries, on time." },
    { icon: FaUserTie, title: pp.benefit3Title || "Personal Manager", text: pp.benefit3Text || "Dedicated account manager for all your orders and inquiries." },
    { icon: FaGlobeEurope, title: pp.benefit4Title || "EU Compliance", text: pp.benefit4Text || "All documentation, certificates, and labeling meet EU standards." },
  ];

  const partnerTypes = [
    { title: pp.type1 || "Distributors", text: pp.type1Text || "Wholesale distribution across your region with exclusive territory options." },
    { title: pp.type2 || "Retailers", text: pp.type2Text || "Direct supply to supermarket chains and specialty food stores." },
    { title: pp.type3 || "HORECA", text: pp.type3Text || "Bulk supply for restaurants, hotels, and catering companies." },
  ];

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}><Breadcrumbs items={breadcrumbItems} /></div>
      </section>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className="section-label">{pp.label || "Partnership"}</span>
          <h1 className={styles.heroTitle}>{pp.title || "Become a Star Food Partner"}</h1>
          <p className={styles.heroSubtitle}>{pp.subtitle || "Join our growing network of distributors and retailers across Europe. We offer competitive pricing, reliable supply, and dedicated support."}</p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaEnvelope /> {pp.cta || "Apply for Partnership"}
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>{pp.benefitsTitle || "Why Partner With Us"}</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className={styles.benefitCard}>
                  <Icon className={styles.benefitIcon} />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>{pp.typesTitle || "Partnership Types"}</h2>
          <div className={styles.typesGrid}>
            {partnerTypes.map((pt, i) => (
              <div key={i} className={styles.typeCard}>
                <FaCheckCircle className={styles.typeIcon} />
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <h2 className={styles.ctaTitle}>{pp.ctaTitle || "Ready to Get Started?"}</h2>
          <p className={styles.ctaText}>{pp.ctaText || "Send us a quote request and our team will contact you within 24 hours."}</p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaHandshake /> {pp.ctaButton || "Request Partnership Info"}
          </Link>
        </div>
      </section>
    </>
  );
}
