const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (M17): recargar /tabs/coach o /tabs/diets llevaba a Perfil.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { startupReturnUrl } = loadFromSource(__filename, __dirname, {
  startupReturnUrl: 'src/app/core/utils/startup-return-url.util',
});

test('vuelve a la pestaña (o pantalla) en la que estaba, con su query', () => {
  assert.equal(startupReturnUrl('/tabs/diets'), '/tabs/diets');
  assert.equal(startupReturnUrl('/tabs/coach'), '/tabs/coach');
  assert.equal(startupReturnUrl('/my-checkins?scheduleId=1'), '/my-checkins?scheduleId=1');
});

test('nunca al propio cargador, al login, ni fuera de la app', () => {
  for (const url of ['', '/', null, undefined, '/user-loader', '/user-loader?returnUrl=/tabs', '/sign-in', '/sign-in/sign-up', '//evil.com', 'https://evil.com', '/maintenance']) {
    assert.equal(startupReturnUrl(url), null, String(url));
  }
  assert.equal(startupReturnUrl('/sign-inside'), '/sign-inside', 'solo el prefijo exacto');
});
