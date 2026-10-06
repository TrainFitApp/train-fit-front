import { CustomProduct } from './customProduct';
import { CustomRecipe } from './customRecipe';

// Una opción para un hueco de comida, pautada por el profesional en su
// plan: misma forma que lo que se pauta.
export interface MealAlternative {
  label: string;
  customProducts: CustomProduct[];
  customRecipes: CustomRecipe[];
}

export class Meal {
  _id: string;
  name: string;
  kcal?: number;
  protein?: number;
  carbohydrate?: number;
  fat?: number;
  notes?: string;
  customProducts: CustomProduct[];
  customRecipes?: CustomRecipe[];
  // Presente si el profesional pautó la comida entera (no se puede
  // recomponer, solo registrar lo que se tomó).
  assignedByTrainerId?: string | null;
  // Opciones del plan para este hueco (vacío = nada que elegir) y la que
  // está aplicada.
  alternatives?: MealAlternative[];
  chosenAlternativeIndex?: number | null;
  alternativesTrainerId?: string | null;
}

export enum MEAL_TYPES {
  Desayuno = 0,
  Almuerzo = 1,
  Comida = 2,
  Merienda = 3,
  Cena = 4,
  Recena = 5,
}

export const MEAL_VALUES = Object.values(MEAL_TYPES);
