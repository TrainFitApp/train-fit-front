const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Series de las plantillas de entrenamiento: lo que el builder lee, edita y
// guarda, con las mismas reglas que el Planificador (rangos, fallo, límites).
// La regresión que protege: abrir una plantilla y guardarla sin tocarla
// devuelve exactamente las mismas series.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/features/routines/utils/template-sets';
const names = [
  'exerciseKind',
  'fromTemplateSets',
  'toTemplateSets',
  'formatRange',
  'isFailure',
  'parseRangeInput',
  'parseRestInput',
  'rangeToDraft',
  'toManageSet',
  'fromManageSet',
  'parseDurationSeconds',
  'estimateSessionSeconds',
  'roundedMinutes',
  'templateEquipment',
  'setsOverview',
];
const sets = loadFromSource(
  __filename,
  __dirname,
  Object.fromEntries(names.map((name) => [name, source])),
  { app: 'train-fit-trainers' }
);

const draft = (extra = {}) => ({
  repsMin: 8,
  repsMax: 12,
  rirMin: 1,
  rirMax: 2,
  time: '',
  distance: null,
  restSeconds: 90,
  drop: false,
  restPause: null,
  ...extra,
});

test('el tipo de ejercicio decide qué se pauta', () => {
  assert.equal(sets.exerciseKind({ isCardio: true }), 'cardio');
  assert.equal(sets.exerciseKind({ isIsometric: true }), 'isometric');
  assert.equal(sets.exerciseKind({}), 'strength');
  assert.equal(sets.exerciseKind(null), 'strength');
});

test('sin series guardadas, sin series: el ejercicio enseña "Añadir series"', () => {
  assert.deepEqual(sets.fromTemplateSets([]), []);
  assert.deepEqual(sets.fromTemplateSets(undefined), []);
});

test('una pirámide con drop y descansos sobrevive a abrir y guardar', () => {
  const stored = [
    { expectedReps: [12], expectedRir: [3], restSeconds: 90, drop: false, restPause: null, expectedTime: '', expectedDistance: null },
    { expectedReps: [10], expectedRir: [2], restSeconds: 120, drop: false, restPause: null, expectedTime: '', expectedDistance: null },
    { expectedReps: [8], expectedRir: [1, 2], restSeconds: 120, drop: true, restPause: null, expectedTime: '', expectedDistance: null },
  ];
  assert.deepEqual(sets.toTemplateSets(sets.fromTemplateSets(stored), 'strength'), stored);
});

test('rangos como los guarda el Planificador', () => {
  const [single, range, failure, swapped] = sets.toTemplateSets(
    [draft({ repsMin: 8, repsMax: 8 }), draft(), draft({ rirMin: -1, rirMax: -1 }), draft({ repsMin: 12, repsMax: 8, restSeconds: 900 })],
    'strength'
  );
  assert.deepEqual(single.expectedReps, [8], 'mínimo = máximo es un solo valor');
  assert.deepEqual(range.expectedReps, [8, 12]);
  assert.deepEqual(failure.expectedRir, [-1], 'fallo es [-1]');
  assert.deepEqual(swapped.expectedReps, [8, 12]);
  assert.equal(swapped.restSeconds, 600, 'el descanso se acota al máximo de la serie real');
});

test('isométricos y cardio guardan su tiempo y distancia, no reps', () => {
  const [plank] = sets.toTemplateSets([draft({ time: '00:30' })], 'isometric');
  assert.equal(plank.expectedTime, '00:30');
  assert.deepEqual(plank.expectedReps, []);
  const [run] = sets.toTemplateSets([draft({ time: '20:00', distance: 4 })], 'cardio');
  assert.equal(run.expectedDistance, 4);
  assert.equal(run.drop, false);
});

test('lectura de la tabla con el formato del Planificador', () => {
  assert.equal(sets.formatRange(8, 12), '8 - 12');
  assert.equal(sets.formatRange(8, 8), '8');
  assert.equal(sets.formatRange(null, null), '—');
  assert.equal(sets.isFailure(draft({ rirMin: -1, rirMax: -1 })), true);
});

