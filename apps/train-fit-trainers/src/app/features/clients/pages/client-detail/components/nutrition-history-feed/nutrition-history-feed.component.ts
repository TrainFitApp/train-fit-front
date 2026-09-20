import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CHECKIN_FIELDS_BY_KEY, checkinScaleSuffix } from 'src/app/core/constants/checkin-fields';
import {
  NutritionRevisionEvent,
  NutritionRevisionStatus,
  NutritionHistoryCheckin,
  NutritionHistoryEvent,
} from '../../../../../../shared/models/plan-assignment.model';
import { CustomCheckinQuestion } from '../../../../../checkin-templates/models/checkin-template.model';
import { checkinFieldLabel, checkinValueLabel } from '../../../../checkin-labels.util';

export interface RevisionOpenRequest {
  number: number;
  start: string;
  end: string;
  overrideId: string;
}

const STATUS_LABELS: Record<NutritionRevisionStatus, string> = {
  running: 'En curso',
  met: 'Cumplido',
  missed: 'No cumplido',
  no_data: 'Sin datos',
};

// Historial de nutrición de la ficha: feed plano de eventos (fase, revisión,
// check-in, día saltado), del más reciente al más antiguo. El desglose por
// revisión es el que importa: en qué revisión estaba, si la cumplió, si metió
// check-in. Solo lectura; la revisión abre su resumen
// (revision-summary-panel).
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
  @Output() public openRevision = new EventEmitter<RevisionOpenRequest>();

  public trackByEvent(_index: number, event: NutritionHistoryEvent): string {
    const id =
      event.type === 'revision' ? event.number
      : event.type === 'checkin' ? event.checkin.id
      : event.type === 'skipped_day' ? event.date
      : '';
    return `${event.type}:${event.phaseId}:${id}`;
  }

  public statusLabel(status: NutritionRevisionStatus): string {
    return STATUS_LABELS[status];
  }


  public phaseLabel(event: NutritionHistoryEvent): string {
    return event.phaseName || 'Fase sin nombre';
  }

  public kcalDeltaLabel(revision: NutritionRevisionEvent): string | null {
    if (revision.kcalDelta == null || revision.kcalDelta === 0) return null;
    return `${revision.kcalDelta > 0 ? '+' : ''}${revision.kcalDelta} kcal vs R${revision.number - 1}`;
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

  public requestOpen(revision: NutritionRevisionEvent): void {
    this.openRevision.emit({ number: revision.number, start: revision.start, end: revision.end, overrideId: revision.overrideId });
  }
}
