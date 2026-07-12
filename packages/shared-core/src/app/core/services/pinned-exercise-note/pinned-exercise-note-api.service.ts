import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from '../../models/pinned-exercise-note';
import { HttpService } from '../http/http.service';

@Injectable()
export class PinnedExerciseNoteAPIService {
  public static readonly PINNED_EXERCISE_NOTE_ENDPOINT = 'pinned-exercise-notes';

  constructor(private http: HttpService) {}

  public getByTable(tableId: string): Observable<PinnedExerciseNote[]> {
    return this.http.get<PinnedExerciseNote[]>(`${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/table/${tableId}`);
  }

  public getById(id: string): Observable<PinnedExerciseNote> {
    return this.http.get<PinnedExerciseNote>(`${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/${id}`);
  }

  public upsert(dto: PinnedExerciseNoteUpsertDto): Observable<PinnedExerciseNote> {
    const url = `${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/table/${dto.tableId}/workout/${dto.workoutIndex}/exercise/${dto.exerciseIndex}`;
    return this.http.post<PinnedExerciseNote>(
      url,
      { notes: dto.notes }
    );
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/${id}`);
  }
}