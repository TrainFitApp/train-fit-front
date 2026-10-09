import type {
  NutritionDayItem,
  NutritionDayItemStatus,
  NutritionDayMeal,
  NutritionMacroTotals,
} from '../../models/client-detail.model';

// Lógica de presentación del resumen de un día (pestaña «Día» de Plan ›
// Nutrición). Pura, para poder probarla sin Angular.

export interface MacroRow {
  key: keyof NutritionMacroTotals;
  labelKey: string;
  unit: 'kcal' | 'g';
  // Color fijo de cada macro (shared-theme).
  color: string;
  planned: number;
  consumed: number;
  // Tomado - pautado. Sin nada pautado no hay desviación (null).
  delta: number | null;
}

const MACROS: { key: keyof NutritionMacroTotals; labelKey: string; unit: 'kcal' | 'g'; color: string }[] = [
  { key: 'kcal', labelKey: 'CLIENT_DETAIL.DAY.KCAL', unit: 'kcal', color: 'var(--tf-macro-kcal)' },
  { key: 'protein', labelKey: 'TRAINER_COMMON.PROTEIN', unit: 'g', color: 'var(--tf-macro-protein)' },
  { key: 'carbs', labelKey: 'TRAINER_COMMON.CARBS', unit: 'g', color: 'var(--tf-macro-carbs)' },
  { key: 'fat', labelKey: 'TRAINER_COMMON.FAT', unit: 'g', color: 'var(--tf-macro-fat)' },
];

export function macroRows(planned: NutritionMacroTotals, consumed: NutritionMacroTotals): MacroRow[] {
  const hasPlan = planned.kcal > 0;
  return MACROS.map((macro) => ({
    ...macro,
    planned: planned[macro.key] || 0,
    consumed: consumed[macro.key] || 0,
    delta: hasPlan ? (consumed[macro.key] || 0) - (planned[macro.key] || 0) : null,
  }));
}

// Icono del estado. Un día pasado sin marcar es que no lo tomó (aspa); hoy o
// un día por venir, que todavía no (círculo vacío).
export function itemStatusIcon(status: NutritionDayItemStatus, isPast: boolean): string {
  if (status === 'eaten') return 'checkmark-circle';
  if (status === 'extra') return 'add-circle-outline';
  return isPast ? 'close-circle-outline' : 'ellipse-outline';
}

export function mealStatusIcon(status: NutritionDayMeal['status'], isPast: boolean): string {
  if (status === 'partial') return 'contrast-outline';
  if (status === 'done') return 'checkmark-circle';
  return itemStatusIcon(status, isPast);
}

// Lo tomó, pero en otra cantidad que la pautada.
export function isAdjusted(item: NutritionDayItem): boolean {
  return (
    item.status === 'eaten' &&
    item.plannedQuantity !== null &&
    item.quantity !== null &&
    item.plannedQuantity !== item.quantity
  );
}

// "+120", "−35" (signo menos tipográfico), "0".
export function signedNumber(value: number, locale: string): string {
  const text = Math.abs(value).toLocaleString(locale, { maximumFractionDigits: 0 });
  if (value > 0) return `+${text}`;
  if (value < 0) return `−${text}`;
  return text;
}
