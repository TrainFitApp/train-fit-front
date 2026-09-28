import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TrainerBillingApiService } from 'src/app/features/subscription/services/trainer-billing-api.service';
import {
  OverviewRelation,
  OverviewRow,
  OverviewState,
  PaymentCharge,
  PaymentSettings,
  PaymentsAccess,
  PaymentsOverview,
} from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import {
  StatusChip,
  chargeTitle,
  dueRelative,
  formatCents,
  formatDay,
  statusChips,
} from '../../utils/payments-view.util';

interface OpenCharge {
  clientId: string;
  clientName: string;
  chargeId: string;
  access: PaymentsAccess;
}

interface OpenClient {
  clientId: string;
  clientName: string;
}

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// Configuración > Cobros: la cartera entera, activos y antiguos. Los totales
// se agregan en el backend sobre todo el conjunto (nunca sobre la página) y
// se dice de qué son. Desde aquí se registra y se corrige sin entrar en la
// ficha, también de antiguos clientes cuya ficha ya no es accesible.
@Component({
  selector: 'app-payments-overview',
  templateUrl: './payments-overview.page.html',
  styleUrls: ['./payments-overview.page.scss'],
})
export class PaymentsOverviewPage implements OnInit, OnDestroy {
  public readonly states: Array<{ key: OverviewState; label: string }> = [
    { key: 'pending', label: 'Pendientes' },
    { key: 'overdue', label: 'Vencidos' },
    { key: 'due_today', label: 'Hoy' },
    { key: 'upcoming', label: 'Próximos' },
    { key: 'settled', label: 'Liquidados' },
    { key: 'cancelled', label: 'Anulados' },
    { key: 'all', label: 'Todos' },
  ];
  public readonly relations: Array<{ key: OverviewRelation; label: string }> = [
    { key: 'all', label: 'Todos los clientes' },
    { key: 'active', label: 'Clientes activos' },
    { key: 'former', label: 'Antiguos clientes' },
  ];

  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public data: PaymentsOverview | null = null;
  public stateFilter: OverviewState = 'pending';
  public relation: OverviewRelation = 'all';
  public searchText = '';
  public from = '';
  public to = '';
  public page = 0;
  public readonly limit = 20;

  public settings: PaymentSettings | null = null;
  public settingsState: 'loading' | 'error' | 'loaded' = 'loading';
  public showSettings = false;
  public openCharge: OpenCharge | null = null;
  public registerRow: OverviewRow | null = null;
  public registerCharge: Pick<PaymentCharge, 'id' | 'concept' | 'origin' | 'dueDay' | 'currency' | 'balanceCents' | 'amountCents'> | null = null;
  public openClient: OpenClient | null = null;
  private readOnlyClients = new Set<string>();

  private readonly searchInput = new Subject<string>();
  private readonly subscriptions = new Subscription();

