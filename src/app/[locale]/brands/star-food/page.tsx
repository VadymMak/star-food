"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaEnvelope,
  FaHandshake,
  FaPalette,
  FaStar,
} from "react-icons/fa";
import { products } from "@/data/products";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./brand.module.css";

export default function StarFoodBrandPage() {
  const locale = useLocale();
  const t = useTranslations();
  const breadcrumbItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("brandPage.breadcrumb") },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      {/* Hero with real Star Food logo */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className="section-label">{t("brandPage.label")}</span>
              <h1 className={styles.heroTitle}>
                <FaStar className={styles.heroStar} />
                {t("brandPage.title")}
              </h1>
              <p className={styles.heroBadge}>{t("brandPage.registered")}</p>
              <p className={styles.heroDesc}>{t("brandPage.description")}</p>
              <div className="btn-group">
                <Link href={`/${locale}/quote`} className="btn btn-primary">
                  <FaEnvelope /> {t("brandPage.ctaQuote")}
                </Link>
                <Link href={`/${locale}/partners`} className="btn btn-outline">
                  <FaHandshake /> {t("brandPage.ctaPartner")}
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image
                src="/images/star-food-logo.webp"
                alt="Star Food — Registered Trademark"
                width={400}
                height={400}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Lineup */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className="section-label">{t("brandPage.lineupLabel")}</span>
          <h2 className={styles.sectionTitle}>{t("brandPage.lineupTitle")}</h2>
          <div className={styles.productGrid}>
            {products.map((product) => {
              const productItems = t.raw("products.items") as Record<
                string,
                { name: string; description: string }
              >;
              const translated = productItems?.[product.id as string];
              return (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className={styles.productCard}
                >
                  <div className={styles.productImage}>
                    <Image
                      src={product.image}
                      alt={translated?.name || product.name}
                      fill
                      sizes="33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <Image
                      src="/images/star-food-logo.webp"
                      alt="Star Food"
                      width={24}
                      height={24}
                      className={styles.productBadge}
                    />
                    <h3 className={styles.productName}>
                      {translated?.name || product.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Label Gallery */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <span className="section-label">
            {t("brandPage.labelGalleryLabel")}
          </span>
          <h2 className={styles.sectionTitle}>
            {t("brandPage.labelGalleryTitle")}
          </h2>
          <div className={styles.labelGallery}>
            <div className={styles.labelImageWrap}>
              <Image
                src="/images/star-food-label.webp"
                alt="Star Food Sunflower Oil — Product Label"
                width={1200}
                height={400}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
            <div className={styles.labelInfo}>
              <h3>{t("brandPage.labelInfoTitle")}</h3>
              <ul className={styles.labelList}>
                <li>
                  <FaCheckCircle className={styles.checkIcon} />{" "}
                  {t("brandPage.labelInfo1")}
                </li>
                <li>
                  <FaCheckCircle className={styles.checkIcon} />{" "}
                  {t("brandPage.labelInfo2")}
                </li>
                <li>
                  <FaCheckCircle className={styles.checkIcon} />{" "}
                  {t("brandPage.labelInfo3")}
                </li>
                <li>
                  <FaCheckCircle className={styles.checkIcon} />{" "}
                  {t("brandPage.labelInfo4")}
                </li>
                <li>
                  <FaCheckCircle className={styles.checkIcon} />{" "}
                  {t("brandPage.labelInfo5")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className="section-label">{t("brandPage.qualityLabel")}</span>
          <h2 className={styles.sectionTitle}>{t("brandPage.qualityTitle")}</h2>
          <div className={styles.qualityGrid}>
            {[
              { label: "ISO 22000", text: t("brandPage.iso") },
              { label: "HACCP", text: t("brandPage.haccp") },
              { label: "Non-GMO", text: t("brandPage.nongmo") },
              { label: "EU Standards", text: t("brandPage.eu") },
            ].map((item) => (
              <div key={item.label} className={styles.qualityCard}>
                <FaCheckCircle className={styles.qualityIcon} />
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed By — AK Illustrator credit */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <div className={styles.designedBy}>
            <FaPalette className={styles.designIcon} />
            <div>
              <h3 className={styles.designTitle}>
                {t("brandPage.designedByTitle")}
              </h3>
              <p className={styles.designText}>
                {t("brandPage.designedByText")}
              </p>
              <a
                href="https://akillustrator.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.designLink}
              >
                {t("brandPage.designedByLink")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
