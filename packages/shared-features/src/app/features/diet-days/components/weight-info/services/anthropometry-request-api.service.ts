import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PendingAnthropometryRequest } from '../models/anthropometry-request';

@Injectable({ providedIn: 'root' })
export class AnthropometryRequestApiService {
  constructor(private http: HttpService) {}

  public getMine(): Observable<PendingAnthropometryRequest[]> {
    return this.http.get<PendingAnthropometryRequest[]>('trainer/anthropometry-requests/mine').pipe(take(1));
  }
}
