import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, ModalOptions, PopoverOptions } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Set } from 'src/app/core/models/set';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { SetService } from '../../../../../../../../core/services/set/set.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  @Input()
  public set: Set;
  @Input()
  public index: number;
  @Input()
  public indexCustomExercise: number;
  @Input()
  public currentWorkout: Workout;
  // @Input()
  // public disabled: boolean;

  @Output()
  public deleteSet = new EventEmitter();
  @Output()
  public copySet = new EventEmitter();
  @Output()
  public confSet = new EventEmitter();

  public isDeleting: boolean;
  public setForm: FormGroup = new FormGroup({});

  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;

  constructor(
    private utilService: UtilService,
    private setService: SetService,
    private workoutService: WorkoutService,
    private customExerciseService: CustomExerciseService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public get rirFormControl(): FormControl {
    return this.setForm.get('rir') as FormControl;
  }

  public getFormControl(controlName: string): FormControl {
    return this.setForm.get(controlName) as FormControl;
  }

  private initForm(): void {
    this.setForm = new FormGroup({
      doned: new FormControl(this.set?.doned),
      reps: new FormControl(this.set?.reps),
      repsRangeStart: new FormControl(this.set?.expectedReps?.[0]),
      repsRangeEnd: new FormControl(this.set?.expectedReps?.[1]),
      weight: new FormControl(this.set?.weight),
      rir: new FormControl(this.set?.rir ?? null),
      rirRangeStart: new FormControl(this.set?.expectedRir?.[0]),
      rirRangeEnd: new FormControl(this.set?.expectedRir?.[1]),
      velocity: new FormControl(this.set?.velocity),
      timeMin: new FormControl(this.set?.timeMin),
      timeSec: new FormControl(this.set?.timeSec),
      expectedMin: new FormControl(this.set?.expectedMin),
      expectedSec: new FormControl(this.set?.expectedSec),
    });

    this.setForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((resSetForm) => {
        if (
          (resSetForm.repsRangeStart !== undefined &&
            resSetForm.repsRangeStart !== null) ||
          (resSetForm.repsRangeEnd !== undefined &&
            resSetForm.repsRangeEnd !== null)
        ) {
          if (!this.set.expectedReps) {
            this.set.expectedReps = [];
          }
          this.set.expectedReps[0] = resSetForm.repsRangeStart;
          this.set.expectedReps[1] = resSetForm.repsRangeEnd;
        } else {
          if (this.set.expectedReps) {
            delete this.set.expectedReps;
          }
        }

        delete resSetForm.repsRangeStart;
        delete resSetForm.repsRangeEnd;

        if (this.set.expectedRir) {
          this.set.expectedRir[0] = resSetForm.rirRangeStart;
          this.set.expectedRir[1] = resSetForm.rirRangeEnd;
        }

        delete resSetForm.rirRangeStart;
        delete resSetForm.rirRangeEnd;

        this.set.velocity = resSetForm.velocity;
        this.set.timeMin = resSetForm.timeMin;
        this.set.timeSec = resSetForm.timeSec;
        this.set.doned = resSetForm.doned;
        this.set.reps = resSetForm.reps;
        this.set.weight = resSetForm.weight;
        this.set.rir = resSetForm.rir;
        this.set.expectedFail = resSetForm.expectedFail;
        this.set.fail = resSetForm.fail;

        this.setService.updateSet(this.set).subscribe(() => {
          if (this.currentWorkout) {
            this.currentWorkout.exercises.forEach(
              (exerciseTemp, indexExercise) => {
                exerciseTemp.sets.forEach((setTemp, indexSet) => {
                  if (setTemp._id === this.set._id) {
                    this.currentWorkout.exercises[indexExercise].sets[
                      indexSet
                    ] = this.set;
                  }
                });
              }
            );

            this.workoutService.setCurrentWorkout = this.currentWorkout;
          }
        });
      });
  }

  public configSet(set: Set): void {
    this.confSet.emit(set);
  }

  public onRirValueChange(value: number | null): void {
    // rir can now be: null, -1 (fail), or a number (0-10)
    this.setForm.patchValue({ rir: value });
  }

  public onFormValueChange(controlName: string, value: any): void {
    this.setForm.patchValue({ [controlName]: value });
  }

  public showDeleteSweetAlert(): void {
    const alertOptions = {
      header: 'Eliminar serie',
      message: '¿Estás seguro de que quieres eliminar esta serie?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            this.setForm.disable({ emitEvent: false });

            this.setService.deleteSet(this.set._id).subscribe(() => {
              this.deleteSet.emit(this.set);
              this.setForm.enable({ emitEvent: false });
            });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public showPopoverOptions(event: Event, set: Set): void {
    if (this.set._id === set._id) {
      const popover: PopoverOptions = {
        component: PopoverActionsComponent,
        componentProps: {
          actionsPopover: this.getActionsPopover(),
        },
        event: event,
      };

      const showPopover = this.ionicUtilService.showPopover(popover);
      showPopover.then((res) => this.handleActions(res.data));
    }

    event.stopPropagation();
  }

  public editSet(): void {
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        set: this.set,
        isCardio:
          this.currentWorkout.exercises[this.indexCustomExercise].exercise
            .isCardio,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((resSet) => {
      if (resSet.data) {
        this.setService.updateSet(resSet.data as Set).subscribe((resS) => {
          const indexSet = this.currentWorkout.exercises[
            this.indexCustomExercise
          ].sets.findIndex((sTemp) => sTemp._id === resS._id);
          this.currentWorkout.exercises[this.indexCustomExercise].sets[
            indexSet
          ] = resS;
        });
      }
    });
  }

  private getActionsPopover(): ACTION_TYPE[] {
    let actions = this.ACTION_VALUES;

    actions = actions.filter(
      (actionTemp) =>
        actionTemp.id === ACTIONS[this.ACTION_TYPES.duplicate].id ||
        actionTemp.id === ACTIONS[this.ACTION_TYPES.edit].id ||
        actionTemp.id === ACTIONS[this.ACTION_TYPES.delete].id
    );

    return actions;
  }

  private handleActions(action: ACTION_TYPE): void {
    switch (action?.id) {
      case ACTIONS[this.ACTION_TYPES.duplicate].id:
        this.copySet.emit(this.set);
        break;

      case ACTIONS[this.ACTION_TYPES.edit].id:
        const modalOptions: ModalOptions = {
          component: ManageSetComponent,
          componentProps: {
            set: this.set,
            isCardio:
              this.currentWorkout.exercises[this.indexCustomExercise].exercise
                .isCardio,
          },
        };

        this.ionicUtilService.showModal(modalOptions).then((resSet) => {
          if (resSet.data) {
            this.setService.updateSet(resSet.data as Set).subscribe((resS) => {
              const indexSet = this.currentWorkout.exercises[
                this.indexCustomExercise
              ].sets.findIndex((sTemp) => sTemp._id === resS._id);
              this.currentWorkout.exercises[this.indexCustomExercise].sets[
                indexSet
              ] = resS;
            });
          }
        });
        break;

      case ACTIONS[this.ACTION_TYPES.delete].id:
        this.showDeleteSweetAlert();
        break;
    }
  }

  public isFail(set: any): boolean {
    return !!(
      set.fail ||
      set.expectedFail ||
      set.rir === -1 ||
      (set.expectedRir &&
        (set.expectedRir[0] === -1 || set.expectedRir[1] === -1))
    );
  }
}
