export type TrainerTier = 'free' | 'trainer_pro' | 'trainer_unlimited';

export interface TrainerEntitlements {
  isPremium: boolean;
  tier: TrainerTier;
  plan: string | null;
  expiresAt: string | null;
  limits: { clients: number | null };
  usage: { clients: number };
  remaining: { clients: number | null };
}
