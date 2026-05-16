import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContactDetail, SocialMediaLink } from '../../models/company.model';

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
}
