import { TemplateMealAlternative } from '../models/diet-template.model';

export interface MacroTotals {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MacroKey = keyof MacroTotals;

export const MACRO_KEYS: MacroKey[] = ['kcal', 'protein', 'carbs', 'fat'];

// Suma de macros de una alternativa. kcal/protein/carbs/fat de cada
// TemplateFoodItem ya vienen calculados para su quantity actual (mismo
// snapshot que pinta el resto del constructor). Devuelve null (y no un
// total de ceros) cuando la alternativa aún no tiene ningún alimento
// elegido — así la fila de macros no aparece vacía mientras se compone.
export function alternativeTotals(alt: TemplateMealAlternative): MacroTotals | null {
  const items = (alt.items || []).filter((item) => item.productId || item.recipeId);
  if (!items.length) return null;
  const totals: MacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  for (const item of items) {
    totals.kcal += item.kcal || 0;
    totals.protein += item.protein || 0;
    totals.carbs += item.carbs || 0;
    totals.fat += item.fat || 0;
  }
  return totals;
}

export interface MacroDeviation {
  delta: number;
  flagged: boolean;
}

export type AlternativeDeviation = Record<MacroKey, MacroDeviation>;

// Las opciones de una comida deberían ser intercambiables: el cliente elige
// por gusto, no por macros. Se avisa cuando una opción se separa de la de
// referencia más de un 10 %, con un suelo absoluto para que 2 g de grasa
// sobre 8 g no salten como "desviación" — a esa escala no cambia nada.
export const DEVIATION_PCT_TOLERANCE = 0.1;
const DEVIATION_ABS_FLOOR: MacroTotals = { kcal: 15, protein: 2, carbs: 2, fat: 2 };

export function macroDeviation(totals: MacroTotals, reference: MacroTotals): AlternativeDeviation {
  const result = {} as AlternativeDeviation;
  for (const key of MACRO_KEYS) {
    const delta = totals[key] - reference[key];
    const tolerance = Math.max(Math.abs(reference[key]) * DEVIATION_PCT_TOLERANCE, DEVIATION_ABS_FLOOR[key]);
    result[key] = { delta, flagged: Math.abs(delta) > tolerance };
  }
  return result;
}
