const test = require('node:test');
const assert = require('node:assert/strict');

// Pulso de una sesión en las Estadísticas del cliente (session-pulse.util.ts):
// readiness al llegar, esfuerzo al terminar y agujetas del entrenamiento
// pulsado en el calendario. Hasta 2026-10 el cliente lo respondía en cada
// sesión y no podía verlo en ningún sitio: solo lo veía su entrenador.

let util;

test.before(async () => {
  util = await import('./session-pulse.util.ts');
});

function session(overrides = {}) {
  return {
    name: 'Pierna',
    date: '2026-10-01T18:00:00.000Z',
    readinessPre: 4,
    perceivedEffortPost: 3,
    sorenessPre: [],
    ...overrides,
  };
}

function tableWith(workout) {
  return { splits: [{ workouts: [session({ name: 'Torso' })] }, { workouts: [session({ name: 'Torso' }), workout] }] };
}

test('pulseLevel: solo enteros del 1 al 5 cuentan como respuesta', () => {
  assert.equal(util.pulseLevel(1), 1);
  assert.equal(util.pulseLevel(5), 5);
  assert.equal(util.pulseLevel(0), null);
  assert.equal(util.pulseLevel(6), null);
  assert.equal(util.pulseLevel(3.5), null);
  assert.equal(util.pulseLevel('4'), null);
  assert.equal(util.pulseLevel(null), null);
  assert.equal(util.pulseLevel(undefined), null);
});

test('sessionPulseAt: devuelve la sesión de esa posición, con el microciclo 1-based', () => {
  const pulse = util.sessionPulseAt(tableWith(session({ readinessPre: 2, perceivedEffortPost: 5 })), 1, 1);

  assert.equal(pulse.microcycle, 2);
  assert.equal(pulse.workoutName, 'Pierna');
  assert.equal(pulse.readiness, 2);
  assert.equal(pulse.effort, 5);
  assert.ok(pulse.date instanceof Date);
});

test('sessionPulseAt: sin terminar, descanso pautado o fecha rota devuelven null', () => {
  // `date` solo existe al terminar: una sesión empezada y abandonada tiene
  // readiness pero no es un entrenamiento hecho.
  assert.equal(util.sessionPulseAt(tableWith(session({ date: null })), 1, 1), null);
  assert.equal(util.sessionPulseAt(tableWith(session({ isPlannedRestDay: true })), 1, 1), null);
  assert.equal(util.sessionPulseAt(tableWith(session({ date: 'no es una fecha' })), 1, 1), null);
});

test('sessionPulseAt: una posición que no existe devuelve null', () => {
  const table = tableWith(session());
  assert.equal(util.sessionPulseAt(table, 5, 0), null);
  assert.equal(util.sessionPulseAt(table, 1, 9), null);
  assert.equal(util.sessionPulseAt(null, 0, 0), null);
  assert.equal(util.sessionPulseAt({ splits: [{ workouts: null }, null] }, 1, 0), null);
});

test('sessionPulseAt: respuestas fuera de rango cuentan como no respondidas', () => {
  const pulse = util.sessionPulseAt(tableWith(session({ readinessPre: 0, perceivedEffortPost: 9 })), 1, 1);
  assert.equal(pulse.readiness, null);
  assert.equal(pulse.effort, null);
});

test('sessionPulseAt: las agujetas de nivel 1 ("nada") o inválidas se descartan', () => {
  const pulse = util.sessionPulseAt(
    tableWith(
      session({
        sorenessPre: [
          { muscle: 'Cuádriceps', level: 4 },
          { muscle: 'Femoral', level: 1 },
          { muscle: '', level: 3 },
          { muscle: 'Gemelo', level: 9 },
          null,
        ],
      }),
    ),
    1,
    1,
  );

  assert.deepEqual(pulse.soreness, [{ muscle: 'Cuádriceps', level: 4 }]);
});

test('hasPulse: basta con haber respondido una de las tres preguntas', () => {
  const nothing = { readiness: null, effort: null, soreness: [] };
  assert.equal(util.hasPulse(nothing), false);
  assert.equal(util.hasPulse({ ...nothing, readiness: 3 }), true);
  assert.equal(util.hasPulse({ ...nothing, effort: 4 }), true);
  assert.equal(util.hasPulse({ ...nothing, soreness: [{ muscle: 'Glúteo', level: 3 }] }), true);
});
