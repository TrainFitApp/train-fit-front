import { IProduct } from './product';

export class CustomProduct {
  _id?: string;
  quantity!: number;
  order?: number;
  product?: IProduct;

  mealId?: string;

  // Overrides nutricionales
  energyKcal100g?: number;
  protein100g?: number;
  carbohydrates100g?: number;
  fat100g?: number;
  saturatedFat100g?: number;
  sugars100g?: number;
  fiber100g?: number;
  salt100g?: number;
  sodium100g?: number;
  cholesterol100g?: number;
  transFat100g?: number;

  // Minerales
  calcium100g?: number;
  iron100g?: number;
  magnesium100g?: number;
  phosphorus100g?: number;
  potassium100g?: number;
  zinc100g?: number;
  copper100g?: number;
  manganese100g?: number;
  selenium100g?: number;
  iodine100g?: number;

  // Vitaminas
  vitaminA100g?: number;
  vitaminC100g?: number;
  vitaminD100g?: number;
  vitaminE100g?: number;
  vitaminK100g?: number;
  vitaminB1100g?: number;
  vitaminB2100g?: number;
  vitaminB3100g?: number;
  vitaminB5100g?: number;
  vitaminB6100g?: number;
  vitaminB9100g?: number;
  vitaminB12100g?: number;
  biotin100g?: number;

  // Otros
  omega3100g?: number;
  omega6100g?: number;
  omega9100g?: number;
  caffeine100g?: number;
  taurine100g?: number;
  alcohol100g?: number;

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

export const CUSTOM_PRODUCT_VALUES = Object.values(CUSTOM_PRODUCT_KEYS);
