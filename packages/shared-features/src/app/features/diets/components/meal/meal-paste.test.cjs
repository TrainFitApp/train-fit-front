const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { of, throwError } = require('rxjs');

// Pegar en una comida del diario cuando hay cosas pautadas, en el origen o en
// el destino. Lo pegado llega siempre como del cliente y lo pautado del
// destino se queda también al reemplazar (lo garantiza el back,
// integration/nutrition-clipboard.test.js); aquí, lo que decide la tarjeta:
// cuándo preguntar fusionar/reemplazar, qué se manda, que una comida pautada
// entera ni ofrece pegar y que un error no deja el spinner girando.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { MealComponent, MealService } = loadFromSource(__filename, __dirname, {
  MealComponent: 'src/app/features/diets/components/meal/meal.component',
  MealService: 'src/app/core/services/meal/meal.service',
});

const own = (id) => ({ _id: id, quantity: 100, product: { _id: `p-${id}`, name: id } });
const planned = (id) => ({ ...own(id), assignedByTrainerId: 'trainer-1', assignedQuantity: 100, consumed: true });
let activeNutritionTrainer = 'trainer-1';
const mealOf = (id, customProducts = [], customRecipes = [], over = {}) => ({
  _id: id,
  name: id,
  customProducts,
  customRecipes,
  ...over,
});

/**
 * Tarjeta de la comida destino sin arrancar Angular, con el MealService real
 * (portapapeles incluido) sobre un API falso que apunta lo que se pega.
 */
function card(target, { pasteResult, alertRole = 'merge' } = {}) {
  const sent = [];
  const alerts = [];
  const errorToasts = [];
  const api = {
    pasteMeal: (clipboard, merge) => {
      sent.push({ target: clipboard.mealToPaste._id, meal: clipboard.getFilteredMeal(), merge });
      return pasteResult ? pasteResult() : of({ ...target, customProducts: [...target.customProducts] });
    },
  };
  const mealService = new MealService(api);
  const component = Object.create(MealComponent.prototype);
  Object.assign(component, {
    meal: target,
    dietDay: { _id: 'day-1', date: '2026-11-02', meals: [target] },
    mealIndex: 4,
    mealService,
    selectedProductIds: new Set(),
    selectedRecipeIds: new Set(),
    pasteEvent: { emit: () => undefined },
    customProductService: { getMacros: () => ({ kcal: 0, protein: 0, carbs: 0, fat: 0 }) },
    recipeService: {},
    dietDayService: {},
    translate: { instant: (key) => key },
    // trainer-1 sigue llevando su nutrición: lo suyo está bloqueado.
    coachService: { isLockedByTrainer: (trainerId, scope) => trainerId === activeNutritionTrainer && scope === 'nutrition' },
    ionicUtilService: {
      showAlert: async (options) => {
        alerts.push(options);
        return { role: alertRole };
      },
      showToast: () => undefined,
      showErrorToast: (message) => errorToasts.push(message),
    },
    // El modal de "qué pegar" se confirma con lo que ya traía seleccionado.
    modalController: {
      create: async ({ componentProps }) => ({
        present: async () => undefined,
        onDidDismiss: async () => ({
          role: 'confirm',
          data: {
            selectedProductIds: componentProps.selectedProductIds,
            selectedRecipeIds: componentProps.selectedRecipeIds,
          },
        }),
      }),
    },
  });
  return { component, mealService, sent, alerts, errorToasts };
}

// La comida de origen: lo pautado (ya tomado) y lo propio.
const source = mealOf('comida', [planned('pollo'), own('pan')], [
  { _id: 'r1', recipe: { _id: 'rec-1', name: 'Ensalada' }, quantity: 120, assignedByTrainerId: 'trainer-1' },
]);

const flush = () => new Promise((resolve) => setImmediate(resolve));

test('copiar una comida entera con pautados y pegarla en una vacía: se pega sin preguntar y se manda todo', async () => {
  const { component, mealService, sent, alerts } = card(mealOf('cena'));
  mealService.setFullMealClipboard(source, source);

  await component.createMealFromClipboard(component.meal);
  await flush();

  assert.equal(alerts.length, 0);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].target, 'cena');
  assert.equal(sent[0].merge, false);
  assert.deepEqual(sent[0].meal.customProducts.map((cp) => cp._id), ['pollo', 'pan']);
  assert.deepEqual(sent[0].meal.customRecipes.map((cr) => cr._id), ['r1']);
  assert.equal(component.loadPaste, false);
});

