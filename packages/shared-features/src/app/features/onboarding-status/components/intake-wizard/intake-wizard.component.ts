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
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
import { CheckinField, isPlausibleValue } from 'src/app/core/constants/checkin-fields';
import {
  INTAKE_MEASUREMENT_FIELDS,
  IntakeMeasurementRequest,
  IntakePhotoRequest,
  IntakeVideoRequest,
} from 'src/app/core/models/intake-requests';

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
  // Lo que ya mandó de lo que pide el profesional: medida por clave, su día
  // de fotos y un vídeo de progreso por petición (requestId → assetId).
  measurements: Record<string, number>;
  photosDayId: string | null;
  videos: Record<string, string>;
}

// Una medida que pide el profesional, con su campo del catálogo (etiqueta,
// unidad, cómo tomarla y cotas).
interface MeasurementItem {
  field: CheckinField;
  required: boolean;
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
// entrenador (enabledFields), sus preguntas propias con tipo
// (customQuestions) y lo que pide además (medidas, fotos y un paso por
// vídeo) — se recalculan en ngOnChanges cada vez que cambia el grupo (el
// cliente puede cerrar este wizard y abrir el de otro entrenador).
@Component({
  selector: 'app-intake-wizard',
  templateUrl: 'intake-wizard.component.html',
  styleUrls: ['intake-wizard.component.scss'],
})
export class IntakeWizardComponent implements OnChanges, AfterViewInit {
  private readonly translate = inject(TranslateService);

  @Input() public trainerName = '';
  @Input() public enabledFields: Set<IntakeFieldKey> = new Set();
  @Input() public customQuestions: CustomQuestion[] = [];
  @Input() public measurementRequests: IntakeMeasurementRequest[] = [];
  @Input() public photoRequest: IntakePhotoRequest | null = null;
  @Input() public videoRequests: IntakeVideoRequest[] = [];
  // Sin almacenamiento de archivos, los pasos de fotos y vídeos no salen
  // (el back tampoco los exige).
  @Input() public uploads: { images: boolean; videos: boolean } = { images: true, videos: true };
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

  // Lo que pide el profesional además de preguntas.
  public measurementItems: MeasurementItem[] = [];
  public measurements: Record<string, number | null> = {};
  public photosDayId: string | null = null;
  // Poses obligatorias que faltan (lo cuenta el campo de fotos al cargar).
  public photosMissing = 0;
  public videoAnswers: Record<string, string> = {};
  private videosUploading = new Set<string>();

  private stepIds: string[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['prefill']) {
      this.applyPrefill();
    }
    if (changes['measurementRequests']) {
      // En el orden del catálogo (el mismo que ve el profesional al pedirlas).
      const required = new Map((this.measurementRequests || []).map((request) => [request.key, request.required]));
      this.measurementItems = INTAKE_MEASUREMENT_FIELDS.filter((field) => required.has(field.key)).map((field) => ({
        field,
        required: !!required.get(field.key),
      }));
    }
    if (changes['photoRequest']) {
      // Hasta que el campo de fotos cargue, lo obligatorio cuenta como pendiente.
      this.photosMissing = this.photoRequest?.poses.length || 0;
    }
    // Tras el prefill: los pasos que traiga deciden si hay paso de actividad.
    if (
      changes['enabledFields'] ||
      changes['customQuestions'] ||
      changes['prefill'] ||
      changes['measurementRequests'] ||
      changes['photoRequest'] ||
      changes['videoRequests'] ||
      changes['uploads']
    ) {
      this.stepIds = this.buildStepOrder();
    }
  }

  public get showPhotosStep(): boolean {
    return !!this.photoRequest?.poses?.length && this.uploads.images;
  }

