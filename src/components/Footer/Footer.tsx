"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Col 1 — Brand */}
          <div className={styles.colBrand}>
            <div className={styles.brandName}>
              <span className={styles.brandStar}>Star Food</span>
              <span className={styles.brandSub}>UB Market LTD</span>
            </div>
            <p className={styles.tagline}>{t("footer.tagline")}</p>
          </div>

          {/* Col 2 — Products */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t("footer.products")}</h4>
            <Link href={`/${locale}/products/sunflower-oil`}>{t("footer.sunflowerOil")}</Link>
            <Link href={`/${locale}/products/high-oleic-sunflower-oil`}>{t("footer.highOleicOil")}</Link>
            <Link href={`/${locale}/products/frying-oil`}>{t("footer.deepFryingOil")}</Link>
            <Link href={`/${locale}/products/mayonnaise`}>{t("footer.mayonnaise")}</Link>
<Link href={`/${locale}/products/sugar`}>{t("footer.sugar")}</Link>
          </div>

          {/* Col 3 — Company */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t("footer.company")}</h4>
            <Link href={`/${locale}/about`}>{t("footer.about")}</Link>
            <Link href={`/${locale}/blog`}>{t("footer.blog")}</Link>
            <Link href={`/${locale}/quote`}>{t("footer.quote")}</Link>
            <Link href={`/${locale}/contacts`}>{t("footer.contacts")}</Link>
          </div>

          {/* Col 4 — Contact */}
          <div className={styles.colContact}>
            <h4 className={styles.colTitle}>{t("footer.contactTitle")}</h4>
            <p>
              Sirma Voivoda St., b.1, ap. 21
              <br />
              Varna 9010, Bulgaria
            </p>
            <p>ubmarket2022@gmail.com</p>
            <p>+359 8844 69860</p>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/ub_market_ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me/ub_market_ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
              <a
                href="https://wa.me/+359884469860"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright} suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className={styles.credits}>
            <p className={styles.credit}>
              Label design by{" "}
              <a
                href="https://formaink.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anastasiia Kolisnyk — FormaInk Studio
              </a>
            </p>
            <p className={styles.credit}>
              Built by{" "}
              <a
                href="https://smartctx.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                SmartContext
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
