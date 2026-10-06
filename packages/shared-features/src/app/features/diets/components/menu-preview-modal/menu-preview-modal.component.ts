import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DayMenuPreview } from '../../models/day-menu.model';

// docs/plan-semanas.md — preview de
// un menú de un plan "el cliente elige cada día": comidas y alimentos en
// solo lectura, con "Elegir" para aplicarlo al día. No guarda nada: quien
// elige es diets.page (chooseMenu) al recibir el role 'choose'.
@Component({
  selector: 'app-menu-preview-modal',
  templateUrl: './menu-preview-modal.component.html',
  styleUrls: ['./menu-preview-modal.component.scss'],
})
export class MenuPreviewModalComponent {
  @Input() public preview!: DayMenuPreview;
  // Ya elegido para el día: se dice, y el botón cambia de sentido.
  @Input() public isSelected = false;

  constructor(private modalController: ModalController) {}

  public get nonEmptyMeals(): DayMenuPreview['meals'] {
    return (this.preview?.meals || []).filter((m) => m.items.length);
  }

  public choose(): void {
    void this.modalController.dismiss({ name: this.preview.name }, 'choose');
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }
}
