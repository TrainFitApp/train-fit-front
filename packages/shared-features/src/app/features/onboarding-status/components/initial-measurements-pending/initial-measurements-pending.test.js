const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { of, Subject } = require('rxjs');

// Ejecuta los métodos reales; sustituye sólo decoradores y dependencias de vista.
function loadTypeScript(filename) {
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true },
  }).outputText;
  const target = { exports: {} };
  const resolve = (id) => {
    if (id === '@angular/core') return { Component: () => target => target, Injectable: () => target => target };
    if (id === '@angular/common') return { CommonModule: class {} };
    if (id === '@ionic/angular') return { IonicModule: class {} };
    if (id.endsWith('.component') || id.endsWith('api.service')) return new Proxy({}, { get: () => class {} });
    if (id === 'src/app/core/utils/measurement-weeks.util') {
      return loadTypeScript(path.resolve(__dirname, '../../../../../../../shared-core/src/app/core/utils/measurement-weeks.util.ts'));
    }
    if (id.startsWith('.')) return loadTypeScript(path.resolve(path.dirname(filename), id + '.ts'));
    return require(id);
  };
  new Function('exports', 'module', 'require', output)(target.exports, target, resolve);
  return target.exports;
}

const { InitialMeasurementsPendingComponent } = loadTypeScript(path.join(__dirname, 'initial-measurements-pending.component.ts'));
const { IntakeDraftService } = loadTypeScript(path.resolve(__dirname, '../../services/intake-draft.service.ts'));
const catalog = [
  { key: 'weight', label: 'Peso', unit: 'kg', min: 25, max: 350 },
  { key: 'waist', label: 'Cintura', unit: 'cm', min: 45, max: 220 },
];
const item = { trainerId: 'trainer-a', trainerName: 'Entrenadora de prueba', stageId: 'stage-a', missingFields: ['weight', 'waist'], requestedFields: ['weight', 'waist'] };
const state = { stageId: item.stageId, version: 1, configVersion: 1, requestedFields: item.requestedFields, catalog, missingFields: item.missingFields, baselines: [], recent: [], timeZone: 'Europe/Madrid', submitted: true };

function setup() {
  const storage = new Map();
  globalThis.sessionStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) };
  const auth = { user: { _id: 'client-a', roles: ['user'] } };
  const drafts = new IntakeDraftService(auth);
  const calls = [];
  const replies = [];
  const api = {
    pending: () => of({ items: [item] }), get: () => of(state),
    complete(trainerId, body) { const reply = new Subject(); calls.push({ trainerId, body: structuredClone(body) }); replies.push(reply); return reply; },
  };
  const create = () => { const component = new InitialMeasurementsPendingComponent(api, drafts, auth); component.open(item); return component; };
  return { component: create(), create, storage, auth, drafts, calls, replies };
}
const rows = [{ field: 'weight', value: '80,5', date: '2020-09-03' }, { field: 'waist', value: '85', date: '2020-09-05' }];

test('partial completion requires acknowledgement and an invalid entered value cannot bypass validation', () => {
  const { component, calls } = setup();
  component.submit(true);
  assert.equal(calls.length, 0);
  component.changeRows(rows.slice(0, 1));
  component.submit();
  assert.equal(component.showMissing, true);
  assert.equal(calls.length, 0);
  component.changeRows([rows[0], { ...rows[1], value: '0' }]);
  component.submit(true);
  assert.ok(component.errors.waist);
  assert.equal(calls.length, 0);
  component.changeRows(rows.slice(0, 1));
  component.submit(true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.missingMeasurementsAcknowledged, true);
  assert.equal(calls[0].body.measurements[0].date, '2020-09-03');
});

test('unchanged retries preserve requestId; edits rotate it and duplicate clicks cannot submit twice', () => {
  const { component, calls, replies, storage } = setup();
  component.changeRows(rows);
  component.submit();
  component.submit();
  assert.equal(calls.length, 1);
  replies[0].error({ status: 0 });
  assert.equal(storage.size, 1);
  assert.deepEqual(component.rows, rows);
  component.submit();
  assert.equal(calls[1].body.requestId, calls[0].body.requestId);
  replies[1].error({ status: 0 });
  component.changeRows([{ ...rows[0], value: '80.2' }, rows[1]]);
  component.submit();
  assert.notEqual(calls[2].body.requestId, calls[0].body.requestId);
  assert.equal(calls[2].body.measurements[0].value, 80.2);
});

test('a conflict cannot alter history until explicit confirmation includes the value reviewed', () => {
  const { component, calls, replies } = setup();
  component.changeRows([{ ...rows[0], confirmedExisting: true }, rows[1]]);
  component.submit();
  replies[0].error({ error: { code: 'MEASUREMENT_CONFLICT', currentValues: { weight: 81 }, message: 'La medida ha cambiado' } });
  assert.equal(component.conflicts[0].currentValue, 81);
  assert.equal(calls.length, 1);
  assert.equal(component.rows[0].value, '80,5');
  component.confirmConflict();
  assert.equal(calls.length, 2);
  assert.notEqual(calls[1].body.requestId, calls[0].body.requestId);
  assert.equal(calls[1].body.measurements[0].expectedValue, 81);
  assert.equal(calls[1].body.measurements[0].confirmedExisting, undefined);
  assert.equal(calls[1].body.measurements[0].date, '2020-09-03');
});

test('reopening restores the draft and unchanged retry; success clears only its stage draft', () => {
  const { component, create, calls, replies, storage, drafts } = setup();
  const otherStageKey = drafts.key('measurements', item.trainerId, 'other-stage');
  drafts.save(otherStageKey, { rows: [] });
  component.changeRows(rows);
  component.submit();
  replies[0].error({ status: 0 });
  component.close();
  component.ngOnDestroy();
  const reopened = create();
  assert.deepEqual(reopened.rows, rows);
  reopened.submit();
  assert.equal(calls[1].body.requestId, calls[0].body.requestId);
  replies[1].next(state);
  assert.equal(reopened.selected, null);
  assert.equal(storage.size, 1);
  assert.equal(storage.has(otherStageKey), true);
});

test('drafts do not cross client accounts, trainers or stages', () => {
  const { drafts, auth } = setup();
  const original = drafts.key('measurements', item.trainerId, item.stageId);
  drafts.save(original, { rows });
  auth.user._id = 'client-b';
  const next = drafts.key('measurements', item.trainerId, item.stageId);
  assert.notEqual(original, next);
  assert.equal(drafts.read(next), null);
  assert.notEqual(next, drafts.key('measurements', 'trainer-b', item.stageId));
  assert.notEqual(next, drafts.key('measurements', item.trainerId, 'stage-b'));
});
