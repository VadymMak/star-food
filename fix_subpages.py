"""
RUN FROM star-food PROJECT ROOT:
  python fix_subpages.py

Fixes all sub-pages to use safe translation access:
  t?.contactsPage || {}  instead of  t.contactsPage
"""

import os

files = {}

# ============================================================
# about/page.tsx — safe access for ap
# ============================================================
files["src/app/[locale]/about/page.tsx"] = '''"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaGlobeEurope,
  FaHandshake,
  FaTruck,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./about.module.css";

const valueIcons = [FaGlobeEurope, FaHandshake, FaTruck, FaShieldAlt];

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const ap = t?.aboutPage || {};

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{ap.label || "About Us"}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {ap.heroTitle || "Your Trusted Partner in European Food Trading"}
          </h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid2col}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-us.webp"
              alt="UB Market warehouse and operations"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
              {ap.whoWeAre || "Who We Are"}
            </h2>
            <p className={styles.text}>{ap.whoP1}</p>
            <p className={styles.text}>{ap.whoP2}</p>
            <p className={styles.text}>{ap.whoP3}</p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.inner}>
          <div className={styles.headerCenter}>
            <span className="section-label">{ap.whyLabel || "Why Choose Us"}</span>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
              {ap.whyTitle || "What Sets Us Apart"}
            </h2>
          </div>
          <div className={styles.grid4col}>
            {(ap.values || []).map((v: { title: string; text: string }, i: number) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className={styles.valueCard}>
                  <div className={styles.valueIcon}><Icon /></div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.headerCenter}>
          <span className="section-label">{ap.rangeLabel || "What We Trade"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {ap.rangeTitle || "Our Product Range"}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 40px" }}>
            {ap.rangeSubtitle}
          </p>
        </div>
        <div className={styles.productList}>
          {(ap.productList || []).map((p: string) => (
            <div key={p} className={styles.productItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {ap.ctaTitle || "Ready to Start Trading?"}
          </h2>
          <p className={styles.ctaText}>{ap.ctaText}</p>
          <Link href={`/${locale}/contacts`} className="btn btn-primary">
            <FaEnvelope /> {ap.ctaCta || "Get in Touch"}
          </Link>
        </div>
      </section>
    </>
  );
}
'''

# ============================================================
# products/page.tsx — safe access for pp
# ============================================================
files["src/app/[locale]/products/page.tsx"] = '''"use client";

import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./products.module.css";

export default function ProductsPage() {
  const { t } = useLanguage();
  const pp = t?.productsPage || {};

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{pp.label || "Product Catalog"}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {pp.heroTitle || "Our Products"}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {pp.heroSubtitle}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {products.map((product) => {
            const translated = t?.products?.items?.[product.id as keyof typeof t.products.items];
            return (
              <div key={product.id} className={styles.card}>
                {product.tag && (
                  <span className={styles.tag}>{product.tag}</span>
                )}
                <div className={styles.imageWrap}>
                  <Image
                    src={product.image}
                    alt={translated?.name || product.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.name}>{translated?.name || product.name}</h2>
                  <p className={styles.desc}>{translated?.description || product.description}</p>
                  <a
                    href={`mailto:ubmarket2022@gmail.com?subject=Price inquiry: ${product.name}`}
                    className="btn btn-primary"
                    style={{ marginTop: "16px", fontSize: "0.8rem", padding: "12px 24px" }}
                  >
                    <FaEnvelope /> {t?.products?.requestPrice || "Request Price"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
'''

