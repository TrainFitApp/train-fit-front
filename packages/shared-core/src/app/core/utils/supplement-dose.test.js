const test = require("node:test");
const assert = require("node:assert/strict");

// La dosis del suplemento viaja como texto ("5 g"); los formularios (cliente y
// profesional) la editan como cantidad numérica + unidad de una lista. La
// unidad va en el idioma de quien rellena el formulario.

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
  await t.test("en inglés devuelve la unidad en inglés, venga en el idioma que venga", () => {
    assert.deepEqual(util.parseDose("2 capsules", "en"), { amount: "2", unit: "capsules" });
    assert.deepEqual(util.parseDose("1 cápsula", "en"), { amount: "1", unit: "capsules" });
    assert.deepEqual(util.parseDose("3000 UI", "en"), { amount: "3000", unit: "IU" });
    assert.deepEqual(util.parseDose("1000 µg", "en"), { amount: "1000", unit: "mcg" });
    assert.deepEqual(util.parseDose("1.5 scoop", "en"), { amount: "1.5", unit: "scoops" });
    assert.deepEqual(util.parseDose("5 g", "en"), { amount: "5", unit: "g" });
  });
  await t.test("en español reconoce lo que el asistente escribió en inglés", () => {
    assert.deepEqual(util.parseDose("2 capsules"), { amount: "2", unit: "cápsulas" });
    assert.deepEqual(util.parseDose("3000 IU"), { amount: "3000", unit: "UI" });
    assert.deepEqual(util.parseDose("1 teaspoon"), { amount: "1", unit: "cucharaditas" });
  });
  await t.test("una unidad fuera de la lista se conserva en cualquier idioma", () => {
    assert.deepEqual(util.parseDose("1 medida rasa", "en"), { amount: "1", unit: "medida rasa" });
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
    assert.equal(util.formatDose(null, "g"), "");
  });
  await t.test("ida y vuelta", () => {
    const { amount, unit } = util.parseDose("2,5 mg");
    assert.equal(util.formatDose(amount, unit), "2,5 mg");
  });
  await t.test("en inglés punto decimal, singular y unidades en inglés", () => {
    assert.equal(util.formatDose("1.5", "mg", "en"), "1.5 mg");
    assert.equal(util.formatDose("1", "capsules", "en"), "1 capsule");
    assert.equal(util.formatDose("2", "capsules", "en"), "2 capsules");
    assert.equal(util.formatDose("3000", "IU", "en"), "3000 IU");
    assert.equal(util.formatDose("2", "mcg", "en"), "2 mcg");
  });
  await t.test("ida y vuelta en inglés, también desde una dosis guardada en español", () => {
    const { amount, unit } = util.parseDose("2,5 cápsulas", "en");
    assert.equal(util.formatDose(amount, unit, "en"), "2.5 capsules");
  });
});

test("doseUnitOptions", async (t) => {
  await t.test("la lista cerrada en cada idioma, con las mismas unidades", () => {
    const es = util.doseUnitOptions("g", "es");
    const en = util.doseUnitOptions("g", "en");
    assert.equal(es.length, en.length);
    assert.ok(es.includes("cápsulas") && !es.includes("capsules"));
    assert.ok(en.includes("capsules") && !en.includes("cápsulas"));
    assert.ok(es.includes(util.DEFAULT_DOSE_UNIT) && en.includes(util.DEFAULT_DOSE_UNIT));
  });
  await t.test("español por defecto y sin unidad actual", () => {
    assert.deepEqual(util.doseUnitOptions(), util.doseUnitOptions("", "es"));
    assert.ok(util.doseUnitOptions().includes("comprimidos"));
  });
  await t.test("una unidad que ya está en la lista no se repite", () => {
    assert.equal(util.doseUnitOptions("mg").filter((unit) => unit === "mg").length, 1);
  });
  await t.test("una unidad fuera de la lista se añade al final", () => {
    const options = util.doseUnitOptions("medida rasa", "en");
    assert.equal(options.at(-1), "medida rasa");
    assert.equal(options.length, util.doseUnitOptions("g", "en").length + 1);
  });
});
