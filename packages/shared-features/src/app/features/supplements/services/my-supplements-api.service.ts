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
  // Desde cuándo y hasta cuándo se toma (docs/plan-revisiones.md §14).
  // `endDate` null = hasta nueva orden.
  startDate: string;
  endDate: string | null;
  // Quién se lo pautó: un cliente puede tener entrenador y nutricionista.
  trainerName: string;
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
}
