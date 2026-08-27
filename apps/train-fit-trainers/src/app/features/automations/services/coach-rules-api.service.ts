import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachRule, RuleCatalog } from '../models/coach-rule.model';

@Injectable({ providedIn: 'root' })
export class CoachRulesApiService {
  private static readonly ENDPOINT = 'trainer/rules';

  constructor(private http: HttpService) {}

  // El vocabulario del constructor visual lo decide el backend, no la UI.
  public getCatalog(): Observable<RuleCatalog> {
    return this.http.get<RuleCatalog>(`${CoachRulesApiService.ENDPOINT}/catalog`);
  }

  public getMine(): Observable<CoachRule[]> {
    return this.http.get<CoachRule[]>(CoachRulesApiService.ENDPOINT);
  }

  public create(rule: Partial<CoachRule>): Observable<CoachRule> {
    return this.http.post<CoachRule>(CoachRulesApiService.ENDPOINT, rule);
  }

  public update(id: string, rule: Partial<CoachRule>): Observable<CoachRule> {
    return this.http.put<CoachRule>(`${CoachRulesApiService.ENDPOINT}/${id}`, rule);
  }

  public toggle(id: string, enabled: boolean): Observable<CoachRule> {
    return this.http.patch<CoachRule>(`${CoachRulesApiService.ENDPOINT}/${id}/toggle`, { enabled });
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${CoachRulesApiService.ENDPOINT}/${id}`);
  }
}
