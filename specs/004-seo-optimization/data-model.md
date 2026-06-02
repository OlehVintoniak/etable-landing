# Data Model: SEO Optimization

**Feature**: 004-seo-optimization  
**Date**: 2026-06-01

---

## Entities

### 1. `PageSeoConfig`

Represents the complete set of SEO metadata for a single page. This object is constructed once per page and passed to `SeoService`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Full page `<title>` value (brand + tagline, ≤60 chars) |
| `description` | `string` | Yes | `<meta name="description">` value (150–160 chars) |
| `canonicalUrl` | `string` | Yes | Absolute URL for `<link rel="canonical">` |
| `ogTitle` | `string` | Yes | `og:title` — may equal `title` |
| `ogDescription` | `string` | Yes | `og:description` — may equal `description` |
| `ogImage` | `string` | Yes | Absolute URL to the 1200×630 OG image |
| `ogUrl` | `string` | Yes | `og:url` — canonical page URL |
| `ogType` | `'website' \| 'article'` | Yes | `og:type` — always `'website'` for the landing page |
| `twitterCard` | `'summary_large_image' \| 'summary'` | Yes | Twitter card type |
| `twitterTitle` | `string` | Yes | `twitter:title` |
| `twitterDescription` | `string` | Yes | `twitter:description` |
| `twitterImage` | `string` | Yes | Absolute URL to the Twitter card image |
| `organization` | `OrganizationSchema` | Yes | JSON-LD Organization structured data |
| `products` | `ProductSchema[]` | Yes | JSON-LD Product structured data list |

---

### 2. `OrganizationSchema`

Represents the JSON-LD `Organization` block to be emitted in a `<script type="application/ld+json">` tag. Follows [Schema.org/Organization](https://schema.org/Organization).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Brand name — e.g., `"Коріння"` |
| `url` | `string` | Yes | Canonical site URL |
| `logo` | `string` | Yes | Absolute URL to the brand logo image |
| `contactPoint` | `ContactPointSchema` | Yes | Primary contact information |
| `sameAs` | `string[]` | Yes | Social media profile URLs |

---

### 3. `ContactPointSchema`

Nested within `OrganizationSchema`. Follows [Schema.org/ContactPoint](https://schema.org/ContactPoint).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `telephone` | `string` | Yes | Primary phone number |
| `contactType` | `string` | Yes | Type of contact — e.g., `"customer service"` |
| `email` | `string` | No | Contact email address |

---

### 4. `ProductSchema`

Represents a single product's JSON-LD `Product` block. Follows [Schema.org/Product](https://schema.org/Product).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Product name — e.g., `"Світанок"` |
| `image` | `string` | Yes | Absolute URL to the product image |
| `description` | `string` | Yes | Human-readable product description |
| `offers` | `OfferSchema` | Yes | Pricing and availability |

---

### 5. `OfferSchema`

Nested within `ProductSchema`. Follows [Schema.org/Offer](https://schema.org/Offer).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `price` | `number` | Yes | Numeric price (e.g., `6500`) |
| `priceCurrency` | `string` | Yes | ISO 4217 currency code — `"UAH"` |
| `availability` | `string` | Yes | Schema.org URL — `"https://schema.org/InStock"` |

---

## Validation Rules

- `title` MUST be ≤ 60 characters to avoid truncation in Google SERPs.
- `description` MUST be between 100 and 160 characters.
- `canonicalUrl`, `ogUrl`, `ogImage`, `twitterImage`, `organization.url`, `organization.logo`, and all `product.image` fields MUST be absolute URLs (starting with `https://`).
- `ogType` MUST be `'website'` for the homepage.
- `twitterCard` MUST be `'summary_large_image'` when an image ≥ 1200×630 is available.
- `products` array MUST contain at least one entry.
- `organization.sameAs` MUST contain at least one URL.

---

## State Transitions

Not applicable. `PageSeoConfig` is constructed once during component initialization and applied synchronously. There is no state machine — the SEO metadata is static for the lifetime of the page.

---

## Relationship Diagram

```
PageSeoConfig
├── OrganizationSchema
│   └── ContactPointSchema
└── ProductSchema[]
    └── OfferSchema
```

---

## Populated Example (Коріння homepage)

```typescript
const HOME_SEO_CONFIG: PageSeoConfig = {
  title: 'Коріння — Столи ручної роботи з епоксидної смоли та дерева',
  description: 'Коріння — авторські столи з епоксидної смоли та твердих порід дерева, натхненні українською природою. Ручна робота. Замовлення з України.',
  canonicalUrl: 'https://korinna.com.ua/',
  ogTitle: 'Коріння — Столи ручної роботи з епоксидної смоли та дерева',
  ogDescription: 'Авторські столи з епоксидної смоли та твердих порід дерева, натхненні українською природою.',
  ogImage: 'https://korinna.com.ua/images/og-image.jpg',
  ogUrl: 'https://korinna.com.ua/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Коріння — Столи ручної роботи',
  twitterDescription: 'Авторські столи з епоксидної смоли та дерева. Ручна робота.',
  twitterImage: 'https://korinna.com.ua/images/og-image.jpg',
  organization: {
    name: 'Коріння',
    url: 'https://korinna.com.ua/',
    logo: 'https://korinna.com.ua/images/logo.png',
    contactPoint: {
      telephone: '+380679693717',
      contactType: 'customer service',
      email: 'korinna.in.ua@gmail.com',
    },
    sameAs: ['https://www.instagram.com/korinna.tables'],
  },
  products: [
    {
      name: 'Світанок',
      image: 'https://korinna.com.ua/images/products/svitanok.jpg',
      description: 'Журнальний столик з флюрисцентною галькою. Матеріал: Дуб, кам\'яна галька, флуоресцентна галька. 30×60 см.',
      offers: { price: 6500, priceCurrency: 'UAH', availability: 'https://schema.org/InStock' },
    },
    {
      name: 'Легінь',
      image: 'https://korinna.com.ua/images/products/legin.jpg',
      description: 'Журнальний столик з дуба та металевими ніжками. Матеріал: Дуб. 40×80 см.',
      offers: { price: 7500, priceCurrency: 'UAH', availability: 'https://schema.org/InStock' },
    },
    {
      name: 'Плин',
      image: 'https://korinna.com.ua/images/products/plyn.jpg',
      description: 'Журнальний столик з дуба та металевими ніжками. Матеріал: Дуб. 30×60 см.',
      offers: { price: 5000, priceCurrency: 'UAH', availability: 'https://schema.org/InStock' },
    },
  ],
};
```
