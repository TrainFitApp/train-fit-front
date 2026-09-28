import { Component, Input, OnChanges } from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  PAIN_LEVELS,
  PAIN_LIMITING_LEVEL,
  PAIN_ZONES,
  PainEntry,
  PainThreshold,
  painLabelFor,
  worstByZone,
} from 'src/app/core/constants/pain';
import { ClientDetailApiService } from '../../services/client-detail-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

// Tramos de la escala 0-10 según los dos umbrales, para la barra del panel.
interface ThresholdBand {
  kind: 'normal' | 'caution' | 'stop';
  from: number;
  to: number;
}

interface ZoneSummary {
  zone: string;
  // El nivel MÁS ALTO del periodo. No la media: una rodilla que un día llega
  // a 8 es un problema aunque el resto de la semana esté a 1.
  worst: number;
  lastDate: string;
  // El nivel del último día con registro, para ver si va a mejor o a peor.
  latest: number | null;
  threshold: PainThreshold | null;
}

/**
 * Movimiento 3 Coach Pro — lo que el cliente apunta cada día en su registro
 * de dolor, más los umbrales que fija el entrenador.
 *
 * Las dos cosas juntas y no en dos tarjetas: un "6 en rodilla derecha" no
 * significa nada hasta que se lee al lado de "puede trabajar hasta 3, para a
 * partir de 5". Es la pareja la que dice qué hacer.
 */
@Component({
  selector: 'app-pain-panel',
  templateUrl: 'pain-panel.component.html',
  styleUrls: ['pain-panel.component.scss'],
})
export class PainPanelComponent implements OnChanges {
  @Input() public clientId = '';

  public state: ViewState = 'loading';
  public days = 28;
  public summaries: ZoneSummary[] = [];
  public entries: PainEntry[] = [];

  public readonly zones = PAIN_ZONES;
  public readonly levels = PAIN_LEVELS;
  public readonly limitingLevel = PAIN_LIMITING_LEVEL;

