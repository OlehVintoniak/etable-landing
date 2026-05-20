import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { LandingCardComponent } from '../landing-card/landing-card';

@Component({
  selector: 'app-product-list',
  imports: [LandingCardComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products = input.required<Product[]>();
}
