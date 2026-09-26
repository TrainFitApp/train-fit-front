const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');
const { of, throwError, Subject } = require('rxjs');

// Mismo runner esbuild + node:test que planner-compare.test.cjs. Se ejecuta
// la lógica real de la página; solo se sustituyen el decorador y la plataforma.
const bundled = buildSync({
  stdin: { contents: "export * from './trainer-billing-view.util'; export * from './subscription.page'; export * from '../../app.component';", resolveDir: __dirname, loader: 'ts' },
  tsconfig: path.resolve(__dirname, '../../../../tsconfig.json'),
  bundle: true, platform: 'node', format: 'cjs', write: false,
  external: ['@angular/core', '@capacitor/core', '@capacitor/app', 'swiper/element/bundle', 'rxjs', 'rxjs/*'],
});
const compiled = new Module(__filename);
compiled.require = (name) => {
  if (name === '@angular/core') return { Component: () => (target) => target };
  if (name === '@capacitor/core') return { Capacitor: { isNativePlatform: () => false } };
  if (name === '@capacitor/app') return { App: {} };
  if (name === 'swiper/element/bundle') return { register: () => {} };
  return require(name);
};
compiled._compile(bundled.outputFiles[0].text, __filename);
const { SubscriptionPage, safeStripeRedirectUrl, trainerPlanName, trainerBillingSummary, canStartTrainerCheckout } = compiled.exports;
const { AppComponent, getTrainerStartupReturnUrl } = compiled.exports;

const free = (changes = {}) => ({
  isPremium: false, tier: 'free', plan: null, expiresAt: null,
  limits: { clients: 3 }, usage: { clients: 2 }, remaining: { clients: 1 },
  provider: null, status: 'none', cancelAtPeriodEnd: false, currentPeriodEnd: null,
  billing: { enabled: true, mode: 'test', portalAvailable: false, planChanges: false },
  ...changes,
});
const active = (changes = {}) => free({
  isPremium: true, tier: 'trainer_pro', plan: 'monthly', limits: { clients: 20 },
  provider: 'stripe', status: 'active', currentPeriodEnd: '2026-10-18T12:00:00.000Z',
  billing: { enabled: true, mode: 'test', portalAvailable: true, planChanges: false },
  ...changes,
});
const catalog = () => ({
  enabled: true, mode: 'test', currency: 'EUR', taxPolicy: 'test_no_tax',
  capabilities: { checkout: true, portal: true, planChanges: false },
  plans: [{ tier: 'trainer_pro', clientLimit: 20, prices: {
    monthly: { amount: 2900, interval: 'monthly' }, annual: { amount: 29700, interval: 'annual' },
  } }],
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
    createCheckout: (...args) => { calls.checkout.push(args); return of({ url: 'https://evil.example/', sessionId: 'cs_test_123', reused: false }); },
    createPortal: () => { calls.portal++; return of({ url: 'https://evil.example/' }); },
    sync: (id) => { calls.sync.push(id); return sync ? sync(calls.sync.length) : of(entitlements); },
    previewChange: (...args) => { calls.preview.push(args); return of(quote()); },
    changePlan: (quoteId) => { calls.change.push(quoteId); return of({ status: 'applied', entitlements: managed() }); },
    cancel: () => { calls.cancel++; return of(managed({ cancelAtPeriodEnd: true })); },
    resume: () => { calls.resume++; return of(managed()); },
    discardChange: () => { calls.discard++; return of(managed()); },
  };
  const route = { snapshot: { queryParamMap: { get: (key) => query[key] || null } } };
  const router = { navigate: (...args) => { calls.navigate.push(args); return Promise.resolve(true); } };
  const page = new SubscriptionPage(api, { user: { roles } }, route, router);
  return { page, api, calls };
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
  const h = harness({ entitlements: active() });
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

const managed = (changes = {}, billing = {}) => active({
  ...changes,
  billing: {
    enabled: true, mode: 'test', portalAvailable: true, planChanges: true,
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: false },
    currentPrice: { tier: 'trainer_pro', interval: 'monthly', amount: 2900, clientLimit: 20 },
    pendingChange: null, pendingPayment: null, ...billing,
  },
});
const changeCatalog = () => ({ ...catalog(), capabilities: { checkout: true, portal: true, planChanges: true } });
const quote = (changes = {}) => ({
  quoteId: 'opaque-quote', expiresAt: new Date(Date.now() + 300000).toISOString(), kind: 'immediate',
  from: { tier: 'trainer_pro', interval: 'monthly', amount: 2900, clientLimit: 20 },
  to: { tier: 'trainer_pro', interval: 'annual', amount: 29700, clientLimit: 20 },
  effectiveAt: new Date().toISOString(), amountDueNow: 28017, currency: 'eur',
  nextRenewal: { at: '2027-09-18T12:00:00.000Z', amount: 29700, estimated: true }, usage: { clients: 2, limit: 20 },
  ...changes,
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
  h.page.openManagementDialog('cancel');
  assert.equal(h.page.dialog, 'cancel');
  h.page.ngOnDestroy();
});

