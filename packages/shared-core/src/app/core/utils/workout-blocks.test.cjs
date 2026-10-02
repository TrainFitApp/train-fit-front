const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Agrupado de ejercicios por bloque (superserie, circuito…). Es la utilidad
// ÚNICA que comparten la sesión del cliente y el editor del entrenador: si
// divergiera, uno vería una superserie y el otro dos ejercicios sueltos.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { groupExercisesByBlock, hasRenderableBlocks } = loadFromSource(__filename, __dirname, {
  groupExercisesByBlock: 'src/app/core/utils/workout-blocks.util',
  hasRenderableBlocks: 'src/app/core/utils/workout-blocks.util',
});

const ex = (id, blockId) => ({ _id: id, ...(blockId ? { blockId } : {}) });

test('agrupa por bloque en el orden de los bloques y conserva el orden de los ejercicios', () => {
  const workout = {
    blocks: [
      { _id: 'b2', order: 1, type: 'circuit' },
      { _id: 'b1', order: 0, type: 'superset' },
    ],
    exercises: [ex('e1', 'b2'), ex('e2', 'b1'), ex('e3', 'b2'), ex('e4', 'b1')],
  };
  const groups = groupExercisesByBlock(workout);
  assert.deepEqual(groups.map((g) => g.block?._id), ['b1', 'b2']);
  assert.deepEqual(groups[0].exercises.map((e) => e._id), ['e2', 'e4']);
  assert.deepEqual(groups[1].exercises.map((e) => e._id), ['e1', 'e3']);
});

test('los ejercicios sueltos o de un bloque que ya no existe van al final, nunca se pierden', () => {
  const workout = {
    blocks: [{ _id: 'b1', order: 0 }],
    exercises: [ex('suelto'), ex('huerfano', 'borrado'), ex('dentro', 'b1')],
  };
  const groups = groupExercisesByBlock(workout);
  assert.equal(groups.length, 2);
  assert.equal(groups[1].block, null);
  assert.deepEqual(groups[1].exercises.map((e) => e._id), ['suelto', 'huerfano']);
  const total = groups.reduce((n, g) => n + g.exercises.length, 0);
  assert.equal(total, workout.exercises.length, 'ningún ejercicio desaparece');
});

test('un bloque vacío se mantiene (el editor tiene que poder pintarlo para llenarlo)', () => {
  const groups = groupExercisesByBlock({ blocks: [{ _id: 'b1', order: 0 }], exercises: [] });
  assert.deepEqual(groups, [{ block: { _id: 'b1', order: 0 }, exercises: [] }]);
});

test('sin bloques: un solo grupo plano; sin entreno: nada', () => {
  assert.deepEqual(groupExercisesByBlock({ exercises: [ex('a'), ex('b')] }).map((g) => g.block), [null]);
  assert.deepEqual(groupExercisesByBlock(null), []);
  assert.equal(hasRenderableBlocks({ blocks: [] }), false);
  assert.equal(hasRenderableBlocks({ blocks: [{ _id: 'x' }] }), true);
  assert.equal(hasRenderableBlocks(undefined), false);
});

test('no muta el entreno de entrada (el orden de blocks original se respeta)', () => {
  const workout = { blocks: [{ _id: 'b', order: 2 }, { _id: 'a', order: 1 }], exercises: [] };
  groupExercisesByBlock(workout);
  assert.deepEqual(workout.blocks.map((b) => b._id), ['b', 'a']);
});
