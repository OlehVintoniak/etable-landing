# Feature Specification: Landing Card Component

**Feature Branch**: `003-landing-card-component`
**Created**: 2026-05-16
**Status**: Draft
**Input**: User description: "Update the way product examples are displayed, Create a new landing card component and use it in product list instead of product card component. The landing-card component occupy almost all page width, it should consist of 2 columns, on the left hand side there should be product image and on the right hand side product name, characteristics, etc. Columns should flip, meaning that the first card in the list should have the image on the left hand side and the second card should have the image in the right hand side and so forth. Do not delete product-card component, it will be used later"

## User Scenarios & Validation *(mandatory)*

### User Story 1 - View Products in Full-Width Layout (Priority: P1)

A visitor to the landing page browses the list of products. Each product is presented as a wide, two-column card that spans nearly the full page width. The product image fills one column while the product name and characteristics (material, dimensions) fill the other. Cards alternate their layout — the first card shows the image on the left and details on the right, the next card shows details on the left and the image on the right, and so on.

**Why this priority**: This is the core visual change requested. Without this, no other stories are deliverable. The alternating layout draws attention to each product and creates a visually engaging rhythm.

**Independent Validation**: Navigate to the home page, scroll to the product list section. Verify that product cards are wide (nearly full-page width), two-column, and that odd-numbered cards have the image on the left while even-numbered cards have the image on the right.

**Acceptance Scenarios**:

1. **Given** the home page is loaded, **When** the product list section is visible, **Then** each product is displayed as a wide two-column card occupying nearly the full page width.
2. **Given** the product list is rendered, **When** viewing the first product card, **Then** the product image appears in the left column and the product details (name, characteristics) appear in the right column.
3. **Given** the product list is rendered, **When** viewing the second product card, **Then** the product image appears in the right column and the product details appear in the left column.
4. **Given** the product list has more than two items, **When** viewing subsequent cards, **Then** the column order continues to alternate (odd index = image left, even index = image right).

---

### User Story 2 - View Product Details in Card (Priority: P2)

A visitor reads the product information within a landing card to understand what is being offered before making a decision to learn more or contact the company.

**Why this priority**: The card must surface enough information for a visitor to understand the product at a glance. Without meaningful content in the details column, the layout improvement delivers no business value.

**Independent Validation**: Inspect each landing card's detail column. Verify that product name, material, and dimensions (width × length with unit) are all present and readable.

**Acceptance Scenarios**:

1. **Given** a landing card is displayed, **When** the visitor views the details column, **Then** the product name is prominently visible.
2. **Given** a landing card is displayed, **When** the visitor views the details column, **Then** the product material is listed as a characteristic.
3. **Given** a landing card is displayed, **When** the visitor views the details column, **Then** the product dimensions (width and length) with unit are listed.

---

### User Story 3 - Accessibility and Responsive Viewing (Priority: P3)

A visitor using a screen reader or a narrow viewport (mobile device) can still consume product information without loss of content or usability.

**Why this priority**: Accessibility and responsive behavior are non-negotiable quality requirements. They do not affect the primary visual feature but must be preserved.

**Independent Validation**: Resize the browser to a mobile breakpoint (< 768 px). Verify each card stacks into a single column with the image on top. Run an automated accessibility check (e.g., axe) with no violations.

**Acceptance Scenarios**:

1. **Given** the page is viewed on a narrow viewport, **When** the product list renders, **Then** each landing card collapses to a single column with the image stacked above the product details.
2. **Given** a screen reader is active, **When** it encounters a landing card, **Then** the image has a meaningful alternative text and the details are read in a logical order regardless of the visual column arrangement.
3. **Given** the page is rendered, **When** an automated accessibility audit runs, **Then** no WCAG AA violations are reported for the landing card component.

---

### Edge Cases

- What happens when a product has no image source? The image column must display a meaningful fallback or placeholder without breaking the layout.
- How does the card behave with a very long product name? Text must wrap gracefully without overflowing the details column.
- What happens if only one product exists in the list? A single card must render correctly with the image on the left (first card = odd index).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST provide a new `landing-card` component that is separate from and does not replace the existing `product-card` component.
- **FR-002**: The `product-list` component MUST render products using the `landing-card` component instead of the `product-card` component.
- **FR-003**: The `landing-card` component MUST occupy nearly the full page width (e.g., spanning the content container width).
- **FR-004**: The `landing-card` component MUST display content in two equal columns: one for the product image and one for the product details.
- **FR-005**: The `landing-card` component MUST accept a `reversed` (or equivalent) input that, when set, places the image in the right column and the details in the left column.
- **FR-006**: The `product-list` component MUST pass `reversed = true` for every even-indexed card (0-based: index 1, 3, 5, …) so that column order alternates across the list.
- **FR-007**: The details column MUST display at minimum: product name, material, width, length, and unit.
- **FR-008**: The `product-card` component MUST remain in the codebase unchanged and available for future use.
- **FR-009**: On narrow viewports the `landing-card` MUST switch to a single-column stacked layout (image above details).
- **FR-010**: The image rendered inside `landing-card` MUST include a descriptive alternative text.

### Key Entities

- **Product**: Existing data model with `id`, `name`, `imageSrc`, `imageAlt`, `material`, `width`, `length`, `unit`. No changes to this entity are required.
- **LandingCard**: New presentational component. Accepts a `Product` and a positional flag (`reversed`). Stateless and purely display-oriented.
- **ProductList**: Existing container component. Wires up the list of products and passes each to a `LandingCard` with the correct `reversed` value derived from the item's index.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All products in the landing page list are displayed using the new `landing-card` layout with no visual regressions in other sections.
- **SC-002**: Column order alternates correctly for every product in the list — verified by visual inspection with at least 3 products rendered.
- **SC-003**: On a viewport narrower than 768 px, every landing card displays in a single-column layout with zero horizontal overflow.
- **SC-004**: Automated accessibility audit (axe or equivalent) reports zero WCAG AA violations for the product list section.
- **SC-005**: The existing `product-card` component continues to compile and pass existing tests without modification.

## Assumptions

- The `product-list` component currently iterates over products from the existing `products.data.ts` data source — no changes to data sourcing are required.
- The `landing-card` component will reuse the same `Product` model already in use by `product-card`; no new data model is needed.
- The existing global theme (`styles/theme.scss`) provides base spacing and colour tokens that the new component should use.
- Mobile support is defined as viewports below 768 px; tablet and desktop layouts both use the two-column format.
- No routing, lazy-loading, or state management changes are required — this is a purely presentational update.
