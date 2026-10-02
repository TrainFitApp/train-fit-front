import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, firstValueFrom, forkJoin, of, timeout, catchError, map } from 'rxjs';
import { resolveInitialLang } from './i18n.service';
import { applyCatalogTranslations } from './localized-catalog';

type TranslationTable = Record<string, unknown>;

function isPlainObject(value: unknown): value is TranslationTable {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(base: TranslationTable, override: TranslationTable): TranslationTable {
  const result: TranslationTable = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = isPlainObject(value) && isPlainObject(result[key])
      ? deepMerge(result[key] as TranslationTable, value)
      : value;
  }
  return result;
}

// Two layers per language: the texts shared by the three apps live in
// packages/shared-core/src/assets/i18n (copied to assets/i18n/shared by each
// angular.json) and every app keeps its own keys, plus the few shared texts it
// words differently, in src/assets/i18n. The app layer wins on conflict.
export class MergedTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): Observable<TranslationTable> {
    const load = (url: string) =>
      this.http.get<TranslationTable>(url).pipe(catchError(() => of({} as TranslationTable)));
    return forkJoin([
      load(`./assets/i18n/shared/${lang}.json`),
      load(`./assets/i18n/${lang}.json`),
    ]).pipe(map(([shared, app]) => deepMerge(shared, app)));
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new MergedTranslateLoader(http);
}

// Preloads the translation table before the app's first route/guard runs, so
// no `translate.instant(...)` call (e.g. AuthErrorService on a cold-start
// network failure) can race the async load and fall back to showing the raw
// translation key. 4s safety timeout: never let a missing/corrupt asset hang
// bootstrap indefinitely.
export function initTranslations(translate: TranslateService) {
  // Code-defined catalogs (check-in fields, muscles…) follow every language
  // load, including later switches from the settings screen.
  translate.onLangChange.subscribe(({ lang, translations }) => applyCatalogTranslations(translations, lang));
  return () =>
    firstValueFrom(
      translate.use(resolveInitialLang()).pipe(
        timeout(4000),
        catchError(() => of(null))
      )
    );
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslations,
      deps: [TranslateService],
      multi: true,
    },
  ],
})
export class I18nModule {}
