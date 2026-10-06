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

  public ngOnChanges(): void {
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

function ageFrom(birth: string): number | null {
  const date = new Date(birth);
  if (Number.isNaN(date.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  if (now < new Date(now.getFullYear(), date.getMonth(), date.getDate())) age--;
  return age;
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
  const age = profile.birth ? ageFrom(profile.birth) : null;
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
