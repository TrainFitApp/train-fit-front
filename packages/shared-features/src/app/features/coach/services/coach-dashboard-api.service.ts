import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachDashboard } from '../models/coach-dashboard.model';
import { CoachPlans } from '../models/coach-plans.model';

@Injectable({ providedIn: 'root' })
export class CoachDashboardApiService {
  constructor(private http: HttpService) {}

  public getDashboard(): Observable<CoachDashboard> {
    return this.http.get<CoachDashboard>('coach/dashboard');
  }

  // "Tus planes": rutina y dieta de hoy, programadas y anteriores.
  public getPlans(): Observable<CoachPlans> {
    return this.http.get<CoachPlans>('coach/plans');
  }
}
