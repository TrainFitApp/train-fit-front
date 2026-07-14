import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom, of, timeout, catchError } from 'rxjs';
import { resolveInitialLang } from './i18n.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Preloads the translation table before the app's first route/guard runs, so
// no `translate.instant(...)` call (e.g. AuthErrorService on a cold-start
// network failure) can race the async load and fall back to showing the raw
// translation key. 4s safety timeout: never let a missing/corrupt asset hang
// bootstrap indefinitely.
export function initTranslations(translate: TranslateService) {
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
