const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// RIR = repeticiones en reserva. Es la intensidad con la que el cliente apunta
// cada serie, y tiene un centinela: -1 significa FALLO (llegó al límite), no
// "menos uno". Este fichero es la FUENTE DE VERDAD de esa regla: cuando otra
// pantalla no la respetó, el editor en línea de la tabla del microciclo
// guardaba "RIR 0-2" donde el cliente había escrito FALLO (ver
// workout-inline-edit.test.cjs).
//
// Es un módulo puro, así que se prueba entero.

// Arnés común: compila el TypeScript real y lo carga sin arrancar Angular.
function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const rir = loadFromSource(__filename, __dirname, {
  RIR_FAIL_VALUE: 'src/app/core/models/rir',
  buildRirValue: 'src/app/core/models/rir',
  normalizeRirValue: 'src/app/core/models/rir',
  parseRirSelection: 'src/app/core/models/rir',
  isRirFail: 'src/app/core/models/rir',
  hasRirValue: 'src/app/core/models/rir',
  formatRirValue: 'src/app/core/models/rir',
  getRirNumberOptions: 'src/app/core/models/rir',
  isAllowedRirNumber: 'src/app/core/models/rir',
  applyCatalogTranslations: 'src/app/core/i18n/localized-catalog',
});

const {
  RIR_FAIL_VALUE,
  buildRirValue,
  normalizeRirValue,
  parseRirSelection,
  isRirFail,
  hasRirValue,
  formatRirValue,
  getRirNumberOptions,
  isAllowedRirNumber,
} = rir;

const FAIL = RIR_FAIL_VALUE;

// --- el rango permitido -----------------------------------------------------

test('las opciones del selector van de 0 a 10', () => {
  const options = getRirNumberOptions();
  assert.equal(options[0], 0);
  assert.equal(options[options.length - 1], 10);
  assert.equal(options.length, 11);
});

test('isAllowedRirNumber acepta los enteros de 0 a 10 y nada más', () => {
  for (const value of [0, 5, 10]) assert.equal(isAllowedRirNumber(value), true, String(value));
  for (const value of [-1, 11, 2.5, '5', null, undefined, NaN]) {
    assert.equal(isAllowedRirNumber(value), false, String(value));
  }
});

test('el centinela de fallo queda FUERA del rango de números permitidos', () => {
  // Es lo que obliga a tratarlo aparte en todas las funciones de abajo.
  assert.equal(isAllowedRirNumber(FAIL), false);
  assert.equal(FAIL, -1);
});

// --- buildRirValue ----------------------------------------------------------

test('buildRirValue: el fallo en cualquiera de los dos extremos gana al rango', () => {
  // LA regla. Un "fallo a RIR 2" no significa nada: si hay fallo, es fallo.
  assert.deepEqual(buildRirValue(FAIL, null), [FAIL]);
  assert.deepEqual(buildRirValue(null, FAIL), [FAIL]);
  assert.deepEqual(buildRirValue(FAIL, 2), [FAIL]);
  assert.deepEqual(buildRirValue(2, FAIL), [FAIL]);
  assert.deepEqual(buildRirValue(FAIL, FAIL), [FAIL]);
});

test('buildRirValue sin ningún valor es null, no un array vacío', () => {
  // null es "no he puesto RIR"; [] sería "he puesto un rango vacío".
  assert.equal(buildRirValue(null, null), null);
  assert.equal(buildRirValue(undefined, undefined), null);
});

test('buildRirValue con un solo valor devuelve ese valor solo', () => {
  assert.deepEqual(buildRirValue(2, null), [2]);
  assert.deepEqual(buildRirValue(null, 2), [2], 'solo el máximo también vale');
  assert.deepEqual(buildRirValue(0, null), [0], 'RIR 0 es un dato, no un hueco');
});

test('buildRirValue colapsa un rango de extremos iguales', () => {
  // "de 2 a 2" se lee peor que "2".
  assert.deepEqual(buildRirValue(2, 2), [2]);
});

