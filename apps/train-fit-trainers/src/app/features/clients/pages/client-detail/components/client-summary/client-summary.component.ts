import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';
import { CoachAlert, CoachAlertPriority } from 'src/app/features/dashboard/models/coach-alert.model';
import { CoachAlertsApiService } from 'src/app/features/dashboard/services/coach-alerts-api.service';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { ClientDetailTab } from '../../models/client-detail.model';
import {
  AdherenceDimension,
  AdherenceDimensionKey,
  ClientProgress,
  ClientSummary,
  ClientTrainingProgress,
  PROGRESS_WEEK_OPTIONS,
  PersonalRecord,
  PlanChange,
  PlanChangeEntity,
  PlanChangeField,
  ProgressDelta,
  ProgressWeek,
  TrainingWeek,
} from '../../models/client-progress.model';

type SectionState = 'loading' | 'error' | 'loaded';

const DIMENSION_LABELS: Record<AdherenceDimensionKey, string> = {
  nutrition: 'Nutrición',
  training: 'Entrenamiento',
  habits: 'Hábitos',
  checkins: 'Check-ins',
};

const DIMENSION_ICONS: Record<AdherenceDimensionKey, string> = {
  nutrition: 'nutrition-outline',
  training: 'barbell-outline',
  habits: 'footsteps-outline',
  checkins: 'clipboard-outline',
};

// Por qué una dimensión no se puede medir. Se dice explícitamente en vez de
// pintar un 0% o esconder la fila: "sin hábitos asignados" es información
// accionable (asígnalos), un 0% sería mentira y un hueco sería un misterio.
// Las claves son las que envía el backend y no se tocan; lo que cambia es
// el texto que lee el entrenador (Movimiento 1: "tareas" -> "hábitos").
const UNAVAILABLE_LABELS: Record<string, string> = {
  sin_datos: 'Sin datos suficientes',
  sin_plan: 'Sin rutina asignada',
  sin_tareas: 'Sin hábitos asignados',
  sin_cadencia: 'Sin check-in configurado',
  periodo_corto: 'Aún no tocaba ninguno',
};

const PRIORITY_LABELS: Record<CoachAlertPriority, string> = {
  high: 'Urgente',
  medium: 'Revisar',
  low: 'Menor',
};

const CHANGE_ENTITY_LABELS: Record<PlanChangeEntity, string> = {
  nutritional_goal: 'Objetivo nutricional',
  diet_plan: 'Plan de nutrición',
  routine: 'Rutina',
  checkin_config: 'Check-in',
  protocol: 'Protocolo',
};

// Una fila de la tabla de evolución. Se construye solo con las métricas que
// tienen algún dato en la ventana pedida — así la tabla no arrastra filas
// vacías de todo lo que este cliente no reporta.
interface TrendRow {
  label: string;
  values: (number | null)[];
  unit: string;
  decimals: number;
}

// Si bajar es "mejor" no se puede saber sin conocer el objetivo del cliente
// (que el modelo no guarda). Por eso la variación se pinta neutra: flecha y
// número, sin verde ni rojo. El coach ya sabe qué busca.
interface ComparisonRow {
  label: string;
  delta: ProgressDelta;
  unit: string;
  decimals: number;
}

@Component({
  selector: 'app-client-summary',
  templateUrl: 'client-summary.component.html',
  styleUrls: ['client-summary.component.scss'],
})
export class ClientSummaryComponent implements OnInit {
  @Input() public clientId = '';
  @Input() public clientName = '';

  // El resumen no navega por su cuenta: pide al padre que cambie de
  // pestaña con su selectTab() de siempre. Meter aquí un router.navigate
  // con query params habría creado un segundo mecanismo de navegación entre
  // pestañas conviviendo con el que ya funciona.
  @Output() public openTab = new EventEmitter<ClientDetailTab>();

  // Fase 6 — la sección de entrenamiento solo se pide (y se pinta) si el
  // cliente tiene ese ámbito: su consulta es la más cara del módulo y a un
  // cliente de solo nutrición no le aporta nada.
  @Input() public hasTrainingScope = false;

  public readonly weekOptions = PROGRESS_WEEK_OPTIONS;
  public readonly dimensionOrder: AdherenceDimensionKey[] = [
    'nutrition',
    'training',
    'habits',
    'checkins',
  ];

  public summaryState: SectionState = 'loading';
  public summary: ClientSummary | null = null;

