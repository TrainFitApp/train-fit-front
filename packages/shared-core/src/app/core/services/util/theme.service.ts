import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEMES, Theme } from 'src/app/shared/models/theme';

export type ColorMode = 'auto' | 'dark' | 'light';

/**
 * La app es siempre oscura, sea cual sea el modo del sistema operativo o lo
 * que el usuario tenga guardado. No hay selector de tema.
 */
@Injectable()
export class ThemeService {
  private _theme$ = new BehaviorSubject<Theme>(THEMES.dark.id);

  public get getTheme(): Theme {
    return this._theme$.value;
  }

  constructor(rendererFactory: RendererFactory2) {
    rendererFactory
      .createRenderer(null, null)
      .setAttribute(document.body, 'color-theme', THEMES.dark.id);
  }

  public get theme(): Observable<string> {
    return this._theme$.asObservable();
  }
}
