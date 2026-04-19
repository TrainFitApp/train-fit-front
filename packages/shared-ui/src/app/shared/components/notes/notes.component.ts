import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { AlertOptions, ToastOptions } from '@ionic/angular';
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
    private tableService: TableService
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

    const alertOptions: AlertOptions = {
      header: 'Notas',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Escribe tus notas aquí...',
          value: currentNotes || '',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'GUARDAR',
          cssClass: 'alert-button-success',
          handler: (data) => {
            if (!data.notes || data.notes.trim() === '') {
              const toastOptions: ToastOptions = {
                message: 'El campo no puede estar vacío',
                duration: 2000,
              };
              this.ionicUtilService.showToast(toastOptions);
              return false;
            }
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role !== 'cancel' && result.data?.values?.notes) {
        const newNotes = (result.data.values.notes || '').trim();
        const previousNotes = this.object?.notes;
        if (this.object) {
          this.object.notes = newNotes;
          this.syncNotesToTableAndWorkout(this.object, newNotes);
          if (this.updateService$) {
            this.isLoading = true;
            this.updateService$.subscribe({
              next: (updatedObject: any) => {
                const persistedNotes: string | undefined = updatedObject?.notes;
                if (persistedNotes) this.object.notes = persistedNotes;
                else delete this.object.notes;

                this.syncNotesToTableAndWorkout(this.object, persistedNotes);

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
                if (previousNotes) this.object.notes = previousNotes;
                else delete this.object.notes;

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
      header: 'Eliminar nota',
      message: '¿Estás seguro de que quieres eliminar esta nota?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            const previousNotes = this.object?.notes;
            if (this.object) {
              delete this.object.notes;
              this.syncNotesToTableAndWorkout(this.object, undefined);
              if (this.updateService$) {
                this.isLoading = true;
                this.updateService$.subscribe({
                  next: (updatedObject: any) => {
                    const persistedNotes: string | undefined = updatedObject?.notes;
                    if (persistedNotes) this.object.notes = persistedNotes;
                    else delete this.object.notes;

                    this.syncNotesToTableAndWorkout(this.object, persistedNotes);

                    if (persistedNotes !== undefined) {
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
                    if (previousNotes) this.object.notes = previousNotes;
                    else delete this.object.notes;

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

  public isWorkoutNote(): boolean {
    return this.object && (this.object as Workout).exercises !== undefined;
  }

  public isExerciseNote(): boolean {
    return this.object && (this.object as CustomExercise).sets !== undefined;
  }

  public getIconName(): string {
    if (this.isWorkoutNote()) {
      return 'document-text-outline';
    } else if (this.isExerciseNote()) {
      return 'document-text-outline';
    }
    return 'document-text-outline';
  }

  private handleUpdateServices(): void {
    if (this.type) {
      this.noteType = this.type;
    }

    if (this.object) {
      if ((this.object as Workout).exercises) {
        if (!this.type) this.noteType = 'Nota del entrenamiento';
        this.updateService$ = this.workoutService.modifyWorkout(
          this.object as Workout
        );
      } else if ((this.object as CustomExercise).sets) {
        if (!this.type) this.noteType = 'Nota del ejercicio';
        this.updateService$ = this.customExerciseService.updateCustomExercise(
          this.object as CustomExercise
        );
      } else if ((this.object as DietDay).meals) {
        if (!this.type) this.noteType = 'Notas del día';
        this.updateService$ = this.dietDayService.updateDietDay(
          this.object as DietDay
        );
      } else {
        if (!this.type) this.noteType = 'Notas de la comida';
        this.updateService$ = this.mealService.modifyMeal(this.object as Meal);
      }
    } else if (!this.type) {
      this.noteType = 'Notas';
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
          if (workout?._id !== objectId) return;
          if (notes) workout.notes = notes;
          else delete workout.notes;
        });

      if (this.workoutService.currentWorkout?._id === objectId) {
        const updatedWorkout = { ...this.workoutService.currentWorkout };
        if (notes) updatedWorkout.notes = notes;
        else delete updatedWorkout.notes;
        this.workoutService.setCurrentWorkout = updatedWorkout;
      }

      this.tableService.setCurrentTable = table;
      return;
    }

    table.splits
      ?.flatMap((split) => split.workouts)
      .flatMap((workout) => workout.exercises)
      .forEach((exercise) => {
        if (exercise?._id !== objectId) return;
        if (notes) exercise.notes = notes;
        else delete exercise.notes;
      });

    const currentWorkout = this.workoutService.currentWorkout;
    if (currentWorkout?.exercises?.some((ex) => ex?._id === objectId)) {
      const updatedWorkout = { ...currentWorkout };
      updatedWorkout.exercises = updatedWorkout.exercises.map((ex) => {
        if (ex?._id !== objectId) return ex;
        const updatedExercise = { ...ex };
        if (notes) updatedExercise.notes = notes;
        else delete updatedExercise.notes;
        return updatedExercise;
      });
      this.workoutService.setCurrentWorkout = updatedWorkout;
    }

    this.tableService.setCurrentTable = table;
  }
}
