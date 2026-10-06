const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Subject, of, throwError } = require('rxjs');

// Un día de dieta que todavía no está en base de datos se "estrena" con la
// primera escritura, y es esa misma petición la que lo crea. Si dos
// escrituras de la MISMA fecha salen a la vez (dos checkbox seguidos en el
// buscador de alimentos), la segunda tiene que ESPERAR a la primera y escribir
// sobre el día ya creado. Cuando no lo hacía, quedaban dos DietDay solapados
// en la misma fecha y uno de los dos era invisible para el cliente: la comida
// apuntada "desaparecía".
//
// El backend tiene un índice único {userId, date} como última red, pero quien
// decide si se manda una segunda creación es esta clase.

// Arnés común: compila el TypeScript real y lo carga sin arrancar Angular.
function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

// Lo único que se sustituye de Angular es toObservable, que necesita un
// contexto de inyección y aquí no se usa (nada de esta prueba lee el
// observable del día actual). El resto, incluidos los `signal` que guardan el
// estado de la carrera, es código real.
const { DietDayService } = loadFromSource(__filename, __dirname, {
  DietDayService: 'src/app/core/services/diet-day/diet-day.service',
});

const DATE = '2026-10-01';
const OTHER_DATE = '2026-10-02';
const dayOf = (date, meals = []) => ({ _id: `day-${date}`, date, meals });

function harness() {
  const calls = { createDietDay: [], createOnNewDay: [], addToMeal: [] };
  const api = {
    getDay: (date) => {
      calls.createDietDay.push(date);
      return of({ dietDay: dayOf(date) });
    },
    addCustomProductToDay: (...args) => {
      calls.createOnNewDay.push(args);
      return of(dayOf(args[0]));
    },
  };
  const customProducts = {
    createCustomProductAndAddToMeal: (mealId, customProduct) => {
      calls.addToMeal.push({ mealId, customProduct });
      return of({ ...customProduct, _id: 'cp-nuevo', mealId });
    },
  };
  const service = new DietDayService(api, customProducts, {}, {});
  return { service, api, customProducts, calls };
}

// --- la puerta --------------------------------------------------------------

test('sin ninguna creación en vuelo no hay nada que esperar', () => {
  const { service } = harness();
  assert.equal(service.isCreatingDietDay(), false);
  assert.equal(service.isCreatingDietDay(DATE), false);
  assert.equal(service.pendingDietDayCreation(DATE), null);
});

test('la puerta se abre para la fecha que se está creando, y solo para ella', () => {
  const { service } = harness();
  service.trackDietDayCreation(DATE, new Subject());
  assert.equal(service.isCreatingDietDay(DATE), true);
  assert.equal(service.isCreatingDietDay(OTHER_DATE), false, 'otra fecha no debe quedar bloqueada');
  assert.equal(service.isCreatingDietDay(), true, 'sin fecha responde por cualquiera');
  assert.ok(service.pendingDietDayCreation(DATE));
  assert.equal(service.pendingDietDayCreation(OTHER_DATE), null);
});

test('la puerta se cierra al terminar la creación', () => {
  const { service } = harness();
  const creation = new Subject();
  service.trackDietDayCreation(DATE, creation);
  creation.next(dayOf(DATE));
  creation.complete();
  assert.equal(service.isCreatingDietDay(DATE), false);
  assert.equal(service.pendingDietDayCreation(DATE), null);
});

test('la puerta se cierra también cuando la creación falla', () => {
  // Si no, un error de red dejaría todos los checkbox del buscador
  // deshabilitados para siempre.
  const { service } = harness();
  const creation = new Subject();
  service.trackDietDayCreation(DATE, creation);
  creation.error(new Error('sin red'));
  assert.equal(service.isCreatingDietDay(DATE), false);
});

test('la puerta se cierra aunque quien la pidió se desuscriba antes', () => {
  // Un checkbox cancelado a media petición: trackDietDayCreation se suscribe
  // por su cuenta justo para que el día quede publicado y la puerta se abra.
  const { service } = harness();
  const creation = new Subject();
  const tracked = service.trackDietDayCreation(DATE, creation);
  const subscription = tracked.subscribe();
  subscription.unsubscribe();
  assert.equal(service.isCreatingDietDay(DATE), true, 'sigue en vuelo, nadie la ha cancelado');
  creation.next(dayOf(DATE));
  creation.complete();
  assert.equal(service.isCreatingDietDay(DATE), false);
});

test('quien llega tarde recibe el día ya creado sin relanzar la petición', () => {
  // shareReplay(1) con refCount:false: el segundo checkbox no dispara otra
  // creación, se encuentra el día hecho.
  const { service } = harness();
  let creations = 0;
  const creation$ = new Subject();
  const tracked = service.trackDietDayCreation(DATE, creation$.pipe());
  creation$.subscribe(() => creations++);
  creation$.next(dayOf(DATE));
  creation$.complete();

  const received = [];
  tracked.subscribe((day) => received.push(day));
  assert.equal(received.length, 1, 'el que llega tarde recibe el día replicado');
  assert.equal(received[0]._id, `day-${DATE}`);
});

