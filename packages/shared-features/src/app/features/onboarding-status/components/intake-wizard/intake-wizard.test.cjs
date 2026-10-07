const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { loadFromSource, angularCoreStub } = require('../../../../../../../../tests/support/ng-harness.cjs');

// Wizard del cuestionario de alta (cliente): los pasos de lo que pide el
// profesional además de preguntas (medidas, fotos de inicio y un paso por
// vídeo), qué bloquea «Siguiente» y lo que se envía. Lo que no bloquee aquí
// lo rechaza el back al enviar, y el cliente se encuentra el error al final
// de un formulario largo.

const { IntakeWizardComponent } = loadFromSource(
  __filename,
  __dirname,
  { IntakeWizardComponent: './intake-wizard.component' },
  {
    external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*', '@capacitor/*', 'swiper', 'swiper/*'],
    requires: {
      '@angular/core': { ...angularCoreStub(), inject: () => ({ instant: (key) => (key === 'COACH.AND' ? ' y ' : key) }) },
      swiper: { default: class {} },
    },
  }
);

const NO_FIELDS = new Set();

function wizard({ measurements = [], photos = null, videos = [], uploads = { images: true, videos: true }, prefill = null, readonly = false } = {}) {
  const component = new IntakeWizardComponent();
  component.enabledFields = NO_FIELDS;
  component.measurementRequests = measurements;
  component.photoRequest = photos;
  component.videoRequests = videos;
  component.uploads = uploads;
  component.prefill = prefill;
  component.readonly = readonly;
  const changes = Object.fromEntries(
    ['prefill', 'enabledFields', 'customQuestions', 'measurementRequests', 'photoRequest', 'videoRequests', 'uploads'].map((key) => [key, {}])
  );
  component.ngOnChanges(changes);
  return component;
}

const steps = (component) => component.stepIds;
const goTo = (component, stepId) => {
  component.currentStep = steps(component).indexOf(stepId);
  assert.ok(component.currentStep >= 0, `no hay paso ${stepId}`);
};

function submitted(component) {
  let payload = null;
  component.submitted = { emit: (value) => (payload = value) };
  component.submit();
  return payload;
}

const VIDEOS = [
  { _id: 'v1', label: 'Sentadilla sin peso, de perfil', required: true },
  { _id: 'v2', label: 'Movilidad de hombro', required: false },
];

test('pasos: medidas, fotos y un paso por vídeo, al final y en ese orden', () => {
  const component = wizard({
    measurements: [{ key: 'perimeter_waist', required: true }],
    photos: { poses: ['front', 'side'], required: true },
    videos: VIDEOS,
  });
  assert.deepEqual(steps(component), ['measurements', 'photos', 'video:v1', 'video:v2']);
});

test('pasos: sin nada pedido no hay pasos de más; sin almacenamiento no salen fotos ni vídeos', () => {
  assert.deepEqual(steps(wizard()), []);
  const offline = wizard({
    measurements: [{ key: 'perimeter_waist', required: false }],
    photos: { poses: ['front'], required: true },
    videos: VIDEOS,
    uploads: { images: false, videos: false },
  });
  assert.deepEqual(steps(offline), ['measurements'], 'las medidas no necesitan subir nada');
});

test('medidas: en el orden del catálogo (el que ve el profesional al pedirlas), con su obligatoriedad', () => {
  const component = wizard({
    measurements: [
      { key: 'perimeter_hip', required: false },
      { key: 'fat_mass', required: true },
      { key: 'perimeter_waist', required: true },
    ],
  });
  assert.deepEqual(
    component.measurementItems.map((item) => [item.field.key, item.required, item.field.unit]),
    [
      ['fat_mass', true, 'kg'],
      ['perimeter_waist', true, 'cm'],
      ['perimeter_hip', false, 'cm'],
    ]
  );
});

test('medidas: «Siguiente» se bloquea si falta una obligatoria o hay un valor imposible, aunque sea opcional', () => {
  const component = wizard({
    measurements: [
      { key: 'perimeter_waist', required: true },
      { key: 'perimeter_hip', required: false },
    ],
  });
  goTo(component, 'measurements');
  assert.equal(component.isStepBlocked, true, 'falta la cintura');

  component.setMeasurement('perimeter_waist', '82,5');
  assert.equal(component.measurements.perimeter_waist, 82.5, 'acepta la coma decimal');
  assert.equal(component.isStepBlocked, false, 'la cadera es opcional');

  component.setMeasurement('perimeter_hip', 9);
  assert.equal(component.isStepBlocked, true, '9 cm de cadera es una errata');
  assert.equal(component.isMeasurementInvalid(component.measurementItems[1]), true);

  component.setMeasurement('perimeter_hip', '');
  assert.equal(component.measurements.perimeter_hip, null, 'borrar el campo es no mandarla');
  assert.equal(component.isStepBlocked, false);
});

test('fotos: obligatorias bloquean mientras falte alguna pose (también antes de cargar); opcionales nunca', () => {
  const required = wizard({ photos: { poses: ['front', 'side'], required: true } });
  goTo(required, 'photos');
  assert.equal(required.photosMissing, 2, 'antes de que el campo cargue, todo cuenta como pendiente');
  assert.equal(required.isStepBlocked, true);
  required.photosMissing = 1;
  assert.equal(required.isStepBlocked, true);
  required.photosMissing = 0;
  assert.equal(required.isStepBlocked, false);

  const optional = wizard({ photos: { poses: ['front'], required: false } });
  goTo(optional, 'photos');
  assert.equal(optional.isStepBlocked, false);
});

test('vídeos: el obligatorio bloquea hasta tener uno; cualquiera bloquea mientras se sube', () => {
  const component = wizard({ videos: VIDEOS });
  goTo(component, 'video:v1');
  assert.equal(component.isStepBlocked, true);
  component.setVideo(VIDEOS[0], 'asset-1');
  assert.equal(component.isStepBlocked, false);

  goTo(component, 'video:v2');
  assert.equal(component.isStepBlocked, false, 'opcional');
  component.setVideoUploading(VIDEOS[1], true);
  assert.equal(component.isStepBlocked, true, 'salir a mitad de subida la perdería');
  component.setVideoUploading(VIDEOS[1], false);
  assert.equal(component.isStepBlocked, false);
});

test('solo lectura (revisado por el profesional): nada bloquea', () => {
  const component = wizard({ measurements: [{ key: 'perimeter_waist', required: true }], videos: VIDEOS, readonly: true });
  for (const step of steps(component)) {
    goTo(component, step);
    assert.equal(component.isStepBlocked, false, step);
  }
});

test('envío: solo medidas válidas que se pidieron, el día de fotos y un vídeo por petición', () => {
  const component = wizard({
    measurements: [
      { key: 'perimeter_waist', required: true },
      { key: 'perimeter_hip', required: false },
      { key: 'perimeter_neck', required: false },
    ],
    photos: { poses: ['front'], required: false },
    videos: VIDEOS,
    prefill: {
      measurements: { perimeter_waist: 80, perimeter_chest: 100 },
      photosDayId: 'day-1',
      videos: { v1: 'asset-1', inventado: 'asset-x' },
      customAnswers: {},
    },
  });
  component.setMeasurement('perimeter_hip', '98');
  component.setMeasurement('perimeter_neck', 5);
  const payload = submitted(component);
  assert.deepEqual(payload.measurements, [
    { key: 'perimeter_waist', value: 80 },
    { key: 'perimeter_hip', value: 98 },
  ], 'ni lo no pedido (pecho) ni lo imposible (cuello de 5 cm)');
  assert.equal(payload.photosDayId, 'day-1');
  assert.deepEqual(payload.videos, [{ requestId: 'v1', assetId: 'asset-1' }]);
});

test('envío: sin paso de fotos no se manda un día de fotos guardado de antes', () => {
  const component = wizard({ prefill: { photosDayId: 'day-1', measurements: {}, videos: {}, customAnswers: {} } });
  assert.equal(submitted(component).photosDayId, null);
});

test('las poses se nombran en una lista legible', () => {
  const component = wizard();
  assert.equal(component.poseList(['front', 'side', 'back']), 'media.pose_front, media.pose_side y media.pose_back');
  assert.equal(component.poseList(['back']), 'media.pose_back');
});
