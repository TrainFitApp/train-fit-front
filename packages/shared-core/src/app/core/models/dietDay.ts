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
  // Semana de la fase que pautó el entrenador en la que cae el día
  // (null = sin fase asignada).
  week?: DietWeek | null;
}

export interface DietWeek {
  phaseId: string;
  number: number;
  start: string;
  end: string;
}

export interface PlannedTarget {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Fases del plan del cliente y sus SEMANAS (lunes a domingo, ver
// docs/plan-semanas.md) en un rango de fechas — para pintar el slider de
// días de la pantalla de dieta.
export interface DietTimeline {
  phases: { id: string; name: string; start: string; end: string | null; colorIndex: number }[];
  weeks: { phaseId: string; number: number; start: string; end: string; colorIndex: number }[];
}
