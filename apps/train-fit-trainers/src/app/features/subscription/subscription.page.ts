import { Component, OnDestroy, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TrainerBillingApiService } from './services/trainer-billing-api.service';
import {
  TrainerBillingActions, TrainerBillingDetails, TrainerBillingInterval, TrainerBillingSupport, TrainerChangeQuote,
  TrainerEntitlements, TrainerInvoice, TrainerPlan, TrainerPlanCatalog, TrainerPlanState, TrainerQuoteLine, TrainerSeats,
  TrainerStateView, TrainerTier,
} from './models/trainer-entitlements.model';
import {
  TRAINER_PLAN_NAMES, TrainerSeatAdvice, TrainerStateTone, canStartTrainerCheckout,
  checkoutConfirmationState, formatTrainerAmount, formatTrainerDate, isBillingMode, isCheckoutSessionId, safeStripeRedirectUrl,
  trainerBillingState, trainerBillingSummary, trainerInvoiceAdjustment, trainerPaymentMethodLabel, trainerPlanLabel,
  trainerPlanName, trainerPlanOf, trainerSeatAdvice, trainerStateAmount, trainerStateLabel,
} from './trainer-billing-view.util';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'error' | 'loaded' | 'forbidden';
type ReturnState = 'none' | 'pending' | 'delayed' | 'confirmed' | 'cancelled' | 'payment_required' | 'error';
type ManagementDialog = 'change' | 'cancel' | 'resume' | 'discard';
type ManagementAction = Exclude<ManagementDialog, 'change'>;
// Qué hace el botón del configurador con lo elegido.
type SelectionAction = 'same' | 'scheduled' | 'keep' | 'checkout' | 'change' | 'cancel' | 'unavailable';

export interface PlanCard {
  plan: TrainerPlan;
  name: string;
  price: string;
  priceUnit: string;
  perMonth: string | null;
  seatNote: string;
  current: boolean;
  scheduled: boolean;
  selected: boolean;
  // El plan no se vende con la periodicidad elegida (Free solo es mensual).
  unavailable: boolean;
}

export interface InvoiceRow {
  invoice: TrainerInvoice;
  date: string;
  concept: string;
  amount: string;
  status: { label: string; tone: TrainerStateTone };
  linkLabel: string;
  // "Reembolsado 29,00 €" / "Abonado 10,00 €": la factura sigue pagada en Stripe.
  adjustment: string | null;
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
const ERROR_MESSAGES: Record<string, string> = {
  COLLECTION_PAUSED: 'Los cobros de tu suscripción están en pausa mientras revisamos una incidencia con un pago. Escríbenos para cambiar de plan.',
  ACTIVE_SUBSCRIPTION: 'Ya tienes una suscripción. Gestiona la existente desde esta página.',
  EXISTING_CHECKOUT: 'Ya hay una contratación en curso. Retoma el mismo plan o comprueba tu suscripción.',
  BILLING_BUSY: 'Tu suscripción se está actualizando. Espera unos segundos y vuelve a intentarlo.',
  BILLING_DISABLED: 'Los pagos no están disponibles en este momento.',
  BILLING_NOT_READY: 'La contratación todavía no está disponible. Tu plan actual se mantiene.',
  PORTAL_NOT_READY: 'La gestión de suscripciones todavía no está disponible.',
  INVALID_PLAN: 'Ese plan, periodicidad o número de plazas no está a la venta.',
  PRICE_CATALOG_REQUIRED: 'La contratación todavía no está disponible. Tu plan actual se mantiene.',
  PRICE_MISMATCH: 'La contratación todavía no está disponible. Tu plan actual se mantiene.',
  UNKNOWN_SUBSCRIPTION_PRICE: 'Tu suscripción necesita una revisión de soporte antes de cambiarla. Escríbenos.',
  QUOTE_EXPIRED: 'El cálculo ha caducado. Actualízalo para revisar el importe vigente.',
  QUOTE_STALE: 'Tu suscripción ha cambiado desde el cálculo. Actualiza el estado y revisa de nuevo el cambio.',
  TERMS_CHANGED: 'Las condiciones de contratación han cambiado. Revísalas en el nuevo cálculo y vuelve a confirmar.',
  PAYMENT_PENDING: 'Hay un pago pendiente. Complétalo antes de solicitar otro cambio.',
  CHANGE_ALREADY_SCHEDULED: 'Ya tienes un cambio programado. Puedes descartarlo antes de elegir otro plan.',
  SUBSCRIPTION_NOT_ACTIVE: 'Este cambio requiere una suscripción activa. Revisa el estado y los pagos pendientes.',
  SAME_SCHEDULED_CHANGE: 'Ese cambio ya está programado.',
  SAME_PLAN: 'Ya tienes ese plan, periodicidad y plazas.',
  SEAT_LIMIT_EXCEEDED: 'Has elegido más clientes de los que admite tu plan.',
  SEAT_NOT_OWNED: 'Alguno de los clientes elegidos ya no está en tu cartera. Actualiza la página.',
  SEAT_CHANGE_LOCKED: 'Ya cambiaste tus clientes activos hace menos de 30 días.',
  CLIENT_READ_ONLY: 'Ese cliente está en solo lectura por el cupo de tu plan.',
};
localizeRecord(ERROR_MESSAGES, 'SUBSCRIPTION.ERRORS');

function sameState(a: TrainerPlanState | null | undefined, b: TrainerPlanState | null | undefined): boolean {
  return !!a && !!b && a.tier === b.tier && a.interval === b.interval && a.extraSeats === b.extraSeats;
}

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
  // Lo que el entrenador está configurando: plan, periodicidad y plazas adicionales.
  public selection: TrainerPlanState = { tier: 'free', interval: 'monthly', extraSeats: 0 };
  // Llega desde Invitaciones sin plazas libres: se explica el límite y se propone ampliar.
  public seatsReason = false;
  public returnState: ReturnState = 'none';
  public actionError = '';
  public checkoutBusy = false;
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
  public readonly formatDate = formatTrainerDate;

