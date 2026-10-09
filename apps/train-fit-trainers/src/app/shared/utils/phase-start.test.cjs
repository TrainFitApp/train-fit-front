const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource } = require('../../../../../../tests/support/ng-harness.cjs');

// Desde qué día puede empezar una fase de dieta nueva: la misma regla que el
// backend (diet-phase-service.js#reserveSlot) para no ofrecer un día que
// acabaría en 409, más la propia de no reescribir días pasados de otra fase.
// La fase que rige el día elegido no lo bloquea: se corta (`replaces`).

const { phaseStartVerdict, firstStartDate, gapBefore, addIsoDays, formatIsoDay } = loadFromSource(
  __filename,
  __dirname,
  {
    phaseStartVerdict: './phase-start.util',
    firstStartDate: './phase-start.util',
    gapBefore: './phase-start.util',
    addIsoDays: './phase-start.util',
    formatIsoDay: './phase-start.util',
  },
  { app: 'train-fit-trainers' }
);

const TODAY = '2026-10-08';
const phase = (name, startDate, endDate, createdAt = `${startDate}T10:00:00.000Z`) => ({ name, startDate, endDate, createdAt });

const verdict = (date, phases) => {
  const result = phaseStartVerdict(date, phases, TODAY);
  return result.kind === 'free' ? 'free' : `${result.kind}:${result.phase.name}`;
};

test('sin fases: cualquier día está libre, también los pasados', () => {
  assert.equal(verdict('2026-10-01', []), 'free');
  assert.equal(verdict(TODAY, []), 'free');
  assert.equal(verdict('2026-11-20', []), 'free');
});

test('fase abierta en curso: hoy o más adelante la corta (aviso, no bloqueo); los días pasados son historial', () => {
  const running = phase('Volumen', '2026-09-01', null);
  assert.equal(verdict(TODAY, [running]), 'replaces:Volumen');
  assert.equal(verdict('2026-10-09', [running]), 'replaces:Volumen');
  assert.equal(verdict('2027-01-01', [running]), 'replaces:Volumen');
  assert.equal(verdict('2026-10-07', [running]), 'blocked:Volumen');
  // Antes de que empezara: el backend lo rechaza (la abierta llega hasta ahí).
  assert.equal(verdict('2026-08-20', [running]), 'blocked:Volumen');
});

test('fase con fin: hoy o en medio la corta, y después de su fin está libre', () => {
  const closed = phase('Definición', '2026-09-01', '2026-10-20');
  assert.equal(verdict(TODAY, [closed]), 'replaces:Definición');
  assert.equal(verdict('2026-10-15', [closed]), 'replaces:Definición');
  assert.equal(verdict('2026-10-20', [closed]), 'replaces:Definición');
  assert.equal(verdict('2026-10-21', [closed]), 'free');
});

test('una fase programada más adelante impide empezar antes que ella y el mismo día; después, la corta', () => {
  const current = phase('Definición', '2026-09-01', '2026-10-20');
  const next = phase('Mantenimiento', '2026-10-21', null);
  assert.equal(verdict(TODAY, [current, next]), 'blocked:Mantenimiento');
  assert.equal(verdict('2026-10-15', [current, next]), 'blocked:Mantenimiento');
  assert.equal(verdict('2026-10-21', [current, next]), 'blocked:Mantenimiento');
  assert.equal(verdict('2026-10-25', [current, next]), 'replaces:Mantenimiento');
});

test('una fase programada con fin: dentro la corta y después está libre', () => {
  const next = phase('Mantenimiento', '2026-10-21', '2026-11-15');
  assert.equal(verdict(TODAY, [next]), 'blocked:Mantenimiento');
  assert.equal(verdict('2026-11-01', [next]), 'replaces:Mantenimiento');
  assert.equal(verdict('2026-11-16', [next]), 'free');
});

