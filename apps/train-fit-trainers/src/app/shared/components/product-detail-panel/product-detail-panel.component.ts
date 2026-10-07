import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';
import { localizeProp } from 'src/app/core/i18n/localized-catalog';

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
export class ProductDetailPanelComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() product?: IProduct;
  @Input() recipe?: Recipe;
  @Input() quantity: number | null = 100;
  @Input() onQuantityChange?: (value: number | null) => void;
  // Fix — "Añadir a la receta/comida" directo desde el detalle, sin tener
  // que volver al buscador a marcar el checkbox. Solo lo pasan los
  // consumidores cuando el alimento previsualizado AÚN NO está añadido
  // (ver day-meal-editor-modal/RecipeBuilderModalComponent#showDetailPanel)
  // — al editar un ingrediente YA añadido no tiene sentido, no se pasa.
  // En una receta, null = receta completa (lo mismo que enseñan las macros).
  @Input() onAdd?: (quantity: number | null) => void;
  @Input() addLabel = this.translate.instant('TRAINER_COMMON.ADD');

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

  // Etiquetas en el idioma del usuario (mismas claves que el tablero de dietas).
  static {
    [...ProductDetailPanelComponent.SECONDARY_MACROS, ...ProductDetailPanelComponent.MICRONUTRIENTS].forEach((row) =>
      localizeProp(row, 'label', `DIET_TEMPLATES.NUTRIENTS.${row.field}`)
    );
  }

  // Calculados UNA vez (ngOnInit y cada vez que cambia la cantidad o el
  // producto), no con getters.
  //
  // Eran getters que devolvían un array nuevo, con objetos nuevos, en cada
  // llamada — y la plantilla los consulta desde un *ngIf Y un *ngFor sin
  // trackBy. Con eso Angular no reutilizaba ni una fila: destruía y volvía a
  // crear todo el DOM de la tabla en CADA ciclo de detección de cambios, y
  // como esto vive dentro de un ion-content (que observa cambios de tamaño,
  // y ese observer está parcheado por zone.js) cada reconstrucción disparaba
  // otro ciclo. Bucle infinito, síncrono, sin errores en consola ni tráfico
  // de red: la pestaña se quedaba bloqueada hasta cerrarla.
  //
  // Solo se notaba en algunos productos porque buildRows() conserva los
  // ceros y solo salta null/undefined: un producto importado con TODOS los
  // micronutrientes a 0 genera las 27 filas (23 micros + 4 secundarias),
  // mientras que uno con la mayoría a null genera 4 o 5 y el ciclo, aun
  // siendo igual de incorrecto, salía barato.
  public macros: { kcal: number; protein: number; carbs: number; fat: number } = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
  public secondaryRows: { label: string; value: number; unit: NutrientRow['unit'] }[] = [];
  public microRows: { label: string; value: number; unit: NutrientRow['unit'] }[] = [];

  public ngOnInit(): void {
    this.recalculate();
  }

  public dismiss(): void {
    void this.modalController.dismiss();
  }

  public get isRecipe(): boolean {
    return !!this.recipe;
  }

  private recalculate(): void {
    this.macros = this.computeMacros();
    // Filas "por cantidad": el valor guardado es por 100g, se escala igual
    // que las macros principales — mismo criterio que totalCalories/... en
    // AddProductPage, sin reinventar la fórmula.
    this.secondaryRows = this.buildRows(ProductDetailPanelComponent.SECONDARY_MACROS);
    this.microRows = this.buildRows(ProductDetailPanelComponent.MICRONUTRIENTS);
  }

  private computeMacros(): { kcal: number; protein: number; carbs: number; fat: number } {
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

  public trackByLabel(_index: number, row: { label: string }): string {
    return row.label;
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
    this.recalculate();
    this.onQuantityChange?.(next);
  }

  public addToTarget(): void {
    if (!this.onAdd) return;
    // Una receta sin cantidad se añade entera: es lo que enseñan sus macros
    // (computeMacros). Antes se mandaba 100 g y lo añadido no coincidía con
    // lo que se veía en el panel.
    this.onAdd(this.isRecipe ? this.quantity : this.quantity ?? 100);
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
      this.recalculate();
    }
  }
}