test('seleccionar no muta: preview muestra importe servidor y confirmar envía sólo quoteId una vez', () => {
  const h = harness({ entitlements: managed(), plans: changeCatalog() });
  const mutation = new Subject();
  h.api.changePlan = (id) => { h.calls.change.push(id); return mutation; };
  h.page.ionViewWillEnter();
  h.page.selectInterval('annual');
  h.page.selectPlan(catalog().plans[0]);
  assert.deepEqual(h.calls.preview, [['trainer_pro', 'annual']]);
  assert.equal(h.page.quote.amountDueNow, 28017);
  assert.equal(h.calls.change.length, 0);
  h.page.confirmPlanChange(); h.page.confirmPlanChange();
  assert.deepEqual(h.calls.change, ['opaque-quote']);
  assert.equal(h.page.entitlements.plan, 'monthly');
  mutation.next({ status: 'applied', entitlements: managed({ plan: 'annual' }) }); mutation.complete();
  assert.equal(h.page.entitlements.plan, 'annual');
  assert.equal(h.page.dialog, null);
  assert.equal(h.page.busy, false);
  h.page.ngOnDestroy();
});

test('cálculo caducado o rechazado no cambia derechos y exige nueva revisión', () => {
  const h = harness({ entitlements: managed(), plans: changeCatalog() });
  h.api.previewChange = () => of(quote({ expiresAt: '2000-01-01T00:00:00Z' }));
  h.page.ionViewWillEnter(); h.page.selectInterval('annual'); h.page.selectPlan(catalog().plans[0]);
  h.page.confirmPlanChange();
  assert.equal(h.calls.change.length, 0);
  assert.equal(h.page.needsNewQuote, true);
  h.api.previewChange = () => of(quote()); h.page.requestPreview();
  h.api.changePlan = () => throwError(() => ({ code: 'QUOTE_STALE' }));
  h.page.confirmPlanChange();
  assert.match(h.page.dialogError, /ha cambiado/);
  assert.equal(h.page.entitlements.plan, 'monthly');
  assert.equal(h.page.needsNewQuote, true);
  assert.equal(h.page.busy, false);
  h.page.ngOnDestroy();
});

test('cupo destino insuficiente impide solicitar preview incluso llamando al handler directamente', () => {
  const h = harness({ entitlements: managed({ usage: { clients: 21 } }), plans: changeCatalog() });
  h.page.ionViewWillEnter(); h.page.selectInterval('annual'); h.page.selectPlan(catalog().plans[0]);
  assert.equal(h.calls.preview.length, 0);
  assert.match(h.page.planBlockReason(catalog().plans[0]), /21.*20/);
  h.page.ngOnDestroy();
});