// --- createDietDay ----------------------------------------------------------

test('createDietDay no manda una segunda creación para la misma fecha', () => {
  const { service, calls, api } = harness();
  // La creación se deja EN VUELO para poder pedir la segunda mientras dura:
  // con un observable que se resuelve al instante no habría carrera que probar.
  const creation = new Subject();
  api.getDay = (date) => {
    calls.createDietDay.push(date);
    return creation;
  };

  service.createDietDay({ date: DATE, meals: [] }).subscribe();
  service.createDietDay({ date: DATE, meals: [] }).subscribe();

  assert.deepEqual(calls.createDietDay, [DATE], 'se mandaron dos creaciones de la misma fecha');

  // Al resolverse, las dos reciben el MISMO día.
  const received = [];
  service.createDietDay({ date: DATE, meals: [] }).subscribe((day) => received.push(day));
  creation.next({ dietDay: dayOf(DATE) });
  creation.complete();
  assert.deepEqual(calls.createDietDay, [DATE]);
  assert.equal(received.length, 1);
  assert.equal(received[0]._id, `day-${DATE}`);
});

test('createDietDay vuelve a mandar la creación una vez cerrada la anterior', () => {
  // La puerta es por petición en vuelo, no un bloqueo permanente: tras
  // terminar, pedir el día otra vez tiene que volver a llamar al backend (que
  // es idempotente y devuelve el que ya hay).
  const { service, calls, api } = harness();
  const first = new Subject();
  api.getDay = (date) => {
    calls.createDietDay.push(date);
    return calls.createDietDay.length === 1 ? first : of({ dietDay: dayOf(date) });
  };
  service.createDietDay({ date: DATE, meals: [] }).subscribe();
  first.next({ dietDay: dayOf(DATE) });
  first.complete();
  service.createDietDay({ date: DATE, meals: [] }).subscribe();
  assert.deepEqual(calls.createDietDay, [DATE, DATE]);
});

test('createDietDay sí manda la creación de OTRA fecha en paralelo', () => {
  const { service, calls, api } = harness();
  api.getDay = (date) => {
    calls.createDietDay.push(date);
    return new Subject();
  };
  service.createDietDay({ date: DATE, meals: [] }).subscribe();
  service.createDietDay({ date: OTHER_DATE, meals: [] }).subscribe();
  assert.deepEqual(calls.createDietDay, [DATE, OTHER_DATE]);
});

// --- createCustomProductOnDietDayMeal ---------------------------------------

const meal = (name, id) => ({ _id: id, name, customProducts: [] });

test('con el día ya en base de datos se escribe directo, sin crear nada', () => {
  const { service, calls } = harness();
  const dietDay = dayOf(DATE, [meal('Comida', 'meal-1')]);
  service
    .createCustomProductOnDietDayMeal({ quantity: 100 }, dietDay.meals[0], dietDay)
    .subscribe();
  assert.equal(calls.addToMeal.length, 1);
  assert.equal(calls.addToMeal[0].mealId, 'meal-1');
  assert.equal(calls.createOnNewDay.length, 0);
  assert.equal(calls.createDietDay.length, 0);
});

test('sin día, la primera escritura lo estrena en UNA sola llamada', () => {
  // No es "crear el día" + "añadir el producto": son dos peticiones y entre
  // ellas cabe otra escritura. El backend asegura el día y añade el alimento
  // en la misma.
  const { service, calls } = harness();
  const dietDay = { date: DATE, meals: [meal('Desayuno', undefined), meal('Comida', undefined)] };
  service
    .createCustomProductOnDietDayMeal({ quantity: 100 }, dietDay.meals[1], dietDay)
    .subscribe();
  assert.equal(calls.createOnNewDay.length, 1);
  const [date, indexMeal] = calls.createOnNewDay[0];
  assert.equal(indexMeal, 1, 'la comida se identifica por su posición en el día');
  assert.equal(date, DATE);
});

test('la segunda escritura de la misma fecha espera y escribe sobre el día creado', () => {
  const { service, api, calls } = harness();
  const creation = new Subject();
  api.addCustomProductToDay = (...args) => {
    calls.createOnNewDay.push(args);
    return creation;
  };
  const dietDay = { date: DATE, meals: [meal('Comida', undefined)] };

  service.createCustomProductOnDietDayMeal({ quantity: 100 }, dietDay.meals[0], dietDay).subscribe();
  // Segundo checkbox mientras la primera sigue en vuelo.
  const results = [];
  service
    .createCustomProductOnDietDayMeal({ quantity: 50 }, dietDay.meals[0], dietDay)
    .subscribe((result) => results.push(result));

  assert.equal(calls.createOnNewDay.length, 1, 'la segunda no debe lanzar otra creación de día');
  assert.equal(calls.addToMeal.length, 0, 'todavía no hay día sobre el que escribir');

  // Llega el día creado por la primera: la segunda escribe ya sobre su comida.
  creation.next(dayOf(DATE, [meal('Comida', 'meal-real')]));
  creation.complete();

  assert.equal(calls.addToMeal.length, 1);
  assert.equal(calls.addToMeal[0].mealId, 'meal-real');
  assert.equal(calls.addToMeal[0].customProduct.quantity, 50);
  // Devuelve el DÍA con el producto dentro, no el producto suelto: el dietDay
  // con el que entró la llamada es el de ANTES de crearse y publicarlo
  // desharía el día recién creado.
  assert.equal(results.length, 1);
  assert.ok(Array.isArray(results[0].meals), 'tenía que devolver el día, no el producto');
});

