import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { Recipe } from 'src/app/core/models/recipe';
import { User } from 'src/app/core/models/user';
import { TranslateService } from '@ngx-translate/core';
import { DB_ES_EN_MAP } from 'src/app/shared/constants/db-translations/es-en-db.map';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FavoritesService } from 'src/app/core/services/favorites/favorites.service';
import { PautadoItemViewComponent } from '../../../../../pautado-item-view/pautado-item-view.component';
import { MEASURE_FILTER_TYPES } from 'src/app/shared/constants/measureFilter';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() recipe: Recipe;
  @Input() meal: Meal;
  @Input() dietDay: DietDay;
  @Input() user: User;
  @Input() loading = false;
  @Input() recentCustomRecipe?: any | null = null;

  public loadingObj = { value: false };
  // Mismo criterio que ProductComponent#isBusy: mientras el día de esta fecha
  // se está creando no se puede añadir nada, para no acabar pidiendo dos días
  // de la misma fecha.
  public get isBusy(): boolean {
    return (
      this.loadingObj.value ||
      this.loading ||
      (!this.trainerMultiSelect &&
        this.dietDayService.isCreatingDietDay(this.dietDay?.date))
    );
  }
  @Input() showRecentIcon: boolean = false;
  // TAREA5 (train-fit-trainers) — mismo patrón que ProductComponent: marca/
  // desmarca esta receta en la "cesta" del panel en vez de mutar
  // meal.customRecipes (dieta del CONSUMIDOR logueado, no la del cliente).
  @Input() trainerMultiSelect = false;
  @Input() isTrainerSelected = false;
  // Fix — mismo motivo que ProductComponent#trainerSelectedQuantity: sin
  // esto, getRecipeDisplayQuantity() nunca veía la cantidad custom puesta en
  // la cesta/panel de detalle (foundInstance siempre null en modo
  // entrenador, meal.customRecipes está vacío) y la card mostraba
  // cantidad/macros por defecto de la receta.
  @Input() trainerSelectedQuantity: number | null = null;
  @Input() isTrainerFavorite = false;
  // Fix (ronda detalle) — resaltado naranja al previsualizar (ver
  // ProductComponent#isTrainerFocused, mismo criterio).
  @Input() isTrainerFocused = false;
  // Biblioteca › Alimentos (entrenadores): solo consulta, sin checkbox (ver
  // ProductComponent#selectable).
  @Input() selectable = true;
  // A qué se añade en modo entrenador (SearchFoodsTrainerContext#targetLabel):
  // el constructor de dietas no tiene un Meal real y «Añadido a …» salía vacío.
  @Input() targetLabel?: string;

  @Output() toggle = new EventEmitter<Recipe>();
  @Output() edit = new EventEmitter<Recipe>();
  @Output() remove = new EventEmitter<Recipe>();
  @Output() quickAdd = new EventEmitter<Recipe>();
  @Output() trainerToggle = new EventEmitter<{ recipe: Recipe; checked: boolean }>();
  @Output() trainerFavoriteToggle = new EventEmitter<Recipe>();
  @Output() trainerFocus = new EventEmitter<Recipe>();

  public macros: { kcal: number; protein: number; carbs: number; fat: number };
  public topIngredients: string;
  public isChecked: boolean = false;
  public displayQuantity: number | null = null;
  public measureFilter: MEASURE_FILTER_TYPES = MEASURE_FILTER_TYPES.auto;
  private foundInstance: any | null = null;
  private measureFilterSub?: Subscription;

  get mealNameTranslated(): string {
    if (this.targetLabel) return this.targetLabel;
    const name = this.meal?.name || '';
    if (this.translate.currentLang === 'en') {
      return DB_ES_EN_MAP[name] || name;
    }
    return name;
  }

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService,
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private userService: UserService,
    private favoritesService: FavoritesService,
    private modalController: ModalController
  ) {}

  // Pautada por el profesional en esta comida — mismo criterio que
  // ProductComponent#isPautado: solo lectura, porque el backend rechaza
  // cambiar su composición.
  public get isPautado(): boolean {
    if (this.trainerMultiSelect) return false;
    return !!this.foundInstance?.assignedByTrainerId;
  }

  // Mismo badge +N/-N que la fila de la comida (ver
  // MealComponent#recipeAssignedDelta) — diferencia entre lo pautado y lo
  // ya consumido. Solo tiene sentido si isPautado (ver arriba).
  public get recipeAssignedDelta(): number {
    if (this.foundInstance?.assignedQuantity == null) return 0;
    return Math.round((Number(this.foundInstance.quantity) || 0) - this.foundInstance.assignedQuantity);
  }

  public ngOnInit(): void {
    this.setTopIngredients();
    this.checkIsChecked();
    this.measureFilterSub = this.utilService.getMeasureFilter.subscribe(
      (filter) => {
        this.measureFilter = filter;
        this.displayQuantity = this.getRecipeDisplayQuantity();
        this.calculateMacros();
      }
    );
    this.utilService.getLoading.subscribe((res) => (this.loadingObj.value = res));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.meal || changes.recipe || changes.isTrainerSelected || changes.trainerSelectedQuantity) {
      console.log('[RECIPE-CARD] Meal changed, rechecking:', this.recipe.name);
      this.checkIsChecked();
      this.calculateMacros();
    }
  }

  public ngOnDestroy(): void {
    this.measureFilterSub?.unsubscribe();
  }

  private checkIsChecked(): void {
    if (this.trainerMultiSelect) {
      this.isChecked = this.isTrainerSelected;
      this.displayQuantity = this.getRecipeDisplayQuantity();
      return;
    }

    if (!this.meal?.customRecipes) {
      this.isChecked = false;
      this.foundInstance = null;
      this.displayQuantity = this.getRecipeDisplayQuantity();
      console.log(
        '[RECIPE-CARD]',
        this.recipe.name,
        'not checked - no instances in meal'
      );
      return;
    }

    this.foundInstance = this.meal.customRecipes.find((instance) => {
      const recipe =
        typeof instance.recipe === 'object' ? instance.recipe : null;
      if (!recipe) return false;

      const recipeId = recipe._id;
      return recipeId === this.recipe?._id;
    });

    this.isChecked = !!this.foundInstance;
    this.displayQuantity = this.getRecipeDisplayQuantity();

    console.log(
      '[RECIPE-CARD]',
      this.recipe.name,
      'isChecked:',
      this.isChecked
    );
  }

  private calculateMacros(): void {
    const merged = this.foundInstance
      ? this.recipeService.calculateCustomRecipeTotals(this.recipe, this.foundInstance)
      : null;
    const totals = merged?.totals || this.recipeService.calculateRecipeMacros(this.recipe);
    const baseline = this.getRecipeTotalCookedWeight(totals.quantity);
    const quantityForMeasure = this.getRecipeDisplayQuantity();
    const ratio = baseline > 0 && quantityForMeasure ? quantityForMeasure / baseline : 0;

    this.macros = {
      kcal: merged ? merged.portionMacros.kcal : totals.kcal * ratio,
      protein: merged ? merged.portionMacros.protein : totals.protein * ratio,
      carbs: merged ? merged.portionMacros.carbs : totals.carbs * ratio,
      fat: merged ? merged.portionMacros.fat : totals.fat * ratio,
    };
  }

  private setTopIngredients(): void {
    this.topIngredients = this.recipeService.getTopIngredients(this.recipe, 3);
  }

  // Favorita para el usuario cuya dieta se mira: el de la sesión, o el
  // cliente que recibe la tarjeta (su profesional busca por él).
  public get isFavorite(): boolean {
    const sessionUserId = this.userService.getLocalUser?._id;
    if (this.user && this.user._id !== sessionUserId) {
      return !!this.recipe?._id && !!this.user.favorites?.recipes?.includes(this.recipe._id);
    }
    return this.favoritesService.isFavorite('recipes', this.recipe?._id);
  }

  public onCardClick(): void {
    if (this.isBusy) return;

    // Pautada: se consulta, no se edita (ver isPautado).
    if (this.isPautado) {
      void this.openPautadoView();
      return;
    }

    if (this.trainerMultiSelect) {
      // Fix (ronda detalle) — solo previsualiza, no añade (ver
      // ProductComponent#onCardClick, mismo criterio).
      this.trainerFocus.emit(this.recipe);
      return;
    }

    // Click on card always goes to add/edit mode
    this.toggle.emit(this.recipe);
  }

  private async openPautadoView(): Promise<void> {
    const modal = await this.modalController.create({
      component: PautadoItemViewComponent,
      componentProps: {
        kind: 'recipe',
        recipeInstance: this.foundInstance,
        mealId: this.meal?._id,
      },
      cssClass: 'auto-height-modal',
    });
    await modal.present();
  }

  public onCheckboxClick(event: Event): void {
    // Stop propagation so card click doesn't fire
    event.stopPropagation();
    if (this.isBusy) return;

    if (this.trainerMultiSelect) {
      const checked = !this.isTrainerSelected;
      this.trainerToggle.emit({ recipe: this.recipe, checked });
      // Añadir con el check también previsualiza — no solo tocar la card.
      if (checked) this.trainerFocus.emit(this.recipe);
      return;
    }

    // If checked, remove from meal
    if (this.isChecked) {
      this.remove.emit(this.recipe);
    } else {
      // If not checked, quick-add directly to meal
      this.quickAdd.emit(this.recipe);
    }
  }

  public onTrainerFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.trainerFavoriteToggle.emit(this.recipe);
  }

  private getRecipeDisplayQuantity(): number | null {
    if (this.trainerMultiSelect && this.isTrainerSelected && this.trainerSelectedQuantity != null) {
      return this.trainerSelectedQuantity;
    }

    const total = this.getRecipeTotalCookedWeight();
    const consumed = this.getConsumedWeight();

    if (this.foundInstance) {
      return consumed ?? 0;
    }

    const recentQty = this.toPositiveNumber(this.recentCustomRecipe?.quantity);
    if (recentQty !== null) {
      return recentQty;
    }

    switch (this.measureFilter) {
      case MEASURE_FILTER_TYPES.cieng:
        return 100;
      case MEASURE_FILTER_TYPES.racion:
        return consumed;
      case MEASURE_FILTER_TYPES.total:
        return total;
      case MEASURE_FILTER_TYPES.auto:
      default:
        return consumed ?? 100;
    }
  }

  private getRecipeTotalCookedWeight(fallbackFromIngredients?: number): number | null {
    const fromInstance = this.toPositiveNumber(this.foundInstance?.quantityCooked);
    if (fromInstance) return fromInstance;

    const fromIngredients =
      this.toPositiveNumber(fallbackFromIngredients) ??
      this.toPositiveNumber(this.recipeService.calculateRecipeMacros(this.recipe).quantity);

    return fromIngredients ?? null;
  }

  private getConsumedWeight(): number | null {
    const fromInstance = this.toPositiveNumber(this.foundInstance?.quantity);
    if (fromInstance) return fromInstance;

    return null;
  }

  private toPositiveNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }

    return parsed;
  }
}
