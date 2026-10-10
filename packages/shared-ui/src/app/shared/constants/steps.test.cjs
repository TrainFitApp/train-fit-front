const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09: «Menos de 1000», «Entre 2000 y 6000», «Entre 7000 y
// 9000»… dejaban huecos sin opción. Los cortes son los puntos medios con los
// que el back reparte una media real de pasos
// (train-fit-back nutritionalGoals/training-factor.js, `upTo` + 1).
const CUTS = [1500, 6500, 9500, 15500, 18500];

// steps.ts usa enum: se compila con esbuild (strip-types no los admite).
const { buildSync } = require('esbuild');
const Module = require('node:module');
const compiled = new Module(__filename);
compiled._compile(
  buildSync({ entryPoints: [path.join(__dirname, 'steps.ts')], bundle: true, platform: 'node', format: 'cjs', write: false }).outputFiles[0].text,
  __filename
);
const { STEPS_VALUES } = compiled.exports;

const i18n = (lang) =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../../../../shared-core/src/assets/i18n/${lang}.json`), 'utf8'));
const numbersOf = (label) => (label.match(/\d[\d.,]*/g) || []).map((n) => Number(n.replace(/[.,]/g, '')));

for (const lang of ['es', 'en']) {
  test(`rangos de pasos contiguos y sin huecos (${lang})`, () => {
    const texts = i18n(lang);
    const counted = STEPS_VALUES.filter((step) => step.value !== 1).map((step) => {
      const key = step.name.replace('STEPS.', '');
      assert.ok(texts.STEPS[key], `falta STEPS.${key} en ${lang}`);
      return numbersOf(texts.STEPS[key]);
    });
    assert.deepEqual(counted[0], [CUTS[0]], 'el primero: menos del primer corte');
    for (let i = 1; i < counted.length - 1; i += 1) assert.deepEqual(counted[i], [CUTS[i - 1], CUTS[i]]);
    assert.deepEqual(counted.at(-1), [CUTS.at(-1)], 'el último: más del último corte');
  });
}

test('días de entrenamiento: la última opción incluye 7', () => {
  for (const lang of ['es', 'en']) {
    assert.match(i18n(lang).TRAINING.FIVE_OR_MORE, /5/);
    assert.equal(i18n(lang).TRAINING.FIVE_OR_SIX, undefined);
  }
});
