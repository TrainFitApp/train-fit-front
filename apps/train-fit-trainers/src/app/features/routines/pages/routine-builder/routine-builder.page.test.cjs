const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { of, Subject } = require('rxjs');

// Builder de plantillas de entrenamiento: se construye como un entrenamiento
// del Planificador y lo que se construye es exactamente lo que se guarda.
// Sin TestBed: el componente con dobles de sus colaboradores
// (tests/support/ng-harness.cjs).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

// La edición en celda enfoca el input con document.getElementById.
global.document ??= { getElementById: () => null, activeElement: null };

const translate = { instant: (key, params) => (params ? `${key} ${JSON.stringify(params)}` : key), currentLang: 'es' };
const location = { replaceState: (url) => (location.lastUrl = url) };

const angularCore = (() => {
  const decorator = () => (target) => target;
  const prop = () => () => undefined;
  return {
    Component: decorator,
    Injectable: decorator,
    Input: prop,
    Output: prop,
    ViewChild: prop,
    EventEmitter: class {
      emit() {}
    },
    DestroyRef: class {},
    ElementRef: class {},
    inject: (token) => {
      if (token && token.name === 'TranslateService') return translate;
      if (token && token.name === 'Location') return location;
      return {};
    },
  };
})();

const SEARCH_EXERCISES = 'src/app/shared/components/search-exercises/search-exercises.page';
const MANAGE_SET = 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
const INTENSITY_SHEET = 'src/app/features/tables/components/summary/components/mesocycle/components/intensity-sheet/intensity-sheet.component';
const { RoutineBuilderPage } = loadFromSource(
  __filename,
  __dirname,
  { RoutineBuilderPage: 'src/app/features/routines/pages/routine-builder/routine-builder.page' },
  {
    app: 'train-fit-trainers',
    external: ['@angular/*', '@ionic/*', 'rxjs', 'rxjs/*', '@ngx-translate/*', '@capacitor/*', SEARCH_EXERCISES, MANAGE_SET, INTENSITY_SHEET],
    requires: {
      '@angular/core': angularCore,
      '@angular/core/rxjs-interop': { takeUntilDestroyed: () => (source) => source },
      '@angular/common': { Location: class Location {} },
      '@ngx-translate/core': { TranslateService: class TranslateService {} },
      '@ionic/angular': { ModalController: class {} },
      [SEARCH_EXERCISES]: { SearchExercisesPage: class SearchExercisesPage {} },
      [MANAGE_SET]: { ManageSetComponent: class ManageSetComponent {} },
      [INTENSITY_SHEET]: { IntensitySheetComponent: class IntensitySheetComponent {} },
    },
  }
);

const bench = { _id: 'ex-bench', name: 'Press banca', equipment: ['Barra'], muscles: [{ muscle: 'chest', role: 'primary' }] };
const row = { _id: 'ex-row', name: 'Remo', equipment: ['Mancuernas'], muscles: [] };
const plank = { _id: 'ex-plank', name: 'Plancha', isIsometric: true, equipment: [], muscles: [] };

const set = (reps, extra = {}) => ({
  expectedReps: reps,
  expectedRir: [2],
  restSeconds: 120,
  drop: false,
  restPause: null,
  expectedTime: '',
  expectedDistance: null,
  ...extra,
});

function storedTemplate() {
  return {
    _id: 'tpl-1',
    name: 'Empuje',
    notes: 'Calienta 10 min',
    description: '',
    level: 'avanzado',
    tags: ['fuerza'],
    equipment: ['Barra'],
    blocks: [
      {
        name: 'A',
        type: 'superset',
        order: 0,
        rounds: 3,
        restBetweenExercises: 0,
        restBetweenRounds: 90,
        instructions: '',
        exercises: [{ exercise: bench, order: 0, notes: 'Pausa en el pecho', sets: [set([12]), set([10]), set([8], { drop: true })] }],
      },
      {
        ungrouped: true,
        name: '',
        type: 'straight',
        order: 1,
        exercises: [{ exercise: 'ex-retirado', order: 0, notes: '', sets: [set([10])] }],
      },
    ],
  };
}

