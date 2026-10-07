import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product';
import { ProductAPIService } from './product-api.service';

@Injectable()
export class ProductService {
  constructor(private productAPIService: ProductAPIService) {}

  public getProducts(): Observable<IProduct[]> {
    return this.productAPIService.getProducts();
  }

  public getProductByCode(code: string): Observable<IProduct> {
    return this.productAPIService.getProductByCode(code);
  }

  public getProductsCount(): Observable<number> {
    return this.productAPIService.getProductsCount();
  }

  public searchProduct(page: number, search: string): Observable<IProduct[]> {
    return this.productAPIService.searchProduct(page, search);
  }

  /** Crear un producto. Si incluye userId, será un producto del usuario. */
  public saveProduct(product: IProduct): Observable<IProduct> {
    return this.productAPIService.saveProduct(product);
  }

  /** Actualizar un producto (propio o global según permisos). */
  public updateProduct(product: IProduct): Observable<IProduct> {
    return this.productAPIService.updateProduct(product);
  }

  /** Promover producto de usuario a producto global (ex: toProduct). */
  public promoteToGlobal(id: string): Observable<IProduct> {
    return this.productAPIService.promoteToGlobal(id);
  }

  /**
   * Eliminar un producto del usuario. Solo permitir si product.userId === currentUser._id.
   */
  public deleteProduct(id: string): Observable<any> {
    return this.productAPIService.deleteProduct(id);
  }
}
