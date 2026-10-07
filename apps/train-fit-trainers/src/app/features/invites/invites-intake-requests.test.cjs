const test = require('node:test');
const assert = require('node:assert/strict');
const { of, throwError } = require('rxjs');
const { loadFromSource, angularCoreStub } = require('../../../../../../tests/support/ng-harness.cjs');

// Pantalla de invitar (trainers): lo que el profesional pide en el
// cuestionario de alta además de preguntas (medidas obligatorias u
// opcionales, fotos de inicio y vídeos) y cómo se guarda. Cada invitación
// se lleva una copia de lo GUARDADO: guardar tiene que ir antes de enviar y,
// si falla, no puede salir ninguna invitación.

const translate = { instant: (key) => key };
const { InvitesPage } = loadFromSource(
  __filename,
  __dirname,
  { InvitesPage: './invites.page' },
  {
    app: 'train-fit-trainers',
    requires: { '@angular/core': { ...angularCoreStub(), inject: () => translate } },
  }
);

const CONFIG = {
  trainerId: 't1',
  enabledFields: ['goals'],
  customQuestions: [],
  measurements: [{ key: 'perimeter_waist', required: true }, { key: 'perimeter_hip', required: false }],
  photos: { poses: ['front', 'back'], required: false },
  videos: [{ _id: 'v1', label: 'Sentadilla de perfil', required: true, enabled: true }],
  lastScopes: ['training'],
};

function harness({ config = CONFIG, saveFails = false } = {}) {
  const calls = { saved: [], sent: [], order: [], errors: [], toasts: [] };
  const api = {
    getIntakeConfig: () => of(structuredClone(config)),
    updateIntakeConfig: (body) => {
      calls.order.push('save');
      calls.saved.push(body);
      if (saveFails) return throwError(() => ({ error: { message: 'No se pudo guardar' } }));
      return of({ ...body, trainerId: 't1', videos: body.videos.map((video, i) => ({ _id: video._id || `new${i}`, ...video })) });
    },
    sendInvite: (email, scopes) => {
      calls.order.push('send');
      calls.sent.push({ email, scopes });
      return of({ results: scopes.map((scope) => ({ scope, success: true, error: null, invitation: null })) });
    },
    getMyInvites: () => of([]),
    checkClientEmailStatus: () => of(null),
  };
  const ionic = {
    showToast: (toast) => calls.toasts.push(toast),
    showErrorToast: (message) => calls.errors.push(message),
  };
  const page = new InvitesPage(api, ionic, { navigate: () => Promise.resolve(true) });
  const values = { training: true, nutrition: false };
  page.form = {
    get value() {
      return values;
    },
    get: (name) => ({ value: values[name], setValue: (value) => (values[name] = value) }),
    patchValue: (patch) => Object.assign(values, patch),
    markAllAsTouched() {},
    reset: (next) => Object.assign(values, next),
  };
  return { page, calls };
}

test('al cargar: medidas y fotos como se guardaron; los vídeos guardados sin marcar, como las preguntas propias', () => {
  const { page } = harness();
  page.loadIntakeConfig();
  assert.equal(page.intakeConfigState, 'loaded');
  assert.deepEqual([...page.selectedMeasurements], [['perimeter_waist', true], ['perimeter_hip', false]]);
  assert.deepEqual(page.photoRequest, { poses: ['front', 'back'], required: false });
  assert.deepEqual(page.videoRequests.map((v) => [v.label, v.enabled]), [['Sentadilla de perfil', false]]);
});

test('medidas: marcar una la pide como opcional; la píldora la hace obligatoria y desmarcar la quita', () => {
  const { page } = harness();
  page.loadIntakeConfig();
  page.toggleMeasurement('perimeter_neck');
  assert.equal(page.isMeasurementRequired('perimeter_neck'), false);
  page.toggleMeasurementRequired('perimeter_neck');
  assert.equal(page.isMeasurementRequired('perimeter_neck'), true);
  page.toggleMeasurement('perimeter_neck');
  assert.equal(page.isMeasurementSelected('perimeter_neck'), false);
  page.toggleMeasurementRequired('perimeter_neck');
  assert.equal(page.isMeasurementSelected('perimeter_neck'), false, 'la píldora no marca una medida que no se pide');
  assert.equal(page.measurementCount, 2);
});

test('medidas: los grupos del selector son los del catálogo, sin el peso (va siempre en el perfil)', () => {
  const { page } = harness();
  const keys = page.measurementGroups.flatMap((group) => group.fields.map((field) => field.key));
  assert.ok(!keys.includes('weight'));
  assert.deepEqual(page.measurementGroups.map((group) => group.key), ['composicion_corporal', 'perimetros']);
  assert.ok(keys.includes('perimeter_waist') && keys.includes('fat_mass'));
});

