const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Constructor de dietas: abrir una comida y salir sin añadir nada (o borrar
// todos sus alimentos) la deja vacía, sin opciones fantasma que luego
// bloqueen el guardado con "Menú 1 · Comida: no tiene alimentos".

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { filledAlternatives, isMissingQuantity, pruneEmptyAlternatives } = loadFromSource(
  __filename,
  __dirname,
  {
    filledAlternatives: 'src/app/features/diet-templates/utils/meal-alternatives',
    isMissingQuantity: 'src/app/features/diet-templates/utils/meal-alternatives',
    pruneEmptyAlternatives: 'src/app/features/diet-templates/utils/meal-alternatives',
  },
  { app: 'train-fit-trainers' },
);

const food = { productId: 'p', quantity: 100 };

test('el hueco que deja abrir el editor de una celda vacía no cuenta', () => {
  const meal = { slot: 'Comida', alternatives: [{ label: '', items: [] }] };
  assert.deepEqual(filledAlternatives(meal), []);
  pruneEmptyAlternatives(meal);
  assert.deepEqual(meal.alternatives, []);
});

test('se quedan solo las opciones con alimentos, en su orden', () => {
  const meal = {
    slot: 'Cena',
    alternatives: [
      { label: 'nueva', items: [] },
      { label: 'A', items: [food] },
      { label: 'B', items: [{ recipeId: 'r' }] },
    ],
  };
  assert.deepEqual(filledAlternatives(meal).map((alt) => alt.label), ['A', 'B']);
  pruneEmptyAlternatives(meal);
  assert.deepEqual(meal.alternatives.map((alt) => alt.label), ['A', 'B']);
});

test('borrar todos los alimentos de la única opción vacía la comida', () => {
  const meal = { slot: 'Desayuno', alternatives: [{ label: '', items: [food] }] };
  meal.alternatives[0].items.splice(0, 1);
  pruneEmptyAlternatives(meal);
  assert.deepEqual(meal.alternatives, []);
});

test('un alimento aún sin elegir sigue contando (lo frena la validación, no se descarta)', () => {
  const meal = { slot: 'Comida', alternatives: [{ label: '', items: [{}] }] };
  assert.equal(filledAlternatives(meal).length, 1);
});

test('tolera comidas sin alternativas', () => {
  assert.deepEqual(filledAlternatives({ slot: 'Comida' }), []);
});

// Borrar los gramos de un alimento no puede acabar guardado: el editor lo
// cuenta como 0 y el producto se guardaba luego como 100 g.
test('producto sin cantidad (vacía, 0 o borrada): falta la cantidad', () => {
  assert.equal(isMissingQuantity({ productId: 'p', quantity: undefined }), true);
  assert.equal(isMissingQuantity({ productId: 'p', quantity: null }), true);
  assert.equal(isMissingQuantity({ productId: 'p', quantity: 0 }), true);
  assert.equal(isMissingQuantity({ productId: 'p', quantity: 80 }), false);
});

test('receta sin cantidad: también falta (cuenta como 0)', () => {
  assert.equal(isMissingQuantity({ recipeId: 'r', quantity: undefined }), true);
  assert.equal(isMissingQuantity({ recipeId: 'r', quantity: 250 }), false);
});

test('un hueco sin alimento elegido no es «sin cantidad»', () => {
  assert.equal(isMissingQuantity({ quantity: undefined }), false);
});
