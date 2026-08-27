import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ExerciseScore, scoreFor } from 'src/app/core/constants/exercise-score';
import { ExerciseScoresApiService, ScoreCatalog } from './services/exercise-scores-api.service';
import { ScoreEditorModalComponent } from './components/score-editor-modal/score-editor-modal.component';

type ViewState = 'loading' | 'error' | 'loaded';

interface ScoredExerciseRow {
  score: ExerciseScore;
  name: string;
  // Los tres músculos que más trabaja: es lo que identifica al ejercicio de
  // un vistazo sin desplegar los dieciséis.
  topMuscles: string;
  // La articulación más cargada, si alguna llega al nivel exigente. Es lo
  // que el entrenador vigila al encadenar sesiones.
  hardestJoint: string;
}

/**
 * Movimiento 6 Coach Pro — cuánto estimula cada ejercicio a cada músculo
 * (IEM) y cuánto castiga a cada articulación (IEA), según ESTE entrenador.
 *
 * Vive en Mi método y no en Biblioteca: la biblioteca es el material que le
 * da al cliente, y esto es el criterio con el que lo programa. Es
 * literalmente la definición de "mi método".
 *
 * La pantalla lista lo YA puntuado en vez de los 200 ejercicios del
 * catálogo: puntuar es un trabajo largo que se hace poco a poco, y lo que
 * hace falta ver al volver es por dónde iba.
 */
@Component({
  selector: 'app-exercise-scores',
  templateUrl: 'exercise-scores.page.html',
  styleUrls: ['exercise-scores.page.scss'],
})
export class ExerciseScoresPage implements OnInit {
  public state: ViewState = 'loading';
  public rows: ScoredExerciseRow[] = [];
  public catalog: ScoreCatalog | null = null;
  public searchQuery = '';

  // El buscador de ejercicios sale como panel, no como pantalla aparte: se
  // usa para puntuar uno y volver, no para navegar a ningún sitio.
  public showPicker = false;

  constructor(
    private exerciseScoresApi: ExerciseScoresApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // Mismo bug de caché de ion-router-outlet que el resto de listas de la
  // app: sin esto, volver tras puntuar desde otro sitio mostraría el
  // estado anterior.
  public ionViewWillEnter(): void {
    if (this.catalog) this.load();
  }

  public load(): void {
    this.state = 'loading';

    this.exerciseScoresApi.getCatalog().subscribe({
      next: (catalog) => {
        this.catalog = catalog;
        this.loadScores();
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private loadScores(): void {
    this.exerciseScoresApi.getMine().subscribe({
      next: (scores) => {
        this.rows = (scores || []).map((score) => this.toRow(score));
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private toRow(score: ExerciseScore): ScoredExerciseRow {
    const topMuscles = [...(score.muscleScores || [])]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.name)
      .join(' · ');

    // Solo se nombra la articulación cuando llega al nivel que obliga a
    // dosificar: decir "Codo 1" en cada fila sería ruido.
    const hardest = [...(score.jointScores || [])].sort((a, b) => b.score - a.score)[0];
    const hardestJoint = hardest && hardest.score >= 2 ? hardest.name : '';

    return {
      score,
      // El nombre viene poblado por Mongoose cuando el ejercicio existe. Si
      // se borró del catálogo, la puntuación se queda huérfana y se dice.
      name: (score as unknown as { exerciseId?: { name?: string } }).exerciseId?.name || 'Ejercicio borrado',
      topMuscles,
      hardestJoint,
    };
  }

  public get filteredRows(): ScoredExerciseRow[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.rows;
    return this.rows.filter((row) => row.name.toLowerCase().includes(query));
  }

  // --- Puntuar ---
  public openPicker(): void {
    this.showPicker = true;
  }

  public closePicker(): void {
    this.showPicker = false;
  }

  public async onExerciseSelected(exercise: Exercise): Promise<void> {
    this.showPicker = false;
    await this.openEditor(exercise._id, exercise.name, null);
  }

  public async editRow(row: ScoredExerciseRow): Promise<void> {
    const exerciseId =
      (row.score as unknown as { exerciseId?: { _id?: string } }).exerciseId?._id ||
      String(row.score.exerciseId);
    await this.openEditor(exerciseId, row.name, row.score);
  }

  private async openEditor(
    exerciseId: string,
    exerciseName: string,
    existing: ExerciseScore | null
  ): Promise<void> {
    const dismissed = await this.ionicUtilService.showModal({
      component: ScoreEditorModalComponent,
      componentProps: { exerciseId, exerciseName, existing, catalog: this.catalog },
      cssClass: 'tf-panel-modal',
    });

    // El modal guarda por su cuenta y devuelve true si algo cambió: la lista
    // solo se recarga entonces, no cada vez que se cierra.
    if (dismissed?.data) this.loadScores();
  }

  public async confirmRemove(row: ScoredExerciseRow): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Quitar puntuación',
      message: `¿Seguro que quieres borrar tu puntuación de "${row.name}"? El ejercicio sigue en la biblioteca.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => this.remove(row),
        },
      ],
    });
  }

  private remove(row: ScoredExerciseRow): void {
    const exerciseId =
      (row.score as unknown as { exerciseId?: { _id?: string } }).exerciseId?._id ||
      String(row.score.exerciseId);
    this.exerciseScoresApi.remove(exerciseId).subscribe({
      next: () => this.loadScores(),
      error: () =>
        this.ionicUtilService.showErrorToast('No se pudo borrar la puntuación', 'Error', 2500),
    });
  }

  public scoreOf(row: ScoredExerciseRow, muscle: string): number {
    return scoreFor(row.score.muscleScores, muscle);
  }

  public trackByRow(_index: number, row: ScoredExerciseRow): string {
    return String(row.score._id || row.name);
  }
}
