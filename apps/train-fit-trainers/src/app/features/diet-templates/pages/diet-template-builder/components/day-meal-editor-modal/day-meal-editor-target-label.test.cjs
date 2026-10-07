const test = require('node:test');
const assert = require('node:assert/strict');
const { loadFromSource, angularCoreStub } = require('../../../../../../../../../../tests/support/ng-harness.cjs');

// Destino de lo que se añade desde el buscador al editar una comida de la
// dieta: «Menú A · Desayuno», lo mismo que la cabecera del editor. Lo usan
// el «Añadido a …» de las cards y los botones de añadir.

let currentLang = 'es';
const translate = {
  get currentLang() {
    return currentLang;
  },
  instant: (key) => key,
};
const { DayMealEditorModalComponent } = loadFromSource(
  __filename,
  __dirname,
  { DayMealEditorModalComponent: './day-meal-editor-modal.component' },
  {
    app: 'train-fit-trainers',
    requires: { '@angular/core': { ...angularCoreStub(), inject: () => translate } },
  }
);

function editor(menuName, slot) {
  const component = new DayMealEditorModalComponent();
  component.menuName = menuName;
  component.meal = { slot, alternatives: [] };
  return component;
}

test('menú y comida, como la cabecera', () => {
  currentLang = 'es';
  assert.equal(editor('Menú A', 'Desayuno').targetLabel, 'Menú A · Desayuno');
});

test('la comida se traduce como en la cabecera (translateDb)', () => {
  currentLang = 'en';
  assert.equal(editor('Menu A', 'Desayuno').targetLabel, 'Menu A · Breakfast');
  currentLang = 'es';
});

test('sin nombre de menú, solo la comida', () => {
  assert.equal(editor('', 'Cena').targetLabel, 'Cena');
});
