import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachDashboard } from '../models/coach-dashboard.model';

@Injectable({ providedIn: 'root' })
export class CoachDashboardApiService {
  constructor(private http: HttpService) {}

  public getDashboard(): Observable<CoachDashboard> {
    return this.http.get<CoachDashboard>('coach/dashboard');
  }
}
