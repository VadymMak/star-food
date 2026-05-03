# Product Page SEO + i18n Pattern (Star Food / UB Market)

> Architectural reference for per-product per-locale SEO optimization.
> Established April 24-25, 2026 during sunflower-oil rollout.

## Overview

This document captures the proven pattern for delivering localized,
SEO-optimized product pages across 7 locales (en/bg/de/ro/tr/ua/el).
It covers: dynamic metadata generation, full UI localization, and the
architectural decisions behind splitting client and server components.

## The core problem

Product pages live at `/[locale]/products/[slug]`. We need:

1. Per-product per-locale `<title>`, `<meta description>`, `<meta keywords>`
2. Canonical URLs and hreflang alternates per product
3. Open Graph and Twitter Card metadata per product
4. Localized UI (specs values, certificate text, tags)
5. Server-side static generation (SSG) for performance and SEO

The blocker: the page component uses client-only hooks
(`useParams`, `useTranslations`, `useLocale`), which forces it to be
a client component. Client components in Next.js 15 App Router
**cannot export `generateMetadata`**.

## The solution: server/client split

Split each product page into two files:
```
src/app/[locale]/products/[slug]/
├── page.tsx              ← server component (metadata + SSG params)
└── ProductPageClient.tsx ← "use client" (UI, hooks, interactivity)
```

### Server `page.tsx` responsibilities

- Export `generateStaticParams()` — produces all `locale × slug` combos
- Export `generateMetadata()` — loads translations via `getTranslations`
  from `next-intl/server`, builds full metadata per slug per locale
- Default export: an async server component that calls
  `setRequestLocale(locale)`, validates the slug (`notFound()` on miss),
  and renders `<ProductPageClient />`

### Client `ProductPageClient.tsx` responsibilities

- `"use client"` directive
- All UI rendering, hooks, event handlers
- Reads same translations via `useTranslations()`
- Renders specs, hero, CTAs, related products, blog cards

### Critical: remove static metadata from segment layout

`src/app/[locale]/products/layout.tsx` previously exported a static
English `metadata` object. This must be removed (the layout becomes
a passthrough), otherwise it overrides per-page metadata.

## Metadata generated per page

For each `[locale]/products/[slug]` URL, `generateMetadata` produces:

- **Title**: `${translatedName} Wholesale Europe` (template `%s | Star Food` from root)
- **Description**: from `products.items.[id].description` in locale JSON
- **Keywords**: from `localeKeywords[locale]` map (validated per Keyword Planner)
- **Canonical**: `${BASE_URL}/${locale}/products/${slug}`
- **Hreflang**: all 7 locales + `x-default` (mapping `ua → uk` per ISO 639-1)
- **Open Graph**: title, description, image, URL, site_name, type
- **Twitter Card**: summary_large_image with same fields

## i18n architecture: Path A (per-product nested translations)

Locale JSONs (`src/i18n/{en,bg,de,ro,tr,ua,el}.json`) structure each
product fully under `products.items.[id]`:

```json
"products": {
  "items": {
    "sunflower-oil": {
      "name": "Ayçiçek Yağı",
      "description": "UB Market LTD tarafından sunulan toptan ayçiçek yağı...",
      "specs": {
        "volume": "0,5L, 1L, 5L, 10L PET / 10L, 20L bidon / Dökme tanker",
        "packaging": "PET şişeler, plastik bidonlar, dökme tankerler",
        "shelfLife": "12-18 ay",
        "origin": "Doğu Avrupa (Ukrayna, Bulgaristan)",
        "certification": "ISO 22000, HACCP, Non-GMO"
      }
    }
  }
}
```

Component reads with safe fallback to `products.ts` master:

```ts
const productItems = t.raw("products.items") as Record<string, {
  name: string;
  description: string;
  specs?: { volume?: string; packaging?: string; ... };
}>;
const translated = productItems?.[product?.id as string];
const productName = translated?.name || product.name;
const productDesc = translated?.description || product.description;
const specVolume = translated?.specs?.volume || product.specs.volume;
```

This pattern has been applied to 56 specs blocks (8 products × 7 locales).

## Per-locale validated keywords

Each locale uses keywords validated in Google Keyword Planner with
**correct location + language settings** (critical: location must
match the target market, not your default region).

