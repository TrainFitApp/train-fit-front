import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { AlertOptions, ToastOptions } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CUSTOM_PRODUCT_VALUES } from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { User } from 'src/app/core/models/user';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';
import { MONTHS } from 'src/app/shared/constants/months';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';

@Component({
  selector: 'app-diets',
  templateUrl: 'diets.page.html',
  styleUrls: ['diets.page.scss'],
  animations: [fadeIn, fadeOut],
})
export class DietsPage implements OnInit {
  @ViewChild('ionContent')
  public ionContent: any;

  public user: User;
  public meal: Meal;
  public dietDay: DietDay;

  public selectedDate = new Date();

  public dietDay$: Subscription;
  public timeOut$: any;
  public scrolling: boolean;

  public mealIdPaste: string;

  public pasteDietDayMode: boolean;
  public pasteMode: boolean;
  public isPasting: boolean;
  public isDietDaySaved: boolean;
  public isNoteHidden: boolean;
  public isArchivingDietDay = false;
  public load = false;

  public MONTHS = MONTHS;
  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  // Inyección de servicios con Signals
  private readonly userService = inject(UserService);
  private readonly adMobService = inject(AdMobService);

  constructor(
    private dietDayService: DietDayService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private cdr: ChangeDetectorRef
  ) {
    // Effect para el usuario
    effect(() => {
      this.user = this.userService.localUser();
    });

    // Effect para el dietDay actual
    this.dietDayService.getCurrentDietDay.subscribe((resDietDay) => {
      this.dietDay = resDietDay;
      if (resDietDay && resDietDay.date) {
        this.selectedDate = new Date(resDietDay.date);
      }
    });
  }

  public ionViewWillEnter(): void {
    // Check if we have a selectedDate in navigation state (returning from config-recipe/search-foods)
    const state = window.history.state;
    if (state && state.selectedDate) {
      this.selectedDate = new Date(state.selectedDate);
    }

    // Resync dates-slider each time the page comes back to view.
    this.utilService.setCurrentDate = this.selectedDate;
  }

  public ionViewWillLeave(): void {
  }

  public ngOnInit(): void {
    setTimeout(() =>
      this.utilService.getRefreshAfterDeleteOwn.subscribe(() =>
        this.setDietDayByDate(this.selectedDate)
      )
    );
  }

  public paste(event): void {
    this.pasteMode = event?.paste ?? undefined;
    this.mealIdPaste = event?.mealId ?? undefined;
  }

  public manageNote(): void {
    this.utilService.manageNote(this.dietDay, this.dietDayService);
  }

  public setDietDayByDate(date: Date): void {
    this.load = false;
    this.selectedDate = date;

    // TODO: para que se cargue mas rápidamente, pero está repetido
    // this.dietDay = this.dietDayService.getStandardDietDay(this.selectedDate);
    // this.dietDayService.setCurrentDietDay = this.dietDay;
    this.utilService.setCurrentDate = this.selectedDate;
    if (this.dietDay$) this.dietDay$.unsubscribe();
    this.dietDay$ = this.dietDayService
      .getDietDayByIdDietAndDate(this.user.dietInUse, this.selectedDate)
      .subscribe((resDietDay) => {
        if (resDietDay) this.dietDay = resDietDay;
        else
          this.dietDay = this.dietDayService.getStandardDietDay(
            this.selectedDate
          );
        this.dietDayService.setCurrentDietDay = this.dietDay;
        this.load = true;
        this.cdr.detectChanges();
      });
  }

  public showCloseAlert(): void {
    const alertOptions: AlertOptions = {
      header: 'Borrar nota',
      message:
        '¿Estás seguro de que quieres eliminar esta nota? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'BORRAR',
          role: 'destructive',
          handler: () => {
            delete this.meal.notes;
            this.mealService.modifyMeal(this.meal).subscribe();
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public selectCalendarDay(dateISO: string): void {
    const date = new Date(dateISO);
    this.setDietDayByDate(date);
  }

  public pasteDietDay(): void {
    this.isPasting = true;
    this.pasteDietDayMode = false;

    this.dietDayService
      .pasteDietDay(
        this.user.dietInUse,
        this.dietDayService.getDietDayClipboard,
        this.dietDay
      )
      .subscribe((resDietDay) => {
        this.dietDay = resDietDay;
        this.dietDayService.setCurrentDietDay = this.dietDay;
        this.isPasting = false;
        const message = 'Día pegado con éxito';
        const duration = 1000;
        const toastOptions: ToastOptions = {
          message: message,
          duration: duration,
        };
        this.ionicUtilService.showToast(toastOptions);
      });
  }

  public scrollBottom(): void {
    this.ionContent.scrollToBottom(300);
  }
}
