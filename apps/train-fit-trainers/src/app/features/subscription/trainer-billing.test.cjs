const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');
const { of, throwError, Subject } = require('rxjs');
const { esTable, esTranslator } = require('../../../../../../tests/i18n-es.cjs');

// Mismo runner esbuild + node:test que planner-compare.test.cjs. Se ejecuta
// la lógica real de la página; solo se sustituyen el decorador y la plataforma.
const bundled = buildSync({
  stdin: { contents: "export * from './trainer-billing-view.util'; export * from './subscription.page'; export * from '../../app.component'; export { applyCatalogTranslations } from 'src/app/core/i18n/localized-catalog';", resolveDir: __dirname, loader: 'ts' },
  tsconfig: path.resolve(__dirname, '../../../../tsconfig.json'),
  bundle: true, platform: 'node', format: 'cjs', write: false,
  external: ['@angular/core', '@ngx-translate/core', '@capacitor/core', '@capacitor/app', 'swiper/element/bundle', 'rxjs', 'rxjs/*'],
});
const compiled = new Module(__filename);
compiled.require = (name) => {
  // La página pide TranslateService con inject(): se le da el español.
  if (name === '@angular/core') return { Component: () => (target) => target, inject: () => esTranslator('train-fit-trainers') };
  if (name === '@ngx-translate/core') return { TranslateService: class {} };
  if (name === '@capacitor/core') return { Capacitor: { isNativePlatform: () => false } };
  if (name === '@capacitor/app') return { App: {} };
  if (name === 'swiper/element/bundle') return { register: () => {} };
  return require(name);
};
compiled._compile(bundled.outputFiles[0].text, __filename);
compiled.exports.applyCatalogTranslations(esTable('train-fit-trainers'), 'es');
const { SubscriptionPage, safeStripeRedirectUrl, trainerPlanName, trainerBillingSummary, canStartTrainerCheckout } = compiled.exports;
const { AppComponent, getTrainerStartupReturnUrl } = compiled.exports;

// ---------- Datos como los devuelve el backend ----------

const PRICES = { free: { monthly: { base: 0, seat: 300 } },
  starter: { monthly: { base: 2900, seat: 100 }, annual: { base: 29000, seat: 1000 } },
  professional: { monthly: { base: 4900, seat: 80 }, annual: { base: 49000, seat: 800 } },
  scale: { monthly: { base: 10900, seat: null }, annual: { base: 109000, seat: null } } };
const INCLUDED = { free: 3, starter: 20, professional: 50, scale: 150 };
const catalog = (changes = {}) => ({
  enabled: true, mode: 'test', currency: 'EUR', freeSeats: 3,
  capabilities: { checkout: true, portal: true, planChanges: true },
  plans: [['free', 12], ['starter', 40], ['professional', 125], ['scale', 150]].map(([tier, maxSeats]) => ({
    tier, includedSeats: INCLUDED[tier], maxSeats, prices: PRICES[tier] })),
  ...changes,
});
// Estado contratado con sus plazas e importe (como stateView del backend).
const view = (tier, interval = 'monthly', extraSeats = 0) => ({ tier, interval, extraSeats, seats: INCLUDED[tier] + extraSeats,
  amount: PRICES[tier][interval].base + (PRICES[tier][interval].seat || 0) * extraSeats });
const seatsOf = (capacity, occupied = 2, reserved = 0, admission = capacity) => ({ capacity, occupied, reserved, admission,
  available: Math.max(0, admission - occupied - reserved) });
const free = (changes = {}) => ({
  isPremium: false, tier: 'free', interval: null, expiresAt: null, seats: seatsOf(3),
  status: 'none', cancelAtPeriodEnd: false, currentPeriodEnd: null,
  billing: { enabled: true, mode: 'test', portalAvailable: false, planChanges: true, current: null },
  ...changes,
});
const managed = (state = view('starter'), changes = {}, billing = {}) => ({
  isPremium: true, tier: state.tier, interval: state.interval, expiresAt: '2026-10-18T12:00:00.000Z', seats: seatsOf(state.seats),
  status: 'active', cancelAtPeriodEnd: false, currentPeriodEnd: '2026-10-18T12:00:00.000Z',
  ...changes,
  billing: { enabled: true, mode: 'test', portalAvailable: true, planChanges: true,
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: false },
    current: state, pendingChange: null, pendingPayment: null, ...billing },
});
const active = (changes = {}) => managed(view('starter'), changes);
const quote = (changes = {}) => ({
  quoteId: 'opaque-quote', expiresAt: new Date(Date.now() + 300000).toISOString(), kind: 'immediate',
  from: view('starter'), to: view('starter', 'monthly', 2), effectiveAt: new Date().toISOString(),
  amountDueNow: 100, currency: 'eur', lines: [],
  nextRenewal: { at: '2026-10-18T12:00:00.000Z', amount: 3200, estimated: true }, seats: { occupied: 2, reserved: 0 }, readOnlyAfter: 0,
  termsUrl: null, ...changes,
});
const noSeats = () => ({ overLimit: false, limit: 3, usage: 0, autoSelected: false, clients: [] });

function harness({ entitlements = free(), plans = catalog(), query = {}, roles = ['trainer'], sync, seats = noSeats(),
  details = { invoices: [], paymentMethod: null } } = {}) {
  const calls = { checkout: [], portal: 0, sync: [], navigate: [], preview: [], change: [], cancel: 0, resume: 0, discard: 0, seats: [], details: 0 };
  const api = {
    getEntitlements: () => of(entitlements), getPlans: () => of(plans),
    getBillingDetails: () => { calls.details++; return details instanceof Error ? throwError(() => details) : of(details); },
    getSeats: () => (seats instanceof Error ? throwError(() => seats) : of(seats)),
    updateSeats: (ids) => { calls.seats.push(ids); return of({ ...seats, autoSelected: false,
      clients: seats.clients.map((c) => ({ ...c, active: ids.includes(c.clientId) })) }); },
    createCheckout: (target) => { calls.checkout.push(target); return of({ url: 'https://evil.example/', sessionId: 'cs_test_123', reused: false }); },
    createPortal: () => { calls.portal++; return of({ url: 'https://evil.example/' }); },
    sync: (id) => { calls.sync.push(id); return sync ? sync(calls.sync.length) : of(entitlements); },
    previewChange: (target) => { calls.preview.push(target); return of(quote()); },
    changePlan: (quoteId, termsUrl) => { calls.change.push(quoteId); calls.terms = termsUrl;
      return of({ status: 'applied', entitlements: managed(view('starter', 'monthly', 2)) }); },
    cancel: () => { calls.cancel++; return of(managed(view('starter'), { cancelAtPeriodEnd: true })); },
    resume: () => { calls.resume++; return of(managed()); },
    discardChange: () => { calls.discard++; return of(managed()); },
  };
  const route = { snapshot: { queryParamMap: { get: (key) => query[key] || null } } };
  const router = { navigate: (...args) => { calls.navigate.push(args); return Promise.resolve(true); } };
  const page = new SubscriptionPage(api, { user: { roles } }, route, router);
  return { page, api, calls };
}
// Captura las redirecciones a Stripe (window.location.assign) durante `run`.
function redirects(run) {
  const originalWindow = global.window;
  const destinations = [];
  try {
    global.window = { location: { assign: (url) => destinations.push(url) }, removeEventListener: () => {}, addEventListener: () => {} };
    run();
  } finally {
    if (originalWindow === undefined) delete global.window; else global.window = originalWindow;
  }
  return destinations;
}

