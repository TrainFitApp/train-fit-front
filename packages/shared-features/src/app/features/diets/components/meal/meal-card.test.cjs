const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// La tarjeta de una comida en la pantalla de dieta: sus cuatro chips de
// macros, el reparto entre "lo que te pautaron" y "lo que añadiste tú", los
// nombres de cada fila y el estado de completado. Es la pieza con la que el
// cliente interactúa todos los días.

// Arnés común: compila el TypeScript real y lo carga sin arrancar Angular.
function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { MealComponent, CustomProductService, RecipeService } = loadFromSource(__filename, __dirname, {
  MealComponent: 'src/app/features/diets/components/meal/meal.component',
  CustomProductService: 'src/app/core/services/custom-product/custom-product.service',
  RecipeService: 'src/app/core/services/recipe/recipe.service',
});

const customProductService = new CustomProductService(null, null);
const recipeService = new RecipeService(null, { instant: (key) => key });

/**
 * Componente sin arrancar Angular: se le inyectan a mano los colaboradores que
 * usan los métodos que se prueban. Mismo patrón que
 * workout-inline-edit.test.cjs.
 */
function card(meal) {
  const component = Object.create(MealComponent.prototype);
  Object.assign(component, {
    meal,
    dietDay: { _id: 'day-1', date: '2026-10-01', meals: [meal] },
    mealIndex: 0,
    customProductService,
    recipeService,
    translate: { instant: (key) => key },
  });
  return component;
}

const own = (id, macros, over = {}) => ({
  _id: id,
  quantity: 100,
  order: 0,
  energyKcal100g: macros.kcal,
  protein100g: macros.protein,
  carbohydrates100g: macros.carbs,
  fat100g: macros.fat,
  product: { _id: `p-${id}`, name: `Producto ${id}` },
  ...over,
});

const planned = (id, macros, over = {}) =>
  own(id, macros, { assignedByTrainerId: 'trainer-1', consumed: false, ...over });

const mealOf = (customProducts = [], customRecipes = [], over = {}) => ({
  _id: 'meal-1',
  name: 'Comida',
  customProducts,
  customRecipes,
  ...over,
});

const macrosOf = (component) => ({
  kcal: Number(component.mealKcal.toFixed(6)),
  protein: Number(component.mealProtein.toFixed(6)),
  carbs: Number(component.mealCarbs.toFixed(6)),
  fat: Number(component.mealFat.toFixed(6)),
});

// --- chips de macros --------------------------------------------------------

test('los chips suman los cuatro macros de la comida', () => {
  const component = card(
    mealOf([
      own('a', { kcal: 300, protein: 30, carbs: 10, fat: 5 }),
      own('b', { kcal: 200, protein: 10, carbs: 20, fat: 2 }),
    ])
  );
  assert.deepEqual(macrosOf(component), { kcal: 500, protein: 40, carbs: 30, fat: 7 });
});

