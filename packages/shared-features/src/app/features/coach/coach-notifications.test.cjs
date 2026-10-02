const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');
const { of, Subject } = require('rxjs');

// Ejecuta los métodos reales de CoachPage, con Angular/Ionic fuera del test.
const bundled = buildSync({
  entryPoints: [path.join(__dirname, 'coach.page.ts')],
  tsconfig: path.resolve(__dirname, '../../../../../../apps/train-fit-front/tsconfig.json'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
  external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*'],
});
const compiled = new Module(__filename);
compiled.require = (name) => {
  if (name === '@angular/core') return { Component: () => (target) => target };
  if (name === '@angular/animations') {
    return Object.fromEntries(['animate', 'group', 'query', 'style', 'transition', 'trigger'].map((key) => [key, () => ({})]));
  }
  return require(name);
};
compiled._compile(bundled.outputFiles[0].text, __filename);
const { CoachPage } = compiled.exports;

const notification = (id, read = false) => ({
  _id: id, type: 'routine_assigned', read, payload: {}, createdAt: '2026-09-26',
});

function pointerEvent(detail = 1) {
  return {
    detail, stopped: false, prevented: false,
    stopPropagation() { this.stopped = true; },
    preventDefault() { this.prevented = true; },
  };
}

function harness(items = [notification('one'), notification('two')]) {
  const calls = { load: 0, delete: [], read: [], navigate: [], errors: [], close: 0, markAll: 0 };
  let unreadCount = items.filter((item) => !item.read).length;
  const api = {
    getMine: () => { calls.load++; return of(items); },
    delete: (id) => { calls.delete.push(id); return of(undefined); },
    markRead: (id) => { calls.read.push(id); return of(undefined); },
    markAllRead: () => { calls.markAll++; return of(undefined); },
  };
  const badge = {
    setUnreadCount: (count) => { unreadCount = count; },
    decrementBy: (amount) => { unreadCount = Math.max(0, unreadCount - amount); },
    markAllReadLocally: () => { unreadCount = 0; },
  };
  const sliding = {
    getOpenAmount: async () => 0,
    close: async () => { calls.close++; },
  };
  // Las dependencias van por POSICIÓN: el orden es el del constructor de
  // CoachPage (router, professionalsApi, coachDashboardApi, notificationsApi,
  // tasksApi, coachService, notificationsService, onboardingService,
  // ionicUtilService, translate). Añadir una dependencia nueva en medio
  // desplaza todo lo de abajo — ver el assert de más abajo, que lo detecta.
  const page = new CoachPage(
    { navigate: (...args) => { calls.navigate.push(args); return Promise.resolve(true); } },
    {}, {}, api, {}, {}, badge, {},
    { showErrorToast: (...args) => { calls.errors.push(args); } },
    { instant: (key) => key }
  );
  // 2026-10 — CoachPage ganó `translate` como 10.º parámetro y este harness
  // seguía pasando el doble de ionicUtilService ahí, así que
  // `this.ionicUtilService.showErrorToast` era undefined: el aviso de "no se
  // pudo borrar" dejó de comprobarse (y de ejecutarse) sin que nadie lo viera,
  // porque este fichero estaba fuera del runner. El assert evita que vuelva a
  // pasar en silencio.
  assert.equal(
    typeof page.ionicUtilService?.showErrorToast,
    'function',
    'El constructor de CoachPage ha cambiado de orden: ionicUtilService ya no ' +
      'cae en la posición 9. Reordena los dobles de arriba.'
  );
  assert.equal(
    typeof page.translate?.instant,
    'function',
    'El constructor de CoachPage ha cambiado de orden: translate ya no cae en ' +
      'la posición 10. Reordena los dobles de arriba.'
  );
  page.notificationsState = 'loaded';
  page.notifications = [...items];
  page.updateVisibleNotifications();
  return { page, api, calls, sliding, unread: () => unreadCount };
}

test('el click al soltar el swipe nunca abre una notificación borrada ni repite DELETE', async () => {
  const { page, calls, sliding, unread } = harness();
  const item = page.notifications[0];
  page.dragNotification();
  const event = pointerEvent();
  page.deleteNotification(item, sliding, event);
  page.deleteNotification(item, sliding, pointerEvent());
  await page.openNotification(item, pointerEvent(), sliding);
  assert.deepEqual(calls.delete, ['one']);
  assert.deepEqual(calls.navigate, []);
  assert.deepEqual(calls.read, []);
  assert.equal(unread(), 1);
  assert.equal(event.stopped, true);
  assert.equal(event.prevented, true);
});

test('swipe parcial bloquea el click sintetizado y una nueva pulsación vuelve a navegar', async () => {
  const { page, calls, sliding } = harness();
  page.dragNotification();
  await page.openNotification(page.notifications[0], pointerEvent(), sliding);
  await page.openNotification(page.notifications[1], pointerEvent(), sliding);
  assert.deepEqual(calls.navigate, []);
  page.startNotificationPointer();
  await page.openNotification(page.notifications[1], pointerEvent(), sliding);
  assert.equal(calls.navigate.length, 1);
  assert.deepEqual(calls.navigate[0][0], ['/tabs/summary']);
});

test('teclado funciona tras un swipe y tocar acciones abiertas solo las cierra', async () => {
  const { page, calls, sliding } = harness();
  page.dragNotification();
  sliding.getOpenAmount = async () => 72;
  await page.openNotification(page.notifications[0], pointerEvent(0), sliding);
  assert.equal(calls.close, 1);
  assert.deepEqual(calls.navigate, []);
  sliding.getOpenAmount = async () => 0;
  await page.openNotification(page.notifications[0], pointerEvent(0), sliding);
  assert.equal(calls.navigate.length, 1);
});

test('refresh conserva lista y expansión, evita duplicados y sincroniza badge con una petición', async () => {
  const { page, api, calls, sliding, unread } = harness();
  const response = new Subject();
  api.getMine = () => { calls.load++; return response; };
  page.showAllNotifications = true;
  const previous = page.notifications;
  page.loadNotifications();
  page.loadNotifications();
  await page.openNotification(previous[0], pointerEvent(), sliding);
  page.deleteNotification(previous[0], sliding, pointerEvent());
  page.markAllRead();
  assert.equal(page.notifications, previous);
  assert.equal(page.notificationsState, 'loaded');
  assert.equal(page.refreshingNotifications, true);
  assert.equal(calls.load, 1);
  assert.deepEqual(calls.navigate, []);
  assert.deepEqual(calls.delete, []);
  assert.equal(calls.markAll, 0);
  response.next([notification('new'), notification('read', true)]);
  response.complete();
  assert.equal(page.showAllNotifications, true);
  assert.equal(page.refreshingNotifications, false);
  assert.equal(unread(), 1);
  assert.deepEqual(page.notifications.map((item) => item._id), ['new', 'read']);
});

test('error al refrescar conserva datos y badge; la carga inicial fallida permite reintentar', () => {
  const { page, api, unread } = harness();
  const pending = new Subject();
  api.getMine = () => pending;
  const previous = page.notifications;
  page.loadNotifications();
  pending.error(new Error('offline'));
  assert.equal(page.notifications, previous);
  assert.equal(page.notificationsState, 'loaded');
  assert.equal(page.notificationsRefreshFailed, true);
  assert.equal(page.refreshingNotifications, false);
  assert.equal(unread(), 2);

  page.notificationsState = 'loading';
  page.notifications = [];
  page.loadNotifications();
  assert.equal(page.notificationsState, 'error');
  api.getMine = () => of([notification('retried')]);
  page.loadNotifications();
  assert.equal(page.notificationsState, 'loaded');
  assert.equal(page.notificationsRefreshFailed, false);
  assert.equal(unread(), 1);
});

test('borrados pendientes bloquean refresh y dos fallos restauran orden y badge', () => {
  const { page, api, calls, sliding, unread } = harness([notification('one'), notification('two'), notification('three')]);
  const first = new Subject();
  const second = new Subject();
  api.delete = (id) => id === 'one' ? first : second;
  const [one, two] = page.notifications;
  page.deleteNotification(one, sliding, pointerEvent());
  page.deleteNotification(two, sliding, pointerEvent());
  page.loadNotifications();
  page.markAllRead();
  assert.equal(calls.load, 0);
  assert.equal(calls.markAll, 0);
  assert.equal(unread(), 1);
  first.error(new Error('offline'));
  second.error(new Error('offline'));
  assert.deepEqual(page.notifications.map((item) => item._id), ['one', 'two', 'three']);
  assert.equal(page.notificationsRefreshDisabled, false);
  assert.equal(unread(), 3);
  assert.equal(calls.errors.length, 2);
});

test('refresh espera una lectura pendiente y su fallo restablece el contador', async () => {
  const { page, api, calls, sliding, unread } = harness();
  const reading = new Subject();
  api.markRead = () => reading;
  await page.openNotification(page.notifications[0], pointerEvent(), sliding);
  page.loadNotifications();
  assert.equal(calls.load, 0);
  assert.equal(unread(), 1);
  reading.error(new Error('offline'));
  assert.equal(unread(), 2);
  assert.equal(page.notifications[0].read, false);
  assert.equal(page.notificationsRefreshDisabled, false);
});

test('un borrado ocurrido durante getOpenAmount también impide leer y navegar', async () => {
  const { page, calls, sliding } = harness();
  let resolveAmount;
  sliding.getOpenAmount = () => new Promise((resolve) => { resolveAmount = resolve; });
  const item = page.notifications[0];
  const opening = page.openNotification(item, pointerEvent(), sliding);
  page.deleteNotification(item, sliding, pointerEvent());
  resolveAmount(0);
  await opening;
  assert.deepEqual(calls.navigate, []);
  assert.deepEqual(calls.read, []);
});
