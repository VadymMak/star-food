"use client";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm/QuoteForm";
import styles from "./quote.module.css";

interface OilEntry {
  volume: string;
  packaging: string;
  type: string | null;
  price: number | null;
}
interface CondimentEntry {
  weight?: string;
  volume?: string;
  type: string | null;
  price: number | null;
}
interface ProductPrices {
  updatedAt: string;
  oils: Record<string, OilEntry[]>;
  condiments: Record<string, CondimentEntry[]>;
}

const OIL_ROWS = [
  {
    label: "Sunflower Oil Unrefined",
    key: "Sunflower Oil",
    volume: "0.5L",
    typeHint: "Unrefined",
  },
  {
    label: "Sunflower Oil Unrefined",
    key: "Sunflower Oil",
    volume: "1L",
    typeHint: "Unrefined",
  },
  {
    label: "Sunflower Oil Unrefined",
    key: "Sunflower Oil",
    volume: "10L",
    typeHint: "Unrefined",
  },
  {
    label: "High-Oleic Sunflower Oil",
    key: "High Oleic Sunflower Oil",
    volume: "10L",
    typeHint: "RBDW",
  },
  {
    label: "Deep-Frying Sunflower Oil",
    key: "Sunflower Oil",
    volume: "10L",
    typeHint: "Deep-frying",
  },
  {
    label: "Deep-Frying High-Oleic",
    key: "High Oleic Sunflower Oil",
    volume: "10L",
    typeHint: "Deep-frying",
  },
];

const CONDIMENT_ROWS = [
  {
    label: "Mayonnaise 30%",
    key: "Mayonnaise sauce",
    typeHint: "0.3",
    weight: "10kg",
  },
  {
    label: "Mayonnaise 67%",
    key: "Mayonnaise sauce",
    typeHint: "0.67",
    weight: "4.5kg",
  },
  {
    label: "Mayonnaise 67%",
    key: "Mayonnaise sauce",
    typeHint: "0.67",
    weight: "10kg",
  },
  {
    label: "Ketchup Lagidny",
    key: "Ketchup",
    typeHint: "Lagidny",
    weight: "5kg",
  },
];

function findOilPrice(
  items: OilEntry[],
  volume: string,
  typeHint?: string,
): number | null {
  return (
    items.find(
      (i) =>
        i.volume === volume &&
        i.price !== null &&
        (typeHint
          ? i.type?.toLowerCase().includes(typeHint.toLowerCase())
          : true),
    )?.price ?? null
  );
}

function findCondimentPrice(
  items: CondimentEntry[],
  weight: string,
  typeHint?: string,
): number | null {
  return (
    items.find(
      (i) =>
        i.weight === weight &&
        i.price !== null &&
        (typeHint
          ? String(i.type).toLowerCase().includes(typeHint.toLowerCase())
          : true),
    )?.price ?? null
  );
}

function PriceTable() {
  const [prices, setPrices] = useState<ProductPrices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/product-prices")
      .then((r) => r.json())
      .then((d: ProductPrices) => {
        setPrices(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.priceTableWrap}>
      <div className={styles.priceTableHeader}>
        <span className={styles.priceTableLabel}>📋 Current Price List</span>
        {prices?.updatedAt && (
          <span className={styles.priceTableDate}>
            Updated: {prices.updatedAt}
          </span>
        )}
      </div>

      {loading ? (
        <div className={styles.priceTableLoading}>Loading prices...</div>
      ) : (
        <table className={styles.priceTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Packaging</th>
              <th>Price (EUR)</th>
            </tr>
          </thead>
          <tbody>
            {OIL_ROWS.map((row, i) => {
              const items = prices?.oils?.[row.key] ?? [];
              const price = findOilPrice(items, row.volume, row.typeHint);
              return (
                <tr key={`oil-${i}`}>
                  <td>{row.label}</td>
                  <td>{row.volume}</td>
                  <td>PET Bottle</td>
                  <td className={price ? styles.priceCell : styles.priceCellNA}>
                    {price ? `€${price.toFixed(2)}` : "On Request"}
                  </td>
                </tr>
              );
            })}
            {CONDIMENT_ROWS.map((row, i) => {
              const items = prices?.condiments?.[row.key] ?? [];
              const price = findCondimentPrice(items, row.weight, row.typeHint);
              return (
                <tr key={`cond-${i}`}>
                  <td>{row.label}</td>
                  <td>{row.weight}</td>
                  <td>Plastic Bucket</td>
                  <td className={price ? styles.priceCell : styles.priceCellNA}>
                    {price ? `€${price.toFixed(2)}` : "On Request"}
                  </td>
                </tr>
              );
            })}
            <tr className={styles.bulkRow}>
              <td>All Oils — Bulk / Tanker</td>
              <td>20L · Canister · Tanker</td>
              <td>Canister / Tanker</td>
              <td className={styles.priceCellNA}>On Request</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className={styles.contactOptions}>
        <a
          href="https://wa.me/359884469860"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          💬 WhatsApp
        </a>
        <a href="tel:+359884469860" className={styles.phoneBtn}>
          📞 Call Us
        </a>
      </div>
    </div>
  );
}

function QuoteContent() {
  const locale = useLocale();
  const t = useTranslations();

  const breadcrumbItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("quotePage.breadcrumb") },
  ];

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.inner}>
          <PriceTable />
          <div className={styles.formDivider}>
            <span>or fill in the request form below</span>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <QuoteContent />
    </Suspense>
  );
}
