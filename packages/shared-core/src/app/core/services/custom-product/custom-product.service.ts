import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { IProduct } from 'src/app/core/models/product';
import {
  CustomProduct,
  QUICK_ADD_QUANTITY,
  QuickAddMacros,
} from '../../models/customProduct';
import { CustomProductAPIService } from './custom-product-api.service';

@Injectable()
export class CustomProductService {
  constructor(
    private modalController: ModalController,
    private customAPIService: CustomProductAPIService
  ) {}

  /**
   * Get specific nutritional info for a CustomProduct based on its quantity.
   * Falls back to product or legacy ownProduct field.
   */
  public getCustomProductInfo(
    customProduct: CustomProduct,
    key: string
  ): number {
    if (!customProduct || !customProduct.quantity) return 0;

    let val = customProduct[key];

    // Fallback to underlying product
    if (val === undefined || val === null) {
      const p = customProduct.product;
      if (p) {
        val = p[key];
      }
    }

    return ((val || 0) * customProduct.quantity) / 100;
  }

  /**
   * Get all macros for a CustomProduct
   */
  public getMacros(customProduct: CustomProduct): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    return {
      kcal: this.getCustomProductInfo(customProduct, 'energyKcal100g'),
      protein: this.getCustomProductInfo(customProduct, 'protein100g'),
      carbs: this.getCustomProductInfo(customProduct, 'carbohydrates100g'),
      fat: this.getCustomProductInfo(customProduct, 'fat100g'),
    };
  }

  public createCustomProductAndAddToMeal(
    idMeal: string,
    customProduct: CustomProduct,
    idUser?: string
  ): Observable<CustomProduct> {
    return this.customAPIService.createCustomProductAndAddToMeal(
      idMeal,
      customProduct,
      idUser
    );
  }

  public updateCustomProduct(
    customProduct: CustomProduct
  ): Observable<CustomProduct> {
    return this.customAPIService.updateCustomProduct(customProduct);
  }

  public deleteCustomProduct(id: string): Observable<CustomProduct> {
    return this.customAPIService.deleteCustomProduct(id).pipe(take(1));
  }

  /**
   * El nombre que se pinta de un CustomProduct. El del producto del catálogo
   * cuando lo hay; si no, el que el cliente escribió en la adición rápida
   * (ver CustomProduct#name). Mismo orden que usa el backend para la lista de
   * la compra (shopping-list-service.js#productName).
   */
  public customProductName(customProduct: CustomProduct): string {
    return (customProduct?.product?.name || customProduct?.name || '').trim();
  }

  /**
   * Adición rápida: una línea con sus macros escritas a mano, sin Product en
   * el catálogo detrás. Se guarda con `quantity` 100 y los macros tal cual en
   * los campos "por 100 g", para que el cálculo de siempre (valor × cantidad
   * / 100, ver getCustomProductInfo) devuelva exactamente lo que escribió el
   * cliente sin ningún caso especial en toda la app.
   */
  public composeQuickAddCustomProduct(
    values: QuickAddMacros,
    order = 0
  ): CustomProduct {
    const customProduct = new CustomProduct();
    customProduct.quantity = QUICK_ADD_QUANTITY;
    customProduct.order = order;
    customProduct.quickAdd = true;
    customProduct.name = values.name;
    customProduct.energyKcal100g = values.kcal;
    customProduct.protein100g = values.protein;
    customProduct.carbohydrates100g = values.carbs;
    customProduct.fat100g = values.fat;
    return customProduct;
  }

  /**
   * Composes a CustomProduct. Ownership is derived from product.userId when needed.
   */
  public composeCustomProduct(
    product: IProduct,
    quantity: number,
    order: number
  ): CustomProduct {
    const customProductNew = new CustomProduct();
    customProductNew.quantity = quantity;
    customProductNew.order = order;
    customProductNew.product = product;
    return customProductNew;
  }

  /**
   * Mapea todos los valores nutricionales de un producto base a un CustomProduct
   * Se usa cuando el producto base ha cambiado y queremos que la entrada en la dieta refleje esos cambios.
   */
  public mapNutritionalValues(
    product: IProduct,
    customProduct: CustomProduct
  ): void {
    const keys = [
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
      'vegan',
      'vegetarian',
      'lactoseFree',
      'glutenFree',
      'ingredients',
      'allergens',
      'traces',
    ];

    keys.forEach((key) => {
      (customProduct as any)[key] = (product as any)[key];
    });
  }
}
