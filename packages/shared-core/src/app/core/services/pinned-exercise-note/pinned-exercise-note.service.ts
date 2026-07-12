import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, map, tap, catchError } from 'rxjs';
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from '../../models/pinned-exercise-note';
import { PinnedExerciseNoteAPIService } from './pinned-exercise-note-api.service';

@Injectable()
export class PinnedExerciseNoteService {
  private cache = new Map<string, PinnedExerciseNote[]>();
  private cacheSubject = new BehaviorSubject<Map<string, PinnedExerciseNote[]>>(new Map());

  constructor(private apiService: PinnedExerciseNoteAPIService) {}

  public getByTable(tableId: string): Observable<PinnedExerciseNote[]> {
    const cached = this.cache.get(tableId);
    if (cached) {
      return of(cached);
    }

    return this.apiService.getByTable(tableId).pipe(
      tap((notes) => {
        this.cache.set(tableId, notes);
        this.cacheSubject.next(new Map(this.cache));
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  public getByPosition(
    tableId: string,
    workoutIndex: number,
    exerciseIndex: number
  ): Observable<PinnedExerciseNote | null> {
    return this.getByTable(tableId).pipe(
      map((notes) =>
        notes.find(
          (n) => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex
        ) || null
      )
    );
  }

  public upsert(dto: PinnedExerciseNoteUpsertDto): Observable<PinnedExerciseNote> {
    return this.apiService.upsert(dto).pipe(
      tap((note) => {
        const tableCache = this.cache.get(dto.tableId) || [];
        const existingIndex = tableCache.findIndex(
          (n) => n.workoutIndex === dto.workoutIndex && n.exerciseIndex === dto.exerciseIndex
        );

        if (existingIndex >= 0) {
          tableCache[existingIndex] = note;
        } else {
          tableCache.push(note);
        }

        this.cache.set(dto.tableId, tableCache);
        this.cacheSubject.next(new Map(this.cache));
      })
    );
  }

  public delete(id: string, tableId: string): Observable<void> {
    return this.apiService.delete(id).pipe(
      tap(() => {
        const tableCache = this.cache.get(tableId) || [];
        const filtered = tableCache.filter((n) => n._id !== id);
        this.cache.set(tableId, filtered);
        this.cacheSubject.next(new Map(this.cache));
      })
    );
  }

  public clearCache(tableId: string): void {
    this.cache.delete(tableId);
    this.cacheSubject.next(new Map(this.cache));
  }

  public get cache$() {
    return this.cacheSubject.asObservable();
  }
}