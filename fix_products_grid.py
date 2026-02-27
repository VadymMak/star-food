# Run: python fix_products_grid.py
filepath = "src/components/ProductsGrid/ProductsGrid.tsx"

content = """\"use client\";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { products } from "@/data/products";
import styles from "./ProductsGrid.module.css";

export default function ProductsGrid() {
  const locale = useLocale();
  const t = useTranslations();

  // Get raw product items object for dynamic key access
  const productItems = t.raw("products.items") as Record<string, { name: string; description: string }>;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{t("products.label")}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {t("products.title")}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {t("products.subtitle")}
          </p>
        </div>
        <div className={styles.grid}>
          {products.map((product) => {
            const translated = productItems?.[product.id];
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
            {t("products.cta")} <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
"""

with open(filepath, "w") as f:
    f.write(content)
print("Fixed ProductsGrid.tsx")
