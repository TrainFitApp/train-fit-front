import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WorkoutSummary } from './workout-summary.model';

@Component({
  selector: 'app-workout-summary-modal',
  templateUrl: './workout-summary-modal.component.html',
  styleUrls: ['./workout-summary-modal.component.scss'],
})
export class WorkoutSummaryModalComponent {
  @Input() public summary: WorkoutSummary;
  // Justo al terminar un entreno tiene sentido "Continuar" (cierra y navega
  // atrás, desde fuera del modal); al consultar el resumen de un entreno ya
  // terminado tiempo atrás (ej. desde mesocycle) no hay a dónde "continuar",
  // así que el llamador puede pasar otro texto (ej. "Cerrar").
  @Input() public closeButtonLabel?: string;

  constructor(
    private modalController: ModalController,
    private translate: TranslateService
  ) {}

  public get resolvedCloseButtonLabel(): string {
    return this.closeButtonLabel || this.translate.instant('TABLES.SUMMARY_CONTINUE');
  }

  public close(): void {
    this.modalController.dismiss();
  }

  public get elapsedLabel(): string {
    if (this.summary?.elapsedMs == null) return '—';

    const totalSeconds = Math.floor(this.summary.elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  public get finishedAtLabel(): string {
    const date = this.summary?.finishedAt;
    if (!date) return '';

    const datePart = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const timePart = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${datePart} · ${timePart}`;
  }

  public get volumeLabel(): string {
    const kg = this.summary?.volumeKg || 0;
    return `${kg.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg`;
  }
}