test('sustituida el mismo día en que empezó: hoy se puede volver a sustituir (la tapada no cuenta)', () => {
  const replaced = phase('Primera', TODAY, TODAY, `${TODAY}T09:00:00.000Z`);
  const latest = phase('Segunda', TODAY, null, `${TODAY}T11:00:00.000Z`);
  assert.equal(verdict(TODAY, [replaced, latest]), 'replaces:Segunda');
  assert.equal(verdict('2026-10-09', [replaced, latest]), 'replaces:Segunda');
  assert.equal(firstStartDate([replaced, latest], TODAY), TODAY);
});

test('varias lo impiden: se nombra la que rige ese día o, si no, la primera que empieza después', () => {
  const closed = phase('Definición', '2026-10-12', '2026-10-20');
  const open = phase('Mantenimiento', '2026-10-21', null);
  assert.equal(verdict(TODAY, [open, closed]), 'blocked:Definición');
  assert.equal(verdict('2026-10-12', [open, closed]), 'blocked:Definición');
  assert.equal(verdict('2026-10-15', [open, closed]), 'blocked:Mantenimiento');
  assert.equal(verdict('2026-10-25', [open, closed]), 'replaces:Mantenimiento');
});

test('día pasado libre entre dos fases ya acabadas', () => {
  const old = phase('Vieja', '2026-08-01', '2026-08-31');
  const after = phase('Después', '2026-09-10', '2026-09-30');
  assert.equal(verdict('2026-09-05', [old, after]), 'blocked:Después');
  assert.equal(verdict('2026-10-02', [old, after]), 'free');
});

test('día propuesto: hoy si se puede (aunque corte la que rige); si no, el primero libre tras el fin de alguna', () => {
  assert.equal(firstStartDate([], TODAY), TODAY);
  assert.equal(firstStartDate([phase('Volumen', '2026-09-01', null)], TODAY), TODAY);
  assert.equal(firstStartDate([phase('Definición', '2026-09-01', '2026-10-20')], TODAY), TODAY);
  assert.equal(firstStartDate([phase('Mantenimiento', '2026-10-10', '2026-11-15')], TODAY), '2026-11-16');
  const chained = [phase('A', '2026-10-10', '2026-10-31'), phase('B', '2026-11-01', '2026-11-30')];
  assert.equal(firstStartDate(chained, TODAY), '2026-12-01');
});

test('día propuesto: ninguno si la última es abierta y no ha empezado (se elige a mano, cortándola)', () => {
  const current = phase('Definición', '2026-09-01', '2026-10-20');
  const next = phase('Mantenimiento', '2026-10-21', null);
  assert.equal(firstStartDate([current, next], TODAY), null);
});

test('hueco sin plan entre el fin de la anterior y el inicio elegido', () => {
  const closed = phase('Definición', '2026-09-01', '2026-10-20');
  assert.equal(gapBefore('2026-10-21', [closed]), null);
  assert.deepEqual(gapBefore('2026-10-25', [closed]), { from: '2026-10-21', to: '2026-10-24' });
  assert.equal(gapBefore('2026-10-25', [phase('Volumen', '2026-09-01', null)]), null);
  assert.equal(gapBefore('2026-10-25', []), null);
});

test('sumar días cruza meses y años', () => {
  assert.equal(addIsoDays('2026-10-31', 1), '2026-11-01');
  assert.equal(addIsoDays('2027-01-01', -1), '2026-12-31');
  assert.equal(addIsoDays('2028-02-28', 1), '2028-02-29');
});

test('fecha legible: el día del "YYYY-MM-DD", sin que la zona del dispositivo lo mueva', () => {
  const previous = process.env.TZ;
  process.env.TZ = 'America/Los_Angeles';
  try {
    assert.equal(formatIsoDay('2026-10-13', 'es', { day: 'numeric', month: 'long' }), '13 de octubre');
    assert.equal(formatIsoDay('2026-10-13', 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }), 'Tuesday 13 October');
  } finally {
    process.env.TZ = previous;
  }
});
