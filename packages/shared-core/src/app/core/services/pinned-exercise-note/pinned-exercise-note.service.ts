import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, map, tap, catchError, finalize, shareReplay } from 'rxjs';
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from '../../models/pinned-exercise-note';
import { PinnedExerciseNoteAPIService } from './pinned-exercise-note-api.service';

@Injectable()
export class PinnedExerciseNoteService {
  private cache = new Map<string, PinnedExerciseNote[]>();
  private cacheSubject = new BehaviorSubject<Map<string, PinnedExerciseNote[]>>(new Map());
  // Tras invalidar, cada WorkoutComponent de la tabla pide las notas a la vez.
  private inFlight = new Map<string, Observable<PinnedExerciseNote[]>>();

  constructor(private apiService: PinnedExerciseNoteAPIService) {}

  public getByTable(tableId: string): Observable<PinnedExerciseNote[]> {
    const cached = this.cache.get(tableId);
    if (cached) {
      return of(cached);
    }
    const pending = this.inFlight.get(tableId);
    if (pending) {
      return pending;
    }

    const request$ = this.apiService.getByTable(tableId).pipe(
      tap((notes) => {
        this.cache.set(tableId, notes);
        this.cacheSubject.next(new Map(this.cache));
      }),
      catchError(() => {
        return of([]);
      }),
      finalize(() => this.inFlight.delete(tableId)),
      shareReplay(1)
    );
    this.inFlight.set(tableId, request$);
    return request$;
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

  // El backend recoloca las notas al mover/borrar ejercicios o filas; las
  // posiciones cacheadas dejan de valer.
  public invalidateAll(): void {
    this.cache.clear();
    this.inFlight.clear();
    this.cacheSubject.next(new Map());
  }

  public get cache$() {
    return this.cacheSubject.asObservable();
  }
}