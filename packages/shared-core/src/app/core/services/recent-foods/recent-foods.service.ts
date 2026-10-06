import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomProduct } from '../../models/customProduct';
import { CustomRecipe } from '../../models/customRecipe';
import { HttpService } from '../http/http.service';

export type RecentFoodKind = 'product' | 'recipe';

// Recientes del buscador de alimentos de una comida (por posición:
// Desayuno = 0…). No se guardan: el backend los calcula del historial del
// usuario, y ocultarlos solo los quita de ese cálculo hasta que se vuelvan a
// añadir.
@Injectable({ providedIn: 'root' })
export class RecentFoodsService {
  private static readonly ENDPOINT = 'recent-foods';

  constructor(private http: HttpService) {}

  // `userId`: el del cliente cuando pauta su profesional de nutrición; sin
  // él, los del propio usuario.
  public getRecentMealProducts(
    mealIndex: number,
    options: { limit?: number; userId?: string } = {}
  ): Observable<CustomProduct[]> {
    return this.http.get<CustomProduct[]>(`${RecentFoodsService.ENDPOINT}/products?${this.query(mealIndex, options)}`);
  }

  public getRecentMealRecipes(
    mealIndex: number,
    options: { limit?: number; userId?: string } = {}
  ): Observable<CustomRecipe[]> {
    return this.http.get<CustomRecipe[]>(`${RecentFoodsService.ENDPOINT}/recipes?${this.query(mealIndex, options)}`);
  }

  // Siempre del usuario autenticado.
  public hideRecentFoods(body: {
    mealIndex: number;
    kind: RecentFoodKind;
    ids?: string[];
    all?: boolean;
  }): Observable<{ success: boolean }> {
    return this.http.post(`${RecentFoodsService.ENDPOINT}/hidden`, body);
  }

  public restoreRecentFoods(body: {
    mealIndex: number;
    kind: RecentFoodKind;
    ids: string[];
  }): Observable<{ success: boolean }> {
    return this.http.post(`${RecentFoodsService.ENDPOINT}/hidden/restore`, body);
  }

  private query(mealIndex: number, options: { limit?: number; userId?: string }): string {
    const params = new URLSearchParams({ mealIndex: String(mealIndex), limit: String(options.limit || 15) });
    if (options.userId) params.set('userId', options.userId);
    return params.toString();
  }
}
