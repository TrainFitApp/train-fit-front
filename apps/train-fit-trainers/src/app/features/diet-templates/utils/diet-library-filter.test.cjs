const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Filtros de la biblioteca de plantillas de dieta (panel derecho). Con el
// arnés: el util importa el buscador por nombre y Node no resuelve imports
// de TypeScript sin extensión.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, "apps")) || !fs.existsSync(path.join(dir, "packages"))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), "tests/support/ng-harness.cjs"));
const source = "src/app/features/diet-templates/utils/diet-library-filter";
const util = loadFromSource(
  __filename,
  __dirname,
  { filterDietLibrary: source, dietSources: source, effectiveSuitableFor: source, activeLibraryFilterCount: source },
  { app: "train-fit-trainers" },
);

const ME = "t1";
const DIETS = [
  { _id: "mine", trainerId: ME, name: "Definición vegana", suitableFor: ["vegan", "vegetarian"] },
  { _id: "client", trainerId: ME, name: "Volumen Ana", ownerClientId: "c1", suitableFor: ["glutenFree"] },
  { _id: "factory", trainerId: "admin", name: "Definición TrainFit", verified: true, ownerClientId: "c1", suitableFor: [] },
  { _id: "forced", trainerId: ME, name: "Mantenimiento", suitableFor: ["vegetarian"], suitableForOverride: ["lactoseFree"] },
];
const sorted = (set) => [...set].sort();
const ids = (list) => list.map((diet) => diet._id);
const ALL = new Set(["general", "client", "verified"]);

test("sin filtros devuelve todas en el mismo orden", () => {
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, {})), ["mine", "client", "factory", "forced"]);
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { sources: ALL, flags: new Set() })), [
    "mine",
    "client",
    "factory",
    "forced",
  ]);
});

test("'Añadidas por mí' son todas las que creó el profesional, también las de sus clientes", () => {
  assert.deepEqual(sorted(util.dietSources(DIETS[0], ME)), ["general"]);
  assert.deepEqual(sorted(util.dietSources(DIETS[1], ME)), ["client", "general"]);
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { sources: new Set(["general"]), trainerId: ME })), [
    "mine",
    "client",
    "forced",
  ]);
});

test("una de fábrica nunca cuenta como de cliente, y sí como mía si la creé yo", () => {
  assert.deepEqual(sorted(util.dietSources(DIETS[2], ME)), ["verified"]);
  assert.deepEqual(sorted(util.dietSources(DIETS[2], "admin")), ["general", "verified"]);
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { sources: new Set(["client"]), trainerId: ME })), ["client"]);
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { sources: new Set(["verified"]), trainerId: ME })), ["factory"]);
});

test("sin saber quién mira, 'Añadidas por mí' no casa con ninguna", () => {
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { sources: new Set(["general"]) })), []);
});

test("las restricciones exigen todas las marcadas, contando las forzadas a mano", () => {
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { flags: new Set(["vegetarian"]) })), ["mine", "forced"]);
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { flags: new Set(["lactoseFree"]) })), ["forced"]);
  assert.deepEqual(ids(util.filterDietLibrary(DIETS, { flags: new Set(["vegan", "lactoseFree"]) })), []);
});

test("nombre, origen y restricciones se combinan", () => {
  const result = util.filterDietLibrary(DIETS, {
    query: "definicion",
    sources: new Set(["general"]),
    flags: new Set(["vegan"]),
    trainerId: ME,
  });
  assert.deepEqual(ids(result), ["mine"]);
});

test("aptitud efectiva sin duplicados", () => {
  assert.deepEqual(util.effectiveSuitableFor({ suitableFor: ["vegan"], suitableForOverride: ["vegan", "glutenFree"] }), [
    "vegan",
    "glutenFree",
  ]);
  assert.deepEqual(util.effectiveSuitableFor({}), []);
});

test("cuenta los filtros del panel, no el texto del buscador", () => {
  assert.equal(util.activeLibraryFilterCount({ query: "x", sources: ALL, flags: new Set() }), 0);
  assert.equal(util.activeLibraryFilterCount({ sources: new Set(["client"]), flags: new Set(["vegan", "glutenFree"]) }), 3);
});