  private requests = new Subscription();
  private syncRequest: Subscription | null = null;
  private pollTimer: ReturnType<typeof setTimeout> | null = null;
  private active = false;
  private sessionId: string | null = null;
  private invalidSession = false;
  private returningFromPortal = false;
  private changeSelection: TrainerPlanState | null = null;
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
  public get plans(): TrainerPlan[] { return this.catalog?.plans || []; }
  public get freeSeats(): number { return this.catalog?.freeSeats || this.plans.find((plan) => plan.tier === 'free')?.includedSeats || 3; }
  public get busy(): boolean { return this.checkoutBusy || this.portalBusy || this.syncing || this.previewBusy || this.managementBusy; }
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
  // Hay una suscripción de Stripe que gestionar (cancelar, reactivar, cambiar).
  public get managementAvailable(): boolean {
    return this.billingEnabled && this.hasTrainerRole() && !!this.entitlements?.billing?.current;
  }
  public canManage(action: keyof TrainerBillingActions): boolean {
    return this.managementAvailable && !!this.entitlements?.billing?.actions?.[action];
  }
  public get changesAvailable(): boolean {
    return this.canManage('canChange') && !!this.catalog?.enabled && !!this.catalog.capabilities.planChanges;
  }
  public get currentState(): TrainerStateView | null { return this.entitlements?.billing?.current || null; }
  // Punto de partida del configurador: lo contratado, o Free sin plazas adicionales.
  public get baseline(): TrainerPlanState {
    const current = this.currentState;
    return current ? { tier: current.tier, interval: current.interval, extraSeats: current.extraSeats } : { tier: 'free', interval: 'monthly', extraSeats: 0 };
  }
  public get pendingChange() { return this.entitlements?.billing?.pendingChange || null; }
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
    if (this.managementBusy) return this.translate.instant('SUBSCRIPTION.CONFIRMANDO');
    if (!quote || quote.kind === 'scheduled') return this.translate.instant('SUBSCRIPTION.PROGRAMAR_CAMBIO');
    return quote.amountDueNow > 0
      ? this.translate.instant('SUBSCRIPTION.CONFIRMAR_PAGAR', { p0: this.formatAmount(quote.amountDueNow, quote.currency) })
      : this.translate.instant('SEARCH_EXERCISES.SWAP_CONFIRM_HEADER');
  }

  // ---------- Plazas ----------

  public get seatSummary() { return this.entitlements?.seats || null; }
  public get occupiedPercent(): number { return this.seatPercent(this.seatSummary?.occupied || 0); }
  public get reservedPercent(): number { return Math.min(100 - this.occupiedPercent, this.seatPercent(this.seatSummary?.reserved || 0)); }
  public get seatsFull(): boolean { return !!this.seatSummary && this.seatSummary.available === 0; }
  // Con una bajada programada, las altas nuevas ya se limitan a las plazas del destino.
  public get admissionLimited(): boolean { return !!this.seatSummary && this.seatSummary.admission < this.seatSummary.capacity; }
  public get usedSeats(): number { return (this.seatSummary?.occupied || 0) + (this.seatSummary?.reserved || 0); }

  // ---------- Configurador ----------

  public get selectionPlan(): TrainerPlan | null { return trainerPlanOf(this.catalog, this.selection.tier); }
  public get selectionSeats(): number { return (this.selectionPlan?.includedSeats || 0) + this.selection.extraSeats; }
  public get selectionAmount(): number | null {
    const plan = this.selectionPlan;
    return plan ? trainerStateAmount(plan, this.selection.interval, this.selection.extraSeats) : null;
  }
  public get selectionSeatPrice(): number | null { return this.selectionPlan?.prices[this.selection.interval]?.seat ?? null; }
  public get selectionBasePrice(): number { return this.selectionPlan?.prices[this.selection.interval]?.base || 0; }
  public get canAddSeats(): boolean { return this.selectionSeatPrice !== null && this.selectionSeats < (this.selectionPlan?.maxSeats || 0); }
  public get canRemoveSeats(): boolean { return this.selection.extraSeats > 0; }
  public get seatAdvice(): TrainerSeatAdvice | null { return trainerSeatAdvice(this.catalog, this.selection); }
  // Clientes que quedarían en solo lectura con lo elegido (no se bloquea: se avisa).
  public get selectionReadOnly(): number { return Math.max(0, (this.seatSummary?.occupied || 0) - this.selectionSeats); }
  public get selectionAction(): SelectionAction {
    if (!this.selectionPlan || this.selectionAmount === null) return 'unavailable';
    if (sameState(this.selection, this.baseline)) return this.pendingChange && this.canManage('canDiscardChange') ? 'keep' : 'same';
    if (sameState(this.selection, this.pendingChange)) return 'scheduled';
    const freeOnly = this.selection.tier === 'free' && this.selection.extraSeats === 0;
    if (this.checkoutAvailable) return freeOnly ? 'same' : 'checkout';
    if (freeOnly) return this.canManage('canCancel') ? 'cancel' : 'unavailable';
    return this.changesAvailable ? 'change' : 'unavailable';
  }
  public get selectionCtaLabel(): string {
    switch (this.selectionAction) {
      case 'checkout': return this.checkoutBusy ? this.translate.instant('SUBSCRIPTION.ABRIENDO_EL_PAGO') : this.translate.instant('SUBSCRIPTION.CONFIG_CTA_CHECKOUT');
      case 'change': return this.translate.instant('SUBSCRIPTION.CONFIG_CTA_CHANGE');
      case 'cancel': return this.translate.instant('SUBSCRIPTION.CONFIG_CTA_FREE');
      case 'keep': return this.translate.instant('SUBSCRIPTION.CONFIG_CTA_KEEP');
      default: return '';
    }
  }

  public get planCards(): PlanCard[] {
    const key = [this.entitlements, this.catalog, this.selection.tier, this.selection.interval];
    if (this.planCardsCache && key.every((value, index) => value === this.planCardsCache!.key[index])) return this.planCardsCache.cards;
    const baseline = this.baseline;
    const interval = this.selection.interval;
    const cards = this.plans.map((plan): PlanCard => {
      const price = plan.prices[interval];
      const shown = price || plan.prices.monthly;
      const shownInterval: TrainerBillingInterval = price ? interval : 'monthly';
      const seatPrice = shown?.seat ?? null;
      return {
        plan, name: this.planNames[plan.tier],
        price: this.formatAmount(shown?.base || 0),
        priceUnit: `/${this.intervalLabel(shownInterval)}`,
        perMonth: price && interval === 'annual' && price.base ? this.formatAmount(price.base / 12) : null,
        seatNote: seatPrice === null
          ? this.translate.instant('SUBSCRIPTION.PLAN_NO_EXTRA_SEATS', { seats: plan.includedSeats })
          : this.translate.instant('SUBSCRIPTION.PLAN_EXTRA_SEAT', { price: this.recurring(seatPrice, shownInterval), max: plan.maxSeats }),
        current: baseline.tier === plan.tier && (!this.currentState || baseline.interval === interval),
        scheduled: this.pendingChange?.tier === plan.tier && this.pendingChange.interval === interval,
        selected: this.selection.tier === plan.tier,
        unavailable: !price,
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

  public get renewal() { return this.entitlements?.billing?.renewal || null; }
  public get renewalPayment() { return this.entitlements?.billing?.renewalPayment || null; }
  public get renewalPaymentUrl(): string | null {
    return safeStripeRedirectUrl(this.renewalPayment?.url, 'invoice');
  }
  // Más capacidad que, por pasar de anual a mensual, espera al fin del año pagado.
  public get delayedUpgrade(): boolean {
    const quote = this.quote;
    return !!quote && quote.kind === 'scheduled' && quote.from.interval === 'annual' &&
      quote.to.interval === 'monthly' && quote.to.seats > quote.from.seats && quote.to.tier !== 'free';
  }
  public get seatsChanged(): boolean {
    return this.initialSeatIds.size !== this.seatSelection.size || [...this.initialSeatIds].some((id) => !this.seatSelection.has(id));
  }
  public get showSyncRetry(): boolean {
    return ['delayed', 'error', 'payment_required'].includes(this.returnState) && !this.invalidSession;
  }
  public get cardLabel(): string | null { return trainerPaymentMethodLabel(this.billingDetails?.paymentMethod); }
  public get cardExpiry(): string | null {
    const card = this.billingDetails?.paymentMethod;
    return card && card.kind !== 'link' && card.expYear ? `${String(card.expMonth).padStart(2, '0')}/${card.expYear}` : null;
  }
  // Buzón de facturación y condiciones: los da el backend (entitlements o catálogo).
  public get support(): TrainerBillingSupport | null { return this.entitlements?.billing?.support || this.catalog?.support || null; }
  public get supportMailto(): string | null {
    const email = this.support?.email;
    return email ? `mailto:${email}?subject=${encodeURIComponent(this.translate.instant('SUBSCRIPTION.SUPPORT_SUBJECT'))}` : null;
  }
  // Más de 150 clientes: oferta a medida por el buzón de facturación.
  public get offerMailto(): string | null {
    const email = this.support?.email;
    return email ? `mailto:${email}?subject=${encodeURIComponent(this.translate.instant('SUBSCRIPTION.OFFER_SUBJECT'))}` : null;
  }
  public get termsUrl(): string | null {
    const url = this.support?.termsUrl;
    return url && /^https:\/\//.test(url) ? url : null;
  }
  // Condiciones que se aceptan al confirmar esta propuesta; solo se enlazan si son https.
  public get quoteTermsUrl(): string | null {
    const url = this.quote?.termsUrl;
    return url && /^https:\/\//.test(url) ? url : null;
  }
  public get renewalNotice() { return this.entitlements?.billing?.renewalNotice || null; }
  public get accessException() { return this.entitlements?.billing?.accessException || null; }
  public get accessRevokedUntil(): string | null { return this.entitlements?.billing?.accessRevokedUntil || null; }

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
    this.seatsReason = params.get('reason') === 'seats';
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
        this.resetSelection();
        if (this.seatsReason) this.proposeMoreSeats();
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
    this.requests.add(this.catalogRequest().subscribe((catalog) => { this.catalog = catalog; this.resetSelection(); }));
  }

  // ---------- Configurador: plan, periodicidad y plazas ----------

  public resetSelection(): void {
    this.selection = { ...this.baseline };
  }

  // Cambiar de plan conserva, si cabe, el número de plazas elegido.
  public selectTier(tier: TrainerTier): void {
    const plan = trainerPlanOf(this.catalog, tier);
    if (this.busy || !plan) return;
    const interval: TrainerBillingInterval = plan.prices[this.selection.interval] ? this.selection.interval : 'monthly';
    const extraRoom = plan.prices[interval]?.seat === null ? 0 : plan.maxSeats - plan.includedSeats;
    const extraSeats = Math.min(extraRoom, Math.max(0, this.selectionSeats - plan.includedSeats));
    this.selection = { tier, interval, extraSeats };
  }

  public selectInterval(interval: TrainerBillingInterval): void {
    if (this.busy) return;
    const plan = this.selectionPlan;
    // Free solo se vende mensual: el anual lleva al primer plan de pago con sus plazas.
    if (plan && !plan.prices[interval]) {
      const paid = this.plans.find((entry) => entry.prices[interval] && entry.tier !== 'free');
      if (paid) this.selection = { tier: paid.tier, interval, extraSeats: 0 };
      return;
    }
    this.selection = { ...this.selection, interval };
  }

  public stepSeats(delta: number): void {
    this.setSeatTotal(this.selectionSeats + delta);
  }

  public setSeatTotal(total: number): void {
    const plan = this.selectionPlan;
    if (this.busy || !plan || !Number.isFinite(total)) return;
    const extraRoom = this.selectionSeatPrice === null ? 0 : plan.maxSeats - plan.includedSeats;
    const extraSeats = Math.min(extraRoom, Math.max(0, Math.round(total) - plan.includedSeats));
    this.selection = { ...this.selection, extraSeats };
  }

  public onSeatInput(value: string | number | null | undefined): void {
    const total = typeof value === 'number' ? value : parseInt(String(value ?? ''), 10);
    if (Number.isFinite(total)) this.setSeatTotal(total);
  }

  // Al llegar al máximo de un plan: pasar al siguiente con sus plazas incluidas.
  public applyAdvice(): void {
    const advice = this.seatAdvice;
    if (this.busy || advice?.kind !== 'next_plan' || !advice.tier || !advice.interval) return;
    this.selection = { tier: advice.tier, interval: advice.interval, extraSeats: 0 };
  }

  // Desde "sin plazas libres": una plaza más en el plan actual o, si está al máximo, el siguiente plan.
  public proposeMoreSeats(): void {
    this.resetSelection();
    if (this.canAddSeats) this.stepSeats(1);
    else this.applyAdvice();
    this.scrollToCatalog();
  }

  public submitSelection(): void {
    if (this.busy) return;
    const target = { ...this.selection };
    switch (this.selectionAction) {
      case 'checkout': this.subscribe(target); return;
      case 'change': this.openChange(target); return;
      case 'cancel': this.openManagementDialog('cancel'); return;
      // Volver a lo contratado con un cambio programado equivale a descartarlo.
      case 'keep': this.openManagementDialog('discard'); return;
    }
  }

  public formatAmount(amount: number, currency: string = this.catalog?.currency || 'EUR'): string {
    return formatTrainerAmount(amount, currency);
  }

  public intervalLabel(interval: TrainerBillingInterval): string {
    return interval === 'annual' ? this.translate.instant('SUBSCRIPTION.ANO') : this.translate.instant('SUBSCRIPTION.MES_UNIT');
  }

  public planLabel(tier: TrainerTier, interval: TrainerBillingInterval): string { return trainerPlanLabel(tier, interval); }
  public stateLabel(state: { tier: TrainerTier; interval: TrainerBillingInterval | null; seats: number }): string { return trainerStateLabel(state); }

  public recurring(amount: number, interval: TrainerBillingInterval, currency?: string): string {
    return `${this.formatAmount(amount, currency)} /${this.intervalLabel(interval)}`;
  }

  // Importe calculado por Stripe: ya incluye el IVA; se dice para que cuadre con "29 € + IVA".
  public stripeAmount(amount: number, currency?: string): string {
    return this.translate.instant('SUBSCRIPTION.AMOUNT_WITH_VAT', { amount: this.formatAmount(amount, currency) });
  }

  // Tarifa del catálogo: lleva "+ IVA" porque el impuesto se añade al cobrar.
  public tariff(amount: number, interval: TrainerBillingInterval, currency?: string): string {
    return this.translate.instant('SUBSCRIPTION.AMOUNT_PLUS_VAT', { amount: this.recurring(amount, interval, currency) });
  }

  public requestPreview(): void {
    if (!this.changeSelection || !this.changesAvailable || this.busy || this.dialog !== 'change') return;
    this.dialogError = '';
    this.quote = null;
    this.quoteExpired = false;
    this.previewBusy = true;
    this.requests.add(this.trainerBillingApi.previewChange(this.changeSelection).pipe(
      timeout(15000), finalize(() => { this.previewBusy = false; })
    ).subscribe({
      next: (quote) => { this.quote = quote; },
      error: (error: unknown) => { this.dialogError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_CALCULAR_EL')); },
    }));
  }

  // Desde el aviso de "subida diferida": la misma capacidad en anual, que se aplica hoy.
  public previewAnnualInstead(): void {
    if (!this.quote || this.busy) return;
    const { tier, extraSeats } = this.quote.to;
    this.changeSelection = { tier, interval: 'annual', extraSeats };
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
    if (!this.billingEnabled || !this.entitlements?.status || this.entitlements.status === 'none' || this.billingDetailsState === 'loading') return;
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
    const item = line.item === 'seat'
      ? this.translate.instant('SUBSCRIPTION.QUOTE_SEAT_LINE', { count: line.quantity, plan })
      : plan;
    return line.kind === 'credit' ? this.translate.instant('SUBSCRIPTION.CREDITO_POR_EL_TIEMPO_NO', { plan: item }) : item;
  }

  public trackByTier(_: number, card: PlanCard): string { return card.plan.tier; }
  public trackByInvoice(_: number, row: InvoiceRow): string { return row.invoice.id; }
  public trackBySeat(_: number, client: { clientId: string }): string { return client.clientId; }
  public trackByIndex(index: number): number { return index; }

  public scrollToCatalog(): void {
    if (typeof document === 'undefined') return;
    setTimeout(() => document.getElementById('catalog-title')?.scrollIntoView({ behavior: this.reduceMotion ? 'auto' : 'smooth', block: 'start' }));
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
    const kind = this.quote.kind;
    this.requests.add(this.trainerBillingApi.changePlan(this.quote.quoteId, this.quote.termsUrl || null).pipe(
      timeout(20000), finalize(() => { this.managementBusy = false; })
    ).subscribe({
      next: (result) => {
        this.entitlements = result.entitlements;
        this.resetSelection();
        // Solo hay factura nueva cuando se cobra al momento.
        if (result.status !== 'scheduled' && kind === 'immediate') {
          this.billingDetailsState = 'idle';
          this.loadBillingDetails();
        }
        this.actionPaymentUrl = result.status === 'payment_pending' ? result.paymentActionUrl || null : null;
        this.feedback = result.status === 'scheduled' ? this.translate.instant('SUBSCRIPTION.CAMBIO_PROGRAMADO_TU_PLAN_ACTUAL')
          : result.status === 'payment_pending' ? this.translate.instant('SUBSCRIPTION.FALTA_CONFIRMAR_EL_PAGO_PARA')
          : this.translate.instant('SUBSCRIPTION.TU_CAMBIO_DE_PLAN_SE');
        this.seatsReason = false;
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
        this.resetSelection();
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

  private openChange(target: TrainerPlanState): void {
    if (!this.changesAvailable) return;
    this.changeSelection = target;
    this.dialog = 'change';
    this.quote = null;
    this.requestPreview();
  }

  private subscribe(target: TrainerPlanState): void {
    if (!this.checkoutAvailable || this.busy) return;
    this.actionError = '';
    this.checkoutBusy = true;
    this.requests.add(this.trainerBillingApi.createCheckout(target).pipe(
      timeout(15000), finalize(() => { this.checkoutBusy = false; })
    ).subscribe({
      next: (session) => this.redirect(session.url, 'checkout'),
      error: (error: unknown) => {
        this.actionError = this.errorMessage(error, this.translate.instant('SUBSCRIPTION.NO_SE_PUDO_ABRIR_EL'));
      },
    }));
  }

  private seatPercent(count: number): number {
    const capacity = this.seatSummary?.capacity || 0;
    return capacity ? Math.min(100, Math.round((count / capacity) * 100)) : 0;
  }

  private buildTimeline(): TimelineStep[] {
    const state = trainerBillingState(this.entitlements);
    const current = this.currentState;
    if (!state || !current) return [];
    // "Hoy" dice qué conservas; plan, plazas y precio ya están en la cabecera.
    const keepDetail: Partial<Record<typeof state.kind, string>> = {
      change_scheduled: this.translate.instant('SUBSCRIPTION.SIN_COBROS_HASTA_EL_CAMBIO'), canceling: this.translate.instant('SUBSCRIPTION.SIN_MAS_COBROS'), change_unpaid: this.translate.instant('SUBSCRIPTION.HASTA_QUE_SE_CONFIRME_EL'),
    };
    const today: TimelineStep = { when: this.translate.instant('TRAINER_COMMON.TODAY'), title: this.translate.instant('SUBSCRIPTION.TIENES_2', { p0: trainerStateLabel(current) }),
      detail: keepDetail[state.kind] || null, tone: 'ok' };
    const renewal = this.renewal;
    const change = this.pendingChange;
    switch (state.kind) {
      case 'renewal_failed': {
        const due = this.renewalPayment;
        const grace = due?.graceUntil;
        return [
          { when: this.translate.instant('SUBSCRIPTION.AHORA'), title: this.translate.instant('SUBSCRIPTION.COBRO_DE_LA_RENOVACION_FALLIDO'),
            detail: due ? this.translate.instant('SUBSCRIPTION.AMOUNT_DUE', { amount: this.formatAmount(due.amount) }) : null, tone: 'danger' },
          { when: grace ? formatTrainerDate(grace) : this.translate.instant('SUBSCRIPTION.PRONTO'), title: this.translate.instant('SUBSCRIPTION.FIN_DEL_MARGEN_DE_PAGO'),
            detail: this.translate.instant('SUBSCRIPTION.SI_NO_SE_HA_COBRADO'), tone: 'danger' },
        ];
      }
      case 'change_unpaid':
        return [today, { when: this.translate.instant('SUBSCRIPTION.AL_PAGAR'), title: this.translate.instant('SUBSCRIPTION.SE_APLICA_EL_CAMBIO_DE'), detail: this.translate.instant('SUBSCRIPTION.HASTA_ENTONCES_CONSERVAS_TU_PLAN'), tone: 'warning' }];
      case 'canceling':
        return [today, { when: formatTrainerDate(this.accessUntil), title: this.translate.instant('SUBSCRIPTION.FIN_DEL_ACCESO_DE_PAGO'),
          detail: this.translate.instant('SUBSCRIPTION.TIMELINE_TO_FREE', { seats: this.freeSeats }), tone: 'warning' }];
      case 'change_scheduled':
        return change ? [today, { when: formatTrainerDate(change.effectiveAt),
          title: this.translate.instant('SUBSCRIPTION.PASA_2', { p0: trainerStateLabel(change) }),
          detail: renewal ? this.translate.instant('SUBSCRIPTION.PRIMER_COBRO', { p0: this.stripeAmount(renewal.amount), p1: renewal.discounted ? this.translate.instant('SUBSCRIPTION.CON_DESCUENTO_SALDO_FAVOR') : '' }) : null,
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
      linkLabel: invoice.status === 'open' ? this.translate.instant('SUBSCRIPTION.PAGAR') : this.translate.instant('ONBOARDING.VIEW'),
      adjustment: trainerInvoiceAdjustment(invoice) };
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
        this.resetSelection();
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
