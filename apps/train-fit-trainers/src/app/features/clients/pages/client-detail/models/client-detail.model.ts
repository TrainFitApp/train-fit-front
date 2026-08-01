export type ClientScope = 'training' | 'nutrition';

export interface ClientTable {
  _id: string;
  name: string;
  assignedByTrainerId: string | null;
  splits?: unknown[];
}

export interface AnthropometryEntry {
  _id: string;
  date: string;
  weight?: number;
}

export interface MealSummary {
  _id: string;
  name: string;
  customProducts: unknown[];
  customRecipes: unknown[];
}

export interface DietDaySummary {
  _id: string;
  date: string;
  meals: MealSummary[];
}

export interface NutritionalGoal {
  _id: string;
  name: string;
  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;
  assignedByTrainerId: string | null;
}
