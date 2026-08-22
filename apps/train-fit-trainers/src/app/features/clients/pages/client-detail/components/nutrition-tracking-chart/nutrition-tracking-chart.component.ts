import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { NutritionTrackingDay } from '../../models/client-detail.model';

type MetricKey = 'kcal' | 'protein' | 'carbs' | 'fat';

interface MetricOption {
  key: MetricKey;
  label: string;
  unit: string;
}

const METRIC_OPTIONS: MetricOption[] = [
  { key: 'kcal', label: 'Kcal', unit: 'kcal' },
  { key: 'protein', label: 'Proteína', unit: 'g' },
  { key: 'carbs', label: 'Carbohidratos', unit: 'g' },
  { key: 'fat', label: 'Grasas', unit: 'g' },
];

const RANGE_OPTIONS = [7, 30, 90];

// Mismos colores que el resto de esta app (tokens.scss) escritos a mano:
// Chart.js pinta sobre <canvas>, no lee custom properties CSS.
const PLANNED_COLOR = '#8b8b8b'; // --tf-text-muted
const CONSUMED_COLOR = '#fe9000'; // --tf-accent

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoDaysAgo(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

// F20-ter — un único gráfico de LÍNEAS (antes barras dobles) que compara,
// día a día, lo PAUTADO contra lo REALMENTE consumido — con selector de
// rango de tiempo y de qué valor comparar (kcal por defecto, también
// macros). "Consumido" no es un simple sí/no de si siguió el plan: incluye
// tanto los items pautados que marcó como hechos como cualquier producto
// que el propio cliente haya añadido a la comida sin que nadie se lo
// pautara (ver backend diet-days-nutrition-util.js#isItemConsumed).
@Component({
  selector: 'app-nutrition-tracking-chart',
  templateUrl: './nutrition-tracking-chart.component.html',
  styleUrls: ['./nutrition-tracking-chart.component.scss'],
})
export class NutritionTrackingChartComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() clientId = '';
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  public readonly metricOptions = METRIC_OPTIONS;
  public readonly rangeOptions = RANGE_OPTIONS;
  public metric: MetricKey = 'kcal';
  public rangeDays = 30;
  public dailyTracking: NutritionTrackingDay[] = [];
  public isLoading = false;

  private chart: Chart<'line'> | null = null;
  private viewReady = false;

  constructor(private clientDetailApi: ClientDetailApiService) {}

  public ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.clientId) this.load();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId && this.viewReady) {
      this.load();
    }
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }

  public selectMetric(key: MetricKey): void {
    if (this.metric === key) return;
    this.metric = key;
    this.renderChart();
  }

  public selectRange(days: number): void {
    if (this.rangeDays === days) return;
    this.rangeDays = days;
    this.load();
  }

  private load(): void {
    if (!this.clientId) return;
    this.isLoading = true;
    this.clientDetailApi
      .getNutritionTracking(this.clientId, isoDaysAgo(this.rangeDays), todayIso())
      .subscribe({
        next: (summary) => {
          this.isLoading = false;
          this.dailyTracking = summary?.dailyTracking || [];
          this.renderChart();
        },
        error: () => {
          this.isLoading = false;
          this.dailyTracking = [];
          this.renderChart();
        },
      });
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
    const unit = this.activeMetricOption.unit;
    return {
      type: 'line',
      data: {
        labels: this.dailyTracking.map((d) => this.formatDate(d.date)),
        datasets: [
          {
            label: 'Pautado',
            data: this.dailyTracking.map((d) => this.plannedValue(d)),
            borderColor: PLANNED_COLOR,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 4],
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: PLANNED_COLOR,
            tension: 0.3,
          },
          {
            label: 'Consumido',
            data: this.dailyTracking.map((d) => this.consumedValue(d)),
            borderColor: CONSUMED_COLOR,
            backgroundColor: 'rgba(254, 144, 0, 0.12)',
            borderWidth: 2.5,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: CONSUMED_COLOR,
            tension: 0.3,
          },
        ],
      },
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
              label: (context) => `${context.dataset.label}: ${Math.round(Number(context.parsed.y))} ${unit}`,
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
              maxTicksLimit: this.rangeDays > 30 ? 6 : 10,
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } },
          },
        },
      },
    };
  }

  private formatDate(date: string): string {
    return new Date(`${date}T00:00:00.000Z`).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }

  public plannedValue(day: NutritionTrackingDay): number {
    return day.planned?.[this.metric] || 0;
  }

  public consumedValue(day: NutritionTrackingDay): number {
    return day.consumed?.[this.metric] || 0;
  }

  public get activeMetricOption(): MetricOption {
    return this.metricOptions.find((o) => o.key === this.metric) || this.metricOptions[0];
  }

  public get daysWithPlan(): NutritionTrackingDay[] {
    return this.dailyTracking.filter((d) => this.plannedValue(d) > 0);
  }

  // % medio de "cuánto de lo pautado se consumió realmente" en el rango —
  // puede superar 100% (comió más de lo pautado), no se recorta a propósito.
  public get averageAdherencePercentage(): number | null {
    const days = this.daysWithPlan;
    if (!days.length) return null;
    const ratios = days.map((d) => (this.consumedValue(d) / this.plannedValue(d)) * 100);
    return Math.round(ratios.reduce((a, b) => a + b, 0) / ratios.length);
  }
}
