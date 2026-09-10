const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, 'weekly-weight-chart.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleExports = {};
new Function('exports', output)(moduleExports);
const { buildWeeklyWeightChart } = moduleExports;
const week = (index, average, count = average === null ? 0 : 3) => ({
  start: `2026-08-${String(index * 7 + 3).padStart(2, '0')}`, end: '', average, count, partial: false,
});

test('A missing week breaks the line and keeps the time gap', () => {
  const chart = buildWeeklyWeightChart([week(0, 80), week(1, null), week(2, 79), week(3, 78)]);
  assert.equal(chart.paths.length, 2);
  assert.equal(chart.paths[0].includes('L'), false);
  assert.equal(chart.paths[1].split('L').length, 2);
  assert.equal(chart.points.length, 3);
  assert.ok(chart.points[1].x - chart.points[0].x > chart.points[2].x - chart.points[1].x);
});
test('One measurement, absent data and invalid means never produce a trajectory', () => {
  assert.equal(buildWeeklyWeightChart([week(0, null), week(1, 0), week(2, 80)]), null);
  assert.equal(buildWeeklyWeightChart([week(0, 80, 0), week(1, NaN), week(2, Infinity)]), null);
});
test('Stable weight has a finite flat line and does not create a zero baseline', () => {
  const chart = buildWeeklyWeightChart([week(0, 80), week(1, 80)]);
  assert.ok(chart.min > 0);
  assert.ok(chart.max > chart.min);
  assert.equal(chart.points[0].y, chart.points[1].y);
  assert.ok(chart.points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y)));
});
