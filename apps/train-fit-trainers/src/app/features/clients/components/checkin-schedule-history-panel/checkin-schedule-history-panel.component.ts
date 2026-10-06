import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import {
  CheckinEntry,
  CheckinSchedule,
  CheckinStatus,
} from '../../pages/client-detail/components/checkin-workspace/checkin-workspace.model';
import {
  checkinCadenceLabel,
  checkinFieldLabel,
  checkinValueLabel,
  checkinWeekLabel,
  shortDayLabel,
} from '../../checkin-labels.util';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'ready' | 'error';

const STATUS_LABELS: Record<CheckinStatus, string> = {
  scheduled: 'Programado',
  open: 'Abierto',
  unanswered: 'Sin responder',
  responded: 'Respondido',
  reviewed: 'Revisado',
};
localizeRecord(STATUS_LABELS, 'CLIENTS.CHECKIN_STATUS');

// Todo lo que se le ha pedido a UNA programación de check-in, de lo más
// nuevo a lo más viejo, respondido o no. Segundo panel de la pila: se abre a
// la izquierda del listado (en móvil lo tapa, con su flecha de volver).
//
// Solo lectura a propósito: revisar una respuesta y editar la programación
// viven en Medidas y check-ins, y el pie lleva ahí.
@Component({
  selector: 'app-checkin-schedule-history-panel',
  templateUrl: './checkin-schedule-history-panel.component.html',
  styleUrls: ['./checkin-schedule-history-panel.component.scss'],
})
export class CheckinScheduleHistoryPanelComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public schedule!: CheckinSchedule;
  @Input() public onGoToCheckins?: () => void;

  private readonly api = inject(ClientDetailApiService);
  private readonly modalController = inject(ModalController);

  public state: ViewState = 'loading';
  public entries: CheckinEntry[] = [];
  public total = 0;
  public loadingMore = false;
  public expandedId: string | null = null;
  public expandedValues: { label: string; value: string }[] = [];
  private nextBefore: string | null = null;

  public readonly statusLabels = STATUS_LABELS;

  public ngOnInit(): void {
    this.load();
  }

  public get cadence(): string {
    return checkinCadenceLabel(this.schedule);
  }

  public get answered(): number {
    return this.entries.filter((entry) => entry.responseId).length;
  }

  public get hasMore(): boolean {
    return !!this.nextBefore;
  }

  public loadMore(): void {
    if (!this.nextBefore || this.loadingMore) return;
    this.loadingMore = true;
    this.load(this.nextBefore);
  }

  private load(before: string | null = null): void {
    this.api.getCheckinScheduleHistory(this.clientId, this.schedule._id, before).subscribe({
      next: (page) => {
        this.entries = before ? [...this.entries, ...page.entries] : page.entries;
        this.nextBefore = page.nextBefore;
        this.total = page.total;
        this.state = 'ready';
        this.loadingMore = false;
      },
      error: () => {
        this.state = before ? 'ready' : 'error';
        this.loadingMore = false;
      },
    });
  }

  public day(iso: string): string {
    return shortDayLabel(iso);
  }

  public weekLabel(entry: CheckinEntry): string {
    return checkinWeekLabel(entry.week);
  }

  // Se calculan UNA vez al desplegar, no en la plantilla: un método que
  // devuelve un array nuevo en cada detección de cambios hace que *ngFor
  // recree el DOM y eso dispara otra detección (mismo motivo que en
  // week-summary-panel).
  public toggle(entry: CheckinEntry): void {
    if (!entry.responseId) return;
    const cerrar = this.expandedId === entry._id;
    this.expandedId = cerrar ? null : entry._id;
    this.expandedValues = cerrar
      ? []
      : Object.entries(entry.values || {}).map(([key, value]) => ({
          label: checkinFieldLabel(key, entry.customQuestions),
          value: checkinValueLabel(value),
        }));
  }

  public trackById(_index: number, entry: CheckinEntry): string {
    return entry._id;
  }

  public goToCheckins(): void {
    this.onGoToCheckins?.();
  }

  public close(): void {
    void this.modalController.dismiss();
  }
}
