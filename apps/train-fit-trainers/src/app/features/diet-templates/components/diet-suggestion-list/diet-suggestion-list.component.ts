import { Component, EventEmitter, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietTemplate } from '../../models/diet-template.model';
import {
  DietSuggestionResponse,
  RankedTemplate,
} from '../../models/diet-suggestion.model';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';
import { DietTemplateApiService } from '../../services/diet-template-api.service';
import { filterDietsByName } from '../../utils/diet-name-search';

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
  private readonly translate = inject(TranslateService);

  public readonly results$: Observable<DietSuggestionResponse | null>;
  public readonly selectedId$: Observable<string | null>;
  public readonly loading$: Observable<boolean>;
  // La destacada NO es `rank === 1`: desde que las que incumplen también se
  // listan, la primera de la lista puede ser una que el cliente no puede
  // comer. Ver topSuggestionId$ en el servicio de sesión.
  public readonly topSuggestionId$: Observable<string | null>;

  // Vista previa de solo lectura: el ranking solo trae el perfil de macros,
  // no los menús, así que se pide la plantilla entera al pulsar. El panel lo
  // pinta la página (ver diet-phase-picker): un panel fixed dentro del
  // ion-content de aquí se movería con el scroll de la lista.
  @Output() public previewed = new EventEmitter<{ template: DietTemplate; flags: string[] }>();
  public previewingId: string | null = null;
  public search = '';

  constructor(
    private session: DietSuggestionSessionService,
    private dietTemplateApi: DietTemplateApiService,
    private ionicUtilService: IonicUtilService
  ) {
    this.results$ = this.session.results$;
    this.selectedId$ = this.session.selectedId$;
    this.loading$ = this.session.loading$;
    this.topSuggestionId$ = this.session.topSuggestionId$;
  }

  public onSearch(event: Event): void {
    this.search = String((event as CustomEvent).detail?.value || '');
  }

  public visible(ranked: RankedTemplate[]): RankedTemplate[] {
    return filterDietsByName(ranked, this.search);
  }

  public missingCount(ranked: RankedTemplate[]): number {
    return ranked.filter((t) => t.missingFlags?.length).length;
  }

  public pick(template: RankedTemplate): void {
    this.session.select(template);
  }

  public preview(template: RankedTemplate): void {
    if (this.previewingId) return;
    this.previewingId = template._id;
    this.dietTemplateApi.getById(template._id).subscribe({
      next: (full) => {
        this.previewingId = null;
        this.previewed.emit({ template: full, flags: template.effectiveSuitableFor || [] });
      },
      error: () => {
        this.previewingId = null;
        this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_CARGAR_LA_3'), this.translate.instant('COMMON.ERROR'), 3000);
      },
    });
  }

  public medal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
  }

  public trackById(_i: number, t: RankedTemplate): string {
    return t._id;
  }
}
