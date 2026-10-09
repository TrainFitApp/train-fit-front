const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Números en el idioma de la interfaz: separador de miles y decimales de cada
// idioma (QA 2026-10-09: «1,731 kcal», «65.5 kg», «8000 pasos» en español).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { formatLocalNumber, formatLocalQuantity, applyCatalogTranslations } = loadFromSource(__filename, __dirname, {
  formatLocalNumber: 'src/app/core/utils/local-number.util',
  formatLocalQuantity: 'src/app/core/utils/local-number.util',
  applyCatalogTranslations: 'src/app/core/i18n/localized-catalog',
});

test('español: punto de miles (también con cuatro cifras) y coma decimal', () => {
  applyCatalogTranslations(null, 'es');
  assert.equal(formatLocalNumber(1731), '1.731');
  assert.equal(formatLocalNumber(8000), '8.000');
  assert.equal(formatLocalNumber(10000), '10.000');
  assert.equal(formatLocalNumber(65.5), '65,5');
  assert.equal(formatLocalNumber(2.5), '2,5');
  assert.equal(formatLocalNumber(42.5, { maxDecimals: 1 }), '42,5', 'una carga de 42,5 no se redondea a 43');
  assert.equal(formatLocalNumber(7, { minDecimals: 0, maxDecimals: 1 }), '7');
  assert.equal(formatLocalNumber(80.5, { minDecimals: 2 }), '80,50');
});

test('inglés: coma de miles y punto decimal', () => {
  applyCatalogTranslations(null, 'en');
  assert.equal(formatLocalNumber(1731), '1,731');
  assert.equal(formatLocalNumber(65.5), '65.5');
  applyCatalogTranslations(null, 'es');
});

test('sin número no pinta nada; textos numéricos y -0 se normalizan', () => {
  assert.equal(formatLocalNumber(null), '');
  assert.equal(formatLocalNumber(undefined), '');
  assert.equal(formatLocalNumber(''), '');
  assert.equal(formatLocalNumber('abc'), '');
  assert.equal(formatLocalNumber(NaN), '');
  assert.equal(formatLocalNumber('3,3'), '3,3');
  assert.equal(formatLocalNumber(-0.001), '0');
  assert.equal(formatLocalNumber(0), '0');
});

test('con unidad', () => {
  assert.equal(formatLocalQuantity(65.5, 'kg'), '65,5 kg');
  assert.equal(formatLocalQuantity(null, 'kg'), '');
  assert.equal(formatLocalQuantity(1731, 'kcal', { maxDecimals: 0 }), '1.731 kcal');
});
