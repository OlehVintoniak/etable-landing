# UI Contract: BannerComponent

**File**: `src/app/components/banner/banner.ts`  
**Selector**: `app-banner`

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `company` | `CompanyInfo` | Yes | Company name, tagline, CTA label, and CTA scroll target |

## Outputs

None. CTA scroll behaviour is handled internally via a host click handler on the button, using `document.querySelector(company.ctaTarget).scrollIntoView({ behavior: 'smooth' })` guarded by `isPlatformBrowser`.

## Rendered Output

```html
<section class="banner" aria-label="Company introduction">
  <h1 class="banner__name">{{ company.name }}</h1>
  <p class="banner__tagline">{{ company.tagline }}</p>
  <button class="banner__cta" type="button" (click)="scrollToProducts()">
    {{ company.ctaLabel }}
  </button>
</section>
```

## Accessibility

- `<h1>` for the company name — only one `<h1>` on the page.
- `<section>` with `aria-label` gives the landmark a descriptive name.
- CTA is a `<button>` (not `<a>`) because it performs an in-page action, not navigation.
- CTA button is focusable and keyboard-activatable by default.

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile ≥ 375 px | Vertically centred, full viewport height, text left-aligned, CTA full-width |
| Tablet ≥ 768 px | Larger heading, CTA auto-width |
| Desktop ≥ 1280 px | Max-width container, heading at display size from brand kit |

## Brand Styles

- Background: `var(--color-bark)` with optional grain texture overlay (CSS only)
- Heading font: `var(--font-display)` (Playfair Display Bold), colour `var(--color-birch)`
- Tagline font: `var(--font-body)` (Cormorant Garamond Light Italic), colour `var(--color-stone)`
- CTA button: background `var(--color-resin)`, text `var(--color-bark)`, font `var(--font-mono)` uppercase
- Left border accent on tagline: `2px solid var(--color-resin)` with left padding (from brand kit pattern)
