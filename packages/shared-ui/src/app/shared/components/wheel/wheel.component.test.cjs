const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// app-wheel: lo que decide el valor del selector es qué fila cae en el
// centro al hacer scroll, y cuándo se avisa de ello. La matemática está en
// wheel.util.test.js; aquí, la parte del componente: colocar la rueda al
// abrirse, avisar solo cuando cambia la fila, no tocar nada mientras la rueda
// no se ve (un modal se crea antes de mostrarse) y el teclado.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource, angularCoreStub } = require(
  path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs')
);

const { WheelComponent } = loadFromSource(
  __filename,
  __dirname,
  { WheelComponent: 'src/app/shared/components/wheel/wheel.component' },
  {
    requires: {
      '@angular/core': { ...angularCoreStub(), ChangeDetectionStrategy: { Default: 0, OnPush: 1 } },
    },
  }
);

const ITEM = 52;
const options = Array.from({ length: 13 }, (_, i) => ({ label: String(i) }));

// Doble mínimo del contenedor con scroll: lo que usa el componente.
function fakeScroller(itemHeight = ITEM) {
  const listeners = {};
  return {
    scrollTop: 0,
    scrolledTo: [],
    listeners,
    itemHeight,
    addEventListener(type, fn) {
      listeners[type] = fn;
    },
    removeEventListener(type) {
      delete listeners[type];
    },
    querySelector() {
      return { offsetHeight: this.itemHeight };
    },
    scrollTo(position) {
      this.scrolledTo.push(position);
      this.scrollTop = position.top;
    },
  };
}

function wheel({ index = 0, itemHeight = ITEM, list = options } = {}) {
  const emitted = [];
  const scroller = fakeScroller(itemHeight);
  const zone = { runOutsideAngular: (fn) => fn(), run: (fn) => fn() };
  const cdr = { markForCheck() {} };
  const component = new WheelComponent(zone, cdr);
  component.scroller = { nativeElement: scroller };
  component.indexChange = { emit: (value) => emitted.push(value) };
  component.options = list;
  component.index = index;
  component.ngOnChanges({ index: { firstChange: true }, options: { firstChange: true } });
  return { component, scroller, emitted };
}

const saved = {};
test.before(() => {
  saved.matchMedia = globalThis.matchMedia;
});
test.afterEach(() => {
  if (saved.matchMedia === undefined) delete globalThis.matchMedia;
  else globalThis.matchMedia = saved.matchMedia;
});

test('al abrirse, la rueda se coloca en la fila elegida', () => {
  const { component, scroller } = wheel({ index: 4 });
  component.ngAfterViewInit();
  assert.equal(component.activeIndex, 4);
  assert.equal(scroller.scrollTop, 4 * ITEM);
});

test('un índice fuera de la lista se recorta al extremo', () => {
  assert.equal(wheel({ index: 99 }).component.activeIndex, 12);
  assert.equal(wheel({ index: -5 }).component.activeIndex, 0);
});

test('colocar la rueda no cuenta como un cambio de fila', () => {
  // Abrir el selector en el RIR 2 no puede avisar de un "cambio": el padre
  // lo tomaría por una elección del usuario.
  const { component, scroller, emitted } = wheel({ index: 4 });
  component.ngAfterViewInit();
  scroller.listeners.scroll();
  assert.deepEqual(emitted, []);
});

test('mientras la rueda no se ve (sin medidas) no se coloca ni avisa', () => {
  // Un modal monta sus componentes antes de mostrarse: con alto de fila 0,
  // fijar el scroll lo dejaría clavado en 0 para siempre.
  const { component, scroller, emitted } = wheel({ index: 4, itemHeight: 0 });
  component.ngAfterViewInit();
  assert.equal(scroller.scrollTop, 0);
  scroller.scrollTop = 300;
  scroller.listeners.scroll();
  assert.deepEqual(emitted, []);
});

