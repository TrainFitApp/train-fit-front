const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Resumen de una puntuación de "Mi método" sin abrir el editor: el que se ve
// en la lista de puntuados y en "Configurar ejercicio" del Planificador.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { scoreHighlights } = loadFromSource(__filename, __dirname, {
  scoreHighlights: 'src/app/core/constants/exercise-score',
});

test('los tres músculos con más estímulo, de más a menos', () => {
  const highlights = scoreHighlights({
    muscleScores: [
      { name: 'Tríceps', score: 2 },
      { name: 'Pectoral', score: 3 },
      { name: 'Deltoides', score: 1 },
      { name: 'Serrato', score: 1 },
      { name: 'Bíceps', score: 0 },
    ],
    jointScores: [],
  });
  assert.deepEqual(highlights.topMuscles, ['Pectoral', 'Tríceps', 'Deltoides']);
  assert.equal(highlights.hardestJoint, null);
});

test('la articulación solo si obliga a dosificar (nivel 2 o más)', () => {
  assert.equal(scoreHighlights({ muscleScores: [], jointScores: [{ name: 'Codo', score: 1 }] }).hardestJoint, null);
  assert.equal(
    scoreHighlights({ muscleScores: [], jointScores: [{ name: 'Codo', score: 1 }, { name: 'Hombro', score: 2 }] }).hardestJoint,
    'Hombro'
  );
});

test('sin puntuación, sin resumen', () => {
  assert.deepEqual(scoreHighlights(null), { topMuscles: [], hardestJoint: null });
});