# ============================================================
# contacts/page.tsx — safe access for cp and c
# ============================================================
files["src/app/[locale]/contacts/page.tsx"] = '''"use client";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./contacts.module.css";

export default function ContactsPage() {
  const { t } = useLanguage();
  const cp = t?.contactsPage || {};
  const c = t?.contact || {};

  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      label: c.address || "Address",
      value: c.addressValue || "",
      href: undefined as string | undefined,
    },
    {
      icon: <FaEnvelope />,
      label: c.email || "Email",
      value: "ubmarket2022@gmail.com",
      href: "mailto:ubmarket2022@gmail.com",
    },
    {
      icon: <FaPhone />,
      label: c.phone || "Phone",
      value: "+359 8844 69860",
      href: "tel:+359884469860",
    },
    {
      icon: <FaClock />,
      label: c.hours || "Office Hours",
      value: c.hoursValue || "",
      href: undefined as string | undefined,
    },
  ];

  const socials = [
    { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/ub_market_ltd" },
    { icon: <FaTelegram />, label: "Telegram", href: "https://t.me/ub_market_ltd" },
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/+359884469860" },
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{cp.label || "Get in Touch"}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {cp.heroTitle || "Contact Us"}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {cp.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {contactItems.map((item) => (
            <div key={item.label} className={styles.card}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h3 className={styles.cardLabel}>{item.label}</h3>
              {item.href ? (
                <a href={item.href} className={styles.cardLink}>
                  {item.value}
                </a>
              ) : (
                <p className={styles.cardText}>
                  {(item.value || "").split("\\n").map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      {i < (item.value || "").split("\\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.formSection}>
        <ContactForm />
      </section>

      {/* Social Links */}
      <section className={styles.socialSection}>
        <div className={styles.socialInner}>
          <span className="section-label">{c.social || "Follow Us"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {c.socialTitle || "Connect on Social Media"}
          </h2>
          <div className={styles.socialGrid}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
              >
                <span className={styles.socialIcon}>{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <div className={styles.mapInner}>
          <span className="section-label">{c.mapLabel || "Our Location"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {c.mapTitle || "Find Us in Varna, Bulgaria"}
          </h2>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93031.0181942096!2d27.78026205034398!3d43.2258611704557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a45439205714b3%3A0x99c4e0902fa8939b!2s9010%20Varna%2C%20Bulgaria!5e0!3m2!1sen!2spl!4v1729407709833!5m2!1sen!2spl"
            allowFullScreen
            loading="lazy"
            title="UB Market Location — Varna, Bulgaria"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
'''

# ============================================================
# blog/page.tsx — safe access for b
# ============================================================
files["src/app/[locale]/blog/page.tsx"] = '''"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./blog.module.css";

const upcomingPosts = [
  { titleKey: "How We Created the Star Food Label Design", category: "Brand Story" },
  { titleKey: "Sunflower Oil Market Trends in 2026", category: "Market Analysis" },
  { titleKey: "From Farm to Your Table — Our Supply Chain", category: "Behind the Scenes" },
];

export default function BlogPage() {
  const { locale, t } = useLanguage();
  const b = t?.blog || {};

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">{b.label || "Blog"}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {b.title || "News & Insights"}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {b.subtitle}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.comingSoon}>
          <h2 className={styles.comingTitle}>{b.comingTitle || "Blog is Coming Soon"}</h2>
          <p className={styles.comingText}>{b.comingText}</p>
        </div>

        <div className={styles.grid}>
          {upcomingPosts.map((post) => (
            <div key={post.titleKey} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.date}>Coming Soon</span>
              </div>
              <h3 className={styles.cardTitle}>{post.titleKey}</h3>
            </div>
          ))}
        </div>

        <div className={styles.back}>
          <Link href={`/${locale}`} className="btn btn-outline">
            <FaArrowLeft /> {b.backHome || "Back to Home"}
          </Link>
        </div>
      </section>
    </>
  );
}
'''

