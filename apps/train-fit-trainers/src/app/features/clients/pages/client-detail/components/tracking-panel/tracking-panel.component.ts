import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

interface TrackingSchedule {
  _id: string;
  name: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  interval: number;
  time: string;
  active: boolean;
  nextRunAt: string | null;
  enabledFields: string[];
}

interface WeightPlanCompliance {
  intervalDays: number;
  lastWeightAt: string | null;
  lastWeightKg: number | null;
  neverWeighed: boolean;
  upToDate: boolean;
  overdueDays: number;
}

interface TrackingData {
  schedules: TrackingSchedule[];
  weightPlan: { _id: string; intervalDays: number; compliance: WeightPlanCompliance } | null;
  windowDays: number;
  answered: number;
  missed: number;
  open: number;
  unanswered: { _id: string; name: string; scheduledAt: string }[];
}

interface TrackingPreset {
  key: string;
  label: string;
  weightIntervalDays: number;
  wellbeing: { frequency: string; interval: number; fields: string[] };
  measurements: { frequency: string; interval: number; fields: string[] };
}

/**
 * La mitad de "configurar" de la pestaña Seguimiento: pauta de peso, presets
 * y el recuento de lo que se le está quedando sin contestar.
 *
 * Va DEBAJO del calendario de check-ins, en la misma pestaña, y no en una
 * propia dentro de Plan: un check-in es a la vez lo que se pide y lo que
 * vuelve, así que separarlo obligaba a ir y venir entre dos secciones para
 * una sola tarea — y dejaba dos sitios distintos desde los que programar.
 * El orden dentro de la pestaña lo marca la frecuencia de uso: leer las
 * respuestas es semanal, montar el seguimiento se hace una vez.
 */
@Component({
  selector: 'app-tracking-panel',
  templateUrl: './tracking-panel.component.html',
  styleUrls: ['./tracking-panel.component.scss'],
})
export class TrackingPanelComponent implements OnChanges {
  @Input() clientId = '';
  @Input() clientName = '';
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public data: TrackingData | null = null;
  public presets: TrackingPreset[] = [];
  public suggestedPreset: string | null = null;
  public busy = false;

  // Intervalos que un entrenador pide de verdad. Cualquier otro número sigue
  // siendo válido en el backend; esto es el atajo, no el límite.
  public readonly intervalOptions = [1, 2, 3, 7, 14, 30];
  public weightIntervalDraft = 7;
  public showPresets = false;

  // --- Fase 9: pedir algo puntual ---
  // "Necesito tu peso de esta semana" sin comprometerse a una pauta ni
  // montar una plantilla reutilizable. Mismo mecanismo que un preset —
  // CheckinSchedule directo, sin pasar por la Biblioteca — pero con
  // frequency: "once", que ya deja de generar una próxima ocurrencia en
  // cuanto se resuelve la primera (ver checkin-schedule-dates.js#occurrenceAt).
  public showPuntual = false;
  public puntualFields: string[] = [];
  public puntualBusy = false;

