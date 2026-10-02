import { Pipe, PipeTransform } from '@angular/core';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

// Angular's built-in `number` pipe formats using the app's global LOCALE_ID
// (en-US: "1,000.5"), which reads wrong for Spanish users ("1.000,5" is the
// convention here). Scoped to this page only, not a global LOCALE_ID change.
@Pipe({ name: 'esNumber' })
export class EsNumberPipe implements PipeTransform {
  public transform(
    value: number | string | null | undefined,
    digitsInfo: string = '1.0-3'
  ): string {
    if (value === null || value === undefined || value === '') return '';

    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (!Number.isFinite(num)) return '';

    const match = digitsInfo.match(/^\d+\.(\d+)-(\d+)$/);
    const minimumFractionDigits = match ? Number(match[1]) : 0;
    const maximumFractionDigits = match ? Number(match[2]) : 3;

    return new Intl.NumberFormat(uiLocale(), {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(num);
  }
}
