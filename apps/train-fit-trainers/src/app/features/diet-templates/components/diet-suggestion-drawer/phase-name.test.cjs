const test = require('node:test');
const assert = require('node:assert/strict');

let suggestedPhaseName;
test.before(async () => {
  ({ suggestedPhaseName } = await import('./phase-name.util.ts'));
});

test('al elegir una dieta, la fase hereda su nombre', () => {
  assert.equal(suggestedPhaseName('Nueva fase', 'Nueva fase', 'Nueva fase', 'Definición 2.000'), 'Definición 2.000');
});

test('cambiar de dieta cambia el nombre si no se ha escrito a mano', () => {
  assert.equal(suggestedPhaseName('Definición 2.000', 'Definición 2.000', 'Nueva fase', 'Volumen'), 'Volumen');
});

test('lo escrito a mano no se pisa', () => {
  assert.equal(suggestedPhaseName('Bloque verano', 'Definición 2.000', 'Nueva fase', 'Volumen'), null);
});

test('sin dieta elegida (o sin nombre) vuelve al por defecto', () => {
  assert.equal(suggestedPhaseName('Volumen', 'Volumen', 'Nueva fase', null), 'Nueva fase');
  assert.equal(suggestedPhaseName('', 'Volumen', 'Nueva fase', '  '), 'Nueva fase');
});
