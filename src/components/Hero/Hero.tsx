"use client";
import PriceTicker from "@/components/PriceTicker/PriceTicker";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

const CARDS = [
  {
    key: "refined",
    image: "/images/products/card-refined-oil.webp",
    altKey: "hero.cards.refined.imageAlt",
    nameKey: "hero.cards.refined.name",
    descKey: "hero.cards.refined.desc",
    priceKey: "hero.cards.refined.price",
    noteKey: "hero.cards.refined.note",
    href: "quote",
    product: "sunflower-oil-refined",
    available: true,
  },
  {
    key: "higholeic",
    image: "/images/products/card-high-oleic-oil.webp",
    altKey: "hero.cards.higholeic.imageAlt",
    nameKey: "hero.cards.higholeic.name",
    descKey: "hero.cards.higholeic.desc",
    priceKey: "hero.cards.higholeic.price",
    noteKey: "hero.cards.higholeic.note",
    href: "quote",
    product: "sunflower-oil-high-oleic",
    available: true,
  },
  {
    key: "meal",
    image: "/images/products/card-sunflower-meal.webp",
    altKey: "hero.cards.meal.imageAlt",
    nameKey: "hero.cards.meal.name",
    descKey: "hero.cards.meal.desc",
    priceKey: "hero.cards.meal.price",
    noteKey: "hero.cards.meal.note",
    href: "contacts",
    product: "",
    available: false,
  },
];

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <section className={styles.hero}>
      <PriceTicker />
      {/* ── Headline ── */}
      <div className={styles.headline}>
        <h1 className={styles.title}>
          {t("hero.title1")}{" "}
          <span className={styles.gold}>{t("hero.titleHighlight")}</span>{" "}
          {t("hero.title2")}
        </h1>
        <p className={styles.subtitle}>{t("hero.subtitle")}</p>
      </div>

      {/* ── Product cards ── */}
      <div className={styles.cards}>
        {CARDS.map((card, i) => {
          const href = card.available
            ? `/${locale}/${card.href}${card.product ? `?product=${card.product}` : ""}`
            : `/${locale}/${card.href}`;

          return (
            <Link
              key={card.key}
              href={href}
              className={styles.card}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Background image */}
              <Image
                src={card.image}
                alt={t(card.altKey)}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.cardImage}
                quality={75}
              />

              {/* Gradient overlay */}
              <div className={styles.cardOverlay} />

              {/* Card content */}
              <div className={styles.cardContent}>
                {!card.available && (
                  <span className={styles.comingSoon}>
                    {t("hero.cards.comingSoon")}
                  </span>
                )}

                <div className={styles.cardBottom}>
                  <div>
                    <h2 className={styles.cardName}>{t(card.nameKey)}</h2>
                    <p className={styles.cardDesc}>{t(card.descKey)}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceBlock}>
                      <span className={styles.priceLabel}>
                        {t("hero.cards.priceLabel")}
                      </span>
                      <span className={styles.price}>{t(card.priceKey)}</span>
                      <span className={styles.priceNote}>
                        {t(card.noteKey)}
                      </span>
                    </div>
                    <span className={styles.cardCta}>
                      {card.available
                        ? t("hero.cards.cta")
                        : t("hero.cards.ctaRequest")}
                      {" →"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Other products link ── */}
      <div className={styles.otherProducts}>
        <Link href={`/${locale}/products`} className={styles.otherLink}>
          {t("hero.otherProducts")}
        </Link>
      </div>
    </section>
  );
}
