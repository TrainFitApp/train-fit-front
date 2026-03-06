export class IProduct {
  _id: string;
  name: string;
  brand?: string;
  code?: string;
  verified?: boolean;
  productQuantity: number;
  servingQuantity?: number;
  servingUnit?: string;
  userId?: string; // If set, this product was created by the user

  // Macros y básicos
  energyKcal100g: number;
  carbohydrates100g?: number;
  sugars100g?: number;
  fat100g?: number;
  saturatedFat100g?: number;
  protein100g?: number;
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

  // Información dietética
  ingredients?: string;
  allergens?: string[];
  traces?: string[];
  vegan?: boolean;
  vegetarian?: boolean;
  lactoseFree?: boolean;
  glutenFree?: boolean;

  constructor(product: IProduct) {
    Object.assign(this, product);

    if (this.name) this.name = this.name.trim();
    if (this.brand) this.brand = this.brand.trim();
    if (this.code) this.code = this.code.toString().trim();

    // Eliminar propiedades con valores null, undefined o strings vacíos
    // Mantenemos false y 0
    Object.keys(this).forEach((key) => {
      const val = (this as any)[key];
      if (val === null || val === undefined || val === '') {
        delete (this as any)[key];
      }
    });
  }
}

export interface IProduct {
  _id: string;
  name: string;
  brand?: string;
  code?: string;
  verified?: boolean;
  productQuantity: number;
  servingQuantity?: number;
  servingUnit?: string;
  userId?: string; // If set, this product was created by the user

  energyKcal100g: number;
  carbohydrates100g?: number;
  sugars100g?: number;
  fat100g?: number;
  saturatedFat100g?: number;
  protein100g?: number;
  fiber100g?: number;
  salt100g?: number;
  sodium100g?: number;
  cholesterol100g?: number;
  transFat100g?: number;

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

  omega3100g?: number;
  omega6100g?: number;
  omega9100g?: number;
  caffeine100g?: number;
  taurine100g?: number;
  alcohol100g?: number;

  ingredients?: string;
  allergens?: string[];
  traces?: string[];
  vegan?: boolean;
  vegetarian?: boolean;
  lactoseFree?: boolean;
  glutenFree?: boolean;
}
