import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PopoverController, ToastOptions } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';

import { MUSCLE_GROUPS } from '../../../../../../../../shared/constants/muscle-groups';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.page.html',
  styleUrls: ['./table-card.page.scss'],
})
export class TableCardPage {
  @Input()
  public tableCard: Table;
  @Input()
  public user: User;
  @Input()
  public own: boolean;
  @Input()
  public ownFilter: boolean;

  @Output()
  public copyOwnTableEv = new EventEmitter<Table>();
  @Output()
  public deletedTable = new EventEmitter<string>();

  @ViewChild('bar', { static: false })
  public barChartRef: ElementRef;

  public loadAction: boolean = true;
  public progress: number = 0;
  public context: CanvasRenderingContext2D;
  public bar: Chart;

  public MUSCLE_GROUPS = MUSCLE_GROUPS;
  public isMenuOpen = false;
  public menuEvent?: Event;

  public get microcyclesCount(): number {
    if (typeof this.tableCard?.microcyclesCount === 'number') {
      return this.tableCard.microcyclesCount;
    }
    return this.tableCard?.splits?.length || 0;
  }

  public get workoutsCount(): number {
    if (typeof this.tableCard?.workoutsCount === 'number') {
      return this.tableCard.workoutsCount;
    }
    return this.tableCard?.splits?.[0]?.workouts?.length || 0;
  }

  constructor(
    private userService: UserService,
    private tableService: TableService,
    private workoutService: WorkoutService,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
    private popoverController: PopoverController
  ) {}

  public setSelectedTableCard(): void {
    if (!this.own) {
      if (this.ownFilter) this.useTable();
    }
  }

  public openMenu(event: Event): void {
    event.stopPropagation();
    this.menuEvent = event;
    this.isMenuOpen = true;
  }

  public onMenuDidDismiss(): void {
    this.isMenuOpen = false;
    this.menuEvent = undefined;
  }

  public initChart() {
    const labels = this.MUSCLE_GROUPS;
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Ejercicios',
          data: [1, 2, 3, 4, 5, 6, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 2,
        },
      ],
    };

    if (this.bar) this.bar.destroy();

    this.context = (<HTMLCanvasElement>(
      this.barChartRef.nativeElement
    )).getContext('2d');

    this.bar = new Chart(this.context, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  public useTable(): void {
    if (this.user.tableInUse) {
      const alOptions = {
        header: 'Rutina en uso',
        message:
          'Tienes una rutina en uso actualmente, si seleccionas otra, se guardrá la actual en Mis rutinas',
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
          },
          {
            text: 'CONFIRMAR',
            role: 'confirm',
            handler: () => this.showConfirmationDialog(),
          },
        ],
      };
      this.ionicUtilService.showAlert(alOptions);
    } else {
      this.showConfirmationDialog();
    }
  }

  private showConfirmationDialog(): void {
    const html = this.ownFilter
      ? 'Siempre puedes pausar y elegir otra'
      : 'Se añadirá a Mis rutinas y se iniciará';

    const alertOptions = {
      header: 'Usar ' + this.tableCard.name,
      message: html,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'alert-button-primary',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-success',
          handler: () => {
            this.loadAction = false;
            if (this.ownFilter) {
              this.user.tableInUse = this.tableCard._id;
              this.userService.updateUser(this.user).subscribe(() => {
                this.tableService
                  .getTableById(this.tableCard._id)
                  .subscribe((resTable) => {
                    this.tableService.setCurrentTable = resTable;
                    this.workoutService.setCurrentWorkout = undefined;
                    delete this.user.workoutInUse;
                    this.userService.updateUser(this.user).subscribe(() => {
                      this.navigationService.goToMesocycle();
                      this.loadAction = true;
                      const toastOptions: ToastOptions = {
                        message: 'Rutina iniciada con éxito',
                        duration: 2000,
                      };
                      this.ionicUtilService.showToast(toastOptions);
                    });
                  });
              });
            } else {
              this.tableService
                .copyTable(this.user._id, this.tableCard._id)
                .subscribe((resTable) => {
                  this.user.tableInUse = resTable._id;
                  this.user.ownTables.push(resTable._id);
                  this.tableService.setCurrentTable = resTable;
                  this.workoutService.setCurrentWorkout = undefined;
                  delete this.user.workoutInUse;
                  this.userService.updateUser(this.user).subscribe(() => {
                    this.navigationService.goToMesocycle();
                  });
                  this.loadAction = true;
                  const toastOptions: ToastOptions = {
                    message: 'Rutina adquirida e iniciada con éxito',
                    duration: 2000,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                });
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public editTableName(): void {
    this.popoverController.dismiss();
    const alertOptions = {
      header: 'Editar nombre de rutina',
      inputs: [
        {
          name: 'tableName',
          type: 'textarea' as 'textarea',
          value: this.tableCard.name,
          placeholder: 'Nombre de la rutina',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-primary',
          handler: (data) => {
            if (data.tableName.trim() === '') {
              this.ionicUtilService.showToast({
                message: 'El campo no puede estar vacío',
                duration: 2000,
              });
              return false;
            }
            this.tableCard.name = data.tableName;
            this.tableService.updateTableName(this.tableCard).subscribe(() => {
              this.tableService.setCurrentTable = {
                ...this.tableService.tableInUse,
                name: data.tableName,
              };
              const message = 'Nombre de rutina actualizado';
              const duration = 1000;
              const toastOptions: ToastOptions = {
                message: message,
                duration: duration,
              };
              this.ionicUtilService.showToast(toastOptions);
            });
            return true;
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public copyOwnTable(idTable: string, event: Event): void {
    this.popoverController.dismiss();
    event.stopPropagation();
    const alertOptions = {
      header: 'Duplicar ' + this.tableCard.name,
      message: 'Se copiará todo el contenido de la rutina',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.loadAction = false;
            this.tableService
              .copyOwnTable(this.user._id, idTable)
              .subscribe((resTable) => {
                this.copyOwnTableEv.emit(resTable);
                const toastOptions: ToastOptions = {
                  message: this.tableCard.name + ' copiada',
                  duration: 1000,
                };
                this.ionicUtilService.showToast(toastOptions);
                this.loadAction = true;
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public deleteTable(idTable: string, event: Event): void {
    this.popoverController.dismiss();
    event.stopPropagation();
    const message =
      this.user.tableInUse === idTable
        ? 'Esta rutina está actualmente en uso. Si la eliminas se te desvinculará y después se eliminará de manera irreversible'
        : 'Se eliminará la rutina de manera irreversible';

    const alertOptions = {
      header: 'Eliminar ' + this.tableCard.name,
      message,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.loadAction = false;
            this.tableService
              .deleteTableById(this.user._id, idTable)
              .subscribe(() => {
                this.deletedTable.emit(idTable);
                const toastOptions: ToastOptions = {
                  message: this.tableCard.name + ' eliminada',
                  duration: 1000,
                };
                this.ionicUtilService.showToast(toastOptions);
                this.loadAction = true;
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }
}
