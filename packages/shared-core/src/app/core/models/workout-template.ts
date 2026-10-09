import { ExerciseMuscle } from '../constants/muscle-catalog';

export interface WorkoutTemplateSet {
  expectedReps: number[];
  expectedRir: number[];
  drop?: boolean;
  restPause?: number | null;
  expectedTime?: string;
  expectedDistance?: number | null;
  // Descanso tras la serie, en segundos (el mismo campo que la serie real).
  restSeconds?: number | null;
}

// Ficha resumida del ejercicio con la que el back devuelve cada plantilla
// (workout-template-dao.js#toEditorShape). Un ejercicio que ya no está en el
// catálogo llega como id plano.
export interface WorkoutTemplateExerciseRef {
  _id: string;
  name: string;
  isCardio?: boolean;
  isIsometric?: boolean;
  equipment?: string[];
  muscles?: ExerciseMuscle[];
  deletedAt?: string;
}

export interface WorkoutTemplateExercise {
  exercise: string | WorkoutTemplateExerciseRef;
  order: number;
  notes?: string;
  sets: WorkoutTemplateSet[];
}

export type WorkoutTemplateBlockType =
  | 'straight'
  | 'superset'
  | 'circuit'
  | 'warmup'
  | 'finisher';

export interface WorkoutTemplateBlock {
  // El grupo "Sin agrupar" (como en el Planificador): sus ejercicios se
  // guardan sin bloque. Va siempre el último.
  ungrouped?: boolean;
  name?: string;
  type: WorkoutTemplateBlockType;
  order: number;
  rounds?: number | null;
  restBetweenExercises?: number | null;
  restBetweenRounds?: number | null;
  instructions?: string;
  exercises: WorkoutTemplateExercise[];
}

export type WorkoutTemplateLevel = 'principiante' | 'intermedio' | 'avanzado';

export interface WorkoutTemplate {
  _id: string;
  trainerId: string;
  name: string;
  // Indicaciones de la sesión para el cliente: pasan al entrenamiento al
  // aplicar la plantilla. `description` es solo para la biblioteca.
  notes?: string;
  description: string;
  level: WorkoutTemplateLevel;
  tags: string[];
  equipment: string[];
  blocks: WorkoutTemplateBlock[];
  createdAt: string;
}

export interface WorkoutTemplateInput {
  name: string;
  notes?: string;
  description?: string;
  level?: WorkoutTemplateLevel;
  tags?: string[];
  equipment?: string[];
  blocks?: WorkoutTemplateBlock[];
}
