"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProductsGrid.module.css";

export default function ProductsGrid() {
  const { locale, t } = useLanguage();
  const p = t?.products || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{p.label || "Our Products"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {p.title || "What We Supply"}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {p.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => {
            const translated = p?.items?.[product.id as keyof typeof p.items];
            return (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className={styles.card}
              >
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
                  <h3 className={styles.name}>{translated?.name || product.name}</h3>
                  <p className={styles.desc}>{translated?.description || product.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Link href={`/${locale}/products`} className="btn btn-outline">
            {p.cta || "View All Products"} <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
