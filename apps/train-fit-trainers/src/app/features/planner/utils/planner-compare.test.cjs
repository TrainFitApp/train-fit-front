const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');

// Ejecuta las funciones TypeScript reales y resuelve los alias del monorepo.
const bundled = buildSync({
  stdin: {
    contents:
      "export * from './planner-compare';" +
      "export * from './planner-comparison-view';" +
      // El módulo de i18n va en el MISMO bundle que planner-compare para que
      // compartan instancia: con dos copias, cargar el catálogo aquí no se
      // vería desde uiText() allí.
      "export { applyCatalogTranslations, uiText } from 'src/app/core/i18n/localized-catalog';",
    resolveDir: __dirname,
    loader: 'ts',
  },
  tsconfig: path.resolve(__dirname, '../../../../../tsconfig.json'),
  bundle: true, platform: 'node', format: 'cjs', write: false,
});
const compiled = new Module(__filename);
compiled._compile(bundled.outputFiles[0].text, __filename);
const { compareSplits, comparisonSnapshot, exerciseMetrics, metricComparison, overviewMetrics, completionSummary, applyCatalogTranslations, uiText } = compiled.exports;

// Catálogo real del entrenador: así los textos que salen por uiText() se
// comprueban traducidos de verdad. Sin esto uiText devuelve la propia clave y
// un `PLANNER.SIN_SERIES` sin traducir pasaría el test igual que el texto bueno.
const es = require('../../../../assets/i18n/es.json');
applyCatalogTranslations(es, 'es');

// La carga que compara el Planner es la PAUTADA (expectedWeight).
const series = (weight = 80, overrides = {}) => ({ order: 0, expectedWeight: weight, expectedReps: [8], expectedRir: [2], ...overrides });
const exercise = (id, sets, flags = {}) => ({ _id: `custom-${id}`, exercise: { _id: id, name: id, muscleGroups1: ['Pecho'], ...flags }, sets });
const split = (exercises) => ({ _id: 'split', workouts: [{ _id: 'workout', name: 'Torso', exercises }] });
const row = (a, b) => compareSplits(split([a]), split([b])).workouts[0].exercises[0];

test('compara la carga pautada, no la que levantó el cliente', () => {
  const lifted = (expectedWeight, weight) => ({ order: 0, expectedWeight, weight, doned: true, expectedReps: [8], expectedRir: [2] });
  const result = row(exercise('press', [lifted(80, 82.5)]), exercise('press', [lifted(80, 90)]));
  assert.equal(result.status, 'same', 'misma pauta aunque el cliente levantara distinto');
  assert.equal(result.weightTrend, 0);
  assert.match(result.b.label, /80 kg/);
});

test('detecta cambios intermedios aunque máximo y envolvente sean iguales', () => {
  const result = row(exercise('press', [series(60), series(70), series(80)]), exercise('press', [series(60), series(75), series(80)]));
  assert.equal(result.status, 'changed');
  assert.equal(result.stagnant, false);
  assert.equal(result.weightTrend, 0);
});

test('detecta distribución de repeticiones con el mismo rango', () => {
  const result = row(exercise('press', [series(80, { expectedReps: [8] }), series(80, { expectedReps: [10] })]),
    exercise('press', [series(80, { expectedReps: [10] }), series(80, { expectedReps: [8] })]));
  assert.equal(result.status, 'changed');
});

test('carga cero es válida; porcentaje desde cero no se inventa', () => {
  const result = row(exercise('press', [series(0)]), exercise('press', [series(5)]));
  assert.equal(result.weightTrend, 1);
  assert.equal(exerciseMetrics(result)[0].percent, null);
  assert.equal(exerciseMetrics(result)[0].delta, '+5 kg');
});

test('cardio e isométricos no generan tendencia de carga', () => {
  for (const flag of ['isCardio', 'isIsometric']) {
    const result = row(exercise('time', [series(80)], { [flag]: true }), exercise('time', [series(90)], { [flag]: true }));
    assert.equal(result.weightTrend, 0);
    assert.equal(result.b.weight, '—');
  }
});

test('tiempo y distancia cambiados no se ocultan', () => {
  const result = row(exercise('run', [series(0, { expectedTime: '5:00' })], { isCardio: true }),
    exercise('run', [series(0, { expectedTime: '6:00' })], { isCardio: true }));
  assert.equal(result.status, 'changed');
  assert.match(result.b.details[0], /6:00/);
});

test('registro excluye copias no completadas y no rellena datos desde pauta', () => {
  const source = split([exercise('press', [series(90, { doned: false, reps: 8, rir: 2 }), series(80, { doned: true })])]);
  const original = structuredClone(source);
  const done = comparisonSnapshot(source, 'done');
  assert.equal(done.workouts[0].exercises[0].sets.length, 1);
  assert.deepEqual(done.workouts[0].exercises[0].sets[0].expectedReps, []);
  assert.deepEqual(done.workouts[0].exercises[0].sets[0].expectedRir, []);
  assert.deepEqual(source, original);
  assert.deepEqual(completionSummary(source), { done: 1, total: 2, percent: 50 });
});

