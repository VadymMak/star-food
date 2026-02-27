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
  const l = t?.logistics || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{l.label || "Logistics & Quality"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {l.title || "Built for B2B Trading"}
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaTruck className={styles.boxIcon} /> {l.delivery || "Delivery Options"}
            </h3>
            <div className={styles.tagList}>
              {(l.deliveryItems || []).map((label: string, i: number) => {
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
              <FaShieldAlt className={styles.boxIcon} /> {l.quality || "Quality Standards"}
            </h3>
            <div className={styles.tagList}>
              {(l.qualityItems || []).map((label: string) => (
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
