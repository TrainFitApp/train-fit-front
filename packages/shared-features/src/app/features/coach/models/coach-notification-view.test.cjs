const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');

const { esTranslator } = require('../../../../../../../tests/i18n-es.cjs');

const bundled = buildSync({
  entryPoints: [path.join(__dirname, 'coach-notification-view.ts')],
  tsconfig: path.resolve(__dirname, '../../../../../../../apps/train-fit-front/tsconfig.json'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
});
const compiled = new Module(__filename);
compiled._compile(bundled.outputFiles[0].text, __filename);
const { notificationIcon, notificationRoute } = compiled.exports;
// Los títulos se traducen con el TranslateService de la página; aquí, en español.
const { instant } = esTranslator('train-fit-front');
const notificationTitle = (n) => compiled.exports.notificationTitle(n, instant);
const notificationTrainerName = (n) => compiled.exports.notificationTrainerName(n, instant);

const notification = (type, payload = {}, trainer = null) => ({
  _id: 'n1', type, payload, trainer, read: false, createdAt: '2026-09-27T10:00:00Z',
});

test('checkin_reviewed lleva a Mis check-ins (antes le faltaba el case y no navegaba)', () => {
  assert.deepEqual(notificationRoute(notification('checkin_reviewed', { name: 'Semanal' })), {
    commands: ['/my-checkins'],
  });
});

test('las comidas llevan a la dieta en su fecha', () => {
  for (const type of ['meal_proposal', 'meal_prescribed']) {
    assert.deepEqual(notificationRoute(notification(type, { date: '2026-09-28' })), {
      commands: ['/tabs/diets'],
      extras: { state: { selectedDate: '2026-09-28' } },
    });
  }
});

test('las informativas no navegan', () => {
  for (const type of ['payment_created', 'task_assigned', 'intake_submitted', 'client_confirmed']) {
    assert.equal(notificationRoute(notification(type)), null);
  }
});

test('título, icono y profesional con sus respaldos', () => {
  assert.equal(notificationTitle(notification('task_assigned', { taskLabel: 'Pasos' })), 'Nuevo hábito: Pasos');
  assert.equal(notificationTitle(notification('desconocido')), 'Nueva actividad');
  assert.equal(notificationIcon(notification('desconocido')), 'notifications-outline');
  assert.equal(notificationTrainerName(notification('routine_assigned')), 'Tu profesional');
  assert.equal(
    notificationTrainerName(notification('routine_assigned', {}, { name: 'Ana', lastname: 'Ruiz' })),
    'Ana Ruiz'
  );
});

// Cobros 2026-09 — recordatorio de pago que ve el CLIENTE: saldo vigente
// (payload.current), fecha civil, sin datos internos y sin reclamar un cobro
// que ya se cerró.
const { money, shortDay } = compiled.exports;
const plain = (text) => text.replace(/ /g, ' ');

test('recordatorio de pago: saldo vigente y fecha civil, sin pantalla de gestión', () => {
  const title = notificationTitle(notification('payment_reminder', {
    balanceCents: 6000,
    currency: 'EUR',
    dueDay: '2026-11-05',
    current: { status: 'open', balanceCents: 4000, dueDay: '2026-11-05', currency: 'EUR' },
  }));
  assert.equal(plain(title), 'Tu profesional te recuerda un pago pendiente de 40,00 €, con vencimiento el 5 nov');
  assert.equal(notificationRoute(notification('payment_reminder')), null);
  assert.equal(notificationIcon(notification('payment_reminder')), 'wallet-outline');
});

test('recordatorio de un cobro ya cerrado: no reclama el importe antiguo', () => {
  const settled = notificationTitle(notification('payment_reminder', {
    balanceCents: 6000,
    dueDay: '2026-11-05',
    current: { status: 'settled', balanceCents: 0, dueDay: '2026-11-05', currency: 'EUR' },
  }));
  assert.equal(settled, 'Recordatorio de pago: ya no está pendiente');
  assert.equal(
    notificationTitle(notification('payment_reminder', { balanceCents: 6000, dueDay: '2026-11-05', resolution: 'cancelled' })),
    'Recordatorio de pago: ya no está pendiente'
  );
});

test('cobro nuevo: importe con dos decimales en euros', () => {
  assert.equal(plain(notificationTitle(notification('payment_created', { amount: 45.5, currency: 'EUR' }))), 'Nuevo cobro: 45,50 €');
  assert.equal(plain(money(10, 'EUR')), '10,00 €');
  assert.equal(shortDay('2026-09-01'), '1 sept');
});