test('fotos: se piden las tres poses como opcionales; siempre queda al menos una y en el orden de siempre', () => {
  const { page } = harness({ config: { ...CONFIG, photos: null } });
  page.loadIntakeConfig();
  page.togglePhotos();
  assert.deepEqual(page.photoRequest, { poses: ['front', 'side', 'back'], required: false });
  page.togglePose('front');
  page.togglePose('back');
  assert.deepEqual(page.photoRequest.poses, ['side']);
  page.togglePose('side');
  assert.deepEqual(page.photoRequest.poses, ['side'], 'la última pose no se quita');
  page.togglePose('front');
  assert.deepEqual(page.photoRequest.poses, ['front', 'side']);
  page.togglePhotosRequired();
  assert.equal(page.photoRequest.required, true);
  page.togglePhotos();
  assert.equal(page.photoRequest, null);
});

test('vídeos: se añaden recortados y marcados, Enter añade sin enviar la invitación, y como mucho 5', () => {
  const { page } = harness({ config: { ...CONFIG, videos: [] } });
  page.loadIntakeConfig();
  page.startVideo();
  page.videoDraft = '   ';
  page.addVideo();
  assert.equal(page.videoRequests.length, 0, 'sin texto no se añade');
  page.videoDraft = '  Plancha de lado  ';
  let prevented = false;
  page.onVideoDraftKeydown({ key: 'Enter', preventDefault: () => (prevented = true) });
  assert.equal(prevented, true);
  assert.deepEqual(page.videoRequests, [{ label: 'Plancha de lado', required: false, enabled: true }]);
  assert.equal(page.videoDraft, null);
  for (let i = 0; i < 10; i++) {
    page.videoDraft = `Vídeo ${i}`;
    page.addVideo();
  }
  assert.equal(page.videoRequests.length, 5);
  page.toggleVideoRequired(0);
  page.toggleVideoEnabled(1);
  assert.deepEqual(page.videoRequests.slice(0, 2).map((v) => [v.required, v.enabled]), [[true, true], [false, false]]);
  page.removeVideo(0);
  assert.equal(page.videoRequests.length, 4);
});

test('guardar: manda la configuración entera, con las medidas en el orden del catálogo', async () => {
  const { page, calls } = harness();
  page.loadIntakeConfig();
  page.toggleMeasurement('fat_mass');
  page.toggleVideoEnabled(0);
  assert.equal(await page.saveIntakeConfig(), true);
  const [body] = calls.saved;
  assert.deepEqual(body.measurements, [
    { key: 'fat_mass', required: false },
    { key: 'perimeter_waist', required: true },
    { key: 'perimeter_hip', required: false },
  ]);
  assert.deepEqual(body.photos, { poses: ['front', 'back'], required: false });
  assert.deepEqual(body.videos.map((v) => [v._id, v.enabled]), [['v1', true]]);
  assert.deepEqual(body.lastScopes, ['training']);
});

test('guardar: sin la configuración cargada no se guarda nada (pisaría la que tiene con una vacía)', async () => {
  const { page, calls } = harness();
  page.intakeConfigState = 'error';
  assert.equal(await page.saveIntakeConfig(), true);
  assert.equal(calls.saved.length, 0);
});

test('enviar: primero se guarda el formulario (la invitación copia lo guardado) y después sale la invitación', async () => {
  const { page, calls } = harness();
  page.loadIntakeConfig();
  page.emailEntries = [{ email: 'ana@x.test', valid: true, checking: false, status: null, failure: null }];
  await page.submit();
  assert.deepEqual(calls.order, ['save', 'send']);
  assert.deepEqual(calls.sent, [{ email: 'ana@x.test', scopes: ['training'] }]);
  assert.equal(page.isSending, false);
});

test('enviar: si no se puede guardar el formulario, no sale ninguna invitación', async () => {
  const { page, calls } = harness({ saveFails: true });
  page.loadIntakeConfig();
  page.emailEntries = [{ email: 'ana@x.test', valid: true, checking: false, status: null, failure: null }];
  await page.submit();
  assert.deepEqual(calls.order, ['save']);
  assert.deepEqual(calls.errors, ['No se pudo guardar']);
  assert.equal(page.isSending, false, 'se puede reintentar');
  assert.equal(page.emailEntries.length, 1, 'los emails siguen en la caja');
});
