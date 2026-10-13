const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadFromSource } = require('../../../../../../tests/support/ng-harness.cjs');

// La lista de la compra se calcula del plan de dieta que pauta el profesional:
// sin un profesional que lleve la nutrición no hay nada que comprar, así que
// Coach no enseña su tarjeta (ni con un profesional que solo lleve el
// entreno). El botón de la cabecera de Dietas sigue la misma regla.

const { CoachPage } = loadFromSource(
  __filename,
  __dirname,
  { CoachPage: 'src/app/features/coach/coach.page' },
  {
    requires: {
      '@angular/router': { Router: class {} },
      '@angular/animations': Object.fromEntries(
        ['animate', 'group', 'query', 'style', 'transition', 'trigger'].map((key) => [key, () => ({})])
      ),
    },
  }
);

function page(hasNutritionCoach) {
  const component = Object.create(CoachPage.prototype);
  component.coachService = { hasNutritionCoach: () => hasNutritionCoach };
  return component;
}

test('la lista de la compra solo sale con un profesional que lleve la nutrición', () => {
  assert.equal(page(true).showShoppingList, true);
  assert.equal(page(false).showShoppingList, false);
});

test('la tarjeta de la lista de la compra de Coach depende de esa regla', () => {
  const html = fs.readFileSync(path.join(__dirname, 'coach.page.html'), 'utf8');
  const card = html.match(/<button[^>]*\(click\)="goToShoppingList\(\)"[^>]*>/);
  assert.ok(card, 'Coach ya no tiene la tarjeta de la lista de la compra: borra este test o ajusta el selector');
  assert.match(card[0], /\*ngIf="showShoppingList"/);
});
