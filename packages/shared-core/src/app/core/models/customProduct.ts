import { IProduct } from './product';

export class CustomProduct {
  _id?: string;
  quantity!: number;
  order?: number;
  product?: IProduct;
  lastUsedAt?: string;

  // Adición rápida (2026-10) — línea suelta que el cliente apunta con sus
  // macros a mano, sin crear un Product en el catálogo: `product` queda
  // vacío y el nombre vive aquí. Con `product` presente manda el nombre del
  // producto base, así que para pintar se lee siempre
  // `product?.name || name` (customProductName() en CustomProductService).
  name?: string;
  // Lo que distingue una línea escrita a mano de un CustomProduct al que le
  // falte `product` por un dato corrupto, y lo que decide qué editor abre la
  // app al tocarla (la hoja de adición rápida, no AddProductPage).
  quickAdd?: boolean;

  // En una receta del plato: el ingrediente de la receta que cambia.
  baseCustomProductId?: string;

  // Pautado por trainer (ver custom-product-schema.js backend) — presente
  // si un profesional pautó este producto. Protegido de borrado/edición
  // directa (backend, meal-service.js#assertMealEditable).
  assignedByTrainerId?: string | null;
  // Cantidad ORIGINAL pautada (gramos), fija — ver custom-product-schema.js.
  // `quantity` es la cantidad realmente consumida, editable por el cliente
  // (vía setCustomProductQuantity); assignedQuantity es la referencia para
  // el delta que se le muestra (+46/-28 sobre lo pautado). null si nunca
  // fue pautado.
  assignedQuantity?: number | null;
  // El cliente lo marca como tomado — nunca bloqueado por assignedByTrainerId.
  consumed?: boolean;

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

/**
 * Cantidad con la que se guarda toda adición rápida. Los macros se escriben
 * tal cual en los campos "por 100 g", así que con cantidad 100 el cálculo
 * normal (valor × cantidad / 100) devuelve exactamente lo que escribió el
 * cliente — ninguna pantalla necesita un caso especial para sumarlos.
 * A cambio, la cantidad NO significa gramos aquí: quien pinte "xx g" tiene
 * que saltársela cuando `quickAdd` está puesto.
 */
export const QUICK_ADD_QUANTITY = 100;

/** Lo que el cliente escribe en la hoja de adición rápida. */
export interface QuickAddMacros {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
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
