const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// El login de una cuenta sin verificar: el back manda un código nuevo y dice
// si el correo salió (QA 2026-10-09, A5).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { AuthErrorService } = loadFromSource(__filename, __dirname, {
  AuthErrorService: 'src/app/core/services/auth/auth-error.service',
});

const service = new AuthErrorService({ get: () => ({ instant: (key) => key }) });
const notVerified = (extra) => ({ status: 403, error: { code: 'ACCOUNT_NOT_VERIFIED', message: 'x', ...extra } });

test('cuenta sin verificar con el correo enviado: el aviso de siempre', () => {
  const feedback = service.toLoginFeedback(notVerified({ verificationMailSent: true }));
  assert.equal(feedback.kind, 'account-not-verified');
  assert.equal(feedback.message, 'AUTH_ERRORS.ACCOUNT_NOT_VERIFIED');
});

test('cuenta sin verificar con el correo caído: avisa de que no llegó y de reenviarlo', () => {
  const feedback = service.toLoginFeedback(notVerified({ verificationMailSent: false }));
  assert.equal(feedback.kind, 'account-not-verified');
  assert.equal(feedback.message, 'AUTH_ERRORS.ACCOUNT_NOT_VERIFIED_MAIL_FAILED');
});
