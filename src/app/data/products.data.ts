import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
  {
    id: 'KOR-OAK-001',
    name: 'Світанок',
    imageSrc: '/images/products/polissia.jpg',
    imageAlt: 'Журнальний столик з флюрисцентною галькою.',
    material: 'Дуб, кам\'яна галька, флуоресцентна галька',
    price: 6500,
    width: 30,
    length: 60,
    unit: 'см',
  },
  {
    id: 'KOR-WAL-002',
    name: 'Легінь',
    imageSrc: '/images/products/carpathia.jpg',
    imageAlt: 'Журнальний столик з дуба та металевими ніжками.',
    material: 'Дуб',
    price: 7500,
    width: 40,
    length: 80,
    unit: 'см',
  },
  {
    id: 'KOR-ELM-003',
    name: 'Плин',
    imageSrc: '/images/products/dnipro.jpg',
    imageAlt: 'Журнальний столик з дуба та металевими ніжками.',
    material: 'Дуб',
    price: 5000,
    width: 30,
    length: 60,
    unit: 'см',
  },
];