test('solo permite URLs de Checkout y portal Stripe, sin credenciales ni puertos alternativos', () => {
  assert.equal(safeStripeRedirectUrl('https://checkout.stripe.com/c/pay/cs_test_123#token', 'checkout'), 'https://checkout.stripe.com/c/pay/cs_test_123#token');
  assert.equal(safeStripeRedirectUrl('https://billing.stripe.com/p/session/test_123', 'portal'), 'https://billing.stripe.com/p/session/test_123');
  for (const url of ['javascript:alert(1)', '//checkout.stripe.com/c/pay/cs_test_x', 'https://checkout.stripe.com.evil.example/c/pay/x',
    'https://evil.example/', 'http://checkout.stripe.com/c/pay/x', 'https://user@checkout.stripe.com/c/pay/x',
    'https://checkout.stripe.com:8443/c/pay/x', 'https://checkout.stripe.com/other']) {
    assert.equal(safeStripeRedirectUrl(url, 'checkout'), null, url);
  }
  assert.equal(safeStripeRedirectUrl('https://checkout.stripe.com/c/pay/x', 'portal'), null);
});

test('el portal abre el formato real de Stripe /p/session con sesión en query y conserva el origen exacto', () => {
  const portalUrl = 'https://billing.stripe.com/p/session?session=opaque_test_session';
  assert.equal(safeStripeRedirectUrl(portalUrl, 'portal'), portalUrl);
  for (const url of ['https://billing.stripe.com/p/session', 'https://billing.stripe.com/p/session-other?session=x',
    'https://billing.stripe.com.evil.example/p/session?session=x', 'http://billing.stripe.com/p/session?session=x',
    'https://user@billing.stripe.com/p/session?session=x', 'https://billing.stripe.com:8443/p/session?session=x']) {
    assert.equal(safeStripeRedirectUrl(url, 'portal'), null);
  }
  const h = harness({ entitlements: managed() });
  h.api.createPortal = () => of({ url: portalUrl });
  h.page.ionViewWillEnter();
  const originalWindow = global.window;
  const destinations = [];
  try {
    global.window = { location: { assign: (url) => destinations.push(url) }, removeEventListener: () => {} };
    h.page.openPortal();
    assert.deepEqual(destinations, [portalUrl]);
    assert.equal(h.page.actionError, '');
    h.page.ngOnDestroy();
  } finally {
    if (originalWindow === undefined) delete global.window;
    else global.window = originalWindow;
  }
});

test('las URLs de factura admiten únicamente el host y ruta exactos de Stripe', () => {
  assert.equal(safeStripeRedirectUrl('https://invoice.stripe.com/i/acct_test/inv_123', 'invoice'), 'https://invoice.stripe.com/i/acct_test/inv_123');
  for (const url of ['https://invoice.stripe.com.evil.example/i/pay', 'https://invoice.stripe.com/login',
    'http://invoice.stripe.com/i/pay', 'https://user@invoice.stripe.com/i/pay', 'https://invoice.stripe.com:8443/i/pay',
    'https://billing.stripe.com/p/session/test']) assert.equal(safeStripeRedirectUrl(url, 'invoice'), null);
});

test('un fallo de catálogo conserva facturas y cancelación, y ofrece recuperar los planes', () => {
  const h = harness({ entitlements: managed() });
  h.api.getPlans = () => throwError(() => ({ status: 503 }));
  h.page.ionViewWillEnter();
  assert.equal(h.page.state, 'loaded');
  assert.equal(h.page.catalogError, true);
  assert.equal(h.page.portalAvailable, true);
  assert.equal(h.page.canManage('canCancel'), true);
  assert.equal(h.page.changesAvailable, false);
  assert.equal(h.page.selectionAction, 'unavailable');
  h.page.openManagementDialog('cancel');
  assert.equal(h.page.dialog, 'cancel');
  h.page.ngOnDestroy();
});

// ---------- Configurador: contratar desde Free ----------

test('desde Free, añadir plazas enseña su cuota y contrata solo plan, periodicidad y plazas; doble clic no duplica', () => {
  const h = harness();
  const pending = new Subject();
  h.api.createCheckout = (target) => { h.calls.checkout.push(target); return pending; };
  h.page.ionViewWillEnter();
  assert.deepEqual(h.page.selection, { tier: 'free', interval: 'monthly', extraSeats: 0 });
  assert.equal(h.page.selectionAction, 'same', 'Free con sus 3 plazas no se contrata');
  h.page.stepSeats(1);
  assert.equal(h.page.selectionSeats, 4);
  assert.equal(h.page.selectionAmount, 300, 'Free con plazas no se presenta como gratis');
  assert.equal(h.page.selectionAction, 'checkout');
  assert.equal(h.page.selectionCtaLabel, 'Contratar');
  h.page.submitSelection(); h.page.submitSelection();
  assert.deepEqual(h.calls.checkout, [{ tier: 'free', interval: 'monthly', extraSeats: 1 }]);
  const destinations = redirects(() => { pending.next({ url: 'https://evil.example/', sessionId: 'cs_test_123' }); pending.complete(); });
  assert.deepEqual(destinations, [], 'solo se sale a Checkout de Stripe');
  assert.match(h.page.actionError, /validar el enlace/);
  assert.equal(h.page.busy, false);
  h.page.ngOnDestroy();
});

