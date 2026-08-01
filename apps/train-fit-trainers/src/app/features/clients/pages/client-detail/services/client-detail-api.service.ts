import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  AnthropometryEntry,
  ClientScope,
  ClientTable,
  DietDaySummary,
  NutritionalGoal,
} from '../models/client-detail.model';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

@Injectable({ providedIn: 'root' })
export class ClientDetailApiService {
  constructor(private http: HttpService) {}

  private base(clientId: string): string {
    return `trainer/clients/${clientId}`;
  }

  public getTables(clientId: string): Observable<ClientTable[]> {
    return this.http.get<ClientTable[]>(`${this.base(clientId)}/tables`);
  }

  public getAvailableTemplates(clientId: string): Observable<ClientTable[]> {
    return this.http.get<ClientTable[]>(
      `${this.base(clientId)}/tables/available-templates`
    );
  }

  public assignNewRoutine(clientId: string, name: string): Observable<ClientTable> {
    return this.http.post<ClientTable>(`${this.base(clientId)}/tables`, {
      mode: 'new',
      name,
    });
  }

  public assignTemplateRoutine(
    clientId: string,
    sourceTableId: string
  ): Observable<ClientTable> {
    return this.http.post<ClientTable>(`${this.base(clientId)}/tables`, {
      mode: 'duplicate',
      sourceTableId,
    });
  }

  public getAnthropometry(clientId: string): Observable<AnthropometryEntry[]> {
    return this.http.get<AnthropometryEntry[]>(`${this.base(clientId)}/anthropometry`);
  }

  public getDiet(clientId: string, date: string = todayIsoDate()): Observable<DietDaySummary | null> {
    return this.http.get<DietDaySummary | null>(
      `${this.base(clientId)}/diet?date=${encodeURIComponent(date)}`
    );
  }

  public getNutritionalGoals(clientId: string): Observable<NutritionalGoal[]> {
    return this.http.get<NutritionalGoal[]>(`${this.base(clientId)}/nutritional-goals`);
  }

  public revokeRelation(clientId: string, scope: ClientScope): Observable<unknown> {
    return this.http.delete(`trainer/clients/${clientId}?scope=${scope}`);
  }

  public assignNutritionalGoal(
    clientId: string,
    goal: { name: string; kcalTotal: number; proteinsGTotal: number; carbohydratesGTotal: number; fatGTotal: number }
  ): Observable<NutritionalGoal> {
    return this.http.post<NutritionalGoal>(
      `${this.base(clientId)}/nutritional-goals`,
      goal
    );
  }
}
