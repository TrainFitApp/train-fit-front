import { Component, Input, OnChanges } from '@angular/core';
import { PhaseCyclesResponse } from '../../../../../diet-templates/models/diet-suggestion.model';

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

export interface ComparableCycle {
  number: number;
  start: string;
  end: string;
  profile: Record<MetricKey, number>;
  status: 'past' | 'current' | 'next';
}

export interface MetricDelta {
  abs: number;
  pct: number | null; // null si la referencia es 0 (no hay % que calcular)
  direction: 'up' | 'down' | 'same';
}

// F20-duovicies — dos cards bajo la gráfica de Seguimiento: a la izquierda
// un ciclo con sus kcal/macros PAUTADOS y, al lado de cada cifra, cuánto
// sube o baja respecto al ciclo de la derecha (la referencia). Por defecto
// el ciclo en curso contra el anterior; cada card tiene su selector.
//
// Solo lo pautado (el perfil del contenido de cada ciclo, el mismo "3905
// kcal" de las tarjetas de ciclo), no lo consumido: responde "¿qué cambié
// entre un ciclo y otro?", y ya viene entero en phaseCycles — sin
// peticiones propias. Van por libre: el rango de la gráfica o el calendario
// no las mueven. Deltas en neutro (sin verde/rojo): que suban las kcal no es
// bueno ni malo por sí solo, depende del objetivo de la fase.
@Component({
  selector: 'app-cycle-comparison-cards',
  templateUrl: './cycle-comparison-cards.component.html',
  styleUrls: ['./cycle-comparison-cards.component.scss'],
})
export class CycleComparisonCardsComponent implements OnChanges {
  @Input() phaseCycles: PhaseCyclesResponse | null = null;

  public readonly metrics = METRICS;
  public cycles: ComparableCycle[] = [];
  public leftNumber: number | null = null;
  public rightNumber: number | null = null;

  public ngOnChanges(): void {
    this.cycles = this.buildCycles(this.phaseCycles);
    // Se conserva lo elegido si sigue existiendo; si no (primera carga, o
    // la fase cambió y ese ciclo ya no está), se vuelve al defecto: el
    // actual contra el anterior.
    if (!this.cycleByNumber(this.leftNumber)) {
      this.leftNumber = this.phaseCycles?.current?.number ?? this.cycles[this.cycles.length - 1]?.number ?? null;
    }
    if (!this.cycleByNumber(this.rightNumber) || this.rightNumber === this.leftNumber) {
      this.rightNumber = this.defaultRightFor(this.leftNumber);
    }
  }

  public get left(): ComparableCycle | null {
    return this.cycleByNumber(this.leftNumber);
  }

  public get right(): ComparableCycle | null {
    return this.cycleByNumber(this.rightNumber);
  }

  // Sin otro ciclo con el que comparar (solo existe C1 y no hay siguiente
  // preparado) la card derecha no tiene nada que enseñar.
  public get hasComparison(): boolean {
    return this.cycles.length > 1;
  }

  public selectLeft(value: string): void {
    const number = Number(value);
    if (!this.cycleByNumber(number)) return;
    this.leftNumber = number;
    if (this.rightNumber === number) this.rightNumber = this.defaultRightFor(number);
  }

  public selectRight(value: string): void {
    const number = Number(value);
    if (!this.cycleByNumber(number)) return;
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

  public cycleOptionLabel(cycle: ComparableCycle): string {
    const suffix = cycle.status === 'current' ? ' · en curso' : cycle.status === 'next' ? ' · siguiente' : '';
    return `C${cycle.number} · ${this.formatRange(cycle)}${suffix}`;
  }

  public statusLabel(cycle: ComparableCycle): string {
    if (cycle.status === 'current') return 'En curso';
    if (cycle.status === 'next') return 'Próximo';
    return 'Anterior';
  }

  public formatRange(cycle: ComparableCycle): string {
    const fmt = (iso: string): string =>
      new Date(iso + 'T00:00:00Z').toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
    return `${fmt(cycle.start)} → ${fmt(cycle.end)}`;
  }

  public trackByNumber(_index: number, cycle: ComparableCycle): number {
    return cycle.number;
  }

  public trackByMetric(_index: number, metric: MetricRow): string {
    return metric.key;
  }

  // C1..actual siempre (los heredados repiten el perfil del último
  // persistido, pero son ciclos reales del calendario y se pueden elegir
  // igual); el siguiente solo si ya tiene contenido propio preparado —
  // heredando sería idéntico al actual y no aportaría nada.
  private buildCycles(phaseCycles: PhaseCyclesResponse | null): ComparableCycle[] {
    if (!phaseCycles) return [];
    const cycles: ComparableCycle[] = phaseCycles.past.map((p) => ({
      number: p.number,
      start: p.start,
      end: p.end,
      profile: p.profile,
      status: 'past' as const,
    }));
    const current = phaseCycles.current;
    if (current?.override?.profile) {
      cycles.push({
        number: current.number,
        start: current.start,
        end: current.end,
        profile: current.override.profile,
        status: 'current',
      });
    }
    const next = phaseCycles.next;
    if (next?.override?.profile) {
      cycles.push({
        number: next.number,
        start: next.start,
        end: next.end,
        profile: next.override.profile,
        status: 'next',
      });
    }
    return cycles.sort((a, b) => a.number - b.number);
  }

  // El inmediatamente anterior, o null si no lo hay (la izquierda es C1):
  // entonces la derecha queda vacía — "sin anterior, sin datos" — aunque el
  // trainer pueda elegir a mano el siguiente si está preparado.
  private defaultRightFor(leftNumber: number | null): number | null {
    if (leftNumber === null) return null;
    return this.cycles.filter((c) => c.number < leftNumber).pop()?.number ?? null;
  }

  private cycleByNumber(number: number | null): ComparableCycle | null {
    if (number === null) return null;
    return this.cycles.find((c) => c.number === number) || null;
  }

  private roundTo(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  private formatNumber(value: number, decimals: number): string {
    return value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }
}
