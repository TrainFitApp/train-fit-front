import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { TutorialService } from 'src/app/core/services/tutorial/tutorial.service';

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
  @Input()
  public reorderMode: boolean = false;
  @Input()
  public originalIndex: number | undefined;

  @Output()
  public deleteSet = new EventEmitter();
  @Output()
  public copySet = new EventEmitter();
  @Output()
  public confSet = new EventEmitter();
  @Output()
  public reorderSets = new EventEmitter<void>();

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
    private translate: TranslateService,
    private tutorialService: TutorialService
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
          time: this.set?.time ?? null,
          distance: this.set?.distance,
        },
        { emitEvent: false }
      );
    }
  }

  public get isCardio(): boolean {
    return !!this.currentWorkout?.exercises?.[this.indexCustomExercise]
      ?.exercise?.isCardio;
  }

  public get isIsometric(): boolean {
    return !!this.currentWorkout?.exercises?.[this.indexCustomExercise]
      ?.exercise?.isIsometric;
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
      reps: new FormControl(this.set?.reps, [Validators.min(0), Validators.max(999)]),
      weight: new FormControl(this.set?.weight, [Validators.min(0), Validators.max(2000)]),
      rir: new FormControl(this.set?.rir ?? null),
      velocity: new FormControl(this.set?.velocity, [Validators.min(0), Validators.max(50)]),
      time: new FormControl(this.set?.time ?? null),
      distance: new FormControl(this.set?.distance, [Validators.min(0), Validators.max(100000)]),
    });

    this.setForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((resSetForm) => {
        // Actualizar solo los valores ejecutados, NO los objetivos
        this.set.velocity = resSetForm.velocity;
        this.set.time = resSetForm.time;
        this.set.distance = resSetForm.distance;
        this.set.doned = resSetForm.doned;
        this.set.reps = resSetForm.reps;
        this.set.weight = resSetForm.weight;

        // Store performed RIR like expectedRir: [-1], [0-10], or [first, second].
        // Explicit null (not `delete`) so a cleared value is still sent to the
        // backend and can be unset there, instead of silently keeping the old one.
        this.set.rir = resSetForm.rir ?? null;

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
    this.tutorialService.notifyEvent('setInteracted');

    // rir can be: null, [-1] (fail), [0-10], or [first, second] for ranges.
    if (this.rirFormControl?.value === value) {
      return;
    }

    // Keep local object in sync immediately; persistence still happens via form valueChanges.
    // Explicit null (not `delete`) so a cleared value still gets sent and unset on save.
    this.set.rir = value ?? null;

    this.setForm.patchValue({ rir: value });
  }

  public onFormValueChange(controlName: string, value: any): void {
    this.tutorialService.notifyEvent('setInteracted');

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
        isCardio: this.isCardio,
        isIsometric: this.isIsometric,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((resSet) => {
      if (resSet.data) {
        this.updateSetFromModal(resSet.data as Set);
      }
    });
  }

  private getActionsPopover(): ACTION_TYPE[] {
    const actions: ACTION_TYPE[] = [];

    // Orden visual coherente: acciones de contenido y finalmente la destructiva.
    actions.push(ACTIONS[this.ACTION_TYPES.edit]);
    actions.push(ACTIONS[this.ACTION_TYPES.moveSets]);
    actions.push(ACTIONS[this.ACTION_TYPES.duplicate]);
    actions.push(ACTIONS[this.ACTION_TYPES.delete]);

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
            isCardio: this.isCardio,
            isIsometric: this.isIsometric,
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

      case ACTIONS[this.ACTION_TYPES.moveSets].id:
        this.reorderSets.emit();
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

