export interface Anthropometry {
  _id?: string;
  userId: string;
  date: string;
  weight?: number;
  neck?: number;
  chest?: number;
  bicepsRelaxed?: number;
  bicepsContracted?: number;
  waist?: number;
  abdomen?: number;
  hip?: number;
  thighContracted?: number;
  thighRelaxed?: number;
  calf?: number;
  notes?: string;
}

export interface AnthropometryDTO {
  date: string;
  weight?: number;
  neck?: number;
  chest?: number;
  bicepsRelaxed?: number;
  bicepsContracted?: number;
  waist?: number;
  abdomen?: number;
  hip?: number;
  thighContracted?: number;
  thighRelaxed?: number;
  calf?: number;
}