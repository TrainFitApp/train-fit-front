import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MacroSet } from '../../../features/diet-templates/models/diet-suggestion.model';

export type MacroKey = keyof MacroSet;

// Atwater — mismo trío que nutrition-target.js#KCAL_PER_G.
export const KCAL_PER_G: Record<MacroKey, number> = { protein: 4, carbs: 4, fat: 9 };
const MACRO_KEYS: MacroKey[] = ['protein', 'carbs', 'fat'];

// Margen para dar el reparto por cuadrado: el mismo que el editor de
// objetivos del cliente (nutrition-editor#isValidConfiguration).
export const MACRO_KCAL_TOLERANCE = 25;

// "Ajustar macros" (docs/plan-info-calculo-fase.md) — reparto en g / g·kg / %,
// con candados como en el editor de objetivos del cliente. Plegado. Lo usan
// el modal de "Siguiente ciclo" y el panel de "Empezar fase": misma pieza,
// cada uno decide qué hace con el reparto.
//
// Mientras nadie lo toca sigue a `defaultMacros` (el reparto que da el
// padre: escalado proporcional en un ciclo, la fórmula por defecto al
// empezar fase). En cuanto se toca un macro, el reparto es suyo: las kcal
// nuevas solo escalan lo no bloqueado, y `macrosChange` emite el reparto.
// "Volver" lo suelta y emite `null`.
//
// Las kcal mandan, como en el editor del cliente: nunca se mueven desde
// aquí. Se puede teclear lo que sea, pero si los macros no cuadran con las
// kcal sale un aviso, y el padre no deja guardar (ver `validate`).
@Component({
  selector: 'app-macro-adjust',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './macro-adjust.component.html',
  styleUrls: ['./macro-adjust.component.scss'],
})
export class MacroAdjustComponent implements OnChanges {
  // kcal de la dieta. Solo se leen: los macros tienen que cuadrar con ellas.
  @Input() public targetKcal = 0;

  @Input() public defaultMacros: MacroSet | null = null;
  // Referencia para las desviaciones por fila (el ciclo actual). Sin ella
  // no se pintan.
  @Input() public base: MacroSet | null = null;
  // Parte de las kcal que son macro (ver next-cycle-modal#macroRatio).
  @Input() public macroRatio = 1;
  @Input() public weightKg: number | null = null;
  @Input() public resetLabel = 'Volver al reparto proporcional';
  @Input() public hint = '';

  // El reparto tocado a mano, o null cuando vuelve a seguir a defaultMacros.
  @Output() public macrosChange = new EventEmitter<MacroSet | null>();

  public open = false;
  public macros: MacroSet = { protein: 0, carbs: 0, fat: 0 };
  public locks: Record<MacroKey, boolean> = { protein: false, carbs: false, fat: false };
  public touched = false;
  // Se intentó guardar con el reparto descuadrado: el aviso pasa a error.
  public saveBlocked = false;
  public readonly macroRows: { key: MacroKey; label: string }[] = [
    { key: 'protein', label: 'Proteína' },
    { key: 'carbs', label: 'Carbohidratos' },
    { key: 'fat', label: 'Grasa' },
  ];

