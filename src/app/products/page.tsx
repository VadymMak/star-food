import type { Metadata } from "next";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { products } from "@/data/products";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Our Products | Star Food — Sunflower Oil, Sugar, Dairy Wholesale",
  description:
    "Browse our range of wholesale food products: sunflower oil (refined, crude, high-oleic), frying oil, beet sugar, dairy products, mayonnaise. Competitive B2B pricing.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">Product Catalog</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            Our Products
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            High-quality food products sourced from verified Eastern European
            producers for wholesale buyers across the EU.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              {product.tag && (
                <span className={styles.tag}>{product.tag}</span>
              )}
              <div className={styles.imageWrap}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h2 className={styles.name}>{product.name}</h2>
                <p className={styles.desc}>{product.description}</p>
                <a
                  href={`mailto:ubmarket2022@gmail.com?subject=Price inquiry: ${product.name}`}
                  className="btn btn-primary"
                  style={{ marginTop: "16px", fontSize: "0.8rem", padding: "12px 24px" }}
                >
                  <FaEnvelope /> Request Price
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}