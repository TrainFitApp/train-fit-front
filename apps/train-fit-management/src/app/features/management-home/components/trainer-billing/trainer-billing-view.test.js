const test = require("node:test");
const assert = require("node:assert/strict");

// Facturación Trainers en Gestión: qué se ofrece hacer y qué datos pide cada acción.
let util;

test.before(async () => {
  util = await import("./trainer-billing-view.util.ts");
});

const detail = (account, cases = []) => ({ mode: "test", user: { id: "u1", email: "t@example.test" }, account, access: null,
  cases, interventions: [], links: null });
const account = (changes = {}) => ({ status: "active", tier: "trainer_growth", interval: "monthly", paidUntil: null,
  currentPeriodEnd: null, cancelAtPeriodEnd: false, customerId: "cus_1", subscriptionId: "sub_1", collectionPaused: false,
  hold: null, adjustments: [], renewal: null, change: null, termsAcceptance: null, deletedAt: null, ...changes });

test("solo se ofrecen las acciones que tienen sentido en el estado actual", () => {
  assert.deepEqual(util.availableActions(detail(account())), ["end_service_now", "cancel_renewal", "grant_access", "pause_collection"]);
  const held = util.availableActions(detail(account({ cancelAtPeriodEnd: true, hold: { kind: "dispute", since: "x", caseIds: [] } }),
    [{ status: "open", financed: { kind: "upgrade" } }]));
  assert.deepEqual(held, ["resolve_case", "end_service_now", "resume_renewal", "revert_upgrade", "grant_access", "resume_collection"]);
  assert.deepEqual(util.availableActions(detail(account({ status: "canceled", adjustments: [
    { id: "adj-1", kind: "grant", liftedAt: null }, { id: "adj-2", kind: "revoke_period", liftedAt: "2026-09-28" }] }))),
    ["grant_access", "end_grant"]);
  assert.deepEqual(util.availableActions(null), []);
});

test("el formulario exige motivo y los datos de cada acción", () => {
  const form = (changes) => ({ action: "cancel_renewal", reason: "Petición por email", caseId: "", until: "", tier: "trainer_pro", adjustmentId: "", ...changes });
  assert.equal(util.interventionProblem(form({})), null);
  assert.match(util.interventionProblem(form({ reason: " " })), /motivo/);
  assert.match(util.interventionProblem(form({ action: "resolve_case" })), /caso/);
  assert.match(util.interventionProblem(form({ action: "grant_access", until: "2001-01-01" })), /futura/);
  assert.equal(util.interventionProblem(form({ action: "grant_access", until: new Date(Date.now() + 86400000 * 3).toISOString() })), null);
  assert.match(util.interventionProblem(form({ action: "end_grant" })), /ajuste/);
});

test("cada pago se describe por lo que financió", () => {
  const base = { invoiceId: "in_1", interval: "monthly", periodStart: 1790000000, periodEnd: 1792600000, amountPaid: 2900, currency: "eur" };
  assert.match(util.financedLabel({ ...base, kind: "period", tier: "trainer_pro", fromTier: null }), /^Periodo Pro mensual · /);
  assert.match(util.financedLabel({ ...base, kind: "upgrade", tier: "trainer_growth", fromTier: "trainer_pro" }), /^Subida Pro → Growth mensual/);
  assert.equal(util.financedLabel({ ...base, kind: "unknown" }), "No identificado: revísalo en Stripe");
  assert.match(util.formatAmount(35937), /^359,37\s€$/);
  assert.ok(Object.keys(util.SUGGESTIONS).every((key) => util.SUGGESTED_ACTION[key]), "every suggestion maps to an action");
});
