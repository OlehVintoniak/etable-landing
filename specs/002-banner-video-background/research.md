# Research: Banner Video Background

**Feature**: `002-banner-video-background`  
**Phase**: 0 — Pre-Design Research

---

## Decision 1: Video Layering Strategy

**Decision**: Use `position: absolute` on the `<video>` element with `position: relative` on the `.banner` container, and `overflow: hidden` to clip the video to banner bounds. The inner content div keeps a higher `z-index` to render in front.

**Rationale**: CSS absolute positioning with `object-fit: cover` is the standard full-bleed background video pattern. It requires zero JavaScript, works in all modern browsers, and degrades cleanly to the existing `background-color` fallback.

**Alternatives considered**:
- `background-video` via CSS `background` property: Not supported — `background` only accepts images.
- JavaScript-driven canvas rendering: Rejected — unnecessary complexity, blocks SSR, no benefit.
- CSS `@supports` video background: Rejected — no native CSS `@supports` test for video playback capability.

---

## Decision 2: SSR Safety

**Decision**: Use native HTML `<video autoplay muted loop playsinline>` attributes only. No JavaScript is needed to trigger playback. The existing `isPlatformBrowser` guard in `BannerComponent` remains unchanged and covers the `scrollToProducts()` method. No additional SSR guards are needed for the video element itself.

**Rationale**: HTML-attribute-driven autoplay does not execute during SSR node rendering — the DOM attributes are rendered as strings in the server-generated HTML. The browser handles playback after hydration. Angular's SSR pipeline transfers the server-rendered HTML and the browser picks up playback automatically.

**Alternatives considered**:
- Wrapping `<video>` in `@if (isBrowser)`: Rejected — causes a layout shift (CLS) on hydration because the video element would be absent then inserted. Declarative HTML attributes avoid this entirely.
- Using Angular `afterNextRender` to call `video.play()`: Rejected — `autoplay` attribute is sufficient and idiomatic; imperative `.play()` is only needed when attributes are blocked by a user gesture requirement, which `muted` + `autoplay` avoids.

---

## Decision 3: Contrast Overlay for Text Legibility

**Decision**: Add a semi-transparent dark overlay as a CSS `::before` pseudo-element on `.banner`, using `background: rgba(58, 37, 16, 0.55)` (derived from `--color-bark: #3a2510`). The overlay sits above the video (`z-index: 1`) but below the content (`z-index: 2`).

**Rationale**: The existing light-coloured text (`--color-birch: #f0e8d8`, `--color-stone: #8c7b6b`) was designed for the solid `--color-bark` background. A video background introduces unpredictable luminance variation across frames. A consistent semi-transparent overlay maintains effective contrast across all video frames and eliminates the need to redesign text colours.

**Alternatives considered**:
- Increasing text shadow only: Rejected — text shadows do not contribute to contrast ratio calculations and fail WCAG AA for body-size text.
- Keeping existing text colours without overlay: Rejected — cannot guarantee WCAG AA contrast at 4.5:1 against arbitrary video frames.
- Changing text colour to pure white: Rejected — breaks brand colour tokens; not a single-component change.

---

## Decision 4: Video Input Configuration

**Decision**: Add an optional `videoSrc = input<string>()` to `BannerComponent`. If the signal value is empty or undefined, the `<video>` element is hidden via `@if`. The home page template passes the video path as a string literal.

**Rationale**: Makes the video path configurable without hardcoding it inside the component, which aligns with the single-responsibility principle and keeps the component reusable. If no video is provided, the banner renders exactly as before.

**Alternatives considered**:
- Hardcoding the video path in the component: Rejected — makes the component non-reusable and couples it to a specific asset path.
- Injecting a `BannerConfig` service: Rejected — overkill for a single string value; an `input()` is idiomatic Angular.

---

## Decision 5: Accessibility Marking

**Decision**: Mark the `<video>` element with `aria-hidden="true"`. This hides it entirely from the accessibility tree so screen readers announce only the banner's existing `aria-label` and text content.

**Rationale**: The video is purely decorative — it communicates no information beyond visual ambience. WCAG 1.1.1 requires non-text content that is decorative to be implemented so that it can be ignored by assistive technology.

**Alternatives considered**:
- Adding a descriptive `aria-label` to the video: Rejected — describing a decorative looping background video would be noise for screen reader users; the spec explicitly states the video is decorative.
- Wrapping in a `role="presentation"` container: Rejected — `aria-hidden="true"` directly on the element is simpler and achieves the same result.

---

## Summary of Resolved Unknowns

| Was Unknown | Resolution |
|---|---|
| How to layer video safely | `position: absolute`, CSS `z-index` layering |
| SSR safety approach | HTML attributes only, no JS guards needed for `<video>` |
| Text contrast over video | `::before` overlay `rgba(58,37,16,0.55)` |
| Video path configurability | `videoSrc = input<string>()` on `BannerComponent` |
| Accessibility treatment | `aria-hidden="true"` on `<video>` |
