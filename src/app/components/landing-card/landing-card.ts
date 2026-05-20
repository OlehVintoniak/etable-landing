import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-landing-card',
  imports: [NgOptimizedImage],
  templateUrl: './landing-card.html',
  styleUrl: './landing-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'landing-card',
    '[class.landing-card--reversed]': 'reversed()',
  },
})
export class LandingCardComponent {
  product = input.required<Product>();
  reversed = input<boolean>(false);
  priority = input<boolean>(false);
}
