import { Set } from 'src/app/core/models/set';

// Carga de una serie: la pautada (`expectedWeight`) y la levantada (`weight`)
// van por separado y nunca se mezclan (docs/domain.md). Hasta 2026-10 la
// pauta se guardaba en `weight` y el cliente la pisaba al apuntar lo suyo.

type LoadOf = Pick<Set, 'weight' | 'expectedWeight' | 'doned'>;

const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

/** La carga pautada, o null. */
export function prescribedWeight(set: LoadOf | null | undefined): number | null {
  return isNumber(set?.expectedWeight) ? set!.expectedWeight! : null;
}

/** La carga levantada, o null. */
export function liftedWeight(set: LoadOf | null | undefined): number | null {
  return isNumber(set?.weight) ? set!.weight! : null;
}

/**
 * La que se enseña en una tabla de pauta y ejecución: lo levantado si la serie
 * está hecha; si no, lo pautado.
 */
export function shownWeight(set: LoadOf | null | undefined): number | null {
  return set?.doned ? liftedWeight(set) : prescribedWeight(set);
}

/**
 * Lo que se guarda como levantado al marcar una serie hecha: lo que escribió
 * el cliente o, si dejó la casilla vacía, la carga pautada (la que veía
 * propuesta). Antes de marcarla, lo escrito tal cual.
 */
export function loggedWeight(typed: number | string | null | undefined, set: LoadOf | null | undefined, completing: boolean): number | null {
  const value = typed === '' || typed === null || typed === undefined ? null : Number(typed);
  if (value !== null && Number.isFinite(value)) return value;
  return completing ? prescribedWeight(set) : null;
}
