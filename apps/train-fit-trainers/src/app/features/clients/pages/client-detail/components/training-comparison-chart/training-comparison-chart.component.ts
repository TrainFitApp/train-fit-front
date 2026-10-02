import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, ChartConfiguration } from 'chart.js';
import {
  BlockAdherence,
  BlockExerciseProgress,
  BlockMuscleGroup,
  BlockReadiness,
  SessionAdherence,
  SessionExerciseProgress,
  SessionMuscleGroup,
  SessionReadiness,
  SessionTraining,
  TrainingBlock,
  TrainingComparisonMetric,
  TrainingGranularity,
  TRAINING_COMPARISON_METRIC_LABELS,
} from '../../models/client-progress.model';
import { blockMetric, ComparisonRow, exerciseRows, formatMetric, muscleRows, overviewRows } from './training-comparison';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

// Paleta categórica para grupos musculares y para comparar varios ejercicios
// a la vez — misma familia desaturada que el resto de la app (PHASE_COLORS
// en nutrition-calendar), no la Tailwind *-400 saturada original.
const MUSCLE_GROUP_COLORS = ['#6e99cd', '#a18fd7', '#4d9b7f', '#cc7ba6', '#c09c41', '#4f9fc2', '#7fb0b0', '#b98a5e'];

// 2026-09 — mismo acabado que <app-nutrition-tracking-chart>: línea
// suavizada, sin puntos (salen al pasar por encima), relleno tenue solo
// cuando hay una única serie, rejilla casi invisible y tooltip oscuro.
const TICK_COLOR = 'rgba(255, 255, 255, 0.5)';
const GRID_COLOR = 'rgba(255, 255, 255, 0.06)';

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function lineStyle(color: string, fill: boolean) {
  return {
    borderColor: color,
    backgroundColor: hexToRgba(color, 0.1),
    borderWidth: 2.5,
    fill,
    tension: 0.3,
    pointRadius: 0,
    pointHoverRadius: 4,
    pointBackgroundColor: color,
  };
}

// Varias series: leyenda abajo, discreta, con muestras cuadradas como la
// leyenda HTML de nutrición.
const MULTI_SERIES_LEGEND = {
  display: true,
  position: 'bottom' as const,
  labels: { color: TICK_COLOR, font: { size: 10 }, usePointStyle: true, pointStyle: 'rectRounded' as const, boxWidth: 8, boxHeight: 8 },
};

