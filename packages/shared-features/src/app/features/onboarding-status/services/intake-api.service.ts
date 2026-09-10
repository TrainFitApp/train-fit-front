import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface IntakeCustomAnswer {
  questionId: string;
  label: string;
  value: string;
}

// Tarea 3 (Trainers, 2026-08) — catálogo cerrado, debe coincidir con
// train-fit-back/components/clientIntake/client-intake-schema.js
// (TRAINING_LOCATIONS / EQUIPMENT_TAGS) — mismo criterio que IntakeFieldKey
// más abajo en onboarding.service.ts.
export type TrainingLocation = 'gym' | 'home' | 'outdoor' | 'mixed';
export type EquipmentTag =
  | 'dumbbells'
  | 'barbell'
  | 'machines'
  | 'bands'
  | 'kettlebells'
  | 'bench'
  | 'pullup_bar'
  | 'none';

export interface IntakeSubmission {
  trainerId: string;
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  trainingLocation: TrainingLocation | null;
  equipmentTags: EquipmentTag[];
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: 'yes' | 'no' | 'sometimes' | null;
  // Restricciones dietéticas estructuradas → ClientNutritionPreferences.
  dietaryFlags: DietaryFlag[];
  // Perfil del cliente (confirmación de lo del registro) → se reescribe en
  // `User`. steps/activity/training = el `.value` numérico del enum, ya
  // resuelto por el wizard (mismo criterio que sign-up).
  weight: number | null;
  height: number | null;
  sex: number | null;
  birth: string | null;
  steps: number | null;
  activity: number | null;
  training: number | null;
  customAnswers: IntakeCustomAnswer[];
}

export type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';

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
  // DEPRECATED — dato legado de cuestionarios enviados antes de Tarea 3.
  // Ya no se escribe desde este formulario; se sigue leyendo aquí solo para
  // no perder lo que un cliente ya había respondido.
  equipment: string;
  trainingLocation: TrainingLocation | null;
  equipmentTags: EquipmentTag[];
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
