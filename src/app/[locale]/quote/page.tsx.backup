"use client";

import { Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm/QuoteForm";
import styles from "./quote.module.css";

function QuoteContent() {
  const { locale, t } = useLanguage();
  const qp = t?.quotePage || {};

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: qp.breadcrumb || "Request Quote" },
  ];

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}><Breadcrumbs items={breadcrumbItems} /></div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
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
