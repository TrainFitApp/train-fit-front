import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ChargeMutationResult, PaymentCharge, PaymentMethod } from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import {
  PAYMENT_METHODS,
  centsToInput,
  chargeTitle,
  errorCode,
  errorDetail,
  formatCents,
  formatDay,
  newOperationId,
  parseAmountInput,
  paymentsErrorMessage,
} from '../../utils/payments-view.util';

const LAST_METHOD_KEY = 'tf-trainers.payments-last-method';
let formSeq = 0;

type ChargeForRegister = Pick<PaymentCharge, 'id' | 'concept' | 'origin' | 'dueDay' | 'currency' | 'balanceCents' | 'amountCents'>;

// Registrar dinero recibido fuera de la app. Precarga el saldo completo; se
// reduce para un pago parcial. La fecha es la de recepción real (hoy por
// defecto, nunca futura), distinta de cuándo se anota.
@Component({
  selector: 'app-payment-register-panel',
  templateUrl: './payment-register-panel.component.html',
  styleUrls: ['./payment-register-panel.component.scss'],
})
export class PaymentRegisterPanelComponent implements OnInit {
  @Input() public clientId = '';
  @Input() public clientName: string | null = null;
  @Input() public charge!: ChargeForRegister;
  @Input() public today = '';
  @Output() public closed = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<ChargeMutationResult>();

  public readonly methods = PAYMENT_METHODS;
  public readonly formId = `register-payment-${++formSeq}`;
  public amountText = '';
  public receivedDay = '';
  public method: PaymentMethod | null = null;
  public note = '';
  public balanceCents = 0;
  public saving = false;
  public errorMessage: string | null = null;

  // Se genera al abrir y se reutiliza en cada reintento: un doble clic o un
  // reintento tras un corte de red nunca registra el pago dos veces.
  private readonly operationId = newOperationId('pay');

  constructor(private payments: TrainerPaymentsService, private ionicUtil: IonicUtilService) {}

  public ngOnInit(): void {
    this.balanceCents = this.charge.balanceCents;
    this.amountText = centsToInput(this.balanceCents);
    this.receivedDay = this.today;
    this.method = this.lastMethod();
  }

  public get title(): string {
    return chargeTitle(this.charge);
  }

  public get subtitle(): string {
    const who = this.clientName ? `${this.clientName} · ` : '';
    return `${who}${this.title} del ${formatDay(this.charge.dueDay, true)}`;
  }

  public get amountCents(): number | null {
    return parseAmountInput(this.amountText);
  }

  public get amountError(): string | null {
    if (!this.amountText.trim()) return 'Indica el importe recibido.';
    const cents = this.amountCents;
    if (cents === null) return 'Importe no válido: usa como mucho dos decimales (p. ej. 20,50).';
    if (cents > this.balanceCents) return `Supera el saldo pendiente (${this.money(this.balanceCents)}).`;
    return null;
  }

  public get remainingCents(): number | null {
    const cents = this.amountCents;
    return cents === null || cents > this.balanceCents ? null : this.balanceCents - cents;
  }

  public get isFullAmount(): boolean {
    return this.amountCents === this.balanceCents;
  }

  public get dayError(): string | null {
    if (!this.receivedDay) return 'Indica cuándo lo recibiste.';
    if (this.receivedDay > this.today) return 'La fecha de recepción no puede ser futura.';
    return null;
  }

  public get canSubmit(): boolean {
    return !this.saving && !this.amountError && !this.dayError && this.method !== null;
  }

  public get submitLabel(): string {
    const cents = this.amountCents;
    return cents && cents <= this.balanceCents ? `Registrar ${this.money(cents)}` : 'Registrar pago';
  }

  public money(cents: number): string {
    return formatCents(cents, this.charge.currency);
  }

  public useFullBalance(): void {
    this.amountText = centsToInput(this.balanceCents);
  }

  public selectMethod(method: PaymentMethod): void {
    this.method = method;
  }

  public submit(): void {
    if (!this.canSubmit || !this.method) return;
    this.saving = true;
    this.errorMessage = null;
    this.payments
      .registerPayment(this.clientId, this.charge.id, {
        amount: this.amountText.trim(),
        receivedDay: this.receivedDay,
        method: this.method,
        note: this.note.trim() || null,
        operationId: this.operationId,
      })
      .subscribe({
        next: (result) => {
          this.saving = false;
          this.rememberMethod(this.method);
          const received = this.amountCents ?? 0;
          void this.ionicUtil.showSuccessToast(
            result.charge.balanceCents === 0
              ? `Pago de ${this.money(received)} registrado · cobro liquidado`
              : `Pago de ${this.money(received)} registrado · quedan ${this.money(result.charge.balanceCents)}`
          );
          this.saved.emit(result);
          this.closed.emit();
        },
        error: (error) => {
          this.saving = false;
          // Otro pago entró antes: se muestra el saldo real para ajustar.
          const balance = errorDetail(error, 'balanceCents');
          if (errorCode(error) === 'AMOUNT_EXCEEDS_BALANCE' && balance !== null) this.balanceCents = balance;
          this.errorMessage = paymentsErrorMessage(error, 'No se pudo registrar el pago. Vuelve a intentarlo: no se duplicará.');
        },
      });
  }

  private lastMethod(): PaymentMethod | null {
    try {
      const stored = localStorage.getItem(LAST_METHOD_KEY);
      return PAYMENT_METHODS.some((item) => item.value === stored) ? (stored as PaymentMethod) : null;
    } catch {
      return null;
    }
  }

  private rememberMethod(method: PaymentMethod | null): void {
    try {
      if (method) localStorage.setItem(LAST_METHOD_KEY, method);
    } catch {
      // Preferencia de comodidad: sin almacenamiento, simplemente no se recuerda.
    }
  }
}
