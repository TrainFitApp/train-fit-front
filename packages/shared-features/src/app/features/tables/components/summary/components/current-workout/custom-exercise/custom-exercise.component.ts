import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AlertOptions, ModalOptions, ToastOptions } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Set } from 'src/app/core/models/set';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { SetService } from 'src/app/core/services/set/set.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';

@Component({
  selector: 'app-custom-exercise',
  templateUrl: './custom-exercise.component.html',
  styleUrls: ['./custom-exercise.component.scss'],
})
export class CustomExerciseComponent implements OnInit, OnChanges {
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

  constructor(
    private customExerciseService: CustomExerciseService,
    private utilService: UtilService,
    private setService: SetService,
    private ionicUtilService: IonicUtilService,
    private workoutService: WorkoutService
  ) {}

  public ngOnInit(): void {
    this.setPreviousCustomExerciseWorkout();
    this.sortCurrentSets();
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
  }

  public setPreviousCustomExerciseWorkout(): void {
    if (this.tableInUse && this.customExercise && this.currentWorkout._id) {
      let previousCustomExercise: CustomExercise;
      this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
        splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
          if (indexSplit > 0 && this.currentWorkout._id === workoutTemp._id) {
            const previousWorkout =
              this.tableInUse.splits[indexSplit - 1].workouts[indexWorkout];

            this.previousWorkoutDate = previousWorkout.date;

            // Buscar el ejercicio anterior por su ID específico, no por índice
            if (previousWorkout.exercises) {
              previousCustomExercise = previousWorkout.exercises.find(
                (exerciseTemp) =>
                  exerciseTemp.exercise._id === this.customExercise.exercise._id
              );
            }
          }
        });
      });

      this.previousWorkoutCustomExercise = previousCustomExercise;
    }
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
            const setAdded =
              resCustomExercise.sets[resCustomExercise.sets.length - 1];

            if (this.currentWorkout) {
              const ceTemp = this.currentWorkout.exercises.find(
                (eTemp) => eTemp._id === resCustomExercise._id
              );
              if (ceTemp) ceTemp.sets.push(setAdded);

              this.workoutService.setCurrentWorkout = this.currentWorkout;
            }
          });
      }
    });
  }

  public manageNote(): void {
    this.utilService
      .manageNote(this.customExercise, this.customExerciseService)
      .then((changed) => {
        if (changed && this.currentWorkout) {
          this.workoutService.setCurrentWorkout = this.currentWorkout;
        }
      });
  }

  public deleteSet(set: Set): void {
    const indexSet = this.customExercise.sets.findIndex(
      (setTemp) => setTemp._id === set._id
    );
    this.customExercise.sets.splice(indexSet, 1);

    if (this.currentWorkout) {
      this.workoutService.setCurrentWorkout = this.currentWorkout;
    }
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
        });
      }
    });
  }

  public copySet(set: Set, indexSet: number): void {
    const newSet = { ...set };
    delete newSet._id;

    this.customExercise.sets.forEach((sTemp) => {
      if (sTemp.order >= set.order) sTemp.order++;
    });

    this.customExercise.sets.splice(indexSet, 0, newSet);

    this.customExerciseService
      .copySetOnCustomExercise(newSet.order, this.customExercise)
      .subscribe((resUCE) => {
        this.customExercise.sets = resUCE.sets;
        if (this.currentWorkout) {
          this.workoutService.setCurrentWorkout = this.currentWorkout;
        }
      });
  }

  private sortCurrentSets(): void {
    this.customExercise.sets.sort((a, b) => a.order - b.order);
  }

  public sortSets(sets: any[]): any[] {
    if (!sets) return [];
    return [...sets].sort((a, b) => a.order - b.order);
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
    if (set.rir === -1) {
      return 'FALLO';
    } else if (set.rir !== undefined && set.rir !== null) {
      return set.rir + '';
    } else {
      return ' - ';
    }
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
    // Check if fail in execution (rir = -1)
    if (set?.rir === -1) {
      return true;
    }

    // Check expected fail (objective) - only check expectedRir
    const hasFailInExpectedRir =
      Array.isArray(set?.expectedRir) &&
      set.expectedRir.some((value) => Number(value) === -1);

    return !!hasFailInExpectedRir;
  }

  public trackBySet(index: number, item: Set): string {
    return item._id;
  }
}
