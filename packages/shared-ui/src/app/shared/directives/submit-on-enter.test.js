const test = require('node:test');
const assert = require('node:assert/strict');

let submitOnEnter;
test.before(async () => { ({ submitOnEnter } = await import('./submit-on-enter.util.ts')); });

function element(tagName, props = {}) {
  return {
    tagName, type: 'text', readOnly: false, disabled: false, isConnected: true,
    matches: () => false, hasAttribute: () => false, getAttribute: () => null,
    ...props,
  };
}
function fixture(inputProps = {}, eventProps = {}) {
  const scope = element('DIV', { hasAttribute: name => name === 'data-enter-submit-scope' });
  const input = element('INPUT', inputProps);
  let clicks = 0;
  const button = element('BUTTON', { click: () => clicks++ });
  const event = {
    key: 'Enter', defaultPrevented: false, composedPath: () => [input, scope],
    preventDefault() { this.defaultPrevented = true; }, stopPropagation() {}, ...eventProps,
  };
  return { input, scope, button, event, clicks: () => clicks };
}

test('Enter confirma exactamente el botón indicado y consume el submit implícito', () => {
  const f = fixture();
  submitOnEnter(f.event, f.scope, f.button);
  assert.equal(f.clicks(), 1);
  assert.equal(f.event.defaultPrevented, true);
  submitOnEnter(f.event, f.scope, f.button);
  assert.equal(f.clicks(), 1);
});

test('No envía búsquedas, multilínea, selectores ni controles no editables', () => {
  for (const props of [
    { type: 'search' }, { tagName: 'TEXTAREA' }, { tagName: 'SELECT' },
    { type: 'checkbox' }, { type: 'date' }, { type: 'range' }, { readOnly: true },
    { disabled: true }, { matches: () => true },
  ]) {
    const f = fixture(props);
    submitOnEnter(f.event, f.scope, f.button);
    assert.equal(f.clicks(), 0);
    assert.equal(f.event.defaultPrevented, false);
  }
});

test('Conserva composición IME, atajos, repetición y eventos consumidos', () => {
  for (const props of [
    { isComposing: true }, { keyCode: 229 }, { repeat: true }, { shiftKey: true },
    { ctrlKey: true }, { altKey: true }, { metaKey: true }, { defaultPrevented: true }, { key: 'Escape' },
  ]) {
    const f = fixture({}, props);
    submitOnEnter(f.event, f.scope, f.button);
    assert.equal(f.clicks(), 0);
  }
});

test('Botón deshabilitado, aria-disabled o retirado del DOM nunca envía', () => {
  for (const props of [{ disabled: true }, { getAttribute: () => 'true' }, { isConnected: false }]) {
    const f = fixture();
    Object.assign(f.button, props);
    submitOnEnter(f.event, f.scope, f.button);
    assert.equal(f.clicks(), 0);
    assert.equal(f.event.defaultPrevented, true);
  }
});

test('Solo actúa el contenedor más cercano, también con componentes hijos', () => {
  const f = fixture({ type: 'number' });
  const outer = element('DIV', { hasAttribute: () => true });
  f.event.composedPath = () => [f.input, element('APP-MACRO-ADJUST'), f.scope, outer];
  submitOnEnter(f.event, outer, f.button);
  assert.equal(f.clicks(), 0);
  submitOnEnter(f.event, f.scope, f.button);
  assert.equal(f.clicks(), 1);
});

test('Respeta textarea/combo/búsqueda en ancestros y soporta ion-input', () => {
  const f = fixture();
  f.event.composedPath = () => [f.input, element('ION-INPUT'), f.scope];
  submitOnEnter(f.event, f.scope, f.button);
  assert.equal(f.clicks(), 1);
  const blocked = fixture();
  blocked.event.composedPath = () => [blocked.input, element('DIV', { matches: () => true }), blocked.scope];
  submitOnEnter(blocked.event, blocked.scope, blocked.button);
  assert.equal(blocked.clicks(), 0);
});

test('Sin target opt-in no cambia el comportamiento de otra app', () => {
  const f = fixture();
  submitOnEnter(f.event, f.scope, null);
  assert.equal(f.clicks(), 0);
  assert.equal(f.event.defaultPrevented, false);
});
