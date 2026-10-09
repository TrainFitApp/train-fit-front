const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (M5): en una rutina pautada el menú de serie ofrecía
// DUPLICAR / ELIMINAR y se podía entrar a mover ejercicios; el back lo
// rechazaba con un toast. Lo pautado se ve de solo lectura: no se ofrece.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/features/tables/components/summary/components/current-workout/assigned-routine-actions.util';
const { workoutOptions, exerciseOptions, setOptions, ACTION_TYPES } = loadFromSource(__filename, __dirname, {
  workoutOptions: source,
  exerciseOptions: source,
  setOptions: source,
  ACTION_TYPES: 'src/app/shared/constants/actions',
});

const ids = (actions) => actions.map((action) => action.id);

test('rutina propia: todo disponible', () => {
  assert.deepEqual(ids(workoutOptions(false, false)), [ACTION_TYPES.moveExercises, ACTION_TYPES.note, ACTION_TYPES.rmCalculator]);
  assert.deepEqual(ids(exerciseOptions(false)), [ACTION_TYPES.moveSets, ACTION_TYPES.addSet, ACTION_TYPES.note]);
  assert.deepEqual(ids(setOptions(false)), [ACTION_TYPES.edit, ACTION_TYPES.duplicate, ACTION_TYPES.delete]);
});

test('rutina pautada: ni mover ejercicios, ni mover o añadir series, ni menú de serie', () => {
  assert.deepEqual(ids(workoutOptions(true, false)), [ACTION_TYPES.note, ACTION_TYPES.rmCalculator]);
  assert.deepEqual(ids(exerciseOptions(true)), [ACTION_TYPES.note], 'la nota propia del cliente sí');
  assert.deepEqual(setOptions(true), []);
});

test('detener solo se ofrece con el entrenamiento en curso, sea o no pautado', () => {
  assert.equal(ids(workoutOptions(false, true)).at(-1), ACTION_TYPES.stopWorkout);
  assert.equal(ids(workoutOptions(true, true)).at(-1), ACTION_TYPES.stopWorkout);
  assert.ok(!ids(workoutOptions(true, false)).includes(ACTION_TYPES.stopWorkout));
});
