import { Component, HostBinding, Input, OnChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STEPS, STEPS_TYPES, STEPS_VALUES } from 'src/app/shared/constants/steps';
import { ACTIVITY_FACTOR_VALUES } from 'src/app/shared/constants/activity-factor';
import { calculateTrainingValues } from 'src/app/shared/constants/training';
import { SEX, SEX_TYPES } from 'src/app/shared/constants/sex';
import { dietaryFlagUi } from '../../../../shared/utils/dietary-flag-ui.util';
import {
  ClientIntake,
  ClientIntakeNutrition,
  ClientIntakeProfile,
  EQUIPMENT_TAG_LABELS,
  EquipmentTag,
  TRAINING_LOCATION_LABELS,
  TrainingLocation,
} from '../../../invites/models/trainer-invite.model';
import { uiLocale, uiText, localizeRecord } from 'src/app/core/i18n/localized-catalog';
import { CustomAnswer } from 'src/app/core/models/custom-question';
import { ageFromBirthDate } from 'src/app/core/utils/body-metrics.util';
import { INTAKE_MEASUREMENT_FIELDS } from 'src/app/core/models/intake-requests';
import { MediaAssetView, ProgressPose } from 'src/app/core/models/media';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { PhotoViewerModalComponent } from 'src/app/shared/components/media/photo-viewer-modal.component';

const EXPERIENCE_LABELS: Record<NonNullable<ClientIntake['experienceLevel']>, string> = {
  none: 'Sin experiencia',
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};
localizeRecord(EXPERIENCE_LABELS, 'INTAKE.EXPERIENCE');

const COOKS_AT_HOME_LABELS: Record<NonNullable<ClientIntakeNutrition['cooksAtHome']>, string> = {
  yes: 'Sí',
  sometimes: 'A veces',
  no: 'No',
};
localizeRecord(COOKS_AT_HOME_LABELS, 'INTAKE.COOKS');

const STEPS_NOT_COUNTED = Number(STEPS[STEPS_TYPES.notCounted].value);

// `translate`: el valor es una clave i18n (pasos/actividad/entrenos usan las
// mismas constantes y textos que el formulario del cliente). `wide`: texto
// libre, ocupa la fila entera. `span`: respuesta corta pero larga de
// leer, a doble columna. `critical`: puede hacer daño si se pasa por
// alto (alergias), va con superficie propia.
interface AnswerRow {
  label: string;
  value: string;
  translate?: boolean;
  wide?: boolean;
  span?: boolean;
  critical?: boolean;
}

// Una medida que se le pidió: su valor, o null si era opcional y no la mandó.
interface MeasurementRow {
  key: string;
  label: string;
  value: string | null;
  required: boolean;
}

// Un vídeo que se le pidió: el que mandó, o por qué no está.
interface VideoRow {
  label: string;
  required: boolean;
  asset: MediaAssetView | null;
  // deleted = lo mandó y después lo borró de su progreso; missing = no lo mandó.
  state: 'ready' | 'deleted' | 'missing';
}

// Respuestas del cuestionario inicial, en solo lectura. Lo pintan el panel
// "Ver intake" de la ficha y la fila desplegada de la Cartera: el
// entrenador lee lo mismo, con las mismas etiquetas, en los dos sitios.
@Component({
  selector: 'app-intake-answers',
  templateUrl: 'intake-answers.component.html',
  styleUrls: ['intake-answers.component.scss'],
})
export class IntakeAnswersComponent implements OnChanges {
  private readonly translate = inject(TranslateService);
  private readonly ionicUtilService = inject(IonicUtilService);

  @Input() public intake!: ClientIntake;
  // list = una respuesta debajo de otra (panel de la ficha); grid = en
  // columnas que llenan el ancho (fila desplegada de la Cartera).
  @Input() public layout: 'list' | 'grid' = 'list';

  @HostBinding('class.is-grid') public get isGrid(): boolean {
    return this.layout === 'grid';
  }

  // Calculadas una vez por intake, no en getters de plantilla.
  public profileRows: AnswerRow[] = [];
  public nutritionRows: AnswerRow[] = [];
  public customRows: AnswerRow[] = [];
  public dietaryFlagLabels: string[] = [];
  public measurementRows: MeasurementRow[] = [];
  public videoRows: VideoRow[] = [];
  // Se pidieron fotos (aunque fueran opcionales y no las mandara).
  public photosRequested = false;
  public photoPoses: ProgressPose[] = [];

