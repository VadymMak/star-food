import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "./ContactStrip.module.css";

export default function ContactStrip() {
  return (
    <section className={styles.strip} id="contact">
      <div className={styles.grid}>
        <div className={styles.item}>
          <FaMapMarkerAlt className={styles.icon} />
          <h4 className={styles.label}>Address</h4>
          <p>
            Bulgaria, Varna 9010
            <br />
            Sirma Voivoda St., b.1, ap. 21
          </p>
        </div>

        <div className={styles.item}>
          <FaEnvelope className={styles.icon} />
          <h4 className={styles.label}>Email</h4>
          <a href="mailto:ubmarket2022@gmail.com">ubmarket2022@gmail.com</a>
        </div>

        <div className={styles.item}>
          <FaPhone className={styles.icon} />
          <h4 className={styles.label}>Phone</h4>
          <a href="tel:+359884469860">+359 8844 69860</a>
        </div>
      </div>
    </section>
  );
}