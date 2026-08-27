const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Movimiento 3 Coach Pro — las fórmulas de body-metrics.util.ts.
//
// Se prueban con node:test, el MISMO runner que usa el backend, apuntado a
// este fichero: montar karma/jest solo para nueve funciones puras sería una
// arquitectura paralela para el resto del proyecto. Node importa el .ts
// directamente (quita los tipos), y por eso el módulo no tiene ni un import
// — ver el comentario de cabecera de body-metrics.util.ts.
//
// Estos números deciden qué le manda comer un entrenador a alguien. Cada
// caso lleva el resultado calculado a mano al lado, para que un cambio en la
// fórmula falle aquí y no en la cocina de un cliente.

let metrics;

test.before(async () => {
  metrics = await import("./body-metrics.util.ts");
});

test("bmrMifflinStJeor", async (t) => {
  await t.test("hombre 80 kg / 180 cm / 30 años", () => {
    // 10·80 + 6,25·180 − 5·30 + 5 = 800 + 1125 − 150 + 5
    assert.equal(
      metrics.bmrMifflinStJeor({ weightKg: 80, heightCm: 180, age: 30, sex: 1 }),
      1780
    );
  });

  await t.test("mujer 60 kg / 165 cm / 30 años", () => {
    // 10·60 + 6,25·165 − 5·30 − 161 = 600 + 1031,25 − 150 − 161
    assert.equal(
      metrics.bmrMifflinStJeor({ weightKg: 60, heightCm: 165, age: 30, sex: 0 }),
      1320
    );
  });

  await t.test("el sexo es el de SEX_TYPES: 1 = hombre, 0 = mujer", () => {
    // Misma persona, distinto sexo: 166 kcal de diferencia (+5 vs −161).
    const male = metrics.bmrMifflinStJeor({ weightKg: 70, heightCm: 170, age: 30, sex: 1 });
    const female = metrics.bmrMifflinStJeor({ weightKg: 70, heightCm: 170, age: 30, sex: 0 });
    assert.equal(male - female, 166);
  });

  await t.test("sin peso, altura o edad devuelve null, nunca un número inventado", () => {
    assert.equal(metrics.bmrMifflinStJeor({ weightKg: null, heightCm: 180, age: 30, sex: 1 }), null);
    assert.equal(metrics.bmrMifflinStJeor({ weightKg: 80, heightCm: null, age: 30, sex: 1 }), null);
    assert.equal(metrics.bmrMifflinStJeor({ weightKg: 80, heightCm: 180, age: null, sex: 1 }), null);
    assert.equal(metrics.bmrMifflinStJeor({ weightKg: 0, heightCm: 180, age: 30, sex: 1 }), null);
  });
});

test("bmrHarrisBenedict", async (t) => {
  await t.test("hombre 80 kg / 180 cm / 30 años", () => {
    // 88,362 + 13,397·80 + 4,799·180 − 5,677·30 = 1854,4...
    assert.equal(
      metrics.bmrHarrisBenedict({ weightKg: 80, heightCm: 180, age: 30, sex: 1 }),
      1854
    );
  });

  await t.test("suele dar por encima de Mifflin en el mismo sujeto", () => {
    const input = { weightKg: 80, heightCm: 180, age: 30, sex: 1 };
    assert.ok(metrics.bmrHarrisBenedict(input) > metrics.bmrMifflinStJeor(input));
  });

  await t.test("sin datos devuelve null", () => {
    assert.equal(metrics.bmrHarrisBenedict({ weightKg: null, heightCm: 180, age: 30, sex: 1 }), null);
  });
});

test("bmrKatchMcArdle", async (t) => {
  await t.test("370 + 21,6 × masa magra", () => {
    assert.equal(metrics.bmrKatchMcArdle(65), 1774); // 370 + 1404
  });

  await t.test("sin masa magra devuelve null: estimarla sería volver a Mifflin", () => {
    assert.equal(metrics.bmrKatchMcArdle(null), null);
    assert.equal(metrics.bmrKatchMcArdle(0), null);
  });
});

test("bodyFatNavy", async (t) => {
  await t.test("hombre: no necesita cadera", () => {
    const value = metrics.bodyFatNavy({ sex: 1, heightCm: 180, neckCm: 38, waistCm: 85 });
    assert.ok(value > 10 && value < 25, `fuera de rango plausible: ${value}`);
  });

  await t.test("mujer: sin cadera no se puede calcular", () => {
    assert.equal(metrics.bodyFatNavy({ sex: 0, heightCm: 165, neckCm: 32, waistCm: 70 }), null);
    const value = metrics.bodyFatNavy({
      sex: 0,
      heightCm: 165,
      neckCm: 32,
      waistCm: 70,
      hipCm: 95,
    });
    assert.ok(value > 15 && value < 40, `fuera de rango plausible: ${value}`);
  });

  await t.test("más cintura sobre el mismo cuerpo da más grasa", () => {
    const slim = metrics.bodyFatNavy({ sex: 1, heightCm: 180, neckCm: 38, waistCm: 80 });
    const wide = metrics.bodyFatNavy({ sex: 1, heightCm: 180, neckCm: 38, waistCm: 100 });
    assert.ok(wide > slim, `${wide} debería superar a ${slim}`);
  });

  await t.test("un cuello mayor que la cintura devuelve null, no NaN", () => {
    // Medida mal apuntada. El logaritmo de un número negativo daría NaN, y
    // un NaN paseándose por la interfaz es peor que un hueco.
    const value = metrics.bodyFatNavy({ sex: 1, heightCm: 180, neckCm: 90, waistCm: 80 });
    assert.equal(value, null);
  });

  await t.test("sin medidas devuelve null", () => {
    assert.equal(metrics.bodyFatNavy({ sex: 1, heightCm: null, neckCm: 38, waistCm: 85 }), null);
    assert.equal(metrics.bodyFatNavy({ sex: 1, heightCm: 180, neckCm: null, waistCm: 85 }), null);
  });
});

