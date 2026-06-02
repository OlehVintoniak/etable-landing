# Tasks: SEO Optimization

**Input**: Design documents from `/specs/004-seo-optimization/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/seo.contract.md ✅, quickstart.md ✅

**Validation**: Manual validation only per constitution. No automated tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Project initialization — shared prerequisites with no inter-dependencies

- [X] T001 [P] Update `src/index.html`: set `lang="uk"` on `<html>` element and update `<title>` to `Коріння — Столи ручної роботи з епоксидної смоли та дерева`
- [X] T002 [P] Create `src/app/models/seo.model.ts` with interfaces: `PageSeoConfig`, `OrganizationSchema`, `ContactPointSchema`, `ProductSchema`, `OfferSchema` per data-model.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data and semantic HTML that all user story phases depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create `src/app/data/seo.data.ts` — export `HOME_SEO_CONFIG: PageSeoConfig` constant populated from `COMPANY_INFO`, `CONTACT`, `INSTAGRAM`, and `PRODUCTS`; use `https://korinna.com.ua/` as canonical base (add `// TODO: replace with production domain` comment)
- [X] T004 Add `<main>` semantic wrapper around primary content area in `src/app/pages/home/home.html` (wrapping the product list and banner; `<app-header>` and `<app-footer>` remain outside `<main>`)

**Checkpoint**: Foundation ready — user story phases can now begin

---

## Phase 3: User Story 1 — Search Engine Discovers and Indexes the Site (Priority: P1) 🎯 MVP

**Goal**: Google and other crawlers can discover, crawl, and index the site; accurate title, description, and canonical URL are present in prerendered HTML; `robots.txt` and `sitemap.xml` are served from the root.

**Independent Validation**: Build SSR output (`yarn build`), view page source at `http://localhost:4000`, confirm `<title>`, `<meta name="description">`, and `<link rel="canonical">` are present. Open `/robots.txt` and `/sitemap.xml` in browser. Run Lighthouse SEO audit targeting score ≥ 95.

- [X] T005 [P] [US1] Create `public/robots.txt` — content: `User-agent: *`, `Allow: /`, `Sitemap: https://korinna.com.ua/sitemap.xml` (add `# TODO: replace domain` comment)
- [X] T006 [P] [US1] Create `public/sitemap.xml` — valid Sitemaps.org XML with one `<url>` entry for `https://korinna.com.ua/`, `<lastmod>2026-06-01</lastmod>`, `<changefreq>monthly</changefreq>`, `<priority>1.0</priority>`
- [X] T007 [US1] Create `src/app/services/seo.service.ts` — `providedIn: 'root'`; inject `Title` (`@angular/platform-browser`), `Meta` (`@angular/platform-browser`), `DOCUMENT` (`@angular/common`); implement `applyPageSeo(config: PageSeoConfig): void` that sets document `<title>`, and adds/updates `<meta name="description">` and `<link rel="canonical">` tags
- [X] T008 [US1] Modify `src/app/pages/home/home.ts` — inject `SeoService` via `inject()`; implement `ngOnInit` calling `this.seoService.applyPageSeo(HOME_SEO_CONFIG)`; add `OnInit` interface

**Checkpoint**: User Story 1 is complete — build and validate independently before proceeding

- [X] T009 [US1] Validate US1: run `yarn build && yarn serve:ssr:etable-landing`; view page source at `http://localhost:4000`; confirm `<html lang="uk">`, `<title>`, `<meta name="description">`, `<link rel="canonical">` are in raw HTML; open `http://localhost:4000/robots.txt` and `http://localhost:4000/sitemap.xml` to confirm both are served; run Chrome Lighthouse SEO audit and confirm score ≥ 95

---

## Phase 4: User Story 2 — Social Media Shares Display Rich Preview Cards (Priority: P2)

**Goal**: Sharing the site URL on Facebook, Instagram, LinkedIn, or Twitter/X produces a branded preview card with correct title, description, and image.

**Independent Validation**: Check page source for `og:*` and `twitter:*` meta tags. On a publicly accessible staging URL, use Facebook Sharing Debugger and Twitter Card Validator to confirm a rich preview renders.

- [X] T010 [P] [US2] Extend `applyPageSeo` in `src/app/services/seo.service.ts` to add Open Graph meta properties: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`; and Twitter Card meta names: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [X] T011 [P] [US2] Add OG image to `public/images/og-image.jpg` — minimum 1200×630 px branded image (create or copy a brand-appropriate image; add a placeholder if the final asset is not yet available, noting that the actual image must be provided before production deployment)

**Checkpoint**: User Story 2 is complete — validate social previews independently before proceeding

- [X] T012 [US2] Validate US2: view page source at `http://localhost:4000` and confirm all `og:*` and `twitter:*` meta tags are present with correct content; on staging, submit URL to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator) and confirm branded title, description, and image display correctly

