const test = require('node:test');
const assert = require('node:assert/strict');

let canSyncRows, canReorderWeeks, canReorderCards;
test.before(async () => {
  ({ canSyncRows, canReorderWeeks, canReorderCards } = await import('./planner-toolbar.util.ts'));
});

const split = (workouts) => ({ workouts: Array.from({ length: workouts }, (_, i) => ({ _id: `w${i}` })) });

test('sin microciclos no hay nada que alinear ni reordenar', () => {
  for (const splits of [[], null, undefined]) {
    assert.equal(canSyncRows(splits), false);
    assert.equal(canReorderWeeks(splits), false);
    assert.equal(canReorderCards(splits), false);
  }
});

test('con un solo microciclo: reordenar entrenamientos sí (si hay dos), lo demás no', () => {
  assert.equal(canSyncRows([split(3)]), false);
  assert.equal(canReorderWeeks([split(3)]), false);
  assert.equal(canReorderCards([split(3)]), true);
  assert.equal(canReorderCards([split(1)]), false);
});

test('dos microciclos vacíos se pueden reordenar, pero no alinear', () => {
  assert.equal(canReorderWeeks([split(0), split(0)]), true);
  assert.equal(canSyncRows([split(0), split(0)]), false);
  assert.equal(canSyncRows([split(2), split(2)]), true);
});
