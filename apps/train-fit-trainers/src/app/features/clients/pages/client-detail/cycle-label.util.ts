// Numeración de VUELTAS de una fase de nutrición — el badge C1/C2/C3 que sale
// arriba a la derecha de cada día en el calendario del entrenador.
//
// Una "vuelta" es una pasada completa al contenido de la dieta:
//   · modo "sequential" (Día 1, 2, 3…): el bloque de días de la plantilla. Una
//     dieta de 4 días → días 1-4 = C1, 5-8 = C2, 9-12 = C3… (el plan se
//     resuelve así de verdad: plan-resolver.js hace days[elapsed % daysCount]).
//   · modos "recurring" (por día de la semana) y "choice" (el cliente elige):
//     no hay bloque que se repita, la vuelta real es la SEMANA natural. Se
//     ancla a lunes, que además es como se dibujan las filas del calendario,
//     así que el badge queda constante en cada fila.
//
// La cuenta NO se reinicia al abrir un ciclo de progresión (esos que crean una
// copia nueva con las kcal ajustadas): sigue dentro de la FASE, sumando lo que
// consumieron los ciclos anteriores. Solo vuelve a C1 en una fase nueva
// (phaseId distinto), y de eso se encarga quien llama pasando únicamente las
// asignaciones de una misma fase.
//
// Sin imports a propósito: se prueba con node:test apuntado al .ts (mismo
// criterio que body-metrics.util.ts en shared-core), y eso solo funciona con
// un módulo sin dependencias.

export type CycleMode = 'sequential' | 'recurring' | 'choice';

export interface CycleAssignment {
  startDate: string; // "YYYY-MM-DD"
  // Fin REAL: null mientras sigue corriendo. No se usa estimatedEndDate aquí
  // a propósito — la estimación no dice cuántas vueltas se dieron de verdad.
  endDate: string | null;
  mode?: CycleMode | null;
  daysCount?: number | null;
}

const MS_PER_DAY = 86400000;

function toUtc(iso: string): number {
  return new Date(`${iso}T00:00:00.000Z`).getTime();
}

function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((toUtc(toIso) - toUtc(fromIso)) / MS_PER_DAY);
}

/** Lunes de la semana que contiene esa fecha (ISO, semana L→D). */
function mondayOf(iso: string): string {
  const date = new Date(toUtc(iso));
  const weekday = date.getUTCDay(); // 0=domingo
  const offset = (weekday + 6) % 7; // lunes=0 … domingo=6
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

/** Días que abarca una vuelta en esta asignación. Semana en recurring/choice. */
function blockSize(assignment: CycleAssignment): number {
  if (assignment.mode === 'recurring' || assignment.mode === 'choice') return 7;
  // Una dieta sin días (borrador) no puede dar vueltas de 0 días: se trata
  // como de 1 para no dividir entre cero.
  return Math.max(1, assignment.daysCount || 1);
}

/** Ancla desde la que se cuentan las vueltas de esta asignación. */
function anchorOf(assignment: CycleAssignment): string {
  return assignment.mode === 'recurring' || assignment.mode === 'choice'
    ? mondayOf(assignment.startDate)
    : assignment.startDate;
}

/** En qué vuelta (1, 2, 3…) de ESTA asignación cae `date`. */
function localCycle(assignment: CycleAssignment, date: string): number {
  const elapsed = daysBetween(anchorOf(assignment), date);
  return Math.floor(elapsed / blockSize(assignment)) + 1;
}

/**
 * Vueltas que consumió una asignación ya terminada. Una vuelta a medias cuenta
 * como consumida: si la fase cambió de ciclo a mitad de la semana 3, la
 * siguiente empieza en la 4 — nunca se repite un número hacia atrás.
 */
function consumedCycles(assignment: CycleAssignment, lastDay: string): number {
  return localCycle(assignment, lastDay);
}

/**
 * Etiqueta de vuelta para `date` dentro de una fase.
 *
 * @param date           día a etiquetar ("YYYY-MM-DD")
 * @param phaseCycles    asignaciones de UNA MISMA fase (en cualquier orden)
 * @returns "C3", o null si ese día no lo cubre ninguna
 */
export function cycleLabelFor(date: string, phaseCycles: CycleAssignment[]): string | null {
  const number = cycleNumberFor(date, phaseCycles);
  return number === null ? null : `C${number}`;
}

/** Igual que cycleLabelFor pero devolviendo el número pelado (para tests/orden). */
export function cycleNumberFor(date: string, phaseCycles: CycleAssignment[]): number | null {
  const ordered = (phaseCycles || [])
    .filter((cycle) => !!cycle?.startDate)
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  if (!ordered.length) return null;

  // El que cubre la fecha. Si varios la cubren (datos inconsistentes), gana el
  // que empezó más tarde: es el que de verdad rige ese día.
  let coveringIndex = -1;
  for (let i = 0; i < ordered.length; i++) {
    const cycle = ordered[i];
    const empezó = cycle.startDate <= date;
    const sigueVivo = !cycle.endDate || cycle.endDate >= date;
    if (empezó && sigueVivo) coveringIndex = i;
  }
  if (coveringIndex === -1) return null;

  // Lo que ya consumieron los ciclos anteriores de esta misma fase. Cada uno
  // duró hasta su fin real o, si nunca se estampó, hasta la víspera del
  // siguiente (que es lo mismo, pero reconstruido).
  let consumed = 0;
  for (let i = 0; i < coveringIndex; i++) {
    const cycle = ordered[i];
    const siguiente = ordered[i + 1];
    const lastDay = cycle.endDate || isoBefore(siguiente.startDate);
    // Un ciclo que ni llegó a empezar (sustituido el mismo día) no suma.
    if (lastDay < cycle.startDate) continue;
    consumed += consumedCycles(cycle, lastDay);
  }

  return consumed + localCycle(ordered[coveringIndex], date);
}

function isoBefore(iso: string): string {
  const date = new Date(toUtc(iso));
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}
