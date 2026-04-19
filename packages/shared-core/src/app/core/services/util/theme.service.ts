import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEMES, Theme } from 'src/app/shared/models/theme';

export type ColorMode = 'auto' | 'dark' | 'light';

@Injectable()
export class ThemeService {
  private renderer: Renderer2;
  private readonly THEME_KEY = 'theme';

  private _theme$ = new BehaviorSubject<ColorMode>(THEMES.light.id);

  public get getTheme(): Theme {
    return this._theme$.value as Theme;
  }

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const colorMode: ColorMode = localStorage.getItem(
      this.THEME_KEY
    ) as ColorMode;
    if (colorMode) {
      this._theme$.next(colorMode);
      this.renderer.setAttribute(document.body, 'color-theme', colorMode);
    }
  }

  public toggleColorMode(color: ColorMode) {
    localStorage.setItem(this.THEME_KEY, color);
    this._theme$.next(color);
    this.renderer.setAttribute(document.body, 'color-theme', color);
  }

  public get theme(): Observable<string> {
    return this._theme$.asObservable();
  }
}
