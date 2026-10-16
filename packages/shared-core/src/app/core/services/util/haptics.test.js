const test = require('node:test');
const assert = require('node:assert/strict');
let hapticForToastColor, isTypingTarget, createHapticThrottle;
test.before(async () => {
  ({ hapticForToastColor, isTypingTarget, createHapticThrottle } = await import('./haptics.util.ts'));
});

test('Los toasts de éxito, aviso y error vibran; los informativos no', () => {
  assert.equal(hapticForToastColor('success'), 'success');
  assert.equal(hapticForToastColor('warning'), 'warning');
  assert.equal(hapticForToastColor('danger'), 'error');
  for (const color of ['tertiary', 'primary', 'medium', undefined, null, '']) {
    assert.equal(hapticForToastColor(color), null);
  }
});

test('Solo cuentan como escritura los campos de texto', () => {
  assert.equal(isTypingTarget({ tagName: 'TEXTAREA' }), true);
  for (const type of ['', 'text', 'number', 'email', 'search', 'password', 'tel', 'url']) {
    assert.equal(isTypingTarget({ tagName: 'INPUT', type }), true, type);
  }
  for (const type of ['checkbox', 'radio', 'range', 'date', 'file', 'color']) {
    assert.equal(isTypingTarget({ tagName: 'INPUT', type }), false, type);
  }
  assert.equal(isTypingTarget({ tagName: 'DIV' }), false);
  assert.equal(isTypingTarget(null), false);
});

test('El throttle deja pasar como mucho una vibración por intervalo', () => {
  let now = 1000;
  const allow = createHapticThrottle(60, () => now);
  assert.equal(allow(), true);
  now += 30;
  assert.equal(allow(), false);
  now += 29;
  assert.equal(allow(), false);
  now += 1;
  assert.equal(allow(), true);
});
