import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AlertButton, AlertInput, AlertOptions, ModalOptions, ToastOptions } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { formatRirValue, isRirFail } from 'src/app/core/models/rir';
import { Set } from 'src/app/core/models/set';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { SetService } from 'src/app/core/services/set/set.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
import { OrderSetsPage } from './order-sets/order-sets.page';
import { PinnedExerciseNoteService } from 'src/app/core/services/pinned-exercise-note/pinned-exercise-note.service';
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from 'src/app/core/models/pinned-exercise-note';
import { TranslateService } from '@ngx-translate/core';

interface CurrentSetRow {
  type: 'set' | 'pending';
  key: string;
  index: number;
  set?: Set;
}

@Component({
  selector: 'app-custom-exercise',
  templateUrl: './custom-exercise.component.html',
  styleUrls: ['./custom-exercise.component.scss'],
})
export class CustomExerciseComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public customExercise: CustomExercise;
  @Input()
  public previousWorkoutDate: Date;
  @Input()
  public currentWorkout: Workout;
  @Input()
  public tableInUse: Table;
  @Input()
  public indexCustomExercise: number;

  public previousWorkoutCustomExercise: CustomExercise;
  public currentSplitIndex: number = -1;
  public currentWorkoutIndex: number = -1;
  public historicalSplitIndex: number = -1;
  public animatingLeft: boolean = false;
  public animatingRight: boolean = false;
  public pendingCopyInsertIndex: number | null = null;
  private pendingCopyKey: number = 0;

  public pinnedNote: PinnedExerciseNote | null = null;
  private pinnedNoteCacheSub: Subscription | null = null;

  constructor(
    private customExerciseService: CustomExerciseService,
    private utilService: UtilService,
    private setService: SetService,
    private ionicUtilService: IonicUtilService,
    private workoutService: WorkoutService,
    private pinnedExerciseNoteService: PinnedExerciseNoteService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.setPreviousCustomExerciseWorkout();
    this.sortCurrentSets();
    this.loadPinnedNote();
    this.pinnedNoteCacheSub = this.pinnedExerciseNoteService.cache$.subscribe(() => {
      this.loadPinnedNote();
    });
  }

  public ngOnDestroy(): void {
    this.pinnedNoteCacheSub?.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Actualizar la sesión anterior cuando cambie el ejercicio o la tabla
    if (changes['customExercise'] || changes['tableInUse']) {
      this.setPreviousCustomExerciseWorkout();
    }

    // Ordenar sets cuando cambie el ejercicio
    if (changes['customExercise'] && this.customExercise?.sets) {
      this.sortCurrentSets();
    }

    // Recargar pinned note si cambia el ejercicio o la tabla
    if (changes['customExercise'] || changes['tableInUse'] || changes['currentWorkout']) {
      this.loadPinnedNote();
    }
  }

  private loadPinnedNote(): void {
    if (this.tableInUse?._id && this.currentWorkout?._id) {
      this.currentSplitIndex = -1;
      this.currentWorkoutIndex = -1;

      this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
        splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
          if (this.currentWorkout._id === workoutTemp._id) {
            this.currentSplitIndex = indexSplit;
            this.currentWorkoutIndex = indexWorkout;
          }
        });
      });

      if (this.currentSplitIndex >= 0 && this.currentWorkoutIndex >= 0) {
        this.pinnedExerciseNoteService
          .getByPosition(this.tableInUse._id, this.currentWorkoutIndex, this.indexCustomExercise)
          .subscribe((note) => {
            this.pinnedNote = note;
          });
      }
    }
  }

  public deletePinnedNote(): void {
    if (!this.pinnedNote) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.DELETE_PINNED_TITLE'),
      message: this.translate.instant('NOTES.DELETE_PINNED_CONFIRM'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.pinnedExerciseNoteService.delete(this.pinnedNote._id, this.tableInUse._id).subscribe({
              next: () => {
                this.pinnedNote = null;
                console.debug('[CustomExerciseComponent] Pinned note deleted');
              },
              error: (err) => console.error('[CustomExerciseComponent] Failed to delete pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public editPinnedNote(): void {
    if (!this.pinnedNote) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.TITLE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.pinnedNote.notes,
          placeholder: this.translate.instant('NOTES.PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            const newNotes = (data.notes || '').trim();
            const dto: PinnedExerciseNoteUpsertDto = {
              tableId: this.tableInUse._id,
              workoutIndex: this.currentWorkoutIndex,
              exerciseIndex: this.indexCustomExercise,
              notes: newNotes,
            };
            this.pinnedExerciseNoteService.upsert(dto).subscribe({
              next: (updated) => {
                this.pinnedNote = updated;
                console.debug('[CustomExerciseComponent] Pinned note updated');
              },
              error: (err) => console.error('[CustomExerciseComponent] Failed to update pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public setPreviousCustomExerciseWorkout(): void {
    if (this.tableInUse && this.customExercise && this.currentWorkout._id) {
      this.currentSplitIndex = -1;
      this.currentWorkoutIndex = -1;

      this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
        splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
          if (this.currentWorkout._id === workoutTemp._id) {
            this.currentSplitIndex = indexSplit;
            this.currentWorkoutIndex = indexWorkout;
          }
        });
      });

      if (this.currentSplitIndex > 0) {
        this.historicalSplitIndex = this.currentSplitIndex - 1;
        this.updateHistoricalExercise();
      } else {
        this.historicalSplitIndex = -1;
        this.previousWorkoutCustomExercise = undefined;
        this.previousWorkoutDate = undefined;
      }
    }
  }

  public updateHistoricalExercise(): void {
    if (this.historicalSplitIndex < 0 || this.currentWorkoutIndex < 0) return;

    const historicalWorkout =
      this.tableInUse.splits[this.historicalSplitIndex].workouts[
        this.currentWorkoutIndex
      ];

    this.previousWorkoutDate = historicalWorkout.date;

    if (historicalWorkout.exercises) {
      this.previousWorkoutCustomExercise = historicalWorkout.exercises.find(
        (exerciseTemp) =>
          exerciseTemp.exercise._id === this.customExercise.exercise._id
      );
    } else {
      this.previousWorkoutCustomExercise = undefined;
    }
  }

  public canGoBack(): boolean {
    return this.historicalSplitIndex > 0;
  }

  public canGoForward(): boolean {
    return this.historicalSplitIndex < this.currentSplitIndex - 1;
  }

  public goBack(): void {
    if (this.canGoBack()) {
      this.animatingLeft = true;
      setTimeout(() => (this.animatingLeft = false), 300);
      this.historicalSplitIndex--;
      this.updateHistoricalExercise();
    }
  }

  public goForward(): void {
    if (this.canGoForward()) {
      this.animatingRight = true;
      setTimeout(() => (this.animatingRight = false), 300);
      this.historicalSplitIndex++;
      this.updateHistoricalExercise();
    }
  }

  public isHistoricalSessionCompleted(): boolean {
    const sets = this.previousWorkoutCustomExercise?.sets;
    return sets?.length > 0 && sets.every((s) => s.doned);
  }

  public getMicrocycleLabel(): string {
    return `Microciclo ${this.historicalSplitIndex + 1}`;
  }

  public openSetManager(): void {
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        isCardio: this.customExercise.exercise.isCardio,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        delete res.data.rangeREPSEnd;
        delete res.data.rangeREPStart;
        delete res.data.rangeRIREnd;
        delete res.data.rangeRIRStart;
        delete res.data.expectedMin;
        delete res.data.expectedSec;

        const maxOrderSet = this.customExercise.sets.reduce(
          (maxSeries, currentSeries) => {
            if (currentSeries.order > maxSeries.order) {
              return currentSeries;
            } else {
              return maxSeries;
            }
          },
          { order: -Infinity }
        );

        if (this.customExercise.sets.length === 0) res.data.order = 0;
        else res.data.order = maxOrderSet.order + 1;

        this.customExerciseService
          .addSetToCustomExercise(this.customExercise._id, res.data)
          .subscribe((resCustomExercise: CustomExercise) => {
            this.replaceCurrentSets(resCustomExercise.sets);
          });
      }
    });
  }

  public manageNote(): void {
    const showPinOption = !!(this.tableInUse?._id && this.currentWorkoutIndex >= 0);

    let shouldPin = false;

    const confirmButtons: AlertButton[] = [
      {
        text: this.translate.instant('COMMON.SAVE'),
        handler: (res) => {
          shouldPin = false;
          return true;
        },
      },
    ];

    if (showPinOption) {
      confirmButtons.push({
        text: this.translate.instant('NOTES.PIN_TO_POSITION'),
        cssClass: 'alert-button-pin',
        handler: (res) => {
          shouldPin = true;
          return true;
        },
      });
    }

    const alertInputs: AlertInput[] = [
      {
        name: 'notes',
        type: 'textarea',
        value: this.customExercise.notes || '',
        placeholder: this.translate.instant('COMMON.WRITE_NOTES_HERE'),
      },
    ];

    const alertOptions: AlertOptions = {
      header: this.translate.instant('COMMON.NOTES'),
      inputs: alertInputs,
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        ...confirmButtons,
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role === 'cancel') return;

      const notesValue = (result.data?.values?.notes || '').trim();
      if (!notesValue) {
        const errorAlert: AlertOptions = {
          header: this.translate.instant('COMMON.ERROR'),
          message: this.translate.instant('COMMON.FIELD_REQUIRED'),
          buttons: [this.translate.instant('COMMON.OK')],
        };
        this.ionicUtilService.showAlert(errorAlert);
        return;
      }

      if (shouldPin && this.tableInUse?._id && this.currentWorkoutIndex >= 0) {
        const dto: PinnedExerciseNoteUpsertDto = {
          tableId: this.tableInUse._id,
          workoutIndex: this.currentWorkoutIndex,
          exerciseIndex: this.indexCustomExercise,
          notes: notesValue,
        };
        this.pinnedExerciseNoteService.upsert(dto).subscribe({
          next: (note) => {
            this.pinnedNote = note;
          },
          error: (err) => console.error('[CustomExerciseComponent] Failed to save pinned note', err),
        });
        return;
      }

      this.customExercise.notes = notesValue;
      this.customExerciseService.updateCustomExercise(this.customExercise).subscribe();
      if (this.currentWorkout) {
        this.workoutService.setCurrentWorkout = this.currentWorkout;
      }
    });
  }

  public deleteSet(set: Set): void {
    const indexSet = this.customExercise.sets.findIndex(
      (setTemp) => setTemp._id === set._id
    );
    this.customExercise.sets.splice(indexSet, 1);
    this.normalizeCurrentSetsOrder();

    if (this.currentWorkout) {
      this.workoutService.setCurrentWorkout = this.currentWorkout;
    }
  }

  public openOrderSetsModal(): void {
    const modalOptions: ModalOptions = {
      component: OrderSetsPage,
      componentProps: {
        customExercise: this.customExercise,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        this.replaceCurrentSets(res.data.sets);
      }
    });
  }

  public configSet(set: Set): void {
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        set: set,
        isCardio: this.customExercise.exercise.isCardio,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((resSet) => {
      if (resSet.data) {
        this.setService.updateSet(resSet.data as Set).subscribe((resS) => {
          const indexSet = this.customExercise.sets.findIndex(
            (sTemp) => sTemp._id === resS._id
          );
          this.customExercise.sets[indexSet] = resS;
          this.replaceCurrentSets(this.customExercise.sets);
        });
      }
    });
  }

  public copySet(set: Set, indexSet: number): void {
    const normalizedSets = this.sortSets(this.customExercise.sets).map(
      (setTemp, index) => ({
        ...setTemp,
        order: index,
      })
    );

    const currentIndex = normalizedSets.findIndex(
      (setTemp) => setTemp._id === set._id
    );
    const insertIndex = currentIndex >= 0 ? currentIndex + 1 : indexSet + 1;
    const sourceSet = normalizedSets[currentIndex] || set;
    const newSet = { ...sourceSet };
    delete newSet._id;

    const requestSets = [...normalizedSets];
    requestSets.splice(insertIndex, 0, newSet);
    requestSets.forEach((setTemp, index) => {
      setTemp.order = index;
    });

    this.pendingCopyInsertIndex = insertIndex;
    this.pendingCopyKey++;

    this.customExerciseService
      .copySetOnCustomExercise(newSet.order, {
        ...this.customExercise,
        sets: requestSets,
      })
      .subscribe({
        next: (resUCE) => {
          this.pendingCopyInsertIndex = null;
          this.replaceCurrentSets(resUCE.sets);
        },
        error: (error) => {
          this.pendingCopyInsertIndex = null;
          console.error('Error copying set:', error);
        },
      });
  }

  private sortCurrentSets(): void {
    this.customExercise.sets.sort((a, b) => a.order - b.order);
  }

  private normalizeCurrentSetsOrder(): void {
    this.customExercise.sets = this.sortSets(this.customExercise.sets);
    this.customExercise.sets.forEach((setTemp, index) => {
      setTemp.order = index;
    });
  }

  private replaceCurrentSets(sets: Set[]): void {
    const normalizedSets = this.sortSets(sets);
    this.customExercise.sets = normalizedSets;

    if (!this.currentWorkout) return;

    const currentCustomExercise = this.currentWorkout.exercises.find(
      (exerciseTemp) => exerciseTemp._id === this.customExercise._id
    );

    if (currentCustomExercise) {
      currentCustomExercise.sets = normalizedSets;
    }

    this.workoutService.setCurrentWorkout = this.currentWorkout;
  }

  public sortSets(sets: any[]): any[] {
    if (!sets) return [];
    return [...sets].sort((a, b) => a.order - b.order);
  }

  public getCurrentSetRows(): CurrentSetRow[] {
    const rows: CurrentSetRow[] = [];
    const sets = this.customExercise?.sets || [];

    for (let setIndex = 0; setIndex <= sets.length; setIndex++) {
      if (this.pendingCopyInsertIndex === setIndex) {
        rows.push({
          type: 'pending',
          key: `pending-copy-${this.pendingCopyKey}`,
          index: rows.length,
        });
      }

      if (setIndex < sets.length) {
        rows.push({
          type: 'set',
          key: sets[setIndex]._id || `set-${setIndex}`,
          index: rows.length,
          set: sets[setIndex],
        });
      }
    }

    return rows;
  }

  public toggleAllSeries(event: Event): void {
    const checked = (<HTMLInputElement>event.target).checked;

    this.customExercise.sets.forEach((set) => {
      set.doned = checked;
    });

    // Update the workout in the service
    if (this.currentWorkout) {
      this.workoutService.setCurrentWorkout = this.currentWorkout;
    }
  }

  public getSetTypeLabel(set: Set): string {
    if (set.restPause) {
      return 'RP';
    } else if (set.drop) {
      return 'DS';
    } else {
      return 'N';
    }
  }

  public getRirDisplay(set: Set): string {
    return formatRirValue(set.rir, { emptyLabel: ' - ' });
  }

  public formatPerformedRir(rir: unknown): string {
    return formatRirValue(rir, { includeUnit: true });
  }

  // Formateo de valores esperados para alinearse con workout.component
  public formatExpectedReps(expectedReps: number[]): string {
    if (!expectedReps || expectedReps.length === 0) return '—';

    const firstExpected =
      expectedReps[0] !== null &&
      expectedReps[0] !== undefined &&
      !isNaN(expectedReps[0]);
    const secondExpected =
      expectedReps[1] !== null &&
      expectedReps[1] !== undefined &&
      !isNaN(expectedReps[1]);

    if (firstExpected && secondExpected) {
      return `${expectedReps[0]} - ${expectedReps[1]}`;
    } else if (firstExpected) {
      return `${expectedReps[0]}`;
    } else if (secondExpected) {
      return `${expectedReps[1]}`;
    } else {
      return '—';
    }
  }

  public formatExpectedRir(expectedRir: number[]): string {
    if (!expectedRir || expectedRir.length === 0) return '— RIR';

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      !isNaN(expectedRir[0]);
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      !isNaN(expectedRir[1]);

    if (firstExpected && secondExpected) {
      return `${expectedRir[0]} - ${expectedRir[1]} RIR`;
    } else if (firstExpected) {
      return `${expectedRir[0]} RIR`;
    } else if (secondExpected) {
      return `${expectedRir[1]} RIR`;
    } else {
      return '— RIR';
    }
  }

  public hasValidExpectedRir(expectedRir: number[]): boolean {
    if (!expectedRir || expectedRir.length === 0) return false;

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      (expectedRir[0] === -1 || !isNaN(expectedRir[0]));
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      (expectedRir[1] === -1 || !isNaN(expectedRir[1]));

    return firstExpected || secondExpected;
  }

  public isFail(set: any): boolean {
    if (set?.doned) {
      return isRirFail(set.rir);
    } else {
      return (
        Array.isArray(set?.expectedRir) &&
        set.expectedRir.some((value) => Number(value) === -1)
      );
    }
  }

  public trackBySet(index: number, item: Set): string {
    return item._id || `pending-${index}`;
  }

  public trackBySetRow(index: number, row: CurrentSetRow): string {
    return row.key;
  }
}
