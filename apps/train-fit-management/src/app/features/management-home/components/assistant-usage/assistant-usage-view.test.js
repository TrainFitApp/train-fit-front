const test = require('node:test');
const assert = require('node:assert/strict');

// Cuentas de la pantalla de consumo del asistente (assistant-usage-view.util.ts).

let util;

test.before(async () => {
  util = await import('./assistant-usage-view.util.ts');
});

test('shiftMonth: hacia atrás y hacia delante, también al cruzar el año', () => {
  assert.equal(util.shiftMonth('2026-10', -1), '2026-09');
  assert.equal(util.shiftMonth('2026-01', -1), '2025-12');
  assert.equal(util.shiftMonth('2026-12', 1), '2027-01');
  assert.equal(util.shiftMonth('2026-10', 0), '2026-10');
});

test('historyBars: cada mes frente al que más gastó; sin gasto, todas a cero', () => {
  assert.deepEqual(
    util.historyBars([{ month: '2026-09', atp: 500 }, { month: '2026-10', atp: 2000 }]).map((entry) => entry.width),
    [25, 100],
  );
  assert.deepEqual(util.historyBars([{ month: '2026-10', atp: 0 }]).map((entry) => entry.width), [0]);
  assert.deepEqual(util.historyBars([]), []);
});