Validated keyword sets (as of April 2026):

- **EN**: bulk vegetable oil, edible oil wholesale, sunflower oil supplier
- **DE**: sonnenblumenöl großhandel, pflanzenöl großhandel, speiseöl großhandel
- **BG**: слънчогледово олио, хранителни стоки на едро
- **TR**: toptan ayçiçek yağı, gıda toptancısı, toptan gıda
- **RO**: ulei ieftin en gros (best B2B), ulei floarea soarelui en gros
- **EL**: ηλιέλαιο (top — 1K-10K Low), ηλιέλαιο χονδρική
- **UA**: pending separate keyword research

These live in `localeKeywords` map inside `page.tsx`.

## Lessons learned

### 1. Always verify Keyword Planner location settings

When the location was accidentally set to a previous country
(e.g., DE while testing RO keywords), search volumes were
significantly understated. Always confirm `Location: [target country]`
and `Language: [target language]` before recording results.

### 2. Word order matters in Turkish, Greek, Romanian

- TR: `toptan ayçiçek yağı` (100-1K) >> `ayçiçek yağı toptan` (10-100)
- EL: `ηλιέλαιο` (1K-10K) >> `λάδι ηλιέλαιο` (10-100)
- RO: `en gros` (space) is the natural form, not `en-gros` (hyphen)

### 3. Not every product has search volume in every market

For frying-oil in Turkey, all niche keywords were 0-10. Don't force
keyword stuffing on dead terms. Use general B2B food wholesale
keywords that have validated volume instead.

### 4. Atomic commits per logical step

We split into small atomic steps (3A, 3B, 3C, etc.) with verification
between each. Commit after each verified step. Easier to roll back.

### 5. Server/client split doesn't break translations

`getTranslations` (server) and `useTranslations` (client) read the same
locale JSON. A description added once in the JSON works in both layers
automatically.

### 6. Path A vs Path B for nested i18n

We chose Path A (translations nested under product ID) over Path B
(shared dictionary of unique values referenced by key). Path A is more
verbose but consistent with the existing pattern, easier for translators,
and easier to roll back. Path B optimizes DRY but requires architectural
changes in `products.ts`.

## Process discipline

For each modification:

1. **REPORT ONLY** prompt first — never modify before knowing the structure
2. **MODIFY** prompt with explicit `FIND` / `REPLACE WITH` blocks
3. Verify after every step: `npx tsc --noEmit` + `npm run build` + JSON validation
4. Visual check on localhost before commit
5. Atomic commit per logical step
6. Push to `dev` branch first, verify on Vercel preview, then merge to `main`

## File map (current state, April 25 2026)

| Concern | File |
|---|---|
| Server metadata | `src/app/[locale]/products/[slug]/page.tsx` |
| Client UI | `src/app/[locale]/products/[slug]/ProductPageClient.tsx` |
| Passthrough layout | `src/app/[locale]/products/layout.tsx` |
| Product master data | `src/data/products.ts` |
| Translations | `src/i18n/{en,bg,de,ro,tr,ua,el}.json` |
| JSON-LD schema | `src/lib/schema.ts` |
| Routing config | `src/i18n/routing.ts` |

## Coverage status (April 25, 2026)

Sunflower-oil product description optimization:

| Locale | Status | Words | Validated keywords |
|---|---|---|---|
| TR | ✅ | 63 | toptan ayçiçek yağı + 4 |
| EN | ✅ | 59 | bulk vegetable oil + 4 |
| DE | ✅ | 54 | sonnenblumenöl großhandel + 4 |
| BG | ✅ | 60 | слънчогледово олио + 4 |
| RO | ✅ | 63 | ulei ieftin en gros + 4 |
| EL | ✅ | 56 | ηλιέλαιο + 4 |
| UA | ⏳ | 14 | pending |

Other products (high-oleic, rapeseed-oil, soybean-oil, frying-oil,
mayonnaise, dairy, sugar) are still on short English-only descriptions.
The pattern in this document applies directly when expanding them.

## Next steps in the SEO plan

- **Step 5**: FAQPage schema on product pages (+65-73% AI citation
  probability per GEO Guide v3.0)
- Roll out the same pattern to remaining 7 products
- Complete UA locale for sunflower-oil
