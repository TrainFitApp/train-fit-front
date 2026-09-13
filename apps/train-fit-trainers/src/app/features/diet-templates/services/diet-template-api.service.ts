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

  // Sin parámetros: solo plantillas generales — lo que espera cualquier
  // selector genérico (protocolos, plantillas), sin colar dietas que son de
  // un cliente concreto.
  // forClientId acota al material aplicable a ese cliente; onlyOwned deja
  // SOLO las suyas (filtro activo del selector de fase).
  // includeOwned las devuelve todas — solo la biblioteca lo usa.
  public list(
    options: { forClientId?: string | null; onlyOwned?: boolean; includeOwned?: boolean } = {}
  ): Observable<DietTemplate[]> {
    const params: string[] = [];
    if (options.forClientId) params.push(`forClientId=${encodeURIComponent(options.forClientId)}`);
    if (options.onlyOwned) params.push('onlyOwned=true');
    if (options.includeOwned) params.push('includeOwned=true');
    const query = params.length ? `?${params.join('&')}` : '';
    return this.http.get<DietTemplate[]>(`trainer/diet-templates${query}`);
  }

  // Una sola plantilla con su contenido completo (days/dayPatterns) — para
  // cuando solo se conoce el id (p. ej. precargar el builder con la
  // plantilla elegida en el cajón de sugerencias antes de aplicarla).
  public getById(id: string): Observable<DietTemplate> {
    return this.http.get<DietTemplate>(`trainer/diet-templates/${id}`);
  }

  // ownerClientId puesto = dieta exclusiva de ese cliente, no material
  // general de la biblioteca.
  public create(
    name: string,
    days: DietTemplateDayPayload[],
    ownerClientId?: string | null,
    mode?: TemplateMode,
    dayPatterns?: DietTemplateDayPatternPayload[],
    // Solo en mode 'choice': días que dura un ciclo (ver plan ciclos por contenido).
    choiceCycleDays?: number | null
  ): Observable<DietTemplate> {
    return this.http.post<DietTemplate>('trainer/diet-templates', {
      name,
      days,
      mode,
      dayPatterns,
      ownerClientId: ownerClientId || null,
      ...(choiceCycleDays != null ? { choiceCycleDays } : {}),
    });
  }

  public update(
    id: string,
    name: string,
    days: DietTemplateDayPayload[],
    mode?: TemplateMode,
    dayPatterns?: DietTemplateDayPatternPayload[],
    // Sugerencias de dieta — aptitudes que el entrenador fuerza a mano
    // (el array derivado lo recalcula el backend, nunca se manda).
    suitableForOverride?: string[],
    choiceCycleDays?: number | null
  ): Observable<DietTemplate> {
    return this.http.put<DietTemplate>(`trainer/diet-templates/${id}`, {
      name,
      days,
      mode,
      dayPatterns,
      suitableForOverride,
      ...(choiceCycleDays != null ? { choiceCycleDays } : {}),
    });
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`trainer/diet-templates/${id}`);
  }
}
