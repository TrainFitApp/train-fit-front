import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CooksAtHome, NutritionPreferences } from '../models/nutrition-preferences.model';

@Injectable({ providedIn: 'root' })
export class NutritionPreferencesApiService {
  constructor(private http: HttpService) {}

  public getMine(): Observable<NutritionPreferences | null> {
    return this.http.get<NutritionPreferences | null>('nutrition-preferences');
  }

  public updateMine(body: {
    allergies: string;
    favoriteFoods: string;
    dislikedFoods: string;
    cooksAtHome: CooksAtHome | null;
  }): Observable<NutritionPreferences> {
    return this.http.put<NutritionPreferences>('nutrition-preferences', body);
  }
}
