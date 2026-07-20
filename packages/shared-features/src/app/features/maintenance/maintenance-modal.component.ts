import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maintenance-modal',
  templateUrl: './maintenance-modal.component.html',
  styleUrls: ['./maintenance-modal.component.scss'],
})
export class MaintenanceModalComponent {
  @Input() public message = '';
}
