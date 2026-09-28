import { ExerciseMuscle } from '../constants/muscle-catalog';

export class Exercise {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  // Fuente de verdad desde 2026-09 (ver constants/muscle-catalog.ts).
  // Ausente = ejercicio aún sin migrar.
  muscles?: ExerciseMuscle[];
  // Proyección para lo que aún lee el modelo antiguo: la calcula el backend
  // a partir de `muscles`.
  muscleGroups1: string[];
  muscleGroups2: string[];
  category?: string[] | string;
  equipment: string[];
  gifUrl: string;
  isCardio?: boolean;
  isIsometric?: boolean;
  userId?: string;
}
