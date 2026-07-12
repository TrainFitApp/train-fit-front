import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DB_ES_EN_MAP } from '../constants/db-translations/es-en-db.map';
import { EXERCISE_NAMES_ES_EN } from '../constants/db-translations/exercise-names-es-en.map';

const COMBINED_MAP: Record<string, string> = {
  ...DB_ES_EN_MAP,
  ...EXERCISE_NAMES_ES_EN,
};

/**
 * Translates DB-stored Spanish reference values to the current UI language.
 * Only translates pre-defined seed values that exist in the map.
 * User-created values (not in map) pass through unchanged.
 */
@Pipe({
  name: 'translateDb',
  pure: false,
})
export class TranslateDbPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  public transform(value: string | string[] | null | undefined): string {
    if (!value) {
      return '';
    }

    if (Array.isArray(value)) {
      return value.map((v) => this.transformSingle(v)).filter(Boolean).join(', ');
    }

    return this.transformSingle(value);
  }

  public transformSingle(value: string | null | undefined): string {
    if (!value || !value.trim()) {
      return '';
    }

    const currentLang = this.translate.currentLang || 'es';

    if (currentLang === 'en') {
      const key = value.trim();
      const translated = COMBINED_MAP[key];
      if (translated) {
        return translated;
      }
    }

    return value;
  }
}
