import { localizeRecord, uiLocale, uiText } from 'src/app/core/i18n/localized-catalog';

// PURO: textos y reglas de la pantalla de Facturación Trainers (Gestión). Los
// catálogos guardan el texto en español y se traducen en caliente con
// `localizeRecord` (MANAGEMENT.BILLING.*), como el resto de la app.

export type AdminAction = 'resolve_case' | 'end_service_now' | 'cancel_renewal' | 'resume_renewal' | 'revert_upgrade' |
  'grant_access' | 'end_grant' | 'restore_period_access' | 'pause_collection' | 'resume_collection';
export type CaseKind = 'refund' | 'dispute' | 'early_fraud_warning';
export type FundingRole = 'current_period' | 'current_upgrade' | 'past' | 'unknown';

// Aceptación de las condiciones: al contratar (Checkout) o al confirmar un cambio en la app; la URL es la versión.
export interface AdminTermsAcceptance { at: string; via: 'checkout' | 'change'; ref: string; termsUrl: string | null }
// Plan, periodicidad y plazas adicionales que financiaba un pago.
export interface AdminPlanState { tier: string; interval: string; extraSeats: number }
export interface AdminFinanced {
  kind: 'period' | 'upgrade' | 'interval_change' | 'unknown';
  invoiceId: string | null;
  state: AdminPlanState | null;
  fromState: AdminPlanState | null;
  periodStart: number;
  periodEnd: number;
  amountPaid: number;
  currency: string;
}
export interface AdminRefund { id: string; amount: number; status: string; reason: string | null; failureReason: string | null; createdAt: string }
export interface AdminCase {
  caseId: string;
  userId: string;
  email?: string | null;
  kind: CaseKind;
  status: 'open' | 'resolved';
  priority: 'high' | 'normal';
  chargeId: string | null;
  financed: AdminFinanced | null;
  role: FundingRole;
  amount: number;
  currency: string;
  fullyRefunded?: boolean;
  refunds?: AdminRefund[];
  disputeId?: string | null;
  disputeStatus?: string | null;
  disputeReason?: string | null;
  dueBy?: string | null;
  fraudType?: string | null;
  effects: string[];
  suggestion: string;
  notes: string[];
  openedAt: string;
  updatedAt?: string;
  resolution?: { action: AdminAction; reason: string; note: string | null; by: { id: string; email: string | null }; at: string } | null;
}
export interface AdminAdjustment {
  id: string;
  kind: 'revoke_period' | 'grant';
  from: string | null;
  until: string | null;
  tier: string | null;
  reason: string;
  source: 'admin' | 'dispute_lost';
  createdAt: string;
  liftedAt: string | null;
}
export interface AdminSnapshot { status: string; tier: string | null; interval: string | null; paidUntil: string | null; cancelAtPeriodEnd: boolean; entitled: boolean; expiresAt: string | null; collectionPaused: boolean }
export interface AdminIntervention {
  interventionId: string;
  action: AdminAction;
  reason: string;
  note: string | null;
  caseId: string | null;
  by: { id: string; email: string | null };
  at: string;
  status: 'pending' | 'applied' | 'failed';
  error: string | null;
  before: AdminSnapshot | null;
  after: AdminSnapshot | null;
}
export interface AdminTrainerDetail {
  mode: 'test' | 'live';
  user: { id: string; email: string };
  account: {
    status: string;
    tier: string | null;
    interval: string | null;
    extraSeats: number;
    paidUntil: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    customerId: string | null;
    subscriptionId: string | null;
    collectionPaused: boolean;
    hold: { kind: 'dispute' | 'admin'; since: string; caseIds: string[] } | null;
    adjustments: AdminAdjustment[];
    renewal: { at: string; amount: number } | null;
    change: { status: string; from: AdminPlanState; to: AdminPlanState; effectiveAt: string } | null;
    termsAcceptance: AdminTermsAcceptance | null;
    termsHistory?: AdminTermsAcceptance[];
    deletedAt: string | null;
  } | null;
  access: { entitled: boolean; tier: string | null; interval: string | null; seats?: number; expiresAt: string | null; basis: 'payment' | 'exception' | 'none'; revokedUntil: string | null } | null;
  cases: AdminCase[];
  interventions: AdminIntervention[];
  links: { customer: string; subscription: string | null } | null;
}

