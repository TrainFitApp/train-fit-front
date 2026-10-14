const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Gráfica semanal (L–D) del peso en el diario. Solo sale, igual que el botón
// que la abre, si el día de la fecha existe de verdad. El back crea el día al
// abrir la fecha, así que uno recién abierto, sin nada, también llega con
// `_id`: antes la gráfica se quedaba a la vista (y sin botón para quitarla) al
// pasar a un día vacío.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { DailyWeightComponent } = loadFromSource(
  __filename,
  __dirname,
  { DailyWeightComponent: 'src/app/features/diets/components/daily-weight/daily-weight.component' },
  { requires: { 'chart.js': { Chart: class {} } }, external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*', '@capacitor/*', 'ng2-charts', 'chart.js'] }
);

const DATE = '2026-11-02';
const meal = (over = {}) => ({ customProducts: [], customRecipes: [], ...over });
const emptyMeals = () => Array.from({ length: 6 }, () => meal());
const day = (over = {}) => ({ _id: 'day-1', date: DATE, meals: emptyMeals(), ...over });
const withMeal = (index, over) => {
  const meals = emptyMeals();
  meals[index] = meal(over);
  return day({ meals });
};

/** `hasDietDay` del componente para ese día, estando seleccionada `selectedDate`. */
function hasDietDay(dietDay, selectedDate = DATE) {
  const component = Object.create(DailyWeightComponent.prototype);
  component.dietDay = dietDay;
  component.selectedDate = selectedDate;
  return component.hasDietDay;
}

test('sin día no hay gráfica', () => {
  assert.equal(hasDietDay(undefined), false);
  assert.equal(hasDietDay(null), false);
});

test('un día recién abierto, aunque ya tenga _id, no enseña la gráfica', () => {
  assert.equal(hasDietDay(day()), false);
  assert.equal(hasDietDay(day({ notes: '', weight: undefined })), false);
});

test('un día sin guardar no enseña la gráfica, ni con alimentos ni con peso', () => {
  const unsaved = withMeal(0, { customProducts: [{ _id: 'cp-1' }] });
  delete unsaved._id;
  assert.equal(hasDietDay(unsaved), false);
  assert.equal(hasDietDay({ date: DATE, meals: emptyMeals(), weight: 80 }), false);
});

test('con un alimento, una receta o una nota en el día enseña la gráfica', () => {
  assert.equal(hasDietDay(withMeal(1, { customProducts: [{ _id: 'cp-1' }] })), true);
  assert.equal(hasDietDay(withMeal(4, { customRecipes: [{ _id: 'cr-1' }] })), true);
  assert.equal(hasDietDay(day({ notes: 'Cena fuera' })), true);
  assert.equal(hasDietDay(withMeal(2, { notes: 'Sin sal' })), true);
});

test('un día sin comida pero con peso enseña la gráfica: es la del peso', () => {
  assert.equal(hasDietDay(day({ weight: 80.4 })), true);
});

test('el día de otra fecha, el que queda mientras carga el nuevo, no cuenta', () => {
  const previous = withMeal(0, { customProducts: [{ _id: 'cp-1' }] });
  assert.equal(hasDietDay(previous, '2026-11-03'), false);
  assert.equal(hasDietDay(previous, DATE), true);
});

/** `canShowChart` con el peso que haya en el formulario. */
function canShowChart(dietDay, formWeight) {
  const component = Object.create(DailyWeightComponent.prototype);
  component.dietDay = dietDay;
  component.selectedDate = DATE;
  component.weightForm = { get: () => ({ value: formWeight }) };
  return component.canShowChart;
}

test('un día con comida pero sin peso no enseña la gráfica ni su ojito', () => {
  const withFood = withMeal(1, { customProducts: [{ _id: 'cp-1' }] });
  assert.equal(canShowChart(withFood, null), false);
  assert.equal(canShowChart(withFood, ''), false);
});

test('un día con peso anotado enseña la gráfica', () => {
  assert.equal(canShowChart(day({ weight: 80.4 }), 80.4), true);
});
