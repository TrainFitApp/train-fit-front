import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Confirmación como modal-hoja (sale desde abajo, con tirador) — misma
// presentación que ActionsSheetComponent, para las confirmaciones que
// merecen algo más cuidado que un ion-alert (p. ej. cambiar de opción de
// comida con alimentos ya marcados). Los textos llegan ya traducidos.
// Cierra con `true` al confirmar; con `false`/undefined al cancelar o al
// deslizar la hoja fuera.
@Component({
  selector: 'app-confirm-sheet',
  templateUrl: './confirm-sheet.component.html',
  styleUrls: ['./confirm-sheet.component.scss'],
})
export class ConfirmSheetComponent {
  @Input() public icon = 'alert-circle-outline';
  @Input() public iconColor = 'warning';
  @Input() public title = '';
  @Input() public message = '';
  @Input() public confirmText = '';
  @Input() public cancelText = '';
  @Input() public confirmColor = 'primary';

  constructor(private modalController: ModalController) {}

  public confirm(): void {
    this.modalController.dismiss(true);
  }

  public cancel(): void {
    this.modalController.dismiss(false);
  }
}
