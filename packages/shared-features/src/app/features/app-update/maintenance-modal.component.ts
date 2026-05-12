import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maintenance-modal',
  templateUrl: './maintenance-modal.component.html',
  styleUrls: ['./maintenance-modal.component.scss'],
})
export class MaintenanceModalComponent {
  @Input() public title = 'Aplicacion en mantenimiento';
  @Input() public message = 'Estamos realizando mejoras. Vuelve en unos minutos.';
  @Input() public expectedEndAt: string | null = null;

  public get expectedEndLabel(): string {
    if (!this.expectedEndAt) {
      return '';
    }

    const date = new Date(this.expectedEndAt);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}
