const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Detalle de una sesión hecha (Plan > Entrenamiento, día del calendario):
// serie a serie lo hecho junto a lo pautado y la mejor serie de cada
// ejercicio frente a la vez anterior.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/features/clients/pages/client-detail/components/training-day-detail/training-day-detail.util';
const names = ['buildSetRows', 'bestSet', 'previousBest', 'compareBest', 'buildExerciseRows', 'formatDelta', 'formatBestSet', 'sortedSets'];
const util = loadFromSource(__filename, __dirname, Object.fromEntries(names.map((n) => [n, source])), { app: 'train-fit-trainers' });

const bench = { _id: 'ex-bench', name: 'Press banca' };
const plank = { _id: 'ex-plank', name: 'Plancha', isIsometric: true };
const set = (extra) => ({ doned: true, expectedReps: [8, 10], expectedRir: [1, 2], ...extra });

test('serie a serie: lo hecho junto a lo pautado', () => {
  const rows = util.buildSetRows(
    [
      set({ order: 1, weight: 82.5, reps: 8, rir: [1] }),
      set({ order: 0, weight: 80, reps: 9, rir: [2] }),
      set({ order: 2, weight: 80, reps: 7, rir: [-1], drop: true }),
      set({ order: 3, doned: false, expectedReps: [8], expectedRir: [-1] }),
    ],
    'strength',
    'es-ES'
  );
  assert.deepEqual(rows.map((r) => r.index), [1, 2, 3, 4]);
  assert.equal(rows[0].performed, '80 kg × 9', 'ordenadas por su orden');
  assert.equal(rows[0].rir, '2');
  assert.equal(rows[0].planned, '8-10 · 1-2 RIR');
  assert.equal(rows[1].performed, '82,5 kg × 8');
  assert.equal(rows[2].failure, true);
  assert.equal(rows[2].rir, '', 'el fallo va como marca, no como número');
  assert.equal(rows[2].drop, true);
  assert.equal(rows[3].done, false);
  assert.equal(rows[3].performed, '', 'no hecha: sin valor');
  assert.equal(rows[3].planned, '8 · FALLO');
});

test('peso corporal, isométricos y cardio', () => {
  assert.equal(util.buildSetRows([set({ weight: 0, reps: 12 })], 'strength')[0].performed, '12 reps');
  const [plankRow] = util.buildSetRows([{ doned: true, time: '00:45', expectedTime: '00:30' }], 'isometric');
  assert.equal(plankRow.performed, '00:45');
  assert.equal(plankRow.planned, '00:30');
  const [run] = util.buildSetRows([{ doned: true, time: '20:00', distance: 4, expectedTime: '25:00' }], 'cardio', 'es-ES');
  assert.equal(run.performed, '20:00 · 4 km');
});

test('mejor serie: más carga y, a igual carga, más repeticiones', () => {
  assert.deepEqual(util.bestSet([set({ weight: 80, reps: 9 }), set({ weight: 82.5, reps: 6 }), set({ weight: 82.5, reps: 8 })]), { weight: 82.5, reps: 8 });
  assert.equal(util.bestSet([set({ doned: false, weight: 100, reps: 5 })]), null, 'las no hechas no cuentan');
  assert.equal(util.bestSet([set({ weight: 0, reps: 10 })]), null, 'sin carga no hay comparación');
});

test('la vez anterior: la sesión más reciente antes de esta con ese ejercicio', () => {
  const history = [
    { date: '2026-10-01T10:00:00Z', exercises: [{ exercise: bench, sets: [set({ weight: 75, reps: 8 })] }] },
    { date: '2026-10-05T10:00:00Z', exercises: [{ exercise: bench, sets: [set({ weight: 80, reps: 8 })] }] },
    { date: '2026-10-06T10:00:00Z', exercises: [{ exercise: plank, sets: [{ doned: true, time: '00:30' }] }] },
    { date: '2026-10-09T10:00:00Z', exercises: [{ exercise: bench, sets: [set({ weight: 90, reps: 3 })] }] },
  ];
  const previous = util.previousBest('ex-bench', '2026-10-08T10:00:00Z', history);
  assert.deepEqual(previous.best, { weight: 80, reps: 8 });
  assert.equal(previous.date, '2026-10-05T10:00:00Z', 'ni la de después ni una más antigua');
  assert.equal(util.previousBest('ex-row', '2026-10-08T10:00:00Z', history), null);
});

test('comparación y su texto', () => {
  const up = util.compareBest({ weight: 82.5, reps: 8 }, { weight: 80, reps: 8 });
  assert.deepEqual(up, { kind: 'weight', diff: 2.5 });
  assert.equal(util.formatDelta({ ...up, previous: {}, previousDate: '' }, 'es-ES'), '+2,5 kg');
  const fewer = util.compareBest({ weight: 80, reps: 7 }, { weight: 80, reps: 8 });
  assert.equal(util.formatDelta({ ...fewer, previous: {}, previousDate: '' }), '−1 rep');
  assert.equal(util.formatDelta({ kind: 'same', diff: 0, previous: {}, previousDate: '' }), '=');
  assert.equal(util.formatBestSet({ weight: 80, reps: 8 }), '80 kg × 8');
});

test('ejercicios del día con su progreso y la nota del cliente', () => {
  const today = {
    date: '2026-10-08T18:00:00Z',
    exercises: [
      { _id: 'ce-1', exercise: bench, clientNotes: ' Me costó la última ', sets: [set({ weight: 82.5, reps: 8 }), set({ doned: false })] },
      { _id: 'ce-2', exercise: plank, sets: [{ doned: true, time: '00:40' }] },
    ],
  };
  const history = [{ date: '2026-10-05T10:00:00Z', exercises: [{ exercise: bench, sets: [set({ weight: 80, reps: 8 })] }] }, today];
  const [benchRow, plankRow] = util.buildExerciseRows(today, history, 'es-ES');
  assert.equal(benchRow.doneCount, 1);
  assert.equal(benchRow.sets.length, 2);
  assert.equal(benchRow.clientNote, 'Me costó la última');
  assert.equal(benchRow.progress.kind, 'weight');
  assert.equal(benchRow.progress.diff, 2.5);
  assert.equal(plankRow.kind, 'isometric');
  assert.equal(plankRow.progress, null, 'sin comparación para isométricos');
});
