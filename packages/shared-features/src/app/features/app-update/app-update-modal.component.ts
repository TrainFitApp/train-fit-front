import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update-modal',
  templateUrl: './app-update-modal.component.html',
  styleUrls: ['./app-update-modal.component.scss'],
})
export class AppUpdateModalComponent {
  @Input() public currentVersion = '';
  @Input() public requiredVersion = '';
  @Input() public customMessage?: string;
  @Input() public updateHandler: (() => Promise<void>) | null = null;

  public isOpeningStore = false;

  public async updateNow(): Promise<void> {
    if (this.isOpeningStore || !this.updateHandler) {
      return;
    }

    this.isOpeningStore = true;
    try {
      await this.updateHandler();
    } finally {
      this.isOpeningStore = false;
    }
  }
}
