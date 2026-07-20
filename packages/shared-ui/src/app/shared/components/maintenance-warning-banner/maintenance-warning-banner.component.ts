import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-maintenance-warning-banner',
  templateUrl: './maintenance-warning-banner.component.html',
  styleUrls: ['./maintenance-warning-banner.component.scss'],
})
export class MaintenanceWarningBannerComponent {
  @Input() public message = '';
  @Output() public dismissed = new EventEmitter<void>();

  public dismiss(): void {
    this.dismissed.emit();
  }
}