  constructor(
    private payments: TrainerPaymentsService,
    private billingApi: TrainerBillingApiService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      this.searchInput.pipe(debounceTime(300)).subscribe((text) => {
        this.searchText = text;
        this.page = 0;
        this.load();
      })
    );
    // Cualquier escritura (aquí o en una ficha) refresca totales y lista.
    this.subscriptions.add(this.payments.changes$.subscribe(() => this.load(true)));
    this.load();
    this.loadSettings();
    this.loadSeats();
    this.openFromLink();
  }

  // Ionic mantiene la página viva: al volver a ella se relee todo.
  public ionViewWillEnter(): void {
    if (this.data) this.load(true);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public load(silent = false): void {
    if (!silent || !this.data) this.state = 'loading';
    this.payments
      .getOverview({
        search: this.searchText.trim() || undefined,
        state: this.stateFilter,
        relation: this.relation,
        from: this.from || null,
        to: this.to || null,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (data) => {
          this.data = data;
          this.state = 'loaded';
        },
        error: () => {
          if (!silent || !this.data) this.state = 'error';
        },
      });
  }

  public loadSettings(): void {
    this.settingsState = 'loading';
    this.payments.getSettings().subscribe({
      next: (settings) => {
        this.settings = settings;
        this.settingsState = 'loaded';
      },
      error: () => (this.settingsState = 'error'),
    });
  }

  // Plazas: un cliente activo fuera de las plazas del plan es de solo lectura.
  private loadSeats(): void {
    this.billingApi.getSeats().subscribe({
      next: (seats) => {
        this.readOnlyClients = new Set(seats.overLimit ? seats.clients.filter((c) => !c.active).map((c) => c.clientId) : []);
      },
      error: () => (this.readOnlyClients = new Set()),
    });
  }

  // Aviso de un antiguo cliente → /tabs/account/payments?client=…&charge=…
  private openFromLink(): void {
    const params = this.route.snapshot.queryParamMap;
    const clientId = params.get('client');
    const chargeId = params.get('charge');
    if (!clientId || !chargeId) return;
    this.payments.getClientSummary(clientId).subscribe({
      next: (response) => {
        this.openCharge = { clientId, clientName: params.get('name') || 'Cliente', chargeId, access: response.access };
      },
      error: () => (this.openCharge = null),
    });
  }

  // --- Filtros ---

  public onSearch(text: string): void {
    this.searchInput.next(text);
  }

  public setState(value: OverviewState): void {
    this.stateFilter = value;
    this.page = 0;
    this.load();
  }

  public setRelation(value: OverviewRelation): void {
    this.relation = value;
    this.page = 0;
    this.load();
  }

  public onDatesChange(): void {
    this.page = 0;
    this.load();
  }

  public clearDates(): void {
    this.from = '';
    this.to = '';
    this.onDatesChange();
  }

  public goToPage(page: number): void {
    this.page = Math.max(0, Math.min(page, this.pageCount - 1));
    this.load();
  }

  public get pageCount(): number {
    return Math.max(1, Math.ceil((this.data?.results.count ?? 0) / this.limit));
  }

  // --- Presentación ---

  public money(cents: number, currency = 'EUR'): string {
    return formatCents(cents, currency);
  }

  public day(value: string): string {
    return formatDay(value, true);
  }

  public relative(row: OverviewRow): string {
    return row.status === 'open' && this.data ? dueRelative(row.dueDay, this.data.scope.today) : '';
  }

  public title(row: OverviewRow): string {
    return chargeTitle(row);
  }

  public chips(row: OverviewRow): StatusChip[] {
    return statusChips(row);
  }

  public get monthName(): string {
    const month = Number(this.data?.scope.month.slice(5, 7) ?? 0);
    return MONTHS[month - 1] ?? 'este mes';
  }

  public get scopeLabel(): string {
    const scope = this.data?.scope;
    if (!scope) return '';
    const who = scope.relation === 'active' ? 'tus clientes activos' : scope.relation === 'former' ? 'tus antiguos clientes' : 'toda tu cartera';
    return scope.search ? `${who} que coinciden con «${scope.search}»` : who;
  }

  public get reminderSummary(): string {
    const settings = this.settings;
    if (!settings) return '';
    const parts: string[] = [];
    for (const offset of settings.offsets) {
      if (offset < 0) parts.push(`${-offset} ${offset === -1 ? 'día' : 'días'} antes`);
      else if (offset === 0) parts.push('el día del vencimiento');
      else parts.push(`${offset} ${offset === 1 ? 'día' : 'días'} después si queda saldo`);
    }
    return parts.length ? `${parts.join(', ')} · a las ${settings.time} (${settings.timeZone})` : 'Sin avisos de cobro';
  }

  public figures(row: OverviewRow): string {
    const money = (cents: number) => this.money(cents, row.currency);
    if (row.status === 'settled') return 'Liquidado';
    if (row.status === 'cancelled') return row.receivedCents > 0 ? `Recibido ${money(row.receivedCents)} · anulado ${money(row.cancelledCents)}` : 'Anulado sin cobrar';
    return row.receivedCents > 0 ? `de ${money(row.amountCents)} · recibido ${money(row.receivedCents)}` : `de ${money(row.amountCents)}`;
  }

  public isReadOnly(row: OverviewRow): boolean {
    return row.clientRelation === 'active' && this.readOnlyClients.has(row.clientId);
  }

  public canRegister(row: OverviewRow): boolean {
    return row.status === 'open' && row.balanceCents > 0 && !this.isReadOnly(row);
  }

  public trackById(_index: number, row: OverviewRow): string {
    return row.id;
  }

  // --- Paneles ---

  public openDetail(row: OverviewRow): void {
    this.openCharge = { clientId: row.clientId, clientName: row.clientName, chargeId: row.id, access: row.clientRelation };
  }

  // El objeto se crea UNA vez al abrir: una función en la plantilla daría uno
  // nuevo en cada ciclo de detección de cambios.
  public openRegister(row: OverviewRow): void {
    this.registerCharge = this.registerChargeOf(row);
    this.registerRow = row;
  }

  public closeRegister(): void {
    this.registerRow = null;
    this.registerCharge = null;
  }

  public openLedger(row: OverviewRow): void {
    this.openClient = { clientId: row.clientId, clientName: row.clientName };
  }

  private registerChargeOf(row: OverviewRow): Pick<PaymentCharge, 'id' | 'concept' | 'origin' | 'dueDay' | 'currency' | 'balanceCents' | 'amountCents'> {
    return {
      id: row.id,
      concept: row.concept,
      origin: row.origin,
      dueDay: row.dueDay,
      currency: row.currency,
      balanceCents: row.balanceCents,
      amountCents: row.amountCents,
    };
  }

  public isClientReadOnly(clientId: string): boolean {
    return this.readOnlyClients.has(clientId);
  }

  public onSettingsSaved(settings: PaymentSettings): void {
    this.settings = settings;
    this.load(true);
  }
}
