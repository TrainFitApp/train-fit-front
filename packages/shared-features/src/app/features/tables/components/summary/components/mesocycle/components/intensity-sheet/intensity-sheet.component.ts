import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Set as ExerciseSet } from 'src/app/core/models/set';

export type IntensityEffort = 'rir' | 'fail';
export type IntensityTechnique = 'none' | 'drop' | 'restPause';

// Lo que devuelve la hoja: los mismos campos que escribe ManageSetComponent
// (fallo = expectedRir [-1]; drop y restPause no van juntos).
export interface IntensityResult {
  expectedRir: number[];
  drop: boolean;
  restPause: number | null;
}

const RIR_LIMITS = { min: 0, max: 20 };
const REST_PAUSE_LIMITS = { min: 1, max: 600 };

/**
 * Planner — intensidad de una serie que NO es un RIR normal (fallo, drop set
 * o rest-pause). En la celda RIR esas series no se pueden editar como un
 * rango: antes abrían el editor en línea con un "-1" (el centinela de fallo)
 * que no se entendía. Aquí se elige con un toque.
 */
@Component({
  selector: 'app-intensity-sheet',
  templateUrl: './intensity-sheet.component.html',
  styleUrls: ['./intensity-sheet.component.scss'],
})
export class IntensitySheetComponent implements OnInit {
  @Input() public set!: ExerciseSet;
  @Input() public setNumber = 1;

  public readonly REST_PAUSE_PRESETS = [10, 15, 20, 30];

  public effort: IntensityEffort = 'rir';
  public technique: IntensityTechnique = 'none';
  public rirMin = '';
  public rirMax = '';
  public restPauseSeconds = '';
  public rangeError = false;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    const rir = this.set?.expectedRir || [];
    this.effort = rir[0] === -1 ? 'fail' : 'rir';
    if (this.effort === 'rir') {
      this.rirMin = this.toInput(rir[0]);
      this.rirMax = this.toInput(rir[1]);
    }
    this.technique = this.set?.drop ? 'drop' : this.set?.restPause ? 'restPause' : 'none';
    this.restPauseSeconds = this.set?.restPause ? `${this.set.restPause}` : '';
  }

  public setEffort(effort: IntensityEffort): void {
    this.effort = effort;
    this.rangeError = false;
  }

  public setTechnique(technique: IntensityTechnique): void {
    this.technique = technique;
  }

  public pickRestPause(seconds: number): void {
    this.restPauseSeconds = `${seconds}`;
  }

  // Solo dígitos: son números enteros (RIR 0-20, segundos 1-600).
  public sanitize(field: 'rirMin' | 'rirMax' | 'restPauseSeconds'): void {
    const cleaned = this[field].replace(/[^0-9]/g, '');
    if (cleaned !== this[field]) this[field] = cleaned;
    if (field !== 'restPauseSeconds') this.rangeError = false;
  }

  public get restPauseValue(): number | null {
    const value = Number(this.restPauseSeconds);
    return this.restPauseSeconds !== '' && Number.isFinite(value) ? value : null;
  }

  public get canSave(): boolean {
    if (this.technique !== 'restPause') return true;
    const seconds = this.restPauseValue;
    return seconds !== null && seconds >= REST_PAUSE_LIMITS.min && seconds <= REST_PAUSE_LIMITS.max;
  }

  public cancel(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public save(): void {
    if (!this.canSave) return;
    const expectedRir = this.effort === 'fail' ? [-1] : this.buildRirRange();
    if (expectedRir === null) {
      this.rangeError = true;
      return;
    }
    const result: IntensityResult = {
      expectedRir,
      drop: this.technique === 'drop',
      restPause: this.technique === 'restPause' ? this.restPauseValue : null,
    };
    void this.modalController.dismiss(result, 'confirm');
  }

  // [] = sin RIR (el pre-save del back lo limpia, como en ManageSetComponent).
  // null = rango al revés.
  private buildRirRange(): number[] | null {
    const min = this.parseRir(this.rirMin);
    const max = this.parseRir(this.rirMax);
    if (min !== null && max !== null && max < min) return null;
    const range: number[] = [];
    if (min !== null) range[0] = min;
    if (max !== null) range[1] = max;
    return range;
  }

  private parseRir(raw: string): number | null {
    if (raw === '') return null;
    const value = Number(raw);
    if (!Number.isFinite(value)) return null;
    return Math.min(RIR_LIMITS.max, Math.max(RIR_LIMITS.min, Math.round(value)));
  }

  private toInput(value: number | null | undefined): string {
    return value !== null && value !== undefined && !isNaN(value) && value >= 0 ? `${value}` : '';
  }
}
