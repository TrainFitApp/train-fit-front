import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface IntakeSubmission {
  trainerId: string;
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  equipment: string;
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: 'yes' | 'no' | 'sometimes' | null;
}

@Injectable({ providedIn: 'root' })
export class IntakeApiService {
  constructor(private http: HttpService) {}

  public submit(payload: IntakeSubmission): Observable<unknown> {
    return this.http.post('trainer/intake', payload);
  }
}