  // Fase 4 — historial de cambios. Sección propia y no otra pestaña: la
  // pregunta "¿por qué está hoy en 2100 kcal?" se hace mirando su progreso,
  // no en un sitio aparte.
  public changesState: SectionState = 'loading';
  public changes: PlanChange[] = [];
  public showAllChanges = false;

  public progressState: SectionState = 'loading';
  public progress: ClientProgress | null = null;
  public selectedWeeks = PROGRESS_WEEK_OPTIONS[0];

  public trainingState: SectionState = 'loading';
  public training: ClientTrainingProgress | null = null;

  // Calculadas UNA vez al recibir la respuesta, no en getters. Un getter
  // consumido por la plantilla se reevalúa en cada ciclo de detección de
  // cambios de Angular, y estas dos recorren la serie entera montando
  // arrays nuevos — con 12 semanas × 10 métricas eso es trabajo repetido en
  // cada pulsación de tecla de cualquier parte de la ficha.
  public comparisonRows: ComparisonRow[] = [];
  public trendRows: TrendRow[] = [];

  private resolvingAlertIds = new Set<string>();

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private coachAlertsApi: CoachAlertsApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.loadSummary();
    this.loadProgress();
    this.loadChanges();
    if (this.hasTrainingScope) this.loadTraining();
  }

  // --- Entrenamiento (Fase 6) ---

  public loadTraining(): void {
    if (!this.clientId || !this.hasTrainingScope) return;
    this.trainingState = 'loading';
    this.clientDetailApi.getTrainingProgress(this.clientId, this.selectedWeeks).subscribe({
      next: (training) => {
        this.training = training;
        this.trainingState = 'loaded';
      },
      error: () => {
        this.trainingState = 'error';
      },
    });
  }

  public get topRecords(): PersonalRecord[] {
    return (this.training?.personalRecords || []).slice(0, 5);
  }

  // Última semana con volumen registrado. Es el número que responde "¿cuánto
  // está moviendo ahora?" sin obligar a leer toda la serie.
  public get lastTrainingWeek(): TrainingWeek | null {
    const weeks = [...(this.training?.weekly || [])].reverse();
    return weeks.find((w) => w.volume !== null) || null;
  }


  public loadChanges(): void {
    if (!this.clientId) return;
    this.changesState = 'loading';
    this.clientDetailApi.getChanges(this.clientId).subscribe({
      next: (changes) => {
        this.changes = changes;
        this.changesState = 'loaded';
      },
      error: () => {
        this.changesState = 'error';
      },
    });
  }

  public get visibleChanges(): PlanChange[] {
    return this.showAllChanges ? this.changes : this.changes.slice(0, 5);
  }

  public get hiddenChangesCount(): number {
    return Math.max(0, this.changes.length - 5);
  }

  public changeTitle(change: PlanChange): string {
    const entityLabel = CHANGE_ENTITY_LABELS[change.entity] || 'Cambio';
    return change.entityName ? `${entityLabel}: ${change.entityName}` : entityLabel;
  }

  // "2200 → 2100" es la forma en que un coach lee un cambio. Un valor vacío
  // se dice con palabra ("sin definir"), no con una flecha desde la nada.
  public changeDetail(field: PlanChangeField): string {
    const before = field.previousValue === null || field.previousValue === undefined
      ? 'sin definir'
      : String(field.previousValue);
    const after = field.newValue === null || field.newValue === undefined
      ? 'sin definir'
      : String(field.newValue);
    return `${before} → ${after}`;
  }

  public trackByChangeId(_index: number, change: PlanChange): string {
    return change._id;
  }

  // Dos cargas separadas: cambiar la ventana de 4 a 12 semanas no debe
  // recargar (ni hacer parpadear) el bloque de adherencia, que no depende
  // de ella.
  public loadSummary(): void {
    if (!this.clientId) return;
    this.summaryState = 'loading';
    this.clientDetailApi.getSummary(this.clientId).subscribe({
      next: (summary) => {
        this.summary = summary;
        this.summaryState = 'loaded';
      },
      error: () => {
        this.summaryState = 'error';
      },
    });
  }

  public loadProgress(): void {
    if (!this.clientId) return;
    this.progressState = 'loading';
    this.clientDetailApi.getProgress(this.clientId, this.selectedWeeks).subscribe({
      next: (progress) => {
        this.progress = progress;
        this.comparisonRows = this.buildComparisonRows(progress);
        this.trendRows = this.buildTrendRows(progress);
        this.progressState = 'loaded';
      },
      error: () => {
        this.progressState = 'error';
      },
    });
  }

  // La ventana es una sola para toda la pestaña: si evolución mostrara 12
  // semanas y entrenamiento 4, los dos bloques contarían cosas distintas
  // bajo el mismo selector.
  public selectWeeks(weeks: number): void {
    if (weeks === this.selectedWeeks) return;
    this.selectedWeeks = weeks;
    this.loadProgress();
    if (this.hasTrainingScope) this.loadTraining();
  }

  // --- Adherencia ---

  public dimensionLabel(key: AdherenceDimensionKey): string {
    return DIMENSION_LABELS[key];
  }

  public dimensionIcon(key: AdherenceDimensionKey): string {
    return DIMENSION_ICONS[key];
  }

  public unavailableLabel(dimension: AdherenceDimension): string {
    return UNAVAILABLE_LABELS[dimension.reason || ''] || 'No disponible';
  }

  public get weakestLabel(): string | null {
    const weakest = this.summary?.adherence.weakest;
    if (!weakest) return null;
    return DIMENSION_LABELS[weakest];
  }

  // El punto débil solo merece señalarse si hay más de una dimensión con la
  // que compararlo — con una sola, "el peor" es también "el único".
  public get showsWeakest(): boolean {
    return (this.summary?.adherence.applicableCount || 0) > 1;
  }

  public isWeakest(key: AdherenceDimensionKey): boolean {
    return this.showsWeakest && this.summary?.adherence.weakest === key;
  }

  // Cada dimensión de adherencia tiene una pestaña donde se mira por qué ese
  // número es el que es. El Resumen ya decía "Donde más falla: Hábitos"; sin
  // esto, había que adivinar en cuál de las nueve subpestañas estaban.
  // La pestaña de destino puede no existir para este cliente (un cliente solo
  // de nutrición no tiene Entrenamiento): eso lo resuelve selectTab en la
  // página, que cae a la primera disponible de la sección.
  private static readonly TAB_POR_DIMENSION: Record<AdherenceDimensionKey, ClientDetailTab> = {
    nutrition: 'nutrition',
    training: 'training',
    habits: 'tasks',
    checkins: 'checkins',
  };

  public dimensionTab(key: AdherenceDimensionKey): ClientDetailTab {
    return ClientSummaryComponent.TAB_POR_DIMENSION[key];
  }

  public dimensionAriaLabel(key: AdherenceDimensionKey): string {
    return `Ver ${DIMENSION_LABELS[key].toLowerCase()} de este cliente`;
  }

  // --- Alertas de este cliente ---

  public priorityLabel(priority: CoachAlertPriority): string {
    return PRIORITY_LABELS[priority] || 'Revisar';
  }

  public isResolving(alert: CoachAlert): boolean {
    return this.resolvingAlertIds.has(alert._id);
  }

  // Mismo criterio optimista que el dashboard: la fila desaparece al
  // instante y el error la devuelve. Aquí sin "deshacer" en el toast — el
  // coach está en la propia ficha y puede reabrirla desde el historial.
  public resolveAlert(alert: CoachAlert): void {
    if (!this.summary || this.resolvingAlertIds.has(alert._id)) return;

    const previous = this.summary.alerts;
    this.resolvingAlertIds.add(alert._id);
    this.summary.alerts = previous.filter((a) => a._id !== alert._id);

    this.coachAlertsApi.setStatus(alert._id, 'resolved').subscribe({
      next: () => this.resolvingAlertIds.delete(alert._id),
      error: (error) => {
        this.resolvingAlertIds.delete(alert._id);
        if (this.summary) this.summary.alerts = previous;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo resolver la alerta');
      },
    });
  }

  // --- Comparativa semana vs semana ---

  // Solo las métricas presentes en AMBAS semanas llegan del backend; aquí
  // solo se les pone nombre y unidad.
  private buildComparisonRows(progress: ClientProgress): ComparisonRow[] {
    const comparison = progress.comparison;
    if (!comparison) return [];

    const rows: ComparisonRow[] = [];
    const push = (label: string, delta: ProgressDelta | null, unit: string, decimals = 1): void => {
      if (delta) rows.push({ label, delta, unit, decimals });
    };

    push('Peso medio', comparison.weightAverage, 'kg');
    push('Adherencia nutricional', comparison.nutritionAdherence, '%', 0);
    push('Sesiones entrenadas', comparison.sessions, '', 0);
    push('Adherencia hábitos', comparison.habitsAdherence, '%', 0);
    push('Sesiones', comparison.sessions, '', 0);

    for (const delta of Object.values(comparison.measurements || {})) {
      push(delta.label || 'Medida', delta, 'cm');
    }
    for (const delta of Object.values(comparison.wellbeing || {})) {
      push(delta.label || 'Bienestar', delta, '', 1);
    }

    return rows;
  }

  // --- Tabla de evolución ---

  private buildTrendRows(progress: ClientProgress): TrendRow[] {
    const series = progress.series || [];
    if (!series.length) return [];

    const rows: TrendRow[] = [];
    const push = (label: string, values: (number | null)[], unit: string, decimals: number): void => {
      // Una fila entera sin datos no se pinta: la tabla debe mostrar lo que
      // este cliente reporta, no el catálogo completo de lo que podría.
      if (values.some((v) => v !== null && v !== undefined)) {
        rows.push({ label, values, unit, decimals });
      }
    };

    push('Peso medio', series.map((w) => w.weight?.average ?? null), 'kg', 1);
    push('Nutrición', series.map((w) => w.nutritionAdherence), '%', 0);
    push('Sesiones', series.map((w) => w.sessions), '', 0);
    push('Sesiones', series.map((w) => w.sessions), '', 0);
    push('Hábitos', series.map((w) => w.habitsAdherence), '%', 0);

    for (const key of this.measurementKeys(series)) {
      push(
        CHECKIN_FIELDS_BY_KEY.get(this.checkinKeyForMeasurement(key))?.label || key,
        series.map((w) => w.measurements?.[key] ?? null),
        'cm',
        1
      );
    }

    for (const key of this.wellbeingKeys(series)) {
      push(
        CHECKIN_FIELDS_BY_KEY.get(key)?.label || key,
        series.map((w) => w.wellbeing?.[key] ?? null),
        '',
        1
      );
    }

    return rows;
  }

  private measurementKeys(series: ProgressWeek[]): string[] {
    const keys = new Set<string>();
    series.forEach((week) => Object.keys(week.measurements || {}).forEach((k) => keys.add(k)));
    return [...keys];
  }

  private wellbeingKeys(series: ProgressWeek[]): string[] {
    const keys = new Set<string>();
    series.forEach((week) => Object.keys(week.wellbeing || {}).forEach((k) => keys.add(k)));
    return [...keys];
  }

  // El catálogo indexa por clave de check-in (perimeter_waist), pero la
  // serie viene indexada por campo de Anthropometry (waist) — que es como
  // se guardan realmente. Se busca la clave de catálogo cuyo
  // anthropometryField coincide, para obtener la etiqueta en español sin
  // mantener un segundo diccionario.
  private checkinKeyForMeasurement(anthropometryField: string): string {
    for (const field of CHECKIN_FIELDS_BY_KEY.values()) {
      if (field.anthropometryField === anthropometryField) return field.key;
    }
    return anthropometryField;
  }

  // Acepta cualquier semana con `start`: la usan tanto la serie de progreso
  // como la de entrenamiento, que comparten las mismas ventanas pero no el
  // resto de campos.
  public weekLabel(week: { start: string }, index: number, total: number): string {
    if (index === total - 1) return 'Actual';
    const [, month, day] = week.start.split('-');
    return `${Number(day)}/${Number(month)}`;
  }

  // Formato español (coma decimal, punto de millar). El `number` pipe de
  // Angular usa el LOCALE_ID global, que en este proyecto sigue siendo
  // en-US: pintaría "1,234.5" donde aquí se lee "1.234,5", y además chocaría
  // con las frases de alerta, que el backend ya emite con coma decimal.
  //
  // Mismo mecanismo que EsNumberPipe (shared-features/.../statistics), que
  // resuelve esto para otra pantalla. Duplicarlo aquí en vez de promover
  // aquel pipe a SharedModule es deliberado por alcance: moverlo obligaría
  // a tocar su módulo actual, ajeno a esta funcionalidad. Consolidar los dos
  // (y registrar el locale de una vez) es trabajo de la Fase 7.
  public formatValue(value: number | null, decimals: number): string {
    if (value === null || value === undefined) return '—';
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  public deltaSign(delta: ProgressDelta): string {
    if (delta.absolute > 0) return '+';
    return '';
  }

  public deltaIcon(delta: ProgressDelta): string {
    if (delta.absolute > 0) return 'arrow-up-outline';
    if (delta.absolute < 0) return 'arrow-down-outline';
    return 'remove-outline';
  }

  public trackByAlertId(_index: number, alert: CoachAlert): string {
    return alert._id;
  }

  public trackByRowLabel(_index: number, row: { label: string }): string {
    return row.label;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
