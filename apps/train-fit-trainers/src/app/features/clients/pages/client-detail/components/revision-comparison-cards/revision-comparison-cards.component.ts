import { Component, Input, OnChanges } from '@angular/core';
import { PhaseRevisionsResponse } from '../../../../../diet-templates/models/diet-suggestion.model';

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

export interface ComparableRevision {
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

// Dos cards bajo la gráfica de Seguimiento: a la izquierda una revisión con
// sus kcal/macros PAUTADOS y, al lado de cada cifra, cuánto sube o baja
// respecto a la de la derecha (la referencia). Por defecto la revisión en
// curso contra la anterior; cada card tiene su selector.
//
// Solo lo pautado (el perfil del contenido de cada revisión, el mismo "3905
// kcal" de las tarjetas), no lo consumido: responde "¿qué cambié de una
// revisión a otra?", y ya viene entero en phaseRevisions — sin peticiones
// propias. Van por libre: el rango de la gráfica o el calendario
// no las mueven. Deltas en neutro (sin verde/rojo): que suban las kcal no es
// bueno ni malo por sí solo, depende del objetivo de la fase.
@Component({
  selector: 'app-revision-comparison-cards',
  templateUrl: './revision-comparison-cards.component.html',
  styleUrls: ['./revision-comparison-cards.component.scss'],
})
export class RevisionComparisonCardsComponent implements OnChanges {
  @Input() phaseRevisions: PhaseRevisionsResponse | null = null;

  public readonly metrics = METRICS;
  public revisions: ComparableRevision[] = [];
  public leftNumber: number | null = null;
  public rightNumber: number | null = null;

  public ngOnChanges(): void {
    this.revisions = this.buildRevisions(this.phaseRevisions);
    // Se conserva lo elegido si sigue existiendo; si no (primera carga, o
    // la fase cambió y esa revisión ya no está), se vuelve al defecto: el
    // actual contra el anterior.
    if (!this.revisionByNumber(this.leftNumber)) {
      this.leftNumber = this.phaseRevisions?.current?.number ?? this.revisions[this.revisions.length - 1]?.number ?? null;
    }
    if (!this.revisionByNumber(this.rightNumber) || this.rightNumber === this.leftNumber) {
      this.rightNumber = this.defaultRightFor(this.leftNumber);
    }
  }

  public get left(): ComparableRevision | null {
    return this.revisionByNumber(this.leftNumber);
  }

  public get right(): ComparableRevision | null {
    return this.revisionByNumber(this.rightNumber);
  }

  // Sin otra revisión con la que comparar (solo existe R1 y no hay siguiente
  // preparado) la card derecha no tiene nada que enseñar.
  public get hasComparison(): boolean {
    return this.revisions.length > 1;
  }

  public selectLeft(value: string): void {
    const number = Number(value);
    if (!this.revisionByNumber(number)) return;
    this.leftNumber = number;
    if (this.rightNumber === number) this.rightNumber = this.defaultRightFor(number);
  }

  public selectRight(value: string): void {
    const number = Number(value);
    if (!this.revisionByNumber(number)) return;
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

  public revisionOptionLabel(revision: ComparableRevision): string {
    const suffix = revision.status === 'current' ? ' · en curso' : revision.status === 'next' ? ' · siguiente' : '';
    return `R${revision.number} · ${this.formatRange(revision)}${suffix}`;
  }

  public statusLabel(revision: ComparableRevision): string {
    if (revision.status === 'current') return 'En curso';
    if (revision.status === 'next') return 'Próxima';
    return 'Anterior';
  }

  public formatRange(revision: ComparableRevision): string {
    const fmt = (iso: string): string =>
      new Date(iso + 'T00:00:00Z').toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
    return revision.end ? `${fmt(revision.start)} → ${fmt(revision.end)}` : `desde ${fmt(revision.start)}`;
  }

  public trackByNumber(_index: number, revision: ComparableRevision): number {
    return revision.number;
  }

  public trackByMetric(_index: number, metric: MetricRow): string {
    return metric.key;
  }

  // R1..la que corre siempre (las heredadas repiten el perfil del último
  // contenido persistido, pero son revisiones reales del calendario y se
  // pueden elegir igual); la siguiente solo si ya tiene contenido propio
  // preparado — heredando sería idéntica a la actual y no aportaría nada.
  private buildRevisions(phaseRevisions: PhaseRevisionsResponse | null): ComparableRevision[] {
    if (!phaseRevisions) return [];
    const revisions: ComparableRevision[] = phaseRevisions.past.map((p) => ({
      number: p.number,
      start: p.start,
      end: p.end,
      profile: p.profile,
      status: 'past' as const,
    }));
    const current = phaseRevisions.current;
    if (current?.override?.profile) {
      revisions.push({
        number: current.number,
        start: current.start,
        end: current.end,
        profile: current.override.profile,
        status: 'current',
      });
    }
    const next = phaseRevisions.next;
    if (next?.override?.profile) {
      revisions.push({
        number: next.number,
        start: next.start,
        end: next.end,
        profile: next.override.profile,
        status: 'next',
      });
    }
    return revisions.sort((a, b) => a.number - b.number);
  }

  // La inmediatamente anterior, o null si no la hay (la izquierda es R1):
  // entonces la derecha queda vacía — "sin anterior, sin datos" — aunque el
  // trainer pueda elegir a mano el siguiente si está preparado.
  private defaultRightFor(leftNumber: number | null): number | null {
    if (leftNumber === null) return null;
    return this.revisions.filter((r) => r.number < leftNumber).pop()?.number ?? null;
  }

  private revisionByNumber(number: number | null): ComparableRevision | null {
    if (number === null) return null;
    return this.revisions.find((r) => r.number === number) || null;
  }

  private roundTo(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  private formatNumber(value: number, decimals: number): string {
    return value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }
}
