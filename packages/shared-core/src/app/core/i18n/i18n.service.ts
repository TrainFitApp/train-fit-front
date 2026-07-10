import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export const DEFAULT_LANG = new InjectionToken<string>('DEFAULT_LANG');

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLang = new BehaviorSubject<string>('es');
  lang$ = this.currentLang.asObservable();

  constructor(
    private translate: TranslateService,
    @Optional() @Inject(DEFAULT_LANG) private defaultLang?: string
  ) {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('trainfit_lang') : null;
    const detected = this.detectBrowserLang();
    const lang = saved || detected || 'es';
    translate.use(lang);
    this.currentLang.next(lang);
  }

  switchLang(lang: 'es' | 'en') {
    this.translate.use(lang);
    this.currentLang.next(lang);
    try { localStorage.setItem('trainfit_lang', lang); } catch {}
  }

  get current(): string {
    return this.currentLang.value;
  }

  private detectBrowserLang(): string | null {
    try {
      const nav = navigator.language || (navigator as any).userLanguage;
      if (nav?.startsWith('en')) return 'en';
      if (nav?.startsWith('es')) return 'es';
    } catch {}
    return null;
  }
}
