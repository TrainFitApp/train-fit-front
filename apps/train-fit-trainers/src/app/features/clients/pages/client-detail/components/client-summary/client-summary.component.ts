import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';
import { PainEntry, PainThreshold, worstByZone } from 'src/app/core/constants/pain';
import {
  PerimeterFilterPanelComponent,
  PerimeterOption,
} from '../perimeter-filter-panel/perimeter-filter-panel.component';
import {
  CoachAlert,
  CoachAlertPriority,
  CoachAlertType,
} from 'src/app/features/dashboard/models/coach-alert.model';
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
  // Auditoría 2026-09 — reservado ahora para "SÍ hay plan de dieta, pero
  // todavía no hay datos de seguimiento" (recién asignado, sin contenido, o
  // modo "choice" sin elegir). El HTML añade "— plan asignado: X" a
  // continuación; el texto ya no dice "suficientes" para no sonar a
  // contradicción cuando el plan es real y solo lleva poco tiempo.
  sin_datos: 'Sin datos de seguimiento todavía',
  // Auditoría 2026-09 — antes "sin_datos" cubría también el caso de NO tener
  // ningún plan de dieta asignado, y ese mismo texto ("sin datos
  // suficientes") aparecía igual con y sin plan real de por medio — mismo
  // tipo de bug que sin_plan/sin_sesiones_en_ventana de entrenamiento. Ver
  // adherence-service.js#nutritionDimension.
  sin_plan_nutricion: 'Sin plan de nutrición asignado',
  // Tarea 5 (2026-09) — ahora hace falta una FASE con fecha (RoutineAssignment),
  // no solo una tabla asignada. "Sin fase EN CURSO" y no "sin fase
  // programada": una fase programada para el futuro (todavía no vigente)
  // también cae en este reason, y "programada" habría dicho justo lo
  // contrario de lo que pasa — auditoría 2026-09.
  sin_plan: 'Sin fase en curso',
  // Auditoría 2026-09 — hay fase vigente, pero la ventana medida cae entera
  // en días de descanso planificado (ej. una fase que empieza hoy y cuyo
  // primer día de rutina es de descanso). Antes esto se confundía con
  // "sin_plan" y decía "sin fase en curso" siendo falso.
  sin_sesiones_en_ventana: 'Sin sesiones previstas en este periodo',
  sin_tareas: 'Sin hábitos asignados',
  sin_cadencia: 'Sin check-in configurado',
  periodo_corto: 'Aún no tocaba ninguno',
};

const PRIORITY_LABELS: Record<CoachAlertPriority, string> = {
  high: 'Urgente',
  medium: 'Revisar',
  low: 'Menor',
};

// Mismo catálogo que dashboard.page.ts#ALERT_ICONS — un icono por tipo para
// distinguir "peso" de "check-in" de un vistazo. Duplicado a propósito
// (mismo criterio que PRIORITY_LABELS de arriba): consolidarlo es aparte.
const ALERT_ICONS: Record<CoachAlertType, string> = {
  pending_review: 'document-text-outline',
  checkin_overdue: 'clipboard-outline',
  plan_ending_soon: 'hourglass-outline',
  stagnation: 'remove-outline',
  weight_change: 'trending-up-outline',
  measurement_change: 'resize-outline',
  low_adherence: 'pie-chart-outline',
  inactive_client: 'moon-outline',
  no_training_activity: 'barbell-outline',
};

// Quién tiene que mover ficha ante cada tipo de alerta — CoachAlert no
// modela un campo "owner" propio; esto es una categoría puramente derivada
// del `type` ya real, no un dato nuevo inventado.
const OWNER_BY_TYPE: Record<CoachAlertType, string> = {
  pending_review: 'Tú revisas',
  checkin_overdue: 'Pendiente del cliente',
  plan_ending_soon: 'Tú decides',
  stagnation: 'Tú decides',
  weight_change: 'Tú revisas',
  measurement_change: 'Tú revisas',
  low_adherence: 'Tú decides',
  inactive_client: 'Pendiente del cliente',
  no_training_activity: 'Pendiente del cliente',
};

// A qué subpestaña lleva "Ver" — solo los tipos con un destino inequívoco.
// Los demás se quedan solo con el botón de resolver, sin enlace que no lleve
// a ningún sitio concreto.
const TAB_BY_ALERT_TYPE: Partial<Record<CoachAlertType, ClientDetailTab>> = {
  checkin_overdue: 'measurements',
  weight_change: 'measurements',
  measurement_change: 'measurements',
  stagnation: 'measurements',
  no_training_activity: 'training',
};

