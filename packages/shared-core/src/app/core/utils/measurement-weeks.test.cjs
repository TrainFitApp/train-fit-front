const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, 'measurement-weeks.util.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const utils = {};
new Function('exports', compiled)(utils);

test('semana completa entre meses, fechas civiles y denominador de pesajes', () => {
  const result = utils.weightWeek([
    { date: '2026-08-31', weight: 80 }, { date: '2026-09-01', weight: 82 },
    { date: '2026-09-01', weight: 82 }, { date: '2026-09-02', weight: 0 },
    { date: '2026-09-04', weight: 90 },
  ], '2026-09-01', '2026-09-03');
  assert.deepEqual(result, { start: '2026-08-31', end: '2026-09-06', average: 81, count: 2, partial: true });
  assert.equal(utils.weightAverage([0, null, NaN, Infinity]), null);
  assert.equal(utils.weightWeek([], '2026-09-01', '2026-09-10').partial, false);
});

test('fin de año, domingo, año bisiesto y zona de referencia', () => {
  assert.equal(utils.mondayOf('2026-01-01'), '2025-12-29');
  assert.equal(utils.mondayOf('2026-03-29'), '2026-03-23');
  assert.equal(utils.isCivilDate('2026-02-29'), false);
  assert.equal(utils.isCivilDate('2024-02-29'), true);
  assert.equal(utils.measurementToday('Europe/Madrid', new Date('2026-09-09T23:30:00Z')), '2026-09-10');
  assert.equal(utils.measurementToday('America/Los_Angeles', new Date('2026-09-09T23:30:00Z')), '2026-09-09');
});
