import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Workout } from 'src/app/core/models/workout';
import {
  ExerciseScoresApiService,
  SessionLoad,
} from 'src/app/features/exercise-scores/services/exercise-scores-api.service';

type ViewState = 'idle' | 'loading' | 'error' | 'loaded';

const COLLAPSE_KEY = 'tf-session-load-collapsed';

/**
 * Movimiento 6 Coach Pro — cómo queda repartida la sesión que el entrenador
 * está montando, mientras la monta.
 *
 * Es lo que da sentido a puntuar los ejercicios: sin esto, las puntuaciones
 * serían una tarea sin recompensa. Aquí se convierten en "esta sesión le da
 * 12 al pectoral y 9 al hombro", que es lo que decide si se añade otra serie
 * o se cambia de ejercicio.
 *
 * Vive en la app del entrenador y no en el componente de workout compartido:
 * el planificador es suyo, y meter una API solo-entrenador dentro de código
 * que también usa la app del cliente sería arrastrar una dependencia que no
 * le corresponde.
 *
 * Plegable y persistido: un entrenador que no puntúa ejercicios no debería
 * ver una columna vacía cada vez que abre el planificador.
 */
@Component({
  selector: 'app-session-load-panel',
  templateUrl: 'session-load-panel.component.html',
  styleUrls: ['session-load-panel.component.scss'],
})
export class SessionLoadPanelComponent implements OnChanges {
  @Input() public workout: Workout | null = null;

  public state: ViewState = 'idle';
  public load: SessionLoad | null = null;
  public collapsed = localStorage.getItem(COLLAPSE_KEY) === '1';

  constructor(private exerciseScoresApi: ExerciseScoresApiService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    // Solo se recarga cuando cambia la SESIÓN, no en cada ciclo de detección
    // de cambios: el planificador redibuja constantemente mientras se
    // arrastran tarjetas.
    if (!changes['workout']) return;
    const previous = changes['workout'].previousValue as Workout | null;
    if (previous?._id === this.workout?._id) return;

    this.load = null;
    this.state = 'idle';
    if (!this.collapsed) this.reload();
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem(COLLAPSE_KEY, this.collapsed ? '1' : '0');
    if (!this.collapsed && this.state === 'idle') this.reload();
  }

  public reload(): void {
    if (!this.workout?._id) {
      this.state = 'idle';
      return;
    }

    this.state = 'loading';
    this.exerciseScoresApi.getSessionLoad(this.workout._id).subscribe({
      next: (load) => {
        this.load = load;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // "1 h 15 min" — un total en segundos no se lee. Misma lógica que
  // formatDuration en el backend; se repite aquí (cuatro líneas) en vez de
  // hacer que el endpoint devuelva también el texto ya formateado, porque el
  // formato es cosa de la interfaz.
  public get durationLabel(): string {
    const minutes = Math.round((this.load?.estimatedSeconds || 0) / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours} h ${rest} min` : `${hours} h`;
  }

  // La barra se dibuja contra el músculo MÁS cargado de esta sesión, no
  // contra un máximo absoluto: lo que importa es el reparto relativo dentro
  // de la sesión, y un tope fijo dejaría todas las barras diminutas en una
  // sesión corta.
  public barWidth(load: number, list: { load: number }[]): number {
    const max = Math.max(...list.map((item) => item.load), 1);
    return Math.round((load / max) * 100);
  }

  public get hasAnyLoad(): boolean {
    return !!(this.load?.muscles?.length || this.load?.joints?.length);
  }

  public trackByName(_index: number, item: { name: string }): string {
    return item.name;
  }
}
