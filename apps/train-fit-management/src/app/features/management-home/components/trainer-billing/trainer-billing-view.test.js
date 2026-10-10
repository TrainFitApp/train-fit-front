const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { buildSync } = require("esbuild");
const { esTable } = require("../../../../../../../../tests/i18n-es.cjs");

// Facturación Trainers en Gestión: qué se ofrece hacer y qué datos pide cada acción.
// El util traduce con el catálogo de la app (MANAGEMENT.BILLING.*): se compila con
// esbuild para resolver el alias src/app y se carga la tabla del idioma que toca.
const bundled = buildSync({
  stdin: {
    contents: "export * from './trainer-billing-view.util'; export { applyCatalogTranslations } from 'src/app/core/i18n/localized-catalog';",
    resolveDir: __dirname,
    loader: "ts",
  },
  tsconfig: path.resolve(__dirname, "../../../../../../tsconfig.json"),
  bundle: true, platform: "node", format: "cjs", write: false,
});
const compiled = new Module(__filename);
compiled._compile(bundled.outputFiles[0].text, __filename);
const util = compiled.exports;

const root = path.resolve(__dirname, "../../../../../../../..");
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const merge = (base, extra) => {
  const out = { ...base };
  for (const [key, value] of Object.entries(extra)) {
    out[key] = value && typeof value === "object" && !Array.isArray(value) && out[key] && typeof out[key] === "object" ? merge(out[key], value) : value;
  }
  return out;
};
const enTable = () => merge(read("packages/shared-core/src/assets/i18n/en.json"), read("apps/train-fit-management/src/assets/i18n/en.json"));

test.beforeEach(() => util.applyCatalogTranslations(esTable("train-fit-management"), "es"));

const detail = (account, cases = []) => ({ mode: "test", user: { id: "u1", email: "t@example.test" }, account, access: null,
  cases, interventions: [], links: null });
const account = (changes = {}) => ({ status: "active", tier: "professional", interval: "monthly", extraSeats: 0, paidUntil: null,
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
  const form = (changes) => ({ action: "cancel_renewal", reason: "Petición por email", caseId: "", until: "", tier: "starter", adjustmentId: "", ...changes });
  assert.equal(util.interventionProblem(form({})), null);
  assert.match(util.interventionProblem(form({ reason: " " })), /motivo/);
  assert.match(util.interventionProblem(form({ action: "resolve_case" })), /caso/);
  assert.match(util.interventionProblem(form({ action: "grant_access", until: "2001-01-01" })), /futura/);
  const future = new Date(Date.now() + 86400000 * 3).toISOString();
  assert.equal(util.interventionProblem(form({ action: "grant_access", until: future })), null);
  assert.match(util.interventionProblem(form({ action: "grant_access", until: future, tier: "free" })), /plan/, "Free no se concede");
  assert.deepEqual(Object.keys(util.PLAN_NAMES), ["starter", "professional", "scale"]);
  assert.match(util.interventionProblem(form({ action: "end_grant" })), /ajuste/);
});

test("cada pago se describe por lo que financió, con plan, periodicidad y plazas", () => {
  const base = { invoiceId: "in_1", periodStart: 1790000000, periodEnd: 1792600000, amountPaid: 2900, currency: "eur" };
  assert.match(util.financedLabel({ ...base, kind: "period", state: { tier: "starter", interval: "monthly", extraSeats: 0 }, fromState: null }),
    /^Periodo Inicio mensual · /);
  assert.match(util.financedLabel({ ...base, kind: "period", state: { tier: "free", interval: "monthly", extraSeats: 4 }, fromState: null }),
    /^Periodo Free \+ 4 plazas · /);
  assert.match(util.financedLabel({ ...base, kind: "upgrade", state: { tier: "starter", interval: "annual", extraSeats: 15 },
    fromState: { tier: "starter", interval: "annual", extraSeats: 5 } }), /^Subida Inicio anual \+ 5 plazas → Inicio anual \+ 15 plazas/);
  assert.match(util.financedLabel({ ...base, kind: "interval_change", state: { tier: "professional", interval: "annual", extraSeats: 0 },
    fromState: { tier: "professional", interval: "monthly", extraSeats: 0 } }), /^Paso a anual: Profesional mensual → Profesional anual/);
  assert.equal(util.financedLabel({ ...base, kind: "unknown", state: null, fromState: null }), "No identificado: revísalo en Stripe");
  assert.match(util.formatAmount(35937), /^359,37\s€$/);
  assert.ok(Object.keys(util.SUGGESTIONS).every((key) => util.SUGGESTED_ACTION[key]), "every suggestion maps to an action");
});

