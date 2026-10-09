import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { onDaySkipped } from '../../../../../../shared/services/diet-phase-api.service';
import { NutritionTrackingDay } from '../../models/client-detail.model';
import { uiLocale, localizeProp } from 'src/app/core/i18n/localized-catalog';

type MetricKey = 'kcal' | 'protein' | 'carbs' | 'fat';

interface MetricOption {
  key: MetricKey;
  label: string;
  unit: string;
  color: string;
}

// F20-sexies — un color propio por métrica (no solo pautado/consumido):
// con varias activas a la vez cada línea necesita distinguirse por sí
// misma, ver isla de colores ya usada para tramos de plan en el calendario
// (misma idea, paleta distinta para no confundir ambos conceptos).
// Mismos colores que el diario del cliente (tokens --tf-macro-* en
// theme/tokens.scss; Chart.js pinta en canvas y no lee variables CSS, de ahí
// el hex repetido). Antes era una paleta desaturada propia: el entrenador
// veía otros colores que su cliente para el mismo número.
const METRIC_OPTIONS: MetricOption[] = [
  { key: 'kcal', label: 'Kcal', unit: 'kcal', color: '#fe9000' },
  { key: 'protein', label: 'Proteína', unit: 'g', color: '#3880ff' },
  { key: 'carbs', label: 'Carbohidratos', unit: 'g', color: '#2dd36f' },
  { key: 'fat', label: 'Grasas', unit: 'g', color: '#ffc409' },
];
METRIC_OPTIONS.forEach((item) => localizeProp(item, 'label', `CLIENTS.MACRO_METRICS.${item.key}`));

const REFERENCE_COLOR = '#8b8b8b'; // --tf-text-muted — línea de referencia "100% de lo pautado"

