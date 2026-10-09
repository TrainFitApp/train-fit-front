import { compareChain } from '../models/phase-state';

// Desde qué día puede empezar una fase de dieta nueva. Lo usa el calendario
// de la ficha cuando sirve para elegir ese día (ver PhaseStartSheetComponent):
// qué días se pueden pulsar, cuál se propone y qué le pasa a la fase que ya
// había.

export interface PhaseSpan {
  startDate: string;
  // Fin REAL: null mientras sigue abierta.
  endDate: string | null;
  // Desempata dos fases con el mismo inicio (ver compareChain).
  createdAt?: string;
}

// Qué pasa si la fase nueva empieza ese día:
// - free: ninguna fase lo cubre ni choca con él.
// - replaces: la fase que rige ese día se corta el día anterior (o, si
//   empezaba ese mismo día, queda sustituida).
// - blocked: no se puede; `phase` es la que lo impide.
export type PhaseStartVerdict<T extends PhaseSpan> =
  | { kind: 'free' }
  | { kind: 'replaces'; phase: T }
  | { kind: 'blocked'; phase: T };

// Suma días a un "YYYY-MM-DD" (aritmética en UTC: sin horas de por medio).
export function addIsoDays(iso: string, days: number): string {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-');
}

// "13 oct" o "lunes, 13 de octubre": un "YYYY-MM-DD" en el idioma que se
// pida, sin que la zona horaria del dispositivo lo mueva de día.
export function formatIsoDay(iso: string, locale: string, options: Intl.DateTimeFormatOptions): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { ...options, timeZone: 'UTC' });
}

const covers = (phase: PhaseSpan, date: string): boolean =>
  phase.startDate <= date && (phase.endDate === null || phase.endDate >= date);

// La que rige en `date` (con dos del mismo inicio, la más reciente), o null.
// Misma regla que util/phase-chain.js#coveringPhase en el backend.
export function coveringPhase<T extends PhaseSpan>(phases: T[], date: string): T | null {
  let found: T | null = null;
  for (const phase of phases) {
    if (covers(phase, date) && (!found || compareChain(phase, found) > 0)) found = phase;
  }
  return found;
}

/**
 * La regla del backend al crear una fase (diet-phase-service.js#reserveSlot y
 * #blocksNewPhase), para no dejar elegir un día que acabaría en 409:
 * - Un día futuro solo vale si ninguna fase llega hasta él: una fase abierta
 *   ocupa todo lo que viene, y programar encima de otra no se puede.
 * - Hoy (o antes) solo lo impide una fase programada más adelante (la nueva
 *   queda abierta y se la comería). La que rige ese día se corta, y una que
 *   se sustituyó el mismo día en que empezó (tapada por la más reciente) no
 *   cuenta.
 *
 * Y una restricción propia: un día PASADO que ya regía otra fase es historial
 * del cliente. El backend lo aceptaría (cortándola hacia atrás), pero desde
 * aquí solo se sustituye la fase en curso a partir de hoy.
 *
 * Si lo impiden varias, se nombra la que rige ese día o, si no, la primera
 * que empieza después: es la que hay que mover para dejarlo libre.
 */
export function phaseStartVerdict<T extends PhaseSpan>(date: string, phases: T[], today: string): PhaseStartVerdict<T> {
  const covering = coveringPhase(phases, date);
  if (covering && date < today) return { kind: 'blocked', phase: covering };

  const clashes = phases.filter(
    (phase) => (phase.endDate === null || phase.endDate >= date) && (date > today || phase.startDate > date)
  );
  if (clashes.length) {
    const clash = clashes.includes(covering as T) ? (covering as T) : clashes.slice().sort(compareChain)[0];
    return { kind: 'blocked', phase: clash };
  }
  return covering ? { kind: 'replaces', phase: covering } : { kind: 'free' };
}

// El día que se propone al abrir: hoy si se puede y, si no, el primero libre
// más adelante. Un hueco libre solo puede abrirse el día siguiente al fin de
// alguna fase, así que basta con mirar esos días. null si no queda ninguno
// (una fase abierta que todavía no ha empezado lo ocupa todo).
export function firstStartDate(phases: PhaseSpan[], today: string): string | null {
  const candidates = [today, ...phases.filter((phase) => phase.endDate !== null).map((phase) => addIsoDays(phase.endDate!, 1))]
    .filter((date) => date >= today)
    .sort();
  return candidates.find((date) => phaseStartVerdict(date, phases, today).kind !== 'blocked') ?? null;
}

// Días sin plan entre la fase anterior y una que empieza en `date`, o null si
// la nueva empieza justo al acabar la anterior (o no hay anterior).
export function gapBefore(date: string, phases: PhaseSpan[]): { from: string; to: string } | null {
  const previous = phases.filter((phase) => phase.startDate < date).sort(compareChain).pop();
  if (!previous || previous.endDate === null) return null;
  const from = addIsoDays(previous.endDate, 1);
  const to = addIsoDays(date, -1);
  return from <= to ? { from, to } : null;
}
