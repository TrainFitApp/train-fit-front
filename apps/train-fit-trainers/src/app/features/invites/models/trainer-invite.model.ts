export type TrainerInviteScope = 'training' | 'nutrition';
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
