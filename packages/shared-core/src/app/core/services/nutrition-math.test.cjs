const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// ESPEJO DEL BACKEND.
//
// La misma aritmética nutricional existe dos veces: aquí (lo que ve el
// cliente en su pantalla de dieta) y en
// train-fit-back/components/dietDays/diet-days-nutrition-util.js (lo que ve
// su profesional como adherencia, cumplimiento y perfil de macros). Si se
// separan, el cliente y el entrenador miran números distintos de la misma
// comida y nadie se entera.
//
// Este fichero ejecuta los servicios REALES del front y afirma los MISMOS
// números que su gemelo en el backend,
// components/dietDays/diet-days-nutrition-util.test.js. Al tocar uno hay que
// tocar el otro.
//
// 2026-10 — así se encontró que el backend trataba modifiedBaseCustomProducts
// como un documento completo cuando el front manda solo los campos que
// cambian: la misma receta daba 195 kcal aquí y 0 allí.

// Arnés común: compila el TypeScript real y lo carga sin arrancar Angular.
function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { RecipeService, CustomProductService } = loadFromSource(__filename, __dirname, {
  RecipeService: 'src/app/core/services/recipe/recipe.service',
  CustomProductService: 'src/app/core/services/custom-product/custom-product.service',
});

// Ninguno de los métodos que se prueban aquí toca la API ni los modales.
const recipes = new RecipeService(null, { instant: (key) => key });
const customProducts = new CustomProductService(null, null);

const ZERO = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
const round = (macros, digits = 6) =>
  Object.fromEntries(Object.entries(macros).map(([k, v]) => [k, Number(v.toFixed(digits))]));

const snapshot = (quantity, macros = {}) => ({
  quantity,
  energyKcal100g: macros.kcal,
  protein100g: macros.protein,
  carbohydrates100g: macros.carbs,
  fat100g: macros.fat,
});

const fromProduct = (quantity, macros = {}) => ({
  quantity,
  product: {
    _id: 'product-1',
    energyKcal100g: macros.kcal,
    protein100g: macros.protein,
    carbohydrates100g: macros.carbs,
    fat100g: macros.fat,
  },
});

const base = (id, quantity) => ({ _id: id, quantity, energyKcal100g: 100 });
const recipeOf = (...ingredients) => ({ name: '', customProducts: ingredients });

// --- getMacros de un CustomProduct suelto (espejo de ingredientMacros) ------

test('getMacros escala por cantidad: los campos son por 100 g', () => {
  assert.deepEqual(
    customProducts.getMacros(snapshot(250, { kcal: 100, protein: 20, carbs: 5, fat: 2 })),
    { kcal: 250, protein: 50, carbs: 12.5, fat: 5 }
  );
});

test('getMacros con 100 g devuelve los valores tal cual (adición rápida)', () => {
  assert.deepEqual(
    customProducts.getMacros(snapshot(100, { kcal: 420, protein: 31, carbs: 12.5, fat: 9 })),
    { kcal: 420, protein: 31, carbs: 12.5, fat: 9 }
  );
});

test('getMacros sin cantidad no suma nada', () => {
  for (const quantity of [0, undefined, null]) {
    assert.deepEqual(customProducts.getMacros(snapshot(quantity, { kcal: 500 })), ZERO);
  }
});

test('getMacros tolera el CustomProduct ausente', () => {
  assert.deepEqual(customProducts.getMacros(undefined), ZERO);
  assert.deepEqual(customProducts.getMacros(null), ZERO);
  assert.deepEqual(customProducts.getMacros({}), ZERO);
});

test('getMacros cae al Product cuando el CustomProduct no trae snapshot', () => {
  assert.deepEqual(
    customProducts.getMacros(fromProduct(200, { kcal: 150, protein: 10, carbs: 30, fat: 1 })),
    { kcal: 300, protein: 20, carbs: 60, fat: 2 }
  );
});

test('getMacros: el snapshot del CustomProduct gana al del Product', () => {
  const ingredient = {
    ...fromProduct(100, { kcal: 150, protein: 10, carbs: 30, fat: 1 }),
    energyKcal100g: 999,
  };
  assert.equal(customProducts.getMacros(ingredient).kcal, 999);
  assert.equal(customProducts.getMacros(ingredient).protein, 10);
});

