const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource, angularCoreStub } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// Editor de una comida de la dieta: vaciar la cantidad de un alimento
// (producto o receta) deshabilita «Listo» y avisa de cuál falta; antes se
// guardaba el alimento vacío. Una receta elegida entera entra con sus gramos
// totales, para no quedar vacía nada más añadirla.

const translate = { currentLang: 'es', instant: (key) => key };
const { DayMealEditorModalComponent } = loadFromSource(
  __filename,
  __dirname,
  { DayMealEditorModalComponent: './day-meal-editor-modal.component' },
  {
    app: 'train-fit-trainers',
    requires: { '@angular/core': { ...angularCoreStub(), inject: () => translate } },
  }
);

const zero = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
const customProductService = { getMacros: () => zero, getCustomProductInfo: () => 0 };
// Receta de 350 g en crudo: sin cantidad la porción es 0, como en RecipeService.
const recipeService = {
  calculateCustomRecipeTotals: (_recipe, customRecipe) => ({
    ingredients: [],
    portionBaseline: 350,
    portionRatio: customRecipe?.quantity ? customRecipe.quantity / 350 : 0,
    portionMacros: zero,
  }),
};

function editor(items) {
  const dismissed = [];
  const modalController = { dismiss: (...args) => dismissed.push(args) };
  const component = new DayMealEditorModalComponent(modalController, {}, {}, customProductService, recipeService);
  component.meal = { slot: 'Almuerzo', alternatives: [{ label: '', items }] };
  return { component, dismissed };
}

test('producto con la cantidad vaciada: aviso, «Listo» deshabilitado y no cierra', () => {
  const rice = { productId: 'p1', productName: 'Arroz', quantity: 80 };
  const { component, dismissed } = editor([rice]);
  assert.equal(component.canFinish, true);
  assert.equal(component.itemWithoutQuantity, undefined);

  component.onQuantityChange(rice, null);
  assert.equal(component.itemWithoutQuantity, rice);
  assert.equal(component.canFinish, false);
  component.finish();
  assert.equal(dismissed.length, 0);

  component.onQuantityChange(rice, '120');
  assert.equal(component.canFinish, true);
  component.finish();
  assert.equal(dismissed.length, 1);
});

test('receta con la cantidad vaciada: también bloquea', () => {
  const chicken = { recipeId: 'r1', recipeName: 'Pollo a la vinagreta', quantity: 250, recipe: { _id: 'r1' } };
  const { component } = editor([chicken]);
  component.onQuantityChange(chicken, '');
  assert.equal(component.itemWithoutQuantity, chicken);
  assert.equal(component.canFinish, false);
});

test('basta un alimento sin cantidad en cualquier opción para bloquear', () => {
  const { component } = editor([{ productId: 'p1', productName: 'Arroz', quantity: 80 }]);
  component.meal.alternatives.push({ label: '', items: [{ productId: 'p2', productName: 'Pollo', quantity: undefined }] });
  assert.equal(component.canFinish, false);
});

test('receta añadida entera (snippet sin cantidad): entra con sus gramos totales', () => {
  const { component } = editor([]);
  component.insertSnippet(0, { customProducts: [], customRecipes: [{ recipe: { _id: 'r1', name: 'Pollo a la vinagreta' }, quantity: null }] });
  const [item] = component.meal.alternatives[0].items;
  assert.equal(item.quantity, 350);
  assert.equal(component.canFinish, true);
});
