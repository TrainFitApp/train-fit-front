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
