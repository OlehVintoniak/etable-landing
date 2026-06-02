import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { BannerComponent } from '../../components/banner/banner';
import { ProductListComponent } from '../../components/product-list/product-list';
import { FooterComponent } from '../../components/footer/footer';
import { COMPANY_INFO, CONTACT, INSTAGRAM } from '../../data/company.data';
import { PRODUCTS } from '../../data/products.data';
import { HOME_SEO_CONFIG } from '../../data/seo.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, BannerComponent, ProductListComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  companyInfo = COMPANY_INFO;
  contact = CONTACT;
  instagram = INSTAGRAM;
  products = PRODUCTS;

  ngOnInit(): void {
    this.seoService.applyPageSeo(HOME_SEO_CONFIG);
  }
}
