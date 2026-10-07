const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Lo siguiente que le toca al cliente en la tarjeta del resumen: el
// siguiente entreno o un descanso pautado, contado desde el día del último
// entreno hecho.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { nextTrainingDay } = loadFromSource(__filename, __dirname, {
  nextTrainingDay: 'src/app/core/utils/training-day.util',
});

// Instante a media tarde del día local, para no depender de la zona.
const at = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 18, 30);
};
const done = (id, iso) => ({ _id: id, date: at(iso) });
const pending = (id) => ({ _id: id });
const restDay = (id) => ({ _id: id, isPlannedRestDay: true });
const skipped = (id) => ({ _id: id, rest: true });
const split = (...workouts) => ({ workouts });
const nextId = (splits, today) => nextTrainingDay(splits, today)?._id ?? null;

test('Piernas hecho hoy y descanso al final del microciclo: lo siguiente es el descanso', () => {
  const splits = [
    split(done('empujes', '2026-10-06'), done('piernas', '2026-10-07'), restDay('descanso')),
    split(pending('empujes-m2'), pending('piernas-m2'), restDay('descanso-m2')),
  ];
  assert.equal(nextId(splits, '2026-10-07'), 'descanso');
  // El 8 es el descanso: lo siguiente es el entreno del microciclo siguiente.
  assert.equal(nextId(splits, '2026-10-08'), 'empujes-m2');
  assert.equal(nextId(splits, '2026-10-09'), 'empujes-m2');
});

// Push el lunes 5; dos descansos y Pull.
const twoRests = [split(done('push', '2026-10-05'), restDay('r1'), restDay('r2'), pending('pull'))];

test('con varios descansos, cada día de descanso apunta al que viene detrás', () => {
  assert.equal(nextId(twoRests, '2026-10-05'), 'r1');
  assert.equal(nextId(twoRests, '2026-10-06'), 'r2');
  assert.equal(nextId(twoRests, '2026-10-07'), 'pull');
});

test('si llega tarde, los descansos ya han pasado y lo siguiente es el entreno', () => {
  assert.equal(nextId(twoRests, '2026-10-20'), 'pull');
});

test('sin descansos delante, lo siguiente es el entreno', () => {
  const splits = [split(done('push', '2026-10-05'), pending('pull'))];
  assert.equal(nextId(splits, '2026-10-05'), 'pull');
  assert.equal(nextId(splits, '2026-10-06'), 'pull');
});

test('solo cuentan los descansos pegados al siguiente entreno', () => {
  const splits = [split(done('push', '2026-10-05'), restDay('r1'), done('pull', '2026-10-07'), restDay('r2'), pending('legs'))];
  assert.equal(nextId(splits, '2026-10-07'), 'r2');
  assert.equal(nextId(splits, '2026-10-08'), 'legs');
});

test('cuenta desde el último entreno con fecha: un saltado no guarda fecha', () => {
  const splits = [split(done('push', '2026-10-05'), skipped('pull'), restDay('r1'), pending('legs'))];
  assert.equal(nextId(splits, '2026-10-05'), 'r1');
  assert.equal(nextId(splits, '2026-10-06'), 'legs');
});

test('rutina sin ningún entreno hecho: lo siguiente es el entreno aunque empiece con descanso', () => {
  assert.equal(nextId([split(restDay('r1'), pending('push'))], '2026-10-07'), 'push');
});

test('un entreno con fecha posterior a hoy cuenta como hecho hoy', () => {
  assert.equal(nextId(twoRests, '2026-10-04'), 'r1');
});

test('rutina terminada o vacía: nada que mostrar', () => {
  assert.equal(nextTrainingDay([split(done('push', '2026-10-05'), restDay('r1'))], '2026-10-05'), null);
  assert.equal(nextTrainingDay([], '2026-10-06'), null);
  assert.equal(nextTrainingDay(undefined, '2026-10-06'), null);
});
