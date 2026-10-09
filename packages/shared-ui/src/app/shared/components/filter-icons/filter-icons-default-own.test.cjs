const test = require('node:test');
const assert = require('node:assert/strict');
const { Subject } = require('rxjs');
const { loadFromSource, angularCoreStub } = require('../../../../../../../tests/support/ng-harness.cjs');

// defaultOwn (Biblioteca › Alimentos de entrenadores): los chips arrancan, y
// vuelven al cambiar de Productos a Recetas, con «Añadidos por mí» marcado,
// igual que la búsqueda del padre. Sin él, «Todos», como siempre.

class EventEmitter extends Subject {
  emit(value) {
    this.next(value);
  }
}

const { FilterIconsComponent } = loadFromSource(
  __filename,
  __dirname,
  { FilterIconsComponent: './filter-icons.component' },
  { requires: { '@angular/core': { ...angularCoreStub(), EventEmitter } } }
);

function build(defaultOwn) {
  const chips = new FilterIconsComponent({}, {}, { instant: (key) => key });
  chips.defaultOwn = defaultOwn;
  const emitted = [];
  chips.filterSelection.subscribe((group) => emitted.push(group));
  chips.ngOnInit();
  return { chips, emitted };
}

const modeChange = (previousValue, currentValue) => ({
  currentMode: { previousValue, currentValue, firstChange: false },
});

test('con defaultOwn arranca en «Añadidos por mí» sin lanzar otra búsqueda', () => {
  const { chips, emitted } = build(true);
  assert.equal(chips.ownFilter, true);
  assert.equal(chips.isAllSelected(), false);
  assert.equal(chips.filterDescription, 'FILTER_DESC.PRODUCT_ADDED_BY_ME');
  assert.deepEqual(emitted, [], 'el padre ya busca con ese filtro al arrancar');
});

test('con defaultOwn, cambiar de pestaña vuelve a «Añadidos por mí» aunque se hubiera elegido otro', () => {
  const { chips } = build(true);
  chips.selectAllFilter();
  chips.addFilter('fav');
  chips.currentMode = 'recipes';
  chips.ngOnChanges(modeChange('products', 'recipes'));
  assert.equal(chips.ownFilter, true);
  assert.equal(chips.favFilter, false);
  assert.equal(chips.filterDescription, 'FILTER_DESC.RECIPE_ADDED_BY_ME');
});

test('sin defaultOwn todo sigue igual: arranca y vuelve a «Todos»', () => {
  const { chips } = build(false);
  assert.equal(chips.isAllSelected(), true);
  chips.addFilter('own');
  chips.currentMode = 'recipes';
  chips.ngOnChanges(modeChange('products', 'recipes'));
  assert.equal(chips.isAllSelected(), true);
});
