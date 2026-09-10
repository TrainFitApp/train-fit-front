import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  ApplyResult,
  CheckinTemplateDefinition,
  CustomCheckinQuestion,
} from '../models/checkin-template.model';

@Injectable({ providedIn: 'root' })
export class CheckinTemplatesApiService {
  constructor(private http: HttpService) {}

  public list(): Observable<CheckinTemplateDefinition[]> {
    return this.http.get<CheckinTemplateDefinition[]>('trainer/checkin-templates');
  }

  public create(
    name: string,
    enabledFields: string[],
    customQuestions: CustomCheckinQuestion[] = []
  ): Observable<CheckinTemplateDefinition> {
    return this.http.post<CheckinTemplateDefinition>('trainer/checkin-templates', {
      name,
      enabledFields,
      customQuestions,
    });
  }

  public update(
    id: string,
    updates: {
      name?: string;
      enabledFields?: string[];
      customQuestions?: CustomCheckinQuestion[];
    }
  ): Observable<CheckinTemplateDefinition> {
    return this.http.put<CheckinTemplateDefinition>(`trainer/checkin-templates/${id}`, updates);
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`trainer/checkin-templates/${id}`);
  }

  // Fase 8b — timing es opcional: sin él, el backend aplica hoy a la hora y
  // periodicidad por defecto de la plantilla (comportamiento de siempre).
  public apply(
    id: string,
    clientIds: string[],
    timing?: { startDate?: string; time?: string; frequency?: string; interval?: number; timeZone?: string }
  ): Observable<ApplyResult> {
    return this.http.post<ApplyResult>(`trainer/checkin-templates/${id}/apply`, { clientIds, ...timing });
  }
}
