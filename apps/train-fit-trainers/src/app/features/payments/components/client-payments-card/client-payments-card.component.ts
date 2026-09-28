import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientPaymentsSummary, PaymentsAccess } from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import { CardAction, PaymentsCardView, paymentsCardView } from '../../utils/payments-view.util';

export interface PaymentsCardRequest {
  action: CardAction;
  chargeId: string | null;
}

// Tarjeta "Cobros" del Resumen de UN cliente: responde a "¿hay algo que deba
// cobrar o configurar para esta persona?". Carga aparte del seguimiento (su
// error no tapa el resto del Resumen) y nunca pinta un cero si no pudo leer.
// No navega por su cuenta: pide al padre abrir Gestión > Cobros.
@Component({
  selector: 'app-client-payments-card',
  templateUrl: './client-payments-card.component.html',
  styleUrls: ['./client-payments-card.component.scss'],
})
export class ClientPaymentsCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public clientId = '';
  @Input() public refreshToken = 0;
  @Output() public open = new EventEmitter<PaymentsCardRequest>();

  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public summary: ClientPaymentsSummary | null = null;
  public access: PaymentsAccess = 'active';
  public view: PaymentsCardView | null = null;
  private changesSubscription: Subscription | null = null;

  constructor(private payments: TrainerPaymentsService) {}

  public ngOnInit(): void {
    this.changesSubscription = this.payments.changes$
      .pipe(filter((event) => event.clientId === this.clientId))
      .subscribe(() => this.load(true));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.summary = null;
      this.view = null;
      this.load();
    } else if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.load(true);
    }
  }

  public ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }

  public load(silent = false): void {
    if (!this.clientId) return;
    const clientId = this.clientId;
    if (!silent || !this.summary) this.state = 'loading';
    this.payments.getClientSummary(clientId).subscribe({
      next: (response) => {
        if (clientId !== this.clientId) return;
        this.summary = response.summary;
        this.access = response.access;
        this.view = paymentsCardView(response.summary);
        this.state = 'loaded';
      },
      error: () => {
        if (clientId !== this.clientId) return;
        if (!silent || !this.summary) this.state = 'error';
      },
    });
  }

  public trigger(action: CardAction): void {
    // Con un antiguo cliente no se configuran cuotas: se abre su historial.
    const effective: CardAction = action === 'configure-fee' && this.access !== 'active' ? 'history' : action;
    this.open.emit({ action: effective, chargeId: action === 'register' ? this.summary?.dueToday?.chargeId ?? null : null });
  }
}
