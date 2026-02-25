// src/components/ContactForm/ContactForm.tsx
"use client";

import React, { useState } from "react";
import { FaPaperPlane, FaCheck, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ContactForm.module.css";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const FALLBACK_EMAIL = "ubmarket2022@gmail.com";

export default function ContactForm() {
  const { t } = useLanguage();
  const cf = t.contactForm;

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
      // 1. Send to Web3Forms (client-side — works with Cloudflare)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: "Star Food Website",
          subject: `[Star Food] ${form.subject || "New inquiry"}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = await res.json();

      // 2. Send Telegram notification via API route (fire-and-forget)
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      }).catch(() => {}); // Silent — don't break form if Telegram fails

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
        <h3 className={styles.successTitle}>{cf.successTitle}</h3>
        <p className={styles.successText}>{cf.successText}</p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          {cf.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>{cf.title}</h3>
      <p className={styles.formSubtitle}>{cf.subtitle}</p>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>{cf.name} *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={cf.namePlaceholder}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{cf.email} *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={cf.emailPlaceholder}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>{cf.phone}</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder={cf.phonePlaceholder}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{cf.subject}</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">{cf.subjectDefault}</option>
            {cf.subjects.map((s: string) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field} style={{ marginBottom: "20px" }}>
        <label className={styles.label}>{cf.message} *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className={styles.textarea}
          placeholder={cf.messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <div className={styles.errorBox}>
          <div className={styles.errorText}>{cf.errorText}</div>
          <a href={buildMailtoLink()} className={styles.errorLink}>
            <FaEnvelope /> {cf.emailDirect}
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
        {status === "sending" ? cf.sending : cf.send}
      </button>
    </form>
  );
}