test('al hacer scroll avisa de la fila central cuando cambia, y solo entonces', () => {
  const { component, scroller, emitted } = wheel({ index: 0 });
  component.ngAfterViewInit();
  scroller.scrollTop = 6 * ITEM + 10;
  scroller.listeners.scroll();
  scroller.scrollTop = 6 * ITEM + 20;
  scroller.listeners.scroll();
  scroller.scrollTop = 7 * ITEM;
  scroller.listeners.scroll();
  assert.deepEqual(emitted, [6, 7]);
  assert.equal(component.activeIndex, 7);
});

test('si el padre cambia el índice, la rueda se mueve sin animar', () => {
  const { component, scroller } = wheel({ index: 2 });
  component.ngAfterViewInit();
  component.index = 9;
  component.ngOnChanges({ index: { firstChange: false } });
  assert.equal(component.activeIndex, 9);
  assert.deepEqual(scroller.scrolledTo.at(-1), { top: 9 * ITEM, behavior: 'auto' });
});

test('que el padre reciba el aviso y vuelva a pasar el mismo índice no mueve nada', () => {
  // Con [(index)] el valor emitido vuelve como input: si recolocara la rueda
  // en cada vuelta, pelearía con el dedo durante el gesto.
  const { component, scroller } = wheel({ index: 0 });
  component.ngAfterViewInit();
  scroller.scrollTop = 5 * ITEM;
  scroller.listeners.scroll();
  const scrolls = scroller.scrolledTo.length;
  component.index = 5;
  component.ngOnChanges({ index: { firstChange: false } });
  assert.equal(scroller.scrolledTo.length, scrolls);
});

test('tocar una fila lleva hasta ella con animación', () => {
  globalThis.matchMedia = () => ({ matches: false });
  const { component, scroller } = wheel({ index: 0 });
  component.ngAfterViewInit();
  component.select(3);
  assert.deepEqual(scroller.scrolledTo.at(-1), { top: 3 * ITEM, behavior: 'smooth' });
});

test('con "reducir movimiento" la rueda salta sin animar', () => {
  globalThis.matchMedia = () => ({ matches: true });
  const { component, scroller } = wheel({ index: 0 });
  component.ngAfterViewInit();
  component.select(3);
  assert.deepEqual(scroller.scrolledTo.at(-1), { top: 3 * ITEM, behavior: 'auto' });
});

test('teclado: las flechas mueven una fila y consumen la tecla', () => {
  globalThis.matchMedia = () => ({ matches: false });
  const { component, scroller } = wheel({ index: 3 });
  component.ngAfterViewInit();
  let prevented = 0;
  scroller.listeners.keydown({ key: 'ArrowDown', preventDefault: () => prevented++ });
  assert.deepEqual(scroller.scrolledTo.at(-1), { top: 4 * ITEM, behavior: 'smooth' });
  assert.equal(prevented, 1);
});

test('teclado: una tecla que no es de la rueda se deja pasar', () => {
  const { component, scroller } = wheel({ index: 3 });
  component.ngAfterViewInit();
  const before = scroller.scrolledTo.length;
  let prevented = 0;
  scroller.listeners.keydown({ key: 'Tab', preventDefault: () => prevented++ });
  assert.equal(prevented, 0, 'Tab tiene que seguir moviendo el foco');
  assert.equal(scroller.scrolledTo.length, before);
});

test('el toque no sube a la hoja (si no, mover la rueda arrastraría y cerraría el modal)', () => {
  const { component, scroller } = wheel();
  component.ngAfterViewInit();
  for (const type of ['touchstart', 'mousedown']) {
    let stopped = 0;
    scroller.listeners[type]({ stopPropagation: () => stopped++ });
    assert.equal(stopped, 1, type);
  }
});

test('al destruirse quita sus escuchas', () => {
  const { component, scroller } = wheel();
  component.ngAfterViewInit();
  assert.deepEqual(Object.keys(scroller.listeners).sort(), ['keydown', 'mousedown', 'scroll', 'touchstart']);
  component.ngOnDestroy();
  assert.deepEqual(Object.keys(scroller.listeners), []);
});

test('cada rueda tiene ids de opción propios (dos ruedas en la misma hoja)', () => {
  const a = wheel().component;
  const b = wheel().component;
  assert.notEqual(a.optionId(0), b.optionId(0));
  assert.notEqual(a.optionId(0), a.optionId(1));
});
