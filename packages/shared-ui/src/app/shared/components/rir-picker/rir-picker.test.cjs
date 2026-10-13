const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Selector de RIR: dos ruedas (valor y, opcional, el otro extremo del rango)
// en una hoja inferior. La regla de qué es un RIR válido vive en
// core/models/rir.ts (rir.test.cjs); aquí se prueba lo que pega las ruedas con
// ella y la hoja con la serie: que abrir el selector y darle a OK sin tocar
// nada no cambie el RIR que apuntó el cliente, y que solo OK lo cambie.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const animations = {
  animate: () => undefined,
  state: () => undefined,
  style: () => undefined,
  transition: () => undefined,
  trigger: () => undefined,
};

const modules = loadFromSource(
  __filename,
  __dirname,
  {
    getRirWheelOptions: 'src/app/shared/components/rir-picker/rir-wheel.util',
    rirWheelIndex: 'src/app/shared/components/rir-picker/rir-wheel.util',
    rirFromWheel: 'src/app/shared/components/rir-picker/rir-wheel.util',
    RirSheetComponent: 'src/app/shared/components/rir-picker/rir-sheet.component',
    RIR_SHEET_OPTIONS: 'src/app/shared/components/rir-picker/rir-sheet.component',
    RirPickerComponent: 'src/app/shared/components/rir-picker/rir-picker.component',
    normalizeRirValue: 'src/app/core/models/rir',
    parseRirSelection: 'src/app/core/models/rir',
    RIR_FAIL_VALUE: 'src/app/core/models/rir',
    applyCatalogTranslations: 'src/app/core/i18n/localized-catalog',
  },
  { requires: { '@angular/animations': animations } }
);

const {
  getRirWheelOptions,
  rirWheelIndex,
  rirFromWheel,
  RirSheetComponent,
  RIR_SHEET_OPTIONS,
  RirPickerComponent,
  normalizeRirValue,
  parseRirSelection,
  RIR_FAIL_VALUE: FAIL,
  applyCatalogTranslations,
} = modules;

// --- las filas de las ruedas ---------------------------------------------------

