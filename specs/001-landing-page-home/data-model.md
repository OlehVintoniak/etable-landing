# Data Model: Home Page — Epoxy River Tables Landing Page

**Phase**: 1 — Design  
**Branch**: `001-landing-page-home`  
**Date**: 2026-05-10

---

## Entities

### Product

Represents a single epoxy river table offered for sale.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier, e.g. `'KOR-OAK-001'` |
| `name` | `string` | Yes | Display name, e.g. `'Polissia'` |
| `imageSrc` | `string` | Yes | Path to product image, e.g. `'/images/products/polissia.jpg'` |
| `imageAlt` | `string` | Yes | Descriptive alt text for accessibility |
| `material` | `string` | Yes | Primary wood species, e.g. `'Oak'` |
| `width` | `number` | Yes | Table width in cm |
| `length` | `number` | Yes | Table length in cm |
| `unit` | `'cm'` | Yes | Measurement unit (always cm for initial data) |

**Notes**:
- `width × length` is displayed as dimensions on the product card, e.g. `180 × 90 cm`.
- Height/thickness is excluded from the card display (not mentioned in spec FR-004); can be added later.
- `imageSrc` is a relative path resolved against the Angular app's `public/` directory.

**TypeScript interface** (`src/app/models/product.model.ts`):
```ts
export interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  material: string;
  width: number;
  length: number;
  unit: 'cm';
}
```

**Validation rules**:
- `width` and `length` must be positive numbers.
- `imageSrc` must be a non-empty string; fallback rendering is handled via CSS if the image fails to load.

---

### CompanyInfo

Core content for the hero banner section.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Company display name, e.g. `'Korinna'` |
| `tagline` | `string` | Yes | Short brand tagline, e.g. `'Handcrafted epoxy & hardwood tables rooted in Ukrainian nature.'` |
| `ctaLabel` | `string` | Yes | Call-to-action button text, e.g. `'View Our Tables'` |
| `ctaTarget` | `string` | Yes | CSS selector of the element to scroll to, e.g. `'#products'` |

**TypeScript interface** (`src/app/models/company.model.ts`):
```ts
export interface CompanyInfo {
  name: string;
  tagline: string;
  ctaLabel: string;
  ctaTarget: string;
}
```

---

### ContactDetail

Contact methods displayed in the footer contacts subsection.

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | Yes | Contact email address, e.g. `'hello@korinna.ua'` |
| `phone` | `string` | Yes | Contact phone number in international format, e.g. `'+380 99 000 0000'` |

**TypeScript interface** (`src/app/models/company.model.ts`):
```ts
export interface ContactDetail {
  email: string;
  phone: string;
}
```

**Notes**: Email is rendered as `<a href="mailto:...">`, phone as `<a href="tel:...">`.

---

### SocialMediaLink

The Instagram profile link displayed in the footer.

| Field | Type | Required | Description |
|---|---|---|---|
| `platform` | `'instagram'` | Yes | Always `'instagram'` for this feature |
| `url` | `string` | Yes | Full Instagram profile URL, e.g. `'https://instagram.com/korinna.tables'` |
| `label` | `string` | Yes | Visible link label, e.g. `'@korinna.tables'` |

**TypeScript interface** (`src/app/models/company.model.ts`):
```ts
export interface SocialMediaLink {
  platform: 'instagram';
  url: string;
  label: string;
}
```

---

## State Transitions

No state transitions — this feature is fully static. All data is read-only at page render time.

## Data Seeding

Initial static data is defined as TypeScript constants:

- `src/app/data/products.data.ts` — exports `PRODUCTS: Product[]` (sample entries using brand kit naming: Polissia, Dnipro, Hutsul, Stepa)
- `src/app/data/company.data.ts` — exports `COMPANY_INFO: CompanyInfo`, `CONTACT_DETAIL: ContactDetail`, `SOCIAL_MEDIA_LINK: SocialMediaLink`

These are imported directly by the `HomeComponent` and passed down to child components via `input()`.