test('una comida vacía enseña 0 en los cuatro chips, no NaN', () => {
  const component = card(mealOf());
  assert.deepEqual(macrosOf(component), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
});

test('una comida sin listas no rompe los chips', () => {
  const component = card({ _id: 'meal-1', name: 'Comida' });
  assert.deepEqual(macrosOf(component), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
});

test('DIFERENCIA DELIBERADA: los chips de la comida cuentan lo pautado sin marcar; el total del día no', () => {
  // La tarjeta describe DE QUÉ ES la comida (lo que te toca comer, marcado o
  // no). La barra del día cuenta lo INGERIDO y filtra por countsAsIntake (ver
  // DietDayService#getDietDayKcal y diet-day-totals.test.cjs).
  //
  // Son dos preguntas distintas y la respuesta es distinta a propósito. Queda
  // escrito aquí para que, si alguien unifica una de las dos, salte y sea una
  // decisión y no un descuido.
  const component = card(mealOf([planned('a', { kcal: 500, protein: 0, carbs: 0, fat: 0 })]));
  assert.equal(component.mealKcal, 500);
});

// --- reparto pautado / propio -----------------------------------------------

test('separa lo pautado de lo que añadió el cliente', () => {
  const meal = mealOf([
    planned('p1', { kcal: 100, protein: 0, carbs: 0, fat: 0 }),
    own('o1', { kcal: 100, protein: 0, carbs: 0, fat: 0 }),
    planned('p2', { kcal: 100, protein: 0, carbs: 0, fat: 0 }),
  ]);
  const component = card(meal);
  assert.deepEqual(component.getPautadoProducts(meal).map((p) => p._id), ['p1', 'p2']);
  assert.deepEqual(component.getOwnProducts(meal).map((p) => p._id), ['o1']);
});

test('un assignedByTrainerId nulo cuenta como propio, no como pautado', () => {
  const meal = mealOf([own('o1', { kcal: 1 }, { assignedByTrainerId: null })]);
  const component = card(meal);
  assert.deepEqual(component.getPautadoProducts(meal), []);
  assert.equal(component.getOwnProducts(meal).length, 1);
});

test('hasPautadoItems detecta lo pautado tanto en productos como en recetas', () => {
  const component = card(mealOf());
  assert.equal(component.hasPautadoItems(mealOf([own('o1', { kcal: 1 })])), false);
  assert.equal(component.hasPautadoItems(mealOf([planned('p1', { kcal: 1 })])), true);
  assert.equal(
    component.hasPautadoItems(mealOf([], [{ assignedByTrainerId: 'trainer-1', recipe: {} }])),
    true
  );
});

test('las filas se ordenan por su campo order', () => {
  const meal = mealOf([
    own('segundo', { kcal: 1 }, { order: 1 }),
    own('primero', { kcal: 1 }, { order: 0 }),
  ]);
  const component = card(meal);
  assert.deepEqual(
    component.getProductsAndOwnProductsOrdered(meal).map((p) => p._id),
    ['primero', 'segundo']
  );
});

// --- comida completada ------------------------------------------------------

test('isPautadoFullyConsumed solo con TODO lo pautado marcado', () => {
  const component = card(mealOf());
  const twoPlanned = (firstDone, secondDone) =>
    mealOf([
      planned('p1', { kcal: 1 }, { consumed: firstDone }),
      planned('p2', { kcal: 1 }, { consumed: secondDone }),
    ]);
  assert.equal(component.isPautadoFullyConsumed(twoPlanned(false, false)), false);
  assert.equal(component.isPautadoFullyConsumed(twoPlanned(true, false)), false);
  assert.equal(component.isPautadoFullyConsumed(twoPlanned(true, true)), true);
});

test('una comida sin nada pautado nunca está "completada según tu profesional"', () => {
  // Si no, cualquier comida propia saldría en verde como si cumpliera un plan.
  const component = card(mealOf());
  assert.equal(component.isPautadoFullyConsumed(mealOf([own('o1', { kcal: 1 })])), false);
  assert.equal(component.isPautadoFullyConsumed(mealOf()), false);
});

// --- cantidad pautada vs consumida ------------------------------------------

test('la fila de un pautado enseña la cantidad PAUTADA, no la consumida', () => {
  const component = card(mealOf());
  const product = own('p1', { kcal: 1 }, { quantity: 146, assignedQuantity: 100 });
  assert.equal(component.productDisplayQuantity(product), 100);
});

test('el delta es lo consumido menos lo pautado, redondeado', () => {
  const component = card(mealOf());
  assert.equal(
    component.productAssignedDelta(own('p1', { kcal: 1 }, { quantity: 146, assignedQuantity: 100 })),
    46
  );
  assert.equal(
    component.productAssignedDelta(own('p1', { kcal: 1 }, { quantity: 72, assignedQuantity: 100 })),
    -28
  );
  assert.equal(
    component.productAssignedDelta(own('p1', { kcal: 1 }, { quantity: 100.4, assignedQuantity: 100 })),
    0,
    'medio gramo no es un cambio que valga la pena enseñar'
  );
});

test('sin assignedQuantity no hay delta y la fila cae a la cantidad consumida', () => {
  // Pautados de antes de que existiera el campo, que la migración no pudo
  // rellenar: mejor la cantidad real que un hueco delante de la "g".
  const component = card(mealOf());
  const product = own('p1', { kcal: 1 }, { quantity: 146, assignedQuantity: null });
  assert.equal(component.productAssignedDelta(product), 0);
  assert.equal(component.productDisplayQuantity(product), 146);
});

// --- nombres de las filas ---------------------------------------------------

test('el nombre de un producto sale del catálogo', () => {
  const component = card(mealOf());
  assert.equal(component.getProductName(own('a', { kcal: 1 })), 'Producto a');
});

test('una adición rápida se rotula con el nombre que escribió el cliente', () => {
  const component = card(mealOf());
  const quickAdd = { quantity: 100, quickAdd: true, name: 'Cena fuera', energyKcal100g: 700 };
  assert.equal(component.getProductName(quickAdd), 'Cena fuera');
  assert.equal(component.isQuickAdd(quickAdd), true);
});

test('una adición rápida sin nombre cae al texto traducido, no a un hueco', () => {
  const component = card(mealOf());
  assert.equal(
    component.getProductName({ quantity: 100, quickAdd: true }),
    'SEARCH_FOODS.QUICK_ADD_DEFAULT_NAME'
  );
});

test('isQuickAdd es falso para un producto normal y no revienta con un hueco', () => {
  const component = card(mealOf());
  assert.equal(component.isQuickAdd(own('a', { kcal: 1 })), false);
  assert.equal(component.isQuickAdd(undefined), false);
  assert.equal(component.isQuickAdd(null), false);
});

test('una receta sin nombre o sin poblar se rotula con el texto traducido', () => {
  const component = card(mealOf());
  assert.equal(component.getRecipeName({ recipe: { name: 'Arroz con pollo' } }), 'Arroz con pollo');
  assert.equal(component.getRecipeName({ recipe: { name: '' } }), 'MEAL.RECIPE_NO_NAME');
  assert.equal(component.getRecipeName({ recipe: 'recipe-1' }), 'MEAL.RECIPE_NO_NAME');
});

// --- recetas dentro de la comida --------------------------------------------

test('una receta aporta su porción consumida a los chips', () => {
  const instance = {
    recipe: {
      _id: 'r1',
      name: 'Arroz',
      customProducts: [
        { _id: 'i1', quantity: 100, energyKcal100g: 100, protein100g: 10, carbohydrates100g: 5, fat100g: 1 },
        { _id: 'i2', quantity: 100, energyKcal100g: 100, protein100g: 10, carbohydrates100g: 5, fat100g: 1 },
      ],
    },
    quantity: 100,
  };
  const component = card(mealOf([], [instance]));
  assert.deepEqual(macrosOf(component), { kcal: 100, protein: 10, carbs: 5, fat: 1 });
});

test('una receta sin poblar cuenta 0 en vez de dejar la tarjeta en blanco', () => {
  const component = card(mealOf([], [{ recipe: 'recipe-1', quantity: 100 }]));
  assert.deepEqual(macrosOf(component), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
});

test('la cantidad consumida de una receta descarta lo que no es un número positivo', () => {
  const component = card(mealOf());
  assert.equal(component.getRecipeConsumedQuantity({ quantity: 150 }), 150);
  for (const quantity of [0, -5, null, undefined, 'abc']) {
    assert.equal(component.getRecipeConsumedQuantity({ quantity }), 0, `cantidad ${quantity}`);
  }
});

// --- cantidad consumida de un pautado (QA 2026-10-09, M3) ----------------------
// Cambiar 30 → 50 g en la vista del pautado actualizaba la fila pero los
// totales del día seguían en el valor viejo hasta salir y volver: la tarjeta
// tiene que reemitir el día al cerrarse la vista tras guardar.

function withModal(component, role) {
  const emitted = [];
  Object.assign(component, {
    selectionMode: false,
    dietDayService: {
      set setCurrentDietDay(day) {
        emitted.push(day);
      },
    },
    modalController: {
      create: async () => ({
        present: async () => undefined,
        onDidDismiss: async () => ({ role }),
      }),
    },
  });
  return emitted;
}

test('guardar la cantidad de un pautado reemite el día (los totales se recalculan en el acto)', async () => {
  const product = planned('a', { kcal: 100, protein: 0, carbs: 0, fat: 0 });
  const component = card(mealOf([product]));
  const emitted = withModal(component, 'quantity-saved');
  await component.viewPautadoProduct(product);
  assert.equal(emitted.length, 1);
  assert.notEqual(emitted[0], component.dietDay, 'una copia: el signal no avisa con la misma referencia');
  assert.equal(emitted[0].meals[0], component.meal);
});

test('cerrar la vista sin guardar no reemite nada', async () => {
  const product = planned('a', { kcal: 100, protein: 0, carbs: 0, fat: 0 });
  const component = card(mealOf([product]));
  const emitted = withModal(component, 'backdrop');
  await component.viewPautadoProduct(product);
  assert.equal(emitted.length, 0);
});
