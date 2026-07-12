import { Component, OnInit } from '@angular/core';
import {
  ItemReorderEventDetail,
  ModalController,
  AlertOptions,
  ToastOptions,
} from '@ionic/angular';
import { Set } from 'src/app/core/models/set';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { formatRirValue } from 'src/app/core/models/rir';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-sets',
  templateUrl: './order-sets.page.html',
  styleUrls: ['./order-sets.page.scss'],
})
export class OrderSetsPage implements OnInit {
  public initialSetsOrder: number[];
  public customExercise: CustomExercise;
  public auxSets: Set[];
  public hasOrder: boolean;
  public loading: boolean;
  public showReorderGroup: boolean = true;

  constructor(
    private customExerciseService: CustomExerciseService,
    private workoutService: WorkoutService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.auxSets = [...this.customExercise.sets];
    this.initialSetsOrder = this.customExercise.sets.map(
      (_, index) => index
    );
  }

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    const fromIndex = ev.detail.from;
    const toIndex = ev.detail.to;
    if (this.initialSetsOrder.length === 0) {
      this.initialSetsOrder = this.auxSets.map((_, index) => index);
    }
    const movedIndex = this.initialSetsOrder.splice(fromIndex, 1)[0];
    this.initialSetsOrder.splice(toIndex, 0, movedIndex);
    ev.detail.complete();
    this.hasOrder = true;
  }

  public dismissModal(): void {
    if (this.hasOrder) {
      const alertOptions: AlertOptions = {
        header: this.translate.instant('ORDER_SETS.ALERT_HEADER'),
        message: this.translate.instant('ORDER_SETS.ALERT_MESSAGE'),
        buttons: [
          {
            text: this.translate.instant('ORDER_SETS.ALERT_CANCEL'),
            role: 'cancel',
            handler: () => {
              this.modalController.dismiss();
            },
          },
          {
            text: this.translate.instant('ORDER_SETS.ALERT_CONFIRM'),
            handler: () => {
              this.saveOrder();
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    } else {
      this.modalController.dismiss();
    }
  }

  private saveOrder(): void {
    this.loading = true;

    const reorderedSets = this.initialSetsOrder.map(
      (index) => this.customExercise.sets[index]
    );

    reorderedSets.forEach((setTemp, index) => {
      setTemp.order = index;
    });

    const setsToUpdate = reorderedSets.filter(
      (setTemp) => setTemp._id && !isNaN(Number(setTemp._id)) === false
    );

    this.customExerciseService
      .updateCustomExercise(
        { ...this.customExercise, sets: reorderedSets },
        [],
        setsToUpdate,
        []
      )
      .subscribe({
        next: (resCustomExercise) => {
          if (this.workoutService.currentWorkout) {
            const workout = this.workoutService.currentWorkout;
            const indexCE = workout.exercises.findIndex(
              (ceTemp) => ceTemp._id === this.customExercise._id
            );
            if (indexCE >= 0) {
              workout.exercises[indexCE] = resCustomExercise;
              this.workoutService.setCurrentWorkout = workout;
            }
          }
          this.modalController.dismiss(resCustomExercise);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  public refreshOrder(): void {
    this.showReorderGroup = false;

    this.auxSets = [...this.customExercise.sets];
    this.initialSetsOrder = this.customExercise.sets.map(
      (_, index) => index
    );
    this.hasOrder = false;

    setTimeout(() => {
      this.showReorderGroup = true;
    }, 0);

    this.ionicUtilService.showToast({
      message: this.translate.instant('ORDER_SETS.TOAST_RESET'),
      duration: 2000,
      position: 'bottom',
      color: 'success',
    } as ToastOptions);
  }

  public getSetLabel(number: number): string {
    return this.translate.instant('ORDER_SETS.SET_LABEL', { number });
  }

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
      return `${expectedReps[0]}-${expectedReps[1]} reps`;
    } else if (firstExpected) {
      return `${expectedReps[0]} reps`;
    } else if (secondExpected) {
      return `${expectedReps[1]} reps`;
    } else {
      return '—';
    }
  }

  public formatExpectedRir(expectedRir: number[]): string {
    if (!expectedRir || expectedRir.length === 0) return '—';

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      (expectedRir[0] === -1 || !isNaN(expectedRir[0]));
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      (expectedRir[1] === -1 || !isNaN(expectedRir[1]));

    if (firstExpected && secondExpected) {
      return `${expectedRir[0]}-${expectedRir[1]} RIR`;
    } else if (firstExpected) {
      return `${expectedRir[0]} RIR`;
    } else if (secondExpected) {
      return `${expectedRir[1]} RIR`;
    } else {
      return '—';
    }
  }

  public formatPerformedRir(rir: unknown): string {
    return formatRirValue(rir, { includeUnit: true });
  }

  public isFail(set: any): boolean {
    return (
      Array.isArray(set?.expectedRir) &&
      set.expectedRir.some((value: any) => Number(value) === -1)
    );
  }
}
