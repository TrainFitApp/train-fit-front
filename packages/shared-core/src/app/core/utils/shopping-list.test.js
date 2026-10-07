const test = require("node:test");
const assert = require("node:assert/strict");

// Espejo de train-fit-back/components/dietDays/shopping-list-service.test.js
// (aggregateShopping): la app recalcula la lista al cambiar el reparto y
// tiene que dar lo mismo que el servidor con ese reparto.

let util;

test.before(async () => {
  util = await import("./shopping-list.util.ts");
});

const pollo = (quantity) => ({ key: "id:p1", name: "Pollo", quantity });
const PAVO = { key: "id:p3", name: "Pavo", quantity: 120 };
const ARROZ = { key: "id:p2", name: "Arroz", quantity: 80 };

function segments() {
  return [
    {
      id: "A",
      name: "Plan A",
      from: "2026-09-28",
      to: "2026-10-04",
      days: 7,
      menus: [
        {
          name: "M1",
          chosenDays: 0,
          defaultDays: 4,
          meals: [
            { slot: "Comida", alternatives: [{ label: "Pollo", items: [pollo(150)] }, { label: "Pavo", items: [PAVO] }] },
            { slot: "Cena", alternatives: [{ label: "", items: [pollo(100)] }] },
          ],
        },
        { name: "M2", chosenDays: 0, defaultDays: 3, meals: [{ slot: "Comida", alternatives: [{ label: "", items: [ARROZ] }] }] },
      ],
    },
  ];
}

test("aggregateShopping", async (t) => {
  await t.test("sin reparto usa el de por defecto y la 1ª alternativa", () => {
    assert.deepEqual(util.aggregateShopping(segments()), [
      { name: "Pollo", quantity: 1000, dayCount: 4 },
      { name: "Arroz", quantity: 240, dayCount: 3 },
    ]);
  });

  await t.test("aplica los días elegidos por menú y la alternativa de cada comida", () => {
    const items = util.aggregateShopping(segments(), {
      A: { menuDays: { M1: 5, M2: 2 }, alternatives: { "M1|Comida": 1 } },
    });
    assert.deepEqual(items, [
      { name: "Pavo", quantity: 600, dayCount: 5 },
      { name: "Pollo", quantity: 500, dayCount: 5 },
      { name: "Arroz", quantity: 160, dayCount: 2 },
    ]);
  });

  await t.test("el doble de días, el doble de compra", () => {
    const week = util.aggregateShopping(segments(), { A: { menuDays: { M1: 7, M2: 0 }, alternatives: {} } });
    const twoWeeks = util.aggregateShopping(segments(), { A: { menuDays: { M1: 14, M2: 0 }, alternatives: {} } });
    assert.equal(twoWeeks[0].quantity, week[0].quantity * 2);
  });
});

test("defaultShoppingSelection y unassignedDays", async (t) => {
  await t.test("arranca con defaultDays y sin días por repartir", () => {
    const selection = util.defaultShoppingSelection(segments());
    assert.deepEqual(selection.A.menuDays, { M1: 4, M2: 3 });
    assert.equal(util.unassignedDays(segments()[0], selection), 0);
  });

  await t.test("cuenta los días que quedan sin menú", () => {
    assert.equal(util.unassignedDays(segments()[0], { A: { menuDays: { M1: 2, M2: 1 }, alternatives: {} } }), 4);
  });
});

test("aggregateShoppingView", async (t) => {
  await t.test("sin filtro o con «Todos» es la lista entera", () => {
    const selection = util.defaultShoppingSelection(segments());
    const all = util.aggregateShopping(segments(), selection);
    assert.deepEqual(util.aggregateShoppingView(segments(), selection, {}), all);
    assert.deepEqual(util.aggregateShoppingView(segments(), selection, { A: util.ALL_SHOPPING_MENUS }), all);
  });

  await t.test("con un menú elegido solo cuenta ese menú y sus días", () => {
    const selection = util.defaultShoppingSelection(segments());
    assert.deepEqual(util.aggregateShoppingView(segments(), selection, { A: "M2" }), [
      { name: "Arroz", quantity: 240, dayCount: 3 },
    ]);
  });

  await t.test("respeta los días y la alternativa elegidos de ese menú", () => {
    const selection = { A: { menuDays: { M1: 2, M2: 5 }, alternatives: { "M1|Comida": 1 } } };
    assert.deepEqual(util.aggregateShoppingView(segments(), selection, { A: "M1" }), [
      { name: "Pavo", quantity: 240, dayCount: 2 },
      { name: "Pollo", quantity: 200, dayCount: 2 },
    ]);
  });

  await t.test("no toca el reparto: los demás menús conservan sus días", () => {
    const selection = util.defaultShoppingSelection(segments());
    util.aggregateShoppingView(segments(), selection, { A: "M2" });
    assert.deepEqual(selection.A.menuDays, { M1: 4, M2: 3 });
  });
});

test("shoppingQuantityLabel", () => {
  assert.equal(util.shoppingQuantityLabel(950), "950 g");
  assert.equal(util.shoppingQuantityLabel(3420), "3.4 kg");
});
