import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { products } from "@/data/products";
import styles from "./ProductsGrid.module.css";

export default function ProductsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">Our Products</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            What We Supply
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            We source high-quality food products directly from reliable
            manufacturers and deliver them to wholesale buyers across Europe.
          </p>
        </div>

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
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.desc}>{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/products" className="btn btn-outline">
            View All Products <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}