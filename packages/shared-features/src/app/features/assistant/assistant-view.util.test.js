const test = require('node:test');
const assert = require('node:assert/strict');

// Lógica de pantalla del asistente (assistant-view.util.ts): el humor de la
// mascota, el tono de la barra, la lista blanca de rutas de cada app y el
// total de la comida con lo elegido.

let util;

test.before(async () => {
  util = await import('./assistant-view.util.ts');
});

const ID = '0123456789abcdef01234567';

test('energyTone: llena, baja (20 % o menos) y vacía', () => {
  assert.equal(util.energyTone(0.9), 'full');
  assert.equal(util.energyTone(0.2), 'low');
  assert.equal(util.energyTone(0.01), 'low');
  assert.equal(util.energyTone(0), 'empty');
  assert.equal(util.energyTone(null), 'empty');
});

test('mascotMood: dormida apagada o sin energía; pensando manda; contenta al terminar; cansada con poca', () => {
  assert.equal(util.mascotMood({ available: false, level: 1 }), 'asleep');
  assert.equal(util.mascotMood({ available: true, level: 0 }), 'asleep');
  assert.equal(util.mascotMood({ available: true, level: 0.5, busy: true, celebrating: true }), 'thinking');
  assert.equal(util.mascotMood({ available: true, level: 0.5, celebrating: true }), 'happy');
  assert.equal(util.mascotMood({ available: true, level: 0.1 }), 'tired');
  assert.equal(util.mascotMood({ available: true, level: 0.8 }), 'idle');
});

test('routeFor (cliente): cada pantalla a su ruta; Dietas con su día', () => {
  assert.deepEqual(util.routeFor('client', { screen: 'training' }), { path: ['/tabs/summary'] });
  assert.deepEqual(util.routeFor('client', { screen: 'diets', params: { date: '2026-10-12' } }), {
    path: ['/tabs/diets'],
    state: { selectedDate: '2026-10-12' },
  });
  assert.deepEqual(util.routeFor('client', { screen: 'diets', params: { date: 'mañana' } }), { path: ['/tabs/diets'] });
  assert.deepEqual(util.routeFor('client', { screen: 'goals' }), { path: ['/tabs/diets/nutritional-objectives'] });
});

test('routeFor: lista blanca, nada fuera de ella ni de la otra app', () => {
  assert.equal(util.routeFor('client', { screen: 'admin' }), null);
  assert.equal(util.routeFor('client', { screen: 'clients' }), null, 'pantalla de trainers en la app cliente');
  assert.equal(util.routeFor('trainer', { screen: 'diets' }), null, 'pantalla del cliente en trainers');
  assert.equal(util.routeFor('trainer', { screen: 'client', params: { clientId: '../admin' } }), null, 'solo ids de verdad');
  assert.equal(util.routeFor('client', null), null);
});

test('routeFor (trainers): ficha del cliente con su pestaña y sugerencias de dieta con los macros', () => {
  assert.deepEqual(util.routeFor('trainer', { screen: 'review' }), { path: ['/tabs/review'] });
  assert.deepEqual(util.routeFor('trainer', { screen: 'client', params: { clientId: ID, name: 'Ana López', section: 'nutrition' } }), {
    path: ['/tabs/clients', ID],
    queryParams: { tab: 'nutrition', name: 'Ana López' },
  });
  assert.deepEqual(
    util.routeFor('trainer', { screen: 'diet_phase_picker', params: { clientId: ID, name: 'Eva', kcal: 2000, protein: 140, carbs: null, fat: 0 } }),
    { path: ['/tabs/diet-templates/for-phase', ID], queryParams: { name: 'Eva', kcal: 2000, protein: 140 } },
  );
});

test('targetFromQuery: sin kcal no hay objetivo; lo que falte, reparto 30/40/30', () => {
  assert.equal(util.targetFromQuery({}), null);
  assert.equal(util.targetFromQuery({ protein: '150' }), null);
  assert.deepEqual(util.targetFromQuery({ kcal: '2000', protein: '160', carbs: null, fat: undefined }), {
    kcal: 2000,
    protein: 160,
    carbs: 200,
    fat: 67,
  });
  assert.equal(util.targetFromQuery({ kcal: '-5' }), null);
});

test('shiftIsoDay: aritmética de calendario, también al cambiar de mes y de año', () => {
  assert.equal(util.shiftIsoDay('2026-10-31', 1), '2026-11-01');
  assert.equal(util.shiftIsoDay('2027-01-01', -1), '2026-12-31');
  assert.equal(util.shiftIsoDay('2026-03-29', 1), '2026-03-30', 'cambio de hora en Europa');
});

test('chosenFoodTotal: suma la opción elegida de cada alimento; fuera de rango, la primera', () => {
  const items = [
    {
      options: [
        { kcal: 700, protein: 14, carbs: 156, fat: 1.2 },
        { kcal: 720, protein: 16, carbs: 158, fat: 1.6 },
      ],
    },
    { options: [{ kcal: 165, protein: 31, carbs: 0, fat: 3.6 }] },
  ];
  assert.deepEqual(util.chosenFoodTotal(items), { kcal: 865, protein: 45, carbs: 156, fat: 4.8 });
  assert.deepEqual(util.chosenFoodTotal(items, [1, 0]), { kcal: 885, protein: 47, carbs: 158, fat: 5.2 });
  assert.deepEqual(util.chosenFoodTotal(items, [5, 9]), util.chosenFoodTotal(items));
  assert.deepEqual(util.chosenFoodTotal(null), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
});

test('chosenFoodTotal: con los gramos que dejó, a escala; los que no valen, los propuestos', () => {
  const items = [{ grams: 200, options: [{ kcal: 700, protein: 14, carbs: 156, fat: 1.2 }] }];
  assert.deepEqual(util.chosenFoodTotal(items, [], [100]), { kcal: 350, protein: 7, carbs: 78, fat: 0.6 });
  assert.deepEqual(util.chosenFoodTotal(items, [], [0]), util.chosenFoodTotal(items));
  assert.equal(util.validFoodGrams('150'), 150);
  assert.equal(util.validFoodGrams(5000), null);
});

test('viewFromUrl: pantalla por la ruta, día de Dietas y ficha abierta en trainers', () => {
  assert.deepEqual(util.viewFromUrl('client', '/tabs/diets', '2026-10-12'), { screen: 'diets', date: '2026-10-12' });
  assert.deepEqual(util.viewFromUrl('client', '/tabs/diets/nutritional-objectives'), { screen: 'goals' });
  assert.deepEqual(util.viewFromUrl('client', '/tabs/summary', '2026-10-12'), { screen: 'training' });
  assert.deepEqual(util.viewFromUrl('client', '/rare/page'), { screen: 'other' });
  assert.deepEqual(util.viewFromUrl('trainer', `/tabs/clients/${ID}?tab=nutrition`), { screen: 'client', clientId: ID });
  assert.deepEqual(util.viewFromUrl('trainer', '/tabs/clients'), { screen: 'clients' });
  assert.deepEqual(util.viewFromUrl('trainer', '/tabs/clients/not-an-id'), { screen: 'other' });
});
