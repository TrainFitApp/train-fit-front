import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CycleNeed } from '../../../diet-templates/models/diet-suggestion.model';

// Info de cálculo de fase (docs/plan-info-calculo-fase.md) — "cómo se
// calculó la necesidad": qué datos entraron y la cuenta paso a paso. Solo
// pinta; el cálculo viene hecho del backend (nutrition-target.js
// #explainNutritionTarget) en la misma forma para el snapshot del C1 y para
// los ciclos 2+ al vuelo. Se usa en el resumen de ciclo y, como referencia
// "con datos de hoy", en el modal de siguiente ciclo.
@Component({
  selector: 'app-need-breakdown',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './need-breakdown.component.html',
  styleUrls: ['./need-breakdown.component.scss'],
})
export class NeedBreakdownComponent implements OnInit {
  // null = fase creada antes de guardar el cálculo (solo puede pasar en C1).
  @Input() public need: CycleNeed | null = null;
  // Media diaria de pasos que el cliente declaró en el check-in del ciclo.
  @Input() public stepsDone: { avg: number | null; respondedAt: string | null } | null = null;
  // Media pautada del ciclo, para compararla con lo calculado.
  @Input() public plannedKcal: number | null = null;
  // Cuenta plegada por defecto (modal de siguiente ciclo).
  @Input() public collapsed = false;

  public showMath = true;

  public ngOnInit(): void {
    this.showMath = !this.collapsed;
  }

  public get target(): CycleNeed['target'] {
    return this.need?.target ?? null;
  }

  public get breakdown(): CycleNeed['breakdown'] {
    return this.need?.breakdown ?? null;
  }

  public get inputs(): CycleNeed['inputs'] | null {
    return this.need?.inputs ?? null;
  }

  public get missing(): string[] {
    return this.need?.missing || [];
  }

  // Calculado − pautado. null si falta alguno de los dos.
  public get plannedDelta(): number | null {
    if (!this.target || !this.plannedKcal) return null;
    return Math.round(this.plannedKcal - this.target.kcal);
  }

  public get weightLine(): string {
    const i = this.inputs;
    if (!i || i.weightKg === null) return '—';
    const origen =
      i.weightFrom === 'anthropometry'
        ? `antropometría del ${this.fmtDate(i.weightDate)}`
        : i.weightFrom === 'signup'
        ? 'del registro del cliente'
        : '';
    return `${this.n(i.weightKg, 1)} kg${origen ? ` · ${origen}` : ''}`;
  }

  public get sexLabel(): string {
    const s = this.inputs?.sex;
    return s === 1 ? 'Hombre' : s === 0 ? 'Mujer' : '—';
  }

  // De dónde salieron los pasos que entraron en la fórmula.
  public get stepsLine(): string {
    const i = this.inputs;
    if (!i) return '—';
    if (i.stepsFrom === 'logged') {
      return `${this.n(i.stepsAvg)} de media (check-in) → ${i.stepsLabel}`;
    }
    const perfil = i.stepsLabel || 'sin dato en el perfil';
    if (i.stepsFallbackReason === 'profile_unresolved') {
      return `${perfil} · del perfil (check-in con ${this.n(i.stepsAvg)} de media, pero el perfil no permite recalcular)`;
    }
    return `${perfil} · del perfil`;
  }

  public get trainingLine(): string {
    const d = this.inputs?.trainingDays;
    if (!d) return this.inputs?.trainingValue ? `factor ${this.n(this.inputs.trainingValue, 3)}` : '—';
    return d.exact ? d.label : `${d.label} (estimado: el factor del perfil no casa exacto)`;
  }

  public get factorLine(): string {
    const b = this.breakdown;
    if (!b) return '';
    if (b.usesActivity) {
      return `actividad ${this.n(b.activityFactor, 2)} × entrenamiento ${this.n(b.trainingFactor, 3)}`;
    }
    return `pasos + entrenamiento ${this.n(b.trainingFactor, 3)}`;
  }

  public get deltaLabel(): string {
    const d = this.breakdown?.delta ?? this.inputs?.objetiveKcalDelta ?? 0;
    return d > 0 ? `+${d}` : `${d}`;
  }

  public get proteinWeight(): number {
    return this.breakdown?.adjustedWeightKg ?? this.breakdown?.weightKg ?? 0;
  }

  public n(value: number | null | undefined, decimals = 0): string {
    if (value === null || value === undefined || !Number.isFinite(value)) return '—';
    return value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }

  public signed(value: number): string {
    return (value > 0 ? '+' : '') + this.n(value);
  }

  public fmtDate(iso: string | null): string {
    if (!iso) return '';
    return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }
}
