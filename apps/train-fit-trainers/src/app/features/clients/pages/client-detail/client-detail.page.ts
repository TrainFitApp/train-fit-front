import { Component, DestroyRef, HostListener, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from './services/client-detail-api.service';
import { TrainerClientsApiService } from '../../services/trainer-clients-api.service';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';
import { SelectClientsModalComponent } from '../../components/select-clients-modal/select-clients-modal.component';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../shared/components/product-search-modal/product-search-modal.component';
import { ApplyDietTemplateModalComponent } from '../../components/apply-diet-template-modal/apply-diet-template-modal.component';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { DietException, PlanAssignment } from '../../../../shared/models/plan-assignment.model';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { TableService } from 'src/app/core/services/table/table.service';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import {
  AdherenceSummary,
  AnthropometryEntry,
  BulkApplyResult,
  CheckinConfig,
  CheckinResponseEntry,
  ClientDetailTab,
  ClientNutritionPreferences,
  ClientScope,
  ClientTable,
  CompletedWorkoutEntry,
  DietDaySummary,
  MealAlternativeInput,
  MealFoodItemInput,
  MealSummary,
  NutritionalGoal,
  TrainerNote,
  TrainerPayment,
  TrainerTask,
  TrainerTaskType,
} from './models/client-detail.model';

type SectionState = 'loading' | 'error' | 'loaded';

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
  public readonly taskTypeOptions: { value: TrainerTaskType; label: string; defaultUnit: string }[] = [
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
  public expandedTableId: string | null = null;
  public showRoutinePanel = false;
  public routineForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  public isAssigningRoutine = false;

  // --- Nutrición ---
  public nutritionState: SectionState = 'loading';
  public nutritionDate: string = new Date().toISOString().slice(0, 10);
  public dietDay: DietDaySummary | null = null;
  public goals: NutritionalGoal[] = [];
  public adherence: AdherenceSummary | null = null;
  public showGoalPanel = false;
  public goalForm: FormGroup = new FormGroup({
    name: new FormControl('Objetivo asignado', Validators.required),
    kcalTotal: new FormControl(null, [Validators.required, Validators.min(1)]),
    proteinsGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
    carbohydratesGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
    fatGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
  });
  public isAssigningGoal = false;
  public isRevoking = false;

  // --- Preferencias nutricionales (F29, transversal a nutrición) ---
  public nutritionPreferences: ClientNutritionPreferences | null = null;
  public isRequestingPreferences = false;

  // --- Pautar comida (F12/F28) ---
  public showPrescribePanel = false;
  public prescribeMealTarget: MealSummary | null = null;
  public prescribeAlternatives: MealAlternativeInput[] = [];
  public isPrescribing = false;
  public readonly maxAlternatives = 4;
  public readonly maxFoodItemsPerAlternative = 8;

  // Auditoría de arquitectura (nutrición, Fase 8) — plan vigente del cliente,
  // resuelto vía PlanAssignment en vez de inferido de los DietDay ya escritos.
  public activePlan: PlanAssignment | null = null;
  public isCreatingException = false;

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
    private trainerClientsApi: TrainerClientsApiService
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

    this.route.paramMap.pipe(skip(1), takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
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
        this.name = match.user ? `${match.user.name} ${match.user.lastname}`.trim() : 'Cliente';
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
    this.activeTab = this.scopes[0] || 'training';

    if (this.scopes.includes('training')) this.loadTraining();
    if (this.scopes.includes('nutrition')) this.loadNutrition();
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
    return new Date(createdAt).getTime() < new Date(this.previousRelationCutoff).getTime();
  }

  public selectTab(tab: ClientDetailTab): void {
    this.activeTab = tab;
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
        this.tables = (tables || []).filter((t) => t.assignedByTrainerId === trainerId);
        this.latestWeight = (weights && weights[0]) || null;
        this.computeCompletedWorkouts();
        this.trainingState = 'loaded';
      })
      .catch(() => {
        this.trainingState = 'error';
      });
  }

  // F09 — detalle de rutina en modo lectura: expandir/colapsar splits/workouts
  // de una tabla concreta, sin navegar a otra pantalla.
  public toggleTableExpand(table: ClientTable): void {
    this.expandedTableId = this.expandedTableId === table._id ? null : table._id;
  }

  public workoutDuration(workout: { startedAt?: Date | null; date?: Date | null }): string | null {
    if (!workout.startedAt || !workout.date) return null;
    const ms = new Date(workout.date).getTime() - new Date(workout.startedAt).getTime();
    if (ms <= 0) return null;
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  public setDescription(exercise: { sets?: { reps?: number; weight?: number; doned?: boolean }[] }): string {
    const sets = exercise.sets || [];
    const doneSets = sets.filter((s) => s.doned);
    if (!doneSets.length) return 'Sin series realizadas';
    return doneSets
      .map((s) => (s.weight != null ? `${s.reps ?? '-'}×${s.weight}kg` : `${s.reps ?? '-'} reps`))
      .join(' · ');
  }

  // TAREA 2 (coach-tab) — "prescrito vs. realizado": lo pautado por el
  // entrenador para este ejercicio, reutilizando el mismo dato ya cargado
  // (expectedReps/expectedRir de cada Set, sin llamada nueva al backend).
  public expectedDescription(exercise: { sets?: { expectedReps?: number[]; expectedRir?: number[] }[] }): string {
    const sets = exercise.sets || [];
    const withExpected = sets.filter((s) => s.expectedReps?.length);
    if (!withExpected.length) return 'Sin prescripción';
    return withExpected
      .map((s) => {
        const reps = (s.expectedReps || []).join('/');
        const rir = (s.expectedRir || []).map((r) => (r === -1 ? 'F' : r)).join('/');
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
          entries.push({ ...workout, tableName: table.name, splitName: split.name || '' });
        }
      }
    }
    this.completedWorkouts = entries.sort(
      (a, b) => new Date(b.date as Date).getTime() - new Date(a.date as Date).getTime()
    );
  }

  public trackByWorkoutId(_index: number, workout: CompletedWorkoutEntry): string {
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
  public async openPlanner(table: ClientTable): Promise<void> {
    await this.router.navigate(['/tabs', 'clients', this.clientId, 'tables', table._id, 'planner']);
  }

  // TASK-007 — mismo patrón que openPlanner: ruta completa +
  // TableInContextResolver siembra la tabla del cliente antes de activar.
  public async openStatistics(table: ClientTable): Promise<void> {
    await this.router.navigate(['clients', this.clientId, 'tables', table._id, 'statistics']);
  }

  // TASK-019 (MASTER_BACKLOG.md) — antes no existía forma de eliminar una
  // rutina completa ya asignada, solo vaciarla split a split a mano.
  public async confirmDeleteTable(table: ClientTable, event: Event): Promise<void> {
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
            this.clientDetailApi.deleteTable(this.clientId, table._id).subscribe({
              next: () => {
                this.tables = this.tables.filter((t) => t._id !== table._id);
                if (this.expandedTableId === table._id) this.expandedTableId = null;
                this.ionicUtilService.showToast({ message: 'Rutina borrada', duration: 1500 });
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
    Promise.all([
      this.clientDetailApi.getDiet(this.clientId, date).toPromise(),
      this.clientDetailApi.getNutritionalGoals(this.clientId).toPromise(),
    ])
      .then(([dietDay, goals]) => {
        this.dietDay = dietDay || null;
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

    // F29 — no bloquea el resto de la sección si falla, es un widget aparte.
    this.clientDetailApi.getNutritionPreferences(this.clientId).subscribe({
      next: (preferences) => (this.nutritionPreferences = preferences),
      error: () => (this.nutritionPreferences = null),
    });

    void this.loadActivePlan();
  }

  // Auditoría de arquitectura (nutrición, Fase 8)
  public loadActivePlan(): Promise<void> {
    return this.planAssignmentApi
      .getActive(this.clientId)
      .toPromise()
      .then((plan) => {
        this.activePlan = plan || null;
      })
      .catch(() => {
        this.activePlan = null;
      });
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

  public async createExceptionForToday(): Promise<void> {
    if (!this.activePlan || this.isCreatingException) return;
    await this.ionicUtilService.showAlert({
      header: `¿Marcar ${this.nutritionDateLabel} como excepción?`,
      message: 'Ese día concreto queda vacío (sin comidas del plan), sin tocar el resto de la planificación.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Marcar excepción',
          handler: () => {
            this.isCreatingException = true;
            this.planAssignmentApi
              .createException(this.clientId, { date: this.nutritionDate, action: 'skip' })
              .subscribe({
                next: () => {
                  this.isCreatingException = false;
                  this.ionicUtilService.showToast({ message: 'Excepción guardada para ese día', duration: 2000 });
                  this.loadNutrition();
                },
                error: () => {
                  this.isCreatingException = false;
                  this.ionicUtilService.showErrorToast('No se pudo guardar la excepción', 'Error', 3000);
                },
              });
          },
        },
      ],
    });
  }

  public changeNutritionDate(deltaDays: number): void {
    const current = new Date(`${this.nutritionDate}T00:00:00.000Z`);
    current.setUTCDate(current.getUTCDate() + deltaDays);
    this.loadNutrition(current.toISOString().slice(0, 10));
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
    return !!this.nutritionPreferences?.requestedAt && !this.nutritionPreferences?.respondedAt;
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

  public openGoalPanel(): void {
    this.showGoalPanel = true;
    this.goalForm.reset({
      name: 'Objetivo asignado',
      kcalTotal: null,
      proteinsGTotal: null,
      carbohydratesGTotal: null,
      fatGTotal: null,
    });
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
    this.clientDetailApi.assignNutritionalGoal(this.clientId, this.goalForm.value).subscribe({
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

  // Replanteamiento MVP (nutrición) — aplicar una plantilla de dieta ya
  // construida a este cliente, eligiendo solo la fecha de inicio.
  public async openApplyTemplateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ApplyDietTemplateModalComponent,
      componentProps: { clientId: this.clientId, clientName: this.name },
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
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
    if (!this.showPrescribePanel || !this.prescribeAlternatives.length) return;
    event.preventDefault();

    for (let altIndex = 0; altIndex < this.prescribeAlternatives.length; altIndex++) {
      const alt = this.prescribeAlternatives[altIndex];
      const itemIndex = alt.items.findIndex((item) => !item.productId && !item.recipeId);
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

  public addAlternative(): void {
    if (this.prescribeAlternatives.length >= this.maxAlternatives) return;
    this.prescribeAlternatives.push(this.emptyAlternative());
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
  public async openProductSearch(altIndex: number, itemIndex: number): Promise<void> {
    const outerModal = await this.modalController.create({
      component: SearchFoodsPage,
      componentProps: {
        trainerContext: this.buildSearchFoodsTrainerContext(altIndex, itemIndex, () =>
          void outerModal.dismiss()
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
      clientUser: { _id: this.clientId, name: this.name, dietInUse: this.dietDay?.dietId } as any,
      dietDay: (this.dietDay || {}) as any,
      meal: (this.prescribeMealTarget || {}) as any,
      confirmSelection: (items) => this.applyTrainerSelection(altIndex, itemIndex, items),
      pickCreateProduct: () =>
        void this.confirmPickedFood(altIndex, itemIndex, { kind: 'create' }, closeOuter),
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
    if (!this.canSubmitPrescribe || this.isPrescribing || !this.prescribeMealTarget || !this.dietDay) {
      return;
    }

    this.isPrescribing = true;
    const meal = this.prescribeMealTarget;
    const date = this.dietDay.date;

    if (!this.prescribeIsMultiple) {
      const { customProducts, customRecipes } = this.alternativeToCustomEntries(this.prescribeAlternatives[0]);
      this.clientDetailApi
        .prescribeMeal(this.clientId, date, meal._id, { customProducts, customRecipes, merge: false })
        .subscribe({
          next: () => this.onPrescribeSuccess(`"${meal.name}" pautada para ${this.name}`),
          error: (err) => this.onPrescribeError(err),
        });
      return;
    }

    const alternatives = this.prescribeAlternatives.map((a) => ({
      label: a.label.trim(),
      ...this.alternativeToCustomEntries(a),
    }));
    this.clientDetailApi.proposeMealAlternatives(this.clientId, date, meal.name, alternatives).subscribe({
      next: () =>
        this.onPrescribeSuccess(`${alternatives.length} alternativas propuestas para "${meal.name}"`),
      error: (err) => this.onPrescribeError(err),
    });
  }

  // TAREA5 — cada alimento de una alternativa es SIEMPRE un producto o una
  // receta real (ver canSubmitPrescribe), nunca macros tecleadas a mano;
  // aquí solo se reparte en los dos arrays que espera el backend
  // (mealModel.pasteMeal trata ambos de forma uniforme).
  private alternativeToCustomEntries(
    alt: MealAlternativeInput
  ): { customProducts: Record<string, unknown>[]; customRecipes: Record<string, unknown>[] } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];

    for (const item of alt.items) {
      if (item.recipeId) {
        customRecipes.push({ recipe: item.recipeId, quantity: item.quantity || null });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, quantity: item.quantity || 100 });
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
    this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo pautar la comida', 'Error', 3500);
  }

  public mealContentSummary(meal: { customProducts: unknown[]; customRecipes: unknown[] }): string {
    const products = meal.customProducts?.length || 0;
    const recipes = meal.customRecipes?.length || 0;
    if (!products && !recipes) return 'Vacía';
    const parts: string[] = [];
    if (products) parts.push(`${products} producto${products === 1 ? '' : 's'}`);
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
        this.activeTab = this.scopes[0];
        this.ionicUtilService.showToast({
          message: `Relación de ${scope === 'training' ? 'entrenamiento' : 'nutrición'} finalizada`,
          duration: 3000,
        });
      },
      error: () => {
        this.isRevoking = false;
        this.ionicUtilService.showErrorToast('No se pudo finalizar la relación', 'Error', 3000);
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
    this.clientDetailApi.setNotePinned(this.clientId, note._id, nextPinned).subscribe({
      next: (updated) => {
        this.notes = this.notes
          .map((n) => (n._id === updated._id ? updated : n))
          .sort((a, b) => {
            if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
      },
      error: () => {
        this.ionicUtilService.showErrorToast('No se pudo actualizar la nota', 'Error', 2500);
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

  public checkinFieldLabel(key: string): string {
    return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
  }

  public checkinValueEntries(response: CheckinResponseEntry): { key: string; value: number }[] {
    return Object.entries(response.values).map(([key, value]) => ({ key, value }));
  }

  public trackByResponseId(_index: number, response: CheckinResponseEntry): string {
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
    if (!this.paymentAmount || this.paymentAmount <= 0 || !this.paymentDueDate || this.isSavingPayment) {
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
  private async schedulePaymentReminder(payment: TrainerPayment): Promise<void> {
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
            body: `Recuerda cobrar a ${this.name}: ${payment.amount}${payment.currency === 'EUR' ? '€' : payment.currency}`,
            schedule: { at: new Date(payment.dueDate), allowWhileIdle: true },
          },
        ],
      });
    } catch (e) {
      console.warn('[F26] No se pudo programar el recordatorio local', e);
    }
  }

  public togglePaymentPaid(payment: TrainerPayment): void {
    this.clientDetailApi.setPaymentPaid(this.clientId, payment._id, !payment.paidAt).subscribe({
      next: (updated) => {
        this.payments = this.payments.map((p) => (p._id === updated._id ? updated : p));
      },
      error: () => {
        this.ionicUtilService.showErrorToast('No se pudo actualizar el cobro', 'Error', 2500);
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
    if (!this.taskTarget || this.taskTarget <= 0 || !this.taskUnit.trim() || this.isSavingTask) return;
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
            err?.error?.message || 'No se pudo crear la tarea',
            'Error',
            3000
          );
        },
      });
  }

  public async confirmDeactivateTask(task: TrainerTask): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Quitar tarea',
      message: `¿Seguro que quieres dejar de asignar "${this.taskDisplayLabel(task)}"? El historial de cumplimiento ya registrado se conserva.`,
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
        this.ionicUtilService.showErrorToast('No se pudo quitar la tarea', 'Error', 2500);
      },
    });
  }

  public taskDisplayLabel(task: TrainerTask): string {
    if (task.type === 'custom') return task.label || 'Tarea';
    return this.taskTypeOptions.find((o) => o.value === task.type)?.label || task.type;
  }

  public trackByTaskId(_index: number, task: TrainerTask): string {
    return task._id;
  }

  // --- F30: aplicar en bloque (reutiliza F11/F12/F13, nunca duplica su lógica) ---
  private async selectTargetClients(scope: ClientScope, title: string): Promise<string[] | null> {
    const modal = await this.modalController.create({
      component: SelectClientsModalComponent,
      componentProps: { excludeClientId: this.clientId, requiredScope: scope, title },
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
    const targetClientIds = await this.selectTargetClients('nutrition', 'Aplicar objetivos a otros clientes');
    if (!targetClientIds) return;

    this.clientDetailApi.applyGoalToClients(this.clientId, this.goalForm.value, targetClientIds).subscribe({
      next: (results) => {
        this.showBulkResultToast(results);
        this.showGoalPanel = false;
        this.loadNutrition();
      },
      error: () =>
        this.ionicUtilService.showErrorToast('No se pudieron aplicar los objetivos en bloque', 'Error', 3000),
    });
  }

  public async bulkApplyPrescribedMeal(): Promise<void> {
    if (this.prescribeIsMultiple || !this.canSubmitPrescribe || !this.prescribeMealTarget || !this.dietDay) {
      return;
    }
    const meal = this.prescribeMealTarget;
    const date = this.dietDay.date;
    const targetClientIds = await this.selectTargetClients(
      'nutrition',
      `Aplicar "${meal.name}" a otros clientes`
    );
    if (!targetClientIds) return;

    const { customProducts, customRecipes } = this.alternativeToCustomEntries(this.prescribeAlternatives[0]);
    this.clientDetailApi
      .applyMealToClients(
        this.clientId,
        date,
        meal.name,
        { customProducts, customRecipes, merge: false },
        targetClientIds
      )
      .subscribe({
        next: (results) => this.showBulkResultToast(results),
        error: () =>
          this.ionicUtilService.showErrorToast('No se pudo aplicar la comida en bloque', 'Error', 3000),
      });
  }
}
