import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

interface NutritionRow {
  label: string;
  value: number;
  unit: string;
}

// Campo (per-100g en el CustomProduct) -> [clave i18n en ADD_PRODUCT, unidad
// de visualización]. Mismas etiquetas y unidades que ya usa el formulario de
// producto (add-product.page.html) — no se inventan nuevas, un solo origen
// de verdad para "cómo se llama y en qué unidad se mide cada nutriente".
// Los 4 macros principales (energyKcal100g/protein100g/carbohydrates100g/
// fat100g) no están aquí: esos van fijos arriba (this.macros), este mapa es
// solo para la sección "ampliada" que se filtra por "tiene valor".
const EXTRA_NUTRITION_FIELDS: Array<[keyof CustomProduct, string, string]> = [
  ['saturatedFat100g', 'ADD_PRODUCT.SATURATED', 'g'],
  ['sugars100g', 'ADD_PRODUCT.OF_WHICH_SUGARS', 'g'],
  ['fiber100g', 'ADD_PRODUCT.FIBER', 'g'],
  ['salt100g', 'ADD_PRODUCT.SALT', 'g'],
  ['sodium100g', 'ADD_PRODUCT.SODIUM', 'mg'],
  ['cholesterol100g', 'ADD_PRODUCT.CHOLESTEROL', 'mg'],
  ['transFat100g', 'ADD_PRODUCT.TRANS_FAT', 'g'],
  ['calcium100g', 'ADD_PRODUCT.CALCIUM', 'mg'],
  ['iron100g', 'ADD_PRODUCT.IRON', 'mg'],
  ['magnesium100g', 'ADD_PRODUCT.MAGNESIUM', 'mg'],
  ['phosphorus100g', 'ADD_PRODUCT.PHOSPHORUS', 'mg'],
  ['potassium100g', 'ADD_PRODUCT.POTASSIUM', 'mg'],
  ['zinc100g', 'ADD_PRODUCT.ZINC', 'mg'],
  ['copper100g', 'ADD_PRODUCT.COPPER', 'mg'],
  ['manganese100g', 'ADD_PRODUCT.MANGANESE', 'mg'],
  ['selenium100g', 'ADD_PRODUCT.SELENIUM', 'µg'],
  ['iodine100g', 'ADD_PRODUCT.IODINE', 'µg'],
  ['vitaminA100g', 'ADD_PRODUCT.VIT_A', 'µg'],
  ['vitaminC100g', 'ADD_PRODUCT.VIT_C', 'mg'],
  ['vitaminD100g', 'ADD_PRODUCT.VIT_D', 'µg'],
  ['vitaminE100g', 'ADD_PRODUCT.VIT_E', 'mg'],
  ['vitaminK100g', 'ADD_PRODUCT.VIT_K', 'µg'],
  ['vitaminB1100g', 'ADD_PRODUCT.VIT_B1', 'mg'],
  ['vitaminB2100g', 'ADD_PRODUCT.VIT_B2', 'mg'],
  ['vitaminB3100g', 'ADD_PRODUCT.VIT_B3', 'mg'],
  ['vitaminB5100g', 'ADD_PRODUCT.VIT_B5', 'mg'],
  ['vitaminB6100g', 'ADD_PRODUCT.VIT_B6', 'mg'],
  ['vitaminB9100g', 'ADD_PRODUCT.VIT_B9', 'µg'],
  ['vitaminB12100g', 'ADD_PRODUCT.VIT_B12', 'µg'],
  ['biotin100g', 'ADD_PRODUCT.BIOTIN', 'µg'],
  ['omega3100g', 'ADD_PRODUCT.OMEGA_3', 'g'],
  ['omega6100g', 'ADD_PRODUCT.OMEGA_6', 'g'],
  ['omega9100g', 'ADD_PRODUCT.OMEGA_9', 'g'],
  ['caffeine100g', 'ADD_PRODUCT.CAFFEINE', 'mg'],
  ['taurine100g', 'ADD_PRODUCT.TAURINE', 'mg'],
  ['alcohol100g', 'ADD_PRODUCT.ALCOHOL', 'g'],
];

