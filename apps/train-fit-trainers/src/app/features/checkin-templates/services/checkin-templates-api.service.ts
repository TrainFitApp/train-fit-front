import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ApplyResult, CheckinCadence, CheckinTemplateDefinition } from '../models/checkin-template.model';

@Injectable({ providedIn: 'root' })
export class CheckinTemplatesApiService {
  constructor(private http: HttpService) {}

  public list(): Observable<CheckinTemplateDefinition[]> {
    return this.http.get<CheckinTemplateDefinition[]>('trainer/checkin-templates');
  }

  public create(
    name: string,
    enabledFields: string[],
    cadence: CheckinCadence
  ): Observable<CheckinTemplateDefinition> {
    return this.http.post<CheckinTemplateDefinition>('trainer/checkin-templates', {
      name,
      enabledFields,
      cadence,
    });
  }

  public update(
    id: string,
    updates: { name?: string; enabledFields?: string[]; cadence?: CheckinCadence }
  ): Observable<CheckinTemplateDefinition> {
    return this.http.put<CheckinTemplateDefinition>(`trainer/checkin-templates/${id}`, updates);
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`trainer/checkin-templates/${id}`);
  }

  public apply(id: string, clientIds: string[]): Observable<ApplyResult> {
    return this.http.post<ApplyResult>(`trainer/checkin-templates/${id}/apply`, { clientIds });
  }
}
