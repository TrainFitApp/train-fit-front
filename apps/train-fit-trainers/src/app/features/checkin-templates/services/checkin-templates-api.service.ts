import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  ApplyResult,
  CheckinTemplateDefinition,
} from '../models/checkin-template.model';
import { CustomQuestion } from 'src/app/core/models/custom-question';

@Injectable({ providedIn: 'root' })
export class CheckinTemplatesApiService {
  constructor(private http: HttpService) {}

  public list(): Observable<CheckinTemplateDefinition[]> {
    return this.http.get<CheckinTemplateDefinition[]>('trainer/checkin-templates');
  }

  public create(
    name: string,
    enabledFields: string[],
    customQuestions: CustomQuestion[] = [],
    requiredFields: string[] = []
  ): Observable<CheckinTemplateDefinition> {
    return this.http.post<CheckinTemplateDefinition>('trainer/checkin-templates', {
      name,
      enabledFields,
      requiredFields,
      customQuestions,
    });
  }

  public update(
    id: string,
    updates: {
      name?: string;
      enabledFields?: string[];
      requiredFields?: string[];
      customQuestions?: CustomQuestion[];
    }
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
