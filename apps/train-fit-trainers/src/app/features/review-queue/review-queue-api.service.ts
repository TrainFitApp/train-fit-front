import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ReviewCounts, ReviewQueueResponse } from './review-queue.model';

@Injectable({ providedIn: 'root' })
export class ReviewQueueApiService {
  private static readonly ENDPOINT = 'trainer/review-queue';

  constructor(private http: HttpService) {}

  public list(): Observable<ReviewQueueResponse> {
    return this.http.get<ReviewQueueResponse>(ReviewQueueApiService.ENDPOINT).pipe(take(1));
  }

  // Contador del menú y del panel Hoy.
  public count(): Observable<ReviewCounts> {
    return this.http.get<ReviewCounts>(`${ReviewQueueApiService.ENDPOINT}/count`).pipe(take(1));
  }
}
