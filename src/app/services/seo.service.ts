import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PageSeoConfig } from '../models/seo.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  applyPageSeo(config: PageSeoConfig): void {
    this.setTitle(config);
    this.setBasicMeta(config);
    this.setCanonical(config);
    this.setOpenGraph(config);
    this.setTwitterCard(config);
    this.setJsonLd(config);
  }

  private setTitle(config: PageSeoConfig): void {
    this.title.setTitle(config.title);
  }

  private setBasicMeta(config: PageSeoConfig): void {
    this.meta.updateTag({ name: 'description', content: config.description });
  }

  private setCanonical(config: PageSeoConfig): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', config.canonicalUrl);
  }

  private setOpenGraph(config: PageSeoConfig): void {
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription });
    this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    this.meta.updateTag({ property: 'og:url', content: config.ogUrl });
    this.meta.updateTag({ property: 'og:type', content: config.ogType });
  }

  private setTwitterCard(config: PageSeoConfig): void {
    this.meta.updateTag({ name: 'twitter:card', content: config.twitterCard });
    this.meta.updateTag({ name: 'twitter:title', content: config.twitterTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.twitterDescription });
    this.meta.updateTag({ name: 'twitter:image', content: config.twitterImage });
  }

  private setJsonLd(config: PageSeoConfig): void {
    this.upsertJsonLdScript('ld-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.organization.name,
      url: config.organization.url,
      logo: config.organization.logo,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: config.organization.contactPoint.telephone,
        contactType: config.organization.contactPoint.contactType,
        ...(config.organization.contactPoint.email
          ? { email: config.organization.contactPoint.email }
          : {}),
      },
      sameAs: config.organization.sameAs,
    });

    this.upsertJsonLdScript(
      'ld-products',
      config.products.map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        image: p.image,
        description: p.description,
        offers: {
          '@type': 'Offer',
          price: p.offers.price,
          priceCurrency: p.offers.priceCurrency,
          availability: p.offers.availability,
        },
      })),
    );
  }

  private upsertJsonLdScript(id: string, data: unknown): void {
    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>(`script#${id}`);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', id);
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