  constructor(private host: ElementRef<HTMLElement>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.touched) {
      if (changes['defaultMacros'] && this.defaultMacros) this.macros = { ...this.defaultMacros };
      return;
    }
    if (changes['targetKcal'] && !changes['targetKcal'].firstChange) this.scaleUnlockedToBudget();
  }

  // kcal que reparten los macros para las kcal elegidas.
  public get macroBudget(): number {
    return Math.round(this.targetKcal * this.macroRatio);
  }

  public get macrosKcal(): number {
    return MACRO_KEYS.reduce((sum, k) => sum + this.kcalOf(k), 0);
  }

  // Positivo: los macros se pasan de las kcal; negativo: no llegan.
  public get kcalDiff(): number {
    return this.macrosKcal - this.macroBudget;
  }

  // Sin tocar, el reparto es el del padre y se da por bueno.
  public get balanced(): boolean {
    return !this.touched || Math.abs(this.kcalDiff) <= MACRO_KCAL_TOLERANCE;
  }

  public get imbalanceMessage(): string {
    const diff = this.kcalDiff;
    const amount = Math.abs(diff);
    return diff > 0
      ? `Los macros suman ${this.macrosKcal} kcal y solo caben ${this.macroBudget}: sobran ${amount} kcal. Baja algún macro o desbloquea otro para que absorba.`
      : `Los macros suman ${this.macrosKcal} kcal de ${this.macroBudget}: faltan ${amount} kcal. Sube algún macro o desbloquea otro para que absorba.`;
  }

  // Para el padre antes de guardar: con el reparto descuadrado abre el
  // panel, marca el error, lo trae a la vista y devuelve el mensaje.
  public validate(): string | null {
    if (this.balanced) return null;
    this.open = true;
    this.saveBlocked = true;
    setTimeout(() => this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    return this.imbalanceMessage;
  }

  public kcalOf(key: MacroKey): number {
    return Math.round((this.macros[key] || 0) * KCAL_PER_G[key]);
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
    if (!this.base) return 0;
    return Math.round((this.macros[key] || 0) - (this.base[key] || 0));
  }

  public macroDeltaPct(key: MacroKey): number | null {
    const before = this.base?.[key] || 0;
    if (!(before > 0)) return null;
    return (((this.macros[key] || 0) - before) / before) * 100;
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }

  public pctLabel(value: number | null): string {
    if (value === null) return '';
    const rounded = Math.round(value * 10) / 10;
    return `${rounded > 0 ? '+' : ''}${rounded.toLocaleString('es-ES', { maximumFractionDigits: 1 })} %`;
  }

  public toggleLock(key: MacroKey): void {
    this.locks[key] = !this.locks[key];
  }

  // ---------- Campos g y g/kg ----------
  // En tiempo real: cada tecla recalcula el reparto, la barra y el aviso.
  // Mientras se escribe, el campo enseña lo tecleado (no el valor
  // formateado, que pisaría "1." o un campo a medio borrar), y cada tecla
  // parte del reparto que había al entrar en el campo: teclear 3 → 30 → 300
  // → 30 no deja a los otros macros a cero por el camino.
  public editing: string | null = null;
  public draft = '';
  private snapshot: MacroSet | null = null;
  // Último reparto tocado a mano (campos o barra): base para reescalar
  // cuando cambian las kcal.
  private manualMacros: MacroSet | null = null;

  public fieldValue(key: MacroKey, field: 'g' | 'kg'): string | number | null {
    if (this.editing === key + field) return this.draft;
    return field === 'g' ? this.grams(key) : this.perKg(key);
  }

  public onFieldFocus(key: MacroKey, field: 'g' | 'kg'): void {
    this.editing = key + field;
    this.draft = String(this.fieldValue(key, field) ?? '');
    this.snapshot = { ...this.macros };
  }

  public onFieldBlur(): void {
    this.editing = null;
    this.snapshot = null;
  }

  public onGramsInput(key: MacroKey, event: Event): void {
    const grams = this.readField(event);
    if (grams !== null) this.setMacroLive(key, grams);
  }

  public onPerKgInput(key: MacroKey, event: Event): void {
    const perKg = this.readField(event);
    if (perKg !== null && this.weightKg) this.setMacroLive(key, perKg * this.weightKg);
  }

  // Lo tecleado si es un número válido; si no (vacío, "1." a medias), null
  // y el borrador no cambia, para que Angular no reescriba el campo.
  private readField(event: Event): number | null {
    const raw = (event.target as HTMLInputElement).value;
    const value = Number(raw);
    if (raw.trim() === '' || !Number.isFinite(value) || value < 0) return null;
    this.draft = raw;
    return value;
  }

  private setMacroLive(key: MacroKey, grams: number): void {
    if (this.snapshot) this.macros = { ...this.snapshot };
    this.setMacro(key, grams);
  }

  // ---------- Barra de % ----------
  // La barra del editor de objetivos del cliente (nutrition-editor, "slider
  // unificado"): dos tiradores, h1 entre proteína y carbos, h2 entre carbos
  // y grasa. Arrastrar siempre deja el reparto al 100 % de las kcal, así que
  // también sirve para cuadrar un reparto descuadrado.

  // % sin redondear, para posicionar segmentos y tiradores.
  public rawPct(key: MacroKey): number {
    const budget = this.macroBudget;
    return budget > 0 ? (this.rawKcal(key) / budget) * 100 : 0;
  }

  public get h1Pos(): number {
    return this.rawPct('protein');
  }

  public get h2Pos(): number {
    return this.rawPct('protein') + this.rawPct('carbs');
  }

  // Un tirador no se mueve si lo que tendría que cambiar está bloqueado.
  public handleBlocked(handle: 'h1' | 'h2'): boolean {
    if (!(this.macroBudget > 0)) return true;
    return handle === 'h1'
      ? this.locks.protein || (this.locks.carbs && this.locks.fat)
      : this.locks.fat || (this.locks.carbs && this.locks.protein);
  }

  public dragging: 'h1' | 'h2' | null = null;

  public onTrackPointerDown(event: PointerEvent): void {
    const x = this.pointerPct(event);
    const candidates = (['h1', 'h2'] as const).filter((h) => !this.handleBlocked(h));
    if (!candidates.length) return;
    const handle = candidates.reduce((best, h) =>
      Math.abs(x - (h === 'h1' ? this.h1Pos : this.h2Pos)) < Math.abs(x - (best === 'h1' ? this.h1Pos : this.h2Pos)) ? h : best
    );
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging = handle;
    this.moveHandle(handle, x);
    this.emitMacros();
  }

  public onTrackPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    event.preventDefault();
    this.moveHandle(this.dragging, this.pointerPct(event));
    this.emitMacros();
  }

  public onTrackPointerUp(event: PointerEvent): void {
    if (!this.dragging) return;
    (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragging = null;
  }

  // Teclado: flechas mueven el tirador un 1 % (Mayús, un 5 %).
  public onHandleKeydown(handle: 'h1' | 'h2', event: KeyboardEvent): void {
    const dir = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 0;
    if (!dir || this.handleBlocked(handle)) return;
    event.preventDefault();
    const pos = handle === 'h1' ? this.h1Pos : this.h2Pos;
    this.moveHandle(handle, Math.round(pos) + dir * (event.shiftKey ? 5 : 1));
    this.emitMacros();
  }

  private pointerPct(event: PointerEvent): number {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    return rect.width > 0 ? ((event.clientX - rect.left) / rect.width) * 100 : 0;
  }

  // Misma lógica de reparto que nutrition-editor#onDragMove, respetando los
  // candados (allí se colaba mover un macro bloqueado en algún caso).
  private moveHandle(handle: 'h1' | 'h2', x: number): void {
    if (this.handleBlocked(handle)) return;
    x = Math.min(100, Math.max(0, x));
    let p = this.rawPct('protein');
    let c = this.rawPct('carbs');
    if (handle === 'h1') {
      if (this.locks.carbs) {
        // Carbos fijos: la grasa absorbe.
        p = Math.min(x, 100 - c);
      } else if (this.locks.fat) {
        // Grasa fija: los carbos absorben.
        const fat = Math.min(100, this.rawPct('fat'));
        p = Math.min(x, 100 - fat);
        c = 100 - fat - p;
      } else {
        const h2 = Math.min(100, p + c);
        p = x;
        c = Math.max(0, h2 - x);
      }
    } else {
      let h2 = x;
      if (this.locks.carbs) {
        h2 = Math.max(h2, c);
        p = h2 - c;
      } else if (h2 < p && this.locks.protein) {
        h2 = p;
        c = 0;
      } else if (h2 < p) {
        p = h2;
        c = 0;
      } else {
        c = h2 - p;
      }
    }
    const f = Math.max(0, 100 - p - c);
    const set: MacroSet = { protein: p, carbs: c, fat: f };
    MACRO_KEYS.forEach((k) => (this.macros[k] = (this.macroBudget * (set[k] / 100)) / KCAL_PER_G[k]));
    this.touched = true;
    this.manualMacros = { ...this.macros };
    if (this.balanced) this.saveBlocked = false;
  }

  public reset(): void {
    this.locks = { protein: false, carbs: false, fat: false };
    this.touched = false;
    this.manualMacros = null;
    this.saveBlocked = false;
    if (this.defaultMacros) this.macros = { ...this.defaultMacros };
    this.macrosChange.emit(null);
  }

  // Reparto ya tocado y kcal nuevas: escalar solo lo que no está bloqueado
  // para que la suma vuelva a cuadrar. Si no da (todo bloqueado, o los
  // bloqueados ya no caben), se queda descuadrado y lo dice el aviso.
  //
  // Escala desde el último reparto hecho a mano, no desde el anterior
  // escalado: las kcal se teclean en tiempo real (3000 → 300 → 3 → 3500) y
  // escalar en cadena dejaría los macros a cero por el camino.
  private scaleUnlockedToBudget(): void {
    const ref = this.manualMacros ?? this.macros;
    const unlocked = MACRO_KEYS.filter((k) => !this.locks[k]);
    const lockedKcal = MACRO_KEYS.filter((k) => this.locks[k]).reduce((sum, k) => sum + this.rawKcal(k), 0);
    const unlockedKcal = unlocked.reduce((sum, k) => sum + (ref[k] || 0) * KCAL_PER_G[k], 0);
    if (!unlocked.length || unlockedKcal <= 0) return;
    const factor = Math.max(0, this.macroBudget - lockedKcal) / unlockedKcal;
    unlocked.forEach((k) => (this.macros[k] = (ref[k] || 0) * factor));
    this.emitMacros();
  }

  // Fijar un macro y que los demás no bloqueados absorban la diferencia
  // (repartida según su peso actual), como en el editor del cliente. Como
  // mucho bajan a cero: lo que no se pueda absorber queda como descuadre.
  private setMacro(key: MacroKey, grams: number): void {
    this.macros[key] = grams;
    this.touched = true;
    const others = MACRO_KEYS.filter((k) => k !== key && !this.locks[k]);
    const fixedKcal = MACRO_KEYS.filter((k) => !others.includes(k)).reduce((sum, k) => sum + this.rawKcal(k), 0);
    const remaining = Math.max(0, this.macroBudget - fixedKcal);
    const othersKcal = others.reduce((sum, k) => sum + this.rawKcal(k), 0);
    if (othersKcal > 0) {
      const factor = remaining / othersKcal;
      others.forEach((k) => (this.macros[k] = this.macros[k] * factor));
    } else {
      // Los otros estaban a cero: se reparte a partes iguales en kcal.
      others.forEach((k) => (this.macros[k] = remaining / others.length / KCAL_PER_G[k]));
    }
    this.manualMacros = { ...this.macros };
    this.emitMacros();
  }

  // Sin redondear, para que los repartos cuadren al gramo.
  private rawKcal(key: MacroKey): number {
    return (this.macros[key] || 0) * KCAL_PER_G[key];
  }

  private emitMacros(): void {
    if (this.balanced) this.saveBlocked = false;
    this.macrosChange.emit({ protein: this.grams('protein'), carbs: this.grams('carbs'), fat: this.grams('fat') });
  }
}
