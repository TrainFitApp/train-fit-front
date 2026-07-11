import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';

@Component({
  selector: 'app-anthropometry-chart',
  templateUrl: './anthropometry-chart.component.html',
  styleUrls: ['./anthropometry-chart.component.scss'],
})
export class AnthropometryChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: Anthropometry[] = [];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;
  availableMetrics: string[] = [];
  selectedMetrics: Set<string> = new Set();

  metricConfig = [
    { key: 'weight', label: 'ANTHROPOMETRY.WEIGHT', color: '#d4af37', unit: 'kg', yAxisID: 'yWeight' },
    { key: 'neck', label: 'ANTHROPOMETRY.NECK', color: '#ef4444', unit: 'cm', yAxisID: 'yBody' },
    { key: 'chest', label: 'ANTHROPOMETRY.CHEST', color: '#f97316', unit: 'cm', yAxisID: 'yBody' },
    { key: 'bicepsRelaxed', label: 'ANTHROPOMETRY.BICEPS_RELAXED', color: '#eab308', unit: 'cm', yAxisID: 'yBody' },
    { key: 'bicepsContracted', label: 'ANTHROPOMETRY.BICEPS_CONTRACTED', color: '#84cc16', unit: 'cm', yAxisID: 'yBody' },
    { key: 'waist', label: 'ANTHROPOMETRY.WAIST', color: '#22c55e', unit: 'cm', yAxisID: 'yBody' },
    { key: 'abdomen', label: 'ANTHROPOMETRY.ABDOMEN', color: '#06b6d4', unit: 'cm', yAxisID: 'yBody' },
    { key: 'hip', label: 'ANTHROPOMETRY.HIP', color: '#3b82f6', unit: 'cm', yAxisID: 'yBody' },
    { key: 'thighContracted', label: 'ANTHROPOMETRY.THIGH_CONTRACTED', color: '#8b5cf6', unit: 'cm', yAxisID: 'yBody' },
    { key: 'thighRelaxed', label: 'ANTHROPOMETRY.THIGH_RELAXED', color: '#ec4899', unit: 'cm', yAxisID: 'yBody' },
    { key: 'calf', label: 'ANTHROPOMETRY.CALF', color: '#f43f5e', unit: 'cm', yAxisID: 'yBody' },
  ];

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateAvailableMetrics();
    this.selectDefaultMetrics();
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.chart) {
      this.updateAvailableMetrics();
      this.selectDefaultMetrics();
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private updateAvailableMetrics(): void {
    const metricsWithData = new Set<string>();
    this.data.forEach((entry) => {
      this.metricConfig.forEach((m) => {
        const value = entry[m.key as keyof Anthropometry];
        if (value !== undefined && value !== null) {
          metricsWithData.add(m.key);
        }
      });
    });
    this.availableMetrics = Array.from(metricsWithData);
  }

  private selectDefaultMetrics(): void {
    this.selectedMetrics.clear();
    ['weight', 'waist', 'chest'].forEach((m) => {
      if (this.availableMetrics.includes(m)) {
        this.selectedMetrics.add(m);
      }
    });
    if (this.selectedMetrics.size === 0 && this.availableMetrics.length > 0) {
      this.selectedMetrics.add(this.availableMetrics[0]);
    }
  }

  private initChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.getChartData(),
      options: this.getChartOptions(),
    });
  }

  private updateChart(): void {
    if (!this.chart) return;
    this.chart.data = this.getChartData();
    this.chart.options = this.getChartOptions();
    this.chart.update();
  }

  private getChartData(): ChartData<'line', (number | null)[], string> {
    const labels: string[] = this.data.map((d) => this.formatDate(d.date));
    const datasets: ChartData<'line', (number | null)[], string>['datasets'] = this.metricConfig
      .filter((m) => this.selectedMetrics.has(m.key))
      .map((m) => {
        const values: (number | null)[] = this.data.map((d): number | null => {
          const value = d[m.key as keyof Anthropometry];
          return value !== undefined && value !== null ? Number(value) : null;
        });

        return {
          label: this.translate.instant(m.label),
          data: values,
          borderColor: m.color,
          backgroundColor: this.hexToRgba(m.color, 0.1),
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: m.color,
          pointBorderWidth: 3,
          yAxisID: m.yAxisID,
          spanGaps: true,
        };
      });

    return { labels, datasets };
  }

  private getChartOptions(): ChartOptions<'line'> {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#ffffff',
            font: { size: 12, weight: 'bold' },
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle',
          },
          onClick: (e, legendItem, legend) => {
            const index = legendItem.datasetIndex;
            const meta = this.chart!.getDatasetMeta(index);
            meta.hidden = !meta.hidden;
            this.chart!.update();
          },
        },
        tooltip: {
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          titleColor: '#d4af37',
          bodyColor: '#ffffff',
          borderColor: '#d4af37',
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: true,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          padding: 16,
          callbacks: {
            label: (context) => {
              const metric = this.metricConfig.find((m) => m.label === context.dataset.label);
              const unit = metric ? this.translate.instant(metric.unit) : '';
              return `${context.dataset.label}: ${context.parsed.y} ${unit}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            display: false,
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: { size: 11 },
            maxRotation: 45,
            minRotation: 45,
          },
        },
        yWeight: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: this.translate.instant('ANTHROPOMETRY.WEIGHT') + ' (kg)',
            color: '#d4af37',
            font: { size: 12, weight: 'bold' },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            display: false,
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: { size: 11 },
            callback: (value) => value + ' kg',
          },
        },
        yBody: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: this.translate.instant('ANTHROPOMETRY.BODY_MEASUREMENTS') + ' (cm)',
            color: '#d4af37',
            font: { size: 12, weight: 'bold' },
          },
          grid: {
            display: false,
            color: 'rgba(255, 255, 255, 0.02)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: { size: 11 },
            callback: (value) => value + ' cm',
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
    };
  }

  toggleMetric(key: string): void {
    if (this.selectedMetrics.has(key)) {
      this.selectedMetrics.delete(key);
    } else {
      this.selectedMetrics.add(key);
    }
    this.updateChart();
  }

  isMetricSelected(key: string): boolean {
    return this.selectedMetrics.has(key);
  }

  isMetricAvailable(key: string): boolean {
    return this.availableMetrics.includes(key);
  }

  getMetricLabel(key: string): string {
    const metric = this.metricConfig.find((m) => m.key === key);
    return metric ? this.translate.instant(metric.label) : key;
  }

  getMetricColor(key: string): string {
    const metric = this.metricConfig.find((m) => m.key === key);
    return metric?.color || '#ffffff';
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(this.translate.currentLang === 'en' ? 'en-US' : 'es-ES', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}