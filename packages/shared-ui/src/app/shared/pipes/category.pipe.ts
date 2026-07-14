import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CATEGORIES_ES_EN } from '../constants/db-translations/es-en-db.map';

@Pipe({
  name: 'category',
  pure: false,
})
export class CategoryPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  public transform(categories: string | string[]): string {
    if (!categories) {
      return this.translate.instant('EXERCISE_FILTER.NO_CATEGORIES');
    }

    if (typeof categories === 'string') {
      return `(${this.translateValue(categories)})`;
    }

    if (categories.length === 0) {
      return this.translate.instant('EXERCISE_FILTER.NO_CATEGORIES');
    }

    const translated = categories.map((c) => this.translateValue(c));
    return `(${translated.join(', ')})`;
  }

  private translateValue(value: string): string {
    const currentLang = this.translate.currentLang || 'es';
    if (currentLang === 'en') {
      const translated = CATEGORIES_ES_EN[value.trim()];
      if (translated) return translated;
    }
    return value;
  }
}
