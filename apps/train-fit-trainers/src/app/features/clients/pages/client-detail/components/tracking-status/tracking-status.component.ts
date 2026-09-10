import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

interface WeightPlanCompliance {
  intervalDays: number;
  lastWeightAt: string | null;
  lastWeightKg: number | null;
  upToDate: boolean;
  overdueDays: number;
}

interface TrackingStatusData {
  weightPlan: { intervalDays: number; compliance: WeightPlanCompliance } | null;
  windowDays: number;
  answered: number;
  missed: number;
  open: number;
}

/**
 * La primera línea de la pestaña Seguimiento: qué debe este cliente ahora
 * mismo y si va al día con su peso.
 *
 * Estaba al final de la pantalla, debajo del calendario, del detalle y de la
 * configuración — siendo lo más rápido de leer de todo. Y el recuento de "por
 * revisar" salía además en el selector de vista, así que el mismo número
 * aparecía dos veces. Aquí manda este, y el selector se quedó sin cifra.
 */
@Component({
  selector: 'app-tracking-status',
  templateUrl: './tracking-status.component.html',
  styleUrls: ['./tracking-status.component.scss'],
})
export class TrackingStatusComponent implements OnChanges {
  @Input() clientId = '';

  private readonly http = inject(HttpService);
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public data: TrackingStatusData | null = null;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId) this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.http.get<TrackingStatusData>(`trainer/clients/${this.clientId}/tracking`).subscribe({
      next: (data) => {
        this.data = data;
        this.state = 'loaded';
      },
      error: () => (this.state = 'error'),
    });
  }

  // El estado (al día / atrasado) lo dice la píldora, así que estas dos
  // solo dan lo que la píldora no puede. Y van SEPARADAS, no en una frase
  // única, porque no son el mismo papel: la cadencia es el dato de la pauta
  // (protagonista) y el último pesaje es contexto que la acompaña.
  //
  // Devuelven string (primitivo) a propósito: un método de plantilla que
  // devolviese un objeto nuevo cambiaría de identidad en cada ciclo de
  // detección de cambios y recrearía el subárbol — la trampa que ya colgó
  // dos pantallas de este frontend.
  public weightCadence(plan: NonNullable<TrackingStatusData['weightPlan']>): string {
    if (plan.intervalDays === 1) return 'Cada día';
    if (plan.intervalDays === 7) return 'Cada semana';
    return `Cada ${plan.intervalDays} días`;
  }

  public weightLast(plan: NonNullable<TrackingStatusData['weightPlan']>): string {
    if (plan.compliance.lastWeightKg === null) return 'Todavía sin registros';
    const fecha = plan.compliance.lastWeightAt
      ? new Date(plan.compliance.lastWeightAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
      : '';
    return `Último ${plan.compliance.lastWeightKg} kg${fecha ? ' el ' + fecha : ''}`;
  }
}
