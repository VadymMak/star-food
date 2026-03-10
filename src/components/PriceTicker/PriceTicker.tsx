"use client";

// src/components/PriceTicker/PriceTicker.tsx
// Shows IMF benchmark sunflower oil price from FRED API
// + manual price ranges from env variables
// Updates every 24h via server-side cache

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./PriceTicker.module.css";

interface PriceData {
  price: number | null;
  date: string | null;
  source: string;
  fallback: boolean;
}

// Manual price ranges — update in .env.local when needed
// These are the "from~to" ranges shown on the cards
const MANUAL_PRICES = {
  refined: { from: 1500, to: 1800 },
  highOleic: { from: 1650, to: 1950 },
  meal: { from: 230, to: 320 },
};

function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default function PriceTicker() {
  const t = useTranslations();
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((d: PriceData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setData({ price: null, date: null, source: "IMF", fallback: true });
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.ticker}>
      {/* Left: live dot + label */}
      <div className={styles.liveBlock}>
        <span className={styles.liveDot} />
        <span className={styles.liveLabel}>{t("ticker.marketUpdate")}</span>
      </div>

      {/* Price items */}
      <div className={styles.items}>
        {/* IMF Benchmark — from FRED API */}
        <div className={styles.item}>
          <span className={styles.itemLabel}>{t("ticker.benchmark")}</span>
          <span className={styles.itemValue}>
            {loading ? (
              <span className={styles.skeleton} />
            ) : data?.price ? (
              <>
                {formatPrice(data.price)}
                <span className={styles.unit}>/MT</span>
              </>
            ) : (
              <span className={styles.na}>—</span>
            )}
          </span>
        </div>

        <span className={styles.sep}>·</span>

        {/* Refined Oil range */}
        <div className={styles.item}>
          <span className={styles.itemLabel}>{t("ticker.refined")}</span>
          <span className={styles.itemValue}>
            {formatPrice(MANUAL_PRICES.refined.from)}–
            {formatPrice(MANUAL_PRICES.refined.to)}
            <span className={styles.unit}>/MT</span>
          </span>
        </div>

        <span className={styles.sep}>·</span>

        {/* High-Oleic range */}
        <div className={styles.item}>
          <span className={styles.itemLabel}>{t("ticker.highOleic")}</span>
          <span className={styles.itemValue}>
            {formatPrice(MANUAL_PRICES.highOleic.from)}–
            {formatPrice(MANUAL_PRICES.highOleic.to)}
            <span className={styles.unit}>/MT</span>
          </span>
        </div>

        <span className={styles.sep}>·</span>

        {/* Meal range */}
        <div className={styles.item}>
          <span className={styles.itemLabel}>{t("ticker.meal")}</span>
          <span className={styles.itemValue}>
            {formatPrice(MANUAL_PRICES.meal.from)}–
            {formatPrice(MANUAL_PRICES.meal.to)}
            <span className={styles.unit}>/MT</span>
          </span>
        </div>
      </div>

      {/* Right: source + date */}
      <div className={styles.source}>
        {data?.date && (
          <span className={styles.sourceText}>
            {t("ticker.source")} · {data.date}
          </span>
        )}
        {!loading && !data?.date && (
          <span className={styles.sourceText}>{t("ticker.source")}</span>
        )}
      </div>
    </div>
  );
}
