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

// Mesociclo del cliente: la rutina (tableInUse) con la misma fila en dos
// microciclos, y el componente recibe una COPIA del entrenamiento del
// primero, como hace mesocycle.page.ts#updateCurrentSplit.
function mesocycleEditor() {
  const exercise = { _id: 'ce-1', blockId: null };
  const week1 = { _id: 'w-1', blocks: [], exercises: [exercise] };
  const week2 = { _id: 'w-2', blocks: [], exercises: [{ _id: 'ce-2', blockId: null }] };
  const tableInUse = { splits: [{ workouts: [week1] }, { workouts: [week2] }] };
  const block = { _id: 'b-1', name: 'Superserie', type: 'superset', order: 0 };
  const published = [];
  const component = Object.create(WorkoutComponent.prototype);
  Object.assign(component, {
    workout: { ...week1 },
    tableInUse,
    workoutService: {
      updateWorkoutBlocks: () => ({
        subscribe: ({ next }) =>
          next({
            _id: 'w-1',
            blocks: [block],
            exercises: [exercise],
            rowWorkouts: [{ _id: 'w-2', blocks: [block], exercises: week2.exercises }],
          }),
      }),
    },
    tableService: {
      set setCurrentTable(table) {
        published.push(table);
      },
    },
  });
  return { component, tableInUse, published };
}

test('crear un bloque en el mesociclo: queda en la rutina que se vuelve a pintar, en toda la fila', () => {
  const { component, tableInUse, published } = mesocycleEditor();
  component.saveWorkoutBlocks([{ name: 'Superserie', type: 'superset', order: 0 }]);

  assert.deepEqual(component.workout.blocks.map((b) => b._id), ['b-1']);
  assert.equal(published.length, 1);
  assert.equal(published[0], tableInUse);
  const [week1, week2] = tableInUse.splits.map((split) => split.workouts[0]);
  assert.deepEqual(week1.blocks.map((b) => b._id), ['b-1'], 'el entrenamiento editado, no solo su copia');
  assert.deepEqual(week2.blocks.map((b) => b._id), ['b-1'], 'el mismo entrenamiento del otro microciclo');
});
