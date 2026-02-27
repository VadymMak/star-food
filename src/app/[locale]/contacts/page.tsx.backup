"use client";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./contacts.module.css";

export default function ContactsPage() {
  const { t } = useLanguage();
  const cp = t?.contactsPage || {};
  const c = t?.contact || {};

  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      label: c.address || "Address",
      value: c.addressValue || "",
      href: undefined as string | undefined,
    },
    {
      icon: <FaEnvelope />,
      label: c.email || "Email",
      value: "ubmarket2022@gmail.com",
      href: "mailto:ubmarket2022@gmail.com",
    },
    {
      icon: <FaPhone />,
      label: c.phone || "Phone",
      value: "+359 8844 69860",
      href: "tel:+359884469860",
    },
    {
      icon: <FaClock />,
      label: c.hours || "Office Hours",
      value: c.hoursValue || "",
      href: undefined as string | undefined,
    },
  ];

  const socials = [
    { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/ub_market_ltd" },
    { icon: <FaTelegram />, label: "Telegram", href: "https://t.me/ub_market_ltd" },
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/+359884469860" },
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{cp.label || "Get in Touch"}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {cp.heroTitle || "Contact Us"}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {cp.heroSubtitle}
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
                  {(item.value || "").split("\n").map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      {i < (item.value || "").split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.formSection}>
        <ContactForm />
      </section>

      {/* Social Links */}
      <section className={styles.socialSection}>
        <div className={styles.socialInner}>
          <span className="section-label">{c.social || "Follow Us"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {c.socialTitle || "Connect on Social Media"}
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
          <span className="section-label">{c.mapLabel || "Our Location"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {c.mapTitle || "Find Us in Varna, Bulgaria"}
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
