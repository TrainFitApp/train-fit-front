import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MyWeightPlan } from '../models/weight-plan';

@Injectable({ providedIn: 'root' })
export class WeightPlanApiService {
  constructor(private http: HttpService) {}

  public getMine(): Observable<MyWeightPlan[]> {
    return this.http.get<MyWeightPlan[]>('trainer/weight-plans/mine').pipe(take(1));
  }
}
