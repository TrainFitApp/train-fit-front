import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientLedger, FeePlanView, PaymentCharge } from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import {
  StatusChip,
  chargeTitle,
  dueRelative,
  formatCents,
  formatDay,
  formatDayLong,
  formatInstant,
  frequencyLabel,
  newOperationId,
  paymentsErrorMessage,
  statusChips,
} from '../../utils/payments-view.util';

export type LedgerIntent = 'configure-fee' | 'register' | null;
type LedgerFilter = 'all' | 'pending' | 'overdue' | 'history';

interface ChargeGroup {
  key: 'overdue' | 'today' | 'upcoming' | 'history';
  title: string;
  meta: string;
  charges: PaymentCharge[];
}

let ledgerSeq = 0;

// Gestión > Cobros de UN cliente: cuota (regla), cobros concretos y accesos a
// registrar, corregir o anular. Mismo componente en la ficha y en
// Configuración > Cobros (panel), así que no depende de la página: recarga al
// cambiar de cliente, cuando la ficha vuelve a entrar (refreshToken) y cuando
// cualquier vista guarda algo de este cliente (TrainerPaymentsService.changes$).
@Component({
  selector: 'app-client-payments-ledger',
  templateUrl: './client-payments-ledger.component.html',
  styleUrls: ['./client-payments-ledger.component.scss'],
})
export class ClientPaymentsLedgerComponent implements OnInit, OnChanges, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() public clientId = '';
  @Input() public clientName: string | null = null;
  @Input() public readOnly = false;
  @Input() public refreshToken = 0;
  @Input() public intent: LedgerIntent = null;
  @Input() public focusChargeId: string | null = null;
  @Output() public intentConsumed = new EventEmitter<void>();

  public readonly uid = `ledger-${++ledgerSeq}`;
  public readonly filters: Array<{ key: LedgerFilter; label: string }> = [
    { key: 'all', label: this.translate.instant('TRAINER_COMMON.ALL_M') },
    { key: 'pending', label: this.translate.instant('PAYMENTS.PENDIENTES_2') },
    { key: 'overdue', label: this.translate.instant('PAYMENTS.VENCIDOS_2') },
    { key: 'history', label: this.translate.instant('COACH.HISTORY') },
  ];

  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public ledger: ClientLedger | null = null;
  public filter: LedgerFilter = 'all';
  public groups: ChargeGroup[] = [];
  public counts: Record<LedgerFilter, number> = { all: 0, pending: 0, overdue: 0, history: 0 };
  public showVoided = false;

  public planPanel: 'configure' | 'resume' | null = null;
  public registerCharge: PaymentCharge | null = null;
  public showOneOff = false;
  public detailChargeId: string | null = null;
  public busy = false;

  private pendingIntent: LedgerIntent = null;
  private pendingFocus: string | null = null;
  private changesSubscription: Subscription | null = null;

  constructor(private payments: TrainerPaymentsService, private ionicUtil: IonicUtilService) {}

  public ngOnInit(): void {
    this.changesSubscription = this.payments.changes$
      .pipe(filter((event) => event.clientId === this.clientId))
      .subscribe(() => this.load(true));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['intent'] && this.intent) this.pendingIntent = this.intent;
    if (changes['focusChargeId'] && this.focusChargeId) this.pendingFocus = this.focusChargeId;
    if (changes['clientId']) {
      this.ledger = null;
      this.detailChargeId = null;
      this.registerCharge = null;
      this.planPanel = null;
      this.showOneOff = false;
      this.load();
    } else if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.load(true);
    } else if (this.ledger) {
      this.applyPending();
    }
  }

  public ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }

  public load(silent = false): void {
    if (!this.clientId) return;
    const clientId = this.clientId;
    if (!silent || !this.ledger) this.state = 'loading';
    this.payments.getLedger(clientId).subscribe({
      next: (ledger) => {
        if (clientId !== this.clientId) return;
        this.ledger = ledger;
        this.buildGroups();
        this.state = 'loaded';
        this.applyPending();
      },
      error: () => {
        if (clientId !== this.clientId) return;
        // Nunca un saldo cero inventado: sin datos, estado de error.
        if (!silent || !this.ledger) this.state = 'error';
      },
    });
  }

  private applyPending(): void {
    const ledger = this.ledger;
    if (!ledger) return;
    if (this.pendingIntent) {
      if (this.pendingIntent === 'configure-fee' && this.manageable) this.planPanel = 'configure';
      if (this.pendingIntent === 'register') {
        const id = ledger.summary.dueToday?.chargeId;
        const charge = ledger.charges.find((item) => item.id === id);
        if (charge && this.canRegister(charge)) this.registerCharge = charge;
      }
      this.pendingIntent = null;
      this.intentConsumed.emit();
    }
    if (this.pendingFocus) {
      this.detailChargeId = this.pendingFocus;
      this.pendingFocus = null;
    }
  }

  // --- Permisos de la vista (el backend es quien decide de verdad) ---

  public get writable(): boolean {
    return !this.readOnly;
  }

  // Cuotas y cobros nuevos: solo con relación activa y plaza escribible.
  public get manageable(): boolean {
    return this.writable && this.ledger?.access === 'active';
  }

  public canRegister(charge: PaymentCharge): boolean {
    return this.writable && charge.status === 'open' && charge.balanceCents > 0;
  }

  // --- Agrupación: vencidos, hoy, próximos, historial ---

  private buildGroups(): void {
    const charges = this.ledger?.charges ?? [];
    const sum = (list: PaymentCharge[]) => list.filter((c) => c.currency === 'EUR').reduce((total, c) => total + c.balanceCents, 0);
    const overdue = charges.filter((c) => c.temporal === 'overdue');
    const today = charges.filter((c) => c.temporal === 'due_today');
    const upcoming = charges.filter((c) => c.temporal === 'upcoming');
    const history = charges.filter((c) => c.temporal === 'closed');
    const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
    this.groups = [
      { key: 'overdue', title: this.translate.instant('PAYMENTS.VENCIDOS_2'), meta: `${count(overdue.length, 'cobro', 'cobros')} · ${this.money(sum(overdue))}`, charges: overdue },
      { key: 'today', title: this.translate.instant('PAYMENTS.VENCE_HOY'), meta: this.money(sum(today)), charges: today },
      { key: 'upcoming', title: this.translate.instant('PAYMENTS.PROXIMOS'), meta: count(upcoming.length, 'cobro', 'cobros'), charges: upcoming },
      { key: 'history', title: this.translate.instant('COACH.HISTORY'), meta: count(history.length, 'cobro cerrado', 'cobros cerrados'), charges: history },
    ].filter((group) => group.charges.length) as ChargeGroup[];
    this.counts = {
      all: charges.length,
      pending: overdue.length + today.length + upcoming.length,
      overdue: overdue.length,
      history: history.length,
    };
  }

  public get visibleGroups(): ChargeGroup[] {
    switch (this.filter) {
      case 'pending':
        return this.groups.filter((group) => group.key !== 'history');
      case 'overdue':
        return this.groups.filter((group) => group.key === 'overdue');
      case 'history':
        return this.groups.filter((group) => group.key === 'history');
      default:
        return this.groups;
    }
  }

  public setFilter(value: LedgerFilter): void {
    this.filter = value;
  }

  // --- Presentación ---

  public money(cents: number, currency = 'EUR'): string {
    return formatCents(cents, currency);
  }

  public day(value: string): string {
    return formatDay(value, value.slice(0, 4) !== (this.ledger?.today ?? '').slice(0, 4));
  }

  public dayLong(value: string): string {
    return formatDayLong(value);
  }

  // Día de un instante (pausa, fin) sin hora: "3 oct 2026".
  public instantDay(value: string | null): string {
    return value ? formatInstant(value).replace(/,.*$/, '') : '—';
  }

  public relative(charge: PaymentCharge): string {
    return charge.status === 'open' && this.ledger ? dueRelative(charge.dueDay, this.ledger.today) : '';
  }

  public title(charge: PaymentCharge): string {
    return chargeTitle(charge);
  }

  public chips(charge: PaymentCharge): StatusChip[] {
    return statusChips(charge);
  }

  public frequency(plan: FeePlanView): string {
    return frequencyLabel(plan.unit, plan.interval);
  }

  public planStatusLabel(plan: FeePlanView): string {
    return plan.status === 'active' ? this.translate.instant('CLIENT_DETAIL.PHASE_ACTIVE') : plan.status === 'paused' ? this.translate.instant('PAYMENTS.PAUSADA') : this.translate.instant('CLIENT_DETAIL.PHASE_ENDED');
  }

  public figuresLine(charge: PaymentCharge): string {
    const money = (cents: number) => this.money(cents, charge.currency);
    if (charge.status === 'settled') {
      return charge.lastReceivedDay ? this.translate.instant('PAYMENTS.LIQUIDADO_ULTIMO_PAGO', { p0: formatDay(charge.lastReceivedDay) }) : this.translate.instant('PAYMENTS.LIQUIDADO');
    }
    if (charge.status === 'cancelled') {
      return charge.receivedCents > 0 ? this.translate.instant('PAYMENTS.RECIBIDO_ANULADO', { p0: money(charge.receivedCents), p1: money(charge.cancelledCents) }) : this.translate.instant('PAYMENTS.ANULADO_SIN_COBRAR');
    }
    if (charge.status === 'void') return this.translate.instant('PAYMENTS.PREVISION_ANULADA');
    const parts = [`de ${money(charge.amountCents)}`];
    if (charge.receivedCents > 0) parts.push(`recibido ${money(charge.receivedCents)}`);
    return parts.join(' · ');
  }

  public rowLabel(charge: PaymentCharge): string {
    const money = charge.status === 'open' ? `pendiente ${this.money(charge.balanceCents, charge.currency)}` : this.figuresLine(charge);
    return this.translate.instant('PAYMENTS.VENCE_VER_DETALLE', { p0: this.title(charge), p1: formatDay(charge.dueDay, true), money });
  }

  public trackById(_index: number, charge: PaymentCharge): string {
    return charge.id;
  }

  // --- Acciones ---

  public openConfigure(): void {
    this.planPanel = 'configure';
  }

  public openResume(): void {
    this.planPanel = 'resume';
  }

  public openOneOff(): void {
    this.showOneOff = true;
  }

  public openRegister(charge: PaymentCharge): void {
    this.registerCharge = charge;
  }

  public openDetail(charge: PaymentCharge): void {
    this.detailChargeId = charge.id;
  }

  public async pause(): Promise<void> {
    await this.ionicUtil.showAlert({
      header: this.translate.instant('PAYMENTS.PAUSAR_CUOTA'),
      message: this.translate.instant('PAYMENTS.NO_SE_GENERARAN_VENCIMIENTOS_NUEVOS'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        { text: this.translate.instant('PAYMENTS.PAUSAR'), cssClass: 'alert-button-primary', handler: () => this.runPlanAction('pause') },
      ],
    });
  }

  public async end(): Promise<void> {
    await this.ionicUtil.showAlert({
      header: this.translate.instant('PAYMENTS.FINALIZAR_CUOTA'),
      message:
        this.translate.instant('PAYMENTS.DEJA_DE_GENERAR_VENCIMIENTOS_NO'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        { text: this.translate.instant('PAYMENTS.FINALIZAR_CUOTA'), cssClass: 'alert-button-danger', handler: () => this.runPlanAction('end') },
      ],
    });
  }

  private runPlanAction(action: 'pause' | 'end'): void {
    if (this.busy) return;
    this.busy = true;
    const operationId = newOperationId(`plan-${action}`);
    const request = action === 'pause' ? this.payments.pausePlan(this.clientId, operationId) : this.payments.endPlan(this.clientId, operationId);
    request.subscribe({
      next: () => {
        this.busy = false;
        void this.ionicUtil.showSuccessToast(action === 'pause' ? this.translate.instant('PAYMENTS.CUOTA_PAUSADA') : this.translate.instant('PAYMENTS.CUOTA_FINALIZADA'));
      },
      error: (error) => {
        this.busy = false;
        void this.ionicUtil.showErrorToast(error, paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_CAMBIAR_LA')));
      },
    });
  }

  public toggleReminders(enabled: boolean): void {
    if (!this.ledger || this.busy) return;
    const previous = this.ledger.preferences.clientRemindersEnabled;
    this.ledger = { ...this.ledger, preferences: { ...this.ledger.preferences, clientRemindersEnabled: enabled } };
    this.busy = true;
    this.payments.setPreferences(this.clientId, { clientRemindersEnabled: enabled }).subscribe({
      next: () => {
        this.busy = false;
        void this.ionicUtil.showSuccessToast(enabled ? this.translate.instant('PAYMENTS.AVISOS_AL_CLIENTE_ACTIVADOS') : this.translate.instant('PAYMENTS.AVISOS_AL_CLIENTE_DESACTIVADOS'));
      },
      error: (error) => {
        this.busy = false;
        if (this.ledger) this.ledger = { ...this.ledger, preferences: { ...this.ledger.preferences, clientRemindersEnabled: previous } };
        void this.ionicUtil.showErrorToast(error, paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_CAMBIAR_EL')));
      },
    });
  }
}
