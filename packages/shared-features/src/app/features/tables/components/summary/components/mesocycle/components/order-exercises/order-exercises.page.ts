import { Component, OnInit } from '@angular/core';
import {
  ItemReorderEventDetail,
  ModalController,
  AlertOptions,
  ToastOptions,
} from '@ionic/angular';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-exercises',
  templateUrl: './order-exercises.page.html',
  styleUrls: ['./order-exercises.page.scss'],
})
export class OrderExercisesPage implements OnInit {
  public initialCustomExercisesOrder: number[];
  public customExercises: CustomExercise[];
  public auxCustomExercises: CustomExercise[];
  public idWorkout: string;
  public idTable: string;
  public hasOrder: boolean;
  public loading: boolean;
  public showReorderGroup: boolean = true;

  constructor(
    private workoutService: WorkoutService,
    private tableService: TableService,
    private userService: UserService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.auxCustomExercises = [...this.customExercises];
    this.initialCustomExercisesOrder = this.customExercises.map(
      (_, index) => index
    );
  }

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    const fromIndex = ev.detail.from;
    const toIndex = ev.detail.to;
    if (this.initialCustomExercisesOrder.length === 0) {
      this.initialCustomExercisesOrder = this.auxCustomExercises.map(
        (_, index) => index
      );
    }
    const movedIndex = this.initialCustomExercisesOrder.splice(fromIndex, 1)[0];
    this.initialCustomExercisesOrder.splice(toIndex, 0, movedIndex);
    console.log('Updated Order of Indices:', this.initialCustomExercisesOrder);
    ev.detail.complete();
    this.hasOrder = true;
  }

  public dismissModal(): void {
    if (this.hasOrder) {
      const alertOptions: AlertOptions = {
        header: this.translate.instant('ORDER_EXERCISES.ALERT_HEADER'),
        message: this.translate.instant('ORDER_EXERCISES.ALERT_MESSAGE'),
        buttons: [
          {
            text: this.translate.instant('ORDER_EXERCISES.ALERT_CANCEL'),
            role: 'cancel',
            handler: () => {
              this.modalController.dismiss();
            },
          },
          {
            text: this.translate.instant('ORDER_EXERCISES.ALERT_CONFIRM'),
            handler: () => {
              this.loading = true;
              this.workoutService
                .updateWorkoutsOrder(
                  this.idWorkout,
                  this.idTable,
                  this.initialCustomExercisesOrder
                )
                .subscribe((res) => {
                  // Esta sesión se reordena aquí; las de la misma fila en los
                  // demás microciclos, con lo que devuelve el back (solo las
                  // que tenían los mismos ejercicios en el mismo orden).
                  const rowWorkouts = new Map(
                    (res?.rowWorkouts || []).map((rowWorkout) => [rowWorkout._id, rowWorkout])
                  );
                  this.tableService.tableInUse.splits.forEach((sTemp) => {
                    sTemp.workouts.forEach((wTemp) => {
                      if (wTemp._id.toString() === this.idWorkout) {
                        wTemp.exercises = this.initialCustomExercisesOrder.map(
                          (index) => wTemp.exercises[index]
                        );
                      } else if (rowWorkouts.has(wTemp._id)) {
                        wTemp.exercises = rowWorkouts.get(wTemp._id).exercises;
                      }

                      if (
                        wTemp._id === this.userService.getLocalUser.workoutInUse
                      )
                        this.workoutService.setCurrentWorkout = wTemp;
                    });
                  });

                  this.tableService.setCurrentTable =
                    this.tableService.tableInUse;
                  this.modalController.dismiss();
                });
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    } else {
      this.modalController.dismiss();
    }
  }

  public refreshOrder(): void {
    // Ocultar temporalmente el reorder group para forzar recreación
    this.showReorderGroup = false;

    // Resetear el orden a su estado inicial
    this.auxCustomExercises = [...this.customExercises];
    this.initialCustomExercisesOrder = this.customExercises.map(
      (_, index) => index
    );
    this.hasOrder = false;

    // Mostrar el reorder group nuevamente después de un tick
    setTimeout(() => {
      this.showReorderGroup = true;
    }, 0);

    // Mostrar toast de confirmación usando ionic util
    this.ionicUtilService.showToast({
      message: this.translate.instant('ORDER_EXERCISES.TOAST_RESET'),
      duration: 2000,
      position: 'bottom',
      color: 'success',
    } as ToastOptions);
  }
}
