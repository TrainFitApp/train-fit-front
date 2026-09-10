import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DietSuggestionResponse,
  RankedTemplate,
} from '../../diet-templates/models/diet-suggestion.model';

// Estado compartido entre las TRES piezas del flujo "empezar fase" cuando se
// elige una dieta:
//   · client-detail.page  — abre/cierra el modo, pinta la lista
//   · diet-suggestion-list — la lista rankeada (zona principal)
//   · diet-suggestion-drawer — panel derecho con parámetros + sugerencia
//
// Un `ion-modal` se instancia en el injector raíz, así que un servicio
// component-scoped no llegaría al panel — de ahí `providedIn: 'root'` + un
// reset() explícito al abrir cada sesión.
@Injectable({ providedIn: 'root' })
export class DietSuggestionSessionService {
  private readonly _results = new BehaviorSubject<DietSuggestionResponse | null>(null);
  private readonly _selectedId = new BehaviorSubject<string | null>(null);
  private readonly _loading = new BehaviorSubject<boolean>(false);

  public readonly results$: Observable<DietSuggestionResponse | null> = this._results.asObservable();
  public readonly selectedId$: Observable<string | null> = this._selectedId.asObservable();
  public readonly loading$: Observable<boolean> = this._loading.asObservable();

  public get results(): DietSuggestionResponse | null {
    return this._results.value;
  }
  public get selectedId(): string | null {
    return this._selectedId.value;
  }

  public reset(): void {
    this._results.next(null);
    this._selectedId.next(null);
    this._loading.next(false);
  }

  public setLoading(value: boolean): void {
    this._loading.next(value);
  }

  public setResults(results: DietSuggestionResponse | null): void {
    this._results.next(results);
    // Si la selección ya no está en la lista nueva, se limpia.
    const id = this._selectedId.value;
    if (id && !results?.ranked.some((r) => r._id === id)) {
      this._selectedId.next(null);
    }
  }

  public select(template: RankedTemplate | string | null): void {
    let id: string | null;
    if (template === null) id = null;
    else if (typeof template === 'string') id = template;
    else id = template._id;
    this._selectedId.next(this._selectedId.value === id ? null : id);
  }
}
