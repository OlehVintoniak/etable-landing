import { ChangeDetectionStrategy, Component, inject, input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CompanyInfo } from '../../models/company.model';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  company = input.required<CompanyInfo>();

  private platformId = inject(PLATFORM_ID);

  scrollToProducts(): void {
    if (isPlatformBrowser(this.platformId)) {
      const target = document.querySelector(this.company().ctaTarget);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
