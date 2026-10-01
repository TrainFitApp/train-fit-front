const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');

// El pipe que convierte los valores nutricionales a lo que se lee en pantalla
// según el filtro de medida (por 100 g / ración / envase / auto). Lo usan las
// tarjetas del buscador de alimentos y las fichas de producto, así que un
// error aquí sale como un número mal en todas.

const SHARED_UI = path.resolve(__dirname, '../../..');

const bundled = buildSync({
  stdin: {
    contents:
      "export { MeasurePipe } from 'src/app/shared/pipes/measure.pipe';" +
      "export { MEASURE_FILTER_TYPES } from 'src/app/shared/constants/measureFilter';",
    resolveDir: SHARED_UI,
    loader: 'ts',
  },
  tsconfig: path.resolve(__dirname, '../../../../../../apps/train-fit-front/tsconfig.json'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
  external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*'],
});
const compiled = new Module(__filename);
compiled.require = (name) =>
  name === '@angular/core' ? { Pipe: () => (target) => target } : require(name);
compiled._compile(bundled.outputFiles[0].text, __filename);
const { MeasurePipe, MEASURE_FILTER_TYPES } = compiled.exports;

const pipe = new MeasurePipe();
const ENERGY = 'energyKcal100g';
const PROTEIN = 'protein100g';

/** Producto del catálogo: 250 kcal/100 g, ración 30 g, envase 500 g. */
const product = (over = {}) => ({
  _id: 'product-1',
  energyKcal100g: 250,
  protein100g: 12.345,
  servingQuantity: 30,
  productQuantity: 500,
  ...over,
});

// --- por 100 g --------------------------------------------------------------

test('por 100 g devuelve el valor tal cual', () => {
  assert.equal(pipe.transform(product(), MEASURE_FILTER_TYPES.cieng, ENERGY), 250);
});

// --- ración -----------------------------------------------------------------

test('ración escala por la ración del producto', () => {
  // 30 g de una ración sobre 250 kcal/100 g = 75 kcal.
  assert.equal(pipe.transform(product(), MEASURE_FILTER_TYPES.racion, ENERGY), 75);
});

test('ración sin ración definida muestra un guion, no un 0', () => {
  // Un 0 se leería como "no tiene calorías"; el guion dice "no se sabe".
  assert.equal(
    pipe.transform(product({ servingQuantity: undefined }), MEASURE_FILTER_TYPES.racion, ENERGY),
    '-'
  );
  assert.equal(
    pipe.transform(product({ servingQuantity: 0 }), MEASURE_FILTER_TYPES.racion, ENERGY),
    '-'
  );
});

// --- envase completo --------------------------------------------------------

test('envase escala por el peso del envase', () => {
  // 500 g a 250 kcal/100 g = 1250 kcal.
  assert.equal(pipe.transform(product(), MEASURE_FILTER_TYPES.total, ENERGY), 1250);
});

test('envase sin peso definido muestra un guion', () => {
  assert.equal(
    pipe.transform(product({ productQuantity: undefined }), MEASURE_FILTER_TYPES.total, ENERGY),
    '-'
  );
});

// --- auto -------------------------------------------------------------------

test('auto usa la ración si la hay', () => {
  assert.equal(pipe.transform(product(), MEASURE_FILTER_TYPES.auto, ENERGY), 75);
});

test('auto cae a por 100 g cuando no hay ración, sin dejar un guion', () => {
  // Es el modo por defecto del buscador: nunca debe quedarse sin número.
  assert.equal(
    pipe.transform(product({ servingQuantity: undefined }), MEASURE_FILTER_TYPES.auto, ENERGY),
    250
  );
});

// --- redondeo ---------------------------------------------------------------

test('las kcal se truncan a entero', () => {
  // 33 g sobre 250 kcal/100 g = 82,5 -> 82 (floor, no round).
  assert.equal(
    pipe.transform(product({ servingQuantity: 33 }), MEASURE_FILTER_TYPES.racion, ENERGY),
    82
  );
});

test('el resto de macros se queda en dos decimales', () => {
  // 12,345 g/100 g por una ración de 100 g = 12,345 -> 12,35 (round, no floor).
  assert.equal(
    pipe.transform(
      product({ servingQuantity: 100 }),
      MEASURE_FILTER_TYPES.racion,
      PROTEIN
    ),
    12.35
  );
});

// --- CustomProduct dentro de una comida -------------------------------------

test('en un CustomProduct manda su propio valor sobre el del catálogo', () => {
  const customProduct = { quantity: 100, energyKcal100g: 999, product: product() };
  assert.equal(pipe.transform(customProduct, MEASURE_FILTER_TYPES.cieng, ENERGY), 999);
});

test('en un CustomProduct sin valor propio se usa el del catálogo', () => {
  const customProduct = { quantity: 100, product: product() };
  assert.equal(pipe.transform(customProduct, MEASURE_FILTER_TYPES.cieng, ENERGY), 250);
});

test('un CustomProduct toma como envase SU cantidad, no la del producto', () => {
  // Lo que se comió son 200 g, no los 500 g del envase.
  const customProduct = { quantity: 200, product: product() };
  assert.equal(pipe.transform(customProduct, MEASURE_FILTER_TYPES.total, ENERGY), 500);
});

test('un CustomProduct sin cantidad cae al peso del envase del producto', () => {
  const customProduct = { product: product() };
  assert.equal(pipe.transform(customProduct, MEASURE_FILTER_TYPES.total, ENERGY), 1250);
});

test('la ración de un CustomProduct sale del producto, no del CustomProduct', () => {
  const customProduct = { quantity: 200, product: product() };
  assert.equal(pipe.transform(customProduct, MEASURE_FILTER_TYPES.racion, ENERGY), 75);
});

// --- datos incompletos o corruptos ------------------------------------------

test('un valor nutricional ausente cuenta como 0, no como NaN', () => {
  assert.equal(
    pipe.transform(product({ energyKcal100g: undefined }), MEASURE_FILTER_TYPES.cieng, ENERGY),
    0
  );
  assert.equal(
    pipe.transform(product({ energyKcal100g: null }), MEASURE_FILTER_TYPES.cieng, ENERGY),
    0
  );
});

test('un valor que no es número cuenta como 0', () => {
  assert.equal(
    pipe.transform(product({ energyKcal100g: 'mucho' }), MEASURE_FILTER_TYPES.cieng, ENERGY),
    0
  );
});

test('un valor numérico en texto sí se usa', () => {
  // Los productos importados traen números como cadena.
  assert.equal(
    pipe.transform(product({ energyKcal100g: '250' }), MEASURE_FILTER_TYPES.cieng, ENERGY),
    250
  );
});

test('un producto ausente no revienta el pipe', () => {
  assert.equal(pipe.transform(undefined, MEASURE_FILTER_TYPES.cieng, ENERGY), 0);
  assert.equal(pipe.transform(null, MEASURE_FILTER_TYPES.auto, ENERGY), 0);
  assert.equal(pipe.transform({}, MEASURE_FILTER_TYPES.cieng, ENERGY), 0);
});

test('un nodo que el producto no tiene cuenta como 0', () => {
  assert.equal(pipe.transform(product(), MEASURE_FILTER_TYPES.cieng, 'vitaminaInventada100g'), 0);
});

test('un 0 propio del CustomProduct gana al valor del catálogo', () => {
  // "Este alimento no tiene grasa" es un dato: si cayera al catálogo, la
  // tarjeta enseñaría la grasa del producto base.
  const customProduct = { quantity: 100, fat100g: 0, product: product({ fat100g: 20 }) };
  assert.equal(pipe.transform(customProduct, MEASURE_FILTER_TYPES.cieng, 'fat100g'), 0);
});
