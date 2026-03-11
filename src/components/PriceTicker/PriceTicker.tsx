"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./PriceTicker.module.css";

interface PriceData {
  price: number | null;
  date: string | null;
  source: string;
  fallback: boolean;
}

const WHOLESALE = {
  refined: { from: 1500, to: 1800 },
  highOleic: { from: 1650, to: 1950 },
  meal: { from: 230, to: 320 },
};

const RETAIL = {
  refined: { from: 0.85, to: 1.1 },
  highOleic: { from: 1.0, to: 1.3 },
};

function fMT(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}
function fL(n: number) {
  return `$${n.toFixed(2)}`;
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
      {/* LEFT: live indicator */}
      <div className={styles.left}>
        <span className={styles.liveDot} />
        <div className={styles.leftText}>
          <span className={styles.liveLabel}>{t("ticker.marketUpdate")}</span>
          {data?.date && <span className={styles.date}>{data.date}</span>}
        </div>
      </div>

      {/* CENTER: two rows */}
      <div className={styles.rows}>
        {/* Row 1 — Wholesale */}
        <div className={styles.row}>
          <span className={styles.rowBadge + " " + styles.badgeWholesale}>
            {t("ticker.wholesale")}
          </span>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.benchmark")}</span>
              <span className={styles.itemValue}>
                {loading ? (
                  <span className={styles.skeleton} />
                ) : data?.price ? (
                  <>
                    {fMT(data.price)}
                    <span className={styles.unit}>/MT</span>
                  </>
                ) : (
                  <span className={styles.na}>—</span>
                )}
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.refined")}</span>
              <span className={styles.itemValue}>
                {fMT(WHOLESALE.refined.from)}–{fMT(WHOLESALE.refined.to)}
                <span className={styles.unit}>/MT</span>
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.highOleic")}</span>
              <span className={styles.itemValue}>
                {fMT(WHOLESALE.highOleic.from)}–{fMT(WHOLESALE.highOleic.to)}
                <span className={styles.unit}>/MT</span>
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.meal")}</span>
              <span className={styles.itemValue}>
                {fMT(WHOLESALE.meal.from)}–{fMT(WHOLESALE.meal.to)}
                <span className={styles.unit}>/MT</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rowDivider} />

        {/* Row 2 — Retail */}
        <div className={styles.row}>
          <span className={styles.rowBadge + " " + styles.badgeRetail}>
            {t("ticker.retail")}
          </span>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.refined")}</span>
              <span className={styles.itemValueRetail}>
                {fL(RETAIL.refined.from)}–{fL(RETAIL.refined.to)}
                <span className={styles.unit}>/L</span>
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.highOleic")}</span>
              <span className={styles.itemValueRetail}>
                {fL(RETAIL.highOleic.from)}–{fL(RETAIL.highOleic.to)}
                <span className={styles.unit}>/L</span>
              </span>
            </div>
            <span className={styles.sep}>·</span>
            <div className={styles.item}>
              <span className={styles.itemLabel}>{t("ticker.bottles")}</span>
              <span className={styles.itemValueRetail}>
                {t("ticker.bottleSizes")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: source */}
      <div className={styles.right}>
        <span className={styles.sourceText}>{t("ticker.source")}</span>
      </div>
    </div>
  );
}
