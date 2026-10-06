import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  TRAINING_COMPARISON_METRIC_LABELS,
  TrainingComparisonMetric,
  TrainingGranularity,
} from '../../models/client-progress.model';

// Comparación de varios ejercicios a la vez (2026-09 bis) — mismo tope que
// MAX_COMPARED_EXERCISES en client-progress-controller.js: más líneas en la
// misma gráfica deja de leerse (mismo criterio que TOP_EXERCISES=5 en
// "evolución de cargas" de Resumen).
export const MAX_COMPARED_EXERCISES = 5;

// Comparar por ejercicio (2026-09) — el resultado deja de ser solo la
// métrica: en modo 'exercise' hace falta también CUÁLES. Un objeto en vez de
// varios parámetros de dismiss() separados, para que el consumidor no tenga
// que adivinar en qué orden llegan.
export interface TrainingFilterResult {
  metric: TrainingComparisonMetric;
  // Varios a la vez (2026-09 bis) — array vacío = ninguno elegido todavía.
  exercises: string[];
  granularity: TrainingGranularity;
  // "Elegir el workout a ver" (2026-09) — null = todos los entrenamientos
  // mezclados (como hasta ahora). No es parte de `metric`: es un filtro
  // ortogonal, aplicable a cualquier métrica.
  workout: string | null;
}

// Tarea 4 (2026-09) — panel de filtro de la gráfica de comparación de
// Entrenamiento. Mismo patrón que ApplyCheckinTemplateModalComponent: ion-modal
// real vía ModalController (no un <div position:fixed> a mano, que queda
// tapado por el header de la propia página), cssClass 'tf-panel-modal' para
// el aspecto de panel anclado a la derecha en escritorio.
@Component({
  selector: 'app-training-filter-panel',
  templateUrl: './training-filter-panel.component.html',
  styleUrls: ['./training-filter-panel.component.scss'],
})
export class TrainingFilterPanelComponent {
  @Input() selectedMetric: TrainingComparisonMetric = 'volume';
  // Comparar por ejercicio — nombres ya cargados por el padre (misma
  // petición que ya trae los bloques, ver client-detail.page.ts#
  // loadTrainingBlocks), sin llamada propia del panel. Varios a la vez
  // (2026-09 bis): checkboxes, no un único seleccionado.
  @Input() selectedExercises: string[] = [];
  @Input() exerciseNames: string[] = [];
  // 2026-09 — granularidad "Por microciclo" / "Por sesión". No aplica a la
  // métrica 'sessions' (un conteo DE sesiones no tiene lectura por sesión),
  // así que el toggle se oculta para esa métrica en la plantilla.
  @Input() selectedGranularity: TrainingGranularity = 'block';
  // "Elegir el workout a ver" (2026-09) — filtro ortogonal a la métrica:
  // null = todos los entrenamientos. workoutNames ya llega cargado por el
  // padre (misma petición que trae blocks), sin llamada propia del panel —
  // mismo criterio que exerciseNames.
  @Input() selectedWorkout: string | null = null;
  @Input() workoutNames: string[] = [];

  public readonly metrics: TrainingComparisonMetric[] = [
    'sessions',
    'sets',
    'volume',
    'muscleGroups',
    'exercise',
    'readiness',
    'adherence',
  ];
  public readonly metricLabels = TRAINING_COMPARISON_METRIC_LABELS;
  public readonly maxComparedExercises = MAX_COMPARED_EXERCISES;
  public exerciseSearch = '';

  constructor(private modalController: ModalController) {}

  public dismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  public choose(metric: TrainingComparisonMetric): void {
    this.selectedMetric = metric;
  }

  // Toggle, no reemplazo: cada click añade o quita ese ejercicio de la
  // selección, hasta el tope. Por encima del tope no hace nada — el botón ya
  // sale deshabilitado en la plantilla, esto es el guardarraíl real.
  public toggleExercise(name: string): void {
    const index = this.selectedExercises.indexOf(name);
    if (index >= 0) {
      this.selectedExercises = this.selectedExercises.filter((n) => n !== name);
      return;
    }
    if (this.selectedExercises.length >= MAX_COMPARED_EXERCISES) return;
    this.selectedExercises = [...this.selectedExercises, name];
  }

  public chooseGranularity(granularity: TrainingGranularity): void {
    this.selectedGranularity = granularity;
  }

  public chooseWorkout(name: string | null): void {
    this.selectedWorkout = name;
  }

  public get filteredExerciseNames(): string[] {
    const query = this.exerciseSearch.trim().toLowerCase();
    if (!query) return this.exerciseNames;
    return this.exerciseNames.filter((name) => name.toLowerCase().includes(query));
  }

  public get canConfirm(): boolean {
    return this.selectedMetric !== 'exercise' || this.selectedExercises.length > 0;
  }

  public confirm(): void {
    if (!this.canConfirm) return;
    const result: TrainingFilterResult = {
      metric: this.selectedMetric,
      exercises: this.selectedMetric === 'exercise' ? this.selectedExercises : [],
      granularity: this.selectedGranularity,
      workout: this.selectedWorkout,
    };
    this.modalController.dismiss(result, 'confirm');
  }
}
