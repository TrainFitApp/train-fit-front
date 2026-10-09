const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (M2): una pregunta propia redactada sin pulsar «AÑADIR» se
// descartaba en silencio al enviar la invitación.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/shared/components/custom-question-editor/custom-question-editor.component';
const { settleDraftQuestion, MAX_CUSTOM_QUESTIONS } = loadFromSource(
  __filename,
  __dirname,
  { settleDraftQuestion: source, MAX_CUSTOM_QUESTIONS: source },
  { app: 'train-fit-trainers' }
);

const question = (extra) => ({ label: '¿Duermes bien?', type: 'yes_no', unit: '', options: [], required: true, enabled: true, ...extra });

test('una pregunta completa a medio añadir se añade al enviar (marcada para esta invitación)', () => {
  const saved = [question({ label: 'Primera' })];
  const result = settleDraftQuestion(question({ label: '  ¿Duermes bien?  ', enabled: false }), saved);
  assert.equal(result.error, null);
  assert.equal(result.draft, null);
  assert.equal(result.questions.length, 2);
  assert.equal(result.questions[1].label, '¿Duermes bien?', 'limpia');
  assert.equal(result.questions[1].enabled, true);
  assert.equal(result.questions[1].required, true, 'conserva lo que se marcó');
  assert.equal(saved.length, 1, 'no muta la lista recibida');
});

test('un selector con menos de dos opciones bloquea el envío con su error y no se pierde', () => {
  const draft = question({ type: 'select', options: ['Sí', ' '] });
  const result = settleDraftQuestion(draft, []);
  assert.equal(result.error.key, 'CUSTOM_QUESTION.ERROR_OPTIONS');
  assert.equal(result.draft, draft, 'el borrador sigue en pantalla para corregirlo');
  assert.deepEqual(result.questions, []);
});

test('sin enunciado no hay nada que guardar: se descarta', () => {
  assert.deepEqual(settleDraftQuestion(question({ label: '   ' }), []), { questions: [], draft: null, error: null });
  assert.deepEqual(settleDraftQuestion(null, []), { questions: [], draft: null, error: null });
});

test('con el tope de preguntas lleno, avisa en vez de pasarse', () => {
  const full = Array.from({ length: MAX_CUSTOM_QUESTIONS }, (_, i) => question({ label: `P${i}` }));
  const result = settleDraftQuestion(question(), full);
  assert.equal(result.error.key, 'CUSTOM_QUESTION.ERROR_MAX');
  assert.equal(result.questions.length, MAX_CUSTOM_QUESTIONS);
});
