const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Menús de una dieta contra el objetivo del cliente: el desvío que pinta cada
// columna del tablero y el aviso de "Editar dieta" cuando un menú no cuadra.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/features/diet-templates/utils/menu-target-fit';
const { targetDeviation, isWithinTarget, fitsTarget, TARGET_TOLERANCE } = loadFromSource(
  __filename,
  __dirname,
  { targetDeviation: source, isWithinTarget: source, fitsTarget: source, TARGET_TOLERANCE: source },
  { app: 'train-fit-trainers' },
);

const target = { kcal: 2400, protein: 160, carbs: 270, fat: 75 };

test('desvío: diferencia con el objetivo, redondeada como se pinta', () => {
  assert.deepEqual(targetDeviation({ kcal: 2520.6, protein: 151.4, carbs: 270.2, fat: 80 }, target), {
    kcal: 121,
    protein: -9,
    carbs: 0,
    fat: 5,
  });
});

test('margen: ±100 kcal y ±10 g, con el borde dentro', () => {
  assert.deepEqual(TARGET_TOLERANCE, { kcal: 100, macro: 10 });
  assert.equal(isWithinTarget(100, 'kcal'), true);
  assert.equal(isWithinTarget(-100, 'kcal'), true);
  assert.equal(isWithinTarget(101, 'kcal'), false);
  assert.equal(isWithinTarget(10, 'protein'), true);
  assert.equal(isWithinTarget(-10, 'fat'), true);
  assert.equal(isWithinTarget(11, 'carbs'), false);
  // 50 g de más es mucho en un macro aunque en kcal sería poco.
  assert.equal(isWithinTarget(50, 'carbs'), false);
});

test('un menú cuadra cuando kcal y los tres macros están dentro del margen', () => {
  assert.equal(fitsTarget({ kcal: 2480, protein: 152, carbs: 278, fat: 70 }, target), true);
  assert.equal(fitsTarget({ ...target }, target), true);
});

test('basta con que se salga uno para que no cuadre', () => {
  assert.equal(fitsTarget({ ...target, kcal: 2550 }, target), false, 'kcal de más');
  assert.equal(fitsTarget({ ...target, protein: 140 }, target), false, 'proteína de menos aunque las kcal cuadren');
  assert.equal(fitsTarget({ ...target, carbs: 290 }, target), false);
  assert.equal(fitsTarget({ ...target, fat: 64 }, target), false);
});

test('el redondeo no hace saltar el aviso en el borde', () => {
  // 10.4 g se pinta "+10" y cuenta como dentro, igual que el chip en verde.
  assert.equal(fitsTarget({ ...target, protein: 170.4 }, target), true);
  assert.equal(fitsTarget({ ...target, protein: 170.6 }, target), false);
});
