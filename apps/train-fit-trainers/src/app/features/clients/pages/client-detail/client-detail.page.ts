import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, skip } from 'rxjs/operators';
import { firstValueFrom, of, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { ClientDetailApiService } from './services/client-detail-api.service';
import { CheckinSchedule } from './components/checkin-workspace/checkin-workspace.model';
import { TrainerClientsApiService } from '../../services/trainer-clients-api.service';
import { TrainerBillingApiService } from '../../../subscription/services/trainer-billing-api.service';
import { TrainerInvitesApiService } from '../../../invites/services/trainer-invites-api.service';
import {
  ClientIntake,
  ClientIntakeCustomAnswer,
  EQUIPMENT_TAG_LABELS,
  EquipmentTag,
  TRAINING_LOCATION_LABELS,
  TrainingLocation,
} from '../../../invites/models/trainer-invite.model';

Chart.register(...registerables);

const TRAINING_GOAL_TYPE_LABELS: Record<TrainingGoalType, string> = {
  strength: 'Fuerza',
  hypertrophy: 'Hipertrofia',
  endurance: 'Resistencia',
  mobility: 'Movilidad',
  general: 'General',
};
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  checkinAnchorFor,
  checkinScaleSuffix,
} from 'src/app/core/constants/checkin-fields';
import { formatSoreness } from 'src/app/core/constants/soreness';
import {
  AdherenceDimension,
  BlockAdherence,
  BlockExerciseProgress,
  BlockMuscleGroup,
  BlockReadiness,
  ClientTrainingProgress,
  SessionAdherence,
  SessionExerciseProgress,
  SessionMuscleGroup,
  SessionReadiness,
  SessionTraining,
  TRAINING_COMPARISON_METRIC_LABELS,
  TrainingBlock,
  TrainingComparisonMetric,
  TrainingGranularity,
} from './models/client-progress.model';
import {
  TrainingFilterPanelComponent,
  TrainingFilterResult,
} from './components/training-filter-panel/training-filter-panel.component';
import { CompletedDay } from './components/training-calendar/training-calendar.component';
import { ApplyDietTemplateModalComponent } from '../../components/apply-diet-template-modal/apply-diet-template-modal.component';
import { NextWeekModalComponent } from '../../components/next-week-modal/next-week-modal.component';
import { CheckinSchedulesPanelComponent } from '../../components/checkin-schedules-panel/checkin-schedules-panel.component';
import { CheckinScheduleHistoryPanelComponent } from '../../components/checkin-schedule-history-panel/checkin-schedule-history-panel.component';
import { ApplyRoutineTemplateModalComponent } from '../../components/apply-routine-template-modal/apply-routine-template-modal.component';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { PHASE_COLORS, buildPhaseColorMap } from './phase-color.util';
import { RoutineAssignmentApiService } from '../../../../shared/services/routine-assignment-api.service';
import {
  RoutineAssignment,
  RoutineScheduleDay,
} from '../../../../shared/models/routine-assignment.model';
import { ApplyRoutineModalComponent } from '../../components/apply-routine-modal/apply-routine-modal.component';
import { CustomCheckinQuestion } from '../../../checkin-templates/models/checkin-template.model';
import {
  MacroSet,
  WeekNeed,
  PhaseWeeksResponse,
} from '../../../diet-templates/models/diet-suggestion.model';
import {
  KCAL_PER_G,
  MacroAdjustComponent,
} from '../../../../shared/components/macro-adjust/macro-adjust.component';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import {
  checkinFieldLabel,
  checkinValueLabel,
} from '../../checkin-labels.util';
import { WeekSummaryPanelComponent } from '../../components/week-summary-panel/week-summary-panel.component';
import {
  NutritionHistoryEvent,
  PlanAssignment,
} from '../../../../shared/models/plan-assignment.model';
import { dietaryFlagUi } from '../../../../shared/utils/dietary-flag-ui.util';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { TableService } from 'src/app/core/services/table/table.service';
import {
  AdherenceSummary,
  AnthropometryEntry,
  CheckinResponseEntry,
  ClientDetailSection,
  ClientDetailSectionDef,
  ClientDetailTab,
  ClientDetailTabDef,
  ClientNutritionalGoal,
  ClientNutritionalGoalResponse,
  ClientNutritionPreferences,
  ClientScope,
  ClientTable,
  CLIENT_DETAIL_SECTIONS,
  SECTION_BY_TAB,
  CompletedWorkoutEntry,
  TrainingGoal,
  TrainingGoalType,
  NutritionComplianceSummary,
  TrainerNote,
  TrainerPayment,
  TrainerTask,
  TrainerTaskType,
} from './models/client-detail.model';
import { ClientNote } from './models/client-notes.model';

type SectionState = 'loading' | 'error' | 'loaded';

// Periodos de Seguimiento (una sola fila de presets para las dos gráficas).
// 'phase' solo existe si hay fase con semanas.
type TrackingPreset = 'week' | 'lastWeek' | 'weeks4' | 'weeks12' | 'phase';

interface TrackingPresetOption {
  key: TrackingPreset;
  label: string;
}

const TRACKING_PRESETS: TrackingPresetOption[] = [
  { key: 'week', label: 'Esta semana' },
  { key: 'lastWeek', label: 'Semana pasada' },
  { key: 'weeks4', label: '1 mes' },
  { key: 'weeks12', label: '3 meses' },
];

const TRACKING_PRESETS_WITH_PHASE: TrackingPresetOption[] = [
  ...TRACKING_PRESETS,
  { key: 'phase', label: 'Fase actual' },
];

// Una FASE por entrada, no un doc por entrada: las semanas preparadas de
// una fase son docs DietTemplate con el mismo phaseId, y
// listarlos sueltos los duplicaba. Cada grupo se resume en su head (nombre,
// inicio) con el fin del último doc (null = sigue abierta). Ascendente por
// inicio; `docs` viene ordenado como lo devuelve el backend (desc) o no —
// se reordena aquí.
function groupPhaseDocs(docs: PlanAssignment[]): PlanAssignment[] {
  const groups = new Map<string, PlanAssignment[]>();
  for (const doc of [...docs].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  )) {
    const key = doc.phaseId || doc._id;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(doc);
  }
  return [...groups.values()]
    .map((members) => {
      const head =
        members.find((d) => d._id === (d.phaseId || d._id)) || members[0];
      const last = members[members.length - 1];
      return { ...head, endDate: last.endDate ?? null, status: last.status };
    })
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

