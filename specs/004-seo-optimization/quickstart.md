# Quickstart: SEO Optimization

**Feature**: 004-seo-optimization  
**Date**: 2026-06-01

---

## Goal

Add metadata, structured data, `robots.txt`, and `sitemap.xml` to the Коріння landing page so search engines and social platforms can discover, index, and preview the site correctly.

---

## Prerequisites

- Node.js 20+ and Yarn installed
- Angular CLI 21.2 installed (`ng version` to verify)
- The `004-seo-optimization` branch is checked out

---

## Step 1 — Run the Development Server

```bash
yarn start
```

Open `http://localhost:4200` in a browser to confirm the site loads. The server runs in watch mode.

To test the SSR/prerendered output (the HTML crawlers see):

```bash
yarn build
yarn serve:ssr:etable-landing
```

Open `http://localhost:4000` and use **View Page Source** (not DevTools) to inspect the raw HTML.

---

## Step 2 — Understand the Change Surface

This feature touches the following files:

| File | Change |
|------|--------|
| `src/index.html` | Add `lang="uk"` to `<html>`; update `<title>` |
| `src/app/models/seo.model.ts` | **New** — TypeScript interfaces: `PageSeoConfig`, `OrganizationSchema`, `ProductSchema`, `OfferSchema`, `ContactPointSchema` |
| `src/app/services/seo.service.ts` | **New** — `SeoService` with `applyPageSeo(config)` method |
| `src/app/pages/home/home.ts` | **Modify** — inject `SeoService`, call `applyPageSeo` in `ngOnInit` with `HOME_SEO_CONFIG` |
| `src/app/data/seo.data.ts` | **New** — `HOME_SEO_CONFIG` constant built from `COMPANY_INFO`, `CONTACT`, `INSTAGRAM`, `PRODUCTS` |
| `public/robots.txt` | **New** — crawl permissions |
| `public/sitemap.xml` | **New** — URL index |

---

## Step 3 — Validate SEO Metadata (Manual)

### 3.1 Check `<head>` tags in SSR output

1. Run `yarn build && yarn serve:ssr:etable-landing`
2. Open `http://localhost:4000` in a browser
3. Right-click → **View Page Source**
4. Confirm these are present in `<head>`:
   - `<html lang="uk">`
   - `<title>Коріння — Столи ручної роботи з епоксидної смоли та дерева</title>`
   - `<meta name="description" content="...">` (150–160 chars)
   - `<link rel="canonical" href="...">`
   - `<meta property="og:title" content="...">`
   - `<meta property="og:image" content="...">`
   - `<meta name="twitter:card" content="summary_large_image">`
   - `<script type="application/ld+json" id="ld-organization">`
   - `<script type="application/ld+json" id="ld-products">`

### 3.2 Validate Structured Data

1. Copy the page source
2. Open [Google Rich Results Test](https://search.google.com/test/rich-results) → paste URL or code
3. Expected: Zero errors for `Organization` and `Product` types

### 3.3 Validate Social Previews

1. Deploy to a publicly accessible URL (e.g., staging)
2. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. Expected: Title, description, and OG image display correctly

### 3.4 Validate robots.txt and sitemap.xml

```bash
curl http://localhost:4000/robots.txt
curl http://localhost:4000/sitemap.xml
```

Or open in browser:
- `http://localhost:4000/robots.txt` — must show `User-agent: *` and `Allow: /`
- `http://localhost:4000/sitemap.xml` — must show valid XML with at least one `<url>` entry

### 3.5 Run Lighthouse SEO Audit

1. Open `http://localhost:4000` in Chrome
2. Open DevTools → Lighthouse → check **SEO** category
3. Run audit
4. Expected: SEO score ≥ 95

---

## Step 4 — Before Deploying to Production

1. Replace all instances of the placeholder domain `korinna.com.ua` with the actual production domain:
   - `src/app/data/seo.data.ts` — canonical URL, OG image URL, product image URLs
   - `public/robots.txt` — sitemap URL
   - `public/sitemap.xml` — `<loc>` URL

2. Ensure `public/images/og-image.jpg` exists and is at least 1200×630 px.

3. Submit the sitemap in [Google Search Console](https://search.google.com/search-console).

---

## Key Angular APIs Used

| API | Package | Purpose |
|-----|---------|---------|
| `Title` | `@angular/platform-browser` | Sets `document.title` |
| `Meta` | `@angular/platform-browser` | Adds/updates `<meta>` tags |
| `DOCUMENT` | `@angular/common` | Accesses the document object (SSR-safe) |
| `inject()` | `@angular/core` | Dependency injection in service |

No new npm packages are required.
