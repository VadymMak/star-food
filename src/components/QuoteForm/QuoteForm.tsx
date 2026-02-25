// src/components/QuoteForm/QuoteForm.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./QuoteForm.module.css";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function QuoteForm() {
  const { t } = useLanguage();
  const qf = t?.quoteForm || {};
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
      // 1. Send to Web3Forms (client-side)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Quote Request: ${formData.product || "General"}`,
          from_name: formData.company || formData.name,
          ...formData,
        }),
      });

      const data = await res.json();

      // 2. Send Telegram notification (fire-and-forget)
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          company: formData.company,
          contact: formData.name,
          email: formData.email,
          country: formData.country,
          product: formData.product,
          quantity: formData.quantity,
          deliveryTerms: formData.deliveryTerms,
          message: formData.message,
        }),
      }).catch(() => {});

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
        <h3>{qf.successTitle || "Quote Request Sent!"}</h3>
        <p>
          {qf.successText ||
            "We will respond within 24 hours with a personalized quote."}
        </p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          {qf.sendAnother || "Send Another Request"}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{qf.title || "Request a Quote"}</h2>
      <p className={styles.subtitle}>
        {qf.subtitle ||
          "Fill in your requirements and we'll get back to you within 24 hours."}
      </p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>{qf.company || "Company Name"} *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder={qf.companyPlaceholder || "Your company name"}
          />
        </div>
        <div className={styles.field}>
          <label>{qf.contactName || "Contact Name"} *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={qf.namePlaceholder || "Your name"}
          />
        </div>
        <div className={styles.field}>
          <label>{qf.email || "Email"} *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={qf.emailPlaceholder || "your@email.com"}
          />
        </div>
        <div className={styles.field}>
          <label>{qf.phone || "Phone"}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={qf.phonePlaceholder || "+1 234 567 890"}
          />
        </div>
        <div className={styles.field}>
          <label>{qf.country || "Country"} *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder={qf.countryPlaceholder || "Your country"}
          />
        </div>
        <div className={styles.field}>
          <label>{qf.product || "Product"} *</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          >
            <option value="">{qf.selectProduct || "Select a product"}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>{qf.quantity || "Quantity (tons)"}</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder={qf.quantityPlaceholder || "e.g. 20 tons"}
          />
        </div>
        <div className={styles.field}>
          <label>{qf.deliveryTerms || "Delivery Terms"}</label>
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
        <label>{qf.message || "Additional Requirements"}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={
            qf.messagePlaceholder ||
            "Packaging preferences, delivery schedule, or any other details..."
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
            ? qf.sending || "Sending..."
            : qf.submit || "Request Quote"}
        </button>
        <p className={styles.noObligation}>
          {qf.noObligation || "No obligation — free quote within 24 hours."}
        </p>
      </div>

      {status === "error" && (
        <p className={styles.error}>
          {qf.errorText ||
            "Something went wrong. Please email us directly at ubmarket2022@gmail.com"}
        </p>
      )}
    </form>
  );
}
