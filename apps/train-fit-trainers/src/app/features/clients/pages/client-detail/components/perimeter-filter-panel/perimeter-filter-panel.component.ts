import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

export interface PerimeterOption {
  key: string;
  label: string;
}

// Cuántos perímetros "principales" caben en la tabla siempre visible de
// Resumen sin volver a ser la pared de filas que este panel vino a
// arreglar (ver client-summary.component.ts).
export const MAX_PRIMARY_PERIMETERS = 4;

// Mismo patrón que TrainingFilterPanelComponent: ion-modal real vía
// ModalController, cssClass 'tf-panel-modal' — un ion-alert nativo no puede
// embeber esta lista de checkboxes con tope.
@Component({
  selector: 'app-perimeter-filter-panel',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './perimeter-filter-panel.component.html',
  styleUrls: ['./perimeter-filter-panel.component.scss'],
})
export class PerimeterFilterPanelComponent {
  @Input() public options: PerimeterOption[] = [];
  @Input() public selected: string[] = [];

  public readonly max = MAX_PRIMARY_PERIMETERS;

  constructor(private modalController: ModalController) {}

  public dismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  // Toggle, no reemplazo — mismo criterio que toggleExercise en el panel de
  // entrenamiento: por encima del tope no hace nada, el botón ya sale
  // deshabilitado en la plantilla.
  public toggle(key: string): void {
    const index = this.selected.indexOf(key);
    if (index >= 0) {
      this.selected = this.selected.filter((k) => k !== key);
      return;
    }
    if (this.selected.length >= MAX_PRIMARY_PERIMETERS) return;
    this.selected = [...this.selected, key];
  }

  public confirm(): void {
    this.modalController.dismiss(this.selected, 'confirm');
  }
}
