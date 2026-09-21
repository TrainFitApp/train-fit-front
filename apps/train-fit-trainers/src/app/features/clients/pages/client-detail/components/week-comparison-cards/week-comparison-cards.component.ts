import { Component, Input, OnChanges } from '@angular/core';
import { PhaseWeeksResponse } from '../../../../../diet-templates/models/diet-suggestion.model';

type MetricKey = 'kcal' | 'protein' | 'carbs' | 'fat';

interface MetricRow {
  key: MetricKey;
  label: string;
  unit: string;
  decimals: number;
}

const METRICS: MetricRow[] = [
  { key: 'kcal', label: 'Kcal', unit: 'kcal', decimals: 0 },
  { key: 'protein', label: 'Proteína', unit: 'g', decimals: 1 },
  { key: 'carbs', label: 'Carbohidratos', unit: 'g', decimals: 1 },
  { key: 'fat', label: 'Grasas', unit: 'g', decimals: 1 },
];

export interface ComparableWeek {
  number: number;
  start: string;
  end: string | null;
  profile: Record<MetricKey, number>;
  status: 'past' | 'current' | 'next';
}

export interface MetricDelta {
  abs: number;
  pct: number | null; // null si la referencia es 0 (no hay % que calcular)
  direction: 'up' | 'down' | 'same';
}

// Dos cards bajo la gráfica de Seguimiento: a la izquierda una semana con
// sus kcal/macros PAUTADOS y, al lado de cada cifra, cuánto sube o baja
// respecto a la de la derecha (la referencia). Por defecto la semana en
// curso contra la anterior; cada card tiene su selector.
//
// Solo lo pautado (el perfil del contenido de cada semana, el mismo "3905
// kcal" de las tarjetas), no lo consumido: responde "¿qué cambié de una
// semana a otra?", y ya viene entero en phaseWeeks — sin peticiones
// propias. Van por libre: el rango de la gráfica o el calendario
// no las mueven. Deltas en neutro (sin verde/rojo): que suban las kcal no es
// bueno ni malo por sí solo, depende del objetivo de la fase.
@Component({
  selector: 'app-week-comparison-cards',
  templateUrl: './week-comparison-cards.component.html',
  styleUrls: ['./week-comparison-cards.component.scss'],
})
export class WeekComparisonCardsComponent implements OnChanges {
  @Input() phaseWeeks: PhaseWeeksResponse | null = null;

  public readonly metrics = METRICS;
  public weeks: ComparableWeek[] = [];
  public leftNumber: number | null = null;
  public rightNumber: number | null = null;

  public ngOnChanges(): void {
    this.weeks = this.buildWeeks(this.phaseWeeks);
    // Se conserva lo elegido si sigue existiendo; si no (primera carga, o
    // la fase cambió y esa semana ya no está), se vuelve al defecto: el
    // actual contra el anterior.
    if (!this.weekByNumber(this.leftNumber)) {
      this.leftNumber = this.phaseWeeks?.current?.number ?? this.weeks[this.weeks.length - 1]?.number ?? null;
    }
    if (!this.weekByNumber(this.rightNumber) || this.rightNumber === this.leftNumber) {
      this.rightNumber = this.defaultRightFor(this.leftNumber);
    }
  }

  public get left(): ComparableWeek | null {
    return this.weekByNumber(this.leftNumber);
  }

  public get right(): ComparableWeek | null {
    return this.weekByNumber(this.rightNumber);
  }

  // Sin otra semana con la que comparar (solo existe R1 y no hay siguiente
  // preparado) la card derecha no tiene nada que enseñar.
  public get hasComparison(): boolean {
    return this.weeks.length > 1;
  }

  public selectLeft(value: string): void {
    const number = Number(value);
    if (!this.weekByNumber(number)) return;
    this.leftNumber = number;
    if (this.rightNumber === number) this.rightNumber = this.defaultRightFor(number);
  }

