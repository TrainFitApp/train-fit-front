import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DietTemplate,
  DietTemplateApplyResult,
  DietTemplateDayPayload,
} from '../models/diet-template.model';

@Injectable({ providedIn: 'root' })
export class DietTemplateApiService {
  constructor(private http: HttpService) {}

  public list(): Observable<DietTemplate[]> {
    return this.http.get<DietTemplate[]>('trainer/diet-templates');
  }

  public create(name: string, days: DietTemplateDayPayload[]): Observable<DietTemplate> {
    return this.http.post<DietTemplate>('trainer/diet-templates', { name, days });
  }

  public update(id: string, name: string, days: DietTemplateDayPayload[]): Observable<DietTemplate> {
    return this.http.put<DietTemplate>(`trainer/diet-templates/${id}`, { name, days });
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`trainer/diet-templates/${id}`);
  }

  public applyToClient(
    clientId: string,
    templateId: string,
    startDate: string
  ): Observable<DietTemplateApplyResult> {
    return this.http.post<DietTemplateApplyResult>(
      `trainer/clients/${clientId}/diet-templates/${templateId}/apply`,
      { startDate }
    );
  }
}
