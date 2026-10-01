import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ACTIONS_FAB_TYPES } from 'src/app/shared/constants/actions-fab';

export const CREATE_FOOD_SHEET_OPTIONS = {
  cssClass: 'create-food-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

/**
 * Elección "nuevo producto / nueva receta" del botón + del buscador de
 * alimentos. Modal-hoja propia (misma familia que ConfirmSheetComponent y
 * MediaConsentSheetComponent) en vez del ion-action-sheet de antes: cada
 * opción dice qué crea. Cierra con el ACTIONS_FAB_TYPES elegido, o con
 * undefined al deslizarla fuera o tocar el fondo.
 */
@Component({
  selector: 'app-create-food-sheet',
  templateUrl: './create-food-sheet.component.html',
  styleUrls: ['./create-food-sheet.component.scss'],
})
export class CreateFoodSheetComponent {
  public readonly types = ACTIONS_FAB_TYPES;

  constructor(private modalController: ModalController) {}

  public pick(type: ACTIONS_FAB_TYPES): void {
    this.modalController.dismiss(type);
  }
}
