import { Meal } from './meal';

export class DietDay {
  _id: string;
  weight: number;
  date: string;
  notes: string;
  steps: number;
  meals: Meal[];

  kcal?: number;
  kcalTotal?: number;
  proteinsG?: number;
  proteinsGTotal?: number;
  carbohydratesG?: number;
  carbohydratesGTotal?: number;
  fatG?: number;
  fatGTotal?: number;

  // Qué menú del plan eligió el cliente ese día (null = sin elegir).
  menuName?: string | null;
  // Lo que suma lo PAUTADO ese día: es la meta que
  // ve el cliente (no un objetivo guardado aparte). null = nada pautado.
  plannedTarget?: PlannedTarget | null;
  // En qué revisión de qué fase cae este día (null = sin fase de dieta).
  cycle?: DietDayCycle | null;
}

export interface PlannedTarget {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DietDayCycle {
  phaseId: string;
  number: number;
  start: string;
  end: string;
}

// Fases y revisiones del cliente en un rango — para pintar el slider de días.
// Fases del plan del cliente y sus REVISIONES (las ventanas que marcan sus
// check-ins, ver docs/plan-revisiones.md) en un rango de fechas.
export interface DietTimeline {
  phases: { id: string; name: string; start: string; end: string | null; colorIndex: number }[];
  revisions: { phaseId: string; number: number; start: string; end: string; colorIndex: number }[];
}
