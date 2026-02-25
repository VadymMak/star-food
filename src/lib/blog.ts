// src/lib/blog.ts
// Server-side blog post loader — reads .md files from src/content/blog/
// Each post is a folder: src/content/blog/{slug}/{locale}.md

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

/**
 * Get metadata for all blog posts (no content — for listing page).
 * Falls back to English if locale file doesn't exist.
 */
export function getAllPosts(locale: string): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const slugs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const meta = getPostMeta(slug, locale);
    if (meta) posts.push(meta);
  }

  // Sort by date descending (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single post with full content (for post page).
 */
export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const filePath = resolvePostFile(slug, locale);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: data.category || "",
    image: data.image || "",
    readingTime: data.readingTime || 5,
    content: content.trim(),
  };
}

/**
 * Get all post slugs (for sitemap and generateStaticParams).
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

// --- Internal helpers ---

function getPostMeta(slug: string, locale: string): BlogPostMeta | null {
  const filePath = resolvePostFile(slug, locale);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: data.category || "",
    image: data.image || "",
    readingTime: data.readingTime || 5,
  };
}

function resolvePostFile(slug: string, locale: string): string | null {
  const postDir = path.join(BLOG_DIR, slug);
  if (!fs.existsSync(postDir)) return null;

  // Try requested locale, fall back to English
  const localePath = path.join(postDir, `${locale}.md`);
  if (fs.existsSync(localePath)) return localePath;

  const enPath = path.join(postDir, "en.md");
  if (fs.existsSync(enPath)) return enPath;

  return null;
}
