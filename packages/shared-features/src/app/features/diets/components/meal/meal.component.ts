import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AlertOptions, ModalController, ModalOptions, PopoverOptions, ToastOptions } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { DB_ES_EN_MAP } from 'src/app/shared/constants/db-translations/es-en-db.map';
import {
  CUSTOM_PRODUCT_KEYS,
  CustomProduct,
  QuickAddMacros,
} from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { User } from 'src/app/core/models/user';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { CustomRecipeApiService } from 'src/app/core/services/custom-recipe/custom-recipe-api.service';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';
import { ClipboardMealModalComponent } from '../clipboard-meal-modal/clipboard-meal-modal.component';
import { PautadoItemViewComponent } from '../pautado-item-view/pautado-item-view.component';
import { MealProposal } from '../../models/meal-proposal.model';
import { MealProposalApiService } from '../../services/meal-proposal-api.service';
import { ConfirmSheetComponent } from 'src/app/shared/components/confirm-sheet/confirm-sheet.component';
import {
  QUICK_ADD_SHEET_OPTIONS,
  QuickAddSheetComponent,
} from './components/search-foods/components/quick-add-sheet/quick-add-sheet.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public meal!: Meal;
  @Input()
  public user!: User;
  @Input()
  public load: boolean = false;
  @Input()
  public dietDay!: DietDay;
  @Input()
  public pasteMode = false;
  @Input()
  public activeCopyMealIndex?: number;
  @Input()
  public clipboardClearCounter = 0;
  @Input()
  public mealIndex!: number;
  // F28 — alternativas nombradas para este hueco de comida en esta fecha
  // (elegida o no: el cliente puede alternar libremente entre ellas, no es
  // solo un banner de una sola vez).
  @Input()
  public proposals: MealProposal[] = [];
  @Output()
  public updateMacros = new EventEmitter();
  @Output()
  public pasteEvent = new EventEmitter();
  @Output()
  public copyEvent = new EventEmitter();
  @Output()
  public proposalChosen = new EventEmitter<{ proposalId: string; chosenIndex: number }>();
  // Avisa a la página para que bloquee la pantalla mientras cambia la opción.
  @Output()
  public choosingAlternative = new EventEmitter<boolean>();

  @ViewChild('mealAccordion', { read: ElementRef })
  public mealAccordion!: ElementRef<HTMLIonAccordionElement>;

  public loadPaste!: boolean;

  public arrowRotate = false;
  public isNoteHidden = false;

  public ACTIONS = ACTIONS;
  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;
  public CUSTOM_PRODUCT_KEYS = CUSTOM_PRODUCT_KEYS;

  public selectionMode = false;
  public selectedProductIds = new Set<string>();
  public selectedRecipeIds = new Set<string>();
  private clipboardSub = Subscription.EMPTY;

  // F28 — eligiendo una alternativa propuesta.
  public isChoosingProposal = false;

  constructor(
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private dietDayService: DietDayService,
    private customProductService: CustomProductService,
    private customRecipeService: CustomRecipeApiService,
    private recipeService: RecipeService,
    private mealProposalApiService: MealProposalApiService,
    private navigationService: NavigationService,
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.getMealInfo();
    this.restoreSelectionFromClipboard();
    this.clipboardSub = this.mealService.mealClipboard$.subscribe((clipboard) => {
      if (!clipboard?.mealClipboard || clipboard.mealClipboard._id !== this.meal?._id) return;
      this.selectionMode = true;
      this.arrowRotate = true;
      this.selectedProductIds = new Set(clipboard.isFullMeal
        ? (this.meal.customProducts || []).map((cp) => cp._id)
        : clipboard.selectedProducts
      );
      this.selectedRecipeIds = new Set(clipboard.isFullMeal
        ? (this.meal.customRecipes || []).map((cr) => cr._id)
        : clipboard.selectedRecipes
      );
    });
  }

  public ngOnDestroy(): void {
    this.clipboardSub.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.meal || changes.dietDay) {
      this.getMealInfo();
    }
    if (changes.pasteMode && this.pasteMode) {
      this.selectionMode = false;
      this.clearSelection();
    }
    if (
      changes.activeCopyMealIndex &&
      this.selectionMode &&
      this.activeCopyMealIndex !== undefined &&
      this.activeCopyMealIndex !== this.mealIndex
    ) {
      this.selectionMode = false;
      this.clearSelection();
    }
    if (
      changes.clipboardClearCounter &&
      !changes.clipboardClearCounter.firstChange &&
      this.selectionMode
    ) {
      this.exitSelectionMode();
    }
    // Este componente se reutiliza/reinicializa al cambiar de día; selectionMode
    // es estado puramente local (sin @Input) y se pierde aunque el portapapeles
    // (a nivel de servicio, persistente) siga apuntando a esta meal. Sin esto,
    // volver al día original tras copiar deja los checkboxes desaparecidos.
    if (changes.meal || changes.dietDay) {
      this.restoreSelectionFromClipboard();
    }
  }

  private restoreSelectionFromClipboard(): void {
    const clipboard = this.mealService.getMealClipboard;
    if (!clipboard?.mealClipboard || clipboard.mealClipboard._id !== this.meal?._id) {
      return;
    }

    this.selectionMode = true;
    this.arrowRotate = true;

    if (clipboard.isFullMeal) {
      this.selectedProductIds = new Set(
        (this.meal.customProducts || []).map((cp) => cp._id)
      );
      this.selectedRecipeIds = new Set(
        (this.meal.customRecipes || []).map((cr) => cr._id)
      );
    } else {
      this.selectedProductIds = new Set(clipboard.selectedProducts);
      this.selectedRecipeIds = new Set(clipboard.selectedRecipes);
    }
  }

  public openSearchFoods(): void {
    this.navigationService.goToSearchFoods({
      state: {
        user: this.user,
        meal: this.meal,
        fromDiets: true,
        selectedDate: this.dietDay.date,
      },
    });
  }

  public editCustomProduct(customProduct: CustomProduct): void {
    // Pautado — nunca editable directamente (backend, meal-service.js
    // #assertMealEditable, ya lo rechazaría igualmente; esto solo evita
    // navegar a un editor que fallaría al guardar).
    if (this.selectionMode || customProduct.assignedByTrainerId) return;

    // Adición rápida: no hay Product detrás que AddProductPage pueda editar,
    // así que se vuelve a abrir la hoja con la que se escribió.
    if (this.isQuickAdd(customProduct)) {
      void this.editQuickAdd(customProduct);
      return;
    }

    const product = customProduct.product;
    const isOwnProduct = !!product?.userId;
    const queryParams: any = {
      product: JSON.stringify(product),
      isOwnProduct,
      productQuantity: customProduct.quantity,
      dietDay: JSON.stringify(this.dietDay),
      meal: JSON.stringify(this.meal),
      isScanned: false,
    };

    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: {
        returnUrl: '/tabs/diets',
        selectedDate: this.dietDay.date,
      },
    });
  }

  // Nombre que se pinta de un producto de la comida: el del catálogo, o el
  // que escribió el cliente en la adición rápida (ver CustomProduct#name).
  public getProductName(customProduct: CustomProduct): string {
    return (
      this.customProductService.customProductName(customProduct) ||
      this.translate.instant('SEARCH_FOODS.QUICK_ADD_DEFAULT_NAME')
    );
  }

  public isQuickAdd(customProduct: CustomProduct): boolean {
    return !!customProduct?.quickAdd;
  }

  /**
   * Reabre la hoja de adición rápida con lo que ya tenía y guarda lo que
   * salga. La cantidad no se toca (siempre QUICK_ADD_QUANTITY): lo que se
   * edita son los macros en sí, no una cantidad de nada.
   */
  private async editQuickAdd(customProduct: CustomProduct): Promise<void> {
    const { data } = await this.ionicUtilService.showModal({
      component: QuickAddSheetComponent,
      componentProps: { mealName: this.meal?.name, customProduct },
      ...QUICK_ADD_SHEET_OPTIONS,
    });

    const values: QuickAddMacros | undefined = data;
    if (!values) return;

    const updated: CustomProduct = {
      ...customProduct,
      name: values.name,
      energyKcal100g: values.kcal,
      protein100g: values.protein,
      carbohydrates100g: values.carbs,
      fat100g: values.fat,
    };

    this.dietDayService.updateCustomProduct(updated, this.meal, this.dietDay);
  }

  public editCustomRecipe(instance: CustomRecipe): void {
    if (this.selectionMode || instance.assignedByTrainerId) return;
    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'edit',
        customRecipe: instance,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: '/tabs/diets',
        selectedDate: this.dietDay.date,
      },
    });
  }

  public deleteRecipe(meal: Meal, instance: CustomRecipe): void {
    // Pautado — no eliminable (mismo criterio que editCustomRecipe).
    if (instance.assignedByTrainerId) return;

    const recipeName =
      typeof instance.recipe === 'object' ? instance.recipe.name : this.translate.instant('COMMON.THIS');

    const alertOptions: AlertOptions = {
      header: this.translate.instant('MEAL.DELETE_RECIPE_HEADER'),
      message: this.translate.instant('MEAL.DELETE_RECIPE_CONFIRM', { name: recipeName }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.DELETE').toUpperCase(),
          role: 'destructive',
          handler: () => {
            const indexMeal = this.dietDay.meals.findIndex(
              (mealTemp) => mealTemp._id === meal._id
            );

            const indexRecipe =
              this.dietDay.meals[indexMeal].customRecipes.indexOf(instance);

            this.dietDay.meals[indexMeal].customRecipes.splice(indexRecipe, 1);

            this.customRecipeService
              .delete(instance._id!)
              .subscribe(() => {
                this.dietDayService.setCurrentDietDay = this.dietDay;
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public deleteProduct(meal: Meal, product: CustomProduct): void {
    if (product.assignedByTrainerId) return;

    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('MEAL.DELETE_PRODUCT_HEADER'),
      message: t('MEAL.DELETE_PRODUCT_CONFIRM', {
        name: this.getProductName(product),
      }),
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: t('COMMON.DELETE').toUpperCase(),
          role: 'destructive',
          handler: () => {
            const indexMeal = this.dietDay.meals.findIndex(
              (mealTemp) => mealTemp._id === meal._id
            );

            const indexProduct =
              this.dietDay.meals[indexMeal].customProducts.indexOf(product);

            this.dietDay.meals[indexMeal].customProducts.splice(indexProduct, 1);

            this.mealService
              .deleteMealProduct(meal._id, product._id)
              .subscribe(() => (this.dietDayService.setCurrentDietDay = this.dietDay));
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public async createMealFromClipboard(meal: Meal): Promise<void> {
    this.loadPaste = true;
    // El día se asegura (createDietDay es idempotente: si esa fecha ya tiene
    // día devuelve el que hay, nunca crea un segundo) y la comida destino se
    // vuelve a buscar en el día ya real, que es el que tiene _id.
    if (!this.dietDay._id) {
      this.dietDay = await this.dietDayService
        .createDietDay(this.dietDayService.getStandardDietDay(this.dietDay.date))
        .toPromise();
      this.meal = this.dietDay.meals.find(
        (mealTemp) => mealTemp.name === meal.name
      );
      this.dietDayService.setCurrentDietDay = this.dietDay;
    }

    const clipboard = this.mealService.getMealClipboard;
    if (!clipboard) {
      this.loadPaste = false;
      return;
    }

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
        mode: 'paste',
      },
      cssClass: 'auto-height-modal',
    };

    const modal = await this.modalController.create(modalOptions);
    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    // Cancelar solo aborta este pegado: el portapapeles sigue vivo y los
    // botones de pegar del resto de comidas tienen que seguir ahi.
    if (role !== 'confirm' || !data) {
      this.loadPaste = false;
      return;
    }

    // Lo que habia en el portapapeles antes de aplicar la seleccion del modal,
    // para devolverlo tal cual si luego se cancela el aviso de fusionar.
    const previousClipboard = {
      isFullMeal: clipboard.isFullMeal,
      selectedProducts: [...clipboard.selectedProducts],
      selectedRecipes: [...clipboard.selectedRecipes],
      mealToPaste: clipboard.mealToPaste,
    };
    const previousSelectedProductIds = new Set(this.selectedProductIds);
    const previousSelectedRecipeIds = new Set(this.selectedRecipeIds);

    const { selectedProductIds: newProductIds, selectedRecipeIds: newRecipeIds } = data;
    const totalProducts = products.length;
    const totalRecipes = recipes.length;

    const isFullMeal =
      newProductIds.length === totalProducts &&
      newRecipeIds.length === totalRecipes &&
      (totalProducts > 0 || totalRecipes > 0);

    if (isFullMeal) {
      this.mealService.setFullMealClipboard(clipboard.mealClipboard, this.meal);
    } else {
      this.mealService.setPartialMealClipboard(
        clipboard.mealClipboard,
        this.meal,
        newProductIds,
        newRecipeIds
      );
    }

    this.selectedProductIds = new Set(newProductIds);
    this.selectedRecipeIds = new Set(newRecipeIds);

    const updatedClipboard = this.mealService.getMealClipboard;
    if (!updatedClipboard) {
      this.loadPaste = false;
      return;
    }

    const canMerge =
      this.meal.customProducts.length !== 0 ||
      (this.meal.customRecipes?.length ?? 0) !== 0;

    if (updatedClipboard.isFullMeal && canMerge) {
      const t = this.translate.instant.bind(this.translate);
      const alertOptions: AlertOptions = {
        cssClass: 'alert-grid-buttons',
        header: t('MEAL.PASTE_HEADER'),
        message: t('MEAL.PASTE_MERGE_MESSAGE'),
        buttons: [
          {
            text: t('COMMON.CANCEL').toUpperCase(),
            role: 'cancel',
          },
          {
            text: t('MEAL.PASTE_REPLACE'),
            role: 'replace',
          },
          {
            text: t('MEAL.PASTE_MERGE'),
            role: 'merge',
          },
        ],
      };

      // El rol se lee del resultado, no de un handler por botón: cerrar la hoja
      // arrastrando, con el botón atrás o tocando fuera no dispara handlers y
      // dejaba el spinner girando para siempre.
      const { role: pasteRole } = await this.ionicUtilService.showAlert(alertOptions);

      if (pasteRole !== 'replace' && pasteRole !== 'merge') {
        this.restorePreviousClipboard(
          clipboard.mealClipboard,
          previousClipboard,
          previousSelectedProductIds,
          previousSelectedRecipeIds
        );
        this.loadPaste = false;
        return;
      }

      this.handleMealPaste(pasteRole === 'merge');
    } else {
      this.handleMealPaste(false);
    }
  }

  // Cancelar el aviso de fusionar deja el portapapeles como estaba antes de
  // aplicar la selección del modal, para que pegar en otra comida siga ofreciendo
  // lo que se copió.
  private restorePreviousClipboard(
    sourceMeal: Meal,
    previous: {
      isFullMeal: boolean;
      selectedProducts: string[];
      selectedRecipes: string[];
      mealToPaste: Meal;
    },
    previousSelectedProductIds: Set<string>,
    previousSelectedRecipeIds: Set<string>
  ): void {
    if (previous.isFullMeal) {
      this.mealService.setFullMealClipboard(sourceMeal, previous.mealToPaste);
    } else {
      this.mealService.setPartialMealClipboard(
        sourceMeal,
        previous.mealToPaste,
        previous.selectedProducts,
        previous.selectedRecipes
      );
    }
    this.selectedProductIds = previousSelectedProductIds;
    this.selectedRecipeIds = previousSelectedRecipeIds;
  }

  private handleMealPaste(merge: boolean): void {
    const clipboard = this.mealService.getMealClipboard;
    if (!clipboard) return;

    clipboard.mealToPaste = this.meal;

    const pasteMealObservable = clipboard.isFullMeal
      ? this.mealService.pasteMeal(clipboard, merge)
      : this.mealService.pasteMeal(clipboard, true);

    pasteMealObservable.subscribe((resMeal) => {
      this.meal = resMeal;
      const indexMeal = this.dietDay.meals.findIndex(
        (mealTemp) => mealTemp._id === resMeal._id
      );
      this.dietDay.meals[indexMeal] = resMeal;
      this.pasteEvent.emit({ pasted: true });

      this.getMealInfo();

      this.dietDayService.setCurrentDietDay = this.dietDay;

      this.loadPaste = false;

      this.ionicUtilService.showToast({
        message: this.translate.instant('MEAL.PRODUCTS_COPIED'),
        duration: 2000,
      });
    });
  }

  public getProductsAndOwnProductsOrdered(meal: Meal): CustomProduct[] {
    return (meal.customProducts || []).sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
  }

  public getCustomRecipesOrdered(meal: Meal): CustomRecipe[] {
    return meal.customRecipes || [];
  }

  // Pautado — separa lo que indicó el profesional (assignedByTrainerId,
  // backend) de lo que añadió el propio cliente, reutilizando el mismo
  // orden que ya tenían (getProductsAndOwnProductsOrdered/
  // getCustomRecipesOrdered), solo filtrado.
  public getPautadoProducts(meal: Meal): CustomProduct[] {
    return this.getProductsAndOwnProductsOrdered(meal).filter((p) => !!p.assignedByTrainerId);
  }

  public getOwnProducts(meal: Meal): CustomProduct[] {
    return this.getProductsAndOwnProductsOrdered(meal).filter((p) => !p.assignedByTrainerId);
  }

  public getPautadoRecipes(meal: Meal): CustomRecipe[] {
    return this.getCustomRecipesOrdered(meal).filter((r) => !!r.assignedByTrainerId);
  }

  public getOwnRecipes(meal: Meal): CustomRecipe[] {
    return this.getCustomRecipesOrdered(meal).filter((r) => !r.assignedByTrainerId);
  }

  public hasPautadoItems(meal: Meal): boolean {
    return this.getPautadoProducts(meal).length > 0 || this.getPautadoRecipes(meal).length > 0;
  }

  // Tema "success" a nivel de meal cuando ya no queda nada pautado por
  // marcar — mismo criterio visual que el checkbox individual (color
  // success), extendido a la card completa como señal de "comida
  // completada según lo indicado por tu profesional".
  public isPautadoFullyConsumed(meal: Meal): boolean {
    return (
      this.hasPautadoItems(meal) &&
      this.getPautadoProducts(meal).every((p) => p.consumed) &&
      this.getPautadoRecipes(meal).every((r) => r.consumed)
    );
  }

  // Diferencia entre lo que se pautó y lo que de verdad se consumió — 0 (o
  // sin assignedQuantity, pautados de antes de este feature que la
  // migración no pudo rellenar) oculta el badge en el HTML. Redondeado:
  // igual que el resto de esta card, la cantidad se muestra en enteros.
  public productAssignedDelta(product: CustomProduct): number {
    if (product.assignedQuantity == null) return 0;
    return Math.round((Number(product.quantity) || 0) - product.assignedQuantity);
  }

  public recipeAssignedDelta(instance: CustomRecipe): number {
    if (instance.assignedQuantity == null) return 0;
    return Math.round(this.getRecipeConsumedQuantity(instance) - instance.assignedQuantity);
  }

  // Número que se ve en la fila (antes de la "g") — SIEMPRE assignedQuantity
  // cuando existe; si no (pautados de antes de este feature, sin migrar
  // todavía en esta BBDD — ver migrate-pautado-assigned-quantity.js en el
  // backend), cae a quantity para no dejar la cifra en blanco delante de
  // la "g". El delta de arriba ya se oculta solo en ese mismo caso.
  public productDisplayQuantity(product: CustomProduct): number {
    return product.assignedQuantity ?? (Number(product.quantity) || 0);
  }

  public recipeDisplayQuantity(instance: CustomRecipe): number {
    return instance.assignedQuantity ?? this.getRecipeConsumedQuantity(instance);
  }

  // Tap en la fila de un pautado — abre toda la info nutricional en modo
  // lectura, con la cantidad consumida como único campo editable ahí
  // dentro (ver PautadoItemViewComponent). Nunca el editor de composición
  // completo (ver comentario de assignedByTrainerId en
  // editCustomProduct/editCustomRecipe más arriba).
  public async viewPautadoProduct(product: CustomProduct): Promise<void> {
    if (this.selectionMode) {
      this.toggleProductSelection(product);
      return;
    }
    const modal = await this.modalController.create({
      component: PautadoItemViewComponent,
      componentProps: { kind: 'product', product, mealId: this.meal._id },
      cssClass: 'auto-height-modal',
    });
    await modal.present();
  }

  public async viewPautadoRecipe(instance: CustomRecipe): Promise<void> {
    if (this.selectionMode) {
      this.toggleRecipeSelection(instance);
      return;
    }
    const modal = await this.modalController.create({
      component: PautadoItemViewComponent,
      componentProps: { kind: 'recipe', recipeInstance: instance, mealId: this.meal._id },
      cssClass: 'auto-height-modal',
    });
    await modal.present();
  }

  // Marcar/desmarcar consumido — actualización optimista (mismo patrón que
  // set.component.ts para los sets de entrenamiento), revertida si el
  // backend rechaza la petición. Se reemite el día (copia: el signal no
  // notifica la misma referencia) porque lo pautado solo suma en la barra
  // de macros cuando está consumido (ver DietDayService#countsAsIntake).
  public toggleProductConsumed(product: CustomProduct): void {
    const consumed = !product.consumed;
    product.consumed = consumed;
    this.emitDietDay();
    this.mealService.setCustomProductConsumed(this.meal._id, product._id, consumed).subscribe({
      error: () => {
        product.consumed = !consumed;
        this.emitDietDay();
        this.ionicUtilService.showErrorToast(
          this.translate.instant('MEAL.CONSUMED_UPDATE_ERROR'),
          this.translate.instant('COMMON.ERROR'),
          2500
        );
      },
    });
  }

  public toggleRecipeConsumed(instance: CustomRecipe): void {
    const consumed = !instance.consumed;
    instance.consumed = consumed;
    this.emitDietDay();
    this.mealService.setCustomRecipeConsumed(this.meal._id, instance._id, consumed).subscribe({
      error: () => {
        instance.consumed = !consumed;
        this.emitDietDay();
        this.ionicUtilService.showErrorToast(
          this.translate.instant('MEAL.CONSUMED_UPDATE_ERROR'),
          this.translate.instant('COMMON.ERROR'),
          2500
        );
      },
    });
  }

  private emitDietDay(): void {
    this.dietDayService.setCurrentDietDay = { ...this.dietDay };
  }

  public getRecipeName(instance: CustomRecipe): string {
    const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
    const noName = this.translate.instant('MEAL.RECIPE_NO_NAME');
    if (!recipe) return noName;

    return recipe.name || noName;
  }

  public getRecipeConsumedQuantity(instance: CustomRecipe): number {
    const quantity = Number(instance.quantity);
    return Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  }

  public getInstanceMacros(instance: CustomRecipe): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    return this.recipeService.calculateCustomRecipeTotals(recipe, instance).portionMacros;
  }

  public openPopoverOptions(event: Event): void {
    const popover: PopoverOptions = {
      component: PopoverActionsComponent,
      componentProps: {
        actionsPopover: this.getActionsPopover(),
      },
      event: event,
      mode: 'ios',
    };

    const showPopover = this.ionicUtilService.showPopover(popover);
    showPopover.then((res) => this.handleActions(res.data));
  }

  private openEditNameAlert(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('MEAL.EDIT_NAME_HEADER'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.meal.name,
          placeholder: t('MEAL.NAME_PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: t('COMMON.SAVE').toUpperCase(),
          cssClass: 'alert-button-success',
          handler: (data) => {
            if (data.name && data.name.trim() !== '') {
              this.meal.name = data.name;
              this.mealService.modifyMeal(this.meal).subscribe(() => {
                this.ionicUtilService.showToast({
                  message: t('MEAL.NAME_UPDATED'),
                  duration: 500,
                });
              });
              return true;
            } else {
              this.ionicUtilService.showToast({
                message: t('COMMON.FIELD_REQUIRED'),
                duration: 2000,
              });
              return false;
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private manageNote(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('COMMON.NOTES'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: t('COMMON.WRITE_NOTES_HERE'),
          value: this.meal.notes || '',
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
            if (!data.notes || data.notes.trim() === '') {
              const errorAlert: AlertOptions = {
                header: t('COMMON.ERROR'),
                message: t('COMMON.FIELD_REQUIRED'),
                buttons: [t('COMMON.OK')],
              };
              this.ionicUtilService.showAlert(errorAlert);
              return false;
            }
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then(async (result) => {
      if (result.role === 'cancel' || !result.data?.values?.notes) return;
      const notesValue = result.data.values.notes.trim();

      if (!this.dietDay._id) {
        this.dietDay = await this.dietDayService
          .createDietDay(this.dietDayService.getStandardDietDay(this.dietDay.date))
          .toPromise();
        this.meal = this.dietDay.meals.find((m) => m.name === this.meal.name);
        this.dietDayService.setCurrentDietDay = this.dietDay;
      }

      this.meal.notes = notesValue;
      this.mealService.modifyMeal(this.meal).subscribe({
        next: () => {
          const toast: ToastOptions = {
            message: t('TOOLBAR_CALENDAR.NOTE_UPDATED'),
            duration: 2000,
          };
          this.ionicUtilService.showToast(toast);
        },
        error: (err) => console.error('[MealComponent] Failed to save note', err),
      });
    });
  }

  public getCustomProductInfo(
    customProduct: CustomProduct,
    key: string
  ): number {
    return this.customProductService.getCustomProductInfo(customProduct, key);
  }

  public get mealKcal(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).kcal)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).kcal)
    );
    return totals;
  }

  public get mealProtein(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).protein)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).protein)
    );
    return totals;
  }

  public get mealCarbs(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).carbs)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).carbs)
    );
    return totals;
  }

  public get mealFat(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).fat)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).fat)
    );
    return totals;
  }

  private getMealInfo(): void {
    this.meal.kcal = this.mealKcal;
    this.meal.protein = this.mealProtein;
    this.meal.carbohydrate = this.mealCarbs;
    this.meal.fat = this.mealFat;
  }

  private initMeal(): void {
    this.meal.kcal = 0;
    this.meal.protein = 0;
    this.meal.carbohydrate = 0;
    this.meal.fat = 0;
  }

  private getActionsPopover(): ACTION_TYPE[] {
    const actions: ACTION_TYPE[] = [];
    if (
      (this.meal.customProducts?.length || 0) === 0 &&
      (this.meal.customRecipes?.length || 0) === 0
    ) {
      actions.push(ACTIONS[this.ACTION_TYPES.note]);
    } else {
      // Orden visual coherente: acciones de contenido y finalmente la destructiva.
      actions.push(ACTIONS[this.ACTION_TYPES.note]);
      actions.push(ACTIONS[this.ACTION_TYPES.copy]);
      actions.push(ACTIONS[this.ACTION_TYPES.delete]);
    }

    return actions;
  }

  private handleActions(action: ACTION_TYPE): void {
    switch (action?.id) {
      case ACTIONS[this.ACTION_TYPES.edit].id:
        this.openEditNameAlert();
        break;

      case ACTIONS[this.ACTION_TYPES.copy].id:
        this.enterSelectionMode();
        break;

      case ACTIONS[this.ACTION_TYPES.note].id:
        this.manageNote();
        break;

      case ACTIONS[this.ACTION_TYPES.delete].id:
        this.emptyMeal();
        break;
    }
  }

  private enterSelectionMode(): void {
    this.selectionMode = true;
    this.clearSelection();
    this.arrowRotate = true;
    this.openAccordion();

    this.copyEvent.emit({
      mealId: this.meal._id,
      mealIndex: this.mealIndex,
      selectionMode: true,
      meal: this.meal,
    });

    this.mealService.setPartialMealClipboard(this.meal, this.meal, [], []);
  }

  private openAccordion(): void {
    setTimeout(() => {
      const accordion = this.mealAccordion?.nativeElement;
      const group = accordion?.closest('ion-accordion-group') as
        | HTMLIonAccordionGroupElement
        | null;
      if (!group) return;

      const mealValue = `meal-${this.mealIndex}`;
      const currentValue = group.value;
      if (Array.isArray(currentValue)) {
        group.value = currentValue.includes(mealValue)
          ? currentValue
          : [...currentValue, mealValue];
        return;
      }

      group.value = currentValue ? [currentValue, mealValue] : [mealValue];
    });
  }

  public onSelectAllChange(event: Event): void {
    const checked = (event as CustomEvent).detail?.checked;
    if (checked) {
      this.selectAllItems();
    } else {
      this.clearSelection();
    }
    this.updateClipboardSelection();
  }

  public onProductSelectionChange(product: CustomProduct, event: Event): void {
    const checked = (event as CustomEvent).detail?.checked ?? !(event as MouseEvent).ctrlKey;
    if (checked && !this.selectionMode) {
      this.enterSelectionMode();
    }
    if (checked) {
      this.selectedProductIds.add(product._id);
    } else {
      this.selectedProductIds.delete(product._id);
    }
    this.updateClipboardSelection();
  }

  public onRecipeSelectionChange(recipe: CustomRecipe, event: Event): void {
    const checked = (event as CustomEvent).detail?.checked ?? !(event as MouseEvent).ctrlKey;
    if (checked && !this.selectionMode) {
      this.enterSelectionMode();
    }
    if (checked) {
      this.selectedRecipeIds.add(recipe._id);
    } else {
      this.selectedRecipeIds.delete(recipe._id);
    }
    this.updateClipboardSelection();
  }

  public toggleProductSelection(product: CustomProduct): void {
    if (!this.selectionMode) return;

    if (this.selectedProductIds.has(product._id)) {
      this.selectedProductIds.delete(product._id);
    } else {
      this.selectedProductIds.add(product._id);
    }
    this.updateClipboardSelection();
  }

  public toggleRecipeSelection(recipe: CustomRecipe): void {
    if (!this.selectionMode) return;

    if (this.selectedRecipeIds.has(recipe._id)) {
      this.selectedRecipeIds.delete(recipe._id);
    } else {
      this.selectedRecipeIds.add(recipe._id);
    }
    this.updateClipboardSelection();
  }

  private selectAllItems(): void {
    this.meal.customProducts?.forEach((cp) => this.selectedProductIds.add(cp._id));
    this.meal.customRecipes?.forEach((cr) => this.selectedRecipeIds.add(cr._id));
  }

  private clearSelection(): void {
    this.selectedProductIds.clear();
    this.selectedRecipeIds.clear();
  }

  private updateClipboardSelection(): void {
    const productIds = Array.from(this.selectedProductIds);
    const recipeIds = Array.from(this.selectedRecipeIds);
    const totalProducts = this.meal.customProducts?.length ?? 0;
    const totalRecipes = this.meal.customRecipes?.length ?? 0;
    const isFullMeal = 
      productIds.length === totalProducts &&
      recipeIds.length === totalRecipes &&
      (totalProducts > 0 || totalRecipes > 0);

    if (isFullMeal) {
      this.mealService.setFullMealClipboard(this.meal, this.meal);
    } else if (productIds.length > 0 || recipeIds.length > 0) {
      this.mealService.setPartialMealClipboard(
        this.meal,
        this.meal,
        productIds,
        recipeIds
      );
    } else {
      this.mealService.setPartialMealClipboard(this.meal, this.meal, [], []);
    }

    this.copyEvent.emit({
      mealId: this.meal._id,
      mealIndex: this.mealIndex,
      selectionMode: true,
      meal: this.meal,
      productIds,
      recipeIds,
      isFullMeal,
    });
  }

  public cancelSelection(): void {
    this.exitSelectionMode();
    this.mealService.clearMealClipboard();
    this.copyEvent.emit({
      mealId: this.meal._id,
      mealIndex: this.mealIndex,
      selectionMode: false,
    });
  }

  private exitSelectionMode(): void {
    this.selectionMode = false;
    this.clearSelection();
    this.arrowRotate = false;
  }

  public get hasActiveClipboard(): boolean {
    return this.mealService.hasMealClipboard();
  }

  public isProductSelected(product: CustomProduct): boolean {
    return this.selectedProductIds.has(product._id);
  }

  public isRecipeSelected(recipe: CustomRecipe): boolean {
    return this.selectedRecipeIds.has(recipe._id);
  }

  public isAllSelected(): boolean {
    const productCount = this.meal.customProducts?.length ?? 0;
    const recipeCount = this.meal.customRecipes?.length ?? 0;
    return (
      this.selectedProductIds.size === productCount &&
      this.selectedRecipeIds.size === recipeCount &&
      (productCount > 0 || recipeCount > 0)
    );
  }

  public isAnySelected(): boolean {
    return this.selectedProductIds.size > 0 || this.selectedRecipeIds.size > 0;
  }

  public getSelectedCount(): number {
    return this.selectedProductIds.size + this.selectedRecipeIds.size;
  }

  private get mealName(): string {
    if (this.translate.currentLang === 'en') {
      return DB_ES_EN_MAP[this.meal?.name] || this.meal?.name || '';
    }
    return this.meal?.name || '';
  }

  private emptyMeal(): void {
    if (this.meal) {
      const t = this.translate.instant.bind(this.translate);
      const name = this.mealName;
      const alertOptions: AlertOptions = {
        header: t('MEAL.EMPTY_MEAL_HEADER'),
        message: t('MEAL.EMPTY_MEAL_CONFIRM', { name }),
        buttons: [
          {
            text: t('COMMON.CANCEL').toUpperCase(),
            role: 'cancel',
          },
          {
            text: t('MEAL.DELETE_EMPTY'),
            role: 'destructive',
            handler: () => {
              const observables = [
                this.mealService.deleteMealCustomProducts(this.meal._id),
                this.mealService.deleteMealRecipes(this.meal._id),
              ];

              forkJoin(observables).subscribe(() => {
                this.meal.customProducts = [];
                this.meal.customRecipes = [];
                this.dietDayService.setCurrentDietDay = this.dietDay;
                this.utilService.setUnselected = true;

                this.ionicUtilService.showToast({
                  message: t('MEAL.EMPTY_MEAL_SUCCESS', { name }),
                  duration: 1000,
                });
              });
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    }
  }

  // Opciones de comida — el cliente alterna entre las opciones pautadas por
  // su profesional (la 1ª viene aplicada de serie). El backend sustituye
  // SOLO lo pautado: lo que el cliente añadió por su cuenta se queda. Si
  // hay alimentos pautados ya marcados como consumidos, se pierden con el
  // cambio: se avisa antes con una hoja de confirmación.
  public async chooseAlternative(proposal: MealProposal, index: number): Promise<void> {
    if (this.isChoosingProposal || proposal.chosenIndex === index) return;

    if (this.hasConsumedPautado(this.meal)) {
      const confirmed = await this.confirmSwitchAlternative(proposal.alternatives[index]?.label);
      if (!confirmed) return;
    }

    this.isChoosingProposal = true;
    this.choosingAlternative.emit(true);
    this.mealProposalApiService.choose(this.dietDay.date, proposal._id, index).subscribe({
      next: (updatedMeal) => {
        this.isChoosingProposal = false;
        this.meal = updatedMeal;
        const indexMeal = this.dietDay.meals.findIndex((m) => m._id === updatedMeal._id);
        if (indexMeal !== -1) this.dietDay.meals[indexMeal] = updatedMeal;
        this.dietDayService.setCurrentDietDay = this.dietDay;
        this.getMealInfo();
        proposal.chosenIndex = index;
        this.proposalChosen.emit({ proposalId: proposal._id, chosenIndex: index });
        this.choosingAlternative.emit(false);
        this.ionicUtilService.showToast({
          message: this.translate.instant('MEAL.ALTERNATIVE_CHANGED', {
            label:
              proposal.alternatives[index]?.label ||
              this.translate.instant('MEAL.ALTERNATIVE_DEFAULT_LABEL', { n: index + 1 }),
            meal: this.meal.name,
          }),
          duration: 2500,
        });
      },
      error: (err) => {
        this.isChoosingProposal = false;
        this.choosingAlternative.emit(false);
        this.ionicUtilService.showErrorToast(
          err?.error?.message || this.translate.instant('MEAL.ALTERNATIVE_CHOOSE_ERROR'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }

  private hasConsumedPautado(meal: Meal): boolean {
    return (
      this.getPautadoProducts(meal).some((p) => p.consumed) ||
      this.getPautadoRecipes(meal).some((r) => r.consumed)
    );
  }

  private async confirmSwitchAlternative(label?: string): Promise<boolean> {
    const res = await this.ionicUtilService.showModal({
      component: ConfirmSheetComponent,
      componentProps: {
        icon: 'swap-horizontal-outline',
        iconColor: 'primary',
        title: this.translate.instant('MEAL.ALTERNATIVE_SWITCH_HEADER', { label: label || '' }),
        message: this.translate.instant('MEAL.ALTERNATIVE_SWITCH_MESSAGE'),
        confirmText: this.translate.instant('MEAL.ALTERNATIVE_SWITCH_CONFIRM'),
        cancelText: this.translate.instant('COMMON.CANCEL'),
      },
      cssClass: 'confirm-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    return res.data === true;
  }
}
