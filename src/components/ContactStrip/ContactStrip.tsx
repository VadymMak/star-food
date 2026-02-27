"use client";

import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "./ContactStrip.module.css";

export default function ContactStrip() {
  const t = useTranslations();
  return (
    <section className={styles.strip} id="contact">
      <div className={styles.grid}>
        <div className={styles.item}>
          <FaMapMarkerAlt className={styles.icon} />
          <h4 className={styles.label}>{t("contact.address")}</h4>
          <p>
            {String(t("contact.addressValue"))
              .split("\n")
              .map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </p>
        </div>

        <div className={styles.item}>
          <FaEnvelope className={styles.icon} />
          <h4 className={styles.label}>{t("contact.email")}</h4>
          <a href="mailto:ubmarket2022@gmail.com">ubmarket2022@gmail.com</a>
        </div>

        <div className={styles.item}>
          <FaPhone className={styles.icon} />
          <h4 className={styles.label}>{t("contact.phone")}</h4>
          <a href="tel:+359884469860">+359 8844 69860</a>
        </div>
      </div>
    </section>
  );
}