  // --- Panel de umbral ---
  public editingZone: string | null = null;
  public formWork = 3;
  public formPain = 5;
  public formNote = '';
  public isSaving = false;

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnChanges(): void {
    if (this.clientId) this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.clientDetailApi.getClientPain(this.clientId, this.days).subscribe({
      next: ({ entries, thresholds }) => {
        this.entries = entries || [];
        this.summaries = this.buildSummaries(entries || [], thresholds || []);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private buildSummaries(entries: PainEntry[], thresholds: PainThreshold[]): ZoneSummary[] {
    const thresholdByZone = new Map(thresholds.map((threshold) => [threshold.zone, threshold]));

    // El último valor de cada zona: las entradas llegan ordenadas por fecha
    // ascendente, así que la última que se ve de cada zona es la más nueva.
    const latestByZone = new Map<string, number>();
    for (const entry of entries) latestByZone.set(entry.zone, entry.level);

    const summaries: ZoneSummary[] = worstByZone(entries).map((worst) => ({
      zone: worst.zone,
      worst: worst.level,
      lastDate: worst.lastDate,
      latest: latestByZone.has(worst.zone) ? (latestByZone.get(worst.zone) as number) : null,
      threshold: thresholdByZone.get(worst.zone) || null,
    }));

    // Zonas con umbral fijado pero SIN registros en el periodo: hay que
    // seguir viéndolas. Un umbral que el entrenador puso y no aparece por
    // ningún lado parecería que se ha perdido.
    for (const threshold of thresholds) {
      if (summaries.some((summary) => summary.zone === threshold.zone)) continue;
      summaries.push({
        zone: threshold.zone,
        worst: 0,
        lastDate: '',
        latest: null,
        threshold,
      });
    }

    return summaries;
  }

  // --- Lectura ---
  public labelFor(level: number): string {
    return painLabelFor(level);
  }

  public isOverThreshold(summary: ZoneSummary): boolean {
    // Con umbral fijado manda el umbral: es el criterio de ESTE entrenador
    // para ESTE cliente, y por eso lo escribió. Sin él, el límite genérico.
    const limit = summary.threshold?.painLevel ?? this.limitingLevel;
    return summary.worst >= limit;
  }

  public trendFor(summary: ZoneSummary): 'mejor' | 'peor' | 'igual' | null {
    if (summary.latest === null) return null;
    if (summary.latest < summary.worst) return 'mejor';
    if (summary.latest > summary.worst) return 'peor';
    return 'igual';
  }

  public thresholdLabel(summary: ZoneSummary): string {
    if (!summary.threshold) return 'Sin umbrales fijados';
    return `Normal hasta ${summary.threshold.workLevel} · Parar desde ${summary.threshold.painLevel}`;
  }

  // Zonas que todavía no aparecen en la tabla, para el desplegable de
  // "añadir umbral". Ofrecer las que ya están duplicaría filas.
  public get zonesWithoutRow(): string[] {
    const used = new Set(this.summaries.map((summary) => summary.zone));
    return this.zones.filter((zone) => !used.has(zone));
  }

  // --- Edición del umbral ---
  public openThreshold(zone: string, existing: PainThreshold | null): void {
    this.editingZone = zone;
    this.formWork = existing?.workLevel ?? 3;
    this.formPain = existing?.painLevel ?? 5;
    this.formNote = existing?.note || '';
    // Umbrales antiguos con los dos iguales (el back lo admite): ese nivel
    // diría "sigue" y "para" a la vez. Se abre con el de trabajo un punto
    // por debajo.
    if (this.formWork >= this.formPain) {
      if (this.formPain === 0) this.formPain = 1;
      this.formWork = this.formPain - 1;
    }
  }

  public closeThreshold(): void {
    this.editingZone = null;
  }

  // Parar siempre por encima de entrenar normal: si no, un mismo nivel diría
  // "sigue" y "para" a la vez. Antes el otro selector se movía solo y parecía
  // un fallo; ahora los niveles imposibles salen bloqueados y el panel explica
  // por qué.
  public isWorkBlocked(level: number): boolean {
    return level >= this.formPain;
  }

  public isPainBlocked(level: number): boolean {
    return level <= this.formWork;
  }

  public setFormWork(level: number): void {
    if (!this.isWorkBlocked(level)) this.formWork = level;
  }

  public setFormPain(level: number): void {
    if (!this.isPainBlocked(level)) this.formPain = level;
  }

  // Normal (0..trabajo) · con cuidado (entre los dos, si hay hueco) · parar
  // (dolor..10).
  public get formBands(): ThresholdBand[] {
    const bands: ThresholdBand[] = [{ kind: 'normal', from: 0, to: this.formWork }];
    if (this.formPain - this.formWork > 1) {
      bands.push({ kind: 'caution', from: this.formWork + 1, to: this.formPain - 1 });
    }
    bands.push({ kind: 'stop', from: this.formPain, to: 10 });
    return bands;
  }

  public bandRange(band: ThresholdBand): string {
    return band.from === band.to ? `${band.from}` : `${band.from}–${band.to}`;
  }

  public trackByBand(_index: number, band: ThresholdBand): string {
    return band.kind;
  }

  public saveThreshold(): void {
    if (!this.editingZone || this.isSaving) return;
    this.isSaving = true;

    this.clientDetailApi
      .savePainThreshold(this.clientId, {
        zone: this.editingZone,
        workLevel: this.formWork,
        painLevel: this.formPain,
        note: this.formNote.trim(),
      })
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.editingZone = null;
          this.load();
        },
        error: () => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast('No se pudo guardar el umbral', 'Error', 2500);
        },
      });
  }

  public async confirmRemoveThreshold(summary: ZoneSummary): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Quitar umbrales',
      message: `¿Seguro que quieres quitar los umbrales de "${summary.zone}"? Lo que el cliente haya apuntado se conserva.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Quitar',
          cssClass: 'alert-button-danger',
          handler: () => this.removeThreshold(summary),
        },
      ],
    });
  }

  private removeThreshold(summary: ZoneSummary): void {
    this.clientDetailApi.removePainThreshold(this.clientId, summary.zone).subscribe({
      next: () => this.load(),
      error: () =>
        this.ionicUtilService.showErrorToast('No se pudo quitar el umbral', 'Error', 2500),
    });
  }

  public trackByZone(_index: number, summary: ZoneSummary): string {
    return summary.zone;
  }

  public trackByLevel(_index: number, level: number): number {
    return level;
  }
}