  constructor(private http: HttpService, private ionicUtilService: IonicUtilService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId) void this.load();
  }

  public async load(): Promise<void> {
    this.state = 'loading';
    try {
      const [data, presets] = await Promise.all([
        firstValueFrom(this.http.get<TrackingData>(`trainer/clients/${this.clientId}/tracking`)),
        firstValueFrom(
          this.http.get<{ presets: TrackingPreset[]; suggested: string | null }>(
            `trainer/clients/${this.clientId}/tracking-presets`
          )
        ),
      ]);
      this.data = data;
      this.presets = presets.presets;
      this.suggestedPreset = presets.suggested;
      this.weightIntervalDraft = data.weightPlan?.intervalDays ?? 7;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

  // --- Pauta de peso ---
  public async saveWeightPlan(): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    try {
      await firstValueFrom(
        this.http.put(`trainer/clients/${this.clientId}/weight-plan`, {
          intervalDays: this.weightIntervalDraft,
        })
      );
      await this.load();
      this.ionicUtilService.showToast({ message: 'Pauta de peso guardada', duration: 1500 });
    } catch {
      this.ionicUtilService.showErrorToast('No se pudo guardar la pauta', 'Error', 2500);
    } finally {
      this.busy = false;
    }
  }

  public async removeWeightPlan(): Promise<void> {
    if (this.busy) return;
    await this.ionicUtilService.showAlert({
      header: 'Quitar pauta de peso',
      message: `${this.clientName} podrá seguir registrando su peso cuando quiera, pero dejarás de ver si va al día.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Quitar',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.busy = true;
            this.http.delete(`trainer/clients/${this.clientId}/weight-plan`).subscribe({
              next: () => {
                this.busy = false;
                void this.load();
              },
              error: () => {
                this.busy = false;
                this.ionicUtilService.showErrorToast('No se pudo quitar la pauta', 'Error', 2500);
              },
            });
          },
        },
      ],
    });
  }

  // --- Presets ---
  public async applyPreset(preset: TrackingPreset): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    try {
      await firstValueFrom(
        this.http.post(`trainer/clients/${this.clientId}/tracking-preset`, {
          preset: preset.key,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      );
      this.showPresets = false;
      await this.load();
      this.ionicUtilService.showToast({ message: `Seguimiento de ${preset.label} aplicado`, duration: 2000 });
    } catch {
      this.ionicUtilService.showErrorToast('No se pudo aplicar el preset', 'Error', 2500);
    } finally {
      this.busy = false;
    }
  }

  // --- Pedir algo puntual (Fase 9) ---
  public openPuntual(): void {
    this.puntualFields = [];
    this.showPuntual = true;
  }

  public closePuntual(): void {
    this.showPuntual = false;
  }

  public setPuntualFields(fields: string[]): void {
    this.puntualFields = fields;
  }

  public async sendPuntual(): Promise<void> {
    if (!this.puntualFields.length || this.puntualBusy) return;
    this.puntualBusy = true;
    try {
      await firstValueFrom(
        this.http.post(`trainer/clients/${this.clientId}/checkin-schedules`, {
          name: 'Petición puntual',
          enabledFields: this.puntualFields,
          // 00:01 y no la hora actual: garantiza una ocurrencia ya pasada
          // hoy mismo sin depender de a qué hora del día se pulse el botón
          // (mismo motivo por el que los presets usan una hora fija).
          startDate: new Date().toISOString().slice(0, 10),
          time: '00:01',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          frequency: 'once',
          interval: 1,
        })
      );
      this.showPuntual = false;
      await this.load();
      this.ionicUtilService.showToast({ message: 'Enviado. Tu cliente ya puede contestarlo', duration: 2000 });
    } catch (error: unknown) {
      this.ionicUtilService.showErrorToast(
        (error as { error?: { message?: string } })?.error?.message || 'No se pudo enviar la petición',
        'Error',
        2500
      );
    } finally {
      this.puntualBusy = false;
    }
  }

  // --- Presentación ---
  public frequencyLabel(schedule: { frequency: string; interval: number }): string {
    const cada = schedule.interval > 1 ? `Cada ${schedule.interval} ` : 'Cada ';
    switch (schedule.frequency) {
      case 'once':
        return 'Una sola vez';
      case 'daily':
        return schedule.interval > 1 ? `${cada}días` : 'Cada día';
      case 'monthly':
        return schedule.interval > 1 ? `${cada}meses` : 'Cada mes';
      default:
        return schedule.interval > 1 ? `${cada}semanas` : 'Cada semana';
    }
  }

  public intervalLabel(days: number): string {
    if (days === 1) return 'Cada día';
    if (days === 7) return 'Cada semana';
    if (days === 14) return 'Cada 2 semanas';
    if (days === 30) return 'Cada mes';
    return `Cada ${days} días`;
  }

  public presetSummary(preset: TrackingPreset): string {
    return [
      `Peso ${this.intervalLabel(preset.weightIntervalDays).toLowerCase()}`,
      `bienestar ${this.frequencyLabel(preset.wellbeing).toLowerCase()}`,
      `medidas ${this.frequencyLabel(preset.measurements).toLowerCase()}`,
    ].join(' · ');
  }

  public trackById(_index: number, item: { _id: string }): string {
    return item._id;
  }
}
