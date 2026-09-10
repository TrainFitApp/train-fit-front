const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadTypeScript(filename) {
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const target = { exports: {} };
  const resolve = (id) => id === 'src/app/core/utils/measurement-weeks.util'
    ? loadTypeScript(path.resolve(__dirname, '../../../../../../shared-core/src/app/core/utils/measurement-weeks.util.ts'))
    : require(id);
  new Function('exports', 'module', 'require', output)(target.exports, target, resolve);
  return target.exports;
}

const { validateInitialMeasurements, todayInTimeZone, initialMeasurementConflicts } = loadTypeScript(path.join(__dirname, 'initial-measurements.ts'));
const catalog = [
  { key: 'weight', label: 'Peso', unit: 'kg', min: 25, max: 350 },
  { key: 'waist', label: 'Cintura', unit: 'cm', min: 45, max: 220 },
];
const today = '2026-09-10';

test('counts only requested missing fields; an absent weight never becomes zero', () => {
  const result = validateInitialMeasurements(catalog, [{ field: 'waist', value: '85,5', date: today }], today);
  assert.deepEqual(result.missing.map((item) => item.key), ['weight']);
  assert.deepEqual(result.values, [{ field: 'waist', value: 85.5, date: today }]);
  assert.deepEqual(result.errors, {});
});

test('preserves an explicitly reused earlier date independently for each field', () => {
  const result = validateInitialMeasurements(catalog, [
    { field: 'weight', value: '80.5', date: '2026-09-01', confirmedExisting: true },
    { field: 'waist', value: '86', date: '2026-09-08' },
  ], today);
  assert.equal(result.values[0].date, '2026-09-01');
  assert.equal(result.values[0].confirmedExisting, true);
  assert.equal(result.values[1].date, '2026-09-08');
  assert.equal(result.values[1].confirmedExisting, undefined);
});

test('invalid entered measurements cannot be bypassed as missing', () => {
  for (const value of ['0', '-80', 'Infinity', '80kg', '1e2', '351']) {
    const result = validateInitialMeasurements(catalog.slice(0, 1), [{ field: 'weight', value, date: today }], today);
    assert.ok(result.errors.weight, value);
    assert.equal(result.missing.length, 0);
    assert.equal(result.values.length, 0);
  }
});

test('validates civil dates and rejects future measurements', () => {
  for (const date of ['2026-02-30', '10/09/2026', '2026-09-11', '']) {
    assert.ok(validateInitialMeasurements(catalog.slice(0, 1), [{ field: 'weight', value: '80', date }], today).errors.weight);
  }
});

test('today uses the same client timezone at midnight as shared weight calculations', () => {
  const midnight = new Date('2026-09-10T00:30:00Z');
  assert.equal(todayInTimeZone('America/New_York', midnight), '2026-09-09');
  assert.equal(todayInTimeZone('Europe/Madrid', midnight), '2026-09-10');
  assert.equal(todayInTimeZone('invalid/timezone', midnight), '2026-09-10');
});

test('a conflict shows the recorded and submitted values without changing the draft', () => {
  const submitted = [{ field: 'weight', value: 80, date: '2026-09-01' }];
  const conflicts = initialMeasurementConflicts({ error: { code: 'MEASUREMENT_CONFLICT', currentValues: { weight: 81 } } }, submitted, catalog);
  assert.deepEqual(conflicts, [{ field: 'weight', label: 'Peso', unit: 'kg', date: '2026-09-01', value: 80, currentValue: 81 }]);
  assert.equal(submitted[0].value, 80);
});