const CHANGE_ENTITY_LABELS: Record<PlanChangeEntity, string> = {
  nutritional_goal: 'Objetivo nutricional',
  diet_plan: 'Plan de nutrición',
  routine: 'Rutina',
  checkin_config: 'Check-in',
  protocol: 'Protocolo',
};

// Una fila de la tabla de perímetros. Se construye solo con las circunferencias
// que tienen algún dato en la ventana pedida — así la tabla no arrastra filas
// vacías de todo lo que este cliente no reporta.
interface TrendRow {
  label: string;
  values: (number | null)[];
  unit: string;
  decimals: number;
}

// Recordada por ENTRENADOR, no por cliente: un coach suele mirar los mismos
// perímetros con toda su cartera (patrón ya usado en los paneles del
// planner — localStorage plano, sin servicio de por medio).
const PERIMETERS_STORAGE_KEY = 'tf-trainers.summary-primary-perimeters';
// Cintura y cadera son las de más señal clínica cuando el entrenador todavía
// no ha elegido nada — no un catálogo entero de 16 perímetros de golpe.
const DEFAULT_PERIMETERS = ['waist', 'hip'];

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

  // La cabecera persistente (avatar/nombre/badge/programa) vive en
  // client-detail.page.html, no aquí — así se ve igual en las 4 secciones,
  // no solo en Resumen (ver petición del usuario 2026-09). El badge de
  // estado necesita `summary.alerts`, que solo este componente pide, así
  // que se calcula aquí y se emite hacia arriba.
  @Output() public statusChange = new EventEmitter<'attention' | 'ok' | 'insufficient'>();

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
  // Perímetros con dato en la ventana actual, cuáles son "principales" (hasta
  // MAX_PRIMARY_PERIMETERS, elegidos vía modal) y las filas ya repartidas
  // entre la tabla siempre visible y la desplegable.
  public perimeterOptions: PerimeterOption[] = [];
  public selectedPerimeters = new Set<string>();
  public primaryTrendRows: TrendRow[] = [];
  public otherTrendRows: TrendRow[] = [];
  public showMorePerimeters = false;
  private perimetersInitialized = false;

  private resolvingAlertIds = new Set<string>();

  // --- Franja de dolor (rediseño "Cliente Resumen") ---
  public painState: SectionState = 'loading';
  public painEntries: PainEntry[] = [];
  public painThresholds: PainThreshold[] = [];
  private static readonly PAIN_WINDOW_DAYS = 28;

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private coachAlertsApi: CoachAlertsApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.loadSummary();
    this.loadProgress();
    this.loadChanges();
    this.loadPain();
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
        // La cabecera persistente (client-detail.page.html) pinta el badge
        // de estado; solo este componente pide las alertas que lo deciden.
        // this.summary ya está asignado arriba, así que clientStatus nunca
        // devuelve null en este punto.
        this.statusChange.emit(this.clientStatus!);
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
        this.perimeterOptions = this.buildPerimeterOptions(progress.series || []);
        this.initSelectedPerimeters();
        this.applyPerimeterRows(progress.series || []);
        this.progressState = 'loaded';
      },
      error: () => {
        this.progressState = 'error';
      },
    });
  }

  // La ventana es una sola para toda la pestaña: si perímetros mostrara 12
  // semanas y entrenamiento 4, los dos bloques contarían cosas distintas
  // bajo el mismo selector.
  public selectWeeks(weeks: number): void {
    if (weeks === this.selectedWeeks) return;
    this.selectedWeeks = weeks;
    this.loadProgress();
    if (this.hasTrainingScope) this.loadTraining();
  }

  // --- Estado del cliente (consumido por la cabecera del padre) ---

  // Auditoría 2026-09 — por debajo de esto el global se trata como señal de
  // "atención" aunque el cron nocturno de alertas no la haya recogido
  // todavía. Mismo umbral que coach-signals-service.js#criticalAdherencePct
  // (nutrición) — no se inventa un segundo número para lo mismo.
  private static readonly ATTENTION_OVERALL_THRESHOLD_PCT = 50;

  // Requiere atención / Sin incidencias / Datos insuficientes — derivado por
  // completo de lo que ya trae getSummary(), sin ningún campo nuevo.
  //
  // Antes SOLO miraba si había una alerta abierta — y las alertas las genera
  // un cron una vez al día (coach-alert-cron.js, 05:00), así que un cliente
  // con 0% de adherencia HOY (p. ej. una rutina recién asignada y ninguna
  // sesión hecha) se veía "Sin incidencias detectadas" hasta el día
  // siguiente, con el número real ya visible dos líneas más abajo en la
  // misma pantalla. `overall` ya viene calculado en el mismo summary, así
  // que mirarlo aquí no cuesta una consulta más.
  public get clientStatus(): 'attention' | 'ok' | 'insufficient' | null {
    if (!this.summary) return null;
    const hasSeriousAlert = this.summary.alerts.some(
      (a) => a.priority === 'high' || a.priority === 'medium'
    );
    if (hasSeriousAlert) return 'attention';
    const { applicableCount, overall } = this.summary.adherence;
    if (applicableCount === 0) return 'insufficient';
    if (overall !== null && overall < ClientSummaryComponent.ATTENTION_OVERALL_THRESHOLD_PCT) {
      return 'attention';
    }
    return 'ok';
  }

  // --- Franja de dolor (aproxima "limitación vigente" con datos reales) ---

  public loadPain(): void {
    if (!this.clientId) return;
    this.painState = 'loading';
    this.clientDetailApi
      .getClientPain(this.clientId, ClientSummaryComponent.PAIN_WINDOW_DAYS)
      .subscribe({
        next: ({ entries, thresholds }) => {
          this.painEntries = entries;
          this.painThresholds = thresholds;
          this.painState = 'loaded';
        },
        error: () => {
          this.painState = 'error';
        },
      });
  }

  // La zona con más dolor que YA supera el umbral que este entrenador fijó
  // para ella. No es "una limitación vigente" con autor y fecha de semana
  // (ese concepto no existe en el modelo de dolor) — solo el peor dato real
  // cruzado con su propio umbral. Sin ninguna zona por encima, no hay nada
  // que avisar.
  public get limitingPain(): { zone: string; level: number; lastDate: string; threshold: PainThreshold } | null {
    for (const entry of worstByZone(this.painEntries)) {
      const threshold = this.painThresholds.find((t) => t.zone === entry.zone);
      if (threshold && entry.level >= threshold.painLevel) {
        return { ...entry, threshold };
      }
    }
    return null;
  }

  // --- Alertas: icono, dueño y navegación por tipo ---

  public alertIcon(alert: CoachAlert): string {
    return ALERT_ICONS[alert.type] || 'alert-circle-outline';
  }

  public ownerLabel(alert: CoachAlert): string {
    return OWNER_BY_TYPE[alert.type] || 'Tú revisas';
  }

  public alertNavTab(alert: CoachAlert): ClientDetailTab | null {
    return TAB_BY_ALERT_TYPE[alert.type] || null;
  }

  // Misma redacción que dashboard.page.ts#alertAge, adaptada a caber en una
  // línea corta junto al resto de la fila.
  public alertAge(alert: CoachAlert): string {
    const days = Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / 86400000);
    if (days <= 0) return 'hoy';
    if (days === 1) return 'hace 1 día';
    return `hace ${days} días`;
  }

  // --- Seguimiento reciente (3 tarjetas) ---

  // La tarjeta "Progreso" reutiliza summary.weightTrend y progress.comparison
  // tal cual. Se toma la primera medida con delta disponible (la que el
  // backend ya calculó porque está presente en las dos últimas semanas) en
  // vez de una fija: qué medida sigue este cliente lo decide él al
  // registrarla, no esta pantalla.
  public get firstMeasurementDelta(): ProgressDelta | null {
    const measurements = this.progress?.comparison?.measurements;
    if (!measurements) return null;
    const values = Object.values(measurements);
    return values.length ? values[0] : null;
  }

  // Mini-tendencia de cada tarjeta — mismo patrón visual en las 3 (barras
  // normalizadas sobre el máximo de su PROPIA serie, no hay una meta común
  // entre sesiones/adherencia/kg con la que compararlas a la vez), leyendo
  // siempre de progress.series — ya cargado por loadProgress(), ninguna
  // llamada nueva.
  private buildSparkline(values: (number | null | undefined)[]): { height: number | null }[] {
    const nums = values.filter((v): v is number => v !== null && v !== undefined);
    if (!nums.length) return values.map(() => ({ height: null }));
    const max = Math.max(...nums, 0.0001);
    return values.map((v) => ({
      height: v === null || v === undefined ? null : Math.max(6, Math.round((v / max) * 100)),
    }));
  }

  public get trainingSparkline(): { height: number | null }[] {
    return this.buildSparkline((this.progress?.series || []).map((w) => w.sessions));
  }

  public get nutritionSparkline(): { height: number | null }[] {
    return this.buildSparkline((this.progress?.series || []).map((w) => w.nutritionAdherence));
  }

  public get weightSparkline(): { height: number | null }[] {
    return this.buildSparkline((this.progress?.series || []).map((w) => w.weight?.average ?? null));
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
    // Medidas y check-ins comparten panel desde que se fusionaron: la
    // dimensión "check-ins" sigue llevando a donde está su agenda.
    checkins: 'measurements',
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

  // --- Tabla de perímetros ---

  private measurementKeys(series: ProgressWeek[]): string[] {
    const keys = new Set<string>();
    series.forEach((week) => Object.keys(week.measurements || {}).forEach((k) => keys.add(k)));
    return [...keys];
  }

  // Reparte los perímetros con dato en la ventana entre la tabla siempre
  // visible (principales, elegidos vía modal) y la desplegable (el resto) —
  // llamado tanto al cargar progreso como al confirmar una nueva selección
  // en el modal, para no repetir la lógica de reparto en dos sitios.
  private applyPerimeterRows(series: ProgressWeek[]): void {
    const primary: TrendRow[] = [];
    const other: TrendRow[] = [];

    for (const option of this.perimeterOptions) {
      const values = series.map((w) => w.measurements?.[option.key] ?? null);
      if (!values.some((v) => v !== null && v !== undefined)) continue;
      const row: TrendRow = { label: option.label, values, unit: 'cm', decimals: 1 };
      (this.selectedPerimeters.has(option.key) ? primary : other).push(row);
    }

    this.primaryTrendRows = primary;
    this.otherTrendRows = other;
  }

  // --- Selector de perímetros principales (modal) ---

  private catalogEntryForMeasurement(anthropometryField: string) {
    return CHECKIN_FIELDS_BY_KEY.get(this.checkinKeyForMeasurement(anthropometryField));
  }

  private buildPerimeterOptions(series: ProgressWeek[]): PerimeterOption[] {
    return this.measurementKeys(series)
      .filter((key) => this.catalogEntryForMeasurement(key)?.group === 'perimetros')
      .map((key) => ({ key, label: this.catalogEntryForMeasurement(key)?.label || key }));
  }

  // Se lee de localStorage UNA vez por vida del componente (perimetersInitialized):
  // cambiar la ventana de semanas no debe resetear lo que el entrenador ya
  // eligió, aunque cambien los perímetros disponibles en esa ventana.
  private initSelectedPerimeters(): void {
    if (this.perimetersInitialized) return;
    this.perimetersInitialized = true;

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(PERIMETERS_STORAGE_KEY);
    } catch {
      stored = null;
    }

    if (stored !== null) {
      try {
        this.selectedPerimeters = new Set(JSON.parse(stored));
        return;
      } catch {
        // localStorage corrupto: se cae al valor por defecto de abajo.
      }
    }

    const available = new Set(this.perimeterOptions.map((o) => o.key));
    const defaults = DEFAULT_PERIMETERS.filter((k) => available.has(k));
    this.selectedPerimeters = new Set(
      defaults.length ? defaults : this.perimeterOptions.slice(0, 2).map((o) => o.key)
    );
  }

  // Nombres de los principales, en el orden del catálogo (no el de inserción
  // del Set) — para la línea "Principales: Cintura, Cadera" de la cabecera.
  public get primaryPerimeterLabels(): string {
    return this.perimeterOptions
      .filter((option) => this.selectedPerimeters.has(option.key))
      .map((option) => option.label)
      .join(', ');
  }

  // Mismo patrón que openTrainingFilterPanel en client-detail.page.ts: modal
  // real vía ModalController (checkboxes con tope, un ion-alert nativo no
  // puede embeber esa lista). A partir de aquí SÍ se persiste la elección, a
  // diferencia del valor por defecto de initSelectedPerimeters (que no se
  // guarda hasta que el propio coach toca algo).
  public async openPerimeterFilterPanel(): Promise<void> {
    const modal = await this.modalController.create({
      component: PerimeterFilterPanelComponent,
      componentProps: {
        options: this.perimeterOptions,
        selected: [...this.selectedPerimeters],
      },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<string[]>();
    if (role !== 'confirm' || !data) return;

    this.selectedPerimeters = new Set(data);
    try {
      localStorage.setItem(PERIMETERS_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Almacenamiento no disponible (privado/bloqueado): la selección sigue
      // funcionando para esta sesión, solo no sobrevive a recargar.
    }

    if (this.progress) this.applyPerimeterRows(this.progress.series || []);
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
