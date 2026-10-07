const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource } = require('../../../../../../../../../../../tests/support/ng-harness.cjs');

// «Añadido a …» de las cards del buscador. En modo entrenador manda la
// etiqueta del destino (SearchFoodsTrainerContext#targetLabel): el
// constructor de dietas no tiene un Meal real y la etiqueta salía vacía
// («Añadido a »). Sin ella, el nombre de la comida, como siempre.

const { ProductComponent, RecipeCardComponent } = loadFromSource(__filename, __dirname, {
  ProductComponent: './product/product.component',
  RecipeCardComponent: './recipe-card/recipe-card.component',
});

const translate = (currentLang = 'es') => ({ currentLang, instant: (key) => key });
const product = (lang) => new ProductComponent(undefined, translate(lang));
const recipeCard = (lang) => new RecipeCardComponent(undefined, translate(lang));

for (const [name, make] of [['producto', product], ['receta', recipeCard]]) {
  test(`${name}: con targetLabel (constructor de dietas) dice a qué menú y comida`, () => {
    const card = make();
    card.meal = {};
    card.targetLabel = 'Menú A · Desayuno';
    assert.equal(card.mealNameTranslated, 'Menú A · Desayuno');
  });

  test(`${name}: sin targetLabel, el nombre de la comida (traducido en inglés)`, () => {
    const card = make();
    card.meal = { name: 'Desayuno' };
    assert.equal(card.mealNameTranslated, 'Desayuno');
    const english = make('en');
    english.meal = { name: 'Desayuno' };
    assert.equal(english.mealNameTranslated, 'Breakfast');
  });
}

test('producto en modo ingrediente: sigue diciendo «receta» aunque haya targetLabel', () => {
  const card = product();
  card.ingredientMode = true;
  card.targetLabel = 'Menú A · Desayuno';
  assert.equal(card.mealNameTranslated, 'FILTER.RECIPE');
});
