const test = require("node:test");
const assert = require("node:assert/strict");

// Suplementos del día en la pantalla de dieta (supplement-day.util.ts): los
// pautados solo algunos días de la semana no salen el resto.

let util;

test.before(async () => {
  util = await import("./supplement-day.util.ts");
});

test("weekdayOf da el día de la semana de la fecha de calendario, sin zona horaria", () => {
  assert.equal(util.weekdayOf("2026-10-11"), 0, "domingo");
  assert.equal(util.weekdayOf("2026-10-12"), 1, "lunes");
  assert.equal(util.weekdayOf("2026-10-17"), 6, "sábado");
});

test("supplementsForDay deja los de todos los días y los de ese día de la semana", () => {
  const all = [
    { name: "Creatina", weekdays: [] },
    { name: "Cafeína", weekdays: [1, 3] },
    { name: "Vitamina D" },
    { name: "Proteína", weekdays: [0] },
  ];
  assert.deepEqual(util.supplementsForDay(all, "2026-10-12").map((s) => s.name), ["Creatina", "Cafeína", "Vitamina D"]);
  assert.deepEqual(util.supplementsForDay(all, "2026-10-13").map((s) => s.name), ["Creatina", "Vitamina D"]);
  assert.deepEqual(util.supplementsForDay(all, "2026-10-11").map((s) => s.name), ["Creatina", "Vitamina D", "Proteína"]);
  assert.deepEqual(util.supplementsForDay([], "2026-10-11"), []);
});
