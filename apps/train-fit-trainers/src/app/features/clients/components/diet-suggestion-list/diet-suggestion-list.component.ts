import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DietaryFlag,
  DietSuggestionResponse,
  RankedTemplate,
} from '../../../diet-templates/models/diet-suggestion.model';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';

const FLAG_LABELS: Record<DietaryFlag, string> = {
  vegan: 'Vegana',
  vegetarian: 'Vegetariana',
  lactoseFree: 'Sin lactosa',
  glutenFree: 'Sin gluten',
};

// Sugerencias de dieta — la LISTA rankeada, en la zona principal de la
// sección de nutrición (ancho completo). Los parámetros y la sugerencia
// principal van en el panel derecho (diet-suggestion-drawer). El estado
// compartido vive en DietSuggestionSessionService.
@Component({
  selector: 'app-diet-suggestion-list',
  templateUrl: './diet-suggestion-list.component.html',
  styleUrls: ['./diet-suggestion-list.component.scss'],
})
export class DietSuggestionListComponent {
  public readonly results$: Observable<DietSuggestionResponse | null>;
  public readonly selectedId$: Observable<string | null>;
  public readonly loading$: Observable<boolean>;

  public showHidden = false;

  constructor(private session: DietSuggestionSessionService) {
    this.results$ = this.session.results$;
    this.selectedId$ = this.session.selectedId$;
    this.loading$ = this.session.loading$;
  }

  public pick(template: RankedTemplate): void {
    this.session.select(template);
  }

  public medal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + value;
  }

  public flagLabel(flag: DietaryFlag): string {
    return FLAG_LABELS[flag] ?? flag;
  }

  public trackById(_i: number, t: RankedTemplate): string {
    return t._id;
  }
}
