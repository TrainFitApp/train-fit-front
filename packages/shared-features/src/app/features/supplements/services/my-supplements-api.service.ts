import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

// Movimiento 5 Coach Pro — espejo de components/supplements/ (backend).

export interface SupplementTiming {
  key: string;
  label: string;
}

export interface MySupplement {
  _id: string;
  name: string;
  // Texto libre: las dosis reales son "5 g", "2 cápsulas", "1 medida rasa".
  dose: string;
  timing: string;
  customTiming?: string;
  // Por qué se lo pautaron. Un suplemento sin motivo se abandona a la
  // tercera semana.
  reason?: string;
  purchaseUrl?: string;
  // Vacío = todos los días, que es el caso normal.
  weekdays: number[];
  // Desde cuándo y hasta cuándo se toma (docs/plan-semanas.md §14).
  // `endDate` null = hasta nueva orden.
  startDate: string;
  endDate: string | null;
  // Propio = se lo apuntó el cliente desde Dietas (sin profesional que lo
  // pautara). Los pautados son de solo lectura.
  own: boolean;
  // Quién se lo pautó: un cliente puede tener entrenador y nutricionista.
  // Solo en los pautados.
  trainerName?: string;
}

// Lo que el cliente decide de sus propios suplementos. `startDate` solo al
// crear: el día que estaba mirando en Dietas, desde el que se toma.
export interface OwnSupplementInput {
  name: string;
  dose: string;
  timing: string;
  customTiming: string;
  startDate?: string;
}

@Injectable({ providedIn: 'root' })
export class MySupplementsApiService {
  constructor(private http: HttpService) {}

  public getTimings(): Observable<{ timings: SupplementTiming[] }> {
    return this.http.get<{ timings: SupplementTiming[] }>('supplements/timings');
  }

  // Los VIGENTES en esa fecha (hoy por defecto): la pantalla de dieta los
  // pinta bajo las comidas del día que se está mirando.
  public getMine(date?: string): Observable<MySupplement[]> {
    return this.http.get<MySupplement[]>(
      date ? `supplements/mine?date=${encodeURIComponent(date)}` : 'supplements/mine'
    );
  }

  // Los propios solo se añaden sin profesional activo (403
  // SUPPLEMENT_MANAGED_BY_TRAINER); editar y quitar, siempre.
  public createMine(body: OwnSupplementInput): Observable<MySupplement> {
    return this.http.post<MySupplement>('supplements/mine', body);
  }

  public updateMine(id: string, body: OwnSupplementInput): Observable<MySupplement> {
    return this.http.put<MySupplement>(`supplements/mine/${id}`, body);
  }

  public removeMine(id: string): Observable<void> {
    return this.http.delete<void>(`supplements/mine/${id}`);
  }
}
