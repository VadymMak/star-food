"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm/QuoteForm";
import styles from "./quote.module.css";

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
