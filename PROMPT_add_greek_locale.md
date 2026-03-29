# Task: Add Greek Language (el) to ub-market.com

## Read first

Read CLAUDE.md in the project root before starting.

## What to do

Add Greek language support (locale code: "el") to the star-food Next.js project.
We are on branch `dev`. Test locally with `pnpm dev`. Do NOT push to git.

## Step-by-step checklist

### Step 1 — routing.ts

File: `src/i18n/routing.ts`
Add "el" to the locales array:

```
locales: ["en", "bg", "ua", "tr", "ro", "de", "el"]
```

### Step 2 — Translation file

Create `src/i18n/el.json`

- Copy structure from `src/i18n/en.json`
- Translate ALL values to Greek
- Keep all JSON keys in English (only translate values)
- Greek locale code is "el", hreflang is also "el"

### Step 3 — Sitemap hreflang

File: `src/app/sitemap.xml/route.ts`
Find the hreflangMap and add: `el: "el"`
Also add "el" to the locales array used in sitemap generation.

### Step 4 — Blog page hreflang

File: `src/app/[locale]/blog/[slug]/page.tsx`
Find hreflangMap and add: `el: "el"`

### Step 5 — Blog content files

For each of the 12 blog slugs, create `src/content/blog/[slug]/el.md`
Copy from `en.md` and translate title, description, and content to Greek.

The 12 slugs are:

1. sunflower-oil-wholesale-guide
2. sunflower-oil-prices-europe-2026
3. how-we-created-star-food-labels
4. fob-cif-dap-explained
5. refined-vs-crude-sunflower-oil
6. high-oleic-sunflower-oil-horeca
7. sunflower-oil-packaging-guide
8. how-food-trading-works-europe
9. food-trading-bulgaria-eu-advantage
10. how-to-choose-food-supplier
11. best-frying-oil-restaurants
12. wholesale-beet-sugar-europe

### Step 6 — generateStaticParams

File: `src/app/[locale]/blog/[slug]/page.tsx`
Make sure "el" is in the locales array:

```
const locales = ["en", "bg", "tr", "ro", "de", "ua", "el"];
```

### Step 7 — Check other generateStaticParams

Search for all files with generateStaticParams and make sure "el" is included:

```bash
grep -rn "generateStaticParams\|routing.locales" src/ --include="*.ts" --include="*.tsx"
```

### Step 8 — Test locally

Run: `pnpm dev`
Visit: http://localhost:3000/el
Visit: http://localhost:3000/el/blog
Visit: http://localhost:3000/el/products/sunflower-oil
Check that pages render in Greek without errors.

### Step 9 — Check sitemap

Visit: http://localhost:3000/sitemap.xml
Confirm Greek URLs are present (should now be ~189 URLs = 27 pages × 7 locales)

## Important notes

- Greek hreflang = "el" (same as locale code, no special mapping needed)
- ua locale maps to hreflang "uk" — do NOT change this
- Keep x-default pointing to /en/
- Do NOT commit or push — local testing only
- If pnpm dev shows TypeScript errors, fix them before reporting done

## Success criteria

- /el/ pages load without errors
- All navigation links work in Greek
- Blog posts show in Greek
- Sitemap includes /el/ URLs with correct hreflang
