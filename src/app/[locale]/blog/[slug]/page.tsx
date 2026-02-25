// src/app/[locale]/blog/[slug]/page.tsx
// Server component — reads post from filesystem, delegates rendering to client

import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import BlogPostClient from "@/components/BlogPostClient/BlogPostClient";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all post slugs (for build-time generation)
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  const locales = ["en", "bg", "tr", "ro", "de", "ua"];

  return slugs.flatMap((slug) => locales.map((locale) => ({ locale, slug })));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);

  return <BlogPostClient post={post} slug={slug} locale={locale} />;
}
