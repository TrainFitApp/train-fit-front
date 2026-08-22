import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe, ModifiedBaseCustomProduct } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import { ProductDetailPanelComponent } from '../product-detail-panel/product-detail-panel.component';

export interface RecipeIngredientsEditResult {
  addedCustomProducts: CustomProduct[];
  modifiedBaseCustomProducts: ModifiedBaseCustomProduct[];
  removedBaseCustomProductIds: string[];
}

// Personalizar los ingredientes de una receta YA ELEGIDA en una comida
// (añadir/quitar/cambiar cantidad), sin tocar la receta base — mismo caso
// que ConfigRecipePage en modo "add" del cliente, reutilizando su MISMA
// lógica de diff (RecipeService.mergeRecipeIngredients/
// areCustomProductsEquivalent/buildModifiedBaseCustomProduct/
// serializeCustomProductForPersistence — la fórmula, no la pantalla, ver
// comentario en RecipeBuilderModalComponent para el porqué).
@Component({
  selector: 'app-recipe-ingredients-editor-modal',
  templateUrl: './recipe-ingredients-editor-modal.component.html',
  styleUrls: ['./recipe-ingredients-editor-modal.component.scss'],
})
export class RecipeIngredientsEditorModalComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() addedCustomProducts: CustomProduct[] = [];
  @Input() modifiedBaseCustomProducts: ModifiedBaseCustomProduct[] = [];
  @Input() removedBaseCustomProductIds: string[] = [];

  private readonly modalController = inject(ModalController);
  private readonly customProductService = inject(CustomProductService);
  private readonly recipeService = inject(RecipeService);

  public ingredients: CustomProduct[] = [];
  public isOpeningPicker = false;

  public ngOnInit(): void {
    this.ingredients = this.recipeService.mergeRecipeIngredients(this.recipe, {
      recipe: this.recipe,
      addedCustomProducts: this.addedCustomProducts,
      modifiedBaseCustomProducts: this.modifiedBaseCustomProducts,
      removedBaseCustomProductIds: this.removedBaseCustomProductIds,
    } as CustomRecipe);
  }

  public get canSave(): boolean {
    return this.ingredients.length >= 1;
  }

  public ingredientMacros(ingredient: CustomProduct) {
    return this.customProductService.getMacros(ingredient);
  }

  public isBaseIngredient(ingredient: CustomProduct): boolean {
    return !!ingredient._id && !!this.findBaseIngredient(ingredient._id);
  }

  private findBaseIngredient(id: string): CustomProduct | undefined {
    return (this.recipe.customProducts || []).find((base) => base._id === id);
  }

  public onQuantityChange(ingredient: CustomProduct, value: string): void {
    const parsed = parseFloat(value);
    ingredient.quantity = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  public removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  public async openIngredientPicker(): Promise<void> {
    if (this.isOpeningPicker) return;
    this.isOpeningPicker = true;
    try {
      const outerModal = await this.modalController.create({
        component: SearchFoodsPage,
        componentProps: {
          trainerContext: this.buildTrainerContext(() => void outerModal.dismiss()),
        },
        // A la izquierda de este panel (sigue visible detrás), sin backdrop
        // propio, MISMO ancho — mismo criterio que RecipeBuilderModalComponent.
        cssClass: 'tf-panel-modal-left',
        showBackdrop: false,
        backdropDismiss: false,
      });
      this.pickerModal = outerModal;
      await outerModal.present();
      await outerModal.onDidDismiss();
      this.pickerModal = null;
      if (this.suppressNextPickerCleanup) {
        this.suppressNextPickerCleanup = false;
      } else {
        await this.closeDetailPanel();
      }
    } finally {
      this.isOpeningPicker = false;
    }
  }

  private buildTrainerContext(closeOuter: () => void): SearchFoodsTrainerContext {
    return {
      clientUser: {} as any,
      dietDay: {} as any,
      meal: {} as any,
      // Un ingrediente de receta solo puede ser un producto real — igual
      // que RecipeBuilderModalComponent, las recetas marcadas se descartan.
      confirmSelection: (items: TrainerFoodSelection[]) => this.addIngredients(items),
      closeSelf: closeOuter,
      pickCreateProduct: () => void this.createIngredientProduct(closeOuter),
      onFocusItem: (item) => void this.showDetailPanel(item, null, closeOuter),
    };
  }

  // --- Panel de detalle (ProductDetailPanelComponent) ---
  private pickerModal: HTMLIonModalElement | null = null;
  private detailModal: HTMLIonModalElement | null = null;
  private suppressNextPickerCleanup = false;

  // No espera a que el panel anterior se cierre antes de abrir el nuevo
  // (ver comentario largo en RecipeBuilderModalComponent#showDetailPanel).
  private async showDetailPanel(
    item: TrainerFoodSelection,
    ingredientIndex: number | null,
    closeOuter?: () => void
  ): Promise<void> {
    const previous = this.detailModal;
    const modal = await this.modalController.create({
      component: ProductDetailPanelComponent,
      componentProps: {
        product: item.product,
        quantity: item.quantity,
        onQuantityChange:
          ingredientIndex !== null
            ? (value: number | null) => {
                const ingredient = this.ingredients[ingredientIndex];
                if (ingredient) ingredient.quantity = value ?? 0;
              }
            : undefined,
        onAdd:
          ingredientIndex === null && item.kind === 'product' && item.product
            ? (quantity: number) => {
                this.ingredients.push({ product: item.product!, quantity } as CustomProduct);
                closeOuter?.();
              }
            : undefined,
        addLabel: 'Añadir a la receta',
      },
      cssClass: this.pickerModal ? 'tf-panel-modal-detail-2' : 'tf-panel-modal-detail-1',
      showBackdrop: false,
      backdropDismiss: false,
    });
    this.detailModal = modal;
    if (previous) await previous.dismiss();
    await modal.present();
    void modal.onDidDismiss().then(() => {
      if (this.detailModal === modal) this.detailModal = null;
    });
  }

  private async closeDetailPanel(): Promise<void> {
    if (this.detailModal) {
      await this.detailModal.dismiss();
      this.detailModal = null;
    }
  }

  public async previewIngredient(index: number): Promise<void> {
    const ingredient = this.ingredients[index];
    if (!ingredient) return;
    if (this.pickerModal) {
      this.suppressNextPickerCleanup = true;
      await this.pickerModal.dismiss();
      // Ver comentario en RecipeBuilderModalComponent#previewIngredient —
      // sin esto, showDetailPanel podía elegir el offset de 3 paneles con
      // el buscador ya cerrado.
      this.pickerModal = null;
    }
    await this.showDetailPanel({ kind: 'product', product: ingredient.product, quantity: ingredient.quantity }, index);
  }

  private addIngredients(items: TrainerFoodSelection[]): void {
    for (const item of items) {
      if (item.kind !== 'product' || !item.product) continue;
      this.ingredients.push({ product: item.product, quantity: item.quantity ?? 100 } as CustomProduct);
    }
  }

  private async createIngredientProduct(closeOuter: () => void): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateProductPage,
      componentProps: { modalMode: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<{ product: IProduct }>();
    if (role === 'confirm' && data?.product) {
      this.ingredients.push({ product: data.product, quantity: 100 } as CustomProduct);
    }
    closeOuter();
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  // Compara el estado actual contra la receta base: lo que ya no está =
  // quitado, lo que cambió = modificado, lo que nunca estuvo = añadido.
  // Mismo cálculo que ConfigRecipePage#save (addRecipeToMeal), reutilizando
  // los métodos de RecipeService en vez de reescribir el diff.
  public save(): void {
    const removedBaseCustomProductIds = this.recipeService
      .getRemovedBaseIngredients(this.recipe, this.ingredients)
      .map((ingredient) => ingredient._id!)
      .filter(Boolean);

    const modifiedBaseCustomProducts: ModifiedBaseCustomProduct[] = [];
    const addedCustomProducts: CustomProduct[] = [];

    for (const ingredient of this.ingredients) {
      const base = ingredient._id ? this.findBaseIngredient(ingredient._id) : undefined;
      if (base) {
        if (!this.recipeService.areCustomProductsEquivalent(base, ingredient)) {
          modifiedBaseCustomProducts.push(this.recipeService.buildModifiedBaseCustomProduct(base, ingredient));
        }
      } else {
        addedCustomProducts.push(ingredient);
      }
    }

    const result: RecipeIngredientsEditResult = {
      addedCustomProducts,
      modifiedBaseCustomProducts,
      removedBaseCustomProductIds,
    };
    void this.modalController.dismiss(result, 'confirm');
  }
}
