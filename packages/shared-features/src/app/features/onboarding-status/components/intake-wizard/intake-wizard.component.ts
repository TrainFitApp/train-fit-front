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
import { CustomAnswerValue, CustomQuestion, FREQUENCY_OPTIONS } from 'src/app/core/models/custom-question';

const STEPS_NOT_COUNTED = STEPS[STEPS_TYPES.notCounted].value;

const SEX_OPTIONS: { value: number; label: string }[] = [
  { value: SEX_TYPES.female, label: 'INTAKE.SEX.FEMALE' },
  { value: SEX_TYPES.male, label: 'INTAKE.SEX.MALE' },
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
  customAnswers: Record<string, CustomAnswerValue>;
}

const EXPERIENCE_OPTIONS: { value: IntakeSubmission['experienceLevel']; label: string }[] = [
  { value: 'none', label: 'INTAKE.EXPERIENCE.none' },
  { value: 'beginner', label: 'INTAKE.EXPERIENCE.beginner' },
  { value: 'intermediate', label: 'INTAKE.EXPERIENCE.intermediate' },
  { value: 'advanced', label: 'INTAKE.EXPERIENCE.advanced' },
];

const COOKS_OPTIONS: { value: IntakeSubmission['cooksAtHome']; label: string }[] = [
  { value: 'yes', label: 'INTAKE.COOKS.yes' },
  { value: 'no', label: 'INTAKE.COOKS.no' },
  { value: 'sometimes', label: 'INTAKE.COOKS.sometimes' },
];

const TRAINING_LOCATION_OPTIONS: { value: TrainingLocation; label: string }[] = [
  { value: 'gym', label: 'INTAKE.LOCATION.gym' },
  { value: 'home', label: 'INTAKE.LOCATION.home' },
  { value: 'outdoor', label: 'INTAKE.LOCATION.outdoor' },
  { value: 'mixed', label: 'INTAKE.LOCATION.mixed' },
];

const DIETARY_FLAG_OPTIONS: { value: DietaryFlag; label: string }[] = [
  { value: 'vegan', label: 'INTAKE.DIETARY.vegan' },
  { value: 'vegetarian', label: 'INTAKE.DIETARY.vegetarian' },
  { value: 'lactoseFree', label: 'INTAKE.DIETARY.lactoseFree' },
  { value: 'glutenFree', label: 'INTAKE.DIETARY.glutenFree' },
];

const EQUIPMENT_TAG_OPTIONS: { value: EquipmentTag; label: string }[] = [
  { value: 'dumbbells', label: 'INTAKE.EQUIPMENT.dumbbells' },
  { value: 'barbell', label: 'INTAKE.EQUIPMENT.barbell' },
  { value: 'machines', label: 'INTAKE.EQUIPMENT.machines' },
  { value: 'bands', label: 'INTAKE.EQUIPMENT.bands' },
  { value: 'kettlebells', label: 'INTAKE.EQUIPMENT.kettlebells' },
  { value: 'bench', label: 'INTAKE.EQUIPMENT.bench' },
  { value: 'pullup_bar', label: 'INTAKE.EQUIPMENT.pullup_bar' },
  { value: 'none', label: 'INTAKE.EQUIPMENT.none' },
];

// Cuestionario inicial del entrenador, como wizard paso a paso — mismo
// patron que sign-up.page.ts (swiper + barra de progreso + auto-avance en
// seleccion unica), pero SIN reactive form: casi todo es opcional; solo
// bloquean "Siguiente" la actividad sin pasos y las preguntas propias
// obligatorias (ver isStepBlocked).
//
// Los pasos no son una lista fija: dependen de que campos activo el
// entrenador (enabledFields) mas sus preguntas propias con tipo
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
  @Input() public customQuestions: CustomQuestion[] = [];
  @Input() public prefill: IntakeWizardPrefill | null = null;
  // El padre es quien hace la llamada HTTP real (mismo criterio que
  // isProcessing en sign-up.page.ts vive en el componente top-level): este
  // wizard solo refleja el estado para deshabilitar su propio boton/spinner.
  @Input() public isSubmitting = false;
  // Revisado por el profesional: se recorre y se ve, pero sin cambiar nada
  // ni enviar (el último paso cierra en vez de enviar).
  @Input() public readonly = false;

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
  public customAnswers: Record<string, CustomAnswerValue> = {};
  public readonly scaleValues = [1, 2, 3, 4, 5];

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
    this.customQuestions.forEach((q) => ids.push(`custom:${q._id}`));
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

  // Pasos que no se pueden saltar: la actividad sin contar pasos (como en
  // el registro, es lo único que estima el gasto diario) y las preguntas
  // propias que el profesional marcó como obligatorias.
  public get isStepBlocked(): boolean {
    if (this.readonly) return false;
    const stepId = this.stepIds[this.currentStep];
    if (stepId === 'activity') return this.activity === null;
    const question = this.customQuestions.find((q) => `custom:${q._id}` === stepId);
    return !!question?.required && !this.hasCustomAnswer(question);
  }

  public trackByStepId(_index: number, id: string): string {
    return id;
  }

  public trackByQuestionId(_index: number, question: CustomQuestion): string {
    return question._id || question.label;
  }

  public customAnswerFor(question: CustomQuestion): CustomAnswerValue | null {
    return this.customAnswers[question._id!] ?? null;
  }

  public setCustomAnswer(question: CustomQuestion, value: CustomAnswerValue | null): void {
    if (value === null || value === '') delete this.customAnswers[question._id!];
    else this.customAnswers[question._id!] = value;
  }

  // Escala, sí/no, selector y frecuencia: una sola opción, avanza sola.
  public selectCustomAnswer(question: CustomQuestion, value: CustomAnswerValue): void {
    this.selectSingleChip((v) => this.setCustomAnswer(question, v), value);
  }

  public optionsFor(question: CustomQuestion): string[] {
    return question.type === 'frequency' ? FREQUENCY_OPTIONS : question.options || [];
  }

  private hasCustomAnswer(question: CustomQuestion): boolean {
    const value = this.customAnswers[question._id!];
    return value !== undefined && value !== null && String(value).trim() !== '';
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

    // Solo lo respondido; el back valida cada valor contra su pregunta.
    const customAnswers = this.customQuestions
      .filter((q) => this.hasCustomAnswer(q))
      .map((q) => {
        const value = this.customAnswers[q._id!];
        return { questionId: q._id!, value: typeof value === 'string' ? value.trim() : value };
      });

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
