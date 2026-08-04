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

export interface PendingInvite {
  _id: string;
  trainerId: string;
  clientEmail: string;
  scope: ProfessionalScope;
  status: 'pending' | 'active' | 'declined' | 'revoked';
  invitedAt: string;
  trainer: {
    name: string;
    lastname: string;
    email: string;
  } | null;
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
