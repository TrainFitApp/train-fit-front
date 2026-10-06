import { ExerciseMuscle } from '../constants/muscle-catalog';

export class Exercise {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  // Músculos que trabaja, cada uno con su papel (ver
  // constants/muscle-catalog.ts).
  muscles?: ExerciseMuscle[];
  category?: string[] | string;
  equipment: string[];
  gifUrl: string;
  isCardio?: boolean;
  isIsometric?: boolean;
  userId?: string;
}
