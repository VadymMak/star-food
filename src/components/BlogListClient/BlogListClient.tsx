// src/components/BlogListClient/BlogListClient.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import BlogCard from "@/components/BlogCard/BlogCard";
import styles from "../../app/[locale]/blog/blog.module.css";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readingTime: number;
}

interface Props {
  posts: PostMeta[];
  locale: string;
}

export default function BlogListClient({ posts, locale }: Props) {
  const { t } = useLanguage();
  const b = t?.blog || {};
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

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
              {cat.label?.[locale] || cat.label?.en || cat.id}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
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
