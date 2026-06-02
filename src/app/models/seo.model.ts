export interface OfferSchema {
  price: number;
  priceCurrency: string;
  availability: string;
}

export interface ProductSchema {
  name: string;
  image: string;
  description: string;
  offers: OfferSchema;
}

export interface ContactPointSchema {
  telephone: string;
  contactType: string;
  email?: string;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  contactPoint: ContactPointSchema;
  sameAs: string[];
}

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  organization: OrganizationSchema;
  products: ProductSchema[];
}
