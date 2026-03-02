import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IProduct } from '../../models/product';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';

@Injectable()
export class ProductAPIService {
  public static readonly PRODUCTS_ENDPOINT = 'products';

  constructor(private http: HttpService) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${ProductAPIService.PRODUCTS_ENDPOINT}`);
  }

  public getProductByCode(idUser: string, code: string): Observable<IProduct> {
    return this.http
      .get<IProduct>(
        `${ProductAPIService.PRODUCTS_ENDPOINT}/code/${idUser}/${code}`
      )
      .pipe(take(1));
  }

  public getProductsCount(): Observable<number> {
    return this.http.get<number>(
      `${ProductAPIService.PRODUCTS_ENDPOINT}/count`
    );
  }

  public searchProduct(page: number, search: string): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(
      `${ProductAPIService.PRODUCTS_ENDPOINT}/search?page=${page}&limit=10`,
      search
    );
  }

  /** Crear un producto. Si se incluye userId en el objeto, será un producto del usuario. */
  public saveProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(
      `${ProductAPIService.PRODUCTS_ENDPOINT}`,
      product
    );
  }

  /** Actualizar un producto (soporta tanto globales como de usuario). */
  public updateProduct(product: IProduct): Observable<IProduct> {
    return this.http
      .put<IProduct>(`${ProductAPIService.PRODUCTS_ENDPOINT}`, product)
      .pipe(take(1));
  }

  /** Promover un producto de usuario a producto global (equivalente al antiguo toProduct). */
  public promoteToGlobal(id: string): Observable<IProduct> {
    return this.http
      .put<IProduct>(`${ProductAPIService.PRODUCTS_ENDPOINT}/promote/${id}`, {})
      .pipe(take(1));
  }

  /** Añadir/quitar de favoritos. Ya no necesita isOwn — todo va a archivedProducts. */
  public addFavoriteProduct(
    idProduct: string,
    idUser: string
  ): Observable<User | IProduct> {
    return this.http.put<IProduct>(
      `${ProductAPIService.PRODUCTS_ENDPOINT}/favProduct`,
      { idProduct, idUser }
    );
  }

  /** Eliminar un producto (solo el creador puede borrar sus propios productos). */
  public deleteProduct(id: string): Observable<any> {
    return this.http
      .delete<any>(`${ProductAPIService.PRODUCTS_ENDPOINT}/${id}`)
      .pipe(take(1));
  }
}
