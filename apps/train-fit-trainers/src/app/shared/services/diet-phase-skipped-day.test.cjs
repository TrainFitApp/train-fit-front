const test = require('node:test');
const assert = require('node:assert/strict');
const { of, throwError } = require('rxjs');
const { loadFromSource, angularCoreStub } = require('../../../../../../tests/support/ng-harness.cjs');

// Saltar un día en el plan de nutrición refresca la ficha por una señal: el
// calendario, las gráficas, la lista de la compra y la adherencia releen lo
// suyo sin volver a montar el tab entero. Aquí se prueba la señal y el aviso
// que escuchan (onDaySkipped).

// Signals mínimos con la semántica que importa aquí: `set` con otro valor
// vuelve a ejecutar los efectos vivos, y un efecto se ejecuta al crearse.
const liveEffects = new Set();
let injected = null;
const core = {
  ...angularCoreStub(),
  signal: (initial) => {
    let value = initial;
    const read = () => value;
    read.set = (next) => {
      if (Object.is(next, value)) return;
      value = next;
      [...liveEffects].forEach((run) => run());
    };
    read.asReadonly = () => read;
    return read;
  },
  effect: (fn) => {
    liveEffects.add(fn);
    fn();
    return { destroy: () => liveEffects.delete(fn) };
  },
  untracked: (fn) => fn(),
  inject: () => injected,
};

const { DietPhaseApiService, onDaySkipped } = loadFromSource(
  __filename,
  __dirname,
  {
    DietPhaseApiService: './diet-phase-api.service',
    onDaySkipped: './diet-phase-api.service',
  },
  { app: 'train-fit-trainers', requires: { '@angular/core': core } }
);

function serviceWith(post) {
  const posted = [];
  const api = new DietPhaseApiService({
    post: (url, body) => {
      posted.push({ url, body });
      return post();
    },
  });
  injected = api;
  return { api, posted };
}

// Escucha como lo hace un componente montado en la ficha de `clientId`.
function listen(clientId) {
  const heard = [];
  const ref = onDaySkipped(() => clientId, (date) => heard.push(date));
  return { heard, stop: () => ref.destroy() };
}

test.afterEach(() => liveEffects.clear());

test('saltar un día lo publica en la señal tras guardarlo', () => {
  const { api, posted } = serviceWith(() => of({ clientId: 'c1', date: '2026-10-08' }));
  assert.equal(api.skippedDay(), null);

  api.skipDay('c1', '2026-10-08').subscribe();

  assert.deepEqual(posted, [{ url: 'trainer/clients/c1/skipped-days', body: { date: '2026-10-08' } }]);
  assert.deepEqual(api.skippedDay(), { clientId: 'c1', date: '2026-10-08' });
});

test('si el servidor falla, no se publica nada', () => {
  const { api } = serviceWith(() => throwError(() => new Error('500')));

  api.skipDay('c1', '2026-10-08').subscribe({ error: () => undefined });

  assert.equal(api.skippedDay(), null);
});

test('avisa de cada salto del cliente que se mira, también si repite fecha', () => {
  const { api } = serviceWith(() => of({}));
  const { heard } = listen('c1');

  api.skipDay('c1', '2026-10-08').subscribe();
  api.skipDay('c1', '2026-10-08').subscribe();
  api.skipDay('c1', '2026-10-09').subscribe();

  assert.deepEqual(heard, ['2026-10-08', '2026-10-08', '2026-10-09']);
});

test('no avisa de saltos de otro cliente', () => {
  const { api } = serviceWith(() => of({}));
  const { heard } = listen('c1');

  api.skipDay('c2', '2026-10-08').subscribe();

  assert.deepEqual(heard, []);
});

// Un componente que se monta después de un salto (volver al tab de
// nutrición) ya pide los datos frescos al crearse: releerlos por el valor que
// conserva la señal sería una petición repetida.
test('quien empieza a escuchar después de un salto no lo recibe', () => {
  const { api } = serviceWith(() => of({}));
  api.skipDay('c1', '2026-10-08').subscribe();

  const { heard } = listen('c1');
  assert.deepEqual(heard, []);

  api.skipDay('c1', '2026-10-09').subscribe();
  assert.deepEqual(heard, ['2026-10-09']);
});

test('al destruirse deja de escuchar', () => {
  const { api } = serviceWith(() => of({}));
  const { heard, stop } = listen('c1');
  stop();

  api.skipDay('c1', '2026-10-08').subscribe();

  assert.deepEqual(heard, []);
});
