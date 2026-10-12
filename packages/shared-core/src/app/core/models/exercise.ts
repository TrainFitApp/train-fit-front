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
  // Imagen animada del catálogo: ruta dentro de la app
  // ("assets/exercises/<clave>.webp", ver scripts/exercise-images.cjs). Los
  // ejercicios propios no tienen.
  imageUrl?: string;
  isCardio?: boolean;
  isIsometric?: boolean;
  userId?: string;
}

// Respuesta de POST /exercises/search?withTotal=1.
export interface ExerciseSearchPage {
  items: Exercise[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
