// src/app/[locale]/blog/[slug]/page.tsx
// Server component — reads post, generates OG metadata, delegates rendering to client

import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import BlogPostClient from "@/components/BlogPostClient/BlogPostClient";

const BASE_URL = "https://ub-market.com";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all post slugs
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  const locales = ["en", "bg", "tr", "ro", "de", "ua"];

  return slugs.flatMap((slug) => locales.map((locale) => ({ locale, slug })));
}

// OG metadata for social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const ogImage = post.ogImage
    ? `${BASE_URL}${post.ogImage}`
    : `${BASE_URL}${post.image}`;

  // Hreflang alternates (ua → uk per ISO 639-1)
  const hreflangMap: Record<string, string> = {
    en: "en", bg: "bg", tr: "tr", ro: "ro", de: "de", ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] || loc] = `${BASE_URL}/${loc}/blog/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/en/blog/${slug}`;

  return {
    title: `${post.title} | UB Market`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      siteName: "UB Market",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      languages,
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);

  return <BlogPostClient post={post} slug={slug} locale={locale} />;
}