test('las ruedas llevan «-», FALLO y de 0 a 10, en ese orden', () => {
  const options = getRirWheelOptions();
  assert.deepEqual(
    options.map((option) => option.value),
    [null, FAIL, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  );
  assert.deepEqual(
    options.map((option) => option.label),
    ['-', 'FALLO', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  );
});

test('FALLO va en naranja y el hueco apagado; los números, sin tono', () => {
  const options = getRirWheelOptions();
  assert.equal(options[0].tone, 'muted');
  assert.equal(options[1].tone, 'accent');
  assert.ok(options.slice(2).every((option) => option.tone === undefined));
});

test('el texto de FALLO sigue al idioma cuando hay catálogo', () => {
  const root = repoRoot(__dirname);
  const en = require(path.join(root, 'packages/shared-core/src/assets/i18n/en.json'));
  applyCatalogTranslations(en, 'en');
  try {
    assert.equal(getRirWheelOptions()[1].label, en.RIR.FAIL);
  } finally {
    applyCatalogTranslations(null);
  }
});

test('rirWheelIndex da la fila de cada valor; lo desconocido cae en el hueco', () => {
  const options = getRirWheelOptions();
  assert.equal(rirWheelIndex(options, null), 0);
  assert.equal(rirWheelIndex(options, FAIL), 1);
  assert.equal(rirWheelIndex(options, 0), 2);
  assert.equal(rirWheelIndex(options, 10), 12);
  assert.equal(rirWheelIndex(options, 11), 0, '11 no es un RIR');
  assert.equal(rirWheelIndex(options, 2.5), 0);
});

test('abrir el selector y darle a OK sin tocar nada deja el RIR como estaba', () => {
  // La hoja lee el RIR con parseRirSelection y lo guarda con buildRirValue (a
  // través de las filas): una ida y vuelta no puede cambiar lo que apuntó el
  // cliente.
  const options = getRirWheelOptions();
  for (const value of [[FAIL], [0], [2], [10], [1, 3], null]) {
    const { first, second } = parseRirSelection(value);
    const result = rirFromWheel(options, rirWheelIndex(options, first), rirWheelIndex(options, second));
    assert.deepEqual(result, normalizeRirValue(value), JSON.stringify(value));
  }
});

test('rirFromWheel: una fila en cada rueda hace un rango; la misma, un solo valor', () => {
  const options = getRirWheelOptions();
  const row = (value) => rirWheelIndex(options, value);
  assert.deepEqual(rirFromWheel(options, row(1), row(3)), [1, 3]);
  assert.deepEqual(rirFromWheel(options, row(2), row(2)), [2]);
  assert.deepEqual(rirFromWheel(options, row(2), row(null)), [2]);
  assert.deepEqual(rirFromWheel(options, row(null), row(2)), [2], 'solo el segundo también vale');
});

test('rirFromWheel: FALLO en cualquiera de las dos ruedas es FALLO', () => {
  const options = getRirWheelOptions();
  const row = (value) => rirWheelIndex(options, value);
  assert.deepEqual(rirFromWheel(options, row(FAIL), row(null)), [FAIL]);
  assert.deepEqual(rirFromWheel(options, row(2), row(FAIL)), [FAIL]);
});

test('rirFromWheel: las dos ruedas en «-» borran el RIR', () => {
  const options = getRirWheelOptions();
  assert.equal(rirFromWheel(options, 0, 0), null);
});

test('rirFromWheel con una fila fuera de la lista no revienta: cuenta como vacía', () => {
  const options = getRirWheelOptions();
  assert.equal(rirFromWheel(options, 99, 99), null);
  assert.deepEqual(rirFromWheel(options, rirWheelIndex(options, 2), 99), [2]);
});

// --- la hoja ------------------------------------------------------------------------

function sheet(value) {
  const dismissed = [];
  const component = Object.create(RirSheetComponent.prototype);
  component.value = value;
  component.modalController = { dismiss: (data, role) => dismissed.push({ data, role }) };
  component.ngOnInit();
  return { component, dismissed };
}

test('la hoja abre con las ruedas en el RIR de la serie', () => {
  const { component } = sheet([1, 3]);
  const options = component.options;
  assert.equal(options[component.firstIndex].value, 1);
  assert.equal(options[component.secondIndex].value, 3);
});

test('la hoja abre en FALLO con la segunda rueda vacía', () => {
  const { component } = sheet([FAIL]);
  assert.equal(component.options[component.firstIndex].value, FAIL);
  assert.equal(component.options[component.secondIndex].value, null);
});

test('la hoja abre en «-» en las dos ruedas si la serie no tiene RIR', () => {
  const { component } = sheet(null);
  assert.equal(component.firstIndex, 0);
  assert.equal(component.secondIndex, 0);
});

test('OK cierra con el RIR de las ruedas y el role confirm', () => {
  const { component, dismissed } = sheet(null);
  component.firstIndex = rirWheelIndex(component.options, 2);
  component.confirm();
  assert.deepEqual(dismissed, [{ data: [2], role: 'confirm' }]);
});

test('OK sin tocar las ruedas devuelve el mismo RIR', () => {
  const { component, dismissed } = sheet([1, 3]);
  component.confirm();
  assert.deepEqual(dismissed, [{ data: [1, 3], role: 'confirm' }]);
});

test('OK con las dos ruedas en «-» confirma un RIR vacío (null), que no es cancelar', () => {
  const { component, dismissed } = sheet([2]);
  component.firstIndex = 0;
  component.secondIndex = 0;
  component.confirm();
  assert.deepEqual(dismissed, [{ data: null, role: 'confirm' }]);
});

test('cancelar cierra sin dato y con role cancel', () => {
  const { component, dismissed } = sheet([2]);
  component.firstIndex = rirWheelIndex(component.options, 5);
  component.cancel();
  assert.deepEqual(dismissed, [{ data: null, role: 'cancel' }]);
});

test('la hoja se abre como las demás: alto automático, tirador y deslizable', () => {
  assert.equal(RIR_SHEET_OPTIONS.component, RirSheetComponent);
  assert.equal(RIR_SHEET_OPTIONS.cssClass, 'rir-sheet-modal');
  assert.deepEqual(RIR_SHEET_OPTIONS.breakpoints, [0, 1]);
  assert.equal(RIR_SHEET_OPTIONS.initialBreakpoint, 1);
});

// --- el botón de la serie ---------------------------------------------------------

function picker(showModal, current = [2]) {
  const emitted = [];
  const component = Object.create(RirPickerComponent.prototype);
  component.rirControl = {
    value: current,
    patched: [],
    patchValue(next) {
      this.value = next;
      this.patched.push(next);
    },
  };
  component.rirChange = { emit: (next) => emitted.push(next) };
  component.ionicUtilService = { showModal };
  return { component, emitted };
}

test('OK cambia el RIR de la serie y avisa', async () => {
  const { component, emitted } = picker(async () => ({ data: [3], role: 'confirm' }));
  await component.openRirPicker();
  assert.deepEqual(component.rirControl.value, [3]);
  assert.deepEqual(emitted, [[3]]);
});

test('OK con un RIR vacío borra el de la serie', async () => {
  const { component, emitted } = picker(async () => ({ data: null, role: 'confirm' }), [2]);
  await component.openRirPicker();
  assert.equal(component.rirControl.value, null);
  assert.deepEqual(emitted, [null]);
});

test('cancelar, tocar fuera o deslizar la hoja no tocan el RIR', async () => {
  for (const role of ['cancel', 'backdrop', 'gesture', undefined]) {
    const { component, emitted } = picker(async () => ({ data: null, role }));
    await component.openRirPicker();
    assert.deepEqual(component.rirControl.value, [2], String(role));
    assert.deepEqual(component.rirControl.patched, [], String(role));
    assert.deepEqual(emitted, [], String(role));
  }
});

test('la hoja recibe el RIR actual y las opciones de siempre', async () => {
  let received;
  const { component } = picker(async (options) => {
    received = options;
    return { data: null, role: 'cancel' };
  }, [1, 3]);
  await component.openRirPicker();
  assert.deepEqual(received.componentProps, { value: [1, 3] });
  assert.equal(received.component, RirSheetComponent);
  assert.equal(received.cssClass, 'rir-sheet-modal');
});

test('un doble toque no apila dos hojas', async () => {
  let opened = 0;
  let release;
  const { component } = picker(
    () =>
      new Promise((resolve) => {
        opened++;
        release = () => resolve({ data: null, role: 'cancel' });
      })
  );
  const first = component.openRirPicker();
  await component.openRirPicker();
  assert.equal(opened, 1, 'la segunda llamada se descarta mientras hay una abierta');
  release();
  await first;
});

test('tras cerrar la hoja se puede volver a abrir, también si abrirla falló', async () => {
  let calls = 0;
  const { component } = picker(async () => {
    calls++;
    if (calls === 1) throw new Error('no se pudo abrir');
    return { data: [4], role: 'confirm' };
  });
  await assert.rejects(component.openRirPicker(), /no se pudo abrir/);
  await component.openRirPicker();
  assert.equal(calls, 2);
  assert.deepEqual(component.rirControl.value, [4]);
});
