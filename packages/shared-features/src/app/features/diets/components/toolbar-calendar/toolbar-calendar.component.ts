import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertOptions, PopoverOptions, ToastOptions } from '@ionic/angular';
import { DietDay } from 'src/app/core/models/dietDay';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ARCHIVED_TYPES } from 'src/app/features/profile/models/archives';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTIONS,
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
} from 'src/app/shared/constants/actions';
import { MONTHS } from 'src/app/shared/constants/months';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';

@Component({
  selector: 'app-toolbar-calendar',
  templateUrl: './toolbar-calendar.component.html',
  styleUrls: ['./toolbar-calendar.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class ToolbarCalendarComponent {
  @Input()
  public load!: boolean;

  @Input()
  public dietDay!: DietDay;

  @Output()
  public selectCalendarDayEmit = new EventEmitter<string>();

  @Output()
  public pasteDietDayMode = new EventEmitter<void>();

  public calendarISODate!: string;

  public month!: string;
  public year!: number;

  private _service:
    | WorkoutService
    | TableService
    | DietDayService
    | MealService;

  public actionsPopover: ACTION_TYPE[];

  public ACTION_TYPES = ACTION_TYPES;
  public ACTION_VALUES = ACTION_VALUES;
  public ACTIONS = ACTIONS;
  public ARCHIVED_TYPES = ARCHIVED_TYPES;

  constructor(
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private tableService: TableService,
    private mealService: MealService,
    private workoutService: WorkoutService,
    private userService: UserService,
    private ionicUtilService: IonicUtilService
  ) {
    this.setFullDate();
  }

  public selectCalendarDay(dateISO: string): void {
    this.calendarISODate = dateISO;
    this.selectCalendarDayEmit.emit(dateISO);
  }

  public selectToday(): void {
    this.selectCalendarDayEmit.emit(this.utilService.formatDateToYYYYMMDD(new Date()));
  }

  public onDateSelected(dateISO: string): void {
    this.selectCalendarDayEmit.emit(dateISO);
  }

  public openMacrosOptions(event: Event): void {
    this.getActionsPopover();

    if (this.actionsPopover.length > 0) {
      const popover: PopoverOptions = {
        component: PopoverActionsComponent,
        componentProps: {
          actionsPopover: this.actionsPopover,
        },
        event: event,
      };

      this.ionicUtilService.showPopover(popover).then((res) => {
        this.handleAction(res.data);
      });
    } else {
      const message = 'No hay acciones disponibles';
      const duration = 500;

      const toastOptions: ToastOptions = {
        message: message,
        duration: duration,
      };

      this.ionicUtilService.showToast(toastOptions);
    }
  }

  private getActionsPopover(): void {
    this.actionsPopover = [];
    if (this.dietDay?._id) {
      this.actionsPopover = this.ACTION_VALUES.filter(
        (actionTemp) =>
          actionTemp.id !== this.ACTION_TYPES.deselect &&
          actionTemp.id !== this.ACTION_TYPES.moveExercises &&
          actionTemp.id !== this.ACTION_TYPES.edit &&
          actionTemp.id !== this.ACTION_TYPES.duplicate
      );

      // Sort to put delete at the end
      this.actionsPopover.sort((a, b) => {
        if (a.id === ACTIONS[this.ACTION_TYPES.delete].id) return 1;
        if (b.id === ACTIONS[this.ACTION_TYPES.delete].id) return -1;
        return 0;
      });
    }
  }

  private showToast(message: string): void {
    const duration = 2000;
    const toast: ToastOptions = { message: message, duration: duration };
    this.ionicUtilService.showToast(toast);
  }

  private handleAction(actionType: ACTION_TYPE): void {
    this.initService();

    switch (actionType) {
      case ACTIONS[this.ACTION_TYPES.copy]:
        this.handleCopy();
        break;

      case ACTIONS[this.ACTION_TYPES.note]:
        this.manageNote();
        break;

      case ACTIONS[this.ACTION_TYPES.delete]:
        this.handleDelete();
        break;
    }
  }

  private initService(): void {
    if (this.dietDay) {
      this._service = this.dietDayService as DietDayService;
    }
  }

  private handleCopy(): void {
    (this._service as DietDayService).setDietDayClipboard = this.dietDay;
    this.pasteDietDayMode.emit();
    const message = `${this.formatDateDDMMYYYY(
      this.dietDay.date
    )} copiado al portapapeles`;
    this.showToast(message);
  }

  private formatDateDDMMYYYY(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  private manageNote(): void {
    const alertOptions: AlertOptions = {
      header: 'Nota',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Escribe tu nota aquí...',
          value: this.dietDay.notes || '',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.dietDay.notes = data.notes;
            (this._service as DietDayService)
              .updateDietDay(this.dietDay)
              .subscribe(() => {
                const message = 'Nota actualizada';
                this.showToast(message);
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private handleDelete(): void {
    const alertOptions: AlertOptions = {
      header: '¿Estás seguro?',
      message: `Se eliminará el día ${this.utilService.toStringDateDateFormat(
        this.utilService.parseYYYYMMDD(this.dietDay.date)
      )}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            (this._service as DietDayService)
              .deleteDietDay(
                this.userService.getLocalUser.dietInUse,
                this.dietDay._id
              )
              .subscribe(() => {
                const date = this.utilService.toStringDateDateFormat(
                  this.utilService.parseYYYYMMDD(this.dietDay.date)
                );
                const message = `${date} eliminado`;
                this.showToast(message);
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private setFullDate(): void {
    this.utilService.getCurrentDate.subscribe((resDate) => {
      const d = this.utilService.parseYYYYMMDD(resDate);
      this.month = MONTHS[d.getMonth()];
      this.year = d.getFullYear();
    });
  }
}

