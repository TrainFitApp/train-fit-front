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

  // Plan "choice": qué menú eligió el cliente ese día (null = sin elegir).
  dayTypeName?: string | null;
  // Ciclos por contenido — lo que suma lo PAUTADO ese día: es la meta que
  // ve el cliente (no un objetivo guardado aparte). null = nada pautado.
  plannedTarget?: PlannedTarget | null;
  // En qué ciclo de qué fase cae este día (null = sin fase de dieta).
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

// Fases y ciclos del cliente en un rango — para pintar el slider de días.
export interface DietTimeline {
  phases: { id: string; name: string; start: string; end: string | null; colorIndex: number }[];
  cycles: { phaseId: string; number: number; start: string; end: string; colorIndex: number }[];
}
