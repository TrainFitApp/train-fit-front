import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NutritionalGoal } from '../../models/nutritional-goal';

export interface NutritionalGoalActivationResponse {
  goalInUse: string;
  goal: NutritionalGoal;
}

export interface NutritionalGoalDeleteResponse {
  goalInUse: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class NutritionalGoalApiService {
  private readonly endpoint = 'nutritionalgoals';

  constructor(private http: HttpService) {}

  create(data: Partial<NutritionalGoal>): Observable<NutritionalGoal> {
    return this.http.post<NutritionalGoal>(this.endpoint, data).pipe(take(1));
  }

  getById(id: string): Observable<NutritionalGoal> {
    return this.http.get<NutritionalGoal>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  getAll(): Observable<NutritionalGoal[]> {
    return this.http.get<NutritionalGoal[]>(this.endpoint).pipe(take(1));
  }

  update(id: string, data: Partial<NutritionalGoal>): Observable<NutritionalGoal> {
    return this.http.put<NutritionalGoal>(`${this.endpoint}/${id}`, data).pipe(take(1));
  }

  activate(id: string): Observable<NutritionalGoalActivationResponse> {
    return this.http
      .put<NutritionalGoalActivationResponse>(`${this.endpoint}/${id}/activate`, {})
      .pipe(take(1));
  }

  delete(id: string): Observable<NutritionalGoalDeleteResponse> {
    return this.http.delete<NutritionalGoalDeleteResponse>(`${this.endpoint}/${id}`).pipe(take(1));
  }
}
