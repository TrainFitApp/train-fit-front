const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Gráfica de medidas de weight-info (peso y perímetros). El back manda las
// medidas de la más nueva a la más antigua (`sort({ date: -1 })`) y la gráfica
// las pintaba tal cual: el eje de fechas salía de derecha a izquierda. Va de la
// más antigua (izquierda) a la más nueva (derecha) lleguen como lleguen.
// La etiqueta de cada punto es además el día guardado, no el anterior al oeste
// de Greenwich (`new Date('YYYY-MM-DD')` es medianoche UTC).
//
// Las fechas de los casos llevan día y mes de dos cifras a propósito: con
// `es`, `toLocaleDateString` pinta "1/10" aunque se pida `2-digit`, y lo que
// se prueba aquí es el orden y el día, no ese relleno.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { AnthropometryChartComponent } = loadFromSource(
  __filename,
  __dirname,
  { AnthropometryChartComponent: 'src/app/shared/components/anthropometry/anthropometry-chart.component' },
  { requires: { 'chart.js': { Chart: class {} } }, external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*', '@capacitor/*', 'ng2-charts', 'chart.js'] }
);

const translate = { currentLang: 'es', instant: (key) => key };
const entry = (date, over = {}) => ({ userId: 'u1', date, ...over });

/** `getChartData()` del componente con esas medidas y esas métricas marcadas. */
function chartData(data, metrics = ['weight']) {
  const component = new AnthropometryChartComponent(translate);
  component.data = data;
  metrics.forEach((key) => component.selectedMetrics.add(key));
  return component.getChartData();
}

const valuesOf = (chart, label) => chart.datasets.find((d) => d.label === label).data;

// Como las manda el back: de la más nueva a la más antigua.
const newestFirst = () => [
  entry('2026-10-27', { weight: 80.5 }),
  entry('2026-10-20', { weight: 81 }),
  entry('2026-10-13', { weight: 82 }),
];

test('el eje va de la medida más antigua a la más nueva aunque el back las mande al revés', () => {
  const chart = chartData(newestFirst());
  assert.deepEqual(chart.labels, ['13/10', '20/10', '27/10']);
  assert.deepEqual(valuesOf(chart, 'ANTHROPOMETRY.WEIGHT'), [82, 81, 80.5]);
});

test('con las medidas ya ordenadas (las que deja la página al guardar) no cambia nada', () => {
  const chart = chartData(newestFirst().reverse());
  assert.deepEqual(chart.labels, ['13/10', '20/10', '27/10']);
  assert.deepEqual(valuesOf(chart, 'ANTHROPOMETRY.WEIGHT'), [82, 81, 80.5]);
});

test('en cualquier orden de entrada el eje sale cronológico, también entre años', () => {
  const chart = chartData([
    entry('2026-11-12', { weight: 79 }),
    entry('2025-12-30', { weight: 83 }),
    entry('2026-10-13', { weight: 81 }),
  ]);
  assert.deepEqual(chart.labels, ['30/12', '13/10', '12/11']);
  assert.deepEqual(valuesOf(chart, 'ANTHROPOMETRY.WEIGHT'), [83, 81, 79]);
});

test('cada valor sigue en la fecha que es: los huecos de una métrica no desplazan a la otra', () => {
  const chart = chartData(
    [
      entry('2026-10-27', { weight: 80, waist: 90 }),
      entry('2026-10-20', { weight: 81 }),
      entry('2026-10-13', { waist: 92 }),
    ],
    ['weight', 'waist']
  );
  assert.deepEqual(chart.labels, ['13/10', '20/10', '27/10']);
  assert.deepEqual(valuesOf(chart, 'ANTHROPOMETRY.WEIGHT'), [null, 81, 80]);
  assert.deepEqual(valuesOf(chart, 'ANTHROPOMETRY.WAIST'), [92, null, 90]);
});

test('no reordena el array de la página', () => {
  const data = newestFirst();
  chartData(data);
  assert.deepEqual(
    data.map((d) => d.date),
    ['2026-10-27', '2026-10-20', '2026-10-13']
  );
});

test('la etiqueta de cada punto es el día guardado en cualquier zona horaria', () => {
  const zone = process.env.TZ;
  try {
    for (const tz of ['Europe/Madrid', 'America/Bogota', 'Pacific/Honolulu', 'Pacific/Auckland']) {
      process.env.TZ = tz;
      assert.deepEqual(chartData([entry('2026-10-13', { weight: 80 })]).labels, ['13/10'], tz);
    }
  } finally {
    if (zone === undefined) delete process.env.TZ;
    else process.env.TZ = zone;
  }
});
