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
const { notBlank } = loadFromSource(__filename, __dirname, { notBlank: 'src/app/core/validators/not-blank' });

const check = (value) => notBlank({ value });

// Alta del cliente (2026-10-16): «   » valía como nombre y apellidos.
test('vacío o solo espacios: obligatorio', () => {
  for (const value of [null, undefined, '', '   ', ' \t ']) assert.deepEqual(check(value), { required: true });
});

test('con algún carácter: válido, aunque lleve espacios delante', () => {
  assert.equal(check('Ana'), null);
  assert.equal(check('  Ana'), null);
});
