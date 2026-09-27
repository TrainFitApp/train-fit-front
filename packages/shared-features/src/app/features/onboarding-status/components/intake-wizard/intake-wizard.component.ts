import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import {
  IntakeCustomQuestion,
  IntakeFieldKey,
} from 'src/app/core/services/onboarding/onboarding.service';
import {
  DietaryFlag,
  EquipmentTag,
  IntakeSubmission,
  TrainingLocation,
} from '../../services/intake-api.service';
// Las MISMAS constantes que usa sign-up.page.ts — una sola fuente de verdad
// para pasos / actividad / frecuencia de entrenamiento / sexo.
import { STEPS, STEPS_TYPES, STEPS_VALUES } from 'src/app/shared/constants/steps';
import { ACTIVITY_FACTOR_VALUES } from 'src/app/shared/constants/activity-factor';
import { calculateTrainingValues } from 'src/app/shared/constants/training';
import { SEX_TYPES } from 'src/app/shared/constants/sex';
import { OBJETIVES_VALUES } from 'src/app/shared/constants/objetives';

const STEPS_NOT_COUNTED = STEPS[STEPS_TYPES.notCounted].value;

const SEX_OPTIONS: { value: number; label: string }[] = [
  { value: SEX_TYPES.female, label: 'Femenino' },
  { value: SEX_TYPES.male, label: 'Masculino' },
];

export type IntakeWizardResult = Omit<IntakeSubmission, 'trainerId'>;

export interface IntakeWizardPrefill {
  goals: string;
  healthConditions: string;
  experienceLevel: IntakeSubmission['experienceLevel'];
  availability: string;
  trainingLocation: TrainingLocation | null;
  equipmentTags: EquipmentTag[];
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: IntakeSubmission['cooksAtHome'];
  dietaryFlags: DietaryFlag[];
  // Perfil que el cliente metió al registrarse — el intake solo lo confirma.
  weight: number | null;
  height: number | null;
  sex: number | null;
  birth: string; // "YYYY-MM-DD"
  steps: number | null; // STEPS[x].value
  activity: number | null; // ACTIVITY_FACTOR[x].value
  training: number | null; // valor resuelto de calculateTrainingValues
  objective: number | null; // User.objetive (delta kcal con signo)
  customAnswers: Record<string, string>;
}

const EXPERIENCE_OPTIONS: { value: IntakeSubmission['experienceLevel']; label: string }[] = [
  { value: 'none', label: 'Sin experiencia' },
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

const COOKS_OPTIONS: { value: IntakeSubmission['cooksAtHome']; label: string }[] = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'A veces' },
];

const TRAINING_LOCATION_OPTIONS: { value: TrainingLocation; label: string }[] = [
  { value: 'gym', label: 'Gimnasio' },
  { value: 'home', label: 'Casa' },
  { value: 'outdoor', label: 'Exterior' },
  { value: 'mixed', label: 'Mixto' },
];

const DIETARY_FLAG_OPTIONS: { value: DietaryFlag; label: string }[] = [
  { value: 'vegan', label: 'Vegana' },
  { value: 'vegetarian', label: 'Vegetariana' },
  { value: 'lactoseFree', label: 'Sin lactosa' },
  { value: 'glutenFree', label: 'Sin gluten' },
];

const EQUIPMENT_TAG_OPTIONS: { value: EquipmentTag; label: string }[] = [
  { value: 'dumbbells', label: 'Mancuernas' },
  { value: 'barbell', label: 'Barra y discos' },
  { value: 'machines', label: 'Máquinas de gimnasio' },
  { value: 'bands', label: 'Bandas elásticas' },
  { value: 'kettlebells', label: 'Kettlebells' },
  { value: 'bench', label: 'Banco' },
  { value: 'pullup_bar', label: 'Barra de dominadas' },
  { value: 'none', label: 'Sin material' },
];

