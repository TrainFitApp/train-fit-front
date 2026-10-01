const test = require("node:test");
const assert = require("node:assert/strict");

// Aritmética de la adición rápida (QuickAddSheetComponent): lo que se escribe
// a mano en una comida sin crear ningún producto del catálogo.

let util;

test.before(async () => {
  util = await import("./quick-add.util.ts");
});

test("parseQuickAddNumber acepta la coma decimal del teclado español", () => {
  assert.equal(util.parseQuickAddNumber("12,5"), 12.5);
  assert.equal(util.parseQuickAddNumber("12.5"), 12.5);
  assert.equal(util.parseQuickAddNumber(12.5), 12.5);
});

test("parseQuickAddNumber trata como 0 todo lo que no es un número positivo", () => {
  for (const value of ["", "   ", "abc", "-30", "0", null, undefined, NaN]) {
    assert.equal(util.parseQuickAddNumber(value), 0, `valor: ${String(value)}`);
  }
});

test("kcalFromMacros aplica Atwater (4/4/9) y redondea", () => {
  assert.equal(util.kcalFromMacros({ protein: 30, carbs: 50, fat: 10 }), 410);
  // 20,5 g de grasa = 184,5 kcal -> 185 (redondeo, no truncado)
  assert.equal(util.kcalFromMacros({ fat: "20,5" }), 185);
});

test("kcalFromMacros ignora las kcal ya escritas: solo mira los macros", () => {
  assert.equal(util.kcalFromMacros({ kcal: 999, protein: 10 }), 40);
});

test("kcalFromMacros sin macros es 0", () => {
  assert.equal(util.kcalFromMacros({}), 0);
  assert.equal(util.kcalFromMacros({ protein: "", carbs: "", fat: "" }), 0);
});

test("canSubmitQuickAdd basta con un valor por encima de 0", () => {
  assert.equal(util.canSubmitQuickAdd({ kcal: 250 }), true);
  // Apuntar solo proteína es un uso legítimo: no obliga a saber las kcal.
  assert.equal(util.canSubmitQuickAdd({ protein: 20 }), true);
  assert.equal(util.canSubmitQuickAdd({ fat: "0,5" }), true);
});

test("canSubmitQuickAdd rechaza la línea que no suma nada", () => {
  assert.equal(util.canSubmitQuickAdd({}), false);
  assert.equal(util.canSubmitQuickAdd({ kcal: "", protein: "", carbs: "", fat: "" }), false);
  assert.equal(util.canSubmitQuickAdd({ kcal: "0", protein: "-5" }), false);
});

test("shouldOfferKcalFromMacros solo cuando hay macros y no cuadran con lo escrito", () => {
  assert.equal(util.shouldOfferKcalFromMacros({ kcal: 300, protein: 30, carbs: 50, fat: 10 }), true);
  // Ya coinciden: el atajo no tiene nada que corregir.
  assert.equal(util.shouldOfferKcalFromMacros({ kcal: 410, protein: 30, carbs: 50, fat: 10 }), false);
  // Sin macros no hay nada que proponer, aunque las kcal estén vacías.
  assert.equal(util.shouldOfferKcalFromMacros({ kcal: "" }), false);
});
