# 🌻 UB Market — International Food Trading Platform

> B2B wholesale food trading platform for **UB Market LTD** (Star Food brand), an EU-registered company based in Bulgaria specializing in sunflower oil export across 12+ European countries.

**Live:** [ub-market.com](https://ub-market.com) · **Stack:** Next.js 16 · TypeScript · AI-Powered

---

## ✨ Highlights

- **6-language** multilingual platform (EN, BG, TR, RO, DE, UA) with URL-based routing
- **AI Chat Assistant** with RAG knowledge base, streaming responses, and lead detection
- **Automated SEO reporting** via Telegram bot (Google Search Console + GA4 + PageSpeed)
- **Full SEO architecture** — dynamic sitemap (162 URLs), hreflang, Schema.org JSON-LD
- **$15/year** total operational cost (domain only) — all services on free/minimal tiers

---

## 🛠 Tech Stack

### Core

| Technology         | Purpose                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| **Next.js 16**     | React framework with App Router, SSR/SSG                                   |
| **TypeScript**     | Type safety across the entire codebase                                     |
| **CSS Modules**    | Scoped component styling, zero runtime overhead                            |
| **next-intl**      | Server-side i18n with URL-based locale routing (`/en/`, `/bg/`, `/tr/`...) |
| **react-markdown** | Blog post rendering with Markdown content                                  |
| **react-icons**    | Icon library (Font Awesome set)                                            |

### AI & Automation

| Technology             | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **OpenAI GPT-4o-mini** | AI chat assistant — context-aware responses in 6 languages    |
| **OpenAI Embeddings**  | text-embedding-3-small for RAG vector search                  |
| **RAG Engine**         | Custom cosine similarity search over 29 knowledge base chunks |
| **SSE Streaming**      | Real-time typing effect for chat responses                    |
| **Telegram Bot API**   | Lead notifications (HOT/WARM), SEO reports, bot commands      |

### SEO & Analytics

| Technology                    | Purpose                                                  |
| ----------------------------- | -------------------------------------------------------- |
| **Google Search Console API** | Automated impressions, clicks, CTR, position tracking    |
| **Google Analytics 4 API**    | Users, sessions, page views, geo reporting               |
| **PageSpeed Insights API**    | Daily performance, SEO, accessibility scores             |
| **Schema.org JSON-LD**        | Organization, Product, Article, BreadcrumbList schemas   |
| **Dynamic Sitemap**           | 162 URLs (27 pages × 6 locales) with hreflang alternates |

### Infrastructure

| Service          | Purpose                                       | Cost      |
| ---------------- | --------------------------------------------- | --------- |
| **Vercel**       | Hosting, CDN, SSL, serverless functions, cron | Free tier |
| **Web3Forms**    | Contact & quote form submissions (250/mo)     | Free      |
| **OpenAI API**   | Chat assistant token usage                    | ~$3-10/mo |
| **Google APIs**  | Search Console, GA4, PageSpeed                | Free      |
| **Telegram Bot** | Notifications & reporting                     | Free      |

---

## 🏗 Architecture

```
star-food/
├── public/
│   ├── images/              # Optimized WebP product & page images
│   ├── icons/               # Logo, favicons
│   └── og-image.jpg         # 1200×630 social sharing image
├── data/
│   ├── chunks.ts            # AI knowledge base (29 content chunks)
│   ├── embeddings.json      # Pre-computed vector embeddings (~200KB)
│   └── scripts/
│       └── generate-embeddings.ts   # One-time embedding generator
├── src/
│   ├── app/
│   │   ├── [locale]/        # Locale-based routing (6 languages)
│   │   │   ├── page.tsx             # Homepage (10 sections)
│   │   │   ├── about/               # Company info
│   │   │   ├── products/            # Catalog + individual [slug] pages
│   │   │   ├── brands/star-food/    # Brand showcase
│   │   │   ├── blog/                # Blog listing + [slug] posts
│   │   │   ├── partners/            # Partnership page
│   │   │   ├── quote/               # Request quote form
│   │   │   └── contacts/            # Contact info + form
│   │   ├── api/
│   │   │   ├── chat/route.ts        # AI chat endpoint (SSE streaming)
│   │   │   ├── telegram/route.ts    # Bot webhook handler
│   │   │   └── cron/seo-report/     # Daily automated SEO report
│   │   ├── sitemap.ts       # Dynamic sitemap (162 URLs + hreflang)
│   │   └── robots.ts        # Dynamic robots.txt
│   ├── components/
│   │   ├── Header/          # Fixed header, mobile menu, scroll hide/show
│   │   ├── Footer/          # Contact, social links, cross-site promotion
│   │   ├── Hero/            # Full-screen hero with CTA
│   │   ├── TrustNumbers/    # Animated stat counters
│   │   ├── TrustedBy/       # Certification badges (ISO, HACCP, Non-GMO)
│   │   ├── ProductsGrid/    # 3-column product cards
│   │   ├── HowWeWork/       # 3-step process visualization
│   │   ├── Logistics/       # Delivery options + quality tags
│   │   ├── BlogCard/        # Blog post cards with category badges
│   │   ├── chat/            # AI chat widget (bubble + panel + streaming)
│   │   ├── WhatsAppButton/  # Floating WhatsApp CTA
│   │   ├── CookieConsent/   # GDPR consent banner
│   │   └── Breadcrumbs/     # SEO breadcrumb navigation
│   ├── lib/
│   │   ├── rag.ts           # RAG engine (cosine similarity search)
│   │   ├── chat-context.ts  # AI system prompt + welcome messages (6 langs)
│   │   ├── chat-leads.ts    # Lead detection (HOT/WARM/COLD → Telegram)
│   │   ├── telegram.ts      # Telegram messaging helper
│   │   ├── seo-stats.ts     # GSC + GA4 + PageSpeed API integrations
│   │   └── schema.ts        # Schema.org JSON-LD generators
│   └── i18n/
│       ├── en.json          # English
│       ├── bg.json          # Bulgarian
│       ├── tr.json          # Turkish
│       ├── ro.json          # Romanian
│       ├── de.json          # German
│       └── ua.json          # Ukrainian
└── vercel.json              # Cron schedule + function timeouts
```

---

## 🤖 AI Integration

### Chat Assistant

A floating chat widget available on all pages with real-time streaming responses.

**How it works:**

1. User sends a message in any of 6 supported languages
2. Message is vectorized via OpenAI Embeddings API
3. RAG engine finds top-4 relevant knowledge chunks by cosine similarity
4. GPT-4o-mini generates a contextual response with the retrieved knowledge
5. Response streams back via SSE for a real-time typing effect
6. Lead detection analyzes the message for buying signals → Telegram notification

**Features:**

- 29-chunk knowledge base covering products, logistics, certifications, pricing, FAQ
- Language-specific welcome messages and suggested questions
- Rate limiting (20 messages/hour per IP)
- Bold text formatting support
- Mobile responsive (full-screen on mobile)
- Clear chat history

### Lead Detection

Messages are classified in real-time:

- 🔥 **HOT** — pricing, ordering, bulk/wholesale intent (6 languages)
- 💡 **WARM** — product, shipping, certification inquiries
- ❄️ **COLD** — general browsing (no notification)

HOT and WARM leads trigger instant Telegram notifications with signal keywords, language, and message preview.

### Telegram Bot

Multi-purpose bot for business operations:

- `/report` — On-demand SEO dashboard (GSC + GA4 + PageSpeed)
- `/help` — Available commands
- **Daily cron** — Automated SEO report at 8:00 UTC
- **Form notifications** — Instant alerts for quote/contact submissions
- **Lead alerts** — Real-time chat lead notifications

---

## 🌐 Multilingual System

Six languages with complete coverage:

| Language  | Locale | Route   | Status |
| --------- | ------ | ------- | ------ |
| English   | `en`   | `/en/*` | Full   |
| Bulgarian | `bg`   | `/bg/*` | Full   |
| Turkish   | `tr`   | `/tr/*` | Full   |
| Romanian  | `ro`   | `/ro/*` | Full   |
| German    | `de`   | `/de/*` | Full   |
| Ukrainian | `ua`   | `/ua/*` | Full   |

**Implementation:**

- `next-intl` with server-side rendering (`generateMetadata`, `setRequestLocale`)
- URL-based routing via `[locale]` dynamic segment
- Hreflang tags on every page (Ukrainian mapped to `uk` per ISO 639-1)
- Language switcher with country flags
- AI chat responds in the user's detected language

---

## 📈 SEO Architecture

- **Dynamic sitemap** — 162 URLs (27 pages × 6 locales) with `xhtml:link` hreflang alternates
- **Server-side metadata** — `generateMetadata()` for unique title/description per page per locale
- **Schema.org JSON-LD** — Organization, Product, Article, BreadcrumbList
- **Canonical URLs** — Self-referencing per locale
- **Open Graph + Twitter Cards** — Social sharing optimization
- **Keyword clusters** — Sunflower oil wholesale, food trading, bulk pricing (6 languages)
- **Blog content marketing** — 12 posts across 4 topic clusters (pillar + supporting)
- **PageSpeed scores** — Performance: 100, SEO: 100, Accessibility: 98, Best Practices: 100

---

## 📊 Pages

| Page                | Route               | Description                                                                        |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| **Homepage**        | `/`                 | 10-section landing (hero, trust, products, process, logistics, CTA, contacts, map) |
| **About**           | `/about`            | Company overview, mission, team                                                    |
| **Products**        | `/products`         | Product catalog with 7 product categories                                          |
| **Product Detail**  | `/products/[slug]`  | Individual pages with specs, packaging, Schema.org Product                         |
| **Star Food Brand** | `/brands/star-food` | Brand story, trademark, certifications                                             |
| **Blog**            | `/blog`             | Category-filtered blog listing (12 posts)                                          |
| **Blog Post**       | `/blog/[slug]`      | Full article with TOC, Article schema, breadcrumbs                                 |
| **Partners**        | `/partners`         | Partnership program, become a partner                                              |
| **Request Quote**   | `/quote`            | Quote form with product selection                                                  |
| **Contacts**        | `/contacts`         | Contact form, address, map, social links                                           |

---

## 🎨 Design System

**Theme:** Dark + Gold (Premium B2B)

```
Primary:    #d4a843 (Gold)
Background: #0a0a0a (Dark)
Text:       #e8e8e8 (Light)
Cards:      #111111 (Dark card)
```

- **Display font:** Playfair Display (headings — elegant serif)
- **Body font:** Source Sans 3 (body — clean sans-serif with Cyrillic support)
- **Layout:** Max 1440px, responsive at 900px / 600px breakpoints
- **Animations:** CSS transitions, animated counters, pulsing CTAs

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- OpenAI API key

### Installation

```bash
git clone https://github.com/VadymMak/star-food.git
cd star-food
pnpm install
```

### Environment Variables

Create `.env.local`:

```env
# AI Chat (required)
OPENAI_API_KEY=sk-proj-...

# Telegram Bot (optional — for notifications)
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# SEO Reporting (optional)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_API_KEY=...
GA4_PROPERTY_ID=...
CRON_SECRET=...
```

### Generate Embeddings

```bash
npx tsx data/scripts/generate-embeddings.ts
```

### Development

```bash
pnpm dev
```

### Deploy

```bash
git push origin main   # Auto-deploys via Vercel
```

---

## 💰 Cost Breakdown

| Service                           | Monthly Cost     |
| --------------------------------- | ---------------- |
| Vercel Hosting                    | $0               |
| Domain (ub-market.com)            | ~$1.25           |
| OpenAI API (chat)                 | ~$3-10           |
| Google APIs (GSC, GA4, PageSpeed) | $0               |
| Web3Forms                         | $0               |
| Telegram Bot API                  | $0               |
| **Total**                         | **~$5-12/month** |

---

## 📁 Related Projects

| Project                                        | Stack                     | Description                                             |
| ---------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| [akillustrator.com](https://akillustrator.com) | Next.js · TypeScript · AI | Illustration portfolio with AI chat, blog, multilingual |

Cross-site promotion active between both projects for organic SEO backlinks.

---

## 👤 Author

**VadymMak** — Full-stack developer specializing in Next.js, TypeScript, AI integration, and SEO-optimized multilingual web applications.

---

_Built with Next.js 16 · Deployed on Vercel · AI-powered by OpenAI_
