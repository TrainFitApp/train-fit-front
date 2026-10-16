const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Hoja de "Añadir suplemento" del cliente. La dosis se escribe como cantidad +
// unidad de una lista (igual que en la pauta del profesional) y viaja junta
// como texto ("5 g"); el momento es una lista y solo "otro momento" lleva
// texto propio.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { SupplementSheetComponent } = loadFromSource(__filename, __dirname, {
  SupplementSheetComponent: 'src/app/features/diets/components/supplement-sheet/supplement-sheet.component',
});

const START = '2026-10-14';

/** Hoja ya inicializada, con sus colaboradores sustituidos por dobles que apuntan lo que reciben. */
function openSheet({ supplement, lang = 'es' } = {}) {
  const calls = { create: [], update: [], dismiss: [] };
  const saved = { subscribe: ({ next }) => next({}) };
  const sheet = Object.create(SupplementSheetComponent.prototype);
  Object.assign(sheet, {
    supplement,
    startDate: START,
    saving: false,
    removing: false,
    errorKey: null,
    // Un FormGroup mínimo: la hoja solo lee `form.value`.
    formBuilder: {
      group: (config) => ({ value: Object.fromEntries(Object.entries(config).map(([key, [initial]]) => [key, initial])) }),
    },
    translate: { currentLang: lang, instant: (key) => key },
    modalController: { dismiss: (data) => calls.dismiss.push(data) },
    mySupplementsApi: {
      createMine: (body) => (calls.create.push(body), saved),
      updateMine: (id, body) => (calls.update.push({ id, body }), saved),
    },
  });
  sheet.ngOnInit();
  return { sheet, calls };
}

const fill = (sheet, values) => Object.assign(sheet.form.value, values);

const own = (over = {}) => ({
  _id: 's1',
  name: 'Creatina',
  dose: '5 g',
  timing: 'post_workout',
  customTiming: '',
  weekdays: [],
  startDate: '2026-10-01',
  endDate: null,
  own: true,
  ...over,
});

test('un suplemento nuevo arranca en gramos y con una comida, sin cantidad', () => {
  const { sheet } = openSheet();
  assert.equal(sheet.form.value.doseAmount, '');
  assert.equal(sheet.form.value.doseUnit, 'g');
  assert.equal(sheet.form.value.timing, 'with_meal');
  assert.ok(sheet.doseUnits.includes('cápsulas') && sheet.doseUnits.includes('g'));
});

test('hacen falta nombre y una cantidad mayor que 0 para guardar', () => {
  const { sheet } = openSheet();
  assert.equal(sheet.canSubmit, false);

  fill(sheet, { name: 'Creatina' });
  assert.equal(sheet.canSubmit, false, 'sin cantidad');

  fill(sheet, { doseAmount: '0' });
  assert.equal(sheet.canSubmit, false, 'cantidad 0');

  fill(sheet, { doseAmount: '5' });
  assert.equal(sheet.doseText, '5 g');
  assert.equal(sheet.canSubmit, true);

  fill(sheet, { name: '   ' });
  assert.equal(sheet.canSubmit, false, 'nombre en blanco');
});

test('guarda la dosis junta (cantidad + unidad) y cierra avisando del cambio', () => {
  const { sheet, calls } = openSheet();
  fill(sheet, { name: ' Creatina ', doseAmount: '2', doseUnit: 'cápsulas' });
  sheet.submit();

  assert.deepEqual(calls.create, [
    { name: 'Creatina', dose: '2 cápsulas', timing: 'with_meal', customTiming: '', weekdays: [], startDate: START },
  ]);
  assert.deepEqual(calls.dismiss, [{ changed: true }]);
});

test('con cantidad 1 la unidad va en singular y la coma decimal es la española', () => {
  const { sheet } = openSheet();
  fill(sheet, { doseAmount: '1', doseUnit: 'medidas' });
  assert.equal(sheet.doseText, '1 medida');
  fill(sheet, { doseAmount: '1.5', doseUnit: 'g' });
  assert.equal(sheet.doseText, '1,5 g');
});

