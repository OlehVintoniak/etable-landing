# Tasks: Home Page — Epoxy River Tables Landing Page

**Input**: Design documents from `/specs/001-landing-page-home/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Validation**: Manual validation tasks only. No unit, integration, or e2e test tasks (prohibited by constitution).

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in all descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the workspace — fonts, directory skeleton.

- [X] T001 Add Google Fonts preconnect and `<link>` tags for Playfair Display, Cormorant Garamond, DM Mono to `src/index.html` per research.md Decision 2
- [X] T002 [P] Create source directories: `src/styles/`, `src/app/models/`, `src/app/data/`, `src/app/pages/home/`, `src/app/components/{header,banner,product-list,product-card,footer}/`, `public/images/products/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure that ALL user stories depend on — theme tokens, TypeScript interfaces, HomeComponent skeleton, and routing.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 Create `src/styles/theme.scss` — define all Korinna brand CSS custom properties: 9 colour tokens (`--color-bark`, `--color-oak`, `--color-walnut`, `--color-resin`, `--color-birch`, `--color-cream`, `--color-stone`, `--color-moss`, `--color-epoxy`), 3 font-family tokens (`--font-display`, `--font-body`, `--font-mono`), and base spacing/radius tokens on `:root`
- [X] T004 Update `src/styles.scss` — replace existing content with `@use './styles/theme'` import and global resets (box-sizing, margin, body font defaults using `var(--font-body)`)
- [X] T005 [P] Create `Product` TypeScript interface in `src/app/models/product.model.ts` per data-model.md — fields: `id`, `name`, `imageSrc`, `imageAlt`, `material`, `width`, `length`, `unit: 'cm'`
- [X] T006 [P] Create `CompanyInfo`, `ContactDetail`, and `SocialMediaLink` TypeScript interfaces in `src/app/models/company.model.ts` per data-model.md
- [X] T007 Create `HomeComponent` skeleton in `src/app/pages/home/home.ts` (standalone, `OnPush`, empty inline imports array, `home.html` template, `home.scss` styles); create empty `home.html` and `home.scss`
- [X] T008 Register the default route `''` → lazy-loaded `HomeComponent` in `src/app/app.routes.ts`

**Checkpoint**: Foundation ready — all three user story phases can now begin.

---

## Phase 3: User Story 1 — First-time Visitor Gets Company Overview (Priority: P1) 🎯 MVP

**Goal**: Render a visible, accessible header (company name) and hero banner (tagline + CTA button that smooth-scrolls to `#products`) above the fold on mobile and desktop.

**Independent Validation**: Open the running app in a browser at 375 px and 1280 px widths. Without scrolling, confirm the company name, tagline, and CTA button are all visible. Click the CTA and confirm the viewport scrolls to the `#products` section.

### Implementation for User Story 1

- [X] T009 [P] [US1] Create `HeaderComponent` in `src/app/components/header/header.ts` per `contracts/header.contract.md` — standalone, `OnPush`, `input()` for `companyName: string`, semantic `<header role="banner">`, Playfair Display brand styling in `header.scss` using CSS vars only
- [X] T010 [P] [US1] Create `BannerComponent` in `src/app/components/banner/banner.ts` per `contracts/banner.contract.md` — standalone, `OnPush`, `input()` for `company: CompanyInfo`, `<h1>` for company name, `<button>` CTA that calls smooth-scroll (guarded with `isPlatformBrowser`), bark/birch/resin colour vars in `banner.scss`
- [X] T011 [US1] Create static `COMPANY_INFO: CompanyInfo` constant in `src/app/data/company.data.ts` — name `'Korinna'`, tagline from brand kit, ctaLabel `'View Our Tables'`, ctaTarget `'#products'`
- [X] T012 [US1] Wire `HeaderComponent` and `BannerComponent` into `HomeComponent` — add both to imports array in `home.ts`, render in `home.html`, pass `COMPANY_INFO` data

### Validation for User Story 1

