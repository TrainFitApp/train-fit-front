const test = require('node:test');
const assert = require('node:assert/strict');

let painTrend;
test.before(async () => {
  ({ painTrend } = await import('./pain-trend.util.ts'));
});

test('con un solo registro no hay tendencia', () => {
  assert.equal(painTrend(4, null), null);
  assert.equal(painTrend(null, null), null);
});

test('último frente al anterior', () => {
  assert.equal(painTrend(3, 6), 'mejor');
  assert.equal(painTrend(7, 2), 'peor', 'antes nunca salía «peor»: se comparaba con el máximo del periodo');
  assert.equal(painTrend(5, 5), 'igual');
  assert.equal(painTrend(0, 0), 'igual', 'un 0 es un registro, no «sin dato»');
});