test('buildRirValue conserva el rango de verdad', () => {
  assert.deepEqual(buildRirValue(1, 3), [1, 3]);
});

test('buildRirValue descarta los valores fuera de rango', () => {
  assert.equal(buildRirValue(11, null), null);
  assert.deepEqual(buildRirValue(11, 3), [3], 'el que sí vale se conserva');
});

// --- normalizeRirValue ------------------------------------------------------

test('normalizeRirValue: lo vacío es null', () => {
  for (const value of [null, undefined, '', '   ', '-']) {
    assert.equal(normalizeRirValue(value), null, JSON.stringify(value));
  }
});

test('normalizeRirValue acepta un número suelto', () => {
  assert.deepEqual(normalizeRirValue(3), [3]);
  assert.deepEqual(normalizeRirValue(0), [0]);
  assert.equal(normalizeRirValue(99), null, 'fuera de rango no vale');
});

test('normalizeRirValue reconoce el fallo escrito de todas las formas', () => {
  assert.deepEqual(normalizeRirValue(FAIL), [FAIL]);
  assert.deepEqual(normalizeRirValue('-1'), [FAIL]);
  assert.deepEqual(normalizeRirValue('FALLO'), [FAIL]);
  assert.deepEqual(normalizeRirValue('fallo'), [FAIL], 'sin distinguir mayúsculas');
  assert.deepEqual(normalizeRirValue(' FALLO '), [FAIL], 'con espacios alrededor');
});

test('normalizeRirValue de un array con un fallo dentro colapsa a fallo', () => {
  // Es lo que guarda la BD: expectedRir es un array.
  assert.deepEqual(normalizeRirValue([FAIL]), [FAIL]);
  assert.deepEqual(normalizeRirValue([FAIL, 2]), [FAIL]);
  assert.deepEqual(normalizeRirValue([2, FAIL]), [FAIL]);
  assert.deepEqual(normalizeRirValue(['-1']), [FAIL], 'aunque venga como texto');
});

test('normalizeRirValue de un array normal aplica las mismas reglas', () => {
  assert.deepEqual(normalizeRirValue([1, 3]), [1, 3]);
  assert.deepEqual(normalizeRirValue([2, 2]), [2]);
  assert.deepEqual(normalizeRirValue([2]), [2]);
  assert.equal(normalizeRirValue([]), null);
  assert.deepEqual(normalizeRirValue([null, 3]), [3]);
});

test('normalizeRirValue entiende un rango escrito "1-3"', () => {
  assert.deepEqual(normalizeRirValue('1-3'), [1, 3]);
  assert.deepEqual(normalizeRirValue('1 - 3'), [1, 3], 'con espacios');
  assert.deepEqual(normalizeRirValue('2-2'), [2], 'y lo colapsa si son iguales');
});

test('normalizeRirValue rechaza el texto que no es un RIR', () => {
  for (const value of ['mucho', '1-2-3', '1a3', {}, true]) {
    assert.equal(normalizeRirValue(value), null, JSON.stringify(value));
  }
});

test('normalizeRirValue es idempotente', () => {
  // Las pantallas lo llaman sobre valores ya normalizados.
  for (const value of [[FAIL], [2], [1, 3], null]) {
    assert.deepEqual(normalizeRirValue(normalizeRirValue(value)), normalizeRirValue(value));
  }
});

// --- isRirFail / hasRirValue ------------------------------------------------

test('isRirFail detecta el fallo en cualquier formato', () => {
  for (const value of [FAIL, '-1', 'FALLO', [FAIL], [FAIL, 2], [2, FAIL]]) {
    assert.equal(isRirFail(value), true, JSON.stringify(value));
  }
  for (const value of [0, 2, [1, 3], null, '', 'mucho']) {
    assert.equal(isRirFail(value), false, JSON.stringify(value));
  }
});

