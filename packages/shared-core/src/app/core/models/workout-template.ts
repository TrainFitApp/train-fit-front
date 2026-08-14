export interface WorkoutTemplateSet {
  expectedReps: number[];
  expectedRir: number[];
  drop?: boolean;
  restPause?: number | null;
  expectedTime?: string;
  expectedDistance?: number | null;
}

export interface WorkoutTemplateExercise {
  exercise: string | { _id: string; name: string };
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
  description: string;
  level: WorkoutTemplateLevel;
  tags: string[];
  equipment: string[];
  blocks: WorkoutTemplateBlock[];
  createdAt: string;
}

export interface WorkoutTemplateInput {
  name: string;
  description?: string;
  level?: WorkoutTemplateLevel;
  tags?: string[];
  equipment?: string[];
  blocks?: WorkoutTemplateBlock[];
}
