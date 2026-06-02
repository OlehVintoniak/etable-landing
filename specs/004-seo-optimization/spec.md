# Feature Specification: SEO Optimization

**Feature Branch**: `004-seo-optimization`  
**Created**: 2026-06-01  
**Status**: Draft  
**Input**: User description: "Apply best practices for SEO. The goal is to optimize the site for discoverability in Google and other platforms"

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Search Engine Discovers and Indexes the Site (Priority: P1)

A potential customer searches for handcrafted epoxy resin or hardwood tables made in Ukraine. Google's crawler visits the site, reads accurate page titles, meta descriptions, and semantic markup, and indexes the content correctly. The site appears in relevant search results.

**Why this priority**: Without proper indexing, no other SEO effort matters. This story enables all organic traffic.

**Independent Validation**: Can be validated manually by running Lighthouse SEO audit and Google Search Console URL Inspection tool. Delivers baseline discoverability.

**Acceptance Scenarios**:

1. **Given** a search engine crawler visits the homepage, **When** it reads the document `<head>`, **Then** it finds a unique, descriptive `<title>` tag (not "EtableLanding") and a `<meta name="description">` tag with 150–160 characters of relevant copy.
2. **Given** the page is rendered by the server, **When** Google's crawler requests it, **Then** all meaningful text content is present in the HTML response — not dependent on JavaScript execution.
3. **Given** the site is deployed, **When** a crawler requests `/robots.txt`, **Then** it receives a valid file that permits crawling of all public pages.
4. **Given** the site is deployed, **When** a crawler requests `/sitemap.xml`, **Then** it receives a valid XML sitemap listing all public URLs.

---

### User Story 2 - Social Media Shares Display Rich Preview Cards (Priority: P2)

A user discovers the brand and shares the site URL on Instagram, Facebook, WhatsApp, or LinkedIn. Instead of a blank link, the platform displays a rich card with the brand name, a short description, and a branded image.

**Why this priority**: Social sharing is a key discovery channel for a craft/artisan brand with a strong visual identity.

**Independent Validation**: Can be validated with the Facebook Sharing Debugger and Twitter Card Validator. Delivers branded social previews independently of search ranking.

**Acceptance Scenarios**:

1. **Given** a user pastes the site URL into Facebook or LinkedIn, **When** the platform fetches the link, **Then** it displays a preview card showing the brand name, a compelling description of the brand, and a brand image.
2. **Given** a user shares the URL on Twitter/X, **When** the platform renders the tweet, **Then** it shows a large-image Twitter Card with correct title and description.
3. **Given** Open Graph metadata is defined, **When** a messaging app (e.g., WhatsApp, Telegram) unfurls the URL, **Then** the preview shows the correct brand title and image.

---

### User Story 3 - Product Pages Enable Rich Search Results (Priority: P3)

When the landing page appears in Google search results, individual product names and prices are eligible to be displayed as rich snippets, making the result more compelling and increasing click-through rates.

**Why this priority**: Rich snippets differentiate the result in competitive searches and increase trust, but require foundational SEO (P1) first.

**Independent Validation**: Can be validated using Google's Rich Results Test tool. Delivers standalone SEO lift for product visibility.

**Acceptance Scenarios**:

1. **Given** structured data (JSON-LD) is added to the page, **When** Google's Rich Results Test tool analyzes the page, **Then** it reports valid Product schema with no errors.
2. **Given** the page includes Organization schema, **When** Google's structured data testing tool is run, **Then** it identifies the brand name, contact details, and social media profiles.
3. **Given** structured data is present, **When** the site is searched by brand name in Google, **Then** a Knowledge Panel or rich result with brand details may appear.

---

### Edge Cases

- What happens when the OG image file is missing or unavailable? The platform should fall back gracefully without exposing broken images.
- How does the sitemap handle future additional pages beyond the homepage?
- What happens if the canonical URL is misconfigured (e.g., points to a different domain)?
- How does SEO metadata behave in Angular's server-side rendering when the page is navigated to client-side after initial load?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST have a `<title>` tag that accurately names the brand and primary offering (e.g., "Коріння — Столи ручної роботи з епоксидної смоли та дерева").
- **FR-002**: The site MUST include a `<meta name="description">` tag with a concise, compelling description of the brand (150–160 characters).
- **FR-003**: The site MUST include a canonical `<link rel="canonical">` tag pointing to the definitive URL of the page.
- **FR-004**: The site MUST include Open Graph meta tags: `og:title`, `og:description`, `og:image`, `og:url`, and `og:type`.
- **FR-005**: The site MUST include Twitter Card meta tags: `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
- **FR-006**: All images MUST have descriptive, non-empty `alt` attributes in the language of the content.
- **FR-007**: The page MUST use a single `<h1>` element containing the primary brand headline.
- **FR-008**: The page MUST use semantic HTML elements (`<main>`, `<nav>`, `<footer>`, `<section>`, `<article>` where appropriate).
- **FR-009**: The site MUST serve a valid `robots.txt` file at the root that allows crawling of all public pages.
- **FR-010**: The site MUST serve a valid XML sitemap at `/sitemap.xml` listing all public URLs with their last-modified dates.
- **FR-011**: The homepage MUST include JSON-LD structured data for the Organization schema (brand name, URL, logo, contact, social links).
- **FR-012**: Each product displayed on the page MUST be marked up with JSON-LD Product schema (name, image, description, price, currency).
- **FR-013**: The `<html>` element MUST include the correct `lang` attribute matching the page's primary language (e.g., `lang="uk"` for Ukrainian content).
- **FR-014**: The page MUST define a `<meta name="viewport">` tag ensuring mobile-friendly rendering.

### Key Entities

- **Page Metadata**: A collection of `<head>` tags — title, description, canonical URL, OG properties, Twitter card properties, and `lang` attribute — that describe the page to search engines and social platforms.
- **Structured Data (JSON-LD)**: Machine-readable markup embedded in `<script type="application/ld+json">` blocks, conforming to Schema.org vocabulary, used to describe the Organization and individual Products.
- **XML Sitemap**: A machine-readable file listing all public URLs on the site, used by search engines to discover and schedule crawling.
- **robots.txt**: A text file at the site root that communicates crawling permissions to search engine bots.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The site achieves a Lighthouse SEO score of 95 or above when audited in a production environment.
- **SC-002**: Google's Rich Results Test tool reports zero errors for Product and Organization structured data on the homepage.
- **SC-003**: Social media previews (Facebook, Twitter/X) display a branded title, description, and image when the URL is shared — verifiable with platform debugging tools.
- **SC-004**: The XML sitemap is accessible at `/sitemap.xml` and contains at least one entry with a valid last-modified date.
- **SC-005**: The `robots.txt` file is accessible and contains no `Disallow` rules that block public pages.
- **SC-006**: All product images on the homepage have non-empty `alt` attributes.
- **SC-007**: The page passes Google's Mobile-Friendly Test without errors.

## Assumptions

- The site uses Angular with Server-Side Rendering (SSR) already configured; metadata injected server-side will be visible to crawlers without relying on client-side JavaScript.
- The primary content language is Ukrainian (`lang="uk"`); a separate locale/language toggle is out of scope.
- A branded OG image (minimum 1200×630 px) will be made available in `public/images/` before deployment.
- The site is a single-page landing with one primary URL; a dynamic per-product URL structure is out of scope.
- Google Analytics / tracking pixel integration is out of scope for this feature.
- The canonical domain (production URL) will be provided before implementation; a placeholder will be used during development.
- Performance optimization (e.g., Core Web Vitals, image compression) beyond what is required by the SEO requirements above is out of scope.
