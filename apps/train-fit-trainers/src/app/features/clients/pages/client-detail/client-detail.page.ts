import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from './services/client-detail-api.service';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';
import { SelectClientsModalComponent } from '../../components/select-clients-modal/select-clients-modal.component';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../shared/components/product-search-modal/product-search-modal.component';
import { ApplyDietTemplateModalComponent } from '../../components/apply-diet-template-modal/apply-diet-template-modal.component';
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
type RoutineAssignMode = 'new' | 'template';

@Component({
  selector: 'app-client-detail',
  templateUrl: 'client-detail.page.html',
  styleUrls: ['client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {
  public clientId = '';
  public name = '';
  public scopes: ClientScope[] = [];
  public activeTab: ClientDetailTab = 'training';

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
  public routineMode: RoutineAssignMode = 'new';
  public routineForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  public availableTemplates: ClientTable[] = [];
  public templatesLoaded = false;
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';
    this.name = this.route.snapshot.queryParamMap.get('name') || 'Cliente';
    const rawScopes = this.route.snapshot.queryParamMap.get('scopes') || '';
    this.scopes = rawScopes
      .split(',')
      .filter((s): s is ClientScope => s === 'training' || s === 'nutrition');

    this.activeTab = this.scopes[0] || 'training';

    if (this.scopes.includes('training')) this.loadTraining();
    if (this.scopes.includes('nutrition')) this.loadNutrition();
    this.loadNotes();
    this.loadCheckins();
    this.loadPayments();
    this.loadTasks();
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
        this.tables = tables || [];
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
    this.routineMode = 'new';
    this.routineForm.reset({ name: '' });
    if (!this.templatesLoaded) {
      this.clientDetailApi.getAvailableTemplates(this.clientId).subscribe((templates) => {
        this.availableTemplates = templates || [];
        this.templatesLoaded = true;
      });
    }
  }

  public closeRoutinePanel(): void {
    this.showRoutinePanel = false;
  }

  public setRoutineMode(mode: RoutineAssignMode): void {
    this.routineMode = mode;
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
        this.router.navigate(['clients', this.clientId, 'tables', table._id, 'mesocycle']);
      },
      error: (err) => this.onRoutineAssignError(err),
    });
  }

  public openRoutineBuilder(table: ClientTable): void {
    this.router.navigate(['clients', this.clientId, 'tables', table._id, 'mesocycle']);
  }

  public assignTemplate(template: ClientTable): void {
    if (this.isAssigningRoutine) return;
    this.isAssigningRoutine = true;
    this.clientDetailApi.assignTemplateRoutine(this.clientId, template._id).subscribe({
      next: () => this.onRoutineAssigned(template.name),
      error: (err) => this.onRoutineAssignError(err),
    });
  }

  private onRoutineAssigned(name: string): void {
    this.isAssigningRoutine = false;
    this.showRoutinePanel = false;
    this.ionicUtilService.showToast({
      message: `Rutina "${name}" asignada a ${this.name}`,
      duration: 3000,
    });
    this.loadTraining();
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

    const days = data.appliedDays?.length || 0;
    this.ionicUtilService.showToast({
      message: `Plantilla aplicada: ${days} día${days === 1 ? '' : 's'} para ${this.name}`,
      duration: 3000,
    });
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

  private emptyFoodItem(): MealFoodItemInput {
    return { kcal: null, proteinG: null, carbsG: null, fatG: null };
  }

  private emptyAlternative(): MealAlternativeInput {
    return { label: '', items: [this.emptyFoodItem()] };
  }

  public addAlternative(): void {
    if (this.prescribeAlternatives.length >= this.maxAlternatives) return;
    this.prescribeAlternatives.push(this.emptyAlternative());
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

  // TAREA1 — sustituye la introducción manual de macros por un alimento real
  // de la biblioteca (mismo ProductAPIService.searchProduct que usa el resto
  // de la app), sin acoplarse al DietDayService/MealService del cliente logueado.
  public async openProductSearch(altIndex: number, itemIndex: number): Promise<void> {
    const modal = await this.modalController.create({ component: ProductSearchModalComponent });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || !data) return;

    const item = this.prescribeAlternatives[altIndex].items[itemIndex];
    item.productId = data.product._id;
    item.productName = data.product.name;
    item.quantity = data.quantity;
    item.kcal = data.product.energyKcal100g || 0;
    item.proteinG = data.product.protein100g || 0;
    item.carbsG = data.product.carbohydrates100g || 0;
    item.fatG = data.product.fat100g || 0;
  }

  public clearProduct(altIndex: number, itemIndex: number): void {
    const item = this.prescribeAlternatives[altIndex].items[itemIndex];
    item.productId = undefined;
    item.productName = undefined;
    item.quantity = undefined;
    item.kcal = null;
    item.proteinG = null;
    item.carbsG = null;
    item.fatG = null;
  }

  public get prescribeIsMultiple(): boolean {
    return this.prescribeAlternatives.length >= 2;
  }

  public get canSubmitPrescribe(): boolean {
    if (!this.prescribeAlternatives.length) return false;
    return this.prescribeAlternatives.every(
      (a) =>
        a.items.length > 0 &&
        a.items.every((item) => item.kcal !== null && item.kcal >= 0) &&
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
      const customProducts = this.alternativeToCustomProducts(this.prescribeAlternatives[0]);
      this.clientDetailApi
        .prescribeMeal(this.clientId, date, meal._id, { customProducts, customRecipes: [], merge: false })
        .subscribe({
          next: () => this.onPrescribeSuccess(`"${meal.name}" pautada para ${this.name}`),
          error: (err) => this.onPrescribeError(err),
        });
      return;
    }

    const alternatives = this.prescribeAlternatives.map((a) => ({
      label: a.label.trim(),
      customProducts: this.alternativeToCustomProducts(a),
    }));
    this.clientDetailApi.proposeMealAlternatives(this.clientId, date, meal.name, alternatives).subscribe({
      next: () =>
        this.onPrescribeSuccess(`${alternatives.length} alternativas propuestas para "${meal.name}"`),
      error: (err) => this.onPrescribeError(err),
    });
  }

  private alternativeToCustomProducts(alt: MealAlternativeInput): Record<string, unknown>[] {
    return alt.items.map((item) => {
      const base = {
        energyKcal100g: item.kcal || 0,
        protein100g: item.proteinG || 0,
        carbohydrates100g: item.carbsG || 0,
        fat100g: item.fatG || 0,
      };
      // TAREA1: con un alimento real seleccionado, kcal/proteinG/etc ya son
      // valores por 100g y quantity es la cantidad real elegida por el
      // profesional; sin alimento real se mantiene el comportamiento previo
      // (quantity fija a 100, macros introducidas a mano como si fueran totales).
      if (item.productId) {
        return { ...base, product: item.productId, quantity: item.quantity || 100 };
      }
      return { ...base, quantity: 100 };
    });
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

  public async bulkApplyRoutine(template: ClientTable): Promise<void> {
    const targetClientIds = await this.selectTargetClients(
      'training',
      `Aplicar "${template.name}" a otros clientes`
    );
    if (!targetClientIds) return;

    this.clientDetailApi.applyRoutineToClients(template._id, targetClientIds).subscribe({
      next: (results) => this.showBulkResultToast(results),
      error: () =>
        this.ionicUtilService.showErrorToast('No se pudo aplicar la rutina en bloque', 'Error', 3000),
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

    const customProducts = this.alternativeToCustomProducts(this.prescribeAlternatives[0]);
    this.clientDetailApi
      .applyMealToClients(
        this.clientId,
        date,
        meal.name,
        { customProducts, customRecipes: [], merge: false },
        targetClientIds
      )
      .subscribe({
        next: (results) => this.showBulkResultToast(results),
        error: () =>
          this.ionicUtilService.showErrorToast('No se pudo aplicar la comida en bloque', 'Error', 3000),
      });
  }
}
