# UI Contract: BannerComponent (v2 — Video Background)

**File**: `src/app/components/banner/banner.ts`  
**Selector**: `app-banner`  
**Change from v1**: Adds optional `videoSrc` input; renders a full-bleed background video when supplied.

---

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `company` | `CompanyInfo` | Yes | Company name, tagline, CTA label, and CTA scroll target. Unchanged from v1. |
| `videoSrc` | `string` | No | Path to background video relative to domain root (e.g. `'videos/banner.mp4'`). When absent or empty string, no video element is rendered and the component behaves identically to v1. |

## Outputs

None. CTA scroll behaviour is handled internally via a click handler on the button, using `document.querySelector(company.ctaTarget).scrollIntoView({ behavior: 'smooth' })` guarded by `isPlatformBrowser`. Unchanged from v1.

---

## Rendered Output

### With videoSrc provided

```html
<section class="banner" aria-label="Company introduction">
  <video
    class="banner__video"
    [src]="videoSrc()"
    autoplay
    muted
    loop
    playsinline
    aria-hidden="true"
  ></video>
  <div class="banner__inner">
    <h1 class="banner__name">{{ company().name }}</h1>
    <p class="banner__tagline">{{ company().tagline }}</p>
    <button class="banner__cta" type="button" (click)="scrollToProducts()">
      {{ company().ctaLabel }}
    </button>
  </div>
</section>
```

### Without videoSrc (fallback — identical to v1)

```html
<section class="banner" aria-label="Company introduction">
  <div class="banner__inner">
    <h1 class="banner__name">{{ company().name }}</h1>
    <p class="banner__tagline">{{ company().tagline }}</p>
    <button class="banner__cta" type="button" (click)="scrollToProducts()">
      {{ company().ctaLabel }}
    </button>
  </div>
</section>
```

---

## Accessibility

- `<section>` with `aria-label="Company introduction"` — landmark unchanged from v1.
- `<h1>` for company name — only one `<h1>` on the page. Unchanged.
- `<button>` for CTA — in-page scroll action. Unchanged.
- `<video>` marked `aria-hidden="true"` — decorative; screen readers skip it entirely.
- All existing keyboard interactions preserved unchanged.

---

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile ≥ 375 px | Video fills banner with `object-fit: cover`. Overlay ensures text contrast. CTA full-width. |
| Tablet ≥ 768 px | Video fills banner with `object-fit: cover`. CTA auto-width. |
| Desktop ≥ 1280 px | Video fills banner with `object-fit: cover`. Max-width content container unchanged. |

---

## Visual Layers

| Layer | z-index | Description |
|---|---|---|
| `<video>` | 0 | Full-bleed background video, `object-fit: cover`, `position: absolute`, fills `.banner` |
| `.banner::before` | 1 | Semi-transparent dark overlay `rgba(58, 37, 16, 0.55)` for text contrast |
| `.banner__inner` | 2 | Text content and CTA button |

---

## Brand Styles

- Banner background (fallback): `var(--color-bark)` — unchanged, visible when video not loaded.
- Overlay: `rgba(58, 37, 16, 0.55)` (derived from `--color-bark`) — new, applied only when video present.
- Heading font/colour: `var(--font-display)` / `var(--color-birch)` — unchanged.
- Tagline font/colour: `var(--font-body)` / `var(--color-stone)` — unchanged.
- CTA button: `var(--color-resin)` background, `var(--color-bark)` text — unchanged.