test('pago SCA pendiente conserva cupo y sólo ofrece enlace de factura permitido', () => {
  const h = harness({ entitlements: managed(), plans: changeCatalog() });
  h.api.changePlan = () => of({ status: 'payment_pending', paymentActionUrl: 'https://evil.example/', entitlements: managed({}, {
    pendingPayment: { url: 'https://invoice.stripe.com/i/acct/payment' },
    actions: { canChange: false, canCancel: true, canResume: false, canDiscardChange: true },
  }) });
  h.page.ionViewWillEnter(); h.page.selectInterval('annual'); h.page.selectPlan(catalog().plans[0]); h.page.confirmPlanChange();
  assert.equal(h.page.entitlements.limits.clients, 20);
  assert.equal(h.page.entitlements.plan, 'monthly');
  assert.equal(h.page.paymentUrl, 'https://invoice.stripe.com/i/acct/payment');
  assert.equal(h.page.changesAvailable, false);
  assert.equal(h.page.canManage('canCancel'), true);
  assert.equal(h.page.canManage('canDiscardChange'), true);
  h.page.ngOnDestroy();
});

test('cambio programado mantiene plan actual y se puede descartar', () => {
  const pendingChange = { tier: 'trainer_pro', interval: 'monthly', effectiveAt: '2027-09-18T12:00:00.000Z' };
  const h = harness({ entitlements: managed({ plan: 'annual' }), plans: changeCatalog() });
  h.api.previewChange = () => of(quote({ kind: 'scheduled', amountDueNow: 0 }));
  h.api.changePlan = () => of({ status: 'scheduled', entitlements: managed({ plan: 'annual' }, {
    pendingChange, actions: { canChange: false, canCancel: true, canResume: false, canDiscardChange: true },
  }) });
  h.page.ionViewWillEnter(); h.page.selectInterval('monthly'); h.page.selectPlan(catalog().plans[0]); h.page.confirmPlanChange();
  assert.equal(h.page.entitlements.plan, 'annual');
  assert.deepEqual(h.page.pendingChange, pendingChange);
  assert.equal(h.page.pendingClientLimit, 20);
  h.page.openManagementDialog('discard'); h.page.confirmManagementAction();
  assert.equal(h.calls.discard, 1);
  assert.equal(h.page.pendingChange, null);
  h.page.ngOnDestroy();
});

test('cancelar requiere confirmación, preserva acceso y permite reactivar según capabilities', () => {
  const h = harness({ entitlements: managed(), plans: changeCatalog() });
  h.api.cancel = () => { h.calls.cancel++; return of(managed({ cancelAtPeriodEnd: true }, {
    actions: { canChange: false, canCancel: false, canResume: true, canDiscardChange: false },
  })); };
  h.page.ionViewWillEnter(); h.page.openManagementDialog('cancel');
  assert.equal(h.calls.cancel, 0);
  h.page.confirmManagementAction();
  assert.equal(h.calls.cancel, 1);
  assert.equal(h.page.entitlements.isPremium, true);
  assert.equal(h.page.entitlements.cancelAtPeriodEnd, true);
  assert.equal(h.page.canManage('canCancel'), false);
  h.page.openManagementDialog('resume'); h.page.confirmManagementAction();
  assert.equal(h.calls.resume, 1);
  assert.equal(h.page.entitlements.cancelAtPeriodEnd, false);
  h.page.ngOnDestroy();
});

test('legacy y rol no autorizado nunca pueden mutar pese a capabilities recibidas', () => {
  for (const config of [
    { entitlements: managed({ provider: 'revenuecat', limits: { clients: 15 } }) },
    { entitlements: managed(), roles: ['user'] },
    { entitlements: managed({}, { enabled: false }) },
  ]) {
    const h = harness({ ...config, plans: changeCatalog() });
    h.page.ionViewWillEnter(); h.page.openManagementDialog('cancel'); h.page.confirmManagementAction();
    h.page.selectInterval('annual'); h.page.selectPlan(catalog().plans[0]);
    assert.equal(h.calls.cancel, 0); assert.equal(h.calls.preview.length, 0);
    h.page.ngOnDestroy();
  }
});

