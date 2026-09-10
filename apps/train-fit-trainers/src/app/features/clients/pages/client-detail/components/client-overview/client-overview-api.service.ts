import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AnthropometryEntry } from '../../models/client-detail.model';
import { ClientOverview, OverviewContext, OverviewContextValues, OverviewIntake, OverviewList, OverviewNote, OverviewReview, OverviewTask } from './client-overview.model';

@Injectable({ providedIn: 'root' })
export class ClientOverviewApiService {
  constructor(private readonly http: HttpService) {}
  private base(clientId: string): string { return `trainer/clients/${encodeURIComponent(clientId)}/overview`; }
  private stageQuery(stageId: string): string { return stageId ? `?stageId=${encodeURIComponent(stageId)}` : ''; }
  get(clientId: string, stageId = ''): Observable<ClientOverview> {
    return this.http.get<ClientOverview>(this.base(clientId) + this.stageQuery(stageId));
  }
  intake(clientId: string, stageId = ''): Observable<OverviewIntake> {
    return this.http.get<OverviewIntake>(`${this.base(clientId)}/intake${this.stageQuery(stageId)}`);
  }
  private listQuery(stageId: string, offset: number): string { return `?offset=${offset}&limit=50${stageId ? `&stageId=${encodeURIComponent(stageId)}` : ''}`; }
  notes(clientId: string, stageId = '', offset = 0): Observable<OverviewList<OverviewNote>> {
    return this.http.get<OverviewList<OverviewNote>>(`${this.base(clientId)}/notes${this.listQuery(stageId, offset)}`);
  }
  tasks(clientId: string, stageId = '', offset = 0): Observable<OverviewList<OverviewTask>> {
    return this.http.get<OverviewList<OverviewTask>>(`${this.base(clientId)}/tasks${this.listQuery(stageId, offset)}`);
  }
  reviews(clientId: string, stageId = '', offset = 0): Observable<OverviewList<OverviewReview>> {
    return this.http.get<OverviewList<OverviewReview>>(`${this.base(clientId)}/reviews${this.listQuery(stageId, offset)}`);
  }
  getContext(clientId: string): Observable<OverviewContext> {
    return this.http.get<OverviewContext>(`${this.base(clientId)}/context`);
  }
  context(clientId: string, expectedVersion: number, patch: Partial<OverviewContextValues>, stageId: string): Observable<unknown> {
    return this.http.patch(`${this.base(clientId)}/context`, { expectedVersion, patch, stageId });
  }
  profile(clientId: string, payload: Record<string, unknown>): Observable<unknown> {
    return this.http.patch(`${this.base(clientId)}/profile`, payload);
  }
  nutrition(clientId: string, payload: Record<string, unknown>): Observable<unknown> {
    return this.http.patch(`${this.base(clientId)}/nutrition`, payload);
  }
  settings(clientId: string, expectedVersion: number, highlightedPerimeters: string[], stageId: string): Observable<unknown> {
    return this.http.patch(`${this.base(clientId)}/settings`, { expectedVersion, highlightedPerimeters, stageId });
  }
  saveNote(clientId: string, id: string | null, payload: Record<string, unknown>): Observable<OverviewNote> {
    return id ? this.http.patch<OverviewNote>(`${this.base(clientId)}/notes/${id}`, payload)
      : this.http.post<OverviewNote>(`${this.base(clientId)}/notes`, payload);
  }
  saveTask(clientId: string, id: string | null, payload: Record<string, unknown>): Observable<OverviewTask> {
    return id ? this.http.patch<OverviewTask>(`${this.base(clientId)}/tasks/${id}`, payload)
      : this.http.post<OverviewTask>(`${this.base(clientId)}/tasks`, payload);
  }
  saveReview(clientId: string, payload: Record<string, unknown>): Observable<OverviewReview> {
    return this.http.post<OverviewReview>(`${this.base(clientId)}/reviews`, payload);
  }
  saveMeasurement(clientId: string, payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.base(clientId)}/measurements`, payload);
  }
  measurementsOnDate(clientId: string, date: string): Observable<AnthropometryEntry[]> {
    const day = encodeURIComponent(date);
    return this.http.get<AnthropometryEntry[]>(`trainer/clients/${encodeURIComponent(clientId)}/anthropometry?minDate=${day}&maxDate=${day}`);
  }
  saveBaseline(clientId: string, payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.base(clientId)}/baselines`, payload);
  }
}
