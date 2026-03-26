"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaEnvelope, FaPhone, FaCheckCircle, FaBoxOpen } from "react-icons/fa";
import { getProductBySlug, products } from "@/data/products";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./product.module.css";

const PRODUCT_BLOGS: Record<string, { slug: string; title: string }[]> = {
  "sunflower-oil": [
    {
      slug: "sunflower-oil-wholesale-guide",
      title: "Complete Guide to Buying Sunflower Oil Wholesale",
    },
    {
      slug: "refined-vs-crude-sunflower-oil",
      title: "Refined vs Crude Sunflower Oil: Full Comparison",
    },
    {
      slug: "sunflower-oil-prices-europe-2026",
      title: "Sunflower Oil Prices in Europe 2026",
    },
  ],
  "high-oleic-sunflower-oil": [
    {
      slug: "high-oleic-sunflower-oil-horeca",
      title: "High-Oleic Sunflower Oil for HoReCa",
    },
    {
      slug: "sunflower-oil-prices-europe-2026",
      title: "Sunflower Oil Prices in Europe 2026",
    },
    {
      slug: "best-frying-oil-restaurants",
      title: "Best Frying Oil for Restaurants 2026",
    },
  ],
  "frying-oil": [
    {
      slug: "best-frying-oil-restaurants",
      title: "Best Frying Oil for Restaurants 2026",
    },
    {
      slug: "high-oleic-sunflower-oil-horeca",
      title: "High-Oleic Sunflower Oil for HoReCa",
    },
    {
      slug: "sunflower-oil-packaging-guide",
      title: "Sunflower Oil Packaging Guide",
    },
  ],
  "rapeseed-oil": [
    {
      slug: "how-to-choose-food-supplier",
      title: "How to Choose a Food Supplier in Europe",
    },
    {
      slug: "sunflower-oil-packaging-guide",
      title: "Sunflower Oil Packaging Guide",
    },
    {
      slug: "how-food-trading-works-europe",
      title: "How Food Trading Works in Europe",
    },
  ],
  "soybean-oil": [
    {
      slug: "how-to-choose-food-supplier",
      title: "How to Choose a Food Supplier in Europe",
    },
    {
      slug: "sunflower-oil-packaging-guide",
      title: "Sunflower Oil Packaging Guide",
    },
    {
      slug: "how-food-trading-works-europe",
      title: "How Food Trading Works in Europe",
    },
  ],
  mayonnaise: [
    {
      slug: "how-food-trading-works-europe",
      title: "How Food Trading Works in Europe",
    },
    {
      slug: "how-to-choose-food-supplier",
      title: "How to Choose a Food Supplier in Europe",
    },
    {
      slug: "food-trading-bulgaria-eu-advantage",
      title: "Bulgaria as EU Food Trading Hub",
    },
  ],
  "dairy-products": [
    {
      slug: "food-trading-bulgaria-eu-advantage",
      title: "Bulgaria as EU Food Trading Hub",
    },
    {
      slug: "how-food-trading-works-europe",
      title: "How Food Trading Works in Europe",
    },
  ],
  sugar: [
    {
      slug: "wholesale-beet-sugar-europe",
      title: "Wholesale Beet Sugar in Europe 2026",
    },
    {
      slug: "how-to-choose-food-supplier",
      title: "How to Choose a Food Supplier in Europe",
    },
    {
      slug: "food-trading-bulgaria-eu-advantage",
      title: "Bulgaria as EU Food Trading Hub",
    },
  ],
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale();
  const t = useTranslations();

  const product = getProductBySlug(slug);
  const productItems = t.raw("products.items") as Record<
    string,
    { name: string; description: string }
  >;
  const translated = productItems?.[product?.id as string];

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <Link href={`/${locale}/products`} className="btn btn-primary">
          {t("productPage.backToCatalog")}
        </Link>
      </div>
    );
  }

  const productName = translated?.name || product.name;
  const productDesc = translated?.description || product.description;

  const related = products.filter((p) => p.slug !== slug).slice(0, 3);
  const relatedBlogs = PRODUCT_BLOGS[product.slug] || [];

  const breadcrumbItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("nav.products"), href: `/${locale}/products` },
    { label: productName },
  ];

  const productSchema = generateProductSchema(
    product,
    locale,
    productName,
    productDesc,
  );
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href || `/${locale}/products/${product.slug}`,
    })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      {/* Product Hero */}
      <section className={styles.productSection}>
        <div className={styles.inner}>
          <div className={styles.productGrid}>
            <div className={styles.imageWrap}>
              {product.tag && <span className={styles.tag}>{product.tag}</span>}
              <Image
                src={product.image}
                alt={productName}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div className={styles.details}>
              <h1 className={styles.title}>{productName}</h1>
              <p className={styles.description}>{productDesc}</p>

              {/* Specs Table */}
              <div className={styles.specsTable}>
                <h3 className={styles.specsTitle}>
                  {t("productPage.specifications")}
                </h3>
                <table className={styles.table}>
                  <tbody>
                    {product.specs.volume && (
                      <tr>
                        <td className={styles.specLabel}>
                          {t("productPage.volume")}
                        </td>
                        <td className={styles.specValue}>
                          {product.specs.volume}
                        </td>
                      </tr>
                    )}
                    {product.specs.packaging && (
                      <tr>
                        <td className={styles.specLabel}>
                          {t("productPage.packaging")}
                        </td>
                        <td className={styles.specValue}>
                          {product.specs.packaging}
                        </td>
                      </tr>
                    )}
                    {product.specs.shelfLife && (
                      <tr>
                        <td className={styles.specLabel}>
                          {t("productPage.shelfLife")}
                        </td>
                        <td className={styles.specValue}>
                          {product.specs.shelfLife}
                        </td>
                      </tr>
                    )}
                    {product.specs.origin && (
                      <tr>
                        <td className={styles.specLabel}>
                          {t("productPage.origin")}
                        </td>
                        <td className={styles.specValue}>
                          {product.specs.origin}
                        </td>
                      </tr>
                    )}
                    {product.specs.certification && (
                      <tr>
                        <td className={styles.specLabel}>
                          {t("productPage.certifications")}
                        </td>
                        <td className={styles.specValue}>
                          {product.specs.certification}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Packaging Options */}
              <div className={styles.packagingSection}>
                <h3 className={styles.specsTitle}>
                  {t("productPage.availablePackaging")}
                </h3>
                <div className={styles.packagingTags}>
                  {product.packagingOptions.map((opt) => (
                    <span key={opt} className={styles.packTag}>
                      <FaBoxOpen className={styles.packIcon} /> {opt}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctas}>
                <Link
                  href={`/${locale}/quote?product=${product.slug}`}
                  className="btn btn-primary"
                >
                  <FaEnvelope /> {t("productPage.requestPrice")}
                </Link>
                <a href="tel:+359884469860" className="btn btn-outline">
                  <FaPhone /> {t("productPage.callUs")}
                </a>
              </div>

              {/* Quality badges */}
              <div className={styles.badges}>
                {(product.specs.certification || "").split(", ").map((cert) => (
                  <span key={cert} className={styles.badge}>
                    <FaCheckCircle /> {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className={styles.relatedSection}>
        <div className={styles.inner}>
          <h2 className={styles.relatedTitle}>
            {t("productPage.relatedProducts")}
          </h2>
          <div className={styles.relatedGrid}>
            {related.map((rp) => {
              const rTranslated = productItems?.[rp.id as string];
              return (
                <Link
                  key={rp.slug}
                  href={`/${locale}/products/${rp.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <Image
                      src={rp.image}
                      alt={rTranslated?.name || rp.name}
                      fill
                      sizes="33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h3 className={styles.relatedName}>
                    {rTranslated?.name || rp.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      {relatedBlogs.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.inner}>
            <h2 className={styles.relatedTitle}>
              {t("productPage.relatedArticles") || "Related Articles"}
            </h2>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/${locale}/blog/${blog.slug}`}
                  className={styles.relatedCard}
                >
                  <h3 className={styles.relatedName}>{blog.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
