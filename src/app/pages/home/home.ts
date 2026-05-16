import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { BannerComponent } from '../../components/banner/banner';
import { ProductListComponent } from '../../components/product-list/product-list';
import { FooterComponent } from '../../components/footer/footer';
import { COMPANY_INFO, CONTACT, INSTAGRAM } from '../../data/company.data';
import { PRODUCTS } from '../../data/products.data';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, BannerComponent, ProductListComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  companyInfo = COMPANY_INFO;
  contact = CONTACT;
  instagram = INSTAGRAM;
  products = PRODUCTS;
}