// Planes que se pueden conceder como excepción (Free no se concede: es lo que queda sin pago).
export const PLAN_NAMES: Record<string, string> = { starter: 'Inicio', professional: 'Profesional', scale: 'Escala' };
export const INTERVAL_NAMES: Record<string, string> = { monthly: 'mensual', annual: 'anual' };
export const KIND_LABELS: Record<CaseKind, string> = { refund: 'Reembolso', dispute: 'Disputa', early_fraud_warning: 'Aviso de fraude' };
export const DISPUTE_STATUS: Record<string, string> = {
  warning_needs_response: 'Consulta pendiente de respuesta', warning_under_review: 'Consulta en revisión', warning_closed: 'Consulta cerrada',
  needs_response: 'Pendiente de respuesta', under_review: 'En revisión del banco', won: 'Ganada', lost: 'Perdida', prevented: 'Evitada',
};
export const REFUND_STATUS: Record<string, string> = {
  succeeded: 'Completado', pending: 'Pendiente', requires_action: 'Requiere acción', failed: 'Fallido', canceled: 'Cancelado',
};
export const ROLE_LABELS: Record<FundingRole, string> = {
  current_period: 'Financia el periodo vigente', current_upgrade: 'Financia la subida vigente',
  past: 'Periodo ya terminado', unknown: 'No se sabe qué derechos financia',
};
// Qué hacer con cada caso (lo decide una persona; el sistema no cambia el acceso por un reembolso).
export const SUGGESTIONS: Record<string, string> = {
  decide_end_or_keep: 'Reembolso total del periodo vigente. Si se devolvió para dar de baja, usa «Terminar servicio ahora». Si fue un duplicado o una compensación, mantén el acceso y resuelve el caso.',
  revert_upgrade: 'Reembolso de una subida de plan. Para deshacerla usa «Revertir subida»: vuelve al plan anterior sin cobro y respeta el periodo ya pagado.',
  keep_access: 'Reembolso parcial o de un periodo pasado: normalmente se mantiene el acceso. Registra el motivo y resuelve el caso.',
  check_failed_refund: 'Un reembolso ha fallado: el dinero no ha vuelto al cliente. Revísalo en Stripe y repítelo si procede.',
  respond_dispute: 'Disputa abierta: los cobros están en pausa y el acceso se mantiene. Responde en Stripe antes de la fecha límite.',
  decide_collection: 'Disputa cerrada. Decide si reanudar los cobros («Reanudar cobros») o cancelar la renovación, y resuelve el caso.',
  review_fraud_warning: 'El banco avisa de posible fraude. Valora reembolsar como fraude en Stripe y terminar el servicio para evitar una disputa.',
  manual_review: 'No se ha podido saber qué financiaba el pago. Revísalo en Stripe antes de tocar el acceso.',
};
// Acción que aplica cada sugerencia al elegir «Usar este caso».
export const SUGGESTED_ACTION: Record<string, AdminAction> = {
  decide_end_or_keep: 'resolve_case', revert_upgrade: 'revert_upgrade', keep_access: 'resolve_case', check_failed_refund: 'resolve_case',
  respond_dispute: 'resolve_case', decide_collection: 'resume_collection', review_fraud_warning: 'resolve_case', manual_review: 'resolve_case',
};
export const ACTION_LABELS: Record<AdminAction, string> = {
  resolve_case: 'Resolver caso', end_service_now: 'Terminar servicio ahora', cancel_renewal: 'Cancelar renovación',
  resume_renewal: 'Reactivar renovación', revert_upgrade: 'Revertir subida', grant_access: 'Conceder acceso hasta una fecha',
  end_grant: 'Retirar excepción', restore_period_access: 'Devolver acceso del periodo', pause_collection: 'Pausar cobros',
  resume_collection: 'Reanudar cobros',
};
// Qué hace cada acción con el dinero, la suscripción y el acceso (se muestra antes de confirmar).
export const ACTION_HELP: Record<AdminAction, string> = {
  resolve_case: 'Cierra el caso con tu motivo. No mueve dinero ni cambia la suscripción ni el acceso.',
  end_service_now: 'Cancela la suscripción en Stripe ya, sin prorrateo ni factura final. El acceso de pago termina hoy y los datos se conservan. No reembolsa nada: el reembolso se hace en Stripe.',
  cancel_renewal: 'La suscripción no se renovará. Conserva el acceso hasta el final del periodo pagado. No reembolsa nada.',
  resume_renewal: 'La suscripción vuelve a renovarse al final del periodo.',
  revert_upgrade: 'Vuelve al plan anterior sin prorrateo: no se cobra ni se abona nada y se respeta el periodo base ya pagado. Los clientes que excedan el cupo pasan a solo lectura.',
  grant_access: 'Concede acceso de pago hasta la fecha indicada sin fingir un cobro. Queda registrado y se puede retirar.',
  end_grant: 'Retira la excepción de acceso elegida.',
  restore_period_access: 'Devuelve el acceso de pago de un periodo retirado por una disputa perdida.',
  pause_collection: 'Stripe deja de cobrar: las facturas nuevas quedan en borrador y se pausan los reintentos. El acceso ya pagado no cambia.',
  resume_collection: 'Stripe vuelve a cobrar: se reactivan los reintentos pausados y se cobra el periodo vigente. Los periodos pasados en pausa no se cobran.',
};

