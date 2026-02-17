"use client";

import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+359884469860?text=Hello%2C%20I%20am%20interested%20in%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className={styles.icon} />
    </a>
  );
}