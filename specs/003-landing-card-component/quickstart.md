# Quickstart: Landing Card Component

**Feature**: 003-landing-card-component
**Date**: 2026-05-17

---

## Overview

This feature replaces the grid of compact `product-card` tiles in the product list with large, full-width `landing-card` entries. Each card has two columns (image + details) that alternate sides down the page. The `product-card` component is kept intact for future use.

---

## Files to Create

### `src/app/components/landing-card/landing-card.ts`

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-landing-card',
  imports: [NgOptimizedImage],
  templateUrl: './landing-card.html',
  styleUrl: './landing-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'landing-card',
    '[class.landing-card--reversed]': 'reversed()',
  },
})
export class LandingCardComponent {
  product = input.required<Product>();
  reversed = input<boolean>(false);
  priority = input<boolean>(false);
}
```

### `src/app/components/landing-card/landing-card.html`

```html
<div class="landing-card__image">
  <img
    [ngSrc]="product().imageSrc"
    [alt]="product().imageAlt"
    width="800"
    height="600"
    [priority]="priority()"
  />
</div>
<div class="landing-card__details">
  <h2 class="landing-card__name">{{ product().name }}</h2>
  <dl class="landing-card__meta">
    <dt>Material</dt>
    <dd>{{ product().material }}</dd>
    <dt>Size</dt>
    <dd>{{ product().width }} × {{ product().length }} {{ product().unit }}</dd>
  </dl>
</div>
```

### `src/app/components/landing-card/landing-card.scss`

```scss
:host {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  background-color: var(--color-birch);
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;

    &.landing-card--reversed {
      flex-direction: row-reverse;
    }
  }
}

.landing-card {
  &__image {
    flex: 1;
    min-height: 300px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--space-lg);
    gap: var(--space-md);
  }

  &__name {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: var(--color-bark);
    margin: 0;
  }

  &__meta {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-xs) var(--space-sm);
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--color-oak);
    margin: 0;

    dt {
      font-weight: 600;
      color: var(--color-stone);
    }

    dd {
      margin: 0;
    }
  }
}
```

---

## Files to Modify

### `src/app/components/product-list/product-list.ts`

Replace `ProductCardComponent` import with `LandingCardComponent`:

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { LandingCardComponent } from '../landing-card/landing-card';

@Component({
  selector: 'app-product-list',
  imports: [LandingCardComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products = input.required<Product[]>();
}
```

### `src/app/components/product-list/product-list.html`

Replace the `@for` body:

```html
<section id="products" class="product-list" aria-label="Our tables">
  @if (products().length > 0) {
    <div class="product-list__stack">
      @for (product of products(); track product.id; let idx = $index) {
        <app-landing-card
          [product]="product"
          [reversed]="idx % 2 !== 0"
          [priority]="idx === 0"
        />
      }
    </div>
  } @else {
    <p class="product-list__empty">No tables available at the moment. Please check back soon.</p>
  }
</section>
```

### `src/app/components/product-list/product-list.scss`

Replace the `__grid` block with a `__stack` block (single-column flex stack):

```scss
.product-list {
  background-color: var(--color-cream);
  padding: var(--space-lg) var(--space-md);

  @media (min-width: 1280px) {
    padding: var(--space-xl) var(--space-md);
  }

  &__stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    max-width: var(--max-width);
    margin: 0 auto;
  }

  &__empty {
    font-family: var(--font-body);
    font-style: italic;
    color: var(--color-stone);
    text-align: center;
    padding: var(--space-xl) 0;
    max-width: var(--max-width);
    margin: 0 auto;
  }
}
```

---

## Manual Validation Steps

1. Run `npm start` and open the home page in a browser.
2. Scroll to the product list section.
3. Verify:
   - [ ] Each product displays as a wide card spanning the full content width.
   - [ ] Card 1 (index 0): image on the **left**, details on the **right**.
   - [ ] Card 2 (index 1): image on the **right**, details on the **left**.
   - [ ] Card 3 (index 2): image on the **left** again.
   - [ ] Details column shows product name, material, and size.
4. Resize browser to < 768 px (mobile):
   - [ ] Each card collapses to a single column — image stacked above details.
   - [ ] No horizontal scrollbar.
5. Run an axe accessibility audit in DevTools:
   - [ ] Zero WCAG AA violations in the product list section.
6. Confirm that no files in `src/app/components/product-card/` were modified.
