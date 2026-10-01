import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  PaymentAdjustment,
  PaymentChargeDetail,
  PaymentMethod,
  PaymentMovement,
  PaymentsAccess,
} from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import {
  ANOMALY_LABELS,
  PAYMENT_METHODS,
  StatusChip,
  centsToInput,
  chargeTitle,
  dueRelative,
  errorCode,
  errorDetail,
  formatCents,
  formatDay,
  formatDayLong,
  formatInstant,
  methodLabel,
  newOperationId,
  parseAmountInput,
  paymentsErrorMessage,
  statusChips,
} from '../../utils/payments-view.util';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

type DetailAction = 'cancel' | 'restore' | 'correct' | null;

const VOID_REASONS: Record<string, string> = {
  plan_paused: 'la cuota se pausó',
  plan_ended: 'la cuota se finalizó',
  plan_rescheduled: 'el calendario de la cuota cambió',
  relation_ended: 'terminó la relación con el cliente',
};
localizeRecord(VOID_REASONS, 'PAYMENTS.VOID_REASONS');

// Detalle de UN cobro: importes, pagos registrados (con su rastro de
// correcciones) e historial. Toda acción destructiva explica su alcance y pide
// motivo; anular saldo no es cobrar ni devolver dinero.
@Component({
  selector: 'app-charge-detail-panel',
  templateUrl: './charge-detail-panel.component.html',
  styleUrls: ['./charge-detail-panel.component.scss'],
})
export class ChargeDetailPanelComponent implements OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() public clientId = '';
  @Input() public clientName: string | null = null;
  @Input() public chargeId = '';
  @Input() public today = '';
  @Input() public access: PaymentsAccess = 'active';
  @Input() public readOnly = false;
  @Output() public closed = new EventEmitter<void>();
  @Output() public changed = new EventEmitter<void>();

  public readonly methods = PAYMENT_METHODS;
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public charge: PaymentChargeDetail | null = null;
  public showRegister = false;
  public showEdit = false;
  public action: DetailAction = null;
  public busy = false;
  public errorMessage: string | null = null;

  public cancelReason = '';
  public restoreAmountText = '';
  public restoreReason = '';
  public correctTarget: PaymentMovement | null = null;
  public correctMode: 'replace' | 'void' = 'replace';
  public correctAmountText = '';
  public correctDay = '';
  public correctMethod: PaymentMethod | null = null;
  public correctReason = '';
  public reopenBalanceCents: number | null = null;

  private operationId = '';
  private changesSubscription: Subscription | null = null;

  constructor(private payments: TrainerPaymentsService, private ionicUtil: IonicUtilService) {}

  public ngOnInit(): void {
    this.load();
    // Un pago registrado desde el panel apilado encima refresca este detalle.
    this.changesSubscription = this.payments.changes$
      .pipe(filter((event) => event.clientId === this.clientId && event.chargeId === this.chargeId))
      .subscribe(() => this.load(true));
  }

  public ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }

  public load(silent = false): void {
    if (!silent) this.state = 'loading';
    this.payments.getCharge(this.clientId, this.chargeId).subscribe({
      next: (charge) => {
        this.charge = charge;
        this.state = 'loaded';
      },
      error: () => {
        if (!silent || !this.charge) this.state = 'error';
      },
    });
  }

  // --- Lectura ---

  public get title(): string {
    return this.charge ? chargeTitle(this.charge) : this.translate.instant('PAYMENTS.COBRO');
  }

  public get subtitle(): string | null {
    if (!this.charge) return this.clientName;
    const who = this.clientName ? `${this.clientName} · ` : '';
    return `${who}${this.originLabel}`;
  }

  public get originLabel(): string {
    switch (this.charge?.origin) {
      case 'recurring':
        return this.translate.instant('PAYMENTS.VENCIMIENTO_DE_LA_CUOTA');
      case 'legacy':
        return this.translate.instant('PAYMENTS.COBRO_ANOTADO_ANTES_DE_LA');
      default:
        return this.translate.instant('PAYMENTS.COBRO_PUNTUAL');
    }
  }

  public get chips(): StatusChip[] {
    return this.charge ? statusChips(this.charge) : [];
  }

  public get writable(): boolean {
    return !this.readOnly && !!this.charge && this.charge.status !== 'void';
  }

  public get canRegister(): boolean {
    const charge = this.charge;
    return this.writable && !!charge && charge.status === 'open' && charge.balanceCents > 0;
  }

  public get canCancel(): boolean {
    return this.canRegister;
  }

  public get canRestore(): boolean {
    return this.writable && !!this.charge && this.charge.cancelledCents > 0;
  }

  public get anomalyNotes(): string[] {
    return (this.charge?.anomalies ?? []).map((code) => ANOMALY_LABELS[code] ?? code);
  }

  public get voidNote(): string | null {
    const charge = this.charge;
    if (!charge || charge.status !== 'void') return null;
    return this.translate.instant('PAYMENTS.ERA_UNA_PREVISION_DE_LA') + ' ' + (VOID_REASONS[charge.voidReason ?? ''] ?? this.translate.instant('PAYMENTS.LA_CUOTA_CAMBIO')) + '.';
  }

  public money(cents: number): string {
    return formatCents(cents, this.charge?.currency ?? 'EUR');
  }

  public day(value: string): string {
    return formatDay(value, true);
  }

  public dayLong(value: string): string {
    return formatDayLong(value);
  }

  public instant(value: string | null): string {
    return formatInstant(value);
  }

  public relative(value: string): string {
    return dueRelative(value, this.today);
  }

  public method(value: PaymentMethod): string {
    return methodLabel(value);
  }

  public adjustmentText(item: PaymentAdjustment): string {
    const amount = (value: string | number | null) => (typeof value === 'number' ? this.money(value) : '—');
    const dayText = (value: string | number | null) => (typeof value === 'string' ? this.day(value) : '—');
    switch (item.type) {
      case 'amount_changed':
        return this.translate.instant('PAYMENTS.IMPORTE_2', { p0: amount(item.from), p1: amount(item.to) });
      case 'due_changed':
        return this.translate.instant('PAYMENTS.VENCIMIENTO_2', { p0: dayText(item.from), p1: dayText(item.to) });
      case 'concept_changed':
        return this.translate.instant('PAYMENTS.CONCEPTO_2', { p0: item.from || 'sin concepto', p1: item.to || 'sin concepto' });
      case 'note_changed':
        return this.translate.instant('PAYMENTS.NOTA_INTERNA_EDITADA');
      case 'price_change':
        return this.translate.instant('PAYMENTS.PRECIO_DE_LA_CUOTA', { p0: amount(item.from), p1: amount(item.to) });
      case 'cancel_balance':
        return this.translate.instant('PAYMENTS.SALDO_ANULADO', { p0: amount(item.from) });
      case 'restore_balance':
        return this.translate.instant('PAYMENTS.ANULACION_RECTIFICADA_ANULADOS', { p0: amount(item.from), p1: amount(item.to) });
      case 'payment_corrected':
        return item.to === 0 ? this.translate.instant('PAYMENTS.PAGO_ANULADO', { p0: amount(item.from) }) : this.translate.instant('PAYMENTS.PAGO_CORREGIDO', { p0: amount(item.from), p1: amount(item.to) });
      case 'voided':
        return this.translate.instant('PAYMENTS.PREVISION_ANULADA');
      default:
        return this.translate.instant('PAYMENTS.CAMBIO');
    }
  }

  public get adjustments(): PaymentAdjustment[] {
    return [...(this.charge?.adjustments ?? [])].reverse();
  }

  public isReplacement(movement: PaymentMovement): boolean {
    return movement.correctionOf !== null;
  }

  // --- Acciones ---

  public openRegister(): void {
    this.showRegister = true;
  }

  public openEdit(): void {
    this.showEdit = true;
  }

  public onSubpanelSaved(): void {
    this.load(true);
    this.changed.emit();
  }

  public startAction(action: DetailAction, movement: PaymentMovement | null = null): void {
    this.action = action;
    this.errorMessage = null;
    this.reopenBalanceCents = null;
    this.operationId = newOperationId(action || 'detail');
    const charge = this.charge;
    if (!charge) return;
    if (action === 'cancel') this.cancelReason = '';
    if (action === 'restore') {
      this.restoreAmountText = centsToInput(charge.cancelledCents);
      this.restoreReason = '';
    }
    if (action === 'correct' && movement) {
      this.correctTarget = movement;
      this.correctMode = 'replace';
      this.correctAmountText = centsToInput(movement.amountCents);
      this.correctDay = movement.receivedDay;
      this.correctMethod = movement.method === 'unknown' ? null : movement.method;
      this.correctReason = '';
    }
  }

  public cancelAction(): void {
    this.action = null;
    this.correctTarget = null;
    this.errorMessage = null;
    this.reopenBalanceCents = null;
  }

  public get restoreCents(): number | null {
    const cents = parseAmountInput(this.restoreAmountText);
    return cents !== null && this.charge && cents <= this.charge.cancelledCents ? cents : null;
  }

  public get restoreResultCents(): number | null {
    const charge = this.charge;
    const cents = this.restoreCents;
    return charge && cents !== null ? charge.balanceCents + cents : null;
  }

  public get correctAmountCents(): number | null {
    return parseAmountInput(this.correctAmountText);
  }

  public get canSubmitCorrection(): boolean {
    if (this.busy || this.correctReason.trim().length < 3 || !this.correctTarget) return false;
    if (this.correctMode === 'void') return true;
    return this.correctAmountCents !== null && !!this.correctDay && this.correctDay <= this.today && this.correctMethod !== null;
  }

  public submitCancel(): void {
    const charge = this.charge;
    if (!charge || this.busy || this.cancelReason.trim().length < 3) return;
    this.run(
      this.payments.cancelBalance(this.clientId, charge.id, {
        reason: this.cancelReason.trim(),
        confirmBalanceCents: charge.balanceCents,
        operationId: this.operationId,
      }),
      this.translate.instant('PAYMENTS.SALDO_ANULADO', { p0: this.money(charge.balanceCents) })
    );
  }

  public submitRestore(): void {
    const charge = this.charge;
    const result = this.restoreResultCents;
    if (!charge || this.busy || result === null || this.restoreReason.trim().length < 3) return;
    this.run(
      this.payments.restoreCancelled(this.clientId, charge.id, {
        amount: this.restoreAmountText.trim(),
        reason: this.restoreReason.trim(),
        confirmBalanceCents: result,
        operationId: this.operationId,
      }),
      this.translate.instant('PAYMENTS.VUELVEN_QUEDAR_PENDIENTES', { p0: this.money(result) })
    );
  }

  public submitCorrection(confirmReopen = false): void {
    const charge = this.charge;
    const target = this.correctTarget;
    if (!charge || !target || !this.canSubmitCorrection) return;
    const body: Record<string, unknown> = {
      reason: this.correctReason.trim(),
      operationId: this.operationId,
      replacement:
        this.correctMode === 'replace'
          ? { amount: this.correctAmountText.trim(), receivedDay: this.correctDay, method: this.correctMethod }
          : null,
    };
    if (confirmReopen && this.reopenBalanceCents !== null) body['confirmBalanceCents'] = this.reopenBalanceCents;
    this.run(this.payments.correctPayment(this.clientId, charge.id, target.id, body), this.translate.instant('PAYMENTS.PAGO_CORREGIDO_2'));
  }

  private run(request: ReturnType<TrainerPaymentsService['cancelBalance']>, successMessage: string): void {
    this.busy = true;
    this.errorMessage = null;
    request.subscribe({
      next: (result) => {
        this.busy = false;
        this.charge = result.charge;
        this.action = null;
        this.correctTarget = null;
        this.reopenBalanceCents = null;
        void this.ionicUtil.showSuccessToast(successMessage);
        this.changed.emit();
      },
      error: (error) => {
        this.busy = false;
        const code = errorCode(error);
        if (code === 'REOPEN_CONFIRMATION_REQUIRED') {
          this.reopenBalanceCents = errorDetail(error, 'balanceCents');
          return;
        }
        if (code === 'BALANCE_CHANGED' || code === 'CONCURRENT_UPDATE') this.load(true);
        this.errorMessage = paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_GUARDAR_VUELVE'));
      },
    });
  }
}