- [ ] T013 [US1] Execute manual validation for US1: run `yarn start`, open `http://localhost:4200`, verify header + banner render above the fold at 375 px and 1280 px; verify CTA smooth-scrolls to `#products`; verify no horizontal scroll

**Checkpoint**: User Story 1 is independently functional and validated.

---

## Phase 4: User Story 2 — Visitor Browses Product Cards (Priority: P2)

**Goal**: Render a responsive product grid below the banner. Each card shows a product image (`NgOptimizedImage`), material label/value, and size label/value. Empty-state `<p>` renders when no products are available.

**Independent Validation**: Open the app and scroll to the product section. Confirm at least one card renders with image, material, and size. Resize the browser to 375 px (1 column), 768 px (2 columns), and 1280 px (3 columns) to confirm the responsive grid.

### Implementation for User Story 2

- [X] T014 [P] [US2] Create `ProductCardComponent` in `src/app/components/product-card/product-card.ts` per `contracts/product-card.contract.md` — standalone, `OnPush`, `input()` for `product: Product` and `priority: boolean` (default `false`), `NgOptimizedImage` (`ngSrc`), `<article>` landmark, `<dl>/<dt>/<dd>` for material and size, CSS fallback background for broken images in `product-card.scss`
- [X] T015 [P] [US2] Create `ProductListComponent` in `src/app/components/product-list/product-list.ts` per `contracts/product-list.contract.md` — standalone, `OnPush`, `input()` for `products: Product[]`, `<section id="products">`, `@for` with `track product.id`, empty-state `<p>`, CSS Grid 1→2→3 columns at 768/1280 px in `product-list.scss`
- [X] T016 [US2] Create `PRODUCTS: Product[]` static array in `src/app/data/products.data.ts` — minimum 3 sample product records (name, imageSrc pointing to `public/images/products/`, imageAlt, material, width, length, unit `'cm'`)
- [X] T017 [US2] Add placeholder product images to `public/images/products/` (one per product record in `products.data.ts`; use appropriately sized placeholder JPGs or WebP files)
- [X] T018 [US2] Wire `ProductListComponent` and `ProductCardComponent` into `HomeComponent` — add to imports in `home.ts`, render `<app-product-list [products]="products">` in `home.html`, assign `PRODUCTS` to a `products` signal or property in `home.ts`

### Validation for User Story 2

- [ ] T019 [US2] Execute manual validation for US2: scroll to product section, verify cards show image/material/size; test responsive grid at 375 px, 768 px, 1280 px; verify empty-state renders when `products` is empty (temporarily pass `[]`)

**Checkpoint**: User Stories 1 AND 2 are independently functional and validated.

---

## Phase 5: User Story 3 — Visitor Finds Contact and Social Media Information (Priority: P3)

**Goal**: Render an accessible footer with a `mailto:` email link, `tel:` phone link, and an Instagram link with `rel="noopener noreferrer"` and descriptive `aria-label`. Layout is responsive 1→2→3 columns.

**Independent Validation**: Scroll to the footer. Confirm the email address, phone number, and Instagram link are all visible and labelled. On a 375 px viewport, confirm all elements are legible and tappable without zooming.

### Implementation for User Story 3

- [X] T020 [US3] Add `CONTACT: ContactDetail` and `INSTAGRAM: SocialMediaLink` static constants to `src/app/data/company.data.ts` — email and phone placeholders; Instagram URL and label `'Follow us on Instagram'`
- [X] T021 [US3] Create `FooterComponent` in `src/app/components/footer/footer.ts` per `contracts/footer.contract.md` — standalone, `OnPush`, `input()` for `contact: ContactDetail`, `instagram: SocialMediaLink`, `companyName: string`; `<footer role="contentinfo">`; `<a href="mailto:...">` and `<a href="tel:...">`; Instagram `<a target="_blank" rel="noopener noreferrer" [attr.aria-label]="...">`;  responsive bark-bg layout in `footer.scss` using CSS vars only
- [X] T022 [US3] Wire `FooterComponent` into `HomeComponent` — add to imports in `home.ts`, render `<app-footer>` in `home.html`, pass `CONTACT`, `INSTAGRAM`, and `COMPANY_INFO.name`

