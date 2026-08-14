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

// TAREA 3 — cuestionario inicial enviado por el cliente, uno por par
// (profesional, cliente) — no por scope.
export interface ClientIntake {
  goals: string;
  healthConditions: string;
  experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | null;
  availability: string;
  equipment: string;
  submittedAt: string;
}

// TASK-049 (MASTER_BACKLOG.md) — IntakeFieldKey importado de shared-core en
// vez de redeclarado aquí (ya vive en onboarding.service.ts, consumido por
// onboarding-status.page.ts del lado cliente) — una sola fuente de verdad
// del catálogo en el frontend en vez de dos uniones literales a mantener en
// sincronía a mano.
export interface TrainerIntakeConfig {
  trainerId: string;
  enabledFields: IntakeFieldKey[];
  catalog?: IntakeFieldKey[];
}
