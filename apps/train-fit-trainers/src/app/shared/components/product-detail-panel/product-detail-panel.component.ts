import { Component, Input, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';

interface NutrientRow {
  label: string;
  field: keyof IProduct;
  unit: 'mg' | 'µg' | 'g';
  toDisplay: 1000 | 1000000 | 1;
}

// Fix (ronda "3 sidenavs") — panel de detalle SEPARADO (no interno a
// search-foods): lo abre quien controla el buscador (RecipeBuilderModalComponent,
// day-meal-editor-modal...) al recibir SearchFoodsTrainerContext#onFocusItem,
// o directamente al tocar un ingrediente YA añadido. Versión de solo lectura
// (+ cantidad) de AddProductPage del cliente — mismos campos/conversión de
// unidades (ver CreateProductPage.NUTRITION_FIELDS/MG_TO_G_FIELDS), sin
// arrastrar su edición/autoguardado.
@Component({
  selector: 'app-product-detail-panel',
  templateUrl: './product-detail-panel.component.html',
  styleUrls: ['./product-detail-panel.component.scss'],
})
export class ProductDetailPanelComponent {
  @Input() product?: IProduct;
  @Input() recipe?: Recipe;
  @Input() quantity: number | null = 100;
  @Input() onQuantityChange?: (value: number | null) => void;
  // Fix — "Añadir a la receta/comida" directo desde el detalle, sin tener
  // que volver al buscador a marcar el checkbox. Solo lo pasan los
  // consumidores cuando el alimento previsualizado AÚN NO está añadido
  // (ver day-meal-editor-modal/RecipeBuilderModalComponent#showDetailPanel)
  // — al editar un ingrediente YA añadido no tiene sentido, no se pasa.
  @Input() onAdd?: (quantity: number) => void;
  @Input() addLabel = 'Añadir';

  private readonly modalController = inject(ModalController);
  private readonly customProductService = inject(CustomProductService);
  private readonly recipeService = inject(RecipeService);
  private readonly userService = inject(UserService);

  private static readonly SECONDARY_MACROS: NutrientRow[] = [
    { label: 'Grasas saturadas', field: 'saturatedFat100g', unit: 'g', toDisplay: 1 },
    { label: 'Azúcares', field: 'sugars100g', unit: 'g', toDisplay: 1 },
    { label: 'Fibra', field: 'fiber100g', unit: 'g', toDisplay: 1 },
    { label: 'Sal', field: 'salt100g', unit: 'g', toDisplay: 1 },
  ];

  private static readonly MICRONUTRIENTS: NutrientRow[] = [
    { label: 'Sodio', field: 'sodium100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Colesterol', field: 'cholesterol100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Calcio', field: 'calcium100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Hierro', field: 'iron100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Magnesio', field: 'magnesium100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Fósforo', field: 'phosphorus100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Potasio', field: 'potassium100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Zinc', field: 'zinc100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Cobre', field: 'copper100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Manganeso', field: 'manganese100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Selenio', field: 'selenium100g', unit: 'µg', toDisplay: 1000000 },
    { label: 'Yodo', field: 'iodine100g', unit: 'µg', toDisplay: 1000000 },
    { label: 'Vitamina A', field: 'vitaminA100g', unit: 'µg', toDisplay: 1000000 },
    { label: 'Vitamina C', field: 'vitaminC100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Vitamina D', field: 'vitaminD100g', unit: 'µg', toDisplay: 1000000 },
    { label: 'Vitamina E', field: 'vitaminE100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Vitamina K', field: 'vitaminK100g', unit: 'µg', toDisplay: 1000000 },
    { label: 'Vitamina B1', field: 'vitaminB1100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Vitamina B2', field: 'vitaminB2100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Vitamina B3', field: 'vitaminB3100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Vitamina B6', field: 'vitaminB6100g', unit: 'mg', toDisplay: 1000 },
    { label: 'Vitamina B9 (fólico)', field: 'vitaminB9100g', unit: 'µg', toDisplay: 1000000 },
    { label: 'Vitamina B12', field: 'vitaminB12100g', unit: 'µg', toDisplay: 1000000 },
  ];

  public dismiss(): void {
    void this.modalController.dismiss();
  }

  public get isRecipe(): boolean {
    return !!this.recipe;
  }

  public get macros(): { kcal: number; protein: number; carbs: number; fat: number } {
    if (this.recipe) {
      return this.recipeService.calculateCustomRecipeTotals(this.recipe, {
        quantity: this.quantity ?? undefined,
        quantityCooked: null,
      } as any).portionMacros;
    }
    if (this.product) {
      return this.customProductService.getMacros({
        product: this.product,
        quantity: this.quantity ?? 100,
      } as CustomProduct);
    }
    return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  }

  // Filas "por cantidad": el valor guardado es por 100g, se escala igual
  // que las macros principales — mismo criterio que totalCalories/... en
  // AddProductPage, sin reinventar la fórmula.
  public get secondaryRows(): { label: string; value: number; unit: NutrientRow['unit'] }[] {
    return this.buildRows(ProductDetailPanelComponent.SECONDARY_MACROS);
  }

  public get microRows(): { label: string; value: number; unit: NutrientRow['unit'] }[] {
    return this.buildRows(ProductDetailPanelComponent.MICRONUTRIENTS);
  }

  private buildRows(rows: NutrientRow[]): { label: string; value: number; unit: NutrientRow['unit'] }[] {
    if (!this.product) return [];
    const multiplier = (this.quantity ?? 100) / 100;
    const result: { label: string; value: number; unit: NutrientRow['unit'] }[] = [];
    for (const row of rows) {
      const per100g = this.product[row.field] as unknown as number | null | undefined;
      if (per100g === null || per100g === undefined) continue;
      result.push({ label: row.label, value: per100g * row.toDisplay * multiplier, unit: row.unit });
    }
    return result;
  }

  public onQtyChange(value: string): void {
    const parsed = parseFloat(value);
    const next = Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    this.quantity = next;
    this.onQuantityChange?.(next);
  }

  public addToTarget(): void {
    if (!this.onAdd) return;
    this.onAdd(this.quantity ?? 100);
    // Autodismiss: este botón vive DENTRO del propio panel, así que al
    // pulsarlo el panel siempre es el overlay más reciente (topmost) —
    // cerrar así nunca es ambiguo.
    void this.modalController.dismiss();
  }

  public canEditProduct(): boolean {
    if (!this.product) return false;
    const trainerId = this.userService.getLocalUser?._id;
    return !!trainerId && this.product.userId === trainerId;
  }

  public async editProduct(): Promise<void> {
    if (!this.product) return;
    const modal = await this.modalController.create({
      component: CreateProductPage,
      componentProps: { modalMode: true, modalEditProduct: this.product },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<{ product: IProduct }>();
    if (role === 'confirm' && data?.product) {
      this.product = data.product;
    }
  }
}
