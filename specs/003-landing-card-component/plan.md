# Implementation Plan: Landing Card Component

**Branch**: `003-landing-card-component` | **Date**: 2026-05-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/003-landing-card-component/spec.md`

## Summary

Create a new `landing-card` Angular standalone component that displays a product in a full-width two-column layout (image + details), with columns alternating per card index. Replace `product-card` usage inside `product-list` with `landing-card`. The existing `product-card` component is preserved untouched for future use.

## Technical Context

**Language/Version**: TypeScript 5.8, Angular 20 (standalone, SSR/SSG)  
**Primary Dependencies**: `@angular/common` (NgOptimizedImage — already installed)  
**Storage**: N/A — static data, no persistence  
**Testing**: PROHIBITED by constitution (manual validation only)  
**Target Platform**: Web browser; Angular SSR/SSG (Node.js server-side render)  
**Project Type**: Web application — Angular landing page  
**Performance Goals**: LCP-optimised first card (priority image input); no measurable layout shift  
**Constraints**: WCAG AA accessibility; single-column stacked layout below 768 px; no new npm dependencies  
**Scale/Scope**: Single landing page, 2–10 products

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Code design keeps complexity low, names explicit, and modules focused — `landing-card` is a single-responsibility presentational component; `product-list` change is minimal (swap import + template binding)
- [x] UX scope keeps flows simple with one clear primary action per screen — product list remains a browsing section; the card surfaces one product at a time with clear hierarchy
- [x] Responsive behavior is defined for mobile, tablet, and desktop — single-column stacked (<768 px), two-column on tablet and desktop
- [x] No new dependency is added without explicit necessity and justification — `NgOptimizedImage` is already installed; no new npm packages required
- [x] No unit, integration, or e2e testing work is introduced — no test files will be created
- [x] Angular SSR/SSG compatibility is preserved with package.json versions — `NgOptimizedImage` and standalone components are fully SSR/SSG compatible

**Gate result: PASS — all six checks satisfied. Proceeding to Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/003-landing-card-component/
├── plan.md              ✅ this file
├── research.md          ✅ Phase 0 output
├── data-model.md        ✅ Phase 1 output
├── quickstart.md        ✅ Phase 1 output
├── contracts/
│   └── landing-card.contract.md   ✅ Phase 1 output
└── tasks.md             (Phase 2 — /speckit.tasks)
```

### Source Code

```text
src/
└── app/
    └── components/
        ├── landing-card/            ← NEW
        │   ├── landing-card.ts
        │   ├── landing-card.html
        │   └── landing-card.scss
        ├── product-list/            ← MODIFIED (template + import swap)
        │   ├── product-list.ts
        │   ├── product-list.html
        │   └── product-list.scss
        └── product-card/            ← UNCHANGED (preserved for future use)
            ├── product-card.ts
            ├── product-card.html
            └── product-card.scss
```

**Structure Decision**: Single Angular project under `src/`. Only the `components/` layer is touched — no new services, models, or pages needed.

## Complexity Tracking

*No constitution violations. Table not required.*
