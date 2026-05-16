# UI Contract: HeaderComponent

**File**: `src/app/components/header/header.ts`  
**Selector**: `app-header`

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `companyName` | `string` | Yes | Company display name shown in the header |

## Outputs

None.

## Rendered Output

```html
<header role="banner">
  <span class="header__name">{{ companyName }}</span>
</header>
```

## Accessibility

- Landmark role `banner` via semantic `<header>` element.
- Company name rendered as visible text (not image-only) so screen readers announce it.

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile ≥ 375 px | Full-width bar, name left-aligned, comfortable tap height (≥ 48 px) |
| Tablet ≥ 768 px | Same layout, slightly larger font |
| Desktop ≥ 1280 px | Constrained to max-width container, centred |

## Brand Styles

- Background: `var(--color-bark)`
- Text colour: `var(--color-birch)`
- Font: `var(--font-display)` (Playfair Display)
