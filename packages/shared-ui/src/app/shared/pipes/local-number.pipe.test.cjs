const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// `| localNumber` sustituye al `| number` de Angular en todas las plantillas
// (QA 2026-10-09: «1,731 kcal», «65.5 kg» en español): acepta sus mismos
// argumentos.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { LocalNumberPipe, decimalsOf, applyCatalogTranslations } = loadFromSource(__filename, __dirname, {
  LocalNumberPipe: 'src/app/shared/pipes/local-number.pipe',
  decimalsOf: 'src/app/shared/pipes/local-number.pipe',
  applyCatalogTranslations: 'src/app/core/i18n/localized-catalog',
});

test('entiende el digitsInfo de Angular y los números', () => {
  assert.deepEqual(decimalsOf('1.0-0'), { min: 0, max: 0 });
  assert.deepEqual(decimalsOf('1.1-1'), { min: 1, max: 1 });
  assert.deepEqual(decimalsOf(' 1.0-2 '), { min: 0, max: 2 });
  assert.deepEqual(decimalsOf(2, 2), { min: 2, max: 2 });
  assert.deepEqual(decimalsOf(undefined), { min: 0, max: 3 }, 'sin formato, como `number`');
});

test('pinta en español con los mismos formatos que tenían las plantillas', () => {
  applyCatalogTranslations(null, 'es');
  const pipe = new LocalNumberPipe({ currentLang: 'es' });
  assert.equal(pipe.transform(1731.4, '1.0-0'), '1.731');
  assert.equal(pipe.transform(57.44, '1.1-1'), '57,4');
  assert.equal(pipe.transform(7, '1.1-1'), '7,0');
  assert.equal(pipe.transform(3.3333), '3,333');
  assert.equal(pipe.transform(null, '1.0-0'), '');
});
