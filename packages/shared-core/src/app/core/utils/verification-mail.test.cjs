const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (A5): con el correo caído el alta respondía 500 con la cuenta
// ya creada. Ahora el back crea la cuenta y dice si el correo salió.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/core/utils/verification-mail.util';
const { verificationMailFailed, verificationMailFailedIn, resendCodeErrorMessage } = loadFromSource(__filename, __dirname, {
  verificationMailFailed: source,
  verificationMailFailedIn: source,
  resendCodeErrorMessage: source,
});

const t = (key) => `t:${key}`;

test('solo cuenta como fallo un false explícito (respuestas antiguas sin el campo: salió)', () => {
  assert.equal(verificationMailFailed({ verificationMailSent: false }), true);
  assert.equal(verificationMailFailed({ verificationMailSent: true }), false);
  assert.equal(verificationMailFailed({}), false);
  assert.equal(verificationMailFailed(null), false);
});

test('en el error del login (HttpErrorResponse con el cuerpo en `error`)', () => {
  assert.equal(verificationMailFailedIn({ status: 403, error: { code: 'ACCOUNT_NOT_VERIFIED', verificationMailSent: false } }), true);
  assert.equal(verificationMailFailedIn({ status: 403, error: { code: 'ACCOUNT_NOT_VERIFIED', verificationMailSent: true } }), false);
});

test('reenviar: 503 es «no hemos podido enviarte el correo»; el resto, el mensaje del back o el genérico', () => {
  assert.equal(resendCodeErrorMessage({ status: 503, error: { message: 'Ha ocurrido un error inesperado' } }, t), 't:SIGN_UP.MAIL_NOT_SENT');
  assert.equal(resendCodeErrorMessage({ status: 429, error: { message: 'Espera unos segundos' } }, t), 'Espera unos segundos');
  assert.equal(resendCodeErrorMessage({ status: 0 }, t), 't:SIGN_UP.RESEND_CODE_ERROR');
});
