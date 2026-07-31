import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export type TrainerScope = 'training' | 'nutrition';

export interface TrainerClientSummary {
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
  } | null;
  scopes: TrainerScope[];
}

export interface TrainerInvitation {
  _id: string;
  clientEmail: string;
  scope: TrainerScope;
  status: 'pending' | 'active' | 'declined' | 'revoked';
  invitedAt: string;
}

export interface TrainerInvitationResult {
  scope: TrainerScope;
  success: boolean;
  error: string | null;
  relation: TrainerInvitation | null;
}

export interface TrainerSet {
  _id: string;
  reps?: number;
  weight?: number;
  doned?: boolean;
}

export interface TrainerExercise {
  _id: string;
  notes?: string;
  exercise?: { _id: string; name: string };
  sets?: TrainerSet[];
}

export interface TrainerWorkout {
  _id: string;
  name: string;
  date?: string;
  startedAt?: string;
  cronometer?: number;
  exercises?: TrainerExercise[];
  table?: { _id: string; name: string };
  split?: { _id: string; name: string };
}

export interface TrainerRoutine {
  _id: string;
  name: string;
  type?: string;
  splits?: Array<{
    _id: string;
    name: string;
    workouts?: TrainerWorkout[];
  }>;
}

export interface TrainerAnthropometry {
  _id: string;
  date: string;
  weight?: number;
}

export interface TrainerDietMeal {
  _id: string;
  name: string;
  notes?: string;
  customProducts?: Array<{
    _id: string;
    quantity?: number;
    product?: { name?: string };
  }>;
  customRecipes?: Array<{
    _id: string;
    recipe?: { name?: string };
  }>;
}

export interface TrainerDietDay {
  _id: string;
  date: string;
  notes?: string;
  meals?: TrainerDietMeal[];
}

export interface TrainerNutritionalGoal {
  _id: string;
  name: string;
  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;
}

@Injectable({ providedIn: 'root' })
export class TrainerClientApiService {
  constructor(private readonly http: HttpService) {}

  public getClients(): Observable<TrainerClientSummary[]> {
    return this.http.get<TrainerClientSummary[]>('trainer/clients');
  }

  public getInvitations(): Observable<TrainerInvitation[]> {
    return this.http.get<TrainerInvitation[]>('trainer/invites');
  }

  public getClientTables(
    clientId: string
  ): Observable<{
    tableInUse: string | null;
    activeTable: TrainerRoutine | null;
    tables: TrainerRoutine[];
  }> {
    return this.http.get(`trainer/clients/${clientId}/tables`);
  }

  public getClientAnthropometries(
    clientId: string
  ): Observable<TrainerAnthropometry[]> {
    return this.http.get(`trainer/clients/${clientId}/anthropometry?limit=12`);
  }

  public getClientWorkoutHistory(
    clientId: string
  ): Observable<TrainerWorkout[]> {
    return this.http.get(`trainer/clients/${clientId}/workouts/history?limit=20`);
  }

  public getClientDiet(
    clientId: string,
    date: string
  ): Observable<{ dietInUse: string | null; dietDay: TrainerDietDay | null }> {
    return this.http.get(`trainer/clients/${clientId}/diet?date=${encodeURIComponent(date)}`);
  }

  public getClientNutritionalGoals(
    clientId: string
  ): Observable<{ goalInUse: string | null; goals: TrainerNutritionalGoal[] }> {
    return this.http.get(`trainer/clients/${clientId}/nutritional-goals`);
  }

  public invite(
    clientEmail: string,
    scopes: TrainerScope[]
  ): Observable<{ results: TrainerInvitationResult[] }> {
    return this.http.post<{ results: TrainerInvitationResult[] }>(
      'trainer/invites',
      { clientEmail, scopes }
    );
  }

  public cancelInvitation(id: string): Observable<TrainerInvitation> {
    return this.http.delete<TrainerInvitation>(`trainer/invites/${id}`);
  }
}
