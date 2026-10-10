const test = require('node:test');
const assert = require('node:assert/strict');

let dayRangeLabel;
test.before(async () => {
  ({ dayRangeLabel } = await import('./day-range-label.util.ts'));
});

test('un día o un rango, en el idioma del usuario y nunca en ISO', () => {
  assert.equal(dayRangeLabel('2026-10-09', '2026-10-09', 'es-ES'), '9 oct');
  assert.equal(dayRangeLabel('2026-10-09', '2026-10-15', 'es-ES'), '9 oct → 15 oct');
  assert.equal(dayRangeLabel('2026-10-09', '2026-10-15', 'en-GB'), '9 Oct → 15 Oct');
});

test('si cruza de año, con año', () => {
  assert.equal(dayRangeLabel('2026-12-28', '2027-01-03', 'es-ES'), '28 dic 2026 → 3 ene 2027');
});

test('sin inicio o fin, nada', () => {
  assert.equal(dayRangeLabel(null, '2026-10-09', 'es-ES'), null);
  assert.equal(dayRangeLabel('2026-10-09', undefined, 'es-ES'), null);
});
