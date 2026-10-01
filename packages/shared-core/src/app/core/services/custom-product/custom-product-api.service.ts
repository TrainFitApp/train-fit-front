import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomProduct,
  CUSTOM_PRODUCT_NUTRITION_FIELDS,
} from '../../models/customProduct';
import { HttpService } from '../http/http.service';

@Injectable()
export class CustomProductAPIService {
  public static readonly CUSTOM_PRODUCTS_ENDPOINT = 'customproducts';
  private static readonly CUSTOM_PRODUCT_EXTRA_FIELDS = [
    'ingredients',
    'allergens',
    'traces',
    'vegan',
    'vegetarian',
    'lactoseFree',
    'glutenFree',
  ] as const;

  constructor(private http: HttpService) {}

  public createCustomProductAndAddToMeal(
    idMeal: string,
    customProduct: CustomProduct,
    idUser?: string
  ): Observable<CustomProduct> {
    const payload = {
      idMeal,
      customProduct: this.serializeCustomProduct(customProduct),
      idUser,
    };
    return this.http.post<CustomProduct>(
      `${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}`,
      this.removeUndefinedFields(payload)
    );
  }

  public updateCustomProduct(
    customProduct: CustomProduct
  ): Observable<CustomProduct> {
    return this.http.put<CustomProduct>(
      `${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}`,
      this.serializeCustomProduct(customProduct)
    );
  }

  public deleteCustomProduct(id: string): Observable<CustomProduct> {
    return this.http.delete<CustomProduct>(
      `${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}/${id}`
    );
  }

  public getCustomProductInfo(customProduct: CustomProduct, key: string) {
    return (customProduct[key] * customProduct.quantity) / 100;
  }

  private serializeCustomProduct(customProduct: CustomProduct): any {
    const payload: any = {};

    if (customProduct?._id) {
      payload._id = customProduct._id;
    }

    if (Object.prototype.hasOwnProperty.call(customProduct, 'quantity')) {
      payload.quantity = customProduct.quantity;
    }

    if (Object.prototype.hasOwnProperty.call(customProduct, 'order')) {
      payload.order = customProduct.order;
    }

    if (Object.prototype.hasOwnProperty.call(customProduct, 'mealId')) {
      payload.mealId = customProduct.mealId;
    }

    if (Object.prototype.hasOwnProperty.call(customProduct, 'product')) {
      payload.product = this.serializeProductRef(customProduct.product);
    }

    // Adición rápida: sin `product` que ponga el nombre, éste viaja en el
    // propio CustomProduct (ver CustomProduct#name/#quickAdd).
    if (Object.prototype.hasOwnProperty.call(customProduct, 'name')) {
      payload.name = customProduct.name;
    }

    if (Object.prototype.hasOwnProperty.call(customProduct, 'quickAdd')) {
      payload.quickAdd = customProduct.quickAdd;
    }

    CUSTOM_PRODUCT_NUTRITION_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(customProduct, field)) {
        return;
      }

      payload[field] = (customProduct as any)[field];
    });

    CustomProductAPIService.CUSTOM_PRODUCT_EXTRA_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(customProduct, field)) {
        return;
      }

      payload[field] = (customProduct as any)[field];
    });

    return this.removeUndefinedFields(payload);
  }

  private serializeProductRef(product: CustomProduct['product']): any {
    if (!product) {
      return product;
    }

    if (typeof product === 'string') {
      return product;
    }

    if (product._id) {
      return product._id;
    }

    return this.removeUndefinedFields({ ...product });
  }

  private removeUndefinedFields<T>(value: T): T {
    if (Array.isArray(value)) {
      return value.map((item) => this.removeUndefinedFields(item)) as T;
    }

    if (!value || typeof value !== 'object') {
      return value;
    }

    const cleaned: any = {};

    Object.keys(value as Record<string, any>).forEach((key) => {
      const nextValue = (value as Record<string, any>)[key];
      if (nextValue === undefined) {
        return;
      }

      cleaned[key] = this.removeUndefinedFields(nextValue);
    });

    return cleaned;
  }
}