### Validation for User Story 3

- [ ] T023 [US3] Execute manual validation for US3: scroll to footer, verify email link opens mail client, phone link triggers dialler, Instagram link opens in new tab with correct URL; verify all links tappable at 375 px

**Checkpoint**: All three user stories are independently functional and validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass — accessibility, performance, theme hygiene, and full quickstart validation.

- [X] T024 [P] Theme hygiene: scan all component `.scss` files and verify zero hardcoded hex colour values or font-family names — only `var(--...)` tokens permitted; fix any violations
- [X] T025 [P] Accessibility review: run axe DevTools (browser extension) on the rendered page; fix all WCAG AA violations (focus management, colour contrast, ARIA attributes)
- [X] T026 [P] Responsive smoke-test: verify no horizontal scroll at 375 px viewport (SC-005); verify visually correct layout at 768 px and 1280 px (SC-002, SC-009)
- [X] T027 Run full `specs/001-landing-page-home/quickstart.md` manual validation checklist end-to-end; confirm all items pass; build SSR output with `yarn build` and confirm no build errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **blocks all user story phases**
- **Phase 3 (US1)**: Depends on Phase 2 — no dependency on US2 or US3
- **Phase 4 (US2)**: Depends on Phase 2 — no dependency on US1 or US3
- **Phase 5 (US3)**: Depends on Phase 2 — no dependency on US1 or US2
- **Phase 6 (Polish)**: Depends on Phase 3, 4, and 5 all being complete

### User Story Dependencies

- **US1 (P1)**: Depends on `CompanyInfo` interface (T006) — independent of US2, US3
- **US2 (P2)**: Depends on `Product` interface (T005) — independent of US1, US3
- **US3 (P3)**: Depends on `ContactDetail` and `SocialMediaLink` interfaces (T006) — independent of US1, US2

### Within Each User Story

- Interfaces (Phase 2) → data files → component → wire into `HomeComponent` → validate

### Parallel Opportunities

- T002 can run alongside T001
- T005 and T006 (model files) can run in parallel
- Once Phase 2 is complete, US1 (T009–T013), US2 (T014–T019), and US3 (T020–T023) can all run in parallel if desired
- Within US1: T009 and T010 are parallel (different component files), T011 is parallel
- Within US2: T014 and T015 are parallel (different component files), T016 and T017 are parallel
- T024, T025, T026 in Phase 6 are parallel

---

## Parallel Execution Example: User Story 1

```text
After Phase 2 checkpoint:

Parallel track A — HeaderComponent:
  T009: Create HeaderComponent (header.ts + header.html + header.scss)

Parallel track B — BannerComponent:
  T010: Create BannerComponent (banner.ts + banner.html + banner.scss)

Parallel track C — Data:
  T011: Create COMPANY_INFO in company.data.ts

Converge → T012: Wire both into HomeComponent
Converge → T013: Manual validation
```

---

## Implementation Strategy

**Suggested MVP scope**: Phase 1 + Phase 2 + Phase 3 (US1) — gives a deployable page with header and banner.

**Incremental delivery order**:
1. Phase 1 + 2 — skeleton running, fonts loaded, theme tokens in place, route registered
2. Phase 3 (US1) — above-the-fold content live; page is already shippable
3. Phase 4 (US2) — product grid live; core commercial content visible
4. Phase 5 (US3) — footer live; full landing page complete
5. Phase 6 — quality pass; production-ready

**Total tasks**: 27  
**Tasks per story**: US1 → 5 tasks (T009–T013), US2 → 6 tasks (T014–T019), US3 → 4 tasks (T020–T023)  
**Parallel opportunities**: 12 tasks marked `[P]`
