import { Component, OnDestroy, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TrainerBillingApiService } from './services/trainer-billing-api.service';
import {
  PurchasableTrainerTier, TrainerBillingActions, TrainerBillingDetails, TrainerBillingInterval, TrainerChangeQuote,
  TrainerEntitlements, TrainerInvoice, TrainerPlan, TrainerPlanCatalog, TrainerQuoteLine, TrainerSeats,
} from './models/trainer-entitlements.model';
import {
  TRAINER_INTERVAL_NAMES, TRAINER_PLAN_NAMES, TrainerStateTone, canStartTrainerCheckout, checkoutConfirmationState,
  formatTrainerAmount, formatTrainerDate, isBillingMode, isCheckoutSessionId, isLegacyTrainerPlan, safeStripeRedirectUrl,
  trainerBillingState, trainerBillingSummary, trainerPlanLabel, trainerPlanName,
} from './trainer-billing-view.util';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'error' | 'loaded' | 'forbidden';
type ReturnState = 'none' | 'pending' | 'delayed' | 'confirmed' | 'cancelled' | 'payment_required' | 'error';
type ManagementDialog = 'change' | 'cancel' | 'resume' | 'discard';
type ManagementAction = Exclude<ManagementDialog, 'change'>;

export interface PlanCard {
  plan: TrainerPlan;
  name: string;
  price: string;
  perMonth: string | null;
  annualSaving: string | null;
  current: boolean;
  scheduled: boolean;
  blockReason: string | null;
  action: 'checkout' | 'change' | 'keep' | null;
  actionLabel: string;
}

export interface InvoiceRow {
  invoice: TrainerInvoice;
  date: string;
  concept: string;
  amount: string;
  status: { label: string; tone: TrainerStateTone };
  linkLabel: string;
}

// Qué pasa hoy y en la próxima fecha relevante: renovación, cambio programado,
// fin del acceso o fin del margen tras un impago.
export interface TimelineStep { when: string; title: string; detail: string | null; tone: TrainerStateTone }

