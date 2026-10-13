import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertOptions, ToastOptions } from '@ionic/angular';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { WorkoutBlock } from 'src/app/core/models/workout';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseOrderListComponent } from './exercise-order-list.component';

@Component({
  selector: 'app-order-exercises',
  templateUrl: './order-exercises.page.html',
  styleUrls: ['./order-exercises.page.scss'],
})
export class OrderExercisesPage implements OnInit {
  // `order[posición] = índice original`, la permutación que espera el back.
  public order: number[];
  public customExercises: CustomExercise[];
  // Bloques del entreno: con ellos la lista mueve bloques enteros además de
  // ejercicios sueltos.
  public blocks: WorkoutBlock[] = [];
  public idWorkout: string;
  public idTable: string;
  public hasOrder: boolean;
  public loading: boolean;

  @ViewChild(ExerciseOrderListComponent) private orderList?: ExerciseOrderListComponent;

  constructor(
    private workoutService: WorkoutService,
    private tableService: TableService,
    private userService: UserService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  // Objeto estable: la lista se reconstruye cuando cambia la referencia.
  public orderSource: { exercises: CustomExercise[]; blocks: WorkoutBlock[] };

  public ngOnInit(): void {
    this.order = this.customExercises.map((_, index) => index);
    this.orderSource = { exercises: this.customExercises, blocks: this.blocks || [] };
  }

  public get hasBlocks(): boolean {
    return (this.blocks?.length ?? 0) > 0;
  }

  public onOrderChange(order: number[]): void {
    this.order = order;
    this.hasOrder = order.some((original, position) => original !== position);
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
                .updateWorkoutsOrder(this.idWorkout, this.idTable, this.order)
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
                        wTemp.exercises = this.order.map(
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
    this.orderList?.reset();
    this.order = this.customExercises.map((_, index) => index);
    this.hasOrder = false;

    // Mostrar toast de confirmación usando ionic util
    this.ionicUtilService.showToast({
      message: this.translate.instant('ORDER_EXERCISES.TOAST_RESET'),
      duration: 2000,
      position: 'bottom',
      color: 'success',
    } as ToastOptions);
  }
}
