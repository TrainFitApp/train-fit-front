const test = require('node:test');
const assert = require('node:assert/strict');
const { of } = require('rxjs');
const { loadFromSource } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// Buscador de ingredientes de una receta (search-foods en modo ingrediente):
// al abrir la ficha de un producto (add-product) y volver, la lista buscada
// tiene que seguir ahí. El estado de navegación del que vuelve sigue diciendo
// ingredientMode, y la página lo trataba como una entrada nueva: reiniciaba la
// búsqueda y pintaba los recientes en lugar de lo buscado.

const { SearchFoodsPage } = loadFromSource(
  __filename,
  __dirname,
  { SearchFoodsPage: './search-foods.page' },
  {
    requires: {
      '@capacitor/core': {},
      '@capacitor/keyboard': { Keyboard: {} },
    },
  }
);

// La página escribe mucho en consola al entrar y al buscar.
const originalLog = console.log;
test.before(() => {
  console.log = () => undefined;
});
test.after(() => {
  console.log = originalLog;
});

const CLIENT = { _id: 'client-1', favorites: { products: [], recipes: [], exercises: [] } };
const RECENT = { product: { _id: 'p-avena', name: 'Avena' }, quantity: 50 };
const POLLO = [
  { _id: 'p-pechuga', name: 'Pechuga de pollo', servingQuantity: 120 },
  { _id: 'p-asado', name: 'Pollo asado', servingQuantity: 150 },
];
const names = (products) => products.map((product) => product.name);

function build() {
  const calls = { search: 0, recents: 0 };
  const meal = { _id: 'meal-comida', name: 'Comida', customProducts: [], customRecipes: [] };
  const dietDay = { _id: 'day-1', date: '2026-10-13', meals: [meal] };

  // Estado de navegación (window.history.state) y bus temporal de la app.
  const nav = { state: {}, temp: new Map() };
  const navigationService = {
    getState: () => nav.state,
    getTempData: (key) => nav.temp.get(key) ?? null,
    setTempData: (key, value) => nav.temp.set(key, value),
    clearTempData: (key) => nav.temp.delete(key),
    clearStateKeys: () => undefined,
  };

  // Borrador de la receta en memoria: la fuente de los ingredientes elegidos.
  let draft = [];
  const recipeDraftService = {
    isActive: () => true,
    ingredients: () => draft,
    setIngredients: (ingredients) => {
      draft = ingredients;
    },
  };

  const page = new SearchFoodsPage(
    { currentDietDay: dietDay, syncUpdatedProductInCurrentDietDay: () => false }, // DietDayService
    {
      getRecentMealProducts: () => {
        calls.recents++;
        return of([RECENT]);
      },
      getRecentMealRecipes: () => of([]),
    },
    { getEventString: (event) => event?.detail?.value ?? '' }, // UtilService
    {}, // IonicUtilService
    {
      searchAllWithFilters: () => {
        calls.search++;
        return of(POLLO);
      },
    }, // MealService
    {}, // ProductService
    {}, // RecipeApiService
    recipeDraftService,
    {}, // CustomProductService
    { getLocalUser: CLIENT },
    { ids: () => [], isFavorite: () => false }, // FavoritesService
    {}, // ActivatedRoute
    navigationService,
    {}, // BarCodeScannerService
    { is: () => false, backButton: { subscribeWithPriority: () => ({ unsubscribe() {} }) } }, // Platform
    null, // IonRouterOutlet
    { detectChanges() {} },
    {}, // BillingService
    { instant: (key) => key, currentLang: 'es' }
  );

  page.meal = meal;
  page.dietDay = dietDay;
  page.searchFilterGroup = { search: '', page: 0, ownFilter: false, favFilter: false, shieldFilter: false };
  return { page, nav, calls };
}

// config-recipe › «Añadir ingredientes».
const ENTER_FROM_RECIPE = {
  ingredientMode: true,
  existingIngredients: [],
  returnUrl: '/search-foods/config-recipe',
};

test('volver de la ficha de un producto conserva la lista buscada', async () => {
  const { page, nav, calls } = build();

  nav.state = ENTER_FROM_RECIPE;
  await page.ionViewWillEnter();
  assert.deepEqual(names(page.products), ['Avena'], 'sin texto, los recientes');

  page.search({ detail: { value: 'pollo' } });
  assert.deepEqual(names(page.products), names(POLLO));
  const searchesBefore = calls.search;
  const recentsBefore = calls.recents;

  // add-product › atrás: devuelve ingredientMode y el producto tocado.
  nav.state = { ingredientMode: true, updatedProduct: { ...POLLO[0], servingQuantity: 130 }, selectedDate: '2026-10-13' };
  await page.ionViewWillEnter();

  assert.deepEqual(names(page.products), names(POLLO));
  assert.equal(page.products[0].servingQuantity, 130, 'el producto editado se actualiza en la lista');
  assert.equal(page.hasStartedFoodSearch, true);
  assert.equal(page.searchFilterGroup.search, 'pollo');
  assert.equal(page.load, true);
  assert.equal(calls.search, searchesBefore, 'no se vuelve a buscar');
  assert.equal(calls.recents, recentsBefore, 'ni se piden otra vez los recientes');
});

test('entrar y salir de varias fichas seguidas no pierde la lista', async () => {
  const { page, nav } = build();

  nav.state = ENTER_FROM_RECIPE;
  await page.ionViewWillEnter();
  page.search({ detail: { value: 'pollo' } });

  for (let i = 0; i < 3; i++) {
    nav.state = { ingredientMode: true, selectedDate: '2026-10-13' };
    await page.ionViewWillEnter();
    assert.deepEqual(names(page.products), names(POLLO), `vuelta ${i + 1}`);
  }
});

// El reinicio existe por algo: Ionic devuelve la misma página si ya estaba en
// la pila (el buscador normal de la comida, por debajo de la receta), y la
// búsqueda que traía no tiene sentido como lista de ingredientes.
test('entrar en modo ingrediente desde un buscador ya usado reinicia la búsqueda', async () => {
  const { page, nav } = build();

  page.hasStartedFoodSearch = true;
  page.load = true;
  page.products = [{ _id: 'p-arroz', name: 'Arroz' }];
  page.recentProductsPrefetched = true;

  nav.state = ENTER_FROM_RECIPE;
  await page.ionViewWillEnter();

  assert.equal(page.ingredientMode, true);
  assert.equal(page.hasStartedFoodSearch, false);
  assert.deepEqual(names(page.products), ['Avena']);
});