  public selectRight(value: string): void {
    const number = Number(value);
    if (!this.weekByNumber(number)) return;
    this.rightNumber = number;
  }

  public delta(metric: MetricRow): MetricDelta | null {
    const left = this.left;
    const right = this.right;
    if (!left || !right) return null;
    const a = left.profile[metric.key] || 0;
    const b = right.profile[metric.key] || 0;
    const abs = this.roundTo(a - b, metric.decimals);
    return {
      abs,
      pct: b ? this.roundTo(((a - b) / b) * 100, 1) : null,
      direction: abs > 0 ? 'up' : abs < 0 ? 'down' : 'same',
    };
  }

  public formatValue(value: number | undefined, metric: MetricRow): string {
    return this.formatNumber(value || 0, metric.decimals);
  }

  public formatDelta(delta: MetricDelta, metric: MetricRow): string {
    if (delta.direction === 'same') return 'igual';
    const sign = delta.abs > 0 ? '+' : '−';
    const abs = this.formatNumber(Math.abs(delta.abs), metric.decimals);
    const pct = delta.pct === null ? '' : ` · ${sign}${this.formatNumber(Math.abs(delta.pct), 1)} %`;
    return `${sign}${abs} ${metric.unit}${pct}`;
  }

  public weekOptionLabel(week: ComparableWeek): string {
    const suffix = week.status === 'current' ? ' · en curso' : week.status === 'next' ? ' · siguiente' : '';
    return `S${week.number} · ${this.formatRange(week)}${suffix}`;
  }

  public statusLabel(week: ComparableWeek): string {
    if (week.status === 'current') return 'En curso';
    if (week.status === 'next') return 'Próxima';
    return 'Anterior';
  }

  public formatRange(week: ComparableWeek): string {
    const fmt = (iso: string): string =>
      new Date(iso + 'T00:00:00Z').toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
    return week.end ? `${fmt(week.start)} → ${fmt(week.end)}` : `desde ${fmt(week.start)}`;
  }

  public trackByNumber(_index: number, week: ComparableWeek): number {
    return week.number;
  }

  public trackByMetric(_index: number, metric: MetricRow): string {
    return metric.key;
  }

  // R1..la que corre siempre (las heredadas repiten el perfil del último
  // contenido persistido, pero son semanas reales del calendario y se
  // pueden elegir igual); la siguiente solo si ya tiene contenido propio
  // preparado — heredando sería idéntica a la actual y no aportaría nada.
  private buildWeeks(phaseWeeks: PhaseWeeksResponse | null): ComparableWeek[] {
    if (!phaseWeeks) return [];
    const weeks: ComparableWeek[] = phaseWeeks.past.map((p) => ({
      number: p.number,
      start: p.start,
      end: p.end,
      profile: p.profile,
      status: 'past' as const,
    }));
    const current = phaseWeeks.current;
    if (current?.override?.profile) {
      weeks.push({
        number: current.number,
        start: current.start,
        end: current.end,
        profile: current.override.profile,
        status: 'current',
      });
    }
    const next = phaseWeeks.next;
    if (next?.override?.profile) {
      weeks.push({
        number: next.number,
        start: next.start,
        end: next.end,
        profile: next.override.profile,
        status: 'next',
      });
    }
    return weeks.sort((a, b) => a.number - b.number);
  }

  // La inmediatamente anterior, o null si no la hay (la izquierda es R1):
  // entonces la derecha queda vacía — "sin anterior, sin datos" — aunque el
  // trainer pueda elegir a mano el siguiente si está preparado.
  private defaultRightFor(leftNumber: number | null): number | null {
    if (leftNumber === null) return null;
    return this.weeks.filter((r) => r.number < leftNumber).pop()?.number ?? null;
  }

  private weekByNumber(number: number | null): ComparableWeek | null {
    if (number === null) return null;
    return this.weeks.find((r) => r.number === number) || null;
  }

  private roundTo(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  private formatNumber(value: number, decimals: number): string {
    return value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }
}
