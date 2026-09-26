import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckinSummary } from '../checkin-workspace/checkin-workspace.model';

// Rangos del resumen, hoy incluido.
const RANGES = [
  { days: 1, label: '1 día' },
  { days: 7, label: '1 semana' },
  { days: 90, label: '3 meses' },
  { days: 180, label: '6 meses' },
  { days: 365, label: '1 año' },
  { days: 3 * 365, label: '3 años' },
];

/**
 * "Cómo va el seguimiento": qué debe este cliente ahora mismo. Solo pinta:
 * los datos los carga checkin-workspace, que ya tiene la agenda y rehace el
 * resumen tras cada cambio.
 *   pending → respuestas por revisar, de cualquier fecha (es trabajo tuyo,
 *             no caduca con el rango).
 *   summary → ocurrencias abiertas y cerradas sin responder dentro del rango.
 */
@Component({
  selector: 'app-tracking-status',
  templateUrl: './tracking-status.component.html',
  styleUrls: ['./tracking-status.component.scss'],
})
export class TrackingStatusComponent {
  @Input() pending = 0;
  @Input() summary: CheckinSummary | null = null;
  @Input() state: 'loading' | 'loaded' | 'error' = 'loading';
  @Input() days = 90;
  @Output() daysChange = new EventEmitter<number>();
  @Output() retry = new EventEmitter<void>();

  public readonly ranges = RANGES;
}
