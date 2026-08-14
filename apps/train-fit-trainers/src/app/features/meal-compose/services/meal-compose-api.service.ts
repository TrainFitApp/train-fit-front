import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BulkApplyResult } from '../models/meal-compose.model';

@Injectable({ providedIn: 'root' })
export class MealComposeApiService {
  constructor(private http: HttpService) {}

  public applyToClients(body: {
    date: string;
    mealSlot: string;
    customProducts: Record<string, unknown>[];
    customRecipes: unknown[];
    merge: boolean;
    targetClientIds: string[];
  }): Observable<BulkApplyResult[]> {
    return this.http.post<BulkApplyResult[]>('trainer/meals/apply-to-clients', body);
  }
}
