import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentCharge } from '../../models/payments.model';
import { BalanceSegments, balanceSegments, formatCents } from '../../utils/payments-view.util';

type BarCharge = Pick<PaymentCharge, 'amountCents' | 'receivedCents' | 'cancelledCents' | 'balanceCents' | 'status' | 'temporal' | 'currency'>;

// La fórmula del saldo, dibujada: recibido + anulado + pendiente = importe.
// Verde lo cobrado, gris lo anulado (no es dinero recibido) y el resto
// pendiente en naranja, rojo si ya venció. Al registrar un pago, el tramo
// verde crece hacia el pendiente en vez de saltar.
@Component({
  selector: 'app-payment-balance-bar',
  templateUrl: './payment-balance-bar.component.html',
  styleUrls: ['./payment-balance-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentBalanceBarComponent {
  @Input() public set charge(value: BarCharge | null) {
    this.current = value;
    this.segments = value ? balanceSegments(value) : { received: 0, cancelled: 0, pending: 0 };
  }
  @Input() public size: 'sm' | 'md' = 'sm';

  public current: BarCharge | null = null;
  public segments: BalanceSegments = { received: 0, cancelled: 0, pending: 0 };

  public get label(): string {
    const charge = this.current;
    if (!charge) return '';
    const parts = [`Recibido ${formatCents(charge.receivedCents, charge.currency)} de ${formatCents(charge.amountCents, charge.currency)}`];
    if (charge.cancelledCents > 0) parts.push(`anulado ${formatCents(charge.cancelledCents, charge.currency)}`);
    parts.push(`pendiente ${formatCents(charge.balanceCents, charge.currency)}`);
    return parts.join(', ');
  }

  public get pendingTone(): 'overdue' | 'today' | 'open' {
    if (this.current?.temporal === 'overdue') return 'overdue';
    if (this.current?.temporal === 'due_today') return 'today';
    return 'open';
  }
}
