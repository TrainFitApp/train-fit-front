import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WeekNeed } from '../../../diet-templates/models/diet-suggestion.model';

// "Cómo se calculó la necesidad": qué datos entraron y la cuenta paso a
// paso. Solo pinta; el cálculo viene hecho del backend (nutrition-target.js
// #explainNutritionTarget) en la misma forma para el snapshot de la fase y
// para las semanas calculadas al vuelo. Se usa en el resumen de semana,
// en el objetivo nutricional del cliente y, como referencia "con datos de
// hoy", en el modal de siguiente semana.
@Component({
  selector: 'app-need-breakdown',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './need-breakdown.component.html',
  styleUrls: ['./need-breakdown.component.scss'],
})
export class NeedBreakdownComponent implements OnInit {
  // null = fase creada antes de guardar el cálculo.
  @Input() public need: WeekNeed | null = null;
  // Media pautada, para compararla con lo calculado.
  @Input() public plannedKcal: number | null = null;
  // Cuenta plegada por defecto (modal de siguiente semana).
  @Input() public collapsed = false;

  public showMath = true;

  public ngOnInit(): void {
    this.showMath = !this.collapsed;
  }

  public get target(): WeekNeed['target'] {
    return this.need?.target ?? null;
  }

  public get breakdown(): WeekNeed['breakdown'] {
    return this.need?.breakdown ?? null;
  }

  public get inputs(): WeekNeed['inputs'] | null {
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

  // De dónde salió el rango de pasos que entró en la fórmula: del hábito de
  // pasos que el cliente va marcando cada día, o del rango de su perfil.
  public get stepsLine(): string {
    const i = this.inputs;
    if (!i) return '—';
    if (i.stepsFrom === 'habit') {
      const habit = this.need?.stepsFromHabit;
      const cumplido = habit ? ` · cumplido ${habit.completedDays} de ${habit.windowDays} días` : '';
      return `${i.stepsLabel} · de su hábito de pasos${cumplido}`;
    }
    const perfil = i.stepsLabel || 'sin dato en el perfil';
    if (i.stepsFallbackReason === 'profile_unresolved') {
      return `${perfil} · del perfil (tiene hábito de pasos, pero el perfil no permite recalcular)`;
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