  public ngOnChanges(): void {
    this.measurementRows = buildMeasurementRows(this.intake);
    this.videoRows = buildVideoRows(this.intake);
    this.photosRequested = !!this.intake?.requested?.photos || !!this.intake?.photos;
    this.photoPoses = (this.intake?.requested?.photos?.poses || []) as ProgressPose[];
    this.profileRows = this.intake?.profile ? buildProfileRows(this.intake.profile) : [];
    this.nutritionRows = this.intake?.nutrition ? buildNutritionRows(this.intake.nutrition) : [];
    this.customRows = (this.intake?.customAnswers || []).map((answer) => ({
      label: answer.label,
      value: customAnswerText(answer),
      wide: answer.type === 'text',
    }));
    this.dietaryFlagLabels = (this.intake?.nutrition?.dietaryFlags || []).map((f) => dietaryFlagUi(f).label);
  }

  public experienceLabel(level: ClientIntake['experienceLevel']): string {
    return level ? EXPERIENCE_LABELS[level] : this.translate.instant('CLIENTS.NO_INDICADO');
  }

  public trainingLocationLabel(location: TrainingLocation | null): string {
    return location ? TRAINING_LOCATION_LABELS[location] || location : this.translate.instant('CLIENTS.NO_INDICADO');
  }

  public equipmentTagLabel(tag: EquipmentTag): string {
    return EQUIPMENT_TAG_LABELS[tag] || tag;
  }

  /** Poses pedidas que no mandó (las fotos opcionales pueden venir a medias). */
  public get missingPoses(): ProgressPose[] {
    const sent = new Set((this.intake?.photos?.photos || []).map((photo) => photo.pose));
    return this.photoPoses.filter((pose) => !sent.has(pose));
  }

  public get missingPoseNames(): string {
    return this.missingPoses.map((pose) => this.poseLabel(pose).toLowerCase()).join(', ');
  }

  public poseLabel(pose: string): string {
    return this.translate.instant('MEDIA.POSE_' + pose.toUpperCase());
  }

  public openPhoto(pose: ProgressPose): void {
    if (!this.intake?.photos) return;
    this.ionicUtilService.showModal({
      component: PhotoViewerModalComponent,
      componentProps: { day: this.intake.photos, pose },
      cssClass: 'fullscreen-modal',
    });
  }

  public trackByKey(_index: number, row: MeasurementRow): string {
    return row.key;
  }
}

// Lo pedido, en el orden del catálogo, con lo que mandó. Sin lo pedido
// (cuestionarios anteriores), solo lo que mandó.
function buildMeasurementRows(intake: ClientIntake | null | undefined): MeasurementRow[] {
  const sent = new Map((intake?.measurements || []).map((item) => [item.key, item.value]));
  const requested = new Map((intake?.requested?.measurements || []).map((item) => [item.key, item.required]));
  return INTAKE_MEASUREMENT_FIELDS.filter((field) => requested.has(field.key) || sent.has(field.key)).map((field) => {
    const value = sent.get(field.key);
    return {
      key: field.key,
      label: field.label,
      value: value == null ? null : `${formatNumber(value)} ${field.unit || ''}`.trim(),
      required: requested.get(field.key) === true,
    };
  });
}

function buildVideoRows(intake: ClientIntake | null | undefined): VideoRow[] {
  const sent = new Map((intake?.videos || []).map((video) => [video.requestId, video]));
  const requested = intake?.requested?.videos || [];
  const rows: VideoRow[] = requested.map((request) => {
    const video = sent.get(String(request._id));
    sent.delete(String(request._id));
    return {
      label: request.label,
      required: request.required,
      asset: video?.asset || null,
      state: !video ? 'missing' : video.asset ? 'ready' : 'deleted',
    };
  });
  // Lo que mandó a una petición que ya no está en su formulario.
  for (const video of sent.values()) {
    rows.push({ label: video.label, required: false, asset: video.asset, state: video.asset ? 'ready' : 'deleted' });
  }
  return rows;
}

// Respuesta a una pregunta propia según su tipo: "Sí", "7,5 h", "4/5"…
function customAnswerText(answer: CustomAnswer): string {
  if (answer.value === true) return uiText('COMMON.YES');
  if (answer.value === false) return uiText('COMMON.NO');
  if (typeof answer.value === 'number') {
    if (answer.type === 'scale_1_5') return `${formatNumber(answer.value)}/5`;
    return `${formatNumber(answer.value)}${answer.unit ? ' ' + answer.unit : ''}`;
  }
  return String(answer.value ?? '');
}

