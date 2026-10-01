const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const rx = require('rxjs');
const root = path.resolve(__dirname, '..');
const { esTranslator } = require('./i18n-es.cjs');
// Traducción en español para el código que usa uiText / TranslateService.
const es = esTranslator('train-fit-trainers');
const i18nMocks = {
  'src/app/core/i18n/localized-catalog': {
    uiText: es.instant,
    uiLocale: () => 'es-ES',
    localizeProp() {},
    localizeList() {},
    localizeRecord() {},
  },
  '@ngx-translate/core': { TranslateService: class {} },
};
function load(file, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { exports: module.exports, module, require: (name) => mocks[name] || i18nMocks[name] || require(name), console: { info() {}, warn() {}, error() {} }, localStorage: { removeItem() {} }, atob: (value) => Buffer.from(value, 'base64').toString('binary'), Date }, { filename: file });
  return module.exports;
}
const chart = load('apps/train-fit-trainers/src/app/features/clients/pages/client-detail/components/training-comparison-chart/training-comparison.ts');
const pain = load('apps/train-fit-trainers/src/app/features/planner/utils/planner-pain.ts');
const { TrainingComparisonChartComponent } = load('apps/train-fit-trainers/src/app/features/clients/pages/client-detail/components/training-comparison-chart/training-comparison-chart.component.ts', {
  '@angular/core': {
    Component: () => (type) => type,
    Input: () => () => {},
    Output: () => () => {},
    ViewChild: () => () => {},
    EventEmitter: class { emit() {} },
    inject: () => es,
  },
  '../../models/client-progress.model': load('apps/train-fit-trainers/src/app/features/clients/pages/client-detail/models/client-progress.model.ts'),
  './training-comparison': chart,
});

test('comparación A/B usa el mapa de ejercicios y conserva reps y RIR de la serie', () => {
  const component = new TrainingComparisonChartComponent();
  component.blocks = [
    { splitId: 'a', name: 'A', start: '2026-09-01', volume: 3000, volumePerSession: 1000, sessions: 3, sets: 30 },
    { splitId: 'b', name: 'B', start: '2026-09-08', volume: 2400, volumePerSession: 1200, sessions: 2, sets: 22 },
  ];
  component.ngOnChanges({});
  assert.equal(component.showComparison, true);
  assert.equal(component.primary.percentage, '+20%');
  component.metric = 'exercise';
  component.selectedExercises = ['Press'];
  component.blockExerciseByName = { Press: [
    { splitId: 'a', maxWeight: 50, sets: 3, totalReps: 24, volume: 1200, bestSet: { weight: 50, reps: 8, rir: [2] } },
    { splitId: 'b', maxWeight: 55, sets: 3, totalReps: 24, volume: 1320, bestSet: { weight: 55, reps: 8, rir: [0] } },
  ] };
  component.ngOnChanges({});
  assert.equal(component.primary.percentage, '+10%');
  assert.equal(component.rows.find((row) => row.key === 'reps').b, 8);
  assert.equal(component.rows.find((row) => row.key === 'rir').b, 0);
  component.selectSide('a', 'b');
  assert.equal(component.comparisonId, 'a');
  assert.equal(component.primary.direction, 'down');
});

test('varios ejercicios conservan el eje común con huecos por microciclo y por sesión', () => {
  const component = new TrainingComparisonChartComponent();
  component.metric = 'exercise';
  component.selectedExercises = ['Press', 'Remo'];
  component.blocks = [{ splitId: 'a', name: 'A' }, { splitId: 'b', name: 'B' }];
  component.blockExerciseByName = {
    Press: [{ splitId: 'b', maxWeight: 55 }],
    Remo: [{ splitId: 'a', maxWeight: 40 }],
  };
  component.ngOnChanges({});
  assert.equal(component.showComparison, false);
  assert.equal(component.rows.length, 0);
  let config = component.buildExerciseConfig();
  assert.deepEqual(Array.from(config.data.datasets[0].data), [null, 55]);
  assert.deepEqual(Array.from(config.data.datasets[1].data), [40, null]);
  component.granularity = 'session';
  component.sessionTraining = [{ date: '2026-09-01' }, { date: '2026-09-03' }];
  component.sessionExerciseByName = {
    Press: [{ date: '2026-09-01', maxWeight: 50 }],
    Remo: [{ date: '2026-09-03', maxWeight: 45 }],
  };
  config = component.buildExerciseConfig();
  assert.deepEqual(Array.from(config.data.datasets[0].data), [50, null]);
  assert.deepEqual(Array.from(config.data.datasets[1].data), [null, 45]);
});

