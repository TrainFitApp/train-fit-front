import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { ClientCharge, ClientFeePlan } from './professional-payments.model';
import { ProfessionalScope } from './professional-relation.model';

// PURO — cómo se pintan los modales "Tus planes" y "Tus profesionales" del
// tab Coach: fechas, estado de cada cobro y frecuencia de la cuota. Sin
// Angular, con su test (coach-sheets-view.test.cjs).

const CIVIL_DAY = /^\d{4}-\d{2}-\d{2}/;

function formatDay(date: Date, withYear: boolean, timeZone?: string): string {
  return new Intl.DateTimeFormat(uiLocale(), {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
    ...(timeZone ? { timeZone } : {}),
  })
    .format(date)
    .replace('.', '');
}

// Día civil "YYYY-MM-DD" → "5 nov", con el año solo si no es el de `today`
// (un historial puede venir de otro año). Nunca lo mueve la zona del
// dispositivo.
export function civilDayLabel(value: string | null | undefined, today?: string | null): string {
  if (typeof value !== 'string' || !CIVIL_DAY.test(value)) return '';
  const day = value.slice(0, 10);
  const withYear = !today || today.slice(0, 4) !== day.slice(0, 4);
  return formatDay(new Date(`${day}T12:00:00Z`), withYear, 'UTC');
}

// Instante (fecha ISO completa, p. ej. desde cuándo trabajáis juntos) → día
// en la zona del dispositivo, siempre con año.
export function instantDayLabel(value: string | null | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return formatDay(date, true);
}

export type ChargeState = 'paid' | 'cancelled' | 'overdue' | 'due_today' | 'upcoming';

// Qué se le dice al cliente de un cobro. El estado manda sobre la fecha: un
// cobro pagado ya no está "vencido" aunque su vencimiento pasara.
export function chargeState(charge: Pick<ClientCharge, 'status' | 'temporal'>): ChargeState {
  if (charge.status === 'settled') return 'paid';
  if (charge.status === 'cancelled') return 'cancelled';
  if (charge.temporal === 'overdue') return 'overdue';
  if (charge.temporal === 'due_today') return 'due_today';
  return 'upcoming';
}

// La fecha junto al cobro: "Vence hoy", "Venció el 5 oct", "Vence el 5 nov".
// Lo pagado o anulado ya no vence (QA 2026-10-09: seguía con «Vence hoy»):
// solo se dice cuándo vencía.
export function chargeDueKey(charge: Pick<ClientCharge, 'status' | 'dueDay'>, today: string): string {
  if (charge.status === 'settled' || charge.status === 'cancelled') return 'COACH_SHEETS.DUE_DATE';
  if (charge.dueDay === today) return 'COACH_SHEETS.CHARGE_DUE_TODAY';
  return charge.dueDay < today ? 'COACH_SHEETS.DUE_PAST' : 'COACH_SHEETS.DUE_FUTURE';
}

// Pagado algo, pero aún queda: "Pagado 20,00 € de 60,00 €".
export function isPartial(charge: Pick<ClientCharge, 'status' | 'receivedCents' | 'balanceCents'>): boolean {
  return charge.status === 'open' && charge.receivedCents > 0 && charge.balanceCents > 0;
}

// Anulado después de pagar una parte: tachar el total engañaría, lo pagado
// sí se pagó. Se dice "Pagaste 20,00 € · resto anulado".
export function isPartlyCancelled(charge: Pick<ClientCharge, 'status' | 'receivedCents'>): boolean {
  return charge.status === 'cancelled' && charge.receivedCents > 0;
}

// "al mes", "cada 2 semanas"… como clave de i18n con sus parámetros.
export function feeFrequency(plan: Pick<ClientFeePlan, 'unit' | 'interval'>): { key: string; params: { n: number } } {
  const n = Math.max(1, Math.round(plan.interval || 1));
  if (plan.unit === 'week') return { key: n === 1 ? 'COACH_SHEETS.FEE_WEEKLY' : 'COACH_SHEETS.FEE_EVERY_WEEKS', params: { n } };
  return { key: n === 1 ? 'COACH_SHEETS.FEE_MONTHLY' : 'COACH_SHEETS.FEE_EVERY_MONTHS', params: { n } };
}

// "AB" de "Ana Bermúdez"; "?" sin nombre.
export function initials(name: string | null | undefined): string {
  return (
    String(name || '')
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?'
  );
}

export function scopeLabelKey(scope: ProfessionalScope): string {
  return scope === 'training' ? 'ONBOARDING.SCOPE_TRAINING' : 'ONBOARDING.SCOPE_NUTRITION';
}

// Mismo par de iconos que el resto de la app para estos dos ámbitos.
export function scopeIcon(scope: ProfessionalScope): string {
  return scope === 'training' ? 'barbell-outline' : 'nutrition-outline';
}