function toNumber(value: number | string | null): number | null {
  if (value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formatNumber(value: number): string {
  return value.toLocaleString(uiLocale(), { maximumFractionDigits: 1 });
}

// Mismo criterio que el formulario: objetive es el delta de kcal (0 =
// mantener, >0 superávit, <0 déficit) que el cliente eligió con el deslizador.
function objectiveLabel(kcal: number): string {
  if (kcal === 0) return uiText('CLIENTS.MANTENER_PESO');
  const amount = uiText('CLIENTS.KCAL_AL_DIA', { p0: formatNumber(Math.abs(kcal)) });
  return kcal > 0 ? uiText('CLIENTS.GANAR_PESO', { amount }) : uiText('CLIENTS.PERDER_PESO', { amount });
}

// Solo lo que tiene valor: el formulario pregunta según lo que activó el
// entrenador, y un "Sin especificar" de algo que nunca se preguntó es ruido.
function buildProfileRows(profile: ClientIntakeProfile): AnswerRow[] {
  const rows: AnswerRow[] = [];
  const weight = toNumber(profile.weight);
  const height = toNumber(profile.height);
  const steps = toNumber(profile.steps);
  if (weight) rows.push({ label: uiText('TRAINER_COMMON.WEIGHT'), value: `${formatNumber(weight)} kg` });
  if (height) rows.push({ label: uiText('CLIENTS.ALTURA'), value: `${formatNumber(height)} cm` });
  if (profile.sex === SEX_TYPES.female || profile.sex === SEX_TYPES.male) {
    rows.push({ label: uiText('CLIENTS.SEXO'), value: SEX[profile.sex as SEX_TYPES] });
  }
  const age = ageFromBirthDate(profile.birth);
  if (age !== null) rows.push({ label: uiText('CLIENTS.EDAD'), value: uiText('CLIENTS.ANOS_2', { age }) });
  const stepsOption = STEPS_VALUES.find((s) => Number(s.value) === steps);
  if (stepsOption) rows.push({ label: uiText('CLIENTS.PASOS_AL_DIA'), value: stepsOption.name, translate: true });
  // Como en el formulario: la actividad diaria solo cuenta sin pasos.
  const activityOption = steps === STEPS_NOT_COUNTED
    ? ACTIVITY_FACTOR_VALUES.find((a) => a.value === profile.activity)
    : undefined;
  if (activityOption) rows.push({ label: uiText('CLIENTS.ACTIVIDAD_DIARIA'), value: activityOption.name, translate: true });
  const trainingOptions = steps !== null ? calculateTrainingValues(steps) : null;
  const trainingOption = trainingOptions
    ? Object.values(trainingOptions).find((t) => Number(t.value) === profile.training)
    : undefined;
  if (trainingOption) rows.push({ label: uiText('CLIENTS.ENTRENAMIENTO_SEMANAL'), value: trainingOption.name, translate: true });
  if (profile.objetive !== null && Number.isFinite(profile.objetive)) {
    rows.push({ label: uiText('CLIENT_DETAIL.GOAL'), value: objectiveLabel(profile.objetive), span: true });
  }
  return rows;
}

function buildNutritionRows(nutrition: ClientIntakeNutrition): AnswerRow[] {
  const rows: AnswerRow[] = [];
  // Mismas etiquetas que el entrenador ve al configurar su cuestionario
  // (invites.page.ts#intakeFieldLabels).
  if (nutrition.allergies) rows.push({ label: uiText('INTAKE.ALLERGIES_TITLE'), value: nutrition.allergies, wide: true, critical: true });
  if (nutrition.favoriteFoods) rows.push({ label: uiText('INTAKE.FAVORITES_TITLE'), value: nutrition.favoriteFoods, wide: true });
  if (nutrition.dislikedFoods) rows.push({ label: uiText('CLIENTS.ALIMENTOS_QUE_NO_LE_GUSTAN'), value: nutrition.dislikedFoods, wide: true });
  if (nutrition.cooksAtHome) {
    rows.push({ label: uiText('CLIENTS.COCINA_EN_CASA'), value: COOKS_AT_HOME_LABELS[nutrition.cooksAtHome] });
  }
  return rows;
}
