"use client";

import { FaShieldAlt, FaLeaf, FaCertificate, FaGlobeEurope, FaAward } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./TrustedBy.module.css";

const badges = [
  { icon: FaCertificate, label: "ISO 22000" },
  { icon: FaShieldAlt, label: "HACCP" },
  { icon: FaLeaf, label: "Non-GMO" },
  { icon: FaGlobeEurope, label: "EU Food Safety" },
  { icon: FaAward, label: "Quality Assured" },
];

export default function TrustedBy() {
  const { t } = useLanguage();
  const tb = t?.trustedBy || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className="section-label">{tb.label || "Trusted Standards"}</span>
        <h2 className={styles.title}>{tb.title || "Certified Quality You Can Trust"}</h2>
        <div className={styles.badges}>
          {badges.map((b) => {
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