test('edición en celda: mismas reglas que workout.component#parseRangeParts', () => {
  assert.deepEqual(sets.parseRangeInput('8', '12', 'reps'), [8, 12]);
  assert.deepEqual(sets.parseRangeInput('8', '', 'reps'), [8]);
  assert.deepEqual(sets.parseRangeInput('', '', 'reps'), []);
  assert.equal(sets.parseRangeInput('12', '8', 'reps'), null, 'mínimo mayor que máximo no vale');
  assert.equal(sets.parseRangeInput('8', '8', 'reps'), null, 'igual tampoco: es un solo valor');
  assert.equal(sets.parseRangeInput('a', '', 'reps'), null);
  assert.deepEqual(sets.parseRangeInput('-1', '2', 'rir'), [-1], '-1 es fallo');
  assert.deepEqual(sets.parseRangeInput('1,5', '30', 'rir'), [1.5, 20], 'se acota a los límites');
  assert.equal(sets.parseRestInput('90'), 90);
  assert.equal(sets.parseRestInput(''), null);
  assert.equal(sets.parseRestInput('900'), 600);
  assert.equal(sets.parseRestInput('x'), undefined);
  assert.deepEqual(sets.rangeToDraft([8]), [8, 8]);
  assert.deepEqual(sets.rangeToDraft([]), [null, null]);
});

test('ida y vuelta con "Serie objetivo": se queda solo lo que es pauta', () => {
  const form = sets.toManageSet(draft(), 'strength', 'tpl-set-3');
  assert.equal(form._id, 'tpl-set-3');
  assert.deepEqual(form.expectedReps, [8, 12]);
  const back = sets.fromManageSet({ ...form, weight: 100, velocity: 3, rir: 2, expectedReps: ['6', '8'] });
  assert.deepEqual([back.repsMin, back.repsMax], [6, 8], 'los valores del formulario llegan como texto');
  assert.equal('weight' in back, false);
  assert.equal(back.restSeconds, 90);
});

test('tiempos escritos a mano o del selector', () => {
  assert.equal(sets.parseDurationSeconds('30s'), 30);
  assert.equal(sets.parseDurationSeconds('45"'), 45);
  assert.equal(sets.parseDurationSeconds('10 min'), 600);
  assert.equal(sets.parseDurationSeconds('1:30'), 90);
  assert.equal(sets.parseDurationSeconds('00:00:45'), 45);
  assert.equal(sets.parseDurationSeconds('20', 'minutes'), 1200);
  assert.equal(sets.parseDurationSeconds('a tope'), null);
});

test('duración estimada de la sesión', () => {
  const straight = { type: 'straight', restBetweenExercises: null, restBetweenRounds: null, exercises: [{ kind: 'strength', sets: [draft(), draft(), draft()] }] };
  // 3 series × (10 reps × 3,5 s + 10 s + 90 s de descanso)
  assert.equal(sets.estimateSessionSeconds([straight]), 3 * (45 + 90));
  const superset = {
    type: 'superset',
    restBetweenExercises: null,
    restBetweenRounds: null,
    exercises: [
      { kind: 'strength', sets: [draft({ restSeconds: null }), draft({ restSeconds: null })] },
      { kind: 'isometric', sets: [draft({ time: '30 s', restSeconds: 120 }), draft({ time: '30 s', restSeconds: 120 })] },
    ],
  };
  // 2 rondas × (45 s + 30 s + el descanso de la serie del último ejercicio)
  assert.equal(sets.estimateSessionSeconds([superset]), 2 * (45 + 30 + 120));
  assert.equal(sets.roundedMinutes(47 * 60), 45);
  assert.equal(sets.roundedMinutes(7 * 60), 7);
});

test('material de la sesión: el de sus ejercicios, sin repetir', () => {
  assert.deepEqual(
    sets.templateEquipment([{ equipment: ['Barra', 'Banco'] }, null, { equipment: ['barra', 'Mancuernas', ''] }, {}]),
    ['Barra', 'Banco', 'Mancuernas']
  );
});

test('resumen con las series plegadas', () => {
  const pyramid = [draft({ repsMin: 12, repsMax: 12, rirMin: 3, rirMax: 3 }), draft({ repsMin: 6, repsMax: 8 }), draft({ rirMin: -1, rirMax: -1, drop: true })];
  assert.deepEqual(sets.setsOverview(pyramid, 'strength'), {
    reps: '6 - 12',
    rir: '1 - 3',
    time: '',
    failure: true,
    drop: true,
    restPause: false,
  });
  const plank = sets.setsOverview([draft({ time: '00:30' }), draft({ time: '00:30' }), draft({ time: '00:45' })], 'isometric');
  assert.equal(plank.time, '00:30 / 00:45');
  assert.equal(plank.reps, '');
});
