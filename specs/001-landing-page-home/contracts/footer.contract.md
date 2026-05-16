# UI Contract: FooterComponent

**File**: `src/app/components/footer/footer.ts`  
**Selector**: `app-footer`

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `contact` | `ContactDetail` | Yes | Email and phone contact details |
| `instagram` | `SocialMediaLink` | Yes | Instagram profile URL and label |
| `companyName` | `string` | Yes | Company name for footer wordmark |

## Outputs

None.

## Rendered Output

```html
<footer class="footer" role="contentinfo">
  <div class="footer__inner">

    <div class="footer__wordmark">
      <span class="footer__name">{{ companyName }}</span>
      <span class="footer__sub">Ukrainian Hardwood Tables</span>
    </div>

    <div class="footer__contact" aria-label="Contact information">
      <h2 class="footer__section-heading">Contact</h2>
      <ul class="footer__contact-list">
        <li>
          <a [href]="'mailto:' + contact.email" class="footer__link">
            {{ contact.email }}
          </a>
        </li>
        <li>
          <a [href]="'tel:' + contact.phone" class="footer__link">
            {{ contact.phone }}
          </a>
        </li>
      </ul>
    </div>

    <div class="footer__social" aria-label="Social media">
      <h2 class="footer__section-heading">Follow</h2>
      <a [href]="instagram.url"
         class="footer__link footer__link--instagram"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Follow us on Instagram">
        {{ instagram.label }}
      </a>
    </div>

  </div>
  <div class="footer__bottom">
    <span class="footer__copy">Handmade · Ukraine · Est. 2026</span>
  </div>
</footer>
```

## Accessibility

- Landmark `<footer role="contentinfo">` — one per page, at the bottom.
- Contact and social sections use `aria-label` to name the subsections without adding extra headings above the landmark level.
- `<h2>` headings inside the footer for "Contact" and "Follow" are appropriate below the page `<h1>`.
- Instagram external link includes `rel="noopener noreferrer"` (security) and a descriptive `aria-label`.
- Both email and phone links use correct `mailto:` and `tel:` schemes, making them tappable on mobile.
- Minimum tappable area of 44 × 44 px on all links (enforced via CSS padding).

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| Mobile ≥ 375 px | Stacked single column, wordmark → contact → social |
| Tablet ≥ 768 px | Two columns: wordmark left, contact + social right |
| Desktop ≥ 1280 px | Three-column row: wordmark · contact · social |

## Brand Styles

- Background: `var(--color-bark)`
- Wordmark font: `var(--font-display)`, colour `var(--color-birch)`
- Sub-tagline font: `var(--font-mono)` uppercase, colour `rgba(240,232,216,0.4)`
- Section headings: `var(--font-mono)` uppercase, colour `var(--color-resin)`, letter-spacing `0.3em`
- Links: colour `var(--color-birch)`, hover colour `var(--color-resin)`
- Bottom bar: `var(--font-mono)`, colour `rgba(255,255,255,0.2)`