---

## Phase 5: User Story 3 — Product Pages Enable Rich Search Results (Priority: P3)

**Goal**: Google's Rich Results Test reports valid `Organization` and `Product` JSON-LD structured data with zero errors, making the site eligible for rich snippets in search results.

**Independent Validation**: View page source and confirm `<script type="application/ld+json" id="ld-organization">` and `<script type="application/ld+json" id="ld-products">` are present with valid JSON. Submit URL to Google Rich Results Test and confirm zero errors.

- [X] T013 [US3] Extend `applyPageSeo` in `src/app/services/seo.service.ts` to inject JSON-LD blocks: use `DOCUMENT` token to create `<script type="application/ld+json" id="ld-organization">` and `<script type="application/ld+json" id="ld-products">` elements; serialize `config.organization` (with `@context` and `@type: "Organization"`) and `config.products` array (each with `@context` and `@type: "Product"`) as JSON; check for existing elements by `id` before appending to prevent duplicates on hydration

**Checkpoint**: User Story 3 is complete — all three user stories are now independently functional

- [X] T014 [US3] Validate US3: view page source at `http://localhost:4000` and confirm both `<script id="ld-organization">` and `<script id="ld-products">` are present; copy page source and submit to [Google Rich Results Test](https://search.google.com/test/rich-results); confirm zero errors for `Organization` and `Product` types

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Production readiness — domain placeholders and end-to-end validation

- [X] T015 [P] Add `// TODO(prod): replace korinna.com.ua with production domain` comments in `src/app/data/seo.data.ts`, `public/robots.txt`, and `public/sitemap.xml` at every occurrence of the placeholder domain
- [X] T016 Run the full quickstart.md manual validation checklist end-to-end: dev server (title/meta visible in DevTools), SSR build (page source check), Lighthouse SEO ≥ 95, robots.txt/sitemap accessible, structured data valid; record outcomes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately; T001 and T002 run in parallel
- **Foundational (Phase 2)**: Depends on T002 (model interfaces) — BLOCKS all user story phases
- **US1 (Phase 3)**: Depends on Phase 2; T005 and T006 run in parallel with T007 and T008
- **US2 (Phase 4)**: Depends on T007 (SeoService exists); T010 and T011 run in parallel
- **US3 (Phase 5)**: Depends on T010 (SeoService Meta tags implemented); T013 extends the service further
- **Polish (Phase 6)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on US2 or US3
- **US2 (P2)**: Can start after T007 (SeoService skeleton) — no dependency on US3
- **US3 (P3)**: Can start after T010 (SeoService extended with OG/Twitter) — builds on same service

### Within Each User Story

- Model interfaces (T002) before service (T007)
- Service (T007) before component integration (T008)
- Implementation tasks before validation task (T009, T012, T014)

---

## Parallel Execution Examples

### Phase 1 (can run together)

```
T001 — Update index.html (lang + title)
T002 — Create seo.model.ts (interfaces)
```

### User Story 1 (partial parallel)

```
T005 — Create public/robots.txt    ┐ run in parallel
T006 — Create public/sitemap.xml   ┘
T007 — Create seo.service.ts (US1 scope)
T008 — Modify home.ts (depends on T007)
T009 — Validate US1 (depends on T005–T008)
```

### User Story 2 (can run together after T007)

```
T010 — Extend seo.service.ts (OG + Twitter)  ┐ run in parallel
T011 — Add public/images/og-image.jpg         ┘
T012 — Validate US2 (depends on T010, T011)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 2: Foundational (T003, T004)
3. Complete Phase 3: User Story 1 (T005–T009)
4. **STOP and VALIDATE**: Lighthouse SEO ≥ 95, robots.txt and sitemap accessible, title/description in page source
5. Merge or demo if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → Shared infrastructure ready
2. Phase 3 → Validate US1 → Site is indexable (MVP)
3. Phase 4 → Validate US2 → Social previews work
4. Phase 5 → Validate US3 → Rich results eligible
5. Phase 6 → Production-ready polish

---

## Notes

- No automated tests per constitution. All validation is manual.
- `[P]` tasks touch different files — safe to work on simultaneously.
- The `SeoService` is extended incrementally across US1 (T007), US2 (T010), and US3 (T013) — do not implement all features in one pass; validate each increment independently.
- Domain placeholder `korinna.com.ua` is intentional during development. Replace before deploying to production (T015 marks all locations).
- `og-image.jpg` (T011) may need a real branded asset; a placeholder image is acceptable for US2 validation, but the final 1200×630 image must be in place before the production domain is configured.
