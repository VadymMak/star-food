"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { FaCalendar, FaClock, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { generateBreadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import remarkGfm from "remark-gfm";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import styles from "../../app/[locale]/blog/[slug]/post.module.css";

interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  ogImage: string;
  readingTime: number;
  content: string;
}

interface Props {
  post: PostData | null;
  slug: string;
  locale: string;
}

export default function BlogPostClient({ post, slug, locale }: Props) {
  const t = useTranslations();

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h1>{t("blogPost.notFound")}</h1>
        <Link href={`/${locale}/blog`} className="btn btn-primary">
          {t("blogPost.backToBlog")}
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("nav.blog"), href: `/${locale}/blog` },
    { label: post.title },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href || `/${locale}/blog/${slug}`,
    })),
  );

  const ogImageUrl = post.ogImage
    ? `https://ub-market.com${post.ogImage}`
    : `https://ub-market.com${post.image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: ogImageUrl,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "UB Market LTD",
      url: "https://ub-market.com",
    },
    publisher: {
      "@type": "Organization",
      name: "UB Market LTD",
      logo: {
        "@type": "ImageObject",
        url: "https://ub-market.com/icons/logo.webp",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      <section className={styles.headerSection}>
        <div className={styles.inner}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
          <div className={styles.meta}>
            <span>
              <FaCalendar /> {formattedDate}
            </span>
            <span>
              <FaClock /> {post.readingTime} {t("blogPost.minRead")}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.heroImage}>
        <div className={styles.inner}>
          <div className={styles.imageWrap}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className={styles.inner}>
          <div className={styles.bodyGrid}>
            <article className={`${styles.article} blog-content`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>

              <div className={styles.cta}>
                <h3>{t("blogPost.ctaTitle")}</h3>
                <p>{t("blogPost.ctaText")}</p>
                <Link href={`/${locale}/quote`} className="btn btn-primary">
                  <FaEnvelope /> {t("blogPost.ctaButton")}
                </Link>
              </div>
            </article>

            <aside className={styles.sidebar}>
              <TableOfContents />
            </aside>
          </div>

          <div className={styles.backLink}>
            <Link href={`/${locale}/blog`} className="btn btn-outline">
              <FaArrowLeft /> {t("blogPost.backToBlog")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
