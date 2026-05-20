---
description: "Task list for Landing Card Component"
---

# Tasks: Landing Card Component

**Input**: Design documents from `specs/003-landing-card-component/`
**Branch**: `003-landing-card-component`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅ | quickstart.md ✅

**Validation**: Manual validation only — no unit, integration, or e2e tests (constitution IV).

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)

---

## Phase 1: Setup

**Purpose**: Create the new component scaffold and directory structure.

- [X] T001 Create `src/app/components/landing-card/` directory with `landing-card.ts`, `landing-card.html`, `landing-card.scss` placeholder files

**Checkpoint**: Directory and placeholder files exist — implementation phases can begin.

---

## Phase 2: User Story 1 — View Products in Full-Width Layout (Priority: P1) 🎯 MVP

**Goal**: Visitors see products displayed as full-width two-column alternating cards instead of the existing compact grid.

**Independent Validation**: Start the dev server (`npm start`), open the home page, scroll to the product list section. Confirm: each card spans the full content width; card 1 has image left / details right; card 2 has details left / image right; card 3 repeats card 1's order.

### Implementation for User Story 1

- [X] T002 [US1] Implement `LandingCardComponent` class in `src/app/components/landing-card/landing-card.ts` — standalone component with `product`, `reversed`, `priority` inputs; `NgOptimizedImage` import; `OnPush` change detection; host class bindings for `landing-card` and `landing-card--reversed`
- [X] T003 [P] [US1] Implement `landing-card.html` template — two `<div>` columns (`landing-card__image` with `<img [ngSrc]>` and `landing-card__details` with `<h2>` name and `<dl>` meta), following `contracts/landing-card.contract.md` layout contract
- [X] T004 [P] [US1] Implement base `landing-card.scss` styles — `:host` as full-width flex container (`flex-direction: column` default, `flex-direction: row` at ≥ 768 px via media query); `.landing-card--reversed` modifier scoped to ≥ 768 px (`flex-direction: row-reverse`); image column fills height with `object-fit: cover`; details column centered with padding using theme tokens
- [X] T005 [US1] Update `src/app/components/product-list/product-list.ts` — replace `ProductCardComponent` import with `LandingCardComponent`; update `imports` array
- [X] T006 [US1] Update `src/app/components/product-list/product-list.html` — replace `<app-product-card>` with `<app-landing-card>`; add `let idx = $index` to `@for`; bind `[reversed]="idx % 2 !== 0"` and `[priority]="idx === 0"`; rename grid wrapper `__grid` → `__stack`
- [X] T007 [US1] Update `src/app/components/product-list/product-list.scss` — replace `__grid` multi-column grid layout with `__stack` single-column flex stack (`gap: var(--space-lg)`) that works at all breakpoints; remove 2-col and 3-col grid breakpoints

### Validation for User Story 1

- [ ] T008 [US1] Manual validation — run `npm start`, open home page, verify full-width two-column alternating layout with at least 3 products; confirm CSS build has no errors

**Checkpoint**: US1 complete — products display as full-width alternating landing cards. ✅

---

## Phase 3: User Story 2 — View Product Details in Card (Priority: P2)

**Goal**: The details column of every landing card clearly shows product name, material, and dimensions so visitors can evaluate products at a glance.

**Independent Validation**: Inspect the details column of each card. Product name must be the dominant heading. Material and size (`width × length unit`) must both appear as labelled rows.

### Implementation for User Story 2

- [X] T009 [P] [US2] Style `landing-card__name` in `landing-card.scss` — use `var(--font-display)`, `clamp(1.5rem, 3vw, 2.5rem)`, `color: var(--color-bark)`; ensure it reads as the primary heading
- [X] T010 [P] [US2] Style `landing-card__meta` in `landing-card.scss` — two-column `display: grid` (`auto 1fr`) for `<dt>`/`<dd>` pairs; `var(--font-body)`, `color: var(--color-oak)` for values; `color: var(--color-stone)` for labels; `gap: var(--space-xs) var(--space-sm)` between rows and columns

### Validation for User Story 2

- [ ] T011 [US2] Manual validation — inspect each landing card's details column; confirm product name is prominently displayed; confirm Material and Size rows are visible with correct values from `products.data.ts`

**Checkpoint**: US2 complete — product name, material, and dimensions are clearly readable in every card. ✅

