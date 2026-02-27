"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaShieldAlt,
  FaLeaf,
  FaCertificate,
  FaGlobeEurope,
  FaAward,
} from "react-icons/fa";
import styles from "./TrustedBy.module.css";

const certBadges = [
  { icon: FaCertificate, label: "ISO 22000" },
  { icon: FaShieldAlt, label: "HACCP" },
  { icon: FaLeaf, label: "Non-GMO" },
  { icon: FaGlobeEurope, label: "EU Food Safety" },
  { icon: FaAward, label: "Quality Assured" },
];

export default function TrustedBy() {
  const t = useTranslations();
return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className="section-label">{t("trustedBy.label")}</span>
        <h2 className={styles.title}>
          {t("trustedBy.title")}
        </h2>
        <div className={styles.badges}>
          {/* Star Food trademark badge */}
          <div className={`${styles.badge} ${styles.brandBadge}`}>
            <Image
              src="/images/star-food-logo.webp"
              alt="Star Food — Registered Trademark"
              width={28}
              height={28}
              className={styles.brandLogo}
            />
            <span className={styles.badgeLabel}>Star Food ®</span>
          </div>
          {/* Certification badges */}
          {certBadges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className={styles.badge}>
                <Icon className={styles.badgeIcon} />
                <span className={styles.badgeLabel}>{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
