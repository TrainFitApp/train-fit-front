import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export interface QuickSeriesResult {
  count: number;
  expectedTime?: string;
  expectedDistance?: number | null;
  repsMin?: number;
  repsMax?: number;
  rirMin?: number;
  rirMax?: number;
}

// "Generar series por esquema" (2026-08) — sustituye al ion-alert nativo de
// ConfigExercisePage#openQuickSeriesGenerator() (solo trainers/Planner, ver
// `showQuickSeriesGenerator = this.plannerMode` en workout.component.ts).
// Motivo del cambio: un ion-alert nativo no puede llevar ni el icono de
// ayuda RIR ya usado en esta misma pantalla (<app-glossary-info>, un
// componente Angular real, incompatible con AlertInput) ni etiquetas que no
// desaparezcan al escribir (placeholder es lo único que admite un
// AlertInput, y se pierde en cuanto el campo deja de estar vacío) — la
// pantalla se quedaba con "solo inputs, sin ninguna información". Mismo
// patrón de modal ya usado en esta app (ClipboardExercisesModalComponent):
// @Input de config, ModalController.dismiss(data, 'confirm'|'cancel').
@Component({
  selector: 'app-quick-series-generator-modal',
  templateUrl: './quick-series-generator-modal.component.html',
  styleUrls: ['./quick-series-generator-modal.component.scss'],
})
export class QuickSeriesGeneratorModalComponent {
  @Input() public isCardio = false;
  @Input() public isIsometric = false;

  public count = 3;
  public repsMin = 8;
  public repsMax = 12;
  public rirMin = 1;
  public rirMax = 2;
  public expectedTime = '';
  public expectedDistance: number | null = null;

  constructor(
    private modalController: ModalController,
    private translate: TranslateService
  ) {}

  // Vista previa en vivo — mismo criterio que schemeSummary() en el creador
  // de plantillas (routine-builder/template-scheme.util.ts): reforzar en el
  // propio dato ("3 × 8-12 reps") lo que el párrafo de arriba ya explica en
  // palabras (todas las series son iguales), no un texto nuevo que
  // memorizar aparte.
  public get previewText(): string {
    const count = this.safeCount;
    if (this.isCardio) {
      const time = this.expectedTime.trim() || '—';
      const distance = this.expectedDistance ? ` · ${this.expectedDistance} km` : '';
      return this.translate.instant('EXERCISE_CONFIG.QUICK_SERIES_PREVIEW_TIME', { count, time }) + distance;
    }
    if (this.isIsometric) {
      const time = this.expectedTime.trim() || '—';
      return this.translate.instant('EXERCISE_CONFIG.QUICK_SERIES_PREVIEW_TIME', { count, time });
    }
    return this.translate.instant('EXERCISE_CONFIG.QUICK_SERIES_PREVIEW_NORMAL', {
      count,
      repsMin: this.repsMin,
      repsMax: this.repsMax,
      rirMin: this.rirMin,
      rirMax: this.rirMax,
    });
  }

  private get safeCount(): number {
    return Math.max(1, Math.min(20, Math.round(this.count) || 1));
  }

  // Steppers +/- : mismo criterio que incrementCounter/incrementEndCounter
  // en manage-set.component.ts (rango RIR/reps de una serie individual) —
  // el par min/max nunca se cruza, mover el mínimo por encima del máximo
  // arrastra al máximo con él en vez de dejar un rango invertido.
  public incrementCount(): void {
    this.count = Math.min(20, (this.count || 0) + 1);
  }

  public decrementCount(): void {
    this.count = Math.max(1, (this.count || 1) - 1);
  }

  public incrementRepsMin(): void {
    this.repsMin = (this.repsMin || 0) + 1;
    if (this.repsMax < this.repsMin) this.repsMax = this.repsMin;
  }

  public decrementRepsMin(): void {
    if (this.repsMin > 0) this.repsMin--;
  }

  public incrementRepsMax(): void {
    this.repsMax = Math.max(this.repsMin, (this.repsMax || this.repsMin) + 1);
  }

  public decrementRepsMax(): void {
    if (this.repsMax > this.repsMin) this.repsMax--;
  }

  public incrementRirMin(): void {
    this.rirMin = (this.rirMin || 0) + 1;
    if (this.rirMax < this.rirMin) this.rirMax = this.rirMin;
  }

  public decrementRirMin(): void {
    if (this.rirMin > 0) this.rirMin--;
  }

  public incrementRirMax(): void {
    this.rirMax = Math.max(this.rirMin, (this.rirMax || this.rirMin) + 1);
  }

  public decrementRirMax(): void {
    if (this.rirMax > this.rirMin) this.rirMax--;
  }

  public dismiss(): void {
    this.modalController.dismiss(undefined, 'cancel');
  }

  public confirm(): void {
    const result: QuickSeriesResult = { count: this.safeCount };

    if (this.isCardio) {
      result.expectedTime = this.expectedTime.trim();
      if (this.expectedDistance !== null && this.expectedDistance !== undefined) {
        result.expectedDistance = this.expectedDistance;
      }
    } else if (this.isIsometric) {
      result.expectedTime = this.expectedTime.trim();
    } else {
      const repsMin = Math.max(0, Math.round(this.repsMin) || 0);
      result.repsMin = repsMin;
      result.repsMax = Math.max(repsMin, Math.round(this.repsMax) || repsMin);
      const rirMin = Math.max(0, Math.round(this.rirMin) || 0);
      result.rirMin = rirMin;
      result.rirMax = Math.max(rirMin, Math.round(this.rirMax) || rirMin);
    }

    this.modalController.dismiss(result, 'confirm');
  }
}
