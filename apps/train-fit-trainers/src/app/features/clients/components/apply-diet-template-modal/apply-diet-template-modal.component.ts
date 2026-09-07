import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DietTemplateApiService } from '../../../diet-templates/services/diet-template-api.service';
import { DietTemplate } from '../../../diet-templates/models/diet-template.model';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { PlanEndMode, DurationUnit } from '../../../../shared/models/plan-assignment.model';

type ViewState = 'loading' | 'error' | 'loaded' | 'applying';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysToIsoDate(isoDate: string, deltaDays: number): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}

// Auditoría de arquitectura (nutrición, Fase 8) — aplicar un plan ya
// construido a ESTE cliente eligiendo no solo cuándo EMPIEZA, sino cuándo
// TERMINA (o si no termina): fecha exacta, duración, o indefinido. Antes
// solo se pedía la fecha de inicio y el backend materializaba cada día de
// golpe; ahora se crea una única PlanAssignment (POST .../apply) y los días
// se resuelven bajo demanda (ver diet-day-resolver.js).
@Component({
  selector: 'app-apply-diet-template-modal',
  templateUrl: 'apply-diet-template-modal.component.html',
  styleUrls: ['apply-diet-template-modal.component.scss'],
})
export class ApplyDietTemplateModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public clientName = 'este cliente';

  // "Crear dieta" reusa este mismo modal solo para la parte de fecha/nombre
  // — el contenido no existe todavía, se construye después en el builder
  // (ver client-detail.page.ts#openCreateDietModal). En este modo no hay
  // plantilla que listar ni que aplicar: confirm() solo devuelve lo
  // recogido aquí, nunca llama a la API.
  @Input() public forDirectCreate = false;
  public name = '';

  // Fecha con la que arranca el formulario cuando se encadena una fase: el
  // día siguiente al fin de la anterior, para que no quede un hueco sin
  // plan ni dos planes el mismo día. Sin fase previa (o si acaba
  // "indefinido"), hoy.
  @Input() public set suggestedStartDate(value: string | null) {
    if (value) this.startDate = value;
  }

  // Lo que se enseña bajo el campo para justificar esa fecha.
  @Input() public previousPhaseEnd: string | null = null;
  @Input() public previousPhaseName = '';

  // Rango elegido en el calendario: fija inicio y fin de una vez y cambia
  // el modo de fin a "fecha exacta", que es lo que acaba de decidirse.
  public onRangePicked(range: { start: string; end: string }): void {
    this.startDate = range.start;
    this.fixedEndDate = range.end;
    this.endMode = 'fixedDate';
    this.overlapError = null;
  }

  // Mensaje del 409 del backend: las fechas pisan otra fase.
  public overlapError: string | null = null;

  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  public selectedTemplateId: string | null = null;
  public startDate = todayIsoDate();

  public endMode: PlanEndMode = 'duration';
  public fixedEndDate = '';
  public durationValue = 8;
  public durationUnit: DurationUnit = 'weeks';

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
    if (this.forDirectCreate) {
      this.state = 'loaded';
      return;
    }
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

  public dayCount(template: DietTemplate): number {
    return template.days?.length || 0;
  }

  public trackByTemplateId(_index: number, template: DietTemplate): string {
    return template._id;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public get computedEndDate(): string | null {
    if (this.endMode === 'indefinite') return null;
    if (this.endMode === 'fixedDate') return this.fixedEndDate || null;
    if (!this.durationValue) return null;
    const days = this.durationUnit === 'weeks' ? this.durationValue * 7 : this.durationValue;
    return addDaysToIsoDate(this.startDate, days - 1);
  }

  public get canConfirm(): boolean {
    // Crear dieta: solo hace falta el nombre — no se eligen fechas aquí, la
    // dieta se crea como material propio del cliente y se aplica después.
    if (this.forDirectCreate) return !!this.name.trim();

    if (!this.selectedTemplateId) return false;
    if (!this.startDate) return false;
    if (this.endMode === 'fixedDate') return !!this.fixedEndDate;
    if (this.endMode === 'duration') return !!this.durationValue && this.durationValue > 0;
    return true; // indefinite
  }

  public confirm(): void {
    if (!this.canConfirm) return;

    if (this.forDirectCreate) {
      // Nada que aplicar todavía — solo se recoge el nombre; el contenido se
      // construye después en el builder, que la guarda como dieta propia del
      // cliente (sin fechas: eso se decide al aplicarla como fase).
      void this.modalController.dismiss({ name: this.name.trim() }, 'confirm');
      return;
    }

    if (!this.selectedTemplateId) return;
    this.state = 'applying';
    this.overlapError = null;
    this.planAssignmentApi
      .apply(this.clientId, this.selectedTemplateId, {
        startDate: this.startDate,
        endMode: this.endMode,
        fixedEndDate: this.endMode === 'fixedDate' ? this.fixedEndDate : undefined,
        durationValue: this.endMode === 'duration' ? this.durationValue : undefined,
        durationUnit: this.endMode === 'duration' ? this.durationUnit : undefined,
      })
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
