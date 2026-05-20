# Data Model: Landing Card Component

**Phase**: 1 — Design
**Feature**: 003-landing-card-component
**Date**: 2026-05-17

---

## Entities

### Product *(existing — no changes)*

Defined in `src/app/models/product.model.ts`. Reproduced here for reference.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique product identifier |
| `name` | `string` | Display name of the product |
| `imageSrc` | `string` | Image URL / asset path |
| `imageAlt` | `string` | Accessible alt text for the image |
| `material` | `string` | Material description (e.g., "Oak") |
| `width` | `number` | Width dimension |
| `length` | `number` | Length dimension |
| `unit` | `'cm'` | Unit for width and length |

No additions or modifications to this model are required.

---

## Component Inputs

### `LandingCardComponent`

New component at `src/app/components/landing-card/`.

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `product` | `Product` | ✅ Yes | — | The product to display |
| `reversed` | `boolean` | No | `false` | When `true`, places image on the right and details on the left |
| `priority` | `boolean` | No | `false` | Passed to `NgOptimizedImage` to trigger LCP preload for above-the-fold images |

### `ProductListComponent` *(modified inputs — unchanged)*

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `products` | `Product[]` | ✅ Yes | Array of products to display (no change) |

---

## Layout Logic

```
products[] → @for (product, idx)
  │
  ├── idx % 2 === 0  →  LandingCard(product, reversed=false, priority=(idx===0))
  └── idx % 2 !== 0  →  LandingCard(product, reversed=true,  priority=false)
```

- `reversed=false` (default): image column is first (left on LTR layouts).
- `reversed=true`: image column is last (right on LTR layouts) via `flex-direction: row-reverse`.
- `priority=true` only for the very first card (idx===0) to optimise LCP.

---

## State

`LandingCardComponent` is **stateless**. All displayed data is derived from the `product` input. No signals, computed values, or services are needed within the component.

---

## Validation Rules

| Rule | Source |
|------|--------|
| `product.imageSrc` must be a non-empty string | Enforced by existing data layer (`products.data.ts`) |
| `product.imageAlt` must be a non-empty string | Enforced by existing data layer |
| `width` and `length` are positive numbers | Enforced by existing data layer |

No additional validation logic is introduced in `LandingCardComponent`.
