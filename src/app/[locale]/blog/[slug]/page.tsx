"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { FaCalendar, FaClock, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { getBlogPostBySlug } from "@/data/blog-posts";
import { generateBreadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import styles from "./post.module.css";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale, t } = useLanguage();

  const post = getBlogPostBySlug(slug);
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

  const content = post.content[locale] || post.content.en;
  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbItems = [
    { label: t?.nav?.home || "Home", href: `/${locale}` },
    { label: t?.nav?.blog || "Blog", href: `/${locale}/blog` },
    { label: content.title },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href || `/${locale}/blog/${post.slug}`,
    }))
  );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.description,
    image: `https://ub-market.com${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "UB Market LTD",
      url: "https://ub-market.com",
    },
    publisher: {
      "@type": "Organization",
      name: "UB Market LTD",
      logo: { "@type": "ImageObject", url: "https://ub-market.com/icons/logo.webp" },
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

      {/* Breadcrumbs */}
      <section className={styles.breadcrumbSection}>
        <div className={styles.inner}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      {/* Article Header */}
      <section className={styles.headerSection}>
        <div className={styles.inner}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>{content.description}</p>
          <div className={styles.meta}>
            <span><FaCalendar /> {formattedDate}</span>
            <span><FaClock /> {post.readingTime} {bp.minRead || "min read"}</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className={styles.heroImage}>
        <div className={styles.inner}>
          <div className={styles.imageWrap}>
            <Image
              src={post.image}
              alt={content.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Article Body + TOC */}
      <section className={styles.bodySection}>
        <div className={styles.inner}>
          <div className={styles.bodyGrid}>
            <article className={`${styles.article} blog-content`}>
              <ReactMarkdown>{content.body}</ReactMarkdown>

              {/* CTA */}
              <div className={styles.cta}>
                <h3>{bp.ctaTitle || "Interested in Wholesale Sunflower Oil?"}</h3>
                <p>{bp.ctaText || "Contact UB Market for competitive pricing and reliable supply."}</p>
                <a href="mailto:ubmarket2022@gmail.com" className="btn btn-primary">
                  <FaEnvelope /> {bp.ctaButton || "Request a Quote"}
                </a>
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
