import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { IProduct } from 'src/app/core/models/product';
import { CustomProduct } from '../../models/customProduct';
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
