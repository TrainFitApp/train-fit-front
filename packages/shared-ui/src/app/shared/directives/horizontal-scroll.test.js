const test = require('node:test');
const assert = require('node:assert/strict');

let scrollEdges;
let wheelScrollDelta;
let isDragGesture;
test.before(async () => {
  ({ scrollEdges, wheelScrollDelta, isDragGesture } = await import('./horizontal-scroll.util.ts'));
});

// Fila de chips de 420px con 540px de contenido (el panel lateral de trainers).
const row = (scrollLeft) => ({ scrollLeft, scrollWidth: 540, clientWidth: 420 });
const wheel = (props) => ({ deltaX: 0, deltaY: 0, deltaMode: 0, ctrlKey: false, ...props });

test('scrollEdges avisa del lado por el que quedan chips escondidos', () => {
  assert.deepEqual(scrollEdges(row(0)), { start: false, end: true });
  assert.deepEqual(scrollEdges(row(60)), { start: true, end: true });
  assert.deepEqual(scrollEdges(row(120)), { start: true, end: false });
  // Densidad de píxeles fraccional: medio píxel del final ya es el final.
  assert.deepEqual(scrollEdges(row(119.5)), { start: true, end: false });
});

test('scrollEdges: si todo cabe, ningún lado', () => {
  assert.deepEqual(scrollEdges({ scrollLeft: 0, scrollWidth: 420, clientWidth: 420 }), { start: false, end: false });
  assert.deepEqual(scrollEdges({ scrollLeft: 0, scrollWidth: 420.5, clientWidth: 420 }), { start: false, end: false });
});

test('la rueda vertical mueve la fila en horizontal, en píxeles, líneas o páginas', () => {
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaY: 100 })), 100);
  assert.equal(wheelScrollDelta(row(60), wheel({ deltaY: -100 })), -100);
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaY: 3, deltaMode: 1 })), 48);
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaY: 1, deltaMode: 2 })), 420);
});

test('la rueda no se queda el evento si la fila no puede moverse hacia ese lado', () => {
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaY: -100 })), 0);
  assert.equal(wheelScrollDelta(row(120), wheel({ deltaY: 100 })), 0);
  assert.equal(wheelScrollDelta({ scrollLeft: 0, scrollWidth: 300, clientWidth: 420 }, wheel({ deltaY: 100 })), 0);
});

test('gestos horizontales del trackpad y pellizco de zoom se dejan al navegador', () => {
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaX: 40, deltaY: 10 })), 0);
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaX: 20, deltaY: 20 })), 0);
  assert.equal(wheelScrollDelta(row(0), wheel({ deltaY: 100, ctrlKey: true })), 0);
  assert.equal(wheelScrollDelta(row(0), wheel({})), 0);
});

test('mover el ratón unos píxeles con el botón pulsado sigue siendo un clic en el chip', () => {
  assert.equal(isDragGesture(100, 105), false);
  assert.equal(isDragGesture(100, 95), false);
  assert.equal(isDragGesture(100, 106), true);
  assert.equal(isDragGesture(100, 80), true);
});
