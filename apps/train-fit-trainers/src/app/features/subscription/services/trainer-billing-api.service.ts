import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TrainerEntitlements } from '../models/trainer-entitlements.model';

@Injectable({ providedIn: 'root' })
export class TrainerBillingApiService {
  constructor(private http: HttpService) {}

  public getEntitlements(): Observable<TrainerEntitlements> {
    return this.http.get<TrainerEntitlements>('billing/trainer/entitlements/me');
  }
}
