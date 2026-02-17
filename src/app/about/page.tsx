import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaGlobeEurope,
  FaHandshake,
  FaTruck,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us | Star Food — EU Food Trading Company in Bulgaria",
  description:
    "Learn about UB Market LTD — an EU-registered international food trading company based in Varna, Bulgaria. Specializing in sunflower oil export and import across Europe.",
};

const values = [
  {
    icon: <FaGlobeEurope />,
    title: "European Reach",
    text: "We deliver across 12+ EU countries, connecting Eastern European producers with Western buyers.",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Partnerships",
    text: "Long-term relationships with verified manufacturers ensure consistent quality and supply.",
  },
  {
    icon: <FaTruck />,
    title: "Reliable Logistics",
    text: "Full road transport coverage across Europe with flexible delivery terms — FOB, CIF, DAP.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Quality Assured",
    text: "All products meet EU food safety standards with full documentation and lab test reports.",
  },
];

const products = [
  "Sunflower oil (refined, deodorized, winterized)",
  "Sunflower oil (unrefined, crude) — bulk",
  "High-oleic sunflower oil (refined)",
  "Frying oil for food service",
  "Beet sugar (25kg, 50kg bags)",
  "Dairy products (milk, butter)",
  "Mayonnaise and condiments",
  "Other vegetable oils (olive, soybean, rapeseed)",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">About Us</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            Your Trusted Partner in European Food Trading
          </h1>
        </div>
      </section>

      {/* Company Info */}
      <section className={styles.section}>
        <div className={styles.grid2col}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-us.webp"
              alt="UB Market warehouse and operations"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h2
              className="section-title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who We Are
            </h2>
            <p className={styles.text}>
              <strong>UB MARKET LTD</strong> is an EU-registered international
              trading company based in Varna, Bulgaria. We specialize in the
              export and import of food products, acting as a responsible
              intermediary between leading manufacturers and wholesale buyers
              across Europe.
            </p>
            <p className={styles.text}>
              Our main specialization is international trade in sunflower oil. We
              supply a wide range of products — refined, crude, and high-oleic
              varieties — available in PET bottles (0.5–10 liters) and bulk tank
              trucks.
            </p>
            <p className={styles.text}>
              We source products directly from verified producers and handle
              everything from pricing negotiation to logistics and documentation,
              ensuring a smooth and transparent trading experience for every
              client.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <div className={styles.headerCenter}>
            <span className="section-label">Why Choose Us</span>
            <h2
              className="section-title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What Sets Us Apart
            </h2>
          </div>
          <div className={styles.grid4col}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className={styles.section}>
        <div className={styles.headerCenter}>
          <span className="section-label">What We Trade</span>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Product Range
          </h2>
          <p
            className="section-subtitle"
            style={{ margin: "0 auto 40px" }}
          >
            We supply a wide range of food products directly from reliable
            manufacturers across Eastern Europe.
          </p>
        </div>
        <div className={styles.productList}>
          {products.map((p) => (
            <div key={p} className={styles.productItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Start Trading?
          </h2>
          <p className={styles.ctaText}>
            Contact us today for competitive pricing and reliable supply.
          </p>
          <Link href="/contacts" className="btn btn-primary">
            <FaEnvelope /> Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}