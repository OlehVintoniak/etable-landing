# Quickstart: Home Page — Epoxy River Tables Landing Page

**Branch**: `001-landing-page-home`  
**Date**: 2026-05-10

## Prerequisites

- Node.js ≥ 20 installed
- Yarn 1.22.x installed (`npm install -g yarn`)
- Repository cloned and on branch `001-landing-page-home`

## Install Dependencies

```bash
yarn install
```

## Run Development Server (with SSR)

```bash
yarn start
# or
ng serve
```

Open `http://localhost:4200` in a browser.

## Build for Production (SSR)

```bash
ng build
node dist/etable-landing/server/server.mjs
```

Open `http://localhost:4000` (or the port printed in the terminal).

## Manual Validation Checklist

Work through each item after `ng serve` is running. Resize the browser window to simulate breakpoints using DevTools device mode.

### User Story 1 — Company Overview

- [ ] Company name "Korinna" is visible in the header on page load
- [ ] Banner is visible in the initial viewport (above the fold) on desktop (1280 px+)
- [ ] Banner is visible in the initial viewport on mobile (375 px)
- [ ] Banner contains: company name, tagline, and a CTA button
- [ ] Clicking/tapping the CTA button smooth-scrolls to the product section
- [ ] No horizontal scrollbar appears at 375 px viewport width

### User Story 2 — Product Cards

- [ ] Product section is visible when scrolled to
- [ ] At least one product card is rendered
- [ ] Each card shows: product image, "Material" label + value, "Size" label + value (e.g. `180 × 90 cm`)
- [ ] At 375 px width: cards stack in a single column, images are not cropped
- [ ] At 768 px width: cards display in a 2-column grid
- [ ] At 1280 px width: cards display in a 3-column grid
- [ ] Disable an image URL in `products.data.ts` → card remains visually intact (placeholder visible)
- [ ] Empty the `PRODUCTS` array in `products.data.ts` → empty state message is displayed

### User Story 3 — Footer

- [ ] Footer is visible at the bottom of the page
- [ ] Email address is displayed and clicking it opens a `mailto:` link
- [ ] Phone number is displayed and clicking it opens a `tel:` link
- [ ] Instagram handle/link is displayed and clicking it opens Instagram in a new tab
- [ ] At 375 px: all footer links have comfortable tap targets (no zooming required)
- [ ] Footer wordmark "Korinna" and tagline "Ukrainian Hardwood Tables" are visible

### Cross-Cutting

- [ ] Google Fonts load correctly (Playfair Display, Cormorant Garamond, DM Mono visible)
- [ ] Brand colours match the brand kit (dark bark background on header/banner/footer, cream background on product section)
- [ ] No console errors in the browser DevTools
- [ ] SSR: run `ng build` + `node dist/etable-landing/server/server.mjs` and repeat the above checks at `http://localhost:4000` — confirm the page HTML is pre-rendered (view page source shows content, not just `<app-root></app-root>`)
