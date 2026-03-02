import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomProduct } from '../../models/customProduct';
import { Meal } from '../../models/meal';
import { HttpService } from '../http/http.service';

@Injectable()
export class CustomProductAPIService {
  public static readonly CUSTOM_PRODUCTS_ENDPOINT = 'customproducts';

  constructor(private http: HttpService) {}

  public createCustomProductAndAddToMeal(
    idMeal: string,
    customProduct: CustomProduct,
    idUser?: string
  ): Observable<CustomProduct> {
    return this.http.post<CustomProduct>(
      `${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}`,
      {
        idMeal,
        customProduct,
        idUser,
      }
    );
  }

  public updateCustomProduct(
    customProduct: CustomProduct
  ): Observable<CustomProduct> {
    return this.http.put<CustomProduct>(
      `${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}`,
      customProduct
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
}
