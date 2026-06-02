# Implementation Plan: SEO Optimization

**Branch**: `004-seo-optimization` | **Date**: 2026-06-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-seo-optimization/spec.md`

## Summary

Add foundational SEO capabilities to the Коріння landing page: accurate `<title>` / `<meta>` tags, Open Graph and Twitter Card metadata, JSON-LD structured data for Organization and Product schemas, a static `robots.txt`, and a static `sitemap.xml`. All metadata is injected server-side using Angular's built-in `Title` and `Meta` services so it is present in pre-rendered HTML visible to crawlers without JavaScript.

## Technical Context

**Language/Version**: TypeScript 5.x / Angular 21.2  
**Primary Dependencies**: `@angular/common` (`Meta`, `Title`, `DOCUMENT`) — no new packages  
**Storage**: N/A (static files: `robots.txt`, `sitemap.xml`, OG image in `public/`)  
**Testing**: PROHIBITED by constitution (manual validation only)  
**Target Platform**: Node.js server (Angular SSR prerender — all routes use `RenderMode.Prerender`)  
**Project Type**: Angular SSR/SSG web application (single-page landing)  
**Performance Goals**: Lighthouse SEO score ≥ 95  
**Constraints**: No new npm dependencies; must remain SSR/prerender-compatible  
**Scale/Scope**: Single public URL (`/`); three products; primary language Ukrainian (`lang="uk"`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Code design keeps complexity low, names explicit, and modules focused — metadata injection lives in `HomeComponent`; JSON-LD helper is a single pure function; no new services
- [x] UX scope keeps flows simple with one clear primary action per screen — this feature adds no UI; it adds invisible `<head>` metadata and static files only
- [x] Responsive behavior is defined for mobile, tablet, and desktop — not applicable; SEO metadata has no visual layout; existing responsive design is unchanged
- [x] No new dependency is added without explicit necessity and justification — zero new npm packages; uses Angular's built-in `Meta`, `Title`, and `DOCUMENT` token
- [x] No unit, integration, or e2e testing work is introduced — manual validation only via Lighthouse, Google Rich Results Test, and Facebook Sharing Debugger
- [x] Angular SSR/SSG compatibility is preserved with package.json versions — `Meta`/`Title` services and `DOCUMENT` token are SSR-safe; static files are served by the prerender output

## Project Structure

### Documentation (this feature)

```text
specs/004-seo-optimization/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── seo.contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── index.html                            # MODIFY: add lang="uk", fix <title>
└── app/
    ├── models/
    │   └── seo.model.ts                  # NEW: PageSeoConfig, ProductSchema, OrganizationSchema
    ├── services/
    │   └── seo.service.ts                # NEW: injects Title, Meta, JSON-LD script
    └── pages/
        └── home/
            └── home.ts                   # MODIFY: call seo.service on init

public/
├── robots.txt                            # NEW: crawl permissions
├── sitemap.xml                           # NEW: URL index for crawlers
└── images/
    └── og-image.jpg                      # NEW: 1200×630 Open Graph image (provided externally)
```

**Structure Decision**: Single Angular project. Metadata logic is encapsulated in a `SeoService` (singleton) that accepts a `PageSeoConfig` object. The `HomeComponent` constructs the config from existing `COMPANY_INFO` / `PRODUCTS` data constants and invokes the service. Static files (`robots.txt`, `sitemap.xml`) are placed in `public/` where Angular CLI copies them to the build output root.

## Complexity Tracking

> No constitution violations. No complexity justification required.
