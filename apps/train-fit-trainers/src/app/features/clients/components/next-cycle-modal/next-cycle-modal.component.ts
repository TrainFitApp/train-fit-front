import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import { DailyDeviation, MacroSet, PhaseCyclesResponse } from '../../../diet-templates/models/diet-suggestion.model';
import { NeedBreakdownComponent } from '../need-breakdown/need-breakdown.component';
import { KCAL_PER_G, MacroAdjustComponent, MacroKey } from '../../../../shared/components/macro-adjust/macro-adjust.component';

const MACRO_KEYS: MacroKey[] = ['protein', 'carbs', 'fat'];

// Ciclos por contenido (docs/plan-ciclos-por-contenido.md) — el siguiente
// ciclo de la fase: qué dice la sugerencia (peso + adherencia del ciclo
// actual, con los desvíos día a día) y con qué kcal se quiere preparar. No
// guarda nada: "Preparar" lleva al builder con el contenido ya escalado, y
// es el builder quien persiste (o no, si no cambia nada). "Descartar" borra
// un ciclo ya preparado para volver a heredar.
//
// "Ajustar macros" (app-macro-adjust, compartido con "Empezar fase"): sin
// tocarlo, los macros siguen al escalado proporcional de las kcal. Si se
// toca, viajan al builder como objetivo del ciclo (referencia con deltas
// por fila) — el escalado de alimentos sigue siendo por kcal.
@Component({
  selector: 'app-next-cycle-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, NeedBreakdownComponent, MacroAdjustComponent],
  templateUrl: './next-cycle-modal.component.html',
  styleUrls: ['./next-cycle-modal.component.scss'],
})
export class NextCycleModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public phaseId!: string;
  @Input() public clientName = 'este cliente';
  @Input() public cycles!: PhaseCyclesResponse;

  public targetKcal = 0;
  public discarding = false;
  public showDeviations = false;
  public showNeed = false;

  // --- Ajustar macros ---
  // Reparto del ciclo actual escalado a las kcal elegidas (lo que hará el
  // builder con los alimentos). Se recalcula al cambiar las kcal, no en un
  // getter: un objeto nuevo en cada ciclo de detección dispararía el
  // ngOnChanges del componente sin parar.
  public proportionalMacros: MacroSet = { protein: 0, carbs: 0, fat: 0 };
  // El reparto tocado a mano (viaja al builder); null = proporcional.
  public adjustedMacros: MacroSet | null = null;
  @ViewChild(MacroAdjustComponent) private macroAdjust?: MacroAdjustComponent;

  constructor(
    private modalController: ModalController,
    private api: DietSuggestionApiService,
    private ionicUtil: IonicUtilService
  ) {}

  public ngOnInit(): void {
    const next = this.cycles.next;
    this.targetKcal = next.override?.profile.kcal ?? (next.suggestion.hasData ? next.suggestion.nextCycleKcal : next.inherits?.profile.kcal ?? 0);
    this.onKcalChange();
  }

  public get next(): PhaseCyclesResponse['next'] {
    return this.cycles.next;
  }

  public get suggestion(): PhaseCyclesResponse['next']['suggestion'] {
    return this.cycles.next.suggestion;
  }

  public get needNow(): PhaseCyclesResponse['next']['needNow'] {
    return this.cycles.next.needNow;
  }

  // Peso real del cliente para los g/kg (el mismo que enseña la referencia).
  public get weightKg(): number | null {
    return this.needNow?.inputs?.weightKg ?? null;
  }

  public get alreadyPrepared(): boolean {
    return !!this.cycles.next.override;
  }

  // Contra qué se compara el cambio: el ciclo actual.
  public get base(): MacroSet & { kcal: number } {
    return this.cycles.current.override.profile;
  }

  public get baseKcal(): number {
    return this.base.kcal;
  }

  // Las kcal de una dieta no son la suma Atwater de sus macros (fibra,
  // alcohol, redondeos del catálogo): en el ciclo actual, macros y kcal
  // guardan una proporción, y el reparto se mueve dentro de ESA parte para
  // no inventar kcal de macro que la dieta no tiene.
  public get macroRatio(): number {
    const baseMacroKcal = MACRO_KEYS.reduce((sum, k) => sum + (this.base[k] || 0) * KCAL_PER_G[k], 0);
    return this.baseKcal > 0 && baseMacroKcal > 0 ? baseMacroKcal / this.baseKcal : 1;
  }

  public get kcalDelta(): number {
    return Math.round(this.targetKcal - this.baseKcal);
  }

  // Cambio en % respecto al ciclo actual (null sin base).
  public get kcalDeltaPct(): number | null {
    return this.pctChange(this.targetKcal, this.baseKcal);
  }

  public get periodLabel(): string {
    return `Del ${this.fmt(this.next.start)} al ${this.fmt(this.next.end)}`;
  }

  public get deviations(): DailyDeviation[] {
    return this.suggestion.deviations || [];
  }

  public deviationLine(d: DailyDeviation): string {
    if (!d.hasPlan) return 'Sin nada pautado ese día';
    const parts: string[] = [];
    if (d.unchecked.length) parts.push(`sin marcar: ${d.unchecked.join(', ')}`);
    if (d.unplanned.length) {
      parts.push(`fuera de pauta: ${d.unplanned.map((u) => `${u.name} ${u.quantity} g`).join(', ')}`);
    }
    return parts.join(' · ');
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }

  public pctLabel(value: number | null): string {
    if (value === null) return '';
    const rounded = Math.round(value * 10) / 10;
    return `${rounded > 0 ? '+' : ''}${rounded.toLocaleString('es-ES', { maximumFractionDigits: 1 })} %`;
  }

  private pctChange(now: number, before: number): number | null {
    if (!(before > 0)) return null;
    return ((now - before) / before) * 100;
  }

  // ---------- kcal ----------

  public onKcalChange(): void {
    const factor = this.baseKcal > 0 ? this.targetKcal / this.baseKcal : 1;
    this.proportionalMacros = {
      protein: (this.base.protein || 0) * factor,
      carbs: (this.base.carbs || 0) * factor,
      fat: (this.base.fat || 0) * factor,
    };
  }

  // ---------- acciones ----------

  public prepare(): void {
    if (!(this.targetKcal > 0)) return;
    // Macros tocados que no cuadran con las kcal: no se prepara.
    const macroError = this.macroAdjust?.validate();
    if (macroError) {
      this.ionicUtil.showErrorToast(macroError, 'Error', 4500);
      return;
    }
    void this.modalController.dismiss(
      {
        kcal: Math.round(this.targetKcal),
        macros: this.adjustedMacros,
      },
      'prepare'
    );
  }

  public discard(): void {
    if (this.discarding) return;
    this.discarding = true;
    this.api.discardNextCycle(this.clientId, this.phaseId).subscribe({
      next: () => {
        this.ionicUtil.showToast({ message: `Ciclo ${this.next.number} descartado: repetirá el anterior`, duration: 2500 });
        void this.modalController.dismiss(null, 'discarded');
      },
      error: (err) => {
        this.discarding = false;
        this.ionicUtil.showErrorToast(err?.error?.message || 'No se pudo descartar el ciclo', 'Error', 3500);
      },
    });
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public fmt(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  }
}
