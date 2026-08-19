import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';

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

// TAREA 3 — cuestionario inicial enviado por el cliente, uno por par
// (profesional, cliente) — no por scope.
export interface ClientIntake {
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  equipment: string;
  customAnswers: ClientIntakeCustomAnswer[];
  submittedAt: string;
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
