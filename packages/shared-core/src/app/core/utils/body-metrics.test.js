const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Las fórmulas de body-metrics.util.ts.
//
// Se prueban con node:test, el MISMO runner que usa el backend, apuntado a
// este fichero: montar karma/jest solo para unas funciones puras sería una
// arquitectura paralela para el resto del proyecto. Node importa el .ts
// directamente (quita los tipos), y por eso el módulo no tiene ni un import
// — ver el comentario de cabecera de body-metrics.util.ts.
//
// El basal decide el objetivo calórico del cliente. Cada caso lleva el
// resultado calculado a mano al lado, para que un cambio en la fórmula falle
// aquí y no en la cocina de un cliente.

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

test("ageFromBirthDate", async (t) => {
  // La fecha de nacimiento es un día de calendario local ("YYYY-MM-DD").
  const localDay = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  await t.test("cuenta años cumplidos, no diferencia de años", () => {
    const today = new Date();
    // Cumple mañana: todavía tiene 29, no 30.
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const birth = new Date(tomorrow);
    birth.setFullYear(birth.getFullYear() - 30);
    assert.equal(metrics.ageFromBirthDate(localDay(birth)), 29);
  });

  await t.test("ya cumplido este año", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const birth = new Date(yesterday);
    birth.setFullYear(birth.getFullYear() - 30);
    assert.equal(metrics.ageFromBirthDate(localDay(birth)), 30);
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

// Regresión 2026-09: el registro del cliente guarda peso/altura como string
// ("70.5"); la basal salía null → 0 y el objetivo calórico se quedaba en el
// puro superávit/déficit.
test("toBodyInput", async (t) => {
  await t.test("convierte strings de formulario a número", () => {
    assert.deepEqual(
      metrics.toBodyInput({ weight: "70.5", height: "175", age: 30, sex: 1 }),
      { weightKg: 70.5, heightCm: 175, age: 30, sex: 1 }
    );
  });

  await t.test("acepta coma decimal", () => {
    assert.equal(metrics.toBodyInput({ weight: "70,5", height: 175, age: 30, sex: 1 }).weightKg, 70.5);
  });

  await t.test("vacío o basura → null, nunca 0 ni NaN", () => {
    assert.deepEqual(
      metrics.toBodyInput({ weight: "", height: undefined, age: "abc", sex: null }),
      { weightKg: null, heightCm: null, age: null, sex: null }
    );
  });

  await t.test("basal con entrada de formulario = basal con números", () => {
    // 10·80 + 6,25·180 − 5·30 + 5 = 1780 (mismo caso que arriba)
    assert.equal(
      metrics.bmrMifflinStJeor(metrics.toBodyInput({ weight: "80", height: "180", age: 30, sex: 1 })),
      1780
    );
  });
});
