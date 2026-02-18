"""
STEPS 15+16: Brand Page + TrustedBy + Partners + Quote
RUN FROM star-food ROOT:
  python step15_16.py

Creates:
  src/app/[locale]/brands/star-food/page.tsx + CSS
  src/app/[locale]/partners/page.tsx + CSS
  src/app/[locale]/quote/page.tsx + CSS
  src/components/TrustedBy/TrustedBy.tsx + CSS
  src/components/QuoteForm/QuoteForm.tsx + CSS
  Updates: homepage page.tsx, Footer, Header, all i18n files
"""

import os
import json

files = {}

# ============================================================
# 1. TrustedBy component (homepage section)
# ============================================================
files["src/components/TrustedBy/TrustedBy.tsx"] = '''"use client";

import { FaShieldAlt, FaLeaf, FaCertificate, FaGlobeEurope, FaAward } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./TrustedBy.module.css";

const badges = [
  { icon: FaCertificate, label: "ISO 22000" },
  { icon: FaShieldAlt, label: "HACCP" },
  { icon: FaLeaf, label: "Non-GMO" },
  { icon: FaGlobeEurope, label: "EU Food Safety" },
  { icon: FaAward, label: "Quality Assured" },
];

export default function TrustedBy() {
  const { t } = useLanguage();
  const tb = t?.trustedBy || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className="section-label">{tb.label || "Trusted Standards"}</span>
        <h2 className={styles.title}>{tb.title || "Certified Quality You Can Trust"}</h2>
        <div className={styles.badges}>
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className={styles.badge}>
                <Icon className={styles.badgeIcon} />
                <span className={styles.badgeLabel}>{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/TrustedBy/TrustedBy.module.css"] = '''.section {
  padding: 60px 20px;
  background: var(--dark-section, #0d0d0d);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.inner {
  max-width: var(--max-w, 1200px);
  margin: 0 auto;
  text-align: center;
}

.title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--white, #fff);
  margin-bottom: 32px;
}

.badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 28px;
  background: var(--dark-card, #111);
  border-radius: var(--radius, 8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  min-width: 140px;
  transition: all 0.3s ease;
}

.badge:hover {
  border-color: rgba(212, 168, 67, 0.3);
  transform: translateY(-2px);
}

.badgeIcon {
  font-size: 1.8rem;
  color: var(--gold, #d4a843);
}

.badgeLabel {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text, #e8e8e8);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .badges {
    gap: 12px;
  }
  .badge {
    min-width: 120px;
    padding: 16px 20px;
  }
}
'''

# ============================================================
# 2. QuoteForm component (reusable)
# ============================================================
files["src/components/QuoteForm/QuoteForm.tsx"] = '''"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./QuoteForm.module.css";

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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_KEY",
          subject: `Quote Request: ${formData.product || "General"}`,
          from_name: formData.company || formData.name,
          ...formData,
        }),
      });
      if (res.ok) {
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
        <p>{qf.successText || "We will respond within 24 hours with a personalized quote."}</p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          {qf.sendAnother || "Send Another Request"}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{qf.title || "Request a Quote"}</h2>
      <p className={styles.subtitle}>{qf.subtitle || "Fill in your requirements and we'll get back to you within 24 hours."}</p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>{qf.company || "Company Name"} *</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder={qf.companyPlaceholder || "Your company name"} />
        </div>
        <div className={styles.field}>
          <label>{qf.contactName || "Contact Name"} *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={qf.namePlaceholder || "Your name"} />
        </div>
        <div className={styles.field}>
          <label>{qf.email || "Email"} *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={qf.emailPlaceholder || "your@email.com"} />
        </div>
        <div className={styles.field}>
          <label>{qf.phone || "Phone"}</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={qf.phonePlaceholder || "+1 234 567 890"} />
        </div>
        <div className={styles.field}>
          <label>{qf.country || "Country"} *</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder={qf.countryPlaceholder || "Your country"} />
        </div>
        <div className={styles.field}>
          <label>{qf.product || "Product"} *</label>
          <select name="product" value={formData.product} onChange={handleChange} required>
            <option value="">{qf.selectProduct || "Select a product"}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>{qf.quantity || "Quantity (tons)"}</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder={qf.quantityPlaceholder || "e.g. 20 tons"} />
        </div>
        <div className={styles.field}>
          <label>{qf.deliveryTerms || "Delivery Terms"}</label>
          <select name="deliveryTerms" value={formData.deliveryTerms} onChange={handleChange}>
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="DAP">DAP</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldFull}>
        <label>{qf.message || "Additional Requirements"}</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder={qf.messagePlaceholder || "Packaging preferences, delivery schedule, or any other details..."} />
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          <FaPaperPlane /> {status === "sending" ? (qf.sending || "Sending...") : (qf.submit || "Request Quote")}
        </button>
        <p className={styles.noObligation}>{qf.noObligation || "No obligation — free quote within 24 hours."}</p>
      </div>

      {status === "error" && (
        <p className={styles.error}>{qf.errorText || "Something went wrong. Please email us directly at ubmarket2022@gmail.com"}</p>
      )}
    </form>
  );
}
'''

files["src/components/QuoteForm/QuoteForm.module.css"] = '''.form {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--white, #fff);
  margin-bottom: 8px;
  text-align: center;
}

