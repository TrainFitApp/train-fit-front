const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { BehaviorSubject } = require('rxjs');

// «Copiar ejercicios» en el mesociclo del cliente. La casilla de cada
// ejercicio y lo marcado viven en la card de origen (exerciseSelectionMode,
// selectedExerciseIndices), pero al cambiar de microciclo mesocycle.page.html
// destruye todas las cards (las quita mientras carga el siguiente) y al volver
// pinta otras nuevas. La de origen nacía sin casillas aunque la página siguiera
// en modo copiar, y sin salida: el menú ⋮ se bloquea en ese modo. Lo que no se
// pierde es el modo copiar de la página y el portapapeles del WorkoutService.

function load(file, requireStub) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true },
  }).outputText;
  const exportsObject = {};
  vm.runInNewContext(compiled, { exports: exportsObject, require: requireStub, setTimeout });
  return exportsObject;
}

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}

// El modelo real del portapapeles: el componente construye uno en cada marca.
const { ExerciseClipboard } = load(
  path.join(repoRoot(__dirname), 'packages/shared-ui/src/app/shared/models/exercise-clipboard.ts'),
  () => ({}),
);

// Ejecuta el componente real sin arrancar Angular ni conectar al backend.
const noopDecorator = () => () => undefined;
const { WorkoutComponent } = load(path.join(__dirname, 'workout.component.ts'), (name) =>
  name.endsWith('/exercise-clipboard') ? { ExerciseClipboard } : new Proxy({}, { get: () => noopDecorator }),
);

// Mismo contrato que WorkoutService: un BehaviorSubject con el portapapeles.
function clipboardService() {
  const subject = new BehaviorSubject(null);
  return {
    get getExerciseClipboard() {
      return subject.value;
    },
    set setExerciseClipboard(clipboard) {
      subject.next(clipboard);
    },
    clearExerciseClipboard: () => subject.next(null),
    hasExerciseClipboard: () => !!subject.value,
    exerciseClipboard$: subject.asObservable(),
  };
}

// Lo que guarda MesocyclePage del modo copiar y reparte a cada card.
function mesocyclePage() {
  return {
    service: clipboardService(),
    exerciseCopyActive: false,
    exerciseOriginWorkoutId: undefined,
    // Igual que MesocyclePage#onExerciseCopyEvent.
    onExerciseCopyEvent(event) {
      if (!event.selectionMode) {
        this.exerciseCopyActive = false;
        this.exerciseOriginWorkoutId = undefined;
        return;
      }
      this.exerciseOriginWorkoutId = event.workoutId;
      this.exerciseCopyActive = event.selectionMode;
    },
  };
}

// La página pinta una card nueva (como el *ngFor tras cambiar de microciclo):
// con las entradas que la página tiene en ese momento y pasando por ngOnInit.
function paintCard(page, workout) {
  const component = Object.create(WorkoutComponent.prototype);
  Object.assign(component, {
    workout,
    workoutIndex: 0,
    exerciseCopyActive: page.exerciseCopyActive,
    exerciseOriginWorkoutId: page.exerciseOriginWorkoutId,
    exerciseSelectionMode: false,
    selectedExerciseIndices: new Set(),
    workoutService: page.service,
    pinnedExerciseNoteService: { cache$: { subscribe: () => ({ unsubscribe() {} }) } },
    exerciseCopyEvent: { emit: (event) => page.onExerciseCopyEvent(event) },
  });
  component.ngOnInit();
  return component;
}

const workoutOf = (id, ...exerciseIds) => ({ _id: id, exercises: exerciseIds.map((exerciseId) => ({ _id: exerciseId })) });
const click = { stopPropagation() {}, preventDefault() {} };
const marked = (component) => [...component.selectedExerciseIndices].sort();
const clipboardIds = (page) => Array.from(page.service.getExerciseClipboard.selectedExercises, (exercise) => exercise._id);

// Abre «Copiar ejercicios» en la card de origen y marca los índices dados.
function copyFrom(page, workout, ...indices) {
  const card = paintCard(page, workout);
  card.enterExerciseSelectionMode();
  for (const index of indices) card.onExerciseCheckboxChange(index, click);
  return card;
}

