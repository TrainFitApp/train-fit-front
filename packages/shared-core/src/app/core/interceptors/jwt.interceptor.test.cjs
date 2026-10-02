const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Observable, of, throwError, firstValueFrom, Subject } = require('rxjs');
const { take } = require('rxjs/operators');

// El interceptor es donde la app reacciona a los códigos del backend (ver
// train-fit-back/middleware/validateAuth.js y docs/backend.md#autenticación):
// refrescar UNA vez ante ACCESS_EXPIRED aunque fallen diez peticiones a la
// vez, cerrar sesión ante los terminales, mantenimiento y los errores con
// mensaje propio. Se prueba con el interceptor real y la clasificación real
// de AuthService; solo HttpRequest y los servicios de UI son dobles.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

// --- Dobles mínimos de @angular/common/http ----------------------------------------------

class HttpContextToken {
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
  }
}
class HttpContext {
  constructor(map = new Map()) {
    this.map = map;
  }
  get(token) {
    return this.map.has(token) ? this.map.get(token) : token.defaultValue();
  }
  set(token, value) {
    const map = new Map(this.map);
    map.set(token, value);
    return new HttpContext(map);
  }
}
class HttpRequest {
  constructor(method, url, init = {}) {
    this.method = method;
    this.url = url;
    this.headers = { ...(init.headers || {}) };
    this.withCredentials = !!init.withCredentials;
    this.context = init.context || new HttpContext();
  }
  clone({ setHeaders = {}, withCredentials, context } = {}) {
    return new HttpRequest(this.method, this.url, {
      headers: { ...this.headers, ...setHeaders },
      withCredentials: withCredentials ?? this.withCredentials,
      context: context || this.context,
    });
  }
}

const anyClass = new Proxy({}, { get: (_, key) => (key === '__esModule' ? false : class {}) });
const { JWTInterceptor, AuthService } = loadFromSource(
  __filename,
  __dirname,
  {
    JWTInterceptor: 'src/app/core/interceptors/jwt.interceptor',
    AuthService: 'src/app/core/services/auth/auth.service',
  },
  {
    requires: {
      '@angular/common/http': { HttpContextToken, HttpRequest, HttpErrorResponse: class {}, HttpClient: class {}, HttpHeaders: class {}, HttpParams: class {} },
      '@capacitor/core': { Capacitor: { getPlatform: () => 'web', isNativePlatform: () => false }, registerPlugin: () => ({}), WebPlugin: class {} },
      '@ionic/angular': anyClass,
      '@angular/router': anyClass,
    },
  },
);

const isTerminal = (error) => AuthService.prototype.isTerminalAuthError.call(null, error);
const httpError = (status, body = {}) => ({ status, error: body });

function setup({ token = 'viejo', refresh } = {}) {
  const calls = { refresh: 0, logout: 0, toasts: [], maintenance: [] };
  let current = token;
  const authService = {
    getAccessToken: () => current,
    isTerminalAuthError: isTerminal,
    logout: () => {
      calls.logout += 1;
    },
    refreshToken: () => {
      calls.refresh += 1;
      return refresh ? refresh() : of({ access_token: (current = 'nuevo') });
    },
  };
  const injector = {
    get: (token) => {
      if (token?.name === 'MaintenanceModalService') return { presentIfActive: async (m) => calls.maintenance.push(m) };
      if (token?.name === 'IonicUtilService') return { showToast: (t) => calls.toasts.push(t) };
      return { instant: (key) => key };
    },
  };
  return { interceptor: new JWTInterceptor(authService, injector), calls };
}

/** Backend falso: responde según el token que lleva la petición. */
function backend(responder) {
  const seen = [];
  return {
    seen,
    handle(request) {
      seen.push(request);
      return new Observable((subscriber) => {
        const result = responder(request, seen.length);
        if (result instanceof Error || result?.status >= 400) subscriber.error(result);
        else {
          subscriber.next({ body: result, request });
          subscriber.complete();
        }
      });
    },
  };
}

const bearer = (request) => request.headers.Authorization;

test('añade plataforma, familia de app y el token; las rutas públicas no llevan Authorization', async () => {
  const { interceptor } = setup();
  const next = backend(() => 'ok');
  await firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/tables'), next));
  assert.equal(bearer(next.seen[0]), 'Bearer viejo');
  assert.equal(next.seen[0].headers['x-client-family'], 'trainfit-front');
  assert.equal(next.seen[0].headers['x-client-platform'], 'web');
  assert.equal(next.seen[0].withCredentials, true);

  for (const url of ['https://api/api/auth/login', 'https://api/api/auth/refresh', 'https://api/api/users/check/a@b.es']) {
    await firstValueFrom(interceptor.intercept(new HttpRequest('POST', url), next));
    assert.equal(bearer(next.seen.at(-1)), undefined, url);
  }
  await firstValueFrom(interceptor.intercept(new HttpRequest('POST', 'https://api/api/users'), next));
  assert.equal(bearer(next.seen.at(-1)), undefined, 'alta de usuario es pública');
});

test('ACCESS_EXPIRED: refresca una vez y reintenta con el token nuevo', async () => {
  const { interceptor, calls } = setup();
  const next = backend((request) => (bearer(request) === 'Bearer nuevo' ? 'datos' : httpError(401, { code: 'ACCESS_EXPIRED' })));
  const response = await firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/tables'), next));
  assert.equal(response.body, 'datos');
  assert.equal(calls.refresh, 1);
  assert.equal(calls.logout, 0);
});