# ============================================================
# Homepage components — safe access + locale-aware links
# ============================================================
files["src/components/Hero/Hero.tsx"] = '''"use client";

import Link from "next/link";
import { FaEnvelope, FaBoxOpen } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

export default function Hero() {
  const { locale, t } = useLanguage();
  const h = t?.hero || {};

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.badge}>{h.badge || "International Food Trading"}</span>
        <h1 className={styles.title}>
          {h.title1 || "Premium"}{" "}
          <span className={styles.gold}>{h.titleHighlight || "Sunflower Oil"}</span>{" "}
          {h.title2 || "& Food Products for Europe"}
        </h1>
        <p className={styles.subtitle}>{h.subtitle}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <Link href={`/${locale}/contacts`} className="btn btn-primary">
            <FaEnvelope /> {h.cta1 || "Request a Quote"}
          </Link>
          <Link href={`/${locale}/products`} className="btn btn-outline">
            <FaBoxOpen /> {h.cta2 || "View Products"}
          </Link>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}
'''

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
          <a href="https://www.instagram.com/ub_market_ltd" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://t.me/ub_market_ltd" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegram />
          </a>
          <a href="https://wa.me/+359884469860" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>

        <p className={styles.email}>E-mail: ubmarket2022@gmail.com</p>
      </div>
    </footer>
  );
}
'''

files["src/components/TrustNumbers/TrustNumbers.tsx"] = '''"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./TrustNumbers.module.css";

