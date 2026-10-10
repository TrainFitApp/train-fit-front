const test = require('node:test');
const assert = require('node:assert/strict');

let initialRoutineSelection;
test.before(async () => {
  ({ initialRoutineSelection } = await import('./apply-routine-selection.util.ts'));
});

test('con una sola rutina sale ya elegida', () => {
  assert.equal(initialRoutineSelection([{ _id: 't1' }]), 't1');
});

test('con varias (o ninguna) no se elige por el profesional', () => {
  assert.equal(initialRoutineSelection([{ _id: 't1' }, { _id: 't2' }]), null);
  assert.equal(initialRoutineSelection([]), null);
  assert.equal(initialRoutineSelection(null), null);
});
