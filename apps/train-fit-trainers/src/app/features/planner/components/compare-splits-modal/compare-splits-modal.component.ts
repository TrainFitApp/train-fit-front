import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { Split, SPLIT_PURPOSES } from 'src/app/core/models/split';
import {
  CompareExerciseRow,
  CompareResult,
  CompareWorkoutRow,
  compareSplits,
} from '../../utils/planner-compare';
import {
  ComparisonMode,
  MetricComparison,
  comparisonSnapshot,
  completionSummary,
  exerciseMetrics,
  metricComparison,
  overviewMetrics,
} from '../../utils/planner-comparison-view';

type ExerciseView = CompareExerciseRow & {
  metrics: MetricComparison[];
  details: { a: string; b: string }[];
};
type WorkoutView = Omit<CompareWorkoutRow, 'exercises'> & {
  exercises: ExerciseView[];
};

/** Instantánea de solo lectura: el tablero no puede editarse bajo el modal. */
@Component({
  selector: 'app-compare-splits-modal',
  templateUrl: 'compare-splits-modal.component.html',
  styleUrls: ['compare-splits-modal.component.scss'],
})
export class CompareSplitsModalComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() public splits: Split[] = [];
  @Input() public indexA = 0;
  @Input() public indexB = 1;

  public mode: ComparisonMode = 'plan';
  public onlyChanges = false;
  public result: CompareResult | null = null;
  public metrics: MetricComparison[] = [];
  public workouts: WorkoutView[] = [];
  public visibleWorkouts: WorkoutView[] = [];
  public muscles: (CompareResult['muscles'][number] & {
    metric: MetricComparison;
    widthA: number;
    widthB: number;
  })[] = [];
  public completionA = completionSummary(null);
  public completionB = completionSummary(null);
  public visibleCount = 0;
  public totalCount = 0;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    this.indexA = this.validIndex(this.indexA) ? this.indexA : 0;
    this.indexB =
      this.validIndex(this.indexB) && this.indexB !== this.indexA
        ? this.indexB
        : this.indexA === 0
        ? 1
        : 0;
    this.recalculate();
  }

  public get splitA(): Split | null {
    return this.splits[this.indexA] || null;
  }
  public get splitB(): Split | null {
    return this.splits[this.indexB] || null;
  }
  public get hasPair(): boolean {
    return !!this.splitA && !!this.splitB && this.indexA !== this.indexB;
  }

  public recalculate(): void {
    const a = comparisonSnapshot(this.splitA, this.mode);
    const b = comparisonSnapshot(this.splitB, this.mode);
    this.result = compareSplits(a, b);
    this.metrics = overviewMetrics(a, b);
    this.completionA = completionSummary(this.splitA);
    this.completionB = completionSummary(this.splitB);
    this.workouts = this.result.workouts.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => ({
        ...exercise,
        metrics: exerciseMetrics(exercise),
        details: Array.from(
          {
            length: Math.max(
              exercise.a?.details.length || 0,
              exercise.b?.details.length || 0
            ),
          },
          (_, index) => ({
            a: exercise.a?.details[index] || '—',
            b: exercise.b?.details[index] || '—',
          })
        ),
      })),
    }));
    const max = Math.max(
      1,
      ...this.result.muscles.flatMap((muscle) => [muscle.a, muscle.b])
    );
    this.muscles = this.result.muscles.map((muscle) => ({
      ...muscle,
      metric: metricComparison(muscle.name, muscle.name, muscle.a, muscle.b),
      widthA: (muscle.a / max) * 100,
      widthB: (muscle.b / max) * 100,
    }));
    this.totalCount = this.workouts.reduce(
      (sum, row) => sum + row.exercises.length,
      0
    );
    this.filterWorkouts();
  }

  public filterWorkouts(): void {
    this.visibleWorkouts = this.workouts
      .map((workout) => ({
        ...workout,
        exercises: workout.exercises.filter(
          (exercise) => !this.onlyChanges || exercise.status !== 'same'
        ),
      }))
      .filter(
        (workout) =>
          !this.onlyChanges ||
          workout.exercises.length ||
          workout.hasChanges ||
          workout.onlyIn
      );
    this.visibleCount = this.visibleWorkouts.reduce(
      (sum, row) => sum + row.exercises.length,
      0
    );
  }

  public onModeChange(value: unknown): void {
    if (value !== 'plan' && value !== 'done') return;
    this.mode = value;
    this.recalculate();
  }

  public onSelectA(value: unknown): void {
    const index = Number(value);
    if (!this.validIndex(index) || index === this.indexA) return;
    if (index === this.indexB) this.indexB = this.indexA;
    this.indexA = index;
    this.recalculate();
  }

  public onSelectB(value: unknown): void {
    const index = Number(value);
    if (!this.validIndex(index) || index === this.indexB) return;
    if (index === this.indexA) this.indexA = this.indexB;
    this.indexB = index;
    this.recalculate();
  }

  public swap(): void {
    [this.indexA, this.indexB] = [this.indexB, this.indexA];
    this.recalculate();
  }

  public labelFor(index: number): string {
    return this.translate.instant('TABLES.MICROCYCLE_N', { p0: index + 1 });
  }
  public purposeLabel(split: Split | null): string {
    return (
      SPLIT_PURPOSES.find((purpose) => purpose.key === split?.purpose)?.label ||
      this.translate.instant('PLANNER.NORMAL')
    );
  }
  public statusLabel(exercise: CompareExerciseRow): string {
    switch (exercise.status) {
      case 'added':
        return this.translate.instant('PLANNER.SOLO_EN_2');
      case 'removed':
        return this.translate.instant('PLANNER.SOLO_EN_3');
      case 'moved':
        return this.translate.instant('PLANNER.MOVIDO_DESDE_POSICION', { p0: (exercise.movedFrom ?? 0) + 1 });
      case 'changed':
        return this.translate.instant('PLANNER.MODIFICADO');
      default:
        return this.translate.instant('PLANNER.SIN_CAMBIOS_2');
    }
  }
  public trendIcon(metric: MetricComparison): string {
    return metric.direction === 'up'
      ? 'arrow-up-outline'
      : metric.direction === 'down'
      ? 'arrow-down-outline'
      : 'remove-outline';
  }
  public close(): void {
    void this.modalController.dismiss();
  }
  public trackByIndex(index: number): number {
    return index;
  }
  private validIndex(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < this.splits.length;
  }
}
