const test = require('node:test');
const assert = require('node:assert/strict');
let alertEnterSubmitIndex;
test.before(async () => { ({ alertEnterSubmitIndex } = await import('./alert-enter-submit.util.ts')); });

test('Enter elige la única acción de un alert con campos monolínea', () => {
  const buttons = [{ text: 'Cancelar', role: 'cancel' }, { text: 'Guardar', handler() {} }];
  assert.equal(alertEnterSubmitIndex({ inputs: [{ name: 'name', type: 'text' }], buttons }), 1);
  assert.equal(alertEnterSubmitIndex({ inputs: [{ name: 'name' }, { type: 'number' }], buttons }), 1);
});

test('No elige acciones de confirmaciones, textarea, fechas, selects o menús ambiguos', () => {
  const save = { text: 'Guardar', handler() {} };
  for (const options of [
    { buttons: [save] }, { inputs: [{ type: 'textarea' }], buttons: [save] },
    { inputs: [{ type: 'checkbox' }], buttons: [save] },
    { inputs: [{ type: 'radio' }], buttons: [save] },
    { inputs: [{ type: 'date' }], buttons: [save] },
    { inputs: [{ type: 'text' }], buttons: [save, { text: 'Eliminar', handler() {} }] },
    { inputs: [{ type: 'text' }], buttons: ['Cancelar', save] },
    { inputs: [{ type: 'text' }], buttons: [{ text: 'Cerrar' }] },
  ]) assert.equal(alertEnterSubmitIndex(options), -1);
});
