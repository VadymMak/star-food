"use client";

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
