export type ProfessionalScope = 'training' | 'nutrition';

export interface ProfessionalSummary {
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
  } | null;
  scopes: ProfessionalScope[];
}

// Invitación sin responder: UNA por profesional, con todos los scopes a los
// que invita. Se acepta o rechaza entera, y aceptarla deja un solo
// cuestionario de alta para todo lo que lleva.
export interface PendingInvite {
  trainerId: string;
  scopes: ProfessionalScope[];
  invitedAt: string;
  trainer: {
    name: string;
    lastname: string;
    email: string;
  } | null;
}

// Respuesta a aceptar/rechazar: los scopes respondidos ahora y los que
// siguen pendientes (entretanto aceptó a otro profesional de ese scope).
export interface InviteResponse {
  trainerId: string;
  scopes: ProfessionalScope[];
  pending: ProfessionalScope[];
}

// F22 — relación pasada (ya no activa) con un profesional.
export interface HistoryEntry {
  _id: string;
  scope: ProfessionalScope;
  status: 'declined' | 'revoked';
  invitedAt: string;
  revokedAt: string | null;
  revokedBy: 'trainer' | 'client' | null;
  trainer: {
    name: string;
    lastname: string;
    email: string;
  } | null;
}
