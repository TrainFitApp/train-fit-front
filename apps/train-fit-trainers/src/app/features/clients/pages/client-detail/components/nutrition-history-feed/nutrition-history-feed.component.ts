import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  NutritionWeekEvent,
  NutritionWeekStatus,
  NutritionHistoryEvent,
} from '../../../../../../shared/models/diet-phase.model';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

export interface WeekOpenRequest {
  phaseId: string;
  number: number;
  start: string;
  end: string;
}

const STATUS_LABELS: Record<NutritionWeekStatus, string> = {
  running: 'En curso',
  met: 'Cumplido',
  missed: 'No cumplido',
  no_data: 'Sin datos',
};
localizeRecord(STATUS_LABELS, 'CLIENTS.WEEK_STATUS');

// Historial de nutrición de la ficha: feed plano de eventos (fase, semana),
// del más reciente al más antiguo. El desglose por semana es el que importa:
// en qué semana estaba, con qué kcal y macros, si la cumplió y qué días se
// saltó. Los check-ins no van aquí. Solo lectura; la semana abre su resumen
// (week-summary-panel).
@Component({
  selector: 'app-nutrition-history-feed',
  templateUrl: './nutrition-history-feed.component.html',
  styleUrls: ['./nutrition-history-feed.component.scss'],
})
export class NutritionHistoryFeedComponent {
  private readonly translate = inject(TranslateService);

  @Input() public events: NutritionHistoryEvent[] = [];
  // Color por fase — el mismo que la fila de fases de arriba (phaseColorMap).
  @Input() public phaseColorOf: (phaseId: string) => string = () => 'var(--tf-accent)';
  @Output() public openWeek = new EventEmitter<WeekOpenRequest>();

  public trackByEvent(_index: number, event: NutritionHistoryEvent): string {
    const id = event.type === 'week' ? event.number : '';
    return `${event.type}:${event.phaseId}:${id}`;
  }

  public statusLabel(status: NutritionWeekStatus): string {
    return STATUS_LABELS[status];
  }


  public phaseLabel(event: NutritionHistoryEvent): string {
    return event.phaseName || this.translate.instant('CLIENTS.FASE_SIN_NOMBRE');
  }

  public kcalDeltaLabel(week: NutritionWeekEvent): string | null {
    if (week.kcalDelta == null || week.kcalDelta === 0) return null;
    return `${week.kcalDelta > 0 ? '+' : ''}${week.kcalDelta} kcal vs S${week.number - 1}`;
  }

  public requestOpen(week: NutritionWeekEvent): void {
    this.openWeek.emit({ phaseId: week.phaseId, number: week.number, start: week.start, end: week.end });
  }
}
