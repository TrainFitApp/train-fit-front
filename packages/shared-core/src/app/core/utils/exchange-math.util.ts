// La aritmética de los intercambios de alimentos.
//
// LO QUE ESTO NO HACE, y sigue sin hacer: decidir equivalencias. La regla de
// fondo del componente es que el sistema no asume que 100 g de pollo equivalen
// a 120 g de pavo — eso depende del criterio del profesional (¿iguala
// proteína? ¿calorías? ¿volumen?) y del cliente concreto.
//
// Lo que SÍ hace: cuando el profesional YA ha decidido que su ración de
// hidratos son 15 g, contar cuántas raciones son los 30 g que pone en una
// etiqueta. Eso no es una decisión, es una división.
//
// Vivió en el backend (components/foodExchanges/exchange-math.js) sin que
// nadie lo llamara: las dos cuentas se ejecutaban reescritas a mano en las dos
// pantallas que las necesitan. Ahora vive donde se ejecuta, y las dos la
// comparten.
//
// SIN IMPORTS, a propósito — mismo motivo que body-metrics.util.ts: el test de
// al lado es node:test apuntado directo a este .ts, y Node solo puede
// importarlo si no hay nada que resolver más allá de quitar los tipos. Eso
// pide Node >= 22.6 (con 20 falla con ERR_UNKNOWN_FILE_EXTENSION).
//
// Las etiquetas de cada base ("Proteína", "Hidratos"...) NO están aquí: son
// texto de interfaz, y viven en el modelo de la pantalla que las pinta.

export type ExchangeBasis = 'protein' | 'carbs' | 'fat' | 'kcal';

/** Un grupo, reducido a lo que hace falta para dividir. */
export interface ExchangeBasisSource {
  basis?: ExchangeBasis | null;
  basisAmount?: number | null;
}

/** Un alimento del grupo, reducido a lo que hace falta para multiplicar. */
export interface ExchangeItemSource {
  name?: string;
  quantity?: number | null;
  unit?: string | null;
}

export interface ExchangeCount {
  exact: number;
  /** Lo que el profesional va a escribir en la pauta. */
  rounded: number;
}

export interface ExchangeAmount {
  quantity: number;
  unit: string;
  name: string;
}

// Media ración es la unidad más pequeña que se pauta de verdad. Se redondea a
// eso y no a decimales libres: "1,37 raciones de pan" no es una instrucción que
// nadie pueda seguir.
export const EXCHANGE_STEP = 0.5;

function isPositive(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function roundToStep(value: number): number {
  return Math.round(value / EXCHANGE_STEP) * EXCHANGE_STEP;
}

/**
 * Cuántas raciones del grupo son `amountOfBasis` unidades de su base.
 *
 * Devuelve null si el grupo no tiene base numérica: no es un 0, es que ese
 * grupo se definió como lista escrita a mano y no hay nada que dividir.
 * Devolver 0 se leería como "este producto no cuenta".
 */
export function exchangesFor(
  group: ExchangeBasisSource | null | undefined,
  amountOfBasis: unknown
): ExchangeCount | null {
  const basisAmount = group?.basisAmount;
  if (!group?.basis || !isPositive(basisAmount)) return null;
  if (!isPositive(amountOfBasis)) return null;

  const exact = amountOfBasis / basisAmount;
  return {
    exact: Math.round(exact * 100) / 100,
    rounded: roundToStep(exact),
  };
}

/**
 * Cuánto hay que comer de un ALIMENTO concreto del grupo para cubrir `count`
 * raciones.
 *
 * Aquí se ve que no se inventa nada: la cantidad de cada alimento la escribió
 * el profesional en el grupo (100 g de pollo, 120 g de pavo), y esto solo la
 * multiplica. Si él puso mal la equivalencia, sale mal — y eso es correcto,
 * porque la equivalencia es suya.
 */
export function amountForExchanges(
  item: ExchangeItemSource | null | undefined,
  count: unknown
): ExchangeAmount | null {
  const quantity = item?.quantity;
  if (!isPositive(quantity)) return null;
  if (typeof count !== 'number' || !Number.isFinite(count) || count < 0) return null;

  return {
    quantity: Math.round(quantity * count * 10) / 10,
    unit: item?.unit || 'g',
    name: item?.name || '',
  };
}
