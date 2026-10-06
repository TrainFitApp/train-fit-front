import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DietSuggestionRequest, DietSuggestionResponse } from '../models/diet-suggestion.model';

@Injectable({ providedIn: 'root' })
export class DietSuggestionApiService {
  constructor(private http: HttpService) {}

  // Objetivo de referencia del cliente (o el que teclee el profesional) +
  // plantillas rankeadas por cercanía. 422 MISSING_BIOMETRICS si faltan datos.
  public suggest(clientId: string, body: DietSuggestionRequest): Observable<DietSuggestionResponse> {
    return this.http.post<DietSuggestionResponse>(`trainer/clients/${clientId}/diet-suggestions`, body);
  }
}
