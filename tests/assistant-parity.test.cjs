const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Paridad del asistente trAInfit: los códigos de mensaje, los botones, las
// pantallas, las comidas y los atajos que manda el back
// (components/assistant/) son los mismos que pinta la app
// (features/assistant/assistant-catalog.ts), y cada código de error de
// negocio del asistente y de las invitaciones tiene su texto. Un código nuevo
// en un lado y no en el otro sale en crudo en el chat.
//
// Lee el código de los dos repos; sin el back al lado (CI del front), se omite.

const ROOT = path.resolve(__dirname, '..');
const BACK = process.env.TRAINFIT_BACK_DIR || path.resolve(ROOT, '../train-fit-back');
const HAS_BACK = fs.existsSync(path.join(BACK, 'components/assistant/assistant-turns.js'));
const FRONT_CATALOG = path.join(ROOT, 'packages/shared-features/src/app/features/assistant/assistant-catalog.ts');

/** Cadenas de un array literal (`NAME ... = [ ... ]`) de un fichero. */
function arrayLiteral(file, name) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(new RegExp(`\\b${name}\\b[^=]*=\\s*(?:Object\\.freeze\\()?\\[([^\\]]*)\\]`));
  assert.ok(match, `no encuentro ${name} en ${path.relative(ROOT, file)}`);
  return [...match[1].matchAll(/['"]([\w-]+)['"]/g)].map((m) => m[1]);
}

const front = (name) => arrayLiteral(FRONT_CATALOG, name);
const back = (file, name) => arrayLiteral(path.join(BACK, 'components/assistant', file), name);
const sorted = (list) => [...list].sort();

test('asistente: mensajes, botones, líneas y sugerencias, iguales en back y front', { skip: !HAS_BACK && 'sin train-fit-back al lado' }, () => {
  assert.deepEqual(sorted(front('ASSISTANT_MESSAGE_CODES')), sorted(back('assistant-turns.js', 'MESSAGE_CODES')));
  assert.deepEqual(sorted(front('ASSISTANT_LINK_CODES')), sorted(back('assistant-turns.js', 'LINK_CODES')));
  assert.deepEqual(sorted(front('ASSISTANT_LINE_CODES')), sorted(back('assistant-turns.js', 'LINE_CODES')));
  assert.deepEqual(sorted(front('ASSISTANT_SUGGESTION_CODES')), sorted(back('assistant-suggestions.js', 'SUGGESTION_CODES')));
  assert.deepEqual(front('ASSISTANT_MEASURES'), back('assistant-catalog.js', 'MEASURES'));
  assert.deepEqual(front('ASSISTANT_OBJECTIVES'), back('assistant-catalog.js', 'OBJECTIVES'));
});

test('asistente: pantallas, comidas y atajos, iguales en back y front', { skip: !HAS_BACK && 'sin train-fit-back al lado' }, () => {
  assert.deepEqual(front('ASSISTANT_CLIENT_SCREENS'), back('assistant-catalog.js', 'CLIENT_SCREENS'));
  assert.deepEqual(front('ASSISTANT_TRAINER_SCREENS'), back('assistant-catalog.js', 'TRAINER_SCREENS'));
  assert.deepEqual(front('ASSISTANT_MEAL_SLOTS'), back('assistant-catalog.js', 'MEAL_SLOTS'));
  const quick = fs.readFileSync(path.join(BACK, 'components/assistant/assistant-catalog.js'), 'utf8').match(/QUICK_ACTIONS = Object\.freeze\(\{([\s\S]*?)\}\);/);
  assert.ok(quick, 'no encuentro QUICK_ACTIONS en el back');
  const backQuick = [...quick[1].matchAll(/['"]([\w-]+)['"]/g)].map((m) => m[1]);
  assert.deepEqual(sorted(front('ASSISTANT_QUICK_ACTIONS')), sorted(backQuick));
});

test('asistente: cada error de negocio del asistente y de las invitaciones tiene texto en la app', { skip: !HAS_BACK && 'sin train-fit-back al lado' }, () => {
  const known = new Set(front('ASSISTANT_ERROR_CODES'));
  const thrown = new Set();
  for (const dir of ['components/assistant', 'components/referrals']) {
    for (const file of fs.readdirSync(path.join(BACK, dir))) {
      if (!file.endsWith('.js') || file.endsWith('.test.js')) continue;
      const source = fs.readFileSync(path.join(BACK, dir, file), 'utf8');
      for (const match of source.matchAll(/["']((?:ASSISTANT|REFERRAL)_[A-Z_]+)["']/g)) thrown.add(match[1]);
    }
  }
  // Un 5xx nunca llega con código (middleware/index.js#errorHandler): la app
  // ya sabe por el estado que está apagado.
  thrown.delete('ASSISTANT_DISABLED');
  assert.ok(thrown.size > 5, 'el escáner no encuentra códigos');
  assert.deepEqual([...thrown].filter((code) => !known.has(code)).sort(), []);
});