test('las plazas se acotan al plan: Free de 3 a 12, y al tope se recomienda Inicio con su precio real', () => {
  const h = harness();
  h.page.ionViewWillEnter();
  h.page.stepSeats(-1);
  assert.equal(h.page.selectionSeats, 3);
  h.page.onSeatInput('50');
  assert.equal(h.page.selectionSeats, 12);
  assert.equal(h.page.selectionAmount, 2700);
  assert.equal(h.page.canAddSeats, false);
  assert.deepEqual(h.page.seatAdvice, { kind: 'next_plan', tier: 'starter', interval: 'monthly', seats: 20, amount: 2900, samePrice: false });
  h.page.applyAdvice();
  assert.deepEqual(h.page.selection, { tier: 'starter', interval: 'monthly', extraSeats: 0 });
  assert.equal(h.page.selectionAmount, 2900);
  h.page.onSeatInput('basura');
  assert.equal(h.page.selectionSeats, 20, 'una entrada no numérica no cambia nada');
  h.page.ngOnDestroy();
});

test('al tope de Inicio y de Profesional el siguiente plan cuesta lo mismo con más plazas; por encima de Escala, oferta', () => {
  const h = harness({ plans: catalog({ support: { email: 'facturacion@example.test', termsUrl: null } }) });
  h.page.ionViewWillEnter();
  h.page.selectTier('starter'); h.page.setSeatTotal(40);
  assert.equal(h.page.selectionAmount, 4900);
  assert.deepEqual(h.page.seatAdvice, { kind: 'next_plan', tier: 'professional', interval: 'monthly', seats: 50, amount: 4900, samePrice: true });
  h.page.selectTier('professional'); h.page.setSeatTotal(124);
  assert.equal(h.page.selectionAmount, 10820);
  assert.equal(h.page.seatAdvice, null, 'con 124 plazas Profesional sigue siendo más barato');
  h.page.setSeatTotal(125);
  assert.equal(h.page.seatAdvice.samePrice, true);
  assert.equal(h.page.seatAdvice.tier, 'scale');
  h.page.selectTier('scale');
  assert.equal(h.page.selectionSeatPrice, null);
  assert.equal(h.page.canAddSeats, false);
  assert.deepEqual(h.page.seatAdvice, { kind: 'contact' });
  assert.match(h.page.offerMailto, /^mailto:facturacion@example\.test\?subject=/);
  h.page.ngOnDestroy();
});

test('cambiar de plan conserva las plazas elegidas si caben; el anual muestra el pago completo y su equivalente', () => {
  const h = harness();
  h.page.ionViewWillEnter();
  h.page.selectTier('starter'); h.page.setSeatTotal(30);
  h.page.selectTier('professional');
  assert.deepEqual(h.page.selection, { tier: 'professional', interval: 'monthly', extraSeats: 0 }, '50 incluidas cubren las 30');
  h.page.setSeatTotal(60);
  h.page.selectTier('starter');
  assert.equal(h.page.selectionSeats, 40, 'Inicio admite como mucho 40');
  h.page.selectInterval('annual');
  assert.equal(h.page.selectionAmount, 29000 + 20 * 1000);
  const cards = h.page.planCards;
  assert.equal(cards[0].unavailable, true, 'Free solo se vende mensual');
  assert.match(cards[1].price, /290/);
  assert.match(cards[1].perMonth, /24,17/);
  assert.equal(h.page.planCards, cards, 'las tarjetas no se recalculan en cada render');
  // Elegir anual estando en Free lleva al primer plan de pago anual.
  h.page.selectTier('free');
  assert.equal(h.page.selection.interval, 'monthly');
  h.page.selectInterval('annual');
  assert.deepEqual(h.page.selection, { tier: 'starter', interval: 'annual', extraSeats: 0 });
  h.page.ngOnDestroy();
});

// ---------- Configurador: cambiar lo contratado ----------

test('añadir plazas mensuales pide una propuesta, se cobra al confirmar y se envía solo el identificador', () => {
  const h = harness({ entitlements: managed(), plans: catalog() });
  const mutation = new Subject();
  h.api.changePlan = (id) => { h.calls.change.push(id); return mutation; };
  h.page.ionViewWillEnter();
  assert.equal(h.page.selectionAction, 'same');
  h.page.stepSeats(2);
  assert.equal(h.page.selectionAction, 'change');
  h.page.submitSelection();
  assert.deepEqual(h.calls.preview, [{ tier: 'starter', interval: 'monthly', extraSeats: 2 }]);
  assert.equal(h.page.dialog, 'change');
  assert.match(h.page.confirmLabel, /^Confirmar y pagar/);
  assert.equal(h.calls.change.length, 0, 'ver la propuesta no cambia nada');
  h.page.confirmPlanChange(); h.page.confirmPlanChange();
  assert.deepEqual(h.calls.change, ['opaque-quote']);
  mutation.next({ status: 'applied', entitlements: managed(view('starter', 'monthly', 2)) }); mutation.complete();
  assert.equal(h.page.dialog, null);
  assert.match(h.page.feedback, /se ha confirmado/);
  assert.deepEqual(h.page.selection, { tier: 'starter', interval: 'monthly', extraSeats: 2 }, 'el configurador parte de lo nuevo');
  h.page.ngOnDestroy();
});

test('confirmar un cambio acepta las condiciones que se muestran en la propuesta, y solo enlaza las https', () => {
  const h = harness({ entitlements: managed() });
  h.api.previewChange = () => of(quote({ termsUrl: 'https://trainfit.net/condiciones/2026-10' }));
  h.page.ionViewWillEnter(); h.page.stepSeats(2); h.page.submitSelection();
  assert.equal(h.page.quoteTermsUrl, 'https://trainfit.net/condiciones/2026-10');
  h.page.confirmPlanChange();
  assert.equal(h.calls.terms, 'https://trainfit.net/condiciones/2026-10');
  h.api.previewChange = () => of(quote({ termsUrl: 'javascript:alert(1)' }));
  h.page.stepSeats(1); h.page.submitSelection();
  assert.equal(h.page.quoteTermsUrl, null, 'un enlace no https nunca se pinta');
  h.api.changePlan = () => throwError(() => ({ code: 'TERMS_CHANGED' }));
  h.page.confirmPlanChange();
  assert.match(h.page.dialogError, /condiciones de contratación han cambiado/);
  h.page.ngOnDestroy();
});