test('cancelación fallida conserva la suscripción y muestra recuperación sin éxito falso', () => {
  const h = harness({ entitlements: managed(), plans: changeCatalog() });
  h.api.cancel = () => throwError(() => ({ status: 503 }));
  h.page.ionViewWillEnter(); h.page.openManagementDialog('cancel'); h.page.confirmManagementAction();
  assert.equal(h.page.entitlements.cancelAtPeriodEnd, false);
  assert.equal(h.page.feedback, '');
  assert.equal(h.page.dialog, 'cancel');
  assert.equal(h.page.busy, false);
  assert.match(h.page.dialogError, /Actualiza el estado/);
  h.page.ngOnDestroy();
});

test('cupo de nuevas altas programadas sigue backend aun sin catálogo y nunca adelanta una subida', () => {
  const pendingChange = { tier: 'trainer_growth', interval: 'monthly', effectiveAt: '2027-09-18T12:00:00.000Z', clientLimit: 50 };
  const h = harness({ entitlements: managed({}, { pendingChange, admissionClientLimit: 20 }), plans: null });
  h.page.ionViewWillEnter();
  assert.equal(h.page.pendingClientLimit, 20);
  h.page.entitlements = managed({}, { pendingChange });
  assert.equal(h.page.pendingClientLimit, 20);
  h.page.entitlements = managed({ limits: { clients: 50 } }, { pendingChange: { ...pendingChange, clientLimit: 20 } });
  assert.equal(h.page.pendingClientLimit, 20);
  h.page.ngOnDestroy();
});

test('la versión nativa no abre checkout, portal ni mutaciones de suscripción web', () => {
  const h = harness({ entitlements: managed(), plans: changeCatalog() });
  h.page.isWeb = false;
  h.page.ionViewWillEnter(); h.page.openPortal(); h.page.openManagementDialog('cancel');
  h.page.selectInterval('annual'); h.page.selectPlan(catalog().plans[0]); h.page.confirmManagementAction();
  assert.equal(h.calls.portal, 0); assert.equal(h.calls.cancel, 0); assert.equal(h.calls.preview.length, 0);
  assert.equal(h.page.billingEnabled, false);
  h.page.ngOnDestroy();
});

test('preserva el cupo y nombre de Pro 15 y Unlimited anteriores', () => {
  const legacy = active({ provider: 'revenuecat', limits: { clients: 15 } });
  assert.equal(trainerPlanName(legacy), 'Pro (plan anterior)');
  assert.equal(canStartTrainerCheckout(catalog(), legacy), false);
  assert.equal(trainerPlanName(active({ tier: 'trainer_unlimited', limits: { clients: null } })), 'Unlimited (plan anterior)');
  assert.equal(trainerPlanName(active({ tier: 'trainer_scale', limits: { clients: 150 } })), 'Scale');
  assert.equal(legacy.limits.clients, 15);
});

test('cancelación programada y pago fallido no se presentan como próxima renovación', () => {
  assert.match(trainerBillingSummary(active({ cancelAtPeriodEnd: true })).label, /No se renovará/);
  assert.match(trainerBillingSummary(active()).label, /Próxima renovación/);
  assert.equal(trainerBillingSummary(active({ status: 'past_due' })).attention, true);
  assert.doesNotMatch(trainerBillingSummary(active({ provider: 'revenuecat' })).label, /renovación/);
  assert.equal(trainerBillingSummary(active({ currentPeriodEnd: 'invalid' })).date, null);
});

test('Free tras finalizar la suscripción oculta la tarifa histórica y no anuncia renovación', () => {
  const historicalPrice = { tier: 'trainer_scale', interval: 'monthly', amount: 11900, clientLimit: 150 };
  const h = harness({ entitlements: free({ provider: 'stripe', status: 'canceled',
    currentPeriodEnd: '2025-09-18T12:00:00.000Z',
    billing: { enabled: true, mode: 'test', portalAvailable: true, planChanges: true, currentPrice: historicalPrice },
  }) });
  h.page.ionViewWillEnter();
  assert.equal(h.page.currentPlanName, 'Free');
  assert.equal(h.page.currentPrice, null);
  assert.equal(h.page.entitlements.billing.currentPrice.amount, 11900);
  assert.deepEqual(h.page.billingSummary, { label: 'Suscripción finalizada', date: null, attention: false });
  h.page.entitlements = managed({ tier: 'trainer_scale' }, { currentPrice: historicalPrice });
  assert.deepEqual(h.page.currentPrice, historicalPrice);
  h.page.entitlements = managed({}, { currentPrice: historicalPrice });
  assert.equal(h.page.currentPrice, null);
  h.page.ngOnDestroy();
});

