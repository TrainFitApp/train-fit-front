import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MealSnippet } from '../models/meal-snippet.model';

@Injectable({ providedIn: 'root' })
export class MealSnippetApiService {
  private static readonly ENDPOINT = 'trainer/meal-snippets';

  constructor(private http: HttpService) {}

  public list(): Observable<MealSnippet[]> {
    return this.http.get<MealSnippet[]>(MealSnippetApiService.ENDPOINT);
  }

  public create(
    name: string,
    customProducts: Record<string, unknown>[],
    customRecipes: unknown[]
  ): Observable<MealSnippet> {
    return this.http.post<MealSnippet>(MealSnippetApiService.ENDPOINT, {
      name,
      customProducts,
      customRecipes,
    });
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${MealSnippetApiService.ENDPOINT}/${id}`);
  }

  // TASK-047 (MASTER_BACKLOG.md) — solo renombrar; re-componer el contenido
  // del snippet exige el mismo composer que ya usa la creación, fuera de
  // alcance aquí (ver TASK-081).
  public rename(id: string, name: string): Observable<MealSnippet> {
    return this.http.put<MealSnippet>(`${MealSnippetApiService.ENDPOINT}/${id}`, { name });
  }
}
