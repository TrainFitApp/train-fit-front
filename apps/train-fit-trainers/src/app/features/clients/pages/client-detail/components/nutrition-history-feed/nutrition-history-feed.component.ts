import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CHECKIN_FIELDS_BY_KEY, checkinScaleSuffix } from 'src/app/core/constants/checkin-fields';
import {
  NutritionWeekEvent,
  NutritionWeekStatus,
  NutritionHistoryCheckin,
  NutritionHistoryEvent,
} from '../../../../../../shared/models/plan-assignment.model';
import { CustomCheckinQuestion } from '../../../../../checkin-templates/models/checkin-template.model';
import { checkinFieldLabel, checkinValueLabel } from '../../../../checkin-labels.util';

export interface WeekOpenRequest {
  number: number;
  start: string;
  end: string;
  overrideId: string;
}

const STATUS_LABELS: Record<NutritionWeekStatus, string> = {
  running: 'En curso',
  met: 'Cumplido',
  missed: 'No cumplido',
  no_data: 'Sin datos',
};

// Historial de nutrición de la ficha: feed plano de eventos (fase, semana,
// check-in, día saltado), del más reciente al más antiguo. El desglose por
// semana es el que importa: en qué semana estaba, si la cumplió, si metió
// check-in. Solo lectura; la semana abre su resumen
// (week-summary-panel).
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
  // Preguntas propias que traen las respuestas del feed, para nombrar las
  // claves "custom:<id>".
  @Input() public checkinQuestions: CustomCheckinQuestion[] = [];
  @Output() public openWeek = new EventEmitter<WeekOpenRequest>();

  public trackByEvent(_index: number, event: NutritionHistoryEvent): string {
    const id =
      event.type === 'week' ? event.number
      : event.type === 'checkin' ? event.checkin.id
      : event.type === 'skipped_day' ? event.date
      : '';
    return `${event.type}:${event.phaseId}:${id}`;
  }

  public statusLabel(status: NutritionWeekStatus): string {
    return STATUS_LABELS[status];
  }


  public phaseLabel(event: NutritionHistoryEvent): string {
    return event.phaseName || 'Fase sin nombre';
  }

  public kcalDeltaLabel(week: NutritionWeekEvent): string | null {
    if (week.kcalDelta == null || week.kcalDelta === 0) return null;
    return `${week.kcalDelta > 0 ? '+' : ''}${week.kcalDelta} kcal vs S${week.number - 1}`;
  }

  // "Peso: 80 kg", "Sueño: 4/5" — todo lo que respondió, con su unidad.
  public checkinEntries(checkin: NutritionHistoryCheckin): { key: string; label: string; value: string }[] {
    return Object.entries(checkin.values || {}).map(([key, raw]) => {
      const field = CHECKIN_FIELDS_BY_KEY.get(key);
      const suffix = checkinScaleSuffix(key) || (field?.unit ? ` ${field.unit}` : '');
      return {
        key,
        label: checkinFieldLabel(key, this.checkinQuestions),
        value: `${checkinValueLabel(raw)}${suffix}`,
      };
    });
  }

  public trackByKey(_index: number, entry: { key: string }): string {
    return entry.key;
  }

  public requestOpen(week: NutritionWeekEvent): void {
    this.openWeek.emit({ number: week.number, start: week.start, end: week.end, overrideId: week.overrideId });
  }
}
