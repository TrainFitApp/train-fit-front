import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  TRAINING_COMPARISON_METRIC_LABELS,
  TrainingComparisonMetric,
} from '../../models/client-progress.model';

// Tarea 4 (2026-09) — panel de filtro de la gráfica de comparación de
// Entrenamiento. Mismo patrón que ApplyCheckinTemplateModalComponent: ion-modal
// real vía ModalController (no un <div position:fixed> a mano, que queda
// tapado por el header de la propia página), cssClass 'tf-panel-modal' para
// el aspecto de panel anclado a la derecha en escritorio.
@Component({
  selector: 'app-training-filter-panel',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './training-filter-panel.component.html',
  styleUrls: ['./training-filter-panel.component.scss'],
})
export class TrainingFilterPanelComponent {
  @Input() selectedMetric: TrainingComparisonMetric = 'volume';

  public readonly metrics: TrainingComparisonMetric[] = ['sessions', 'sets', 'volume', 'muscleGroups'];
  public readonly metricLabels = TRAINING_COMPARISON_METRIC_LABELS;

  constructor(private modalController: ModalController) {}

  public dismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  public choose(metric: TrainingComparisonMetric): void {
    this.selectedMetric = metric;
  }

  public confirm(): void {
    this.modalController.dismiss(this.selectedMetric, 'confirm');
  }
}
