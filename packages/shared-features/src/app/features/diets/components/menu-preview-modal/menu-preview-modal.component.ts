import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { DayTypePreview } from '../../models/day-type.model';

// Ciclos por contenido (docs/plan-ciclos-por-contenido.md §11) — preview de
// un menú de un plan "el cliente elige cada día": comidas y alimentos en
// solo lectura, con "Elegir" para aplicarlo al día. No guarda nada: quien
// elige es diets.page (chooseDayType) al recibir el role 'choose'.
@Component({
  selector: 'app-menu-preview-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './menu-preview-modal.component.html',
  styleUrls: ['./menu-preview-modal.component.scss'],
})
export class MenuPreviewModalComponent {
  @Input() public preview!: DayTypePreview;
  // Ya elegido para el día: se dice, y el botón cambia de sentido.
  @Input() public isSelected = false;

  constructor(private modalController: ModalController) {}

  public get nonEmptyMeals(): DayTypePreview['meals'] {
    return (this.preview?.meals || []).filter((m) => m.items.length);
  }

  public choose(): void {
    void this.modalController.dismiss({ name: this.preview.name }, 'choose');
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }
}
