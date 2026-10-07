const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Lo que el profesional puede pedir en el cuestionario de alta además de
// preguntas está escrito dos veces: en el back, que lo valida
// (trainerIntakeConfig/intake-requests.js), y en el front, que lo ofrece al
// invitar y lo pinta en el formulario del cliente
// (core/models/intake-requests.ts). Una medida que el front ofrece y el back
// no conoce rompe el guardado al invitar; una cota distinta deja al cliente
// enviar un valor que el back rechaza al final del formulario.
//
// Lee el back del repo hermano (o TRAINFIT_BACK_DIR); sin él, se omite.

const { loadFromSource } = require(path.join(__dirname, 'support/ng-harness.cjs'));

const ROOT = path.resolve(__dirname, '..');
const BACK = process.env.TRAINFIT_BACK_DIR || path.resolve(ROOT, '../train-fit-back');

function loadBack() {
  try {
    return {
      requests: require(path.join(BACK, 'components/trainerIntakeConfig/intake-requests.js')),
      catalog: require(path.join(BACK, 'components/trainerCheckins/checkin-field-catalog.js')),
    };
  } catch {
    return null; // sin el back o sin sus node_modules (CI del front)
  }
}

const back = fs.existsSync(BACK) ? loadBack() : null;
const front = loadFromSource(__filename, path.join(ROOT, 'packages/shared-core/src/app/core'), {
  INTAKE_MEASUREMENT_FIELDS: 'src/app/core/models/intake-requests',
  INTAKE_PHOTO_POSES: 'src/app/core/models/intake-requests',
  MAX_INTAKE_VIDEOS: 'src/app/core/models/intake-requests',
  INTAKE_VIDEO_LABEL_MAX: 'src/app/core/models/intake-requests',
});

test('medidas que se pueden pedir: perímetros y composición del catálogo de check-in, sin el peso', () => {
  const keys = front.INTAKE_MEASUREMENT_FIELDS.map((field) => field.key);
  assert.ok(keys.length > 10);
  assert.ok(!keys.includes('weight'), 'el peso se pide siempre en el perfil');
  for (const field of front.INTAKE_MEASUREMENT_FIELDS) {
    assert.equal(field.storage, 'anthropometry', field.key);
    assert.ok(field.unit && field.min !== undefined && field.max !== undefined, `${field.key}: unidad y cotas`);
  }
});

test('front y back ofrecen las mismas medidas, con las mismas cotas, poses y límites de vídeos', { skip: !back && 'sin el back' }, () => {
  assert.deepEqual(front.INTAKE_MEASUREMENT_FIELDS.map((field) => field.key), back.requests.INTAKE_MEASUREMENT_KEYS);
  for (const field of front.INTAKE_MEASUREMENT_FIELDS) {
    const server = back.catalog.CHECKIN_FIELDS_BY_KEY.get(field.key);
    assert.deepEqual([field.min, field.max, field.unit], [server.min, server.max, server.unit], field.key);
  }
  assert.deepEqual(front.INTAKE_PHOTO_POSES, back.requests.INTAKE_PHOTO_POSES);
  assert.equal(front.MAX_INTAKE_VIDEOS, back.requests.MAX_INTAKE_VIDEOS);
  assert.equal(front.INTAKE_VIDEO_LABEL_MAX, back.requests.VIDEO_LABEL_MAX);
});
