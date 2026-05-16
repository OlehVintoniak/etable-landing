# Implementation Plan: Home Page — Epoxy River Tables Landing Page

**Branch**: `001-landing-page-home` | **Date**: 2026-05-10 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/001-landing-page-home/spec.md`

## Summary

Build the Korinna landing page home route as a single Angular SSR page composed of five standalone components — `HeaderComponent`, `BannerComponent`, `ProductListComponent`, `ProductCardComponent`, and `FooterComponent` — assembled inside a `HomeComponent` page. All content is static TypeScript data. Brand styles come from the Korinna brand kit (CSS variables, Google Fonts CDN). Theme tokens (colours, fonts, spacing) live in a dedicated `src/styles/theme.scss` file — `styles.scss` imports it — making future theme swaps a single-file change. No new npm dependencies are introduced.

## Technical Context

**Language/Version**: TypeScript 5.9.x, Angular 21.2.x  
**Primary Dependencies**: `@angular/ssr` 21.2.2, `@angular/common` (NgOptimizedImage), Google Fonts CDN (link tag only — not an npm dependency)  
**Storage**: N/A — static inline TypeScript data  
**Testing**: PROHIBITED by constitution (manual validation only)  
**Target Platform**: Web browser + Node.js SSR server (Express 5.x, already in package.json)  
**Project Type**: Angular SSR/SSG landing page (single route)  
**Performance Goals**: LCP < 2.5 s (SC-004); no horizontal scroll ≥ 375 px (SC-005)  
**Constraints**: Zero new npm dependencies; no browser-only globals in SSR-rendered components; Google Fonts via `<link>` in `index.html` only; all CSS custom properties (colours, fonts, spacing) defined in `src/styles/theme.scss` only — never hardcoded inline in component stylesheets  
**Scale/Scope**: Single page, 5 presentational components, ~4 data entities, ~12 static product records

## Constitution Check

*Pre-design gate — all gates pass.*

- [x] Code design keeps complexity low, names explicit, and modules focused — 5 small focused components, no shared state, no services needed
- [x] UX scope keeps flows simple with one clear primary action per screen — single CTA (scroll to products) in banner
- [x] Responsive behavior is defined for mobile, tablet, and desktop — breakpoints 375/768/1280 px, mobile-first CSS grid
- [x] No new npm dependency is added without explicit necessity and justification — Google Fonts is a CDN `<link>`, not npm; NgOptimizedImage is built-in
- [x] No unit, integration, or e2e testing work is introduced — confirmed, no test files planned
- [x] Angular SSR/SSG compatibility is preserved — `@angular/ssr` 21.2.2 already in package.json; no browser-only globals used

*Post-design re-check: all gates continue to pass — see Complexity Tracking.*

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-page-home/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output — component UI contracts
│   ├── header.contract.md
│   ├── banner.contract.md
│   ├── product-card.contract.md
│   ├── product-list.contract.md
│   └── footer.contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
  index.html                        ← add Google Fonts <link> tags here
  styles.scss                       ← global resets; imports theme.scss
  styles/
    theme.scss                      ← all CSS custom properties: colours, fonts, spacing

  app/
    app.routes.ts                   ← add '' route → HomeComponent
    app.html                        ← RouterOutlet only

    data/
      products.data.ts              ← Product[] static array
      company.data.ts               ← CompanyInfo, ContactDetail, SocialMediaLink

    models/
      product.model.ts              ← Product interface
      company.model.ts              ← CompanyInfo, ContactDetail, SocialMediaLink interfaces

    pages/
      home/
        home.ts                     ← HomeComponent (page, assembles all components)
        home.html
        home.scss

    components/
      header/
        header.ts                   ← HeaderComponent
        header.html
        header.scss
      banner/
        banner.ts                   ← BannerComponent
        banner.html
        banner.scss
      product-list/
        product-list.ts             ← ProductListComponent
        product-list.html
        product-list.scss
      product-card/
        product-card.ts             ← ProductCardComponent
        product-card.html
        product-card.scss
      footer/
        footer.ts                   ← FooterComponent
        footer.html
        footer.scss

public/
  images/
    products/                       ← product table photos (jpg/webp)
```

**Structure Decision**: Single Angular project, standard `src/app` layout. Pages are separated from reusable components by directory. Models are co-located with data files under `src/app/models/` and `src/app/data/`. No backend, no additional projects.

## Complexity Tracking

> No constitution violations. No complexity justification required.
