import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, ModalOptions, PopoverOptions } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Set } from 'src/app/core/models/set';
import { RirValue } from 'src/app/core/models/rir';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';
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
import { SetService } from 'src/app/core/services/set/set.service';
import {
  integerRangeValidator,
  numberRangeValidator,
  VALIDATION_LIMITS,
} from 'src/app/core/constants/validation-limits';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit, OnChanges {
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
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Si el set cambia después de la inicialización, actualizar el formulario
    if (changes['set'] && !changes['set'].firstChange && this.setForm) {
      this.setForm.patchValue(
        {
          doned: this.set?.doned,
          reps: this.set?.reps,
          weight: this.set?.weight,
          rir: this.set?.rir ?? null,
          velocity: this.set?.velocity,
          timeMin: this.set?.timeMin,
          timeSec: this.set?.timeSec,
        },
        { emitEvent: false }
      );
    }
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
      reps: new FormControl(this.set?.reps, [
        integerRangeValidator(
          VALIDATION_LIMITS.workout.repsMin,
          VALIDATION_LIMITS.workout.repsMax
        ),
      ]),
      weight: new FormControl(this.set?.weight, [
        numberRangeValidator(
          VALIDATION_LIMITS.workout.weightMin,
          VALIDATION_LIMITS.workout.weightMax
        ),
      ]),
      rir: new FormControl(this.set?.rir ?? null),
      velocity: new FormControl(this.set?.velocity, [
        numberRangeValidator(
          VALIDATION_LIMITS.workout.velocityMin,
          VALIDATION_LIMITS.workout.velocityMax
        ),
      ]),
      timeMin: new FormControl(this.set?.timeMin, [
        integerRangeValidator(
          VALIDATION_LIMITS.workout.minutesMin,
          VALIDATION_LIMITS.workout.minutesMax
        ),
      ]),
      timeSec: new FormControl(this.set?.timeSec, [
        integerRangeValidator(
          VALIDATION_LIMITS.workout.secondsMin,
          VALIDATION_LIMITS.workout.secondsMax
        ),
      ]),
    });

    this.setForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((resSetForm) => {
        if (this.setForm.invalid) {
          return;
        }
        // Actualizar solo los valores ejecutados, NO los objetivos
        this.set.velocity = resSetForm.velocity;
        this.set.timeMin = resSetForm.timeMin;
        this.set.timeSec = resSetForm.timeSec;
        this.set.doned = resSetForm.doned;
        this.set.reps = resSetForm.reps;
        this.set.weight = resSetForm.weight;

        if (resSetForm.rir === null || resSetForm.rir === undefined) {
          delete this.set.rir;
        } else {
          // Store performed RIR like expectedRir: [-1], [0-10], or [first, second].
          this.set.rir = resSetForm.rir;
        }

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

  public onRirValueChange(value: RirValue): void {
    // rir can be: null, [-1] (fail), [0-10], or [first, second] for ranges.
    if (this.rirFormControl?.value === value) {
      return;
    }

    // Keep local object in sync immediately; persistence still happens via form valueChanges.
    if (value === null || value === undefined) {
      delete this.set.rir;
    } else {
      this.set.rir = value;
    }

    this.setForm.patchValue({ rir: value });
  }

  public onFormValueChange(controlName: string, value: any): void {
    const control = this.getFormControl(controlName);
    if (!control) {
      return;
    }
    if (control.value === value) {
      return;
    }
    control.patchValue(value);
  }

  public showDeleteSweetAlert(): void {
    const alertOptions = {
      header: this.translate.instant('TABLES.DELETE_SET'),
      message: this.translate.instant('TABLES.DELETE_SET_CONFIRM'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
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
        this.updateSetFromModal(resSet.data as Set);
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
            this.updateSetFromModal(resSet.data as Set);
          }
        });
        break;

      case ACTIONS[this.ACTION_TYPES.delete].id:
        this.showDeleteSweetAlert();
        break;
    }
  }

  private updateSetFromModal(set: Set): void {
    this.setService.updateSet(set).subscribe((resS) => {
      const sets = this.currentWorkout.exercises[this.indexCustomExercise].sets;
      const indexSet = sets.findIndex((sTemp) => sTemp._id === resS._id);

      sets[indexSet] = resS;
      this.set = resS;
      this.workoutService.setCurrentWorkout = this.currentWorkout;
    });
  }

  public isFail(set: any): boolean {
    // In the objective header, FAIL must only reflect expected RIR, not executed RIR.
    return (
      Array.isArray(set?.expectedRir) &&
      set.expectedRir.some((value) => Number(value) === -1)
    );
  }
}

