const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');

// Mismo runner esbuild + node:test que trainer-billing.test.cjs: se ejecuta
// la utilidad real (PURA) de la vista de cobros.
const { esTable } = require('../../../../../../../tests/i18n-es.cjs');

const bundled = buildSync({
  stdin: {
    contents: "export * from './payments-view.util'; export { applyCatalogTranslations } from 'src/app/core/i18n/localized-catalog';",
    resolveDir: __dirname,
    loader: 'ts',
  },
  tsconfig: path.resolve(__dirname, '../../../../../tsconfig.json'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
});
const compiled = new Module(__filename);
compiled._compile(bundled.outputFiles[0].text, __filename);
const view = compiled.exports;
// Textos en español, como los ve el usuario por defecto.
view.applyCatalogTranslations(esTable('train-fit-trainers'), 'es');

// Espacio duro que usa Intl entre la cifra y el símbolo.
const eur = (text) => text.replace(/ /g, ' ');

test('importes: céntimos exactos, coma decimal y como mucho dos decimales', () => {
  assert.equal(eur(view.formatCents(4000)), '40,00 €');
  assert.equal(eur(view.formatCents(123456)), '1234,56 €');
  assert.equal(view.centsToInput(4050), '40,50');
  assert.equal(view.parseAmountInput('40'), 4000);
  assert.equal(view.parseAmountInput('40,5'), 4050);
  assert.equal(view.parseAmountInput(' 19.99 '), 1999);
  for (const bad of ['', '0', '10,005', '-1', 'abc', '1.000,00', null]) assert.equal(view.parseAmountInput(bad), null, String(bad));
});

test('fechas civiles: nunca se mueven por la zona del dispositivo', () => {
  assert.equal(view.formatDay('2026-11-05'), '5 nov');
  assert.equal(view.formatDay('2026-11-05', true), '5 nov 2026');
  assert.equal(view.addDays('2026-02-28', 1), '2026-03-01');
  assert.equal(view.dueRelative('2026-11-05', '2026-11-05'), 'Hoy');
  assert.equal(view.dueRelative('2026-11-06', '2026-11-05'), 'Mañana');
  assert.equal(view.dueRelative('2026-11-02', '2026-11-05'), 'Hace 3 días');
});

test('calendario local: 31 → fin de febrero → 31 de marzo; cada 4 semanas ≠ mensual', () => {
  assert.deepEqual(view.occurrencesFrom('month', 1, '2027-01-31', '2027-01-01', 3), ['2027-01-31', '2027-02-28', '2027-03-31']);
  assert.deepEqual(view.occurrencesFrom('month', 1, '2028-01-31', '2028-02-01', 2), ['2028-02-29', '2028-03-31']);
  assert.deepEqual(view.occurrencesFrom('week', 4, '2026-10-05', '2026-10-05', 3), ['2026-10-05', '2026-11-02', '2026-11-30']);
  assert.deepEqual(view.occurrencesFrom('month', 1, '2026-10-05', '2026-10-06', 1), ['2026-11-05']);
});

test('frecuencia: mensual y cada 4 semanas son distintas', () => {
  assert.equal(view.frequencyLabel('month', 1), 'Mensual');
  assert.equal(view.frequencyLabel('week', 4), 'Cada 4 semanas');
  assert.equal(view.frequencyLabel('month', 5), 'Cada 5 meses');
  const monthly = view.FREQUENCY_PRESETS.find((p) => p.key === 'monthly');
  const fourWeeks = view.FREQUENCY_PRESETS.find((p) => p.key === 'four-weeks');
  assert.notDeepEqual([monthly.unit, monthly.interval], [fourWeeks.unit, fourWeeks.interval]);
});

test('estado de un cobro: parcial Y vencido a la vez; anulado ≠ liquidado', () => {
  const base = { status: 'open', temporal: 'overdue', receivedCents: 2000, cancelledCents: 0, forecast: false, anomalies: [], historical: false };
  assert.deepEqual(view.statusChips(base).map((c) => c.label), ['Vencido', 'Parcial']);
  assert.deepEqual(view.statusChips({ ...base, status: 'cancelled', temporal: 'closed' }).map((c) => c.label), ['Resto anulado']);
  assert.deepEqual(view.statusChips({ ...base, status: 'settled', temporal: 'closed' }).map((c) => c.label), ['Liquidado']);
  const segments = view.balanceSegments({ amountCents: 10000, receivedCents: 3000, cancelledCents: 7000, balanceCents: 0 });
  assert.deepEqual(segments, { received: 30, cancelled: 70, pending: 0 });
});

const summary = (overrides) => ({
  state: 'no_fee', currency: 'EUR', overdue: null, dueToday: null, next: null, pendingCents: 0, openCount: 0,
  plan: null, otherCurrencies: [], needsReview: 0, hasCharges: false, ...overrides,
});

test('tarjeta del Resumen: cada situación con su acción y sin falsos vacíos', () => {
  const empty = view.paymentsCardView(summary({}));
  assert.equal(empty.headline, 'Sin cuota configurada');
  assert.equal(empty.primary.action, 'configure-fee');

  const plan = { status: 'paused', unit: 'month', interval: 1, amountCents: 6000, nextDueDay: null };
  const overdue = view.paymentsCardView(summary({ state: 'overdue', overdue: { balanceCents: 4000, count: 1, oldestDueDay: '2026-11-05' }, plan }));
  assert.equal(overdue.headline, 'Vencido');
  assert.equal(eur(overdue.amount), '40,00 €');
  assert.ok(overdue.notes.includes('Cuota pausada'), 'pausar no esconde la deuda');

  const today = view.paymentsCardView(summary({ state: 'due_today', dueToday: { balanceCents: 6000, count: 1, chargeId: 'c1' } }));
  assert.equal(today.primary.action, 'register');

  const upcoming = view.paymentsCardView(summary({
    state: 'upcoming',
    next: { dueDay: '2026-11-05', amountCents: 6000, chargeId: null, origin: 'plan' },
    plan: { ...plan, status: 'active' },
  }));
  assert.equal(upcoming.headline, 'Próximo cobro');
  assert.equal(upcoming.context, 'Cuota mensual');

  const oneOff = view.paymentsCardView(summary({ state: 'upcoming', next: { dueDay: '2026-12-01', amountCents: 2500, chargeId: 'x', origin: 'one_off' }, hasCharges: true }));
  assert.equal(oneOff.context, 'Cobro puntual');

  const closed = view.paymentsCardView(summary({ state: 'no_pending', hasCharges: true }));
  assert.equal(closed.headline, 'Sin cobros pendientes');
  assert.equal(closed.primary.action, 'history');
  assert.equal(closed.secondary.action, 'configure-fee');
});

test('errores: mensaje del backend o una salida clara; nunca el genérico de Angular', () => {
  assert.equal(view.paymentsErrorMessage({ status: 422, code: 'AMOUNT_EXCEEDS_BALANCE', message: 'El importe supera el saldo pendiente del cobro.' }, 'x'), 'El importe supera el saldo pendiente del cobro.');
  assert.equal(view.paymentsErrorMessage({ status: 500, message: 'Http failure response for x' }, 'No se pudo guardar'), 'No se pudo guardar');
  assert.match(view.paymentsErrorMessage({ status: 0 }, 'x'), /Sin conexión/);
  assert.equal(view.errorCode({ code: 'REOPEN_CONFIRMATION_REQUIRED' }), 'REOPEN_CONFIRMATION_REQUIRED');
  assert.equal(view.errorDetail({ details: { balanceCents: 1000 } }, 'balanceCents'), 1000);
  const a = view.newOperationId('pay');
  assert.match(a, /^pay-/);
  assert.notEqual(a, view.newOperationId('pay'));
});

test('avisos locales antiguos: solo se identifican los de cobros', () => {
  assert.equal(view.isLegacyPaymentReminder({ title: 'TrainFit', body: 'Recuerda cobrar a Laura: 60€' }), true);
  assert.equal(view.isLegacyPaymentReminder({ title: 'TrainFit', body: 'Registra tu peso' }), false);
  assert.equal(view.isLegacyPaymentReminder({ title: 'Descanso', body: 'Recuerda cobrar a' }), false);
  assert.equal(view.isLegacyPaymentReminder({}), false);
});

test('avisos del entrenador: saldo vigente, cobro cerrado y destino según la relación', () => {
  const base = { chargeId: 'c1', dueDay: '2026-11-05', balanceCents: 6000, currency: 'EUR' };
  assert.equal(eur(view.trainerPaymentNoticeTitle(base, 'Laura')), 'Laura · quedan 60,00 € del cobro del 5 nov');
  const partial = { ...base, current: { status: 'open', balanceCents: 4000, dueDay: '2026-11-05', currency: 'EUR', clientRelation: 'active' } };
  assert.equal(eur(view.trainerPaymentNoticeTitle(partial, 'Laura')), 'Laura · quedan 40,00 € del cobro del 5 nov');
  const settled = { ...base, current: { status: 'settled', balanceCents: 0, dueDay: '2026-11-05', currency: 'EUR' } };
  assert.equal(view.trainerPaymentNoticeTitle(settled, 'Laura'), 'Laura · cobro del 5 nov liquidado');
  assert.deepEqual(view.trainerPaymentNoticeRoute('u1', partial, 'Laura'), { commands: ['/tabs/clients', 'u1'], queryParams: { tab: 'payments', charge: 'c1' } });
  const former = { ...base, current: { ...partial.current, clientRelation: 'former' } };
  assert.deepEqual(view.trainerPaymentNoticeRoute('u1', former, 'Laura').commands, ['/tabs/account/payments']);
});

// QA 2026-10-09: la gráfica de cobros redondeaba 80,50 a «81 €» y un importe
// negativo decía «usa como mucho dos decimales».
test('etiqueta corta de importe: sin decimales si es entero, con céntimos si los hay', () => {
  assert.equal(eur(view.eurosCompact(8000)), '80 €');
  assert.equal(eur(view.eurosCompact(8050)), '80,50 €');
  assert.equal(eur(view.eurosCompact(0)), '0 €');
});

test('por qué no vale un importe', () => {
  assert.equal(view.amountInputErrorKey(''), null, 'vacío: lo dice el formulario');
  assert.equal(view.amountInputErrorKey('45,50'), null);
  assert.equal(view.amountInputErrorKey('-10'), 'PAYMENTS.AMOUNT_ERRORS.NOT_POSITIVE');
  assert.equal(view.amountInputErrorKey('0'), 'PAYMENTS.AMOUNT_ERRORS.NOT_POSITIVE');
  assert.equal(view.amountInputErrorKey('abc'), 'PAYMENTS.AMOUNT_ERRORS.NOT_A_NUMBER');
  assert.equal(view.amountInputErrorKey('1.000,00'), 'PAYMENTS.AMOUNT_ERRORS.NOT_A_NUMBER');
  assert.equal(view.amountInputErrorKey('10,005'), 'PAYMENTS.AMOUNT_ERRORS.TOO_MANY_DECIMALS');
  assert.equal(view.amountInputErrorKey('2000000'), 'PAYMENTS.AMOUNT_ERRORS.TOO_HIGH');
});