test('una propuesta caducada o rechazada no cambia nada y exige revisarla de nuevo', () => {
  const h = harness({ entitlements: managed(), plans: catalog() });
  h.api.previewChange = () => of(quote({ expiresAt: '2000-01-01T00:00:00Z' }));
  h.page.ionViewWillEnter(); h.page.selectTier('professional'); h.page.submitSelection();
  h.page.confirmPlanChange();
  assert.equal(h.calls.change.length, 0);
  assert.equal(h.page.needsNewQuote, true);
  h.api.previewChange = () => of(quote({ kind: 'immediate', amountDueNow: 1500, to: view('professional') }));
  h.page.requestPreview();
  assert.match(h.page.confirmLabel, /Confirmar y pagar 15,00/);
  h.api.changePlan = () => throwError(() => ({ code: 'QUOTE_STALE' }));
  h.page.confirmPlanChange();
  assert.match(h.page.dialogError, /ha cambiado/);
  assert.equal(h.page.entitlements.tier, 'starter');
  assert.equal(h.page.needsNewQuote, true);
  assert.equal(h.page.busy, false);
  h.page.ngOnDestroy();
});

test('reducir por debajo de la cartera no se bloquea: avisa de cuántos quedarán en solo lectura', () => {
  const h = harness({ entitlements: managed(view('starter', 'monthly', 10), { seats: seatsOf(30, 28, 1) }), plans: catalog() });
  h.page.ionViewWillEnter();
  h.page.setSeatTotal(22);
  assert.equal(h.page.selectionAction, 'change');
  assert.equal(h.page.selectionReadOnly, 6);
  h.api.previewChange = (target) => { h.calls.preview.push(target); return of(quote({ kind: 'scheduled', to: view('starter', 'monthly', 2),
    from: view('starter', 'monthly', 10), readOnlyAfter: 6, effectiveAt: '2026-10-18T12:00:00.000Z' })); };
  h.page.submitSelection();
  assert.equal(h.page.quote.readOnlyAfter, 6);
  assert.equal(h.page.confirmLabel, 'Programar cambio');
  h.page.ngOnDestroy();
});

test('volver a Free con 3 plazas es cancelar la renovación: pide confirmación, conserva el acceso y se puede reactivar', () => {
  const h = harness({ entitlements: managed(view('free', 'monthly', 4)), plans: catalog() });
  h.api.cancel = () => { h.calls.cancel++; return of(managed(view('free', 'monthly', 4), { cancelAtPeriodEnd: true }, {
    actions: { canChange: false, canCancel: false, canResume: true, canDiscardChange: false } })); };
  h.page.ionViewWillEnter();
  h.page.setSeatTotal(3);
  assert.equal(h.page.selectionAction, 'cancel');
  assert.equal(h.page.selectionCtaLabel, 'Volver a Free');
  h.page.submitSelection();
  assert.equal(h.page.dialog, 'cancel');
  assert.equal(h.calls.cancel, 0);
  h.page.confirmManagementAction();
  assert.equal(h.calls.cancel, 1);
  assert.equal(h.page.entitlements.isPremium, true);
  assert.equal(h.page.canManage('canCancel'), false);
  h.page.openManagementDialog('resume'); h.page.confirmManagementAction();
  assert.equal(h.calls.resume, 1);
  assert.equal(h.page.entitlements.cancelAtPeriodEnd, false);
  h.page.ngOnDestroy();
});

test('un pago con autenticación pendiente conserva las plazas pagadas y solo ofrece la factura de Stripe', () => {
  const h = harness({ entitlements: managed(), plans: catalog() });
  h.api.changePlan = () => of({ status: 'payment_pending', paymentActionUrl: 'https://evil.example/', entitlements: managed(view('starter'), {}, {
    pendingPayment: { url: 'https://invoice.stripe.com/i/acct/payment' },
    actions: { canChange: false, canCancel: true, canResume: false, canDiscardChange: true } }) });
  h.page.ionViewWillEnter(); h.page.selectTier('professional'); h.page.submitSelection(); h.page.confirmPlanChange();
  assert.equal(h.page.entitlements.seats.capacity, 20);
  assert.equal(h.page.paymentUrl, 'https://invoice.stripe.com/i/acct/payment');
  assert.equal(h.page.changesAvailable, false);
  assert.equal(h.page.statusBadge.kind, 'change_unpaid');
  assert.equal(h.page.canManage('canDiscardChange'), true);
  h.page.ngOnDestroy();
});

test('con un cambio programado: el mismo destino no hace nada, volver a lo actual lo descarta y otro destino lo sustituye', () => {
  const pendingChange = { ...view('starter', 'monthly', 2), effectiveAt: '2026-10-18T12:00:00.000Z' };
  const h = harness({ entitlements: managed(view('starter', 'monthly', 10), {}, { pendingChange,
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: true } }), plans: catalog() });
  h.page.ionViewWillEnter();
  assert.equal(h.page.selectionAction, 'keep');
  assert.equal(h.page.selectionCtaLabel, 'Mantener mi plan actual');
  h.page.submitSelection();
  assert.equal(h.page.dialog, 'discard');
  h.page.confirmManagementAction();
  assert.equal(h.calls.discard, 1);
  h.page.entitlements = managed(view('starter', 'monthly', 10), {}, { pendingChange,
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: true } });
  h.page.setSeatTotal(22);
  assert.equal(h.page.selectionAction, 'scheduled');
  h.page.submitSelection();
  assert.equal(h.calls.preview.length, 0);
  h.page.setSeatTotal(25);
  h.page.submitSelection();
  assert.deepEqual(h.calls.preview, [{ tier: 'starter', interval: 'monthly', extraSeats: 5 }]);
  h.page.ngOnDestroy();
});

test('una subida de anual a mensual avisa de la espera y ofrece la misma capacidad en anual, que se aplica hoy', () => {
  const h = harness({ entitlements: managed(view('starter', 'annual')), plans: catalog() });
  h.api.previewChange = (target) => { h.calls.preview.push(target); return of(target.interval === 'monthly'
    ? quote({ kind: 'scheduled', from: view('starter', 'annual'), to: view('professional') })
    : quote({ kind: 'immediate', amountDueNow: 20000, from: view('starter', 'annual'), to: view('professional', 'annual') })); };
  h.page.ionViewWillEnter();
  h.page.selectInterval('monthly'); h.page.selectTier('professional'); h.page.submitSelection();
  assert.equal(h.page.delayedUpgrade, true);
  h.page.previewAnnualInstead();
  assert.deepEqual(h.calls.preview[1], { tier: 'professional', interval: 'annual', extraSeats: 0 });
  assert.equal(h.page.delayedUpgrade, false);
  assert.equal(h.calls.change.length, 0, 'el atajo solo recalcula; nunca confirma');
  h.page.ngOnDestroy();
});

