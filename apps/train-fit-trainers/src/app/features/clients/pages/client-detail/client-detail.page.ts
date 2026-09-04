import {
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from './services/client-detail-api.service';
import { TrainerClientsApiService } from '../../services/trainer-clients-api.service';
import { TrainerInvitesApiService } from '../../../invites/services/trainer-invites-api.service';
import {
  ClientIntake,
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
  CHECKIN_FIELDS,
  CHECKIN_FIELDS_BY_KEY,
  checkinAnchorFor,
  checkinScaleSuffix,
} from 'src/app/core/constants/checkin-fields';
import { formatSoreness } from 'src/app/core/constants/soreness';
import {
  AdherenceDimension,
  BlockExerciseProgress,
  BlockMuscleGroup,
  ClientBodyProfile,
  ClientTrainingProgress,
  GoalMeal,
  TRAINING_COMPARISON_METRIC_LABELS,
  TrainingBlock,
  TrainingComparisonMetric,
} from './models/client-progress.model';
import {
  TrainingFilterPanelComponent,
  TrainingFilterResult,
} from './components/training-filter-panel/training-filter-panel.component';
import { CompletedDay } from './components/training-calendar/training-calendar.component';
import { SelectClientsModalComponent } from '../../components/select-clients-modal/select-clients-modal.component';
import { ApplyDietTemplateModalComponent } from '../../components/apply-diet-template-modal/apply-diet-template-modal.component';
import { ApplyRoutineTemplateModalComponent } from '../../components/apply-routine-template-modal/apply-routine-template-modal.component';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { RoutineAssignmentApiService } from '../../../../shared/services/routine-assignment-api.service';
import { RoutineAssignment, RoutineScheduleDay } from '../../../../shared/models/routine-assignment.model';
import { ApplyRoutineModalComponent } from '../../components/apply-routine-modal/apply-routine-modal.component';
import { WEEKDAYS } from '../../../diet-templates/models/diet-template.model';
import {
  DietException,
  PlanAssignment,
} from '../../../../shared/models/plan-assignment.model';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { TableService } from 'src/app/core/services/table/table.service';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../shared/components/product-search-modal/product-search-modal.component';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import {
  AdherenceSummary,
  AnthropometryEntry,
  AnthropometryRequest,
  AnthropometryRequestCadence,
  BulkApplyResult,
  CheckinConfig,
  CheckinResponseEntry,
  ClientDetailSection,
  ClientDetailSectionDef,
  ClientDetailTab,
  ClientDetailTabDef,
  ClientNutritionPreferences,
  ClientScope,
  ClientTable,
  CLIENT_DETAIL_SECTIONS,
  SECTION_BY_TAB,
  CompletedWorkoutEntry,
  TrainingGoal,
  TrainingGoalType,
  DietDaySummary,
  MealAlternativeInput,
  MealFoodItemInput,
  MealSummary,
  NutritionalGoal,
  NutritionComplianceSummary,
  TrainerNote,
  TrainerPayment,
  TrainerTask,
  TrainerTaskType,
} from './models/client-detail.model';

type SectionState = 'loading' | 'error' | 'loaded';

// F20-quindecies — mismo reparto que NutritionCalendarComponent
// #selectPresetRange(30): 15 días hacia atrás, 15 hacia delante. Vive aquí
// TAMBIÉN (no solo en el calendario) para que customTrackingRange arranque
// con un valor real desde el primer render, sin depender de que el
// calendario emita a tiempo durante el arranque de Angular.
function defaultTrackingRange(): { start: string; end: string } {
  const addDays = (days: number): string => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  };
  return { start: addDays(-15), end: addDays(15) };
}

