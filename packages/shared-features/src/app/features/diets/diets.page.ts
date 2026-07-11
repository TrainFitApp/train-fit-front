import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { AlertOptions, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CUSTOM_PRODUCT_VALUES } from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { User } from 'src/app/core/models/user';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';
import { MONTHS } from 'src/app/shared/constants/months';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';

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

  public selectedDate: string;

  public dietDay$: Subscription;
  public timeOut$: any;
  public scrolling: boolean;

  public mealIdPaste: string;
  public mealIndexPaste: number;
  public copyMealId: string;
  public copyMealIndex: number;

  public pasteDietDayMode: boolean;
  public pasteMode: boolean;
  public isPasting: boolean;
  public isDietDaySaved: boolean;
  public isNoteHidden: boolean;
  public isArchivingDietDay = false;
  public load = false;
  public pinnedNote: string | null = null;

  public MONTHS = MONTHS;
  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  private readonly userService = inject(UserService);

  constructor(
    private dietDayService: DietDayService,
    private dietService: DietService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.selectedDate = this.utilService.formatDateToYYYYMMDD(new Date());

    effect(() => {
      this.user = this.userService.localUser();
      if (this.user?.dietInUse) {
        this.loadPinnedNote();
      }
    });

    this.dietDayService.getCurrentDietDay.subscribe((resDietDay) => {
      this.dietDay = resDietDay;
      if (resDietDay && resDietDay.date) {
        this.selectedDate = resDietDay.date;
      }
    });

    this.mealService.mealClipboard$.subscribe((clipboard: MealClipboard | null) => {
      this.pasteMode = !!clipboard && !this.copyMealId;
    });
  }

  public ionViewWillEnter(): void {
    const state = window.history.state;
    if (state && state.selectedDate) {
      this.selectedDate = state.selectedDate;
    }

    if (state?.updatedDietDay) {
      this.dietDay = state.updatedDietDay;
      this.dietDayService.setCurrentDietDay = state.updatedDietDay;
    } else if (state?.updatedRecipe) {
      const updatedDietDay =
        this.dietDayService.syncUpdatedRecipeInCurrentDietDay(
          state.updatedRecipe
        );
      if (updatedDietDay) {
        this.dietDay = updatedDietDay;
      }
    }

    this.utilService.setCurrentDate = this.selectedDate;
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
    this.mealIndexPaste = event?.mealIndex ?? undefined;
    this.copyMealId = undefined;
    this.copyMealIndex = undefined;
  }

  public onCopySelection(event: {
    mealId: string;
    mealIndex: number;
    selectionMode: boolean;
    meal: Meal;
    productIds?: string[];
    recipeIds?: string[];
    isFullMeal?: boolean;
  }): void {
    const hasSelection =
      !!event.isFullMeal ||
      (event.productIds?.length ?? 0) > 0 ||
      (event.recipeIds?.length ?? 0) > 0;

    this.copyMealId = event.selectionMode && !hasSelection ? event.mealId : undefined;
    this.copyMealIndex =
      event.selectionMode && !hasSelection ? event.mealIndex : undefined;
    this.pasteMode = event.selectionMode && hasSelection;
    this.mealIdPaste = event.mealId;
    this.mealIndexPaste = event.mealIndex;
  }

  public clearClipboard(): void {
    this.mealService.clearMealClipboard();
    this.copyMealId = undefined;
    this.copyMealIndex = undefined;
    this.pasteMode = false;
    this.mealIdPaste = undefined;
    this.mealIndexPaste = undefined;
  }

  public get hasActiveClipboard(): boolean {
    return this.mealService.hasMealClipboard();
  }

  public get clipboard(): MealClipboard | null {
    return this.mealService.getMealClipboard;
  }

  public get clipboardItemCount(): number {
    const clipboard = this.clipboard;
    if (!clipboard) return 0;
    return clipboard.getTotalItemsCount();
  }

  public get clipboardMealName(): string {
    return this.clipboard?.mealClipboard?.name || '';
  }

  public getSelectedProducts(): any[] {
    const clipboard = this.clipboard;
    if (!clipboard || clipboard.isFullMeal) {
      return clipboard?.mealClipboard?.customProducts || [];
    }
    return (clipboard.mealClipboard?.customProducts || []).filter((cp) =>
      clipboard.selectedProducts.includes(cp._id)
    );
  }

  public getSelectedRecipes(): any[] {
    const clipboard = this.clipboard;
    if (!clipboard || clipboard.isFullMeal) {
      return clipboard?.mealClipboard?.customRecipes || [];
    }
    return (clipboard.mealClipboard?.customRecipes || []).filter((cr) =>
      clipboard.selectedRecipes.includes(cr._id)
    );
  }

  public getClipboardTotalKcal(): number {
    let total = 0;
    this.getSelectedProducts().forEach((cp) => {
      total += this.getProductKcal(cp);
    });
    this.getSelectedRecipes().forEach((cr) => {
      total += this.getRecipeKcal(cr);
    });
    return total;
  }

  public getClipboardTotalProtein(): number {
    let total = 0;
    this.getSelectedProducts().forEach((cp) => {
      total += this.getProductProtein(cp);
    });
    this.getSelectedRecipes().forEach((cr) => {
      total += this.getRecipeProtein(cr);
    });
    return total;
  }

  public getClipboardTotalCarbs(): number {
    let total = 0;
    this.getSelectedProducts().forEach((cp) => {
      total += this.getProductCarbs(cp);
    });
    this.getSelectedRecipes().forEach((cr) => {
      total += this.getRecipeCarbs(cr);
    });
    return total;
  }

  public getClipboardTotalFat(): number {
    let total = 0;
    this.getSelectedProducts().forEach((cp) => {
      total += this.getProductFat(cp);
    });
    this.getSelectedRecipes().forEach((cr) => {
      total += this.getRecipeFat(cr);
    });
    return total;
  }

  public getProductKcal(product: any): number {
    return product?.product?.kcal || 0;
  }

  public getProductProtein(product: any): number {
    return product?.product?.protein || 0;
  }

  public getProductCarbs(product: any): number {
    return product?.product?.carbohydrate || 0;
  }

  public getProductFat(product: any): number {
    return product?.product?.fat || 0;
  }

  public getRecipeKcal(recipe: any): number {
    return recipe?.recipe?.kcal || 0;
  }

  public getRecipeProtein(recipe: any): number {
    return recipe?.recipe?.protein || 0;
  }

  public getRecipeCarbs(recipe: any): number {
    return recipe?.recipe?.carbohydrate || 0;
  }

  public getRecipeFat(recipe: any): number {
    return recipe?.recipe?.fat || 0;
  }

  public manageNote(): void {
    this.utilService.manageNote(this.dietDay, this.dietDayService);
  }

  public onPinnedNoteChange(pinnedNote: string | null): void {
    this.pinnedNote = pinnedNote;
  }

  public editPinnedNote(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('NOTES.TITLE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.pinnedNote,
          placeholder: t('NOTES.PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: t('COMMON.SAVE'),
          handler: (data) => {
            const newNotes = (data.notes || '').trim();
            this.dietService.updatePinnedNote(this.user.dietInUse, newNotes).subscribe({
              next: (diet) => {
                this.pinnedNote = diet.pinnedNote || null;
              },
              error: (err) => console.error('[DietsPage] Failed to update pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public deletePinnedNote(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('NOTES.DELETE_PINNED_TITLE'),
      message: t('NOTES.DELETE_PINNED_CONFIRM'),
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: t('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.dietService.updatePinnedNote(this.user.dietInUse, '').subscribe({
              next: () => {
                this.pinnedNote = null;
              },
              error: (err) => console.error('[DietsPage] Failed to delete pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private loadPinnedNote(): void {
    if (this.user?.dietInUse) {
      this.dietService.getDietById(this.user.dietInUse).subscribe({
        next: (diet) => {
          this.pinnedNote = diet.pinnedNote || null;
        },
        error: (err) => console.error('[DietsPage] Failed to load pinned note', err),
      });
    }
  }

  public setDietDayByDate(dateStr: string): void {
    this.load = false;
    this.selectedDate = dateStr;

    this.utilService.setCurrentDate = this.selectedDate;
    if (this.dietDay$) this.dietDay$.unsubscribe();
    this.dietDay$ = this.dietDayService
      .getDietDayByIdDietAndDate(this.user.dietInUse, this.selectedDate)
      .subscribe((resDietDay) => {
        if (resDietDay) this.dietDay = resDietDay;
        else
          this.dietDay = this.dietDayService.getStandardDietDay(this.selectedDate);
        this.dietDayService.setCurrentDietDay = this.dietDay;
        this.load = true;
        this.cdr.detectChanges();
      });
  }

  public showCloseAlert(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('DIETS.DELETE_NOTE_HEADER'),
      message: t('DIETS.DELETE_NOTE_MESSAGE'),
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: t('DIETS.DELETE_NOTE_CONFIRM'),
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

  public selectCalendarDay(dateStr: string): void {
    this.setDietDayByDate(dateStr);
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
        const toastOptions: ToastOptions = {
          message: this.translate.instant('DIETS.DAY_PASTED_SUCCESS'),
          duration: 1000,
        };
        this.ionicUtilService.showToast(toastOptions);
      });
  }

  public scrollBottom(): void {
    this.ionContent.scrollToBottom(300);
  }

  public get isPremiumActive(): boolean {
    return Boolean(this.user?.premium?.entitled);
  }

  public goToPremium(): void {
    this.navigationService.goToPremium();
  }
}
