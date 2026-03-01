"""
SEO INDEXING FIX — 3 tasks in 1 script
======================================
RUN FROM star-food PROJECT ROOT:
  python seo-fix-indexing.py

WHAT THIS DOES:
  1. Creates LatestBlog component (homepage blog section + internal links)
  2. Replaces sitemap.ts with hreflang-enabled version
  3. Creates/updates robots.ts
  4. Adds i18n translations for the new section

AFTER RUNNING:
  - Add <LatestBlog /> to your homepage (instructions printed)
  - pnpm dev → verify /sitemap.xml has hreflang
  - git commit + push
  - Resubmit sitemap in Google Search Console
"""

import os
import json

files = {}

# ============================================================
# 1. LatestBlog Component — shows 3 latest posts on homepage
# ============================================================

files["src/components/LatestBlog/LatestBlog.tsx"] = '''"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/data/blog-posts";
import styles from "./LatestBlog.module.css";

export default function LatestBlog() {
  const { locale, t } = useLanguage();
  const lb = t?.latestBlog || {};

  // Get latest 3 posts sorted by date (newest first)
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className={styles.section} id="latest-blog">
      <div className={styles.inner}>
        <span className={styles.label}>{lb.label || "Industry Insights"}</span>
        <h2 className={styles.title}>{lb.title || "Latest from Our Blog"}</h2>
        <p className={styles.subtitle}>
          {lb.subtitle || "Expert guides on sunflower oil trading, market trends, and European food industry."}
        </p>

        <div className={styles.grid}>
          {latestPosts.map((post) => {
            const content = post.content[locale] || post.content.en;
            const formattedDate = new Date(post.date).toLocaleDateString(
              locale === "ua" ? "uk-UA" : locale,
              { year: "numeric", month: "short", day: "numeric" }
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
                    alt={content.title}
                    width={400}
                    height={225}
                    className={styles.image}
                  />
                  <span className={styles.category}>{post.category.replace("-", " ")}</span>
                </div>
                <div className={styles.cardBody}>
                  <time className={styles.date}>{formattedDate}</time>
                  <h3 className={styles.cardTitle}>{content.title}</h3>
                  <p className={styles.cardDesc}>{content.description}</p>
                  <span className={styles.readMore}>
                    {lb.readMore || "Read more"} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.allPostsWrap}>
          <Link href={`/${locale}/blog`} className={styles.allPostsBtn}>
            {lb.viewAll || "View All Articles"}
          </Link>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/LatestBlog/LatestBlog.module.css"] = '''/* LatestBlog — Homepage blog section */
.section {
  padding: 80px 20px;
  background: #f8f9fa;
}

.inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.label {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #d4a843;
  margin-bottom: 12px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 1.05rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: left;
}

.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.imageWrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(26, 26, 46, 0.85);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 4px;
}

.cardBody {
  padding: 20px;
}

.date {
  font-size: 0.8rem;
  color: #9ca3af;
  display: block;
  margin-bottom: 8px;
}

.cardTitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cardDesc {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.readMore {
  font-size: 0.85rem;
  font-weight: 600;
  color: #d4a843;
}

.allPostsWrap {
  margin-top: 36px;
}

.allPostsBtn {
  display: inline-block;
  padding: 12px 32px;
  background: transparent;
  border: 2px solid #1a1a2e;
  color: #1a1a2e;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.allPostsBtn:hover {
  background: #1a1a2e;
  color: #fff;
}

/* Tablet */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  /* Hide 3rd card on tablet to keep layout clean */
  .card:nth-child(3) {
    display: none;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .section {
    padding: 60px 16px;
  }
  .title {
    font-size: 1.6rem;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .card:nth-child(3) {
    display: block; /* Show all on mobile (vertical scroll is fine) */
  }
}
'''

# ============================================================
# 2. Sitemap with hreflang — CRITICAL for multilingual SEO
# ============================================================

files["src/app/sitemap.ts"] = '''// src/app/sitemap.ts — Dynamic sitemap with hreflang alternates
import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL = "https://ub-market.com";
const locales = ["en", "bg", "tr", "ro", "de", "ua"];

// ISO 639-1 mapping (important: ua → uk for Ukrainian)
const hreflangMap: Record<string, string> = {
  en: "en",
  bg: "bg",
  tr: "tr",
  ro: "ro",
  de: "de",
  ua: "uk", // Ukrainian ISO 639-1 = "uk", NOT "ua"
};

function localizedEntry(
  path: string,
  changeFrequency: "daily" | "weekly" | "monthly",
  priority: number,
  lastModified?: Date
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangMap[loc]] = `${BASE_URL}/${loc}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/en${path}`;

  return {
    url: `${BASE_URL}/en${path}`,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = [
    localizedEntry("", "monthly", 1.0, now),
    localizedEntry("/about", "monthly", 0.8, now),
    localizedEntry("/products", "weekly", 0.9, now),
    localizedEntry("/contacts", "monthly", 0.7, now),
    localizedEntry("/blog", "weekly", 0.8, now),
    localizedEntry("/brands/star-food", "monthly", 0.8, now),
    localizedEntry("/partners", "monthly", 0.7, now),
    localizedEntry("/quote", "monthly", 0.7, now),
    localizedEntry("/services/private-label", "monthly", 0.7, now),
  ];

  // Product pages
  const productSlugs = [
    "sunflower-oil",
    "frying-oil",
    "sugar",
    "high-oleic-sunflower-oil",
    "dairy-products",
    "mayonnaise",
  ];
  const productPages = productSlugs.map((slug) =>
    localizedEntry(`/products/${slug}`, "monthly", 0.7, now)
  );

  // Blog posts — dynamically from blog-posts.ts
  const blogPages = blogPosts.map((post) =>
    localizedEntry(
      `/blog/${post.slug}`,
      "monthly",
      0.6,
      new Date(post.date)
    )
  );

  return [...staticPages, ...productPages, ...blogPages];
}
'''

# ============================================================
# 3. Robots.ts — proper robots with sitemap reference
# ============================================================

files["src/app/robots.ts"] = '''// src/app/robots.ts — Dynamic robots.txt
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://ub-market.com/sitemap.xml",
  };
}
'''

# ============================================================
# 4. i18n translations for LatestBlog section
# ============================================================

translations = {
    "en": {
        "label": "Industry Insights",
        "title": "Latest from Our Blog",
        "subtitle": "Expert guides on sunflower oil trading, market trends, and European food industry.",
        "readMore": "Read more",
        "viewAll": "View All Articles"
    },
    "bg": {
        "label": "Индустриални прозрения",
        "title": "Последно от нашия блог",
        "subtitle": "Експертни ръководства за търговия със слънчогледово олио, пазарни тенденции и европейската хранителна индустрия.",
        "readMore": "Прочетете повече",
        "viewAll": "Всички статии"
    },
    "tr": {
        "label": "Sektör Görüşleri",
        "title": "Blogumuzdan Son Yazılar",
        "subtitle": "Ayçiçek yağı ticareti, pazar trendleri ve Avrupa gıda sektörü hakkında uzman rehberler.",
        "readMore": "Devamını oku",
        "viewAll": "Tüm Yazılar"
    },
    "ro": {
        "label": "Perspective industriale",
        "title": "Ultimele de pe blogul nostru",
        "subtitle": "Ghiduri de experți privind comerțul cu ulei de floarea soarelui, tendințele pieței și industria alimentară europeană.",
        "readMore": "Citește mai mult",
        "viewAll": "Toate articolele"
    },
    "de": {
        "label": "Brancheneinblicke",
        "title": "Neuestes aus unserem Blog",
        "subtitle": "Expertenleitfäden zum Sonnenblumenöl-Handel, Markttrends und der europäischen Lebensmittelbranche.",
        "readMore": "Weiterlesen",
        "viewAll": "Alle Artikel"
    },
    "ua": {
        "label": "Галузеві інсайти",
        "title": "Останнє з нашого блогу",
        "subtitle": "Експертні посібники з торгівлі соняшниковою олією, ринкових тенденцій та європейської харчової індустрії.",
        "readMore": "Читати далі",
        "viewAll": "Усі статті"
    }
}

# ============================================================
# WRITE ALL FILES
# ============================================================

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"✅ Written: {path}")

# ============================================================
# UPDATE i18n JSON files — add latestBlog section
# ============================================================

for lang, trans in translations.items():
    json_path = f"src/i18n/{lang}.json"
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        data["latestBlog"] = trans
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Updated: {json_path} (+latestBlog)")
    else:
        print(f"⚠️  Not found: {json_path} — add latestBlog manually")

# ============================================================
# INSTRUCTIONS
# ============================================================

print("""
═══════════════════════════════════════════════════════
  SEO INDEXING FIX — ALL FILES CREATED
═══════════════════════════════════════════════════════

TASK 1: Add LatestBlog to Homepage
───────────────────────────────────
Open: src/app/[locale]/page.tsx

Add import at top:
  import LatestBlog from "@/components/LatestBlog/LatestBlog";

Add <LatestBlog /> in the JSX — BEFORE the CTA section:
  ...
  <Logistics />
  <LatestBlog />     ← ADD THIS LINE
  <CTASection />
  ...

This creates INTERNAL LINKS from the homepage (already indexed!)
to blog posts (not yet indexed). Google follows these links.

───────────────────────────────────
TASK 2: Sitemap with hreflang (DONE)
───────────────────────────────────
New sitemap.ts created with:
  ✅ All 6 locales with hreflang alternates
  ✅ x-default pointing to /en/
  ✅ Ukrainian mapped to 'uk' (not 'ua') per ISO 639-1
  ✅ Dynamic blog posts from blog-posts.ts
  ✅ All product pages
  ✅ All static pages

After deploy, verify: https://ub-market.com/sitemap.xml
Then RESUBMIT in Google Search Console → Sitemaps

───────────────────────────────────
TASK 3: Robots.ts (DONE)
───────────────────────────────────
New robots.ts with sitemap reference.
Verify: https://ub-market.com/robots.txt

───────────────────────────────────
TASK 4: Fix Soft 404
───────────────────────────────────
Go to Search Console → Pages → click "Soft 404"
→ Find which URL is affected
→ Either fix the page or add a proper redirect

───────────────────────────────────
TASK 5: Request Manual Indexing
───────────────────────────────────
In Search Console → URL Inspection, paste each URL
and click "REQUEST INDEXING" for:

  1. https://ub-market.com/en/blog/sunflower-oil-wholesale-guide
  2. https://ub-market.com/en/blog/sunflower-oil-prices-europe-2026
  3. https://ub-market.com/en/blog/fob-cif-dap-explained
  4. https://ub-market.com/en/blog/how-food-trading-works-europe
  5. https://ub-market.com/en/products/sunflower-oil
  6. https://ub-market.com/en/blog

───────────────────────────────────
BONUS: Add blog links to other pages
───────────────────────────────────
For maximum internal linking, also add links to blog
posts on these pages (manually):

  /products/sunflower-oil → link to blog posts #1, #2, #5
  /about → link to blog "How We Created Star Food Labels"
  /services/private-label → link to pillar article
  /partners → link to "How to Choose a Food Supplier"

═══════════════════════════════════════════════════════
""")
