# UI Contract: ProductListComponent

**File**: `src/app/components/product-list/product-list.ts`  
**Selector**: `app-product-list`

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `products` | `Product[]` | Yes | Array of products to display as cards |

## Outputs

None.

## Rendered Output

```html
<section id="products" class="product-list" aria-label="Our tables">
  @if (products.length > 0) {
    <div class="product-list__grid">
      @for (product of products; track product.id; let first = $first) {
        <app-product-card [product]="product" [priority]="first" />
      }
    </div>
  } @else {
    <p class="product-list__empty">No tables available at the moment. Please check back soon.</p>
  }
</section>
```

## Accessibility

- `<section id="products">` with `aria-label` gives the landmark region a name and provides the scroll target for the banner CTA (`#products`).
- Empty state uses a plain `<p>` — no ARIA live region needed since content is static.
- Each card is an `<article>` (see ProductCardComponent contract).

## Responsive Behaviour

| Breakpoint | Grid columns |
|---|---|
| Mobile < 768 px | 1 column |
| Tablet ≥ 768 px | 2 columns |
| Desktop ≥ 1280 px | 3 columns |

Implemented via:
```css
.product-list__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .product-list__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1280px) {
  .product-list__grid { grid-template-columns: repeat(3, 1fr); }
}
```

## Brand Styles

- Section background: `var(--color-cream)`
- Section padding: `80px` vertical (desktop), `48px` (mobile)
- Empty state text: `var(--font-body)`, italic, colour `var(--color-stone)`
