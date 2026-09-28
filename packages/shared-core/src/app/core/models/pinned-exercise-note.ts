// 2026-09 — quién la ancló. null = anterior al campo (la edita cualquiera).
export type PinnedNoteAuthorRole = 'trainer' | 'client';

export class PinnedExerciseNote {
  _id: string;
  tableId: string;
  workoutIndex: number;
  exerciseIndex: number;
  notes: string;
  authorRole?: PinnedNoteAuthorRole | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PinnedExerciseNoteUpsertDto {
  tableId: string;
  workoutIndex: number;
  exerciseIndex: number;
  notes: string;
}