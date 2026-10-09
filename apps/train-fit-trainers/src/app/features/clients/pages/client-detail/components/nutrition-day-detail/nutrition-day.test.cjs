const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// Presentación del resumen de un día (Plan › Nutrición › Día).

const { macroRows, itemStatusIcon, mealStatusIcon, isAdjusted, signedNumber } = loadFromSource(
  __filename,
  __dirname,
  {
    macroRows: './nutrition-day.util',
    itemStatusIcon: './nutrition-day.util',
    mealStatusIcon: './nutrition-day.util',
    isAdjusted: './nutrition-day.util',
    signedNumber: './nutrition-day.util',
  },
  { app: 'train-fit-trainers' }
);

const totals = (kcal, protein, carbs, fat) => ({ kcal, protein, carbs, fat });

test('macroRows: kcal y los tres macros con su diferencia tomado - pautado', () => {
  const rows = macroRows(totals(2000, 150, 200, 60), totals(2300, 120, 260, 60));
  assert.deepEqual(
    rows.map((r) => [r.key, r.unit, r.planned, r.consumed, r.delta]),
    [
      ['kcal', 'kcal', 2000, 2300, 300],
      ['protein', 'g', 150, 120, -30],
      ['carbs', 'g', 200, 260, 60],
      ['fat', 'g', 60, 60, 0],
    ]
  );
  assert.ok(rows.every((r) => r.color.startsWith('var(--tf-macro-')));
});

test('macroRows: sin nada pautado no hay desviación que medir', () => {
  const rows = macroRows(totals(0, 0, 0, 0), totals(800, 30, 90, 25));
  assert.ok(rows.every((r) => r.delta === null));
  assert.equal(rows[0].consumed, 800);
});

test('iconos: sin marcar en un día pasado es que no lo tomó; hoy, que aún no', () => {
  assert.equal(itemStatusIcon('eaten', true), 'checkmark-circle');
  assert.equal(itemStatusIcon('extra', false), 'add-circle-outline');
  assert.equal(itemStatusIcon('unchecked', true), 'close-circle-outline');
  assert.equal(itemStatusIcon('unchecked', false), 'ellipse-outline');
  assert.equal(mealStatusIcon('partial', true), 'contrast-outline');
  assert.equal(mealStatusIcon('done', false), 'checkmark-circle');
  assert.equal(mealStatusIcon('unchecked', true), 'close-circle-outline');
});

test('isAdjusted: lo tomó en otra cantidad que la pautada', () => {
  const item = { kind: 'product', name: 'Arroz', brand: null, status: 'eaten', plannedQuantity: 80, quantity: 120, kcal: 156 };
  assert.equal(isAdjusted(item), true);
  assert.equal(isAdjusted({ ...item, quantity: 80 }), false);
  assert.equal(isAdjusted({ ...item, status: 'unchecked' }), false, 'sin marcar no se ajustó nada');
  assert.equal(isAdjusted({ ...item, status: 'extra', plannedQuantity: null }), false);
});

test('signedNumber: signo explícito y menos tipográfico', () => {
  assert.equal(signedNumber(175, 'es-ES'), '+175');
  assert.equal(signedNumber(-1240, 'es-ES'), '−1240');
  assert.equal(signedNumber(-12400, 'es-ES'), '−12.400');
  assert.equal(signedNumber(0, 'es-ES'), '0');
});
