import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { PainBand, PainEntry } from 'src/app/core/constants/pain';

export interface PainCatalog {
  zones: string[];
  bands: PainBand[];
  min: number;
  max: number;
  limitingLevel: number;
}

@Injectable({ providedIn: 'root' })
export class MyPainApiService {
  constructor(private http: HttpService) {}

  // El vocabulario lo decide el backend, igual que el de las reglas: así es
  // imposible que la pantalla ofrezca una zona que el validador no conoce.
  public getCatalog(): Observable<PainCatalog> {
    return this.http.get<PainCatalog>('pain/catalog');
  }

  public getForDate(date?: string): Observable<{ date: string; entries: PainEntry[] }> {
    const query = date ? `?date=${date}` : '';
    return this.http.get<{ date: string; entries: PainEntry[] }>(`pain/mine${query}`);
  }

  public getHistory(days: number): Observable<{ days: number; entries: PainEntry[] }> {
    return this.http.get<{ days: number; entries: PainEntry[] }>(
      `pain/mine/history?days=${days}`
    );
  }

  // Upsert: el cliente CORRIGE lo del día, no acumula. El backend lo
  // garantiza con un índice único {userId, date, zone}.
  public save(entry: { date?: string; zone: string; level: number; note?: string }): Observable<PainEntry> {
    return this.http.put<PainEntry>('pain/mine', entry);
  }

  // Distinto de guardar un 0: el 0 dice "hoy no me duele" (dato), esto dice
  // "me equivoqué al apuntarlo" (no hay dato).
  public remove(zone: string, date?: string): Observable<void> {
    const params = new URLSearchParams({ zone });
    if (date) params.set('date', date);
    return this.http.delete<void>(`pain/mine?${params.toString()}`);
  }
}
