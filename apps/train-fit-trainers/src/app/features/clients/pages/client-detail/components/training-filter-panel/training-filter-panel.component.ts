import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  TRAINING_COMPARISON_METRIC_LABELS,
  TrainingComparisonMetric,
} from '../../models/client-progress.model';

// Comparar por ejercicio (2026-09) — el resultado deja de ser solo la
// métrica: en modo 'exercise' hace falta también CUÁL. Un objeto en vez de
// dos parámetros de dismiss() separados, para que el consumidor no tenga que
// adivinar en qué orden llegan.
export interface TrainingFilterResult {
  metric: TrainingComparisonMetric;
  exercise: string | null;
}

// Tarea 4 (2026-09) — panel de filtro de la gráfica de comparación de
// Entrenamiento. Mismo patrón que ApplyCheckinTemplateModalComponent: ion-modal
// real vía ModalController (no un <div position:fixed> a mano, que queda
// tapado por el header de la propia página), cssClass 'tf-panel-modal' para
// el aspecto de panel anclado a la derecha en escritorio.
@Component({
  selector: 'app-training-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './training-filter-panel.component.html',
  styleUrls: ['./training-filter-panel.component.scss'],
})
export class TrainingFilterPanelComponent {
  @Input() selectedMetric: TrainingComparisonMetric = 'volume';
  // Comparar por ejercicio — nombres ya cargados por el padre (misma
  // petición que ya trae los bloques, ver client-detail.page.ts#
  // loadTrainingBlocks), sin llamada propia del panel.
  @Input() selectedExercise: string | null = null;
  @Input() exerciseNames: string[] = [];

  public readonly metrics: TrainingComparisonMetric[] = [
    'sessions',
    'sets',
    'volume',
    'muscleGroups',
    'exercise',
  ];
  public readonly metricLabels = TRAINING_COMPARISON_METRIC_LABELS;
  public exerciseSearch = '';

  constructor(private modalController: ModalController) {}

  public dismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  public choose(metric: TrainingComparisonMetric): void {
    this.selectedMetric = metric;
  }

  public chooseExercise(name: string): void {
    this.selectedExercise = name;
  }

  public get filteredExerciseNames(): string[] {
    const query = this.exerciseSearch.trim().toLowerCase();
    if (!query) return this.exerciseNames;
    return this.exerciseNames.filter((name) => name.toLowerCase().includes(query));
  }

  public get canConfirm(): boolean {
    return this.selectedMetric !== 'exercise' || !!this.selectedExercise;
  }

  public confirm(): void {
    if (!this.canConfirm) return;
    const result: TrainingFilterResult = {
      metric: this.selectedMetric,
      exercise: this.selectedMetric === 'exercise' ? this.selectedExercise : null,
    };
    this.modalController.dismiss(result, 'confirm');
  }
}
