export type TrainerClientScope = 'training' | 'nutrition';

export interface TrainerClientSummary {
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
  } | null;
  scopes: TrainerClientScope[];
}
