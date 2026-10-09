const test = require('node:test');
const assert = require('node:assert/strict');
const { Subject, of } = require('rxjs');
const { loadFromSource, angularCoreStub } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// Biblioteca › Alimentos (entrenadores): el buscador de alimentos embebido en
// una página, mode="library". Arranca solo (sin ionViewWillEnter, que solo
// recibe la página de la ruta) enseñando lo del propio profesional, cambia de
// Productos a Recetas sin perder «Añadidos por mí», y lo que se toca o se
// crea lo decide la página que lo usa (salidas), nunca la dieta de nadie.

// EventEmitter de verdad (un Subject con emit): el doble del arnés no avisa a
// nadie y aquí lo que se prueba es justo lo que se emite.
class EventEmitter extends Subject {
  emit(value) {
    this.next(value);
  }
}

const { SearchFoodsPage } = loadFromSource(
  __filename,
  __dirname,
  { SearchFoodsPage: './search-foods.page' },
  {
    requires: {
      '@angular/core': { ...angularCoreStub(), EventEmitter },
      '@capacitor/core': {},
      '@capacitor/keyboard': { Keyboard: {} },
    },
  }
);

const TRAINER = { _id: 'trainer-1', favorites: { products: [], recipes: [], exercises: [] } };

function build({ mode = 'library' } = {}) {
  const calls = { products: [], recipes: [] };
  const mealService = {
    searchAllWithFilters: (filter, recentIds) => {
      calls.products.push({ filter: { ...filter }, recentIds });
      return of([{ _id: 'p1', name: 'Crema de cacahuete', servingQuantity: 30 }]);
    },
  };
  const recipeApiService = {
    searchRecipes: (search, page, limit, filters) => {
      calls.recipes.push({ search, page, limit, filters });
      return of([{ _id: 'r1', name: 'Tostada del coach' }]);
    },
  };
  const userService = { getLocalUser: TRAINER };
  const utilService = { getEventString: (event) => event?.detail?.value ?? '' };
  const recentFoodsService = {
    getRecentMealProducts: () => of([]),
    getRecentMealRecipes: () => of([]),
  };
  const cdr = { detectChanges() {} };

  const page = new SearchFoodsPage(
    {}, // DietDayService
    recentFoodsService,
    utilService,
    {}, // IonicUtilService
    mealService,
    {}, // ProductService
    recipeApiService,
    {}, // RecipeDraftService
    {}, // CustomProductService
    userService,
    { ids: () => [], isFavorite: () => false }, // FavoritesService
    {}, // ActivatedRoute
    {}, // NavigationService
    {}, // BarCodeScannerService
    {}, // Platform
    null, // IonRouterOutlet
    cdr,
    {}, // BillingService
    { instant: (key) => key, currentLang: 'es' }
  );
  page.mode = mode;
  return { page, calls };
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

test('arranca solo y enseña los productos del profesional, sin esperar a que escriba', () => {
  const { page, calls } = build();
  // Sin window.history en node: si tirase de initInputsFromRoute, esto
  // reventaría. La biblioteca no lee estado de navegación de nadie.
  page.ngOnInit();

  assert.equal(page.currentMode, 'products');
  assert.equal(calls.products.length, 1);
  assert.equal(calls.products[0].filter.ownFilter, true);
  assert.equal(calls.products[0].filter.userId, TRAINER._id);
  assert.deepEqual(page.products.map((p) => p.name), ['Crema de cacahuete']);
  assert.equal(page.load, true);
});

test('Productos → Recetas sigue en «Añadidos por mí»', async () => {
  const { page, calls } = build();
  page.ngOnInit();
  page.setMode('recipes');
  await tick();

  assert.equal(calls.recipes.length, 1);
  assert.deepEqual(calls.recipes[0].filters, { own: true, fav: false, verified: false });
  assert.deepEqual(page.recipes.map((r) => r.name), ['Tostada del coach']);
});

test('reload vuelve a pedir la pestaña activa con el texto de ahora', async () => {
  const { page, calls } = build();
  page.ngOnInit();
  page.search({ detail: { value: 'cacahuete' } });
  page.reload();

  assert.equal(calls.products.length, 3);
  assert.equal(calls.products[2].filter.search, 'cacahuete');
  assert.equal(calls.products[2].filter.page, 0);
});

test('tocar una card emite foodSelected y no deja nada resaltado', () => {
  const { page } = build();
  page.ngOnInit();
  const selected = [];
  page.foodSelected.subscribe((item) => selected.push(item));

  const product = { _id: 'p1', name: 'Crema de cacahuete', servingQuantity: 30 };
  page.onTrainerProductFocus(product);
  const recipe = { _id: 'r1', name: 'Tostada del coach' };
  page.onTrainerRecipeFocus(recipe);

  assert.deepEqual(selected, [
    { kind: 'product', product, quantity: 30 },
    { kind: 'recipe', recipe, quantity: null },
  ]);
  assert.equal(page.focusedTrainerItem, null);
  assert.equal(page.isProductFocused(product), false);
});

test('Volver y el alta solo aparecen si la página los escucha', () => {
  const { page } = build();
  assert.equal(page.canGoBack, false);
  assert.equal(page.canCreate, false);

  const backs = [];
  page.back.subscribe(() => backs.push(true));
  page.create.subscribe(() => undefined);
  assert.equal(page.canGoBack, true);
  assert.equal(page.canCreate, true);
  page.goBack();
  assert.equal(backs.length, 1);
});

test('fuera de la biblioteca nada cambia: Volver siempre, sin alta y Recetas vuelve a «Todos»', async () => {
  const { page } = build({ mode: 'default' });
  assert.equal(page.canGoBack, true);
  page.create.subscribe(() => undefined);
  assert.equal(page.canCreate, false);

  page.searchFilterGroup = { ownFilter: true, favFilter: false, shieldFilter: false, page: 3 };
  page.hasStartedFoodSearch = false;
  page.setMode('recipes');
  await tick();
  assert.equal(page.searchFilterGroup.ownFilter, false);
});
