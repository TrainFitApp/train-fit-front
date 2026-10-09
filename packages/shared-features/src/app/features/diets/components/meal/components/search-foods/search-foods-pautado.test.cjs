const test = require('node:test');
const assert = require('node:assert/strict');
const { of } = require('rxjs');
const { loadFromSource } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// Chip «Pautados» del buscador del cliente: enseña lo que su profesional ha
// pautado en esta comida (productos y recetas, en cualquier pestaña) sin
// tener que escribir nada, y se apaga al cambiar de Productos a Recetas igual
// que el chip (antes la lista seguía filtrando lo pautado con «Todos»
// marcado).

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

const CLIENT = { _id: 'client-1', favorites: { products: [], recipes: [], exercises: [] } };

function build() {
  const calls = { products: [], recipes: [] };
  const mealService = {
    searchAllWithFilters: (filter) => {
      calls.products.push({ ...filter });
      return of([{ _id: 'cat-1', name: 'Arroz del catálogo' }]);
    },
  };
  const recipeApiService = {
    searchRecipes: (search, page, limit, filters) => {
      calls.recipes.push({ search, filters });
      return of([{ _id: 'cat-r1', name: 'Receta del catálogo' }]);
    },
  };
  const recentFoodsService = {
    getRecentMealProducts: () => of([]),
    getRecentMealRecipes: () => of([]),
  };

  const page = new SearchFoodsPage(
    {}, // DietDayService
    recentFoodsService,
    { getEventString: (event) => event?.detail?.value ?? '' },
    {}, // IonicUtilService
    mealService,
    {}, // ProductService
    recipeApiService,
    {}, // RecipeDraftService
    {}, // CustomProductService
    { getLocalUser: CLIENT },
    { ids: () => [], isFavorite: () => false }, // FavoritesService
    {}, // ActivatedRoute
    {}, // NavigationService
    {}, // BarCodeScannerService
    {}, // Platform
    null, // IonRouterOutlet
    { detectChanges() {} },
    {}, // BillingService
    { instant: (key) => key, currentLang: 'es' }
  );

  page.meal = {
    _id: 'meal-desayuno',
    name: 'Desayuno',
    customProducts: [
      { product: { _id: 'p-avena', name: 'Avena' }, quantity: 50, assignedByTrainerId: 'trainer-1' },
      { product: { _id: 'p-leche', name: 'Leche' }, quantity: 200 },
    ],
    customRecipes: [
      { recipe: { _id: 'r-tortitas', name: 'Tortitas' }, quantity: 150, assignedByTrainerId: 'trainer-1' },
      { recipe: { _id: 'r-batido', name: 'Batido' }, quantity: 300 },
    ],
  };
  page.dietDay = { date: '2026-10-08', meals: [page.meal] };
  page.searchFilterGroup = { search: '', page: 0, ownFilter: false, favFilter: false, shieldFilter: false };
  page.hasStartedFoodSearch = false;
  page.currentMode = 'products';
  return { page, calls };
}

const chips = (props = {}) => ({ ownFilter: false, favFilter: false, shieldFilter: false, pautadoFilter: false, ...props });
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

test('Pautados sin escribir nada enseña lo pautado de la comida, productos y recetas, sin buscar en el catálogo', () => {
  const { page, calls } = build();
  assert.equal(page.showPautadoFilter, true);

  page.setFilterIconsValueBySelection(chips({ pautadoFilter: true }));

  assert.deepEqual(page.products.map((p) => p.name), ['Avena']);
  assert.deepEqual(page.recipes.map((r) => r.name), ['Tortitas']);
  assert.equal(page.load, true);
  assert.equal(calls.products.length, 0);
  assert.equal(calls.recipes.length, 0);
});

test('lo mismo desde la pestaña Recetas', () => {
  const { page, calls } = build();
  page.currentMode = 'recipes';

  page.setFilterIconsValueBySelection(chips({ pautadoFilter: true }));

  assert.deepEqual(page.products.map((p) => p.name), ['Avena']);
  assert.deepEqual(page.recipes.map((r) => r.name), ['Tortitas']);
  assert.equal(calls.recipes.length, 0);
});

// Regresión: el chip sale si hay algo pautado de cualquier tipo, pero solo
// se filtraba la pestaña abierta. Una comida con solo una receta pautada,
// mirada desde Productos, daba la lista vacía.
test('una receta pautada sale aunque se esté mirando Productos', () => {
  const { page } = build();
  page.meal.customProducts = page.meal.customProducts.filter((cp) => !cp.assignedByTrainerId);
  assert.equal(page.showPautadoFilter, true);

  page.setFilterIconsValueBySelection(chips({ pautadoFilter: true }));

  assert.deepEqual(page.products, []);
  assert.deepEqual(page.recipes.map((r) => r.name), ['Tortitas']);
});

test('el texto acota dentro de lo pautado', () => {
  const { page } = build();
  page.setFilterIconsValueBySelection(chips({ pautadoFilter: true }));
  page.search('tort');

  assert.deepEqual(page.products, []);
  assert.deepEqual(page.recipes.map((r) => r.name), ['Tortitas']);
});

test('cambiar de Productos a Recetas apaga Pautados, como el chip', async () => {
  const { page } = build();
  page.setFilterIconsValueBySelection(chips({ pautadoFilter: true }));

  page.setMode('recipes');
  await tick();

  assert.equal(page.searchFilterGroup.pautadoFilter, false);
  assert.equal(page.isPautadoFilterActive, false);
  // Sin texto: las recetas de la comida (pautadas primero) y los recientes,
  // no solo las pautadas.
  assert.deepEqual(page.recipes.map((r) => r.name), ['Tortitas', 'Batido']);
});