// Vista de solo lectura de un producto/receta pautados — el cliente ve toda
// la info nutricional, pero lo ÚNICO que puede tocar aquí es la cantidad
// consumida. Deliberadamente NO reutiliza add-product/config-recipe (2000+
// líneas cada uno, pensados para editar composición) — solo lee lo que ya
// tiene cargado el CustomProduct/CustomRecipe y, para la cantidad, escribe
// por la vía controlada del backend (setCustomProductQuantity /
// setCustomRecipeQuantity, nunca assertMealEditable).
@Component({
  selector: 'app-pautado-item-view',
  templateUrl: './pautado-item-view.component.html',
  styleUrls: ['./pautado-item-view.component.scss'],
})
export class PautadoItemViewComponent implements OnInit {
  @Input()
  public kind!: 'product' | 'recipe';

  @Input()
  public product?: CustomProduct;

  @Input()
  public recipeInstance?: CustomRecipe;

  @Input()
  public mealId!: string;

  public name = '';
  public quantity = 0;
  public assignedQuantity: number | null = null;
  public macros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  // Producto: directo de sus campos per-100g. Receta: sumado ingrediente a
  // ingrediente y escalado por portionRatio — mismo criterio que ya usa
  // recipeService para portionMacros, extendido a los ~30 campos en vez de
  // solo los 4 macros principales (ver buildRecipeExtraNutrition).
  public extraNutrition: NutritionRow[] = [];
  // Solo productos.
  public allergens: string[] = [];
  public traces: string[] = [];
  // Solo recetas — composición real (overrides/añadidos/quitados ya
  // resueltos), no la lista cruda de Recipe.customProducts.
  public ingredientRows: { name: string; quantity: number }[] = [];
  // Solo recetas — no existe un campo "instrucciones" en el modelo de
  // Recipe (ni backend ni frontend); esto es lo más parecido que hay.
  public instructions = '';

  public editableQuantity = 0;
  public saving = false;

  constructor(
    private modalController: ModalController,
    private customProductService: CustomProductService,
    private recipeService: RecipeService,
    private mealService: MealService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    if (this.kind === 'product' && this.product) {
      this.name = this.product.product?.name || '';
      this.quantity = Number(this.product.quantity) || 0;
      this.assignedQuantity =
        this.product.assignedQuantity != null ? Number(this.product.assignedQuantity) : null;
      this.macros = this.customProductService.getMacros(this.product);
      this.extraNutrition = this.buildProductExtraNutrition(this.product);
      this.allergens = this.product.allergens || [];
      this.traces = this.product.traces || [];
    } else if (this.kind === 'recipe' && this.recipeInstance) {
      const recipe =
        typeof this.recipeInstance.recipe === 'object' ? this.recipeInstance.recipe : null;
      this.name = recipe?.name || '';
      this.quantity = Number(this.recipeInstance.quantity) || 0;
      this.assignedQuantity =
        this.recipeInstance.assignedQuantity != null
          ? Number(this.recipeInstance.assignedQuantity)
          : null;
      this.instructions = recipe?.description || '';
      if (recipe) {
        const totals = this.recipeService.calculateCustomRecipeTotals(recipe, this.recipeInstance);
        this.macros = totals.portionMacros;
        this.ingredientRows = totals.ingredients.map((ingredient) => ({
          name: ingredient.product?.name || '',
          quantity: Number(ingredient.quantity) || 0,
        }));
        this.extraNutrition = this.buildRecipeExtraNutrition(totals.ingredients, totals.portionRatio);
      }
    }
    this.editableQuantity = this.quantity;
  }

