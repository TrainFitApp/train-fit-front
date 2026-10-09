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
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs/operators';
import { firstValueFrom, Subscription } from 'rxjs';
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
  EQUIPMENT_TAG_LABELS,
  EquipmentTag,
  TRAINING_LOCATION_LABELS,
  TrainingLocation,
} from '../../../invites/models/trainer-invite.model';

import { localizeProp } from 'src/app/core/i18n/localized-catalog';

Chart.register(...registerables);

const TRAINING_GOAL_TYPE_LABELS: Record<TrainingGoalType, string> = {
  strength: 'Fuerza',
  hypertrophy: 'Hipertrofia',
  endurance: 'Resistencia',
  mobility: 'Movilidad',
  general: 'General',
};
Object.keys(TRAINING_GOAL_TYPE_LABELS).forEach((type) =>
  localizeProp(TRAINING_GOAL_TYPE_LABELS, type as TrainingGoalType, `CLIENT_DETAIL.TRAINING_GOAL_TYPES.${type}`)
);
import {
  checkinScaleSuffix,
} from 'src/app/core/constants/checkin-fields';
import { HABIT_TYPE_ICONS } from 'src/app/core/constants/habit-icons';
import { formatSoreness } from 'src/app/core/constants/soreness';
import {
  AdherenceDimension,
  BlockAdherence,
  BlockExerciseProgress,
  BlockMuscleGroup,
  BlockReadiness,
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
import { NextWeekModalComponent } from '../../components/next-week-modal/next-week-modal.component';
import { CheckinSchedulesPanelComponent } from '../../components/checkin-schedules-panel/checkin-schedules-panel.component';
import { CheckinScheduleHistoryPanelComponent } from '../../components/checkin-schedule-history-panel/checkin-schedule-history-panel.component';
import { ApplyRoutineTemplateModalComponent } from '../../components/apply-routine-template-modal/apply-routine-template-modal.component';
import { DietPhaseApiService, onDaySkipped } from '../../../../shared/services/diet-phase-api.service';
import { buildPhaseColorMap } from './phase-color.util';
import { RoutineAssignmentApiService } from '../../../../shared/services/routine-assignment-api.service';
import {
  RoutineAssignment,
  RoutineScheduleDay,
} from '../../../../shared/models/routine-assignment.model';
import { compareChain } from '../../../../shared/models/phase-state';
import { ApplyRoutineModalComponent } from '../../components/apply-routine-modal/apply-routine-modal.component';

import { MacroSet, WeekNeed } from '../../../diet-templates/models/diet-suggestion.model';
import {
  KCAL_PER_G,
  MacroAdjustComponent,
} from '../../../../shared/components/macro-adjust/macro-adjust.component';
import {
  checkinFieldLabel,
  checkinValueLabel,
} from '../../checkin-labels.util';
import { WeekSummaryPanelComponent } from '../../components/week-summary-panel/week-summary-panel.component';
import {
  CurrentDietPhase,
  DietPhase,
  NutritionHistoryEvent,
  PhaseWeeksResponse,
} from '../../../../shared/models/diet-phase.model';
import { WeekOpenRequest } from './components/nutrition-history-feed/nutrition-history-feed.component';
import { dietaryFlagUi } from '../../../../shared/utils/dietary-flag-ui.util';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { TableService } from 'src/app/core/services/table/table.service';
import {
  AdherenceSummary,
  AnthropometryEntry,
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
  TrainerTask,
  TrainerTaskType,
} from './models/client-detail.model';
import { ClientNote } from './models/client-notes.model';
import { LedgerIntent } from '../../../payments/components/client-payments-ledger/client-payments-ledger.component';
import { PaymentsCardRequest } from '../../../payments/components/client-payments-card/client-payments-card.component';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { CustomAnswer, CustomQuestion, FREQUENCY_OPTIONS } from 'src/app/core/models/custom-question';

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
[...TRACKING_PRESETS_WITH_PHASE].forEach((preset) =>
  localizeProp(preset, 'label', `CLIENT_DETAIL.TRACKING_PRESETS.${preset.key}`)
);

@Component({
  selector: 'app-client-detail',
  templateUrl: 'client-detail.page.html',
  styleUrls: ['client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit, AfterViewInit {
  private readonly translate = inject(TranslateService);

  public clientId = '';
  public name = this.translate.instant('TRAINER_COMMON.CLIENT');
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
  // Preguntas propias que aparecen en las respuestas cargadas: cada
  // respuesta viaja con la copia de las suyas, así que no hace falta pedir
  // ninguna "configuración" del cliente aparte.
  public checkinQuestions: CustomQuestion[] = [];

  // --- Cobros (F26, transversal a los scopes) ---
  // Cobros 2026-09 — Gestión > Cobros vive en features/payments. La ficha
  // solo le dice cuándo releer (al volver a la página: Ionic no repite
  // ngOnInit), qué abrir al llegar (?charge= de un aviso, "Configurar cuota"
  // desde la tarjeta del Resumen) y si el cliente está en solo lectura.
  public paymentsRefreshToken = 0;
  public paymentsIntent: LedgerIntent = null;
  public paymentsFocusChargeId: string | null = null;

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
  public readonly taskTypeIcons: Record<TrainerTaskType, string> = HABIT_TYPE_ICONS;
  public readonly taskTypeOptions: {
    value: TrainerTaskType;
    label: string;
    defaultUnit: string;
  }[] = [
    { value: 'steps', label: this.translate.instant('CLIENT_DETAIL.PASOS'), defaultUnit: this.translate.instant('CLIENT_DETAIL.UNIT_STEPS') },
    { value: 'water', label: this.translate.instant('CLIENT_DETAIL.AGUA'), defaultUnit: 'L' },
    { value: 'sleep', label: this.translate.instant('CLIENT_DETAIL.SUENO'), defaultUnit: this.translate.instant('CLIENT_DETAIL.UNIT_HOURS') },
    { value: 'cardio', label: this.translate.instant('CLIENT_DETAIL.CARDIO'), defaultUnit: 'min' },
    { value: 'custom', label: this.translate.instant('CLIENT_DETAIL.PERSONALIZADA'), defaultUnit: '' },
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
  public nutritionDate: string = localIsoDate();
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

  // La fase de dieta que rige hoy (por fecha), con los días en los que el
  // cliente no eligió menú. null si hoy no rige ninguna.
  public currentDietPhase: CurrentDietPhase | null = null;
  // Todas las fases (terminadas, la vigente y las programadas), por fecha de
  // inicio: la fila horizontal de fases y la fuente de phaseColorMap, el mismo
  // color que pinta el calendario (phase-color.util.ts).
  private dietPhases: DietPhase[] = [];
  // Color por fase, recalculado al cargar las fases (no en cada phaseColor()).
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

  // Pestaña de la columna derecha de Nutrición: Seguimiento (gráficas de un
  // rango) o Día (resumen del día elegido en el calendario,
  // <app-nutrition-day-detail>).
  public nutritionColumnTab: 'tracking' | 'day' = 'tracking';

  public setNutritionColumnTab(tab: 'tracking' | 'day'): void {
    this.nutritionColumnTab = tab;
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
      new Date(iso + 'T00:00:00Z').toLocaleDateString(uiLocale(), {
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
    private dietPhaseApi: DietPhaseApiService,
    private routineAssignmentApi: RoutineAssignmentApiService,
    private trainerClientsApi: TrainerClientsApiService,
    private trainerInvitesApi: TrainerInvitesApiService,
    private navigation: TrainerNavigationService,
    private trainerBillingApi: TrainerBillingApiService
  ) {
    // Saltar un día solo cambia la adherencia y el historial: se releen sin
    // pasar por el esqueleto del tab (loadNutrition lo desmontaba entero y
    // con él el calendario y las gráficas, que se refrescan por su cuenta).
    onDaySkipped(
      () => this.clientId,
      () => {
        this.refreshAdherence();
        if (this.nutritionHistoryLoaded) this.loadNutritionHistory({ silent: true });
      }
    );
  }

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
            message: this.translate.instant('CLIENT_DETAIL.NO_SE_ENCONTRO_ESTE_CLIENTE'),
            duration: 3000,
          });
          return;
        }
        this.name = match.user
          ? `${match.user.name} ${match.user.lastname}`.trim()
          : this.translate.instant('TRAINER_COMMON.CLIENT');
        this.scopes = match.scopes;
        this.headerState = 'loaded';
        this.initTabsAndLoadSections();
      },
      error: () => {
        this.headerState = 'error';
        this.ionicUtilService.showToast({
          message: this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_CARGAR_LA_2'),
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
    this.checkinResponseToOpen = tabGuardada ? null : this.route.snapshot.queryParamMap.get('response');
    // Aviso de cobro → ?tab=payments&charge=<id>: abre ese cobro, solo en una
    // entrada nueva (al volver de una pantalla hija la URL aún lo lleva).
    this.paymentsFocusChargeId = tabGuardada ? null : this.route.snapshot.queryParamMap.get('charge');

    if (this.scopes.includes('training')) this.loadTraining();
    if (this.scopes.includes('nutrition')) this.loadNutrition();
    this.loadNotes();
    this.paymentsRefreshToken += 1;
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
    return type ? TRAINING_GOAL_TYPE_LABELS[type] || type : this.translate.instant('CLIENT_DETAIL.SIN_DECLARAR');
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
          this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_GUARDAR_EL'),
          this.translate.instant('COMMON.ERROR'),
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
      const date = localIsoDate(workout.date as Date);
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
    const today = localIsoDate();
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
        w.date && localIsoDate(w.date as Date) === date
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
        this.translate.instant('CLIENT_DETAIL.NO_SE_PUDIERON_ABRIR_LAS')
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
    return this.translate.instant('CLIENTS.REGISTRO', { name: workout.name, p1: this.relativeDayTime(
      new Date(workout.date as Date)
    ) });
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
    const time = date.toLocaleTimeString(uiLocale(), {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (isSameDay(date, now)) return `hoy, ${time}`;
    if (isSameDay(date, yesterday)) return `ayer, ${time}`;
    return `${date.toLocaleDateString(uiLocale(), {
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
      : this.translate.instant('CLIENT_DETAIL.NO_INDICADO');
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
    customAnswers: CustomAnswer[];
  } | null = null;

  public readonly experienceLevelOptions: {
    value: ClientIntake['experienceLevel'];
    label: string;
  }[] = [
    { value: null, label: this.translate.instant('CLIENT_DETAIL.SIN_DECLARAR') },
    { value: 'none', label: this.translate.instant('INTAKE.EXPERIENCE.none') },
    { value: 'beginner', label: this.translate.instant('INTAKE.EXPERIENCE.beginner') },
    { value: 'intermediate', label: this.translate.instant('INTAKE.EXPERIENCE.intermediate') },
    { value: 'advanced', label: this.translate.instant('INTAKE.EXPERIENCE.advanced') },
  ];

  public readonly trainingLocationOptions = (
    Object.keys(TRAINING_LOCATION_LABELS) as TrainingLocation[]
  ).map((value) => ({ value, label: TRAINING_LOCATION_LABELS[value] }));

  public readonly equipmentTagOptions = (
    Object.keys(EQUIPMENT_TAG_LABELS) as EquipmentTag[]
  ).map((value) => ({ value, label: EQUIPMENT_TAG_LABELS[value] }));

  public readonly frequencyOptions = FREQUENCY_OPTIONS;

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
            message: this.translate.instant('CLIENT_DETAIL.CUESTIONARIO_ACTUALIZADO'),
            duration: 2500,
          });
        },
        error: () => {
          this.isSavingIntake = false;
          this.ionicUtilService.showToast({
            message: this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_GUARDAR_EL_2'),
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
  // Mismo patrón que las fases de dieta de Nutrición, simplificado: sin
  // endDate, así que no hay rango que
  // filtrar — solo desde-cuándo. Sustituye al antiguo activateTable()
  // instantáneo: poner una rutina en marcha (hoy o en el futuro) pasa
  // siempre por el mismo formulario (openApplyRoutinePhaseModal).
  public routinePhases: RoutineAssignment[] = [];
  public routineHistory: RoutineAssignment[] = [];
  public routineHistoryState: SectionState = 'loading';
  public showRoutineHistory = false;

  // Un único fetch (historial completo) basta: cada fase llega con su estado
  // hoy (`state`, en la zona del cliente).
  public loadActiveRoutine(): void {
    this.routineHistoryState = 'loading';
    this.routineAssignmentApi.getHistory(this.clientId).subscribe({
      next: (history) => {
        this.routinePhases = this.buildRoutinePhaseSequence(history || []);
        this.routineHistory = (history || []).slice().sort(compareChain);
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

  // Mismo patrón que phaseColorMap (nutrición, loadDietPhases): un color por
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

  // Cronológico, en el orden de la cadena (con el mismo inicio, la creada
  // después va detrás).
  private buildRoutinePhaseSequence(
    history: RoutineAssignment[]
  ): RoutineAssignment[] {
    return history.slice().sort(compareChain);
  }

  // La que rige hoy en el calendario del cliente (la calcula el backend por
  // fecha: una fase programada no rige hasta que empieza).
  public get currentRoutinePhase(): RoutineAssignment | null {
    return this.routinePhases.find((phase) => phase.state === 'current') || null;
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
    if (!phase.estimatedEndDate) return this.translate.instant('COACH.WEEK_N', { n: currentWeek });
    const end = new Date(phase.estimatedEndDate + 'T00:00:00Z').getTime();
    const totalWeeks = Math.max(
      currentWeek,
      Math.ceil((end - start) / (7 * 86400000))
    );
    return this.translate.instant('CLIENT_DETAIL.WEEK_N_OF', { n: currentWeek, total: totalWeeks });
  }

  // Lo mismo para la línea de nutrición de la cabecera, leído de phaseWeeks
  // (semanas naturales de la fase de dieta vigente). "de N" solo si la fase
  // ya tiene fin real: una fase abierta no tiene duración, acaba cuando
  // empieza la siguiente.
  public get currentDietWeekLabel(): string | null {
    const current = this.phaseWeeks?.current;
    if (!current) return null;
    return this.phaseWeeks?.phaseEnd
      ? this.translate.instant('CLIENT_DETAIL.WEEK_N_OF', { n: current.number, total: this.phaseWeeks.weeks.length })
      : this.translate.instant('COACH.WEEK_N', { n: current.number });
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
          message: this.translate.instant('CLIENT_DETAIL.FASE_QUITADA'),
          duration: 1500,
        });
        this.loadActiveRoutine();
        this.loadTraining();
      },
      error: (err) => {
        this.cancellingRoutinePhaseId = null;
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_QUITAR_LA'),
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
      message: this.translate.instant('CLIENT_DETAIL.FECHA_ACTUALIZADA'),
      duration: 1500,
    });
    this.loadActiveRoutine();
    this.loadTraining();
  }

  // Getter de conveniencia para el badge inline en el listado de Rutinas:
  // la próxima fase PROGRAMADA (aún no en curso) de esta tabla, si hay
  // alguna — así el trainer ve "cuándo entra en marcha" sin tener que bajar
  // hasta Fases de entrenamiento. Las ya sustituidas no cuentan.
  public scheduledPhaseForTable(tableId: string): RoutineAssignment | null {
    return (
      this.routinePhases.find(
        (phase) => phase.tableId === tableId && phase.state === 'scheduled'
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
        suggestedStartDate: ultima ? localIsoDate(manana) : null,
        previousPhaseName: ultima?.tableName || '',
        phases: this.routinePhases,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    // Sin rutinas que programar, el modal ofrece crear una: mismo panel que
    // el botón "Crear rutina" de la ficha.
    if (role === 'create-routine') {
      this.openRoutinePanel();
      return;
    }
    if (role !== 'confirm' || !data) return;

    this.ionicUtilService.showToast({
      message: this.translate.instant('CLIENT_DETAIL.RUTINA_PROGRAMADA'),
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
      .getSchedule(this.clientId, start, end)
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
    if (!doneSets.length) return this.translate.instant('CLIENT_DETAIL.SIN_SERIES_REALIZADAS');
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
    if (!withExpected.length) return this.translate.instant('CLIENT_DETAIL.SIN_PRESCRIPCION');
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
      header: this.translate.instant('CLIENT_DETAIL.BORRAR_RUTINA'),
      message: this.translate.instant('CLIENT_DETAIL.DELETE_ROUTINE_MSG', { name: table.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.ERASE'),
          cssClass: 'alert-button-danger',
          handler: () => {
            this.clientDetailApi
              .deleteTable(table._id)
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
                    message: this.translate.instant('CLIENT_DETAIL.RUTINA_BORRADA'),
                    duration: 1500,
                  });
                  this.loadTraining();
                },
                error: () => {
                  this.ionicUtilService.showToast({
                    message: this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_BORRAR_LA'),
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
      message: this.translate.instant('CLIENT_DETAIL.TEMPLATE_ASSIGNED_TO', { name: this.name }),
      duration: 2000,
    });
    void this.openPlanner(table);
  }

  private onRoutineAssignError(err: any): void {
    this.isAssigningRoutine = false;
    this.ionicUtilService.showErrorToast(
      err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_ASIGNAR_LA'),
      this.translate.instant('COMMON.ERROR'),
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

    this.loadComplianceSummary();

    // F29 — no bloquea el resto de la sección si falla, es un widget aparte.
    this.clientDetailApi.getNutritionPreferences(this.clientId).subscribe({
      next: (preferences) => (this.nutritionPreferences = preferences),
      error: () => (this.nutritionPreferences = null),
    });

    this.loadNutritionalGoal();

    void this.loadDietPhases();
  }

  // F20-bis — ventana fija de 30 días terminando hoy, no la fecha que se
  // esté viendo abajo (mismo criterio que /adherence).
  private loadComplianceSummary(): void {
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
  }

  // Adherencia y cumplimiento sin tocar nutritionState: lo que ya se ve se
  // queda en pantalla hasta que llegan las cifras nuevas.
  private refreshAdherence(): void {
    this.clientDetailApi.getAdherence(this.clientId).subscribe({
      next: (adherence) => (this.adherence = adherence),
      error: () => undefined,
    });
    this.loadComplianceSummary();
  }

  // F20-quinquies — llamado por <app-nutrition-calendar> al completar una
  // selección de rango (click día inicio, click día fin); alimenta las
  // gráficas con ese rango exacto. Rango a mano: deja de haber preset activo.
  // Un rango es para mirar su seguimiento: vuelve a esa pestaña si estaba
  // en «Día».
  public onNutritionRangeSelected(range: { start: string; end: string }): void {
    this.trackingPreset = null;
    this.customTrackingRange = range;
    this.nutritionColumnTab = 'tracking';
  }

  // F20-bis — llamado por <app-nutrition-calendar> al hacer click en un día;
  // sustituye a los antiguos botones ±1 día (changeNutritionDate), que no
  // daban vista de conjunto ni salto directo a una fecha.
  //
  // Pulsar un día es querer verlo: abre la pestaña «Día», que lee su resumen
  // (<app-nutrition-day-detail>). Lo demás de la sección (adherencia,
  // cumplimiento, preferencias, fase vigente) no depende del día elegido.
  public onNutritionDateSelected(date: string): void {
    this.nutritionDate = date;
    this.nutritionColumnTab = 'day';
  }

  // Fecha de calendario LOCAL, no UTC: `startDate` de una fase es el día
  // pautado en la agenda del entrenador (sin hora ni huso), y toISOString()
  // convierte a UTC — con la máquina/navegador en un huso por delante de UTC
  // (España, p. ej.), de medianoche local en adelante seguía dando la fecha
  // de AYER en UTC. Una fase que empieza literalmente hoy comparaba
  // `startDate <= hoy` como false y no se reconocía como vigente ("EN
  // CURSO" no salía) hasta que UTC alcanzaba la fecha local.
  private todayIsoDate(): string {
    return localIsoDate();
  }

  private isoDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return localIsoDate(date);
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

  // Las fases de dieta: la que rige hoy y la secuencia entera (las
  // programadas se pintan junto a la actual desde el primer render).
  public loadDietPhases(): Promise<void> {
    return forkJoin({
      current: this.dietPhaseApi.getCurrent(this.clientId),
      phases: this.dietPhaseApi.list(this.clientId),
    })
      .toPromise()
      .then((res) => {
        this.dietPhases = (res?.phases || []).slice().sort((a, b) => a.startDate.localeCompare(b.startDate));
        this.phaseColorMap = buildPhaseColorMap(this.dietPhases.map((phase) => phase._id));
        this.currentDietPhase = res?.current || null;
        this.loadPhaseWeeks();
        this.loadCheckinSchedulesCount();
      })
      .catch(() => {
        this.currentDietPhase = null;
        this.dietPhases = [];
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
      this.ionicUtilService.showErrorToast(macroError, this.translate.instant('COMMON.ERROR'), 4500);
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
            message: this.translate.instant('CLIENT_DETAIL.OBJETIVO_ACTUALIZADO'),
            duration: 2000,
          });
          this.loadNutritionalGoal();
        },
        error: (err) => {
          this.savingNutritionalGoal = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_GUARDAR_EL'),
            this.translate.instant('COMMON.ERROR'),
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
            err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_RECALCULAR_EL'),
            this.translate.instant('COMMON.ERROR'),
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
    return this.translate.instant('CLIENTS.REPARTO_DE_KCAL_PROTEINA_CARBOHIDRATOS', { p0: pct(
      split.protein
    ), p1: pct(split.carbs), p2: pct(split.fat) });
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
   * de la más reciente a la más antigua por fecha de inicio: la vigente queda
   * donde le toque cronológicamente. Única lista para la fila horizontal.
   */
  public get phaseTimeline(): DietPhase[] {
    return [...this.dietPhases].reverse();
  }

  public get hasDietPhases(): boolean {
    return this.dietPhases.length > 0;
  }

  public isCurrentPhase(phase: DietPhase): boolean {
    return this.currentDietPhase?._id === phase._id;
  }

  // Orden cronológico real de esta fase entre TODAS las del cliente (1ª,
  // 2ª…), independiente del orden en que se PINTA (phaseTimeline, invertido).
  public phaseOrder(phase: DietPhase): number {
    return this.dietPhases.findIndex((candidate) => candidate._id === phase._id) + 1;
  }

  public isPhaseEnded(phase: DietPhase): boolean {
    return !!phase.endDate && phase.endDate < this.todayIsoDate();
  }

  // Etiqueta de las cards compactas (todo menos la vigente, que ya dice "en
  // curso" aparte): "programada" si su inicio todavía no ha llegado,
  // "finalizada" si ya se cerró.
  public phaseCompactLabel(phase: DietPhase): string {
    const key = phase.startDate > this.todayIsoDate() ? 'CLIENT_DETAIL.PHASE_SCHEDULED' : 'CLIENT_DETAIL.PHASE_FINISHED';
    return this.translate.instant(key, { n: this.phaseOrder(phase) });
  }

  public trackByPhaseId(_index: number, phase: DietPhase): string {
    return phase._id;
  }

  // Semanas de la fase vigente: la que corre, la siguiente (con sugerencia)
  // y las pasadas.
  private loadPhaseWeeks(): void {
    const phaseId = this.currentDietPhase?._id;
    if (!phaseId) {
      this.phaseWeeks = null;
      this.syncTrackingRange();
      return;
    }
    this.dietPhaseApi.getWeeks(this.clientId, phaseId).subscribe({
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
  // phaseColorMap, construido sobre dietPhases (TODA la secuencia,
  // fases terminadas incluidas), exactamente como hace el calendario en
  // phase-color.util.ts.
  public phaseColor(phase: DietPhase | null): string {
    if (!phase) return 'var(--tf-accent)';
    return this.phaseColorMap.get(phase._id) ?? 'var(--tf-accent)';
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
  public phaseEndLabel(phase: DietPhase | null): string {
    if (!phase) return '';
    if (phase.endDate) return `hasta ${phase.endDate}`;
    if (this.phaseHasScheduledSuccessor(phase)) return '';
    return 'indefinido';
  }

  // ¿Hay alguna fase que empiece más tarde que esta? (programada, o ya en
  // marcha si "esta" es una fase antigua superada). Ver phaseEndLabel.
  private phaseHasScheduledSuccessor(phase: DietPhase): boolean {
    return this.dietPhases.some((other) => other._id !== phase._id && other.startDate > phase.startDate);
  }

  // Fase cortada el mismo día en que empezó (p. ej. dos fases creadas
  // seguidas, la segunda con fecha de hoy: la primera acaba el día en que
  // empezó, ver diet-phase-service.js#chain).
  // "Desde 13 jun hasta 13 jun" no dice más que "13 jun" — un solo día.
  public isSingleDayPhase(phase: DietPhase | null): boolean {
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
    if (next.content) return next.content.profile.kcal;
    if (next.suggestion?.hasData) return next.suggestion.nextKcal;
    return next.inherits?.profile.kcal ?? null;
  }

  public get nextWeekState(): 'edited' | 'suggested' | 'same' {
    const next = this.phaseWeeks?.next;
    if (next?.content) return 'edited';
    if (next?.suggestion?.hasData && next.suggestion.deltaKcal !== 0)
      return 'suggested';
    return 'same';
  }

  public weekDateRange(window: { start: string; end: string }): string {
    const fmt = (iso: string): string =>
      new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
    return `${fmt(window.start)} – ${fmt(window.end)}`;
  }

  public shortDay(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }

  // Resumen de una semana (pasada o la que corre) de cualquier fase: solo
  // lectura. La que corre no se edita: lo que cambia de un día son excepciones.
  public async openWeekSummary(entry: WeekOpenRequest): Promise<void> {
    const phase = this.dietPhases.find((candidate) => candidate._id === entry.phaseId);
    if (!phase) return;
    const modal = await this.modalController.create({
      component: WeekSummaryPanelComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        phase,
        weekNumber: entry.number,
        window: { start: entry.start, end: entry.end },
        clientName: this.name,
      },
    });
    await modal.present();
  }

  // Una semana de la fase vigente (los cuadraditos de su tarjeta).
  public openCurrentPhaseWeek(week: { number: number; start: string; end: string }): void {
    const phaseId = this.currentDietPhase?._id;
    if (phaseId) void this.openWeekSummary({ phaseId, number: week.number, start: week.start, end: week.end });
  }

  // --- Check-ins del cliente, desde la tarjeta de la fase ---

  // null mientras no se sepa: el chip no aparece hasta entonces (enseñar
  // "0 check-ins" antes de tiempo sería mentir).
  public checkinSchedulesCount: number | null = null;
  public checkinTemplateToOpen: string | null = null;
  // Bandeja «Por revisar» → ?tab=measurements&response=<id>: abre esa
  // respuesta de check-in.
  public checkinResponseToOpen: string | null = null;
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
  // recipe-builder-modal. Se abre desde el chip de la fase y desde "Ver
  // historial" bajo el calendario de Medidas y check-ins; ahí el pie "Ir a
  // check-ins" sobra (ya se está), y sin onGoToCheckins los paneles no lo
  // pintan.
  public async openCheckinSchedulesPanel(fromCheckins = false): Promise<void> {
    const onGoToCheckins = fromCheckins
      ? undefined
      : () => void this.closeCheckinPanels().then(() => this.goToCheckins());
    const modal = await this.modalController.create({
      component: CheckinSchedulesPanelComponent,
      cssClass: 'tf-panel-modal ion-disable-focus-trap',
      componentProps: {
        clientId: this.clientId,
        clientName: this.name,
        onSelect: (schedule: CheckinSchedule) =>
          void this.openScheduleHistoryPanel(schedule, onGoToCheckins),
        onGoToCheckins,
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
    schedule: CheckinSchedule,
    onGoToCheckins?: () => void
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
        onGoToCheckins,
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
    if (current) this.openCurrentPhaseWeek(current);
  }

  // La siguiente semana: sugerencia + kcal, se prepara en el builder (o se
  // descarta si ya estaba preparada). Sin fecha que elegir: empieza el lunes.
  public async openNextWeekModal(): Promise<void> {
    const phaseId = this.currentDietPhase?._id;
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
      void this.loadDietPhases();
      this.loadNutrition();
    }
  }

  // Fondo suave de phaseColor() — la vigente ya no lleva el naranja fijo de
  // acento (mismo criterio "esto es tuyo, no del sistema" que llevó a
  // sacar el naranja de las próximas: la fase activa tampoco es un estado
  // de navegación/UI, es un dato del cliente como cualquier otra fase).
  // Reutiliza hexToRgba.
  public phaseSoftBackground(phase: DietPhase | null): string {
    if (!phase) return 'var(--tf-accent-soft)';
    const color = this.phaseColorMap.get(phase._id);
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

  public requestCancelPlanPhase(phase: DietPhase, event: Event): void {
    event.stopPropagation();
    this.confirmingCancelPlanPhaseId = phase._id;
  }

  public dismissCancelPlanPhase(event: Event): void {
    event.stopPropagation();
    this.confirmingCancelPlanPhaseId = null;
  }

  public confirmCancelPlanPhase(phase: DietPhase, event: Event): void {
    event.stopPropagation();
    this.confirmingCancelPlanPhaseId = null;
    this.cancellingPlanPhaseId = phase._id;
    this.dietPhaseApi.cancel(this.clientId, phase._id).subscribe({
      next: () => {
        this.cancellingPlanPhaseId = null;
        this.ionicUtilService.showToast({
          message: this.translate.instant('CLIENT_DETAIL.FASE_QUITADA'),
          duration: 1500,
        });
        // loadNutrition (no solo loadDietPhases): la adherencia se mide
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
          message: err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_QUITAR_LA'),
          duration: 2500,
        });
      },
    });
  }

  // Historial de nutrición: fases, sus semanas y los días saltados.
  public toggleNutritionHistory(): void {
    this.showNutritionHistory = !this.showNutritionHistory;
    if (this.showNutritionHistory && !this.nutritionHistoryLoaded) {
      this.loadNutritionHistory();
    }
  }

  // `silent`: relee sin el esqueleto, dejando el historial que ya se ve.
  public loadNutritionHistory({ silent = false } = {}): void {
    if (!silent) this.nutritionHistoryState = 'loading';
    this.dietPhaseApi.getNutritionHistory(this.clientId).subscribe({
      next: (history) => {
        // Ya viene ordenado del más reciente al más antiguo.
        this.nutritionHistory = history?.events || [];
        this.nutritionHistoryLoaded = true;
        this.nutritionHistoryState = 'loaded';
      },
      error: () => {
        if (!silent) this.nutritionHistoryState = 'error';
      },
    });
  }

  // Siempre sobre nutritionDate, el día seleccionado en el calendario (no
  // "hoy", como decían el nombre y la etiqueta antiguos). El calendario solo
  // lo ofrece en días dentro de una fase, sea la vigente o no.
  public async skipSelectedDay(): Promise<void> {
    if (this.isSkippingDay) return;
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CLIENT_DETAIL.SKIP_DAY_HEADER', { date: this.nutritionDateLabel }),
      message:
        this.translate.instant('CLIENT_DETAIL.ESE_DIA_QUEDA_VACIO_SE'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('CLIENT_DETAIL.MARCAR_DIA_SALTADO'),
          role: 'destructive',
          handler: () => {
            this.isSkippingDay = true;
            this.dietPhaseApi
              .skipDay(this.clientId, this.nutritionDate)
              .subscribe({
                next: () => {
                  this.isSkippingDay = false;
                  // Lo que cambia se refresca solo (onDaySkipped).
                  this.ionicUtilService.showToast({
                    message: this.translate.instant('CLIENT_DETAIL.DIA_MARCADO_COMO_SALTADO'),
                    duration: 2000,
                  });
                },
                error: () => {
                  this.isSkippingDay = false;
                  this.ionicUtilService.showErrorToast(
                    this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_MARCAR_EL'),
                    this.translate.instant('COMMON.ERROR'),
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
    const label = date.toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return this.isNutritionDateToday ? `${this.translate.instant('TRAINER_COMMON.TODAY')} · ${label}` : label;
  }

  public get isNutritionDateToday(): boolean {
    return this.nutritionDate === localIsoDate();
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
          message: this.translate.instant('CLIENT_DETAIL.QUESTIONNAIRE_REQUESTED_TO', { name: this.name }),
          duration: 2500,
        });
      },
      error: (err) => {
        this.isRequestingPreferences = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_SOLICITAR_EL'),
          this.translate.instant('COMMON.ERROR'),
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
    if (value === 'yes') return this.translate.instant('COMMON.YES');
    if (value === 'no') return this.translate.instant('COMMON.NO');
    if (value === 'sometimes') return 'A veces';
    return this.translate.instant('CLIENT_DETAIL.NOT_SPECIFIED');
  }

  // Icono + color por restricción, compartido con diet-card y el cajón de
  // sugerencias.
  public readonly dietaryFlagUi = dietaryFlagUi;

  // Sugerencias de dieta — "empezar fase" lleva a la biblioteca de dietas
  // (/tabs/diet-templates/for-phase/:clientId), que las lista ordenadas por
  // lo cerca que quedan del objetivo de este cliente y abre ahí el panel de
  // parámetros. Antes la lista rankeada se pintaba en esta misma pantalla,
  // en un "modo" que escondía media ficha: elegir una dieta es entrar en la
  // biblioteca, no una vista más de la ficha. El nombre viaja por query
  // param (y no por router state) para que la pantalla sobreviva a un F5.
  // Desde qué día empieza se elige al aplicarla, en el calendario del
  // cliente (PhaseStartSheetComponent).
  public startDietPhase(): void {
    void this.router.navigate(
      ['/tabs/diet-templates/for-phase', this.clientId],
      {
        queryParams: { name: this.name },
      }
    );
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
  // blanco (editable ahí mismo). Desde qué día empieza la fase se elige al
  // guardar, en el calendario del cliente (PhaseStartSheetComponent).
  public goToCreateDiet(): void {
    void this.router.navigate(['/tabs/diet-templates/for-client', this.clientId], {
      state: { clientName: this.name },
    });
  }

  // Corregir cuándo empieza y acaba la fase vigente. Una fase se crea para
  // el día en que se crea; esto es lo que permite moverla después sin
  // borrarla y volver a aplicarla.
  public openPhaseDatesEditor(): void {
    const phase = this.currentDietPhase;
    if (!phase) return;

    this.phaseDatesPhaseId = phase._id;
    this.phaseDatesTitle = phase.name;
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
    this.dietPhaseApi
      .update(this.clientId, this.phaseDatesPhaseId, {
        startDate: this.phaseDatesStart,
        endDate: this.phaseDatesEnd || null,
      })
      .subscribe({
        next: () => {
          this.isSavingPhaseDates = false;
          this.showPhaseDatesPanel = false;
          this.ionicUtilService.showToast({
            message: this.translate.instant('CLIENT_DETAIL.FECHAS_DE_LA_FASE_ACTUALIZADAS'),
            duration: 2200,
          });
          void this.loadDietPhases();
          this.loadNutrition();
        },
        // 409 = las fechas nuevas pisan otra fase. El mensaje del backend ya
        // dice cuál y desde cuándo. El panel sigue abierto para corregirlas.
        error: (err) => {
          this.isSavingPhaseDates = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDIERON_CAMBIAR_LAS'),
            this.translate.instant('COMMON.ERROR'),
            4000
          );
        },
      });
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // La tarjeta de una fase abre su contenido en el constructor: el que rige
  // hoy si la fase está en curso, y si no su última versión. Edita la copia
  // de ESTE cliente, nunca la plantilla de la que salió.
  public openPhaseContent(phase: DietPhase): void {
    const today = this.todayIsoDate();
    const versions = phase.contents.filter((content) => content.startDate <= today);
    const content = versions[versions.length - 1] || phase.contents[phase.contents.length - 1];
    void this.router.navigate(['/tabs/diet-templates/phase', this.clientId, phase._id, content._id], {
      queryParams: { name: this.name },
    });
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
    return this.missingScope === 'training' ? this.translate.instant('CLIENT_DETAIL.ENTRENAMIENTO') : this.translate.instant('CLIENT_DETAIL.NUTRICION');
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
          (i) => i.clientEmail === email && i.scope === scope && i.status === 'pending'
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
      header: this.translate.instant('CLIENT_DETAIL.INVITE_TO', { scope: label }),
      message: this.translate.instant('CLIENT_DETAIL.INVITE_MSG', { name: this.name, scope: label }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('CLIENT_DETAIL.INVITAR'),
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
            result?.error || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_ENVIAR_LA'),
            this.translate.instant('COMMON.ERROR'),
            3000
          );
          return;
        }
        this.missingScopeInvitePending = true;
        this.ionicUtilService.showToast({
          message: this.translate.instant('CLIENT_DETAIL.INVITE_SENT_TO', { scope: label }),
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
            this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_ENVIAR_LA'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }

  // --- F08: finalizar relación (lado profesional) ---
  public async confirmRevoke(scope: ClientScope): Promise<void> {
    const scopeLabel = scope === 'training' ? this.translate.instant('CLIENT_DETAIL.ENTRENAMIENTO') : this.translate.instant('CLIENT_DETAIL.NUTRICION');
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CLIENT_DETAIL.FINALIZAR_RELACION'),
      message: this.translate.instant('CLIENT_DETAIL.REVOKE_MSG', { scope: scopeLabel, name: this.name }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('CLIENT_DETAIL.FINALIZAR'),
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
            message: this.translate.instant('CLIENT_DETAIL.NO_LONGER_CLIENT', { name: this.name }),
            duration: 3000,
          });
          void this.router.navigate(['/tabs/clients']);
          return;
        }
        // Se revoca desde Gestión, que sigue existiendo: solo se mueve la
        // pestaña si la abierta era la del scope revocado.
        if (this.activeTab === scope) this.selectTab(this.scopes[0]);
        this.loadMissingScopeInvite();
        this.ionicUtilService.showToast({
          message: this.translate.instant('CLIENTS.RELACION_DE_FINALIZADA', { p0: scope === 'training' ? this.translate.instant('CLIENT_DETAIL.ENTRENAMIENTO') : this.translate.instant('CLIENT_DETAIL.NUTRICION') }),
          duration: 3000,
        });
      },
      error: () => {
        this.isRevoking = false;
        this.ionicUtilService.showErrorToast(
          this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_FINALIZAR_LA'),
          this.translate.instant('COMMON.ERROR'),
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
          err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_GUARDAR_LA'),
          this.translate.instant('COMMON.ERROR'),
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
              message: this.translate.instant('CLIENT_DETAIL.NOTA_FIJADA_VISIBLE_EN_LA'),
              duration: 2500,
            });
          }
        },
        error: () => {
          this.ionicUtilService.showErrorToast(
            this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_ACTUALIZAR_LA'),
            this.translate.instant('COMMON.ERROR'),
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
            this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_GUARDAR_EL_3'),
            this.translate.instant('COMMON.ERROR'),
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
          this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_BORRAR_LA_2'),
          this.translate.instant('COMMON.ERROR'),
          2500
        );
      },
    });
  }

  public trackByNoteId(_index: number, note: TrainerNote): string {
    return note._id;
  }

  // La lógica vive en checkin-labels.util.ts — la comparte con el panel de
  // resumen de la semana, que enseña estas mismas respuestas.
  public checkinFieldLabel(key: string): string {
    return checkinFieldLabel(key, this.checkinQuestions);
  }

  public checkinValueLabel(value: number | string | boolean): string {
    return checkinValueLabel(value);
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

  // --- Cobros (features/payments) ---
  // La tarjeta del Resumen pide abrir Gestión > Cobros; con "Configurar
  // cuota" o "Registrar pago" el libro abre directamente ese formulario.
  public openPayments(request: PaymentsCardRequest): void {
    this.paymentsIntent = request.action === 'configure-fee' || request.action === 'register' ? request.action : null;
    this.selectTab('payments');
  }

  public onPaymentsIntentConsumed(): void {
    this.paymentsIntent = null;
    this.paymentsFocusChargeId = null;
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
    const rango = task.targetMax ? ` ${this.translate.instant('COACH.RANGE_TO')} ${task.targetMax}` : '';
    return `${task.target}${rango} ${task.unit} ${this.translate.instant('CLIENT_DETAIL.PER_DAY')}`;
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
            err?.error?.message || this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_CREAR_EL'),
            this.translate.instant('COMMON.ERROR'),
            3000
          );
        },
      });
  }

  public async confirmDeactivateTask(task: TrainerTask): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CLIENT_DETAIL.QUITAR_HABITO'),
      message: this.translate.instant('CLIENTS.SEGURO_QUE_QUIERES_DEJAR_DE', { p0: this.taskDisplayLabel(
        task
      ) }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.REMOVE'),
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
          this.translate.instant('CLIENT_DETAIL.NO_SE_PUDO_QUITAR_EL'),
          this.translate.instant('COMMON.ERROR'),
          2500
        );
      },
    });
  }

  public taskDisplayLabel(task: TrainerTask): string {
    if (task.type === 'custom') return task.label || this.translate.instant('CLIENT_DETAIL.HABITO');
    return (
      this.taskTypeOptions.find((o) => o.value === task.type)?.label ||
      task.type
    );
  }

  public trackByTaskId(_index: number, task: TrainerTask): string {
    return task._id;
  }
}
