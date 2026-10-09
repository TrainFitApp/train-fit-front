const test = require("node:test");
const assert = require("node:assert/strict");

// Buscador por nombre de las listas de dietas.

let util;

test.before(async () => {
  util = await import("./diet-name-search.ts");
});

const DIETS = [
  { _id: "a", name: "Definición 1800 kcal" },
  { _id: "b", name: "Volumen 3000 kcal" },
  { _id: "c", name: "Mantenimiento vegetariano" },
  { _id: "d", name: null },
];
const ids = (list) => list.map((diet) => diet._id);

test("sin texto devuelve todas, en el mismo orden y en una copia", () => {
  for (const query of ["", "   ", null, undefined]) {
    const result = util.filterDietsByName(DIETS, query);
    assert.deepEqual(ids(result), ["a", "b", "c", "d"]);
    assert.notEqual(result, DIETS);
  }
});

test("no distingue mayúsculas ni acentos, en ninguno de los dos lados", () => {
  assert.deepEqual(ids(util.filterDietsByName(DIETS, "definicion")), ["a"]);
  assert.deepEqual(ids(util.filterDietsByName(DIETS, "VOLÚMEN")), ["b"]);
});

test("cada palabra tiene que aparecer, en cualquier orden y como trozo", () => {
  assert.deepEqual(ids(util.filterDietsByName(DIETS, "kcal")), ["a", "b"]);
  assert.deepEqual(ids(util.filterDietsByName(DIETS, "3000 vol")), ["b"]);
  assert.deepEqual(ids(util.filterDietsByName(DIETS, "volumen vegetariano")), []);
});

test("conserva el orden de entrada (el ranking del selector)", () => {
  const ranked = [DIETS[1], DIETS[0]];
  assert.deepEqual(ids(util.filterDietsByName(ranked, "kcal")), ["b", "a"]);
});

test("una dieta sin nombre solo sale sin texto", () => {
  assert.ok(!ids(util.filterDietsByName(DIETS, "a")).includes("d"));
});
