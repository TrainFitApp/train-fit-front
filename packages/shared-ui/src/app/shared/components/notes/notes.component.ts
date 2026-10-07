import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { AlertButton, AlertOptions } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { TranslateService } from '@ngx-translate/core';
import { PinnedExerciseNoteService } from 'src/app/core/services/pinned-exercise-note/pinned-exercise-note.service';
import { PinnedExerciseNoteUpsertDto } from 'src/app/core/models/pinned-exercise-note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnChanges {
  @Input()
  public notes: string;
  @Input()
  public object: Workout | CustomExercise | DietDay | Meal;
  @Input()
  public detail: boolean;
  @Input()
  public isPrevious: boolean;
  @Input()
  public type: string;
  @Input()
  public canDelete: boolean = true;
  @Input()
  public canModify: boolean = true;
  @Input()
  public tableId: string;
  @Input()
  public workoutIndex: number;
  @Input()
  public exerciseIndex: number;

  @Output()
  public update = new EventEmitter<string | undefined>();

  public noteType: string;
  public isLoading: boolean = false;
  @ViewChild('noteRef') noteRef: ElementRef<HTMLDivElement>;

  private updateService$: Observable<Workout | CustomExercise | DietDay | Meal>;

  constructor(
    private mealService: MealService,
    private workoutService: WorkoutService,
    private customExerciseService: CustomExerciseService,
    private dietDayService: DietDayService,
    private ionicUtilService: IonicUtilService,
    private tableService: TableService,
    private translate: TranslateService,
    private pinnedExerciseNoteService: PinnedExerciseNoteService
  ) {}

  public ngOnInit(): void {
    this.handleUpdateServices();
  }

  public ngOnChanges(): void {
    this.handleUpdateServices();
  }

  public showManageNotesAlert(event: Event): void {
    if (!this.canModify) return;
    event.stopPropagation();
    if (this.isLoading) return;

    const currentNotes = this.object ? this.object.notes : this.notes;
    const isCustomExercise = this.object && (this.object as CustomExercise).sets !== undefined;
    const showPinOption = isCustomExercise && this.tableId && this.workoutIndex !== undefined && this.exerciseIndex !== undefined;

    let shouldPin = false;

    const saveButtons: AlertButton[] = [
      {
        text: this.translate.instant('COMMON.SAVE'),
        handler: () => {
          shouldPin = false;
          return true;
        },
      },
    ];

    if (showPinOption) {
      saveButtons.push({
        text: this.translate.instant('NOTES.PIN_TO_POSITION'),
        cssClass: 'alert-button-pin',
        handler: () => {
          shouldPin = true;
          return true;
        },
      });
    }

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.TITLE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: this.translate.instant('NOTES.PLACEHOLDER'),
          value: currentNotes || '',
          attributes: { maxlength: 500 },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        ...saveButtons,
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role !== 'cancel') {
        const newNotes = (result.data?.values?.notes || '').trim();

        if (shouldPin && this.tableId && this.workoutIndex !== undefined && this.exerciseIndex !== undefined) {
          const dto: PinnedExerciseNoteUpsertDto = {
            tableId: this.tableId,
            workoutIndex: this.workoutIndex,
            exerciseIndex: this.exerciseIndex,
            notes: newNotes,
          };
          this.pinnedExerciseNoteService.upsert(dto).subscribe({
            next: () => console.debug('[NotesComponent] Pinned note saved'),
            error: (err) => {
              console.error('[NotesComponent] Failed to save pinned note', err);
              if (err?.error?.code === 'PINNED_NOTE_NOT_AUTHOR') {
                this.ionicUtilService.showToast({ message: this.translate.instant('NOTES.PINNED_NOT_AUTHOR'), duration: 3000 });
              }
            },
          });
          return;
        }

        const previousNotes = this.object?.notes;
        if (this.object) {
          this.object.notes = newNotes;
          this.syncNotesToTableAndWorkout(this.object, newNotes);

          if (this.updateService$) {
            this.isLoading = true;
            this.updateService$.subscribe({
              next: (updatedObject: any) => {
                const persistedNotes: string | undefined = updatedObject?.notes;
                this.object.notes = persistedNotes || '';

                this.syncNotesToTableAndWorkout(this.object, this.object.notes);

                if (persistedNotes !== newNotes) {
                  console.debug('[NotesComponent] Notes mismatch after update', {
                    noteType: this.noteType,
                    previousNotes,
                    requestedNotes: newNotes,
                    persistedNotes,
                    objectId: (this.object as any)?._id,
                  });
                } else {
                  console.debug('[NotesComponent] Notes updated', {
                    noteType: this.noteType,
                    objectId: (this.object as any)?._id,
                  });
                }

                this.update.emit(persistedNotes);
              },
              error: (error) => {
                this.object.notes = previousNotes || '';

                this.syncNotesToTableAndWorkout(this.object, previousNotes);

                console.debug('[NotesComponent] Notes update failed', {
                  noteType: this.noteType,
                  objectId: (this.object as any)?._id,
                  error,
                });
                this.update.emit(previousNotes);
                this.isLoading = false;
                this.scrollToNote();
              },
              complete: () => {
                this.isLoading = false;
                this.scrollToNote();
              },
            });
            return;
          }
        }
        console.debug('[NotesComponent] Notes updated locally (no service)', {
          noteType: this.noteType,
          objectId: (this.object as any)?._id,
        });
        this.update.emit(newNotes);
      }
    });
  }

  public showCloseAlert(event: Event): void {
    event.stopPropagation();
    if (this.isLoading) return;
    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.DELETE_TITLE'),
      message: this.translate.instant('NOTES.DELETE_CONFIRM'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('NOTES.DELETE'),
          role: 'destructive',
          handler: () => {
            const previousNotes = this.object?.notes;
            if (this.object) {
              this.object.notes = '';
              this.syncNotesToTableAndWorkout(this.object, '');
              if (this.updateService$) {
                this.isLoading = true;
                this.updateService$.subscribe({
                  next: (updatedObject: any) => {
                    const persistedNotes: string | undefined = updatedObject?.notes;
                    this.object.notes = persistedNotes || '';

                    this.syncNotesToTableAndWorkout(this.object, this.object.notes);

                    if (persistedNotes !== '') {
                      console.debug('[NotesComponent] Note delete mismatch after update', {
                        noteType: this.noteType,
                        previousNotes,
                        persistedNotes,
                        objectId: (this.object as any)?._id,
                      });
                    } else {
                      console.debug('[NotesComponent] Note deleted', {
                        noteType: this.noteType,
                        objectId: (this.object as any)?._id,
                      });
                    }

                    this.update.emit(persistedNotes);
                  },
                  error: (error) => {
                    this.object.notes = previousNotes || '';

                    this.syncNotesToTableAndWorkout(this.object, previousNotes);

                    console.debug('[NotesComponent] Note delete failed', {
                      noteType: this.noteType,
                      objectId: (this.object as any)?._id,
                      error,
                    });
                    this.update.emit(previousNotes);
                    this.isLoading = false;
                    this.scrollToNote();
                  },
                  complete: () => {
                    this.isLoading = false;
                    this.scrollToNote();
                  },
                });
                return;
              }
            }
            console.debug('[NotesComponent] Note deleted locally (no service)', {
              noteType: this.noteType,
              objectId: (this.object as any)?._id,
            });
            this.update.emit(undefined);
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private scrollToNote(): void {
    try {
      const el = this.noteRef?.nativeElement;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {}
  }

  private handleUpdateServices(): void {
    if (this.type) {
      this.noteType = this.type;
    }

    if (this.object) {
      if ((this.object as Workout).exercises) {
        if (!this.type) this.noteType = this.translate.instant('NOTES.WORKOUT_NOTE');
        this.updateService$ = this.workoutService.modifyWorkout(
          this.object as Workout
        );
      } else if ((this.object as CustomExercise).sets) {
        if (!this.type) this.noteType = this.translate.instant('NOTES.EXERCISE_NOTE');
        this.updateService$ = this.customExerciseService.updateCustomExercise(
          this.object as CustomExercise
        );
      } else if ((this.object as DietDay).meals) {
        if (!this.type) this.noteType = this.translate.instant('NOTES.DAY_NOTES');
        this.updateService$ = this.dietDayService.updateDietDay(
          this.object as DietDay
        );
      } else {
        if (!this.type) this.noteType = this.translate.instant('NOTES.MEAL_NOTES');
        this.updateService$ = this.mealService.modifyMeal(this.object as Meal);
      }
    } else if (!this.type) {
      this.noteType = this.translate.instant('NOTES.TITLE');
    }
  }

  private syncNotesToTableAndWorkout(
    object: Workout | CustomExercise | DietDay | Meal,
    notes: string | undefined
  ): void {
    const table = this.tableService.tableInUse;
    const objectId = (object as any)?._id;
    if (!table || !objectId) return;

    const isWorkout = (object as Workout).exercises !== undefined;
    const isCustomExercise = (object as CustomExercise).sets !== undefined;
    if (!isWorkout && !isCustomExercise) return;

    if (isWorkout) {
      table.splits
        ?.flatMap((split) => split.workouts)
        .forEach((workout) => {
          if (workout?._id === objectId) {
            workout.notes = notes || '';
          }
        });

      if (this.workoutService.currentWorkout?._id === objectId) {
        const updatedWorkout = { ...this.workoutService.currentWorkout, notes: notes || '' };
        this.workoutService.setCurrentWorkout = updatedWorkout;
      }

      this.tableService.setCurrentTable = table;
      return;
    }

    table.splits
      ?.flatMap((split) => split.workouts)
      .flatMap((workout) => workout.exercises)
      .forEach((exercise) => {
        if (exercise?._id === objectId) {
          exercise.notes = notes || '';
        }
      });

    const currentWorkout = this.workoutService.currentWorkout;
    if (currentWorkout?.exercises?.some((ex) => ex?._id === objectId)) {
      const updatedWorkout = { ...currentWorkout };
      updatedWorkout.exercises = updatedWorkout.exercises.map((ex) => {
        if (ex?._id !== objectId) return ex;
        return { ...ex, notes: notes || '' };
      });
      this.workoutService.setCurrentWorkout = updatedWorkout;
    }

    this.tableService.setCurrentTable = table;
  }
}
