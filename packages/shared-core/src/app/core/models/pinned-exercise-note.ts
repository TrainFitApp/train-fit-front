export class PinnedExerciseNote {
  _id: string;
  tableId: string;
  workoutIndex: number;
  exerciseIndex: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PinnedExerciseNoteUpsertDto {
  tableId: string;
  workoutIndex: number;
  exerciseIndex: number;
  notes: string;
}