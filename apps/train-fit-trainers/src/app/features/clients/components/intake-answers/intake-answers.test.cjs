const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource, angularCoreStub } = require('../../../../../../../../tests/support/ng-harness.cjs');

// Cuestionario de alta visto por el profesional: de lo que pidió (medidas,
// fotos de inicio y vídeos) qué mandó el cliente y qué no. Lo opcional que
// no mandó tiene que verse como «no lo mandó», no desaparecer: el
// profesional lo pidió y tiene que saber que falta.

const translate = { instant: (key) => key };
const { IntakeAnswersComponent } = loadFromSource(
  __filename,
  __dirname,
  { IntakeAnswersComponent: './intake-answers.component' },
  {
    app: 'train-fit-trainers',
    requires: { '@angular/core': { ...angularCoreStub(), inject: () => translate } },
  }
);

const asset = (id) => ({ id, url: `https://cdn.test/${id}`, thumbUrl: null, status: 'ready', durationSec: 12 });

function view(intake) {
  const component = new IntakeAnswersComponent();
  component.intake = { goals: '', customAnswers: [], equipmentTags: [], ...intake };
  component.ngOnChanges();
  return component;
}

test('medidas: lo pedido en el orden del catálogo, con lo que mandó y lo opcional que no', () => {
  const component = view({
    measurements: [{ key: 'perimeter_waist', value: 82.5 }, { key: 'fat_mass', value: 14 }],
    requested: {
      measurements: [
        { key: 'perimeter_hip', required: false },
        { key: 'perimeter_waist', required: true },
        { key: 'fat_mass', required: false },
      ],
      photos: null,
      videos: [],
    },
  });
  assert.deepEqual(
    component.measurementRows.map((row) => [row.key, row.value, row.required]),
    [
      ['fat_mass', '14 kg', false],
      ['perimeter_waist', '82,5 cm', true],
      ['perimeter_hip', null, false],
    ]
  );
});

test('medidas: un cuestionario sin lo pedido (anterior a esto) enseña solo lo que mandó', () => {
  const component = view({ measurements: [{ key: 'perimeter_hip', value: 99 }] });
  assert.deepEqual(component.measurementRows.map((row) => [row.key, row.value]), [['perimeter_hip', '99 cm']]);
  assert.deepEqual(view({}).measurementRows, []);
});

test('vídeos: el que mandó, el que no mandó, el que borró después y el de una petición que ya no está', () => {
  const component = view({
    videos: [
      { requestId: 'v1', label: 'Sentadilla', asset: asset('a1') },
      { requestId: 'v3', label: 'Plancha', asset: null },
      { requestId: 'old', label: 'Antigua', asset: asset('a9') },
    ],
    requested: {
      measurements: [],
      photos: null,
      videos: [
        { _id: 'v1', label: 'Sentadilla', required: true },
        { _id: 'v2', label: 'Movilidad', required: false },
        { _id: 'v3', label: 'Plancha', required: false },
      ],
    },
  });
  assert.deepEqual(
    component.videoRows.map((row) => [row.label, row.state, row.asset?.id || null]),
    [
      ['Sentadilla', 'ready', 'a1'],
      ['Movilidad', 'missing', null],
      ['Plancha', 'deleted', null],
      ['Antigua', 'ready', 'a9'],
    ]
  );
});

test('fotos: pedidas sin mandar se enseñan como pedidas; las poses que faltan se nombran', () => {
  const none = view({ photos: null, requested: { measurements: [], photos: { poses: ['front', 'side'], required: false }, videos: [] } });
  assert.equal(none.photosRequested, true);

  const half = view({
    photos: { id: 'd1', date: '2026-10-06', photos: [{ pose: 'front', asset: asset('p1') }], videos: [] },
    requested: { measurements: [], photos: { poses: ['front', 'side', 'back'], required: false }, videos: [] },
  });
  assert.deepEqual(half.missingPoses, ['side', 'back']);
  assert.equal(half.missingPoseNames, 'media.pose_side, media.pose_back');

  assert.equal(view({}).photosRequested, false, 'sin pedir ni mandar fotos, no hay sección');
});
