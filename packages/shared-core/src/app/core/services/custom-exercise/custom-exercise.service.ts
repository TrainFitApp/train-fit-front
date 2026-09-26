import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, take, tap } from 'rxjs';
import { CustomExercise } from '../../models/customExercise';
import { HttpService } from '../http/http.service';
import { CustomExerciseAPIService, CustomExerciseWithRow } from './custom-exercise-api.service';
import { Set } from 'src/app/core/models/set';
import { PinnedExerciseNoteService } from '../pinned-exercise-note/pinned-exercise-note.service';

@Injectable()
export class CustomExerciseService {
  private customExerciseClipboard: CustomExercise;

  constructor(
    private customExerciseAPIService: CustomExerciseAPIService,
    private pinnedExerciseNoteService: PinnedExerciseNoteService
  ) {}

  private invalidatePinnedNotes<T>(): MonoTypeOperatorFunction<T> {
    return tap<T>(() => this.pinnedExerciseNoteService.invalidateAll());
  }

  public get getCustomExerciseClipboard() {
    return this.customExerciseClipboard;
  }

  public set setCustomExerciseClipboard(
    customExerciseClipboard: CustomExercise
  ) {
    this.customExerciseClipboard = customExerciseClipboard;
  }

  public updateCustomExercise(
    customExercise: CustomExercise,
    setsToCreate?: Set[],
    setsToUpdate?: Set[],
    setsToDelete?: string[]
  ): Observable<CustomExercise> {
    return this.customExerciseAPIService.updateCustomExercise(
      customExercise,
      setsToCreate,
      setsToUpdate,
      setsToDelete
    );
  }

  public copySetOnCustomExercise(
    order: number,
    customExercise: CustomExercise
  ): Observable<CustomExercise> {
    return this.customExerciseAPIService.copySetOnCustomExercise(
      order,
      customExercise
    );
  }

  public addSetToCustomExercise(
    idCustomExercise: string,
    set: Set
  ): Observable<CustomExercise> {
    return this.customExerciseAPIService.addSetToCustomExercise(
      idCustomExercise,
      set
    );
  }

  public setCustomExerciseBlock(
    id: string,
    blockId: string | null
  ): Observable<CustomExerciseWithRow> {
    return this.customExerciseAPIService.setCustomExerciseBlock(id, blockId);
  }

  public updateClientNotes(id: string, clientNotes: string): Observable<CustomExercise> {
    return this.customExerciseAPIService.updateClientNotes(id, clientNotes);
  }

  public deleteCustomExercise(id: string): Observable<any> {
    return this.customExerciseAPIService
      .deleteCustomExercise(id)
      .pipe(take(1), this.invalidatePinnedNotes());
  }

  public deleteCustomExercises(exercisesIds: string[]): Observable<any> {
    return this.customExerciseAPIService
      .deleteCustomExercises(exercisesIds)
      .pipe(this.invalidatePinnedNotes());
  }

  public isCustomExerciseCompleted(customExercise: CustomExercise): boolean {
    return (
      customExercise.sets.length > 0 &&
      !!!customExercise.sets.find((setTemp) => !setTemp.doned)
    );
  }
}
