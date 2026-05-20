# Research: Landing Card Component

**Phase**: 0 — Research
**Feature**: 003-landing-card-component
**Date**: 2026-05-17

---

## 1. Alternating Column Layout

### Decision
Use a CSS `flex-direction: row-reverse` modifier class on the host element to flip the two-column layout. The Angular component accepts a `reversed` boolean `input()`. When truthy, the host element receives a CSS class (via `[class.landing-card--reversed]="reversed()"` in the host metadata) that applies `flex-direction: row-reverse`.

### Rationale
- Zero JavaScript at runtime — column flip is pure CSS.
- No DOM restructuring required; the image and details elements stay in the same DOM order, preserving logical reading order for screen readers.
- Consistent with existing BEM conventions already used in `product-card` and `product-list`.

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| Two separate template paths (`@if (reversed())`) | Duplicates template markup; harder to maintain. |
| CSS `order` on individual children | More complex; requires knowing child selectors from the parent. |
| CSS Grid `direction: rtl` | Changes text direction globally; can break text alignment inside the card. |
| Passing a layout prop to CSS via `@Input` + style binding | Unnecessary JS involvement when CSS class toggle suffices. |

---

## 2. Index-Based `reversed` Flag in `@for`

### Decision
Use `let idx = $index` inside the Angular `@for` loop in `product-list.html`. Pass `[reversed]="idx % 2 !== 0"` to `<app-landing-card>`. This makes even-indexed cards (0, 2, 4 …) image-left and odd-indexed cards (1, 3, 5 …) image-right.

### Rationale
- `$index` is a built-in `@for` variable in Angular 17+ control flow syntax, already used in the project.
- Modulo arithmetic is the simplest stateless derivation — no signal, no computed(), no service needed.

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| Alternate a signal/boolean with `$index` effect | Unnecessary state for a derived visual property. |
| Pre-process the products array to attach a `reversed` flag | Pollutes the data model with a presentation concern. |

---

## 3. LCP / Image Priority

### Decision
Expose a `priority` boolean `input()` on `landing-card` (default `false`). The `product-list` passes `[priority]="idx === 0"` so only the first card's image gets the `priority` attribute, matching the existing pattern in `product-card`.

### Rationale
- `NgOptimizedImage` uses `[priority]` to inject `<link rel="preload">` for the image, improving LCP for above-the-fold content.
- Already established pattern in the existing `product-card` component.

---

## 4. Image Sizing for Wide Layout

### Decision
Declare `width="800"` and `height="600"` on the `NgOptimizedImage` directive in the `landing-card` template. The image will be constrained to fill its column via CSS (`width: 100%; height: 100%; object-fit: cover`), so the values only need to match the source image's aspect ratio (4:3).

### Rationale
- `NgOptimizedImage` requires explicit `width` and `height` to prevent layout shift (CLS).
- Actual rendered size is controlled by CSS; the declared numbers only establish aspect ratio and `srcset` generation hints.

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| `fill` attribute mode | Requires the parent to have `position: relative` and an explicit height, which complicates responsive height handling. |

---

## 5. Responsive Collapse Strategy

### Decision
At `< 768 px`: switch from CSS Flexbox row to Flexbox column (`flex-direction: column`), stacking the image above the details. The `reversed` modifier is irrelevant at this breakpoint because content stacking always puts the image first. The `flex-direction: row-reverse` modifier only applies at `>= 768 px`.

### Rationale
- Consistent with the existing `product-list` breakpoints (768 px, 1280 px).
- Single `@media (min-width: 768px)` query handles both the two-column activation and the reversed variant, keeping SCSS minimal.

---

## 6. SSR Compatibility

### Decision
`NgOptimizedImage`, class bindings, `@for`, and CSS — all are fully SSR/SSG compatible. No browser-only APIs (`window`, `document`) are used.

### Rationale
The project uses Angular SSR with `@angular/ssr`. All features used are rendered on the server in the existing components without issue.

---

## Summary of Resolved Unknowns

| Unknown | Resolution |
|---------|-----------|
| How to flip column order | CSS `flex-direction: row-reverse` via BEM modifier class |
| How to derive `reversed` per card | `$index % 2 !== 0` in `@for` |
| Image dimensions for wide layout | `width="800" height="600"` (4:3 ratio), CSS controls rendered size |
| Mobile collapse approach | `flex-direction: column` below 768 px; reversed modifier scoped to `>= 768 px` |
| SSR compatibility | All techniques are server-renderable |
