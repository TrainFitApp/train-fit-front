const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (M6): la ficha de un alimento pautado pintaba los gramos de
// cada micronutriente con la etiqueta «mg» (avena 30 g: «Calcio 0,02 mg»).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { PautadoItemViewComponent, gramsToUnit, CustomProductService } = loadFromSource(__filename, __dirname, {
  PautadoItemViewComponent: 'src/app/features/diets/components/pautado-item-view/pautado-item-view.component',
  gramsToUnit: 'src/app/features/diets/components/pautado-item-view/pautado-item-view.component',
  CustomProductService: 'src/app/core/services/custom-product/custom-product.service',
});

test('conversión de gramos a la unidad de cada nutriente', () => {
  assert.equal(gramsToUnit(0.015, 'mg'), 15);
  assert.equal(gramsToUnit(0.000002, 'µg'), 2);
  assert.equal(gramsToUnit(1.2, 'g'), 1.2);
});

test('avena 30 g con 0,05 g de calcio por 100 g: 15 mg, no 0,02', () => {
  const component = Object.create(PautadoItemViewComponent.prototype);
  Object.assign(component, {
    customProductService: new CustomProductService(null, null),
    translate: { instant: (key) => key },
  });
  const avena = {
    quantity: 30,
    product: { _id: 'p1', name: 'Avena', calcium100g: 0.05, iron100g: 0.0042, vitaminD100g: 0.000001, fiber100g: 10 },
  };
  const rows = Object.fromEntries(component.buildProductExtraNutrition(avena).map((row) => [row.label, row]));
  assert.ok(Math.abs(rows['ADD_PRODUCT.CALCIUM'].value - 15) < 1e-9);
  assert.equal(rows['ADD_PRODUCT.CALCIUM'].unit, 'mg');
  assert.ok(Math.abs(rows['ADD_PRODUCT.IRON'].value - 1.26) < 1e-9);
  assert.ok(Math.abs(rows['ADD_PRODUCT.VIT_D'].value - 0.3) < 1e-9);
  assert.equal(rows['ADD_PRODUCT.VIT_D'].unit, 'µg');
  assert.equal(rows['ADD_PRODUCT.FIBER'].value, 3, 'los de gramos, tal cual');
});
