import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WeekNeed } from '../../../diet-templates/models/diet-suggestion.model';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

// "Cómo se calculó la necesidad": qué datos entraron y la cuenta paso a
// paso. Solo pinta; el cálculo viene hecho del backend (nutrition-target.js
// #explainNutritionTarget) en la misma forma para el snapshot de la fase y
// para las semanas calculadas al vuelo. Se usa en el resumen de semana,
// en el objetivo nutricional del cliente y, como referencia "con datos de
// hoy", en el modal de siguiente semana.
@Component({
  selector: 'app-need-breakdown',
  templateUrl: './need-breakdown.component.html',
  styleUrls: ['./need-breakdown.component.scss'],
})
export class NeedBreakdownComponent implements OnInit {
  private readonly translate = inject(TranslateService);

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
    const origen = i.weightDate ? this.translate.instant('CLIENTS.ANTROPOMETRIA_DEL', { p0: this.fmtDate(i.weightDate) }) : '';
    return `${this.n(i.weightKg, 1)} kg${origen ? ` · ${origen}` : ''}`;
  }

  public get sexLabel(): string {
    const s = this.inputs?.sex;
    return s === 1 ? this.translate.instant('CLIENTS.HOMBRE') : s === 0 ? this.translate.instant('CLIENTS.MUJER') : '—';
  }

  // De dónde salió el rango de pasos que entró en la fórmula: del hábito de
  // pasos que el cliente va marcando cada día, o del rango de su perfil.
  public get stepsLine(): string {
    const i = this.inputs;
    if (!i) return '—';
    if (i.stepsFrom === 'habit') {
      const habit = this.need?.stepsFromHabit;
      const cumplido = habit ? ' ' + this.translate.instant('CLIENTS.CUMPLIDO_DE_DIAS', { completedDays: habit.completedDays, windowDays: habit.windowDays }) : '';
      return this.translate.instant('CLIENTS.DE_SU_HABITO_DE_PASOS', { stepsLabel: i.stepsLabel, cumplido });
    }
    const perfil = i.stepsLabel || this.translate.instant('CLIENTS.SIN_DATO_EN_EL_PERFIL');
    if (i.stepsFallbackReason === 'profile_unresolved') {
      return this.translate.instant('CLIENTS.DEL_PERFIL_TIENE_HABITO_DE', { perfil });
    }
    return this.translate.instant('CLIENTS.DEL_PERFIL', { perfil });
  }

  public get trainingLine(): string {
    const d = this.inputs?.trainingDays;
    if (!d) return this.inputs?.trainingValue ? `factor ${this.n(this.inputs.trainingValue, 3)}` : '—';
    return d.exact ? d.label : this.translate.instant('CLIENTS.ESTIMADO_EL_FACTOR_DEL_PERFIL', { label: d.label });
  }

  // De qué se compone el factor que multiplica al metabolismo basal.
  public get factorLine(): string {
    const b = this.breakdown;
    if (!b) return '';
    if (b.usesActivity) {
      return `actividad ${this.n(b.activityFactor, 2)} × entrenamiento ${this.n(b.trainingFactor, 3)}`;
    }
    return this.translate.instant('CLIENTS.PASOS_ENTRENAMIENTO');
  }

  private get delta(): number {
    return this.breakdown?.delta ?? this.inputs?.objetiveKcalDelta ?? 0;
  }

  public get deltaLabel(): string {
    const d = this.delta;
    return d > 0 ? `+${d}` : d < 0 ? `−${Math.abs(d)}` : '0';
  }

  // Qué significa el signo del objetivo, para no obligar a deducirlo.
  public get deltaKind(): string {
    const d = this.delta;
    return this.translate.instant(d < 0 ? 'OBJETIVES.KEYWORD_2' : d > 0 ? 'OBJETIVES.KEYWORD_0' : 'OBJETIVES.KEYWORD_1');
  }

  public get absPlannedDelta(): number {
    return Math.abs(this.plannedDelta ?? 0);
  }

  public get proteinWeight(): number {
    return this.breakdown?.adjustedWeightKg ?? this.breakdown?.weightKg ?? 0;
  }

  public n(value: number | null | undefined, decimals = 0): string {
    if (value === null || value === undefined || !Number.isFinite(value)) return '—';
    return value.toLocaleString(uiLocale(), { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }

  public fmtDate(iso: string | null): string {
    if (!iso) return '';
    return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }
}
