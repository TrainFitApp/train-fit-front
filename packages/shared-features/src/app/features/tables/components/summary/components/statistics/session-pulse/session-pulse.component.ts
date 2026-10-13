import { Component, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'src/app/core/models/table';
import { DaySession } from '../../routine-calendar/routine-calendar.component';
import { hasPulse, SessionPulse, sessionPulseAt } from './session-pulse.util';

/**
 * "Cómo llegaste y cómo acabaste" en las Estadísticas del cliente: el
 * readiness que se pregunta al empezar, el esfuerzo que se pregunta al
 * terminar y las agujetas del entrenamiento pulsado en el calendario. Todo
 * sale de la rutina cargada (session-pulse.util.ts). Casi siempre es una
 * sesión; si ese día se cerraron dos, salen las dos.
 */
@Component({
  selector: 'app-session-pulse',
  templateUrl: './session-pulse.component.html',
  styleUrls: ['./session-pulse.component.scss'],
})
export class SessionPulseComponent implements OnChanges {
  @Input() public table: Table | null = null;
  @Input() public sessions: DaySession[] = [];

  public pulses: SessionPulse[] = [];
  public readonly hasPulse = hasPulse;

  constructor(private translate: TranslateService) {}

  public ngOnChanges(): void {
    this.pulses = (this.sessions || [])
      .map((session) => sessionPulseAt(this.table, session.splitIndex, session.workoutIndex))
      .filter((pulse): pulse is SessionPulse => pulse !== null);
  }

  public readinessAnchor(level: number | null): string {
    return this.anchor('TABLES.READINESS_ANCHORS', level);
  }

  public effortAnchor(level: number | null): string {
    return this.anchor('TABLES.EFFORT_ANCHORS', level);
  }

  private anchor(key: string, level: number | null): string {
    if (level === null) return '';
    const anchors = this.translate.instant(key);
    return Array.isArray(anchors) ? anchors[level - 1] || '' : '';
  }
}
