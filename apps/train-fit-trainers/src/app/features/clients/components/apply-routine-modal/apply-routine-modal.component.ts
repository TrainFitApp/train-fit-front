import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import { ClientTable } from '../../pages/client-detail/models/client-detail.model';
import { RoutineAssignmentApiService } from '../../../../shared/services/routine-assignment-api.service';
import { RoutineAssignment } from '../../../../shared/models/routine-assignment.model';

type ViewState = 'loading' | 'error' | 'loaded' | 'applying';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Tarea 4 (2026-09) — equivalente de ApplyDietTemplateModalComponent para
// rutinas, simplificado: sin endMode/endDate (una rutina no "termina"), así
// que solo hace falta elegir QUÉ rutina y DESDE CUÁNDO. Mismo patrón de
// error 409 inline junto a la fecha.
//
// Tarea 4ter (2026-09) — reutilizado también para "reschedule": cambiar
// solo la fecha de una fase ya programada (p.ej. alargar la rutina en
// curso), sin tener que cancelarla y volver a elegir tabla desde cero. En
// ese modo la tabla queda fija y no se pide seleccionarla.
@Component({
  selector: 'app-apply-routine-modal',
  templateUrl: 'apply-routine-modal.component.html',
  styleUrls: ['apply-routine-modal.component.scss'],
})
export class ApplyRoutineModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public clientName = 'este cliente';
  @Input() public mode: 'apply' | 'reschedule' = 'apply';
  @Input() public assignmentId: string | null = null;
  @Input() public fixedTableName = '';

  // Sin endDate del que encadenar: si ya hay una última fase, se sugiere
  // "mañana" (una rutina se presume vigente hasta que se sustituya, no hay
  // "el día siguiente a cuando termina"); sin ninguna fase, hoy.
  @Input() public set suggestedStartDate(value: string | null) {
    if (value) this.startDate = value;
  }
  @Input() public previousPhaseName = '';

  public overlapError: string | null = null;
  public state: ViewState = 'loading';
  public tables: ClientTable[] = [];
  public selectedTableId: string | null = null;
  public startDate = todayIsoDate();

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private routineAssignmentApi: RoutineAssignmentApiService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    if (this.mode === 'reschedule') {
      this.state = 'loaded';
      return;
    }
    this.clientDetailApi.getTables(this.clientId).subscribe({
      next: (tables) => {
        this.tables = tables || [];
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public select(table: ClientTable): void {
    this.selectedTableId = table._id;
  }

  public trackByTableId(_index: number, table: ClientTable): string {
    return table._id;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public get canConfirm(): boolean {
    if (this.mode === 'reschedule') return !!this.startDate;
    return !!this.selectedTableId && !!this.startDate;
  }

  public confirm(): void {
    if (!this.canConfirm) return;
    this.state = 'applying';
    this.overlapError = null;

    const request$ =
      this.mode === 'reschedule' && this.assignmentId
        ? this.routineAssignmentApi.reschedule(this.clientId, this.assignmentId, { startDate: this.startDate })
        : this.selectedTableId
        ? this.routineAssignmentApi.apply(this.clientId, this.selectedTableId, { startDate: this.startDate })
        : null;
    if (!request$) return;

    request$.subscribe({
      next: (result: RoutineAssignment) => void this.modalController.dismiss(result, 'confirm'),
      error: (err) => {
        this.state = 'loaded';
        this.overlapError =
          err?.status === 409
            ? err?.error?.message || 'Esa fecha se solapa con otra fase ya programada.'
            : err?.status === 400
            ? err?.error?.message || 'No se puede aplicar ese cambio.'
            : null;
      },
    });
  }
}
