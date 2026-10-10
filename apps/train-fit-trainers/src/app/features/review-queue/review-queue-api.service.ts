import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ReviewCounts, ReviewQueueResponse } from './review-queue.model';

@Injectable({ providedIn: 'root' })
export class ReviewQueueApiService {
  private static readonly ENDPOINT = 'trainer/review-queue';

  // QA 2026-10-09: revisar el último check-in desde la ficha no navega, y el
  // contador del menú (que solo se recalculaba al navegar) se quedaba en 1.
  private readonly changes = new Subject<void>();
  public readonly changed$ = this.changes.asObservable();

  constructor(private http: HttpService) {}

  /** Algo de la bandeja se acaba de revisar: el menú vuelve a contar. */
  public notifyChanged(): void {
    this.changes.next();
  }

  public list(): Observable<ReviewQueueResponse> {
    return this.http.get<ReviewQueueResponse>(ReviewQueueApiService.ENDPOINT).pipe(take(1));
  }

  // Contador del menú y del panel Hoy.
  public count(): Observable<ReviewCounts> {
    return this.http.get<ReviewCounts>(`${ReviewQueueApiService.ENDPOINT}/count`).pipe(take(1));
  }
}
