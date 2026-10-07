import { Component, DoCheck, Input } from '@angular/core';
import { Split } from 'src/app/core/models/split';
import {
  ExerciseScoresApiService,
  SessionLoad,
} from 'src/app/features/exercise-scores/services/exercise-scores-api.service';

type ViewState = 'idle' | 'loading' | 'error' | 'loaded';

/**
 * Estrés articular de un microciclo entero (pestaña Semana del panel de
 * análisis). Es la suma de sus sesiones con el mismo cálculo que la pestaña
 * Sesión (puntuación de la articulación × series), así que los dos números
 * se leen igual. Se calcula en el backend (GET exercise-scores/split/:id)
 * por el mismo motivo que la carga de una sesión: necesita las puntuaciones
 * del entrenador y sus sugerencias por defecto.
 */
@Component({
  selector: 'app-joint-stress-panel',
  templateUrl: 'joint-stress-panel.component.html',
  styleUrls: ['joint-stress-panel.component.scss'],
})
export class JointStressPanelComponent implements DoCheck {
  @Input() public split: Split | null = null;

  public state: ViewState = 'idle';
  public load: SessionLoad | null = null;

  private lastSignature = '';

  constructor(private exerciseScoresApi: ExerciseScoresApiService) {}

  // Mismo motivo que session-load-panel: el planificador muta el microciclo
  // en sitio, así que se vigila una firma barata (qué microciclo, cuántas
  // sesiones, ejercicios y series) en vez de la referencia.
  public ngDoCheck(): void {
    const signature = this.buildSignature();
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;
    this.reload();
  }

  private buildSignature(): string {
    const split = this.split;
    if (!split?._id) return '';

    let exercises = 0;
    let sets = 0;
    for (const workout of split.workouts || []) {
      for (const exercise of workout.exercises || []) {
        exercises += 1;
        sets += exercise.sets?.length || 0;
      }
    }
    return `${split._id}|${(split.workouts || []).length}|${exercises}|${sets}`;
  }

  public reload(): void {
    this.load = null;
    if (!this.split?._id) {
      this.state = 'idle';
      return;
    }

    this.state = 'loading';
    this.exerciseScoresApi.getSplitLoad(this.split._id).subscribe({
      next: (load) => {
        this.load = load;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Contra la articulación más cargada del microciclo: aquí solo hay
  // articulaciones, así que no hace falta compartir escala con los músculos.
  public barWidth(load: number): number {
    const max = Math.max(...(this.load?.joints || []).map((item) => item.load), 1);
    return Math.round((load / max) * 100);
  }

  public trackByName(_index: number, item: { name: string }): string {
    return item.name;
  }
}
