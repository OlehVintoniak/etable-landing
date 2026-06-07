import { PageSeoConfig } from '../models/seo.model';
import { COMPANY_INFO, CONTACT, INSTAGRAM } from './company.data';
import { PRODUCTS } from './products.data';

const CANONICAL_BASE = 'https://www.korinna.store';

export const HOME_SEO_CONFIG: PageSeoConfig = {
  title: `Столи з епоксидної смоли та натурального дерева | Korinna`,
  description:
    `${COMPANY_INFO.name} — авторські столи з епоксидної смоли та твердих порід дерева, натхненні українською природою. Ручна робота. Замовлення з України.`,
  canonicalUrl: `${CANONICAL_BASE}/`,
  ogTitle: `${COMPANY_INFO.name} — Столи ручної роботи з епоксидної смоли та дерева`,
  ogDescription: `Авторські столи з епоксидної смоли та твердих порід дерева, натхненні українською природою.`,
  ogImage: `${CANONICAL_BASE}/images/og-image.jpg`,
  ogUrl: `${CANONICAL_BASE}/`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `${COMPANY_INFO.name} — Столи ручної роботи`,
  twitterDescription: `Авторські столи з епоксидної смоли та дерева. Ручна робота.`,
  twitterImage: `${CANONICAL_BASE}/images/og-image.jpg`,
  organization: {
    name: COMPANY_INFO.name,
    url: `${CANONICAL_BASE}/`,
    logo: `${CANONICAL_BASE}/images/roots-logo.png`,
    contactPoint: {
      telephone: CONTACT.phone.replace(/\s/g, ''),
      contactType: 'customer service',
      email: CONTACT.email,
    },
    sameAs: [INSTAGRAM.url],
  },
  products: PRODUCTS.map((p) => ({
    name: p.name,
    image: `${CANONICAL_BASE}/${p.imageSrc}`,
    description: `${p.imageAlt} Матеріал: ${p.material}. ${p.width}×${p.length} ${p.unit}.`,
    offers: {
      price: p.price,
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
    },
  })),
};
