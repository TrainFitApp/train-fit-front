import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import {
  BlockMuscleGroup,
  TrainingBlock,
  TrainingComparisonMetric,
} from '../../models/client-progress.model';

// Paleta categórica para grupos musculares — misma familia desaturada que
// el resto de la app (PHASE_COLORS en nutrition-calendar), no la Tailwind
// *-400 saturada original.
const MUSCLE_GROUP_COLORS = ['#6e99cd', '#a18fd7', '#4d9b7f', '#cc7ba6', '#c09c41', '#4f9fc2', '#7fb0b0', '#b98a5e'];

// Tarea 4 (2026-09) — gráfica de comparación por microciclo. Un único
// componente para las 4 métricas en vez de 4 gráficas distintas: cambia el
// dataset que dibuja, no el tipo de componente, así el panel de filtro solo
// tiene que tocar un @Input.
@Component({
  selector: 'app-training-comparison-chart',
  templateUrl: './training-comparison-chart.component.html',
  styleUrls: ['./training-comparison-chart.component.scss'],
})
export class TrainingComparisonChartComponent implements OnChanges, OnDestroy {
  @Input() blocks: TrainingBlock[] = [];
  @Input() blockMuscleGroups: BlockMuscleGroup[] = [];
  @Input() metric: TrainingComparisonMetric = 'volume';
  @Input() isLoading = false;

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['blocks'] || changes['blockMuscleGroups'] || changes['metric']) {
      this.renderChart();
    }
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }

  public get hasData(): boolean {
    return this.metric === 'muscleGroups' ? this.blockMuscleGroups.length > 0 : this.blocks.length > 0;
  }

  private renderChart(): void {
    const ctx = this.chartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;

    const config =
      this.metric === 'muscleGroups' ? this.buildMuscleGroupConfig() : this.buildSimpleMetricConfig();

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, config);
  }

  private blockLabel(block: { name: string; start: string; end: string }): string {
    return block.name;
  }

  private buildSimpleMetricConfig(): ChartConfiguration<'line'> {
    const labels = this.blocks.map((b) => this.blockLabel(b));
    const data = this.blocks.map((b) =>
      this.metric === 'sessions' ? b.sessions : this.metric === 'sets' ? b.sets : b.volume
    );

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.metricUnitLabel(),
            data,
            borderColor: '#fe9000',
            backgroundColor: 'rgba(254, 144, 0, 0.12)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: '#fe9000',
          },
        ],
      },
      options: this.baseOptions(),
    };
  }

  // Grupos musculares: una línea por grupo, alineadas por microciclo. La
  // UNIÓN de grupos de todos los bloques define las series (no solo los del
  // bloque actual) — así un grupo ausente en un microciclo se ve como 0, no
  // como "no existe esta serie", que es lo que responde "¿se ha dejado de
  // trabajar este grupo?".
  private buildMuscleGroupConfig(): ChartConfiguration<'line'> {
    const labels = this.blockMuscleGroups.map((b) => this.blockLabel(b));
    const allGroups = Array.from(
      new Set(this.blockMuscleGroups.flatMap((b) => b.muscleGroups.map((g) => g.group)))
    );

    const datasets = allGroups.map((group, index) => {
      const color = MUSCLE_GROUP_COLORS[index % MUSCLE_GROUP_COLORS.length];
      return {
        label: group,
        data: this.blockMuscleGroups.map((b) => b.muscleGroups.find((g) => g.group === group)?.volume ?? 0),
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2.5,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: color,
      };
    });

    return {
      type: 'line',
      data: { labels, datasets },
      options: {
        ...this.baseOptions(),
        plugins: {
          ...this.baseOptions().plugins,
          legend: {
            display: true,
            position: 'top',
            labels: { color: 'rgba(255,255,255,0.7)', font: { size: 10 }, boxWidth: 10 },
          },
        },
      },
    };
  }

  private metricUnitLabel(): string {
    if (this.metric === 'sessions') return 'Entrenos completados';
    if (this.metric === 'sets') return 'Series completadas';
    return 'Volumen (kg)';
  }

  private baseOptions(): ChartConfiguration<'line'>['options'] {
    return {
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
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } } },
        y: { beginAtZero: true, ticks: { color: 'rgba(255,255,255,0.5)' } },
      },
    };
  }
}
