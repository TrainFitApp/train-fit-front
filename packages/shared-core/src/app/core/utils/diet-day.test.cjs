const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// ¿Hay algo en el día que copiar o borrar? El back crea el día al abrir la
// fecha, así que un día vacío también llega con `_id`: lo que cuenta es lo que
// hay dentro (alimentos, recetas o notas), no que el documento exista.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { dietDayHasContent } = loadFromSource(__filename, __dirname, {
  dietDayHasContent: 'src/app/core/utils/diet-day.util',
});

const meal = (over = {}) => ({ customProducts: [], customRecipes: [], ...over });
const day = (meals, over = {}) => ({ _id: 'day-1', date: '2026-11-02', meals, ...over });
const emptyMeals = () => Array.from({ length: 6 }, () => meal());
const withMeal = (index, over) => {
  const meals = emptyMeals();
  meals[index] = meal(over);
  return day(meals);
};

test('sin día no hay contenido', () => {
  assert.equal(dietDayHasContent(null), false);
  assert.equal(dietDayHasContent(undefined), false);
});

test('un día recién abierto, con sus seis comidas vacías, no tiene contenido', () => {
  assert.equal(dietDayHasContent(day(emptyMeals())), false);
  assert.equal(dietDayHasContent(day(emptyMeals(), { notes: '' })), false);
});

test('un día sin comidas, o con comidas sin listas, no tiene contenido', () => {
  assert.equal(dietDayHasContent(day(undefined)), false);
  assert.equal(dietDayHasContent(day([])), false);
  assert.equal(dietDayHasContent(day([{}, {}])), false);
});

test('un alimento o una receta en cualquier comida es contenido', () => {
  assert.equal(dietDayHasContent(withMeal(0, { customProducts: [{ _id: 'cp-1' }] })), true);
  assert.equal(dietDayHasContent(withMeal(5, { customRecipes: [{ _id: 'cr-1' }] })), true);
});

test('lo pautado por el profesional también es contenido', () => {
  assert.equal(dietDayHasContent(withMeal(2, { customProducts: [{ _id: 'cp-1', assignedByTrainerId: 'trainer-1' }] })), true);
});

test('una nota, del día o de una comida, es contenido', () => {
  assert.equal(dietDayHasContent(day(emptyMeals(), { notes: 'Cena fuera' })), true);
  assert.equal(dietDayHasContent(withMeal(3, { notes: 'Sin sal' })), true);
});