test('rol no autorizado, facturación apagada o app nativa nunca pueden contratar ni cambiar', () => {
  for (const config of [{ entitlements: managed(), roles: ['user'] }, { entitlements: managed(view('starter'), {}, { enabled: false }) },
    { entitlements: managed(), native: true }]) {
    const h = harness(config);
    if (config.native) h.page.isWeb = false;
    h.page.ionViewWillEnter();
    h.page.openManagementDialog('cancel'); h.page.confirmManagementAction();
    h.page.stepSeats(3); h.page.submitSelection(); h.page.openPortal();
    assert.equal(h.calls.cancel, 0); assert.equal(h.calls.preview.length, 0); assert.equal(h.calls.portal, 0);
    assert.equal(h.calls.checkout.length, 0);
    h.page.ngOnDestroy();
  }
  const disabled = harness({ plans: catalog({ enabled: false }) });
  disabled.page.ionViewWillEnter(); disabled.page.stepSeats(1); disabled.page.submitSelection();
  assert.equal(disabled.page.checkoutAvailable, false);
  assert.equal(disabled.calls.checkout.length, 0);
  disabled.page.ngOnDestroy();
});

test('una cancelación fallida conserva la suscripción y muestra cómo recuperarse, sin éxito falso', () => {
  const h = harness({ entitlements: managed(), plans: catalog() });
  h.api.cancel = () => throwError(() => ({ status: 503 }));
  h.page.ionViewWillEnter(); h.page.openManagementDialog('cancel'); h.page.confirmManagementAction();
  assert.equal(h.page.entitlements.cancelAtPeriodEnd, false);
  assert.equal(h.page.feedback, '');
  assert.equal(h.page.dialog, 'cancel');
  assert.match(h.page.dialogError, /Actualiza el estado/);
  h.page.ngOnDestroy();
});

// ---------- Plazas ----------

test('las plazas en uso suman ocupadas y reservadas; con una bajada programada las altas ya cuentan con menos', () => {
  const h = harness({ entitlements: managed(view('starter', 'monthly', 5), { seats: seatsOf(25, 18, 2, 22) }) });
  h.page.ionViewWillEnter();
  assert.equal(h.page.usedSeats, 20);
  assert.equal(h.page.occupiedPercent, 72);
  assert.equal(h.page.reservedPercent, 8);
  assert.equal(h.page.admissionLimited, true);
  assert.equal(h.page.seatsFull, false);
  h.page.ngOnDestroy();
});

test('al llegar desde Invitaciones sin plazas se explica el límite y se propone una plaza más o el plan siguiente', () => {
  const full = harness({ entitlements: free({ seats: seatsOf(3, 2, 1) }), query: { reason: 'seats' } });
  full.page.ionViewWillEnter();
  assert.equal(full.page.seatsReason, true);
  assert.equal(full.page.seatsFull, true);
  assert.deepEqual(full.page.selection, { tier: 'free', interval: 'monthly', extraSeats: 1 });
  assert.equal(full.page.selectionAction, 'checkout', 'invitar no compra: aquí se contrata a sabiendas');
  full.page.ngOnDestroy();
  const atMax = harness({ entitlements: managed(view('free', 'monthly', 9), { seats: seatsOf(12, 12) }), query: { reason: 'seats' } });
  atMax.page.ionViewWillEnter();
  assert.deepEqual(atMax.page.selection, { tier: 'starter', interval: 'monthly', extraSeats: 0 });
  atMax.page.ngOnDestroy();
});

test('plazas por encima del cupo: la selección respeta el límite y se guarda una vez', () => {
  const seats = { overLimit: true, limit: 3, usage: 5, autoSelected: true, clients: ['a', 'b', 'c', 'd', 'e'].map((id, i) => ({
    clientId: id, name: `Cliente ${id}`, email: null, active: i < 3 })) };
  const h = harness({ entitlements: free({ seats: seatsOf(3, 5) }), seats });
  h.page.ionViewWillEnter();
  assert.equal(h.page.seatSelection.size, 3);
  h.page.toggleSeat('d');
  assert.equal(h.page.seatSelection.has('d'), false, 'no se supera el cupo');
  h.page.toggleSeat('a'); h.page.toggleSeat('d');
  assert.equal(h.page.seatsChanged, true);
  h.page.saveSeats(); h.page.saveSeats();
  assert.deepEqual(h.calls.seats, [['b', 'c', 'd']]);
  assert.equal(h.page.seatsChanged, false);
  h.page.ngOnDestroy();

  const failing = harness({ entitlements: free(), seats: new Error('offline') });
  failing.page.ionViewWillEnter();
  assert.equal(failing.page.state, 'loaded', 'un fallo de plazas no bloquea la página');
  assert.equal(failing.page.seats, null);
  failing.page.ngOnDestroy();
});

// ---------- Estado, línea temporal y textos ----------

test('nombres de plan, resumen y estado vienen del backend; Free tras cancelar no anuncia renovación', () => {
  assert.equal(trainerPlanName(managed(view('professional', 'monthly', 25))), 'Profesional');
  assert.equal(trainerPlanName(free()), 'Free');
  assert.match(trainerBillingSummary(managed(view('starter'), { cancelAtPeriodEnd: true })).label, /No se renovará/);
  assert.match(trainerBillingSummary(managed()).label, /Próxima renovación/);
  assert.equal(trainerBillingSummary(managed(view('starter'), { status: 'past_due' })).attention, true);
  assert.equal(trainerBillingSummary(managed(view('starter'), { currentPeriodEnd: 'invalid', expiresAt: null })).date, null);
  const ended = harness({ entitlements: free({ status: 'canceled' }) });
  ended.page.ionViewWillEnter();
  assert.equal(ended.page.currentPlanName, 'Free');
  assert.equal(ended.page.currentState, null);
  assert.equal(ended.page.timeline.length, 0);
  assert.deepEqual(ended.page.billingSummary, { label: 'Suscripción finalizada', date: null, attention: false });
  ended.page.ngOnDestroy();
});

