// Numeración de CICLOS de una fase de nutrición — el badge C1/C2/C3 que sale
// arriba a la derecha de cada día en el calendario del entrenador.
//
// Ciclos por contenido (docs/plan-ciclos-por-contenido.md): cada doc de la
// fase trae `cycleDays` (lo que dura su contenido: days.length en
// sequential, 7 en recurring, choiceCycleDays en choice). Las ventanas se
// ENCADENAN desde el inicio de la fase: C(n) empieza el día después de que
// acabe C(n-1) y mide lo que mida el último doc persistido que ya había
// empezado en esa fecha — el mismo cálculo que hace el backend
// (cycle-window.js#windowsUntil).
//
// Sin imports a propósito: se prueba con node:test apuntado al .ts (mismo
// criterio que body-metrics.util.ts en shared-core), y eso solo funciona con
// un módulo sin dependencias.

export type CycleMode = 'sequential' | 'recurring' | 'choice';

export interface CycleAssignment {
  startDate: string; // "YYYY-MM-DD"
  // Fin REAL: null mientras sigue corriendo.
  endDate: string | null;
  mode?: CycleMode | null;
  daysCount?: number | null;
  choiceCycleDays?: number | null;
  // Días que dura un ciclo con el contenido de ESTE doc (lo manda el
  // backend). Si falta, se deriva de mode/daysCount/choiceCycleDays.
  cycleDays?: number | null;
}

export interface CycleWindowInfo {
  number: number;
  start: string;
  end: string;
  len: number;
}

const MS_PER_DAY = 86400000;
const DEFAULT_CYCLE_DAYS = 7;
// Solo protege de un bucle infinito por datos rotos, nunca debería tocarse.
const MAX_WINDOWS = 5000;

function toUtc(iso: string): number {
  return new Date(`${iso}T00:00:00.000Z`).getTime();
}

function addDays(iso: string, delta: number): string {
  const date = new Date(toUtc(iso));
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

/** Días que dura un ciclo con el contenido de esta asignación. */
export function contentCycleDays(assignment: CycleAssignment): number {
  const explicit = Number(assignment.cycleDays);
  if (Number.isFinite(explicit) && explicit >= 1) return Math.floor(explicit);
  if (assignment.mode === 'recurring') return 7;
  if (assignment.mode === 'choice') {
    const n = Number(assignment.choiceCycleDays);
    return Number.isFinite(n) && n >= 1 ? Math.floor(n) : DEFAULT_CYCLE_DAYS;
  }
  const days = Number(assignment.daysCount);
  return Number.isFinite(days) && days >= 1 ? Math.floor(days) : DEFAULT_CYCLE_DAYS;
}

function ordered(phaseCycles: CycleAssignment[]): CycleAssignment[] {
  return (phaseCycles || [])
    .filter((cycle) => !!cycle?.startDate)
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/** El doc persistido que rige en `date`: el último que ya había empezado. */
function overrideAt(cycles: CycleAssignment[], date: string): CycleAssignment | null {
  let found: CycleAssignment | null = null;
  for (const c of cycles) if (c.startDate <= date) found = c;
  return found;
}

/**
 * Ventanas de la fase desde C1 hasta la que contiene `date` (inclusive).
 * Vacío si la fase no tiene docs; solo C1 si `date` es anterior al inicio.
 *
 * @param phaseCycles  asignaciones de UNA MISMA fase (en cualquier orden)
 */
export function cycleWindowsUntil(date: string, phaseCycles: CycleAssignment[]): CycleWindowInfo[] {
  const cycles = ordered(phaseCycles);
  const head = cycles[0];
  if (!head) return [];
  const windows: CycleWindowInfo[] = [];
  let start = head.startDate;
  for (let number = 1; number <= MAX_WINDOWS; number++) {
    const len = contentCycleDays(overrideAt(cycles, start) || head);
    const end = addDays(start, len - 1);
    windows.push({ number, start, end, len });
    if (date <= end) break;
    start = addDays(end, 1);
  }
  return windows;
}

/**
 * Etiqueta de ciclo para `date` dentro de una fase.
 *
 * @returns "C3", o null si ese día no lo cubre ninguna asignación de la fase
 */
export function cycleLabelFor(date: string, phaseCycles: CycleAssignment[]): string | null {
  const number = cycleNumberFor(date, phaseCycles);
  return number === null ? null : `C${number}`;
}

/** Igual que cycleLabelFor pero devolviendo el número pelado (para tests/orden). */
export function cycleNumberFor(date: string, phaseCycles: CycleAssignment[]): number | null {
  const cycles = ordered(phaseCycles);
  if (!cycles.length) return null;

  // Solo días que de verdad cubre la fase: desde su inicio hasta el fin real
  // del último doc (null = sigue abierta).
  if (date < cycles[0].startDate) return null;
  const last = cycles[cycles.length - 1];
  if (last.endDate && last.endDate < date) return null;

  const windows = cycleWindowsUntil(date, cycles);
  return windows.length ? windows[windows.length - 1].number : null;
}
