import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
  {
    id: 'KOR-OAK-001',
    name: 'Polissia',
    imageSrc: '/images/products/polissia.jpg',
    imageAlt: 'Polissia epoxy river table made from solid oak with turquoise resin river',
    material: 'Oak',
    width: 90,
    length: 180,
    unit: 'cm',
  },
  {
    id: 'KOR-WAL-002',
    name: 'Carpathia',
    imageSrc: '/images/products/carpathia.jpg',
    imageAlt: 'Carpathia epoxy river table made from walnut with deep blue resin river',
    material: 'Walnut',
    width: 95,
    length: 200,
    unit: 'cm',
  },
  {
    id: 'KOR-ELM-003',
    name: 'Dnipro',
    imageSrc: '/images/products/dnipro.jpg',
    imageAlt: 'Dnipro epoxy river table made from elm with aqua-green resin river',
    material: 'Elm',
    width: 85,
    length: 160,
    unit: 'cm',
  },
];