localizeRecord(PLAN_NAMES, 'MANAGEMENT.BILLING.PLANS');
localizeRecord(INTERVAL_NAMES, 'MANAGEMENT.BILLING.INTERVALS');
localizeRecord(KIND_LABELS, 'MANAGEMENT.BILLING.KINDS');
localizeRecord(DISPUTE_STATUS, 'MANAGEMENT.BILLING.DISPUTE_STATUS');
localizeRecord(REFUND_STATUS, 'MANAGEMENT.BILLING.REFUND_STATUS');
localizeRecord(ROLE_LABELS, 'MANAGEMENT.BILLING.ROLES');
localizeRecord(SUGGESTIONS, 'MANAGEMENT.BILLING.SUGGESTIONS');
localizeRecord(ACTION_LABELS, 'MANAGEMENT.BILLING.ACTIONS');
localizeRecord(ACTION_HELP, 'MANAGEMENT.BILLING.ACTION_HELP');

// Importes y fechas en el idioma de la app; la hora, siempre la de España
// (la facturación de Trainers es de TrainFit, en España).
export function formatAmount(cents: number | null | undefined): string {
  return typeof cents === 'number' ? new Intl.NumberFormat(uiLocale(), { style: 'currency', currency: 'EUR' }).format(cents / 100) : '—';
}
export function formatDate(value: string | number | Date | null | undefined, withTime = false): string {
  if (value === null || value === undefined || value === '') return '—';
  const date = typeof value === 'number' ? new Date(value * 1000) : new Date(value);
  if (!Number.isFinite(date.getTime())) return '—';
  return new Intl.DateTimeFormat(uiLocale(), {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Madrid',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(date);
}
export function planLabel(tier: string | null | undefined, interval?: string | null): string {
  if (!tier) return 'Free';
  const name = PLAN_NAMES[tier] || tier;
  return interval ? `${name} ${INTERVAL_NAMES[interval] || interval}` : name;
}
// "Inicio mensual + 5 plazas".
export function stateLabel(state: AdminPlanState | null | undefined): string {
  if (!state) return '—';
  const extras = state.extraSeats ? uiText('MANAGEMENT.BILLING.EXTRA_SEATS', { count: state.extraSeats }) : '';
  return `${state.tier === 'free' ? 'Free' : planLabel(state.tier, state.interval)}${extras}`;
}
export function financedLabel(financed: AdminFinanced | null | undefined): string {
  if (!financed || financed.kind === 'unknown') return uiText('MANAGEMENT.BILLING.FINANCED_UNKNOWN');
  const period = `${formatDate(financed.periodStart)} – ${formatDate(financed.periodEnd)}`;
  const from = stateLabel(financed.fromState);
  const to = stateLabel(financed.state);
  if (financed.kind === 'upgrade') return uiText('MANAGEMENT.BILLING.FINANCED_UPGRADE', { from, to, period });
  if (financed.kind === 'interval_change') return uiText('MANAGEMENT.BILLING.FINANCED_INTERVAL', { from, to, period });
  return uiText('MANAGEMENT.BILLING.FINANCED_PERIOD', { state: to, period });
}

// Acciones con sentido para el estado actual (el backend vuelve a comprobarlo todo).
export function availableActions(detail: AdminTrainerDetail | null): AdminAction[] {
  if (!detail) return [];
  const account = detail.account;
  const live = Boolean(account?.subscriptionId && !account.deletedAt && !['canceled', 'incomplete_expired'].includes(account.status));
  const open = detail.cases.some((entry) => entry.status === 'open');
  const upgrade = (account?.change?.status === 'applied' && account.change.from.interval === account.change.to.interval) ||
    detail.cases.some((entry) => entry.status === 'open' && entry.financed?.kind === 'upgrade');
  const adjustments = account?.adjustments || [];
  const actions: AdminAction[] = [];
  if (open) actions.push('resolve_case');
  if (live) actions.push('end_service_now');
  if (live && !account!.cancelAtPeriodEnd) actions.push('cancel_renewal');
  if (live && account!.cancelAtPeriodEnd) actions.push('resume_renewal');
  if (live && upgrade) actions.push('revert_upgrade');
  actions.push('grant_access');
  if (adjustments.some((entry) => entry.kind === 'grant' && !entry.liftedAt)) actions.push('end_grant');
  if (adjustments.some((entry) => entry.kind === 'revoke_period' && !entry.liftedAt)) actions.push('restore_period_access');
  if (live && !account!.hold) actions.push('pause_collection');
  if (account?.hold) actions.push('resume_collection');
  return actions;
}

// El motivo es obligatorio (3–300 caracteres) y algunas acciones piden datos concretos.
// Devuelve el texto ya traducido, o null si se puede enviar.
export function interventionProblem(form: { action: string; reason: string; caseId: string; until: string; tier: string; adjustmentId: string }): string | null {
  const problem = (key: string): string => uiText(`MANAGEMENT.BILLING.PROBLEMS.${key}`);
  if (!form.action) return problem('ACTION');
  const reason = form.reason.trim();
  if (reason.length < 3 || reason.length > 300) return problem('REASON');
  if (form.action === 'resolve_case' && !form.caseId) return problem('CASE');
  if (form.action === 'grant_access') {
    const until = Date.parse(form.until);
    if (!Number.isFinite(until) || until <= Date.now()) return problem('FUTURE_DATE');
    if (!PLAN_NAMES[form.tier]) return problem('PLAN');
  }
  if ((form.action === 'end_grant' || form.action === 'restore_period_access') && !form.adjustmentId) return problem('ADJUSTMENT');
  return null;
}

// Códigos que devuelven las rutas de admin de trainerBilling (adapter.js y
// service.ts#intervene) con texto propio en MANAGEMENT.BILLING.ERRORS.
export const ADMIN_ERROR_CODES = [
  'CASE_NOT_FOUND', 'ADJUSTMENT_NOT_FOUND', 'ALREADY_PAUSED', 'NOT_PAUSED', 'NOT_REVERTIBLE', 'SUBSCRIPTION_NOT_ACTIVE',
  'CASE_REQUIRED', 'INVALID_ACTION', 'INVALID_ADJUSTMENT', 'INVALID_CASE', 'INVALID_TIER', 'INVALID_UNTIL', 'REASON_REQUIRED',
  'INVALID_EMAIL', 'INVALID_USER', 'TRAINER_NOT_FOUND', 'USER_NOT_FOUND', 'ADMIN_UNAVAILABLE', 'BILLING_BUSY',
  'BILLING_UNAVAILABLE', 'BILLING_REVIEW_REQUIRED', 'CONTROL_REJECTED', 'CHANGE_REJECTED',
];

// Error del back en el idioma de la app: por su código si es uno conocido, si
// no, el texto genérico de la operación (nunca el mensaje en español del back).
export function adminErrorMessage(error: unknown, fallbackKey: string): string {
  const code = (error as { error?: { code?: unknown } } | null)?.error?.code;
  if (typeof code === 'string' && ADMIN_ERROR_CODES.includes(code)) return uiText(`MANAGEMENT.BILLING.ERRORS.${code}`);
  return uiText(fallbackKey);
}
