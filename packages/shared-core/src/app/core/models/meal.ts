import { CustomProduct } from './customProduct';
import { CustomRecipe } from './customRecipe';

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
