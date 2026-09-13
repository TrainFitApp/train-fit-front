import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { forkJoin } from 'rxjs';
import { ClientDetailApiService } from '../../services/client-detail-api.service';

interface WeightAdherenceDay {
  date: string;
  // null = ese día no tenía nada pautado (mismo criterio que
  // NutritionComplianceDay del backend) — no es un 0%, es "sin dato".
  completionPercentage: number | null;
  // null = no hay pesaje registrado ese día concreto (el cliente no pesa
  // todos los días).
  weightKg: number | null;
}

const ADHERENCE_COLOR = '#fe9000'; // --tf-accent, mismo tono que "Kcal" en NutritionTrackingChartComponent
const WEIGHT_COLOR = '#d4af37'; // mismo dorado que AnthropometryChartComponent usa para "Peso"

// F20-vicies — "¿el peso se mueve como toca dado lo que el cliente realmente
// come?" es justo la pregunta que ya responde el algoritmo de sugerencia de
// ciclo (peso del ciclo vs. adherencia del ciclo), pero solo en el instante
// de preparar el siguiente ciclo. Esta gráfica la deja ver en el tiempo:
// cumplimiento (% de items pautados marcados, no macros) y peso, mismo rango
// que <app-nutrition-tracking-chart>, con la que alterna vía el toggle en
// client-detail.page.html — misma fila "Seguimiento", vista distinta de los
// mismos días.
@Component({
  selector: 'app-weight-adherence-chart',
  templateUrl: './weight-adherence-chart.component.html',
  styleUrls: ['./weight-adherence-chart.component.scss'],
})
export class WeightAdherenceChartComponent implements OnChanges, OnInit, OnDestroy {
  @Input() clientId = '';
  @Input() customRange: { start: string; end: string } | null = null;

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  public days: WeightAdherenceDay[] = [];
  public isLoading = false;

  private chart: Chart<'line'> | null = null;
  private initialized = false;

  constructor(private clientDetailApi: ClientDetailApiService) {}

