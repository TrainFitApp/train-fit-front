const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource, angularCoreStub } = require('../../../../../../../tests/support/ng-harness.cjs');

// «Añadir a …» del panel de detalle: lo que se añade tiene que ser lo que
// enseña el panel. En una receta sin cantidad las macros son las de la receta
// completa, así que se añade completa (null), no 100 g.

const dismissed = [];
const collaborators = {
  instant: (key) => key,
  dismiss: (...args) => {
    dismissed.push(args);
    return Promise.resolve(true);
  },
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

test('producto sin cantidad: 100 g; con cantidad, esa', () => {
  const product = { _id: 'p1', name: 'Arroz' };
  assert.deepEqual(addFrom({ product, quantity: null }), [100]);
  assert.deepEqual(addFrom({ product, quantity: 80 }), [80]);
});

test('añadir cierra el propio panel', () => {
  dismissed.length = 0;
  addFrom({ product: { _id: 'p1', name: 'Arroz' }, quantity: 80 });
  assert.equal(dismissed.length, 1);
});
