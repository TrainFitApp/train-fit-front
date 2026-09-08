const test = require("node:test");
const assert = require("node:assert/strict");

// Las fórmulas de exchange-math.util.ts.
//
// Mismo montaje que body-metrics.test.js: node:test apuntado al .ts, sin
// karma ni jest para dos funciones puras. Node importa el .ts quitando los
// tipos, y eso pide Node >= 22.6 — con 20 falla con ERR_UNKNOWN_FILE_EXTENSION.
//
// Estos números acaban en la pauta que sigue una persona todos los días. Un
// redondeo mal hecho no falla: simplemente hace que alguien coma un 30% más de
// lo que su profesional quería. Por eso cada caso lleva al lado el resultado
// calculado a mano.

let math;

test.before(async () => {
  math = await import("./exchange-math.util.ts");
});

const CARBS = { basis: "carbs", basisAmount: 15 };
const KCAL = { basis: "kcal", basisAmount: 90 };
const SIN_BASE = { basis: null, basisAmount: null };

test("exchangesFor", async (t) => {
  await t.test("divide la cantidad de la etiqueta entre la ración del grupo", () => {
    const result = math.exchangesFor(CARBS, 30);
    assert.equal(result.exact, 2);
    assert.equal(result.rounded, 2);
  });

  await t.test("redondea a media ración, no a decimales libres", () => {
    // 20 / 15 = 1,333… -> 1,33 exactas, 1,5 pautadas.
    const result = math.exchangesFor(CARBS, 20);
    assert.equal(result.exact, 1.33);
    assert.equal(result.rounded, 1.5);
  });

  await t.test("redondea hacia abajo cuando toca", () => {
    // 17 / 15 = 1,133… -> la media ración más cercana es 1.
    assert.equal(math.exchangesFor(CARBS, 17).rounded, 1);
  });

  await t.test("sin base numérica devuelve null, no cero", () => {
    assert.equal(math.exchangesFor(SIN_BASE, 30), null);
    assert.equal(math.exchangesFor({ basis: "carbs", basisAmount: 0 }, 30), null);
    assert.equal(math.exchangesFor(null, 30), null);
    assert.equal(math.exchangesFor(undefined, 30), null);
  });

  await t.test("cantidad no positiva o no numérica devuelve null", () => {
    assert.equal(math.exchangesFor(CARBS, 0), null);
    assert.equal(math.exchangesFor(CARBS, -5), null);
    assert.equal(math.exchangesFor(CARBS, null), null);
    assert.equal(math.exchangesFor(CARBS, "mucho"), null);
  });

  await t.test("funciona igual con una base en kcal", () => {
    // 225 / 90 = 2,5 justas.
    const result = math.exchangesFor(KCAL, 225);
    assert.equal(result.exact, 2.5);
    assert.equal(result.rounded, 2.5);
  });
});

test("amountForExchanges", async (t) => {
  const pollo = { name: "Pechuga de pollo", quantity: 100, unit: "g" };

  await t.test("multiplica la cantidad que escribió el profesional", () => {
    assert.deepEqual(math.amountForExchanges(pollo, 2), {
      quantity: 200,
      unit: "g",
      name: "Pechuga de pollo",
    });
  });

  await t.test("media ración es la mitad", () => {
    assert.equal(math.amountForExchanges(pollo, 0.5).quantity, 50);
  });

  await t.test("redondea a un decimal", () => {
    // 130 x 1,5 = 195 exacto; 33 x 1,5 = 49,5.
    assert.equal(math.amountForExchanges({ name: "Merluza", quantity: 33, unit: "g" }, 1.5).quantity, 49.5);
  });

  await t.test("respeta la unidad del alimento", () => {
    const leche = { name: "Leche", quantity: 200, unit: "ml" };
    assert.equal(math.amountForExchanges(leche, 1.5).unit, "ml");
  });

  await t.test("sin unidad asume gramos", () => {
    assert.equal(math.amountForExchanges({ name: "Pan", quantity: 30 }, 1).unit, "g");
  });

  await t.test("cero raciones es un valor válido, no un error", () => {
    assert.equal(math.amountForExchanges(pollo, 0).quantity, 0);
  });

  await t.test("alimento sin cantidad o count inválido devuelve null", () => {
    assert.equal(math.amountForExchanges({ name: "X", quantity: 0 }, 2), null);
    assert.equal(math.amountForExchanges(null, 2), null);
    assert.equal(math.amountForExchanges(pollo, -1), null);
    assert.equal(math.amountForExchanges(pollo, "dos"), null);
  });
});

test("el redondeo del front y el que se pautaba a mano coinciden", async (t) => {
  await t.test("Math.round(x*2)/2 es el mismo paso de media ración", () => {
    // La pantalla del profesional calculaba esto inline antes de compartir el
    // módulo. Si alguien vuelve a tocar EXCHANGE_STEP, este caso lo dice.
    for (const amount of [10, 15, 17, 20, 22.5, 30, 37, 45]) {
      const inline = Math.round((amount / 15) * 2) / 2;
      assert.equal(math.exchangesFor(CARBS, amount).rounded, inline);
    }
  });
});
