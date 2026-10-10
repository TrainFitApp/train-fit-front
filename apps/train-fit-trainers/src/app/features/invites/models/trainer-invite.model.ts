import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';
import { CustomAnswer, CustomQuestion } from 'src/app/core/models/custom-question';
import {
  IntakeMeasurementAnswer,
  IntakeMeasurementRequest,
  IntakePhotoRequest,
  IntakeRequested,
  IntakeVideoRequest,
} from 'src/app/core/models/intake-requests';
import { MediaAssetView, ProgressDayView } from 'src/app/core/models/media';

export type TrainerInviteScope = 'training' | 'nutrition';
// Ciclo de una invitación (una entrada de scope del par entrenador ↔
// cliente, ver trainer-client-schema.js): pending → active | declined, y
// active → revoked.
export type TrainerInviteStatus = 'pending' | 'active' | 'declined' | 'revoked';

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
  // Solo en GET /trainer/invites: null si aún no tiene cuenta vinculada (no
  // ha aceptado nunca) o si el usuario fue borrado.
  client?: { name: string | null; lastname: string | null } | null;
}

export interface SendInviteResult {
  scope: TrainerInviteScope;
  success: boolean;
  error: string | null;
  // OVERLAP | INVITE_ALREADY_PENDING: se dice en el idioma de la app.
  code?: string | null;
  invitation: TrainerInvite | null;
}

export interface SendInviteResponse {
  results: SendInviteResult[];
}

// Tarea 3 (Trainers, 2026-08) — catálogo cerrado, debe coincidir con
// train-fit-back/components/trainerClients/client-intake-schema.js.
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

// Cuestionario de alta del cliente: uno por par (profesional, cliente), no
// por scope.
export interface ClientIntake {
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  trainingLocation: TrainingLocation | null;
  equipmentTags: EquipmentTag[];
  customAnswers: CustomAnswer[];
  // null si lo ha rellenado el profesional y el cliente aún no lo ha enviado.
  submittedAt: string | null;
  // "Marcar revisado": desde entonces el cliente ya no puede cambiarlo.
  reviewedAt: string | null;
  // El resto del mismo formulario, que el backend guarda fuera del
  // cuestionario (ver trainer-client-service.js#getIntakeWithAnswers):
  // el perfil que el cliente confirmó (precargado del registro) y lo de
  // nutrición. Opcionales: solo los trae GET/PUT de /intake.
  profile?: ClientIntakeProfile | null;
  nutrition?: ClientIntakeNutrition | null;
  // Lo que se le pidió además de preguntas y lo que mandó: medidas (también
  // en sus medidas de `measuredOn`), su día de fotos de inicio (null si no
  // mandó o las borró después) y un vídeo por petición (`asset` null si lo
  // borró). Solo los trae GET/PUT de /intake.
  measurements?: IntakeMeasurementAnswer[];
  measuredOn?: string | null;
  photos?: ProgressDayView | null;
  videos?: ClientIntakeVideo[];
  requested?: IntakeRequested;
}

export interface ClientIntakeVideo {
  requestId: string;
  label: string;
  asset: MediaAssetView | null;
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

// Cuestionario de alta del profesional: campos del catálogo que pide, sus
// preguntas propias con tipo (las mismas que en los check-ins) y lo que pide
// además (medidas, fotos de inicio y vídeos), lleve el scope que lleve. Al
// invitar se copia al cliente: cambiarlo después no cambia lo que se le pide
// a quien ya estaba invitado.
export interface TrainerIntakeConfig {
  trainerId: string;
  enabledFields: IntakeFieldKey[];
  customQuestions: CustomQuestion[];
  measurements: IntakeMeasurementRequest[];
  photos: IntakePhotoRequest | null;
  videos: IntakeVideoRequest[];
  // Últimos checkboxes de ámbito marcados en la pantalla de invitar — se
  // recuerdan entre visitas, no es el scope de ninguna invitación concreta.
  lastScopes: TrainerInviteScope[];
  catalog?: IntakeFieldKey[];
}

// GET /trainer/clients/check-email — bloquea una invitación sin responder o
// una relación en curso de ese scope; declined/revoked no, se puede reinvitar.
export interface ClientEmailScopeState {
  blocked: boolean;
  status: TrainerInviteStatus | null;
}

export interface ClientEmailScopeStatus {
  training: ClientEmailScopeState;
  nutrition: ClientEmailScopeState;
}