// F20-terdecies/F20-unvicies — el rango de fechas (días sueltos o semanas
// completos, con sus presets) ya no vive aquí: vive en client-detail.page
// (compartido con <app-weight-adherence-chart>, que necesita exactamente
// el mismo selector). Esta gráfica se limita a dibujar [customRange] — sin
// UI propia de rango, depende por completo de lo que le llegue del padre.
//
// F20-ter/sexies — un único gráfico de LÍNEAS que compara, día a día, lo
// PAUTADO contra lo REALMENTE consumido, con selección MÚLTIPLE de qué
// valores comparar (kcal, macros, varias a la vez). Como las escalas de
// kcal y gramos no son comparables, cada métrica activa se dibuja
// normalizada a "% de lo pautado ese día" (pautado siempre = 100%, línea
// de referencia discontinua) en vez de en sus unidades crudas — así
// conviven en un único eje sin que una tape a la otra. "Consumido" no es
// un simple sí/no de si siguió el plan: incluye tanto los items pautados
// que marcó como hechos como cualquier producto que el propio cliente
// haya añadido a la comida sin que nadie se lo pautara (ver backend
// diet-days-nutrition-util.js#isItemConsumed).
@Component({
  selector: 'app-nutrition-tracking-chart',
  templateUrl: './nutrition-tracking-chart.component.html',
  styleUrls: ['./nutrition-tracking-chart.component.scss'],
})
export class NutritionTrackingChartComponent implements OnChanges, OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() clientId = '';
  // F20-quinquies/F20-unvicies — rango exacto elegido en el padre (días
  // sueltos o semanas completas — ver client-detail.page.ts). El padre ya
  // rellena un rango por defecto al cargar, así que en la práctica esto
  // rara vez llega null.
  @Input() customRange: { start: string; end: string } | null = null;

  // static:true → resuelto antes de ngOnInit (a diferencia de
  // ngAfterViewInit), mismo criterio que AnthropometryChartComponent.
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  public readonly metricOptions = METRIC_OPTIONS;
  // Las cuatro activas de serie: se ve la gráfica entera y el trainer apaga
  // las que le sobren.
  public activeMetrics = new Set<MetricKey>(['kcal', 'protein', 'carbs', 'fat']);
  public dailyTracking: NutritionTrackingDay[] = [];
  public isLoading = false;

  private chart: Chart<'line'> | null = null;
  private initialized = false;

  constructor(private clientDetailApi: ClientDetailApiService) {
    // Un día saltado se queda sin lo pautado: si cae en el rango, cambia la
    // línea de pautado de ese día.
    onDaySkipped(
      () => this.clientId,
      (date) => {
        if (this.customRange && this.customRange.start <= date && date <= this.customRange.end) this.load();
      }
    );
  }

  // F20-sedecies — antes esto vivía en ngAfterViewInit, que se ejecuta
  // DESPUÉS de que Angular ya haya comprobado la plantilla por primera
  // vez: mutar isLoading ahí (usado en el *ngIf de la línea del
  // empty-hint) disparaba NG0100 (ExpressionChangedAfterItHasBeenChecked),
  // que en modo estricto puede llegar a abortar el pintado del componente
  // entero — la gráfica se quedaba en blanco. static:true en el ViewChild
  // ya deja chartCanvas listo antes de ngOnInit, así que no hacía falta
  // esperar a ngAfterViewInit — mismo patrón que AnthropometryChartComponent.
  public ngOnInit(): void {
    this.initialized = true;
    if (this.clientId && this.customRange) this.load();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // La primera carga la hace ngOnInit — evita pedir los datos dos veces
    // si clientId/customRange ya llegan puestos en el primer binding.
    if (!this.initialized || !this.clientId || !this.customRange) return;
    if (changes['clientId'] || changes['customRange']) {
      this.load();
    }
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }

  public toggleMetric(key: MetricKey): void {
    if (this.activeMetrics.has(key)) {
      // Nunca se queda sin ninguna métrica activa — no tiene sentido un
      // gráfico vacío por apagar la última.
      if (this.activeMetrics.size === 1) return;
      this.activeMetrics.delete(key);
    } else {
      this.activeMetrics.add(key);
    }
    this.renderChart();
  }

  public isMetricActive(key: MetricKey): boolean {
    return this.activeMetrics.has(key);
  }

  // Fondo del chip activo (tinte suave del color propio de la métrica) —
  // precalculado en TS en vez de CSS color-mix() para no depender de
  // soporte de navegador (el WebView de la app puede ir por detrás de
  // Chrome/Safari de escritorio).
  public chipBackground(option: MetricOption): string {
    return this.hexToRgba(option.color, 0.16);
  }

  // Días que cubre el rango actual — solo para no amontonar etiquetas en el
  // eje X (ver maxTicksLimit), no afecta a qué se pide al backend.
  private get rangeDayCount(): number {
    if (!this.customRange) return 30;
    const from = new Date(`${this.customRange.start}T00:00:00.000Z`).getTime();
    const to = new Date(`${this.customRange.end}T00:00:00.000Z`).getTime();
    return Math.max(1, Math.round((to - from) / 86400000) + 1);
  }

  // Los días futuros del rango SÍ pueden tener contenido pautado (la semana
  // entero se crea de una vez), pero "0% consumido" en un día que aún no ha
  // llegado no es un incumplimiento — es que no ha pasado. Se pide desde
  // el backend hasta hoy como mucho; más allá no hay nada real que dibujar.
  private load(): void {
    if (!this.clientId || !this.customRange) return;
    const from = this.customRange.start;
    const to = this.clampToToday(this.customRange.end);
    if (from > to) {
      this.dailyTracking = [];
      this.renderChart();
      return;
    }
    this.isLoading = true;
    this.clientDetailApi.getNutritionTracking(this.clientId, from, to).subscribe({
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

  private clampToToday(date: string): string {
    const today = this.todayIso();
    return date < today ? date : today;
  }

  // Fecha LOCAL, no UTC — mismo criterio que client-detail.page.ts
  // (todayIsoDate/formatLocalIsoDate): con el navegador en un huso por
  // delante de UTC, toISOString() da la fecha de AYER hasta que UTC
  // alcanza la medianoche local.
  private todayIso(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
    const labels = this.dailyTracking.map((d) => this.formatDate(d.date));
    const activeOptions = this.metricOptions.filter((o) => this.activeMetrics.has(o.key));

    const datasets: ChartConfiguration<'line'>['data']['datasets'] = [
      {
        label: this.translate.instant('CLIENTS.PAUTADO_100'),
        data: labels.map(() => 100),
        borderColor: REFERENCE_COLOR,
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
      },
      ...activeOptions.map((option) => ({
        label: option.label,
        data: this.dailyTracking.map((d) => this.percentValue(d, option.key)),
        borderColor: option.color,
        backgroundColor: this.hexToRgba(option.color, 0.1),
        borderWidth: 2.5,
        fill: activeOptions.length === 1,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: option.color,
        tension: 0.3,
        spanGaps: true,
      })),
    ];

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
                return value === null || value === undefined
                  ? this.translate.instant('CLIENTS.SIN_DATO', { label: context.dataset.label })
                  : `${context.dataset.label}: ${Math.round(Number(value))}%`;
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
              maxTicksLimit: this.rangeDayCount > 30 ? 6 : 10,
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              font: { size: 10 },
              callback: (value) => `${value}%`,
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
    return new Date(`${date}T00:00:00.000Z`).toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }

  private rawValue(day: NutritionTrackingDay, key: MetricKey, side: 'planned' | 'consumed'): number {
    return day[side]?.[key] || 0;
  }

  // null (no un 0) cuando no hay nada pautado ese día para esta métrica —
  // "sin dato" es distinto de "cumplió 0%", y spanGaps evita que la línea
  // se desplome a cero entre medias.
  private percentValue(day: NutritionTrackingDay, key: MetricKey): number | null {
    const planned = this.rawValue(day, key, 'planned');
    if (planned <= 0) return null;
    return (this.rawValue(day, key, 'consumed') / planned) * 100;
  }

  public get daysWithPlan(): NutritionTrackingDay[] {
    const keys = Array.from(this.activeMetrics);
    return this.dailyTracking.filter((d) => keys.some((k) => this.rawValue(d, k, 'planned') > 0));
  }

  // % medio por métrica activa — puede superar 100% (comió más de lo
  // pautado), no se recorta a propósito.
  public averagePercentageFor(key: MetricKey): number | null {
    const days = this.dailyTracking.filter((d) => this.rawValue(d, key, 'planned') > 0);
    if (!days.length) return null;
    const values = days.map((d) => this.percentValue(d, key) || 0);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }

  public get activeMetricOptions(): MetricOption[] {
    return this.metricOptions.filter((o) => this.activeMetrics.has(o.key));
  }

  public trackByMetricKey(_index: number, option: MetricOption): string {
    return option.key;
  }
}
