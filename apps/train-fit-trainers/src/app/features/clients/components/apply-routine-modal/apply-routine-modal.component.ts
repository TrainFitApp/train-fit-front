import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import { ClientTable } from '../../pages/client-detail/models/client-detail.model';
import { RoutineAssignmentApiService } from '../../../../shared/services/routine-assignment-api.service';
import { RoutineAssignment } from '../../../../shared/models/routine-assignment.model';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { initialRoutineSelection } from './apply-routine-selection.util';

type ViewState = 'loading' | 'error' | 'loaded' | 'applying';

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
  private readonly translate = inject(TranslateService);

  @Input() public clientId!: string;
  @Input() public clientName = this.translate.instant('CLIENTS.ESTE_CLIENTE');
  @Input() public mode: 'apply' | 'reschedule' = 'apply';
  @Input() public assignmentId: string | null = null;
  @Input() public fixedTableName = '';
  // Fase A1 (2026-09) — fases ya programadas de este cliente, para pintarlas
  // en <app-phase-schedule-calendar> al elegir fecha. En modo reschedule se
  // excluye la propia fase que se está moviendo (ver `phasesForPicker`): de
  // lo contrario el calendario mostraría "ocupado" justo el hueco que se
  // está reprogramando.
  @Input() public phases: RoutineAssignment[] = [];

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
  public startDate = localIsoDate();

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
        this.selectedTableId = initialRoutineSelection(this.tables);
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

  public selectById(tableId: string | null | undefined): void {
    const table = this.tables.find((item) => item._id === tableId);
    if (table) this.select(table);
  }

  // Sin rutinas: la ficha cierra este modal y abre su panel "Crear rutina".
  public createRoutine(): void {
    void this.modalController.dismiss(null, 'create-routine');
  }

  public get phasesForPicker(): RoutineAssignment[] {
    return this.mode === 'reschedule'
      ? this.phases.filter((phase) => phase._id !== this.assignmentId)
      : this.phases;
  }

  public onDateSelected(date: string): void {
    this.startDate = date;
  }

  // Angular DatePipe con 'EEEE'/'MMM' sale en inglés sin LOCALE_ID registrado
  // (no lo está en esta app — ver formatShortDate en client-detail.page.ts,
  // que por eso mismo ya usa Intl a mano en vez del pipe). Mismo criterio
  // aquí: nombres de día/mes en español SIEMPRE en minúscula (no es un
  // inicio de frase), así que no hace falta ni text-transform:capitalize.
  public get selectedDateLabel(): string {
    return new Date(`${this.startDate}T00:00:00.000Z`).toLocaleDateString(uiLocale(), {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
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
            ? err?.error?.message || this.translate.instant('CLIENTS.ESA_FECHA_SE_SOLAPA_CON')
            : err?.status === 400
            ? err?.error?.message || this.translate.instant('CLIENTS.NO_SE_PUEDE_APLICAR_ESE')
            : null;
      },
    });
  }
}
