// PURO — la aritmética de la adición rápida (QuickAddSheetComponent), fuera
// del componente para poder probarla sin Angular, mismo criterio que
// shopping-list.util.ts y body-metrics.util.ts.

/** 4 kcal/g de proteína y de carbohidrato, 9 kcal/g de grasa (Atwater). */
export const KCAL_PER_GRAM = { protein: 4, carbs: 4, fat: 9 } as const;

export interface QuickAddMacroInput {
  kcal?: unknown;
  protein?: unknown;
  carbs?: unknown;
  fat?: unknown;
}

/**
 * Lo que escribe el cliente, convertido a número. Acepta la coma decimal
 * (teclado español) y descarta todo lo que no sea un número positivo —
 * vacío, texto, negativos y NaN valen 0, que es lo mismo que "no he puesto
 * nada aquí" para todo lo que viene después.
 */
export function parseQuickAddNumber(value: unknown): number {
  const parsed = parseFloat((value ?? '').toString().replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/**
 * Las kcal que salen de los macros escritos, redondeadas. Es lo que se
 * propone mientras el cliente no escriba las suyas: una etiqueta real no
 * siempre cuadra con Atwater, así que en cuanto las pone mandan las suyas.
 */
export function kcalFromMacros(values: QuickAddMacroInput): number {
  return Math.round(
    parseQuickAddNumber(values?.protein) * KCAL_PER_GRAM.protein +
      parseQuickAddNumber(values?.carbs) * KCAL_PER_GRAM.carbs +
      parseQuickAddNumber(values?.fat) * KCAL_PER_GRAM.fat
  );
}

/**
 * Una línea sin nada que sumar no aporta nada a la comida. Basta con que UNO
 * de los cuatro valores pase de 0: apuntar 20 g de proteína sin saber las
 * kcal es un uso legítimo, igual que apuntar solo las kcal.
 */
export function canSubmitQuickAdd(values: QuickAddMacroInput): boolean {
  return [values?.kcal, values?.protein, values?.carbs, values?.fat].some(
    (value) => parseQuickAddNumber(value) > 0
  );
}

/**
 * Las kcal que el cliente ha escrito, redondeadas como se comparan con las de
 * los macros (0 si el campo está vacío). Es la cifra con la que el aviso dice
 * "los macros suman N kcal, no M".
 */
export function enteredKcal(values: QuickAddMacroInput): number {
  return Math.round(parseQuickAddNumber(values?.kcal));
}

/**
 * Si merece la pena avisar de que los macros suman otras kcal y ofrecer
 * igualarlas: solo cuando hay macros que sumen algo y la cifra escrita no es
 * ya esa. Si no, el aviso sería ruido permanente debajo de los campos.
 */
export function shouldOfferKcalFromMacros(values: QuickAddMacroInput): boolean {
  const computed = kcalFromMacros(values);
  return computed > 0 && computed !== enteredKcal(values);
}
