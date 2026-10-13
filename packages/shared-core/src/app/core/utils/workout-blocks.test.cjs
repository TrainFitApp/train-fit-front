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
const SOURCE = 'src/app/core/utils/workout-blocks.util';
const { groupExercisesByBlock, hasRenderableBlocks, buildOrderItems, moveOrderItem, moveOrderItemExercise, orderFromItems } =
  loadFromSource(__filename, __dirname, {
    groupExercisesByBlock: SOURCE,
    hasRenderableBlocks: SOURCE,
    buildOrderItems: SOURCE,
    moveOrderItem: SOURCE,
    moveOrderItemExercise: SOURCE,
    orderFromItems: SOURCE,
  });

const ex = (id, blockId) => ({ _id: id, ...(blockId ? { blockId } : {}) });
const ids = (list) => list.map((e) => e._id);

test('los bloques se pintan en la posición de su primer ejercicio y conservan el orden de sus miembros', () => {
  const workout = {
    blocks: [
      { _id: 'b2', order: 1, type: 'circuit' },
      { _id: 'b1', order: 0, type: 'superset' },
    ],
    exercises: [ex('e1', 'b2'), ex('e2', 'b1'), ex('e3', 'b2'), ex('e4', 'b1')],
  };
  const groups = groupExercisesByBlock(workout);
  // b2 empieza antes (e1 está en la posición 0), aunque su `order` sea mayor.
  assert.deepEqual(groups.map((g) => g.block?._id), ['b2', 'b1']);
  assert.deepEqual(ids(groups[0].exercises), ['e1', 'e3']);
  assert.deepEqual(ids(groups[1].exercises), ['e2', 'e4']);
});

test('los sueltos quedan entre los bloques, no al final: suelto → bloque → suelto', () => {
  const workout = {
    blocks: [{ _id: 'b1', order: 0, type: 'superset' }],
    exercises: [ex('a'), ex('x1', 'b1'), ex('x2', 'b1'), ex('b')],
  };
  const groups = groupExercisesByBlock(workout);
  assert.deepEqual(groups.map((g) => g.block?._id ?? null), [null, 'b1', null]);
  assert.deepEqual(groups.map((g) => ids(g.exercises)), [['a'], ['x1', 'x2'], ['b']]);
});

test('los sueltos seguidos forman un solo grupo y cada grupo tiene una clave única', () => {
  const workout = {
    blocks: [{ _id: 'b1', order: 0 }],
    exercises: [ex('a'), ex('b'), ex('x', 'b1'), ex('c'), ex('d')],
  };
  const groups = groupExercisesByBlock(workout);
  assert.deepEqual(groups.map((g) => ids(g.exercises)), [['a', 'b'], ['x'], ['c', 'd']]);
  assert.equal(new Set(groups.map((g) => g.key)).size, groups.length, 'trackBy no puede repetirse');
});

test('un ejercicio de un bloque que ya no existe se queda suelto en su sitio, nunca se pierde', () => {
  const workout = {
    blocks: [{ _id: 'b1', order: 0 }],
    exercises: [ex('suelto'), ex('huerfano', 'borrado'), ex('dentro', 'b1')],
  };
  const groups = groupExercisesByBlock(workout);
  assert.deepEqual(groups.map((g) => ids(g.exercises)), [['suelto', 'huerfano'], ['dentro']]);
  const total = groups.reduce((n, g) => n + g.exercises.length, 0);
  assert.equal(total, workout.exercises.length, 'ningún ejercicio desaparece');
});

test('un bloque vacío se mantiene al final (el editor tiene que poder pintarlo para llenarlo)', () => {
  const groups = groupExercisesByBlock({ blocks: [{ _id: 'b1', order: 0 }], exercises: [] });
  assert.deepEqual(groups, [{ key: 'b1', block: { _id: 'b1', order: 0 }, exercises: [] }]);

  const mixed = groupExercisesByBlock({
    blocks: [{ _id: 'vacio', order: 0 }, { _id: 'b2', order: 1 }],
    exercises: [ex('a'), ex('x', 'b2')],
  });
  assert.deepEqual(mixed.map((g) => g.block?._id ?? null), [null, 'b2', 'vacio']);
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
  buildOrderItems(workout);
  assert.deepEqual(workout.blocks.map((b) => b._id), ['b', 'a']);
});

// --- Mover ejercicios y bloques --------------------------------------------------------

const sample = () => ({
  blocks: [{ _id: 'ss', order: 0, type: 'superset' }],
  exercises: [ex('a'), ex('s1', 'ss'), ex('s2', 'ss'), ex('b')],
});

test('la lista de orden: cada suelto es un elemento y cada bloque, uno entero', () => {
  const items = buildOrderItems(sample());
  assert.deepEqual(items.map((i) => i.block?._id ?? ids(i.exercises.map((e) => e.exercise))[0]), ['a', 'ss', 'b']);
  assert.deepEqual(items[1].exercises.map((e) => e.index), [1, 2]);
  assert.deepEqual(orderFromItems(items), [0, 1, 2, 3], 'sin tocar nada, la permutación es la identidad');
});

test('un bloque vacío no entra en la lista de orden', () => {
  const workout = { blocks: [{ _id: 'vacio', order: 0 }], exercises: [ex('a')] };
  assert.equal(buildOrderItems(workout).length, 1);
});

test('mover un bloque entero arrastra a todos sus ejercicios, en su orden interno', () => {
  const moved = moveOrderItem(buildOrderItems(sample()), 1, 0);
  // [ss(s1,s2), a, b] → originales 1,2,0,3
  assert.deepEqual(orderFromItems(moved), [1, 2, 0, 3]);
  const toEnd = moveOrderItem(buildOrderItems(sample()), 1, 2);
  assert.deepEqual(orderFromItems(toEnd), [0, 3, 1, 2]);
});

test('mover un suelto de un lado a otro de un bloque', () => {
  const moved = moveOrderItem(buildOrderItems(sample()), 0, 2);
  // [ss(s1,s2), b, a] → 1,2,3,0
  assert.deepEqual(orderFromItems(moved), [1, 2, 3, 0]);
});

test('reordenar dentro de un bloque no toca los demás elementos', () => {
  const items = buildOrderItems(sample());
  const moved = moveOrderItemExercise(items, 1, 0, 1);
  assert.deepEqual(orderFromItems(moved), [0, 2, 1, 3]);
  // Un suelto no tiene "dentro": sin cambios.
  assert.equal(moveOrderItemExercise(items, 0, 0, 1), items);
  // Fuera de rango: sin cambios.
  assert.equal(moveOrderItemExercise(items, 1, 0, 5), items);
});

test('no muta la lista de partida al mover', () => {
  const items = buildOrderItems(sample());
  const before = orderFromItems(items);
  moveOrderItem(items, 0, 2);
  moveOrderItemExercise(items, 1, 0, 1);
  assert.deepEqual(orderFromItems(items), before);
});

test('un bloque con miembros separados en el array se junta al reordenar (como se pinta)', () => {
  const workout = {
    blocks: [{ _id: 'ss', order: 0 }],
    exercises: [ex('s1', 'ss'), ex('a'), ex('s2', 'ss')],
  };
  const items = buildOrderItems(workout);
  assert.deepEqual(orderFromItems(items), [0, 2, 1]);
});
