const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const file = path.resolve(
  __dirname,
  '../packages/shared-features/src/app/features/checkins/my-checkins/my-checkins.page.ts'
);
const source = ts.createSourceFile(
  file,
  fs.readFileSync(file, 'utf8'),
  ts.ScriptTarget.Latest,
  true
);
const page = source.statements.find(
  (node) => ts.isClassDeclaration(node) && node.name.text === 'MyCheckinsPage'
);
// Ejecuta los callbacks reales con el differ de Angular, que no los enlaza a la página.
const members = page.members.filter(
  (node) =>
    node.name &&
    /^(configKey|trackByTrainerId|trackByHistoryId|trackByFieldKey)$/.test(
      node.name.getText(source)
    )
);
const code = ts.transpileModule(
  `export class Page { ${members.map((node) => node.getText(source)).join('\n')} }`,
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }
).outputText;
const context = { exports: {} };
vm.runInNewContext(code, context, { filename: file });
const instance = new context.exports.Page();

test('Mis check-ins: Angular puede renderizar configuraciones antiguas sin enlazar this', async () => {
  const { DefaultIterableDiffer } = await import('@angular/core');
  const differ = new DefaultIterableDiffer(instance.trackByTrainerId);
  const configs = [{ trainerId: 'trainer-a' }, { trainerId: 'trainer-b' }];
  assert.doesNotThrow(() => differ.diff(configs));
  const keys = [];
  differ.forEachItem((item) => keys.push(item.trackById));
  assert.deepEqual(keys, ['trainer-a', 'trainer-b']);
});

test('Mis check-ins: solicitudes del mismo profesional mantienen identidades distintas al recargar', async () => {
  const { DefaultIterableDiffer } = await import('@angular/core');
  const differ = new DefaultIterableDiffer(instance.trackByTrainerId);
  const configs = [
    { trainerId: 'trainer-a', requestId: 'request-1' },
    { trainerId: 'trainer-a', requestId: 'request-2' },
    { trainerId: 'trainer-a' },
  ];
  differ.diff(configs);
  const keys = [];
  differ.forEachItem((item) => keys.push(item.trackById));
  assert.deepEqual(keys, ['request-1', 'request-2', 'trainer-a']);
  differ.diff(configs.map((config) => ({ ...config })));
  const additions = [];
  const removals = [];
  differ.forEachAddedItem((item) => additions.push(item.trackById));
  differ.forEachRemovedItem((item) => removals.push(item.trackById));
  assert.deepEqual(additions, []);
  assert.deepEqual(removals, []);
});

test('Mis check-ins: callbacks del histórico y formulario también funcionan sin contexto de página', async () => {
  const { DefaultIterableDiffer } = await import('@angular/core');
  const history = new DefaultIterableDiffer(instance.trackByHistoryId);
  const fields = new DefaultIterableDiffer(instance.trackByFieldKey);
  assert.doesNotThrow(() => history.diff([{ _id: 'response-1' }]));
  assert.doesNotThrow(() => fields.diff([{ key: 'custom:question-1' }]));
});
