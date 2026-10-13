const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Entreno en curso: la fila «Descanso: 120s» de cada serie. Tocarla abre
// «Serie objetivo» igual que tocar «Objetivo» (los dos pasan por editSet), y
// con la pauta de solo lectura no abre nada.

// Ejecuta el componente real sin arrancar Angular ni conectar al backend.
const source = fs.readFileSync(path.join(__dirname, 'set.component.ts'), 'utf8');
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
const { SetComponent } = exportsObject;

function setComponent(isReadonly) {
  const set = { _id: 'set-1', restSeconds: 120 };
  const opened = [];
  const component = Object.create(SetComponent.prototype);
  Object.assign(component, { set, isReadonly, confSet: { emit: (emitted) => opened.push(emitted) } });
  return { component, set, opened };
}

test('editSet pide al padre abrir «Serie objetivo» con esta serie', () => {
  const { component, set, opened } = setComponent(false);
  component.editSet();
  assert.deepEqual(opened, [set]);
});

test('con la pauta de solo lectura editSet no abre nada', () => {
  const { component, opened } = setComponent(true);
  component.editSet();
  assert.deepEqual(opened, []);
});

test('«Objetivo» y «Descanso» llevan al mismo editor, y «Descanso» respeta el solo lectura', () => {
  const html = fs.readFileSync(path.join(__dirname, 'set.component.html'), 'utf8');
  const startTag = (className) => {
    const tags = [...html.matchAll(new RegExp(`<div\\b[^>]*class="${className}"[^>]*>`, 'g'))].map((m) => m[0]);
    assert.equal(tags.length, 1, `tiene que haber un único .${className}`);
    return tags[0];
  };

  const objective = startTag('expected-values-section');
  const rest = startTag('rest-objective-row');
  assert.match(objective, /\(click\)="editSet\(\)"/);
  assert.match(rest, /\(click\)="editSet\(\)"/);
  // El estilo de pulsación se apaga con .readonly, como la pauta de solo lectura.
  assert.match(rest, /\[class\.readonly\]="isReadonly"/);

  // La fila de descanso sigue fuera de la cabecera de «Objetivo»: no se anidan
  // los dos clics (el de «Objetivo» abriría el editor dos veces).
  const objectiveBlock = html.slice(html.indexOf(objective), html.indexOf('<!-- Action Buttons -->'));
  assert.ok(!objectiveBlock.includes('rest-objective-row'), 'la fila de descanso no puede vivir dentro de «Objetivo»');
});
