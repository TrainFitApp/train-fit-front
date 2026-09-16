import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CHECKIN_FIELDS_BY_KEY, checkinScaleSuffix } from 'src/app/core/constants/checkin-fields';
import {
  NutritionCycleEvent,
  NutritionCycleStatus,
  NutritionHistoryCheckin,
  NutritionHistoryEvent,
  NutritionHistoryException,
} from '../../../../../../shared/models/plan-assignment.model';
import { CheckinConfig } from '../../models/client-detail.model';
import { checkinFieldLabel, checkinValueLabel } from '../../../../checkin-labels.util';

export interface CycleOpenRequest {
  number: number;
  start: string;
  end: string;
  overrideId: string;
}

const STATUS_LABELS: Record<NutritionCycleStatus, string> = {
  running: 'En curso',
  met: 'Cumplido',
  missed: 'No cumplido',
  no_data: 'Sin datos',
};

const FOCUS_LABELS: Record<'cut' | 'maintain' | 'bulk', string> = {
  cut: 'Definición',
  maintain: 'Mantenimiento',
  bulk: 'Volumen',
};

const MODE_LABELS: Record<string, string> = {
  sequential: 'Días fijos',
  recurring: 'Semanal',
  choice: 'Menús a elegir',
};

// Historial de nutrición de la ficha: feed plano de eventos (fase, ciclo,
// check-in, excepción), del más reciente al más antiguo. El desglose por
// ciclo es el que importa: en qué ciclo estaba, si lo cumplió, si metió
// check-in. Solo lectura; el ciclo abre su resumen (cycle-summary-panel).
@Component({
  selector: 'app-nutrition-history-feed',
  templateUrl: './nutrition-history-feed.component.html',
  styleUrls: ['./nutrition-history-feed.component.scss'],
})
export class NutritionHistoryFeedComponent {
  @Input() public events: NutritionHistoryEvent[] = [];
  // Color por fase — el mismo que la fila de fases de arriba (phaseColorMap).
  @Input() public phaseColorOf: (phaseId: string) => string = () => 'var(--tf-accent)';
  // Para nombrar las preguntas propias del coach ("custom:<id>").
  @Input() public checkinConfig: CheckinConfig | null = null;
  @Output() public openCycle = new EventEmitter<CycleOpenRequest>();

  public trackByEvent(_index: number, event: NutritionHistoryEvent): string {
    const id =
      event.type === 'cycle' ? event.number
      : event.type === 'checkin' ? event.checkin.id
      : event.type === 'exception' ? event.exception.id
      : '';
    return `${event.type}:${event.phaseId}:${id}`;
  }

  public statusLabel(status: NutritionCycleStatus): string {
    return STATUS_LABELS[status];
  }

  public focusLabel(focus: 'cut' | 'maintain' | 'bulk' | null): string | null {
    return focus ? FOCUS_LABELS[focus] : null;
  }

  public modeLabel(mode: string | null): string | null {
    return mode ? MODE_LABELS[mode] || null : null;
  }

  public phaseLabel(event: NutritionHistoryEvent): string {
    return event.phaseName || 'Fase sin nombre';
  }

  public kcalDeltaLabel(cycle: NutritionCycleEvent): string | null {
    if (cycle.kcalDelta == null || cycle.kcalDelta === 0) return null;
    return `${cycle.kcalDelta > 0 ? '+' : ''}${cycle.kcalDelta} kcal vs C${cycle.number - 1}`;
  }

  public exceptionLabel(exception: NutritionHistoryException): string {
    if (exception.action === 'skip') return 'Día saltado';
    return exception.mealSlot ? `Comida sustituida · ${exception.mealSlot}` : 'Comida sustituida';
  }

  // "Peso: 80 kg", "Sueño: 4/5" — todo lo que respondió, con su unidad.
  public checkinEntries(checkin: NutritionHistoryCheckin): { key: string; label: string; value: string }[] {
    return Object.entries(checkin.values || {}).map(([key, raw]) => {
      const field = CHECKIN_FIELDS_BY_KEY.get(key);
      const suffix = checkinScaleSuffix(key) || (field?.unit ? ` ${field.unit}` : '');
      return {
        key,
        label: checkinFieldLabel(key, this.checkinConfig?.customQuestions || []),
        value: `${checkinValueLabel(raw)}${suffix}`,
      };
    });
  }

  public trackByKey(_index: number, entry: { key: string }): string {
    return entry.key;
  }

  public requestOpen(cycle: NutritionCycleEvent): void {
    this.openCycle.emit({ number: cycle.number, start: cycle.start, end: cycle.end, overrideId: cycle.overrideId });
  }
}
