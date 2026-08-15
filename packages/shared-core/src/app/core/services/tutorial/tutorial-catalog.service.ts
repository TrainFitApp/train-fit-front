import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TutorialContent } from '../../models/tutorial';
import { TutorialApiService } from './tutorial-api.service';

@Injectable()
export class TutorialCatalogService {
  private readonly _catalog: WritableSignal<TutorialContent[]> = signal([]);
  public readonly catalog = computed(() => this._catalog());

  private loadPromise: Promise<void> | null = null;

  constructor(private readonly tutorialApiService: TutorialApiService) {}

  // Fetch único por sesión, con caché en memoria. Si falla (red, backend
  // caído), el catálogo queda vacío y el sistema de tutoriales simplemente no
  // muestra nada esa sesión — no bloquea el arranque de la app.
  public load(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = firstValueFrom(this.tutorialApiService.getCatalog())
      .then((catalog) => {
        this._catalog.set(catalog || []);
      })
      .catch((error) => {
        console.warn('TutorialCatalogService load error', error);
        this._catalog.set([]);
      });

    return this.loadPromise;
  }

  public getTutorial(key: string): TutorialContent | null {
    return this._catalog().find((tutorial) => tutorial.key === key) || null;
  }
}