function makePage({ id = 'tpl-1', templates = [storedTemplate()], panelResult = null, alertValue } = {}) {
  const calls = { update: [], create: [], toasts: [], panels: [], alerts: [], nested: [] };
  const params = new Subject();
  const api = {
    list: () => of(templates),
    update: (templateId, payload) => {
      calls.update.push({ templateId, payload });
      return of({ ...payload, _id: templateId });
    },
    create: (payload) => {
      calls.create.push(payload);
      return of({ ...payload, _id: 'tpl-new' });
    },
  };
  const ionic = {
    showModal: async () => ({ data: null }),
    showNestedModal: async (options, origin, placement) => {
      calls.nested.push({ options, origin, placement });
      return { data: panelResult };
    },
    showSidePanel: async (options) => {
      calls.panels.push(options);
      return { data: panelResult };
    },
    isSidePanelOpening: () => false,
    findSidePanel: () => undefined,
    showAlert: async (options) => {
      calls.alerts.push(options);
      const confirm = (options.buttons || []).find((b) => b.role !== 'cancel' && b.handler);
      if (alertValue !== undefined && confirm) confirm.handler(alertValue);
    },
    showToast: (toast) => calls.toasts.push(toast),
  };
  const route = { paramMap: params };
  const page = new RoutineBuilderPage(route, api, ionic);
  page.ngOnInit();
  params.next({ get: () => id });
  return { page, calls };
}

test('abrir y guardar sin tocar nada no cambia la plantilla', () => {
  const { page, calls } = makePage();
  assert.equal(page.state, 'loaded');
  assert.equal(page.blocks.length, 1);
  assert.equal(page.ungrouped.length, 1, 'el grupo "Sin agrupar" no es un bloque');
  assert.equal(page.isDirty, false);

  page.save();
  assert.equal(calls.update.length, 0, 'sin cambios no se manda nada');

  page.name = 'Empuje pesado';
  page.save();
  const [{ payload }] = calls.update;
  const [block, loose] = payload.blocks;
  assert.equal(block.rounds, 3, 'rondas y descansos de bloque se conservan aunque no se editen');
  assert.equal(block.exercises[0].exercise, 'ex-bench', 'la ficha se manda como id');
  assert.deepEqual(block.exercises[0].sets.map((s) => s.expectedReps), [[12], [10], [8]]);
  assert.deepEqual(block.exercises[0].sets.map((s) => s.drop), [false, false, true]);
  assert.equal(loose.ungrouped, true);
  assert.equal(loose.exercises[0].exercise, 'ex-retirado', 'un ejercicio que ya no está en el catálogo se conserva');
  assert.equal('level' in payload, false, 'el nivel ya no se pide');
  assert.deepEqual(payload.equipment, ['Barra'], 'el material sale de los ejercicios');
  assert.equal(page.isDirty, false);
});

// El buscador se abre en panel lateral; sus props son lo que usaría.
async function openSearch(page, calls) {
  await page.addExercises();
  return calls.panels.at(-1).componentProps;
}

test('crear: el checkbox del buscador añade sin series y sin bloque, como en el Planificador', async () => {
  const { page, calls } = makePage({ id: 'new' });
  assert.equal(page.isNew, true);
  assert.equal(page.isDirty, false, 'salir sin escribir nada no pregunta');

  page.save();
  assert.equal(page.nameError, true, 'sin nombre no se guarda y se avisa');

  const search = await openSearch(page, calls);
  assert.equal(search.pickerMode, true);
  search.pickerToggle(bench);
  search.pickerToggle(plank);
  assert.equal(page.blocks.length, 0);
  assert.equal(page.ungrouped.length, 2);
  assert.deepEqual(page.ungrouped.map((ex) => ex.sets.length), [0, 0], 'sin pauta inventada: "Añadir series"');
  assert.equal(search.pickerIsAdded(bench), true, 'la tarjeta sale marcada');
  search.pickerToggle(plank);
  assert.equal(search.pickerIsAdded(plank), false, 'desmarcar lo quita');
  search.pickerToggle(plank);

  page.name = 'Torso';
  page.save();
  assert.equal(calls.create.length, 1);
  assert.equal(calls.create[0].blocks[0].ungrouped, true);
  assert.equal(page.templateId, 'tpl-new');
  assert.equal(location.lastUrl, '/tabs/routines/tpl-new');
});

test('la tarjeta del buscador abre "Configurar ejercicio" encima; Guardar lo añade con sus series', async () => {
  const newSets = [{ repsMin: 5, repsMax: 5, rirMin: 2, rirMax: 2, time: '', distance: null, restSeconds: 180, drop: false, restPause: null }];
  const { page, calls } = makePage({ panelResult: { sets: newSets, notes: 'Codos pegados' } });
  const search = await openSearch(page, calls);
  const origin = { id: 'search-panel' };
  assert.equal(await search.pickerConfigure(row, origin), true, 'guardado: el buscador se cierra');
  const [nested] = calls.nested;
  assert.equal(nested.origin, origin);
  assert.deepEqual(nested.placement, { overParent: true });
  assert.equal(nested.options.componentProps.exerciseName, 'Remo');
  const added = page.ungrouped[1];
  assert.deepEqual(added.sets, newSets);
  assert.equal(added.notes, 'Codos pegados');
});

