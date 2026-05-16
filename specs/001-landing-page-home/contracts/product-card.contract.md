# UI Contract: ProductCardComponent

**File**: `src/app/components/product-card/product-card.ts`  
**Selector**: `app-product-card`

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `product` | `Product` | Yes | Single product entity to render |
| `priority` | `boolean` | No (default `false`) | When `true`, sets `NgOptimizedImage` `priority` for LCP hint — use on the first visible card |

## Outputs

None.

## Rendered Output

```html
<article class="product-card">
  <div class="product-card__image-wrap">
    <img
      [ngSrc]="product.imageSrc"
      [alt]="product.imageAlt"
      width="600"
      height="450"
      [priority]="priority"
    />
  </div>
  <div class="product-card__info">
    <h2 class="product-card__name">{{ product.name }}</h2>
    <dl class="product-card__meta">
      <dt>Material</dt>
      <dd>{{ product.material }}</dd>
      <dt>Size</dt>
      <dd>{{ product.width }} × {{ product.length }} {{ product.unit }}</dd>
    </dl>
  </div>
</article>
```

## Accessibility

- `<article>` landmark for each product — screen readers can navigate between articles.
- `<h2>` for the product name (below the page `<h1>` in the banner).
- `<dl>` / `<dt>` / `<dd>` for labelled data pairs (material, size) — semantically correct for key-value pairs.
- `alt` is required and populated from `product.imageAlt`.
- Image container has a CSS `background-color: var(--color-birch)` fallback — if the image fails to load the card structure is preserved.

## Responsive Behaviour

Sizing is controlled by the parent `ProductListComponent` grid. The card itself is `width: 100%` within its grid cell.

## Brand Styles

- Card background: `var(--color-cream)`
- Product name font: `var(--font-display)` (Playfair Display), colour `var(--color-oak)`
- Meta label (`dt`) font: `var(--font-mono)` uppercase, colour `var(--color-stone)`
- Meta value (`dd`) font: `var(--font-mono)`, colour `var(--color-bark)`
- Subtle box shadow: `0 4px 20px rgba(58, 37, 16, 0.08)` (from brand kit)
- Image: `aspect-ratio: 4/3`, `object-fit: cover`
