import { MACRO_KEYS, MacroKey, MacroTotals } from './alternative-macros';

// Margen con el que un menú se da por bueno contra el objetivo del cliente.
// No hay un estándar: ±100 kcal es el escalón con el que ya trabaja el cajón
// de sugerencias (mueve el delta de 100 en 100) y ±10 g es el grano al que
// se pauta una comida.
export const TARGET_TOLERANCE = { kcal: 100, macro: 10 };

// Desvío de unos totales respecto al objetivo, redondeado como se pinta.
export function targetDeviation(totals: MacroTotals, target: MacroTotals): MacroTotals {
  return {
    kcal: Math.round(totals.kcal - target.kcal),
    protein: Math.round(totals.protein - target.protein),
    carbs: Math.round(totals.carbs - target.carbs),
    fat: Math.round(totals.fat - target.fat),
  };
}

export function isWithinTarget(delta: number, key: MacroKey): boolean {
  return Math.abs(delta) <= (key === 'kcal' ? TARGET_TOLERANCE.kcal : TARGET_TOLERANCE.macro);
}

// Un menú cuadra cuando las kcal y los tres macros caen dentro del margen.
export function fitsTarget(totals: MacroTotals, target: MacroTotals): boolean {
  const deviation = targetDeviation(totals, target);
  return MACRO_KEYS.every((key) => isWithinTarget(deviation[key], key));
}