const CAPABILITY: Record<ManagementAction, keyof TrainerBillingActions> = {
  cancel: 'canCancel', resume: 'canResume', discard: 'canDiscardChange',
};
const DIALOG_TITLES: Record<ManagementDialog, string> = {
  change: 'Revisar cambio de plan', cancel: 'Cancelar renovación', resume: 'Mantener suscripción', discard: 'Descartar cambio programado',
};
localizeRecord(DIALOG_TITLES, 'SUBSCRIPTION.DIALOG_TITLES');
const INVOICE_REASONS: Record<TrainerInvoice['reason'], string> = {
  subscription_create: 'Alta', subscription_cycle: 'Renovación', subscription_update: 'Cambio de plan', other: 'Factura',
};
localizeRecord(INVOICE_REASONS, 'SUBSCRIPTION.INVOICE_REASONS');
const CARD_BRANDS: Record<string, string> = { visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express' };
const ERROR_MESSAGES: Record<string, string> = {
  ACTIVE_SUBSCRIPTION: 'Ya tienes una suscripción. Gestiona la existente desde esta página.',
  LEGACY_SUBSCRIPTION: 'Tu plan anterior se conserva. Contacta con TrainFit para solicitar un cambio.',
  EXISTING_CHECKOUT: 'Ya hay una contratación en curso. Retoma el mismo plan o comprueba tu suscripción.',
  BILLING_BUSY: 'Tu suscripción se está actualizando. Espera unos segundos y vuelve a intentarlo.',
  BILLING_DISABLED: 'Los pagos no están disponibles en este momento.',
  BILLING_NOT_READY: 'La contratación todavía no está disponible. Tu plan actual se mantiene.',
  PORTAL_NOT_READY: 'La gestión de suscripciones todavía no está disponible.',
  CLIENT_LIMIT_EXCEEDED: 'Tienes más clientes de los que admite ese plan. Reduce tu cartera antes de solicitar la bajada.',
  QUOTE_EXPIRED: 'El cálculo ha caducado. Actualízalo para revisar el importe vigente.',
  QUOTE_STALE: 'Tu suscripción ha cambiado desde el cálculo. Actualiza el estado y revisa de nuevo el cambio.',
  PAYMENT_PENDING: 'Hay un pago pendiente. Complétalo antes de solicitar otro cambio.',
  CHANGE_ALREADY_SCHEDULED: 'Ya tienes un cambio programado. Puedes descartarlo antes de elegir otro plan.',
  SUBSCRIPTION_NOT_ACTIVE: 'Este cambio requiere una suscripción activa. Revisa el estado y los pagos pendientes.',
  SAME_SCHEDULED_CHANGE: 'Ese cambio ya está programado.',
  SAME_PLAN: 'Ya tienes ese plan y periodicidad.',
  SEAT_LIMIT_EXCEEDED: 'Has elegido más clientes de los que admite tu plan.',
  SEAT_NOT_OWNED: 'Alguno de los clientes elegidos ya no está en tu cartera. Actualiza la página.',
  SEAT_CHANGE_LOCKED: 'Ya cambiaste tus clientes activos hace menos de 30 días.',
  CLIENT_READ_ONLY: 'Ese cliente está en solo lectura por el cupo de tu plan.',
};
localizeRecord(ERROR_MESSAGES, 'SUBSCRIPTION.ERRORS');

@Component({
  selector: 'app-subscription',
  templateUrl: 'subscription.page.html',
  styleUrls: ['subscription.page.scss'],
})
export class SubscriptionPage implements OnDestroy {
  private readonly translate = inject(TranslateService);

  public state: ViewState = 'loading';
  public entitlements: TrainerEntitlements | null = null;
  public catalog: TrainerPlanCatalog | null = null;
  public interval: TrainerBillingInterval = 'monthly';
  public returnState: ReturnState = 'none';
  public actionError = '';
  public checkoutTier: string | null = null;
  public portalBusy = false;
  public syncing = false;
  public catalogError = false;
  public dialog: ManagementDialog | null = null;
  public quote: TrainerChangeQuote | null = null;
  public previewBusy = false;
  public managementBusy = false;
  public dialogError = '';
  public feedback = '';
  public quoteExpired = false;
  public seats: TrainerSeats | null = null;
  public seatSelection = new Set<string>();
  public seatsBusy = false;
  public seatsError = '';
  public seatsFeedback = '';
  // Facturas y método de pago: se leen de Stripe aparte para no retrasar la página.
  public billingDetails: TrainerBillingDetails | null = null;
  public billingDetailsState: 'idle' | 'loading' | 'loaded' | 'error' = 'idle';
  public invoiceRows: InvoiceRow[] = [];
  public readonly isWeb = !Capacitor.isNativePlatform();
  public readonly reduceMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  public readonly planNames = TRAINER_PLAN_NAMES;
  public readonly intervalNames = TRAINER_INTERVAL_NAMES;
  public readonly formatDate = formatTrainerDate;

  private requests = new Subscription();
  private syncRequest: Subscription | null = null;
  private pollTimer: ReturnType<typeof setTimeout> | null = null;
  private active = false;
  private sessionId: string | null = null;
  private invalidSession = false;
  private returningFromPortal = false;
  private changeSelection: { tier: PurchasableTrainerTier; interval: TrainerBillingInterval } | null = null;
  private actionPaymentUrl: string | null = null;
  private initialSeatIds = new Set<string>();
  private readonly maxConfirmationAttempts = 5;
  // Vistas derivadas: se recalculan solo cuando cambian sus datos de entrada.
  private planCardsCache: { key: unknown[]; cards: PlanCard[] } | null = null;
  private timelineCache: { key: unknown[]; steps: TimelineStep[] } | null = null;
  private readonly onPageShow = (event: PageTransitionEvent): void => {
    if (event.persisted && this.active && !this.busy) this.retrySync();
  };

  constructor(
    private trainerBillingApi: TrainerBillingApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public get currentPlanName(): string { return trainerPlanName(this.entitlements); }
  public get billingSummary() { return trainerBillingSummary(this.entitlements); }
  public get statusBadge() { return trainerBillingState(this.entitlements); }
  public get legacyPlan(): boolean { return isLegacyTrainerPlan(this.entitlements); }
  public get plans(): TrainerPlan[] { return this.catalog?.plans || []; }
  public get busy(): boolean { return !!this.checkoutTier || this.portalBusy || this.syncing || this.previewBusy || this.managementBusy; }
  public get billingEnabled(): boolean {
    return this.isWeb && !!this.entitlements?.billing?.enabled && isBillingMode(this.entitlements.billing.mode);
  }
  public get checkoutAvailable(): boolean {
    return this.isWeb && this.hasTrainerRole() && !this.sessionId && !this.invalidSession &&
      canStartTrainerCheckout(this.catalog, this.entitlements);
  }
  public get portalAvailable(): boolean {
    return this.billingEnabled && this.hasTrainerRole() && !!this.entitlements?.billing?.portalAvailable;
  }
  public get managementAvailable(): boolean {
    return this.billingEnabled && this.hasTrainerRole() && this.entitlements?.provider === 'stripe' && !this.legacyPlan;
  }
  public canManage(action: keyof TrainerBillingActions): boolean {
    return this.managementAvailable && !!this.entitlements?.billing?.actions?.[action];
  }
  public get changesAvailable(): boolean {
    return this.canManage('canChange') && !!this.catalog?.enabled && !!this.catalog.capabilities.planChanges;
  }
  public get currentPrice() {
    const price = this.entitlements?.billing?.currentPrice;
    return price && price.tier === this.entitlements?.tier ? price : null;
  }
  public get pendingChange() { return this.entitlements?.billing?.pendingChange; }
  public get pendingClientLimit(): number | null {
    if (!this.pendingChange) return null;
    const admissionLimit = this.entitlements?.billing?.admissionClientLimit;
    if (typeof admissionLimit === 'number') return admissionLimit;
    // Backends anteriores sin admissionClientLimit.
    const destinationLimit = this.pendingChange.clientLimit ??
      this.plans.find((plan) => plan.tier === this.pendingChange?.tier)?.clientLimit;
    return typeof destinationLimit === 'number'
      ? Math.min(this.entitlements?.limits.clients ?? destinationLimit, destinationLimit) : null;
  }
  public get pendingPayment(): boolean { return !!this.entitlements?.billing?.pendingPayment || !!this.actionPaymentUrl; }
  public get paymentUrl(): string | null {
    return safeStripeRedirectUrl(this.entitlements?.billing?.pendingPayment?.url || this.actionPaymentUrl, 'invoice');
  }
  public get accessUntil(): string | null {
    return this.entitlements?.currentPeriodEnd || this.entitlements?.expiresAt || null;
  }
  public get dialogTitle(): string { return DIALOG_TITLES[this.dialog || 'change']; }
  public get needsNewQuote(): boolean {
    return this.quoteExpired || (!!this.quote && !(Date.parse(this.quote.expiresAt) > Date.now()));
  }
  public get canConfirmQuote(): boolean {
    return !!this.quote && !this.needsNewQuote && !this.busy && this.changesAvailable;
  }
  public get confirmLabel(): string {
    const quote = this.quote;
    if (this.managementBusy) return 'Confirmando…';
    if (!quote || quote.kind === 'scheduled') return this.translate.instant('SUBSCRIPTION.PROGRAMAR_CAMBIO');
    return quote.amountDueNow > 0 ? this.translate.instant('SUBSCRIPTION.CONFIRMAR_PAGAR', { p0: this.formatAmount(quote.amountDueNow, quote.currency) }) : this.translate.instant('SEARCH_EXERCISES.SWAP_CONFIRM_HEADER');
  }
  public get usagePercent(): number {
    const limit = this.entitlements?.limits.clients;
    return limit ? Math.min(100, Math.round(((this.entitlements?.usage.clients || 0) / limit) * 100)) : 0;
  }
  public get renewal() { return this.entitlements?.billing?.renewal || null; }
  public get renewalPayment() { return this.entitlements?.billing?.renewalPayment || null; }
  public get renewalPaymentUrl(): string | null {
    return safeStripeRedirectUrl(this.renewalPayment?.url, 'invoice');
  }
  // Subida de cupo que, por pasar de anual a mensual, espera al fin del año pagado.
  public get delayedUpgrade(): boolean {
    const quote = this.quote;
    return !!quote && quote.kind === 'scheduled' && quote.from.interval === 'annual' &&
      quote.to.interval === 'monthly' && quote.to.clientLimit > quote.from.clientLimit;
  }
  public get seatsChanged(): boolean {
    return this.initialSeatIds.size !== this.seatSelection.size || [...this.initialSeatIds].some((id) => !this.seatSelection.has(id));
  }
  public get showSyncRetry(): boolean {
    return ['delayed', 'error', 'payment_required'].includes(this.returnState) && !this.invalidSession;
  }
  public get cardLabel(): string | null {
    const card = this.billingDetails?.paymentMethod;
    if (!card) return null;
    return `${CARD_BRANDS[card.brand] || card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• ${card.last4}`;
  }
  public get cardExpiry(): string | null {
    const card = this.billingDetails?.paymentMethod;
    return card ? `${String(card.expMonth).padStart(2, '0')}/${card.expYear}` : null;
  }
  // Mayor ahorro anual del catálogo real (12 mensualidades frente al pago anual).
  public get annualSavingLabel(): string | null {
    const best = Math.max(0, ...this.plans.map((plan) => plan.prices.monthly.amount * 12 - plan.prices.annual.amount));
    return best > 0 ? this.translate.instant('SUBSCRIPTION.AHORRA_HASTA', { p0: this.formatAmount(best) }) : null;
  }

  public get planCards(): PlanCard[] {
    const key = [this.entitlements, this.catalog, this.interval, this.sessionId, this.invalidSession];
    if (this.planCardsCache && key.every((value, index) => value === this.planCardsCache!.key[index])) return this.planCardsCache.cards;
    const checkout = this.checkoutAvailable;
    const changes = this.changesAvailable;
    const cards = this.plans.map((plan): PlanCard => {
      const current = this.isCurrentPlan(plan);
      const scheduled = this.isScheduledTarget(plan);
      const blockReason = this.planBlockReason(plan);
      const monthly = plan.prices.monthly.amount;
      const annual = plan.prices.annual.amount;
      const action: PlanCard['action'] = checkout ? 'checkout'
        : this.pendingChange && current && this.canManage('canDiscardChange') ? 'keep'
          : changes && !current && !scheduled ? 'change' : null;
      return {
        plan, current, scheduled, blockReason, action,
        name: this.planNames[plan.tier],
        price: this.formatAmount(plan.prices[this.interval].amount),
        perMonth: this.interval === 'annual' ? this.formatAmount(annual / 12) : null,
        annualSaving: this.interval === 'annual' && monthly * 12 > annual ? this.formatAmount(monthly * 12 - annual) : null,
        actionLabel: action === 'keep' ? this.translate.instant('SUBSCRIPTION.MANTENER', { p0: this.planNames[plan.tier] })
          : action === 'checkout' ? this.translate.instant('SUBSCRIPTION.ELEGIR', { p0: this.planNames[plan.tier] }) : this.translate.instant('SUBSCRIPTION.CAMBIAR', { p0: this.planNames[plan.tier] }),
      };
    });
    this.planCardsCache = { key, cards };
    return cards;
  }

  public get timeline(): TimelineStep[] {
    const key = [this.entitlements, this.actionPaymentUrl];
    if (this.timelineCache && key.every((value, index) => value === this.timelineCache!.key[index])) return this.timelineCache.steps;
    this.timelineCache = { key, steps: this.buildTimeline() };
    return this.timelineCache.steps;
  }

  public ionViewWillEnter(): void {
    this.stopRequests();
    this.active = true;
    this.requests = new Subscription();
    this.returnState = 'none';
    this.actionError = '';
    this.feedback = '';
    this.dialog = null;
    this.quote = null;
    if (typeof window !== 'undefined') window.addEventListener('pageshow', this.onPageShow);
    const params = this.route.snapshot.queryParamMap;
    const sessionId = params.get('session_id');
    this.invalidSession = !!sessionId && !isCheckoutSessionId(sessionId);
    this.sessionId = sessionId && !this.invalidSession ? sessionId : null;
    this.returningFromPortal = params.get('from') === 'portal';
    if (this.invalidSession) {
      this.returnState = 'error';
      this.actionError = this.translate.instant('SUBSCRIPTION.EL_ENLACE_DE_CONFIRMACION_NO');
    } else if (params.get('checkout') === 'cancelled') {
      this.returnState = 'cancelled';
    }
    this.load();
  }

  public ionViewWillLeave(): void { this.stopRequests(); }
  public ngOnDestroy(): void { this.stopRequests(); }

  public load(): void {
    if (!this.active || this.busy) return;
    if (!this.hasTrainerRole()) {
      this.state = 'forbidden';
      return;
    }
    this.state = 'loading';
    this.catalogError = false;
    if (!this.invalidSession) this.actionError = '';
    this.requests.add(forkJoin({
      entitlements: this.trainerBillingApi.getEntitlements().pipe(timeout(10000)),
      catalog: this.catalogRequest(),
      // Las plazas son informativas aquí: un fallo no debe bloquear la página.
      seats: this.trainerBillingApi.getSeats().pipe(timeout(10000), catchError(() => of(null))),
    }).subscribe({
      next: ({ entitlements, catalog, seats }) => {
        this.entitlements = entitlements;
        this.catalog = catalog;
        this.applySeats(seats);
        if (entitlements.plan === 'monthly' || entitlements.plan === 'annual') this.interval = entitlements.plan;
        this.state = 'loaded';
        // Un id de Checkout de otro entorno (cs_live_ en pruebas o al revés) nunca se sincroniza.
        if (this.sessionId && !this.sessionId.startsWith(`cs_${entitlements.billing?.mode || 'test'}_`)) {
          this.sessionId = null;
          this.invalidSession = true;
          this.returnState = 'error';
          this.actionError = this.translate.instant('SUBSCRIPTION.EL_ENLACE_DE_CONFIRMACION_NO');
        }
        if (this.sessionId) {
          if (this.billingEnabled) this.syncSubscription(0);
          else this.returnState = 'delayed';
        } else if (!this.invalidSession && this.billingEnabled &&
                   (this.returningFromPortal || this.returnState === 'cancelled')) {
          // Solo al volver de Stripe: el resto del tiempo webhooks y reconciliación
          // mantienen el estado y no hace falta consultar Stripe en cada visita.
          this.syncSubscription(0);
        } else {
          this.loadBillingDetails();
        }
      },
      error: (error: unknown) => {
        this.state = 'error';
        this.actionError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_CARGAR_TU_2'));
      },
    }));
  }

  public reloadCatalog(): void {
    if (this.busy) return;
    this.catalogError = false;
    this.requests.add(this.catalogRequest().subscribe((catalog) => { this.catalog = catalog; }));
  }

  public selectInterval(interval: TrainerBillingInterval): void {
    if (!this.busy) this.interval = interval;
  }

  public isCurrentPlan(plan: TrainerPlan): boolean {
    const entitlements = this.entitlements;
    return !!entitlements && !this.legacyPlan && entitlements.tier === plan.tier &&
      entitlements.limits.clients === plan.clientLimit &&
      (entitlements.plan !== 'monthly' && entitlements.plan !== 'annual' || entitlements.plan === this.interval);
  }

  // Mismo plan y periodicidad que el cambio ya programado.
  public isScheduledTarget(plan: TrainerPlan): boolean {
    return !!this.pendingChange && this.pendingChange.tier === plan.tier && this.pendingChange.interval === this.interval;
  }

  public formatAmount(amount: number, currency: string = this.catalog?.currency || 'EUR'): string {
    return formatTrainerAmount(amount, currency);
  }

  public intervalLabel(interval: TrainerBillingInterval): string { return interval === 'annual' ? this.translate.instant('SUBSCRIPTION.ANO') : 'mes'; }

  public planLabel(tier: PurchasableTrainerTier, interval: TrainerBillingInterval): string { return trainerPlanLabel(tier, interval); }

  public recurring(amount: number, interval: TrainerBillingInterval, currency?: string): string {
    return `${this.formatAmount(amount, currency)} /${this.intervalLabel(interval)}`;
  }

  // Con Stripe Tax los precios del catálogo son base imponible (IVA aparte, decisión 2026-09-21).
  public get pricesExcludeTax(): boolean {
    return (this.catalog?.taxPolicy || this.entitlements?.billing?.taxPolicy) === 'stripe_tax';
  }

  // Importe calculado por Stripe: con IVA aparte ya lo incluye, y se dice para que cuadre con "29 € + IVA".
  public stripeAmount(amount: number, currency?: string): string {
    return this.formatAmount(amount, currency) + (this.pricesExcludeTax ? " (IVA incluido)" : "");
  }

  // Tarifa del catálogo: lleva "+ IVA" cuando el impuesto se añade al cobrar.
  public tariff(amount: number, interval: TrainerBillingInterval, currency?: string): string {
    return this.recurring(amount, interval, currency) + (this.pricesExcludeTax ? ' + IVA' : '');
  }

  public planBlockReason(plan: TrainerPlan): string | null {
    if (this.isCurrentPlan(plan)) return null;
    const clients = this.entitlements?.usage.clients || 0;
    return clients > plan.clientLimit ? this.translate.instant('SUBSCRIPTION.TIENES_CLIENTES_ESTE_PLAN_ADMITE', { clients, clientLimit: plan.clientLimit }) : null;
  }

  public selectPlan(plan: TrainerPlan): void {
    if (this.busy || this.planBlockReason(plan) || this.isScheduledTarget(plan)) return;
    if (this.checkoutAvailable) { this.subscribe(plan); return; }
    // Con un cambio programado, volver a la modalidad actual equivale a descartarlo.
    if (this.pendingChange && this.isCurrentPlan(plan)) { this.openManagementDialog('discard'); return; }
    if (!this.changesAvailable || this.isCurrentPlan(plan) || !this.plans.some((item) => item.tier === plan.tier)) return;
    this.changeSelection = { tier: plan.tier, interval: this.interval };
    this.dialog = 'change';
    this.quote = null;
    this.requestPreview();
  }

  public requestPreview(): void {
    if (!this.changeSelection || !this.changesAvailable || this.busy || this.dialog !== 'change') return;
    this.dialogError = '';
    this.quote = null;
    this.quoteExpired = false;
    this.previewBusy = true;
    const { tier, interval } = this.changeSelection;
    this.requests.add(this.trainerBillingApi.previewChange(tier, interval).pipe(
      timeout(15000), finalize(() => { this.previewBusy = false; })
    ).subscribe({
      next: (quote) => { this.quote = quote; },
      error: (error: unknown) => { this.dialogError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_CALCULAR_EL')); },
    }));
  }

  // Desde el aviso de "subida diferida": misma subida pero en anual, que es inmediata.
  public previewAnnualInstead(): void {
    if (!this.quote || this.busy) return;
    this.changeSelection = { tier: this.quote.to.tier, interval: 'annual' };
    this.requestPreview();
  }

  public payRenewal(): void {
    if (!this.busy && this.renewalPaymentUrl) this.redirect(this.renewalPaymentUrl, 'invoice');
  }

  public toggleSeat(clientId: string): void {
    if (this.seatsBusy || !this.seats?.limit || this.seats.lockedUntil) return;
    this.seatsFeedback = '';
    const next = new Set(this.seatSelection);
    if (next.has(clientId)) next.delete(clientId);
    else if (next.size < this.seats.limit) next.add(clientId);
    this.seatSelection = next;
  }

  public saveSeats(): void {
    if (this.seatsBusy || !this.seatsChanged || !this.seatSelection.size) return;
    this.seatsBusy = true;
    this.seatsError = '';
    this.requests.add(this.trainerBillingApi.updateSeats([...this.seatSelection]).pipe(
      timeout(10000), finalize(() => { this.seatsBusy = false; })
    ).subscribe({
      next: (seats) => {
        this.applySeats(seats);
        this.seatsFeedback = this.translate.instant('SUBSCRIPTION.CLIENTES_ACTIVOS_ACTUALIZADOS');
      },
      error: (error: unknown) => { this.seatsError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDIERON_GUARDAR_TUS')); },
    }));
  }

  public loadBillingDetails(): void {
    if (!this.billingEnabled || this.entitlements?.provider !== 'stripe' || this.billingDetailsState === 'loading') return;
    this.billingDetailsState = 'loading';
    this.requests.add(this.trainerBillingApi.getBillingDetails().pipe(timeout(15000)).subscribe({
      next: (details) => {
        this.billingDetails = details;
        this.invoiceRows = details.invoices.map((invoice) => this.invoiceRow(invoice));
        this.billingDetailsState = 'loaded';
      },
      error: () => { this.billingDetailsState = 'error'; },
    }));
  }

  public invoiceReason(invoice: TrainerInvoice): string { return INVOICE_REASONS[invoice.reason]; }

  public invoiceStatus(invoice: TrainerInvoice): { label: string; tone: TrainerStateTone } {
    if (invoice.status === 'paid') return { label: this.translate.instant('SUBSCRIPTION.PAGADA'), tone: 'ok' };
    if (invoice.status === 'open') return { label: this.translate.instant('MY_CHECKINS.PENDING'), tone: 'danger' };
    if (invoice.status === 'void') return { label: this.translate.instant('SUBSCRIPTION.ANULADA'), tone: 'neutral' };
    if (invoice.status === 'uncollectible') return { label: this.translate.instant('SUBSCRIPTION.IMPAGADA'), tone: 'danger' };
    return { label: invoice.status, tone: 'neutral' };
  }

  public lineLabel(line: TrainerQuoteLine): string {
    const plan = trainerPlanLabel(line.tier, line.interval);
    return line.kind === 'credit' ? this.translate.instant('SUBSCRIPTION.CREDITO_POR_EL_TIEMPO_NO', { plan }) : plan;
  }

  public trackByTier(_: number, card: PlanCard): string { return card.plan.tier; }
  public trackByInvoice(_: number, row: InvoiceRow): string { return row.invoice.id; }
  public trackBySeat(_: number, client: { clientId: string }): string { return client.clientId; }
  public trackByIndex(index: number): number { return index; }

  public scrollToCatalog(): void {
    if (typeof document !== 'undefined') document.getElementById('catalog-title')?.scrollIntoView({ behavior: this.reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  public confirmPlanChange(): void {
    if (this.busy || !this.quote || !this.changesAvailable) return;
    if (this.needsNewQuote) {
      this.quoteExpired = true;
      this.dialogError = this.translate.instant('SUBSCRIPTION.EL_CALCULO_HA_CADUCADO_ACTUALIZALO_2');
      return;
    }
    this.managementBusy = true;
    this.dialogError = '';
    this.requests.add(this.trainerBillingApi.changePlan(this.quote.quoteId).pipe(
      timeout(20000), finalize(() => { this.managementBusy = false; })
    ).subscribe({
      next: (result) => {
        this.entitlements = result.entitlements;
        // Un cambio programado no genera factura: solo se recargan al haber cobro.
        if (result.status !== 'scheduled') {
          this.billingDetailsState = 'idle';
          this.loadBillingDetails();
        }
        this.actionPaymentUrl = result.status === 'payment_pending' ? result.paymentActionUrl || null : null;
        this.feedback = result.status === 'scheduled' ? this.translate.instant('SUBSCRIPTION.CAMBIO_PROGRAMADO_TU_PLAN_ACTUAL')
          : result.status === 'payment_pending' ? this.translate.instant('SUBSCRIPTION.FALTA_CONFIRMAR_EL_PAGO_PARA')
          : this.translate.instant('SUBSCRIPTION.TU_CAMBIO_DE_PLAN_SE');
        this.returnState = 'none';
        this.dialog = null;
        this.quote = null;
      },
      error: (error: unknown) => {
        this.quoteExpired = true;
        this.dialogError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_HEMOS_PODIDO_CONFIRMAR_EL'));
      },
    }));
  }

  public openManagementDialog(action: ManagementAction): void {
    if (this.busy || !this.canManage(CAPABILITY[action])) return;
    this.dialogError = '';
    this.dialog = action;
  }

  public confirmManagementAction(): void {
    if (!this.dialog || this.dialog === 'change' || this.busy) return;
    const action = this.dialog;
    if (!this.canManage(CAPABILITY[action])) return;
    this.managementBusy = true;
    this.dialogError = '';
    const operation = action === 'cancel' ? this.trainerBillingApi.cancel()
      : action === 'resume' ? this.trainerBillingApi.resume() : this.trainerBillingApi.discardChange();
    this.requests.add(operation.pipe(timeout(20000), finalize(() => { this.managementBusy = false; })).subscribe({
      next: (entitlements) => {
        this.entitlements = entitlements;
        this.feedback = action === 'cancel' ? this.translate.instant('SUBSCRIPTION.LA_RENOVACION_ESTA_CANCELADA_CONSERVAS')
          : action === 'resume' ? this.translate.instant('SUBSCRIPTION.TU_SUSCRIPCION_VOLVERA_RENOVARSE') : this.translate.instant('SUBSCRIPTION.CAMBIO_DESCARTADO_TU_PLAN_ACTUAL');
        if (!entitlements.billing?.pendingPayment) this.actionPaymentUrl = null;
        this.returnState = 'none';
        this.dialog = null;
      },
      error: (error: unknown) => { this.dialogError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_HEMOS_PODIDO_CONFIRMAR_LA')); },
    }));
  }

  public closeDialog(): void {
    if (this.managementBusy || this.previewBusy) return;
    this.dialog = null;
    this.quote = null;
    this.changeSelection = null;
    this.dialogError = '';
  }

  public completePayment(): void {
    if (this.managementAvailable && !this.busy && this.paymentUrl) this.redirect(this.paymentUrl, 'invoice');
  }

  public subscribe(plan: TrainerPlan): void {
    if (!this.checkoutAvailable || this.busy || !this.plans.some((item) => item.tier === plan.tier)) return;
    this.actionError = '';
    this.checkoutTier = plan.tier;
    this.requests.add(this.trainerBillingApi.createCheckout(plan.tier, this.interval).pipe(
      timeout(15000), finalize(() => { this.checkoutTier = null; })
    ).subscribe({
      next: (session) => this.redirect(session.url, 'checkout'),
      error: (error: unknown) => {
        this.actionError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_ABRIR_EL'));
      },
    }));
  }

  public openPortal(): void {
    if (!this.portalAvailable || this.busy) return;
    this.actionError = '';
    this.portalBusy = true;
    this.requests.add(this.trainerBillingApi.createPortal().pipe(
      timeout(15000), finalize(() => { this.portalBusy = false; })
    ).subscribe({
      next: (session) => this.redirect(session.url, 'portal'),
      error: (error: unknown) => {
        this.actionError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_ABRIR_LA'));
      },
    }));
  }

  public retrySync(): void {
    if (this.busy || this.invalidSession) return;
    this.actionError = '';
    if (this.billingEnabled) this.syncSubscription(0);
    else this.load();
  }

  public goToAccount(): void { void this.router.navigate(['/tabs/account']); }

  private buildTimeline(): TimelineStep[] {
    const state = trainerBillingState(this.entitlements);
    const price = this.currentPrice;
    if (!state || !price) return [];
    // "Hoy" dice qué conservas; plan, cupo y precio ya están en la cabecera.
    const keepDetail: Partial<Record<typeof state.kind, string>> = {
      change_scheduled: this.translate.instant('SUBSCRIPTION.SIN_COBROS_HASTA_EL_CAMBIO'), canceling: this.translate.instant('SUBSCRIPTION.SIN_MAS_COBROS'), change_unpaid: this.translate.instant('SUBSCRIPTION.HASTA_QUE_SE_CONFIRME_EL'),
    };
    const today: TimelineStep = { when: this.translate.instant('TRAINER_COMMON.TODAY'), title: this.translate.instant('SUBSCRIPTION.TIENES_2', { p0: trainerPlanLabel(price.tier, price.interval) }),
      detail: keepDetail[state.kind] || null, tone: 'ok' };
    const renewal = this.renewal;
    const change = this.pendingChange;
    switch (state.kind) {
      case 'renewal_failed': {
        const due = this.renewalPayment;
        const grace = due?.graceUntil;
        return [
          { when: this.translate.instant('SUBSCRIPTION.AHORA'), title: this.translate.instant('SUBSCRIPTION.COBRO_DE_LA_RENOVACION_FALLIDO'), detail: due ? `${this.formatAmount(due.amount)} pendientes` : null, tone: 'danger' },
          { when: grace ? formatTrainerDate(grace) : this.translate.instant('SUBSCRIPTION.PRONTO'), title: this.translate.instant('SUBSCRIPTION.FIN_DEL_MARGEN_DE_PAGO'),
            detail: this.translate.instant('SUBSCRIPTION.SI_NO_SE_HA_COBRADO'), tone: 'danger' },
        ];
      }
      case 'change_unpaid':
        return [today, { when: this.translate.instant('SUBSCRIPTION.AL_PAGAR'), title: this.translate.instant('SUBSCRIPTION.SE_APLICA_EL_CAMBIO_DE'), detail: this.translate.instant('SUBSCRIPTION.HASTA_ENTONCES_CONSERVAS_TU_PLAN'), tone: 'warning' }];
      case 'canceling':
        return [today, { when: formatTrainerDate(this.accessUntil), title: this.translate.instant('SUBSCRIPTION.FIN_DEL_ACCESO_DE_PAGO'),
          detail: this.translate.instant('SUBSCRIPTION.PASAS_FREE_3_CLIENTES_ACTIVOS'), tone: 'warning' }];
      case 'change_scheduled':
        return change ? [today, { when: formatTrainerDate(change.effectiveAt),
          title: this.translate.instant('SUBSCRIPTION.PASA_2', { p0: trainerPlanLabel(change.tier, change.interval) }),
          detail: renewal ? this.translate.instant('SUBSCRIPTION.PRIMER_COBRO', { p0: this.stripeAmount(renewal.amount), p1: renewal.discounted ? ', con descuento o saldo a favor' : '' }) : null,
          tone: 'neutral' }] : [today];
      case 'active':
        return renewal ? [today, { when: formatTrainerDate(renewal.at), title: this.translate.instant('SUBSCRIPTION.RENOVACION_AUTOMATICA'),
          detail: `${this.stripeAmount(renewal.amount)}${renewal.discounted ? this.translate.instant('SUBSCRIPTION.CON_DESCUENTO_SALDO_FAVOR') : ''}`, tone: 'ok' }] : [today];
      default:
        return [];
    }
  }

  private invoiceRow(invoice: TrainerInvoice): InvoiceRow {
    const period = invoice.periodStart && invoice.periodEnd
      ? ` · ${formatTrainerDate(invoice.periodStart, false)} – ${formatTrainerDate(invoice.periodEnd)}` : '';
    return { invoice, date: formatTrainerDate(invoice.createdAt), concept: `${this.invoiceReason(invoice)}${period}`,
      amount: this.formatAmount(invoice.total, invoice.currency), status: this.invoiceStatus(invoice),
      linkLabel: invoice.status === 'open' ? this.translate.instant('SUBSCRIPTION.PAGAR') : this.translate.instant('ONBOARDING.VIEW') };
  }

  private catalogRequest() {
    return this.trainerBillingApi.getPlans().pipe(timeout(10000), catchError(() => { this.catalogError = true; return of(null); }));
  }

  private applySeats(seats: TrainerSeats | null): void {
    this.seats = seats;
    this.initialSeatIds = new Set(seats?.clients.filter((client) => client.active).map((client) => client.clientId) || []);
    this.seatSelection = new Set(this.initialSeatIds);
  }

  private syncSubscription(attempt: number): void {
    if (!this.active || !this.hasTrainerRole()) return;
    this.syncRequest?.unsubscribe();
    this.clearPoll();
    const confirmingCheckout = !!this.sessionId;
    if (confirmingCheckout) this.returnState = 'pending';
    this.syncing = true;
    this.syncRequest = this.trainerBillingApi.sync(this.sessionId || undefined).pipe(
      timeout(10000), finalize(() => { this.syncing = false; })
    ).subscribe({
      next: (entitlements) => {
        this.entitlements = entitlements;
        if (!entitlements.billing?.pendingPayment) this.actionPaymentUrl = null;
        // Tras sincronizar, facturas y tarjeta ya reflejan lo hecho en Stripe.
        if (attempt === 0 && this.billingDetailsState !== 'loading') {
          this.billingDetailsState = 'idle';
          this.loadBillingDetails();
        }
        if (!confirmingCheckout) return;
        const confirmation = checkoutConfirmationState(entitlements);
        if (confirmation === 'confirmed') {
          this.returnState = 'confirmed';
          this.sessionId = null;
          void this.router.navigate([], {
            relativeTo: this.route, queryParams: { session_id: null, checkout: null },
            queryParamsHandling: 'merge', replaceUrl: true,
          });
        } else if (confirmation === 'payment_required') {
          this.returnState = 'payment_required';
        } else if (attempt + 1 < this.maxConfirmationAttempts) {
          this.pollTimer = setTimeout(() => this.syncSubscription(attempt + 1), 2000);
        } else {
          this.returnState = 'delayed';
        }
      },
      error: (error: unknown) => {
        if (confirmingCheckout) this.returnState = 'error';
        this.actionError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_HEMOS_PODIDO_ACTUALIZAR_TU'));
      },
    });
  }

  private redirect(value: unknown, destination: 'checkout' | 'portal' | 'invoice'): void {
    const url = safeStripeRedirectUrl(value, destination);
    if (!url) {
      this.actionError = this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_VALIDAR_EL');
      return;
    }
    window.location.assign(url);
  }

  private hasTrainerRole(): boolean {
    return !!this.authService.user?.roles?.includes('trainer');
  }

  private errorMessage(error: unknown, fallback: string): string {
    if (!error || typeof error !== 'object') return fallback;
    const response = error as { code?: unknown; status?: unknown; error?: { code?: unknown } };
    if (response.status === 401 || response.status === 403) {
      return this.translate.instant('SUBSCRIPTION.ESTA_ACCION_REQUIERE_UNA_SESION');
    }
    const code = response.code || response.error?.code;
    return typeof code === 'string' ? ERROR_MESSAGES[code] || fallback : fallback;
  }

  private clearPoll(): void {
    if (this.pollTimer !== null) clearTimeout(this.pollTimer);
    this.pollTimer = null;
  }

  private stopRequests(): void {
    this.active = false;
    if (typeof window !== 'undefined') window.removeEventListener('pageshow', this.onPageShow);
    this.clearPoll();
    this.syncRequest?.unsubscribe();
    this.syncRequest = null;
    this.requests.unsubscribe();
    this.syncing = false;
  }
}