export default function TrustNumbers() {
  const { t } = useLanguage();
  const tr = t?.trust || {};

  const stats = [
    { number: "3+", label: tr.years || "Years in Business" },
    { number: "12+", label: tr.countries || "Countries Served" },
    { number: "500+", label: tr.tons || "Tons Delivered" },
    { number: "50+", label: tr.partners || "Partner Companies" },
  ];

  return (
    <section className={styles.trust}>
      <div className={styles.grid}>
        {stats.map((item) => (
          <div key={item.label} className={styles.item}>
            <div className={styles.number}>{item.number}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
'''

files["src/components/AboutPreview/AboutPreview.tsx"] = '''"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  const { locale, t } = useLanguage();
  const ap = t?.aboutPreview || {};

  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-us.webp"
              alt="Sunflower oil production facility"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.text}>
            <span className="section-label">{ap.label || "About Us"}</span>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
              {ap.title || "Your Trusted Partner in Food Export & Import"}
            </h2>
            <p className={styles.desc}>{ap.p1}</p>
            <p className={styles.desc}>{ap.p2}</p>

            <div className={styles.features}>
              {(ap.features || []).map((f: string) => (
                <div key={f} className={styles.feature}>
                  <FaCheckCircle className={styles.featureIcon} />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/about`} className="btn btn-primary" style={{ marginTop: "10px" }}>
              {ap.cta || "Learn More"} <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/ProductsGrid/ProductsGrid.tsx"] = '''"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProductsGrid.module.css";

export default function ProductsGrid() {
  const { locale, t } = useLanguage();
  const p = t?.products || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{p.label || "Our Products"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {p.title || "What We Supply"}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {p.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => {
            const translated = p?.items?.[product.id as keyof typeof p.items];
            return (
              <div key={product.id} className={styles.card}>
                {product.tag && (
                  <span className={styles.tag}>{product.tag}</span>
                )}
                <div className={styles.imageWrap}>
                  <Image
                    src={product.image}
                    alt={translated?.name || product.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.name}>{translated?.name || product.name}</h3>
                  <p className={styles.desc}>{translated?.description || product.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Link href={`/${locale}/products`} className="btn btn-outline">
            {p.cta || "View All Products"} <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/HowWeWork/HowWeWork.tsx"] = '''"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./HowWeWork.module.css";

export default function HowWeWork() {
  const { t } = useLanguage();
  const hw = t?.howWeWork || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{hw.label || "How We Work"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {hw.title || "Simple Process, Reliable Results"}
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {hw.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {(hw.steps || []).map((step: { title: string; text: string }, i: number) => (
            <div key={i} className={styles.step}>
              <div className={styles.number}>{i + 1}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/Logistics/Logistics.tsx"] = '''"use client";

import {
  FaTruckLoading,
  FaBox,
  FaOilCan,
  FaDolly,
  FaFileInvoice,
  FaGlobeEurope,
  FaCheck,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Logistics.module.css";

const deliveryIcons = [FaTruckLoading, FaBox, FaOilCan, FaDolly, FaFileInvoice, FaGlobeEurope];

export default function Logistics() {
  const { t } = useLanguage();
  const l = t?.logistics || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">{l.label || "Logistics & Quality"}</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            {l.title || "Built for B2B Trading"}
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaTruck className={styles.boxIcon} /> {l.delivery || "Delivery Options"}
            </h3>
            <div className={styles.tagList}>
              {(l.deliveryItems || []).map((label: string, i: number) => {
                const Icon = deliveryIcons[i] || FaCheck;
                return (
                  <div key={label} className={styles.tag}>
                    <span className={styles.tagIcon}><Icon /></span>
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaShieldAlt className={styles.boxIcon} /> {l.quality || "Quality Standards"}
            </h3>
            <div className={styles.tagList}>
              {(l.qualityItems || []).map((label: string) => (
                <div key={label} className={styles.tag}>
                  <span className={styles.tagIcon}><FaCheck /></span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/CTASection/CTASection.tsx"] = '''"use client";

import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./CTASection.module.css";

export default function CTASection() {
  const { t } = useLanguage();
  const c = t?.cta || {};

  return (
    <section className={styles.cta}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className="section-label">{c.label || "Let's Work Together"}</span>
        <h2
          className="section-title"
          style={{ fontFamily: "var(--font-display)", maxWidth: 700, margin: "0 auto 20px" }}
        >
          {c.title || "Ready to Source Quality Food Products?"}
        </h2>
        <p className={styles.text}>{c.subtitle}</p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <a href="mailto:ubmarket2022@gmail.com" className="btn btn-primary">
            <FaEnvelope /> {c.cta1 || "Request a Quote"}
          </a>
          <a href="tel:+359884469860" className="btn btn-outline">
            <FaPhone /> {c.cta2 || "Call Us Now"}
          </a>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/ContactStrip/ContactStrip.tsx"] = '''"use client";

import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ContactStrip.module.css";

export default function ContactStrip() {
  const { t } = useLanguage();
  const c = t?.contact || {};

  return (
    <section className={styles.strip} id="contact">
      <div className={styles.grid}>
        <div className={styles.item}>
          <FaMapMarkerAlt className={styles.icon} />
          <h4 className={styles.label}>{c.address || "Address"}</h4>
          <p>
            {(c.addressValue || "").split("\\n").map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.item}>
          <FaEnvelope className={styles.icon} />
          <h4 className={styles.label}>{c.email || "Email"}</h4>
          <a href="mailto:ubmarket2022@gmail.com">ubmarket2022@gmail.com</a>
        </div>

        <div className={styles.item}>
          <FaPhone className={styles.icon} />
          <h4 className={styles.label}>{c.phone || "Phone"}</h4>
          <a href="tel:+359884469860">+359 8844 69860</a>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/MapSection/MapSection.tsx"] = '''"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./MapSection.module.css";

export default function MapSection() {
  const { t } = useLanguage();
  const c = t?.contact || {};

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className="section-label">{c.mapLabel || "Our Location"}</span>
        <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
          {c.mapTitle || "Find Us in Varna, Bulgaria"}
        </h2>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93031.0181942096!2d27.78026205034398!3d43.2258611704557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a45439205714b3%3A0x99c4e0902fa8939b!2s9010%20Varna%2C%20Bulgaria!5e0!3m2!1sen!2spl!4v1729407709833!5m2!1sen!2spl"
          allowFullScreen
          loading="lazy"
          title="UB Market Location — Varna, Bulgaria"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
'''

# ============================================================
# WRITE ALL FILES
# ============================================================
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"✅ Written: {path}")

print(f"\nDone! {len(files)} files updated.")
print("Run: pnpm dev")