  public ngOnInit(): void {
    this.initialized = true;
    if (this.clientId && this.customRange) this.load();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized || !this.clientId || !this.customRange) return;
    if (changes['clientId'] || changes['customRange']) {
      this.load();
    }
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }

  // F20-unvicies — la etiqueta de rango ya no vive aquí, vive en
  // client-detail.page (trackingRangeLabel/cycleRangeLabel), compartida con
  // <app-nutrition-tracking-chart>.

  // Días con al menos una de las dos señales — si ninguno tiene ni plan ni
  // pesaje no hay nada que dibujar (mismo criterio que daysWithPlan en
  // NutritionTrackingChartComponent).
  public get hasData(): boolean {
    return this.days.some((d) => d.completionPercentage !== null || d.weightKg !== null);
  }

  // Bastantes clientes no pesan cada día (algunos no tienen ni un registro
  // en todo el rango) — sin esto el eje derecho se queda mostrando una
  // escala 0–1 kg vacía y confusa en vez de simplemente no aparecer.
  public get hasWeightData(): boolean {
    return this.days.some((d) => d.weightKg !== null);
  }

  public get averageCompliance(): number | null {
    const withPlan = this.days.filter((d) => d.completionPercentage !== null);
    if (!withPlan.length) return null;
    const sum = withPlan.reduce((acc, d) => acc + (d.completionPercentage || 0), 0);
    return Math.round(sum / withPlan.length);
  }

  // Primer y último pesaje DEL RANGO (no del histórico completo) — el
  // delta que le importa al trainer es "en lo que llevamos mirando", igual
  // que el resto de esta tarjeta.
  public get weightDelta(): { startKg: number; endKg: number } | null {
    const withWeight = this.days.filter((d) => d.weightKg !== null);
    if (withWeight.length < 2) return null;
    return {
      startKg: withWeight[0].weightKg as number,
      endKg: withWeight[withWeight.length - 1].weightKg as number,
    };
  }

  private load(): void {
    if (!this.clientId || !this.customRange) return;
    this.isLoading = true;
    const { start: from, end: to } = this.customRange;

    forkJoin({
      compliance: this.clientDetailApi.getNutritionCompliance(this.clientId, from, to),
      anthropometry: this.clientDetailApi.getAnthropometry(this.clientId),
    }).subscribe({
      next: ({ compliance, anthropometry }) => {
        this.isLoading = false;
        this.days = this.mergeDays(from, to, compliance?.dailyBreakdown || [], anthropometry || []);
        this.renderChart();
      },
      error: () => {
        this.isLoading = false;
        this.days = [];
        this.renderChart();
      },
    });
  }

  // Un día por fecha del rango completo, aunque falte compliance o pesaje
  // ese día concreto — mismo motivo que dailyTracking en el backend
  // (getClientNutritionTracking): un eje X con huecos irregulares mide mal
  // en un gráfico de líneas.
  private mergeDays(
    from: string,
    to: string,
    dailyBreakdown: { date: string; completionPercentage: number | null }[],
    anthropometry: { date: string; weight?: number }[]
  ): WeightAdherenceDay[] {
    const complianceByDate = new Map(dailyBreakdown.map((d) => [d.date, d.completionPercentage]));
    const weightByDate = new Map(
      anthropometry.filter((a) => a.weight !== undefined && a.weight !== null).map((a) => [a.date, a.weight as number])
    );

    const days: WeightAdherenceDay[] = [];
    for (
      let cursor = new Date(`${from}T00:00:00.000Z`);
      cursor.getTime() <= new Date(`${to}T00:00:00.000Z`).getTime();
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    ) {
      const date = cursor.toISOString().slice(0, 10);
      days.push({
        date,
        completionPercentage: complianceByDate.has(date) ? (complianceByDate.get(date) as number | null) : null,
        weightKg: weightByDate.has(date) ? (weightByDate.get(date) as number) : null,
      });
    }
    return days;
  }

  private renderChart(): void {
    const ctx = this.chartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = this.buildConfig();
    if (this.chart) {
      this.chart.data = config.data;
      this.chart.options = config.options!;
      this.chart.update();
      return;
    }
    this.chart = new Chart(ctx, config);
  }

  private buildConfig(): ChartConfiguration<'line'> {
    const labels = this.days.map((d) => this.formatDate(d.date));

    const datasets: ChartConfiguration<'line'>['data']['datasets'] = [
      {
        label: 'Cumplimiento',
        data: this.days.map((d) => d.completionPercentage),
        borderColor: ADHERENCE_COLOR,
        backgroundColor: this.hexToRgba(ADHERENCE_COLOR, 0.1),
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: ADHERENCE_COLOR,
        tension: 0.3,
        spanGaps: true,
        yAxisID: 'yCompliance',
      },
    ];

    // Sin ni un pesaje en el rango, ni dataset ni eje: una línea "Peso"
    // vacía con su propio eje 0–1 kg es ruido, no información.
    if (this.hasWeightData) {
      datasets.push({
        label: 'Peso',
        data: this.days.map((d) => d.weightKg),
        borderColor: WEIGHT_COLOR,
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        borderDash: [5, 4],
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: WEIGHT_COLOR,
        tension: 0.3,
        spanGaps: true,
        yAxisID: 'yWeight',
      });
    }

    return {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            borderWidth: 1,
            cornerRadius: 10,
            padding: 10,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                if (value === null || value === undefined) {
                  return `${context.dataset.label}: sin dato`;
                }
                const unit = context.dataset.label === 'Peso' ? 'kg' : '%';
                return `${context.dataset.label}: ${Math.round(Number(value) * 10) / 10}${unit}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              font: { size: 10 },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: this.days.length > 30 ? 6 : 10,
            },
          },
          yCompliance: {
            type: 'linear',
            position: 'left',
            min: 0,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              font: { size: 10 },
              callback: (value) => `${value}%`,
            },
          },
          yWeight: {
            type: 'linear',
            position: 'right',
            display: this.hasWeightData,
            grid: { display: false },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              font: { size: 10 },
              callback: (value) => `${value} kg`,
            },
          },
        },
      },
    };
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private formatDate(date: string): string {
    return new Date(`${date}T00:00:00.000Z`).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }
}