test('la tarjeta de un ejercicio que ya está abre el suyo; cancelar no añade nada', async () => {
  const { page, calls } = makePage({ panelResult: null });
  const search = await openSearch(page, calls);
  assert.equal(await search.pickerConfigure(bench, {}), false);
  assert.equal(calls.nested[0].options.componentProps.sets.length, 3, 'abre el press banca que ya tiene series');
  assert.equal(page.exerciseCount, 2, 'no se duplica');
});

test('tabla de series: edición en celda como el Planificador', () => {
  const { page, calls } = makePage();
  const ex = page.blocks[0].exercises[0];
  const stop = { stopPropagation() {} };

  page.startEdit(ex, 0, 'reps', stop);
  page.editMin = '6';
  page.editMax = '8';
  page.commitEdit();
  assert.deepEqual([ex.sets[0].repsMin, ex.sets[0].repsMax], [6, 8]);

  page.startEdit(ex, 1, 'reps', stop);
  page.editMin = '10';
  page.editMax = '8';
  page.commitEdit();
  assert.equal(calls.toasts.at(-1).message, 'TABLES.RANGE_ERROR', 'mínimo mayor que máximo no se guarda');
  assert.equal(ex.sets[1].repsMin, 10);

  page.startEdit(ex, 1, 'rest', stop);
  page.editValue = '150';
  page.commitEdit();
  assert.equal(ex.sets[1].restSeconds, 150);

  page.quickAddSet(ex);
  assert.equal(ex.sets.length, 4, '"+ Añadir serie" copia la última');
  assert.equal(ex.sets[3].drop, true);
});

test('mover a bloque y quitar ejercicio, como el Planificador', async () => {
  const { page } = makePage({ alertValue: '' });
  const ex = page.blocks[0].exercises[0];
  await page.moveToBlock(ex);
  assert.equal(page.blocks[0].exercises.length, 0);
  assert.ok(page.ungrouped.includes(ex), 'a "Sin agrupar"');

  await page.confirmRemoveExercise(ex);
  assert.equal(page.ungrouped.includes(ex), false);
});

test('borrar un bloque deja sus ejercicios sin agrupar', async () => {
  const { page } = makePage({ panelResult: { action: 'delete' }, alertValue: true });
  const [block] = page.blocks;
  const [ex] = block.exercises;
  await page.editBlock(block);
  assert.equal(page.blocks.length, 0);
  assert.ok(page.ungrouped.includes(ex));
});

test('resumen de la sesión', () => {
  const { page } = makePage();
  assert.equal(page.exerciseCount, 2);
  assert.equal(page.totalSets, 4);
  assert.ok(page.estimatedMinutes > 0);
  assert.deepEqual(page.equipment, ['Barra']);
});

test('plegar y desplegar series: solo es vista, no cuenta como cambio', () => {
  const { page } = makePage();
  const [benchEx] = page.blocks[0].exercises;
  const [looseEx] = page.ungrouped;

  page.toggleSets(benchEx);
  assert.equal(page.isCollapsed(benchEx), true);
  assert.equal(page.isDirty, false);
  assert.deepEqual(page.overview(benchEx).reps, '8 - 12');
  assert.equal(page.overview(benchEx).drop, true);

  assert.equal(page.canToggleAll, true);
  page.toggleAllSets();
  assert.equal(page.allCollapsed, true, 'con uno plegado, "Plegar todo" pliega el resto');
  page.toggleAllSets();
  assert.equal(page.isCollapsed(benchEx) || page.isCollapsed(looseEx), false);
});

test('desmarcar en el buscador un ejercicio ya pautado pide confirmación', async () => {
  const cancel = makePage();
  const search = await openSearch(cancel.page, cancel.calls);
  await search.pickerToggle(bench);
  assert.equal(cancel.calls.alerts.length, 1, 'tiene 3 series: pregunta');
  assert.equal(search.pickerIsAdded(bench), true, 'sin confirmar sigue en la plantilla');

  const confirm = makePage({ alertValue: true });
  const confirmSearch = await openSearch(confirm.page, confirm.calls);
  await confirmSearch.pickerToggle(bench);
  assert.equal(confirmSearch.pickerIsAdded(bench), false);
});
