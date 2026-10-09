const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource, angularCoreStub } = require('../../../../../../../tests/support/ng-harness.cjs');

// «Añadir a …» del panel de detalle: lo que se añade tiene que ser lo que
// enseña el panel. En una receta sin cantidad las macros son las de la receta
// completa, así que se añade completa (null), no 100 g.

const dismissed = [];
// Lo que devuelva el alta/edición de producto (CreateProductPage) al cerrarse.
let editResult = { role: 'cancel' };
const collaborators = {
  instant: (key) => key,
  dismiss: (...args) => {
    dismissed.push(args);
    return Promise.resolve(true);
  },
  create: () => Promise.resolve({ present: () => Promise.resolve(), onDidDismiss: () => Promise.resolve(editResult) }),
  getMacros: () => ({ kcal: 0, protein: 0, carbs: 0, fat: 0 }),
  calculateCustomRecipeTotals: () => ({ portionMacros: { kcal: 0, protein: 0, carbs: 0, fat: 0 } }),
  customProductName: (customProduct) => customProduct.product?.name || customProduct.name || '',
};
const { ProductDetailPanelComponent } = loadFromSource(
  __filename,
  __dirname,
  { ProductDetailPanelComponent: './product-detail-panel.component' },
  {
    app: 'train-fit-trainers',
    requires: { '@angular/core': { ...angularCoreStub(), inject: () => collaborators } },
  }
);

function addFrom({ product, recipe, quantity }) {
  const panel = new ProductDetailPanelComponent();
  Object.assign(panel, { product, recipe, quantity });
  const added = [];
  panel.onAdd = (value) => added.push(value);
  panel.addToTarget();
  return added;
}

test('receta sin cantidad: se añade completa (null), como enseñan sus macros', () => {
  assert.deepEqual(addFrom({ recipe: { _id: 'r1', name: 'Tortilla' }, quantity: null }), [null]);
});

test('receta con cantidad: se añade esa cantidad', () => {
  assert.deepEqual(addFrom({ recipe: { _id: 'r1', name: 'Tortilla' }, quantity: 250 }), [250]);
});

test('producto con cantidad: se añade esa', () => {
  assert.deepEqual(addFrom({ product: { _id: 'p1', name: 'Arroz' }, quantity: 80 }), [80]);
});

// Borrar la cantidad de un producto deshabilita «Añadir a …» (antes se
// colaba como 100 g); una receta sin cantidad sí se puede añadir, entera.
test('producto sin cantidad: no se puede añadir ni se añade', () => {
  const panel = new ProductDetailPanelComponent();
  Object.assign(panel, { product: { _id: 'p1', name: 'Arroz' }, quantity: 80 });
  panel.onQtyChange('');
  assert.equal(panel.quantity, null);
  assert.equal(panel.canAdd, false);
  assert.deepEqual(addFrom({ product: { _id: 'p1', name: 'Arroz' }, quantity: null }), []);

  panel.onQtyChange('120');
  assert.equal(panel.canAdd, true);
});

test('receta sin cantidad: se puede añadir', () => {
  const panel = new ProductDetailPanelComponent();
  Object.assign(panel, { recipe: { _id: 'r1', name: 'Tortilla' }, quantity: null });
  assert.equal(panel.canAdd, true);
});

test('añadir cierra el propio panel', () => {
  dismissed.length = 0;
  addFrom({ product: { _id: 'p1', name: 'Arroz' }, quantity: 80 });
  assert.equal(dismissed.length, 1);
});

// Biblioteca › Alimentos: la ficha de una receta cuenta qué lleva y cómo se
// hace, no solo sus macros.
test('receta: ingredientes con sus gramos (también una adición rápida) y un paso por línea', () => {
  const panel = new ProductDetailPanelComponent();
  panel.recipe = {
    _id: 'r1',
    name: 'Tostada del coach',
    customProducts: [
      { quantity: 60, product: { _id: 'p1', name: 'Pan integral' } },
      { quantity: 15, product: { _id: 'p2', name: 'Crema de cacahuete' } },
      { quantity: 1, name: 'Canela al gusto', quickAdd: true },
    ],
    description: 'Tuesta el pan\n\n  Unta la crema  \nEspolvorea canela',
  };
  panel.quantity = null;
  panel.ngOnInit();
  assert.deepEqual(panel.ingredientRows, [
    { name: 'Pan integral', quantity: 60 },
    { name: 'Crema de cacahuete', quantity: 15 },
    { name: 'Canela al gusto', quantity: 1 },
  ]);
  assert.deepEqual(panel.preparationSteps, ['Tuesta el pan', 'Unta la crema', 'Espolvorea canela']);
});

test('producto: ni ingredientes ni pasos de receta', () => {
  const panel = new ProductDetailPanelComponent();
  panel.product = { _id: 'p1', name: 'Arroz' };
  panel.ngOnInit();
  assert.deepEqual(panel.ingredientRows, []);
  assert.deepEqual(panel.preparationSteps, []);
});

test('editar el producto avisa a quien abrió la ficha con el producto guardado; cancelar, no', async () => {
  const panel = new ProductDetailPanelComponent();
  panel.product = { _id: 'p1', name: 'Arroz', userId: 'trainer-1' };
  const edited = [];
  panel.onProductEdited = (product) => edited.push(product);

  editResult = { role: 'cancel' };
  await panel.editProduct();
  assert.deepEqual(edited, []);

  const saved = { _id: 'p1', name: 'Arroz basmati', userId: 'trainer-1' };
  editResult = { role: 'confirm', data: { product: saved } };
  await panel.editProduct();
  assert.deepEqual(edited, [saved]);
  assert.equal(panel.product, saved);
});
