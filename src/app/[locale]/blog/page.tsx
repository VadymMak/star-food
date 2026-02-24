"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts, categories } from "@/data/blog-posts";
import BlogCard from "@/components/BlogCard/BlogCard";
import styles from "./blog.module.css";

export default function BlogPage() {
  const { locale, t } = useLanguage();
  const b = t?.blog || {};
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const localized = filtered.filter((p) => p.content[locale] || p.content.en);

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
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {typeof cat.label === "string"
                ? cat.label
                : cat.label?.[locale] || cat.label?.en || cat.id}
            </button>
          ))}
        </div>

        {localized.length > 0 ? (
          <div className={styles.grid}>
            {localized.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title[locale] || post.title.en}
                description={post.description[locale] || post.description.en}
                image={post.image}
                date={post.date}
                readingTime={post.readingTime}
                category={post.category}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className={styles.comingSoon}>
            <h2 className={styles.comingTitle}>
              {b.comingTitle || "More Articles Coming Soon"}
            </h2>
            <p className={styles.comingText}>{b.comingText}</p>
          </div>
        )}
      </section>
    </>
  );
}
