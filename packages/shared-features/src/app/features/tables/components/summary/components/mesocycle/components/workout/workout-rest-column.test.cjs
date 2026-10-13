const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Columna «Desc.» (descanso pautado) de la tabla de series del mesociclo. La
// plantilla la pintaba solo con plannerMode, así que el cliente no veía el
// descanso que su entrenador había pautado aunque en trainers sí se viera.

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

function workout(plannerMode) {
  const component = Object.create(WorkoutComponent.prototype);
  component.plannerMode = plannerMode;
  return component;
}

const strength = (sets) => ({ exercise: { name: 'Press banca' }, sets });
const cardio = (sets) => ({ exercise: { name: 'Cinta', isCardio: true }, sets });
const isometric = (sets) => ({ exercise: { name: 'Plancha', isIsometric: true }, sets });

test('cliente: con descanso pautado en alguna serie sale la columna, sea cual sea el tipo de ejercicio', () => {
  const client = workout(false);
  assert.equal(client.showsRestColumn(strength([{ restSeconds: 90 }, {}])), true);
  assert.equal(client.showsRestColumn(cardio([{ restSeconds: 60 }])), true);
  assert.equal(client.showsRestColumn(isometric([{ restSeconds: 45 }])), true);
});

test('cliente: la serie ya hecha sigue enseñando el descanso que tenía pautado', () => {
  assert.equal(workout(false).showsRestColumn(strength([{ doned: true, restSeconds: 90 }])), true);
});

test('cliente: sin descanso pautado no hay columna de guiones', () => {
  const client = workout(false);
  assert.equal(client.showsRestColumn(strength([{}, {}])), false);
  assert.equal(client.showsRestColumn(strength([{ restSeconds: 0 }, { restSeconds: null }])), false);
  assert.equal(client.showsRestColumn(cardio([{}])), false);
  assert.equal(client.showsRestColumn(isometric([{}])), false);
});

test('Planner: en peso y repeticiones la columna va siempre, porque ahí se edita en línea', () => {
  assert.equal(workout(true).showsRestColumn(strength([{}, {}])), true);
  assert.equal(workout(true).showsRestColumn(strength([{ restSeconds: 90 }])), true);
});

test('Planner: en cardio e isométrico solo sale si hay descanso pautado (no se edita en línea)', () => {
  const planner = workout(true);
  assert.equal(planner.showsRestColumn(cardio([{}])), false);
  assert.equal(planner.showsRestColumn(isometric([{}])), false);
  assert.equal(planner.showsRestColumn(cardio([{ restSeconds: 60 }])), true);
  assert.equal(planner.showsRestColumn(isometric([{ restSeconds: 45 }])), true);
});

test('un ejercicio sin series o sin datos no rompe ni enseña columna', () => {
  const client = workout(false);
  assert.equal(client.showsRestColumn(strength([])), false);
  assert.equal(client.showsRestColumn({ exercise: undefined, sets: undefined }), false);
  assert.equal(client.showsRestColumn(undefined), false);
});

test('la plantilla pinta la columna con showsRestColumn y la comparte entre los tres tipos de ejercicio', () => {
  const html = fs.readFileSync(path.join(__dirname, 'workout.component.html'), 'utf8');

  // Cabecera: una sola, condicionada por el helper y fuera de la rama de peso.
  const headers = [...html.matchAll(/<th\b[^>]*>\s*\{\{\s*'TABLES\.REST_LABEL'[^<]*<\/th>/g)].map((m) => m[0]);
  assert.equal(headers.length, 1, 'tiene que haber una única cabecera «Desc.»');
  assert.match(headers[0], /\*ngIf="showsRestColumn\(entry\.exercise\)"/);
  const strengthHeaders = html.match(/<ng-template #nonCardioHeaders>([\s\S]*?)<\/ng-template>/)[1];
  assert.ok(!strengthHeaders.includes('REST_LABEL'), 'la cabecera no puede vivir solo en la rama de peso');

  // Celda: una sola, condicionada por el helper y fuera de la rama de peso.
  const cells = [...html.matchAll(/<td\b[^>]*startEditCell\(entry\.exercise, set, 'rest'[^>]*>/g)].map((m) => m[0]);
  assert.equal(cells.length, 1, 'tiene que haber una única celda de descanso');
  assert.match(cells[0], /\*ngIf="showsRestColumn\(entry\.exercise\)"/);
  const strengthCells = html.match(/<ng-template #nonCardio>([\s\S]*?)<\/ng-template>/)[1];
  assert.ok(!strengthCells.includes("'rest'"), 'la celda no puede vivir solo en la rama de peso');
});