test('la próxima renovación y la renovación impagada vienen de Stripe; pagar solo abre facturas Stripe', () => {
  const h = harness({ entitlements: managed(view('starter'), {}, {
    renewal: { at: '2026-10-18T12:00:00.000Z', amount: 2610, source: 'stripe', state: view('starter') },
    renewalPayment: { url: 'https://invoice.stripe.com/i/acct_1/renewal', amount: 2900 } }) });
  h.page.ionViewWillEnter();
  assert.equal(h.page.renewal.amount, 2610);
  assert.equal(h.page.statusBadge.tone, 'danger');
  const destinations = redirects(() => {
    h.page.payRenewal();
    h.page.entitlements = managed(view('starter'), {}, { renewalPayment: { url: 'https://evil.example/i/x', amount: 2900 } });
    h.page.payRenewal();
  });
  assert.deepEqual(destinations, ['https://invoice.stripe.com/i/acct_1/renewal'], 'una URL ajena nunca se abre');
  h.page.ngOnDestroy();
});

test('la línea temporal explica qué pasa y cuándo en cada estado, con plazas', () => {
  const renewal = { at: '2026-10-18T12:00:00.000Z', amount: 3400, source: 'stripe', state: view('starter', 'monthly', 5), discounted: false };
  const current = harness({ entitlements: managed(view('starter', 'monthly', 5), {}, { renewal }) });
  current.page.ionViewWillEnter();
  assert.deepEqual(current.page.timeline.map((s) => [s.when, s.title]),
    [['Hoy', 'Tienes Inicio mensual · 25 plazas'], ['18 oct 2026', 'Renovación automática']]);
  assert.equal(current.page.timeline, current.page.timeline, 'la vista se reutiliza mientras no cambian los datos');
  current.page.ngOnDestroy();

  const scheduled = harness({ entitlements: managed(view('starter', 'monthly', 5), {}, {
    pendingChange: { ...view('starter', 'monthly', 2), effectiveAt: '2026-10-18T12:00:00.000Z' },
    renewal: { ...renewal, amount: 2790, discounted: true } }) });
  scheduled.page.ionViewWillEnter();
  assert.equal(scheduled.page.timeline[1].title, 'Pasa a Inicio mensual · 22 plazas');
  assert.match(scheduled.page.timeline[1].detail, /27,90.*descuento/);
  scheduled.page.ngOnDestroy();

  const canceling = harness({ entitlements: managed(view('starter'), { cancelAtPeriodEnd: true }) });
  canceling.page.ionViewWillEnter();
  assert.equal(canceling.page.timeline[1].title, 'Fin del acceso de pago');
  assert.match(canceling.page.timeline[1].detail, /Free: 3 clientes activos/);
  canceling.page.ngOnDestroy();

  const failed = harness({ entitlements: managed(view('starter'), { status: 'past_due' }, {
    renewalPayment: { url: 'https://invoice.stripe.com/i/x', amount: 2900, graceUntil: '2026-10-25T12:00:00.000Z' } }) });
  failed.page.ionViewWillEnter();
  assert.deepEqual(failed.page.timeline.map((s) => s.tone), ['danger', 'danger']);
  assert.equal(failed.page.timeline[1].when, '25 oct 2026');
  failed.page.ngOnDestroy();
});

test('el desglose etiqueta la cuota, las plazas adicionales y el crédito del tiempo no usado', () => {
  const h = harness({ entitlements: managed() });
  h.page.ionViewWillEnter();
  assert.equal(h.page.lineLabel({ kind: 'credit', item: 'base', tier: 'starter', interval: 'monthly', quantity: 1, amount: -1450 }),
    'Crédito por el tiempo no usado de Inicio mensual');
  assert.equal(h.page.lineLabel({ kind: 'charge', item: 'seat', tier: 'starter', interval: 'monthly', quantity: 5, amount: 250 }),
    '5 plazas adicionales · Inicio mensual');
  assert.equal(h.page.lineLabel({ kind: 'charge', item: 'base', tier: 'professional', interval: 'annual', quantity: 1, amount: 2450 }),
    'Profesional anual');
  h.page.ngOnDestroy();
});

test('las tarjetas marcan lo contratado, lo programado y lo elegido', () => {
  const h = harness({ entitlements: managed(view('starter', 'monthly', 5), {}, {
    pendingChange: { ...view('professional'), effectiveAt: '2026-10-18T12:00:00.000Z' },
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: true } }) });
  h.page.ionViewWillEnter();
  const [freeCard, starter, professional, scale] = h.page.planCards;
  assert.deepEqual([freeCard.current, starter.current, professional.scheduled, scale.selected], [false, true, true, false]);
  assert.equal(starter.selected, true);
  assert.match(starter.seatNote, /1,00.*hasta 40/);
  assert.match(scale.seatNote, /150 plazas, sin plazas adicionales/);
  h.page.ngOnDestroy();
});

test('facturas y método de pago vienen de Stripe y solo se piden con cuenta de facturación; un fallo no rompe la página', () => {
  const details = { paymentMethod: { brand: 'visa', last4: '4242', expMonth: 9, expYear: 2027 }, invoices: [
    { id: 'in_1', number: 'TF-1', status: 'paid', createdAt: '2026-09-18T10:00:00.000Z', total: 2000, amountPaid: 2000, amountDue: 0,
      currency: 'eur', reason: 'subscription_update', periodStart: null, periodEnd: null, hostedUrl: 'https://invoice.stripe.com/i/x' },
    { id: 'in_2', number: 'TF-2', status: 'open', createdAt: '2026-10-18T10:00:00.000Z', total: 2900, amountPaid: 0, amountDue: 2900,
      currency: 'eur', reason: 'subscription_cycle', periodStart: null, periodEnd: null },
  ] };
  const h = harness({ entitlements: managed(), details });
  h.page.ionViewWillEnter();
  assert.equal(h.calls.details, 1);
  assert.equal(h.page.cardLabel, 'Visa •••• 4242');
  assert.equal(h.page.cardExpiry, '09/2027');
  assert.deepEqual(h.page.billingDetails.invoices.map((i) => [h.page.invoiceReason(i), h.page.invoiceStatus(i).label]),
    [['Cambio de plan', 'Pagada'], ['Renovación', 'Pendiente']]);
  h.page.ngOnDestroy();

  const freeH = harness({ entitlements: free() });
  freeH.page.ionViewWillEnter();
  assert.equal(freeH.calls.details, 0, 'sin cuenta de facturación no se consulta nada');
  freeH.page.ngOnDestroy();

  const failing = harness({ entitlements: managed(), details: new Error('offline') });
  failing.page.ionViewWillEnter();
  assert.equal(failing.page.state, 'loaded');
  assert.equal(failing.page.billingDetailsState, 'error');
  failing.page.ngOnDestroy();
});

