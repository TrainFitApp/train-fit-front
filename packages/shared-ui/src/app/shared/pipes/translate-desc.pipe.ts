import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EXERCISE_DESCRIPTIONS_ES_EN } from '../constants/db-translations/exercise-descriptions-es-en.map';
import { Exercise } from 'src/app/core/models/exercise';

/**
 * Translates exercise description for pre-defined exercises.
 * Pipe receives Exercise object, looks up English description by exercise name.
 * User-created exercises (not in map) fall through to original description.
 */
@Pipe({
  name: 'translateDesc',
  pure: false,
})
export class TranslateDescPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  public transform(exercise: Exercise | null | undefined): string {
    if (!exercise) {
      return '';
    }

    const currentLang = this.translate.currentLang || 'es';

    if (currentLang === 'en') {
      const translated = EXERCISE_DESCRIPTIONS_ES_EN[exercise.name];
      if (translated) {
        return translated;
      }
    }

    return exercise.description || '';
  }
}
