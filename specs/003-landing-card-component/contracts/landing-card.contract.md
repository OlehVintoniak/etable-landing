# Component Contract: `app-landing-card`

**Feature**: 003-landing-card-component
**Component path**: `src/app/components/landing-card/landing-card.ts`
**Selector**: `app-landing-card`
**Date**: 2026-05-17

---

## Purpose

A full-width, two-column presentational card that displays a single product. The image occupies one column and the product details (name, material, dimensions) occupy the other. The column order is reversible via the `reversed` input, enabling an alternating zigzag layout across a list.

---

## Inputs

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | `Product` | ✅ | — | Product to display. Must have a valid `imageSrc`, `imageAlt`, `name`, `material`, `width`, `length`, and `unit`. |
| `reversed` | `boolean` | — | `false` | When `true`, the image column is placed on the right and the details column on the left. |
| `priority` | `boolean` | — | `false` | When `true`, instructs `NgOptimizedImage` to preload the image (use for above-the-fold / first card only). |

---

## Outputs

None. This is a pure display component with no events.

---

## Layout Contract

```
Default (reversed = false):
┌─────────────────────┬─────────────────────┐
│                     │  Product Name        │
│    Product Image    │  Material: Oak       │
│                     │  Size: 180 × 90 cm   │
└─────────────────────┴─────────────────────┘

Reversed (reversed = true):
┌─────────────────────┬─────────────────────┐
│  Product Name        │                     │
│  Material: Oak       │    Product Image    │
│  Size: 180 × 90 cm   │                     │
└─────────────────────┴─────────────────────┘

Mobile (viewport < 768 px) — reversed ignored:
┌──────────────────────────────────────────┐
│              Product Image               │
├──────────────────────────────────────────┤
│  Product Name                            │
│  Material: Oak                           │
│  Size: 180 × 90 cm                       │
└──────────────────────────────────────────┘
```

---

## CSS Class API (BEM)

| Class | When applied | Effect |
|-------|-------------|--------|
| `.landing-card` | Always (host element) | Base two-column flex layout |
| `.landing-card--reversed` | `reversed = true` | `flex-direction: row-reverse` |

---

## Accessibility

- Image `alt` text comes from `product.imageAlt` (must be non-empty).
- Product name is rendered as `<h2>` for semantic heading hierarchy.
- Details are rendered as `<dl>` / `<dt>` / `<dd>` for screen-reader compatibility.
- Visual column reversal via CSS does **not** change DOM order, preserving logical reading order.

---

## Usage Example

```html
<!-- Default: image left -->
<app-landing-card [product]="products()[0]" [priority]="true" />

<!-- Reversed: image right -->
<app-landing-card [product]="products()[1]" [reversed]="true" />

<!-- Inside a list with alternating layout -->
@for (product of products(); track product.id; let idx = $index) {
  <app-landing-card
    [product]="product"
    [reversed]="idx % 2 !== 0"
    [priority]="idx === 0"
  />
}
```

---

## Dependencies

- `NgOptimizedImage` from `@angular/common` (already installed)
- `Product` model from `../../models/product.model`

No new npm packages required.
