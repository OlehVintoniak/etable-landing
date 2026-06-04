import { ChangeDetectionStrategy, Component, inject, input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CompanyInfo } from '../../models/company.model';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  company = input.required<CompanyInfo>();
  videoSrc = input<string>();

  private analyticsService = inject(AnalyticsService);
  private platformId = inject(PLATFORM_ID);

  scrollToProducts(): void {
    if (isPlatformBrowser(this.platformId)) {
      const target = document.querySelector(this.company().ctaTarget);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        this.analyticsService.trackEvent('scroll_to_products', { source: 'banner' });
      }
    }
  }
}
