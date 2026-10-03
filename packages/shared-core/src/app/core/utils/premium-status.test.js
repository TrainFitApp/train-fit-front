const test = require("node:test");
const assert = require("node:assert/strict");

// premium-status.util.ts: si un usuario es PRO ahora mismo. Es la regla que
// usan la app cliente y management (listado de usuarios); tiene que dar lo
// mismo que el backend (feature-access-service#isEffectivelyEntitled).

let premium;

test.before(async () => {
  premium = await import("./premium-status.util.ts");
});

const NOW = Date.parse("2026-10-03T12:00:00.000Z");

test("isPremiumActive", async (t) => {
  await t.test("tiempo concedido vigente: PRO", () => {
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: "2026-10-04T12:00:00.000Z" }, NOW), true);
  });

  await t.test("se acabó el tiempo concedido aunque entitled siga a true: no PRO", () => {
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: "2026-10-03T11:59:59.999Z" }, NOW), false);
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: new Date(NOW) }, NOW), false, "justo en la fecha ya no");
  });

  await t.test("entitled=false: nunca PRO", () => {
    assert.equal(premium.isPremiumActive({ entitled: false, expiresAt: "2027-01-01T00:00:00.000Z" }, NOW), false);
  });

  await t.test("sin fecha (heredado): PRO si entitled", () => {
    assert.equal(premium.isPremiumActive({ entitled: true }, NOW), true);
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: null }, NOW), true);
  });

  await t.test("sin premium o fecha no válida: no PRO", () => {
    assert.equal(premium.isPremiumActive(null, NOW), false);
    assert.equal(premium.isPremiumActive(undefined, NOW), false);
    assert.equal(premium.isPremiumActive({}, NOW), false);
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: "no-es-fecha" }, NOW), false);
  });

  await t.test("por defecto compara con la hora actual", () => {
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: new Date(Date.now() + 60000) }), true);
    assert.equal(premium.isPremiumActive({ entitled: true, expiresAt: new Date(Date.now() - 60000) }), false);
  });
});

test("msUntilPremiumExpiry", () => {
  assert.equal(premium.msUntilPremiumExpiry({ entitled: true, expiresAt: "2026-10-03T13:00:00.000Z" }, NOW), 3600000);
  assert.equal(premium.msUntilPremiumExpiry({ entitled: true, expiresAt: "2026-10-03T11:00:00.000Z" }, NOW), null);
  assert.equal(premium.msUntilPremiumExpiry({ entitled: true }, NOW), null);
  assert.equal(premium.msUntilPremiumExpiry({ entitled: false, expiresAt: "2026-10-04T00:00:00.000Z" }, NOW), null);
});
