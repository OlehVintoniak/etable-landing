import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { environment as env } from '../../environments/environment';

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private get gtag(): ((...args: unknown[]) => void) | undefined {
    return (this.document.defaultView as GtagWindow | null)?.gtag;
  }

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.injectGoogleManagerScript();
    this.injectGoogleAnalyticsInitScript();
  }

  trackPageView(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.gtag?.('event', 'page_view', { page_path: url });
  }

  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.gtag?.('event', eventName, params);
  }

  private injectGoogleManagerScript(): void {
    if (this.document.querySelector(`script[data-ga-id="${env.googleAnalyticsId}"]`)) {
      return;
    }

    const externalScript = this.document.createElement('script');
    externalScript.setAttribute('async', '');
    externalScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${env.googleAnalyticsId}`);
    externalScript.setAttribute('data-ga-id', env.googleAnalyticsId);
    this.document.head.appendChild(externalScript);
  }

  private injectGoogleAnalyticsInitScript(): void {
    if (this.document.querySelector(`script[data-ga-id-2="${env.googleAnalyticsId}"]`)) {
      return;
    }

    const initScript = this.document.createElement('script');
    initScript.textContent = `

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      window.gtag('js', new Date()); 
      window.gtag('config', '${env.googleAnalyticsId}');`;
    initScript.setAttribute('data-ga-id-2', env.googleAnalyticsId);
    this.document.head.appendChild(initScript);
  }
}
