import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const WEB_RESOURCES_IMG_BASE = 'https://www.trainfit.net/resources/img';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(url: string) {
    if (!url) return;

    const normalizedUrl = url.trim();
    let finalUrl = normalizedUrl;

    if (
      normalizedUrl.includes('assets/img/') &&
      !normalizedUrl.startsWith('http://') &&
      !normalizedUrl.startsWith('https://')
    ) {
      const [, resourcePath = ''] = normalizedUrl.split('assets/img/');
      finalUrl = `${WEB_RESOURCES_IMG_BASE}/${resourcePath.replace(/^\/+/, '')}`;
    }

    // Important for filenames with spaces/accents when used in <img [src]>
    const encodedUrl = encodeURI(finalUrl);
    return this.sanitizer.bypassSecurityTrustUrl(encodedUrl);
  }
}