test('si la creación en vuelo no deja día, la segunda reintenta por la vía de una sola llamada', () => {
  // Es idempotente en el backend, así que el reintento no puede duplicar la
  // fecha.
  const { service, api, calls } = harness();
  const creation = new Subject();
  let firstCall = true;
  api.addCustomProductToDay = (...args) => {
    calls.createOnNewDay.push(args);
    if (firstCall) {
      firstCall = false;
      return creation;
    }
    return of(dayOf(DATE));
  };
  const dietDay = { date: DATE, meals: [meal('Comida', undefined)] };
  service.createCustomProductOnDietDayMeal({ quantity: 100 }, dietDay.meals[0], dietDay).subscribe();
  service.createCustomProductOnDietDayMeal({ quantity: 50 }, dietDay.meals[0], dietDay).subscribe();

  // El día llega sin la comida esperada (meals vacío).
  creation.next({ _id: 'day-raro', date: DATE, meals: [] });
  creation.complete();

  assert.equal(calls.createOnNewDay.length, 2, 'la segunda tenía que reintentar');
  assert.equal(calls.addToMeal.length, 0);
});

test('una comida que no está en el día no rompe la publicación del resultado', () => {
  const { service, calls } = harness();
  const dietDay = dayOf(DATE, [meal('Comida', 'meal-1')]);
  const results = [];
  service
    .createCustomProductOnDietDayMeal({ quantity: 100 }, meal('Cena', 'meal-fantasma'), dietDay)
    .subscribe((result) => results.push(result));
  assert.equal(calls.addToMeal.length, 1, 'se escribe donde dice el id de la comida');
  assert.equal(results.length, 1);
});

// --- createCustomProduct (envoltorio con loading) ----------------------------

test('createCustomProduct apaga el loading al terminar bien', () => {
  const { service } = harness();
  const loading = { value: false };
  const utilService = { setLoading: false };
  const svc = new DietDayService(
    { createDietDay: () => of(dayOf(DATE)) },
    { createCustomProductAndAddToMeal: () => of({ _id: 'cp' }) },
    utilService,
    {}
  );
  const dietDay = dayOf(DATE, [meal('Comida', 'meal-1')]);
  svc.createCustomProduct(loading, dietDay, { quantity: 100 }, dietDay.meals[0]).subscribe();
  assert.equal(loading.value, false);
});

test('createCustomProduct apaga el loading también cuando falla', () => {
  // Si se quedara encendido, el loading global deshabilita los checkbox de
  // TODAS las tarjetas y el buscador se queda congelado.
  const loading = { value: false };
  const svc = new DietDayService(
    {},
    { createCustomProductAndAddToMeal: () => throwError(() => new Error('sin red')) },
    {},
    {}
  );
  const dietDay = dayOf(DATE, [meal('Comida', 'meal-1')]);
  svc
    .createCustomProduct(loading, dietDay, { quantity: 100 }, dietDay.meals[0])
    .subscribe({ error: () => undefined });
  assert.equal(loading.value, false);
});

test('createCustomProduct publica el día con el producto dentro', () => {
  const created = { _id: 'cp-1', quantity: 100, product: { _id: 'p1' } };
  const svc = new DietDayService(
    {},
    { createCustomProductAndAddToMeal: () => of(created) },
    {},
    {}
  );
  const dietDay = dayOf(DATE, [meal('Comida', 'meal-1')]);
  svc.createCustomProduct({ value: false }, dietDay, created, dietDay.meals[0]).subscribe();
  assert.deepEqual(svc.currentDietDay.meals[0].customProducts, [created]);
});

test('createCustomProduct publica el día también para una adición rápida (sin product)', () => {
  // Una adición rápida es un CustomProduct SIN `product`: si el servicio
  // discriminara por ese campo, lo tomaría por un DietDay y publicaría el
  // producto suelto como día actual.
  const created = { _id: 'cp-1', quantity: 100, quickAdd: true, name: 'Cena fuera' };
  const svc = new DietDayService(
    {},
    { createCustomProductAndAddToMeal: () => of(created) },
    {},
    {}
  );
  const dietDay = dayOf(DATE, [meal('Comida', 'meal-1')]);
  svc.createCustomProduct({ value: false }, dietDay, created, dietDay.meals[0]).subscribe();
  assert.ok(Array.isArray(svc.currentDietDay?.meals), 'publicó el producto como si fuera el día');
  assert.deepEqual(svc.currentDietDay.meals[0].customProducts, [created]);
});