test('readiness y adherencia conservan escalas, ceros y registros ausentes al cambiar de granularidad', () => {
  const component = new TrainingComparisonChartComponent();
  component.metric = 'readiness';
  component.blockReadiness = [{ name: 'A', avgReadinessPre: null, avgPerceivedEffortPost: 4, sessionsWithPulse: 1 }];
  component.ngOnChanges({});
  assert.equal(component.showComparison, false);
  assert.equal(component.hasData, true);
  let config = component.buildReadinessConfig();
  assert.equal(config.options.scales.y.min, 1);
  assert.equal(config.options.scales.y.max, 5);
  assert.equal(config.data.datasets[0].data[0], null);
  assert.equal(config.data.datasets[1].data[0], 4);
  component.metric = 'adherence';
  component.granularity = 'session';
  component.sessionAdherence = [{ date: '2026-09-01', totalSets: 5, donedSets: 0, adherence: 0 }];
  component.ngOnChanges({});
  assert.equal(component.hasData, true);
  config = component.buildAdherenceConfig();
  assert.equal(config.data.datasets[0].data[0], 0);
  assert.equal(config.options.scales.y.max, 100);
  assert.equal(config.options.plugins.tooltip.callbacks.afterLabel({ dataIndex: 0 })[0], '0 de 5 series');
  component.sessionAdherence[0].adherence = null;
  assert.equal(component.hasData, false);
  component.metric = 'sessions';
  assert.equal(component.showComparison, true);
});

test('normaliza por sesión aunque B tenga menos volumen total', () => {
  const rows = chart.overviewRows({ volume: 3000, volumePerSession: 1000, sessions: 3, sets: 30 }, { volume: 2400, volumePerSession: 1200, sessions: 2, sets: 22 });
  assert.equal(rows[0].percentage, '+20%');
  assert.equal(rows[1].b, 11);
  assert.equal(chart.comparisonRow('x', 'x', '', 10 / 3, 5).percentage, '+50%');
});
test('cero y falta de registro no producen porcentajes ficticios', () => {
  assert.equal(chart.comparisonRow('x', 'x', 'kg', 0, 20).percentage, null);
  assert.equal(chart.comparisonRow('x', 'x', 'kg', null, 20).direction, 'missing');
});
test('RIR cero, fallo y rangos se conservan sin porcentajes', () => {
  const rows = chart.exerciseRows({ bestSet: { rir: [2] } }, { bestSet: { rir: [0] } });
  assert.equal(rows[2].b, 0);
  assert.equal(rows[2].percentage, null);
  assert.equal(chart.exerciseRows(undefined, { bestSet: { rir: [-1] } })[2].textB, 'Fallo');
  assert.equal(chart.exerciseRows(undefined, { bestSet: { rir: [1, 2] } })[2].b, null);
});
test('grupo sin conteos antiguos permanece sin dato; grupo ausente con desglose es cero', () => {
  const rows = chart.muscleRows({ muscleGroups: [{ group: 'Pecho', sets: 6 }] }, { muscleGroups: [{ group: 'Espalda', sets: 4 }] }, 2, 2);
  assert.equal(rows.find((row) => row.key === 'Pecho').b, 0);
  assert.equal(chart.muscleRows({ muscleGroups: [{ group: 'Pecho', volume: 500 }] }, undefined, 2, 2)[0].a, null);
});
test('último dolor cero sustituye el anterior sin confundirlo con falta de registros', () => {
  const result = pain.latestPlannerPain([{ zone: 'Rodilla', level: 7, date: '2026-09-01' }, { zone: 'Hombro', level: 4, date: '2026-09-02' }, { zone: 'Rodilla', level: 0, date: '2026-09-03' }], [{ zone: 'Hombro', painLevel: 3 }]);
  assert.equal(result.length, 2);
  assert.equal(result[0].zone, 'Hombro');
  assert.equal(result[0].overThreshold, true);
  assert.equal(result[1].level, 0);
  assert.equal(pain.latestPlannerPain([], []).length, 0);
});