// Cuestionario inicial del entrenador, como wizard paso a paso — mismo
// patron que sign-up.page.ts (swiper + barra de progreso + auto-avance en
// seleccion unica), pero SIN reactive form: estos campos son todos
// opcionales (el backend no exige ninguno), asi que a diferencia de sign-up
// no hace falta bloquear "Siguiente" por validacion.
//
// Los pasos no son una lista fija: dependen de que campos activo el
// entrenador (enabledFields) mas sus preguntas de texto libre
// (customQuestions) — se recalculan en ngOnChanges cada vez que cambia el
// grupo (el cliente puede cerrar este wizard y abrir el de otro entrenador).
@Component({
  selector: 'app-intake-wizard',
  templateUrl: 'intake-wizard.component.html',
  styleUrls: ['intake-wizard.component.scss'],
})
export class IntakeWizardComponent implements OnChanges, AfterViewInit {
  @Input() public trainerName = '';
  @Input() public enabledFields: Set<IntakeFieldKey> = new Set();
  @Input() public customQuestions: IntakeCustomQuestion[] = [];
  @Input() public prefill: IntakeWizardPrefill | null = null;
  // El padre es quien hace la llamada HTTP real (mismo criterio que
  // isProcessing en sign-up.page.ts vive en el componente top-level): este
  // wizard solo refleja el estado para deshabilitar su propio boton/spinner.
  @Input() public isSubmitting = false;

  @Output() public submitted = new EventEmitter<IntakeWizardResult>();
  @Output() public cancelled = new EventEmitter<void>();

