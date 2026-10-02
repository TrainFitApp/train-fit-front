const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Resumen de una serie que viaja en una revisión de técnica (cliente y
// entrenador la ven igual). Reglas de dominio que no se pueden romper:
// prescrito y ejecutado SIEMPRE por separado, y RIR -1 = fallo, 0 = cero
// real, ausente = no se pinta.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { executedSummary, prescribedSummary, setSnapshotOf } = loadFromSource(__filename, __dirname, {
  executedSummary: 'src/app/shared/components/media/set-summary.util',
  prescribedSummary: 'src/app/shared/components/media/set-summary.util',
  setSnapshotOf: 'src/app/shared/components/media/set-summary.util',
});

test('ejecutado: peso × reps y RIR; nada si aún no hay datos', () => {
  assert.equal(executedSummary({ weight: 80, reps: 8, rir: [2] }), '80 kg × 8 · RIR 2');
  assert.equal(executedSummary({ reps: 12 }), '12 reps');
  assert.equal(executedSummary({ weight: 22.5 }), '22,5 kg');
  assert.equal(executedSummary({}), null);
  assert.equal(executedSummary(null), null);
  // Un RIR sin nada ejecutado no es un resumen: no se pinta suelto.
  assert.equal(executedSummary({ rir: [1] }), null);
});

test('ejecutado: RIR -1 es FALLO y 0 es un cero real', () => {
  assert.equal(executedSummary({ weight: 100, reps: 5, rir: [-1] }, 'Fallo'), '100 kg × 5 · RIR Fallo');
  assert.equal(executedSummary({ weight: 100, reps: 5, rir: [0] }), '100 kg × 5 · RIR 0');
  assert.equal(executedSummary({ weight: 100, reps: 5, rir: [] }), '100 kg × 5');
});

test('ejecutado: cardio (tiempo y distancia)', () => {
  assert.equal(executedSummary({ time: '25:00', distance: 5000 }), '25:00 · 5000 m', 'en español 4 cifras no llevan punto');
  assert.equal(executedSummary({ distance: 12000 }), '12.000 m');
});

test('prescrito: rango de reps, tiempo, distancia y RIR (con fallo)', () => {
  assert.equal(prescribedSummary({ expectedReps: [8, 10], expectedRir: [1, 2] }), '8–10 reps · RIR 1–2');
  assert.equal(prescribedSummary({ expectedReps: [5], expectedRir: [-1] }, 'Fallo'), '5 reps · RIR Fallo');
  assert.equal(prescribedSummary({ expectedTime: '00:45' }), '00:45');
  assert.equal(prescribedSummary({}), null);
});

test('prescrito y ejecutado no se mezclan: cada resumen solo lee sus campos', () => {
  const set = { reps: 6, weight: 90, rir: [0], expectedReps: [8, 10], expectedRir: [2] };
  assert.equal(executedSummary(set), '90 kg × 6 · RIR 0');
  assert.equal(prescribedSummary(set), '8–10 reps · RIR 2');
  assert.equal(executedSummary({ expectedReps: [8], expectedRir: [2] }), null);
  assert.equal(prescribedSummary({ reps: 8, weight: 80, rir: [2] }), null);
});

test('copia de la serie para la revisión: solo campos aceptados, listas normalizadas, vacíos fuera', () => {
  const snapshot = setSnapshotOf(
    { _id: 'x', reps: 8, weight: 80, rir: 2, expectedReps: ['8', '10'], expectedRir: [], time: '', drop: true, doned: true, order: 3 },
    1,
  );
  assert.deepEqual(snapshot, { index: 1, reps: 8, weight: 80, rir: [2], expectedReps: [8, 10], drop: true });
  assert.equal(setSnapshotOf(null, 0), null);
});
