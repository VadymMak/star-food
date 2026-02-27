// src/components/BlogPostClient/BlogPostClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { FaCalendar, FaClock, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t } = useLanguage();
  const bp = t?.blogPost || {};

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h1>{bp.notFound || "Article Not Found"}</h1>
        <Link href={`/${locale}/blog`} className="btn btn-primary">
          {bp.backToBlog || "Back to Blog"}
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
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: t?.nav?.blog || "Blog", href: `/${locale}/blog` },
    { label: post.title },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href || `/${locale}/blog/${slug}`,
    })),
  );

  // Use ogImage for schema (1200x630, optimized for sharing)
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
              <FaClock /> {post.readingTime} {bp.minRead || "min read"}
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
                <h3>
                  {bp.ctaTitle || "Interested in Wholesale Sunflower Oil?"}
                </h3>
                <p>
                  {bp.ctaText ||
                    "Contact UB Market for competitive pricing and reliable supply."}
                </p>
                <Link href={`/${locale}/quote`} className="btn btn-primary">
                  <FaEnvelope /> {bp.ctaButton || "Request a Quote"}
                </Link>
              </div>
            </article>

            <aside className={styles.sidebar}>
              <TableOfContents />
            </aside>
          </div>

          <div className={styles.backLink}>
            <Link href={`/${locale}/blog`} className="btn btn-outline">
              <FaArrowLeft /> {bp.backToBlog || "Back to Blog"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
