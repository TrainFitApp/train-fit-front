import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DietSuggestionResponse,
  RankedTemplate,
} from '../models/diet-suggestion.model';

// Estado compartido entre las TRES piezas del flujo "empezar fase" cuando se
// elige una dieta:
//   · diet-phase-picker.page — la pantalla: abre el panel y pinta la lista
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
  private readonly _topSuggestionId = new BehaviorSubject<string | null>(null);

  public readonly results$: Observable<DietSuggestionResponse | null> = this._results.asObservable();
  public readonly selectedId$: Observable<string | null> = this._selectedId.asObservable();
  public readonly loading$: Observable<boolean> = this._loading.asObservable();
  // La que el panel propone aplicar y la lista destaca: la primera que
  // CUMPLE las restricciones, no la primera a secas. Desde que las que no
  // cumplen también se listan (con su aviso), `ranked[0]` puede ser una que
  // el cliente no puede comer — y este flujo aplica la dieta de un click.
  // null = no hay ninguna compatible; entonces no se propone ninguna y hay
  // que elegirla a mano.
  public readonly topSuggestionId$: Observable<string | null> = this._topSuggestionId.asObservable();

  public get results(): DietSuggestionResponse | null {
    return this._results.value;
  }
  public get selectedId(): string | null {
    return this._selectedId.value;
  }
  public get topSuggestionId(): string | null {
    return this._topSuggestionId.value;
  }

  public reset(): void {
    this._results.next(null);
    this._selectedId.next(null);
    this._loading.next(false);
    this._topSuggestionId.next(null);
  }

  public setLoading(value: boolean): void {
    this._loading.next(value);
  }

  public setResults(results: DietSuggestionResponse | null): void {
    this._results.next(results);
    const compatible = (results?.ranked || []).find((t) => !t.missingFlags?.length);
    this._topSuggestionId.next(compatible?._id ?? null);
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
