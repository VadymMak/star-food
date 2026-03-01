"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import styles from "./LatestBlog.module.css";

interface LatestPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

interface LatestBlogProps {
  posts: LatestPost[];
}

export default function LatestBlog({ posts }: LatestBlogProps) {
  const locale = useLocale();
  const t = useTranslations("latestBlog");

  if (!posts || posts.length === 0) return null;

  return (
    <section className={styles.section} id="latest-blog">
      <div className={styles.inner}>
        <span className={styles.label}>{t("label")}</span>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div className={styles.grid}>
          {posts.slice(0, 3).map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              locale === "ua" ? "uk-UA" : locale,
              { year: "numeric", month: "short", day: "numeric" },
            );

            return (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className={styles.image}
                  />
                  <span className={styles.category}>
                    {post.category.replace("-", " ")}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <time className={styles.date}>{formattedDate}</time>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDesc}>{post.description}</p>
                  <span className={styles.readMore}>{t("readMore")} →</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.allPostsWrap}>
          <Link href={`/${locale}/blog`} className={styles.allPostsBtn}>
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