test('solo se sincroniza con Stripe al volver del portal o del pago, no en cada visita', () => {
  const visit = harness({ entitlements: managed() });
  visit.page.ionViewWillEnter();
  assert.equal(visit.calls.sync.length, 0);
  assert.equal(visit.calls.details, 1);
  visit.page.ngOnDestroy();
  const back = harness({ entitlements: managed(), query: { from: 'portal' } });
  back.page.ionViewWillEnter();
  assert.equal(back.calls.sync.length, 1);
  assert.equal(back.calls.details, 1, 'facturas y tarjeta se leen tras sincronizar');
  back.page.ngOnDestroy();
});

test('en real se puede contratar solo si catálogo y derechos coinciden de entorno', () => {
  const liveFree = (billing = {}) => free({ billing: { enabled: true, mode: 'live', portalAvailable: false, planChanges: true, current: null, ...billing } });
  assert.equal(canStartTrainerCheckout(catalog({ mode: 'live' }), liveFree()), true);
  assert.equal(canStartTrainerCheckout(catalog({ mode: 'live' }), free()), false, 'catálogo real con derechos de pruebas: nunca');
  assert.equal(canStartTrainerCheckout(catalog({ mode: 'staging' }), liveFree({ mode: 'staging' })), false);
  assert.equal(canStartTrainerCheckout(catalog(), managed()), false, 'con una suscripción viva se cambia, no se vuelve a contratar');
  const h = harness({ entitlements: liveFree(), plans: catalog({ mode: 'live' }), query: { session_id: 'cs_test_fromsandbox' } });
  h.page.ionViewWillEnter();
  assert.equal(h.page.returnState, 'error', 'un id de pruebas en producción no se sincroniza');
  assert.equal(h.calls.sync.length, 0);
  h.page.ngOnDestroy();
});

test('las tarifas del catálogo van sin IVA y los importes de Stripe con IVA incluido', () => {
  const h = harness();
  h.page.ionViewWillEnter();
  assert.equal(h.page.tariff(2900, 'monthly'), h.page.recurring(2900, 'monthly') + ' + IVA');
  assert.match(h.page.stripeAmount(3509), /35,09.*\(IVA incluido\)/);
  h.page.ngOnDestroy();
});

const { trainerBillingState, trainerPaymentMethodLabel, trainerInvoiceAdjustment } = compiled.exports;

test('una incidencia con un pago pausa los cobros: se explica, se conserva el acceso y se ofrece el buzón de facturación', () => {
  const held = managed(view('starter'), {}, { hold: { since: '2026-09-28T10:00:00Z' },
    support: { email: 'facturacion@example.test', termsUrl: 'https://trainfit.example.test/condiciones' },
    actions: { canChange: false, canCancel: true, canResume: false, canDiscardChange: false } });
  assert.deepEqual(trainerBillingState(held), { kind: 'on_hold', tone: 'warning', label: 'Cobros en pausa' });
  assert.equal(trainerBillingSummary(held).attention, true);
  const h = harness({ entitlements: held });
  h.page.ionViewWillEnter();
  assert.equal(h.page.supportMailto, 'mailto:facturacion@example.test?subject=Facturaci%C3%B3n%20de%20TrainFit%20Trainers');
  assert.equal(h.page.termsUrl, 'https://trainfit.example.test/condiciones');
  assert.equal(h.page.changesAvailable, false, 'sin cambios de plan mientras los cobros están en pausa');
  h.page.ngOnDestroy();
});

test('excepción concedida, acceso retirado y aviso de renovación anual', () => {
  const exception = managed(view('starter'), {}, { accessException: { until: '2026-11-01T00:00:00Z', tier: 'professional' } });
  assert.equal(trainerBillingState(exception).kind, 'exception');
  assert.equal(trainerBillingSummary(exception).label, 'Acceso concedido por TrainFit hasta');
  const revoked = managed(view('starter'), { isPremium: false }, { accessRevokedUntil: '2026-10-18T12:00:00Z' });
  assert.equal(trainerBillingState(revoked).kind, 'access_revoked');
  const renewal = managed(view('starter', 'annual'), {}, { renewalNotice: { at: '2026-10-18T12:00:00Z', amount: 29000, daysLeft: 20 } });
  assert.deepEqual(trainerBillingSummary(renewal), { label: 'Tu plan anual se renueva el', date: '2026-10-18T12:00:00Z', attention: true });
  assert.ok(trainerBillingSummary({ ...renewal, cancelAtPeriodEnd: true }).label.startsWith('No se renovará'));
});

test('método de pago con tarjeta, cartera o Link, y facturas con reembolso o abono', () => {
  assert.equal(trainerPaymentMethodLabel({ brand: 'visa', last4: '4242', expMonth: 1, expYear: 2030, kind: 'card', wallet: null }), 'Visa •••• 4242');
  assert.equal(trainerPaymentMethodLabel({ brand: 'mastercard', last4: '4444', expMonth: 1, expYear: 2030, kind: 'card', wallet: 'google_pay' }),
    'Mastercard •••• 4444 · Google Pay');
  assert.equal(trainerPaymentMethodLabel(null), null);
  assert.match(trainerInvoiceAdjustment({ id: 'in_1', currency: 'eur', total: 2900, refundedAmount: 2900 }), /^Reembolsado 29,00\s€$/);
  assert.match(trainerInvoiceAdjustment({ id: 'in_1', currency: 'eur', total: 2900, creditedAmount: 1000 }), /^Abonado 10,00\s€$/);
  assert.equal(trainerInvoiceAdjustment({ id: 'in_1', currency: 'eur', total: 2900 }), null);
  const h = harness({ entitlements: managed(), details: { paymentMethod: { brand: 'link', last4: '', expMonth: 0, expYear: 0, kind: 'link', wallet: null },
    invoices: [{ id: 'in_r', number: 'TF-1', status: 'paid', createdAt: '2026-09-18T10:00:00Z', total: 2900, amountPaid: 2900, amountDue: 0,
      currency: 'eur', reason: 'subscription_create', periodStart: null, periodEnd: null, refundedAmount: 2900 }] } });
  h.page.ionViewWillEnter();
  assert.equal(h.page.cardLabel, 'Link');
  assert.equal(h.page.cardExpiry, null);
  assert.match(h.page.invoiceRows[0].adjustment, /^Reembolsado/);
  h.page.ngOnDestroy();
});