  @ViewChild('intakeSwiper')
  public swiperRef:
    | ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }>
    | undefined;

  private swiper: Swiper;

  public currentStep = 0;
  public existNext = true;
  public existPrev = false;

  public readonly experienceOptions = EXPERIENCE_OPTIONS;
  public readonly cooksOptions = COOKS_OPTIONS;
  public readonly trainingLocationOptions = TRAINING_LOCATION_OPTIONS;
  public readonly equipmentTagOptions = EQUIPMENT_TAG_OPTIONS;
  public readonly dietaryFlagOptions = DIETARY_FLAG_OPTIONS;
  public readonly sexOptions = SEX_OPTIONS;
  // Los `value` de STEPS/TRAINING están tipados como string en el origen pero
  // en realidad son números (igual que sign-up los trata) — se normalizan.
  public readonly stepsOptions: { name: string; value: number }[] = STEPS_VALUES.map((s) => ({
    name: s.name,
    value: Number(s.value),
  }));
  public readonly activityOptions = ACTIVITY_FACTOR_VALUES;
  public readonly stepsNotCounted = Number(STEPS_NOT_COUNTED);
  public trainingOptions: { name: string; value: number }[] = [];
  public readonly objectiveOptions = OBJETIVES_VALUES;

  public goals = '';
  public healthConditions = '';
  public experienceLevel: IntakeSubmission['experienceLevel'] = null;
  public availability = '';
  public trainingLocation: TrainingLocation | null = null;
  public equipmentTags: EquipmentTag[] = [];
  public allergies = '';
  public favoriteFoods = '';
  public dislikedFoods = '';
  public cooksAtHome: IntakeSubmission['cooksAtHome'] = null;
  public dietaryFlags: DietaryFlag[] = [];
  public weight: number | null = null;
  public height: number | null = null;
  public sex: number | null = null;
  public birth = '';
  public steps: number | null = null;
  public activity: number | null = null;
  public training: number | null = null;
  public objective: number | null = null;
  public customAnswers: Record<string, string> = {};

  private stepIds: string[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['prefill']) {
      this.applyPrefill();
    }
    // Tras el prefill: los pasos que traiga deciden si hay paso de actividad.
    if (changes['enabledFields'] || changes['customQuestions'] || changes['prefill']) {
      this.stepIds = this.buildStepOrder();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.swiperReady());
  }

  private applyPrefill(): void {
    const p = this.prefill;
    this.goals = p?.goals || '';
    this.healthConditions = p?.healthConditions || '';
    this.experienceLevel = p?.experienceLevel ?? null;
    this.availability = p?.availability || '';
    this.trainingLocation = p?.trainingLocation ?? null;
    this.equipmentTags = p?.equipmentTags ? [...p.equipmentTags] : [];
    this.allergies = p?.allergies || '';
    this.favoriteFoods = p?.favoriteFoods || '';
    this.dislikedFoods = p?.dislikedFoods || '';
    this.cooksAtHome = p?.cooksAtHome ?? null;
    this.dietaryFlags = p?.dietaryFlags ? [...p.dietaryFlags] : [];
    this.weight = p?.weight ?? null;
    this.height = p?.height ?? null;
    this.sex = p?.sex ?? null;
    this.birth = p?.birth || '';
    this.steps = p?.steps ?? null;
    this.activity = p?.activity ?? null;
    this.training = p?.training ?? null;
    this.objective = p?.objective ?? null;
    this.updateTrainingOptions();
    this.customAnswers = { ...(p?.customAnswers || {}) };
  }

  // Mismo orden que tenia el formulario de una sola pantalla (para no
  // reordenar preguntas que el trainer y el cliente ya conocen). "equipment"
  // activa DOS pasos (lugar de entreno + equipamiento): en la pantalla unica
  // eran dos bloques bajo la misma clave, aqui cada uno es su propia
  // pregunta.
  private buildStepOrder(): string[] {
    const ids: string[] = [];
    if (this.enabledFields.has('profileBiometrics')) ids.push('profileBiometrics');
    if (this.enabledFields.has('activityProfile')) {
      ids.push('steps');
      // Mismo *ngIf que su swiper-slide: solo si no cuenta pasos.
      if (this.steps === STEPS_NOT_COUNTED) ids.push('activity');
      ids.push('trainingFreq');
    }
    if (this.enabledFields.has('objective')) ids.push('objective');
    if (this.enabledFields.has('goals')) ids.push('goals');
    if (this.enabledFields.has('healthConditions')) ids.push('healthConditions');
    if (this.enabledFields.has('experienceLevel')) ids.push('experienceLevel');
    if (this.enabledFields.has('availability')) ids.push('availability');
    if (this.enabledFields.has('equipment')) {
      ids.push('trainingLocation');
      ids.push('equipmentTags');
    }
    if (this.enabledFields.has('allergies')) ids.push('allergies');
    if (this.enabledFields.has('favoriteFoods')) ids.push('favoriteFoods');
    if (this.enabledFields.has('dislikedFoods')) ids.push('dislikedFoods');
    if (this.enabledFields.has('cooksAtHome')) ids.push('cooksAtHome');
    if (this.enabledFields.has('dietaryFlags')) ids.push('dietaryFlags');
    this.customQuestions.forEach((q) => ids.push(`custom:${q.id}`));
    return ids;
  }

  public get stepCount(): number {
    return this.stepIds.length;
  }

  public get stepProgressPercent(): number {
    if (this.stepCount <= 1) return 100;
    return (this.currentStep / (this.stepCount - 1)) * 100;
  }

  public get isLastStep(): boolean {
    return this.currentStep >= this.stepCount - 1;
  }

  // Como en el registro: sin contar pasos, la actividad es lo único que
  // estima el gasto diario, así que no se puede saltar.
  public get isActivityMissing(): boolean {
    return this.stepIds[this.currentStep] === 'activity' && this.activity === null;
  }

  public trackByStepId(_index: number, id: string): string {
    return id;
  }

  public trackByQuestionId(_index: number, question: IntakeCustomQuestion): string {
    return question.id;
  }

  public customAnswerFor(questionId: string): string {
    return this.customAnswers[questionId] || '';
  }

  public setCustomAnswer(questionId: string, value: string): void {
    this.customAnswers[questionId] = value;
  }

  private swiperReady(): void {
    const swiperEl = Object.assign(this.swiperRef?.nativeElement, {
      allowTouchMove: false,
    });
    swiperEl.initialize();

    this.swiper = this.swiperRef?.nativeElement.swiper;
    this.swiper.on('slideChange', () => this.checkNextAndPrev());
  }

  private checkNextAndPrev(): void {
    const activeIndex = this.swiper.activeIndex;
    this.currentStep = activeIndex;
    this.existNext = activeIndex < this.swiper.slides.length - 1;
    this.existPrev = activeIndex > 0;
  }

  public nextStep(): void {
    this.swiper?.slideNext();
  }

  public prevStep(): void {
    this.swiper?.slidePrev();
  }

  public handleBack(): void {
    if (this.existPrev) {
      this.prevStep();
    } else {
      this.cancelled.emit();
    }
  }

  // Mismo criterio que autoAdvanceAfterSelection en sign-up.page.ts: solo
  // para pasos de seleccion unica sin nada mas que interactuar debajo.
  // equipmentTags (multi-select) queda fuera a proposito.
  public selectSingleChip<T>(setter: (value: T) => void, value: T): void {
    setter(value);
    const stepAtSelection = this.currentStep;
    setTimeout(() => {
      if (this.currentStep === stepAtSelection) {
        this.nextStep();
      }
    }, 420);
  }

  public selectExperience(value: IntakeSubmission['experienceLevel']): void {
    this.selectSingleChip((v) => (this.experienceLevel = v), value);
  }

  public selectTrainingLocation(value: TrainingLocation): void {
    this.selectSingleChip((v) => (this.trainingLocation = v), value);
  }

  public selectCooksAtHome(value: IntakeSubmission['cooksAtHome']): void {
    this.selectSingleChip((v) => (this.cooksAtHome = v), value);
  }

  public toggleEquipmentTag(tag: EquipmentTag): void {
    this.equipmentTags = this.equipmentTags.includes(tag)
      ? this.equipmentTags.filter((t) => t !== tag)
      : [...this.equipmentTags, tag];
  }

  public toggleDietaryFlag(flag: DietaryFlag): void {
    this.dietaryFlags = this.dietaryFlags.includes(flag)
      ? this.dietaryFlags.filter((f) => f !== flag)
      : [...this.dietaryFlags, flag];
  }

  private updateTrainingOptions(): void {
    const step = this.steps ?? Number(STEPS[STEPS_TYPES.between2000And6000].value);
    const values = calculateTrainingValues(step);
    this.trainingOptions = values
      ? Object.values(values).map((t) => ({ name: t.name, value: Number(t.value) }))
      : [];
  }

  public selectSex(value: number): void {
    this.selectSingleChip((v) => (this.sex = v), value);
  }

  // Igual que sign-up: al cambiar los pasos se resetea la frecuencia (las
  // opciones cambian) y la actividad solo aplica si "no cuenta pasos" (su
  // paso aparece o desaparece: se recalcula el orden).
  public selectSteps(value: number): void {
    this.steps = value;
    if (value !== STEPS_NOT_COUNTED) this.activity = null;
    this.training = null;
    this.updateTrainingOptions();
    this.stepIds = this.buildStepOrder();
    this.selectSingleChip(() => {}, value);
  }

  public selectActivity(value: number): void {
    this.selectSingleChip((v) => (this.activity = v), value);
  }

  public selectTraining(value: number): void {
    this.selectSingleChip((v) => (this.training = v), value);
  }

  // El registro guarda los kcal que ajustó el cliente (deslizador de 50 a
  // 500, p. ej. −200), no el valor fijo de cada opción (±300): la opción se
  // marca por la dirección (signo), no por igualdad exacta.
  public isObjectiveSelected(optionValue: number): boolean {
    return this.objective !== null && Math.sign(this.objective) === Math.sign(optionValue);
  }

  // Confirmar la misma dirección conserva su cifra del registro; solo al
  // cambiar de dirección se toma el valor por defecto de la opción.
  public selectObjective(value: number): void {
    const next = this.isObjectiveSelected(value) ? this.objective! : value;
    this.selectSingleChip((v) => (this.objective = v), next);
  }

  public submit(): void {
    if (this.isSubmitting) return;

    const customAnswers = this.customQuestions.map((q) => ({
      questionId: q.id,
      label: q.label,
      value: (this.customAnswers[q.id] || '').trim(),
    }));

    this.submitted.emit({
      goals: this.goals.trim(),
      healthConditions: this.healthConditions.trim(),
      experienceLevel: this.experienceLevel,
      availability: this.availability.trim(),
      trainingLocation: this.trainingLocation,
      equipmentTags: this.equipmentTags,
      allergies: this.allergies.trim(),
      favoriteFoods: this.favoriteFoods.trim(),
      dislikedFoods: this.dislikedFoods.trim(),
      cooksAtHome: this.cooksAtHome,
      dietaryFlags: this.dietaryFlags,
      weight: this.weight,
      height: this.height,
      sex: this.sex,
      birth: this.birth || null,
      steps: this.steps,
      activity: this.steps === STEPS_NOT_COUNTED ? this.activity : null,
      training: this.training,
      objetive: this.objective,
      customAnswers,
    });
  }
}
