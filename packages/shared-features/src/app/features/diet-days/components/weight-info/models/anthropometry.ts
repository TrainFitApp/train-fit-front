export interface Anthropometry {
  _id?: string;
  userId: string;
  date: string;
  weight?: number;
  neck?: number;
  chest?: number;
  shoulders?: number;
  bicepsRelaxedL?: number;
  bicepsRelaxedR?: number;
  bicepsContractedL?: number;
  bicepsContractedR?: number;
  waist?: number;
  abdomen?: number;
  hip?: number;
  thighContracted?: number;
  thighRelaxed?: number;
  calfL?: number;
  calfR?: number;
  quadL?: number;
  quadR?: number;
  ankleL?: number;
  ankleR?: number;
  muscleMass?: number;
  fatMass?: number;
  boneMass?: number;
  residualMass?: number;
  notes?: string;
}

export type AnthropometryDTO = Omit<Anthropometry, '_id' | 'userId'>;