// La pantalla de Gestión estaba en español fijo; desde 2026-10-10 sigue el idioma de la app.
test("en inglés: catálogos, etiquetas, errores del formulario, importes y fechas", () => {
  util.applyCatalogTranslations(enTable(), "en");
  try {
    assert.equal(util.ACTION_LABELS.end_service_now, "End service now");
    assert.equal(util.KIND_LABELS.early_fraud_warning, "Fraud warning");
    assert.equal(util.planLabel("starter", "annual"), "Starter annual");
    assert.equal(util.stateLabel({ tier: "free", interval: "monthly", extraSeats: 4 }), "Free + 4 seats");
    assert.equal(util.financedLabel(null), "Not identified: check it in Stripe");
    assert.match(util.interventionProblem({ action: "", reason: "", caseId: "", until: "", tier: "", adjustmentId: "" }), /^Choose an action/);
    assert.match(util.formatAmount(35937), /^€359\.37$/);
    assert.match(util.formatDate("2026-10-10T10:00:00Z"), /^10 Oct 2026$/);
  } finally {
    util.applyCatalogTranslations(esTable("train-fit-management"), "es");
  }
  assert.equal(util.ACTION_LABELS.end_service_now, "Terminar servicio ahora", "volver al español restaura los textos");
});

test("los errores del back salen por su código en el idioma de la app, nunca con su texto", () => {
  assert.equal(util.adminErrorMessage({ status: 404, error: { code: "TRAINER_NOT_FOUND", message: "x" } }, "MANAGEMENT.BILLING.LOOKUP_ERROR"),
    "No hay ningún entrenador con ese email.");
  assert.equal(util.adminErrorMessage({ status: 500, error: { message: "Error interno del back" } }, "MANAGEMENT.BILLING.APPLY_ERROR"),
    "No se pudo aplicar la intervención. Queda registrada como fallida.");
  util.applyCatalogTranslations(enTable(), "en");
  try {
    assert.equal(util.adminErrorMessage({ status: 400, error: { code: "REASON_REQUIRED" } }, "MANAGEMENT.BILLING.APPLY_ERROR"),
      "Give the reason (3 to 300 characters).");
  } finally {
    util.applyCatalogTranslations(esTable("train-fit-management"), "es");
  }
});

test("todas las claves de catálogo de la pantalla existen en español y en inglés", () => {
  const es = read("apps/train-fit-management/src/assets/i18n/es.json").MANAGEMENT.BILLING;
  const en = enTable().MANAGEMENT.BILLING;
  const records = { PLANS: util.PLAN_NAMES, INTERVALS: util.INTERVAL_NAMES, KINDS: util.KIND_LABELS, DISPUTE_STATUS: util.DISPUTE_STATUS,
    REFUND_STATUS: util.REFUND_STATUS, ROLES: util.ROLE_LABELS, SUGGESTIONS: util.SUGGESTIONS, ACTIONS: util.ACTION_LABELS, ACTION_HELP: util.ACTION_HELP };
  for (const [prefix, record] of Object.entries(records)) {
    for (const key of Object.keys(record)) {
      assert.ok(es[prefix]?.[key], `falta MANAGEMENT.BILLING.${prefix}.${key} en es`);
      assert.ok(en[prefix]?.[key], `falta MANAGEMENT.BILLING.${prefix}.${key} en en`);
    }
  }
});
