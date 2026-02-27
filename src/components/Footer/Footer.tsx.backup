"use client";

import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {t?.footer?.copyright || "UB Market LTD. All rights reserved."}
        </p>

        <div className={styles.social}>
          <a href="https://www.instagram.com/ub_market_ltd" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://t.me/ub_market_ltd" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegram /></a>
          <a href="https://wa.me/+359884469860" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>

        <p className={styles.email}>E-mail: ubmarket2022@gmail.com</p>

        <p className={styles.credit}>
          Label design by{" "}
          <a href="https://akillustrator.com" target="_blank" rel="noopener noreferrer">
            Anastasiia Kolisnyk — AK Illustrator
          </a>
        </p>
      </div>
    </footer>
  );
}
