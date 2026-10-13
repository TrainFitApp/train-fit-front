const test = require('node:test');
const assert = require('node:assert/strict');

// La rueda (app-wheel) deja el encaje al scroll-snap del navegador y solo lee
// qué fila quedó en el centro. Esa lectura es lo que decide qué valor se
// guarda, así que se prueba entera: del scroll a la fila y de la fila al
// scroll, en los extremos y con medidas raras.

let wheel;
test.before(async () => {
  wheel = await import('./wheel.util.ts');
});

const ITEM = 52;

test('la fila central es la que queda a scrollTop / alto de fila', () => {
  assert.equal(wheel.wheelIndexFromScroll(0, ITEM, 13), 0);
  assert.equal(wheel.wheelIndexFromScroll(ITEM * 4, ITEM, 13), 4);
  assert.equal(wheel.wheelIndexFromScroll(ITEM * 12, ITEM, 13), 12);
});

test('a medias entre dos filas gana la más cercana', () => {
  // Durante un gesto el scroll cae entre dos filas: el valor que se ve
  // elegido es el de la más próxima, no el de la de arriba.
  assert.equal(wheel.wheelIndexFromScroll(ITEM * 3 + ITEM * 0.4, ITEM, 13), 3);
  assert.equal(wheel.wheelIndexFromScroll(ITEM * 3 + ITEM * 0.6, ITEM, 13), 4);
});

test('el rebote de iOS (scroll negativo o pasado del final) no se sale de la lista', () => {
  assert.equal(wheel.wheelIndexFromScroll(-80, ITEM, 13), 0);
  assert.equal(wheel.wheelIndexFromScroll(ITEM * 40, ITEM, 13), 12);
});

test('sin medidas todavía (rueda oculta) la fila es la primera', () => {
  // Un modal se crea antes de verse: sin diseño el alto de fila es 0, y
  // dividir entre 0 daría NaN o Infinity.
  assert.equal(wheel.wheelIndexFromScroll(500, 0, 13), 0);
  assert.equal(wheel.wheelIndexFromScroll(500, NaN, 13), 0);
});

test('una rueda sin opciones siempre está en 0', () => {
  assert.equal(wheel.wheelIndexFromScroll(500, ITEM, 0), 0);
  assert.equal(wheel.clampWheelIndex(3, 0), 0);
  assert.equal(wheel.wheelScrollTop(3, ITEM, 0), 0);
});

test('clampWheelIndex redondea y recorta', () => {
  assert.equal(wheel.clampWheelIndex(2.4, 13), 2);
  assert.equal(wheel.clampWheelIndex(2.6, 13), 3);
  assert.equal(wheel.clampWheelIndex(-5, 13), 0);
  assert.equal(wheel.clampWheelIndex(99, 13), 12);
  assert.equal(wheel.clampWheelIndex(NaN, 13), 0);
  assert.equal(wheel.clampWheelIndex(Infinity, 13), 0);
});

test('wheelScrollTop y wheelIndexFromScroll son inversas', () => {
  // Colocar la rueda en una fila y leerla de vuelta no puede cambiarla: si
  // no, abrir el selector con el RIR 2 lo guardaría como 3 sin tocarlo.
  for (let index = 0; index < 13; index++) {
    const top = wheel.wheelScrollTop(index, ITEM, 13);
    assert.equal(top, index * ITEM);
    assert.equal(wheel.wheelIndexFromScroll(top, ITEM, 13), index);
  }
});

test('wheelScrollTop recorta una fila fuera de la lista', () => {
  assert.equal(wheel.wheelScrollTop(40, ITEM, 13), 12 * ITEM);
  assert.equal(wheel.wheelScrollTop(-3, ITEM, 13), 0);
});

test('teclas: flechas de una en una, Re/Av Pág de cuatro, Inicio y Fin a los extremos', () => {
  assert.equal(wheel.wheelKeyTarget('ArrowDown', 3, 13), 4);
  assert.equal(wheel.wheelKeyTarget('ArrowUp', 3, 13), 2);
  assert.equal(wheel.wheelKeyTarget('PageDown', 3, 13), 7);
  assert.equal(wheel.wheelKeyTarget('PageUp', 6, 13), 2);
  assert.equal(wheel.wheelKeyTarget('Home', 9, 13), 0);
  assert.equal(wheel.wheelKeyTarget('End', 2, 13), 12);
});

test('las teclas no se pasan de los extremos', () => {
  assert.equal(wheel.wheelKeyTarget('ArrowUp', 0, 13), 0);
  assert.equal(wheel.wheelKeyTarget('ArrowDown', 12, 13), 12);
  assert.equal(wheel.wheelKeyTarget('PageDown', 10, 13), 12);
  assert.equal(wheel.wheelKeyTarget('PageUp', 1, 13), 0);
});

test('una tecla que no mueve la rueda devuelve null (el navegador la sigue tratando)', () => {
  for (const key of ['Enter', 'Tab', 'a', ' ', 'Escape', 'ArrowLeft']) {
    assert.equal(wheel.wheelKeyTarget(key, 3, 13), null, key);
  }
});
