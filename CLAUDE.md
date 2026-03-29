# CLAUDE.md — star-food (ub-market.com)

## Project Overview

Next.js 15 B2B food trading platform for UB Market LTD (Star Food brand).
Live site: https://ub-market.com
Stack: Next.js 15, TypeScript, CSS Modules, next-intl, Vercel

## Current Locales

- en, bg, ua, tr, ro, de (6 languages)
- Routing config: src/i18n/routing.ts
- Translation files: src/i18n/[lang].json
- Default locale: en
- Locale prefix: always (/en/, /bg/, etc.)
- ua locale uses hreflang "uk" (ISO 639-1 standard)

## Key File Locations

- Routing: src/i18n/routing.ts
- Middleware: src/middleware.ts
- Translations: src/i18n/[lang].json (en/bg/ua/tr/ro/de)
- Blog content: src/content/blog/[slug]/[locale].md
- Products data: src/data/products.ts
- Blog lib: src/lib/blog.ts
- Schema lib: src/lib/schema.ts
- Sitemap: src/app/sitemap.xml/route.ts (dynamic, generates 162 URLs)

## Components

- src/components/BlogPostClient/ — blog post with author box + related posts
- src/components/LatestBlog/ — homepage blog section (shows 6 posts)
- src/components/Footer/Footer.tsx
- src/components/Header/Header.tsx
- src/app/[locale]/products/[slug]/page.tsx — product page with related blog links

## Adding a New Language — Checklist

1. src/i18n/routing.ts — add locale to locales array
2. src/i18n/[lang].json — create translation file (copy en.json, translate)
3. src/middleware.ts — verify locale is picked up automatically
4. src/app/sitemap.xml/route.ts — check hreflang map
5. src/lib/schema.ts — check hreflang map
6. src/app/[locale]/blog/[slug]/page.tsx — check hreflang map
7. src/content/blog/[slug]/[locale].md — create blog content files
8. Test: pnpm dev → visit /el/ routes

## Hreflang Map (important!)

- ua locale → hreflang "uk" (NOT "ua")
- New locale "el" (Greek) → hreflang "el"
- Always add x-default pointing to /en/

## Current hreflangMap locations (must update all):

- src/app/[locale]/blog/[slug]/page.tsx
- src/app/sitemap.xml/route.ts
- src/lib/schema.ts (if applicable)

## Blog Structure

- 12 blog slugs × 6 locales = 72 blog pages
- Frontmatter required: title, description, date, category, image, readingTime
- Images: /images/[name].webp (stored in public/images/)
- Blog images map: each slug has assigned image from existing /images/ folder

## Product → Blog Link Map (PRODUCT_BLOGS)

Located in: src/app/[locale]/products/[slug]/page.tsx
Maps product slug → array of {slug, title, image} for Related Articles section.

## i18n Translation Keys — Critical Sections

- productPage.relatedArticles — "Related Articles" (all 6 languages done)
- blogPost.youMightAlsoEnjoy — "You might also enjoy" (all 6 languages done)
- blogPost.writtenBy — "Written by" (all 6 languages done)
- blogPost.authorBio — author bio text (all 6 languages done)

## Prices (from prices.json — March 2026)

- Sunflower Unrefined: 0.5L €1.50, 1L €1.80, 10L €16.50
- High-Oleic: 10L €23.40
- Deep-frying Sunflower: 10L €21.00
- Deep-frying High-Oleic: 10L €25.80
- Mayonnaise 67%: 4.5kg €15, 10kg €30
- Ketchup Lagidny: 5kg €8

## Brand Info

- Company: UB Market LTD, Varna, Bulgaria
- Brand: Star Food (registered trademark)
- Contact: ubmarket2022@gmail.com, +359884469860
- Address: Sirma Voivoda St., b.1, ap.21, Varna 9010, Bulgaria
- Label designer: Anastasiia Kolisnyk — FormaInk Studio (formaink.com)

## Git Workflow

- Main branch: main (production → Vercel auto-deploy)
- Feature branches: dev/[feature-name]
- New language work: branch dev/greek-locale

## Commands

- pnpm dev — start dev server
- pnpm build — production build
- pnpm update-prices — update prices from Excel + regenerate embeddings
- git push → Vercel auto-deploy

## Known Issues / Notes

- IndexNow does NOT work for Google (February 2026)
- ua locale must map to hreflang "uk" everywhere
- .slice(0,6) on homepage (max 8, never show all 12 blogs)
- Orphan pages fix: product pages now link to related blogs
- Quarterly content refresh needed (3-month AI citation cliff)
