# Quickstart: Banner Video Background

**Feature**: `002-banner-video-background`

---

## What Changes

The `BannerComponent` gains an optional `videoSrc` input. When a video path is provided, a full-bleed looped video plays silently behind the banner text. Without the input the banner is visually unchanged.

---

## Step 1 — Provide the Video File

Place your video file anywhere inside the `public/` folder. The file is served statically at the same path relative to the domain root.

**Example**:

```
public/
└── video/
    └── HeroBannerVideo.mp4
```

- Recommended format: **MP4** (H.264) for maximum browser compatibility.
- For wider support include a **WebM** (VP9) variant as a `<source>` fallback (optional enhancement, out of scope for this feature).
- Keep file size reasonable for first-load performance — consider a short loop (5–15 s), compressed to ~5–15 MB.

---

## Step 2 — Pass the Path to the Banner

In [src/app/pages/home/home.html](../../src/app/pages/home/home.html), add the `videoSrc` input to the `<app-banner>` element:

```html
<app-banner [company]="companyInfo" videoSrc="video/HeroBannerVideo.mp4" />
```

The path is relative to the domain root — match it to where you placed the file in `public/`.

---

## Step 3 — Manual Validation

Run the dev server:

```powershell
yarn start
```

Open `http://localhost:4200` and verify:

1. **Video plays** — The banner shows a looping video on first load with no audio.
2. **Text is legible** — Company name, tagline, and CTA button are fully readable over the video.
3. **Layout intact** — Banner fills full viewport height; no overflow into the product list below.
4. **Fallback works** — Temporarily change `videoSrc` to a non-existent path; the banner should display the solid `--color-bark` background with no broken element visible.
5. **Responsive** — Use browser DevTools responsive mode at 375 px, 768 px, 1280 px — video fills the banner correctly at each size.
6. **No accessibility violations** — Run the axe DevTools browser extension on the homepage; zero new violations expected.

---

## Notes

- The `background-color: var(--color-bark)` on `.banner` acts as the automatic fallback — visible while the video loads and when video cannot play.
- The semi-transparent dark overlay (`::before` pseudo-element) is always present when the video is rendered; it maintains WCAG AA text contrast across all video frames.
- The `<video>` element is rendered server-side as inert HTML; no JavaScript errors occur during SSR.
