import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatLocalNumber } from 'src/app/core/utils/local-number.util';

// Decimales mínimos y máximos de un `digitsInfo` de Angular ('1.0-1').
export function decimalsOf(format: number | string | null | undefined, minDecimals?: number): { min: number; max: number } {
  if (typeof format === 'number') return { min: minDecimals ?? 0, max: format };
  const match = typeof format === 'string' ? format.match(/^\s*\d+\.(\d+)-(\d+)\s*$/) : null;
  if (match) return { min: Number(match[1]), max: Number(match[2]) };
  // Sin formato: el mismo que el pipe `number` de Angular ('1.0-3').
  return { min: minDecimals ?? 0, max: 3 };
}

/**
 * Número en el idioma del usuario («1.731», «65,5»). Sustituye al pipe
 * `number` de Angular, que sin LOCALE_ID pinta siempre en inglés («1,731»,
 * «65.5»). Acepta lo mismo que aquel:
 *
 *   {{ kcal | localNumber: '1.0-0' }}   digitsInfo de Angular
 *   {{ weight | localNumber: 1 }}       hasta un decimal
 *   {{ amount | localNumber: 2 : 2 }}   siempre dos decimales
 */
@Pipe({
  name: 'localNumber',
  pure: false,
})
export class LocalNumberPipe implements PipeTransform {
  private lastKey = '';
  private lastValue = '';

  constructor(private translate: TranslateService) {}

  public transform(value: unknown, format?: number | string, minDecimals?: number): string {
    const key = `${value}|${format}|${minDecimals}|${this.translate.currentLang}`;
    if (key !== this.lastKey) {
      this.lastKey = key;
      const { min, max } = decimalsOf(format, minDecimals);
      this.lastValue = formatLocalNumber(value, { minDecimals: min, maxDecimals: max });
    }
    return this.lastValue;
  }
}
