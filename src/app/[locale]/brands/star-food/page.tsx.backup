"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaEnvelope, FaHandshake, FaPalette, FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./brand.module.css";

export default function StarFoodBrandPage() {
  const { locale, t } = useLanguage();
  const bp = t?.brandPage || {};

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: bp.breadcrumb || "Star Food Brand" },
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
              <span className="section-label">{bp.label || "Our Brand"}</span>
              <h1 className={styles.heroTitle}>
                <FaStar className={styles.heroStar} />
                {bp.title || "Star Food — Quality You Can Trust"}
              </h1>
              <p className={styles.heroBadge}>{bp.registered || "® Registered Trademark"}</p>
              <p className={styles.heroDesc}>{bp.description || "Star Food is the registered trademark of UB Market LTD. We bring premium food products from verified Eastern European producers to wholesale buyers across Europe."}</p>
              <div className="btn-group">
                <Link href={`/${locale}/quote`} className="btn btn-primary">
                  <FaEnvelope /> {bp.ctaQuote || "Request Price List"}
                </Link>
                <Link href={`/${locale}/partners`} className="btn btn-outline">
                  <FaHandshake /> {bp.ctaPartner || "Become a Distributor"}
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
          <span className="section-label">{bp.lineupLabel || "Product Range"}</span>
          <h2 className={styles.sectionTitle}>{bp.lineupTitle || "Star Food Product Lineup"}</h2>
          <div className={styles.productGrid}>
            {products.map((product) => {
              const translated = t?.products?.items?.[product.id as string];
              return (
                <Link key={product.id} href={`/${locale}/products/${product.slug}`} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <Image src={product.image} alt={translated?.name || product.name} fill sizes="33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className={styles.productInfo}>
                    <Image src="/images/star-food-logo.webp" alt="Star Food" width={24} height={24} className={styles.productBadge} />
                    <h3 className={styles.productName}>{translated?.name || product.name}</h3>
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
          <span className="section-label">{bp.labelGalleryLabel || "Our Packaging"}</span>
          <h2 className={styles.sectionTitle}>{bp.labelGalleryTitle || "Professional Label Design"}</h2>
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
              <h3>{bp.labelInfoTitle || "What Our Label Tells You"}</h3>
              <ul className={styles.labelList}>
                <li><FaCheckCircle className={styles.checkIcon} /> {bp.labelInfo1 || "Complete nutritional information in 5 languages"}</li>
                <li><FaCheckCircle className={styles.checkIcon} /> {bp.labelInfo2 || "EU-compliant food safety labeling"}</li>
                <li><FaCheckCircle className={styles.checkIcon} /> {bp.labelInfo3 || "Non-GMO certified product"}</li>
                <li><FaCheckCircle className={styles.checkIcon} /> {bp.labelInfo4 || "Full traceability — origin and batch number"}</li>
                <li><FaCheckCircle className={styles.checkIcon} /> {bp.labelInfo5 || "Professional design by certified designer"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className="section-label">{bp.qualityLabel || "Quality Standards"}</span>
          <h2 className={styles.sectionTitle}>{bp.qualityTitle || "Our Commitment to Quality"}</h2>
          <div className={styles.qualityGrid}>
            {[
              { label: "ISO 22000", text: bp.iso || "Food safety management system certification" },
              { label: "HACCP", text: bp.haccp || "Hazard analysis and critical control points compliance" },
              { label: "Non-GMO", text: bp.nongmo || "All products sourced from non-GMO verified suppliers" },
              { label: "EU Standards", text: bp.eu || "Full compliance with European food safety regulations" },
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
              <h3 className={styles.designTitle}>{bp.designedByTitle || "Label Design"}</h3>
              <p className={styles.designText}>
                {bp.designedByText || "All Star Food product labels were designed by Anastasiia Kolisnyk, a professional illustrator and designer based in Slovakia."}
              </p>
              <a href="https://akillustrator.com" target="_blank" rel="noopener noreferrer" className={styles.designLink}>
                {bp.designedByLink || "Anastasiia Kolisnyk — AK Illustrator →"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
