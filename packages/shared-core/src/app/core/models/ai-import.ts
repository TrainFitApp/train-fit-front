export interface ExcelSheetData {
  name: string;
  rows: any[][];
}

export interface AiExerciseData {
  name: string;
  muscleGroups1: string[];
  muscleGroups2: string[];
  category: string[];
  equipment: string[];
  isCardio?: boolean;
  isIsometric?: boolean;
}

export interface AiSetPreview {
  expectedReps: number[];
  expectedRir: number[];
  weight?: number;
  drop?: boolean;
  restPause?: number;
  expectedTime?: string;
  expectedDistance?: number;
}

export interface AiExercisePreview {
  matchedExerciseId: string | null;
  shouldCreate: boolean;
  name: string;
  notes?: string;
  exerciseData?: AiExerciseData;
  sets: AiSetPreview[];
}

export interface AiWorkoutPreview {
  name: string;
  notes?: string;
  exercises: AiExercisePreview[];
}

export interface AiSplitPreview {
  name: string;
  workouts: AiWorkoutPreview[];
}

export interface AiTablePreview {
  name: string;
  splits: AiSplitPreview[];
}
