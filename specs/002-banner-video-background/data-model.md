# Data Model: Banner Video Background

**Feature**: `002-banner-video-background`

---

## Modified Entities

### BannerComponent

**File**: `src/app/components/banner/banner.ts`

No new data models or interfaces are required. The only change is the addition of one optional signal input to the existing component.

#### Signal Inputs

| Input | Type | Required | Default | Description |
|---|---|---|---|---|
| `company` | `CompanyInfo` | Yes | — | Existing input. Company name, tagline, CTA label, CTA scroll target. Unchanged. |
| `videoSrc` | `string` | No | `undefined` | Path to the background video asset, relative to the domain root (e.g. `'video/HeroBannerVideo.mp4'`). When absent or empty, no `<video>` element is rendered and the banner displays exactly as before. |

#### State

No new local state signals. No `computed()` derivations required.

---

## Unchanged Entities

| Entity | File | Change |
|---|---|---|
| `CompanyInfo` | `src/app/models/company.model.ts` | None |
| `Product` | `src/app/models/product.model.ts` | None |
| `HomeComponent` | `src/app/pages/home/home.ts` | None (template-only change to pass `videoSrc`) |

---

## Rendering Model

```
.banner (position: relative, overflow: hidden)
├── <video>          z-index: 0  aria-hidden="true"  (decorative layer)
├── ::before         z-index: 1  (contrast overlay, rgba(58,37,16,0.55))
└── .banner__inner   z-index: 2  (content: name, tagline, CTA button)
```

The `<video>` is conditionally rendered — only when `videoSrc()` is a non-empty string.
