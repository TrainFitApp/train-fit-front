import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CustomAnswer, CustomAnswerValue } from 'src/app/core/models/custom-question';

// Respuesta a una pregunta propia tal como se envía: el back la valida contra
// la pregunta y le copia enunciado, tipo y unidad.
export interface IntakeCustomAnswerInput {
  questionId: string;
  value: CustomAnswerValue;
}

// Catálogo cerrado, debe coincidir con
// train-fit-back/components/trainerClients/client-intake-schema.js
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
  // `objetive` (sic) — mismo nombre que el campo de `User`. Delta kcal.
  objetive: number | null;
  customAnswers: IntakeCustomAnswerInput[];
}

export type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';

// Lo que ya se le respondió a este trainer, si algo — para precargar el
// formulario cuando el mismo trainer añade un scope nuevo más tarde en vez
// de partir de cero. No incluye allergies/favoriteFoods/dislikedFoods/
// cooksAtHome: esos viven en User.nutritionPreferences, no aquí (ver
// NutritionPreferencesApiService.getMine()).
export interface StoredIntake {
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  trainingLocation: TrainingLocation | null;
  equipmentTags: EquipmentTag[];
  customAnswers: CustomAnswer[];
  // null si lo rellenó el profesional y el cliente aún no lo ha enviado.
  submittedAt: string | null;
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
