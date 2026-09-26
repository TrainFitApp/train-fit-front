const test = require("node:test");
const assert = require("node:assert/strict");

// Lo que <app-date-field> devuelve por ngModel: el mismo formato que el
// <input type="date|time"> nativo al que sustituye.

let util;

test.before(async () => {
  util = await import("./date-field-value.util.ts");
});

test("toDateValue", async (t) => {
  await t.test("ISO con hora → solo la fecha", () => {
    assert.equal(util.toDateValue("2026-09-26T10:30:00"), "2026-09-26");
  });
  await t.test("ya en YYYY-MM-DD se queda igual", () => {
    assert.equal(util.toDateValue("2026-09-26"), "2026-09-26");
  });
  await t.test("vacío, null, undefined o basura → ''", () => {
    assert.equal(util.toDateValue(""), "");
    assert.equal(util.toDateValue(null), "");
    assert.equal(util.toDateValue(undefined), "");
    assert.equal(util.toDateValue("09:00"), "");
  });
});

test("toTimeValue", async (t) => {
  await t.test("HH:mm se queda igual", () => {
    assert.equal(util.toTimeValue("09:05"), "09:05");
  });
  await t.test("ISO con hora → HH:mm", () => {
    assert.equal(util.toTimeValue("2026-09-26T21:45:00"), "21:45");
  });
  await t.test("solo fecha o vacío → ''", () => {
    assert.equal(util.toTimeValue("2026-09-26"), "");
    assert.equal(util.toTimeValue(""), "");
    assert.equal(util.toTimeValue(null), "");
  });
});
