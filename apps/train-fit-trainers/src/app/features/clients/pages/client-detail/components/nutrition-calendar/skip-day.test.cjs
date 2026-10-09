const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// «Marcar … como día saltado» solo se ofrece en días dentro de una fase de
// dieta (fuera, el backend responde 400) y que no estén saltados ya.

const { canSkipDate } = loadFromSource(
  __filename,
  __dirname,
  { canSkipDate: './skip-day.util' },
  { app: 'train-fit-trainers' }
);

const closed = { startDate: '2026-09-01', endDate: '2026-09-30' };
const openEnded = { startDate: '2026-10-05', endDate: null };

test('día dentro de una fase cerrada, incluidos sus extremos', () => {
  assert.equal(canSkipDate('2026-09-01', [closed], false), true);
  assert.equal(canSkipDate('2026-09-15', [closed], false), true);
  assert.equal(canSkipDate('2026-09-30', [closed], false), true);
});

test('día de una fase indefinida, también más adelante', () => {
  assert.equal(canSkipDate('2026-10-05', [openEnded], false), true);
  assert.equal(canSkipDate('2027-01-20', [openEnded], false), true);
});

test('día sin fase: entre dos fases, antes de la primera o sin ninguna', () => {
  assert.equal(canSkipDate('2026-10-02', [closed, openEnded], false), false);
  assert.equal(canSkipDate('2026-08-31', [closed, openEnded], false), false);
  assert.equal(canSkipDate('2026-09-15', [], false), false);
});

test('día ya saltado: no se ofrece otra vez', () => {
  assert.equal(canSkipDate('2026-09-15', [closed], true), false);
});

test('sin día elegido no se ofrece', () => {
  assert.equal(canSkipDate('', [closed], false), false);
});
