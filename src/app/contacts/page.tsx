import type { Metadata } from "next";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import styles from "./contacts.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Star Food — Get a Quote for Wholesale Food Products",
  description:
    "Contact UB Market LTD for wholesale sunflower oil, sugar, and dairy products. Located in Varna, Bulgaria. Phone: +359 8844 69860. Email: ubmarket2022@gmail.com.",
};

const contactItems = [
  {
    icon: <FaMapMarkerAlt />,
    label: "Address",
    value: "Bulgaria, Varna 9010\nSirma Voivoda St., b.1, ap. 21",
    href: undefined,
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "ubmarket2022@gmail.com",
    href: "mailto:ubmarket2022@gmail.com",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+359 8844 69860",
    href: "tel:+359884469860",
  },
  {
    icon: <FaClock />,
    label: "Office Hours",
    value: "Mon–Fri: 9:00–17:00\nSat: 10:00–14:00\nSun: Closed",
    href: undefined,
  },
];

const socials = [
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/ub_market_ltd",
  },
  {
    icon: <FaTelegram />,
    label: "Telegram",
    href: "https://t.me/ub_market_ltd",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/+359884469860",
  },
];

export default function ContactsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">Get in Touch</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            Contact Us
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            We respond within 24 hours. Reach out for pricing, samples, or
            partnership inquiries.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {contactItems.map((item) => (
            <div key={item.label} className={styles.card}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h3 className={styles.cardLabel}>{item.label}</h3>
              {item.href ? (
                <a href={item.href} className={styles.cardLink}>
                  {item.value}
                </a>
              ) : (
                <p className={styles.cardText}>
                  {item.value.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.value.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className={styles.socialSection}>
        <div className={styles.socialInner}>
          <span className="section-label">Follow Us</span>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Connect on Social Media
          </h2>
          <div className={styles.socialGrid}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
              >
                <span className={styles.socialIcon}>{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <div className={styles.mapInner}>
          <span className="section-label">Our Location</span>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Us in Varna, Bulgaria
          </h2>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93031.0181942096!2d27.78026205034398!3d43.2258611704557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a45439205714b3%3A0x99c4e0902fa8939b!2s9010%20Varna%2C%20Bulgaria!5e0!3m2!1sen!2spl!4v1729407709833!5m2!1sen!2spl"
            allowFullScreen
            loading="lazy"
            title="UB Market Location — Varna, Bulgaria"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}