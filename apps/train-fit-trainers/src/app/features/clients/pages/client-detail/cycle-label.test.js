const test = require("node:test");
const assert = require("node:assert/strict");

// Numeración de vueltas del calendario de nutrición (cycle-label.util.ts).
//
// Mismo runner y mismo truco que body-metrics.test.js en shared-core: node:test
// apuntado directamente al .ts (Node le quita los tipos), y por eso el módulo
// bajo prueba no tiene ni un import. Requiere Node >= 22.
//
// Estos números son lo que el entrenador lee para saber por dónde va el
// cliente: si la cuenta salta o retrocede al abrir un ciclo nuevo, el badge
// miente. Cada caso lleva la cuenta hecha a mano al lado.

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

  await t.test("una dieta de 1 día da una vuelta por día", () => {
    const diario = [{ startDate: "2026-09-07", endDate: null, mode: "sequential", daysCount: 1 }];
    assert.equal(util.cycleLabelFor("2026-09-07", diario), "C1");
    assert.equal(util.cycleLabelFor("2026-09-09", diario), "C3");
  });
});

test("cycleLabelFor — la cuenta no se reinicia al abrir un ciclo de progresión", async (t) => {
  // Fase de dieta de 4 días: el primer ciclo corre 8 días (2 vueltas
  // completas, 07→14) y el segundo arranca el 15.
  const fase = [
    { startDate: "2026-09-07", endDate: "2026-09-14", mode: "sequential", daysCount: 4 },
    { startDate: "2026-09-15", endDate: null, mode: "sequential", daysCount: 4 },
  ];

  await t.test("el primer ciclo va C1, C2", () => {
    assert.equal(util.cycleLabelFor("2026-09-07", fase), "C1");
    assert.equal(util.cycleLabelFor("2026-09-14", fase), "C2");
  });

  await t.test("el segundo sigue en C3, no vuelve a C1", () => {
    assert.equal(util.cycleLabelFor("2026-09-15", fase), "C3");
    assert.equal(util.cycleLabelFor("2026-09-18", fase), "C3");
    assert.equal(util.cycleLabelFor("2026-09-19", fase), "C4");
  });

  await t.test("cortar a mitad de vuelta no repite número", () => {
    // El primero se corta el 09, con la vuelta 1 a medias (llevaba 3 de 4
    // días). Esa vuelta cuenta como consumida: el siguiente empieza en C2.
    const cortada = [
      { startDate: "2026-09-07", endDate: "2026-09-09", mode: "sequential", daysCount: 4 },
      { startDate: "2026-09-10", endDate: null, mode: "sequential", daysCount: 4 },
    ];
    assert.equal(util.cycleLabelFor("2026-09-09", cortada), "C1");
    assert.equal(util.cycleLabelFor("2026-09-10", cortada), "C2");
  });
});

test("cycleLabelFor — modos por semana", async (t) => {
  // 2026-09-09 es miércoles; su semana empieza el lunes 2026-09-07.
  const recurrente = [{ startDate: "2026-09-09", endDate: null, mode: "recurring" }];

  await t.test("la vuelta es la semana natural, anclada a lunes", () => {
    assert.equal(util.cycleLabelFor("2026-09-09", recurrente), "C1");
    assert.equal(util.cycleLabelFor("2026-09-13", recurrente), "C1"); // domingo
    assert.equal(util.cycleLabelFor("2026-09-14", recurrente), "C2"); // lunes
    assert.equal(util.cycleLabelFor("2026-09-21", recurrente), "C3");
  });

  await t.test("modo choice cuenta igual", () => {
    const choice = [{ startDate: "2026-09-09", endDate: null, mode: "choice" }];
    assert.equal(util.cycleLabelFor("2026-09-14", choice), "C2");
  });
});

test("cycleLabelFor — bordes", async (t) => {
  await t.test("sin asignaciones no hay badge", () => {
    assert.equal(util.cycleLabelFor("2026-09-09", []), null);
    assert.equal(util.cycleLabelFor("2026-09-09", null), null);
  });

  await t.test("un día posterior al fin real no lleva badge", () => {
    const cerrada = [{ startDate: "2026-09-07", endDate: "2026-09-10", mode: "sequential", daysCount: 4 }];
    assert.equal(util.cycleLabelFor("2026-09-11", cerrada), null);
  });

  await t.test("un ciclo sustituido el mismo día que empezó no suma vueltas", () => {
    const fase = [
      { startDate: "2026-09-07", endDate: "2026-09-06", mode: "sequential", daysCount: 4 },
      { startDate: "2026-09-07", endDate: null, mode: "sequential", daysCount: 4 },
    ];
    assert.equal(util.cycleLabelFor("2026-09-07", fase), "C1");
  });
});