  private buildProductExtraNutrition(product: CustomProduct): NutritionRow[] {
    const rows: NutritionRow[] = [];
    for (const [field, labelKey, unit] of EXTRA_NUTRITION_FIELDS) {
      const value = this.customProductService.getCustomProductInfo(product, field as string);
      if (!value) continue;
      rows.push({ label: this.translate.instant(labelKey), value, unit });
    }
    return rows;
  }

  // No existe en ningún sitio de la app un cálculo agregado de micros para
  // una receta (recipeService solo agrega los 4 macros principales, ver
  // RecipeMacros) — se construye aquí sumando cada nutriente ingrediente a
  // ingrediente (misma función getCustomProductInfo que usa un producto
  // suelto) y aplicando portionRatio, EXACTAMENTE el mismo factor que
  // recipeService usa para escalar totals -> portionMacros. No es un
  // cálculo nuevo/paralelo: es el mismo, extendido a más campos.
  private buildRecipeExtraNutrition(
    ingredients: CustomProduct[],
    portionRatio: number
  ): NutritionRow[] {
    const rows: NutritionRow[] = [];
    for (const [field, labelKey, unit] of EXTRA_NUTRITION_FIELDS) {
      const rawTotal = ingredients.reduce(
        (sum, ingredient) =>
          sum + this.customProductService.getCustomProductInfo(ingredient, field as string),
        0
      );
      const value = rawTotal * portionRatio;
      if (!value) continue;
      rows.push({ label: this.translate.instant(labelKey), value, unit });
    }
    return rows;
  }

  // Mismo criterio que el badge de la fila (meal.component.ts) — null o 0
  // de diferencia significa "sin tocar", el propio HTML lo oculta.
  public get delta(): number {
    if (this.assignedQuantity == null) return 0;
    return Math.round(this.quantity - this.assignedQuantity);
  }

  public get quantityChanged(): boolean {
    return Number(this.editableQuantity) !== this.quantity;
  }

  // Único campo editable de toda la vista. Vía controlada del backend
  // (seguimiento, no composición) — nunca toca nada más del producto/receta.
  public saveQuantity(): void {
    const quantity = Number(this.editableQuantity);
    if (!Number.isFinite(quantity) || quantity < 0) {
      this.ionicUtilService.showErrorToast(
        this.translate.instant('MEAL.INVALID_QUANTITY'),
        this.translate.instant('COMMON.ERROR'),
        2000
      );
      return;
    }

    this.saving = true;
    const request$ =
      this.kind === 'product' && this.product
        ? this.mealService.setCustomProductQuantity(this.mealId, this.product._id!, quantity)
        : this.kind === 'recipe' && this.recipeInstance
        ? this.mealService.setCustomRecipeQuantity(this.mealId, this.recipeInstance._id!, quantity)
        : null;

    if (!request$) {
      this.saving = false;
      return;
    }

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.quantity = quantity;
        if (this.kind === 'product' && this.product) {
          this.product.quantity = quantity;
          this.macros = this.customProductService.getMacros(this.product);
          this.extraNutrition = this.buildProductExtraNutrition(this.product);
        } else if (this.kind === 'recipe' && this.recipeInstance) {
          this.recipeInstance.quantity = quantity;
          const recipe =
            typeof this.recipeInstance.recipe === 'object' ? this.recipeInstance.recipe : null;
          if (recipe) {
            const totals = this.recipeService.calculateCustomRecipeTotals(
              recipe,
              this.recipeInstance
            );
            this.macros = totals.portionMacros;
            this.extraNutrition = this.buildRecipeExtraNutrition(
              totals.ingredients,
              totals.portionRatio
            );
          }
        }
        this.ionicUtilService.showToast({
          message: this.translate.instant('MEAL.QUANTITY_UPDATED'),
          duration: 800,
        });
      },
      error: () => {
        this.saving = false;
        this.editableQuantity = this.quantity;
        this.ionicUtilService.showErrorToast(
          this.translate.instant('MEAL.QUANTITY_UPDATE_ERROR'),
          this.translate.instant('COMMON.ERROR'),
          2500
        );
      },
    });
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
