const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');

const bundled = buildSync({
  entryPoints: [path.join(__dirname, 'coach-notification-view.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
});
const compiled = new Module(__filename);
compiled._compile(bundled.outputFiles[0].text, __filename);
const { notificationIcon, notificationRoute, notificationTitle, notificationTrainerName } = compiled.exports;

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
