import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DietTemplate,
  DietTemplateDayPatternPayload,
  DietTemplateDayPayload,
  TemplateMode,
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

  public update(
    id: string,
    name: string,
    days: DietTemplateDayPayload[],
    mode?: TemplateMode,
    dayPatterns?: DietTemplateDayPatternPayload[]
  ): Observable<DietTemplate> {
    return this.http.put<DietTemplate>(`trainer/diet-templates/${id}`, { name, days, mode, dayPatterns });
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`trainer/diet-templates/${id}`);
  }
}
