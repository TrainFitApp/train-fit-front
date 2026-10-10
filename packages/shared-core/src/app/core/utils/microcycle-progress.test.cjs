const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09: «Microciclo 0 de 1» al empezar una rutina.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { currentMicrocycleNumber, isSplitFinished } = loadFromSource(__filename, __dirname, {
  currentMicrocycleNumber: 'src/app/core/utils/microcycle-progress.util',
  isSplitFinished: 'src/app/core/utils/microcycle-progress.util',
});

const pending = { workouts: [{}, {}] };
const done = { workouts: [{ date: '2026-10-01' }, { rest: true }, { isPlannedRestDay: true }] };

test('al empezar es el 1, nunca el 0', () => {
  assert.equal(currentMicrocycleNumber([pending]), 1);
  assert.equal(currentMicrocycleNumber([pending, pending, pending]), 1);
});

test('con microciclos terminados, el siguiente; con todos, el último', () => {
  assert.equal(currentMicrocycleNumber([done, pending, pending]), 2);
  assert.equal(currentMicrocycleNumber([done, done]), 2);
});

test('un microciclo vacío no cuenta como terminado; sin microciclos, 0', () => {
  assert.equal(isSplitFinished({ workouts: [] }), false);
  assert.equal(isSplitFinished(done), true);
  assert.equal(currentMicrocycleNumber([]), 0);
  assert.equal(currentMicrocycleNumber(null), 0);
});