test('getMacros: un 0 en el snapshot gana al valor del Product', () => {
  const ingredient = { ...fromProduct(100, { kcal: 150, fat: 20 }), fat100g: 0 };
  assert.equal(customProducts.getMacros(ingredient).fat, 0);
});

// --- mergeRecipeIngredients (espejo del backend) ----------------------------

test('mergeRecipeIngredients sin CustomRecipe devuelve los ingredientes de la receta', () => {
  const recipe = recipeOf(base('a', 100), base('b', 50));
  assert.deepEqual(recipes.mergeRecipeIngredients(recipe, null), recipe.customProducts);
});

test('mergeRecipeIngredients sin receta devuelve lista vacía, no revienta', () => {
  assert.deepEqual(recipes.mergeRecipeIngredients(null, null), []);
  assert.deepEqual(recipes.mergeRecipeIngredients(undefined, { addedCustomProducts: [] }), []);
});

test('mergeRecipeIngredients quita los eliminados, pisa los modificados y añade los nuevos', () => {
  const recipe = recipeOf(base('a', 100), base('b', 50), base('c', 25));
  const merged = recipes.mergeRecipeIngredients(recipe, {
    removedBaseCustomProductIds: ['c'],
    modifiedBaseCustomProducts: [{ baseCustomProductId: 'a', quantity: 999 }],
    addedCustomProducts: [base('extra', 20)],
  });
  assert.deepEqual(merged.map((i) => i._id), ['a', 'b', 'extra']);
  assert.equal(merged[0].quantity, 999);
  assert.equal(merged[0].energyKcal100g, 100, 'lo que no cambia se conserva');
});

test('mergeRecipeIngredients: eliminar gana a modificar sobre el mismo ingrediente', () => {
  const recipe = recipeOf(base('a', 100), base('b', 50));
  const merged = recipes.mergeRecipeIngredients(recipe, {
    removedBaseCustomProductIds: ['a'],
    modifiedBaseCustomProducts: [{ baseCustomProductId: 'a', quantity: 999 }],
  });
  assert.deepEqual(merged.map((i) => i._id), ['b']);
});

test('mergeRecipeIngredients no escribe sobre el ingrediente base de la receta', () => {
  const original = base('a', 100);
  const recipe = recipeOf(original);
  recipes.mergeRecipeIngredients(recipe, {
    modifiedBaseCustomProducts: [{ baseCustomProductId: 'a', quantity: 999 }],
  });
  assert.equal(original.quantity, 100);
});

test('mergeRecipeIngredients ignora modificados sin baseCustomProductId', () => {
  const recipe = recipeOf(base('a', 100));
  const merged = recipes.mergeRecipeIngredients(recipe, {
    modifiedBaseCustomProducts: [{ _id: 'huerfano', quantity: 1 }],
  });
  assert.deepEqual(merged.map((i) => i._id), ['a']);
});

// --- porción consumida de una receta (espejo de macrosForCustomRecipe) ------

const portionOf = (customRecipe) =>
  round(recipes.calculateCustomRecipeTotals(customRecipe.recipe, customRecipe).portionMacros);

test('la porción escala sobre el peso crudo total', () => {
  const customRecipe = { recipe: recipeOf(base('a', 100), base('b', 100)), quantity: 100 };
  assert.equal(portionOf(customRecipe).kcal, 100);
});

test('la porción usa quantityCooked como base cuando existe', () => {
  const customRecipe = {
    recipe: recipeOf(base('a', 100), base('b', 100)),
    quantityCooked: 150,
    quantity: 75,
  };
  assert.equal(portionOf(customRecipe).kcal, 100);
});

test('sin cantidad consumida la porción no suma nada', () => {
  const recipe = recipeOf(base('a', 100));
  for (const quantity of [0, undefined, null, -5]) {
    assert.deepEqual(portionOf({ recipe, quantity }), ZERO, `cantidad ${quantity}`);
  }
});

test('una receta de peso 0 no divide por cero', () => {
  assert.deepEqual(portionOf({ recipe: recipeOf(base('a', 0)), quantity: 50 }), ZERO);
});

test('los ingredientes añadidos cuentan en el peso crudo', () => {
  const customRecipe = {
    recipe: recipeOf(base('a', 100)),
    addedCustomProducts: [base('extra', 100)],
    quantity: 200,
  };
  assert.equal(portionOf(customRecipe).kcal, 200);
});