@Component({
  selector: 'app-client-detail',
  templateUrl: 'client-detail.page.html',
  styleUrls: ['client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {
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

  // --- Notas (F19, transversal a los scopes) ---
  public notesState: SectionState = 'loading';
  public notes: TrainerNote[] = [];
  public newNoteText = '';
  public isSavingNote = false;

  // --- Check-ins (F17, transversal a los scopes) ---
  public checkinsState: SectionState = 'loading';
  public checkinConfig: CheckinConfig | null = null;
  public checkinResponses: CheckinResponseEntry[] = [];

  // --- Cobros (F26, transversal a los scopes) ---
  public paymentsState: SectionState = 'loading';
  public payments: TrainerPayment[] = [];
  public showPaymentPanel = false;
  public paymentAmount: number | null = null;
  public paymentDueDate = '';
  public paymentNote = '';
  public isSavingPayment = false;

  // --- Tareas/hábitos (coach-tab FASE4, transversal a los scopes) ---
  public tasksState: SectionState = 'loading';
  public tasks: TrainerTask[] = [];
  public showTaskPanel = false;
  public taskType: TrainerTaskType = 'steps';
  public taskLabel = '';
  public taskTarget: number | null = null;
  public taskUnit = '';
  public isSavingTask = false;
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
  // "Objetivos nutricionales"): tipo + frecuencia declarada, editable en
  // línea. Mismo patrón que ya usaba el chip de objetivo de nutrición.
  public trainingGoal: TrainingGoal | null = null;
  public trainingGoalState: SectionState = 'loading';
  public isEditingTrainingGoal = false;
  public trainingGoalTypeDraft: TrainingGoalType | null = null;
  public trainingFrequencyDraft: number | null = null;
  public isSavingTrainingGoal = false;
  public readonly trainingGoalTypeOptions: { value: TrainingGoalType; label: string }[] =
    Object.entries(TRAINING_GOAL_TYPE_LABELS).map(([value, label]) => ({
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

  // --- Medidas (antropometría) — tab propio, no vive dentro de Nutrición:
  // relevante para cualquier cliente (entrenamiento y/o nutrición), no solo
  // los de nutrición. ---
  public measurementsState: SectionState = 'loading';
  public anthropometryEntries: AnthropometryEntry[] = [];
  public anthropometryRequest: AnthropometryRequest | null = null;
  public showMeasurementsRequestPanel = false;
  public isSavingMeasurementsRequest = false;
  public isCancelingMeasurementsRequest = false;
  // Mismo catálogo que los check-ins (ver checkin-fields.ts), filtrado a lo
  // que realmente alimenta Anthropometry — no duplica etiquetas nuevas.
  public readonly measurementFieldOptions = CHECKIN_FIELDS.filter(
    (f) => f.storage === 'anthropometry'
  );
  public readonly measurementFieldGroups: { key: string; label: string }[] = [
    { key: 'composicion_corporal', label: 'Composición corporal' },
    { key: 'perimetros', label: 'Perímetros' },
  ];
  public readonly measurementCadenceOptions: {
    value: AnthropometryRequestCadence;
    label: string;
  }[] = [
    { value: 'once', label: 'Puntual' },
    { value: 'daily', label: 'Diaria' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'custom', label: 'Personalizada' },
  ];
  public measurementsRequestForm: FormGroup = new FormGroup({
    fields: new FormControl<string[]>([], Validators.required),
    cadence: new FormControl<AnthropometryRequestCadence>(
      'once',
      Validators.required
    ),
    customIntervalDays: new FormControl<number | null>(null),
    notes: new FormControl(''),
  });

  // --- Nutrición ---
  public nutritionState: SectionState = 'loading';
  public nutritionDate: string = new Date().toISOString().slice(0, 10);
  public dietDay: DietDaySummary | null = null;
  public goals: NutritionalGoal[] = [];
  public adherence: AdherenceSummary | null = null;
  // F20-bis — cumplimiento del plan (distinto de adherence, ver
  // client-detail.model.ts), ventana fija de 30 días terminando hoy
  // (independiente del día que se esté viendo abajo).
  public complianceSummary: NutritionComplianceSummary | null = null;
  public showGoalPanel = false;
  public goalForm: FormGroup = new FormGroup({
    name: new FormControl('Objetivo asignado', Validators.required),
    kcalTotal: new FormControl(null, [Validators.required, Validators.min(1)]),
    proteinsGTotal: new FormControl(null, [
      Validators.required,
      Validators.min(0),
    ]),
    carbohydratesGTotal: new FormControl(null, [
      Validators.required,
      Validators.min(0),
    ]),
    fatGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
    // Fase 5 Coach Pro — "fibra si procede" (§15). SIN Validators.required:
    // dejarlo vacío significa "este objetivo no pauta fibra", que no es lo
    // mismo que 0 g. Los objetivos anteriores siguen siendo válidos.
    fiberGTotal: new FormControl(null, [Validators.min(0)]),
    // Fase 4 Coach Pro — el porqué del cambio (§18). Opcional: obligarlo en
    // una acción que un coach repite a diario acabaría rellenándose con
    // basura.
    reason: new FormControl(''),
  });
  public isAssigningGoal = false;
  // Tocar una card de objetivo ya EXISTENTE la pone en uso. Id (no un
  // booleano suelto) porque varias cards viven en la misma lista y solo una
  // debe mostrarse "en progreso" a la vez.
  public activatingGoalId: string | null = null;
  public isRevoking = false;

  // --- Pautar comida (F12/F28) ---
  public showPrescribePanel = false;
  public prescribeMealTarget: MealSummary | null = null;
  public prescribeAlternatives: MealAlternativeInput[] = [];
  public isPrescribing = false;
  public readonly maxAlternatives = 4;
  public readonly maxFoodItemsPerAlternative = 8;

  // --- Preferencias nutricionales (F29, transversal a nutrición) ---
  public nutritionPreferences: ClientNutritionPreferences | null = null;
  public isRequestingPreferences = false;

  // Auditoría de arquitectura (nutrición, Fase 8) — plan vigente del cliente,
  // resuelto vía PlanAssignment en vez de inferido de los DietDay ya escritos.
  public activePlan: PlanAssignment | null = null;
  public planPhases: PlanAssignment[] = [];
  public isCreatingException = false;
  // F20-quinquies — píldoras L/M/X/J/V/S/D del plan activo (solo
  // mode:'recurring'), mismo catálogo que usa el propio editor de plantillas.
  public readonly weekdayOptions = WEEKDAYS;
  // F20-octies — un color por patrón cuando el plan tiene 2+ (mismo criterio
  // categórico que las fases del calendario, PHASE_COLORS en
  // nutrition-calendar.component.ts) — con un solo patrón se queda en el
  // naranja de acento de siempre, sin inventar distinción donde no hace falta.
  // impeccable/quieter — mismo origen que PHASE_COLORS en
  // nutrition-calendar.component.ts (paleta Tailwind *-400 original,
  // desaturada ~48% de saturación / −6pp de luminosidad): un solo patrón
  // conceptual, dos usos, cambiar aquí implica cambiar allí también.
  private readonly weekdayPatternColors = ['#6e99cd', '#cc7ba6', '#4d9b7f', '#c09c41', '#a18fd7', '#4f9fc2'];
  // F20-quindecies — rango elegido en <app-nutrition-calendar> (click día
  // inicio/fin, o sus botones 7/30/90d). Se inicializa YA con un valor real
  // (30 días centrados en hoy) en vez de null: antes dependía de que el
  // calendario emitiera su rango por defecto en el momento justo del
  // arranque de Angular — funcionaba en teoría, pero es una dependencia
  // frágil entre dos componentes hermanos para algo que la propia página
  // puede fijar de entrada sin depender de nadie.
  public customTrackingRange: { start: string; end: string } | null = defaultTrackingRange();
  public nutritionPreset: number | null = 30;

  // TASK-045 (MASTER_BACKLOG.md) — historial de fases + excepciones puntuales.
  // Perezoso (solo al expandir) — no todos los trainers necesitan mirar
  // esto cada vez que abren la ficha del cliente.
  public showNutritionHistory = false;
  public nutritionHistoryLoaded = false;
  public nutritionHistoryState: 'loading' | 'error' | 'loaded' = 'loading';
  public nutritionHistory: PlanAssignment[] = [];
  public dietExceptions: DietException[] = [];

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
    private trainerInvitesApi: TrainerInvitesApiService
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
    const tabPedida = this.route.snapshot.queryParamMap.get('tab') as ClientDetailTab | null;
    this.selectTab(tabPedida && SECTION_BY_TAB[tabPedida] ? tabPedida : 'summary');

    if (this.scopes.includes('training')) this.loadTraining();
    if (this.scopes.includes('nutrition')) this.loadNutrition();
    this.loadMeasurements();
    this.loadNotes();
    this.loadCheckins();
    this.loadPayments();
    this.loadTasks();
    this.loadPreviousRelationCutoff();
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
    const definicion = this.sections.find((candidate) => candidate.key === section);
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
    // cliente no tiene no llega a mostrarse (hoy solo puede pasarle a Plan).
    return this.sections.filter((section) => this.visibleTabsOf(section).length > 0);
  }

  // Subpestañas de la sección abierta. Vacío cuando solo hay una: una
  // subbarra con un único botón siempre pulsado no informa de nada.
  public get visibleSubTabs(): ClientDetailTabDef[] {
    const section = this.sections.find((candidate) => candidate.key === this.activeSection);
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

  public trackBySectionKey(_index: number, section: ClientDetailSectionDef): string {
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
    this.trainingFrequencyDraft = this.trainingGoal?.trainingFrequencyTarget || null;
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
      trainingFrequencyTarget: this.trainingFrequencyDraft,
    };
    this.clientDetailApi.updateTrainingGoal(this.clientId, payload).subscribe({
      next: (goal) => {
        this.trainingGoal = goal;
        this.isSavingTrainingGoal = false;
        this.isEditingTrainingGoal = false;
      },
      error: () => {
        this.isSavingTrainingGoal = false;
        this.ionicUtilService.showErrorToast('No se pudo guardar el objetivo', 'Error', 3000);
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
        this.trainingAdherence = summary.adherence?.dimensions?.training ?? null;
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
  // configurable (calendario de rango + gráfica + panel de filtro) en vez
  // de varios bloques fijos. Resumen no se toca, sigue en modo `weeks`.
  public trainingComparisonRange: { start: string; end: string } | null = null;
  public trainingComparisonMetric: TrainingComparisonMetric = 'volume';
  public trainingBlocksState: SectionState = 'loading';
  public trainingBlocks: TrainingBlock[] = [];
  public trainingBlockMuscleGroups: BlockMuscleGroup[] = [];
  // Comparar por ejercicio (2026-09) — "ejercicios por micros". exerciseNames
  // sale gratis de la misma petición que ya trae blocks/blockMuscleGroups;
  // blockExercise solo llega poblado cuando ya hay un ejercicio elegido (ver
  // loadTrainingBlocks, que reenvía selectedTrainingExercise al backend).
  public trainingExerciseNames: string[] = [];
  public trainingBlockExercise: BlockExerciseProgress[] = [];
  public selectedTrainingExercise: string | null = null;
  public trainingBlockComparison: ClientTrainingProgress['blockComparison'] = null;

  public get trainingComparisonMetricLabel(): string {
    return TRAINING_COMPARISON_METRIC_LABELS[this.trainingComparisonMetric];
  }

  // Movimiento adherencia-por-fase (2026-09) — antes solo el Set de fechas
  // ISO con sesión (sessionDatesSet); ahora nombre + % de series cumplidas
  // frente a las prescritas ESE día, para que el calendario pinte qué se
  // entrenó y cuánto se cumplió sin tener que abrir nada. Sale de
  // completedWorkouts (cada Workout ya trae sus exercises/sets completos),
  // ninguna llamada nueva. Mismo denominador que "fidelidad de pauta" en el
  // resto de la app: series con expectedReps[], no todas las series (una
  // serie sin rango prescrito no es incumplimiento, es un dato que no
  // aplica).
  public get completedDaysMap(): Map<string, CompletedDay> {
    const map = new Map<string, CompletedDay>();
    for (const workout of this.completedWorkouts) {
      if (!workout.date) continue;
      const date = new Date(workout.date as Date).toISOString().slice(0, 10);
      const sets = (workout.exercises || []).flatMap((exercise) => exercise.sets || []);
      const measurable = sets.filter((set) => set.expectedReps?.length);
      const doned = measurable.filter((set) => set.doned).length;
      map.set(date, {
        name: workout.name,
        completionPercentage: measurable.length ? Math.round((doned / measurable.length) * 100) : null,
      });
    }
    return map;
  }

  public onTrainingRangeSelected(range: { start: string; end: string }): void {
    this.trainingComparisonRange = range;
    this.loadTrainingBlocks();
    this.loadTrainingSchedule(range);
  }

  private loadTrainingBlocks(): void {
    if (!this.trainingComparisonRange) return;
    this.trainingBlocksState = 'loading';
    const { start, end } = this.trainingComparisonRange;
    this.clientDetailApi
      .getTrainingBlocks(this.clientId, start, end, this.selectedTrainingExercise || undefined)
      .subscribe({
        next: (data) => {
          this.trainingBlocks = data.blocks || [];
          this.trainingBlockMuscleGroups = data.blockMuscleGroups || [];
          this.trainingBlockComparison = data.blockComparison || null;
          this.trainingExerciseNames = data.exerciseNames || [];
          this.trainingBlockExercise = data.blockExercise || [];
          this.trainingBlocksState = 'loaded';
        },
        error: () => {
          this.trainingBlocks = [];
          this.trainingBlockMuscleGroups = [];
          this.trainingBlockComparison = null;
          this.trainingExerciseNames = [];
          this.trainingBlockExercise = [];
          this.trainingBlocksState = 'error';
        },
      });
  }

  public async openTrainingFilterPanel(): Promise<void> {
    const modal = await this.modalController.create({
      component: TrainingFilterPanelComponent,
      componentProps: {
        selectedMetric: this.trainingComparisonMetric,
        selectedExercise: this.selectedTrainingExercise,
        exerciseNames: this.trainingExerciseNames,
      },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<TrainingFilterResult>();
    if (role !== 'confirm' || !data) return;

    this.trainingComparisonMetric = data.metric;
    const exerciseChanged = data.exercise !== this.selectedTrainingExercise;
    this.selectedTrainingExercise = data.exercise;

    // Solo hace falta volver a pedir al backend si de verdad cambió el
    // ejercicio elegido — blockExercise solo llega poblado para el que se
    // pidió la última vez (ver loadTrainingBlocks). Cambiar a/desde las
    // otras 4 métricas no necesita ninguna llamada nueva: sus datos ya
    // están en memoria desde la última carga del rango.
    if (data.metric === 'exercise' && exerciseChanged) {
      this.loadTrainingBlocks();
    }
  }

  // --- Tarea 3 bis: vista previa de sesiones (link a Progreso > Sesiones) ---
  public get recentCompletedWorkouts(): CompletedWorkoutEntry[] {
    return this.completedWorkouts.slice(0, 3);
  }

  public goToSessionsTab(): void {
    this.selectTab('history');
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
    return location ? TRAINING_LOCATION_LABELS[location] || location : 'No indicado';
  }

  public equipmentTagLabel(tag: EquipmentTag): string {
    return EQUIPMENT_TAG_LABELS[tag] || tag;
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
        this.routineHistory = history || [];
        this.routineHistoryState = 'loaded';
      },
      error: () => {
        this.routinePhases = [];
        this.routineHistory = [];
        this.routineHistoryState = 'error';
      },
    });
  }

  // Cronológico, excluyendo "ended" (reservado, sin uso real hoy — igual
  // que en nutrición). Sin endDate que filtrar: a diferencia de nutrición,
  // aquí no hay fases "ya terminadas" que descartar de la lista.
  private buildRoutinePhaseSequence(history: RoutineAssignment[]): RoutineAssignment[] {
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

  public toggleRoutineHistory(): void {
    this.showRoutineHistory = !this.showRoutineHistory;
  }

  public trackByRoutinePhaseId(_index: number, phase: RoutineAssignment): string {
    return phase._id;
  }

  // Tarea 4bis (2026-09) — "me he equivocado" / cliente lesionado: quitar
  // una fase programada antes de que empiece. Mismo patrón de confirmación
  // que confirmDeleteTable (showAlert con botón de peligro).
  public cancellingRoutinePhaseId: string | null = null;

  public async confirmCancelRoutinePhase(phase: RoutineAssignment, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: 'Quitar fase programada',
      message: `¿Seguro que quieres quitar "${phase.tableName}", programada para el ${this.formatShortDate(phase.startDate)}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Quitar',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.cancellingRoutinePhaseId = phase._id;
            this.routineAssignmentApi.cancel(this.clientId, phase._id).subscribe({
              next: () => {
                this.cancellingRoutinePhaseId = null;
                this.ionicUtilService.showToast({ message: 'Fase quitada', duration: 1500 });
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
          },
        },
      ],
    });
  }

  // Tarea 4ter (2026-09) — "quiero extenderlo": cambiar solo la fecha de
  // una fase programada (aún no en curso), sin pasar por cancelar +
  // reprogramar. Reutiliza el mismo modal que "Programar rutina" en modo
  // 'reschedule' (tabla fija, solo se edita la fecha).
  public async openRescheduleRoutinePhaseModal(phase: RoutineAssignment, event: Event): Promise<void> {
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
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    this.ionicUtilService.showToast({ message: 'Fecha actualizada', duration: 1500 });
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
        (phase) => phase.tableId === tableId && !this.isCurrentRoutinePhase(phase)
      ) || null
    );
  }

  private formatShortDate(iso: string): string {
    return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
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
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    this.ionicUtilService.showToast({ message: 'Rutina programada', duration: 2000 });
    this.loadActiveRoutine();
    this.loadTraining();
  }

  // --- Tarea 4 (2026-09): proyección de la rutina sobre el calendario ---
  public projectedTrainingDays: Map<string, { isPlannedRestDay: boolean; name: string }> = new Map();

  private loadTrainingSchedule(range: { start: string; end: string }): void {
    this.routineAssignmentApi.getActiveSchedule(this.clientId, range.start, range.end).subscribe({
      next: (days: RoutineScheduleDay[]) => {
        this.projectedTrainingDays = new Map(
          (days || []).map((d) => [d.date, { isPlannedRestDay: d.isPlannedRestDay, name: d.name }])
        );
      },
      error: () => {
        this.projectedTrainingDays = new Map();
      },
    });
  }

  // --- Medidas (antropometría) ---
  // Movimiento 3 Coach Pro — altura/sexo/nacimiento para la calculadora
  // corporal. Lo demás que necesita (las mediciones) ya se carga aquí.
  public bodyProfile: ClientBodyProfile | null = null;

  // La medición MÁS RECIENTE. getAnthropometry devuelve orden descendente
  // (lo último primero), igual que el gráfico de arriba espera.
  public get latestMeasurement(): AnthropometryEntry | null {
    return this.anthropometryEntries[0] || null;
  }

  public loadMeasurements(): void {
    this.measurementsState = 'loading';
    Promise.all([
      this.clientDetailApi.getAnthropometry(this.clientId).toPromise(),
      this.clientDetailApi.getAnthropometryRequest(this.clientId).toPromise(),
    ])
      .then(([entries, request]) => {
        this.anthropometryEntries = entries || [];
        this.anthropometryRequest = request || null;
        this.measurementsState = 'loaded';
      })
      .catch(() => {
        this.measurementsState = 'error';
      });

    // Aparte del Promise.all: que falte el perfil (o falle su consulta) no
    // debe dejar la pestaña de Medidas en estado de error — el gráfico y el
    // histórico se leen igual sin él. La calculadora dirá qué le falta.
    this.clientDetailApi.getBodyProfile(this.clientId).subscribe({
      next: (profile) => (this.bodyProfile = profile),
      error: () => (this.bodyProfile = null),
    });
  }

  public measurementFieldsInGroup(
    group: string
  ): { key: string; label: string; unit?: string }[] {
    return this.measurementFieldOptions.filter((f) => f.group === group);
  }

  public isMeasurementFieldSelected(key: string): boolean {
    return (this.measurementsRequestForm.value.fields || []).includes(key);
  }

  public get isMeasurementsRequestSubmittable(): boolean {
    const { fields, cadence, customIntervalDays } =
      this.measurementsRequestForm.value;
    if (!fields?.length) return false;
    if (cadence === 'custom' && !(Number(customIntervalDays) > 0)) return false;
    return true;
  }

  public toggleMeasurementField(key: string): void {
    const current: string[] = this.measurementsRequestForm.value.fields || [];
    const next = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    this.measurementsRequestForm.get('fields')?.setValue(next);
  }

  public openMeasurementsRequestPanel(): void {
    this.showMeasurementsRequestPanel = true;
    this.measurementsRequestForm.reset({
      fields: this.anthropometryRequest?.fields || [],
      cadence: this.anthropometryRequest?.cadence || 'once',
      customIntervalDays: this.anthropometryRequest?.customIntervalDays || null,
      notes: this.anthropometryRequest?.notes || '',
    });
  }

  public closeMeasurementsRequestPanel(): void {
    this.showMeasurementsRequestPanel = false;
  }

  public submitMeasurementsRequest(): void {
    if (
      !this.isMeasurementsRequestSubmittable ||
      this.isSavingMeasurementsRequest
    )
      return;
    const { fields, cadence, customIntervalDays, notes } =
      this.measurementsRequestForm.value;

    this.isSavingMeasurementsRequest = true;
    this.clientDetailApi
      .upsertAnthropometryRequest(this.clientId, {
        fields,
        cadence,
        customIntervalDays:
          cadence === 'custom' ? Number(customIntervalDays) : null,
        notes: notes || '',
      })
      .subscribe({
        next: (request) => {
          this.isSavingMeasurementsRequest = false;
          this.showMeasurementsRequestPanel = false;
          this.anthropometryRequest = request;
          this.ionicUtilService.showToast({
            message: `Medidas solicitadas a ${this.name}`,
            duration: 3000,
          });
        },
        error: (err) => {
          this.isSavingMeasurementsRequest = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo solicitar la antropometría',
            'Error',
            3500
          );
        },
      });
  }

  public cancelMeasurementsRequest(): void {
    if (this.isCancelingMeasurementsRequest) return;
    this.isCancelingMeasurementsRequest = true;
    this.clientDetailApi.cancelAnthropometryRequest(this.clientId).subscribe({
      next: () => {
        this.isCancelingMeasurementsRequest = false;
        this.anthropometryRequest = null;
      },
      error: (err) => {
        this.isCancelingMeasurementsRequest = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo cancelar la petición',
          'Error',
          3500
        );
      },
    });
  }

  public measurementCadenceLabel(request: AnthropometryRequest): string {
    if (request.cadence === 'custom')
      return `Cada ${request.customIntervalDays} días`;
    return (
      this.measurementCadenceOptions.find((o) => o.value === request.cadence)
        ?.label || request.cadence
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
  // El botón "Volver" del Planificador (PlannerPage#close()) necesita saber
  // a qué pestaña regresar — sin esto siempre caía en Resumen (el valor por
  // defecto de initTabsAndLoadSections cuando no hay ?tab= en la URL),
  // aunque se hubiera entrado desde Entrenamiento. returnTab viaja en la
  // URL de ida; PlannerPage se limita a reenviarlo como `tab` al volver,
  // reutilizando el mecanismo de ?tab= que ya existe (ver
  // initTabsAndLoadSections, usado hoy por los enlaces de notificación).
  // 2026-09 — atajo directo al Planificador de la rutina EN USO desde la
  // tarjeta "En uso". Navega por tableId de la fase (la tabla puede no estar
  // todavía en `this.tables`, que se carga aparte) reutilizando la MISMA ruta
  // y el mismo returnTab que openPlanner, sin duplicar criterio.
  public async openPlannerForCurrentPhase(): Promise<void> {
    const phase = this.currentRoutinePhase;
    if (!phase?.tableId) return;
    await this.openPlanner({ _id: phase.tableId } as ClientTable);
  }

  public async openPlanner(table: ClientTable): Promise<void> {
    await this.router.navigate(
      ['/tabs', 'clients', this.clientId, 'tables', table._id, 'planner'],
      { queryParams: { returnTab: this.activeTab } }
    );
  }

  // TASK-007 — mismo patrón que openPlanner: ruta completa +
  // TableInContextResolver siembra la tabla del cliente antes de activar.
  // Mismo motivo que openPlanner de arriba: StatisticsPage#goBack() sigue
  // el mismo criterio (comentario propio: "mismo criterio que
  // PlannerPage#close()"), así que necesita el mismo returnTab.
  public async openStatistics(table: ClientTable): Promise<void> {
    await this.router.navigate(
      ['/tabs', 'clients', this.clientId, 'tables', table._id, 'statistics'],
      { queryParams: { returnTab: this.activeTab } }
    );
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
  // Mismo patrón que openApplyTemplateModal() (nutrición) un poco más abajo.
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

    // F12/F28 — comida del día real, necesaria para poder pautar directamente
    // desde esta pantalla (ver openPrescribePanel). No bloquea el resto de
    // la sección si falla, es un widget aparte.
    this.clientDetailApi.getDiet(this.clientId, date).subscribe({
      next: (dietDay) => (this.dietDay = dietDay),
      error: () => (this.dietDay = null),
    });

    this.clientDetailApi
      .getNutritionalGoals(this.clientId)
      .toPromise()
      .then((goals) => {
        this.goals = goals || [];
        this.nutritionState = 'loaded';
      })
      .catch(() => {
        this.nutritionState = 'error';
      });

    // F20 — no bloquea el resto de la sección si falla, es un widget aparte.
    this.clientDetailApi.getAdherence(this.clientId).subscribe({
      next: (adherence) => (this.adherence = adherence),
      error: () => (this.adherence = null),
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

    void this.loadActivePlan();
  }

  // F20-quinquies — llamado por <app-nutrition-calendar> al completar una
  // selección de rango (click día inicio, click día fin); alimenta
  // <app-nutrition-tracking-chart> con ese rango exacto en vez de sus
  // botones 7/30/90d.
  // El preset se elige encima de la gráfica y el rango se calcula aquí, en
  // el padre: es el único que puede pasárselo a la vez a la gráfica (que lo
  // dibuja) y al calendario (que lo sombrea). Reparte los días mitad hacia
  // atrás y mitad hacia delante —algo más de historia si son impares—
  // porque un plan puede tener fases futuras ya asignadas.
  public onNutritionPresetSelected(days: number): void {
    const desplazar = (offset: number): string => {
      const fecha = new Date();
      fecha.setUTCDate(fecha.getUTCDate() + offset);
      return fecha.toISOString().slice(0, 10);
    };
    this.nutritionPreset = days;
    this.customTrackingRange = {
      start: desplazar(-Math.ceil(days / 2)),
      end: desplazar(Math.floor(days / 2)),
    };
  }

  public onNutritionRangeSelected(range: { start: string; end: string }): void {
    // Rango elegido a mano en el calendario: deja de haber preset activo.
    this.nutritionPreset = null;
    this.customTrackingRange = range;
  }

  // F20-nonies — solo lo que DE VERDAD depende del día seleccionado
  // (dietDay) se vuelve a pedir aquí; goals/adherence/complianceSummary/
  // nutritionPreferences/activePlan no cambian según qué día se esté
  // mirando, así que no hace falta releerlos ni pasar nutritionState por
  // 'loading' (eso disparaba el skeleton de LA PESTAÑA ENTERA en cada
  // click de día — demasiado, para lo poco que realmente cambia).
  // isSwitchingDate solo atenúa la etiqueta de fecha mientras llega el
  // nuevo dietDay, en vez de un skeleton.
  public isSwitchingDate = false;

  // F20-bis — llamado por <app-nutrition-calendar> al hacer click en un día;
  // sustituye a los antiguos botones ±1 día (changeNutritionDate), que no
  // daban vista de conjunto ni salto directo a una fecha.
  public onNutritionDateSelected(date: string): void {
    if (date === this.nutritionDate) return;
    this.nutritionDate = date;
    this.isSwitchingDate = true;
    this.clientDetailApi.getDiet(this.clientId, date).subscribe({
      next: (dietDay) => {
        this.dietDay = dietDay;
        this.isSwitchingDate = false;
      },
      error: () => {
        this.dietDay = null;
        this.isSwitchingDate = false;
      },
    });
  }

  private todayIsoDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private isoDateDaysAgo(days: number): string {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - days);
    return date.toISOString().slice(0, 10);
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
        this.activePlan = res?.active || null;
        this.planPhases = this.buildPhaseSequence(res?.history || []);
      })
      .catch(() => {
        this.activePlan = null;
        this.planPhases = [];
      });
  }

  /**
   * Las fases en el orden en que rigen: de la más antigua a la más futura.
   *
   * Se quedan fuera las ya terminadas —el histórico vive en su propio
   * bloque, más abajo—: aquí interesa lo vigente y lo que viene después,
   * que es sobre lo que se decide.
   *
   * Ojo con `status`: al programar una fase futura, applyPlan marca la
   * anterior como "superseded" EN EL ACTO, aunque siga siendo la que rige
   * hoy. Por eso lo vigente se decide por FECHA y no por el status.
   */
  private buildPhaseSequence(history: PlanAssignment[]): PlanAssignment[] {
    const hoy = new Date().toISOString().slice(0, 10);
    return history
      .filter((phase) => !phase.endDate || phase.endDate >= hoy)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  }

  public isCurrentPhase(phase: PlanAssignment): boolean {
    const hoy = new Date().toISOString().slice(0, 10);
    return phase.startDate <= hoy && (!phase.endDate || phase.endDate >= hoy);
  }

  // TASK-045 (MASTER_BACKLOG.md) — combina el historial de fases
  // (GET .../nutrition-plans/history, endpoint ya existía sin consumidor,
  // mismo patrón que TASK-020) con las excepciones puntuales (nuevo GET
  // .../diet-exceptions). No sustituye un log de contenido exacto día a día
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
      history: this.planAssignmentApi.getHistory(this.clientId),
      exceptions: this.planAssignmentApi.getExceptions(this.clientId),
    }).subscribe({
      next: ({ history, exceptions }) => {
        this.nutritionHistory = history || [];
        this.dietExceptions = exceptions || [];
        this.nutritionHistoryLoaded = true;
        this.nutritionHistoryState = 'loaded';
      },
      error: () => {
        this.nutritionHistoryState = 'error';
      },
    });
  }

  // Se llamaba createExceptionForToday pero SIEMPRE usó nutritionDate, el
  // día seleccionado en el calendario. El nombre y la etiqueta del botón
  // decían "hoy" y el comportamiento era otro.
  public async createExceptionForSelectedDay(): Promise<void> {
    if (!this.activePlan || this.isCreatingException) return;
    await this.ionicUtilService.showAlert({
      header: `¿Marcar ${this.nutritionDateLabel} como excepción?`,
      message:
        'Ese día concreto queda vacío (sin comidas del plan), sin tocar el resto de la planificación.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Marcar excepción',
          handler: () => {
            this.isCreatingException = true;
            this.planAssignmentApi
              .createException(this.clientId, {
                date: this.nutritionDate,
                action: 'skip',
              })
              .subscribe({
                next: () => {
                  this.isCreatingException = false;
                  this.ionicUtilService.showToast({
                    message: 'Excepción guardada para ese día',
                    duration: 2000,
                  });
                  this.loadNutrition();
                },
                error: () => {
                  this.isCreatingException = false;
                  this.ionicUtilService.showErrorToast(
                    'No se pudo guardar la excepción',
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

  public get nutritionPreferencesPending(): boolean {
    return (
      !!this.nutritionPreferences?.requestedAt &&
      !this.nutritionPreferences?.respondedAt
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

  public cooksAtHomeLabel(value: 'yes' | 'no' | 'sometimes' | null): string {
    if (value === 'yes') return 'Sí';
    if (value === 'no') return 'No';
    if (value === 'sometimes') return 'A veces';
    return 'Sin especificar';
  }

  // Movimiento 5 Coach Pro — reparto por comidas en intercambios. Fuera del
  // FormGroup a propósito: es una estructura anidada (comidas -> raciones)
  // que se edita con su propio componente, y meterla en un FormArray dentro
  // de un formulario de cinco números solo añadiría ceremonia.
  public goalMealExchanges: GoalMeal[] = [];

  // El objetivo vigente del cliente. Se deriva de la lista en vez de
  // guardarse aparte: dos copias del "cuál está activo" se desincronizan en
  // cuanto se activa otro.
  public get activeGoal(): NutritionalGoal | null {
    return this.goals.find((goal) => goal.isInUse) || null;
  }

  public openGoalPanel(): void {
    this.showGoalPanel = true;
    this.goalForm.reset({
      name: 'Objetivo asignado',
      kcalTotal: null,
      proteinsGTotal: null,
      carbohydratesGTotal: null,
      fatGTotal: null,
    });
    // Se parte del reparto que ya tuviera el objetivo activo: pautar los
    // intercambios de cero cada vez que se retocan las kcal sería
    // inaceptable.
    this.goalMealExchanges = (this.activeGoal?.mealExchanges || []).map((meal) => ({
      name: meal.name,
      exchanges: [...(meal.exchanges || [])],
    }));
  }

  public closeGoalPanel(): void {
    this.showGoalPanel = false;
  }

  public submitGoal(): void {
    if (this.goalForm.invalid || this.isAssigningGoal) {
      this.goalForm.markAllAsTouched();
      return;
    }

    this.isAssigningGoal = true;
    this.clientDetailApi
      .assignNutritionalGoal(this.clientId, {
        ...this.goalForm.value,
        // Movimiento 5 Coach Pro — viaja junto a los gramos, en la misma
        // petición: son dos formas de pautar EL MISMO objetivo, y guardarlas
        // por separado abriría la puerta a que una se guardase y la otra no.
        mealExchanges: this.goalMealExchanges,
      })
      .subscribe({
        next: () => {
          this.isAssigningGoal = false;
          this.showGoalPanel = false;
          this.ionicUtilService.showToast({
            message: `Objetivos actualizados para ${this.name}`,
            duration: 3000,
          });
          this.loadNutrition();
        },
        error: (err) => {
          this.isAssigningGoal = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudieron asignar los objetivos',
            'Error',
            3500
          );
        },
      });
  }

  public activateGoal(goal: NutritionalGoal): void {
    if (goal.isInUse || this.activatingGoalId) return;

    this.activatingGoalId = goal._id;
    this.clientDetailApi
      .activateNutritionalGoal(this.clientId, goal._id)
      .subscribe({
        next: () => {
          this.activatingGoalId = null;
          this.goals = this.goals.map((g) => ({
            ...g,
            isInUse: g._id === goal._id,
          }));
        },
        error: (err) => {
          this.activatingGoalId = null;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo activar el objetivo',
            'Error',
            3500
          );
        },
      });
  }

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

  public async openApplyTemplateModal(): Promise<void> {
    // La última fase de la secuencia es contra la que se encadena, no la
    // vigente: si ya hay dos programadas, la nueva va DETRÁS de la última.
    const ultima = this.planPhases[this.planPhases.length - 1] || null;
    const finAnterior = ultima?.endDate || null;

    const modal = await this.modalController.create({
      component: ApplyDietTemplateModalComponent,
      // Panel derecho, como el resto de formularios largos de la app.
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        clientName: this.name,
        suggestedStartDate: finAnterior ? this.addDaysToIso(finAnterior, 1) : null,
        previousPhaseEnd: finAnterior,
        previousPhaseName: ultima?.planName || '',
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    const until = data.endDate ? `hasta el ${data.endDate}` : 'indefinidamente';
    this.ionicUtilService.showToast({
      message: `Plan aplicado a ${this.name}, desde ${data.startDate} ${until}`,
      duration: 3000,
    });
    void this.loadActivePlan();
    this.loadNutrition();
  }

  public goToDietTemplates(): void {
    this.router.navigate(['/tabs/diet-templates']);
  }

  // "Crear dieta" — mismo modal que "Aplicar plantilla" (ApplyDietTemplateModalComponent
  // #forDirectCreate), pero solo para recoger nombre y fechas: el contenido
  // no existe todavía, se construye en el builder (diet-template-builder.page.ts,
  // ruta for-client/:clientId) al que se navega justo después.
  public async openCreateDietModal(): Promise<void> {
    const ultima = this.planPhases[this.planPhases.length - 1] || null;
    const finAnterior = ultima?.endDate || null;

    const modal = await this.modalController.create({
      component: ApplyDietTemplateModalComponent,
      cssClass: 'tf-panel-modal',
      componentProps: {
        clientId: this.clientId,
        clientName: this.name,
        forDirectCreate: true,
        suggestedStartDate: finAnterior ? this.addDaysToIso(finAnterior, 1) : null,
        previousPhaseEnd: finAnterior,
        previousPhaseName: ultima?.planName || '',
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) return;

    void this.router.navigate(['/tabs/diet-templates/for-client', this.clientId], {
      state: { ...data, clientName: this.name },
    });
  }

  // F20-quinquies — la tarjeta de plan activo pasa a ser clicable: abre el
  // editor de LA plantilla aplicada (mismo builder que "Gestionar
  // plantillas", pero directo a esta en vez de a la lista completa).
  public openActivePlanTemplate(): void {
    // sourceTemplateId, no planId: planId es la copia congelada exclusiva de
    // este cliente (ver plan-assignment.model.ts) — editarla no debe ser
    // posible desde aquí, así que este atajo va siempre a la plantilla real.
    if (!this.activePlan?.sourceTemplateId) return;
    this.router.navigate(['/tabs/diet-templates', this.activePlan.sourceTemplateId]);
  }

  // F20-octies — color de las píldoras del patrón `index`. Con un solo
  // patrón activo no hay nada que distinguir: se queda en el acento de
  // siempre en vez de un color categórico arbitrario.
  public weekdayPatternColor(index: number): string {
    const patterns = this.activePlan?.recurringPatterns || [];
    if (patterns.length <= 1) return 'var(--tf-accent)';
    return this.weekdayPatternColors[index % this.weekdayPatternColors.length];
  }

  // impeccable/quieter — tinte suave (14%) del color del patrón, para el
  // fondo de la píldora activa. Antes la píldora activa era un relleno
  // SÓLIDO del color categórico + texto negro encima — el único sitio de
  // esta pestaña que no seguía el idioma ya establecido de "fondo con
  // tinte + borde + texto del color" (ver .in-use-badge/.assigned-badge):
  // ahora lo sigue también, más calmado y más coherente con el resto.
  public weekdayPatternSoftBackground(index: number): string {
    const patterns = this.activePlan?.recurringPatterns || [];
    if (patterns.length <= 1) return 'var(--tf-accent-soft)';
    return this.hexToRgba(this.weekdayPatternColors[index % this.weekdayPatternColors.length], 0.16);
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // --- Pautar comida (F12: 1 alternativa = aplicación inmediata;
  // F28: 2+ alternativas nombradas = el cliente elige cuál se aplica) ---
  public openPrescribePanel(meal: MealSummary): void {
    this.prescribeMealTarget = meal;
    this.prescribeAlternatives = [this.emptyAlternative()];
    this.showPrescribePanel = true;
  }

  public closePrescribePanel(): void {
    this.showPrescribePanel = false;
    this.prescribeMealTarget = null;
  }

  // TAREA5 (auditoría UX, Fase E) — atajo de escritorio: con el panel de
  // "Pautar" abierto, Ctrl/Cmd+K abre el buscador directamente sobre el
  // primer hueco sin producto/receta (o añade uno si no queda ninguno),
  // sin tener que ir a buscar el botón con el ratón.
  @HostListener('document:keydown', ['$event'])
  public onGlobalKeydown(event: KeyboardEvent): void {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k')
      return;
    if (!this.showPrescribePanel || !this.prescribeAlternatives.length) return;
    event.preventDefault();

    for (
      let altIndex = 0;
      altIndex < this.prescribeAlternatives.length;
      altIndex++
    ) {
      const alt = this.prescribeAlternatives[altIndex];
      const itemIndex = alt.items.findIndex(
        (item) => !item.productId && !item.recipeId
      );
      if (itemIndex !== -1) {
        void this.openProductSearch(altIndex, itemIndex);
        return;
      }
    }

    const lastAltIndex = this.prescribeAlternatives.length - 1;
    const alt = this.prescribeAlternatives[lastAltIndex];
    if (alt.items.length >= this.maxFoodItemsPerAlternative) return;
    alt.items.push(this.emptyFoodItem());
    void this.openProductSearch(lastAltIndex, alt.items.length - 1);
  }

  private emptyFoodItem(): MealFoodItemInput {
    return {};
  }

  private emptyAlternative(): MealAlternativeInput {
    return { label: '', items: [this.emptyFoodItem()] };
  }

  // Cada alternativa nueva se pone ARRIBA de las anteriores (más reciente
  // primero) — así lo pidió el trainer, en vez de acumularse al final.
  public addAlternative(): void {
    if (this.prescribeAlternatives.length >= this.maxAlternatives) return;
    this.prescribeAlternatives.unshift(this.emptyAlternative());
  }

  // TAREA5 (auditoría UX, Fase E) — la mayoría de alternativas comparten casi
  // todos los alimentos (mismo carbohidrato/grasa, solo cambia la proteína).
  // Duplicar copia la composición entera para editar solo lo que cambia, en
  // vez de repetir el ciclo de búsqueda completo por cada opción.
  public duplicateAlternative(index: number): void {
    if (this.prescribeAlternatives.length >= this.maxAlternatives) return;
    const source = this.prescribeAlternatives[index];
    const copy: MealAlternativeInput = {
      label: source.label ? `${source.label} (copia)` : '',
      items: source.items.map((item) => ({ ...item })),
    };
    this.prescribeAlternatives.splice(index + 1, 0, copy);
  }

  public removeAlternative(index: number): void {
    if (this.prescribeAlternatives.length <= 1) return;
    this.prescribeAlternatives.splice(index, 1);
  }

  // Replanteamiento MVP (nutrición) — antes cada alternativa era UN solo
  // alimento y volver a pautar sobrescribía la comida entera; ahora cada
  // alternativa acumula VARIOS alimentos (this.maxFoodItemsPerAlternative)
  // que se envían juntos en un único customProducts al pautar.
  public addFoodItem(altIndex: number): void {
    const alt = this.prescribeAlternatives[altIndex];
    if (alt.items.length >= this.maxFoodItemsPerAlternative) return;
    alt.items.push(this.emptyFoodItem());
  }

  public removeFoodItem(altIndex: number, itemIndex: number): void {
    const alt = this.prescribeAlternatives[altIndex];
    if (alt.items.length <= 1) return;
    alt.items.splice(itemIndex, 1);
  }

  // TAREA1/TAREA5 — buscador real de search-foods (misma pantalla/tarjetas
  // que el consumidor, con productos+recetas+filtros) como panel lateral.
  // Sus acciones de escritura (compose/deleteMealCustomRecipe/AddProductPage)
  // llaman a endpoints con auth propia del consumidor logueado, sin
  // clientId — no sirven para "la dieta de un cliente". Por eso
  // SearchFoodsPage recibe un trainerContext con callbacks propios: al
  // elegir un producto/receta, se abre un segundo panel pequeño
  // (ProductSearchModalComponent, reutilizado aquí solo para el paso de
  // cantidad/confirmar) que sí aplica el resultado con la lógica de esta
  // página y cierra ambos paneles. Ver MVP-trainers/tareas-grandes/TAREA5.
  public async openProductSearch(
    altIndex: number,
    itemIndex: number
  ): Promise<void> {
    const outerModal = await this.modalController.create({
      component: SearchFoodsPage,
      componentProps: {
        trainerContext: this.buildSearchFoodsTrainerContext(
          altIndex,
          itemIndex,
          () => void outerModal.dismiss()
        ),
      },
      cssClass: 'tf-panel-modal',
    });
    await outerModal.present();
    await outerModal.onDidDismiss();
  }

  private buildSearchFoodsTrainerContext(
    altIndex: number,
    itemIndex: number,
    closeOuter: () => void
  ): SearchFoodsTrainerContext {
    return {
      clientUser: {
        _id: this.clientId,
        name: this.name,
        dietInUse: this.dietDay?.dietId,
      } as any,
      dietDay: (this.dietDay || {}) as any,
      meal: (this.prescribeMealTarget || {}) as any,
      targetLabel: this.prescribeMealTarget?.name,
      confirmSelection: (items) =>
        this.applyTrainerSelection(altIndex, itemIndex, items),
      closeSelf: closeOuter,
      pickCreateProduct: () =>
        void this.confirmPickedFood(
          altIndex,
          itemIndex,
          { kind: 'create' },
          closeOuter
        ),
    };
  }

  // TAREA5 (auditoría UX) — selección múltiple: el primer alimento marcado
  // rellena el hueco donde se pulsó "Buscar producto o receta real"; cada
  // alimento adicional de la misma pasada de búsqueda se añade como un
  // nuevo alimento de la alternativa, sin repetir el ciclo de búsqueda.
  private applyTrainerSelection(
    altIndex: number,
    itemIndex: number,
    items: TrainerFoodSelection[]
  ): void {
    const alt = this.prescribeAlternatives[altIndex];
    if (!alt || !items.length) return;

    items.forEach((selection, i) => {
      let targetIndex = itemIndex;
      if (i > 0) {
        if (alt.items.length >= this.maxFoodItemsPerAlternative) return;
        alt.items.push(this.emptyFoodItem());
        targetIndex = alt.items.length - 1;
      }
      const item = alt.items[targetIndex];
      if (selection.kind === 'recipe' && selection.recipe) {
        item.recipeId = selection.recipe._id;
        item.recipeName = selection.recipe.name;
        item.productId = undefined;
        item.productName = undefined;
        item.quantity = selection.quantity ?? undefined;
      } else if (selection.kind === 'product' && selection.product) {
        item.productId = selection.product._id;
        item.productName = selection.product.name;
        item.recipeId = undefined;
        item.recipeName = undefined;
        item.quantity = selection.quantity ?? undefined;
      }
    });
  }

  private async confirmPickedFood(
    altIndex: number,
    itemIndex: number,
    _picked: { kind: 'create' },
    closeOuter: () => void
  ): Promise<void> {
    const modal = await this.modalController.create({
      component: ProductSearchModalComponent,
      componentProps: { startInCreateProduct: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || !data) return;

    const item = this.prescribeAlternatives[altIndex].items[itemIndex];
    if (data.kind === 'recipe' && data.recipe) {
      item.recipeId = data.recipe._id;
      item.recipeName = data.recipe.name;
      item.productId = undefined;
      item.productName = undefined;
      item.quantity = data.quantity ?? undefined;
    } else if (data.product) {
      item.productId = data.product._id;
      item.productName = data.product.name;
      item.recipeId = undefined;
      item.recipeName = undefined;
      item.quantity = data.quantity ?? undefined;
    }
    closeOuter();
  }

  public clearProduct(altIndex: number, itemIndex: number): void {
    const item = this.prescribeAlternatives[altIndex].items[itemIndex];
    item.productId = undefined;
    item.productName = undefined;
    item.recipeId = undefined;
    item.recipeName = undefined;
    item.quantity = undefined;
  }

  public get prescribeIsMultiple(): boolean {
    return this.prescribeAlternatives.length >= 2;
  }

  public get canSubmitPrescribe(): boolean {
    if (!this.prescribeAlternatives.length) return false;
    return this.prescribeAlternatives.every(
      (a) =>
        a.items.length > 0 &&
        a.items.every((item) => !!(item.productId || item.recipeId)) &&
        (!this.prescribeIsMultiple || a.label.trim())
    );
  }

  public submitPrescribe(): void {
    if (
      !this.canSubmitPrescribe ||
      this.isPrescribing ||
      !this.prescribeMealTarget ||
      !this.dietDay
    ) {
      return;
    }

    this.isPrescribing = true;
    const meal = this.prescribeMealTarget;
    const date = this.dietDay.date;

    if (!this.prescribeIsMultiple) {
      const { customProducts, customRecipes } = this.alternativeToCustomEntries(
        this.prescribeAlternatives[0]
      );
      this.clientDetailApi
        .prescribeMeal(this.clientId, date, meal._id, {
          customProducts,
          customRecipes,
          merge: false,
        })
        .subscribe({
          next: () =>
            this.onPrescribeSuccess(`"${meal.name}" pautada para ${this.name}`),
          error: (err) => this.onPrescribeError(err),
        });
      return;
    }

    const alternatives = this.prescribeAlternatives.map((a) => ({
      label: a.label.trim(),
      ...this.alternativeToCustomEntries(a),
    }));
    this.clientDetailApi
      .proposeMealAlternatives(this.clientId, date, meal.name, alternatives)
      .subscribe({
        next: () =>
          this.onPrescribeSuccess(
            `${alternatives.length} alternativas propuestas para "${meal.name}"`
          ),
        error: (err) => this.onPrescribeError(err),
      });
  }

  // TAREA5 — cada alimento de una alternativa es SIEMPRE un producto o una
  // receta real (ver canSubmitPrescribe), nunca macros tecleadas a mano;
  // aquí solo se reparte en los dos arrays que espera el backend
  // (mealModel.pasteMeal trata ambos de forma uniforme).
  private alternativeToCustomEntries(alt: MealAlternativeInput): {
    customProducts: Record<string, unknown>[];
    customRecipes: Record<string, unknown>[];
  } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];

    for (const item of alt.items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          quantity: item.quantity || null,
        });
      } else if (item.productId) {
        customProducts.push({
          product: item.productId,
          quantity: item.quantity || 100,
        });
      }
    }

    return { customProducts, customRecipes };
  }

  private onPrescribeSuccess(message: string): void {
    this.isPrescribing = false;
    this.showPrescribePanel = false;
    this.prescribeMealTarget = null;
    this.ionicUtilService.showToast({ message, duration: 3000 });
    this.loadNutrition();
  }

  private onPrescribeError(err: any): void {
    this.isPrescribing = false;
    this.ionicUtilService.showErrorToast(
      err?.error?.message || 'No se pudo pautar la comida',
      'Error',
      3500
    );
  }

  public mealContentSummary(meal: {
    customProducts: unknown[];
    customRecipes: unknown[];
  }): string {
    const products = meal.customProducts?.length || 0;
    const recipes = meal.customRecipes?.length || 0;
    if (!products && !recipes) return 'Vacía';
    const parts: string[] = [];
    if (products)
      parts.push(`${products} producto${products === 1 ? '' : 's'}`);
    if (recipes) parts.push(`${recipes} receta${recipes === 1 ? '' : 's'}`);
    return parts.join(' · ');
  }

  public trackByTableId(_index: number, table: ClientTable): string {
    return table._id;
  }

  public trackByGoalId(_index: number, goal: NutritionalGoal): string {
    return goal._id;
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

  public togglePin(note: TrainerNote): void {
    const nextPinned = !note.pinned;
    this.clientDetailApi
      .setNotePinned(this.clientId, note._id, nextPinned)
      .subscribe({
        next: (updated) => {
          this.notes = this.notes
            .map((n) => (n._id === updated._id ? updated : n))
            .sort((a, b) => {
              if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            });
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

  public trackByNoteId(_index: number, note: TrainerNote): string {
    return note._id;
  }

  // --- Check-ins (F17) ---
  public loadCheckins(): void {
    this.checkinsState = 'loading';
    Promise.all([
      this.clientDetailApi.getCheckinConfig(this.clientId).toPromise(),
      this.clientDetailApi.getCheckinResponses(this.clientId).toPromise(),
    ])
      .then(([config, responses]) => {
        this.checkinConfig = config || null;
        this.checkinResponses = responses || [];
        this.checkinsState = 'loaded';
      })
      .catch(() => {
        this.checkinsState = 'error';
      });
  }

  // Fase 5 Coach Pro — las respuestas a preguntas propias del coach viajan
  // con la clave "custom:<id>", que no está en el catálogo: su enunciado se
  // busca en la configuración aplicada a ESTE cliente. Sin esto, el
  // histórico mostraría "custom:507f1f77bcf86cd799439011".
  public checkinFieldLabel(key: string): string {
    if (key.startsWith('custom:')) {
      const questionId = key.slice('custom:'.length);
      const question = (this.checkinConfig?.customQuestions || []).find(
        (q) => String(q._id) === questionId
      );
      return question?.label || 'Pregunta eliminada';
    }
    return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
  }

  // Un booleano crudo se leería como "true"/"false".
  public checkinValueLabel(value: number | string | boolean): string {
    if (value === true) return 'Sí';
    if (value === false) return 'No';
    return String(value);
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
    this.taskUnit = this.taskTypeOptions[0].defaultUnit;
  }

  public closeTaskPanel(): void {
    this.showTaskPanel = false;
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

  // --- F30: aplicar en bloque (reutiliza F11/F12/F13, nunca duplica su lógica) ---
  private async selectTargetClients(
    scope: ClientScope,
    title: string
  ): Promise<string[] | null> {
    const modal = await this.modalController.create({
      component: SelectClientsModalComponent,
      componentProps: {
        excludeClientId: this.clientId,
        requiredScope: scope,
        title,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data?.targetClientIds?.length) return null;
    return data.targetClientIds;
  }

  private showBulkResultToast(results: BulkApplyResult[]): void {
    const successCount = results.filter((r) => r.success).length;
    const total = results.length;
    if (successCount === total) {
      this.ionicUtilService.showToast({
        message: `Aplicado a ${successCount} de ${total} clientes`,
        duration: 3000,
      });
      return;
    }
    const failed = results.filter((r) => !r.success);
    this.ionicUtilService.showToast({
      message: `Aplicado a ${successCount} de ${total} clientes; ${failed.length} falló: ${failed[0].error}`,
      duration: 4500,
      color: 'warning',
    });
  }

  public async bulkApplyGoal(): Promise<void> {
    if (this.goalForm.invalid) {
      this.goalForm.markAllAsTouched();
      return;
    }
    const targetClientIds = await this.selectTargetClients(
      'nutrition',
      'Aplicar objetivos a otros clientes'
    );
    if (!targetClientIds) return;

    this.clientDetailApi
      .applyGoalToClients(this.clientId, this.goalForm.value, targetClientIds)
      .subscribe({
        next: (results) => {
          this.showBulkResultToast(results);
          this.showGoalPanel = false;
          this.loadNutrition();
        },
        error: () =>
          this.ionicUtilService.showErrorToast(
            'No se pudieron aplicar los objetivos en bloque',
            'Error',
            3000
          ),
      });
  }
}