@Component({
  selector: 'app-client-detail',
  templateUrl: 'client-detail.page.html',
  styleUrls: ['client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit, AfterViewInit {
  public clientId = '';
  public name = 'Cliente';
  public scopes: ClientScope[] = [];
  public activeTab: ClientDetailTab = 'training';
  // Movimiento 1 Coach Pro — las 9 pestañas planas pasan a 4 secciones con
  // subpestañas. activeTab sigue identificando el PANEL (los *ngIf de la
  // plantilla no cambian) y activeSection, la sección que lo contiene.
  public activeSection: ClientDetailSection = 'summary';
  public readonly sections = CLIENT_DETAIL_SECTIONS;
  // TASK-012 (MASTER_BACKLOG.md) — name/scopes normalmente llegan por
  // queryParams (navegación desde ClientsPage), pero un deep link directo
  // (notificación, returnUrl de TASK-010, F5 en esta misma pantalla) no los
  // trae. headerState refleja si hubo que resolverlos con una llamada de
  // respaldo a getMyClients().
  public headerState: SectionState = 'loaded';

  // --- Cabecera persistente (avatar/badge/programa) — visible en las 4
  // secciones, no solo Resumen. El badge de estado lo calcula
  // ClientSummaryComponent (necesita summary.alerts, que solo él pide) y lo
  // emite aquí vía (statusChange); por eso queda en blanco hasta que Resumen
  // termine de cargar, aunque se esté viendo otra sección.
  public clientStatus: 'attention' | 'ok' | 'insufficient' | null = null;

  public onSummaryStatus(status: 'attention' | 'ok' | 'insufficient'): void {
    this.clientStatus = status;
  }

  public get initials(): string {
    const parts = (this.name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }

  // --- Notas (F19, transversal a los scopes) ---
  public notesState: SectionState = 'loading';
  public notes: TrainerNote[] = [];
  public newNoteText = '';
  public isSavingNote = false;

  // --- Check-ins (F17, transversal a los scopes) ---
  public checkinsState: SectionState = 'loading';
  // Preguntas propias que aparecen en las respuestas cargadas: cada
  // respuesta viaja con la copia de las suyas, así que no hace falta pedir
  // ninguna "configuración" del cliente aparte.
  public checkinQuestions: CustomCheckinQuestion[] = [];
  public checkinResponses: CheckinResponseEntry[] = [];

  // --- Cobros (F26, transversal a los scopes) ---
  public paymentsState: SectionState = 'loading';
  public payments: TrainerPayment[] = [];
  public showPaymentPanel = false;
  public paymentAmount: number | null = null;
  public paymentDueDate = '';
  public paymentNote = '';
  public isSavingPayment = false;

  // --- Fechas de la fase vigente (panel; antes un alert con <input type="date">) ---
  public showPhaseDatesPanel = false;
  public phaseDatesPhaseId = '';
  public phaseDatesTitle = '';
  public phaseDatesStart = '';
  public phaseDatesEnd = '';
  public isSavingPhaseDates = false;

  // --- Tareas/hábitos (coach-tab FASE4, transversal a los scopes) ---
  public tasksState: SectionState = 'loading';
  public tasks: TrainerTask[] = [];
  public showTaskPanel = false;
  public taskType: TrainerTaskType = 'steps';
  public taskLabel = '';
  public taskTarget: number | null = null;
  // Tope del rango ("de 10.000 a 15.000 pasos"): opcional, y lo que de
  // verdad usa el cálculo de kcal cuando el hábito es de pasos.
  public taskTargetMax: number | null = null;
  public taskUnit = '';
  public isSavingTask = false;
  public readonly taskTypeIcons: Record<TrainerTaskType, string> = {
    steps: 'footsteps-outline',
    water: 'water-outline',
    sleep: 'moon-outline',
    cardio: 'heart-outline',
    custom: 'checkmark-circle-outline',
  };
  public readonly taskTypeOptions: {
    value: TrainerTaskType;
    label: string;
    defaultUnit: string;
  }[] = [
    { value: 'steps', label: 'Pasos', defaultUnit: 'pasos' },
    { value: 'water', label: 'Agua', defaultUnit: 'L' },
    { value: 'sleep', label: 'Sueño', defaultUnit: 'horas' },
    { value: 'cardio', label: 'Cardio', defaultUnit: 'min' },
    { value: 'custom', label: 'Personalizada', defaultUnit: '' },
  ];

  // --- Entrenamiento ---
  public trainingState: SectionState = 'loading';
  public tables: ClientTable[] = [];
  public latestWeight: AnthropometryEntry | null = null;
  // Tarea 3 — "Equipamiento utilizado". Mismo cuestionario que ya lee
  // ClientsPage al revisar un cliente nuevo (TrainerInvitesApiService), leído
  // aquí de nuevo porque la ficha en curso no lo cargaba hasta ahora.
  public clientIntake: ClientIntake | null = null;
  public clientIntakeState: SectionState = 'loading';

  // Tarea 3 bis — "Objetivo de entrenamiento" (paridad mínima con
  // "Objetivos nutricionales"): tipo de objetivo, editable en línea. Mismo
  // patrón que ya usaba el chip de objetivo de nutrición. La frecuencia
  // declarada se quitó (2026-09): no alimentaba ningún cálculo.
  public trainingGoal: TrainingGoal | null = null;
  public trainingGoalState: SectionState = 'loading';
  public isEditingTrainingGoal = false;
  public trainingGoalTypeDraft: TrainingGoalType | null = null;
  public isSavingTrainingGoal = false;
  public readonly trainingGoalTypeOptions: {
    value: TrainingGoalType;
    label: string;
  }[] = Object.entries(TRAINING_GOAL_TYPE_LABELS).map(([value, label]) => ({
    value: value as TrainingGoalType,
    label,
  }));

  // Tarea 3 bis — calendario + gráfica de frecuencia semanal, versión de
  // vistazo para Entrenamiento (a diferencia de Estadísticas, que es el
  // detalle POR ejercicio de UNA rutina): agregado de todas las rutinas
  // asignadas por este entrenador, ya cargadas en completedWorkouts.
  public expandedTableId: string | null = null;
  public showRoutinePanel = false;
  public routineForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  public isAssigningRoutine = false;

  // --- Nutrición ---
  public nutritionState: SectionState = 'loading';
  public nutritionDate: string = new Date().toISOString().slice(0, 10);
  public adherence: AdherenceSummary | null = null;
  // F20-bis — cumplimiento del plan (distinto de adherence, ver
  // client-detail.model.ts), ventana fija de 30 días terminando hoy
  // (independiente del día que se esté viendo abajo).
  public complianceSummary: NutritionComplianceSummary | null = null;
  public isRevoking = false;

  // --- Invitar al scope que le falta (botón al final de las subpestañas de Plan) ---
  // La ficha no tiene el email del cliente: sale de GET /trainer/invites,
  // que además dice si ya hay una invitación en curso para ese scope.
  public clientEmail: string | null = null;
  public missingScopeInvitePending = false;
  public isSendingScopeInvite = false;

  // --- Preferencias nutricionales (F29, transversal a nutrición) ---
  public nutritionPreferences: ClientNutritionPreferences | null = null;
  public isRequestingPreferences = false;

  // El profesional puede rellenarlas/editarlas directamente en vez de
  // esperar a que el cliente responda el cuestionario. Mismos campos que
  // el editor del propio cliente (packages/shared-features/nutrition-preferences).

  // Auditoría de arquitectura (nutrición, Fase 8) — plan vigente del cliente,
  // resuelto vía PlanAssignment en vez de inferido de los DietDay ya escritos.
  public activePlan: PlanAssignment | null = null;
  // Historial COMPLETO (incluye fases ya terminadas), ordenado por fecha de
  // inicio. Única fuente de la fila horizontal de fases (ver phaseTimeline
  // más abajo) y de phaseColorMap, que la comparte con PHASE_COLORS/
  // assignPhaseColors del calendario (phase-color.util.ts) — antes existía
  // una segunda lista (planPhases, solo vigente+futuras) que dejaba las
  // terminadas invisibles salvo que se desplegara el historial de abajo.
  private allPhasesHistory: PlanAssignment[] = [];
  // Color por fase — recalculado junto con allPhasesHistory (ver
  // loadActivePlan), no en cada llamada a phaseColor(): assignPhaseColors
  // mira varias fases hacia atrás por cada una, buscarlo por índice en el
  // array sería EXTRA trabajo repetido sin necesidad.
  private phaseColorMap = new Map<string, string>();
  public isSkippingDay = false;
  // F20-quindecies — rango elegido en <app-nutrition-calendar> (click día
  // inicio/fin) o con uno de los presets encima de la gráfica. Empieza en
  // null pero loadPhaseWeeks() lo rellena con "Esta semana" si sigue sin
  // elegirse — sin eso <app-nutrition-tracking-chart> y
  // <app-weight-adherence-chart> no piden nada hasta que el trainer toca
  // algo.
  public customTrackingRange: { start: string; end: string } | null = null;
  // Preset activo; null = rango elegido a mano en el calendario.
  public trackingPreset: TrackingPreset | null = null;

  // F20-vicies — qué vista de "Seguimiento" está activa: cumplimiento/macros
  // día a día, o peso vs. adherencia. Comparten customTrackingRange —
  // alternar no reinicia el rango elegido.
  public nutritionChartView: 'daily' | 'weight' = 'daily';

  public setNutritionChartView(view: 'daily' | 'weight'): void {
    this.nutritionChartView = view;
  }

  public get trackingPresets(): TrackingPresetOption[] {
    return this.phaseWeeks ? TRACKING_PRESETS_WITH_PHASE : TRACKING_PRESETS;
  }

  public trackByPresetKey(
    _index: number,
    option: TrackingPresetOption
  ): TrackingPreset {
    return option.key;
  }

  // Semanas naturales lunes-domingo, las mismas que las de la fase. Todos los
  // presets cierran en el domingo de la semana en curso (o de la pasada):
  // las gráficas ya recortan a hoy por su cuenta.
  public applyTrackingPreset(preset: TrackingPreset): void {
    const monday = this.mondayOf(this.todayIsoDate());
    const sunday = this.addDays(monday, 6);
    let range: { start: string; end: string } | null = null;
    switch (preset) {
      case 'week':
        range = { start: monday, end: sunday };
        break;
      case 'lastWeek':
        range = {
          start: this.addDays(monday, -7),
          end: this.addDays(sunday, -7),
        };
        break;
      case 'weeks4':
        range = { start: this.addDays(monday, -21), end: sunday };
        break;
      case 'weeks12':
        range = { start: this.addDays(monday, -77), end: sunday };
        break;
      case 'phase':
        range = this.phaseWeeks
          ? { start: this.phaseWeeks.phaseStart, end: sunday }
          : null;
        break;
    }
    if (!range) return;
    this.trackingPreset = preset;
    this.customTrackingRange = range;
  }

  // "S5 · 21 sept → 27 sept" cuando el rango es una sola semana de la fase;
  // si abarca más (o cae fuera de la fase), solo las fechas.
  public get trackingRangeLabel(): string {
    const range = this.customTrackingRange;
    if (!range) return '';
    const fmt = (iso: string): string =>
      new Date(iso + 'T00:00:00Z').toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
    const dates = `${fmt(range.start)} → ${fmt(range.end)}`;
    const overlapping = (this.phaseWeeks?.weeks || []).filter(
      (w) => w.start <= range.end && (w.end ?? range.end) >= range.start
    );
    const isSingleWeek = range.end <= this.addDays(range.start, 6);
    return isSingleWeek && overlapping.length === 1
      ? `S${overlapping[0].number} · ${dates}`
      : dates;
  }

  // TASK-045 (MASTER_BACKLOG.md) — historial de fases + excepciones puntuales.
  // Perezoso (solo al expandir) — no todos los trainers necesitan mirar
  // esto cada vez que abren la ficha del cliente.
  public showNutritionHistory = false;
  public nutritionHistoryLoaded = false;
  public nutritionHistoryState: 'loading' | 'error' | 'loaded' = 'loading';
  // Feed de eventos (fases, semanas, check-ins, excepciones) — ver
  // nutrition-history-feed.component.ts.
  public nutritionHistory: NutritionHistoryEvent[] = [];
  // Color de fase para el feed: misma paleta que la fila de fases (phaseColorMap).
  public readonly phaseColorForFeed = (phaseId: string): string =>
    this.phaseColorMap.get(phaseId) ?? 'var(--tf-accent)';

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController,
    private userService: UserService,
    private tableService: TableService,
    private planAssignmentApi: PlanAssignmentApiService,
    private routineAssignmentApi: RoutineAssignmentApiService,
    private trainerClientsApi: TrainerClientsApiService,
    private trainerInvitesApi: TrainerInvitesApiService,
    private dietSuggestionApi: DietSuggestionApiService,
    private navigation: TrainerNavigationService,
    private trainerBillingApi: TrainerBillingApiService
  ) {}

  // TASK-051/TASK-073 (MASTER_BACKLOG.md) — antes leía el :id una sola vez
  // de route.snapshot en ngOnInit. Sin explotar hoy (no hay ningún enlace
  // en la UI que navegue de la ficha de un cliente directamente a la de
  // otro sin pasar por ClientsPage) pero, si el Router llegara a reutilizar
  // esta instancia entre dos ':id' distintos de la misma ruta
  // (comportamiento por defecto de Angular cuando solo cambia el
  // parámetro), ngOnInit no volvería a dispararse y se seguiría mostrando
  // la ficha del cliente anterior con el :id nuevo en la URL.
  //
  // La carga inicial conserva el camino rápido de siempre (síncrono, vía
  // snapshot: nameParam/scopesParam si se llegó desde ClientsPage, si no
  // fallback). skip(1) en la suscripción a paramMap cubre solo las
  // emisiones POSTERIORES a esa (id realmente cambiado con la instancia
  // reutilizada) — sin queryParams frescos del cliente nuevo disponibles en
  // ese caso, se resuelve igual que un deep link. Evita tener que inferir
  // "es la primera vez" a partir de un flag mutable derivado de clientId.
  public ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';
    const nameParam = this.route.snapshot.queryParamMap.get('name');
    const scopesParam = this.route.snapshot.queryParamMap.get('scopes');

    if (nameParam && scopesParam) {
      this.name = nameParam;
      this.scopes = this.parseScopes(scopesParam);
      this.initTabsAndLoadSections();
    } else {
      this.resolveClientIdentityFallback();
    }

    this.route.paramMap
      .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.clientId = params.get('id') || '';
        this.resolveClientIdentityFallback();
      });
  }

  // TASK-019 (MASTER_BACKLOG.md) — ion-router-outlet cachea la instancia de
  // esta página entre visitas a la misma ruta, así que ngOnInit solo se
  // dispara una vez. Sin esto, tras crear/borrar una Table desde el
  // Planificador y volver, la lista seguía mostrando el estado previo a esa
  // acción. Mismo patrón ya aplicado en RoutinesPage/DietTemplatesListPage/
  // TemplatesPage — ver TASK-078 para la auditoría más amplia de este bug.
  public ionViewWillEnter(): void {
    if (!this.clientId) return;
    this.initTabsAndLoadSections();
    this.loadSeatState();
  }

  // Cartera por encima del cupo del plan: este cliente puede quedar en solo
  // lectura (el backend rechaza sus escrituras). Se avisa antes de que choque.
  public readOnlyLimit: number | null = null;
  private loadSeatState(): void {
    const clientId = this.clientId;
    this.trainerBillingApi.getSeats().subscribe({
      next: (seats) => {
        if (clientId !== this.clientId) return;
        const seat = seats.clients.find(
          (client) => client.clientId === clientId
        );
        this.readOnlyLimit =
          seats.overLimit && seat && !seat.active ? seats.limit : null;
      },
      error: () => {
        this.readOnlyLimit = null;
      },
    });
  }

  public goToSeats(): void {
    void this.router.navigate(['/tabs/subscription']);
  }

  // ion-router-outlet mantiene viva esta instancia mientras se navega hacia
  // dentro, así que ionViewWillLeave es el único punto fiable para anotar en
  // qué pestaña se estaba antes de salir.
  public ionViewWillLeave(): void {
    this.navigation.saveViewState(this.viewStateKey, this.activeTab);
  }

  private get viewStateKey(): string {
    return `client-detail:${this.clientId}`;
  }

  private parseScopes(rawScopes: string): ClientScope[] {
    return rawScopes
      .split(',')
      .filter((s): s is ClientScope => s === 'training' || s === 'nutrition');
  }

  // TASK-012 — sin name/scopes en la URL (deep link directo), se resuelven
  // contra getMyClients() (ya usado por ClientsPage) en vez de dejar la
  // pantalla en blanco sin ninguna pestaña cargada.
  private resolveClientIdentityFallback(): void {
    this.headerState = 'loading';
    // Si el Router reutiliza esta instancia para otro :id (ver
    // TASK-051/TASK-073 más arriba), sin este reset el badge de estado del
    // cliente ANTERIOR seguiría visible mientras carga el nuevo Resumen.
    this.clientStatus = null;
    this.trainerClientsApi.getMyClients().subscribe({
      next: (clients) => {
        const match = clients.find((c) => c.user?._id === this.clientId);
        if (!match) {
          this.headerState = 'error';
          this.ionicUtilService.showToast({
            message: 'No se encontró este cliente o no tienes acceso.',
            duration: 3000,
          });
          return;
        }
        this.name = match.user
          ? `${match.user.name} ${match.user.lastname}`.trim()
          : 'Cliente';
        this.scopes = match.scopes;
        this.headerState = 'loaded';
        this.initTabsAndLoadSections();
      },
      error: () => {
        this.headerState = 'error';
        this.ionicUtilService.showToast({
          message: 'No se pudo cargar la información de este cliente.',
          duration: 3000,
        });
      },
    });
  }

  public goToClientsList(): void {
    this.router.navigate(['/tabs/clients']);
  }

  private initTabsAndLoadSections(): void {
    // Fase 2 Coach Pro — se abre en Resumen, no en el primer scope. La
    // pregunta con la que un coach entra en una ficha es "cómo va", y
    // Entrenamiento/Nutrición responden "qué le he pautado".
    //
    // Salvo que quien navega pida una subpestaña concreta con ?tab=: la
    // notificación de "check-in respondido" tiene que abrir en Check-ins,
    // no dejarte en Resumen buscándolo. selectTab valida el destino, así
    // que un tab inventado en la URL no rompe nada.
    // Al volver de una pantalla hija (Planificador, Estadísticas, crear
    // dieta) se recupera la pestaña que estaba abierta. Sustituye al antiguo
    // ?returnTab=, que obligaba a cada pantalla hija a reenviar la pestaña de
    // vuelta: aquí la ficha se acuerda de la suya y nadie más tiene que saberlo.
    const tabGuardada = this.navigation.consumeViewState<ClientDetailTab>(
      this.viewStateKey
    );
    const tabPedida =
      tabGuardada ||
      (this.route.snapshot.queryParamMap.get('tab') as ClientDetailTab | null);
    // 'checkins' ya no es una pestaña (vive dentro de "Medidas y check-ins"),
    // pero sigue llegando en enlaces viejos: notificaciones de "check-in
    // respondido" ya enviadas y estados de vista guardados antes de la
    // fusión. Se traduce en vez de caer a Resumen.
    // Igual con 'history' (Progreso > Sesiones): ahora vive en Plan >
    // Entrenamiento, así que se abre ahí con el panel de sesiones.
    if ((tabPedida as string) === 'history') this.showSessionsPanel = true;
    const tabDestino: ClientDetailTab | null =
      (tabPedida as string) === 'checkins'
        ? 'measurements'
        : (tabPedida as string) === 'history'
        ? 'training'
        : tabPedida;
    this.selectTab(
      tabDestino && SECTION_BY_TAB[tabDestino] ? tabDestino : 'summary'
    );
    // "Aplicar" desde Plantillas de check-in: abre "Nueva programación" con
    // esa plantilla. Solo en una entrada nueva: al volver de una pantalla
    // hija la URL la sigue llevando y no debe reabrir el editor.
    this.checkinTemplateToOpen = tabGuardada
      ? null
      : this.route.snapshot.queryParamMap.get('checkinTemplate');

    if (this.scopes.includes('training')) this.loadTraining();
    if (this.scopes.includes('nutrition')) this.loadNutrition();
    this.loadNotes();
    this.loadPayments();
    this.loadTasks();
    this.loadClientNotesUnread();
    this.loadPreviousRelationCutoff();
    this.loadMissingScopeInvite();
  }

  // TASK-062 (MASTER_BACKLOG.md) — antes, si este cliente había sido
  // revocado y luego volvió a aceptar una invitación, sus notas/tareas de
  // antes reaparecían mezcladas con las nuevas sin ninguna indicación de
  // que eran "de antes". null en el 100% de los clientes normales (nunca
  // revocados) — este fetch extra no cuesta nada visible en ese caso común.
  public previousRelationCutoff: string | null = null;

  private loadPreviousRelationCutoff(): void {
    this.clientDetailApi.getPreviousRelationCutoff(this.clientId).subscribe({
      next: ({ cutoffDate }) => {
        this.previousRelationCutoff = cutoffDate;
      },
      error: () => {
        this.previousRelationCutoff = null;
      },
    });
  }

  public isFromPreviousRelation(createdAt: string): boolean {
    if (!this.previousRelationCutoff) return false;
    return (
      new Date(createdAt).getTime() <
      new Date(this.previousRelationCutoff).getTime()
    );
  }

  // Sigue recibiendo la pestaña-hoja (la usa el Resumen para saltar a
  // "Medidas" o a "Entrenamiento" desde sus enlaces) y deduce la sección
  // que hay que abrir, en vez de obligar a cada llamante a saberla.
  public selectTab(tab: ClientDetailTab): void {
    const section = SECTION_BY_TAB[tab];
    const definicion = this.sections.find(
      (candidate) => candidate.key === section
    );
    if (!definicion) return;

    // Un cliente solo de nutrición no tiene pestaña "Entrenamiento": si algo
    // pide abrirla igualmente (el Resumen enlaza a las cuatro dimensiones de
    // adherencia y a la rutina asignada sin saber qué scopes hay), el panel
    // se queda en blanco, porque su *ngIf sí comprueba el scope. Se cae a la
    // primera pestaña disponible de esa misma sección en vez de no hacer
    // nada: el usuario ha pedido ir ahí y la sección sigue siendo correcta.
    const disponibles = this.visibleTabsOf(definicion);
    const destino = disponibles.some((candidate) => candidate.key === tab)
      ? tab
      : disponibles[0]?.key;
    if (!destino) return;

    this.activeTab = destino;
    this.activeSection = section;
  }

  // Al pulsar una sección se abre su primera subpestaña DISPONIBLE: si el
  // cliente solo tiene nutrición, "Plan" debe abrir Nutrición y no dejar el
  // panel en blanco esperando a un Entrenamiento que no existe.
  public selectSection(section: ClientDetailSectionDef): void {
    const tabs = this.visibleTabsOf(section);
    if (!tabs.length) return;
    this.selectTab(tabs[0].key);
  }

  public get visibleSections(): ClientDetailSectionDef[] {
    // Una sección cuyas subpestañas dependan todas de un scope que este
    // cliente no tiene no llega a mostrarse. Plan ya no puede vaciarse así
    // desde que Hábitos vive ahí (sin requiresScope, siempre visible) —
    // Progreso tampoco (Medidas y check-ins/Dolor no piden scope).
    return this.sections.filter(
      (section) => this.visibleTabsOf(section).length > 0
    );
  }

  // Subpestañas de la sección abierta. Vacío cuando solo hay una: una
  // subbarra con un único botón siempre pulsado no informa de nada.
  public get visibleSubTabs(): ClientDetailTabDef[] {
    const section = this.sections.find(
      (candidate) => candidate.key === this.activeSection
    );
    if (!section) return [];
    const tabs = this.visibleTabsOf(section);
    return tabs.length > 1 ? tabs : [];
  }

  private visibleTabsOf(section: ClientDetailSectionDef): ClientDetailTabDef[] {
    return section.tabs.filter((tab) => {
      if (!tab.requiresScope) return true;
      if (tab.requiresScope === 'any') return this.scopes.length > 0;
      return this.scopes.includes(tab.requiresScope);
    });
  }

  public trackBySectionKey(
    _index: number,
    section: ClientDetailSectionDef
  ): string {
    return section.key;
  }

  public trackByTabKey(_index: number, tab: ClientDetailTabDef): string {
    return tab.key;
  }

  // --- Entrenamiento ---
  public loadTraining(): void {
    this.trainingState = 'loading';
    Promise.all([
      this.clientDetailApi.getTables(this.clientId).toPromise(),
      this.clientDetailApi.getAnthropometry(this.clientId).toPromise(),
    ])
      .then(([tables, weights]) => {
        // El entrenador solo debe ver/editar rutinas que él mismo asignó —
        // el cliente puede tener tablas propias (de usar la app como
        // consumidor) que no son asunto del entrenador. Filtro en frontend
        // (ver MVP-trainers/tareas-grandes/TAREA5): el backend
        // (getClientTables) sigue devolviendo todas, esto no es una
        // restricción de acceso real, solo de presentación.
        const trainerId = this.userService.localUser()?._id;
        this.tables = (tables || []).filter(
          (t) => t.assignedByTrainerId === trainerId
        );
        this.latestWeight = (weights && weights[0]) || null;
        this.computeCompletedWorkouts();
        this.rebuildProjectedTrainingDays();
        this.trainingState = 'loaded';
      })
      .catch(() => {
        this.trainingState = 'error';
      });

    this.loadClientIntake();
    this.loadTrainingGoal();
    this.loadTrainingAdherence();
    this.loadActiveRoutine();
  }

  // --- Tarea 3 bis: Objetivo de entrenamiento ---
  private loadTrainingGoal(): void {
    this.trainingGoalState = 'loading';
    this.clientDetailApi.getTrainingGoal(this.clientId).subscribe({
      next: (goal) => {
        this.trainingGoal = goal;
        this.trainingGoalState = 'loaded';
      },
      error: () => {
        this.trainingGoalState = 'error';
      },
    });
  }

  public trainingGoalTypeLabel(type: TrainingGoalType | null): string {
    return type ? TRAINING_GOAL_TYPE_LABELS[type] || type : 'Sin declarar';
  }

  public startEditTrainingGoal(): void {
    this.trainingGoalTypeDraft = this.trainingGoal?.trainingGoalType || null;
    this.isEditingTrainingGoal = true;
  }

  public cancelEditTrainingGoal(): void {
    this.isEditingTrainingGoal = false;
  }

  public saveTrainingGoal(): void {
    if (this.isSavingTrainingGoal) return;
    this.isSavingTrainingGoal = true;
    const payload: TrainingGoal = {
      trainingGoalType: this.trainingGoalTypeDraft,
    };
    this.clientDetailApi.updateTrainingGoal(this.clientId, payload).subscribe({
      next: (goal) => {
        this.trainingGoal = goal;
        this.isSavingTrainingGoal = false;
        this.isEditingTrainingGoal = false;
      },
      error: () => {
        this.isSavingTrainingGoal = false;
        this.ionicUtilService.showErrorToast(
          'No se pudo guardar el objetivo',
          'Error',
          3000
        );
      },
    });
  }

  // --- Tarea 4 (2026-09): adherencia de entrenamiento unificada ---
  // Antes esta pestaña calculaba su propio % (sesiones reales / target
  // declarado a mano) que podía no coincidir con el que ya se ve en Resumen
  // (adherence.dimensions.training, completadas/planificadas de la rutina
  // REAL). Ahora es el mismo número en los dos sitios — se lee de /summary
  // en vez de recalcularlo aquí. `applicable:false` (sin rutina asignada)
  // se distingue de un 0% real; nunca se inventa una cifra.
  public trainingAdherence: AdherenceDimension | null = null;
  public trainingAdherenceState: SectionState = 'loading';

  private loadTrainingAdherence(): void {
    this.trainingAdherenceState = 'loading';
    this.clientDetailApi.getSummary(this.clientId).subscribe({
      next: (summary) => {
        this.trainingAdherence =
          summary.adherence?.dimensions?.training ?? null;
        this.trainingAdherenceState = 'loaded';
      },
      error: () => {
        this.trainingAdherence = null;
        this.trainingAdherenceState = 'error';
      },
    });
  }

  // --- Tarea 4 (2026-09), remodelado: comparación por microciclo ---
  // Sustituye a la Entrega 2 (volumen/récords/evolución de cargas) y al
  // calendario+gráfica de frecuencia de la Tarea 3 bis: un único sistema
  // configurable (calendario de rango + gráfica + selectores) en vez
  // de varios bloques fijos. Resumen no se toca, sigue en modo `weeks`.
  public trainingComparisonRange: { start: string; end: string } | null = null;
  // 2026-09 (sin presets 7d/30d/90d) — true mientras el rango sea el de por
  // defecto (defaultTrainingRange). Al elegir día o rango a mano pasa a
  // false: así una recarga del historial de fases no pisa la elección.
  public trainingRangeIsDefault = true;
  public trainingComparisonMetric: TrainingComparisonMetric = 'volume';
  // 2026-09 — granularidad "Por microciclo" / "Por sesión". No pide nada
  // nuevo al backend: la misma respuesta ya trae los dos agregados (ver
  // loadTrainingBlocks), esto solo decide cuál pinta la gráfica.
  public trainingGranularity: TrainingGranularity = 'block';
  public trainingBlocksState: SectionState = 'loading';
  private trainingBlocksSubscription?: Subscription;
  public readonly trainingMetricOptions = (
    Object.keys(TRAINING_COMPARISON_METRIC_LABELS) as TrainingComparisonMetric[]
  ).map((value) => ({
    value,
    label: TRAINING_COMPARISON_METRIC_LABELS[value],
  }));
  public trainingBlocks: TrainingBlock[] = [];
  public trainingBlockMuscleGroups: BlockMuscleGroup[] = [];
  // Readiness/esfuerzo (2026-09) — sale gratis de la misma petición, igual
  // que blockMuscleGroups.
  public trainingBlockReadiness: BlockReadiness[] = [];
  public trainingBlockAdherence: BlockAdherence[] = [];
  public trainingSessionTraining: SessionTraining[] = [];
  public trainingSessionMuscleGroups: SessionMuscleGroup[] = [];
  public trainingSessionReadiness: SessionReadiness[] = [];
  public trainingSessionAdherence: SessionAdherence[] = [];
  // Comparar por ejercicio, varios a la vez (2026-09 bis) — "ejercicios por
  // micros". exerciseNames sale gratis de la misma petición que ya trae
  // blocks/blockMuscleGroups; blockExerciseByName/sessionExerciseByName
  // solo llegan poblados cuando ya hay al menos un ejercicio elegido (ver
  // loadTrainingBlocks, que reenvía selectedTrainingExercises al backend).
  public trainingExerciseNames: string[] = [];
  public trainingBlockExerciseByName: Record<string, BlockExerciseProgress[]> =
    {};
  public trainingSessionExerciseByName: Record<
    string,
    SessionExerciseProgress[]
  > = {};
  public selectedTrainingExercises: string[] = [];
  // "Elegir el workout a ver" (2026-09) — filtro ortogonal a la métrica.
  // Igual que el ejercicio, es un parámetro que el BACKEND aplica (recorta
  // sets antes de agregar), así que cambiarlo sí necesita volver a pedir.
  public trainingWorkoutNames: string[] = [];
  public selectedTrainingWorkout: string | null = null;

  // Movimiento adherencia-por-fase (2026-09) — antes solo el Set de fechas
  // ISO con sesión (sessionDatesSet); ahora nombre + % de series cumplidas
  // frente a las prescritas ESE día, para que el calendario pinte qué se
  // entrenó y cuánto se cumplió sin tener que abrir nada. Sale de
  // completedWorkouts (cada Workout ya trae sus exercises/sets completos),
  // ninguna llamada nueva. Mismo denominador que "fidelidad de pauta" en el
  // resto de la app: series con expectedReps[], no todas las series (una
  // serie sin rango prescrito no es incumplimiento, es un dato que no
  // aplica).
  // Se recalcula SOLO cuando cambian los entrenamientos (ver
  // computeCompletedWorkouts), no en cada lectura.
  public completedDaysMap = new Map<string, CompletedDay>();

  private buildCompletedDaysMap(): Map<string, CompletedDay> {
    const map = new Map<string, CompletedDay>();
    for (const workout of this.completedWorkouts) {
      if (!workout.date) continue;
      const date = new Date(workout.date as Date).toISOString().slice(0, 10);
      const sets = (workout.exercises || []).flatMap(
        (exercise) => exercise.sets || []
      );
      const measurable = sets.filter((set) => set.expectedReps?.length);
      const doned = measurable.filter((set) => set.doned).length;
      map.set(date, {
        name: workout.name,
        completionPercentage: measurable.length
          ? Math.round((doned / measurable.length) * 100)
          : null,
      });
    }
    return map;
  }

  public onTrainingRangeSelected(range: { start: string; end: string }): void {
    this.trainingRangeIsDefault = false;
    this.applyTrainingRange(range);
  }

  private applyTrainingRange(range: { start: string; end: string }): void {
    this.trainingSelectedDay = null;
    this.trainingComparisonRange = range;
    this.loadTrainingBlocks();
    this.loadTrainingSchedule(range);
  }

  // Rango por defecto: inicio de la fase de rutina vigente → hoy. Sin fase
  // vigente (ninguna o solo futuras), del día 1 del mes actual → hoy.
  private defaultTrainingRange(): { start: string; end: string } {
    const today = new Date().toISOString().slice(0, 10);
    const start =
      this.currentRoutinePhase?.startDate ?? `${today.slice(0, 8)}01`;
    return { start, end: today };
  }

  // Solo si el entrenador no ha elegido nada a mano (ver trainingRangeIsDefault).
  private applyDefaultTrainingRangeIfUnset(): void {
    if (this.trainingRangeIsDefault)
      this.applyTrainingRange(this.defaultTrainingRange());
  }

  // × de la etiqueta del calendario: vuelve al rango por defecto.
  public onTrainingRangeReset(): void {
    this.trainingRangeIsDefault = true;
    this.applyTrainingRange(this.defaultTrainingRange());
  }

  // Lo previsto del mes visible en el calendario, aparte del rango de la
  // comparativa (que acaba hoy): sin esto no se verían los entrenos
  // previstos de los días futuros.
  public onTrainingMonthChanged(month: { start: string; end: string }): void {
    this.loadTrainingSchedule(month);
  }

  // 2026-09 (día suelto) — alternativa a la comparativa por rango: el
  // entrenador toca un día en <app-training-calendar> (fuera del modo
  // rango) y ve la ficha de ESE día en vez del gráfico. Sale de
  // completedWorkouts/projectedTrainingDays, ya cargados — sin llamada
  // nueva (ver <app-training-day-detail>).
  public trainingSelectedDay: string | null = null;

  // Campo, no getter: un getter aquí devuelve un array NUEVO en cada ciclo de
  // detección de cambios (Angular lo llama varias veces por ciclo), y ese
  // array alimenta el *ngFor de <app-training-day-detail> sin trackBy — con
  // referencias distintas cada vez, Angular lo trata como "todo ha cambiado"
  // y destruye/recrea las tarjetas en cada ciclo, sin parar. Al calcularlo
  // solo aquí (una vez por selección real), la referencia se mantiene estable
  // entre ciclos.
  public trainingSelectedDayWorkouts: CompletedWorkoutEntry[] = [];

  public onTrainingDaySelected(date: string): void {
    this.trainingRangeIsDefault = false;
    this.trainingSelectedDay = date;
    this.trainingSelectedDayWorkouts = this.completedWorkouts.filter(
      (w) =>
        w.date && new Date(w.date as Date).toISOString().slice(0, 10) === date
    );
  }

  public loadTrainingBlocks(): void {
    if (!this.trainingComparisonRange) return;
    this.trainingBlocksSubscription?.unsubscribe();
    this.trainingBlocksState = 'loading';
    const { start, end } = this.trainingComparisonRange;
    this.trainingBlocksSubscription = this.clientDetailApi
      .getTrainingBlocks(
        this.clientId,
        start,
        end,
        this.selectedTrainingExercises.length
          ? this.selectedTrainingExercises
          : undefined,
        this.selectedTrainingWorkout || undefined
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.trainingBlocks = data.blocks || [];
          this.trainingBlockMuscleGroups = data.blockMuscleGroups || [];
          this.trainingBlockReadiness = data.blockReadiness || [];
          this.trainingBlockAdherence = data.blockAdherence || [];
          this.trainingSessionTraining = data.sessionTraining || [];
          this.trainingSessionMuscleGroups = data.sessionMuscleGroups || [];
          this.trainingSessionReadiness = data.sessionReadiness || [];
          this.trainingSessionAdherence = data.sessionAdherence || [];
          this.trainingExerciseNames = data.exerciseNames || [];
          this.trainingBlockExerciseByName = data.blockExerciseByName || {};
          this.trainingSessionExerciseByName = data.sessionExerciseByName || {};
          this.trainingWorkoutNames = data.workoutNames || [];
          this.trainingBlocksState = 'loaded';
        },
        error: () => {
          this.trainingBlocks = [];
          this.trainingBlockMuscleGroups = [];
          this.trainingBlockReadiness = [];
          this.trainingBlockAdherence = [];
          this.trainingSessionTraining = [];
          this.trainingSessionMuscleGroups = [];
          this.trainingSessionReadiness = [];
          this.trainingSessionAdherence = [];
          this.trainingExerciseNames = [];
          this.trainingBlockExerciseByName = {};
          this.trainingSessionExerciseByName = {};
          this.trainingWorkoutNames = [];
          this.trainingBlocksState = 'error';
        },
      });
  }

  public async openTrainingFilterPanel(): Promise<void> {
    const modal = await this.modalController.create({
      component: TrainingFilterPanelComponent,
      componentProps: {
        selectedMetric: this.trainingComparisonMetric,
        selectedExercises: this.selectedTrainingExercises,
        exerciseNames: this.trainingExerciseNames,
        selectedGranularity: this.trainingGranularity,
        selectedWorkout: this.selectedTrainingWorkout,
        workoutNames: this.trainingWorkoutNames,
      },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<TrainingFilterResult>();
    if (role !== 'confirm' || !data) return;

    this.trainingComparisonMetric = data.metric;
    this.trainingGranularity = data.granularity;
    const exercisesChanged =
      JSON.stringify(data.exercises) !==
      JSON.stringify(this.selectedTrainingExercises);
    this.selectedTrainingExercises = data.exercises;
    const workoutChanged = data.workout !== this.selectedTrainingWorkout;
    this.selectedTrainingWorkout = data.workout;

    // Solo hace falta volver a pedir al backend si de verdad cambió la
    // selección de ejercicios o el workout — el backend recorta `sets` a
    // ese workout/esos ejercicios ANTES de agregar (ver
    // client-progress-controller.js), así que no basta con re-renderizar en
    // el cliente. Cambiar de métrica o de granularidad no necesita ninguna
    // llamada nueva: la respuesta ya trae todos los agregados de una vez.
    if ((data.metric === 'exercise' && exercisesChanged) || workoutChanged) {
      this.loadTrainingBlocks();
    }
  }

  public get selectedTrainingExercise(): string | null {
    return this.selectedTrainingExercises.length === 1
      ? this.selectedTrainingExercises[0]
      : null;
  }

  public onTrainingMetricChanged(metric: TrainingComparisonMetric): void {
    this.trainingComparisonMetric = metric;
    if (
      metric === 'exercise' &&
      !this.selectedTrainingExercises.length &&
      this.trainingExerciseNames.length
    ) {
      this.onTrainingExerciseChanged(this.trainingExerciseNames[0]);
    }
  }

  public onTrainingExerciseChanged(exercise: string): void {
    if (
      this.selectedTrainingExercises.length === 1 &&
      exercise === this.selectedTrainingExercises[0]
    )
      return;
    this.selectedTrainingExercises = [exercise];
    this.loadTrainingBlocks();
  }

  // --- Tarea 3 bis: vista previa de sesiones; "Ver todas" abre el panel
  // lateral con el historial completo (antes, Progreso > Sesiones) ---
  public get recentCompletedWorkouts(): CompletedWorkoutEntry[] {
    return this.completedWorkouts.slice(0, 3);
  }

  public showSessionsPanel = false;

  // Siempre en el DOM (fuera de los *ngIf) para poder moverlo a ion-app al
  // montar: dentro de ion-content el fixed queda capturado y el panel se
  // pintaría detrás de la gráfica de comparación. Mismo truco que
  // SupplementsPanelComponent.
  @ViewChild('sessionsPanelHost')
  private sessionsPanelHost?: ElementRef<HTMLElement>;

  public ngAfterViewInit(): void {
    const host = this.sessionsPanelHost?.nativeElement;
    if (!host) return;
    (document.querySelector('ion-app') || document.body).appendChild(host);
    this.destroyRef.onDestroy(() => host.remove());
  }

  public openSessionsPanel(): void {
    this.showSessionsPanel = true;
  }

  public closeSessionsPanel(): void {
    this.closeSessionsStats();
    this.showSessionsPanel = false;
  }

  // "Ver progresión por ejercicio" — Estadísticas se pinta en el hueco a la
  // izquierda del panel de Sesiones, sin salir de la ficha. Se crea a mano
  // (import perezoso, como su ruta) y se siembra la tabla igual que hace
  // TableInContextResolver antes de abrir la ruta.
  @ViewChild('sessionsStatsHost', { read: ViewContainerRef })
  private sessionsStatsHost?: ViewContainerRef;
  public showSessionsStats = false;
  private isOpeningSessionsStats = false;

  public async openSessionsStats(table: ClientTable): Promise<void> {
    if (!this.sessionsStatsHost || this.isOpeningSessionsStats) return;
    this.isOpeningSessionsStats = true;
    try {
      // El módulo también: registra el ámbito (pipes y componentes) de la página.
      const [{ StatisticsPage }, , fullTable] = await Promise.all([
        import('src/app/features/statistics/statistics.page'),
        import('src/app/features/statistics/statistics.module'),
        firstValueFrom(this.tableService.getTableById(table._id)),
      ]);
      this.tableService.setCurrentTable = fullTable;
      this.sessionsStatsHost.clear();
      const ref = this.sessionsStatsHost.createComponent(StatisticsPage);
      ref.setInput('clientId', this.clientId);
      ref.setInput('embedded', true);
      // ion-header + ion-content necesitan el contenedor flex de una página.
      ref.location.nativeElement.classList.add('ion-page');
      ref.instance.closed.subscribe(() => this.closeSessionsStats());
      this.showSessionsStats = true;
    } catch (error) {
      void this.ionicUtilService.showErrorToast(
        error,
        'No se pudieron abrir las estadísticas de esta rutina.'
      );
    } finally {
      this.isOpeningSessionsStats = false;
    }
  }

  public closeSessionsStats(): void {
    this.sessionsStatsHost?.clear();
    this.showSessionsStats = false;
  }

  // Cabecera persistente ("Cliente Resumen") — completedWorkouts ya viene
  // ordenado desc. por fecha desde computeCompletedWorkouts(), así que el
  // primero es la última sesión completada. Sin scope de entrenamiento el
  // array queda vacío y esto se oculta solo.
  public get lastActivityLabel(): string | null {
    const workout = this.completedWorkouts[0];
    if (!workout?.date) return null;
    return `registró "${workout.name}" · ${this.relativeDayTime(
      new Date(workout.date as Date)
    )}`;
  }

  // Cabecera persistente — nota fijada (Notas, F19). notes ya se carga sin
  // condición en initTabsAndLoadSections(), y el backend garantiza como
  // mucho una nota con pinned=true por cliente (ver trainer-note-dao.js#setPinned),
  // así que basta con encontrar la primera.
  public get pinnedNote(): TrainerNote | null {
    return this.notes.find((n) => n.pinned) || null;
  }

  private relativeDayTime(date: Date): string {
    const now = new Date();
    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const time = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (isSameDay(date, now)) return `hoy, ${time}`;
    if (isSameDay(date, yesterday)) return `ayer, ${time}`;
    return `${date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    })}, ${time}`;
  }

  public goToNotesTab(): void {
    this.selectTab('notes');
  }

  // Tarea 3 — mismo endpoint que ClientsPage usa al revisar un cliente
  // nuevo (GET /trainer/clients/:clientId/intake, sin requireActiveClient:
  // legible aunque la relación no esté "active" todavía).
  private loadClientIntake(): void {
    this.clientIntakeState = 'loading';
    this.trainerInvitesApi.getClientIntake(this.clientId).subscribe({
      next: (intake) => {
        this.clientIntake = intake;
        this.clientIntakeState = 'loaded';
      },
      error: () => {
        this.clientIntakeState = 'error';
      },
    });
  }

  public trainingLocationLabel(location: TrainingLocation | null): string {
    return location
      ? TRAINING_LOCATION_LABELS[location] || location
      : 'No indicado';
  }

  public equipmentTagLabel(tag: EquipmentTag): string {
    return EQUIPMENT_TAG_LABELS[tag] || tag;
  }

  // --- "Ver intake" (cabecera persistente) ---
  // Reutiliza clientIntake/clientIntakeState, ya cargados por
  // loadClientIntake() (ver initTabsAndLoadSections) — no dispara ninguna
  // carga nueva al abrir el panel salvo que aún no hubiera terminado.
  public showIntakePanel = false;
  public isEditingIntake = false;
  public isSavingIntake = false;
  public intakeDraft: {
    goals: string;
    healthConditions: string;
    experienceLevel: ClientIntake['experienceLevel'];
    availability: string;
    trainingLocation: TrainingLocation | null;
    equipmentTags: EquipmentTag[];
    customAnswers: ClientIntakeCustomAnswer[];
  } | null = null;

  public readonly experienceLevelOptions: {
    value: ClientIntake['experienceLevel'];
    label: string;
  }[] = [
    { value: null, label: 'Sin declarar' },
    { value: 'none', label: 'Sin experiencia' },
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
  ];

  public readonly trainingLocationOptions = (
    Object.keys(TRAINING_LOCATION_LABELS) as TrainingLocation[]
  ).map((value) => ({ value, label: TRAINING_LOCATION_LABELS[value] }));

  public readonly equipmentTagOptions = (
    Object.keys(EQUIPMENT_TAG_LABELS) as EquipmentTag[]
  ).map((value) => ({ value, label: EQUIPMENT_TAG_LABELS[value] }));

  // El panel vive fuera de ion-content y se traslada al body al crear la
  // página (mismo portal que nutrition-preferences-panel): así su
  // position:fixed no lo captura el contain de ion-content y queda por
  // encima de las gráficas. Se quita a mano al destruir la página.
  @ViewChild('intakePanelHost', { static: true })
  private set intakePanelHost(ref: ElementRef<HTMLElement>) {
    document.body.appendChild(ref.nativeElement);
    this.destroyRef.onDestroy(() => ref.nativeElement.remove());
  }

  public openIntakePanel(): void {
    this.showIntakePanel = true;
    this.isEditingIntake = false;
    if (this.clientIntakeState === 'error') this.loadClientIntake();
  }

  public closeIntakePanel(): void {
    this.showIntakePanel = false;
    this.isEditingIntake = false;
    this.intakeDraft = null;
  }

  public startEditIntake(): void {
    if (!this.clientIntake) return;
    const intake = this.clientIntake;
    this.intakeDraft = {
      goals: intake.goals || '',
      healthConditions: intake.healthConditions || '',
      experienceLevel: intake.experienceLevel,
      availability: intake.availability || '',
      trainingLocation: intake.trainingLocation,
      equipmentTags: [...(intake.equipmentTags || [])],
      customAnswers: (intake.customAnswers || []).map((a) => ({ ...a })),
    };
    this.isEditingIntake = true;
  }

  public cancelEditIntake(): void {
    this.isEditingIntake = false;
    this.intakeDraft = null;
  }

  public toggleIntakeEquipmentTag(tag: EquipmentTag): void {
    if (!this.intakeDraft) return;
    const tags = this.intakeDraft.equipmentTags;
    const idx = tags.indexOf(tag);
    if (idx === -1) tags.push(tag);
    else tags.splice(idx, 1);
  }

  public saveIntake(): void {
    if (!this.intakeDraft || this.isSavingIntake) return;
    this.isSavingIntake = true;
    this.trainerInvitesApi
      .updateClientIntake(this.clientId, this.intakeDraft)
      .subscribe({
        next: (intake) => {
          this.clientIntake = intake;
          this.isSavingIntake = false;
          this.isEditingIntake = false;
          this.intakeDraft = null;
          this.ionicUtilService.showToast({
            message: 'Cuestionario actualizado',
            duration: 2500,
          });
        },
        error: () => {
          this.isSavingIntake = false;
          this.ionicUtilService.showToast({
            message: 'No se pudo guardar el cuestionario',
            duration: 3000,
          });
        },
      });
  }

  // F09 — detalle de rutina en modo lectura: expandir/colapsar splits/workouts
  // de una tabla concreta, sin navegar a otra pantalla.
  public toggleTableExpand(table: ClientTable): void {
    this.expandedTableId =
      this.expandedTableId === table._id ? null : table._id;
  }

  // --- Tarea 4 (2026-09): "Fases de entrenamiento" ---
  // Mismo patrón que "Fases del plan" de Nutrición (activePlan/planPhases/
  // nutritionHistory), simplificado: sin endDate, así que no hay rango que
  // filtrar — solo desde-cuándo. Sustituye al antiguo activateTable()
  // instantáneo: poner una rutina en marcha (hoy o en el futuro) pasa
  // siempre por el mismo formulario (openApplyRoutinePhaseModal).
  public routinePhases: RoutineAssignment[] = [];
  public routineHistory: RoutineAssignment[] = [];
  public routineHistoryState: SectionState = 'loading';
  public showRoutineHistory = false;

  // Un único fetch (historial completo) basta: "cuál es la actual" se
  // calcula por fecha (currentRoutinePhase, más abajo), nunca leyendo
  // `status` — así no hace falta el `active` de /routine-assignments/active
  // aparte, que solo refleja la BD, no lo que de verdad rige hoy.
  public loadActiveRoutine(): void {
    this.routineHistoryState = 'loading';
    this.routineAssignmentApi.getHistory(this.clientId).subscribe({
      next: (history) => {
        this.routinePhases = this.buildRoutinePhaseSequence(history || []);
        this.routineHistory = (history || [])
          .slice()
          .sort((a, b) => a.startDate.localeCompare(b.startDate));
        this.routinePhaseColorMap = buildPhaseColorMap(
          this.routineHistory.map((p) => p._id)
        );
        this.routineHistoryState = 'loaded';
        this.rebuildProjectedTrainingDays();
        this.applyDefaultTrainingRangeIfUnset();
      },
      error: () => {
        this.routinePhases = [];
        this.routineHistory = [];
        this.routineHistoryState = 'error';
        this.applyDefaultTrainingRangeIfUnset();
      },
    });
  }

  // Mismo patrón que phaseColorMap (nutrición, loadActivePlan): un color por
  // fase de rutina, estable a lo largo de toda la secuencia (vigente +
  // programadas), reutilizando phase-color.util.ts tal cual.
  private routinePhaseColorMap = new Map<string, string>();

  public routinePhaseColor(phase: RoutineAssignment | null): string {
    if (!phase) return 'var(--tf-accent)';
    return this.routinePhaseColorMap.get(phase._id) ?? 'var(--tf-accent)';
  }

  public routinePhaseSoftBackground(phase: RoutineAssignment | null): string {
    if (!phase) return 'var(--tf-accent-soft)';
    const color = this.routinePhaseColorMap.get(phase._id);
    if (!color) return 'var(--tf-accent-soft)';
    return this.hexToRgba(color, 0.14);
  }

  // Cronológico, excluyendo "ended" (reservado, sin uso real hoy — igual
  // que en nutrición). Sin endDate que filtrar: a diferencia de nutrición,
  // aquí no hay fases "ya terminadas" que descartar de la lista.
  private buildRoutinePhaseSequence(
    history: RoutineAssignment[]
  ): RoutineAssignment[] {
    return history
      .filter((phase) => phase.status !== 'ended')
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  }

  // Sin rango [start,end] que comprobar (no hay endDate): es la fase con el
  // startDate más reciente que ya haya llegado, dentro de la secuencia.
  public isCurrentRoutinePhase(phase: RoutineAssignment): boolean {
    const actual = this.currentRoutinePhase;
    return !!actual && actual._id === phase._id;
  }

  // OJO: NO usar `activeRoutinePhase` (el `status:"active"` crudo del
  // backend) para decidir qué mostrar como "en uso" — programar una fase
  // FUTURA la marca "active" en la BD de inmediato aunque todavía no rija
  // (mismo comportamiento que PlanAssignment en Nutrición, documentado en
  // plan-assignment-service.js). "Actual" se calcula SIEMPRE por fecha,
  // nunca por status — si no, la tarjeta "En uso" mostraría la rutina
  // programada antes de que empiece de verdad.
  public get currentRoutinePhase(): RoutineAssignment | null {
    const hoy = new Date().toISOString().slice(0, 10);
    const vigentes = this.routinePhases.filter((p) => p.startDate <= hoy);
    return vigentes[vigentes.length - 1] || null;
  }

  // "Semana 5 de 8" para la cabecera persistente — calculado de verdad a
  // partir de startDate/estimatedEndDate de la fase vigente, ningún número
  // declarado a mano.
  public get currentPhaseWeekLabel(): string | null {
    const phase = this.currentRoutinePhase;
    if (!phase) return null;
    const start = new Date(phase.startDate + 'T00:00:00Z').getTime();
    const currentWeek = Math.max(
      1,
      Math.floor((Date.now() - start) / (7 * 86400000)) + 1
    );
    if (!phase.estimatedEndDate) return `Semana ${currentWeek}`;
    const end = new Date(phase.estimatedEndDate + 'T00:00:00Z').getTime();
    const totalWeeks = Math.max(
      currentWeek,
      Math.ceil((end - start) / (7 * 86400000))
    );
    return `Semana ${currentWeek} de ${totalWeeks}`;
  }

  // Lo mismo para la línea de nutrición de la cabecera, leído de phaseWeeks
  // (semanas naturales de la fase de dieta vigente). "de N" solo si la fase
  // ya tiene fin real: una fase abierta no tiene duración, acaba cuando
  // empieza la siguiente.
  public get currentDietWeekLabel(): string | null {
    const current = this.phaseWeeks?.current;
    if (!current) return null;
    return this.phaseWeeks?.phaseEnd
      ? `Semana ${current.number} de ${this.phaseWeeks.weeks.length}`
      : `Semana ${current.number}`;
  }

  public toggleRoutineHistory(): void {
    this.showRoutineHistory = !this.showRoutineHistory;
  }

  public trackByRoutinePhaseId(
    _index: number,
    phase: RoutineAssignment
  ): string {
    return phase._id;
  }

  // Tarea 4bis (2026-09) — "me he equivocado" / cliente lesionado: quitar
  // una fase programada antes de que empiece.
  //
  // 2026-09 — mismo criterio que confirmCancelPlanPhase en Nutrición: la
  // confirmación pasó de `ion-alert` (diálogo aparte, tapando el resto de
  // la ficha) a dos botones pequeños INLINE en el propio sitio de "Quitar
  // fase" — pedir confirmación sobre UNA fila de una lista no necesita
  // interrumpir toda la pantalla.
  public cancellingRoutinePhaseId: string | null = null;
  // Fase para la que están abiertos los botones "Cancelar/Quitar" — como
  // mucho una a la vez (pedir para otra cierra la anterior sin tocarla).
  public confirmingCancelRoutinePhaseId: string | null = null;

  public requestCancelRoutinePhase(
    phase: RoutineAssignment,
    event: Event
  ): void {
    event.stopPropagation();
    this.confirmingCancelRoutinePhaseId = phase._id;
  }

  public dismissCancelRoutinePhase(event: Event): void {
    event.stopPropagation();
    this.confirmingCancelRoutinePhaseId = null;
  }

  public confirmCancelRoutinePhase(
    phase: RoutineAssignment,
    event: Event
  ): void {
    event.stopPropagation();
    this.confirmingCancelRoutinePhaseId = null;
    this.cancellingRoutinePhaseId = phase._id;
    this.routineAssignmentApi.cancel(this.clientId, phase._id).subscribe({
      next: () => {
        this.cancellingRoutinePhaseId = null;
        this.ionicUtilService.showToast({
          message: 'Fase quitada',
          duration: 1500,
        });
        this.loadActiveRoutine();
        this.loadTraining();
      },
      error: (err) => {
        this.cancellingRoutinePhaseId = null;
        this.ionicUtilService.showToast({
          message: err?.error?.message || 'No se pudo quitar la fase',
          duration: 2500,
        });
      },
    });
  }

  // Tarea 4ter (2026-09) — "quiero extenderlo": cambiar solo la fecha de
  // una fase programada (aún no en curso), sin pasar por cancelar +
  // reprogramar. Reutiliza el mismo modal que "Programar rutina" en modo
  // 'reschedule' (tabla fija, solo se edita la fecha).
  public async openRescheduleRoutinePhaseModal(
    phase: RoutineAssignment,
    event: Event
  ): Promise<void> {
    event.stopPropagation();

    const modal = await this.modalController.create({
      component: ApplyRoutineModalComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        mode: 'reschedule',
        assignmentId: phase._id,
        fixedTableName: phase.tableName || '',
        suggestedStartDate: phase.startDate,
        phases: this.routinePhases,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    this.ionicUtilService.showToast({
      message: 'Fecha actualizada',
      duration: 1500,
    });
    this.loadActiveRoutine();
    this.loadTraining();
  }

  // Getter de conveniencia para el badge inline en el listado de Rutinas:
  // qué fase PROGRAMADA (aún no en curso) corresponde a esta tabla, si hay
  // alguna — así el trainer ve "cuándo entra en marcha" sin tener que bajar
  // hasta Fases de entrenamiento.
  public scheduledPhaseForTable(tableId: string): RoutineAssignment | null {
    return (
      this.routinePhases.find(
        (phase) =>
          phase.tableId === tableId && !this.isCurrentRoutinePhase(phase)
      ) || null
    );
  }

  public async openApplyRoutinePhaseModal(): Promise<void> {
    // Sin endDate del que encadenar: si ya hay una última fase, se sugiere
    // "mañana" (una rutina se presume vigente hasta que se sustituya, no
    // hay "el día siguiente a cuando termina"); sin ninguna, hoy.
    const ultima = this.routinePhases[this.routinePhases.length - 1] || null;
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);

    const modal = await this.modalController.create({
      component: ApplyRoutineModalComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        clientName: this.name,
        suggestedStartDate: ultima ? manana.toISOString().slice(0, 10) : null,
        previousPhaseName: ultima?.tableName || '',
        phases: this.routinePhases,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    this.ionicUtilService.showToast({
      message: 'Rutina programada',
      duration: 2000,
    });
    this.loadActiveRoutine();
    this.loadTraining();
  }

  // --- Tarea 4 (2026-09): proyección de la rutina sobre el calendario ---
  // Fase A2 (2026-09) — phaseId/phaseName/phaseColor (no splitId/splitName):
  // antes esto se derivaba cruzando workoutId contra la tabla de la fase
  // EN USO nada más, así que en cuanto /active/schedule empezó a devolver
  // días de VARIAS fases (ver routine-assignment-projection.js), los días de
  // cualquier otra fase se quedaban sin match — de ahí que solo se viera "la
  // fase que acabas de programar". Ahora cada día ya trae su assignmentId
  // (de qué fase salió) directamente del backend, y aquí solo se resuelve
  // contra `routineHistory` — mismo color que ya pintan las tarjetas de
  // "Fases de entrenamiento" (routinePhaseColor), consistente en toda la
  // ficha en vez de un algoritmo de color aparte solo para el calendario.
  public projectedTrainingDays: Map<
    string,
    {
      isPlannedRestDay: boolean;
      name: string;
      phaseId: string | null;
      phaseName: string | null;
      phaseColor: string | null;
      microcycleNumber: number | null;
    }
  > = new Map();
  private rawScheduleDays: RoutineScheduleDay[] = [];
  // Ventana YA pedida al backend — solo crece (unión con cada rango nuevo),
  // nunca se encoge. Sin esto, elegir un rango de comparación más estrecho
  // que el actual volvía a pedir el schedule SOLO para ese rango y el fetch
  // más amplio anterior se perdía: en el propio calendario (que sigue
  // enseñando el mes de siempre, no el rango elegido) los días que quedaban
  // fuera del nuevo rango se veían "en blanco" de golpe, aunque un momento
  // antes sí tenían información.
  private scheduleWindow: { start: string; end: string } | null = null;

  private loadTrainingSchedule(range: { start: string; end: string }): void {
    const start =
      this.scheduleWindow && this.scheduleWindow.start < range.start
        ? this.scheduleWindow.start
        : range.start;
    const end =
      this.scheduleWindow && this.scheduleWindow.end > range.end
        ? this.scheduleWindow.end
        : range.end;
    this.scheduleWindow = { start, end };

    this.routineAssignmentApi
      .getActiveSchedule(this.clientId, start, end)
      .subscribe({
        next: (days: RoutineScheduleDay[]) => {
          this.rawScheduleDays = days || [];
          this.rebuildProjectedTrainingDays();
        },
        // Fallo de red puntual — se conserva lo que ya había cargado en vez de
        // vaciarlo: un error no debe borrar del calendario información que ya
        // se había visto.
        error: () => undefined,
      });
  }

  // routineHistory (loadActiveRoutine) llega por un fetch async
  // independiente del schedule: se reconstruye cada vez que cualquiera de
  // los dos cambia, para no depender del orden de llegada entre ellos.
  private rebuildProjectedTrainingDays(): void {
    const phaseById = new Map(
      this.routineHistory.map((phase) => [phase._id, phase])
    );
    this.projectedTrainingDays = new Map(
      this.rawScheduleDays.map((d) => {
        const phase = phaseById.get(d.assignmentId) ?? null;
        return [
          d.date,
          {
            isPlannedRestDay: d.isPlannedRestDay,
            name: d.name,
            phaseId: phase?._id ?? null,
            phaseName: phase?.tableName ?? null,
            phaseColor: phase ? this.routinePhaseColor(phase) : null,
            microcycleNumber: d.microcycleNumber ?? null,
          },
        ];
      })
    );
  }

  public workoutDuration(workout: {
    startedAt?: Date | null;
    date?: Date | null;
  }): string | null {
    if (!workout.startedAt || !workout.date) return null;
    const ms =
      new Date(workout.date).getTime() - new Date(workout.startedAt).getTime();
    if (ms <= 0) return null;
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  public setDescription(exercise: {
    sets?: { reps?: number; weight?: number; doned?: boolean }[];
  }): string {
    const sets = exercise.sets || [];
    const doneSets = sets.filter((s) => s.doned);
    if (!doneSets.length) return 'Sin series realizadas';
    return doneSets
      .map((s) =>
        s.weight != null
          ? `${s.reps ?? '-'}×${s.weight}kg`
          : `${s.reps ?? '-'} reps`
      )
      .join(' · ');
  }

  // TAREA 2 (coach-tab) — "prescrito vs. realizado": lo pautado por el
  // entrenador para este ejercicio, reutilizando el mismo dato ya cargado
  // (expectedReps/expectedRir de cada Set, sin llamada nueva al backend).
  public expectedDescription(exercise: {
    sets?: { expectedReps?: number[]; expectedRir?: number[] }[];
  }): string {
    const sets = exercise.sets || [];
    const withExpected = sets.filter((s) => s.expectedReps?.length);
    if (!withExpected.length) return 'Sin prescripción';
    return withExpected
      .map((s) => {
        const reps = (s.expectedReps || []).join('/');
        const rir = (s.expectedRir || [])
          .map((r) => (r === -1 ? 'F' : r))
          .join('/');
        return rir ? `${reps} reps @ RIR ${rir}` : `${reps} reps`;
      })
      .join(' · ');
  }

  public hasAnyDoneSet(exercise: { sets?: { doned?: boolean }[] }): boolean {
    return (exercise.sets || []).some((s) => s.doned);
  }

  // F09 — historial de entrenamientos completados: aplana todos los workouts
  // de todas las rutinas del cliente que ya tienen `date` (terminados), sin
  // necesitar un endpoint nuevo — los mismos datos de `getClientTables` ya
  // traen splits/workouts completos.
  //
  // Calculado UNA VEZ en `loadTraining()`, no como getter: un getter usado en
  // `*ngFor` se reevalúa en CADA ciclo de detección de cambios de Angular y
  // devuelve un array nuevo cada vez, lo que fuerza destruir/recrear todas las
  // tarjetas del historial en cada ciclo — con el historial real de un
  // cliente con muchos entrenamientos (a diferencia de los pocos de prueba
  // usados al verificar esto) eso satura la UI y la pestaña se percibe como
  // colgada.
  public completedWorkouts: CompletedWorkoutEntry[] = [];

  private computeCompletedWorkouts(): void {
    const entries: CompletedWorkoutEntry[] = [];
    for (const table of this.tables) {
      for (const split of table.splits || []) {
        for (const workout of split.workouts || []) {
          if (!workout.date) continue;
          entries.push({
            ...workout,
            tableName: table.name,
            splitName: split.name || '',
          });
        }
      }
    }
    this.completedWorkouts = entries.sort(
      (a, b) =>
        new Date(b.date as Date).getTime() - new Date(a.date as Date).getTime()
    );
    this.completedDaysMap = this.buildCompletedDaysMap();
  }

  // Movimiento 2 Coach Pro — "Cuádriceps 4 · Glúteo 3". Devuelve cadena
  // vacía (que la plantilla trata como falsy con `as`) cuando no hay nada:
  // una sesión sin agujetas apuntadas no debe pintar una línea vacía.
  public sorenessLabel(workout: CompletedWorkoutEntry): string {
    return formatSoreness(workout.sorenessPre);
  }

  public trackByWorkoutId(
    _index: number,
    workout: CompletedWorkoutEntry
  ): string {
    return workout._id || _index.toString();
  }

  public openRoutinePanel(): void {
    this.showRoutinePanel = true;
    this.routineForm.reset({ name: '' });
  }

  public closeRoutinePanel(): void {
    this.showRoutinePanel = false;
  }

  // Replanteamiento MVP (rutinas) — "Crear nueva" ya no se queda en un
  // nombre sin contenido: lleva directamente al constructor completo
  // (splits/workouts/ejercicios/series) para la tabla recién creada.
  public submitNewRoutine(): void {
    const name = this.routineForm.value.name?.trim();
    if (!name || this.isAssigningRoutine) return;

    this.isAssigningRoutine = true;
    this.clientDetailApi.assignNewRoutine(this.clientId, name).subscribe({
      next: (table) => {
        this.isAssigningRoutine = false;
        this.showRoutinePanel = false;
        void this.openPlanner(table);
      },
      error: (err) => this.onRoutineAssignError(err),
    });
  }

  // Planificador visual (Fase C) — sustituye al modal de mesocycle.page.ts
  // (panel de 420px, insuficiente para un tablero Kanban de varias semanas a
  // la vez) por la ruta completa /tabs/clients/:clientId/tables/:tableId/planner
  // (full-width, ver TASK-026 — antes vivía fuera de 'tabs', sin sidebar).
  // TableInContextResolver siembra la tabla del cliente antes de activar la
  // ruta — no hace falta sembrarla aquí. Al volver (back), ionViewWillEnter
  // (ver TASK-019) recarga la lista — la instancia de este componente queda
  // cacheada por ion-router-outlet, no se recrea.
  // TASK-018 (MASTER_BACKLOG.md) — renombrado de openRoutineBuilder() a
  // openPlanner(): el nombre anterior era gemelo de RoutineBuilderPage
  // (features/routines/pages/routine-builder), una pantalla completamente
  // distinta (autoría de una WorkoutTemplate reutilizable) — este método
  // abre el Planificador (Table ya asignada a este cliente), no eso.
  // 2026-09 — atajo directo al Planificador de la rutina EN USO desde la
  // tarjeta "En uso". Navega por tableId de la fase (la tabla puede no estar
  // todavía en `this.tables`, que se carga aparte) reutilizando la MISMA ruta
  // que openPlanner, sin duplicar criterio.
  public async openPlannerForCurrentPhase(): Promise<void> {
    const phase = this.currentRoutinePhase;
    if (!phase?.tableId) return;
    await this.openPlanner({ _id: phase.tableId } as ClientTable);
  }

  public async openPlanner(table: ClientTable): Promise<void> {
    await this.router.navigate([
      '/tabs',
      'clients',
      this.clientId,
      'tables',
      table._id,
      'planner',
    ]);
  }

  // --- Notas del cliente (Plan) ---
  // Contador de no vistas para la subpestaña y el Resumen. Lo refresca la
  // propia pestaña al marcar; aquí solo se pide al entrar en la ficha.
  public clientNotesUnread = 0;

  private loadClientNotesUnread(): void {
    if (!this.scopes.length) return;
    this.clientDetailApi.getClientNotesUnread(this.clientId).subscribe({
      next: (unread) => (this.clientNotesUnread = unread.total),
      error: () => (this.clientNotesUnread = 0),
    });
  }

  // Lleva a donde está escrita la nota. Entrenamiento: el Planificador,
  // enfocado en el microciclo, el día y el ejercicio (query params que lee
  // planner.page.ts#focusFromQuery). Nutrición: la pestaña Nutrición en ese
  // día. Dolor: su pestaña.
  public async openClientNote(note: ClientNote): Promise<void> {
    const target = note.target;
    if (target.type === 'planner') {
      await this.router.navigate(
        [
          '/tabs',
          'clients',
          this.clientId,
          'tables',
          target.tableId,
          'planner',
        ],
        {
          queryParams: {
            split: target.splitId || undefined,
            workout: target.workoutId || undefined,
            exercise: target.exerciseId || undefined,
          },
        }
      );
      return;
    }
    if (target.type === 'nutrition') {
      this.onNutritionDateSelected(target.date);
      this.selectTab('nutrition');
      this.scrollToSelector('app-nutrition-calendar');
      return;
    }
    this.selectTab('pain');
  }

  // El panel de destino se monta con *ngIf al cambiar de pestaña: se espera
  // un ciclo de render antes de buscarlo.
  private scrollToSelector(selector: string): void {
    setTimeout(() => {
      document
        .querySelector(selector)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }

  // TASK-007 — mismo patrón que openPlanner: ruta completa +
  // TableInContextResolver siembra la tabla del cliente antes de activar.
  public async openStatistics(table: ClientTable): Promise<void> {
    await this.router.navigate([
      '/tabs',
      'clients',
      this.clientId,
      'tables',
      table._id,
      'statistics',
    ]);
  }

  // TASK-019 (MASTER_BACKLOG.md) — antes no existía forma de eliminar una
  // rutina completa ya asignada, solo vaciarla split a split a mano.
  public async confirmDeleteTable(
    table: ClientTable,
    event: Event
  ): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: 'Borrar rutina',
      message: `¿Seguro que quieres borrar por completo "${table.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.clientDetailApi
              .deleteTable(this.clientId, table._id)
              .subscribe({
                next: () => {
                  // Borrado coherente de fases/rutinas — borrar una tabla
                  // puede ahora restaurar/limpiar tableInUse y borrar fases
                  // (RoutineAssignment) asociadas en el backend. Un parche
                  // local de `this.tables` dejaría currentRoutinePhase y el
                  // badge "en uso" de las demás tablas desincronizados hasta
                  // un refresco manual — se recarga todo en su lugar.
                  if (this.expandedTableId === table._id)
                    this.expandedTableId = null;
                  this.ionicUtilService.showToast({
                    message: 'Rutina borrada',
                    duration: 1500,
                  });
                  this.loadTraining();
                },
                error: () => {
                  this.ionicUtilService.showToast({
                    message: 'No se pudo borrar la rutina',
                    duration: 2500,
                  });
                },
              });
          },
        },
      ],
    });
  }

  // Rutinas -> Plantillas (rediseño 2026-08) — reactiva F11 (getAvailableTemplates/
  // assignTemplateRoutine en ClientDetailApiService, escrito hace tiempo pero
  // nunca consumido desde ningún componente): elegir una plantilla de rutina
  // completa ya construida (propia del profesional) en vez de partir de cero.
  // Hermano de startDietPhase() (nutrición) un poco más abajo.
  public async openApplyRoutineTemplateModal(): Promise<void> {
    this.closeRoutinePanel();
    const modal = await this.modalController.create({
      component: ApplyRoutineTemplateModalComponent,
      componentProps: { clientId: this.clientId, clientName: this.name },
    });
    await modal.present();
    const { data: table, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !table) return;

    this.ionicUtilService.showToast({
      message: `Plantilla asignada a ${this.name}`,
      duration: 2000,
    });
    void this.openPlanner(table);
  }

  private onRoutineAssignError(err: any): void {
    this.isAssigningRoutine = false;
    this.ionicUtilService.showErrorToast(
      err?.error?.message || 'No se pudo asignar la rutina',
      'Error',
      3500
    );
  }

  // --- Nutrición ---
  // F10 — navegable día a día, igual que el calendario de dieta del propio
  // cliente; el backend ya aceptaba `?date=`, solo faltaba esta UI.
  public loadNutrition(date: string = this.nutritionDate): void {
    this.nutritionDate = date;
    this.nutritionState = 'loading';

    this.clientDetailApi.getAdherence(this.clientId).subscribe({
      next: (adherence) => {
        this.adherence = adherence;
        this.nutritionState = 'loaded';
      },
      error: () => {
        this.adherence = null;
        this.nutritionState = 'error';
      },
    });

    // F20-bis — ventana fija de 30 días terminando hoy, no la fecha que se
    // esté viendo abajo (mismo criterio que /adherence).
    this.clientDetailApi
      .getNutritionCompliance(
        this.clientId,
        this.isoDateDaysAgo(30),
        this.todayIsoDate()
      )
      .subscribe({
        next: (summary) => (this.complianceSummary = summary),
        error: () => (this.complianceSummary = null),
      });

    // F29 — no bloquea el resto de la sección si falla, es un widget aparte.
    this.clientDetailApi.getNutritionPreferences(this.clientId).subscribe({
      next: (preferences) => (this.nutritionPreferences = preferences),
      error: () => (this.nutritionPreferences = null),
    });

    this.loadNutritionalGoal();

    void this.loadActivePlan();
  }

  // F20-quinquies — llamado por <app-nutrition-calendar> al completar una
  // selección de rango (click día inicio, click día fin); alimenta las
  // gráficas con ese rango exacto. Rango a mano: deja de haber preset activo.
  public onNutritionRangeSelected(range: { start: string; end: string }): void {
    this.trackingPreset = null;
    this.customTrackingRange = range;
  }

  // F20-bis — llamado por <app-nutrition-calendar> al hacer click en un día;
  // sustituye a los antiguos botones ±1 día (changeNutritionDate), que no
  // daban vista de conjunto ni salto directo a una fecha.
  //
  // Ya no pide nada al cambiar de día (antes releía el dietDay para poder
  // pautar comida a comida desde aquí — ver Replanteamiento MVP en
  // client-detail.page.html): adherence/complianceSummary/
  // nutritionPreferences/activePlan tampoco cambian según el día que se
  // esté mirando, así que no queda nada de verdad que releer.
  public onNutritionDateSelected(date: string): void {
    this.nutritionDate = date;
  }

  // Fecha de calendario LOCAL, no UTC: `startDate` de una fase es el día
  // pautado en la agenda del entrenador (sin hora ni huso), y toISOString()
  // convierte a UTC — con la máquina/navegador en un huso por delante de UTC
  // (España, p. ej.), de medianoche local en adelante seguía dando la fecha
  // de AYER en UTC. Una fase que empieza literalmente hoy comparaba
  // `startDate <= hoy` como false y no se reconocía como vigente ("EN
  // CURSO" no salía) hasta que UTC alcanzaba la fecha local.
  private formatLocalIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private todayIsoDate(): string {
    return this.formatLocalIsoDate(new Date());
  }

  private isoDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return this.formatLocalIsoDate(date);
  }

  private addDays(iso: string, days: number): string {
    const date = new Date(`${iso}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  private mondayOf(iso: string): string {
    const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay(); // 0 = domingo
    return this.addDays(iso, -((weekday + 6) % 7));
  }

  // Sin días con plan no hay adherencia que medir (percentage null), que no
  // es lo mismo que un 0%.
  public get hasAdherenceData(): boolean {
    return (
      this.adherence?.percentage !== null &&
      this.adherence?.percentage !== undefined
    );
  }

  // F20-bis — % medio de cumplimiento (días con plan) de la ventana de 30
  // días de complianceSummary. null si no hay ningún día con plan pautado
  // en ese rango (no confundir con 0%: "sin datos" ≠ "cumplimiento nulo").
  public get compliancePercentage(): number | null {
    const days = (this.complianceSummary?.dailyBreakdown || []).filter(
      (d) => d.hasPlan && d.completionPercentage !== null
    );
    if (!days.length) return null;
    const sum = days.reduce((acc, d) => acc + (d.completionPercentage || 0), 0);
    return Math.round(sum / days.length);
  }

  // Auditoría de arquitectura (nutrición, Fase 8)
  public loadActivePlan(): Promise<void> {
    // La secuencia entera, no solo la vigente: las fases programadas se
    // pintan a la derecha de la actual, así que hacen falta desde el primer
    // render y no solo al desplegar el historial de abajo.
    return forkJoin({
      active: this.planAssignmentApi.getActive(this.clientId),
      history: this.planAssignmentApi.getHistory(this.clientId),
    })
      .toPromise()
      .then((res) => {
        this.allPhasesHistory = (res?.history || [])
          .slice()
          .sort((a, b) => a.startDate.localeCompare(b.startDate));
        // Sugerencias de dieta — las semanas de una fase comparten color
        // (banda de fase). Color por phaseId; sin phaseId, por _id.
        const phaseKeys: string[] = [];
        for (const p of this.allPhasesHistory) {
          const key = p.phaseId || p._id;
          if (!phaseKeys.includes(key)) phaseKeys.push(key);
        }
        this.phaseColorMap = buildPhaseColorMap(phaseKeys);

        // BUG conocido (2026-09-11, parcheado a medias): `res.active` es el
        // TIP de la cadena por status, no la fase que de verdad cubre hoy —
        // si se pre-programa la siguiente fase con fecha futura, el backend
        // ya la marca "vigente" aunque hoy siga corriendo la anterior (ver
        // markSuperseded en plan-assignment-service.js). Resolverlo aquí por
        // FECHA es lo que evita la card grande (con semanas/acciones) enseñando
        // una fase que aún no ha empezado mientras la que de verdad rige hoy
        // desaparece de la fila. Con la cadena sana solo hay una que cubra
        // hoy y coincide con `res.active`; el fallback es solo para datos
        // atípicos (huecos, fases legacy sin encadenar bien).
        const hoy = this.todayIsoDate();
        const vigentesHoy = this.allPhasesHistory.filter(
          (p) => p.startDate <= hoy && (!p.endDate || p.endDate >= hoy)
        );
        this.activePlan =
          vigentesHoy[vigentesHoy.length - 1] || res?.active || null;
        this.loadPhaseWeeks();
        this.loadCheckinSchedulesCount();
      })
      .catch(() => {
        this.activePlan = null;
        this.allPhasesHistory = [];
        this.phaseWeeks = null;
      });
  }

  // --- Objetivo nutricional del cliente (docs/plan-semanas.md) ---
  //
  // El mismo número que el cliente ve en su app. El profesional lo ve aquí
  // arriba del todo —es lo que justifica el resto de la columna— y puede
  // tecleárselo: al hacerlo queda "manual" y deja de recalcularse solo
  // cuando cambie el peso.
  public nutritionalGoal: ClientNutritionalGoalResponse | null = null;
  public nutritionalGoalState: 'loading' | 'loaded' | 'error' = 'loading';
  public editingNutritionalGoal = false;
  public showGoalMath = false;
  public savingNutritionalGoal = false;
  // Edición con "Ajustar macros", como en "Empezar fase" y "Siguiente
  // semana": las kcal mandan y los macros tienen que cuadrar con ellas.
  public goalDraftKcal = 0;
  // Reparto de partida (el guardado o, si no hay, el calculado) llevado a
  // las kcal tecleadas: sin tocar los macros, siguen a las kcal en la misma
  // proporción. Se recalcula al cambiar las kcal, no en un getter: un objeto
  // nuevo en cada ciclo dispararía el ngOnChanges de app-macro-adjust.
  public goalDefaultMacros: MacroSet = { protein: 0, carbs: 0, fat: 0 };
  // El reparto tocado a mano; null = sigue a goalDefaultMacros.
  public goalAdjustedMacros: MacroSet | null = null;
  private goalBaseMacros: MacroSet = { protein: 0, carbs: 0, fat: 0 };
  @ViewChild(MacroAdjustComponent)
  private goalMacroAdjust?: MacroAdjustComponent;

  public loadNutritionalGoal(): void {
    this.nutritionalGoalState = 'loading';
    this.clientDetailApi.getNutritionalGoal(this.clientId).subscribe({
      next: (res) => {
        this.nutritionalGoal = res;
        this.nutritionalGoalState = 'loaded';
      },
      error: () => {
        this.nutritionalGoal = null;
        this.nutritionalGoalState = 'error';
      },
    });
  }

  public startEditNutritionalGoal(): void {
    const goal = this.nutritionalGoal?.goal;
    const calculated = this.nutritionalGoal?.calculated?.target;
    const saved: MacroSet | null = goal
      ? {
          protein: goal.proteinsGTotal || 0,
          carbs: goal.carbohydratesGTotal || 0,
          fat: goal.fatGTotal || 0,
        }
      : null;
    this.goalBaseMacros =
      saved && this.macroKcal(saved) > 0
        ? saved
        : {
            protein: calculated?.protein ?? 0,
            carbs: calculated?.carbs ?? 0,
            fat: calculated?.fat ?? 0,
          };
    this.goalAdjustedMacros = null;
    this.onGoalKcalChange(goal?.kcalTotal ?? calculated?.kcal ?? 0);
    this.editingNutritionalGoal = true;
  }

  // Escala sobre la suma de kcal de los macros, no sobre las kcal guardadas:
  // así un objetivo que ya venía descuadrado también sale cuadrado.
  public onGoalKcalChange(kcal: number | null): void {
    this.goalDraftKcal = kcal || 0;
    const baseKcal = this.macroKcal(this.goalBaseMacros);
    const factor = baseKcal > 0 ? this.goalDraftKcal / baseKcal : 0;
    this.goalDefaultMacros = {
      protein: this.goalBaseMacros.protein * factor,
      carbs: this.goalBaseMacros.carbs * factor,
      fat: this.goalBaseMacros.fat * factor,
    };
  }

  // Peso para los g/kg: el mismo que usa el cálculo del objetivo.
  public get goalWeightKg(): number | null {
    const calculated = this.nutritionalGoal?.calculated;
    return (
      calculated?.weightSource?.weightKg ?? calculated?.inputs?.weightKg ?? null
    );
  }

  private macroKcal(macros: MacroSet): number {
    return (
      (macros.protein || 0) * KCAL_PER_G.protein +
      (macros.carbs || 0) * KCAL_PER_G.carbs +
      (macros.fat || 0) * KCAL_PER_G.fat
    );
  }

  public saveNutritionalGoal(): void {
    if (!(this.goalDraftKcal > 0) || this.savingNutritionalGoal) return;
    // Macros que no cuadran con las kcal: no se guarda.
    const macroError = this.goalMacroAdjust?.validate();
    if (macroError) {
      this.ionicUtilService.showErrorToast(macroError, 'Error', 4500);
      return;
    }
    const macros = this.goalAdjustedMacros ?? this.goalDefaultMacros;
    this.savingNutritionalGoal = true;
    this.clientDetailApi
      .updateNutritionalGoal(this.clientId, {
        kcalTotal: this.goalDraftKcal,
        proteinsGTotal: Math.round(macros.protein),
        carbohydratesGTotal: Math.round(macros.carbs),
        fatGTotal: Math.round(macros.fat),
      })
      .subscribe({
        next: () => {
          this.savingNutritionalGoal = false;
          this.editingNutritionalGoal = false;
          this.ionicUtilService.showToast({
            message: 'Objetivo actualizado',
            duration: 2000,
          });
          this.loadNutritionalGoal();
        },
        error: (err) => {
          this.savingNutritionalGoal = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo guardar el objetivo',
            'Error',
            3500
          );
        },
      });
  }

  // Volver al calculado: el objetivo deja de ser manual y se recalcula con
  // los datos del cliente.
  public recalculateNutritionalGoal(): void {
    if (this.savingNutritionalGoal) return;
    this.savingNutritionalGoal = true;
    this.clientDetailApi
      .updateNutritionalGoal(this.clientId, { recalculate: true })
      .subscribe({
        next: () => {
          this.savingNutritionalGoal = false;
          this.editingNutritionalGoal = false;
          this.loadNutritionalGoal();
        },
        error: (err) => {
          this.savingNutritionalGoal = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo recalcular el objetivo',
            'Error',
            3500
          );
        },
      });
  }

  // Reparto de macros del objetivo sobre el TOTAL DE KCAL, no sobre los
  // gramos: 1 g de grasa aporta 9 kcal y 1 g de proteína/carbo 4, así que
  // repartir por gramos pintaría la grasa mucho más pequeña de lo que pesa
  // en el día. Misma cuenta que macroBarSegments() en diet-card.
  //
  // Se llama varias veces por render desde la plantilla (barra + tres
  // porcentajes), así que el resultado se cachea por combinación de macros:
  // sin caché serían seis cuentas en cada ciclo de detección de cambios.
  private goalSplitCache: {
    key: string;
    value: { protein: number; carbs: number; fat: number };
  } | null = null;

  public goalMacroSplit(goal: ClientNutritionalGoal): {
    protein: number;
    carbs: number;
    fat: number;
  } {
    const proteinKcal = (goal.proteinsGTotal || 0) * 4;
    const carbsKcal = (goal.carbohydratesGTotal || 0) * 4;
    const fatKcal = (goal.fatGTotal || 0) * 9;
    const key = `${proteinKcal}|${carbsKcal}|${fatKcal}`;
    if (this.goalSplitCache?.key === key) return this.goalSplitCache.value;

    const sum = proteinKcal + carbsKcal + fatKcal;
    const value =
      sum > 0
        ? {
            protein: (proteinKcal / sum) * 100,
            carbs: (carbsKcal / sum) * 100,
            fat: (fatKcal / sum) * 100,
          }
        : { protein: 0, carbs: 0, fat: 0 };
    this.goalSplitCache = { key, value };
    return value;
  }

  // La barra apilada es decorativa para un lector de pantalla si no dice lo
  // mismo que pinta: este texto es su contenido real.
  public goalSplitLabel(goal: ClientNutritionalGoal): string {
    const split = this.goalMacroSplit(goal);
    const pct = (n: number) => Math.round(n);
    return `Reparto de kcal: proteína ${pct(
      split.protein
    )}%, carbohidratos ${pct(split.carbs)}%, grasas ${pct(split.fat)}%`;
  }

  // La cuenta que enseña app-need-breakdown: los mismos inputs/desglose que
  // el resumen de semana, pero con los datos de HOY.
  public get nutritionalGoalNeed(): WeekNeed | null {
    const calculated = this.nutritionalGoal?.calculated;
    if (!calculated) return null;
    return {
      computedAt: new Date().toISOString(),
      inputs: calculated.inputs,
      breakdown: calculated.breakdown,
      target: calculated.target,
      stepsFromHabit: calculated.stepsFromHabit,
    };
  }

  /**
   * Todas las fases del cliente (terminadas, la vigente y las programadas),
   * de la más reciente a la más antigua por fecha de inicio — la vigente
   * queda donde le toque cronológicamente, no fija a la izquierda: si hay
   * una programada a futuro, esa va antes. Única lista para la fila
   * horizontal: nada se esconde en el historial colapsado de más abajo.
   */
  public get phaseTimeline(): PlanAssignment[] {
    return [...this.phaseGroups()].reverse();
  }

  // Una FASE por fila, no un doc por fila: las semanas preparadas de una fase
  // son docs DietTemplate con el mismo phaseId, y
  // pintarlos como fases aparte los duplicaba en la fila. Cada grupo se
  // resume en su head (nombre, inicio) con el fin del último doc (null =
  // sigue abierta). Ascendente por inicio.
  private phaseGroups(): PlanAssignment[] {
    return groupPhaseDocs(this.allPhasesHistory);
  }

  private phaseKeyOf(doc: PlanAssignment): string {
    return doc.phaseId || doc._id;
  }

  // ¿Esta fase (grupo) es la que contiene el doc vigente hoy?
  public isCurrentPhaseGroup(phase: PlanAssignment): boolean {
    return (
      !!this.activePlan &&
      this.phaseKeyOf(this.activePlan) === this.phaseKeyOf(phase)
    );
  }

  // La fase vigente resumida (head + fin real del grupo) — para nombre y
  // fechas de la card grande; `activePlan` sigue siendo el doc que rige hoy
  // (días atascados, semanas).
  public get activePhase(): PlanAssignment | null {
    if (!this.activePlan) return null;
    const key = this.phaseKeyOf(this.activePlan);
    return (
      this.phaseGroups().find((g) => this.phaseKeyOf(g) === key) ||
      this.activePlan
    );
  }

  // Orden cronológico real de esta fase entre TODAS las del cliente (1ª,
  // 2ª…) — independiente del orden en que se PINTA (phaseTimeline, invertido).
  public phaseOrder(phase: PlanAssignment): number {
    const key = this.phaseKeyOf(phase);
    return this.phaseGroups().findIndex((g) => this.phaseKeyOf(g) === key) + 1;
  }

  public isPhaseEnded(phase: PlanAssignment): boolean {
    return !!phase.endDate && phase.endDate < this.todayIsoDate();
  }

  // Etiqueta de las cards compactas (todo menos la vigente, que ya dice "en
  // curso" aparte): "programada" si su inicio todavía no ha llegado,
  // "finalizada" si ya se cerró.
  public phaseCompactLabel(phase: PlanAssignment): string {
    const estado =
      phase.startDate > this.todayIsoDate() ? 'programada' : 'finalizada';
    return `${this.phaseOrder(phase)}ª · ${estado}`;
  }

  public trackByPhaseId(_index: number, phase: PlanAssignment): string {
    return phase._id;
  }

  // Semanas — actual, siguiente (con sugerencia) y pasados de la
  // fase vigente. Solo si la fase se empezó desde el cajón (tiene phaseId);
  // una dieta aplicada "de siempre" no tiene semanas que enseñar.
  private loadPhaseWeeks(): void {
    const phaseId = this.activePlan?.phaseId;
    if (!phaseId) {
      this.phaseWeeks = null;
      this.syncTrackingRange();
      return;
    }
    this.dietSuggestionApi.getPhaseWeeks(this.clientId, phaseId).subscribe({
      next: (res) => {
        this.phaseWeeks = res;
        this.syncTrackingRange();
      },
      error: () => {
        this.phaseWeeks = null;
        this.syncTrackingRange();
      },
    });
  }

  // Rango de Seguimiento tras (re)cargar la fase. La PRIMERA vez fija
  // "Esta semana" (customTrackingRange sigue null); las siguientes no pisan
  // un rango que el trainer ya haya elegido — salvo "Fase actual", que
  // depende de la fase: se recalcula, o cae a "1 mes" si ya no hay fase.
  private syncTrackingRange(): void {
    if (this.trackingPreset === 'phase') {
      this.applyTrackingPreset(this.phaseWeeks ? 'phase' : 'weeks4');
      return;
    }
    if (this.customTrackingRange) return;
    this.applyTrackingPreset('week');
  }

  // Mismo color que este tramo pinta en <app-nutrition-calendar> — mismo
  // phaseColorMap, construido sobre allPhasesHistory (TODA la secuencia,
  // fases terminadas incluidas), exactamente como hace el calendario en
  // phase-color.util.ts.
  public phaseColor(phase: PlanAssignment | null): string {
    if (!phase) return 'var(--tf-accent)';
    return (
      this.phaseColorMap.get(phase.phaseId || phase._id) ?? 'var(--tf-accent)'
    );
  }

  // Hasta cuándo va una fase. Tres estados distintos, y conviene que se
  // distingan de un vistazo (2026-09):
  //   · endDate       → ya se cortó: fecha de fin REAL, en pasado.
  //   · estimatedEnd  → sigue corriendo; la fecha es una ESTIMACIÓN, no la
  //                     corta nadie hasta que se abra la siguiente fase.
  //   · ninguna       → corriendo sin estimación... salvo que YA haya una
  //                     fase programada después: entonces "indefinido" ha
  //                     dejado de ser cierto (esta se cortará en cuanto la
  //                     siguiente arranque), pero tampoco se sabe todavía
  //                     cuándo exactamente — mejor no decir nada de fecha de
  //                     fin que decir un dato que ya se sabe que está mal.
  public phaseEndLabel(phase: PlanAssignment | null): string {
    if (!phase) return '';
    if (phase.endDate) return `hasta ${phase.endDate}`;
    if (this.phaseHasScheduledSuccessor(phase)) return '';
    return 'indefinido';
  }

  // ¿Hay alguna fase que empiece más tarde que esta? (programada, o ya en
  // marcha si "esta" es una fase antigua superada). Ver phaseEndLabel.
  private phaseHasScheduledSuccessor(phase: PlanAssignment): boolean {
    const key = this.phaseKeyOf(phase);
    return this.phaseGroups().some(
      (g) => this.phaseKeyOf(g) !== key && g.startDate > phase.startDate
    );
  }

  // Fase cortada el mismo día en que empezó (p. ej. dos fases creadas
  // seguidas, la segunda con fecha de hoy: chainIfNeeded le pone a la
  // primera endDate = su propio startDate, ver plan-assignment-service.js).
  // "Desde 13 jun hasta 13 jun" no dice más que "13 jun" — un solo día.
  public isSingleDayPhase(phase: PlanAssignment | null): boolean {
    return !!phase?.endDate && phase.endDate === phase.startDate;
  }

  // --- Semanas de la fase vigente (docs/plan-semanas.md) ---
  //
  // No se crean: son las semanas naturales que cubre la fase. La ficha
  // enseña la que corre (solo lectura, abre su resumen) y la SIGUIENTE (con
  // sugerencia; se prepara en el builder), y las pasadas como chips que
  // abren su resumen. Todo sale de una llamada (getPhaseWeeks), que se
  // repite tras guardar.
  public phaseWeeks: PhaseWeeksResponse | null = null;

  // Pasadas de la más reciente a la más antigua, que es como se pintan: la
  // próxima y la que corre abren la fila y las anteriores van detrás.
  public get pastWeeks(): PhaseWeeksResponse['past'] {
    return [...(this.phaseWeeks?.past || [])].reverse();
  }

  public trackByWeekNumber(_index: number, entry: { number: number }): number {
    return entry.number;
  }

  // Las kcal que va a tener la siguiente: las de la semana ya preparada,
  // si la hay; si no, las sugeridas; si no hay sugerencia, las que hereda.
  public get nextWeekKcal(): number | null {
    const next = this.phaseWeeks?.next;
    if (!next) return null;
    if (next.override) return next.override.profile.kcal;
    if (next.suggestion?.hasData) return next.suggestion.nextKcal;
    return next.inherits?.profile.kcal ?? null;
  }

  public get nextWeekState(): 'edited' | 'suggested' | 'same' {
    const next = this.phaseWeeks?.next;
    if (next?.override) return 'edited';
    if (next?.suggestion?.hasData && next.suggestion.deltaKcal !== 0)
      return 'suggested';
    return 'same';
  }

  public weekDateRange(window: { start: string; end: string | null }): string {
    const fmt = (iso: string): string =>
      new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
    return window.end
      ? `${fmt(window.start)} – ${fmt(window.end)}`
      : `desde ${fmt(window.start)}`;
  }

  public shortDay(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }

  // Resumen de una semana (pasada o la que corre): solo lectura. La que
  // corre no se edita: lo que cambia de un día son excepciones.
  public async openWeekSummary(entry: {
    number: number;
    start: string;
    end: string | null;
    overrideId: string;
  }): Promise<void> {
    const assignment = this.allPhasesHistory.find(
      (p) => p._id === entry.overrideId
    );
    if (!assignment) return;
    const modal = await this.modalController.create({
      component: WeekSummaryPanelComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        assignment,
        weekNumber: entry.number,
        window: { start: entry.start, end: entry.end },
        clientName: this.name,
      },
    });
    await modal.present();
  }

  // --- Check-ins del cliente, desde la tarjeta de la fase ---

  // null mientras no se sepa: el chip no aparece hasta entonces (enseñar
  // "0 check-ins" antes de tiempo sería mentir).
  public checkinSchedulesCount: number | null = null;
  public checkinTemplateToOpen: string | null = null;
  private schedulesPanel: HTMLIonModalElement | null = null;
  private scheduleHistoryPanel: HTMLIonModalElement | null = null;

  private loadCheckinSchedulesCount(): void {
    this.clientDetailApi.getCheckinSchedules(this.clientId).subscribe({
      next: (schedules) => (this.checkinSchedulesCount = schedules.length),
      error: () => (this.checkinSchedulesCount = null),
    });
  }

  // Panel derecho con las programaciones. Tocar una abre su histórico en un
  // segundo panel a su izquierda (tf-panel-modal-detail-1): la pila la
  // maneja esta página, no los paneles — mismo reparto que
  // recipe-builder-modal.
  public async openCheckinSchedulesPanel(): Promise<void> {
    const modal = await this.modalController.create({
      component: CheckinSchedulesPanelComponent,
      cssClass: 'tf-panel-modal ion-disable-focus-trap',
      componentProps: {
        clientId: this.clientId,
        clientName: this.name,
        onSelect: (schedule: CheckinSchedule) =>
          void this.openScheduleHistoryPanel(schedule),
        onGoToCheckins: () =>
          void this.closeCheckinPanels().then(() => this.goToCheckins()),
      },
    });
    this.schedulesPanel = modal;
    await modal.present();
    void modal.onDidDismiss().then(() => {
      if (this.schedulesPanel === modal) this.schedulesPanel = null;
      void this.scheduleHistoryPanel?.dismiss();
    });
  }

  private async openScheduleHistoryPanel(
    schedule: CheckinSchedule
  ): Promise<void> {
    // El anterior se cierra DESPUÉS de crear el nuevo: al revés, tocar otra
    // programación obliga a tocar dos veces.
    const previous = this.scheduleHistoryPanel;
    const modal = await this.modalController.create({
      component: CheckinScheduleHistoryPanelComponent,
      cssClass: 'tf-panel-modal-detail-1 ion-disable-focus-trap',
      showBackdrop: false,
      backdropDismiss: false,
      componentProps: {
        clientId: this.clientId,
        schedule,
        onGoToCheckins: () =>
          void this.closeCheckinPanels().then(() => this.goToCheckins()),
      },
    });
    this.scheduleHistoryPanel = modal;
    if (previous) await previous.dismiss();
    await modal.present();
    void modal.onDidDismiss().then(() => {
      if (this.scheduleHistoryPanel === modal) this.scheduleHistoryPanel = null;
    });
  }

  private async closeCheckinPanels(): Promise<void> {
    await this.scheduleHistoryPanel?.dismiss();
    await this.schedulesPanel?.dismiss();
  }

  public openCurrentWeekSummary(): void {
    const current = this.phaseWeeks?.current;
    if (!current) return;
    void this.openWeekSummary({
      number: current.number,
      start: current.start,
      end: current.end,
      overrideId: current.override.id,
    });
  }

  // La siguiente semana: sugerencia + kcal → se prepara en el builder (o
  // se descarta si ya estaba preparada). Sin fecha que elegir: la pone el
  // check-in que la abre.
  public async openNextWeekModal(): Promise<void> {
    const phaseId = this.activePlan?.phaseId;
    if (!phaseId || !this.phaseWeeks?.next) return;

    const modal = await this.modalController.create({
      component: NextWeekModalComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        phaseId,
        clientName: this.name,
        weeks: this.phaseWeeks,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (role === 'prepare' && data?.kcal) {
      // Los macros ajustados en el modal viajan como query params (igual que
      // kcal) para que un F5 en el builder no los pierda. Sin ajustar, no
      // van: el builder escala proporcional y no enseña objetivo.
      const m = data.macros;
      void this.router.navigate(
        ['/tabs/diet-templates/next-week', this.clientId, phaseId],
        {
          queryParams: {
            kcal: data.kcal,
            name: this.name,
            ...(m ? { p: m.protein, c: m.carbs, f: m.fat } : {}),
          },
        }
      );
      return;
    }
    if (role === 'discarded') {
      void this.loadActivePlan();
      this.loadNutrition();
    }
  }

  // Fondo suave de phaseColor() — la vigente ya no lleva el naranja fijo de
  // acento (mismo criterio "esto es tuyo, no del sistema" que llevó a
  // sacar el naranja de las próximas: la fase activa tampoco es un estado
  // de navegación/UI, es un dato del cliente como cualquier otra fase).
  // Reutiliza hexToRgba.
  public phaseSoftBackground(phase: PlanAssignment | null): string {
    if (!phase) return 'var(--tf-accent-soft)';
    const color = this.phaseColorMap.get(phase.phaseId || phase._id);
    if (!color) return 'var(--tf-accent-soft)';
    return this.hexToRgba(color, 0.14);
  }

  // Borrado coherente de fases (nutrición) — mismo criterio que
  // confirmCancelRoutinePhase para entrenamiento: quitar CUALQUIER fase
  // (vigente, programada o ya sustituida). Si era la fase en curso, el
  // backend reactiva sola la que queda más reciente — nunca deja al cliente
  // sin ninguna.
  //
  // 2026-09 — la confirmación pasó de `ion-alert` (un diálogo aparte,
  // tapando el resto de la ficha) a dos botones pequeños INLINE en el
  // propio sitio del "Quitar fase": pedir confirmación para una acción
  // sobre UNA fila de una lista no necesita interrumpir toda la pantalla,
  // y evita el salto de foco de abrir/cerrar un modal para una fase que a
  // menudo se quita por error nada más aplicarla.
  public cancellingPlanPhaseId: string | null = null;
  // Fase para la que están abiertos los botones "Cancelar/Quitar" — como
  // mucho una a la vez (pedir para otra cierra la anterior sin tocarla).
  public confirmingCancelPlanPhaseId: string | null = null;

  public requestCancelPlanPhase(phase: PlanAssignment, event: Event): void {
    event.stopPropagation();
    this.confirmingCancelPlanPhaseId = phase._id;
  }

  public dismissCancelPlanPhase(event: Event): void {
    event.stopPropagation();
    this.confirmingCancelPlanPhaseId = null;
  }

  public confirmCancelPlanPhase(phase: PlanAssignment, event: Event): void {
    event.stopPropagation();
    this.confirmingCancelPlanPhaseId = null;
    this.cancellingPlanPhaseId = phase._id;
    this.planAssignmentApi.cancel(this.clientId, phase._id).subscribe({
      next: () => {
        this.cancellingPlanPhaseId = null;
        this.ionicUtilService.showToast({
          message: 'Fase quitada',
          duration: 1500,
        });
        // loadNutrition (no solo loadActivePlan): la adherencia se mide
        // contra lo pautado, y quitar la fase lo cambia.
        this.loadNutrition();
        // El historial de abajo es de carga perezosa (toggleNutritionHistory)
        // — solo se refresca si ya estaba abierto, para no disparar una
        // petición que nadie va a ver.
        if (this.nutritionHistoryLoaded) this.loadNutritionHistory();
      },
      error: (err) => {
        this.cancellingPlanPhaseId = null;
        this.ionicUtilService.showToast({
          message: err?.error?.message || 'No se pudo quitar la fase',
          duration: 2500,
        });
      },
    });
  }

  // TASK-045 (MASTER_BACKLOG.md) — combina el historial de fases
  // (GET .../nutrition-plans/history, endpoint ya existía sin consumidor,
  // mismo patrón que TASK-020) con los días saltados. No sustituye un log
  // de contenido exacto día a día
  // (eso exigiría versionar cada DietDay, fuera de alcance) — ver
  // DECISIONS.md.
  public toggleNutritionHistory(): void {
    this.showNutritionHistory = !this.showNutritionHistory;
    if (this.showNutritionHistory && !this.nutritionHistoryLoaded) {
      this.loadNutritionHistory();
    }
  }

  public loadNutritionHistory(): void {
    this.nutritionHistoryState = 'loading';
    forkJoin({
      history: this.planAssignmentApi.getNutritionHistory(this.clientId),
    }).subscribe({
      next: ({ history }) => {
        // Ya viene ordenado del más reciente al más antiguo.
        this.nutritionHistory = history?.events || [];
        this.nutritionHistoryLoaded = true;
        this.nutritionHistoryState = 'loaded';
      },
      error: () => {
        this.nutritionHistoryState = 'error';
      },
    });
  }

  // Siempre sobre nutritionDate, el día seleccionado en el calendario (no
  // "hoy", como decían el nombre y la etiqueta antiguos).
  public async skipSelectedDay(): Promise<void> {
    if (!this.activePlan || this.isSkippingDay) return;
    await this.ionicUtilService.showAlert({
      header: `¿Marcar ${this.nutritionDateLabel} como día saltado?`,
      message:
        'Ese día queda vacío: se le quitan las comidas del plan y deja de contar para la adherencia. Lo que el cliente haya anotado por su cuenta se queda, y el resto de la planificación no se toca.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Marcar día saltado',
          role: 'destructive',
          handler: () => {
            this.isSkippingDay = true;
            this.planAssignmentApi
              .markDaySkipped(this.clientId, this.nutritionDate)
              .subscribe({
                next: () => {
                  this.isSkippingDay = false;
                  this.ionicUtilService.showToast({
                    message: 'Día marcado como saltado',
                    duration: 2000,
                  });
                  this.loadNutrition();
                },
                error: () => {
                  this.isSkippingDay = false;
                  this.ionicUtilService.showErrorToast(
                    'No se pudo marcar el día como saltado',
                    'Error',
                    3000
                  );
                },
              });
          },
        },
      ],
    });
  }

  public get nutritionDateLabel(): string {
    const date = new Date(`${this.nutritionDate}T00:00:00.000Z`);
    const label = date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return this.isNutritionDateToday ? `Hoy · ${label}` : label;
  }

  public get isNutritionDateToday(): boolean {
    return this.nutritionDate === new Date().toISOString().slice(0, 10);
  }

  // --- Preferencias nutricionales (F29) ---
  public get nutritionPreferencesAnswered(): boolean {
    return !!this.nutritionPreferences?.respondedAt;
  }

  // Pendiente si se solicitó después de la última respuesta: el intake y la
  // edición del profesional ya dejan respondedAt puesto. Mismo criterio que
  // el back (nutritionPreferences/request-status.js).
  public get nutritionPreferencesPending(): boolean {
    const prefs = this.nutritionPreferences;
    if (!prefs?.requestedAt) return false;
    return (
      !prefs.respondedAt ||
      new Date(prefs.requestedAt) > new Date(prefs.respondedAt)
    );
  }

  public requestNutritionPreferences(): void {
    if (this.isRequestingPreferences) return;
    this.isRequestingPreferences = true;
    this.clientDetailApi.requestNutritionPreferences(this.clientId).subscribe({
      next: (preferences) => {
        this.isRequestingPreferences = false;
        this.nutritionPreferences = preferences;
        this.ionicUtilService.showToast({
          message: `Cuestionario solicitado a ${this.name}`,
          duration: 2500,
        });
      },
      error: (err) => {
        this.isRequestingPreferences = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo solicitar el cuestionario',
          'Error',
          3000
        );
      },
    });
  }

  // El editor vive en app-nutrition-preferences-panel (panel lateral colgado
  // del body); aquí solo se recoge el resultado para refrescar la tarjeta.
  public onNutritionPreferencesSaved(
    preferences: ClientNutritionPreferences
  ): void {
    this.nutritionPreferences = preferences;
  }

  public cooksAtHomeLabel(value: 'yes' | 'no' | 'sometimes' | null): string {
    if (value === 'yes') return 'Sí';
    if (value === 'no') return 'No';
    if (value === 'sometimes') return 'A veces';
    return 'Sin especificar';
  }

  // Icono + color por restricción, compartido con diet-card y el cajón de
  // sugerencias.
  public readonly dietaryFlagUi = dietaryFlagUi;

  // Replanteamiento MVP (nutrición) — aplicar una plantilla de dieta ya
  // construida a este cliente, eligiendo solo la fecha de inicio.
  // Suma días a una fecha ISO en UTC: hacerlo con el huso local desplaza
  // el día cerca de medianoche y encadenaría la fase con un día de más o
  // de menos.
  private addDaysToIso(iso: string, days: number): string {
    const fecha = new Date(iso + 'T00:00:00Z');
    fecha.setUTCDate(fecha.getUTCDate() + days);
    return fecha.toISOString().slice(0, 10);
  }

  // Sugerencias de dieta — "empezar fase" lleva a la biblioteca de dietas
  // (/tabs/diet-templates/for-phase/:clientId), que las lista ordenadas por
  // lo cerca que quedan del objetivo de este cliente y abre ahí el panel de
  // parámetros. Antes la lista rankeada se pintaba en esta misma pantalla,
  // en un "modo" que escondía media ficha: elegir una dieta es entrar en la
  // biblioteca, no una vista más de la ficha. El nombre y la fecha
  // propuesta viajan por query param (y no por router state) para que la
  // pantalla sobreviva a un F5. El modal antiguo
  // (ApplyDietTemplateModalComponent) sigue disponible desde
  // "Aplicar plantilla concreta".
  public startDietPhase(): void {
    void this.router.navigate(
      ['/tabs/diet-templates/for-phase', this.clientId],
      {
        queryParams: { name: this.name },
      }
    );
  }

  // Aplicar UNA plantilla concreta sin pasar por el ranking. Empieza hoy,
  // igual que el resto de formas de aplicar una fase.
  public async openApplyExactTemplateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ApplyDietTemplateModalComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        clientName: this.name,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    this.ionicUtilService.showToast({
      message: `Plan aplicado a ${this.name} desde hoy`,
      duration: 3000,
    });
    void this.loadActivePlan();
    this.loadNutrition();
  }

  public goToDietTemplates(): void {
    this.router.navigate(['/tabs/diet-templates']);
  }

  // Sin check-ins programados la fase no tiene semanas: el camino para
  // arrancar el seguimiento es la pestaña de medidas y check-ins de este
  // mismo cliente.
  public goToCheckins(): void {
    this.selectTab('measurements');
  }

  // "Crear dieta" — directo al builder (for-client/:clientId): nombre en
  // blanco (editable ahí mismo) y fase que empieza HOY. Las fechas se
  // corrigen después desde la propia ficha (openPhaseDatesEditor).
  public goToCreateDiet(): void {
    void this.router.navigate(
      ['/tabs/diet-templates/for-client', this.clientId],
      {
        state: {
          clientName: this.name,
          startDate: this.todayIsoDate(),
        },
      }
    );
  }

  // Corregir cuándo empieza y acaba la fase vigente. Una fase se crea para
  // el día en que se crea; esto es lo que permite moverla después sin
  // borrarla y volver a aplicarla.
  public openPhaseDatesEditor(): void {
    const phase = this.activePhase;
    if (!phase?.phaseId) return;

    this.phaseDatesPhaseId = phase.phaseId as string;
    this.phaseDatesTitle = phase.phaseName || phase.planName || 'Fase';
    this.phaseDatesStart = phase.startDate || '';
    this.phaseDatesEnd = phase.endDate || '';
    this.showPhaseDatesPanel = true;
  }

  public closePhaseDatesPanel(): void {
    if (this.isSavingPhaseDates) return;
    this.showPhaseDatesPanel = false;
  }

  public get canSavePhaseDates(): boolean {
    if (!this.phaseDatesStart || this.isSavingPhaseDates) return false;
    return !this.phaseDatesEnd || this.phaseDatesEnd >= this.phaseDatesStart;
  }

  public savePhaseDates(): void {
    if (!this.canSavePhaseDates) return;

    this.isSavingPhaseDates = true;
    this.dietSuggestionApi
      .updatePhaseDates(this.clientId, this.phaseDatesPhaseId, {
        startDate: this.phaseDatesStart,
        endDate: this.phaseDatesEnd || null,
      })
      .subscribe({
        next: () => {
          this.isSavingPhaseDates = false;
          this.showPhaseDatesPanel = false;
          this.ionicUtilService.showToast({
            message: 'Fechas de la fase actualizadas',
            duration: 2200,
          });
          void this.loadActivePlan();
          this.loadNutrition();
        },
        // 409 = las fechas nuevas pisan otra fase. El mensaje del backend ya
        // dice cuál y desde cuándo. El panel sigue abierto para corregirlas.
        error: (err) => {
          this.isSavingPhaseDates = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudieron cambiar las fechas',
            'Error',
            4000
          );
        },
      });
  }

  // F20-quinquies — la tarjeta de plan activo pasa a ser clicable: abre el
  // editor de LA plantilla aplicada (mismo builder que "Gestionar
  // plantillas", pero directo a esta en vez de a la lista completa).
  public openActivePlanTemplate(): void {
    if (this.activePlan) this.openPhaseTemplate(this.activePlan);
  }

  // Lo mismo para CUALQUIER fase de la fila, no solo la que rige: las
  // programadas son justo las que más se retocan (se preparan con
  // antelación) y hasta ahora eran las únicas tarjetas muertas al click —
  // había que ir a "Plantillas de dieta" y buscarla por nombre.
  //
  // Antes navegaba a `sourceTemplateId` (la plantilla de BIBLIOTECA de
  // origen) — arriesgado si era general (compartida: tocarla afectaba a
  // otros clientes) y directamente imposible en las semanas 2+ creadas con
  // "Siguiente semana" (no guardan sourceTemplateId). Ahora edita siempre la
  // copia de ESTE cliente por su propio `_id` (ver
  // diet-template-builder.page.ts#startForAssignedCopy) — nunca toca una
  // plantilla de biblioteca, funciona para cualquier semana.
  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  public openPhaseTemplate(phase: PlanAssignment): void {
    this.router.navigate(
      ['/tabs/diet-templates/edit-assignment', this.clientId, phase._id],
      {
        queryParams: { name: this.name },
      }
    );
  }

  public trackByTableId(_index: number, table: ClientTable): string {
    return table._id;
  }

  // --- Invitar al scope que le falta ---
  public get missingScope(): ClientScope | null {
    if (this.scopes.length !== 1) return null;
    return this.scopes[0] === 'training' ? 'nutrition' : 'training';
  }

  public get missingScopeLabel(): string {
    return this.missingScope === 'training' ? 'entrenamiento' : 'nutrición';
  }

  private loadMissingScopeInvite(): void {
    this.clientEmail = null;
    this.missingScopeInvitePending = false;
    const scope = this.missingScope;
    if (!scope) return;
    const clientId = this.clientId;
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: (invites) => {
        if (clientId !== this.clientId) return;
        const email = invites.find(
          (i) => i.clientId === clientId && i.status === 'active'
        )?.clientEmail;
        if (!email) return;
        this.clientEmail = email;
        this.missingScopeInvitePending = invites.some(
          (i) =>
            i.clientEmail === email &&
            i.scope === scope &&
            ['pending', 'cuestionario_pendiente', 'en_revision'].includes(
              i.status
            )
        );
      },
      // Sin email no hay a quién invitar: el botón simplemente no aparece.
      error: () => {},
    });
  }

  public async confirmInviteMissingScope(): Promise<void> {
    const scope = this.missingScope;
    const email = this.clientEmail;
    if (!scope || !email || this.missingScopeInvitePending) return;
    const label = this.missingScopeLabel;
    await this.ionicUtilService.showAlert({
      header: `Invitar a ${label}`,
      message: `${this.name} recibirá una invitación para que también lleves su ${label}. Cuando la acepte, aparecerá aquí.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Invitar',
          handler: () => this.inviteMissingScope(scope, email),
        },
      ],
    });
  }

  private inviteMissingScope(scope: ClientScope, email: string): void {
    const label = this.missingScopeLabel;
    this.isSendingScopeInvite = true;
    this.trainerInvitesApi.sendInvite(email, [scope]).subscribe({
      next: (response) => {
        this.isSendingScopeInvite = false;
        const result = response.results.find((r) => r.scope === scope);
        if (!result?.success) {
          this.ionicUtilService.showErrorToast(
            result?.error || 'No se pudo enviar la invitación',
            'Error',
            3000
          );
          return;
        }
        this.missingScopeInvitePending = true;
        this.ionicUtilService.showToast({
          message: `Invitación de ${label} enviada`,
          duration: 3000,
        });
      },
      // Con todos los scopes fallidos el backend responde 400 con el mismo
      // cuerpo `results` (p. ej. el cliente ya lleva ese scope con otro profesional).
      error: (err) => {
        this.isSendingScopeInvite = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.results?.[0]?.error ||
            err?.error?.message ||
            'No se pudo enviar la invitación',
          'Error',
          3000
        );
      },
    });
  }

  // --- F08: finalizar relación (lado profesional) ---
  public async confirmRevoke(scope: ClientScope): Promise<void> {
    const scopeLabel = scope === 'training' ? 'entrenamiento' : 'nutrición';
    await this.ionicUtilService.showAlert({
      header: 'Finalizar relación',
      message: `¿Seguro que quieres dejar de llevar el ${scopeLabel} de ${this.name}? Esta acción es inmediata y no se puede deshacer.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Finalizar',
          cssClass: 'alert-button-danger',
          handler: () => this.revoke(scope),
        },
      ],
    });
  }

  private revoke(scope: ClientScope): void {
    this.isRevoking = true;
    this.clientDetailApi.revokeRelation(this.clientId, scope).subscribe({
      next: () => {
        this.isRevoking = false;
        this.scopes = this.scopes.filter((s) => s !== scope);
        if (!this.scopes.length) {
          this.ionicUtilService.showToast({
            message: `Ya no llevas a ${this.name}`,
            duration: 3000,
          });
          void this.router.navigate(['/tabs/clients']);
          return;
        }
        // selectTab, no asignación directa: al revocar un scope la pestaña
        // abierta puede haber dejado de existir, y la sección tiene que
        // moverse con ella.
        this.selectTab(this.scopes[0]);
        this.loadMissingScopeInvite();
        this.ionicUtilService.showToast({
          message: `Relación de ${
            scope === 'training' ? 'entrenamiento' : 'nutrición'
          } finalizada`,
          duration: 3000,
        });
      },
      error: () => {
        this.isRevoking = false;
        this.ionicUtilService.showErrorToast(
          'No se pudo finalizar la relación',
          'Error',
          3000
        );
      },
    });
  }

  // --- Notas (F19) ---
  public loadNotes(): void {
    this.notesState = 'loading';
    this.clientDetailApi.getNotes(this.clientId).subscribe({
      next: (notes) => {
        this.notes = notes || [];
        this.notesState = 'loaded';
      },
      error: () => {
        this.notesState = 'error';
      },
    });
  }

  public submitNote(): void {
    const text = this.newNoteText.trim();
    if (!text || this.isSavingNote) return;

    this.isSavingNote = true;
    this.clientDetailApi.createNote(this.clientId, text).subscribe({
      next: (note) => {
        this.isSavingNote = false;
        this.newNoteText = '';
        this.notes = [note, ...this.notes];
      },
      error: (err) => {
        this.isSavingNote = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo guardar la nota',
          'Error',
          3000
        );
      },
    });
  }

  private resortNotes(): void {
    this.notes = [...this.notes].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  public togglePin(note: TrainerNote): void {
    const nextPinned = !note.pinned;
    this.clientDetailApi
      .updateNote(this.clientId, note._id, { pinned: nextPinned })
      .subscribe({
        next: (updated) => {
          this.notes = this.notes.map((n) => {
            if (n._id === updated._id) return updated;
            // Fijado exclusivo (trainer-note-dao.js#update): el backend ya
            // desfijó cualquier otra nota al fijar esta. Sin esto, la que
            // quedó pinned=true solo en el objeto local seguía pintándose
            // como fijada (dos notas "fijadas" a la vez en pantalla) hasta
            // el próximo loadNotes().
            return nextPinned && n.pinned ? { ...n, pinned: false } : n;
          });
          this.resortNotes();
          if (nextPinned) {
            this.ionicUtilService.showToast({
              message: 'Nota fijada — visible en la cabecera del cliente',
              duration: 2500,
            });
          }
        },
        error: () => {
          this.ionicUtilService.showErrorToast(
            'No se pudo actualizar la nota',
            'Error',
            2500
          );
        },
      });
  }

  // --- Editar texto (en el sitio, mismo textarea del composer) ---
  public editingNoteId: string | null = null;
  public editingNoteText = '';
  public isSavingNoteEdit = false;

  public startEditNote(note: TrainerNote): void {
    this.editingNoteId = note._id;
    this.editingNoteText = note.text;
  }

  public cancelEditNote(): void {
    this.editingNoteId = null;
    this.editingNoteText = '';
  }

  public saveEditNote(note: TrainerNote): void {
    const text = this.editingNoteText.trim();
    if (!text || this.isSavingNoteEdit) return;
    if (text === note.text) {
      this.cancelEditNote();
      return;
    }
    this.isSavingNoteEdit = true;
    this.clientDetailApi
      .updateNote(this.clientId, note._id, { text })
      .subscribe({
        next: (updated) => {
          this.isSavingNoteEdit = false;
          this.notes = this.notes.map((n) =>
            n._id === updated._id ? updated : n
          );
          this.cancelEditNote();
        },
        error: () => {
          this.isSavingNoteEdit = false;
          this.ionicUtilService.showErrorToast(
            'No se pudo guardar el cambio',
            'Error',
            2500
          );
        },
      });
  }

  // --- Borrar (confirmación en el sitio, mismo patrón que "Quitar fase" en
  // Entrenamiento — ver phase-remove-link/phase-remove-confirm) ---
  public confirmingDeleteNoteId: string | null = null;
  public isDeletingNoteId: string | null = null;

  public requestDeleteNote(noteId: string): void {
    this.confirmingDeleteNoteId = noteId;
  }

  public dismissDeleteNote(): void {
    this.confirmingDeleteNoteId = null;
  }

  public confirmDeleteNote(note: TrainerNote): void {
    this.isDeletingNoteId = note._id;
    this.clientDetailApi.deleteNote(this.clientId, note._id).subscribe({
      next: () => {
        this.isDeletingNoteId = null;
        this.confirmingDeleteNoteId = null;
        this.notes = this.notes.filter((n) => n._id !== note._id);
      },
      error: () => {
        this.isDeletingNoteId = null;
        this.ionicUtilService.showErrorToast(
          'No se pudo borrar la nota',
          'Error',
          2500
        );
      },
    });
  }

  public trackByNoteId(_index: number, note: TrainerNote): string {
    return note._id;
  }

  // --- Check-ins (F17) ---
  public loadCheckins(): void {
    this.checkinsState = 'loading';
    this.clientDetailApi
      .getCheckinResponses(this.clientId)
      .toPromise()
      .then((responses) => {
        this.checkinResponses = responses || [];
        this.checkinQuestions = this.questionsFrom(this.checkinResponses);
        this.checkinsState = 'loaded';
      })
      .catch(() => {
        this.checkinsState = 'error';
      });
  }

  // Todas las preguntas propias que traen las respuestas, sin repetir: es
  // con lo que se nombran las claves "custom:<id>".
  private questionsFrom(
    responses: CheckinResponseEntry[]
  ): CustomCheckinQuestion[] {
    const byId = new Map<string, CustomCheckinQuestion>();
    for (const response of responses) {
      for (const question of response.customQuestions || [])
        byId.set(String(question._id), question);
    }
    return [...byId.values()];
  }

  // La lógica vive en checkin-labels.util.ts — la comparte con el panel de
  // resumen de la semana, que enseña estas mismas respuestas.
  public checkinFieldLabel(key: string): string {
    return checkinFieldLabel(key, this.checkinQuestions);
  }

  public checkinValueLabel(value: number | string | boolean): string {
    return checkinValueLabel(value);
  }

  // `raw` además de `value`: el segundo ya viene formateado a texto (un
  // booleano se lee "Sí"/"No"), y buscar el ancla de una escala necesita el
  // número tal cual lo guardó el cliente.
  public checkinValueEntries(
    response: CheckinResponseEntry
  ): { key: string; value: string; raw: number | string | boolean }[] {
    return Object.entries(response.values).map(([key, value]) => ({
      key,
      value: this.checkinValueLabel(value),
      raw: value,
    }));
  }

  // Las entradas se formatean en cada detección de cambios. Su clave estable
  // evita sustituir el DOM y volver a despertar los observadores de la gráfica.
  public trackByCheckinValueKey(
    _index: number,
    entry: { key: string }
  ): string {
    return entry.key;
  }

  // Movimiento 2 Coach Pro — "Nivel de estrés: 4" no dice nada; "4/5 ·
  // Bastante estrés, me cuesta desconectar" es lo que respondió el cliente.
  public checkinScaleSuffix(key: string): string {
    return checkinScaleSuffix(key);
  }

  public checkinAnchor(key: string, value: unknown): string | null {
    return checkinAnchorFor(key, value);
  }

  public trackByResponseId(
    _index: number,
    response: CheckinResponseEntry
  ): string {
    return response._id;
  }

  // --- Cobros (F26) ---
  public loadPayments(): void {
    this.paymentsState = 'loading';
    this.clientDetailApi.getPayments(this.clientId).subscribe({
      next: (payments) => {
        this.payments = payments || [];
        this.paymentsState = 'loaded';
      },
      error: () => {
        this.paymentsState = 'error';
      },
    });
  }

  public openPaymentPanel(): void {
    this.showPaymentPanel = true;
    this.paymentAmount = null;
    this.paymentDueDate = '';
    this.paymentNote = '';
  }

  public closePaymentPanel(): void {
    this.showPaymentPanel = false;
  }

  public submitPayment(): void {
    if (
      !this.paymentAmount ||
      this.paymentAmount <= 0 ||
      !this.paymentDueDate ||
      this.isSavingPayment
    ) {
      return;
    }

    this.isSavingPayment = true;
    this.clientDetailApi
      .createPayment(this.clientId, {
        amount: this.paymentAmount,
        dueDate: this.paymentDueDate,
        note: this.paymentNote.trim() || undefined,
      })
      .subscribe({
        next: (payment) => {
          this.isSavingPayment = false;
          this.showPaymentPanel = false;
          this.payments = [payment, ...this.payments];
          void this.schedulePaymentReminder(payment);
        },
        error: (err) => {
          this.isSavingPayment = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo crear el cobro',
            'Error',
            3000
          );
        },
      });
  }

  // F26 — recordatorio local en el dispositivo del profesional. Best-effort:
  // solo en plataforma nativa (Capacitor.isNativePlatform, mismo criterio que
  // NotificationService), un fallo aquí nunca bloquea la creación del cobro
  // (ya se guardó en el backend).
  private async schedulePaymentReminder(
    payment: TrainerPayment
  ): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    try {
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display !== 'granted') return;

      const idSeed = payment._id.slice(-8);
      const numericId = parseInt(idSeed, 16) % 2147483647;

      await LocalNotifications.schedule({
        notifications: [
          {
            id: numericId,
            title: 'TrainFit',
            body: `Recuerda cobrar a ${this.name}: ${payment.amount}${
              payment.currency === 'EUR' ? '€' : payment.currency
            }`,
            schedule: { at: new Date(payment.dueDate), allowWhileIdle: true },
          },
        ],
      });
    } catch (e) {
      console.warn('[F26] No se pudo programar el recordatorio local', e);
    }
  }

  public togglePaymentPaid(payment: TrainerPayment): void {
    this.clientDetailApi
      .setPaymentPaid(this.clientId, payment._id, !payment.paidAt)
      .subscribe({
        next: (updated) => {
          this.payments = this.payments.map((p) =>
            p._id === updated._id ? updated : p
          );
        },
        error: () => {
          this.ionicUtilService.showErrorToast(
            'No se pudo actualizar el cobro',
            'Error',
            2500
          );
        },
      });
  }

  public trackByPaymentId(_index: number, payment: TrainerPayment): string {
    return payment._id;
  }

  // --- Tareas/hábitos (coach-tab FASE4) ---
  public loadTasks(): void {
    this.tasksState = 'loading';
    this.clientDetailApi.getTasks(this.clientId).subscribe({
      next: (tasks) => {
        this.tasks = tasks || [];
        this.tasksState = 'loaded';
      },
      error: () => {
        this.tasksState = 'error';
      },
    });
  }

  public openTaskPanel(): void {
    this.showTaskPanel = true;
    this.taskType = 'steps';
    this.taskLabel = '';
    this.taskTarget = null;
    this.taskTargetMax = null;
    this.taskUnit = this.taskTypeOptions[0].defaultUnit;
  }

  public closeTaskPanel(): void {
    this.showTaskPanel = false;
  }

  // "10.000 a 15.000 pasos / día" cuando el hábito lleva rango.
  public taskTargetLabel(task: TrainerTask): string {
    const rango = task.targetMax ? ` a ${task.targetMax}` : '';
    return `${task.target}${rango} ${task.unit} / día`;
  }

  public onTaskTypeChange(type: TrainerTaskType): void {
    this.taskType = type;
    const preset = this.taskTypeOptions.find((o) => o.value === type);
    this.taskUnit = preset?.defaultUnit || '';
  }

  public submitTask(): void {
    if (
      !this.taskTarget ||
      this.taskTarget <= 0 ||
      !this.taskUnit.trim() ||
      this.isSavingTask
    )
      return;
    if (this.taskType === 'custom' && !this.taskLabel.trim()) return;

    this.isSavingTask = true;
    this.clientDetailApi
      .createTask(this.clientId, {
        type: this.taskType,
        label: this.taskType === 'custom' ? this.taskLabel.trim() : undefined,
        target: this.taskTarget,
        targetMax:
          this.taskTargetMax && this.taskTargetMax > this.taskTarget
            ? this.taskTargetMax
            : null,
        unit: this.taskUnit.trim(),
      })
      .subscribe({
        next: (task) => {
          this.isSavingTask = false;
          this.showTaskPanel = false;
          this.tasks = [...this.tasks, task];
        },
        error: (err) => {
          this.isSavingTask = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo crear el hábito',
            'Error',
            3000
          );
        },
      });
  }

  public async confirmDeactivateTask(task: TrainerTask): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Quitar hábito',
      message: `¿Seguro que quieres dejar de asignar "${this.taskDisplayLabel(
        task
      )}"? El historial de cumplimiento ya registrado se conserva.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Quitar',
          cssClass: 'alert-button-danger',
          handler: () => this.deactivateTask(task),
        },
      ],
    });
  }

  private deactivateTask(task: TrainerTask): void {
    this.clientDetailApi.deactivateTask(this.clientId, task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      },
      error: () => {
        this.ionicUtilService.showErrorToast(
          'No se pudo quitar el hábito',
          'Error',
          2500
        );
      },
    });
  }

  public taskDisplayLabel(task: TrainerTask): string {
    if (task.type === 'custom') return task.label || 'Hábito';
    return (
      this.taskTypeOptions.find((o) => o.value === task.type)?.label ||
      task.type
    );
  }

  public trackByTaskId(_index: number, task: TrainerTask): string {
    return task._id;
  }
}
