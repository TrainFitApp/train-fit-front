const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Ejecuta el componente real sin arrancar Angular ni conectar al backend.
const source = fs.readFileSync(path.join(__dirname, 'workout.component.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true },
}).outputText;
const exportsObject = {};
const noopDecorator = () => () => undefined;
vm.runInNewContext(compiled, {
  exports: exportsObject,
  require: () => new Proxy({}, { get: () => noopDecorator }),
  setTimeout,
});
const { WorkoutComponent } = exportsObject;

function editor(field, min, max) {
  const component = Object.create(WorkoutComponent.prototype);
  const set = { _id: 'set-1', expectedReps: [8, 12], expectedRir: [1, 3] };
  const exercise = { _id: 'exercise-1', sets: [set] };
  const saved = [];
  const notices = [];
  Object.assign(component, {
    editingCellKey: `${set._id}-${field}`,
    editingCellMin: min,
    editingCellMax: max,
    ionicUtilService: { showToast: (options) => notices.push(options) },
    translate: { instant: (key) => key },
    persistSetUpdate: (_exercise, updated) => saved.push(updated),
  });
  return { component, set, exercise, saved, notices };
}

for (const field of ['reps', 'rir']) {
  for (const [min, max] of [['10', '8'], ['8', '8']]) {
    test(`${field}: rechaza ${min}–${max}, restaura el original y avisa una sola vez`, () => {
      const state = editor(field, min, max);
      const original = JSON.stringify(state.set);
      state.component.commitEditCell(state.exercise, state.set, field);
      // Blur posterior a Enter no debe duplicar ni el aviso ni la escritura.
      state.component.commitEditCell(state.exercise, state.set, field);
      assert.equal(JSON.stringify(state.set), original);
      assert.equal(state.component.editingCellKey, null);
      assert.equal(state.saved.length, 0);
      assert.equal(state.notices.length, 1);
      assert.equal(state.notices[0].message, 'TABLES.RANGE_ERROR');
    });
  }

  for (const [min, max, expected] of [['', '', []], ['8', '', [8]], ['', '8', [8]], ['1', '3', [1, 3]], ['1,5', '3', [1.5, 3]]]) {
    test(`${field}: conserva vacío, valor único y rangos válidos (${min}/${max})`, () => {
      const state = editor(field, min, max);
      state.component.commitEditCell(state.exercise, state.set, field);
      assert.equal(state.saved.length, 1);
      const actual = state.saved[0][field === 'reps' ? 'expectedReps' : 'expectedRir'];
      assert.deepEqual(Array.from(actual), expected);
      assert.equal(state.notices.length, 0);
    });
  }
}

test('RIR conserva -1 (fallo), solo o como mínimo de un rango válido', () => {
  for (const [max, expected] of [['', [-1]], ['2', [-1, 2]]]) {
    const state = editor('rir', '-1', max);
    state.component.commitEditCell(state.exercise, state.set, 'rir');
    assert.deepEqual(Array.from(state.saved[0].expectedRir), expected);
  }
});

test('Escape cancela sin guardar ni mostrar un error de rango', () => {
  const state = editor('reps', '12', '8');
  state.component.cancelEditCell();
  state.component.commitEditCell(state.exercise, state.set, 'reps');
  assert.equal(state.saved.length, 0);
  assert.equal(state.notices.length, 0);
});