test("bodyFatDeurenberg", async (t) => {
  await t.test("hombre 80 kg / 180 cm / 30 años", () => {
    // IMC = 80/1,8² = 24,6914 (sin redondear)
    // 1,2·24,6914 + 0,23·30 − 10,8 − 5,4 = 20,33 → 20,3
    assert.equal(
      metrics.bodyFatDeurenberg({ weightKg: 80, heightCm: 180, age: 30, sex: 1 }),
      20.3
    );
  });

  await t.test("usa el IMC sin redondear, no el que se muestra", () => {
    // 90 kg / 175 cm: IMC real 29,3878, redondeado 29,4. Con el redondeado
    // saldría 0,01 más — poco, pero es un error metido a mano en la
    // fórmula, y en otros pesos llega a mover el decimal que se enseña.
    const exact = 1.2 * (90 / 1.75 ** 2) + 0.23 * 40 - 10.8 - 5.4;
    assert.equal(
      metrics.bodyFatDeurenberg({ weightKg: 90, heightCm: 175, age: 40, sex: 1 }),
      Math.round(exact * 10) / 10
    );
  });

  await t.test("misma persona: la mujer sale 10,8 puntos por encima", () => {
    const male = metrics.bodyFatDeurenberg({ weightKg: 70, heightCm: 170, age: 30, sex: 1 });
    const female = metrics.bodyFatDeurenberg({ weightKg: 70, heightCm: 170, age: 30, sex: 0 });
    assert.equal(Math.round((female - male) * 10) / 10, 10.8);
  });
});

test("composición", async (t) => {
  await t.test("masa grasa y magra suman el peso", () => {
    const fat = metrics.fatMassFromPercentage(80, 20);
    const lean = metrics.leanMassFromPercentage(80, 20);
    assert.equal(fat, 16);
    assert.equal(lean, 64);
    assert.equal(fat + lean, 80);
  });

  await t.test("sin % graso no hay reparto que hacer", () => {
    assert.equal(metrics.fatMassFromPercentage(80, null), null);
    assert.equal(metrics.leanMassFromPercentage(80, null), null);
  });

  await t.test("IMC = peso / altura²", () => {
    assert.equal(metrics.bmi(80, 180), 24.7);
    assert.equal(metrics.bmi(null, 180), null);
  });
});

test("totalEnergyExpenditure", async (t) => {
  await t.test("basal × factor de actividad", () => {
    assert.equal(metrics.totalEnergyExpenditure(1780, 1.45), 2581);
  });

  await t.test("sin basal o sin factor devuelve null, no el otro a secas", () => {
    assert.equal(metrics.totalEnergyExpenditure(null, 1.45), null);
    assert.equal(metrics.totalEnergyExpenditure(1780, null), null);
  });
});

test("proportionIndices", async (t) => {
  await t.test("solo devuelve los índices que se pueden calcular", () => {
    const indices = metrics.proportionIndices({ chest: 105, waist: 80 });
    assert.equal(indices.length, 1);
    assert.equal(indices[0].key, "chest_waist");
    assert.equal(indices[0].value, 1.31);
  });

  await t.test("con todas las medidas salen los cuatro", () => {
    const indices = metrics.proportionIndices({
      chest: 105,
      waist: 80,
      hip: 98,
      bicepsContracted: 38,
      thighRelaxed: 58,
    });
    assert.deepEqual(
      indices.map((index) => index.key),
      ["chest_waist", "arm_waist", "waist_hip", "thigh_waist"]
    );
  });

  await t.test("una medida a cero no genera índice (no es un 0, es 'no medido')", () => {
    assert.deepEqual(metrics.proportionIndices({ chest: 105, waist: 0 }), []);
    assert.deepEqual(metrics.proportionIndices({}), []);
  });
});

test("ageFromBirthDate", async (t) => {
  await t.test("cuenta años cumplidos, no diferencia de años", () => {
    const today = new Date();
    // Cumple mañana: todavía tiene 29, no 30.
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const birth = new Date(tomorrow);
    birth.setFullYear(birth.getFullYear() - 30);
    assert.equal(metrics.ageFromBirthDate(birth.toISOString()), 29);
  });

  await t.test("ya cumplido este año", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const birth = new Date(yesterday);
    birth.setFullYear(birth.getFullYear() - 30);
    assert.equal(metrics.ageFromBirthDate(birth.toISOString()), 30);
  });

  await t.test("sin fecha o con fecha inválida devuelve null", () => {
    assert.equal(metrics.ageFromBirthDate(null), null);
    assert.equal(metrics.ageFromBirthDate(undefined), null);
    assert.equal(metrics.ageFromBirthDate("no soy una fecha"), null);
  });
});

// La correspondencia 0 = mujer / 1 = hombre está escrita a mano en
// body-metrics.util.ts (constante MALE) para que el módulo no tenga
// imports. Si alguien cambia el enum de verdad, esto lo caza.
test("MALE coincide con SEX_TYPES.male de shared-ui", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "../../../../../shared-ui/src/app/shared/constants/sex.ts"),
    "utf8"
  );
  assert.match(source, /male\s*=\s*1/, "SEX_TYPES.male ya no es 1");
  assert.match(source, /female\s*=\s*0/, "SEX_TYPES.female ya no es 0");
});
