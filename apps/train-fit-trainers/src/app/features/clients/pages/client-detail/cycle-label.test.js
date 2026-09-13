const test = require("node:test");
const assert = require("node:assert/strict");

// Numeración de ciclos del calendario de nutrición (cycle-label.util.ts).
//
// Mismo runner y mismo truco que body-metrics.test.js en shared-core: node:test
// apuntado directamente al .ts (Node le quita los tipos), y por eso el módulo
// bajo prueba no tiene ni un import. Requiere Node >= 22.
//
// Ciclos por contenido: mismo cálculo que cycle-window.js en el backend. Si
// los dos se separan en un día, el badge del calendario y el cuadradito de
// la ficha dicen ciclos distintos.

let util;

test.before(async () => {
  util = await import("./cycle-label.util.ts");
});

test("cycleLabelFor — dieta secuencial", async (t) => {
  // Dieta de 4 días desde el lunes 2026-09-07.
  const ciclo = [{ startDate: "2026-09-07", endDate: null, mode: "sequential", daysCount: 4 }];

  await t.test("los 4 primeros días son C1", () => {
    for (const day of ["2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10"]) {
      assert.equal(util.cycleLabelFor(day, ciclo), "C1");
    }
  });

  await t.test("los 4 siguientes son C2, y así", () => {
    assert.equal(util.cycleLabelFor("2026-09-11", ciclo), "C2");
    assert.equal(util.cycleLabelFor("2026-09-14", ciclo), "C2");
    assert.equal(util.cycleLabelFor("2026-09-15", ciclo), "C3");
  });

  await t.test("un día anterior al inicio no lleva badge", () => {
    assert.equal(util.cycleLabelFor("2026-09-06", ciclo), null);
  });

  await t.test("una dieta de 1 día da un ciclo por día", () => {
    const diario = [{ startDate: "2026-09-12", endDate: null, mode: "sequential", daysCount: 1 }];
    assert.equal(util.cycleLabelFor("2026-09-12", diario), "C1");
    assert.equal(util.cycleLabelFor("2026-09-13", diario), "C2");
    assert.equal(util.cycleLabelFor("2026-09-20", diario), "C9");
  });

  await t.test("cycleDays explícito del backend manda sobre daysCount", () => {
    const c = [{ startDate: "2026-09-07", endDate: null, mode: "sequential", daysCount: 4, cycleDays: 3 }];
    assert.equal(util.cycleLabelFor("2026-09-10", c), "C2");
  });
});

test("cycleLabelFor — un ciclo preparado cambia el paso de los siguientes", async (t) => {
  // C1 de 3 días desde el 12; C3 (empieza el 18) preparado con 5 días.
  const fase = [
    { startDate: "2026-09-12", endDate: "2026-09-17", mode: "sequential", daysCount: 3 },
    { startDate: "2026-09-18", endDate: null, mode: "sequential", daysCount: 5 },
  ];

  await t.test("C1 y C2 miden 3", () => {
    assert.equal(util.cycleLabelFor("2026-09-14", fase), "C1");
    assert.equal(util.cycleLabelFor("2026-09-15", fase), "C2");
    assert.equal(util.cycleLabelFor("2026-09-17", fase), "C2");
  });

  await t.test("C3 en adelante miden 5", () => {
    assert.equal(util.cycleLabelFor("2026-09-18", fase), "C3");
    assert.equal(util.cycleLabelFor("2026-09-22", fase), "C3");
    assert.equal(util.cycleLabelFor("2026-09-23", fase), "C4");
  });

  await t.test("cycleWindowsUntil devuelve las ventanas encadenadas", () => {
    const w = util.cycleWindowsUntil("2026-09-23", fase).map((x) => [x.number, x.start, x.end, x.len]);
    assert.deepEqual(w, [
      [1, "2026-09-12", "2026-09-14", 3],
      [2, "2026-09-15", "2026-09-17", 3],
      [3, "2026-09-18", "2026-09-22", 5],
      [4, "2026-09-23", "2026-09-27", 5],
    ]);
  });
});

test("cycleLabelFor — modos por semana", async (t) => {
  await t.test("recurring: 7 días por ciclo desde el inicio de la fase", () => {
    const semanal = [{ startDate: "2026-09-09", endDate: null, mode: "recurring", daysCount: 0 }];
    assert.equal(util.cycleLabelFor("2026-09-09", semanal), "C1");
    assert.equal(util.cycleLabelFor("2026-09-15", semanal), "C1");
    assert.equal(util.cycleLabelFor("2026-09-16", semanal), "C2");
  });

  await t.test("choice: lo que diga choiceCycleDays", () => {
    const eleccion = [{ startDate: "2026-09-09", endDate: null, mode: "choice", choiceCycleDays: 4 }];
    assert.equal(util.cycleLabelFor("2026-09-12", eleccion), "C1");
    assert.equal(util.cycleLabelFor("2026-09-13", eleccion), "C2");
  });

  await t.test("choice sin choiceCycleDays cae a 7", () => {
    const eleccion = [{ startDate: "2026-09-09", endDate: null, mode: "choice" }];
    assert.equal(util.cycleLabelFor("2026-09-15", eleccion), "C1");
    assert.equal(util.cycleLabelFor("2026-09-16", eleccion), "C2");
  });
});

test("cycleLabelFor — bordes", async (t) => {
  await t.test("sin asignaciones no hay badge", () => {
    assert.equal(util.cycleLabelFor("2026-09-10", []), null);
    assert.equal(util.cycleLabelFor("2026-09-10", [{ startDate: "", endDate: null }]), null);
  });

  await t.test("un día posterior al fin real no lleva badge", () => {
    const cerrado = [{ startDate: "2026-09-07", endDate: "2026-09-10", mode: "sequential", daysCount: 4 }];
    assert.equal(util.cycleLabelFor("2026-09-11", cerrado), null);
  });

  await t.test("el orden de entrada da igual", () => {
    const fase = [
      { startDate: "2026-09-18", endDate: null, mode: "sequential", daysCount: 5 },
      { startDate: "2026-09-12", endDate: "2026-09-17", mode: "sequential", daysCount: 3 },
    ];
    assert.equal(util.cycleLabelFor("2026-09-18", fase), "C3");
  });
});
