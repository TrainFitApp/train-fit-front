import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-split-menu-popover',
  templateUrl: './split-menu-popover.component.html',
  styleUrls: ['./split-menu-popover.component.scss']
})
export class SplitMenuPopoverComponent {
  @Input() onDuplicate: () => void;
  @Input() onDelete: () => void;
  @Input() duplicateDisabled: boolean = false;

  constructor(private popoverController: PopoverController) {}

  async duplicateSplit() {
    if (!this.duplicateDisabled && this.onDuplicate) {
      this.onDuplicate();
    }
    await this.popoverController.dismiss();
  }

  async deleteSplit() {
    if (this.onDelete) {
      this.onDelete();
    }
    await this.popoverController.dismiss();
  }
}
