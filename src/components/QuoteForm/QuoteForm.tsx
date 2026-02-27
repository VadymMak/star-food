// src/components/QuoteForm/QuoteForm.tsx
"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { products } from "@/data/products";
import styles from "./QuoteForm.module.css";

export default function QuoteForm() {
  const locale = useLocale();
  const t = useTranslations();
const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product") || "";

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    product: preselectedProduct,
    quantity: "",
    deliveryTerms: "CIF",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success}>
        <FaCheckCircle className={styles.successIcon} />
        <h3>{t("quoteForm.successTitle")}</h3>
        <p>
          {t("quoteForm.successText")}
        </p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          {t("quoteForm.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{t("quoteForm.title")}</h2>
      <p className={styles.subtitle}>
        {t("quoteForm.subtitle")}
      </p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>{t("quoteForm.company")} *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder={t("quoteForm.companyPlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.contactName")} *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t("quoteForm.namePlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.email")} *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t("quoteForm.emailPlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.phone")}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("quoteForm.phonePlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.country")} *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder={t("quoteForm.countryPlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.product")} *</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          >
            <option value="">{t("quoteForm.selectProduct")}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.quantity")}</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder={t("quoteForm.quantityPlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label>{t("quoteForm.deliveryTerms")}</label>
          <select
            name="deliveryTerms"
            value={formData.deliveryTerms}
            onChange={handleChange}
          >
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="DAP">DAP</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldFull}>
        <label>{t("quoteForm.message")}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={
            t("quoteForm.messagePlaceholder")
          }
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending"}
        >
          <FaPaperPlane />{" "}
          {status === "sending"
            ? t("quoteForm.sending")
            : t("quoteForm.submit")}
        </button>
        <p className={styles.noObligation}>
          {t("quoteForm.noObligation")}
        </p>
      </div>

      {status === "error" && (
        <p className={styles.error}>
          {t("quoteForm.errorText")}
        </p>
      )}
    </form>
  );
}
