const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Popover «···» de la cabecera del diario. Copiar y eliminar el día solo se
// ofrecen si hay algo que copiar o borrar, como en la tarjeta de comida. El
// back crea el día al abrir la fecha (y al eliminarlo la recarga lo vuelve a
// crear vacío), así que un día sin nada también llega con `_id`: antes bastaba
// el `_id` y el popover ofrecía copiar y eliminar un día vacío.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { ToolbarCalendarComponent, ACTION_TYPES } = loadFromSource(
  __filename,
  __dirname,
  {
    ToolbarCalendarComponent: 'src/app/features/diets/components/toolbar-calendar/toolbar-calendar.component',
    ACTION_TYPES: 'src/app/shared/constants/actions',
  },
  {
    requires: {
      '@angular/router': { Router: class {} },
      '@angular/animations': Object.fromEntries(
        ['animate', 'group', 'query', 'style', 'transition', 'trigger'].map((key) => [key, () => ({})])
      ),
    },
  }
);

const NOTE_ONLY = [ACTION_TYPES.note];
const ALL = [ACTION_TYPES.note, ACTION_TYPES.copy, ACTION_TYPES.delete];

const meal = (over = {}) => ({ customProducts: [], customRecipes: [], ...over });
const emptyDay = (over = {}) => ({
  _id: 'day-1',
  date: '2026-11-02',
  meals: Array.from({ length: 6 }, () => meal()),
  ...over,
});
const dayWithMeal = (index, over) => {
  const day = emptyDay();
  day.meals[index] = meal(over);
  return day;
};

/** Las acciones (ids, en orden) que enseña el popover para ese día. */
function offeredActions(dietDay) {
  let offered = null;
  const component = Object.create(ToolbarCalendarComponent.prototype);
  component.ACTION_TYPES = ACTION_TYPES;
  component.dietDay = dietDay;
  component.ionicUtilService = {
    showPopover: (options) => {
      offered = options.componentProps.actionsPopover.map((action) => action.id);
      // Nadie elige nada: el popover se queda abierto.
      return new Promise(() => {});
    },
  };
  component.openMacrosOptions({});
  return offered;
}

test('un día vacío, aunque ya exista, solo ofrece la nota', () => {
  assert.deepEqual(offeredActions(emptyDay()), NOTE_ONLY);
});

test('un día sin guardar, aunque tenga alimentos, solo ofrece la nota', () => {
  const unsaved = dayWithMeal(0, { customProducts: [{ _id: 'cp-1' }] });
  delete unsaved._id;
  assert.deepEqual(offeredActions(unsaved), NOTE_ONLY);
});

test('sin día solo ofrece la nota', () => {
  assert.deepEqual(offeredActions(undefined), NOTE_ONLY);
  assert.deepEqual(offeredActions(null), NOTE_ONLY);
});

test('con un alimento ofrece nota, copiar y eliminar, la destructiva la última', () => {
  assert.deepEqual(offeredActions(dayWithMeal(1, { customProducts: [{ _id: 'cp-1' }] })), ALL);
});

test('con una receta ofrece nota, copiar y eliminar', () => {
  assert.deepEqual(offeredActions(dayWithMeal(4, { customRecipes: [{ _id: 'cr-1' }] })), ALL);
});

test('con solo una nota, del día o de una comida, ofrece nota, copiar y eliminar', () => {
  assert.deepEqual(offeredActions(emptyDay({ notes: 'Cena fuera' })), ALL);
  assert.deepEqual(offeredActions(dayWithMeal(2, { notes: 'Sin sal' })), ALL);
});

test('al quedarse sin alimentos vuelve a ofrecer solo la nota', () => {
  const day = dayWithMeal(0, { customProducts: [{ _id: 'cp-1' }] });
  assert.deepEqual(offeredActions(day), ALL);
  day.meals[0].customProducts.splice(0, 1);
  assert.deepEqual(offeredActions(day), NOTE_ONLY);
});