test('parámetros de retorno no conceden acceso; solo sync confirmado activa el plan', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const h = harness({ query: { session_id: 'cs_test_123' }, sync: (attempt) => of(attempt === 1 ? free({ status: 'checkout_pending' }) : active()) });
  h.page.ionViewWillEnter();
  assert.equal(h.page.returnState, 'pending');
  assert.equal(h.page.entitlements.isPremium, false);
  assert.equal(h.page.checkoutAvailable, false);
  t.mock.timers.tick(2000);
  assert.equal(h.page.returnState, 'confirmed');
  assert.equal(h.page.entitlements.isPremium, true);
  assert.deepEqual(h.calls.sync, ['cs_test_123', 'cs_test_123']);
  assert.equal(h.calls.navigate.length, 1);
  h.page.ngOnDestroy();
});

test('la espera termina tras cinco consultas y se puede reintentar sin contratar otra vez', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const h = harness({ query: { session_id: 'cs_test_123' } });
  h.page.ionViewWillEnter();
  for (let i = 0; i < 4; i++) t.mock.timers.tick(2000);
  assert.equal(h.calls.sync.length, 5);
  assert.equal(h.page.returnState, 'delayed');
  t.mock.timers.tick(20000);
  assert.equal(h.calls.sync.length, 5);
  h.page.retrySync();
  assert.equal(h.calls.sync.length, 6);
  h.page.ionViewWillLeave();
  t.mock.timers.tick(20000);
  assert.equal(h.calls.sync.length, 6);
});

test('un session_id inválido no llama sync ni concede derechos', () => {
  const h = harness({ query: { session_id: 'cs_live_other' } });
  h.page.ionViewWillEnter();
  assert.equal(h.page.returnState, 'error');
  assert.equal(h.calls.sync.length, 0);
  assert.equal(h.page.checkoutAvailable, false);
  assert.equal(h.page.entitlements.isPremium, false);
  h.page.ngOnDestroy();
});

test('abandono de checkout conserva suscripción activa y no permite duplicarla', () => {
  const h = harness({ entitlements: active(), query: { checkout: 'cancelled' } });
  h.page.ionViewWillEnter();
  assert.equal(h.page.returnState, 'cancelled');
  assert.equal(h.page.entitlements.isPremium, true);
  assert.equal(h.page.checkoutAvailable, false);
  assert.equal(h.page.portalAvailable, true);
  h.page.ngOnDestroy();
});

test('error de sync conserva último acceso y no confirma el pago', () => {
  const h = harness({ query: { session_id: 'cs_test_123' }, sync: () => throwError(() => ({ status: 503 })) });
  h.page.ionViewWillEnter();
  assert.equal(h.page.returnState, 'error');
  assert.equal(h.page.entitlements.isPremium, false);
  assert.equal(h.page.busy, false);
  assert.equal(h.page.showSyncRetry, true);
  h.page.ngOnDestroy();
});

function startupHarness({ url = '/', navigationUrl = null, restored = of(true), sessionValid = false } = {}) {
  const navigations = [];
  const app = Object.create(AppComponent.prototype);
  app.router = {
    url,
    getCurrentNavigation: () => navigationUrl ? { extractedUrl: { toString: () => navigationUrl } } : null,
    navigate: (...args) => { navigations.push(args); return Promise.resolve(true); },
  };
  app.authService = {
    isSessionValid: () => sessionValid, isAuthenticated: () => sessionValid,
    restoreSessionSilently: () => restored, logout: () => {},
  };
  app.pendingEmailVerificationService = { hasPendingVerification: () => false };
  return { app, navigations };
}

test('el arranque conserva ruta, session_id y fragmento durante la restauración de cookie', () => {
  const restored = new Subject();
  const returnUrl = '/tabs/subscription?session_id=cs_test_123#confirmacion';
  const h = startupHarness({ navigationUrl: returnUrl, restored });
  h.app.restoreSessionOnStartup();
  assert.equal(h.navigations.length, 0);
  h.app.router.url = returnUrl;
  restored.next(true); restored.complete();
  assert.deepEqual(h.navigations, [[['/user-loader'], { replaceUrl: true, queryParams: { returnUrl } }]]);
});

test('el retorno del portal y el abandono de checkout también conservan destino', () => {
  for (const returnUrl of ['/tabs/subscription', '/tabs/subscription?checkout=cancelled', '/subscription?session_id=cs_test_123']) {
    const h = startupHarness({ url: returnUrl });
    h.app.restoreSessionOnStartup();
    assert.equal(h.navigations[0][1].queryParams.returnUrl, returnUrl);
  }
});

test('un user-loader existente o en navegación mantiene su returnUrl sin sobrescritura', () => {
  for (const config of [
    { url: '/user-loader?returnUrl=%2Ftabs%2Fsubscription' },
    { url: '/', navigationUrl: '/user-loader?returnUrl=%2Ftabs%2Fsubscription' },
  ]) {
    const h = startupHarness(config); h.app.restoreSessionOnStartup();
    assert.equal(h.navigations.length, 0);
  }
});

test('el destino de arranque sólo admite rutas privadas internas, sin redirect externo ni bucle auth', () => {
  for (const url of ['https://evil.example/tabs/subscription', '//evil.example/tabs', '/\\evil.example/tabs',
    'javascript:alert(1)', '/tabs/\\evil', '/tabs/\nmalformed', '/tabs-evil', '/subscription-evil',
    '/sign-in?returnUrl=/tabs/subscription', '/user-loader', '/', '', null]) {
    assert.equal(getTrainerStartupReturnUrl(url), null, String(url));
  }
  assert.equal(getTrainerStartupReturnUrl('/', '/sign-in', '/tabs/subscription?session_id=cs_test_123'), '/tabs/subscription?session_id=cs_test_123');
  const defaultStartup = startupHarness(); defaultStartup.app.restoreSessionOnStartup();
  assert.deepEqual(defaultStartup.navigations[0][1], { replaceUrl: true });
});

test('no fuerza navegación si la sesión ya es válida o no se logra restaurar', () => {
  for (const config of [{ sessionValid: true }, { restored: of(false) }]) {
    const h = startupHarness({ url: '/tabs/subscription', ...config });
    h.app.restoreSessionOnStartup();
    assert.equal(h.navigations.length, 0);
  }
});