test('el texto de «otro momento» solo viaja cuando el momento es ese', () => {
  const { sheet, calls } = openSheet();
  fill(sheet, { name: 'Cafeína', doseAmount: '200', doseUnit: 'mg', timing: 'custom', customTiming: '  Con el café de media mañana ' });
  assert.equal(sheet.isCustomTiming, true);
  sheet.submit();
  assert.equal(calls.create[0].timing, 'custom');
  assert.equal(calls.create[0].customTiming, 'Con el café de media mañana');

  // Lo escrito antes de volver a un momento de la lista no se arrastra. (Tras
  // guardar la hoja se cierra, así que el segundo intento es otra hoja.)
  const again = openSheet();
  fill(again.sheet, { name: 'Cafeína', doseAmount: '200', doseUnit: 'mg', timing: 'pre_workout', customTiming: 'Con el café' });
  assert.equal(again.sheet.isCustomTiming, false);
  again.sheet.submit();
  assert.equal(again.calls.create[0].timing, 'pre_workout');
  assert.equal(again.calls.create[0].customTiming, '');
});

test('editar parte la dosis guardada y la vuelve a escribir igual', () => {
  const { sheet, calls } = openSheet({ supplement: own({ dose: '1,5 g' }) });
  assert.equal(sheet.form.value.doseAmount, '1.5');
  assert.equal(sheet.form.value.doseUnit, 'g');
  assert.equal(sheet.form.value.timing, 'post_workout');

  sheet.submit();
  assert.deepEqual(calls.update, [
    { id: 's1', body: { name: 'Creatina', dose: '1,5 g', timing: 'post_workout', customTiming: '', weekdays: [] } },
  ]);
  assert.deepEqual(calls.create, []);
});

test('una unidad que no está en la lista se ofrece como una más y se conserva', () => {
  const { sheet, calls } = openSheet({ supplement: own({ dose: '1 medida rasa' }) });
  assert.equal(sheet.form.value.doseUnit, 'medida rasa');
  assert.equal(sheet.doseUnits.at(-1), 'medida rasa');

  sheet.submit();
  assert.equal(calls.update[0].body.dose, '1 medida rasa');
});

test('en inglés las unidades, el punto decimal y el singular son los ingleses', () => {
  const { sheet } = openSheet({ lang: 'en' });
  assert.ok(sheet.doseUnits.includes('capsules') && !sheet.doseUnits.includes('cápsulas'));

  fill(sheet, { doseAmount: '1', doseUnit: 'capsules' });
  assert.equal(sheet.doseText, '1 capsule');
  fill(sheet, { doseAmount: '2.5', doseUnit: 'mg' });
  assert.equal(sheet.doseText, '2.5 mg');
  fill(sheet, { doseAmount: '3000', doseUnit: 'IU' });
  assert.equal(sheet.doseText, '3000 IU');
});

test('una dosis guardada en otro idioma se ofrece con la unidad del idioma de la app', () => {
  const english = openSheet({ lang: 'en', supplement: own({ dose: '2 cápsulas' }) }).sheet;
  assert.equal(english.form.value.doseUnit, 'capsules');
  assert.equal(english.doseText, '2 capsules');

  // Lo que escribe el asistente ("2 capsules") se reconoce en una app en español.
  const spanish = openSheet({ supplement: own({ dose: '2 capsules' }) }).sheet;
  assert.equal(spanish.form.value.doseUnit, 'cápsulas');
  assert.equal(spanish.doseText, '2 cápsulas');
});

test('días de la semana: se marcan y desmarcan; los siete es lo mismo que ninguno', () => {
  const { sheet, calls } = openSheet({ supplement: own({ weekdays: [1] }) });
  assert.deepEqual(sheet.weekdays, [1], 'arranca con los guardados');
  sheet.toggleWeekday(3);
  sheet.toggleWeekday(0);
  sheet.toggleWeekday(1);
  assert.equal(sheet.isWeekdaySelected(1), false);
  sheet.submit();
  assert.deepEqual(calls.update[0].body.weekdays, [0, 3], 'ordenados, 0 = domingo');

  const all = openSheet({ supplement: own() });
  for (const day of [0, 1, 2, 3, 4, 5, 6]) all.sheet.toggleWeekday(day);
  all.sheet.submit();
  assert.deepEqual(all.calls.update[0].body.weekdays, [], 'todos los días');
});
