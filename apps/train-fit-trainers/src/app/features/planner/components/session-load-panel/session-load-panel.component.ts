import { Component, DoCheck, Input } from '@angular/core';
import { Workout } from 'src/app/core/models/workout';
import { countWorkoutByMuscleGroup } from '../../utils/planner-metrics';
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
export class SessionLoadPanelComponent implements DoCheck {
  @Input() public workout: Workout | null = null;
  // 2026-09 — dentro de <app-planner-insights-panel> (pestaña "Sesión") el
  // marco lo pone el padre: aquí solo se pinta el contenido.
  @Input() public embedded = false;

  public state: ViewState = 'idle';
  public load: SessionLoad | null = null;
  public collapsed = localStorage.getItem(COLLAPSE_KEY) === '1';

  private lastSignature = '';

  constructor(private exerciseScoresApi: ExerciseScoresApiService) {}

  // ngDoCheck y no ngOnChanges (2026-09): el planificador MUTA el workout en
  // sitio (añadir serie, cambiar descanso, quitar ejercicio) sin cambiar la
  // referencia, así que ngOnChanges no se disparaba nunca y el panel se
  // quedaba con el primer cálculo — justo en el caso de uso que dice servir,
  // "cómo queda repartida la sesión MIENTRAS la monta". La firma es barata
  // (una sesión tiene ~6-10 ejercicios) y solo dispara petición cuando
  // cambia de verdad algo que altera el resultado: qué sesión es, cuántos
  // ejercicios, cuántas series y cuánto descanso (los dos últimos entran en
  // la duración estimada).
  public ngDoCheck(): void {
    const signature = this.buildSignature();
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;

    this.load = null;
    this.state = 'idle';
    if (this.embedded || !this.collapsed) this.reload();
  }

  private buildSignature(): string {
    const workout = this.workout;
    if (!workout?._id) return '';

    let sets = 0;
    let rest = 0;
    for (const exercise of workout.exercises || []) {
      for (const set of exercise.sets || []) {
        sets += 1;
        rest += set.restSeconds || 0;
      }
    }
    return `${workout._id}|${(workout.exercises || []).length}|${sets}|${rest}`;
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

  // La barra se dibuja contra lo más cargado de esta sesión, no contra un
  // tope absoluto: lo que importa es el reparto relativo dentro de la
  // sesión, y un máximo fijo dejaría todas las barras diminutas en una
  // sesión corta.
  //
  // 2026-09 — escala ÚNICA para músculos y articulaciones. Antes cada lista
  // se normalizaba contra su propio máximo, así que la primera articulación
  // salía siempre como una barra llena (y roja) aunque su carga fuese 1
  // frente a un 30 del pectoral: dos escalas distintas, una al lado de la
  // otra, sin decirlo.
  public barWidth(load: number): number {
    return Math.round((load / this.scaleMax) * 100);
  }

  private get scaleMax(): number {
    const loads = [
      ...(this.load?.muscles || []).map((item) => item.load),
      ...(this.load?.joints || []).map((item) => item.load),
    ];
    return Math.max(...loads, 1);
  }

  public get hasAnyLoad(): boolean {
    return !!(this.load?.muscles?.length || this.load?.joints?.length);
  }

  // Series REALES por grupo muscular de esta sesión (2026-09). Va ANTES del
  // reparto de puntuaciones a propósito: es el dato objetivo (cuenta Sets
  // sobre Exercise.muscleGroups1, sin configurar nada), mientras que el
  // reparto de abajo depende de que el entrenador haya puntuado ejercicios
  // en "Mi método". Un panel que empieza pidiendo trabajo previo para
  // enseñar algo es un panel que nadie mira.
  public get seriesByMuscle(): { name: string; count: number }[] {
    const counts = countWorkoutByMuscleGroup(this.workout);
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  public get totalWorkoutSets(): number {
    return (this.workout?.exercises || []).reduce((sum, e) => sum + (e.sets?.length || 0), 0);
  }

  public seriesBarWidth(count: number): number {
    const max = Math.max(...this.seriesByMuscle.map((row) => row.count), 1);
    return Math.round((count / max) * 100);
  }

  // Tres vacíos distintos que antes se contaban todos como "no has puntuado
  // nada", culpando al entrenador de lo que muchas veces era otra cosa.
  public get emptyReason(): 'no-exercises' | 'no-sets' | 'unscored' | null {
    if (!this.load || this.hasAnyLoad) return null;
    if (!this.load.totalExercises) return 'no-exercises';
    if (this.load.unscoredExercises >= this.load.totalExercises) return 'unscored';
    return 'no-sets';
  }

  public trackByName(_index: number, item: { name: string }): string {
    return item.name;
  }
}