test('RIR registrado normaliza escalares, rangos y fallo sin perder cero', () => {
  const source = split([exercise('press', [series(80, { doned: true, reps: 0, rir: 0 }), series(80, { doned: true, rir: [2, 4] }), series(80, { doned: true, rir: -1 })])]);
  const done = comparisonSnapshot(source, 'done');
  const metrics = overviewMetrics(done, done);
  assert.deepEqual(done.workouts[0].exercises[0].sets[0].expectedReps, [0]);
  assert.equal(metrics.find((m) => m.key === 'rir').a, '1,5');
  assert.equal(metrics.find((m) => m.key === 'failure').a, '1');
});

test('filas vacías no cuentan como sesiones con series y fallo no promedia', () => {
  const source = split([exercise('press', [series(80, { expectedRir: [2, -1] })])]);
  assert.equal(overviewMetrics(source, source)[1].a, '—');
  assert.equal(overviewMetrics(source, source)[2].a, '1');
  assert.equal(overviewMetrics(split([]), split([]))[3].a, '0');
});

test('empareja duplicados una sola vez y distingue sustituciones', () => {
  const result = compareSplits(split([exercise('press', [series(80)]), exercise('press', [series(60)])]),
    split([exercise('press', [series(80)]), exercise('row', [series(60)])]));
  assert.deepEqual(result.workouts[0].exercises.map((e) => e.status), ['same', 'removed', 'added']);
  assert.equal(result.progress.added, 1);
  assert.equal(result.progress.removed, 1);
});

test('intercambiar referencia invierte delta y recalcula porcentaje', () => {
  const forward = metricComparison('weight', 'Carga', 80, 100);
  const reverse = metricComparison('weight', 'Carga', 100, 80);
  assert.equal(forward.percent, '+25%');
  assert.equal(reverse.percent, '−20%');
  assert.equal(reverse.direction, 'down');
  assert.equal(metricComparison('weight', 'Carga', null, 80).direction, 'unknown');
});

test('ausencia de microciclos y series devuelve una comparación vacía', () => {
  assert.deepEqual(compareSplits(null, null).workouts, []);
  assert.equal(metricComparison('x', 'x', 0, 0).percent, null);
  assert.equal(row(exercise('press', []), exercise('press', [])).a.label, 'sin series');
});

test('el rótulo de "sin series" sale del catálogo, no es la clave en crudo', () => {
  // 2026-10 — el texto se migró a uiText('PLANNER.SIN_SERIES') y este fichero
  // estaba fuera del runner, así que nadie vio que el caso de arriba había
  // dejado de pasar. Comprobar la clave aparte evita que se quede sin
  // traducción en algún idioma sin que falle nada.
  const label = uiText('PLANNER.SIN_SERIES');
  assert.notEqual(label, 'PLANNER.SIN_SERIES', 'Falta PLANNER.SIN_SERIES en el es.json del entrenador');
  assert.equal(row(exercise('press', []), exercise('press', [])).a.label, label);

  const en = require('../../../../assets/i18n/en.json');
  assert.equal(typeof en.PLANNER?.SIN_SERIES, 'string', 'Falta PLANNER.SIN_SERIES en el en.json del entrenador');
  assert.ok(en.PLANNER.SIN_SERIES.length > 0);
});


test('volumen por grupo con porciones A/B, como en Análisis, y series sin músculos aparte', () => {
  const muscles = (...entries) => entries.map(([muscle, role]) => ({ muscle, role }));
  const flat = exercise('press', [series(), series(), series(), series()], {
    muscles: muscles(['chest_middle', 'primary'], ['chest_upper', 'secondary']),
  });
  const incline = exercise('inclinado', [series(), series()], { muscles: muscles(['chest_upper', 'primary']) });
  const unknown = exercise('sin-musculos', [series(), series(), series()]);

  const result = compareSplits(split([flat]), split([flat, incline, unknown]));
  const chest = result.muscles.find((row) => row.groupId === 'chest');
  assert.equal(chest.a, 4, 'el press cuenta una vez al grupo, con su mayor factor');
  assert.equal(chest.b, 6);
  assert.equal(chest.delta, 2);
  const portion = (id) => chest.portions.find((item) => item.id === id);
  assert.deepEqual([portion('chest_upper').a, portion('chest_upper').b], [2, 4], 'secundario ×0,5 + principal ×1');
  assert.deepEqual([portion('chest_middle').a, portion('chest_middle').b], [4, 4]);
  assert.ok(chest.portions.every((item) => !item.isWholeGroup), 'sin "Todo el grupo" si nadie lo etiqueta entero');
  assert.deepEqual(result.unclassifiedSets, { a: 0, b: 3 });
});
