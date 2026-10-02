import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

export type TrainerInviteScope = 'training' | 'nutrition';
// TAREA 3 (coach-tab) — cuestionario_pendiente/en_revision son los estados
// intermedios entre aceptar la invitación y quedar activo (ver
// trainer-client-schema.js).
export type TrainerInviteStatus =
  | 'pending'
  | 'cuestionario_pendiente'
  | 'en_revision'
  | 'active'
  | 'declined'
  | 'revoked';

export interface TrainerInvite {
  _id: string;
  trainerId: string;
  clientId: string | null;
  clientEmail: string;
  scope: TrainerInviteScope;
  status: TrainerInviteStatus;
  invitedAt: string;
  respondedAt: string | null;
  revokedAt: string | null;
  revokedBy: 'trainer' | 'client' | null;
  // Solo en la respuesta de GET /trainer/invites (findAllByTrainerWithClient
  // en el backend) — null si el cliente nunca llegó a aceptar (declined sin
  // clientId) o si el usuario fue borrado.
  client?: { name: string | null; lastname: string | null } | null;
}

export interface SendInviteResult {
  scope: TrainerInviteScope;
  success: boolean;
  error: string | null;
  relation: TrainerInvite | null;
}

export interface SendInviteResponse {
  results: SendInviteResult[];
}

export interface ClientIntakeCustomAnswer {
  questionId: string;
  label: string;
  value: string;
}

// Tarea 3 (Trainers, 2026-08) — catálogo cerrado, debe coincidir con
// train-fit-back/components/clientIntake/client-intake-schema.js.
export type TrainingLocation = 'gym' | 'home' | 'outdoor' | 'mixed';
export type EquipmentTag =
  | 'dumbbells'
  | 'barbell'
  | 'machines'
  | 'bands'
  | 'kettlebells'
  | 'bench'
  | 'pullup_bar'
  | 'none';

// Mismas labels que onboarding-status.page.ts (lado cliente) — el trainer
// lee aquí exactamente lo que el cliente vio al elegir.
export const TRAINING_LOCATION_LABELS: Record<TrainingLocation, string> = {
  gym: 'Gimnasio',
  home: 'Casa',
  outdoor: 'Exterior',
  mixed: 'Mixto',
};
localizeRecord(TRAINING_LOCATION_LABELS, 'INTAKE.LOCATION');

export const EQUIPMENT_TAG_LABELS: Record<EquipmentTag, string> = {
  dumbbells: 'Mancuernas',
  barbell: 'Barra y discos',
  machines: 'Máquinas de gimnasio',
  bands: 'Bandas elásticas',
  kettlebells: 'Kettlebells',
  bench: 'Banco',
  pullup_bar: 'Barra de dominadas',
  none: 'Sin material',
};
localizeRecord(EQUIPMENT_TAG_LABELS, 'INTAKE.EQUIPMENT');

// TAREA 3 — cuestionario inicial enviado por el cliente, uno por par
// (profesional, cliente) — no por scope.
export interface ClientIntake {
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  // DEPRECATED — dato legado de cuestionarios enviados antes de Tarea 3;
  // sustituido por trainingLocation/equipmentTags, ya no se escribe.
  equipment: string;
  trainingLocation: TrainingLocation | null;
  equipmentTags: EquipmentTag[];
  customAnswers: ClientIntakeCustomAnswer[];
  submittedAt: string;
  // "Marcar revisado": desde entonces el cliente ya no puede cambiarlo.
  reviewedAt: string | null;
  // El resto del mismo formulario, que el backend guarda fuera de
  // ClientIntake (ver trainer-client-service.js#getIntakeWithAnswers):
  // el perfil que el cliente confirmó (precargado del registro) y lo de
  // nutrición. Opcionales: solo los trae GET/PUT de /intake.
  profile?: ClientIntakeProfile | null;
  nutrition?: ClientIntakeNutrition | null;
}

// Valores de User tal cual: steps/activity/training son los `.value`
// numéricos de STEPS/ACTIVITY_FACTOR/calculateTrainingValues; objetive, el
// delta de kcal con signo. weight/height pueden llegar como string en
// cuentas antiguas (ver toBodyInput).
export interface ClientIntakeProfile {
  weight: number | string | null;
  height: number | string | null;
  sex: number | null;
  birth: string | null;
  steps: number | null;
  activity: number | null;
  training: number | null;
  objetive: number | null;
}

export interface ClientIntakeNutrition {
  dietaryFlags: string[];
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: 'yes' | 'no' | 'sometimes' | null;
}

// TASK-049 (MASTER_BACKLOG.md) — IntakeFieldKey importado de shared-core en
// vez de redeclarado aquí (ya vive en onboarding.service.ts, consumido por
// onboarding-status.page.ts del lado cliente) — una sola fuente de verdad
// del catálogo en el frontend en vez de dos uniones literales a mantener en
// sincronía a mano.
// De libre selección, igual que los 9 campos predefinidos — sin ámbito
// asociado, no depende de si el trainer marcó Entrenamiento o Nutrición.
// `enabled` controla si se manda al cliente sin perder la pregunta al
// desactivarla (mismo checkbox que los campos predefinidos).
export interface CustomIntakeQuestion {
  id: string;
  label: string;
  enabled: boolean;
}

export interface TrainerIntakeConfig {
  trainerId: string;
  enabledFields: IntakeFieldKey[];
  customQuestions: CustomIntakeQuestion[];
  // Últimos checkboxes de ámbito marcados en la pantalla de invitar — se
  // recuerdan entre visitas, no es el scope de ninguna invitación concreta.
  lastScopes: TrainerInviteScope[];
  catalog?: IntakeFieldKey[];
}

// GET /trainer/clients/check-email — mismos 4 estados que bloquean el
// índice único del backend (trainerId+clientEmail+scope); declined/revoked
// no vienen aquí porque no bloquean, se puede reinvitar.
export interface ClientEmailScopeState {
  blocked: boolean;
  status: TrainerInviteStatus | null;
}

export interface ClientEmailScopeStatus {
  training: ClientEmailScopeState;
  nutrition: ClientEmailScopeState;
}
