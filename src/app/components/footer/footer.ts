import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ContactDetail, SocialMediaLink } from '../../models/company.model';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  contact = input.required<ContactDetail>();
  instagram = input.required<SocialMediaLink>();
  companyName = input.required<string>();

  private analyticsService = inject(AnalyticsService);

  instagramClicked() {
    this.analyticsService.trackEvent('instagram_click', { source: 'footer' });
  }
}
