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

// -1 es el centinela de FALLO. El modelo (rir.ts#buildRirValue), el editor de
// series (casilla "fallo") y el pintado de esta misma tabla (isFail) coinciden
// en que un -1 en CUALQUIER posición significa fallo, nunca un extremo de
// rango. Esta tabla era el único sitio que no lo hacía: "-1 a 2" se recortaba
// a [0, 2] (RIR 0-2) en vez de FALLO.
for (const [min, max, label] of [
  ['-1', '', 'solo en el mínimo'],
  ['', '-1', 'solo en el máximo'],
  ['-1', '2', 'con un máximo detrás'],
  ['2', '-1', 'con un mínimo delante'],
  ['-1', '-1', 'en los dos campos'],
]) {
  test(`RIR: -1 ${label} se guarda como FALLO`, () => {
    const state = editor('rir', min, max);
    state.component.commitEditCell(state.exercise, state.set, 'rir');
    assert.equal(state.saved.length, 1, 'tenía que guardar');
    assert.deepEqual(Array.from(state.saved[0].expectedRir), [-1]);
    assert.equal(state.notices.length, 0, 'FALLO es válido, no debe avisar de rango');
  });
}

test('RIR: -1 no se recorta a 0 por los límites de la celda', () => {
  // Los límites de RIR son 0..20, así que sin el centinela el -1 caería a 0
  // y "fallo" pasaría a ser "RIR 0", que es otra cosa.
  const state = editor('rir', '-1', '2');
  state.component.commitEditCell(state.exercise, state.set, 'rir');
  assert.ok(!Array.from(state.saved[0].expectedRir).includes(0), 'el -1 se convirtió en 0');
});

test('reps: -1 no es un centinela, se recorta como cualquier otro número', () => {
  // El fallo solo existe en RIR. En repeticiones, -1 es un número fuera de
  // rango y se recorta a 0 (y 0 >= 2 es falso, así que el rango es válido).
  const state = editor('reps', '-1', '2');
  state.component.commitEditCell(state.exercise, state.set, 'reps');
  assert.deepEqual(Array.from(state.saved[0].expectedReps), [0, 2]);
});

test('RIR por encima del límite se recorta a 20, no se rechaza', () => {
  const state = editor('rir', '99', '');
  state.component.commitEditCell(state.exercise, state.set, 'rir');
  assert.deepEqual(Array.from(state.saved[0].expectedRir), [20]);
  assert.equal(state.notices.length, 0);
});

test('reps por encima del límite se recorta a 999, no se rechaza', () => {
  const state = editor('reps', '5000', '');
  state.component.commitEditCell(state.exercise, state.set, 'reps');
  assert.deepEqual(Array.from(state.saved[0].expectedReps), [999]);
});

test('texto que no es número rechaza el rango y deja la serie intacta', () => {
  for (const [min, max] of [['abc', ''], ['', 'abc'], ['8', 'abc']]) {
    const state = editor('reps', min, max);
    const original = JSON.stringify(state.set);
    state.component.commitEditCell(state.exercise, state.set, 'reps');
    assert.equal(JSON.stringify(state.set), original, `${min}/${max} tocó la serie`);
    assert.equal(state.saved.length, 0);
    assert.equal(state.notices.length, 1);
  }
});

test('sanitizeRangePart deja escribir el menos solo en RIR', () => {
  const state = editor('rir', '', '');
  state.component.editingCellMin = '-1';
  state.component.sanitizeRangePart('rir', 'min');
  assert.equal(state.component.editingCellMin, '-1', 'RIR tiene que aceptar el menos del FALLO');

  state.component.editingCellMin = '-1';
  state.component.sanitizeRangePart('reps', 'min');
  assert.equal(state.component.editingCellMin, '1', 'en repeticiones el menos no pinta nada');

  state.component.editingCellMax = '1a2b';
  state.component.sanitizeRangePart('reps', 'max');
  assert.equal(state.component.editingCellMax, '12');
});

test('Escape cancela sin guardar ni mostrar un error de rango', () => {
  const state = editor('reps', '12', '8');
  state.component.cancelEditCell();
  state.component.commitEditCell(state.exercise, state.set, 'reps');
  assert.equal(state.saved.length, 0);
  assert.equal(state.notices.length, 0);
});
