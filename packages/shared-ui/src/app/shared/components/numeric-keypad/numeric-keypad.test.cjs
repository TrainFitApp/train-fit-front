const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Teclado numérico a medida: dos formas de quedarse sin teclado al tocar un
// input de current-workout (QA 2026-10-13, «a veces no sale»).
//
// 1. ion-app se encogía en el propio focus. El foco llega en el mousedown del
//    toque y el click en su mouseup, seguidos en la misma tarea: un input de
//    la franja inferior (la que ocupa el teclado) quedaba fuera de ion-app
//    antes del mouseup, el click se redirigía a `body` y el click global lo
//    tomaba por un toque en otro sitio: cerraba el teclado recién abierto.
// 2. Tocar la etiqueta o el marco de un campo (no el input) cerraba el
//    teclado en vez de abrirlo.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { NumericKeypadService, NumericKeypadComponent } = loadFromSource(
  __filename,
  __dirname,
  {
    NumericKeypadService: 'src/app/shared/components/numeric-keypad/numeric-keypad.service',
    NumericKeypadComponent: 'src/app/shared/components/numeric-keypad/numeric-keypad.component',
  },
  { requires: { '@capacitor/core': { Capacitor: { isNativePlatform: () => true } } } }
);

const HOST_ATTR = '[data-numeric-keypad]';

// Doble mínimo del DOM: solo lo que usa el servicio (instanceof, closest,
// activeElement, readOnly/disabled y blur).
class FakeElement {
  constructor(closestMap = {}) {
    this.closestMap = closestMap;
  }
  closest(selector) {
    return this.closestMap[selector] ?? null;
  }
}
class FakeInput extends FakeElement {
  constructor() {
    super();
    this.readOnly = false;
    this.disabled = false;
    this.blurred = false;
    // Un input marcado con appNumericKeypad lleva el atributo en sí mismo.
    this.closestMap = { [HOST_ATTR]: this };
  }
  blur() {
    this.blurred = true;
    if (fakeDocument.activeElement === this) fakeDocument.activeElement = null;
  }
}

const fakeDocument = { activeElement: null, ionApp: {}, querySelector: () => fakeDocument.ionApp };
const saved = {};

test.before(() => {
  for (const name of ['Element', 'HTMLInputElement', 'document']) saved[name] = globalThis[name];
  globalThis.Element = FakeElement;
  globalThis.HTMLInputElement = FakeInput;
  globalThis.document = fakeDocument;
});
test.after(() => {
  for (const name of Object.keys(saved)) {
    if (saved[name] === undefined) delete globalThis[name];
    else globalThis[name] = saved[name];
  }
});

/** Servicio con el teclado abierto sobre `input` (enfocado). */
function openOn(input) {
  const service = new NumericKeypadService();
  fakeDocument.activeElement = input;
  service.show();
  return service;
}

const visible = (service) => {
  let value;
  service.visible$.subscribe((v) => (value = v)).unsubscribe();
  return value;
};

test('tocar el propio input no cierra el teclado', () => {
  const input = new FakeInput();
  const service = openOn(input);
  service.hideKeyboardIfInteractingElsewhere(input);
  assert.equal(visible(service), true);
  assert.equal(input.blurred, false);
});

test('tocar la etiqueta o el marco de un campo del teclado no lo cierra (el navegador reenvía el foco al input)', () => {
  const focused = new FakeInput();
  const other = new FakeInput();
  const service = openOn(focused);
  const label = new FakeElement();
  label.closestMap = { label };
  label.control = other;
  const labelText = new FakeElement({ label });
  service.hideKeyboardIfInteractingElsewhere(labelText);
  service.hideKeyboardIfInteractingElsewhere(label);
  assert.equal(visible(service), true);
  assert.equal(focused.blurred, false);
});

test('tocar una etiqueta de un campo que no es del teclado sí lo cierra', () => {
  const focused = new FakeInput();
  const service = openOn(focused);
  const label = new FakeElement();
  label.control = new FakeElement();
  service.hideKeyboardIfInteractingElsewhere(new FakeElement({ label }));
  assert.equal(visible(service), false);
  assert.equal(focused.blurred, true);
});

test('tocar una etiqueta sin control, o cualquier otra cosa, cierra el teclado', () => {
  for (const target of [new FakeElement({ label: new FakeElement() }), new FakeElement(), null]) {
    const focused = new FakeInput();
    const service = openOn(focused);
    service.hideKeyboardIfInteractingElsewhere(target);
    assert.equal(visible(service), false);
    assert.equal(focused.blurred, true);
  }
});

test('un input de solo lectura con etiqueta no cuenta como campo del teclado', () => {
  const focused = new FakeInput();
  const readOnly = new FakeInput();
  readOnly.readOnly = true;
  const service = openOn(focused);
  const label = new FakeElement();
  label.control = readOnly;
  service.hideKeyboardIfInteractingElsewhere(new FakeElement({ label }));
  assert.equal(visible(service), false);
});

// ion-app se encoge DESPUÉS del click del toque que abre el teclado.
function mountKeypad() {
  const service = new NumericKeypadService();
  const calls = [];
  const renderer = {
    addClass: (_el, name) => calls.push(`add:${name}`),
    removeClass: (_el, name) => calls.push(`remove:${name}`),
  };
  const component = new NumericKeypadComponent({ nativeElement: {} }, renderer, service);
  component.ngOnInit();
  return { service, calls, component };
}
const nextTask = () => new Promise((resolve) => setTimeout(resolve));

test('al abrir el teclado ion-app no se encoge hasta la tarea siguiente', async () => {
  const { service, calls, component } = mountKeypad();
  await nextTask();
  calls.length = 0;

  service.show();
  // Misma tarea que el foco: aquí llega el mouseup y el click del toque, que
  // tiene que resolverse todavía contra el layout sin encoger.
  assert.deepEqual(calls, []);

  await nextTask();
  assert.deepEqual(calls, ['add:numeric-keypad-open']);
  component.ngOnDestroy();
});

test('abrir y cerrar en la misma tarea no deja ion-app encogido', async () => {
  const { service, calls, component } = mountKeypad();
  await nextTask();
  calls.length = 0;

  service.show();
  service.hide();
  await nextTask();
  assert.ok(!calls.includes('add:numeric-keypad-open'), `se encogió ion-app: ${calls}`);
  assert.deepEqual(calls, ['remove:numeric-keypad-open']);
  component.ngOnDestroy();
});

test('destruir el teclado cancela el cambio pendiente de ion-app', async () => {
  const { service, calls, component } = mountKeypad();
  await nextTask();
  calls.length = 0;

  service.show();
  component.ngOnDestroy();
  await nextTask();
  assert.deepEqual(calls, []);
});
