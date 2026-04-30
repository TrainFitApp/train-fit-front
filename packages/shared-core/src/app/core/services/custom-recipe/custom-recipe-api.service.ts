import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateCustomRecipeDTO,
  CustomRecipe,
  UpdateCustomRecipeDTO,
} from '../../models/customRecipe';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CustomRecipeApiService {
  public static readonly ENDPOINT = 'customrecipes';

  constructor(private http: HttpService) {}

  public getById(id: string): Observable<CustomRecipe> {
    return this.http.get<CustomRecipe>(`${CustomRecipeApiService.ENDPOINT}/${id}`);
  }

  public create(customRecipe: CreateCustomRecipeDTO): Observable<CustomRecipe> {
    return this.http.post<CustomRecipe>(
      `${CustomRecipeApiService.ENDPOINT}`,
      customRecipe
    );
  }

  public update(
    id: string,
    customRecipe: UpdateCustomRecipeDTO
  ): Observable<CustomRecipe> {
    return this.http.put<CustomRecipe>(
      `${CustomRecipeApiService.ENDPOINT}/${id}`,
      customRecipe
    );
  }

  public delete(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      `${CustomRecipeApiService.ENDPOINT}/${id}`
    );
  }
}
