import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import styles from "./AboutPreview.module.css";

const features = [
  "Refined & Crude Oils",
  "Road Transport (EU)",
  "PET Bottles & Bulk",
  "Competitive Pricing",
  "Quality Certified",
  "Multilingual Support",
];

export default function AboutPreview() {
  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Image */}
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-us.webp"
              alt="Sunflower oil production facility"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div className={styles.text}>
            <span className="section-label">About Us</span>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
              Your Trusted Partner in Food Export &amp; Import
            </h2>
            <p className={styles.desc}>
              UB MARKET LTD is an international trading company specializing in
              the export and import of food products. We act as a responsible
              intermediary, connecting leading product manufacturers with
              wholesale buyers across Europe.
            </p>
            <p className={styles.desc}>
              Our main specialization is international trade in sunflower oil —
              refined, crude, and high-oleic varieties, available in bottles and
              bulk tankers.
            </p>

            <div className={styles.features}>
              {features.map((f) => (
                <div key={f} className={styles.feature}>
                  <FaCheckCircle className={styles.featureIcon} />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn btn-primary" style={{ marginTop: "10px" }}>
              Learn More <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}