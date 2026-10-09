const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// "Configurar ejercicio" de una plantilla: la lista de series con "Serie
// objetivo" (manage-set) como en el Planificador, sobre la pauta en memoria.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const MANAGE_SET = 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
const { TemplateExercisePanelComponent } = loadFromSource(
  __filename,
  __dirname,
  { TemplateExercisePanelComponent: 'src/app/features/routines/components/template-exercise-panel/template-exercise-panel.component' },
  {
    app: 'train-fit-trainers',
    external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*', '@capacitor/*', MANAGE_SET],
    requires: {
      '@ionic/angular': { ModalController: class {} },
      [MANAGE_SET]: { ManageSetComponent: class ManageSetComponent {} },
    },
  }
);

const set = (repsMin, extra = {}) => ({
  repsMin,
  repsMax: repsMin,
  rirMin: 2,
  rirMax: 2,
  time: '',
  distance: null,
  restSeconds: 90,
  drop: false,
  restPause: null,
  ...extra,
});

function makePanel({ sets = [set(12), set(10), set(8)] } = {}) {
  const calls = { dismissed: [], nested: [] };
  const modalController = { dismiss: (data, role) => calls.dismissed.push({ data, role }) };
  const ionic = {
    isSidePanelOpening: () => false,
    showNestedModal: (options) => {
      calls.nested.push(options);
      return new Promise(() => undefined);
    },
    showAlert: async (options) => (calls.alert = options),
  };
  const translate = { instant: (key) => key };
  const panel = new TemplateExercisePanelComponent(modalController, ionic, translate);
  Object.assign(panel, { exerciseName: 'Press banca', kind: 'strength', sets, notes: '' });
  panel.ngOnInit();
  return { panel, calls };
}

test('editar una serie en "Serie objetivo" actualiza esa serie, aunque se hayan reordenado', () => {
  const { panel, calls } = makePanel();
  panel.openSet(panel.items[1]);
  const props = calls.nested[0].componentProps;
  assert.equal(props.templateMode, true, 'sin peso ni velocidad: la plantilla no los guarda');
  assert.deepEqual(props.set.expectedReps, [10]);

  panel.items = [panel.items[2], panel.items[0], panel.items[1]];
  props.onSetAdded({ ...props.set, expectedReps: [6], restSeconds: 120 });
  assert.deepEqual(panel.draftSets.map((s) => s.repsMin), [8, 12, 6]);
  assert.equal(panel.draftSets[2].restSeconds, 120);
});

test('"Añadir series": el formulario sale con la última y cada guardado añade otra', () => {
  const { panel, calls } = makePanel({ sets: [set(10, { drop: true })] });
  panel.openSet();
  const props = calls.nested[0].componentProps;
  assert.equal(props.set._id, undefined, 'es una serie nueva');
  assert.equal(props.set.drop, false, 'sin la técnica de la última');
  props.onSetAdded({ expectedReps: [10], expectedRir: [-1], restSeconds: 60, weight: 80 });
  props.onSetAdded({ expectedReps: [10], expectedRir: [1, 2], restSeconds: 60 });
  assert.equal(panel.items.length, 3);
  assert.equal(panel.isFailure(panel.draftSets[1]), true);
  assert.equal('weight' in panel.draftSets[1], false, 'el peso no entra en la pauta');
});

test('ejercicio sin series: "Añadir series" abre el formulario vacío', () => {
  const { panel, calls } = makePanel({ sets: [] });
  panel.openSet();
  assert.equal(calls.nested[0].componentProps.set, undefined);
});

test('copiar y quitar series', () => {
  const { panel } = makePanel();
  panel.copySet(panel.items[0], { stopPropagation() {} });
  assert.deepEqual(panel.draftSets.map((s) => s.repsMin), [12, 12, 10, 8]);
  panel.removeSet(panel.items[0], { stopPropagation() {} });
  assert.deepEqual(panel.draftSets.map((s) => s.repsMin), [12, 10, 8]);
});

test('Guardar devuelve series y nota; cerrar sin cambios no pregunta', () => {
  const { panel, calls } = makePanel();
  panel.close();
  assert.equal(calls.dismissed[0].role, 'cancel');
  assert.equal(calls.alert, undefined);

  const second = makePanel();
  second.panel.draftNotes = '  Codos pegados ';
  assert.equal(second.panel.isDirty, true);
  second.panel.close();
  assert.ok(second.calls.alert, 'con cambios avisa antes de cerrar');
  second.panel.save();
  const [{ data, role }] = second.calls.dismissed;
  assert.equal(role, 'save');
  assert.equal(data.notes, 'Codos pegados');
  assert.equal(data.sets.length, 3);
});