test('la porción escala los cuatro macros, no solo las kcal', () => {
  const customRecipe = {
    recipe: recipeOf(snapshot(200, { kcal: 100, protein: 20, carbs: 10, fat: 5 })),
    quantity: 100,
  };
  assert.deepEqual(portionOf(customRecipe), { kcal: 100, protein: 20, carbs: 10, fat: 5 });
});

test('ajustar SOLO la cantidad de un ingrediente conserva sus macros', () => {
  // EL caso que separaba front y backend. Aquí siempre dio 195; el backend
  // daba 0. Mismos números en components/dietDays/diet-days-nutrition-util.test.js.
  const arroz = {
    _id: 'arroz',
    quantity: 100,
    energyKcal100g: 130,
    protein100g: 2.7,
    carbohydrates100g: 28,
    fat100g: 0.3,
  };
  const customRecipe = {
    recipe: recipeOf(arroz),
    quantity: 150,
    modifiedBaseCustomProducts: [{ baseCustomProductId: 'arroz', quantity: 150 }],
  };
  const macros = portionOf(customRecipe);
  assert.equal(Math.round(macros.kcal), 195);
  assert.equal(Math.round(macros.carbs), 42);
});

// --- per100Macros -----------------------------------------------------------

test('per100Macros da los macros por 100 g de la receta terminada', () => {
  // 200 g crudos y 200 kcal -> 100 kcal por cada 100 g.
  const nutrition = recipes.calculateCustomRecipeTotals(
    recipeOf(base('a', 100), base('b', 100)),
    { quantity: 50 }
  );
  assert.equal(round(nutrition.per100Macros).kcal, 100);
  assert.equal(nutrition.per100Basis, 'raw');
});

test('per100Macros se mide sobre el peso cocinado cuando lo hay', () => {
  // 200 g crudos y 200 kcal quedan en 100 g cocinados -> 200 kcal por 100 g.
  const nutrition = recipes.calculateCustomRecipeTotals(
    recipeOf(base('a', 100), base('b', 100)),
    { quantity: 50, quantityCooked: 100 }
  );
  assert.equal(round(nutrition.per100Macros).kcal, 200);
  assert.equal(nutrition.per100Basis, 'cooked');
});

test('per100Macros de una receta vacía es cero, no infinito', () => {
  const nutrition = recipes.calculateCustomRecipeTotals(recipeOf(), { quantity: 50 });
  assert.deepEqual(nutrition.per100Macros, ZERO);
});

// --- diferencias conocidas con el backend -----------------------------------

test('un producto suelto con cantidad negativa resta, igual que en el backend', () => {
  // getMacros no sanea la cantidad y ingredientMacros del backend tampoco
  // (`ingredient?.quantity || 0`): los dos restan. Ninguna vía de entrada deja
  // escribir una negativa (el schema la acota con min: 0), así que solo
  // llegaría con un dato corrupto, pero al menos los dos lados coinciden.
  assert.equal(customProducts.getMacros(snapshot(-100, { kcal: 100 })).kcal, -100);
});

test('DIFERENCIA CONOCIDA: un INGREDIENTE de receta con cantidad negativa se ignora aquí y resta en el backend', () => {
  // RecipeService#calculateRecipeMacros pasa cada cantidad por
  // toPositiveNumber, así que una negativa cuenta como 0 y tampoco entra en el
  // peso crudo. El backend (sumMacroList sobre ingredientMacros) la resta, y
  // además se la resta al peso crudo, con lo que la porción sale distinta.
  //
  // Para la misma receta ("200 g a 100 kcal/100 g" + "-100 g a 100 kcal/100 g"):
  //   front:   200 kcal sobre 200 g de peso crudo
  //   backend: 100 kcal sobre 100 g de peso crudo
  //
  // No se unifica aquí porque el dato es imposible por las vías normales
  // (CustomProduct.quantity tiene min: 0 en el schema) y tocar el redondeo del
  // backend afectaría a adherencias ya calculadas. Queda escrito para que la
  // diferencia sea deliberada y salte si alguien cambia uno de los dos lados.
  const totals = recipes.calculateRecipeMacros(
    recipeOf({ _id: 'a', quantity: 200, energyKcal100g: 100 }, { _id: 'b', quantity: -100, energyKcal100g: 100 })
  );
  assert.equal(totals.kcal, 200, 'el front ignora el ingrediente negativo');
  assert.equal(totals.quantity, 200, 'y tampoco lo cuenta en el peso crudo');
});