test('pegar en una comida que solo tiene lo pautado no pregunta: no hay nada propio que fusionar o reemplazar', async () => {
  const { component, mealService, sent, alerts } = card(mealOf('cena', [planned('salmon')]));
  mealService.setFullMealClipboard(source, source);

  await component.createMealFromClipboard(component.meal);
  await flush();

  assert.equal(alerts.length, 0, 'antes preguntaba y "reemplazar" acababa en 403');
  assert.equal(sent.length, 1);
  assert.equal(sent[0].merge, false);
});

test('pegar en una comida con alimentos propios pregunta, y se manda lo que se elija', async () => {
  for (const role of ['merge', 'replace']) {
    const { component, mealService, sent, alerts } = card(mealOf('cena', [planned('salmon'), own('yogur')]), {
      alertRole: role,
    });
    mealService.setFullMealClipboard(source, source);

    await component.createMealFromClipboard(component.meal);
    await flush();

    assert.equal(alerts.length, 1);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].merge, role === 'merge');
  }
});

test('una selección parcial (lo pautado incluido) siempre se suma, sin preguntar', async () => {
  const { component, mealService, sent, alerts } = card(mealOf('cena', [own('yogur')]));
  mealService.setPartialMealClipboard(source, source, ['pollo'], ['r1']);

  await component.createMealFromClipboard(component.meal);
  await flush();

  assert.equal(alerts.length, 0);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].merge, true);
  assert.deepEqual(sent[0].meal.customProducts.map((cp) => cp._id), ['pollo']);
  assert.deepEqual(sent[0].meal.customRecipes.map((cr) => cr._id), ['r1']);
});

test('una comida que el profesional pautó entera no ofrece pegar ni manda nada', async () => {
  const locked = mealOf('cena', [planned('salmon')], [], { assignedByTrainerId: 'trainer-1' });
  const { component, mealService, sent } = card(locked);
  assert.equal(component.acceptsPaste, false);
  mealService.setFullMealClipboard(source, source);

  await component.createMealFromClipboard(component.meal);
  await flush();

  assert.equal(sent.length, 0);
  assert.equal(component.loadPaste, false);
});

test('terminada la relación de nutrición, la comida pautada entera vuelve a aceptar pegar (QA A3)', () => {
  activeNutritionTrainer = null;
  try {
    const formerlyLocked = mealOf('cena', [planned('salmon')], [], { assignedByTrainerId: 'trainer-1' });
    const { component } = card(formerlyLocked);
    assert.equal(component.acceptsPaste, true);
    assert.equal(component.isLocked(formerlyLocked.customProducts[0]), false, 'y lo pautado ya se puede quitar');
  } finally {
    activeNutritionTrainer = 'trainer-1';
  }
});

test('una comida mixta (pautado por alimento) sí acepta pegar', () => {
  const { component } = card(mealOf('cena', [planned('salmon')]));
  assert.equal(component.acceptsPaste, true);
});

test('needsPasteChoice: solo con la comida entera y algo propio en el destino', () => {
  const ownRecipe = { _id: 'r9', recipe: { _id: 'rec-9' } };
  assert.equal(card(mealOf('cena')).component.needsPasteChoice(true), false);
  assert.equal(card(mealOf('cena', [planned('salmon')])).component.needsPasteChoice(true), false);
  assert.equal(card(mealOf('cena', [own('yogur')])).component.needsPasteChoice(true), true);
  assert.equal(card(mealOf('cena', [], [ownRecipe])).component.needsPasteChoice(true), true);
  assert.equal(card(mealOf('cena', [own('yogur')])).component.needsPasteChoice(false), false);
});

test('si el pegado falla, el spinner se suelta, se avisa y el portapapeles sigue', async () => {
  const { component, mealService, errorToasts } = card(mealOf('cena'), {
    pasteResult: () => throwError(() => ({ status: 500, message: 'boom' })),
  });
  mealService.setFullMealClipboard(source, source);

  await component.createMealFromClipboard(component.meal);
  await flush();

  assert.equal(component.loadPaste, false);
  assert.deepEqual(errorToasts, ['MEAL.PASTE_ERROR']);
  assert.ok(mealService.getMealClipboard, 'se puede reintentar o pegar en otra comida');
});

test('un MEAL_PROTECTED no se avisa dos veces: ya lo enseña el interceptor', async () => {
  const { component, mealService, errorToasts } = card(mealOf('cena'), {
    pasteResult: () => throwError(() => ({ status: 403, code: 'MEAL_PROTECTED' })),
  });
  mealService.setFullMealClipboard(source, source);

  await component.createMealFromClipboard(component.meal);
  await flush();

  assert.equal(component.loadPaste, false);
  assert.deepEqual(errorToasts, []);
});
