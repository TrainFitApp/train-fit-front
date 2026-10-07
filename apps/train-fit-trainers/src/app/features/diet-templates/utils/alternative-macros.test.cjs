const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Opciones de una comida en el constructor de plantillas: sus macros y el
// aviso de que una opción no es intercambiable con la de referencia.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { alternativeTotals, macroDeviation, DEVIATION_PCT_TOLERANCE, sameMacros } = loadFromSource(
  __filename,
  __dirname,
  {
    alternativeTotals: 'src/app/features/diet-templates/utils/alternative-macros',
    macroDeviation: 'src/app/features/diet-templates/utils/alternative-macros',
    DEVIATION_PCT_TOLERANCE: 'src/app/features/diet-templates/utils/alternative-macros',
    sameMacros: 'src/app/features/diet-templates/utils/alternative-macros',
  },
  { app: 'train-fit-trainers' },
);

const item = (kcal, protein, carbs, fat, extra = { productId: 'p' }) => ({ kcal, protein, carbs, fat, ...extra });

test('suma los macros de los alimentos elegidos (productos y recetas)', () => {
  const totals = alternativeTotals({ items: [item(200, 20, 10, 5), item(100, 2, 20, 1, { recipeId: 'r' })] });
  assert.deepEqual(totals, { kcal: 300, protein: 22, carbs: 30, fat: 6 });
});

test('una opción sin ningún alimento elegido no tiene totales (null, no ceros)', () => {
  assert.equal(alternativeTotals({ items: [] }), null);
  assert.equal(alternativeTotals({ items: [item(100, 1, 1, 1, {})] }), null, 'fila aún sin producto ni receta');
  assert.equal(alternativeTotals({}), null);
});

test('valores ausentes cuentan como 0 y no rompen la suma', () => {
  assert.deepEqual(alternativeTotals({ items: [{ productId: 'p', kcal: 50 }] }), { kcal: 50, protein: 0, carbs: 0, fat: 0 });
});

test('desviación: dentro del 10 % no avisa; por encima sí', () => {
  const reference = { kcal: 600, protein: 40, carbs: 70, fat: 20 };
  const close = macroDeviation({ kcal: 650, protein: 43, carbs: 75, fat: 21 }, reference);
  assert.ok(Object.values(close).every((d) => !d.flagged), JSON.stringify(close));
  const far = macroDeviation({ kcal: 700, protein: 30, carbs: 70, fat: 20 }, reference);
  assert.equal(far.kcal.flagged, true);
  assert.equal(far.kcal.delta, 100);
  assert.equal(far.protein.flagged, true);
  assert.equal(far.protein.delta, -10);
  assert.equal(far.carbs.flagged, false);
  assert.equal(DEVIATION_PCT_TOLERANCE, 0.1);
});

test('desviación: el suelo absoluto evita avisos por cantidades ridículas', () => {
  // 2 g de grasa sobre 8 g es un 25 %, pero a esa escala no cambia nada.
  const result = macroDeviation({ kcal: 110, protein: 5, carbs: 10, fat: 10 }, { kcal: 100, protein: 4, carbs: 9, fat: 8 });
  assert.ok(Object.values(result).every((d) => !d.flagged), JSON.stringify(result));
  // Por encima del suelo, sí.
  assert.equal(macroDeviation({ kcal: 100, protein: 4, carbs: 9, fat: 11 }, { kcal: 100, protein: 4, carbs: 9, fat: 8 }).fat.flagged, true);
});

// "Recalcular" del objetivo en "Crear dieta": se habilita en cuanto las
// cifras dejan de ser las iniciales.
test('mismas cifras: compara redondeado, como se ven y se guardan', () => {
  const initial = { kcal: 2400, protein: 160, carbs: 270, fat: 75 };
  assert.equal(sameMacros(initial, { ...initial }), true);
  assert.equal(sameMacros(initial, { kcal: 2400.4, protein: 159.6, carbs: 270, fat: 75 }), true);
  assert.equal(sameMacros(initial, { ...initial, protein: 170 }), false);
  assert.equal(sameMacros(initial, { ...initial, kcal: 2401 }), false);
});

test('mismas cifras: un campo vaciado no coincide; sin referencia, solo null con null', () => {
  const initial = { kcal: 2400, protein: 160, carbs: 270, fat: 75 };
  assert.equal(sameMacros(initial, { ...initial, fat: null }), false);
  assert.equal(sameMacros(initial, { ...initial, fat: 0 }), false);
  assert.equal(sameMacros(null, initial), false);
  assert.equal(sameMacros(initial, null), false);
  assert.equal(sameMacros(null, null), true);
});
