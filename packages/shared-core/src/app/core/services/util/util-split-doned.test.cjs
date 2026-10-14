const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Un microciclo sin entrenamientos no cuenta como terminado: si contaba, el
// mesociclo del cliente ofrecía «añadir otro microciclo» con el último vacío.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { UtilService } = loadFromSource(__filename, __dirname, {
  UtilService: 'src/app/core/services/util/util.service',
});

const service = Object.create(UtilService.prototype);

test('isSplitDoned: microciclo sin entrenamientos no está terminado', () => {
  assert.equal(service.isSplitDoned({ workouts: [] }), false);
  assert.equal(service.isSplitDoned({}), false);
  assert.equal(service.isSplitDoned(null), false);
});

test('isSplitDoned: terminado con todos hechos, saltados o de descanso', () => {
  assert.equal(service.isSplitDoned({ workouts: [{ date: '2026-10-01' }, { rest: true }, { isPlannedRestDay: true }] }), true);
});

test('isSplitDoned: con un entrenamiento pendiente no está terminado', () => {
  assert.equal(service.isSplitDoned({ workouts: [{ date: '2026-10-01' }, {}] }), false);
});
