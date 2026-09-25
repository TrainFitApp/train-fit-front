import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import { CheckinSchedule } from '../../pages/client-detail/components/checkin-workspace/checkin-workspace.model';
import { checkinCadenceLabel, shortDayLabel } from '../../checkin-labels.util';

type ViewState = 'loading' | 'ready' | 'error';

// Las programaciones de check-in del cliente, como panel derecho. Se abre
// desde el chip "n check-ins" de la tarjeta de la fase.
//
// Solo lectura: tocar una card abre SU histórico en un segundo panel, a la
// izquierda de este (lo monta client-detail.page.ts, que es quien controla
// la pila). Crear y editar programaciones sigue viviendo en Medidas y
// check-ins, y el pie lleva ahí.
@Component({
  selector: 'app-checkin-schedules-panel',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checkin-schedules-panel.component.html',
  styleUrls: ['./checkin-schedules-panel.component.scss'],
})
export class CheckinSchedulesPanelComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public clientName = 'este cliente';
  // Las pone el padre: abrir el detalle y saltar a la sección de check-ins
  // son cosas suyas, no de este panel (ver recipe-builder-modal para el
  // mismo reparto).
  @Input() public onSelect?: (schedule: CheckinSchedule) => void;
  @Input() public onGoToCheckins?: () => void;

  private readonly api = inject(ClientDetailApiService);
  private readonly modalController = inject(ModalController);

  public state: ViewState = 'loading';
  public schedules: CheckinSchedule[] = [];
  public selectedId: string | null = null;

  public ngOnInit(): void {
    this.api.getCheckinSchedules(this.clientId).subscribe({
      next: (schedules) => {
        this.schedules = schedules;
        this.state = 'ready';
      },
      error: () => (this.state = 'error'),
    });
  }

  public get activeCount(): number {
    return this.schedules.filter((schedule) => schedule.active).length;
  }

  public cadence(schedule: CheckinSchedule): string {
    return checkinCadenceLabel(schedule);
  }

  public since(schedule: CheckinSchedule): string {
    return shortDayLabel(schedule.startDate);
  }

  public trackById(_index: number, schedule: CheckinSchedule): string {
    return schedule._id;
  }

  public select(schedule: CheckinSchedule): void {
    this.selectedId = schedule._id;
    this.onSelect?.(schedule);
  }

  public goToCheckins(): void {
    this.onGoToCheckins?.();
  }

  public close(): void {
    void this.modalController.dismiss();
  }
}
