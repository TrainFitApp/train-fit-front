const test = require("node:test");
const assert = require("node:assert/strict");

// La dosis del suplemento viaja como texto ("5 g"); el formulario la edita
// como cantidad numérica + unidad de una lista.

let util;

test.before(async () => {
  util = await import("./supplement-dose.util.ts");
});

test("parseDose", async (t) => {
  await t.test("número y unidad de la lista", () => {
    assert.deepEqual(util.parseDose("5 g"), { amount: "5", unit: "g" });
    assert.deepEqual(util.parseDose("2 cápsulas"), { amount: "2", unit: "cápsulas" });
  });
  await t.test("coma decimal y sin espacio", () => {
    assert.deepEqual(util.parseDose("1,5g"), { amount: "1.5", unit: "g" });
  });
  await t.test("singular, alias y mayúsculas → valor de la lista", () => {
    assert.deepEqual(util.parseDose("1 cápsula"), { amount: "1", unit: "cápsulas" });
    assert.deepEqual(util.parseDose("1000 mcg"), { amount: "1000", unit: "µg" });
    assert.deepEqual(util.parseDose("3000 iu"), { amount: "3000", unit: "UI" });
    assert.deepEqual(util.parseDose("5 Gr."), { amount: "5", unit: "g" });
  });
  await t.test("unidad fuera de la lista se conserva tal cual", () => {
    assert.deepEqual(util.parseDose("1 medida rasa"), { amount: "1", unit: "medida rasa" });
  });
  await t.test("sin número delante → cantidad vacía", () => {
    assert.deepEqual(util.parseDose("media medida"), { amount: "", unit: "media medida" });
  });
  await t.test("vacío o null", () => {
    assert.deepEqual(util.parseDose(""), { amount: "", unit: "" });
    assert.deepEqual(util.parseDose(null), { amount: "", unit: "" });
  });
});

test("formatDose", async (t) => {
  await t.test("coma decimal", () => {
    assert.equal(util.formatDose("1.5", "g"), "1,5 g");
  });
  await t.test("singular solo con cantidad 1", () => {
    assert.equal(util.formatDose("1", "cápsulas"), "1 cápsula");
    assert.equal(util.formatDose("2", "cápsulas"), "2 cápsulas");
    assert.equal(util.formatDose("0.5", "medidas"), "0,5 medidas");
  });
  await t.test("normaliza el número", () => {
    assert.equal(util.formatDose("05", "g"), "5 g");
    assert.equal(util.formatDose("5.", "mg"), "5 mg");
  });
  await t.test("unidad fuera de la lista se escribe tal cual", () => {
    assert.equal(util.formatDose("1", "medida rasa"), "1 medida rasa");
  });
  await t.test("cantidad vacía, cero o no numérica → ''", () => {
    assert.equal(util.formatDose("", "g"), "");
    assert.equal(util.formatDose("0", "g"), "");
    assert.equal(util.formatDose(".", "g"), "");
  });
  await t.test("ida y vuelta", () => {
    const { amount, unit } = util.parseDose("2,5 mg");
    assert.equal(util.formatDose(amount, unit), "2,5 mg");
  });
});

test("isKnownDoseUnit", () => {
  assert.equal(util.isKnownDoseUnit("g"), true);
  assert.equal(util.isKnownDoseUnit("medida rasa"), false);
});
