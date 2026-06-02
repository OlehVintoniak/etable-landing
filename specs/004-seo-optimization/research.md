# Research: SEO Optimization

**Feature**: 004-seo-optimization  
**Date**: 2026-06-01

---

## Topic 1: Angular SEO — Title and Meta Service in SSR Context

**Decision**: Use Angular's built-in `Title` service and `Meta` service (both from `@angular/platform-browser`) injected inside a `SeoService`. Call the service from `HomeComponent.ngOnInit` so metadata is set during server-side rendering and present in the prerendered HTML.

**Rationale**: Angular's `Title` and `Meta` services are SSR-aware — they manipulate the DOM via the `DOCUMENT` token, which Angular SSR maps to a server-side DOM implementation (`@angular/platform-server`). This guarantees meta tags are included in the static HTML sent to crawlers without client-side JavaScript. No third-party library is needed.

**Alternatives considered**:
- Injecting tags directly in `index.html`: Rejected — produces hardcoded static values; prevents per-route control and reuse.
- `ngx-meta` / `ngx-seo` libraries: Rejected — new dependencies; Angular's built-in services are equivalent for a single-page site.

---

## Topic 2: JSON-LD Structured Data in Angular SSR

**Decision**: Inject JSON-LD `<script type="application/ld+json">` elements into the document `<head>` by acquiring the `DOCUMENT` token in `SeoService` and calling `document.createElement` + `document.head.appendChild`. Because the `HomeComponent` runs during prerender, the script block will be present in the static output.

**Rationale**: Angular's `Meta` service does not support `<script>` elements. The `DOCUMENT` token (`@angular/common`) provides the server-side document object during SSR/prerender, making direct DOM manipulation safe and equivalent to what a browser does. JSON-LD is Google's recommended format for structured data — it does not require interspersing attributes in HTML elements.

**Alternatives considered**:
- Embedding JSON-LD in `index.html` directly: Rejected — content is static and would not match the actual product data from TypeScript data constants.
- Using a third-party schema library: Rejected — adds a dependency; the schema shapes for Product and Organization are simple and can be typed inline.
- Using Angular's `Renderer2`: Valid alternative but `DOCUMENT` direct access is simpler for appending a single script block; both are SSR-safe.

**Caveat**: During client-side navigation (hydration), `ngOnInit` is called again. The implementation MUST check whether the script element already exists before appending to avoid duplicates. A stable `id` attribute on the `<script>` element enables this check.

---

## Topic 3: Open Graph Image Requirements

**Decision**: Provide a static image at `public/images/og-image.jpg`, referenced by an absolute URL in `og:image` and `twitter:image` meta tags. Use a placeholder relative path (`/images/og-image.jpg`) during development; the production canonical URL will be prepended at build time via an environment constant or data constant.

**Rationale**: OG image minimum size is 1200×630 px (1.91:1 aspect ratio) per Facebook/Twitter requirements. The image must be reachable via an absolute URL — relative URLs are not supported by social platform scrapers. Placing it in `public/` ensures Angular CLI copies it to the build output root.

**Alternatives considered**:
- Generating OG images programmatically: Rejected — out of scope for a landing page; a single branded image covers all share scenarios.

---

## Topic 4: robots.txt for Angular SSR + Prerender

**Decision**: Place a static `robots.txt` in `public/` with content that allows all bots to crawl all pages and references the sitemap URL. Angular CLI copies everything in `public/` to the build output root, making it accessible at `https://domain/robots.txt`.

**Rationale**: Angular prerender outputs static files including `index.html` and assets. The Express server (`server.ts`) serves static files from `browserDistFolder` — which is the Angular CLI build output. A `robots.txt` placed in `public/` will therefore be served correctly.

**Content**:
```
User-agent: *
Allow: /
Sitemap: https://korinna.com.ua/sitemap.xml
```
(Domain is a placeholder; must be updated to production domain before deployment.)

---

## Topic 5: XML Sitemap Generation Strategy

**Decision**: Use a hand-authored static `sitemap.xml` in `public/`. For a single-page landing site with one URL, dynamic generation adds complexity for no benefit.

**Rationale**: The site has exactly one public URL (`/`). A static sitemap with one entry is sufficient and trivially maintained. If additional pages are added in future features, the sitemap strategy can be revisited.

**Format**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://korinna.com.ua/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## Topic 6: Schema.org Vocabulary for Product and Organization

**Decision**: Use the following Schema.org types:
- **Organization**: `@type: "Organization"` with `name`, `url`, `logo`, `contactPoint`, and `sameAs` (social media URLs).
- **Product** (per item): `@type: "Product"` with `name`, `image`, `description`, `offers` (`@type: "Offer"`, `price`, `priceCurrency: "UAH"`, `availability: "https://schema.org/InStock"`).

**Rationale**: These are the Google-recommended schema types for a brand + product landing page. The Rich Results Test and Merchant Center validate against these shapes. Using `InStock` availability is accurate since products are displayed for sale.

**Alternatives considered**:
- `ItemList` wrapping multiple `Product` entities: Valid but adds nesting without additional rich result eligibility for this content type; individual `Product` blocks are simpler and validated separately.

---

## Topic 7: `lang` Attribute and Character Set

**Decision**: Set `lang="uk"` on the `<html>` element in `index.html`. The existing `<meta charset="utf-8">` is already correct.

**Rationale**: The page content is entirely in Ukrainian. Correct `lang` attribute enables screen readers to apply the right pronunciation rules and signals language to search engines for geo-targeted results. This is an `index.html` change (not runtime), so it applies to all prerendered pages.

**Alternatives considered**:
- Setting `lang` dynamically via `SeoService`: Technically possible but unnecessary for a single-language site; `index.html` edit is simpler and has no runtime cost.

---

## Summary: All Unknowns Resolved

| Unknown | Resolution |
|---------|-----------|
| How to inject meta tags SSR-safe in Angular 21 | Use `Title` + `Meta` services from `@angular/platform-browser` — natively SSR-aware |
| How to inject JSON-LD SSR-safe | Use `DOCUMENT` token from `@angular/common`; check for existing script by `id` before appending |
| OG image absolute URL | Reference production canonical base URL via a constant; placeholder during dev |
| robots.txt serving mechanism | Static file in `public/`; served by Angular CLI output + Express static middleware |
| Sitemap strategy | Single hand-authored static `sitemap.xml` in `public/` |
| Schema.org types to use | `Organization` + `Product` with `Offer` |
| Language attribute | `lang="uk"` on `<html>` in `index.html` |
