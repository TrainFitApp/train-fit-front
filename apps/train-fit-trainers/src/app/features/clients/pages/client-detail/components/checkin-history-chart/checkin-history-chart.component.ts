import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, ChartConfiguration } from 'chart.js';
import {
  CHECKIN_FIELDS_BY_KEY,
  scaleLevelsFor,
} from 'src/app/core/constants/checkin-fields';

import { CheckinResponseEntry } from '../../models/client-detail.model';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { CustomQuestion } from 'src/app/core/models/custom-question';

interface SerieOption {
  key: string;
  label: string;
  unit: string;
  // Techo de la escala (5, 8, 10…) o null en campos abiertos como horas de
  // sueño o pasos, donde no hay máximo que dibujar.
  scaleMax: number | null;
  puntos: { fecha: string; valor: number }[];
}

/**
 * Histórico de lo que el cliente ha ido reportando en sus check-ins.
 *
 * Hasta ahora las respuestas solo se podían leer una a una, en tarjetas: para
 * ver si el sueño llevaba tres semanas cayendo había que abrir cuatro fichas
 * y recordar los números. La serie lo enseña de un vistazo.
 *
 * Solo entran los campos NUMÉRICOS con al menos dos registros: con un punto
 * suelto no hay tendencia que mirar, y un texto libre no se dibuja.
 */
@Component({
  selector: 'app-checkin-history-chart',
  templateUrl: './checkin-history-chart.component.html',
  styleUrls: ['./checkin-history-chart.component.scss'],
})
export class CheckinHistoryChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() public responses: CheckinResponseEntry[] = [];
  @Input() public customQuestions: CustomQuestion[] = [];

  @ViewChild('chartCanvas', { static: true }) private chartCanvas?: ElementRef<HTMLCanvasElement>;

  public series: SerieOption[] = [];
  public selectedKey: string | null = null;

  private chart: Chart | null = null;
  private vistaLista = false;
  private readonly ngZone = inject(NgZone);

  public ngOnChanges(): void {
    this.series = this.buildSeries();

    // Se conserva la métrica elegida si sigue existiendo: recargar la
    // pestaña no debe devolverte a la primera cada vez.
    if (!this.series.some((s) => s.key === this.selectedKey)) {
      this.selectedKey = this.series[0]?.key || null;
    }
    if (this.vistaLista) this.render();
  }

  public ngAfterViewInit(): void {
    this.vistaLista = true;
    this.render();
  }

  public ngOnDestroy(): void {
    this.ngZone.runOutsideAngular(() => {
      this.chart?.destroy();
      this.chart = null;
    });
  }

  public select(key: string): void {
    this.selectedKey = key;
    this.render();
  }

  public get selected(): SerieOption | null {
    return this.series.find((s) => s.key === this.selectedKey) || null;
  }

  private buildSeries(): SerieOption[] {
    const porCampo = new Map<string, { fecha: string; valor: number }[]>();

    // De la más antigua a la más reciente: el histórico llega ordenado
    // descendente (lo más nuevo primero) porque así lo quiere la lista de
    // tarjetas, pero una serie temporal se lee al revés.
    const ordenadas = [...(this.responses || [])].sort(
      (a, b) => new Date(a.respondedAt).getTime() - new Date(b.respondedAt).getTime()
    );

    for (const respuesta of ordenadas) {
      for (const [key, valor] of Object.entries(respuesta.values || {})) {
        if (typeof valor !== 'number' || !Number.isFinite(valor)) continue;
        porCampo.set(key, [
          ...(porCampo.get(key) || []),
          { fecha: respuesta.respondedAt, valor },
        ]);
      }
    }

    const series: SerieOption[] = [];
    for (const [key, puntos] of porCampo) {
      // Un solo punto no es una tendencia.
      if (puntos.length < 2) continue;
      series.push({ key, ...this.describir(key), puntos });
    }

    // Las del catálogo primero y en su orden; las preguntas propias al final.
    return series.sort((a, b) => this.orden(a.key) - this.orden(b.key));
  }

  private describir(key: string): { label: string; unit: string; scaleMax: number | null } {
    if (key.startsWith('custom:')) {
      const pregunta = this.customQuestions.find(
        (q) => String(q._id) === key.slice('custom:'.length)
      );
      return {
        label: pregunta?.label || this.translate.instant('CLIENTS.PREGUNTA_PROPIA'),
        unit: pregunta?.unit || '',
        scaleMax: pregunta?.type === 'scale_1_5' ? 5 : null,
      };
    }

    const campo = CHECKIN_FIELDS_BY_KEY.get(key);
    return {
      label: campo?.label || key,
      unit: campo?.unit || '',
      // Las escalas se dibujan con su techo real (el color de orina llega a
      // 8, no a 5) para que la altura del trazo signifique lo mismo siempre.
      scaleMax: campo?.type === 'scale_1_5' ? scaleLevelsFor(campo) : null,
    };
  }

  private orden(key: string): number {
    if (key.startsWith('custom:')) return 1000;
    return [...CHECKIN_FIELDS_BY_KEY.keys()].indexOf(key);
  }

  private render(): void {
    // Chart.js observa todo el documento. Si sus callbacks entran en Angular,
    // el histórico puede mutar el DOM y alimentar un bucle sin errores de red.
    this.ngZone.runOutsideAngular(() => this.renderChart());
  }

  private renderChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    const serie = this.selected;
    this.chart?.destroy();
    this.chart = null;
    if (!canvas || !serie) return;

    const estilo = getComputedStyle(document.documentElement);
    const acento = estilo.getPropertyValue('--tf-accent').trim() || '#fe9000';
    const tenue = estilo.getPropertyValue('--tf-text-faint').trim() || '#6b6b6b';
    const linea = estilo.getPropertyValue('--tf-border').trim() || '#262626';

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: serie.puntos.map((p) =>
          new Date(p.fecha).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short' })
        ),
        datasets: [
          {
            data: serie.puntos.map((p) => p.valor),
            borderColor: acento,
            backgroundColor: 'transparent',
            pointBackgroundColor: acento,
            pointRadius: 3,
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => `${item.formattedValue}${serie.unit ? ' ' + serie.unit : ''}`,
            },
          },
        },
        scales: {
          x: { grid: { color: linea }, ticks: { color: tenue, maxRotation: 0, autoSkipPadding: 16 } },
          y: {
            // En una escala cerrada se fija el rango completo: si no, tres
            // respuestas de 3, 4 y 3 dibujan una montaña que aparenta una
            // variación enorme sobre un movimiento de un punto.
            min: serie.scaleMax ? 1 : undefined,
            max: serie.scaleMax || undefined,
            grid: { color: linea },
            ticks: { color: tenue, precision: 0 },
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }
}
