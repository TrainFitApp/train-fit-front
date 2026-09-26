import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  ExerciseScore,
  ExerciseScoreEntry,
  SCORE_LEVELS,
  scoreFor,
} from 'src/app/core/constants/exercise-score';
import { ExerciseScoresApiService, ScoreCatalog } from '../../services/exercise-scores-api.service';

/**
 * Movimiento 6 Coach Pro — puntuar UN ejercicio.
 *
 * Dieciséis músculos y ocho articulaciones son veinticuatro decisiones. Para
 * que eso no sea una pantalla imposible:
 *   - la escala es de cuatro niveles, no de diez;
 *   - se arranca en 0 (que es la respuesta correcta para la mayoría);
 *   - las articulaciones van plegadas, porque casi todo el criterio útil
 *     está en los músculos y quien no quiera tocarlas no las ve.
 */
@Component({
  selector: 'app-score-editor-modal',
  templateUrl: 'score-editor-modal.component.html',
  styleUrls: ['score-editor-modal.component.scss'],
})
export class ScoreEditorModalComponent implements OnInit {
  @Input() public exerciseId = '';
  @Input() public exerciseName = '';
  @Input() public existing: ExerciseScore | null = null;
  // 2026-09 — `existing` trae la sugerencia por defecto (ver
  // exercise-score-defaults.js), no una puntuación que el entrenador ya
  // decidió. Sin este aviso, abrir un ejercicio nunca tocado con valores ya
  // puestos se leería como "esto ya lo puntué yo", que es falso.
  @Input() public isDefault = false;
  @Input() public catalog: ScoreCatalog | null = null;

  public readonly levels = SCORE_LEVELS;
  public muscleValues = new Map<string, number>();
  public jointValues = new Map<string, number>();
  public secondsPerSet: number | null = null;
  public showJoints = false;
  public isSaving = false;
  public isRestoring = false;

  constructor(
    private exerciseScoresApi: ExerciseScoresApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.applyScore(this.existing);
  }

  private applyScore(score: Partial<ExerciseScore> | null): void {
    for (const muscle of this.muscles) {
      this.muscleValues.set(muscle, scoreFor(score?.muscleScores, muscle));
    }
    for (const joint of this.joints) {
      this.jointValues.set(joint, scoreFor(score?.jointScores, joint));
    }
    this.secondsPerSet = score?.secondsPerSet ?? null;

    // Si ya había alguna articulación puntuada, la sección se abre sola:
    // esconder lo que el entrenador escribió haría pensar que se ha perdido.
    this.showJoints = (score?.jointScores || []).length > 0;
  }

  // Misma sugerencia con la que arranca un ejercicio sin puntuar
  // (exercise-score-defaults.js). Sin patrón que encaje, "por defecto" es el
  // editor en blanco. No guarda: eso sigue siendo cosa de save().
  public restoreDefaults(): void {
    if (this.isRestoring) return;
    this.isRestoring = true;

    this.exerciseScoresApi.getDefault(this.exerciseId).subscribe({
      next: (defaultScore) => {
        this.isRestoring = false;
        this.applyScore(defaultScore);
        this.isDefault = true;
      },
      error: () => {
        this.isRestoring = false;
        this.ionicUtilService.showErrorToast(
          'No se pudo cargar la puntuación por defecto',
          'Error',
          2500
        );
      },
    });
  }

  public get muscles(): string[] {
    return this.catalog?.muscles || [];
  }

  public get joints(): string[] {
    return this.catalog?.joints || [];
  }

  public muscleAnchor(level: number): string {
    return this.catalog?.muscleAnchors?.[level] || '';
  }

  public jointAnchor(level: number): string {
    return this.catalog?.jointAnchors?.[level] || '';
  }

  public muscleValue(muscle: string): number {
    return this.muscleValues.get(muscle) || 0;
  }

  public jointValue(joint: string): number {
    return this.jointValues.get(joint) || 0;
  }

  public setMuscle(muscle: string, level: number): void {
    this.muscleValues.set(muscle, level);
  }

  public setJoint(joint: string, level: number): void {
    this.jointValues.set(joint, level);
  }

  // Cuántos ha puntuado ya. Se enseña porque veinticuatro decisiones sin
  // ninguna señal de avance se abandonan a la mitad.
  public get scoredMuscleCount(): number {
    return [...this.muscleValues.values()].filter((value) => value > 0).length;
  }

  public get scoredJointCount(): number {
    return [...this.jointValues.values()].filter((value) => value > 0).length;
  }

  public toggleJoints(): void {
    this.showJoints = !this.showJoints;
  }

  public cancel(): void {
    // false = no se ha guardado nada, la lista de detrás no necesita
    // recargarse.
    this.modalController.dismiss(false);
  }

  public save(): void {
    if (this.isSaving) return;
    this.isSaving = true;

    this.exerciseScoresApi
      .save(this.exerciseId, {
        muscleScores: toEntries(this.muscleValues),
        jointScores: toEntries(this.jointValues),
        secondsPerSet: this.secondsPerSet,
      })
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.modalController.dismiss(true);
        },
        error: () => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(
            'No se pudo guardar la puntuación',
            'Error',
            2500
          );
        },
      });
  }

  public trackByName(_index: number, name: string): string {
    return name;
  }

  public trackByLevel(_index: number, level: number): number {
    return level;
  }
}

// Los ceros no se mandan: el backend los descarta igualmente (la ausencia ya
// significa "no lo trabaja"), y enviarlos sería mandar dieciséis entradas
// para guardar tres.
function toEntries(values: Map<string, number>): ExerciseScoreEntry[] {
  return [...values.entries()]
    .filter(([, score]) => score > 0)
    .map(([name, score]) => ({ name, score }));
}
