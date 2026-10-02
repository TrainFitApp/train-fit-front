const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

// Pequeñas piezas de presentación que se repiten por muchas pantallas de las
// tres apps: cómo se pinta lo pautado (reps/RIR con FALLO), los números en
// español, las imágenes de ejercicio, las restricciones dietéticas y el dolor
// más reciente por zona en el Planificador. Un fallo en cualquiera se ve en
// todas partes a la vez.

const { loadFromSource } = require(path.join(__dirname, 'support/ng-harness.cjs'));
const shared = loadFromSource(__filename, path.join(__dirname, '../packages/shared-ui/src/app/shared'), {
  ExpectedPipe: 'src/app/shared/pipes/expected-reps.pipe',
  resolveExerciseImageUrl: 'src/app/core/utils/exercise-image-url.util',
  EsNumberPipe: 'src/app/features/tables/components/summary/components/statistics/es-number.pipe',
  applyCatalogTranslations: 'src/app/core/i18n/localized-catalog',
});
const trainers = loadFromSource(
  __filename,
  path.join(__dirname, '../apps/train-fit-trainers/src/app'),
  {
    latestPlannerPain: 'src/app/features/planner/utils/planner-pain',
    dietaryFlagUi: 'src/app/shared/utils/dietary-flag-ui.util',
    applyCatalogTranslations: 'src/app/core/i18n/localized-catalog',
  },
  { app: 'train-fit-trainers' },
);

// --- Pautado: reps y RIR ------------------------------------------------------------

test('pautado: rango, valor único y vacío', () => {
  const pipe = new shared.ExpectedPipe();
  assert.equal(pipe.transform([8, 10], 'reps'), '8-10 reps');
  assert.equal(pipe.transform([8], 'reps'), '8 reps');
  assert.equal(pipe.transform([null, 12], 'reps'), '12 reps');
  assert.equal(pipe.transform([], 'reps'), '');
  assert.equal(pipe.transform(null, 'reps'), '');
});

test('pautado: RIR 0 es un cero real (se pinta), y -1 es FALLO sin unidad', () => {
  const pipe = new shared.ExpectedPipe();
  assert.equal(pipe.transform([0], 'RIR'), '0 RIR');
  assert.equal(pipe.transform([0, 1], 'RIR'), '0-1 RIR');
  const fail = pipe.transform([-1], 'RIR');
  assert.ok(/^fallo$/i.test(fail), fail);
  assert.ok(/^1-fallo$/i.test(pipe.transform([1, -1], 'RIR')), 'rango que acaba en fallo, sin "RIR" detrás');
});

// --- Números en español ----------------------------------------------------------------

test('números: formato español (coma decimal, punto de miles) y decimales configurables', () => {
  const pipe = new shared.EsNumberPipe();
  assert.equal(pipe.transform(1234.5), '1234,5', 'en es-ES, 4 cifras sin separador');
  assert.equal(pipe.transform(12345.678), '12.345,678');
  assert.equal(pipe.transform('80.25', '1.0-1'), '80,3');
  assert.equal(pipe.transform(80, '1.2-2'), '80,00');
  assert.equal(pipe.transform(null), '');
  assert.equal(pipe.transform('abc'), '');
  assert.equal(pipe.transform(Infinity), '');
});

// --- Imágenes de ejercicio --------------------------------------------------------------

test('imagen de ejercicio: las rutas antiguas del bundle se sirven desde la web, las absolutas se respetan', () => {
  assert.equal(
    shared.resolveExerciseImageUrl('/assets/img/exercises/press banca.gif'),
    'https://www.trainfit.net/resources/img/exercises/press%20banca.gif',
  );
  assert.equal(shared.resolveExerciseImageUrl('https://cdn.example.com/a.png'), 'https://cdn.example.com/a.png');
  assert.equal(shared.resolveExerciseImageUrl('  '), undefined);
  assert.equal(shared.resolveExerciseImageUrl(null), undefined);
  assert.equal(
    shared.resolveExerciseImageUrl('assets/img/exercises/sentadilla_búlgara.jpg'),
    'https://www.trainfit.net/resources/img/exercises/sentadilla_b%C3%BAlgara.jpg',
  );
});

// --- Restricciones dietéticas -----------------------------------------------------------

test('restricciones dietéticas: las cuatro conocidas tienen icono y clase propios; una desconocida no rompe', () => {
  const known = ['vegan', 'vegetarian', 'lactoseFree', 'glutenFree'].map(trainers.dietaryFlagUi);
  assert.equal(new Set(known.map((ui) => ui.colorClass)).size, 4);
  assert.ok(known.every((ui) => ui.icon && ui.label));
  assert.deepEqual(trainers.dietaryFlagUi('keto'), { label: 'keto', icon: 'ellipse-outline', colorClass: 'flag-generic' });
});

test('restricciones dietéticas: la etiqueta cambia con el idioma cargado', () => {
  const en = require('../packages/shared-core/src/assets/i18n/en.json');
  const es = require('../packages/shared-core/src/assets/i18n/es.json');
  trainers.applyCatalogTranslations(en, 'en');
  const english = trainers.dietaryFlagUi('glutenFree').label;
  trainers.applyCatalogTranslations(es, 'es');
  const spanish = trainers.dietaryFlagUi('glutenFree').label;
  assert.notEqual(english, spanish);
  assert.equal(spanish, 'Sin gluten');
});

// --- Dolor en el Planificador -----------------------------------------------------------

test('dolor: el último registro de cada zona, por encima del umbral cuando llega al nivel de dolor', () => {
  const entries = [
    { zone: 'Rodilla izq.', level: 3, date: '2026-09-01' },
    { zone: 'Rodilla izq.', level: 6, date: '2026-09-10' },
    { zone: 'Hombro der.', level: 2, date: '2026-09-05' },
    { zone: 'Cuello', level: 0, date: '2026-09-09' },
    { zone: 'Cuello', level: 99, date: '2026-09-11' }, // fuera de rango: se ignora
  ];
  const thresholds = [
    { zone: 'Rodilla izq.', workLevel: 3, painLevel: 6 },
    { zone: 'Cuello', workLevel: 0, painLevel: 0 },
  ];
  const result = trainers.latestPlannerPain(entries, thresholds);
  assert.deepEqual(result.map((p) => [p.zone, p.level, p.overThreshold]), [
    ['Rodilla izq.', 6, true],
    ['Hombro der.', 2, false],
    ['Cuello', 0, false],
  ]);
  assert.equal(result.find((p) => p.zone === 'Hombro der.').threshold, null);
});

test('dolor: a igual fecha gana el último registro y el cero se conserva como registro explícito', () => {
  const result = trainers.latestPlannerPain(
    [
      { zone: 'Codo izq.', level: 4, date: '2026-09-10' },
      { zone: 'Codo izq.', level: 0, date: '2026-09-10' },
    ],
    [],
  );
  assert.deepEqual(result.map((p) => p.level), [0]);
});
