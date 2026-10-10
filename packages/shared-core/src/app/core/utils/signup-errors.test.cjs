const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { signupErrorMessage } = loadFromSource(__filename, __dirname, { signupErrorMessage: 'src/app/core/utils/signup-errors.util' });

const t = (key) => `t:${key}`;

// QA 2026-10-09: «El correo no existe» salía igual con la app en inglés.
test('códigos conocidos: el texto de la app', () => {
  assert.equal(signupErrorMessage({ error: { code: 'EMAIL_ALREADY_REGISTERED', message: 'Este correo ya está registrado' } }, t), 't:SIGN_UP.ERRORS.EMAIL_ALREADY_REGISTERED');
  assert.equal(signupErrorMessage({ error: { code: 'EMAIL_NOT_DELIVERABLE' } }, t), 't:SIGN_UP.ERRORS.EMAIL_NOT_DELIVERABLE');
  assert.equal(signupErrorMessage({ error: { code: 'USER_UNDER_MIN_AGE' } }, t), 't:SIGN_UP.ERRORS.USER_UNDER_MIN_AGE');
});

test('sin código conocido: el mensaje del back o el genérico', () => {
  assert.equal(signupErrorMessage({ error: { message: 'Otro' } }, t), 'Otro');
  assert.equal(signupErrorMessage({ status: 0 }, t), 't:SIGN_UP.REGISTER_ERROR');
});
