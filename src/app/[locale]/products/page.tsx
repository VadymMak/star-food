"use client";

import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./products.module.css";

export default function ProductsPage() {
  const { t } = useLanguage();
  const pp = t?.productsPage || {};

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{pp.label || "Product Catalog"}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {pp.heroTitle || "Our Products"}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {pp.heroSubtitle}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {products.map((product) => {
            const translated = t?.products?.items?.[product.id as keyof typeof t.products.items];
            return (
              <div key={product.id} className={styles.card}>
                {product.tag && (
                  <span className={styles.tag}>{product.tag}</span>
                )}
                <div className={styles.imageWrap}>
                  <Image
                    src={product.image}
                    alt={translated?.name || product.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.name}>{translated?.name || product.name}</h2>
                  <p className={styles.desc}>{translated?.description || product.description}</p>
                  <a
                    href={`mailto:ubmarket2022@gmail.com?subject=Price inquiry: ${product.name}`}
                    className="btn btn-primary"
                    style={{ marginTop: "16px", fontSize: "0.8rem", padding: "12px 24px" }}
                  >
                    <FaEnvelope /> {t?.products?.requestPrice || "Request Price"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
