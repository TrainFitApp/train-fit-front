const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (M14): «Objetivo 8000» y «Hasta 5000» se guardaba sin tope y
// sin avisar; los errores del back salían sin traducir.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const source = 'src/app/features/clients/habit-form.util';
const { habitFormError, habitPayload, habitErrorKey } = loadFromSource(
  __filename,
  __dirname,
  { habitFormError: source, habitPayload: source, habitErrorKey: source },
  { app: 'train-fit-trainers' }
);

const form = (extra) => ({ type: 'steps', label: '', target: 8000, targetMax: null, unit: 'pasos', ...extra });

test('rango invertido o igual: error, no se manda sin tope a escondidas', () => {
  assert.equal(habitFormError(form({ targetMax: 5000 })), 'CLIENT_DETAIL.TASK_ERRORS.TASK_INVALID_RANGE');
  assert.equal(habitFormError(form({ targetMax: 8000 })), 'CLIENT_DETAIL.TASK_ERRORS.TASK_INVALID_RANGE');
  assert.equal(habitFormError(form({ targetMax: 10000 })), null);
  assert.equal(habitPayload(form({ targetMax: 10000 })).targetMax, 10000);
  assert.equal(habitPayload(form({ targetMax: '' })).targetMax, null, 'vacío = sin tope');
});

test('lo obligatorio', () => {
  assert.equal(habitFormError(form({ target: null })), 'CLIENT_DETAIL.TASK_ERRORS.TASK_INVALID_TARGET');
  assert.equal(habitFormError(form({ target: 0 })), 'CLIENT_DETAIL.TASK_ERRORS.TASK_INVALID_TARGET');
  assert.equal(habitFormError(form({ unit: '  ' })), 'CLIENT_DETAIL.TASK_ERRORS.TASK_UNIT_REQUIRED');
  assert.equal(habitFormError(form({ type: 'custom', label: ' ' })), 'CLIENT_DETAIL.TASK_ERRORS.TASK_LABEL_REQUIRED');
  assert.deepEqual(habitPayload(form({ type: 'custom', label: ' Estirar ', unit: ' min ' })), {
    type: 'custom',
    label: 'Estirar',
    target: 8000,
    targetMax: null,
    unit: 'min',
  });
});

test('errores del back: su código traducido con sus parámetros; si no, el genérico', () => {
  assert.deepEqual(habitErrorKey({ error: { code: 'TASK_TARGET_TOO_HIGH', max: 20 } }), {
    key: 'CLIENT_DETAIL.TASK_ERRORS.TASK_TARGET_TOO_HIGH',
    params: { max: 20 },
  });
  assert.equal(habitErrorKey({ error: { code: 'TASK_DUPLICATE' } }).key, 'CLIENT_DETAIL.TASK_ERRORS.TASK_DUPLICATE');
  assert.equal(habitErrorKey({ error: { message: 'unit es obligatorio' } }).key, 'CLIENT_DETAIL.NO_SE_PUDO_CREAR_EL');
});
