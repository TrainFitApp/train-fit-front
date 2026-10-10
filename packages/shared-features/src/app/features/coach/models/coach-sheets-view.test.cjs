const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');

const bundled = buildSync({
  entryPoints: [path.join(__dirname, 'coach-sheets-view.ts')],
  tsconfig: path.resolve(__dirname, '../../../../../../../apps/train-fit-front/tsconfig.json'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
});
const compiled = new Module(__filename);
compiled._compile(bundled.outputFiles[0].text, __filename);
const { civilDayLabel, instantDayLabel, chargeState, chargeDueKey, isPartial, isPartlyCancelled, feeFrequency, initials, scopeLabelKey, scopeIcon } =
  compiled.exports;

test('día civil: sin año si es del año de hoy, con año si no; nunca se mueve de día', () => {
  assert.equal(civilDayLabel('2026-09-01', '2026-10-09'), '1 sept');
  assert.equal(civilDayLabel('2025-12-31', '2026-10-09'), '31 dic 2025');
  assert.equal(civilDayLabel('2026-01-01'), '1 ene 2026', 'sin hoy, con año');
  assert.equal(civilDayLabel(null, '2026-10-09'), '');
  assert.equal(civilDayLabel('ayer', '2026-10-09'), '');
});

test('instante: día con año; inválido o vacío, nada', () => {
  assert.match(instantDayLabel('2026-03-03T12:00:00.000Z'), /^3 mar 2026$/);
  assert.equal(instantDayLabel('no-es-fecha'), '');
  assert.equal(instantDayLabel(null), '');
});

test('estado del cobro: pagado y anulado mandan sobre la fecha', () => {
  assert.equal(chargeState({ status: 'settled', temporal: 'closed' }), 'paid');
  assert.equal(chargeState({ status: 'cancelled', temporal: 'closed' }), 'cancelled');
  assert.equal(chargeState({ status: 'open', temporal: 'overdue' }), 'overdue');
  assert.equal(chargeState({ status: 'open', temporal: 'due_today' }), 'due_today');
  assert.equal(chargeState({ status: 'open', temporal: 'upcoming' }), 'upcoming');
});

// QA 2026-10-09: lo pagado y lo anulado seguían con «Vence hoy».
test('vencimiento: lo abierto vence; lo pagado o anulado solo dice cuándo vencía', () => {
  const today = '2026-10-09';
  assert.equal(chargeDueKey({ status: 'open', dueDay: today }, today), 'COACH_SHEETS.CHARGE_DUE_TODAY');
  assert.equal(chargeDueKey({ status: 'open', dueDay: '2026-10-01' }, today), 'COACH_SHEETS.DUE_PAST');
  assert.equal(chargeDueKey({ status: 'open', dueDay: '2026-11-05' }, today), 'COACH_SHEETS.DUE_FUTURE');
  for (const status of ['settled', 'cancelled']) {
    for (const dueDay of [today, '2026-10-01', '2026-11-05']) {
      assert.equal(chargeDueKey({ status, dueDay }, today), 'COACH_SHEETS.DUE_DATE', `${status} ${dueDay}`);
    }
  }
});

test('pago parcial: abierto, con algo pagado y algo pendiente', () => {
  assert.equal(isPartial({ status: 'open', receivedCents: 2000, balanceCents: 4000 }), true);
  assert.equal(isPartial({ status: 'open', receivedCents: 0, balanceCents: 6000 }), false);
  assert.equal(isPartial({ status: 'settled', receivedCents: 6000, balanceCents: 0 }), false);
  assert.equal(isPartial({ status: 'cancelled', receivedCents: 2000, balanceCents: 0 }), false);
});

test('anulado tras pagar una parte: no se tacha lo pagado', () => {
  assert.equal(isPartlyCancelled({ status: 'cancelled', receivedCents: 2000 }), true);
  assert.equal(isPartlyCancelled({ status: 'cancelled', receivedCents: 0 }), false);
  assert.equal(isPartlyCancelled({ status: 'settled', receivedCents: 6000 }), false);
  assert.equal(isPartlyCancelled({ status: 'open', receivedCents: 2000 }), false);
});

test('frecuencia de la cuota', () => {
  assert.deepEqual(feeFrequency({ unit: 'month', interval: 1 }), { key: 'COACH_SHEETS.FEE_MONTHLY', params: { n: 1 } });
  assert.deepEqual(feeFrequency({ unit: 'month', interval: 3 }), { key: 'COACH_SHEETS.FEE_EVERY_MONTHS', params: { n: 3 } });
  assert.deepEqual(feeFrequency({ unit: 'week', interval: 1 }), { key: 'COACH_SHEETS.FEE_WEEKLY', params: { n: 1 } });
  assert.deepEqual(feeFrequency({ unit: 'week', interval: 2 }), { key: 'COACH_SHEETS.FEE_EVERY_WEEKS', params: { n: 2 } });
});

test('iniciales y ámbitos', () => {
  assert.equal(initials('Ana  Bermúdez López'), 'AB');
  assert.equal(initials(''), '?');
  assert.equal(initials(null), '?');
  assert.equal(scopeLabelKey('training'), 'ONBOARDING.SCOPE_TRAINING');
  assert.equal(scopeLabelKey('nutrition'), 'ONBOARDING.SCOPE_NUTRITION');
  assert.equal(scopeIcon('training'), 'barbell-outline');
  assert.equal(scopeIcon('nutrition'), 'nutrition-outline');
});
