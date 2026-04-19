import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ACTION_TYPE } from 'src/app/shared/constants/actions';

@Component({
  selector: 'app-popover-actions',
  templateUrl: './popover-actions.component.html',
  styleUrls: ['./popover-actions.component.scss'],
})
export class PopoverActionsComponent {
  public actionsPopover: ACTION_TYPE[];

  constructor(private popoverController: PopoverController) {}

  public selectAction(action: ACTION_TYPE) {
    this.popoverController.dismiss(action);
  }
}
