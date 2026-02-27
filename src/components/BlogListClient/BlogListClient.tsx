// src/components/BlogListClient/BlogListClient.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
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
  const t = useTranslations();
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
          <span className="section-label">{t("blog.label")}</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            {t("blog.title")}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {t("blog.subtitle")}
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
            <h2 className={styles.comingTitle}>{t("blog.comingTitle")}</h2>
            <p className={styles.comingText}>{t("blog.comingText")}</p>
          </div>
        )}
      </section>
    </>
  );
}
