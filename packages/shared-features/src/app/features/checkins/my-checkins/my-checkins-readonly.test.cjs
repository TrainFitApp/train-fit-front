const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { of } = require('rxjs');

// QA 2026-10-09 (M4): tras enviar un check-in la tarjeta seguía editable con
// «Enviar check-in» activo, y cambiar un valor y pulsar no hacía nada. Ahora
// respondido = solo lectura, y «EDITAR RESPUESTA» abre la corrección.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { MyCheckinsPage } = loadFromSource(
  __filename,
  __dirname,
  { MyCheckinsPage: 'src/app/features/checkins/my-checkins/my-checkins.page' },
  {
    requires: {
      '@angular/router': { Router: class {}, ActivatedRoute: class {} },
      '@angular/core/rxjs-interop': { takeUntilDestroyed: () => (source) => source },
    },
  }
);

function page() {
  const sent = [];
  const component = Object.create(MyCheckinsPage.prototype);
  Object.assign(component, {
    formValues: {},
    isSubmitting: false,
    submittedTrainerIds: new Set(),
    editingKey: null,
    expandedTrainerId: null,
    translate: { instant: (key) => key },
    ionicUtilService: { showToast() {}, showErrorToast() {}, showModal: async () => ({ data: true }) },
    myCheckinsApi: {
      respond: (scheduleId, values) => {
        sent.push({ scheduleId, values });
        return of({});
      },
    },
  });
  component.load = () => undefined;
  component.fieldsFor = () => [{ key: 'weight', type: 'number', required: false }];
  component.missingRequiredLabel = () => null;
  component.trainerName = () => 'Ana';
  return { component, sent };
}

const pending = { _id: 'c1', scheduleId: 's1', values: {} };
const answered = { _id: 'c2', scheduleId: 's2', respondedAt: '2026-10-09T08:00:00Z', values: { weight: 80 } };

test('sin responder: editable y se envía', () => {
  const { component, sent } = page();
  component.toggleExpand(pending);
  assert.equal(component.isEditable(pending), true);
  component.formValues = { weight: 79.5 };
  component.submitResponse(pending);
  assert.deepEqual(sent, [{ scheduleId: 's1', values: { weight: 79.5 } }]);
});

test('respondido: solo lectura; pulsar enviar no manda nada', () => {
  const { component, sent } = page();
  component.toggleExpand(answered);
  assert.equal(component.isEditable(answered), false);
  assert.deepEqual(component.formValues, { weight: 80 }, 'enseña lo que respondió');
  component.formValues = { weight: 81 };
  component.submitResponse(answered);
  assert.equal(sent.length, 0);
});

test('«EDITAR RESPUESTA» abre la corrección; al enviar (con confirmación) vuelve a solo lectura', async () => {
  const { component, sent } = page();
  component.toggleExpand(answered);
  component.startEditing(answered);
  assert.equal(component.isEditable(answered), true);
  component.formValues = { weight: 81 };
  component.submitResponse(answered);
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(sent, [{ scheduleId: 's2', values: { weight: 81 } }]);
  assert.equal(component.editingKey, null);
});

test('cancelar la corrección devuelve lo respondido y la deja en solo lectura', () => {
  const { component } = page();
  component.toggleExpand(answered);
  component.startEditing(answered);
  component.formValues = { weight: 99 };
  component.cancelEditing(answered);
  assert.deepEqual(component.formValues, { weight: 80 });
  assert.equal(component.isEditable(answered), false);
});

test('recién enviado (aún sin recargar) también cuenta como respondido', () => {
  const { component } = page();
  component.submittedTrainerIds.add('c1');
  assert.equal(component.isEditable(pending), false);
});