---

## Phase 4: User Story 3 — Accessibility and Responsive Viewing (Priority: P3)

**Goal**: Cards collapse to a readable single-column layout on narrow viewports and pass WCAG AA accessibility requirements.

**Independent Validation**: (1) Resize browser to < 768 px — image stacks above details with no horizontal overflow. (2) Run axe DevTools on the product list section — zero violations.

### Implementation for User Story 3

- [X] T012 [US3] Verify mobile collapse in `landing-card.scss` — confirm `:host` default `flex-direction: column` is in place (no media query required for mobile); confirm `landing-card--reversed` modifier is scoped inside `@media (min-width: 768px)` only so it does not affect the stacked mobile layout
- [X] T013 [P] [US3] Verify semantic HTML in `landing-card.html` — confirm `<img>` uses `[alt]="product().imageAlt"` (non-empty); confirm `<h2>` for product name; confirm `<dl>/<dt>/<dd>` for metadata; confirm DOM order is image-first (image column before details column) so logical reading order is preserved regardless of visual reversal

### Validation for User Story 3

- [ ] T014 [US3] Manual responsive validation — in Chrome DevTools responsive mode set to 375 px width; confirm each card is single-column with image on top, no horizontal scrollbar, no clipped text
- [ ] T015 [US3] Manual accessibility audit — open axe DevTools on home page product list section; resolve any WCAG AA violations; confirm zero violations remain

**Checkpoint**: US3 complete — responsive collapse and WCAG AA compliance confirmed. ✅

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final visual review, build verification, and preservation check for `product-card`.

- [X] T016 [P] Verify `src/app/components/product-card/` is unchanged — no files modified, component still compiles without error
- [X] T017 Build verification — run `npm run build` (or equivalent SSR build); confirm zero TypeScript and SCSS errors; confirm `product-list` and `landing-card` are included in the bundle
- [ ] T018 Cross-browser visual spot-check — open home page in Firefox or Safari; confirm two-column layout and alternating order render correctly

**Checkpoint**: All phases complete. Feature is ready for review. ✅

---

## Dependencies

```
T001 (scaffold)
  └── T002 (component class)
        ├── T003 (template)     [parallel after T002]
        └── T004 (base styles)  [parallel after T002]
              ├── T009 (name styles)    [parallel after T004]
              └── T010 (meta styles)   [parallel after T004]
  └── T005 (product-list.ts)   [parallel with T002]
        └── T006 (product-list.html)
              └── T007 (product-list.scss)
                    └── T008 (US1 validation)
                          └── T011 (US2 validation)
                                └── T012 (mobile verify)
                                └── T013 (a11y verify)
                                      └── T014 (responsive validation)
                                      └── T015 (axe audit)
                                            └── T016, T017, T018
```

### User Story Completion Order

| Phase | User Story | Can start after |
|-------|-----------|-----------------|
| Phase 2 | US1 — Full-width alternating layout | T001 (scaffold) |
| Phase 3 | US2 — Product details styles | T002–T004 (component shell exists) |
| Phase 4 | US3 — Accessibility & responsive | T002–T007 (component + list wired up) |
| Phase 5 | Polish | US1 + US2 + US3 validated |

---

## Parallel Execution Examples

**US1 + US2 styles in parallel** (after T002):
- Developer A: T003 (template) + T006 (product-list.html)
- Developer B: T004 (base styles) + T007 (product-list.scss)
- Developer C: T009 (name styles) + T010 (meta styles) ← can start once T004 exists

**US3 checks in parallel** (after T008):
- Developer A: T012 + T014 (mobile checks)
- Developer B: T013 + T015 (a11y checks)

**Polish in parallel** (after US3 validated):
- T016 + T017 + T018 all independent

---

## Implementation Strategy

**MVP scope (deliver first)**: Phase 1 + Phase 2 (T001–T008)

This gives the full visual feature — full-width alternating two-column cards — with all products displayed and the product-list wired to the new component. Phases 3–5 add detail styling, accessibility polish, and final verification on top of a working MVP.

**Suggested execution order for a single developer**:
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018

**Total tasks**: 18
**Tasks per user story**: US1 = 7 (T002–T008), US2 = 3 (T009–T011), US3 = 4 (T012–T015)
**Parallel opportunities**: 8 tasks marked `[P]`
