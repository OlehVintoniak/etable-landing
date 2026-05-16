# Feature Specification: Home Page — Epoxy River Tables Landing Page

**Feature Branch**: `001-landing-page-home`
**Created**: 2026-05-10
**Status**: Draft
**Input**: User description: "Home page setup - This application should be a landing page for the products - epoxy river tables. Home page containing site header, banner containing main information about company, list of product cards that include table image, basic info (material, size), footer containing social media links and contacts section."

## User Scenarios & Validation *(mandatory)*

### User Story 1 — First-time Visitor Gets Company Overview (Priority: P1)

A visitor lands on the home page for the first time. They can immediately understand who the company is and what it sells from the header and hero banner without scrolling.

**Why this priority**: This is the primary purpose of a landing page — communicating the brand identity and value proposition at a glance. All other stories depend on the visitor staying engaged.

**Independent Validation**: Manually open the page in a browser and verify that the company name, a short description, and at least one clear call-to-action are visible in the initial viewport (above the fold) on both mobile and desktop.

**Acceptance Scenarios**:

1. **Given** the visitor opens the home page URL, **When** the page loads, **Then** a header containing the company name/logo is visible at the top.
2. **Given** the visitor views the page without scrolling, **When** the banner renders, **Then** the banner displays the company name, a short tagline or description, and a primary call-to-action.
3. **Given** the visitor is on a mobile device, **When** the banner renders, **Then** text and call-to-action remain fully readable without horizontal scrolling.

---

### User Story 2 — Visitor Browses Product Cards (Priority: P2)

A visitor scrolls down the home page to explore available epoxy river table products. Each product card shows an image, the material used, and the table dimensions.

**Why this priority**: Product discovery is the core commercial purpose of the page. Without clear product information the landing page fails its sales goal.

**Independent Validation**: Manually scroll to the product section and verify that at least one product card renders with a visible image, a labelled material field, and a labelled size/dimensions field. Resize the browser to mobile, tablet, and desktop widths and confirm the cards remain readable and properly laid out.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls past the banner, **When** the product section renders, **Then** a list of product cards is displayed.
2. **Given** a product card is visible, **When** the visitor views the card, **Then** it shows a table image, a material label and value, and a size/dimensions label and value.
3. **Given** the visitor is on a narrow mobile screen, **When** the product cards render, **Then** cards stack vertically and images are not cropped or overflowing.
4. **Given** the visitor is on a wide desktop screen, **When** the product cards render, **Then** cards are displayed in a multi-column grid.

---

### User Story 3 — Visitor Finds Contact and Social Media Information (Priority: P3)

A visitor scrolls to the footer to find how to contact the company or follow them on social media.

**Why this priority**: Contact and social media access are secondary but important conversion paths — an interested visitor needs a clear way to reach out or continue following the brand.

**Independent Validation**: Manually scroll to the footer and verify that at least one contact method (e.g., email address or phone number) and at least one social media link are present and visually labelled. Verify links are tappable on mobile.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the bottom of the page, **When** the footer renders, **Then** a contacts section is visible containing at least one contact method.
2. **Given** the footer is visible, **When** the visitor views the social media section, **Then** at least one social media link is displayed with a recognisable icon or label.
3. **Given** the visitor is on a mobile device, **When** the footer renders, **Then** all links and contact information are legible and tappable without zooming.

---

### Edge Cases

- What happens when no product data is available? The product section must show a meaningful empty state rather than a blank area.
- How does the page behave when a product image fails to load? The card must remain structurally intact with a visible fallback placeholder.
- How does the layout behave on very small screens (< 375 px width)? Content must not overflow its container.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST display a site header containing the company name or logo, visible on all breakpoints.
- **FR-002**: Page MUST display a hero banner section with company name, a short descriptive tagline, and a primary call-to-action element that smooth-scrolls the visitor to the product section on the same page.
- **FR-003**: Page MUST display a product section containing a list of product cards.
- **FR-004**: Each product card MUST display: a product image, a material label and value, and a size/dimensions label and value.
- **FR-005**: The product card grid MUST be responsive: single column on mobile, two or more columns on tablet/desktop.
- **FR-006**: Page MUST display a footer section containing a social media links subsection and a contacts subsection.
- **FR-007**: The footer contacts subsection MUST display both an email address (as a `mailto:` link) and a phone number (as a `tel:` link).
- **FR-008**: The footer social media subsection MUST display an Instagram profile link with the Instagram icon or label.
- **FR-009**: All page sections MUST render correctly on mobile (≥ 375 px), tablet (≥ 768 px), and desktop (≥ 1280 px) viewports.
- **FR-010**: The page MUST be rendered server-side (SSR) or statically pre-rendered (SSG) to support fast first contentful paint and SEO.
- **FR-011**: The page MUST load brand typography (Playfair Display, Cormorant Garamond, DM Mono) via Google Fonts CDN `<link>` tags in the document `<head>`.

### Key Entities

- **Product**: Represents a single epoxy river table offering. Key attributes: image, material, size/dimensions.
- **ContactDetail**: Represents a contact method in the footer. Two instances are in scope: email address (rendered as `mailto:` link) and phone number (rendered as `tel:` link).
- **SocialMediaLink**: Represents the Instagram profile link shown in the footer (URL, icon identifier). Only Instagram is in scope for this feature.
- **CompanyInfo**: Core banner content: company name, tagline, call-to-action label and destination.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the company name and primary offering within 5 seconds of the page loading, without scrolling, on both mobile and desktop.
- **SC-002**: All product cards display image, material, and size information legibly across mobile, tablet, and desktop screen widths without layout breakage.
- **SC-003**: A visitor can locate the Instagram link, the email address, and the phone number in the footer within 10 seconds of scrolling to the bottom.
- **SC-004**: The page achieves a Largest Contentful Paint (LCP) under 2.5 seconds on a standard broadband connection, benefiting from server-side or static rendering.
- **SC-005**: No horizontal scroll is triggered on any device width from 375 px and above.

## Clarifications

### Session 2026-05-10

- Q: What is the content language for the landing page? → A: English only — all content in English; the Ukrainian name (Коріння) is not displayed on the page.
- Q: Where does the banner primary call-to-action lead? → A: Smooth-scroll to the product section on the same page.
- Q: How should brand kit fonts (Playfair Display, Cormorant Garamond, DM Mono) be loaded? → A: Google Fonts CDN via `<link>` in index.html for the initial implementation.
- Q: Which social media platforms should appear in the footer? → A: Instagram only — a single Instagram profile link.
- Q: What contact method(s) should appear in the footer contacts section? → A: Both email address and phone number.

## Assumptions

- Product data (images, material, size) will be supplied as static assets or inline data in the initial implementation; a backend API is out of scope.
- Social media links and contact details will be hard-coded configuration values for the initial release.
- The page content language is English only; the Ukrainian brand name (Коріння) is not displayed.
- Brand typography (Playfair Display, Cormorant Garamond, DM Mono) is loaded from Google Fonts CDN; self-hosting is deferred to a future iteration.
- The company branding (logo, colours, typography) will be provided separately; the spec does not dictate specific visual design values.
- The Angular SSR/SSG setup already present in package.json will be used; no additional rendering libraries are required.
- A mobile-first responsive approach will be used, consistent with the project constitution.
- Navigation links in the header are out of scope for this feature (the header only needs the company identity element for the home page).
