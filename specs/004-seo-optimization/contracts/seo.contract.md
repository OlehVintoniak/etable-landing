# Contract: SEO Metadata & Structured Data

**Feature**: 004-seo-optimization  
**Date**: 2026-06-01  
**Status**: Approved

---

## Contract Overview

This contract defines the interfaces that the `SeoService` exposes to consumers (page components), the structure of static files served to crawlers, and the shape of JSON-LD blocks embedded in the page `<head>`.

---

## 1. `SeoService` Public Interface

### `applyPageSeo(config: PageSeoConfig): void`

Sets all `<head>` metadata for the current page. Safe to call in `ngOnInit` (SSR-compatible).

**Pre-conditions**:
- All required fields of `PageSeoConfig` are populated with non-empty values.
- All URL fields are absolute (`https://...`).

**Post-conditions**:
- The document `<title>` equals `config.title`.
- A `<meta name="description">` tag exists with content `config.description`.
- A `<link rel="canonical">` tag exists with href `config.canonicalUrl`.
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type` meta properties exist.
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` meta names exist.
- A `<script type="application/ld+json" id="ld-organization">` block exists in `<head>` with valid Organization JSON-LD.
- A `<script type="application/ld+json" id="ld-products">` block exists in `<head>` with an array of valid Product JSON-LD objects.
- No duplicate `<script id="ld-*">` elements are created when the component is re-initialized during client-side hydration.

**Side-effects**: Modifies the document `<head>`. No network requests. No state changes.

---

## 2. JSON-LD Block: Organization

**Element**: `<script type="application/ld+json" id="ld-organization">`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "<organization.name>",
  "url": "<organization.url>",
  "logo": "<organization.logo>",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "<contactPoint.telephone>",
    "contactType": "<contactPoint.contactType>",
    "email": "<contactPoint.email>"
  },
  "sameAs": ["<sameAs[0]>", "..."]
}
```

**Validation**: Must pass Google Rich Results Test with zero errors on `Organization` type.

---

## 3. JSON-LD Block: Products

**Element**: `<script type="application/ld+json" id="ld-products">`

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "<product.name>",
    "image": "<product.image>",
    "description": "<product.description>",
    "offers": {
      "@type": "Offer",
      "price": "<offers.price>",
      "priceCurrency": "<offers.priceCurrency>",
      "availability": "<offers.availability>"
    }
  }
]
```

**Validation**: Must pass Google Rich Results Test with zero errors on `Product` type for each product.

---

## 4. Static File: `robots.txt`

**Path**: `public/robots.txt` (served at `https://<domain>/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://korinna.com.ua/sitemap.xml
```

**Contract**:
- MUST be accessible at the root path without authentication.
- MUST NOT contain any `Disallow` rule that blocks `/`.
- MUST contain a `Sitemap:` directive pointing to the sitemap URL.
- Domain placeholder `korinna.com.ua` MUST be replaced with the production domain before deployment.

---

## 5. Static File: `sitemap.xml`

**Path**: `public/sitemap.xml` (served at `https://<domain>/sitemap.xml`)

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

**Contract**:
- MUST be valid XML conforming to the [Sitemaps.org protocol](https://www.sitemaps.org/protocol.html).
- MUST be accessible at the root path without authentication.
- MUST contain at least one `<url>` entry for the homepage.
- `<lastmod>` MUST be updated when meaningful content changes are deployed.
- Domain placeholder MUST be replaced before deployment.

---

## 6. `index.html` Head Contract

After this feature is implemented, the document `<head>` in `src/index.html` MUST satisfy:

| Tag | Required Value |
|-----|---------------|
| `<html lang="...">` | `lang="uk"` |
| `<title>` | `Коріння — Столи ручної роботи з епоксидної смоли та дерева` |
| `<meta charset>` | `utf-8` (already present) |
| `<meta name="viewport">` | `width=device-width, initial-scale=1` (already present) |

Note: `<meta name="description">`, OG tags, Twitter tags, and canonical link are injected at runtime by `SeoService` into the server-rendered `<head>`.

---

## 7. Semantic HTML Contract (existing components)

The following HTML structural requirements MUST be satisfied in the rendered output:

| Requirement | Location |
|-------------|----------|
| Exactly one `<h1>` element on the page | `BannerComponent` (brand headline) |
| `<header>` wrapping the top navigation | `HeaderComponent` |
| `<footer>` wrapping the bottom section | `FooterComponent` |
| `<main>` wrapping the primary page content | `HomeComponent` template |
| All `<img>` elements have non-empty, descriptive `alt` attributes | All product images |

---

## Breaking Changes

None. This feature adds new metadata without modifying any existing component's public interface, selector, or `@Input`/`@Output` contracts.
