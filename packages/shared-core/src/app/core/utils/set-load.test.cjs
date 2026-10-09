const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Carga pautada y levantada por separado (QA 2026-10-09, A2: pautado 40 kg,
// el cliente apunta 42,5 y la pauta desaparecía).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { prescribedWeight, liftedWeight, shownWeight, loggedWeight } = loadFromSource(__filename, __dirname, {
  prescribedWeight: 'src/app/core/utils/set-load.util',
  liftedWeight: 'src/app/core/utils/set-load.util',
  shownWeight: 'src/app/core/utils/set-load.util',
  loggedWeight: 'src/app/core/utils/set-load.util',
});

test('pautada y levantada se leen cada una de su campo', () => {
  const set = { expectedWeight: 40, weight: 42.5, doned: true };
  assert.equal(prescribedWeight(set), 40);
  assert.equal(liftedWeight(set), 42.5);
  assert.equal(prescribedWeight({ weight: 40 }), null, 'weight nunca es la pauta');
  assert.equal(liftedWeight({ expectedWeight: 40 }), null, 'ni expectedWeight lo levantado');
  assert.equal(prescribedWeight(null), null);
});

test('en una tabla: hecha enseña lo levantado; sin hacer, lo pautado', () => {
  assert.equal(shownWeight({ expectedWeight: 40, weight: 42.5, doned: true }), 42.5);
  assert.equal(shownWeight({ expectedWeight: 40, doned: false }), 40);
  assert.equal(shownWeight({ expectedWeight: 40, weight: 30 }), 40, 'un dato a medias no tapa la pauta');
  assert.equal(shownWeight({ doned: true, expectedWeight: 40 }), null, 'hecha sin carga apuntada: sin carga');
});

test('al marcarla hecha con la casilla vacía se guarda la carga pautada', () => {
  const set = { expectedWeight: 40 };
  assert.equal(loggedWeight(null, set, true), 40);
  assert.equal(loggedWeight('', set, true), 40);
  assert.equal(loggedWeight(42.5, set, true), 42.5, 'lo escrito manda');
  assert.equal(loggedWeight(0, set, true), 0, 'un cero es un dato');
  assert.equal(loggedWeight(null, set, false), null, 'sin marcarla no se inventa nada');
  assert.equal(loggedWeight(null, {}, true), null);
  assert.equal(loggedWeight('37.5', set, false), 37.5);
});
