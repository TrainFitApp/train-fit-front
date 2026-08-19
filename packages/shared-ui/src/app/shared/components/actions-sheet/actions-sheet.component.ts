import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ACTION_TYPE } from 'src/app/shared/constants/actions';

// Mismo listado de acciones que PopoverActionsComponent, pero presentado
// como modal-hoja (showModal + breakpoints, ver ionicUtilService) en vez de
// como popover anclado al punto de click — más legible con listas largas de
// acciones (p. ej. el menú de un workout en el Planificador) y visualmente
// más cuidado que un dropdown. Componente aparte (no se reescribió
// PopoverActionsComponent) porque ese sigue usándose tal cual en otras 6
// pantallas que no pidieron este cambio.
@Component({
  selector: 'app-actions-sheet',
  templateUrl: './actions-sheet.component.html',
  styleUrls: ['./actions-sheet.component.scss'],
})
export class ActionsSheetComponent {
  public actionsPopover: ACTION_TYPE[];

  constructor(private modalController: ModalController) {}

  public selectAction(action: ACTION_TYPE): void {
    this.modalController.dismiss(action);
  }
}