// Tarea 4 (2026-09) — gráfica de comparación por microciclo. Un único
// componente para las 4 métricas en vez de 4 gráficas distintas: cambia el
// dataset que dibuja, no el tipo de componente, así el panel de filtro solo
// tiene que tocar un @Input.
@Component({
  selector: 'app-training-comparison-chart',
  templateUrl: './training-comparison-chart.component.html',
  styleUrls: ['./training-comparison-chart.component.scss'],
})
export class TrainingComparisonChartComponent implements OnChanges, AfterViewInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() blocks: TrainingBlock[] = [];
  @Input() blockMuscleGroups: BlockMuscleGroup[] = [];
  @Input() blockReadiness: BlockReadiness[] = [];
  @Input() blockAdherence: BlockAdherence[] = [];
  // 2026-09 — granularidad "Por sesión": mismos agregados que arriba, una
  // fila por fecha en vez de por microciclo.
  @Input() sessionTraining: SessionTraining[] = [];
  @Input() sessionMuscleGroups: SessionMuscleGroup[] = [];
  @Input() sessionReadiness: SessionReadiness[] = [];
  @Input() sessionAdherence: SessionAdherence[] = [];
  // Comparar por ejercicio, varios a la vez (2026-09 bis) — un array por
  // cada ejercicio elegido, indexado por nombre (mismo shape que devuelve
  // el backend). selectedExercises es solo para el mensaje vacío ("elige un
  // ejercicio" vs "sin datos en el rango"); la gráfica en sí itera las
  // claves de blockExerciseByName/sessionExerciseByName.
  @Input() blockExerciseByName: Record<string, BlockExerciseProgress[]> = {};
  @Input() sessionExerciseByName: Record<string, SessionExerciseProgress[]> = {};
  @Input() selectedExercises: string[] = [];
  @Input() metric: TrainingComparisonMetric = 'volume';
  @Input() granularity: TrainingGranularity = 'block';
  @Input() isLoading = false;
  @Input() hasError = false;
  @Output() retry = new EventEmitter<void>();

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  public referenceId = '';
  public comparisonId = '';
  public rows: ComparisonRow[] = [];
  public readonly format = formatMetric;
  private chart: Chart | null = null;
  private viewReady = false;

  public ngOnChanges(changes: SimpleChanges): void {
    const candidates = this.metric === 'exercise'
      ? this.blocks.filter((block) => this.blockExercise.some((exercise) => exercise.splitId === block.splitId))
      : this.blocks;
    const available = candidates.length ? candidates : this.blocks;
    if (!this.blocks.some((block) => block.splitId === this.comparisonId)) {
      this.comparisonId = available[available.length - 1]?.splitId || '';
      this.referenceId = available[available.length - 2]?.splitId || '';
    }
    if (!this.blocks.some((block) => block.splitId === this.referenceId)) {
      this.referenceId = available.find((block) => block.splitId !== this.comparisonId)?.splitId || '';
    }
    this.updateComparison();
  }
  public ngAfterViewInit(): void { this.viewReady = true; this.renderChart(); }
  public ngOnDestroy(): void { this.chart?.destroy(); }
  public get reference(): TrainingBlock | undefined { return this.blocks.find((block) => block.splitId === this.referenceId); }
  public get comparison(): TrainingBlock | undefined { return this.blocks.find((block) => block.splitId === this.comparisonId); }
  public get metricLabel(): string {
    return this.isSessionMode && this.metric === 'muscleGroups'
      ? this.translate.instant('CLIENT_DETAIL.VOLUME_BY_MUSCLE_GROUP')
      : TRAINING_COMPARISON_METRIC_LABELS[this.metric];
  }
  public get primary(): ComparisonRow | undefined { return this.rows.find((row) => row.key === (this.metric === 'exercise' ? 'load' : this.metric)); }
  public label(block: TrainingBlock): string {
    const date = block.start?.slice(5).split('-').reverse().join('/');
    return `${block.name} · ${date}`;
  }
  // A/B conserva el comparador compacto de microciclos. Los modos de la rama
  // (sesión, varias curvas, readiness y adherencia) mantienen su gráfica.
  public get showComparison(): boolean {
    return !this.isSessionMode && this.metric !== 'readiness' && this.metric !== 'adherence' &&
      (this.metric !== 'exercise' || this.selectedExercises.length <= 1);
  }
  public get selectedExercise(): string | null { return this.selectedExercises[0] || null; }
  public get blockExercise(): BlockExerciseProgress[] {
    return this.selectedExercise ? this.blockExerciseByName[this.selectedExercise] || [] : [];
  }
  public get emptyMessage(): string {
    if (this.metric === 'exercise' && !this.selectedExercises.length) return this.translate.instant('CLIENTS.ELIGE_UNO_VARIOS_EJERCICIOS_PARA');
    if (this.metric === 'readiness') return this.translate.instant('CLIENTS.NO_HAY_REGISTROS_DE_READINESS');
    if (this.metric === 'adherence') return this.translate.instant('CLIENTS.NO_HAY_SERIES_PAUTADAS_PARA');
    return this.isSessionMode ? this.translate.instant('CLIENTS.NO_HAY_SESIONES_CON_SERIES') : this.translate.instant('CLIENTS.NO_HAY_MICROCICLOS_CON_SERIES');
  }
  public selectSide(side: 'a' | 'b', id: string): void {
    if (side === 'a') {
      if (id === this.comparisonId) this.comparisonId = this.referenceId;
      this.referenceId = id;
    } else {
      if (id === this.referenceId) this.referenceId = this.comparisonId;
      this.comparisonId = id;
    }
    this.updateComparison();
  }
  public barWidth(row: ComparisonRow, side: 'a' | 'b'): number {
    const max = Math.max(...this.rows.flatMap((item) => [item.a ?? 0, item.b ?? 0]), 1);
    return ((row[side] ?? 0) / max) * 100;
  }
  private updateComparison(): void {
    if (!this.showComparison) { this.rows = []; this.renderChart(); return; }
    if (this.metric === 'exercise') {
      this.rows = exerciseRows(this.blockExercise.find((block) => block.splitId === this.referenceId), this.blockExercise.find((block) => block.splitId === this.comparisonId));
    } else if (this.metric === 'muscleGroups') {
      this.rows = muscleRows(this.blockMuscleGroups.find((block) => block.splitId === this.referenceId), this.blockMuscleGroups.find((block) => block.splitId === this.comparisonId), this.reference?.sessions || 0, this.comparison?.sessions || 0);
    } else {
      this.rows = overviewRows(this.reference, this.comparison);
      this.rows.sort((a, b) => Number(b.key === this.metric) - Number(a.key === this.metric));
    }
    this.renderChart();
  }
  private renderComparisonChart(): void {
    if (!this.viewReady) return;
    this.chart?.destroy();
    this.chart = null;
    if (this.isLoading || this.hasError || !this.hasData || this.metric === 'muscleGroups') return;
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    // En la primera carga Angular aún puede estar insertando estilos locales.
    const base = this.baseOptions();
    const accent = '#fe9000'; // --tf-macro-kcal, mismo naranja que nutrición
    const values = this.blocks.map((block) => this.metric === 'exercise'
      ? this.blockExercise.find((exercise) => exercise.splitId === block.splitId)?.maxWeight ?? null
      : blockMetric(block, this.metric));
    const unit = this.metric === 'exercise' || this.metric === 'volume' ? 'kg' : this.metric === 'sets' ? this.translate.instant('CLIENTS.SERIES_SESION') : 'sesiones';
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.blocks.map((block) => this.label(block)),
        datasets: [{
          label: this.metricLabel, data: values,
          ...lineStyle(accent, true),
          // A y B siguen marcados: son la selección de la tabla de arriba.
          pointBackgroundColor: this.blocks.map((block) => block.splitId === this.referenceId ? '#8db6dd' : accent),
          pointRadius: this.blocks.map((block) => [this.referenceId, this.comparisonId].includes(block.splitId) ? 5 : 0),
          spanGaps: false,
        }],
      },
      options: {
        ...base, animation: false,
        plugins: {
          ...base?.plugins,
          tooltip: { ...base?.plugins?.tooltip, callbacks: { label: (context) => `${formatMetric(context.parsed.y)} ${unit}` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: TICK_COLOR, maxRotation: 0, maxTicksLimit: 5, font: { size: 10 } } },
          y: {
            beginAtZero: true,
            title: { display: true, text: unit, color: TICK_COLOR, font: { size: 10 } },
            grid: { color: GRID_COLOR },
            ticks: { color: TICK_COLOR, font: { size: 10 } },
          },
        },
      },
    };
    this.chart = new Chart(ctx, config);
  }

  // 'sessions' (conteo DE sesiones por microciclo) no tiene lectura por
  // sesión con sentido — siempre sale por microciclo, ignorando el toggle.
  private get isSessionMode(): boolean {
    return this.granularity === 'session' && this.metric !== 'sessions';
  }

  public get hasData(): boolean {
    if (this.metric === 'muscleGroups') {
      return this.isSessionMode ? this.sessionMuscleGroups.length > 0 : this.blockMuscleGroups.length > 0;
    }
    if (this.metric === 'exercise') {
      const byName = this.isSessionMode ? this.sessionExerciseByName : this.blockExerciseByName;
      return Object.values(byName).some((entries) => entries.length > 0);
    }
    // 'readiness' — al menos una fila con AL MENOS una de las dos métricas,
    // no basta con que exista la fila (puede no traer ningún pulso).
    if (this.metric === 'readiness') {
      return this.isSessionMode
        ? this.sessionReadiness.some((s) => s.readinessPre !== null || s.perceivedEffortPost !== null)
        : this.blockReadiness.some((b) => b.avgReadinessPre !== null || b.avgPerceivedEffortPost !== null);
    }
    if (this.metric === 'adherence') {
      return this.isSessionMode
        ? this.sessionAdherence.some((s) => s.adherence !== null)
        : this.blockAdherence.some((b) => b.adherence !== null);
    }
    return this.isSessionMode ? this.sessionTraining.length > 0 : this.blocks.length > 0;
  }

  private renderChart(): void {
    if (!this.viewReady) return;
    this.chart?.destroy();
    this.chart = null;
    if (this.isLoading || this.hasError || !this.hasData) return;
    if (this.showComparison) { this.renderComparisonChart(); return; }
    const ctx = this.chartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;

    const config =
      this.metric === 'muscleGroups'
        ? this.buildMuscleGroupConfig()
        : this.metric === 'exercise'
        ? this.buildExerciseConfig()
        : this.metric === 'readiness'
        ? this.buildReadinessConfig()
        : this.metric === 'adherence'
        ? this.buildAdherenceConfig()
        : this.buildSimpleMetricConfig();

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, config);
  }

  // Etiqueta del eje X en modo "Por sesión": la fecha corta, no el nombre
  // del microciclo (que se repite en varias sesiones seguidas y no
  // distinguiría los puntos).
  private sessionLabel(item: { date: string }): string {
    return new Date(`${item.date}T00:00:00`).toLocaleDateString(uiLocale(), {
      day: '2-digit',
      month: 'short',
    });
  }

  // Comparar por ejercicio, varios a la vez (2026-09 bis) — una línea de
  // peso máximo por ejercicio elegido (mismo criterio que PersonalRecord: es
  // como un entrenador lee un récord), coloreadas como los grupos
  // musculares. Volumen y series quedan en el tooltip como contexto, no
  // como líneas propias.
  //
  // El eje X es CANÓNICO (todos los microciclos/sesiones del rango, ver
  // this.blocks/this.sessionTraining), no la unión de los que tiene cada
  // ejercicio: dos ejercicios entrenados en días distintos deben alinearse
  // contra el mismo eje, con hueco (`null`, Chart.js corta la línea ahí,
  // `spanGaps` false por defecto) donde ese ejercicio no se hizo — mismo
  // criterio que ya usa buildReadinessConfig para sesiones sin pulso.
  private buildExerciseConfig(): ChartConfiguration<'line'> {
    const sessionMode = this.isSessionMode;
    const byName = sessionMode ? this.sessionExerciseByName : this.blockExerciseByName;
    const names = this.selectedExercises.length ? this.selectedExercises : Object.keys(byName);

    const canonicalKeys = sessionMode
      ? this.sessionTraining.map((s) => s.date)
      : this.blocks.map((b) => b.splitId);
    const labels = sessionMode
      ? this.sessionTraining.map((s) => this.sessionLabel(s))
      : this.blocks.map((b) => this.blockLabel(b));

    // Normaliza block/session a la misma forma (clave + los 3 valores) para
    // no repartir casts de tipo por todo el método.
    const entriesByName = new Map<string, Map<string, { maxWeight: number; volume: number; sets: number }>>();
    for (const name of names) {
      const rows = byName[name] || [];
      const byKey = new Map(
        rows.map((row): [string, { maxWeight: number; volume: number; sets: number }] => [
          sessionMode ? (row as SessionExerciseProgress).date : (row as BlockExerciseProgress).splitId,
          { maxWeight: row.maxWeight, volume: row.volume, sets: row.sets },
        ])
      );
      entriesByName.set(name, byKey);
    }

    const datasets = names.map((name, index) => {
      const byKey = entriesByName.get(name)!;
      const color = MUSCLE_GROUP_COLORS[index % MUSCLE_GROUP_COLORS.length];
      return {
        label: name,
        data: canonicalKeys.map((key) => byKey.get(key)?.maxWeight ?? null),
        ...lineStyle(color, names.length === 1),
      };
    });

    const base = this.baseOptions();
    return {
      type: 'line',
      data: { labels, datasets },
      options: {
        ...base,
        plugins: {
          ...base.plugins,
          legend: MULTI_SERIES_LEGEND,
          tooltip: {
            ...base.plugins?.tooltip,
            callbacks: {
              afterLabel: (context) => {
                const name = names[context.datasetIndex];
                const key = canonicalKeys[context.dataIndex];
                const entry = entriesByName.get(name)?.get(key);
                return entry ? [this.translate.instant('CLIENTS.VOLUMEN_KG_2', { volume: entry.volume }), this.translate.instant('CLIENTS.SERIES', { sets: entry.sets })] : [];
              },
            },
          },
        },
      },
    };
  }

  private blockLabel(block: { name: string; start?: string; end?: string }): string {
    return block.name;
  }

  // 2026-09 — readiness (antes de entrenar) y esfuerzo percibido (después),
  // promediados por microciclo. Dos líneas en la MISMA escala 1-5 (a
  // diferencia de sessions/sets/volume, que sí comparten eje con
  // beginAtZero): un eje que empezara en 0 aplastaría la diferencia real
  // entre "3 de esfuerzo" y "4 de esfuerzo", que es exactamente lo que el
  // entrenador necesita distinguir. Bloques sin ningún pulso registrado se
  // dejan como `null` en el dataset (Chart.js corta la línea ahí, `spanGaps`
  // false por defecto) en vez de un 0 que se leería como "agotado".
  private buildReadinessConfig(): ChartConfiguration<'line'> {
    const sessionMode = this.isSessionMode;
    const labels = sessionMode
      ? this.sessionReadiness.map((s) => this.sessionLabel(s))
      : this.blockReadiness.map((b) => this.blockLabel(b));
    const readinessData = sessionMode
      ? this.sessionReadiness.map((s) => s.readinessPre)
      : this.blockReadiness.map((b) => b.avgReadinessPre);
    const effortData = sessionMode
      ? this.sessionReadiness.map((s) => s.perceivedEffortPost)
      : this.blockReadiness.map((b) => b.avgPerceivedEffortPost);
    const base = this.baseOptions();

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.translate.instant('CLIENTS.READINESS_ANTES_DE_ENTRENAR'),
            data: readinessData,
            ...lineStyle('#4f9fc2', false),
          },
          {
            label: this.translate.instant('CLIENTS.ESFUERZO_PERCIBIDO_AL_TERMINAR'),
            data: effortData,
            ...lineStyle('#fe9000', false),
          },
        ],
      },
      options: {
        ...base,
        plugins: {
          ...base.plugins,
          legend: MULTI_SERIES_LEGEND,
          tooltip: {
            ...base.plugins?.tooltip,
            callbacks: sessionMode
              ? {}
              : {
                  afterLabel: (context) => {
                    const block = this.blockReadiness[context.dataIndex];
                    if (!block) return [];
                    return [this.translate.instant('CLIENTS.SESION_ES_CON_PULSO_REGISTRADO', { sessionsWithPulse: block.sessionsWithPulse })];
                  },
                },
          },
        },
        scales: {
          ...base.scales,
          y: {
            min: 1,
            max: 5,
            grid: { color: GRID_COLOR },
            ticks: { color: TICK_COLOR, font: { size: 10 }, stepSize: 1 },
          },
        },
      },
    };
  }

  // Adherencia (2026-09) — % de series hechas frente a las pautadas. Una
  // sola línea 0-100%, sin relleno (a diferencia del resto de métricas
  // "simples"): el relleno bajo una línea que puede tocar 0% se lee como
  // "barra vacía", que confunde con un gráfico de progreso.
  private buildAdherenceConfig(): ChartConfiguration<'line'> {
    const sessionMode = this.isSessionMode;
    const items: Array<{ adherence: number | null }> = sessionMode ? this.sessionAdherence : this.blockAdherence;
    const labels = sessionMode
      ? this.sessionAdherence.map((s) => this.sessionLabel(s))
      : this.blockAdherence.map((b) => this.blockLabel(b));
    const base = this.baseOptions();

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.translate.instant('CLIENTS.ADHERENCIA_LO_PAUTADO'),
            data: items.map((i) => i.adherence),
            ...lineStyle('#4d9b7f', false),
          },
        ],
      },
      options: {
        ...base,
        plugins: {
          ...base.plugins,
          tooltip: {
            ...base.plugins?.tooltip,
            callbacks: {
              afterLabel: (context) => {
                if (sessionMode) {
                  const session = this.sessionAdherence[context.dataIndex];
                  return session ? [this.translate.instant('CLIENTS.DE_SERIES', { donedSets: session.donedSets, totalSets: session.totalSets })] : [];
                }
                const block = this.blockAdherence[context.dataIndex];
                return block ? [this.translate.instant('CLIENTS.SESION_ES', { sessions: block.sessions })] : [];
              },
            },
          },
        },
        scales: {
          ...base.scales,
          y: { min: 0, max: 100, grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR, font: { size: 10 }, stepSize: 20 } },
        },
      },
    };
  }

  private buildSimpleMetricConfig(): ChartConfiguration<'line'> {
    // 'sessions' siempre por microciclo (ver isSessionMode).
    if (this.isSessionMode) {
      const labels = this.sessionTraining.map((s) => this.sessionLabel(s));
      const data = this.sessionTraining.map((s) => (this.metric === 'sets' ? s.sets : s.volume));
      return {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: this.metricUnitLabel(),
              data,
              ...lineStyle('#fe9000', true),
            },
          ],
        },
        options: this.baseOptions(),
      };
    }

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
            ...lineStyle('#fe9000', true),
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
    const sessionMode = this.isSessionMode;
    const items = sessionMode ? this.sessionMuscleGroups : this.blockMuscleGroups;
    const labels = sessionMode
      ? this.sessionMuscleGroups.map((s) => this.sessionLabel(s))
      : this.blockMuscleGroups.map((b) => this.blockLabel(b));
    const allGroups = Array.from(new Set(items.flatMap((b) => b.muscleGroups.map((g) => g.group))));

    const datasets = allGroups.map((group, index) => {
      const color = MUSCLE_GROUP_COLORS[index % MUSCLE_GROUP_COLORS.length];
      return {
        label: group,
        data: items.map((b) => b.muscleGroups.find((g) => g.group === group)?.volume ?? 0),
        ...lineStyle(color, allGroups.length === 1),
      };
    });

    return {
      type: 'line',
      data: { labels, datasets },
      options: {
        ...this.baseOptions(),
        plugins: {
          ...this.baseOptions().plugins,
          legend: MULTI_SERIES_LEGEND,
        },
      },
    };
  }

  private metricUnitLabel(): string {
    if (this.metric === 'sessions') return this.translate.instant('CLIENTS.ENTRENOS_COMPLETADOS');
    if (this.metric === 'sets') return this.translate.instant('CLIENTS.SERIES_COMPLETADAS');
    return this.translate.instant('CLIENTS.VOLUMEN_KG');
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
        x: { grid: { display: false }, ticks: { color: TICK_COLOR, font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 10 } },
        y: { beginAtZero: true, grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR, font: { size: 10 } } },
      },
    };
  }
}