test('backend desactivado o rol cliente impiden iniciar checkout y portal', () => {
  const disabled = harness({ plans: { ...catalog(), enabled: false } });
  disabled.page.ionViewWillEnter();
  disabled.page.subscribe(catalog().plans[0]);
  disabled.page.openPortal();
  assert.equal(disabled.page.checkoutAvailable, false);
  assert.equal(disabled.calls.checkout.length, 0);
  assert.equal(disabled.calls.portal, 0);
  disabled.page.ngOnDestroy();
  const client = harness({ roles: ['user'] });
  client.page.ionViewWillEnter();
  client.page.subscribe(catalog().plans[0]);
  assert.equal(client.page.state, 'forbidden');
  assert.equal(client.calls.checkout.length, 0);
  client.page.ngOnDestroy();
});

test('usa el importe del catálogo y envía solo tier/intervalo; doble clic no duplica solicitud', () => {
  const h = harness();
  const pending = new Subject();
  h.api.createCheckout = (...args) => { h.calls.checkout.push(args); return pending; };
  h.page.ionViewWillEnter();
  h.page.selectInterval('annual');
  assert.match(h.page.planCards[0].price, /297/);
  h.page.subscribe(catalog().plans[0]);
  h.page.subscribe(catalog().plans[0]);
  assert.deepEqual(h.calls.checkout, [['trainer_pro', 'annual']]);
  pending.next({ url: 'https://evil.example/', sessionId: 'cs_test_123' });
  pending.complete();
  assert.match(h.page.actionError, /validar el enlace/);
  assert.equal(h.page.busy, false);
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

const tierCatalog = () => ({ ...changeCatalog(), plans: [
  { tier: 'trainer_pro', clientLimit: 20, prices: { monthly: { amount: 2900, interval: 'monthly' }, annual: { amount: 29700, interval: 'annual' } } },
  { tier: 'trainer_growth', clientLimit: 50, prices: { monthly: { amount: 4900, interval: 'monthly' }, annual: { amount: 50900, interval: 'annual' } } },
  { tier: 'trainer_scale', clientLimit: 150, prices: { monthly: { amount: 11900, interval: 'monthly' }, annual: { amount: 120900, interval: 'annual' } } },
] });

test('la próxima renovación y la renovación impagada vienen de Stripe; pagar solo abre facturas Stripe', () => {
  const h = harness({ entitlements: managed({}, {
    renewal: { at: '2026-10-18T12:00:00.000Z', amount: 2610, source: 'stripe' },
    renewalPayment: { url: 'https://invoice.stripe.com/i/acct_1/renewal', amount: 2900 },
  }), plans: tierCatalog() });
  h.page.ionViewWillEnter();
  assert.equal(h.page.renewal.amount, 2610);
  assert.equal(h.page.statusBadge.tone, 'danger');
  assert.equal(h.page.billingSummary.attention, true);
  const originalWindow = global.window;
  const destinations = [];
  try {
    global.window = { location: { assign: (url) => destinations.push(url) }, removeEventListener: () => {} };
    h.page.payRenewal();
    assert.deepEqual(destinations, ['https://invoice.stripe.com/i/acct_1/renewal']);
    h.page.entitlements = managed({}, { renewalPayment: { url: 'https://evil.example/i/x', amount: 2900 } });
    h.page.payRenewal();
    assert.equal(destinations.length, 1, 'una URL ajena nunca se abre');
  } finally {
    if (originalWindow === undefined) delete global.window; else global.window = originalWindow;
    h.page.ngOnDestroy();
  }
});

test('con un cambio programado: otro plan lo sustituye, el plan actual lo descarta y el mismo destino no hace nada', () => {
  const pendingChange = { tier: 'trainer_pro', interval: 'monthly', effectiveAt: '2026-10-18T12:00:00.000Z', clientLimit: 20 };
  const h = harness({ entitlements: managed({ tier: 'trainer_growth', limits: { clients: 50 } }, {
    currentPrice: { tier: 'trainer_growth', interval: 'monthly', amount: 4900, clientLimit: 50 }, pendingChange,
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: true },
  }), plans: tierCatalog() });
  h.page.ionViewWillEnter();
  const [pro, growth, scale] = tierCatalog().plans;
  h.page.selectPlan(pro);
  assert.equal(h.page.dialog, null, 'el destino ya programado no abre nada');
  assert.equal(h.calls.preview.length, 0);
  h.page.selectPlan(growth);
  assert.equal(h.page.dialog, 'discard', 'volver al plan actual = descartar el cambio');
  h.page.closeDialog();
  h.page.selectPlan(scale);
  assert.equal(h.page.dialog, 'change');
  assert.deepEqual(h.calls.preview[0], ['trainer_scale', 'monthly']);
  h.page.ngOnDestroy();
});

test('una subida anual→mensual avisa de la espera y ofrece la misma subida en anual', () => {
  const h = harness({ entitlements: managed({ plan: 'annual' }, {
    currentPrice: { tier: 'trainer_pro', interval: 'annual', amount: 29700, clientLimit: 20 },
  }), plans: tierCatalog() });
  h.api.previewChange = (...args) => { h.calls.preview.push(args); return of(args[1] === 'monthly'
    ? quote({ kind: 'scheduled', amountDueNow: 0, from: { tier: 'trainer_pro', interval: 'annual', amount: 29700, clientLimit: 20 },
      to: { tier: 'trainer_scale', interval: 'monthly', amount: 11900, clientLimit: 150 } })
    : quote({ kind: 'immediate', from: { tier: 'trainer_pro', interval: 'annual', amount: 29700, clientLimit: 20 },
      to: { tier: 'trainer_scale', interval: 'annual', amount: 120900, clientLimit: 150 } })); };
  h.page.ionViewWillEnter();
  h.page.selectInterval('monthly');
  h.page.selectPlan(tierCatalog().plans[2]);
  assert.equal(h.page.delayedUpgrade, true);
  h.page.previewAnnualInstead();
  assert.deepEqual(h.calls.preview[1], ['trainer_scale', 'annual']);
  assert.equal(h.page.quote.kind, 'immediate');
  assert.equal(h.page.delayedUpgrade, false);
  assert.equal(h.calls.change.length, 0, 'el atajo solo recalcula; nunca confirma');
  h.page.ngOnDestroy();
});

test('plazas por encima del cupo: la selección respeta el límite y se guarda una vez', () => {
  const seats = { overLimit: true, limit: 3, usage: 5, autoSelected: true, clients: ['a', 'b', 'c', 'd', 'e'].map((id, i) => ({
    clientId: id, name: `Cliente ${id}`, email: null, active: i < 3 })) };
  const h = harness({ entitlements: free({ usage: { clients: 5 } }), seats });
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


test('facturas y método de pago vienen de Stripe y solo se piden con suscripción Stripe; un fallo no rompe la página', () => {
  const details = { paymentMethod: { brand: 'visa', last4: '4242', expMonth: 9, expYear: 2027 }, invoices: [
    { id: 'in_1', number: 'TF-1', status: 'paid', createdAt: '2026-09-18T10:00:00.000Z', total: 2000, amountPaid: 2000, amountDue: 0,
      currency: 'eur', reason: 'subscription_update', periodStart: null, periodEnd: null, hostedUrl: 'https://invoice.stripe.com/i/x' },
    { id: 'in_2', number: 'TF-2', status: 'open', createdAt: '2026-10-18T10:00:00.000Z', total: 2900, amountPaid: 0, amountDue: 2900,
      currency: 'eur', reason: 'subscription_cycle', periodStart: null, periodEnd: null },
  ] };
  const h = harness({ entitlements: managed(), plans: tierCatalog(), details });
  h.page.ionViewWillEnter();
  assert.equal(h.calls.details, 1);
  assert.equal(h.page.cardLabel, 'Visa •••• 4242');
  assert.equal(h.page.cardExpiry, '09/2027');
  assert.deepEqual(h.page.billingDetails.invoices.map((i) => [h.page.invoiceReason(i), h.page.invoiceStatus(i).label]),
    [['Cambio de plan', 'Pagada'], ['Renovación', 'Pendiente']]);
  h.page.ngOnDestroy();

  const freeH = harness({ entitlements: free() });
  freeH.page.ionViewWillEnter();
  assert.equal(freeH.calls.details, 0, 'sin suscripción Stripe no se consulta nada');
  freeH.page.ngOnDestroy();

  const failing = harness({ entitlements: managed(), plans: tierCatalog(), details: new Error('offline') });
  failing.page.ionViewWillEnter();
  assert.equal(failing.page.state, 'loaded');
  assert.equal(failing.page.billingDetailsState, 'error');
  failing.page.ngOnDestroy();
});

test('el desglose del prorrateo etiqueta el crédito del plan actual y el cargo del nuevo', () => {
  const h = harness({ entitlements: managed(), plans: tierCatalog() });
  h.page.ionViewWillEnter();
  assert.equal(h.page.lineLabel({ kind: 'credit', tier: 'trainer_pro', interval: 'monthly', amount: -2900 }), 'Crédito por el tiempo no usado de Pro mensual');
  assert.equal(h.page.lineLabel({ kind: 'charge', tier: 'trainer_growth', interval: 'annual', amount: 50900 }), 'Growth anual');
  h.page.ngOnDestroy();
});


test('la línea temporal explica qué pasa y cuándo en cada estado, con datos del backend', () => {
  const renewal = { at: '2026-10-18T12:00:00.000Z', amount: 2900, source: 'stripe', tier: 'trainer_pro', interval: 'monthly', discounted: false };
  const active = harness({ entitlements: managed({}, { renewal }), plans: tierCatalog() });
  active.page.ionViewWillEnter();
  assert.deepEqual(active.page.timeline.map((s) => [s.when, s.title]), [['Hoy', 'Tienes Pro mensual'], ['18 oct 2026', 'Renovación automática']]);
  assert.equal(active.page.timeline, active.page.timeline, 'la vista se reutiliza mientras no cambian los datos');
  active.page.ngOnDestroy();

  const scheduled = harness({ entitlements: managed({}, {
    pendingChange: { tier: 'trainer_growth', interval: 'monthly', effectiveAt: '2026-10-18T12:00:00.000Z' },
    renewal: { ...renewal, amount: 4410, tier: 'trainer_growth', discounted: true } }), plans: tierCatalog() });
  scheduled.page.ionViewWillEnter();
  const next = scheduled.page.timeline[1];
  assert.equal(next.title, 'Pasa a Growth mensual');
  assert.match(next.detail, /44,10.*descuento/);
  scheduled.page.ngOnDestroy();

  const canceling = harness({ entitlements: managed({ cancelAtPeriodEnd: true }), plans: tierCatalog() });
  canceling.page.ionViewWillEnter();
  assert.equal(canceling.page.timeline[1].title, 'Fin del acceso de pago');
  assert.equal(canceling.page.statusBadge.kind, 'canceling');
  canceling.page.ngOnDestroy();

  const failed = harness({ entitlements: managed({ status: 'past_due' }, {
    renewalPayment: { url: 'https://invoice.stripe.com/i/x', amount: 2900, graceUntil: '2026-10-25T12:00:00.000Z' } }), plans: tierCatalog() });
  failed.page.ionViewWillEnter();
  assert.deepEqual(failed.page.timeline.map((s) => s.tone), ['danger', 'danger']);
  assert.equal(failed.page.timeline[1].when, '25 oct 2026');
  failed.page.ngOnDestroy();
});

test('las tarjetas de plan destacan cupo, plan actual, programado y ahorro anual real del catálogo', () => {
  const h = harness({ entitlements: managed({}, {
    pendingChange: { tier: 'trainer_growth', interval: 'monthly', effectiveAt: '2026-10-18T12:00:00.000Z' },
    actions: { canChange: true, canCancel: true, canResume: false, canDiscardChange: true } }), plans: tierCatalog() });
  h.page.ionViewWillEnter();
  const [pro, growth, scale] = h.page.planCards;
  assert.equal(pro.current, true);
  assert.equal(pro.action, 'keep');
  assert.equal(growth.scheduled, true);
  assert.equal(growth.action, null);
  assert.equal(scale.action, 'change');
  assert.equal(h.page.planCards, h.page.planCards, 'no se recalculan en cada render');
  h.page.selectInterval('annual');
  assert.match(h.page.planCards[2].annualSaving, /219/, '12 × 119 − 1.209');
  assert.match(h.page.annualSavingLabel, /219/);
  h.page.ngOnDestroy();
});

test('solo se sincroniza con Stripe al volver del portal o del pago, no en cada visita', () => {
  const visit = harness({ entitlements: managed(), plans: tierCatalog() });
  visit.page.ionViewWillEnter();
  assert.equal(visit.calls.sync.length, 0);
  assert.equal(visit.calls.details, 1);
  visit.page.ngOnDestroy();

  const back = harness({ entitlements: managed(), plans: tierCatalog(), query: { from: 'portal' } });
  back.page.ionViewWillEnter();
  assert.equal(back.calls.sync.length, 1);
  assert.equal(back.calls.details, 1, 'facturas y tarjeta se leen tras sincronizar');
  back.page.ngOnDestroy();
});

test('en modo live se puede contratar solo si catálogo y derechos coinciden de entorno', () => {
  const liveCatalog = () => ({ ...catalog(), mode: 'live', taxPolicy: 'stripe_tax' });
  const liveFree = (billing = {}) => free({ billing: { enabled: true, mode: 'live', taxPolicy: 'stripe_tax', portalAvailable: false, planChanges: false, ...billing } });
  assert.equal(canStartTrainerCheckout(liveCatalog(), liveFree()), true);
  assert.equal(canStartTrainerCheckout(liveCatalog(), free()), false, 'catálogo live con derechos de pruebas: nunca');
  assert.equal(canStartTrainerCheckout({ ...liveCatalog(), mode: 'staging' }, liveFree({ mode: 'staging' })), false);
  const h = harness({ entitlements: liveFree(), plans: liveCatalog(), query: { session_id: 'cs_test_fromsandbox' } });
  h.page.ionViewWillEnter();
  assert.equal(h.page.returnState, 'error', 'un id de pruebas en producción no se sincroniza');
  assert.equal(h.calls.sync.length, 0);
  h.page.ngOnDestroy();
});

test('con Stripe Tax las tarifas del catálogo se muestran + IVA; sin él, no', () => {
  const h = harness({ entitlements: free({ billing: { enabled: true, mode: 'live', taxPolicy: 'stripe_tax', portalAvailable: false, planChanges: false } }),
    plans: { ...catalog(), mode: 'live', taxPolicy: 'stripe_tax' } });
  h.page.ionViewWillEnter();
  assert.equal(h.page.pricesExcludeTax, true);
  assert.equal(h.page.tariff(2900, 'monthly'), h.page.recurring(2900, 'monthly') + ' + IVA');
  h.page.ngOnDestroy();
  const sandbox = harness();
  sandbox.page.ionViewWillEnter();
  assert.equal(sandbox.page.tariff(2900, 'monthly'), sandbox.page.recurring(2900, 'monthly'));
  sandbox.page.ngOnDestroy();
});
