import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CustomProduct } from '../../models/customProduct';
import { IProduct } from '../../models/product';
import { User } from '../../models/user';
import { ProductAPIService } from './product-api.service';

@Injectable()
export class ProductService {
  constructor(private productAPIService: ProductAPIService) {}

  public getProductKcal(customProduct: CustomProduct) {
    return (customProduct.quantity * customProduct.energyKcal100g) / 100;
  }

  public getProducts(): Observable<IProduct[]> {
    return this.productAPIService.getProducts();
  }

  public getProductByCode(idUser: string, code: string): Observable<IProduct> {
    return this.productAPIService.getProductByCode(idUser, code);
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
   * Añadir/quitar de favoritos. Ya no requiere isOwn —
   * todos los productos (incluidos los del usuario) van a archivedProducts.
   */
  public addFavoriteProduct(
    idProduct: string,
    idUser: string
  ): Observable<{ isFavorite: boolean; message?: string }> {
    return this.productAPIService.addFavoriteProduct(idProduct, idUser);
  }

  /**
   * Eliminar un producto del usuario. Solo permitir si product.userId === currentUser._id.
   */
  public deleteProduct(id: string): Observable<any> {
    return this.productAPIService.deleteProduct(id);
  }

  public measureFilterHasChange(): void {}
}
