import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { AlertOptions, ModalController, ModalOptions, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CUSTOM_PRODUCT_VALUES,
  CustomProduct,
} from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { User } from 'src/app/core/models/user';
import { AnthropometryService } from 'src/app/core/services/anthropometry/anthropometry.service';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import {
  RecipeMacros,
  RecipeService,
} from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';
import { MONTHS } from 'src/app/shared/constants/months';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';
import { RemoteConfigGateService } from 'src/app/core/services/remote-config/remote-config-gate.service';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { Anthropometry } from '../diet-days/components/weight-info/models/anthropometry';
import { ClipboardMealModalComponent } from './components/clipboard-meal-modal/clipboard-meal-modal.component';
import { MealProposal } from './models/meal-proposal.model';
import { MealProposalApiService } from './services/meal-proposal-api.service';
import { DayMenuPreview, DayMenuStatus } from './models/day-menu.model';
import { DayMenuApiService } from './services/day-menu-api.service';
import { MenuPreviewModalComponent } from './components/menu-preview-modal/menu-preview-modal.component';
import { MySupplement, MySupplementsApiService } from '../supplements/services/my-supplements-api.service';
import { isPremiumActive } from 'src/app/core/utils/premium-status.util';

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
  public clipboardClearCounter = 0;
  public clipboardAnimateScale = 1;
  private clipboardPrevCount = 0;

  public pasteDietDayMode: boolean;
  public pasteMode: boolean;
  public isPasting: boolean;
  public isDietDaySaved: boolean;
  public isNoteHidden: boolean;
  public isArchivingDietDay = false;
  public load = false;
  public pinnedNote: string | null = null;
  public currentAnthropometry: Anthropometry | null = null;
  public mealProposals: MealProposal[] = [];
  // Fase 9 — solo no-null cuando el plan activo tiene 2+ menús que el
  // cliente elige cada día; para el resto de usuarios se queda en null y no
  // se muestra ningún aviso.
  public dayMenuStatus: DayMenuStatus | null = null;
  public isChoosingMenu = false;
  public isLeavingMenu = false;
  // Cambio de menú o de alternativa en curso: mientras dura se bloquea toda
  // la pantalla (cabecera incluida) para que no se pueda tocar nada a medias.
  public isChoosingAlternative = false;
  public isRefreshingTarget = false;
  private menuState$: Subscription;

  // Suplementación vigente ese día (§14): va por fechas, así que cambia
  // según el día que se mire. Se pinta al final, tras las comidas.
  public supplements: MySupplement[] = [];
  private supplementTimings: Record<string, string> = {};

  public MONTHS = MONTHS;
  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  private readonly userService = inject(UserService);
  private readonly remoteConfigGate = inject(RemoteConfigGateService);
  public readonly coachService = inject(CoachService);

  get locale(): string {
    return this.translate.currentLang === 'en' ? 'en-US' : 'es-ES';
  }

  constructor(
    private dietDayService: DietDayService,
    private dietService: DietService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private anthropometryService: AnthropometryService,
    private customProductService: CustomProductService,
    private recipeService: RecipeService,
    private mealProposalApiService: MealProposalApiService,
    private dayMenuApiService: DayMenuApiService,
    private mySupplementsApi: MySupplementsApiService,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private modalController: ModalController
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
      const prevCount = this.clipboardPrevCount;
      this.pasteMode = !!clipboard && !this.copyMealId;
      if (clipboard && clipboard.getTotalItemsCount() > prevCount) {
        this.clipboardAnimateScale = 1.04;
        setTimeout(() => { this.clipboardAnimateScale = 0.97; }, 100);
        setTimeout(() => { this.clipboardAnimateScale = 1; }, 200);
      }
      this.clipboardPrevCount = clipboard?.getTotalItemsCount() ?? 0;
      this.cdr.markForCheck();
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

  // La comida solo avisa cuando el pegado se ha completado: cancelar no toca el
  // portapapeles ni los botones de pegar de las demás comidas.
  public paste(event): void {
    if (event?.pasted) {
      this.clearClipboard();
    }
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
    this.copyMealIndex = event.selectionMode ? event.mealIndex : undefined;
    this.pasteMode = event.selectionMode && hasSelection;
    this.mealIdPaste = event.mealId;
    this.mealIndexPaste = event.mealIndex;
  }

  public async openClipboardModal(): Promise<void> {
    const clipboard = this.clipboard;
    if (!clipboard) return;

    const products = clipboard.mealClipboard?.customProducts || [];
    const recipes = clipboard.mealClipboard?.customRecipes || [];
    const selectedProductIds = clipboard.isFullMeal
      ? products.map((p) => p._id)
      : clipboard.selectedProducts;
    const selectedRecipeIds = clipboard.isFullMeal
      ? recipes.map((r) => r._id)
      : clipboard.selectedRecipes;

    const filteredProducts = products.filter((p) => selectedProductIds.includes(p._id));
    const filteredRecipes = recipes.filter((r) => selectedRecipeIds.includes(r._id));

    const modalOptions: ModalOptions = {
      component: ClipboardMealModalComponent,
      componentProps: {
        products: filteredProducts,
        recipes: filteredRecipes,
        selectedProductIds,
        selectedRecipeIds,
        mode: 'view',
      },
      cssClass: 'auto-height-modal',
    };

    const modal = await this.modalController.create(modalOptions);
    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (role !== 'confirm' || !data) return;

    const { selectedProductIds: newProductIds, selectedRecipeIds: newRecipeIds } = data;
    const totalProducts = products.length;
    const totalRecipes = recipes.length;

    const isFullMeal =
      newProductIds.length === totalProducts &&
      newRecipeIds.length === totalRecipes &&
      (totalProducts > 0 || totalRecipes > 0);

    if (isFullMeal) {
      this.mealService.setFullMealClipboard(clipboard.mealClipboard, clipboard.mealToPaste);
    } else if (newProductIds.length > 0 || newRecipeIds.length > 0) {
      this.mealService.setPartialMealClipboard(
        clipboard.mealClipboard,
        clipboard.mealToPaste,
        newProductIds,
        newRecipeIds
      );
    } else {
      this.mealService.clearMealClipboard();
    }
  }

  public clearClipboard(): void {
    this.mealService.clearMealClipboard();
    this.copyMealId = undefined;
    this.copyMealIndex = undefined;
    this.pasteMode = false;
    this.mealIdPaste = undefined;
    this.mealIndexPaste = undefined;
    this.clipboardClearCounter += 1;
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

  public get copyModeLocked(): boolean {
    return this.copyMealIndex !== undefined && !(this.clipboard?.hasSelection() ?? false);
  }

  public getSelectedProducts(): CustomProduct[] {
    const clipboard = this.clipboard;
    if (!clipboard || clipboard.isFullMeal) {
      return clipboard?.mealClipboard?.customProducts || [];
    }
    return (clipboard.mealClipboard?.customProducts || []).filter((cp) =>
      clipboard.selectedProducts.includes(cp._id)
    );
  }

  public getSelectedRecipes(): CustomRecipe[] {
    const clipboard = this.clipboard;
    if (!clipboard || clipboard.isFullMeal) {
      return clipboard?.mealClipboard?.customRecipes || [];
    }
    return (clipboard.mealClipboard?.customRecipes || []).filter((cr) =>
      clipboard.selectedRecipes.includes(cr._id)
    );
  }

  public getClipboardTotalKcal(): number {
    return this.getClipboardMacros().kcal;
  }

  public getClipboardTotalProtein(): number {
    return this.getClipboardMacros().protein;
  }

  public getClipboardTotalCarbs(): number {
    return this.getClipboardMacros().carbs;
  }

  public getClipboardTotalFat(): number {
    return this.getClipboardMacros().fat;
  }

  private getClipboardMacros(): RecipeMacros {
    const totals: RecipeMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    this.getSelectedProducts().forEach((customProduct) => {
      const macros = this.customProductService.getMacros(customProduct);
      totals.kcal += macros.kcal;
      totals.protein += macros.protein;
      totals.carbs += macros.carbs;
      totals.fat += macros.fat;
    });

    this.getSelectedRecipes().forEach((customRecipe) => {
      const macros = this.getCustomRecipeMacros(customRecipe);
      totals.kcal += macros.kcal;
      totals.protein += macros.protein;
      totals.carbs += macros.carbs;
      totals.fat += macros.fat;
    });

    return totals;
  }

  private getCustomRecipeMacros(customRecipe: CustomRecipe): RecipeMacros {
    const recipe =
      typeof customRecipe.recipe === 'object' ? customRecipe.recipe : null;

    if (!recipe) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    return this.recipeService.calculateCustomRecipeTotals(recipe, customRecipe)
      .portionMacros;
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
          attributes: { maxlength: 500 },
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
    this.currentAnthropometry = null;

    this.utilService.setCurrentDate = this.selectedDate;
    if (this.dietDay$) this.dietDay$.unsubscribe();
    this.dietDay$ = forkJoin({
      dietDay: this.dietDayService.getDietDayByIdDietAndDate(
        this.user.dietInUse,
        this.selectedDate
      ),
      anthropometry: this.anthropometryService.getAnthropometryByDate(
        this.selectedDate
      ),
    }).subscribe(({ dietDay, anthropometry }) => {
        this.currentAnthropometry = anthropometry || null;
        if (dietDay) this.dietDay = dietDay;
        else this.dietDay = this.dietDayService.getStandardDietDay(this.selectedDate);
        if (this.currentAnthropometry?.weight !== undefined) {
          this.dietDay.weight = this.currentAnthropometry.weight;
        }
        this.dietDayService.setCurrentDietDay = this.dietDay;
        this.load = true;
        this.cdr.detectChanges();
      });

    // F28 — alternativas del día y estado del menú (needsChoice:false para
    // el 100% de los clientes sin plan). Si fallan no rompen la pantalla:
    // se quedan vacías.
    if (this.menuState$) this.menuState$.unsubscribe();
    this.menuState$ = forkJoin({
      proposals: this.mealProposalApiService.listForDate(dateStr).pipe(catchError(() => of([]))),
      status: this.dayMenuApiService.getForDate(dateStr).pipe(catchError(() => of(null))),
    }).subscribe(({ proposals, status }) => {
      this.mealProposals = proposals || [];
      this.dayMenuStatus = status;
    });

    this.loadSupplements(dateStr);
  }

  // --- Suplementación del día (§14) ---

  private loadSupplements(date: string): void {
    this.mySupplementsApi.getMine(date).subscribe({
      next: (supplements) => (this.supplements = supplements || []),
      error: () => (this.supplements = []),
    });
    // El vocabulario de "cuándo tomarlo" lo decide el backend; se pide una
    // sola vez por sesión de pantalla.
    if (!Object.keys(this.supplementTimings).length) {
      this.mySupplementsApi.getTimings().subscribe({
        next: (res) => {
          this.supplementTimings = Object.fromEntries((res?.timings || []).map((t) => [t.key, t.label]));
        },
        error: () => undefined,
      });
    }
  }

  public supplementTiming(supplement: MySupplement): string {
    if (supplement.timing === 'custom') return supplement.customTiming || this.translate.instant('DIETS.OTHER_TIME');
    return this.supplementTimings[supplement.timing] || supplement.timing;
  }

  // --- Plan "choice": chips de menús, preview, elegir y salir ---

  public get menuOptions(): string[] {
    return this.dayMenuStatus?.options || [];
  }

  public get selectedMenu(): string | null {
    return this.dayMenuStatus?.selected || null;
  }

  public get isSwitchingMenu(): boolean {
    return (
      this.isChoosingMenu ||
      this.isLeavingMenu ||
      this.isChoosingAlternative ||
      this.isRefreshingTarget
    );
  }

  // Recarga el día (comidas + menú + alternativas) y avisa al terminar,
  // haya ido bien o no: la teardown de la suscripción corre al completar o
  // al fallar.
  private reloadDayThen(done: () => void): void {
    this.setDietDayByDate(this.selectedDate);
    let pending = 2;
    const finish = () => {
      if (--pending === 0) done();
    };
    this.dietDay$.add(finish);
    this.menuState$.add(finish);
  }

  // Día que el profesional marcó como saltado: no se pauta nada y no hay
  // menú que elegir.
  public get isDaySkipped(): boolean {
    return !!this.dayMenuStatus?.skipped;
  }

  // Click en un chip: preview del menú (solo lectura) y, si no es el ya
  // elegido, "Elegir" desde ahí.
  public async openMenuPreview(option: string): Promise<void> {
    const preview: DayMenuPreview = (this.dayMenuStatus?.previews || []).find((p) => p.name === option) || {
      name: option,
      meals: [],
    };
    const modal = await this.modalController.create({
      component: MenuPreviewModalComponent,
      componentProps: { preview, isSelected: this.selectedMenu === option },
    });
    await modal.present();
    const { role, data } = await modal.onDidDismiss();
    if (role === 'choose' && data?.name) this.chooseMenu(data.name);
  }

  // "Salir del menú": el día vuelve a quedar sin menú. Se borra lo pautado
  // (y lo que hubiera marcado de ello); lo que anotó por su cuenta se queda.
  public leaveMenu(): void {
    if (this.isLeavingMenu || !this.selectedMenu) return;
    const alertOptions: AlertOptions = {
      header: this.translate.instant('DIETS.LEAVE_MENU'),
      message: this.translate.instant('DIETS.LEAVE_MENU_MSG'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.EXIT'),
          role: 'destructive',
          handler: () => {
            this.isLeavingMenu = true;
            this.dayMenuApiService.leave(this.selectedDate).subscribe({
              next: () => this.reloadDayThen(() => (this.isLeavingMenu = false)),
              error: () => {
                this.isLeavingMenu = false;
              },
            });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  // El cliente marca qué menú le toca hoy (p. ej. "Entrenamiento" /
  // "Descanso"); el backend resuelve el plan con esa elección y devuelve el
  // día ya relleno (o con propuestas nuevas si alguna comida tiene 2+
  // alternativas) — se recarga el día entero para reflejarlo.
  public chooseMenu(menuName: string): void {
    if (this.isChoosingMenu) return;
    this.isChoosingMenu = true;
    this.dayMenuApiService.choose(this.selectedDate, menuName).subscribe({
      next: () => this.reloadDayThen(() => (this.isChoosingMenu = false)),
      error: () => {
        this.isChoosingMenu = false;
      },
    });
  }

  // F28 — alternativas propuestas para un hueco de comida concreto, elegidas
  // o no: el selector es persistente (el cliente puede alternar en
  // cualquier momento), no un banner de una sola vez.
  public proposalsForMeal(mealName: string): MealProposal[] {
    return this.mealProposals.filter((p) => p.mealSlot === mealName);
  }

  public onProposalChosen(event: { proposalId: string; chosenIndex: number }): void {
    const proposal = this.mealProposals.find((p) => p._id === event.proposalId);
    if (proposal) proposal.chosenIndex = event.chosenIndex;
    this.refreshPlannedTarget();
  }

  // Opciones de comida — la meta del día (máximo a consumir, ver
  // macros-bars) es lo que suma lo PAUTADO y la calcula el backend; al
  // cambiar de opción cambia lo pautado, así que se vuelve a pedir el día
  // solo para refrescar plannedTarget, sin recargar la pantalla entera.
  private refreshPlannedTarget(): void {
    this.isRefreshingTarget = true;
    this.dietDayService
      .getDietDayByIdDietAndDate(this.user.dietInUse, this.selectedDate)
      .subscribe({
        next: (fresh) => {
          this.isRefreshingTarget = false;
          if (!fresh || !this.dietDay || fresh.date !== this.dietDay.date) return;
          this.dietDay.plannedTarget = fresh.plannedTarget ?? null;
          this.dietDayService.setCurrentDietDay = { ...this.dietDay };
          this.cdr.detectChanges();
        },
        error: () => (this.isRefreshingTarget = false),
      });
  }

  public onAnthropometrySaved(anthropometry: Anthropometry): void {
    this.currentAnthropometry = anthropometry;
    if (this.dietDay && anthropometry?.weight !== undefined) {
      this.dietDay.weight = anthropometry.weight;
      this.dietDayService.setCurrentDietDay = { ...this.dietDay };
    }
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
            // Nota vacía = quitarla: sin la clave, el back no toca la nota.
            this.mealService.modifyMeal({ ...this.meal, notes: '' }).subscribe();
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
      .subscribe({
        next: (resDietDay) => {
          this.dietDay = resDietDay;
          this.dietDayService.setCurrentDietDay = this.dietDay;
          this.isPasting = false;
          const toastOptions: ToastOptions = {
            message: this.translate.instant('DIETS.DAY_PASTED_SUCCESS'),
            duration: 1000,
          };
          this.ionicUtilService.showToast(toastOptions);
        },
        // Un día con comida pautada no se puede pegar encima (MEAL_PROTECTED):
        // el interceptor ya enseña el motivo; aquí solo se suelta el estado.
        error: () => {
          this.isPasting = false;
        },
      });
  }

  public get isPremiumActive(): boolean {
    return isPremiumActive(this.user?.premium);
  }

  public goToPremium(): void {
    this.navigationService.goToPremium();
  }

  public get maintenanceWarning$() {
    return this.remoteConfigGate.warningBanner$;
  }

  public dismissMaintenanceWarning(): void {
    this.remoteConfigGate.dismissWarningBanner();
  }
}