  public get visibleVideoRequests(): IntakeVideoRequest[] {
    return this.uploads.videos ? (this.videoRequests || []).filter((request) => !!request._id) : [];
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
    this.measurements = { ...(p?.measurements || {}) };
    this.photosDayId = p?.photosDayId || null;
    this.videoAnswers = { ...(p?.videos || {}) };
    this.videosUploading.clear();
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
    // Lo que pide además, al final: cinta métrica, espejo y cámara juntos.
    if (this.measurementItems.length) ids.push('measurements');
    if (this.showPhotosStep) ids.push('photos');
    this.visibleVideoRequests.forEach((request) => ids.push(`video:${request._id}`));
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
  // el registro, es lo único que estima el gasto diario), las preguntas
  // propias, medidas, fotos y vídeos que el profesional marcó como
  // obligatorios, una medida imposible y un vídeo que aún se está subiendo.
  public get isStepBlocked(): boolean {
    if (this.readonly) return false;
    const stepId = this.stepIds[this.currentStep];
    if (stepId === 'activity') return this.activity === null;
    if (stepId === 'measurements') {
      return this.measurementItems.some(
        (item) => this.isMeasurementInvalid(item) || (item.required && this.measurements[item.field.key] == null)
      );
    }
    if (stepId === 'photos') return !!this.photoRequest?.required && this.photosMissing > 0;
    if (stepId?.startsWith('video:')) {
      const requestId = stepId.slice('video:'.length);
      if (this.videosUploading.has(requestId)) return true;
      const request = this.visibleVideoRequests.find((item) => item._id === requestId);
      return !!request?.required && !this.videoAnswers[requestId];
    }
    const question = this.customQuestions.find((q) => `custom:${q._id}` === stepId);
    return !!question?.required && !this.hasCustomAnswer(question);
  }

  // --- Medidas, fotos y vídeos que pide el profesional ---

  public setMeasurement(key: string, value: number | string | null): void {
    const parsed = value === null || value === '' ? null : Number(String(value).replace(',', '.'));
    this.measurements[key] = parsed !== null && Number.isFinite(parsed) ? parsed : null;
  }

  // Mismas cotas que los check-ins: cazan el dedo que resbala (44 por 84),
  // no vigilan el físico de nadie.
  public isMeasurementInvalid(item: MeasurementItem): boolean {
    const value = this.measurements[item.field.key];
    return value != null && !isPlausibleValue(item.field, value);
  }

  public trackByMeasurement(_index: number, item: MeasurementItem): string {
    return item.field.key;
  }

  public setVideo(request: IntakeVideoRequest, assetId: string | null): void {
    if (assetId) this.videoAnswers[request._id!] = assetId;
    else delete this.videoAnswers[request._id!];
  }

  public setVideoUploading(request: IntakeVideoRequest, uploading: boolean): void {
    if (uploading) this.videosUploading.add(request._id!);
    else this.videosUploading.delete(request._id!);
  }

  public trackByVideoRequest(_index: number, request: IntakeVideoRequest): string {
    return request._id || request.label;
  }

  /** "frente, perfil y espalda" en el idioma del cliente. */
  public poseList(poses: string[]): string {
    const names = poses.map((pose) => this.translate.instant('MEDIA.POSE_' + pose.toUpperCase()).toLowerCase());
    if (names.length < 2) return names.join('');
    return `${names.slice(0, -1).join(', ')} ${this.translate.instant('COACH.AND').trim()} ${names[names.length - 1]}`;
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

  // "Sin material" excluye al resto: marcarlo limpia lo demas y marcar
  // cualquier otro material lo quita.
  public toggleEquipmentTag(tag: EquipmentTag): void {
    if (this.equipmentTags.includes(tag)) {
      this.equipmentTags = this.equipmentTags.filter((t) => t !== tag);
    } else if (tag === 'none') {
      this.equipmentTags = ['none'];
    } else {
      this.equipmentTags = [...this.equipmentTags.filter((t) => t !== 'none'), tag];
    }
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
      measurements: this.measurementItems
        .filter((item) => this.measurements[item.field.key] != null && !this.isMeasurementInvalid(item))
        .map((item) => ({ key: item.field.key, value: this.measurements[item.field.key]! })),
      photosDayId: this.showPhotosStep ? this.photosDayId : null,
      videos: this.visibleVideoRequests
        .filter((request) => this.videoAnswers[request._id!])
        .map((request) => ({ requestId: request._id!, assetId: this.videoAnswers[request._id!] })),
    });
  }
}
