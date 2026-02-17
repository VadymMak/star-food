import { FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className="section-label">Let&apos;s Work Together</span>
        <h2
          className="section-title"
          style={{ fontFamily: "var(--font-display)", maxWidth: 700, margin: "0 auto 20px" }}
        >
          Ready to Source Quality Food Products?
        </h2>
        <p className={styles.text}>
          Get a competitive quote for sunflower oil, sugar, dairy, and more. We
          respond within 24 hours.
        </p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <a href="mailto:ubmarket2022@gmail.com" className="btn btn-primary">
            <FaEnvelope /> Request a Quote
          </a>
          <a href="tel:+359884469860" className="btn btn-outline">
            <FaPhone /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}