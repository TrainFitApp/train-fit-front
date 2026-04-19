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
    private ionicUtilService: IonicUtilService
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
        header: '¿Estás seguro?',
        message: '¿Deseas guardar los cambios en el orden de los ejercicios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.modalController.dismiss();
            },
          },
          {
            text: 'Confirmar',
            handler: () => {
              this.loading = true;
              this.workoutService
                .updateWorkoutsOrder(
                  this.idWorkout,
                  this.idTable,
                  this.initialCustomExercisesOrder
                )
                .subscribe(() => {
                  let indexWorkout: number;

                  // Obtener índice de Workout
                  this.tableService.tableInUse.splits.forEach((sTemp) => {
                    sTemp.workouts.forEach((wTemp, iW) => {
                      if (wTemp._id.toString() === this.idWorkout) {
                        indexWorkout = iW;
                      }
                    });
                  });

                  this.tableService.tableInUse.splits.forEach((sTemp) => {
                    sTemp.workouts.forEach((wTemp, iW) => {
                      if (iW === indexWorkout) {
                        // Copiar el array de ejercicios y reorganizar según `newOrder`
                        const newOrderedExercises =
                          this.initialCustomExercisesOrder.map(
                            (index) => wTemp.exercises[index]
                          );

                        wTemp.exercises = newOrderedExercises;
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
      message: 'Has restablecido el orden de los ejercicios',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    } as ToastOptions);
  }
}
