import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface IntakeCustomAnswer {
  questionId: string;
  label: string;
  value: string;
}

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
  customAnswers: IntakeCustomAnswer[];
}

// Lo que ya se le respondió a este trainer, si algo — para precargar el
// formulario cuando el mismo trainer añade un scope nuevo más tarde en vez
// de partir de cero. No incluye allergies/favoriteFoods/dislikedFoods/
// cooksAtHome: esos viven en ClientNutritionPreferences (F29), no aquí (ver
// NutritionPreferencesApiService.getMine()).
export interface StoredIntake {
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  equipment: string;
  customAnswers: IntakeCustomAnswer[];
  submittedAt: string;
}

@Injectable({ providedIn: 'root' })
export class IntakeApiService {
  constructor(private http: HttpService) {}

  public submit(payload: IntakeSubmission): Observable<unknown> {
    return this.http.post('trainer/intake', payload);
  }

  public getMine(trainerId: string): Observable<StoredIntake | null> {
    return this.http.get<StoredIntake | null>(`trainer/intake/${trainerId}`);
  }
}
