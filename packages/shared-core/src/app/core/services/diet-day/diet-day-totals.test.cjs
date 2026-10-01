const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');
const { Subject } = require('rxjs');

// Los cuatro números grandes de la pantalla de dieta: kcal, proteína,
// carbohidratos y grasa del día. Es lo primero que mira el cliente cada día,
// así que un error aquí es un error que ve siempre.
//
// La regla que los decide (countsAsIntake) es la misma que el backend aplica
// para el seguimiento: lo que pautó el profesional suma solo si el cliente lo
// marcó como tomado; lo que añadió él suma siempre. El gemelo del backend es
// components/dietDays/diet-days-nutrition-util.test.js (computeDayTracking).

const CORE = path.resolve(__dirname, '../..');

const bundled = buildSync({
  stdin: {
    contents:
      "export { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';" +
      "export { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';" +
      "export { RecipeService } from 'src/app/core/services/recipe/recipe.service';",
    resolveDir: CORE,
    loader: 'ts',
  },
  tsconfig: path.resolve(__dirname, '../../../../../../../apps/train-fit-front/tsconfig.json'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
  external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*', '@capacitor/*'],
});
const compiled = new Module(__filename);
compiled.require = (name) =>
  name === '@angular/core/rxjs-interop'
    ? { toObservable: () => new Subject() }
    : require(name);
compiled._compile(bundled.outputFiles[0].text, __filename);
const { DietDayService, CustomProductService, RecipeService } = compiled.exports;

// Servicios de verdad: lo que se prueba es justo cómo encajan entre ellos.
const customProducts = new CustomProductService(null, null);
const recipes = new RecipeService(null, { instant: (key) => key });
const service = new DietDayService(null, customProducts, {}, recipes);

const macrosOf = (dietDay) => ({
  kcal: Number(service.getDietDayKcal(dietDay).toFixed(6)),
  protein: Number(service.getDietDayProteins(dietDay).toFixed(6)),
  carbs: Number(service.getDietDayCarbohydrates(dietDay).toFixed(6)),
  fat: Number(service.getDietDayFat(dietDay).toFixed(6)),
});

const ZERO = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

/** Producto de 100 g con sus macros, añadido por el propio cliente. */
const own = (macros) => ({
  quantity: 100,
  energyKcal100g: macros.kcal,
  protein100g: macros.protein,
  carbohydrates100g: macros.carbs,
  fat100g: macros.fat,
});

/** Lo mismo pero pautado por el profesional. */
const planned = (macros, consumed = false) => ({
  ...own(macros),
  assignedByTrainerId: 'trainer-1',
  consumed,
});

const day = (...meals) => ({ _id: 'day-1', date: '2026-10-01', meals });
const mealOf = (customProducts = [], customRecipes = []) => ({
  _id: 'meal-1',
  name: 'Comida',
  customProducts,
  customRecipes,
});

// --- suma básica ------------------------------------------------------------

test('suma los cuatro macros de los productos del día', () => {
  const dietDay = day(
    mealOf([own({ kcal: 300, protein: 30, carbs: 10, fat: 5 })]),
    mealOf([own({ kcal: 200, protein: 10, carbs: 20, fat: 2 })])
  );
  assert.deepEqual(macrosOf(dietDay), { kcal: 500, protein: 40, carbs: 30, fat: 7 });
});

test('un día vacío suma 0 en los cuatro, no NaN', () => {
  assert.deepEqual(macrosOf(day(mealOf())), ZERO);
  assert.deepEqual(macrosOf(day()), ZERO);
  assert.deepEqual(macrosOf({}), ZERO);
});

test('una comida sin listas no rompe la suma', () => {
  assert.deepEqual(macrosOf(day({ _id: 'meal-1', name: 'Comida' })), ZERO);
});

// --- la regla de qué cuenta como ingerido -----------------------------------

test('lo que añade el cliente suma siempre', () => {
  const dietDay = day(mealOf([own({ kcal: 250, protein: 0, carbs: 0, fat: 0 })]));
  assert.equal(macrosOf(dietDay).kcal, 250);
});

test('lo pautado sin marcar NO suma', () => {
  // Es el plan, no lo comido: si sumara, el cliente empezaría el día con sus
  // kcal ya "gastadas" sin haber comido nada.
  const dietDay = day(mealOf([planned({ kcal: 250, protein: 0, carbs: 0, fat: 0 })]));
  assert.equal(macrosOf(dietDay).kcal, 0);
});

test('lo pautado y marcado sí suma', () => {
  const dietDay = day(mealOf([planned({ kcal: 250, protein: 0, carbs: 0, fat: 0 }, true)]));
  assert.equal(macrosOf(dietDay).kcal, 250);
});

test('en una comida mixta solo suma lo tomado más lo propio', () => {
  const dietDay = day(
    mealOf([
      planned({ kcal: 100, protein: 0, carbs: 0, fat: 0 }, true),
      planned({ kcal: 200, protein: 0, carbs: 0, fat: 0 }, false),
      own({ kcal: 50, protein: 0, carbs: 0, fat: 0 }),
    ])
  );
  assert.equal(macrosOf(dietDay).kcal, 150);
});

test('la regla se aplica igual a los cuatro macros, no solo a las kcal', () => {
  const dietDay = day(
    mealOf([planned({ kcal: 100, protein: 10, carbs: 20, fat: 3 }, false)])
  );
  assert.deepEqual(macrosOf(dietDay), ZERO);
});

// --- recetas ----------------------------------------------------------------

const recipeOf = (...ingredients) => ({ _id: 'recipe-1', name: 'Arroz', customProducts: ingredients });
const ingredient = (id, quantity, macros) => ({
  _id: id,
  quantity,
  energyKcal100g: macros.kcal,
  protein100g: macros.protein,
  carbohydrates100g: macros.carbs,
  fat100g: macros.fat,
});

test('una receta suma la porción consumida, no la receta entera', () => {
  // 200 g de ingredientes a 100 kcal/100 g = 200 kcal; se come la mitad.
  const instance = {
    recipe: recipeOf(
      ingredient('a', 100, { kcal: 100, protein: 10, carbs: 5, fat: 1 }),
      ingredient('b', 100, { kcal: 100, protein: 10, carbs: 5, fat: 1 })
    ),
    quantity: 100,
  };
  assert.deepEqual(macrosOf(day(mealOf([], [instance]))), {
    kcal: 100,
    protein: 10,
    carbs: 5,
    fat: 1,
  });
});

test('una receta pautada sin marcar no suma', () => {
  const instance = {
    recipe: recipeOf(ingredient('a', 100, { kcal: 100, protein: 0, carbs: 0, fat: 0 })),
    quantity: 100,
    assignedByTrainerId: 'trainer-1',
  };
  assert.equal(macrosOf(day(mealOf([], [instance]))).kcal, 0);
});

test('una receta sin poblar cuenta 0 en vez de romper la pantalla', () => {
  // Llega como id cuando el autopopulate no resolvió: mejor 0 que una
  // excepción que deja la dieta en blanco.
  const instance = { recipe: 'recipe-1', quantity: 100 };
  assert.deepEqual(macrosOf(day(mealOf([], [instance]))), ZERO);
});

test('productos y recetas se suman juntos', () => {
  const instance = {
    recipe: recipeOf(ingredient('a', 100, { kcal: 100, protein: 0, carbs: 0, fat: 0 })),
    quantity: 100,
  };
  const dietDay = day(mealOf([own({ kcal: 300, protein: 0, carbs: 0, fat: 0 })], [instance]));
  assert.equal(macrosOf(dietDay).kcal, 400);
});

// --- adición rápida ---------------------------------------------------------

test('una adición rápida suma sus macros tal cual', () => {
  // Se guarda con cantidad 100 y los macros en los campos "por 100 g", justo
  // para que esta suma devuelva lo que escribió el cliente.
  const quickAdd = {
    quantity: 100,
    quickAdd: true,
    name: 'Cena fuera',
    energyKcal100g: 720,
    protein100g: 31,
    carbohydrates100g: 60,
    fat100g: 38,
  };
  assert.deepEqual(macrosOf(day(mealOf([quickAdd]))), {
    kcal: 720,
    protein: 31,
    carbs: 60,
    fat: 38,
  });
});

test('una adición rápida nunca es "pautada", así que suma siempre', () => {
  const quickAdd = { quantity: 100, quickAdd: true, energyKcal100g: 500, consumed: false };
  assert.equal(macrosOf(day(mealOf([quickAdd]))).kcal, 500);
});

// --- datos a medias ---------------------------------------------------------

test('un producto sin snapshot propio suma desde el catálogo', () => {
  const fromCatalog = { quantity: 200, product: { _id: 'p1', energyKcal100g: 150 } };
  assert.equal(macrosOf(day(mealOf([fromCatalog]))).kcal, 300);
});

test('un producto sin cantidad no suma', () => {
  assert.equal(macrosOf(day(mealOf([{ quantity: 0, energyKcal100g: 500 }]))).kcal, 0);
  assert.equal(macrosOf(day(mealOf([{ energyKcal100g: 500 }]))).kcal, 0);
});

test('un producto sin ningún macro cuenta 0 y no NaN', () => {
  const totals = macrosOf(day(mealOf([{ quantity: 100 }])));
  assert.deepEqual(totals, ZERO);
  for (const value of Object.values(totals)) assert.ok(!Number.isNaN(value));
});
