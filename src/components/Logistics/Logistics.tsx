"use client";

import {
  FaTruckLoading,
  FaBox,
  FaOilCan,
  FaDolly,
  FaFileInvoice,
  FaGlobeEurope,
  FaCheck,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Logistics.module.css";

const deliveryIcons = [FaTruckLoading, FaBox, FaOilCan, FaDolly, FaFileInvoice, FaGlobeEurope];

export default function Logistics() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{t.logistics.label}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {t.logistics.title}
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaTruck className={styles.boxIcon} /> {t.logistics.delivery}
            </h3>
            <div className={styles.tagList}>
              {t.logistics.deliveryItems.map((label: string, i: number) => {
                const Icon = deliveryIcons[i] || FaCheck;
                return (
                  <div key={label} className={styles.tag}>
                    <span className={styles.tagIcon}><Icon /></span>
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaShieldAlt className={styles.boxIcon} /> {t.logistics.quality}
            </h3>
            <div className={styles.tagList}>
              {t.logistics.qualityItems.map((label: string) => (
                <div key={label} className={styles.tag}>
                  <span className={styles.tagIcon}><FaCheck /></span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}