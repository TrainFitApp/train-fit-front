const test = require("node:test");
const assert = require("node:assert/strict");

// Chips de origen del cajón "Empezar fase".

let util;

test.before(async () => {
  util = await import("./diet-source-filter.util.ts");
});

const ALL = ["general", "client", "verified"];
const sorted = (set) => [...set].sort();

test("con 'Todas' activo, tocar un origen deja solo ese", () => {
  for (const source of ALL) {
    assert.deepEqual(sorted(util.nextSources(new Set(ALL), source, ALL)), [source]);
  }
});

test("con un subconjunto, tocar alterna", () => {
  assert.deepEqual(sorted(util.nextSources(new Set(["general"]), "verified", ALL)), ["general", "verified"]);
  assert.deepEqual(sorted(util.nextSources(new Set(["general", "verified"]), "verified", ALL)), ["general"]);
});

test("completar los tres equivale a 'Todas'", () => {
  const next = util.nextSources(new Set(["general", "client"]), "verified", ALL);
  assert.equal(next.size, ALL.length);
});

test("quitar el último origen vuelve a 'Todas'", () => {
  assert.deepEqual(sorted(util.nextSources(new Set(["client"]), "client", ALL)), sorted(ALL));
});

test("no muta el conjunto recibido", () => {
  const current = new Set(["general"]);
  util.nextSources(current, "client", ALL);
  assert.deepEqual([...current], ["general"]);
});
