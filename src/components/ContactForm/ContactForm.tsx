// src/components/ContactForm/ContactForm.tsx
"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { FaPaperPlane, FaCheck, FaEnvelope } from "react-icons/fa";
import styles from "./ContactForm.module.css";

const FALLBACK_EMAIL = "ubmarket2022@gmail.com";

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent(
      form.subject || "Inquiry from Star Food website",
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\n\n${form.message}`,
    );
    return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          locale,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successBox}>
        <FaCheck className={styles.successIcon} />
        <h3 className={styles.successTitle}>{t("contactForm.successTitle")}</h3>
        <p className={styles.successText}>{t("contactForm.successText")}</p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          {t("contactForm.sendAnother")}
        </button>
      </div>
    );
  }

  const subjects = t.raw("contactForm.subjects") as string[];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>{t("contactForm.title")}</h3>
      <p className={styles.formSubtitle}>{t("contactForm.subtitle")}</p>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>{t("contactForm.name")} *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t("contactForm.namePlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{t("contactForm.email")} *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t("contactForm.emailPlaceholder")}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>{t("contactForm.phone")}</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder={t("contactForm.phonePlaceholder")}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{t("contactForm.subject")}</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">{t("contactForm.subjectDefault")}</option>
            {subjects.map((s: string) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field} style={{ marginBottom: "20px" }}>
        <label className={styles.label}>{t("contactForm.message")} *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className={styles.textarea}
          placeholder={t("contactForm.messagePlaceholder")}
        />
      </div>

      {status === "error" && (
        <div className={styles.errorBox}>
          <div className={styles.errorText}>{t("contactForm.errorText")}</div>
          <a href={buildMailtoLink()} className={styles.errorLink}>
            <FaEnvelope /> {t("contactForm.emailDirect")}
          </a>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending"}
        style={{ width: "100%" }}
      >
        <FaPaperPlane />
        {status === "sending"
          ? t("contactForm.sending")
          : t("contactForm.send")}
      </button>
    </form>
  );
}
