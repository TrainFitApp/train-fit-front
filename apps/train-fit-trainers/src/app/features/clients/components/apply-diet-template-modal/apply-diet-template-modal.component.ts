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

  public ngOnInit(): void {
    this.dietTemplateApi.list().subscribe({
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
    if (!this.selectedTemplateId || !this.startDate) return false;
    if (this.endMode === 'fixedDate') return !!this.fixedEndDate;
    if (this.endMode === 'duration') return !!this.durationValue && this.durationValue > 0;
    return true; // indefinite
  }

  public confirm(): void {
    if (!this.canConfirm || !this.selectedTemplateId) return;
    this.state = 'applying';
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
        error: () => {
          this.state = 'loaded';
        },
      });
  }
}
