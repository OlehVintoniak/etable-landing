# Research: Home Page — Epoxy River Tables Landing Page

**Phase**: 0 — Research & Unknowns Resolution  
**Branch**: `001-landing-page-home`  
**Date**: 2026-05-10

---

## 1. Angular 21 Component Architecture for SSR Landing Pages

**Decision**: Standalone components with `ChangeDetectionStrategy.OnPush`, signals for any reactive state, `input()` / `output()` functions.

**Rationale**: Angular 21 defaults to standalone (no `standalone: true` needed in decorator). OnPush ensures the component tree re-renders only when inputs change, which is ideal for a mostly-static landing page. Signals replace `@Input` decorator for future-compatibility and are the Angular 21 idiomatic pattern.

**Alternatives considered**: NgModules (rejected — deprecated pattern, adds boilerplate), Default change detection (rejected — unnecessary re-renders on a static page).

**SSR compatibility**: All components must avoid browser-only globals (`window`, `document`, `navigator`). No DOM manipulation in constructors or `ngOnInit` that could break SSR hydration. Angular's `isPlatformBrowser` guard is available if needed but should not be required for this feature since all content is static.

---

## 2. Google Fonts in Angular SSR

**Decision**: Add `<link rel="preconnect">` and `<link rel="stylesheet">` tags for Google Fonts directly in `src/index.html`. Do NOT use `@import` inside SCSS — this blocks rendering.

**Rationale**: In SSR, `index.html` is the server-rendered shell. Font `<link>` tags placed there are included in the initial HTML response, enabling the browser to start font negotiation before JS hydrates. `preconnect` to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` reduces font load latency.

**Alternatives considered**: SCSS `@import` (rejected — render-blocking), Angular `DOCUMENT` injection to append links (rejected — unnecessary complexity for a static resource).

**Families required** (from brand kit):
- `Playfair+Display:ital,wght@0,400;0,700;1,400` — display headings, logo
- `Cormorant+Garamond:wght@300;400;500` — body prose
- `DM+Mono:wght@300;400` — labels, dimensions, meta text

---

## 3. CSS Design Tokens from Brand Kit

**Decision**: Define all brand colours, font families, and spacing tokens as CSS custom properties (variables) in a dedicated `src/styles/theme.scss` file. `src/styles.scss` imports `theme.scss` and contains only global resets. Components reference variables only — no hard-coded hex values or font names inline.

**Rationale**: Single source of truth for the theme. Isolating tokens in `theme.scss` means a future brand refresh requires changing one file — without touching component stylesheets or `styles.scss`. CSS variables work natively in all modern browsers and are fully SSR-compatible (no JS required). No CSS-in-JS or external design-token library is needed.

**Token map** (derived from `etable-landing-brand-kit.html`):

| Token | Value | Role |
|---|---|---|
| `--color-bark` | `#3A2510` | Primary — dark backgrounds, body text |
| `--color-oak` | `#5C3D1E` | Secondary — headings, accents |
| `--color-walnut` | `#7A5230` | Mid-tone — prose text |
| `--color-resin` | `#C8A97A` | Accent — highlights, labels, CTA |
| `--color-birch` | `#F0E8D8` | Light — backgrounds, text on dark |
| `--color-cream` | `#FAF6EF` | Page background |
| `--color-stone` | `#8C7B6B` | Muted — secondary labels |
| `--color-moss` | `#4A5240` | Support — forest tones |
| `--color-epoxy` | `#B8D4C8` | Subtle accent — water/glass fills |
| `--font-display` | `'Playfair Display', serif` | Headings, logo |
| `--font-body` | `'Cormorant Garamond', serif` | Body prose |
| `--font-mono` | `'DM Mono', monospace` | Labels, dimensions |

**Alternatives considered**: SCSS variables (rejected — not inheritable across shadow boundaries, CSS vars are more flexible and idiomatic for design systems).

---

## 4. Responsive Grid Strategy

**Decision**: CSS Grid with `auto-fill` / `minmax()` for the product card grid. Media query breakpoints at 768 px (tablet) and 1280 px (desktop), mobile-first.

**Rationale**: No external grid library needed — CSS Grid natively handles the mobile-single-column → tablet-two-column → desktop-three-column layout required by FR-005. This preserves the minimal-dependencies principle. The brand kit itself uses CSS Grid for its colour and layout examples.

**Layout plan**:
- Mobile (< 768 px): 1 column
- Tablet (≥ 768 px): 2 columns
- Desktop (≥ 1280 px): 3 columns

**Alternatives considered**: Flexbox with `flex-wrap` (viable but less semantically correct for a grid of uniform cards), CSS framework (Tailwind, Bootstrap — rejected, new dependency, violates constitution).

---

## 5. Product Image Strategy

**Decision**: Use Angular `NgOptimizedImage` (`NgOptimizedImage` directive) for all product card images. Provide `width` and `height` attributes. Use a descriptive `alt` attribute per product.

**Rationale**: `NgOptimizedImage` is a built-in Angular directive (`@angular/common`) that adds lazy loading, priority hints, and SSR-compatible `srcset` generation with zero new dependencies. Product images are the likely LCP element — the first card's image should use `priority` attribute.

**Fallback**: If an image fails to load, the `<img>` element's structural space is preserved via explicit `width`/`height` CSS. A CSS background-color placeholder on the image container ensures the card is visually intact (edge case from spec).

**Alternatives considered**: Plain `<img>` (rejected — loses lazy loading and SSR optimisations), external image CDN library (rejected — unnecessary dependency).

---

## 6. Static Data Approach

**Decision**: Static TypeScript data files in `src/app/data/` export typed arrays/objects. No HTTP calls, no service layer with observables. Components read data directly via `inject()` of a lightweight typed provider or via direct import.

**Rationale**: The spec explicitly states product data is static for the initial release. A simple TypeScript constant array has zero runtime overhead and is perfectly SSR-compatible. Adding a service layer for static data would be over-engineering (constitution: avoid unnecessary abstractions).

**Data files**:
- `src/app/data/products.data.ts` — `Product[]` array with name, image, material, width, length
- `src/app/data/company.data.ts` — `CompanyInfo` object (name, tagline, CTA label), `ContactDetail`, `SocialMediaLink`

**Alternatives considered**: JSON file + `HttpClient` fetch (rejected — SSR transfer state complexity for static data), environment variables (rejected — overkill for display strings).
