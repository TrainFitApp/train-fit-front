import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatLocalNumber } from 'src/app/core/utils/local-number.util';

/**
 * Número en el idioma del usuario («1.731», «65,5»). Sustituye al pipe
 * `number` de Angular, que sin LOCALE_ID pinta siempre en inglés.
 *
 *   {{ kcal | localNumber: 0 }}       sin decimales
 *   {{ weight | localNumber: 1 }}     hasta un decimal
 *   {{ amount | localNumber: 2 : 2 }} siempre dos decimales
 */
@Pipe({
  name: 'localNumber',
  pure: false,
})
export class LocalNumberPipe implements PipeTransform {
  private lastKey = '';
  private lastValue = '';

  constructor(private translate: TranslateService) {}

  public transform(value: unknown, maxDecimals = 2, minDecimals = 0): string {
    const key = `${value}|${maxDecimals}|${minDecimals}|${this.translate.currentLang}`;
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.lastValue = formatLocalNumber(value, { maxDecimals, minDecimals });
    }
    return this.lastValue;
  }
}
