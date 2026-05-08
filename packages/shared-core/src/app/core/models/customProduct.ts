import { IProduct } from './product';

export class CustomProduct {
  _id?: string;
  quantity!: number;
  order?: number;
  product?: IProduct;

  mealId?: string;
  customRecipeId?: string;
  baseCustomProductId?: string | CustomProduct;

  // Overrides nutricionales
  energyKcal100g?: number | null;
  protein100g?: number | null;
  carbohydrates100g?: number | null;
  fat100g?: number | null;
  saturatedFat100g?: number | null;
  sugars100g?: number | null;
  fiber100g?: number | null;
  salt100g?: number | null;
  sodium100g?: number | null;
  cholesterol100g?: number | null;
  transFat100g?: number | null;

  // Minerales
  calcium100g?: number | null;
  iron100g?: number | null;
  magnesium100g?: number | null;
  phosphorus100g?: number | null;
  potassium100g?: number | null;
  zinc100g?: number | null;
  copper100g?: number | null;
  manganese100g?: number | null;
  selenium100g?: number | null;
  iodine100g?: number | null;

  // Vitaminas
  vitaminA100g?: number | null;
  vitaminC100g?: number | null;
  vitaminD100g?: number | null;
  vitaminE100g?: number | null;
  vitaminK100g?: number | null;
  vitaminB1100g?: number | null;
  vitaminB2100g?: number | null;
  vitaminB3100g?: number | null;
  vitaminB5100g?: number | null;
  vitaminB6100g?: number | null;
  vitaminB9100g?: number | null;
  vitaminB12100g?: number | null;
  biotin100g?: number | null;

  // Otros
  omega3100g?: number | null;
  omega6100g?: number | null;
  omega9100g?: number | null;
  caffeine100g?: number | null;
  taurine100g?: number | null;
  alcohol100g?: number | null;

  // Propiedades adicionales
  ingredients?: string;
  allergens?: string[];
  traces?: string[];
  vegan?: boolean;
  vegetarian?: boolean;
  lactoseFree?: boolean;
  glutenFree?: boolean;
}

export const CUSTOM_PRODUCT_KEYS = {
  quantity: 'quantity',
  energy: 'energyKcal100g',
  protein: 'protein100g',
  carbohydrates: 'carbohydrates100g',
  fat: 'fat100g',
} as const;

export const CUSTOM_PRODUCT_NUTRITION_FIELDS = [
  'energyKcal100g',
  'protein100g',
  'carbohydrates100g',
  'fat100g',
  'saturatedFat100g',
  'sugars100g',
  'fiber100g',
  'salt100g',
  'sodium100g',
  'cholesterol100g',
  'transFat100g',
  'calcium100g',
  'iron100g',
  'magnesium100g',
  'phosphorus100g',
  'potassium100g',
  'zinc100g',
  'copper100g',
  'manganese100g',
  'selenium100g',
  'iodine100g',
  'vitaminA100g',
  'vitaminC100g',
  'vitaminD100g',
  'vitaminE100g',
  'vitaminK100g',
  'vitaminB1100g',
  'vitaminB2100g',
  'vitaminB3100g',
  'vitaminB5100g',
  'vitaminB6100g',
  'vitaminB9100g',
  'vitaminB12100g',
  'biotin100g',
  'omega3100g',
  'omega6100g',
  'omega9100g',
  'caffeine100g',
  'taurine100g',
  'alcohol100g',
] as const;

export const CUSTOM_PRODUCT_VALUES = Object.values(CUSTOM_PRODUCT_KEYS);
