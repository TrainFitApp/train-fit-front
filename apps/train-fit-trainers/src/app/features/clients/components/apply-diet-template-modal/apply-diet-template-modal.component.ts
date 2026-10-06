import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { DietTemplateApiService } from '../../../diet-templates/services/diet-template-api.service';
import { DietTemplate } from '../../../diet-templates/models/diet-template.model';
import { DietPhaseApiService } from '../../../../shared/services/diet-phase-api.service';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

type ViewState = 'loading' | 'error' | 'loaded' | 'applying';

// Aplicar una plantilla de la biblioteca a ESTE cliente: empieza una fase
// (con su propia copia de los menús) el día que se elija. Solo se elige
// CUÁNDO empieza: una fase acaba cuando empieza la siguiente. Los días se
// pautan bajo demanda, cuando el cliente elige menú.
@Component({
  selector: 'app-apply-diet-template-modal',
  templateUrl: 'apply-diet-template-modal.component.html',
  styleUrls: ['apply-diet-template-modal.component.scss'],
})
export class ApplyDietTemplateModalComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() public clientId!: string;
  @Input() public clientName = this.translate.instant('CLIENTS.ESTE_CLIENTE');

  // Mensaje del 409 del backend: las fechas pisan otra fase.
  public overlapError: string | null = null;

  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  public selectedTemplateId: string | null = null;
  // La fase empieza el día en que se aplica (docs/plan-semanas.md):
  // no hay fecha que elegir aquí. Si el cliente ya tiene una fase en curso,
  // el backend la cierra ayer; las fechas se corrigen luego desde la ficha.
  public readonly startDate = localIsoDate();

  constructor(
    private dietTemplateApi: DietTemplateApiService,
    private dietPhaseApi: DietPhaseApiService,
    private modalController: ModalController
  ) {}

  // Filtro "solo las dietas de este cliente" — activo al abrir: pautando a
  // Pepe, lo que casi siempre quieres aplicarle es material suyo, no toda la
  // biblioteca. Quitarlo añade las plantillas generales (nunca las propias
  // de OTRO cliente, eso lo garantiza el backend).
  public onlyOwnedByClient = true;

  public ngOnInit(): void {
    this.loadTemplates();
  }

  public toggleOwnedFilter(): void {
    this.onlyOwnedByClient = !this.onlyOwnedByClient;
    // La plantilla elegida puede haber desaparecido de la lista nueva — sin
    // esto se quedaría seleccionada de forma invisible y "Aplicar" mandaría
    // algo que ya no se ve.
    this.selectedTemplateId = null;
    this.loadTemplates();
  }

  private loadTemplates(): void {
    this.state = 'loading';
    this.dietTemplateApi
      .list({ forClientId: this.clientId, onlyOwned: this.onlyOwnedByClient })
      .subscribe({
        next: (templates) => {
          this.templates = templates || [];
          this.state = 'loaded';
        },
        error: () => {
          this.state = 'error';
        },
      });
  }

  public select(template: DietTemplate): void {
    this.selectedTemplateId = template._id;
  }

  public get selectedTemplate(): DietTemplate | null {
    return this.templates.find((t) => t._id === this.selectedTemplateId) || null;
  }

  public menuCount(template: DietTemplate): number {
    return template.menus?.length || 0;
  }

  public trackByTemplateId(_index: number, template: DietTemplate): string {
    return template._id;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public get canConfirm(): boolean {
    return !!this.selectedTemplateId;
  }

  public confirm(): void {
    if (!this.canConfirm || !this.selectedTemplateId) return;
    this.state = 'applying';
    this.overlapError = null;
    this.dietPhaseApi
      .create(this.clientId, { templateId: this.selectedTemplateId, startDate: this.startDate })
      .subscribe({
        next: (result) => void this.modalController.dismiss(result, 'confirm'),
        error: (err) => {
          this.state = 'loaded';
          // 409 = las fechas pisan otra fase. Se dice en el propio
          // formulario, junto a las fechas: cerrar el panel con un toast
          // genérico obligaría a reabrirlo y adivinar qué falló.
          this.overlapError =
            err?.status === 409
              ? err?.error?.message || this.translate.instant('CLIENTS.ESAS_FECHAS_SE_SOLAPAN_CON')
              : null;
        },
      });
  }
}
