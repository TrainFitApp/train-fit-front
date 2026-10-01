const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Los callbacks trackBy de *ngFor los invoca el differ de Angular SIN enlazar
// `this` a la página, así que no pueden usar nada de la instancia. Aquí se
// extraen del fichero real y se ejecutan con el differ de verdad.
//
// 2026-10 — este test estuvo meses fuera del runner. Mientras tanto la página
// renombró `trackByTrainerId` a `trackByCheckinId` y el harness, que
// filtraba miembros por nombre, se quedó sin encontrar ninguno: construía una
// clase vacía y el differ caía al seguimiento por identidad, así que los
// casos "pasaban" sin ejecutar una línea del código de la página. Ahora
// `extract` exige que el miembro exista.

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

const WANTED = ['checkinKey', 'trackByCheckinId', 'trackByHistoryId', 'trackByFieldKey'];

function extract(names) {
  const members = page.members.filter(
    (node) => node.name && names.includes(node.name.getText(source))
  );
  const missing = names.filter(
    (name) => !members.some((node) => node.name.getText(source) === name)
  );
  // Sin esto, renombrar un método deja el test verde probando nada.
  assert.deepEqual(
    missing,
    [],
    `MyCheckinsPage ya no tiene estos miembros: ${missing.join(', ')}. ` +
      'Actualiza WANTED y los casos de abajo al nombre nuevo.'
  );
  const code = ts.transpileModule(
    `export class Page { ${members.map((node) => node.getText(source)).join('\n')} }`,
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }
  ).outputText;
  const context = { exports: {} };
  vm.runInNewContext(code, context, { filename: file });
  return new context.exports.Page();
}

const instance = extract(WANTED);

const checkin = (id, extra = {}) => ({ _id: id, ...extra });

test('Mis check-ins: el differ identifica cada check-in por su _id sin enlazar this', async () => {
  const { DefaultIterableDiffer } = await import('@angular/core');
  const differ = new DefaultIterableDiffer(instance.trackByCheckinId);
  const checkins = [checkin('checkin-a'), checkin('checkin-b')];
  assert.doesNotThrow(() => differ.diff(checkins));
  const keys = [];
  differ.forEachItem((item) => keys.push(item.trackById));
  assert.deepEqual(keys, ['checkin-a', 'checkin-b']);
});

test('Mis check-ins: dos check-ins del mismo profesional no se confunden entre sí', async () => {
  const { DefaultIterableDiffer } = await import('@angular/core');
  const differ = new DefaultIterableDiffer(instance.trackByCheckinId);
  // Mismo trainerId a propósito: la identidad es el _id del check-in, no el
  // del profesional, o dos semanas del mismo coach se pisarían en la lista.
  const checkins = [
    checkin('checkin-1', { trainer: { _id: 'trainer-a' } }),
    checkin('checkin-2', { trainer: { _id: 'trainer-a' } }),
    checkin('checkin-3', { trainer: { _id: 'trainer-a' } }),
  ];
  differ.diff(checkins);
  const keys = [];
  differ.forEachItem((item) => keys.push(item.trackById));
  assert.deepEqual(keys, ['checkin-1', 'checkin-2', 'checkin-3']);

  // Recargar devuelve objetos nuevos con los mismos _id: Angular debe
  // reutilizar las filas, no destruirlas y recrearlas (perdería el acordeón
  // abierto y lo que el cliente llevara escrito).
  differ.diff(checkins.map((item) => ({ ...item })));
  const additions = [];
  const removals = [];
  differ.forEachAddedItem((item) => additions.push(item.trackById));
  differ.forEachRemovedItem((item) => removals.push(item.trackById));
  assert.deepEqual(additions, []);
  assert.deepEqual(removals, []);
});

test('Mis check-ins: checkinKey y trackByCheckinId coinciden', () => {
  // El template compara `expandedTrainerId === checkinKey(checkin)` y
  // reordena por trackByCheckinId: si dieran claves distintas, el acordeón
  // abierto saltaría a otra tarjeta al recargar.
  const item = checkin('checkin-1', { trainer: { _id: 'trainer-a' } });
  assert.equal(instance.checkinKey(item), instance.trackByCheckinId(0, item));
});

test('Mis check-ins: callbacks del histórico y del formulario funcionan sin contexto de página', () => {
  assert.equal(instance.trackByHistoryId(0, { _id: 'response-1' }), 'response-1');
  assert.equal(instance.trackByFieldKey(0, { key: 'custom:question-1' }), 'custom:question-1');
});

test('Mis check-ins: ningún trackBy usa this (el differ los llama sueltos)', () => {
  for (const name of ['trackByCheckinId', 'trackByHistoryId', 'trackByFieldKey']) {
    const loose = instance[name];
    assert.doesNotThrow(
      () => loose(0, { _id: 'x', key: 'x' }),
      `${name} se rompe al llamarlo sin this`
    );
  }
});
