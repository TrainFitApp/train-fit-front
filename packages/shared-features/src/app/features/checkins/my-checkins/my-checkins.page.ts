import { Component, OnInit } from '@angular/core';
import { CHECKIN_FIELDS_BY_KEY, CheckinField } from 'src/app/core/constants/checkin-fields';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CheckinCadence, CheckinHistoryEntry, MyCheckinConfig } from './models/my-checkin.model';
import { MyCheckinsApiService } from './services/my-checkins-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

const CADENCE_LABELS: Record<CheckinCadence, string> = {
  weekly: 'Semanal',
  biweekly: 'Quincenal',
  once: 'Una vez',
};

@Component({
  selector: 'app-my-checkins',
  templateUrl: 'my-checkins.page.html',
  styleUrls: ['my-checkins.page.scss'],
})
export class MyCheckinsPage implements OnInit {
  public state: ViewState = 'loading';
  public configs: MyCheckinConfig[] = [];

  public expandedTrainerId: string | null = null;
  public formValues: Record<string, number | string | null> = {};
  public isSubmitting = false;
  public submittedTrainerIds = new Set<string>();

  // coach-tab FASE2 — "formularios completados".
  public history: CheckinHistoryEntry[] = [];
  public showHistory = false;

  constructor(
    private myCheckinsApi: MyCheckinsApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.myCheckinsApi.getMine().subscribe({
      next: (configs) => {
        this.configs = (configs || []).filter((c) => c.enabledFields?.length);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });

    // No bloquea el resto de la pantalla si falla, es una sección aparte.
    this.myCheckinsApi.getHistory().subscribe({
      next: (history) => (this.history = history || []),
      error: () => (this.history = []),
    });
  }

  public toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  public historyTrainerName(entry: CheckinHistoryEntry): string {
    if (!entry.trainer) return 'Un profesional';
    return `${entry.trainer.name} ${entry.trainer.lastname}`.trim();
  }

  public historyFieldLabel(key: string): string {
    return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
  }

  public historyEntries(entry: CheckinHistoryEntry): { label: string; value: number | string }[] {
    return Object.entries(entry.values).map(([key, value]) => ({
      label: this.historyFieldLabel(key),
      value,
    }));
  }

  public trackByHistoryId(_index: number, entry: CheckinHistoryEntry): string {
    return entry._id;
  }

  public trainerName(config: MyCheckinConfig): string {
    if (!config.trainer) return 'Tu entrenador';
    return `${config.trainer.name} ${config.trainer.lastname}`.trim();
  }

  public cadenceLabel(config: MyCheckinConfig): string {
    return CADENCE_LABELS[config.cadence] || config.cadence;
  }

  public fieldsFor(config: MyCheckinConfig): CheckinField[] {
    return config.enabledFields
      .map((key) => CHECKIN_FIELDS_BY_KEY.get(key))
      .filter((f): f is CheckinField => !!f);
  }

  public toggleExpand(config: MyCheckinConfig): void {
    if (this.expandedTrainerId === config.trainerId) {
      this.expandedTrainerId = null;
      return;
    }
    this.expandedTrainerId = config.trainerId;
    this.formValues = {};
  }

  public setScaleValue(key: string, value: number): void {
    this.formValues[key] = value;
  }

  public setTextValue(key: string, value: string): void {
    this.formValues[key] = value;
  }

  public hasAnyValue(): boolean {
    return Object.values(this.formValues).some((v) => v !== null && v !== undefined && v !== ('' as unknown));
  }

  public submitResponse(config: MyCheckinConfig): void {
    if (this.isSubmitting || !this.hasAnyValue()) return;

    // El tipo "text" se envía tal cual (recortado); el resto se envía como
    // número — Number(cadena_vacía) da 0, así que cada campo se valida por
    // su propio tipo en vez de castear todo con Number() a ciegas.
    const values: Record<string, number | string> = {};
    for (const field of this.fieldsFor(config)) {
      const value = this.formValues[field.key];
      if (value === null || value === undefined || value === '') continue;
      if (field.type === 'text') {
        values[field.key] = String(value).trim();
      } else if (!Number.isNaN(Number(value))) {
        values[field.key] = Number(value);
      }
    }
    if (!Object.keys(values).length) return;

    this.isSubmitting = true;
    this.myCheckinsApi.respond(config.trainerId, values).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.expandedTrainerId = null;
        this.submittedTrainerIds.add(config.trainerId);
        this.ionicUtilService.showToast({
          message: `Check-in enviado a ${this.trainerName(config)}`,
          duration: 3000,
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo enviar el check-in',
          'Error',
          3000
        );
      },
    });
  }

  public trackByTrainerId(_index: number, config: MyCheckinConfig): string {
    return config.trainerId;
  }

  public trackByFieldKey(_index: number, field: CheckinField): string {
    return field.key;
  }
}
