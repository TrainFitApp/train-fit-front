import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import { DailyDeviation, MacroSet, PhaseCyclesResponse } from '../../../diet-templates/models/diet-suggestion.model';
import { NeedBreakdownComponent } from '../need-breakdown/need-breakdown.component';

type MacroKey = keyof MacroSet;

// Atwater — mismo trío que nutrition-target.js#KCAL_PER_G.
const KCAL_PER_G: Record<MacroKey, number> = { protein: 4, carbs: 4, fat: 9 };
const MACRO_KEYS: MacroKey[] = ['protein', 'carbs', 'fat'];

// Ciclos por contenido (docs/plan-ciclos-por-contenido.md) — el siguiente
// ciclo de la fase: qué dice la sugerencia (peso + adherencia del ciclo
// actual, con los desvíos día a día) y con qué kcal se quiere preparar. No
// guarda nada: "Preparar" lleva al builder con el contenido ya escalado, y
// es el builder quien persiste (o no, si no cambia nada). "Descartar" borra
// un ciclo ya preparado para volver a heredar.
//
// "Ajustar macros" (docs/plan-info-calculo-fase.md): reparto del ciclo en
// g / g·kg / %, con candados como en el editor de objetivos del cliente.
// Sin tocarlo, los macros siguen al escalado proporcional de las kcal. Si se
// toca, viajan al builder como objetivo del ciclo (referencia con deltas
// por fila) — el escalado de alimentos sigue siendo por kcal.
@Component({
  selector: 'app-next-cycle-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, NeedBreakdownComponent],
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
  public showMacros = false;

  // --- Ajustar macros ---
  public macros: MacroSet = { protein: 0, carbs: 0, fat: 0 };
  public locks: Record<MacroKey, boolean> = { protein: false, carbs: false, fat: false };
  // true en cuanto el entrenador toca un macro a mano: desde entonces las
  // kcal ya no rehacen el reparto proporcional, solo lo escalan respetando
  // candados, y el reparto viaja al builder.
  public macrosTouched = false;
  public readonly macroRows: { key: MacroKey; label: string }[] = [
    { key: 'protein', label: 'Proteína' },
    { key: 'carbs', label: 'Carbohidratos' },
    { key: 'fat', label: 'Grasa' },
  ];

  constructor(
    private modalController: ModalController,
    private api: DietSuggestionApiService,
    private ionicUtil: IonicUtilService
  ) {}

  public ngOnInit(): void {
    const next = this.cycles.next;
    this.targetKcal = next.override?.profile.kcal ?? (next.suggestion.hasData ? next.suggestion.nextCycleKcal : next.inherits?.profile.kcal ?? 0);
    this.resetMacrosProportional();
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
  private get macroRatio(): number {
    const baseMacroKcal = MACRO_KEYS.reduce((sum, k) => sum + (this.base[k] || 0) * KCAL_PER_G[k], 0);
    return this.baseKcal > 0 && baseMacroKcal > 0 ? baseMacroKcal / this.baseKcal : 1;
  }

  // kcal que reparten los macros para las kcal elegidas.
  public get macroBudget(): number {
    return Math.round(this.targetKcal * this.macroRatio);
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
    if (!this.macrosTouched) {
      this.resetMacrosProportional();
      return;
    }
    // Reparto ya tocado: escalar solo lo que no está bloqueado para que la
    // suma vuelva a cuadrar con las kcal nuevas.
    const unlocked = MACRO_KEYS.filter((k) => !this.locks[k]);
    const lockedKcal = MACRO_KEYS.filter((k) => this.locks[k]).reduce((sum, k) => sum + this.kcalOf(k), 0);
    const unlockedKcal = unlocked.reduce((sum, k) => sum + this.kcalOf(k), 0);
    const remaining = Math.max(0, this.macroBudget - lockedKcal);
    if (!unlocked.length || unlockedKcal <= 0) return;
    const factor = remaining / unlockedKcal;
    unlocked.forEach((k) => (this.macros[k] = this.macros[k] * factor));
  }

  // ---------- macros ----------

  // Reparto del ciclo actual escalado a las kcal elegidas — lo mismo que
  // hará el builder con los alimentos.
  public resetMacrosProportional(): void {
    const factor = this.baseKcal > 0 ? this.targetKcal / this.baseKcal : 1;
    this.macros = {
      protein: (this.base.protein || 0) * factor,
      carbs: (this.base.carbs || 0) * factor,
      fat: (this.base.fat || 0) * factor,
    };
    this.locks = { protein: false, carbs: false, fat: false };
    this.macrosTouched = false;
  }

  public kcalOf(key: MacroKey): number {
    return Math.round((this.macros[key] || 0) * KCAL_PER_G[key]);
  }

  public get macrosKcal(): number {
    return MACRO_KEYS.reduce((sum, k) => sum + this.kcalOf(k), 0);
  }

  public pct(key: MacroKey): number {
    const budget = this.macroBudget;
    return budget > 0 ? (this.kcalOf(key) / budget) * 100 : 0;
  }

  public perKg(key: MacroKey): number | null {
    if (!this.weightKg) return null;
    return Math.round(((this.macros[key] || 0) / this.weightKg) * 100) / 100;
  }

  public grams(key: MacroKey): number {
    return Math.round(this.macros[key] || 0);
  }

  public macroDelta(key: MacroKey): number {
    return Math.round((this.macros[key] || 0) - (this.base[key] || 0));
  }

  public macroDeltaPct(key: MacroKey): number | null {
    return this.pctChange(this.macros[key] || 0, this.base[key] || 0);
  }

  public toggleLock(key: MacroKey): void {
    this.locks[key] = !this.locks[key];
  }

  public onGramsInput(key: MacroKey, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value) || value < 0) return;
    this.setMacro(key, value);
  }

  public onPerKgInput(key: MacroKey, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value) || value < 0 || !this.weightKg) return;
    this.setMacro(key, value * this.weightKg);
  }

  public onPctInput(key: MacroKey, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value) || value < 0) return;
    this.setMacro(key, (this.macroBudget * (value / 100)) / KCAL_PER_G[key]);
  }

  // Fijar un macro y que los demás no bloqueados absorban la diferencia
  // (repartida según su peso actual), como en el editor del cliente. Sin
  // nadie que absorba, las kcal siguen a la suma.
  private setMacro(key: MacroKey, grams: number): void {
    this.macros[key] = grams;
    this.macrosTouched = true;
    const others = MACRO_KEYS.filter((k) => k !== key && !this.locks[k]);
    const fixedKcal = MACRO_KEYS.filter((k) => !others.includes(k)).reduce((sum, k) => sum + this.kcalOf(k), 0);
    const remaining = this.macroBudget - fixedKcal;
    const othersKcal = others.reduce((sum, k) => sum + this.kcalOf(k), 0);
    if (!others.length || remaining < 0) {
      // Nadie absorbe: las kcal de la dieta siguen a los macros, con la
      // misma proporción macro/kcal del ciclo actual.
      if (remaining < 0) others.forEach((k) => (this.macros[k] = 0));
      this.targetKcal = Math.round(this.macrosKcal / this.macroRatio);
      return;
    }
    if (othersKcal > 0) {
      const factor = remaining / othersKcal;
      others.forEach((k) => (this.macros[k] = this.macros[k] * factor));
    } else {
      // Los otros estaban a cero: se reparte a partes iguales en kcal.
      others.forEach((k) => (this.macros[k] = remaining / others.length / KCAL_PER_G[k]));
    }
  }

  // ---------- acciones ----------

  public prepare(): void {
    if (!(this.targetKcal > 0)) return;
    void this.modalController.dismiss(
      {
        kcal: Math.round(this.targetKcal),
        macros: this.macrosTouched
          ? { protein: this.grams('protein'), carbs: this.grams('carbs'), fat: this.grams('fat') }
          : null,
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
