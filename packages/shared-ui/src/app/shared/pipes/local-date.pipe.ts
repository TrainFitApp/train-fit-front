import { formatDate, registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';
import localeEs from '@angular/common/locales/es';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEnGb, 'en-GB');

/**
 * `date` pipe in the user's language. The apps register no LOCALE_ID, so the
 * built-in pipe always prints English month and day names ("24 Sep") even
 * in Spanish. Use this one for any format with names (MMM, EEE, LLL…).
 */
@Pipe({
  name: 'localDate',
  pure: false,
})
export class LocalDatePipe implements PipeTransform {
  private lastKey = '';
  private lastValue: string | null = null;

  constructor(private translate: TranslateService) {}

  public transform(
    value: string | number | Date | null | undefined,
    format = 'mediumDate',
    timezone?: string
  ): string | null {
    if (value === null || value === undefined || value === '') return null;
    const locale = this.translate.currentLang === 'en' ? 'en-GB' : 'es';
    const key = `${value instanceof Date ? value.getTime() : value}|${format}|${timezone}|${locale}`;
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.lastValue = formatDate(value, format, locale, timezone);
    }
    return this.lastValue;
  }
}
