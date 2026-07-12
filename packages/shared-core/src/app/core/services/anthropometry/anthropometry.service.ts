import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Anthropometry, AnthropometryDTO } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';

@Injectable({
  providedIn: 'root',
})
export class AnthropometryService {
  private readonly endpoint = 'anthropometry';

  constructor(private http: HttpService) {}

  createAnthropometry(data: AnthropometryDTO): Observable<Anthropometry> {
    return this.http.post<Anthropometry>(this.endpoint, data).pipe(take(1));
  }

  getAnthropometryById(id: string): Observable<Anthropometry> {
    return this.http.get<Anthropometry>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  getAnthropometryByDate(date: string): Observable<Anthropometry> {
    return this.http.post<Anthropometry>(`${this.endpoint}/by-date`, { date }).pipe(take(1));
  }

  getAnthropometriesBetweenDates(minDate: string, maxDate: string): Observable<Anthropometry[]> {
    return this.http.post<Anthropometry[]>(`${this.endpoint}/between-dates`, { minDate, maxDate }).pipe(take(1));
  }

  getAllAnthropometries(): Observable<Anthropometry[]> {
    return this.http.get<Anthropometry[]>(this.endpoint).pipe(take(1));
  }

  updateAnthropometry(id: string, data: Partial<AnthropometryDTO>): Observable<Anthropometry> {
    return this.http.put<Anthropometry>(`${this.endpoint}/${id}`, data).pipe(take(1));
  }

  deleteAnthropometry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  upsertAnthropometry(data: AnthropometryDTO): Observable<Anthropometry> {
    return this.http.post<Anthropometry>(`${this.endpoint}/upsert`, data).pipe(take(1));
  }
}