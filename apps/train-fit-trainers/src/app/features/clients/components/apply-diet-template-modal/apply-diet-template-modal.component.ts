import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DietTemplateApiService } from '../../../diet-templates/services/diet-template-api.service';
import { DietTemplate } from '../../../diet-templates/models/diet-template.model';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';

type ViewState = 'loading' | 'error' | 'loaded' | 'applying';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Auditoría de arquitectura (nutrición, Fase 8) — aplicar un plan ya
// construido a ESTE cliente eligiendo cuándo EMPIEZA y cuánto se estima que
// dura. Antes solo se pedía la fecha de inicio y el backend materializaba
// cada día de golpe; ahora se crea una única PlanAssignment (POST .../apply)
// y los días se resuelven bajo demanda (ver diet-day-resolver.js).
//
// Semanas (2026-09): solo se elige CUÁNDO empieza. No hay
// duración ni fin estimado — una fase acaba cuando empieza la siguiente.
//
// "Crear dieta" (ficha del cliente) usaba este mismo modal para pedir
// nombre + fechas antes de pasar al builder; ya no — el nutricionista va
// improvisando semana a semana y esa duración estimada no le servía de nada
// (ver client-detail.page.ts#goToCreateDiet, que ahora navega directo al
// builder). Este modal vuelve a ser solo "aplicar una plantilla concreta".
@Component({
  selector: 'app-apply-diet-template-modal',
  templateUrl: 'apply-diet-template-modal.component.html',
  styleUrls: ['apply-diet-template-modal.component.scss'],
})
export class ApplyDietTemplateModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public clientName = 'este cliente';

  // Mensaje del 409 del backend: las fechas pisan otra fase.
  public overlapError: string | null = null;

  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  public selectedTemplateId: string | null = null;
  // La fase empieza el día en que se aplica (docs/plan-semanas.md):
  // no hay fecha que elegir aquí. Si el cliente ya tiene una fase en curso,
  // el backend la cierra ayer; las fechas se corrigen luego desde la ficha.
  public readonly startDate = todayIsoDate();

  constructor(
    private dietTemplateApi: DietTemplateApiService,
    private planAssignmentApi: PlanAssignmentApiService,
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
    this.planAssignmentApi
      .apply(this.clientId, this.selectedTemplateId, { startDate: this.startDate })
      .subscribe({
        next: (result) => void this.modalController.dismiss(result, 'confirm'),
        error: (err) => {
          this.state = 'loaded';
          // 409 = las fechas pisan otra fase. Se dice en el propio
          // formulario, junto a las fechas: cerrar el panel con un toast
          // genérico obligaría a reabrirlo y adivinar qué falló.
          this.overlapError =
            err?.status === 409
              ? err?.error?.message || 'Esas fechas se solapan con otra fase.'
              : null;
        },
      });
  }
}
