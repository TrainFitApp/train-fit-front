import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, AlertInput, AlertOptions, PopoverOptions, ToastOptions } from '@ionic/angular';
import { DietDay } from 'src/app/core/models/dietDay';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTIONS,
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
} from 'src/app/shared/constants/actions';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';

@Component({
  selector: 'app-toolbar-calendar',
  templateUrl: './toolbar-calendar.component.html',
  styleUrls: ['./toolbar-calendar.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class ToolbarCalendarComponent implements OnInit, OnDestroy {
  @Input()
  public load!: boolean;

  @Input()
  public dietDay!: DietDay;

  @Input()
  public pinnedNote!: string;

  @Output()
  public selectCalendarDayEmit = new EventEmitter<string>();

  @Output()
  public pasteDietDayMode = new EventEmitter<void>();

  @Output()
  public pinnedNoteChange = new EventEmitter<string>();

  @Output()
  public loadingChange = new EventEmitter<boolean>();

  public calendarISODate!: string;

  public month!: string;
  public year!: number;

  private currentDietDate!: Date;
  private langChangeSubscription: any;

  private _service:
    | WorkoutService
    | TableService
    | DietDayService
    | MealService;

  public actionsPopover: ACTION_TYPE[];

  public ACTION_TYPES = ACTION_TYPES;
  public ACTION_VALUES = ACTION_VALUES;
  public ACTIONS = ACTIONS;

  public readonly coachService = inject(CoachService);
  private readonly router = inject(Router);

  constructor(
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {
    this.setFullDate();
  }

  public ngOnInit(): void {
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      (_event: LangChangeEvent) => this.updateMonthLabel()
    );
  }

  public ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
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

  public openShoppingList(): void {
    void this.router.navigate(['/my-shopping-list']);
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
    }
  }

  private getActionsPopover(): void {
    this.actionsPopover = [];
    if (this.dietDay?._id) {
      // Orden visual coherente: acciones de contenido y finalmente la destructiva.
      this.actionsPopover.push(ACTIONS[this.ACTION_TYPES.note]);
      this.actionsPopover.push(ACTIONS[this.ACTION_TYPES.copy]);
      this.actionsPopover.push(ACTIONS[this.ACTION_TYPES.delete]);
    } else {
      // Only show Note option when diet-day doesn't exist yet
      this.actionsPopover = this.ACTION_VALUES.filter(
        (actionTemp) => actionTemp.id === ACTIONS[this.ACTION_TYPES.note].id
      );
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
    this.showToast(
      this.translate.instant('TOOLBAR_CALENDAR.DATE_COPIED', {
        date: this.formatDateDDMMYYYY(this.dietDay.date),
      })
    );
  }

  private formatDateDDMMYYYY(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  private manageNote(): void {
    const t = this.translate.instant.bind(this.translate);

    let shouldPin = false;

    const confirmButtons: AlertButton[] = [
      {
        text: t('COMMON.SAVE'),
        handler: () => {
          shouldPin = false;
          return true;
        },
      },
      {
        text: t('NOTES.PIN_TO_POSITION'),
        cssClass: 'alert-button-pin',
        handler: () => {
          shouldPin = true;
          return true;
        },
      },
    ];

    const alertInputs: AlertInput[] = [
      {
        name: 'notes',
        type: 'textarea',
        placeholder: t('TOOLBAR_CALENDAR.NOTE_PLACEHOLDER'),
        value: this.dietDay.notes || '',
        attributes: { maxlength: 500 },
      },
    ];

    const alertOptions: AlertOptions = {
      header: t('TOOLBAR_CALENDAR.NOTE_HEADER'),
      inputs: alertInputs,
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        ...confirmButtons,
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then(async (result) => {
      if (result.role === 'cancel') return;

      const notesValue = (result.data?.values?.notes || '').trim();
      if (!notesValue) {
        const errorAlert: AlertOptions = {
          header: t('COMMON.ERROR'),
          message: t('COMMON.FIELD_REQUIRED'),
          buttons: [t('COMMON.OK')],
        };
        this.ionicUtilService.showAlert(errorAlert);
        return;
      }

      if (shouldPin) {
        this.dietDayService.setPinnedNote(notesValue).subscribe({
          next: (pinnedNote) => {
            this.pinnedNoteChange.emit(pinnedNote);
            this.showToast(t('TOOLBAR_CALENDAR.NOTE_UPDATED'));
          },
          error: (err) => console.error('[ToolbarCalendar] Failed to update pinned note', err),
        });
        return;
      }

      // Una sola llamada tanto si el día existe como si no: la nota va por
      // fecha y el backend asegura el día (ver DietDayService#updateDietDay).
      // Antes, para un día que aún no existía, eran tres peticiones — y si la
      // fecha ya tenía día en base de datos pero esta pantalla no lo tenía con
      // _id, la primera creaba un día duplicado.
      const hadDietDay = !!this.dietDay._id;
      this.dietDay.notes = notesValue;
      if (!hadDietDay) this.loadingChange.emit(true);

      (this._service as DietDayService).updateDietDay(this.dietDay).subscribe({
        next: () => {
          if (!hadDietDay) this.selectCalendarDayEmit.emit(this.dietDay.date);
          this.showToast(t('TOOLBAR_CALENDAR.NOTE_UPDATED'));
        },
        error: (err) => {
          if (!hadDietDay) this.loadingChange.emit(false);
          console.error('[ToolbarCalendar] Failed to save note', err);
        },
      });
    });
  }

  public managePinnedNote(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('NOTES.TITLE'),
      cssClass: 'alert-grid-buttons',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.pinnedNote || '',
          placeholder: t('NOTES.PLACEHOLDER'),
          attributes: { maxlength: 500 },
        },
      ],
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: t('COMMON.SAVE'),
          handler: (data) => {
            const newNotes = (data.notes || '').trim();
            this.dietDayService.setPinnedNote(newNotes).subscribe({
              next: (pinnedNote) => {
                this.pinnedNoteChange.emit(pinnedNote);
                this.showToast(t('TOOLBAR_CALENDAR.NOTE_UPDATED'));
              },
              error: (err) => console.error('[ToolbarCalendar] Failed to update pinned note', err),
            });
            return true;
          },
        },
        {
          text: t('NOTES.DELETE'),
          role: 'destructive',
          handler: () => {
            this.dietDayService.setPinnedNote('').subscribe({
              next: () => {
                this.pinnedNoteChange.emit(null);
                this.showToast(t('NOTES.DELETE_PINNED_TITLE'));
              },
              error: (err) => console.error('[ToolbarCalendar] Failed to delete pinned note', err),
            });
            return true;
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  private handleDelete(): void {
    const t = this.translate.instant.bind(this.translate);
    const dateFormatted = this.utilService.toStringDateDateFormat(
      this.utilService.parseYYYYMMDD(this.dietDay.date)
    );
    const alertOptions: AlertOptions = {
      header: t('TOOLBAR_CALENDAR.DELETE_CONFIRM_HEADER'),
      message: t('TOOLBAR_CALENDAR.DELETE_MESSAGE', { date: dateFormatted }),
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: t('COMMON.DELETE'),
          cssClass: 'danger',
          handler: () => {
            this.loadingChange.emit(true);
            (this._service as DietDayService)
              .deleteDietDay(this.dietDay.date)
              .subscribe(() => {
                this.selectCalendarDayEmit.emit(this.dietDay.date);
                this.showToast(
                  t('TOOLBAR_CALENDAR.DELETE_SUCCESS', { date: dateFormatted })
                );
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private setFullDate(): void {
    this.utilService.getCurrentDate.subscribe((resDate) => {
      this.currentDietDate = this.utilService.parseYYYYMMDD(resDate);
      this.year = this.currentDietDate.getFullYear();
      this.updateMonthLabel();
    });
  }

  // Reutiliza WEIGHT_INFO.MONTHS (misma lista ya traducida que usa el
  // calendario de diet-days) en vez de mantener un array de meses aparte.
  private updateMonthLabel(): void {
    if (!this.currentDietDate) return;
    const monthNames = this.translate.instant('WEIGHT_INFO.MONTHS');
    this.month = Array.isArray(monthNames)
      ? monthNames[this.currentDietDate.getMonth()]
      : '';
  }
}