test('al volver al microciclo de origen, la card recupera las casillas y lo que estaba marcado', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2', 'ce-3');
  const before = copyFrom(page, origin, 0, 2);
  assert.deepEqual(marked(before), [0, 2]);

  // Cambia de microciclo: la lista se destruye. Al volver, otra card del mismo
  // entrenamiento, con el modo copiar aún activo en la página.
  before.ngOnDestroy();
  const after = paintCard(page, origin);

  assert.equal(after.exerciseSelectionMode, true, 'las casillas siguen ahí');
  assert.deepEqual(marked(after), [0, 2], 'con lo que estaba marcado');
  assert.deepEqual(clipboardIds(page), ['ce-1', 'ce-3'], 'el portapapeles no se toca');
});

test('al volver con el modo copiar recién abierto y nada marcado, las casillas vuelven vacías', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2');
  copyFrom(page, origin).ngOnDestroy();

  const after = paintCard(page, origin);

  assert.equal(after.exerciseSelectionMode, true);
  assert.deepEqual(marked(after), []);
});

test('después de volver se puede seguir marcando y desmarcando sobre el mismo portapapeles', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2', 'ce-3');
  copyFrom(page, origin, 0).ngOnDestroy();

  const after = paintCard(page, origin);
  after.onExerciseCheckboxChange(1, click);
  after.onExerciseCheckboxChange(0, click);

  assert.deepEqual(marked(after), [1]);
  assert.deepEqual(clipboardIds(page), ['ce-2']);
  assert.equal(page.exerciseOriginWorkoutId, 'w-1');
  assert.equal(page.exerciseCopyActive, true);
});

test('ir y volver varias veces entre microciclos no pierde la selección', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2', 'ce-3');
  let card = copyFrom(page, origin, 1, 2);

  for (let trip = 0; trip < 3; trip += 1) {
    card.ngOnDestroy();
    paintCard(page, workoutOf('w-9', 'ce-9')); // el otro microciclo
    card = paintCard(page, origin);
  }

  assert.equal(card.exerciseSelectionMode, true);
  assert.deepEqual(marked(card), [1, 2]);
});

test('el otro microciclo no abre casillas: ahí solo se pega', () => {
  const page = mesocyclePage();
  copyFrom(page, workoutOf('w-1', 'ce-1', 'ce-2'), 0);

  const other = paintCard(page, workoutOf('w-9', 'ce-1', 'ce-2'));

  assert.equal(other.exerciseSelectionMode, false);
  assert.deepEqual(marked(other), []);
  assert.equal(other.canPasteExercises(), true);
});

test('un ejercicio marcado que ya no está en el entrenamiento no cuenta', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2');
  copyFrom(page, origin, 0, 1).ngOnDestroy();
  origin.exercises = [origin.exercises[1]]; // se borró el primero mientras tanto

  const after = paintCard(page, origin);

  assert.deepEqual(marked(after), [0], 'queda ce-2, ahora en la posición 0');
});

test('tras pegar o cancelar, la card de origen vuelve normal: sin casillas', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2');
  const first = copyFrom(page, origin, 0);

  // pasteExercises() y exitExerciseSelectionMode() terminan igual: portapapeles
  // vacío y la página avisada con selectionMode false.
  first.exitExerciseSelectionMode();
  first.ngOnDestroy();
  const after = paintCard(page, origin);

  assert.equal(page.exerciseCopyActive, false);
  assert.equal(after.exerciseSelectionMode, false);
  assert.deepEqual(marked(after), []);
});

test('un portapapeles suelto del mismo entrenamiento no abre casillas si el modo copiar no está activo', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2');
  page.service.setExerciseClipboard = new ExerciseClipboard('w-1', [origin.exercises[0]]);

  const card = paintCard(page, origin);

  assert.equal(card.exerciseSelectionMode, false);
  assert.deepEqual(marked(card), []);
});

test('cancelar el modo copiar desde la página apaga las casillas recuperadas', () => {
  const page = mesocyclePage();
  const origin = workoutOf('w-1', 'ce-1', 'ce-2');
  copyFrom(page, origin, 0).ngOnDestroy();
  const after = paintCard(page, origin);

  // MesocyclePage#cancelCopyMode: limpia el portapapeles y apaga el modo; la
  // card lo ve en ngOnChanges (exerciseCopyActive pasa a false).
  page.service.clearExerciseClipboard();
  page.exerciseCopyActive = false;
  after.exerciseCopyActive = false;
  after.ngOnChanges({ exerciseCopyActive: { currentValue: false } });

  assert.equal(after.exerciseSelectionMode, false);
  assert.deepEqual(marked(after), []);
});
