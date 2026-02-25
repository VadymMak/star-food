// src/app/[locale]/blog/page.tsx
// Server component — reads posts from filesystem, delegates rendering to client

import { getAllPosts } from "@/lib/blog";
import BlogListClient from "@/components/BlogListClient/BlogListClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return <BlogListClient posts={posts} locale={locale} />;
}