test('diez peticiones caducadas a la vez: UN solo refresco y todas se reintentan con el token nuevo', async () => {
  const gate = new Subject();
  const { interceptor, calls } = setup({ refresh: () => gate.pipe(take(1)) });
  const next = backend((request) => (bearer(request) === 'Bearer nuevo' ? request.url : httpError(401, { code: 'ACCESS_EXPIRED' })));
  const pending = Array.from({ length: 10 }, (_, i) => firstValueFrom(interceptor.intercept(new HttpRequest('GET', `https://api/api/r${i}`), next)));
  await new Promise((resolve) => setImmediate(resolve));
  gate.next({ access_token: 'nuevo' });
  const results = await Promise.all(pending);
  assert.equal(calls.refresh, 1);
  assert.deepEqual(results.map((r) => r.body), Array.from({ length: 10 }, (_, i) => `https://api/api/r${i}`));
});

test('códigos terminales del backend: cierra sesión sin intentar refrescar', async () => {
  for (const body of [
    { code: 'SESSION_REPLACED', requiresRelogin: true },
    { code: 'PASSWORD_CHANGED', requiresRelogin: true },
    { code: 'REFRESH_EXPIRED', requiresRelogin: true },
    { code: 'USER_NOT_FOUND', requiresRelogin: true },
    { message: 'Invalid token audience', requiresRelogin: true },
  ]) {
    const { interceptor, calls } = setup();
    const next = backend(() => httpError(401, body));
    await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/x'), next)));
    assert.equal(calls.refresh, 0, JSON.stringify(body));
    assert.equal(calls.logout, 1, JSON.stringify(body));
  }
});

test('el refresco falla con error terminal: logout y las peticiones en cola reciben el error (no se quedan colgadas)', async () => {
  const { interceptor, calls } = setup({ refresh: () => throwError(() => httpError(401, { code: 'REFRESH_INVALID', requiresRelogin: true })) });
  const next = backend(() => httpError(401, { code: 'ACCESS_EXPIRED' }));
  const results = await Promise.allSettled([
    firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/a'), next)),
    firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/b'), next)),
  ]);
  assert.ok(results.every((r) => r.status === 'rejected'));
  assert.ok(calls.logout >= 1);
});

test('una petición ya reintentada que vuelve a dar 401 no entra en bucle (un refresco, un reintento, error)', async () => {
  const { interceptor, calls } = setup();
  const next = backend(() => httpError(401, { code: 'ACCESS_INVALID' }));
  await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/x'), next)));
  assert.equal(calls.refresh, 1);
  assert.equal(next.seen.length, 2, 'original + un único reintento');
  // Y el siguiente 401 vuelve a poder refrescar (el semáforo se libera).
  await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/y'), next)));
  assert.equal(calls.refresh, 2);
});

test('si el reintento con token nuevo vuelve a dar 401, se cierra sesión (como dice el comentario del interceptor)', async () => {
  const { interceptor, calls } = setup();
  const next = backend(() => httpError(401, { code: 'ACCESS_INVALID' }));
  await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/x'), next)));
  assert.equal(calls.logout, 1);
});

test('mantenimiento (503 MAINTENANCE_ACTIVE): abre la pantalla con el mensaje del backend y propaga el error', async () => {
  const { interceptor, calls } = setup();
  const next = backend(() => httpError(503, { code: 'MAINTENANCE_ACTIVE', message: 'Volvemos a las 10' }));
  await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/x'), next)));
  assert.deepEqual(calls.maintenance, [{ state: 'active', message: 'Volvemos a las 10' }]);
  assert.equal(calls.logout, 0);
});

test('TABLE_ASSIGNED_BY_TRAINER: el mensaje del backend sale en un aviso, una vez, y el error sigue (para revertir)', async () => {
  const { interceptor, calls } = setup();
  const next = backend(() => httpError(403, { code: 'TABLE_ASSIGNED_BY_TRAINER', message: 'Esta rutina te la asignó tu entrenador.' }));
  await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('PUT', 'https://api/api/tables'), next)));
  assert.equal(calls.toasts.length, 1);
  assert.equal(calls.toasts[0].message, 'Esta rutina te la asignó tu entrenador.');
});

test('otros errores (400, 403 sin código propio, 500) pasan tal cual, sin refrescar ni cerrar sesión', async () => {
  for (const status of [400, 403, 404, 500]) {
    const { interceptor, calls } = setup();
    const next = backend(() => httpError(status, { message: 'x' }));
    await assert.rejects(firstValueFrom(interceptor.intercept(new HttpRequest('GET', 'https://api/api/x'), next)));
    assert.deepEqual([calls.refresh, calls.logout, calls.toasts.length], [0, 0, 0], String(status));
  }
});

test('clasificación de AuthService coincide con los códigos que emite el backend', () => {
  // Terminales (validateAuth.js / auth-controller.js#refresh los marcan con requiresRelogin).
  for (const code of ['SESSION_REPLACED', 'REFRESH_INVALID', 'REFRESH_EXPIRED', 'PASSWORD_CHANGED']) {
    assert.equal(isTerminal(httpError(401, { code })), true, code);
  }
  assert.equal(isTerminal(httpError(401, { code: 'USER_NOT_FOUND', requiresRelogin: true })), true);
  // Recuperables con un refresco.
  for (const code of ['ACCESS_EXPIRED', 'ACCESS_INVALID']) assert.equal(isTerminal(httpError(401, { code })), false, code);
});
