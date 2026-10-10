import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ChargeMutationResult, PaymentCharge } from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import {
  centsToInput,
  chargeTitle,
  errorCode,
  errorDetail,
  formatCents,
  formatDay,
  newOperationId,
  amountInputErrorKey,
  parseAmountInput,
  paymentsErrorMessage,
} from '../../utils/payments-view.util';

let formSeq = 0;

// Alta de un cobro puntual o corrección de un cobro concreto (importe,
// vencimiento, concepto, nota). Cada cambio de importe o fecha lleva motivo y
// queda en el historial; reabrir una deuda cerrada exige confirmar el saldo.
@Component({
  selector: 'app-charge-form-panel',
  templateUrl: './charge-form-panel.component.html',
  styleUrls: ['./charge-form-panel.component.scss'],
})
export class ChargeFormPanelComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() public clientId = '';
  @Input() public clientName: string | null = null;
  @Input() public today = '';
  @Input() public charge: PaymentCharge | null = null; // null = alta de cobro puntual
  @Output() public closed = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<ChargeMutationResult>();

  public readonly formId = `charge-form-${++formSeq}`;
  public amountText = '';
  public dueDay = '';
  public concept = '';
  public note = '';
  public reason = '';
  public confirmPastDue = false;
  public reopenBalanceCents: number | null = null;
  public saving = false;
  public errorMessage: string | null = null;
  private operationId = newOperationId('charge');

  constructor(private payments: TrainerPaymentsService, private ionicUtil: IonicUtilService) {}

  public ngOnInit(): void {
    if (this.charge) {
      this.amountText = centsToInput(this.charge.amountCents);
      this.dueDay = this.charge.dueDay;
      this.concept = this.charge.concept ?? '';
      this.note = this.charge.note ?? '';
    } else {
      this.dueDay = this.today;
    }
  }

  public get editing(): boolean {
    return this.charge !== null;
  }

  public get title(): string {
    return this.editing ? this.translate.instant('PAYMENTS.EDITAR_COBRO') : this.translate.instant('PAYMENTS.COBRO_PUNTUAL');
  }

  public get subtitle(): string | null {
    if (!this.charge) return this.clientName ? this.translate.instant('PAYMENTS.PARA_SE_SUMA_SU_CUOTA', { clientName: this.clientName }) : null;
    return `${chargeTitle(this.charge)} del ${formatDay(this.charge.dueDay, true)}`;
  }

  public get amountCents(): number | null {
    return parseAmountInput(this.amountText);
  }

  // Suelo de un cobro con movimientos: lo recibido más lo anulado.
  public get floorCents(): number {
    return this.charge ? this.charge.receivedCents + this.charge.cancelledCents : 0;
  }

  public get amountError(): string | null {
    if (!this.amountText.trim()) return this.translate.instant('PAYMENTS.INDICA_EL_IMPORTE');
    const cents = this.amountCents;
    if (cents === null) return this.translate.instant(amountInputErrorKey(this.amountText) || 'PAYMENTS.AMOUNT_ERRORS.NOT_A_NUMBER');
    if (this.charge && cents < this.floorCents) {
      return this.translate.instant('PAYMENTS.NO_PUEDE_QUEDAR_POR_DEBAJO', { p0: this.money(this.floorCents) });
    }
    return null;
  }

  public get amountChanged(): boolean {
    return this.charge !== null && this.amountCents !== null && this.amountCents !== this.charge.amountCents;
  }

  public get dueChanged(): boolean {
    return this.charge !== null && this.dueDay !== this.charge.dueDay;
  }

  public get pastDue(): boolean {
    return !this.editing && !!this.dueDay && this.dueDay < this.today;
  }

  public get needsReason(): boolean {
    return this.amountChanged || this.dueChanged;
  }

  public get hasChanges(): boolean {
    if (!this.charge) return true;
    return (
      this.amountChanged ||
      this.dueChanged ||
      this.concept.trim() !== (this.charge.concept ?? '') ||
      this.note.trim() !== (this.charge.note ?? '')
    );
  }

  public get canSubmit(): boolean {
    if (this.saving || this.amountError || !this.dueDay || !this.hasChanges) return false;
    if (this.pastDue && !this.confirmPastDue) return false;
    return !this.needsReason || this.reason.trim().length >= 3;
  }

  public money(cents: number): string {
    return formatCents(cents, this.charge?.currency ?? 'EUR');
  }

  public submit(confirmReopen = false): void {
    if (!this.canSubmit) return;
    this.saving = true;
    this.errorMessage = null;
    const request = this.charge
      ? this.payments.editCharge(this.clientId, this.charge.id, this.editBody(confirmReopen))
      : this.payments.createCharge(this.clientId, {
          amount: this.amountText.trim(),
          dueDay: this.dueDay,
          concept: this.concept.trim() || null,
          note: this.note.trim() || null,
          operationId: this.operationId,
          confirmPastDue: this.pastDue ? this.confirmPastDue : undefined,
        });
    request.subscribe({
      next: (result) => {
        this.saving = false;
        void this.ionicUtil.showSuccessToast(this.editing ? this.translate.instant('PAYMENTS.COBRO_ACTUALIZADO') : this.translate.instant('PAYMENTS.COBRO_ANADIDO'));
        this.saved.emit(result);
        this.closed.emit();
      },
      error: (error) => {
        this.saving = false;
        if (errorCode(error) === 'REOPEN_CONFIRMATION_REQUIRED') {
          this.reopenBalanceCents = errorDetail(error, 'balanceCents');
          return;
        }
        this.errorMessage = paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_GUARDAR_EL'));
      },
    });
  }

  public confirmReopen(): void {
    this.submit(true);
  }

  private editBody(confirmReopen: boolean): Record<string, unknown> {
    const charge = this.charge!;
    // Cada envío distinto es una operación distinta (reintentar el mismo
    // cuerpo sí reutiliza la suya).
    const body: Record<string, unknown> = { operationId: this.operationId };
    if (this.amountChanged) body['amount'] = this.amountText.trim();
    if (this.dueChanged) body['dueDay'] = this.dueDay;
    if (this.concept.trim() !== (charge.concept ?? '')) body['concept'] = this.concept.trim() || null;
    if (this.note.trim() !== (charge.note ?? '')) body['note'] = this.note.trim() || null;
    if (this.reason.trim()) body['reason'] = this.reason.trim();
    if (confirmReopen && this.reopenBalanceCents !== null) {
      body['confirmBalanceCents'] = this.reopenBalanceCents;
      this.operationId = newOperationId('charge');
      body['operationId'] = this.operationId;
    }
    return body;
  }
}