const { AuthService } = load('packages/shared-core/src/app/core/services/auth/auth.service.ts', { '@angular/core': { Injectable: () => (type) => type } });
const jwt = (exp) => 'fixture.' + Buffer.from(JSON.stringify({ sub: 'fixture', exp })).toString('base64url') + '.fixture';
function authFixture(refresh) {
  return new AuthService({ refreshToken: refresh }, { removeUserToken() {} }, {}, {}, {}, { isNativeClient: false }, { clear() {} });
}
test('token de acceso caducado renueva una sola vez con llamadas concurrentes', async () => {
  let calls = 0;
  const response = new rx.Subject();
  const auth = authFixture(() => { calls++; return response; });
  await auth.persistAuthTokens({ access_token: jwt(Date.now() / 1000 - 1) });
  const a = rx.firstValueFrom(auth.ensureAuthenticated());
  const b = rx.firstValueFrom(auth.ensureAuthenticated());
  response.next({ access_token: jwt(Date.now() / 1000 + 900) });
  response.complete();
  assert.equal(await a, true);
  assert.equal(await b, true);
  assert.equal(calls, 1);
  assert.equal(auth.isAuthenticated(), true);
});
test('fallo temporal permite reintentar refresh conservando usuario', async () => {
  let calls = 0;
  const auth = authFixture(() => ++calls === 1 ? rx.throwError(() => ({ status: 503 })) : rx.of({ access_token: jwt(Date.now() / 1000 + 900) }));
  await auth.persistAuthTokens({ access_token: jwt(Date.now() / 1000 - 1) });
  await assert.rejects(rx.firstValueFrom(auth.ensureAuthenticated()));
  assert.ok(auth.user);
  assert.equal(await rx.firstValueFrom(auth.ensureAuthenticated()), true);
  assert.equal(calls, 2);
});
test('guard: error temporal conserva pantalla; terminal anidado cierra sesión', async () => {
  let error = { status: 503 };
  let logouts = 0;
  let redirects = 0;
  const auth = { user: { sub: 'fixture' }, isAuthenticated: () => false, restoreSessionSilently: () => rx.throwError(() => error), isTerminalAuthError: AuthService.prototype.isTerminalAuthError, logout: () => logouts++ };
  const Router = {}, Pending = {};
  const guard = load('packages/shared-core/src/app/core/guards/auth.guard.ts', {
    '@angular/core': { inject: (token) => token === AuthService ? auth : token === Router ? { createUrlTree() { redirects++; }, getCurrentNavigation: () => null } : { hasPendingVerification: () => false } },
    '@angular/router': { Router },
    '../services/auth/auth.service': { AuthService },
    '../services/auth/auth-error.service': {},
    '../services/auth/pending-email-verification.service': { PendingEmailVerificationService: Pending },
  });
  assert.equal(await rx.firstValueFrom(guard.authActivateGuard()), false);
  assert.equal(redirects, 0);
  assert.equal(logouts, 0);
  error = { status: 401, error: { code: 'SESSION_REPLACED', requiresRelogin: true } };
  assert.equal(await rx.firstValueFrom(guard.authActivateGuard()), false);
  assert.equal(logouts, 1);
});
