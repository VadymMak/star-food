"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FaCheckCircle, FaTruck, FaHandshake, FaChartLine, FaUserTie, FaGlobeEurope, FaEnvelope } from "react-icons/fa";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./partners.module.css";

export default function PartnersPage() {
  const locale = useLocale();
  const t = useTranslations();
const breadcrumbItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("partnersPage.breadcrumb") },
  ];

  const benefits = [
    { icon: FaChartLine, title: t("partnersPage.benefit1Title"), text: t("partnersPage.benefit1Text") },
    { icon: FaTruck, title: t("partnersPage.benefit2Title"), text: t("partnersPage.benefit2Text") },
    { icon: FaUserTie, title: t("partnersPage.benefit3Title"), text: t("partnersPage.benefit3Text") },
    { icon: FaGlobeEurope, title: t("partnersPage.benefit4Title"), text: t("partnersPage.benefit4Text") },
  ];

  const partnerTypes = [
    { title: t("partnersPage.type1"), text: t("partnersPage.type1Text") },
    { title: t("partnersPage.type2"), text: t("partnersPage.type2Text") },
    { title: t("partnersPage.type3"), text: t("partnersPage.type3Text") },
  ];

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}><Breadcrumbs items={breadcrumbItems} /></div>
      </section>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className="section-label">{t("partnersPage.label")}</span>
          <h1 className={styles.heroTitle}>{t("partnersPage.title")}</h1>
          <p className={styles.heroSubtitle}>{t("partnersPage.subtitle")}</p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaEnvelope /> {t("partnersPage.cta")}
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>{t("partnersPage.benefitsTitle")}</h2>
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
          <h2 className={styles.sectionTitle}>{t("partnersPage.typesTitle")}</h2>
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
          <h2 className={styles.ctaTitle}>{t("partnersPage.ctaTitle")}</h2>
          <p className={styles.ctaText}>{t("partnersPage.ctaText")}</p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaHandshake /> {t("partnersPage.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