test('hasRirValue distingue "no hay RIR" de "RIR 0"', () => {
  // Confundirlos haría que una serie al límite pareciera sin apuntar.
  assert.equal(hasRirValue(0), true);
  assert.equal(hasRirValue([0]), true);
  assert.equal(hasRirValue(FAIL), true);
  assert.equal(hasRirValue(null), false);
  assert.equal(hasRirValue(''), false);
  assert.equal(hasRirValue([]), false);
});

// --- parseRirSelection ------------------------------------------------------

test('parseRirSelection reparte el valor en los dos campos del selector', () => {
  assert.deepEqual(parseRirSelection([1, 3]), { first: 1, second: 3 });
  assert.deepEqual(parseRirSelection([2]), { first: 2, second: null });
  assert.deepEqual(parseRirSelection(null), { first: null, second: null });
});

test('parseRirSelection pone el fallo solo en el primer campo', () => {
  // El segundo tiene que quedar vacío o el selector enseñaría "FALLO a algo".
  assert.deepEqual(parseRirSelection(FAIL), { first: FAIL, second: null });
  assert.deepEqual(parseRirSelection([FAIL, 2]), { first: FAIL, second: null });
});

test('parseRirSelection y buildRirValue son inversas', () => {
  // El selector lee con una y guarda con la otra: una ida y vuelta no puede
  // cambiar lo que apuntó el cliente.
  for (const value of [[FAIL], [0], [2], [1, 3], null]) {
    const { first, second } = parseRirSelection(value);
    assert.deepEqual(buildRirValue(first, second), normalizeRirValue(value), JSON.stringify(value));
  }
});

// --- formatRirValue ---------------------------------------------------------

test('formatRirValue escribe el número, el rango y el hueco', () => {
  assert.equal(formatRirValue(2), '2');
  assert.equal(formatRirValue([1, 3]), '1-3');
  assert.equal(formatRirValue(0), '0', 'RIR 0 se escribe, no se oculta');
  assert.equal(formatRirValue(null), '-');
});

test('formatRirValue admite cambiar el texto del hueco', () => {
  assert.equal(formatRirValue(null, { emptyLabel: ' - ' }), ' - ');
  assert.equal(formatRirValue(null, { emptyLabel: '' }), '');
});

test('formatRirValue añade la unidad solo si se pide', () => {
  assert.equal(formatRirValue([1, 3], { includeUnit: true }), '1-3 RIR');
  assert.equal(formatRirValue(2, { includeUnit: true }), '2 RIR');
});

test('formatRirValue del fallo escribe FALLO, nunca "-1"', () => {
  // Sin esto la pantalla enseñaría "-1 RIR", que no quiere decir nada.
  assert.equal(formatRirValue(FAIL), 'FALLO');
  assert.equal(formatRirValue([FAIL, 2]), 'FALLO');
  assert.equal(formatRirValue(FAIL, { includeUnit: true }), 'FALLO', 'el fallo no lleva unidad');
});

test('el texto del fallo sale del catálogo de idiomas cuando está cargado', () => {
  // Sin catálogo cae a "FALLO", que es el respaldo y lo que se sigue
  // aceptando al teclearlo.
  const root = repoRoot(__dirname);
  const es = require(path.join(root, 'packages/shared-core/src/assets/i18n/es.json'));
  const en = require(path.join(root, 'packages/shared-core/src/assets/i18n/en.json'));

  assert.equal(typeof es.RIR?.FAIL, 'string', 'falta RIR.FAIL en es.json');
  assert.equal(typeof en.RIR?.FAIL, 'string', 'falta RIR.FAIL en en.json');

  rir.applyCatalogTranslations(en, 'en');
  assert.equal(formatRirValue(FAIL), en.RIR.FAIL);
  // Y escrito en inglés se sigue reconociendo como fallo.
  assert.deepEqual(normalizeRirValue(en.RIR.FAIL), [FAIL]);

  rir.applyCatalogTranslations(es, 'es');
  assert.equal(formatRirValue(FAIL), es.RIR.FAIL);

  rir.applyCatalogTranslations(null);
  assert.equal(formatRirValue(FAIL), 'FALLO', 'sin catálogo, el respaldo');
});