.subtitle {
  color: var(--text-muted, #999);
  text-align: center;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text, #e8e8e8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field input,
.field select,
.fieldFull textarea {
  padding: 12px 16px;
  background: var(--dark-card, #111);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm, 4px);
  color: var(--text, #e8e8e8);
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.field input:focus,
.field select:focus,
.fieldFull textarea:focus {
  outline: none;
  border-color: var(--gold, #d4a843);
}

.field select {
  cursor: pointer;
}

.field select option {
  background: #111;
  color: #e8e8e8;
}

.fieldFull {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
}

.fieldFull label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text, #e8e8e8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fieldFull textarea {
  resize: vertical;
  min-height: 100px;
}

.actions {
  text-align: center;
}

.noObligation {
  margin-top: 12px;
  font-size: 0.8rem;
  color: var(--text-muted, #999);
}

.error {
  margin-top: 16px;
  color: #ff6b6b;
  text-align: center;
  font-size: 0.9rem;
}

.success {
  text-align: center;
  padding: 60px 20px;
}

.successIcon {
  font-size: 3rem;
  color: var(--gold, #d4a843);
  margin-bottom: 16px;
}

.success h3 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--white, #fff);
  margin-bottom: 10px;
}

.success p {
  color: var(--text-muted, #999);
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
'''

# ============================================================
# 3. Brand page — /brands/star-food
# ============================================================
files["src/app/[locale]/brands/star-food/page.tsx"] = '''"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaEnvelope, FaHandshake, FaPalette } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./brand.module.css";

export default function StarFoodBrandPage() {
  const { locale, t } = useLanguage();
  const bp = t?.brandPage || {};

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: bp.breadcrumb || "Star Food Brand" },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className="section-label">{bp.label || "Our Brand"}</span>
              <h1 className={styles.heroTitle}>{bp.title || "Star Food — Quality You Can Trust"}</h1>
              <p className={styles.heroDesc}>{bp.description || "Star Food is the flagship brand of UB Market LTD. We bring premium food products from verified Eastern European producers to wholesale buyers across Europe."}</p>
              <div className="btn-group">
                <Link href={`/${locale}/quote`} className="btn btn-primary">
                  <FaEnvelope /> {bp.ctaQuote || "Request Price List"}
                </Link>
                <Link href={`/${locale}/partners`} className="btn btn-outline">
                  <FaHandshake /> {bp.ctaPartner || "Become a Distributor"}
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image
                src="/icons/logo.webp"
                alt="Star Food Logo"
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Lineup */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className="section-label">{bp.lineupLabel || "Product Range"}</span>
          <h2 className={styles.sectionTitle}>{bp.lineupTitle || "Star Food Product Lineup"}</h2>
          <div className={styles.productGrid}>
            {products.map((product) => {
              const translated = t?.products?.items?.[product.id as string];
              return (
                <Link key={product.id} href={`/${locale}/products/${product.slug}`} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <Image src={product.image} alt={translated?.name || product.name} fill sizes="33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <h3 className={styles.productName}>{translated?.name || product.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <span className="section-label">{bp.qualityLabel || "Quality Standards"}</span>
          <h2 className={styles.sectionTitle}>{bp.qualityTitle || "Our Commitment to Quality"}</h2>
          <div className={styles.qualityGrid}>
            {[
              { label: "ISO 22000", text: bp.iso || "Food safety management system certification" },
              { label: "HACCP", text: bp.haccp || "Hazard analysis and critical control points compliance" },
              { label: "Non-GMO", text: bp.nongmo || "All products sourced from non-GMO verified suppliers" },
              { label: "EU Standards", text: bp.eu || "Full compliance with European food safety regulations" },
            ].map((item) => (
              <div key={item.label} className={styles.qualityCard}>
                <FaCheckCircle className={styles.qualityIcon} />
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed By */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.designedBy}>
            <FaPalette className={styles.designIcon} />
            <div>
              <h3 className={styles.designTitle}>{bp.designedByTitle || "Label Design"}</h3>
              <p className={styles.designText}>
                {bp.designedByText || "All Star Food product labels were designed by Anastasiia Kolisnyk, a professional illustrator and designer."}
              </p>
              <a href="https://akillustrator.com" target="_blank" rel="noopener noreferrer" className={styles.designLink}>
                {bp.designedByLink || "Visit AK Illustrator Portfolio →"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
'''

files["src/app/[locale]/brands/star-food/brand.module.css"] = '''.inner {
  max-width: var(--max-w, 1200px);
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumbSection {
  padding-top: calc(var(--header-height, 80px) + 16px);
  background: var(--dark, #0a0a0a);
}

/* ===== HERO ===== */
.hero { padding: 40px 0 80px; background: var(--dark, #0a0a0a); }
.heroGrid { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }
.heroText { max-width: 600px; }
.heroTitle { font-family: var(--font-display); font-size: 2.6rem; color: var(--white); margin-bottom: 20px; line-height: 1.2; }
.heroDesc { color: var(--text-muted, #999); font-size: 1.05rem; line-height: 1.7; margin-bottom: 30px; }
.heroImage { background: var(--dark-card, #111); border-radius: var(--radius, 8px); padding: 40px; border: 1px solid rgba(255,255,255,0.06); }

/* ===== SECTIONS ===== */
.section { padding: 80px 0; background: var(--dark, #0a0a0a); }
.sectionDark { padding: 80px 0; background: var(--dark-section, #0d0d0d); }
.sectionTitle { font-family: var(--font-display); font-size: 2rem; color: var(--white); margin-bottom: 40px; }

/* ===== PRODUCT GRID ===== */
.productGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.productCard { display: block; text-decoration: none; background: var(--dark-card, #111); border-radius: var(--radius, 8px); overflow: hidden; border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s ease; }
.productCard:hover { border-color: rgba(212,168,67,0.3); transform: translateY(-4px); }
.productImage { position: relative; aspect-ratio: 4/3; }
.productName { padding: 16px; font-family: var(--font-display); font-size: 1rem; color: var(--white); text-align: center; }

/* ===== QUALITY GRID ===== */
.qualityGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.qualityCard { background: var(--dark-card, #111); border-radius: var(--radius, 8px); padding: 28px; border: 1px solid rgba(255,255,255,0.06); text-align: center; }
.qualityCard h3 { font-family: var(--font-display); font-size: 1.1rem; color: var(--gold, #d4a843); margin: 12px 0 8px; }
.qualityCard p { font-size: 0.85rem; color: var(--text-muted, #999); line-height: 1.5; }
.qualityIcon { font-size: 1.6rem; color: var(--gold, #d4a843); }

/* ===== DESIGNED BY ===== */
.designedBy { display: flex; gap: 24px; align-items: flex-start; background: var(--dark-card, #111); border-radius: var(--radius, 8px); padding: 32px; border: 1px solid rgba(212,168,67,0.15); }
.designIcon { font-size: 2rem; color: var(--gold, #d4a843); flex-shrink: 0; margin-top: 4px; }
.designTitle { font-family: var(--font-display); font-size: 1.2rem; color: var(--white); margin-bottom: 8px; }
.designText { color: var(--text-muted, #999); font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px; }
.designLink { color: var(--gold, #d4a843); text-decoration: none; font-weight: 600; font-size: 0.9rem; }
.designLink:hover { color: var(--gold-light, #f0d78c); text-decoration: underline; }

@media (max-width: 900px) {
  .heroGrid { grid-template-columns: 1fr; }
  .heroImage { display: none; }
  .productGrid { grid-template-columns: repeat(2, 1fr); }
  .qualityGrid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .heroTitle { font-size: 1.8rem; }
  .productGrid { grid-template-columns: 1fr; }
  .qualityGrid { grid-template-columns: 1fr; }
  .designedBy { flex-direction: column; }
}
'''

# ============================================================
# 4. Partners page
# ============================================================
files["src/app/[locale]/partners/page.tsx"] = '''"use client";

import Link from "next/link";
import { FaCheckCircle, FaTruck, FaHandshake, FaChartLine, FaUserTie, FaGlobeEurope, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./partners.module.css";

export default function PartnersPage() {
  const { locale, t } = useLanguage();
  const pp = t?.partnersPage || {};

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: pp.breadcrumb || "Partners" },
  ];

  const benefits = [
    { icon: FaChartLine, title: pp.benefit1Title || "Competitive Pricing", text: pp.benefit1Text || "Direct access to factory prices with transparent margin structure." },
    { icon: FaTruck, title: pp.benefit2Title || "Reliable Logistics", text: pp.benefit2Text || "Road transport delivery across 12+ EU countries, on time." },
    { icon: FaUserTie, title: pp.benefit3Title || "Personal Manager", text: pp.benefit3Text || "Dedicated account manager for all your orders and inquiries." },
    { icon: FaGlobeEurope, title: pp.benefit4Title || "EU Compliance", text: pp.benefit4Text || "All documentation, certificates, and labeling meet EU standards." },
  ];

  const partnerTypes = [
    { title: pp.type1 || "Distributors", text: pp.type1Text || "Wholesale distribution across your region with exclusive territory options." },
    { title: pp.type2 || "Retailers", text: pp.type2Text || "Direct supply to supermarket chains and specialty food stores." },
    { title: pp.type3 || "HORECA", text: pp.type3Text || "Bulk supply for restaurants, hotels, and catering companies." },
  ];

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}><Breadcrumbs items={breadcrumbItems} /></div>
      </section>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className="section-label">{pp.label || "Partnership"}</span>
          <h1 className={styles.heroTitle}>{pp.title || "Become a Star Food Partner"}</h1>
          <p className={styles.heroSubtitle}>{pp.subtitle || "Join our growing network of distributors and retailers across Europe. We offer competitive pricing, reliable supply, and dedicated support."}</p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaEnvelope /> {pp.cta || "Apply for Partnership"}
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>{pp.benefitsTitle || "Why Partner With Us"}</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className={styles.benefitCard}>
                  <Icon className={styles.benefitIcon} />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>{pp.typesTitle || "Partnership Types"}</h2>
          <div className={styles.typesGrid}>
            {partnerTypes.map((pt, i) => (
              <div key={i} className={styles.typeCard}>
                <FaCheckCircle className={styles.typeIcon} />
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <h2 className={styles.ctaTitle}>{pp.ctaTitle || "Ready to Get Started?"}</h2>
          <p className={styles.ctaText}>{pp.ctaText || "Send us a quote request and our team will contact you within 24 hours."}</p>
          <Link href={`/${locale}/quote`} className="btn btn-primary">
            <FaHandshake /> {pp.ctaButton || "Request Partnership Info"}
          </Link>
        </div>
      </section>
    </>
  );
}
'''

files["src/app/[locale]/partners/partners.module.css"] = '''.inner { max-width: var(--max-w, 1200px); margin: 0 auto; padding: 0 20px; }
.breadcrumbSection { padding-top: calc(var(--header-height, 80px) + 16px); background: var(--dark, #0a0a0a); }

.hero { padding: 40px 0 80px; background: var(--dark, #0a0a0a); text-align: center; }
.heroTitle { font-family: var(--font-display); font-size: 2.6rem; color: var(--white); margin-bottom: 20px; }
.heroSubtitle { color: var(--text-muted, #999); font-size: 1.1rem; max-width: 650px; margin: 0 auto 30px; line-height: 1.7; }

.section { padding: 80px 0; background: var(--dark, #0a0a0a); }
.sectionDark { padding: 80px 0; background: var(--dark-section, #0d0d0d); }
.sectionTitle { font-family: var(--font-display); font-size: 2rem; color: var(--white); margin-bottom: 40px; text-align: center; }

.benefitsGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.benefitCard { background: var(--dark-card, #111); border-radius: var(--radius, 8px); padding: 28px; border: 1px solid rgba(255,255,255,0.06); text-align: center; transition: all 0.3s ease; }
.benefitCard:hover { border-color: rgba(212,168,67,0.3); transform: translateY(-2px); }
.benefitIcon { font-size: 2rem; color: var(--gold, #d4a843); margin-bottom: 16px; }
.benefitCard h3 { font-family: var(--font-display); font-size: 1.05rem; color: var(--white); margin-bottom: 10px; }
.benefitCard p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

.typesGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.typeCard { background: var(--dark-card, #111); border-radius: var(--radius, 8px); padding: 28px; border: 1px solid rgba(255,255,255,0.06); }
.typeIcon { font-size: 1.2rem; color: var(--gold, #d4a843); margin-bottom: 12px; }
.typeCard h3 { font-family: var(--font-display); font-size: 1.1rem; color: var(--gold, #d4a843); margin-bottom: 10px; }
.typeCard p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

.ctaSection { padding: 80px 0; background: var(--dark, #0a0a0a); text-align: center; }
.ctaTitle { font-family: var(--font-display); font-size: 2rem; color: var(--white); margin-bottom: 16px; }
.ctaText { color: var(--text-muted); margin-bottom: 30px; font-size: 1.05rem; }

@media (max-width: 900px) { .benefitsGrid { grid-template-columns: repeat(2, 1fr); } .typesGrid { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .benefitsGrid { grid-template-columns: 1fr; } .heroTitle { font-size: 1.8rem; } }
'''

# ============================================================
# 5. Quote page
# ============================================================
files["src/app/[locale]/quote/page.tsx"] = '''"use client";

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
'''

files["src/app/[locale]/quote/quote.module.css"] = '''.inner { max-width: var(--max-w, 1200px); margin: 0 auto; padding: 0 20px; }
.breadcrumbSection { padding-top: calc(var(--header-height, 80px) + 16px); background: var(--dark, #0a0a0a); }
.section { padding: 40px 0 80px; background: var(--dark, #0a0a0a); }
'''

# ============================================================
# 6. Updated homepage — add TrustedBy
# ============================================================
files["src/app/[locale]/page.tsx"] = '''// src/app/[locale]/page.tsx — Homepage (locale-aware)
import Hero from "@/components/Hero/Hero";
import TrustNumbers from "@/components/TrustNumbers/TrustNumbers";
import TrustedBy from "@/components/TrustedBy/TrustedBy";
import AboutPreview from "@/components/AboutPreview/AboutPreview";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Logistics from "@/components/Logistics/Logistics";
import CTASection from "@/components/CTASection/CTASection";
import ContactStrip from "@/components/ContactStrip/ContactStrip";
import MapSection from "@/components/MapSection/MapSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustNumbers />
      <TrustedBy />
      <AboutPreview />
      <ProductsGrid />
      <HowWeWork />
      <Logistics />
      <CTASection />
      <ContactStrip />
      <MapSection />
    </>
  );
}
'''

# ============================================================
# 7. Updated Footer — add "Designed by" credit
# ============================================================
files["src/components/Footer/Footer.tsx"] = '''"use client";

import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {t?.footer?.copyright || "UB Market LTD. All rights reserved."}
        </p>

        <div className={styles.social}>
          <a href="https://www.instagram.com/ub_market_ltd" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://t.me/ub_market_ltd" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegram /></a>
          <a href="https://wa.me/+359884469860" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>

        <p className={styles.email}>E-mail: ubmarket2022@gmail.com</p>

        <p className={styles.credit}>
          Label design by{" "}
          <a href="https://akillustrator.com" target="_blank" rel="noopener noreferrer">
            Anastasiia Kolisnyk — AK Illustrator
          </a>
        </p>
      </div>
    </footer>
  );
}
'''

files["src/components/Footer/Footer.module.css"] = '''.footer {
  background: var(--dark-section, #0d0d0d);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 40px 20px;
  text-align: center;
}

.content {
  max-width: var(--max-w, 1200px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-muted, #999);
}

.social {
  display: flex;
  gap: 20px;
}

.social a {
  color: var(--text-muted, #999);
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social a:hover {
  color: var(--gold, #d4a843);
}

.email {
  font-size: 0.82rem;
  color: var(--text-muted, #999);
}

.credit {
  font-size: 0.75rem;
  color: var(--text-muted, #666);
}

.credit a {
  color: var(--gold, #d4a843);
  text-decoration: none;
}

.credit a:hover {
  text-decoration: underline;
}
'''

# ============================================================
# WRITE ALL CODE FILES
# ============================================================
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"✅ Written: {path}")

# ============================================================
# 8. Update all 6 i18n files with new page translations
# ============================================================
new_translations = {
    "en": {
        "trustedBy": {"label": "Trusted Standards", "title": "Certified Quality You Can Trust"},
        "brandPage": {"breadcrumb": "Star Food Brand", "label": "Our Brand", "title": "Star Food — Quality You Can Trust", "description": "Star Food is the flagship brand of UB Market LTD. We bring premium food products from verified Eastern European producers to wholesale buyers across Europe.", "ctaQuote": "Request Price List", "ctaPartner": "Become a Distributor", "lineupLabel": "Product Range", "lineupTitle": "Star Food Product Lineup", "qualityLabel": "Quality Standards", "qualityTitle": "Our Commitment to Quality", "iso": "Food safety management system certification", "haccp": "Hazard analysis and critical control points compliance", "nongmo": "All products sourced from non-GMO verified suppliers", "eu": "Full compliance with European food safety regulations", "designedByTitle": "Label Design", "designedByText": "All Star Food product labels were designed by Anastasiia Kolisnyk, a professional illustrator and designer.", "designedByLink": "Visit AK Illustrator Portfolio →"},
        "partnersPage": {"breadcrumb": "Partners", "label": "Partnership", "title": "Become a Star Food Partner", "subtitle": "Join our growing network of distributors and retailers across Europe.", "cta": "Apply for Partnership", "benefitsTitle": "Why Partner With Us", "benefit1Title": "Competitive Pricing", "benefit1Text": "Direct access to factory prices with transparent margin structure.", "benefit2Title": "Reliable Logistics", "benefit2Text": "Road transport delivery across 12+ EU countries, on time.", "benefit3Title": "Personal Manager", "benefit3Text": "Dedicated account manager for all your orders and inquiries.", "benefit4Title": "EU Compliance", "benefit4Text": "All documentation, certificates, and labeling meet EU standards.", "typesTitle": "Partnership Types", "type1": "Distributors", "type1Text": "Wholesale distribution across your region with exclusive territory options.", "type2": "Retailers", "type2Text": "Direct supply to supermarket chains and specialty food stores.", "type3": "HORECA", "type3Text": "Bulk supply for restaurants, hotels, and catering companies.", "ctaTitle": "Ready to Get Started?", "ctaText": "Send us a quote request and our team will contact you within 24 hours.", "ctaButton": "Request Partnership Info"},
        "quotePage": {"breadcrumb": "Request Quote"},
        "quoteForm": {"title": "Request a Quote", "subtitle": "Fill in your requirements and we'll get back to you within 24 hours.", "company": "Company Name", "companyPlaceholder": "Your company name", "contactName": "Contact Name", "namePlaceholder": "Your name", "email": "Email", "emailPlaceholder": "your@email.com", "phone": "Phone", "phonePlaceholder": "+1 234 567 890", "country": "Country", "countryPlaceholder": "Your country", "product": "Product", "selectProduct": "Select a product", "quantity": "Quantity (tons)", "quantityPlaceholder": "e.g. 20 tons", "deliveryTerms": "Delivery Terms", "message": "Additional Requirements", "messagePlaceholder": "Packaging preferences, delivery schedule, or any other details...", "submit": "Request Quote", "sending": "Sending...", "noObligation": "No obligation — free quote within 24 hours.", "successTitle": "Quote Request Sent!", "successText": "We will respond within 24 hours with a personalized quote.", "sendAnother": "Send Another Request", "errorText": "Something went wrong. Please email us directly at ubmarket2022@gmail.com"}
    },
    "bg": {
        "trustedBy": {"label": "Надеждни стандарти", "title": "Сертифицирано качество, на което можете да вярвате"},
        "brandPage": {"breadcrumb": "Марка Star Food", "label": "Нашата марка", "title": "Star Food — Качество, на което можете да вярвате", "description": "Star Food е водещата марка на UB Market LTD.", "ctaQuote": "Поискай ценоразпис", "ctaPartner": "Стани дистрибутор", "lineupLabel": "Продуктова гама", "lineupTitle": "Продукти Star Food", "qualityLabel": "Стандарти за качество", "qualityTitle": "Нашият ангажимент към качеството", "designedByTitle": "Дизайн на етикети", "designedByText": "Всички етикети на Star Food са дизайнирани от Анастасия Колесник.", "designedByLink": "Посетете портфолиото на AK Illustrator →"},
        "partnersPage": {"breadcrumb": "Партньори", "label": "Партньорство", "title": "Станете партньор на Star Food", "subtitle": "Присъединете се към нашата растяща мрежа от дистрибутори в Европа.", "cta": "Кандидатствайте", "benefitsTitle": "Защо да партнирате с нас", "typesTitle": "Видове партньорство", "ctaTitle": "Готови да започнете?", "ctaButton": "Поискайте информация"},
        "quotePage": {"breadcrumb": "Заявка за оферта"},
        "quoteForm": {"title": "Заявка за оферта", "subtitle": "Попълнете изискванията и ще се свържем в рамките на 24 часа.", "company": "Фирма", "contactName": "Лице за контакт", "email": "Имейл", "phone": "Телефон", "country": "Държава", "product": "Продукт", "selectProduct": "Изберете продукт", "quantity": "Количество (тонове)", "deliveryTerms": "Условия на доставка", "message": "Допълнителни изисквания", "submit": "Изпрати заявка", "sending": "Изпращане...", "noObligation": "Без ангажимент — безплатна оферта до 24 часа.", "successTitle": "Заявката е изпратена!", "successText": "Ще отговорим в рамките на 24 часа.", "sendAnother": "Нова заявка", "errorText": "Нещо се обърка. Пишете ни на ubmarket2022@gmail.com"}
    },
    "tr": {
        "trustedBy": {"label": "Güvenilir Standartlar", "title": "Güvenebileceğiniz Sertifikalı Kalite"},
        "brandPage": {"breadcrumb": "Star Food Markası", "label": "Markamız", "title": "Star Food — Güvenebileceğiniz Kalite", "description": "Star Food, UB Market LTD'nin amiral gemisi markasıdır.", "ctaQuote": "Fiyat Listesi İste", "ctaPartner": "Distribütör Olun", "lineupLabel": "Ürün Yelpazesi", "lineupTitle": "Star Food Ürünleri", "qualityLabel": "Kalite Standartları", "qualityTitle": "Kaliteye Bağlılığımız", "designedByTitle": "Etiket Tasarımı", "designedByText": "Tüm Star Food etiketleri Anastasiia Kolisnyk tarafından tasarlanmıştır.", "designedByLink": "AK Illustrator Portföyünü Ziyaret Edin →"},
        "partnersPage": {"breadcrumb": "Ortaklar", "label": "Ortaklık", "title": "Star Food Ortağı Olun", "subtitle": "Avrupa genelindeki büyüyen distribütör ağımıza katılın.", "cta": "Ortaklık Başvurusu", "benefitsTitle": "Neden Bizimle Ortaklık Kurmalısınız", "typesTitle": "Ortaklık Türleri", "ctaTitle": "Başlamaya Hazır Mısınız?", "ctaButton": "Ortaklık Bilgisi İsteyin"},
        "quotePage": {"breadcrumb": "Teklif İste"},
        "quoteForm": {"title": "Teklif İsteyin", "subtitle": "Gereksinimlerinizi doldurun, 24 saat içinde dönüş yapalım.", "company": "Şirket Adı", "contactName": "İletişim Adı", "email": "E-posta", "phone": "Telefon", "country": "Ülke", "product": "Ürün", "selectProduct": "Ürün seçin", "quantity": "Miktar (ton)", "deliveryTerms": "Teslimat Koşulları", "message": "Ek Gereksinimler", "submit": "Teklif İste", "sending": "Gönderiliyor...", "noObligation": "Zorunluluk yok — 24 saat içinde ücretsiz teklif.", "successTitle": "Teklif Talebi Gönderildi!", "successText": "24 saat içinde kişiselleştirilmiş teklifle yanıt vereceğiz.", "sendAnother": "Başka Talep Gönder", "errorText": "Bir hata oluştu. ubmarket2022@gmail.com adresine yazın."}
    },
    "ro": {
        "trustedBy": {"label": "Standarde de Încredere", "title": "Calitate Certificată în Care Puteți Avea Încredere"},
        "brandPage": {"breadcrumb": "Marca Star Food", "label": "Marca Noastră", "title": "Star Food — Calitate de Încredere", "description": "Star Food este marca emblematică a UB Market LTD.", "ctaQuote": "Solicită Lista de Prețuri", "ctaPartner": "Devino Distribuitor", "designedByTitle": "Design Etichete", "designedByText": "Toate etichetele Star Food au fost create de Anastasiia Kolisnyk.", "designedByLink": "Vizitează Portofoliul AK Illustrator →"},
        "partnersPage": {"breadcrumb": "Parteneri", "label": "Parteneriat", "title": "Deveniți Partener Star Food", "subtitle": "Alăturați-vă rețelei noastre de distribuitori din Europa.", "cta": "Aplicați", "benefitsTitle": "De Ce Să Fiți Partenerul Nostru", "typesTitle": "Tipuri de Parteneriat", "ctaTitle": "Gata să Începeți?", "ctaButton": "Solicitați Informații"},
        "quotePage": {"breadcrumb": "Solicită Ofertă"},
        "quoteForm": {"title": "Solicită o Ofertă", "subtitle": "Completați cerințele și vă răspundem în 24 de ore.", "company": "Nume Companie", "contactName": "Persoană de Contact", "email": "Email", "phone": "Telefon", "country": "Țara", "product": "Produs", "selectProduct": "Selectați un produs", "quantity": "Cantitate (tone)", "deliveryTerms": "Condiții de Livrare", "message": "Cerințe Suplimentare", "submit": "Solicită Ofertă", "sending": "Se trimite...", "noObligation": "Fără obligații — ofertă gratuită în 24 de ore.", "successTitle": "Cerere Trimisă!", "successText": "Vom răspunde în 24 de ore.", "sendAnother": "Trimite Altă Cerere", "errorText": "Ceva nu a funcționat. Scrieți la ubmarket2022@gmail.com"}
    },
    "de": {
        "trustedBy": {"label": "Vertrauenswürdige Standards", "title": "Zertifizierte Qualität, der Sie vertrauen können"},
        "brandPage": {"breadcrumb": "Marke Star Food", "label": "Unsere Marke", "title": "Star Food — Qualität, der Sie vertrauen können", "description": "Star Food ist die Flagship-Marke von UB Market LTD.", "ctaQuote": "Preisliste Anfordern", "ctaPartner": "Distributor Werden", "designedByTitle": "Etikettendesign", "designedByText": "Alle Star Food Etiketten wurden von Anastasiia Kolisnyk gestaltet.", "designedByLink": "AK Illustrator Portfolio Besuchen →"},
        "partnersPage": {"breadcrumb": "Partner", "label": "Partnerschaft", "title": "Werden Sie Star Food Partner", "subtitle": "Treten Sie unserem wachsenden Netzwerk von Distributoren in Europa bei.", "cta": "Bewerben", "benefitsTitle": "Warum Mit Uns Zusammenarbeiten", "typesTitle": "Partnerschaftsarten", "ctaTitle": "Bereit Loszulegen?", "ctaButton": "Partnerschaftsinfo Anfordern"},
        "quotePage": {"breadcrumb": "Angebot Anfordern"},
        "quoteForm": {"title": "Angebot Anfordern", "subtitle": "Füllen Sie Ihre Anforderungen aus und wir melden uns innerhalb von 24 Stunden.", "company": "Firmenname", "contactName": "Kontaktname", "email": "E-Mail", "phone": "Telefon", "country": "Land", "product": "Produkt", "selectProduct": "Produkt wählen", "quantity": "Menge (Tonnen)", "deliveryTerms": "Lieferbedingungen", "message": "Zusätzliche Anforderungen", "submit": "Angebot Anfordern", "sending": "Wird gesendet...", "noObligation": "Unverbindlich — kostenloses Angebot in 24 Stunden.", "successTitle": "Anfrage Gesendet!", "successText": "Wir antworten innerhalb von 24 Stunden.", "sendAnother": "Neue Anfrage Senden", "errorText": "Etwas ist schiefgelaufen. Schreiben Sie an ubmarket2022@gmail.com"}
    },
    "ua": {
        "trustedBy": {"label": "Надійні стандарти", "title": "Сертифікована якість, якій можна довіряти"},
        "brandPage": {"breadcrumb": "Бренд Star Food", "label": "Наш бренд", "title": "Star Food — Якість, якій можна довіряти", "description": "Star Food — флагманський бренд UB Market LTD.", "ctaQuote": "Запитати прайс-лист", "ctaPartner": "Стати дистриб'ютором", "designedByTitle": "Дизайн етикеток", "designedByText": "Усі етикетки Star Food створені Анастасією Колесник.", "designedByLink": "Відвідати портфоліо AK Illustrator →"},
        "partnersPage": {"breadcrumb": "Партнери", "label": "Партнерство", "title": "Станьте партнером Star Food", "subtitle": "Приєднуйтесь до нашої мережі дистриб'юторів по Європі.", "cta": "Подати заявку", "benefitsTitle": "Чому варто працювати з нами", "typesTitle": "Типи партнерства", "ctaTitle": "Готові почати?", "ctaButton": "Запитати інформацію"},
        "quotePage": {"breadcrumb": "Запит ціни"},
        "quoteForm": {"title": "Запитати ціну", "subtitle": "Заповніть вимоги і ми відповімо протягом 24 годин.", "company": "Назва компанії", "contactName": "Контактна особа", "email": "Електронна пошта", "phone": "Телефон", "country": "Країна", "product": "Продукт", "selectProduct": "Оберіть продукт", "quantity": "Кількість (тонн)", "deliveryTerms": "Умови доставки", "message": "Додаткові вимоги", "submit": "Запитати ціну", "sending": "Відправка...", "noObligation": "Без зобов'язань — безкоштовна пропозиція протягом 24 годин.", "successTitle": "Запит надіслано!", "successText": "Ми відповімо протягом 24 годин.", "sendAnother": "Надіслати інший запит", "errorText": "Щось пішло не так. Напишіть на ubmarket2022@gmail.com"}
    }
}

for lang, new_keys in new_translations.items():
    json_path = f"src/i18n/{lang}.json"
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        data.update(new_keys)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Updated: {json_path}")

print(f"\n✅ Steps 15+16 complete! {len(files)} files created/updated.")
print("Run: pnpm dev")
print("Test:")
print("  http://localhost:3000/en/brands/star-food")
print("  http://localhost:3000/en/partners")
print("  http://localhost:3000/en/quote")
print("  http://localhost:3000/en (TrustedBy + Footer credit)")
