import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DietSuggestionResponse,
  RankedTemplate,
} from '../../models/diet-suggestion.model';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';

// Sugerencias de dieta — la LISTA rankeada de la biblioteca de dietas, en
// la zona principal de diet-phase-picker (ancho completo). Los parámetros y
// la etiqueta "Sugerencia principal" van en el panel derecho
// (diet-suggestion-drawer, chosen-tag) — aquí la #1 se distingue solo con
// la medalla y el resaltado, sin repetir el mismo texto dos veces.
// El estado compartido vive en DietSuggestionSessionService.
@Component({
  selector: 'app-diet-suggestion-list',
  templateUrl: './diet-suggestion-list.component.html',
  styleUrls: ['./diet-suggestion-list.component.scss'],
})
export class DietSuggestionListComponent {
  public readonly results$: Observable<DietSuggestionResponse | null>;
  public readonly selectedId$: Observable<string | null>;
  public readonly loading$: Observable<boolean>;
  // La destacada NO es `rank === 1`: desde que las que incumplen también se
  // listan, la primera de la lista puede ser una que el cliente no puede
  // comer. Ver topSuggestionId$ en el servicio de sesión.
  public readonly topSuggestionId$: Observable<string | null>;

  constructor(private session: DietSuggestionSessionService) {
    this.results$ = this.session.results$;
    this.selectedId$ = this.session.selectedId$;
    this.loading$ = this.session.loading$;
    this.topSuggestionId$ = this.session.topSuggestionId$;
  }

  public missingCount(ranked: RankedTemplate[]): number {
    return ranked.filter((t) => t.missingFlags?.length).length;
  }

  public pick(template: RankedTemplate): void {
    this.session.select(template);
  }

  public medal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
  }

  public trackById(_i: number, t: RankedTemplate): string {
    return t._id;
  }
}
