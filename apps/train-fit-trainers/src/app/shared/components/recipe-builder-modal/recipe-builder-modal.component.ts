import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IProduct } from 'src/app/core/models/product';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import { ProductDetailPanelComponent } from '../product-detail-panel/product-detail-panel.component';

interface RecipeIngredient {
  product: IProduct;
  quantity: number;
}

// Fix7 — el trainer no podía crear recetas nuevas (solo elegir ya
// existentes). No reutiliza ConfigRecipePage del cliente: esa pantalla
// arrastra un RecipeDraftService + un flujo de "añadir ingrediente" basado
// en navegación por rutas (goToSearchFoods con ingredientMode, tempData...)
// que no tiene sentido dentro de un panel/modal aislado. En vez de hacerla
// dual-mode (riesgo alto, toca una pantalla compartida con mucho estado),
// este componente es un builder mínimo propio: nombre + lista de
// ingredientes (reutilizando SearchFoodsPage/CreateProductPage para
// elegir/crear cada producto, igual que el resto del constructor de
// plantillas) + POST a recipeService.compose() — el mismo endpoint que usa
// ConfigRecipePage en modo "create" sin meal asociada.
@Component({
  selector: 'app-recipe-builder-modal',
  templateUrl: './recipe-builder-modal.component.html',
  styleUrls: ['./recipe-builder-modal.component.scss'],
})
export class RecipeBuilderModalComponent {
  private readonly modalController = inject(ModalController);
  private readonly customProductService = inject(CustomProductService);
  private readonly recipeService = inject(RecipeService);
  private readonly ionicUtilService = inject(IonicUtilService);

  public name = '';
  public ingredients: RecipeIngredient[] = [];
  public isOpeningPicker = false;
  public isSaving = false;

  // Preparación (instrucciones) — mismo patrón simple que ConfigRecipePage
  // del cliente (descriptionSteps: pasos de texto plano, sin chips ni
  // drag&drop — eso se probó y se quitó, complejidad innecesaria). Se
  // guarda tal cual en el campo description ya existente, sin tocar
  // modelo de datos. Colapsado por defecto, un botón bajo el nombre lo
  // revela.
  public showInstructions = false;
  public instructions: string[] = [];
  public readonly maxInstructionSteps = 20;
  public readonly maxInstructionStepLength = 300;

  public get canSave(): boolean {
    return this.name.trim().length > 0 && this.ingredients.length >= 2;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public ingredientMacros(ingredient: RecipeIngredient) {
    return this.customProductService.getMacros({
      product: ingredient.product,
      quantity: ingredient.quantity,
    } as CustomProduct);
  }

  public removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  // La cantidad se edita in situ (mismo criterio que un ingrediente ya
  // elegido en la comida): no hace falta reabrir ningún selector solo para
  // cambiar el número de gramos.
  public onQuantityChange(ingredient: RecipeIngredient, value: string): void {
    const parsed = parseFloat(value);
    ingredient.quantity = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  // replaceIndex: null = añadir un ingrediente nuevo al final; un índice
  // concreto = sustituir ESE ingrediente por el que se elija ahora (mismo
  // patrón itemIndex que day-meal-editor-modal.openProductSearch).
  public async openIngredientPicker(replaceIndex: number | null = null): Promise<void> {
    if (this.isOpeningPicker) return;
    this.isOpeningPicker = true;
    try {
      const outerModal = await this.modalController.create({
        component: SearchFoodsPage,
        componentProps: {
          trainerContext: this.buildTrainerContext(() => void outerModal.dismiss(), replaceIndex),
        },
        // A la izquierda de este panel (que sigue abierto y visible detrás),
        // sin backdrop propio para no oscurecerlo — se ve la receta
        // creciendo a la derecha mientras se buscan/crean ingredientes.
        // MISMO ancho que el panel de la receta ("del mismo tamaño").
        cssClass: 'tf-panel-modal-left',
        // showBackdrop:false NO desactiva backdropDismiss — sin esto, el
        // backdrop invisible se comía el primer click sobre otra card en
        // vez de dejarlo pasar (había que tocar dos veces).
        showBackdrop: false,
        backdropDismiss: false,
      });
      this.pickerModal = outerModal;
      await outerModal.present();
      await outerModal.onDidDismiss();
      this.pickerModal = null;
      // Si el cierre fue porque tocamos un ingrediente YA añadido (ver
      // previewIngredient), el panel de detalle que acabamos de abrir para
      // ESE ingrediente no debe cerrarse — solo lo cerramos en el cierre
      // "normal" del buscador.
      if (this.suppressNextPickerCleanup) {
        this.suppressNextPickerCleanup = false;
      } else {
        await this.closeDetailPanel();
      }
    } finally {
      this.isOpeningPicker = false;
    }
  }

  private buildTrainerContext(closeOuter: () => void, replaceIndex: number | null): SearchFoodsTrainerContext {
    return {
      clientUser: {} as any,
      dietDay: {} as any,
      meal: {} as any,
      // Una receta solo puede tener productos reales como ingredientes
      // (mismo criterio que ConfigRecipePage.addIngredients con
      // ingredientMode:true, que restringe la búsqueda a "products"): las
      // recetas marcadas en la selección múltiple se descartan aquí.
      confirmSelection: (items: TrainerFoodSelection[]) => this.addIngredients(items, replaceIndex),
      closeSelf: closeOuter,
      pickCreateProduct: () => void this.createIngredientProduct(closeOuter, replaceIndex),
      // Tocar una card SOLO previsualiza (naranja + panel de detalle
      // aparte, el más a la izquierda de los 3) — nunca añade.
      onFocusItem: (item) => void this.showDetailPanel(item, null, closeOuter),
    };
  }

  // --- Panel de detalle (ProductDetailPanelComponent) ---
  private pickerModal: HTMLIonModalElement | null = null;
  private detailModal: HTMLIonModalElement | null = null;
  private suppressNextPickerCleanup = false;

  // No espera a que el panel anterior se cierre antes de abrir el nuevo:
  // si tocas producto A (abre detalle) y enseguida producto B, el detalle
  // debe pasar a mostrar B directamente — no cerrarse y quedar esperando
  // un segundo toque sobre B. `previous` se dismissea EN PARALELO al
  // present() del nuevo, nunca antes (eso era lo que forzaba el segundo
  // toque).
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
        // "Añadir a la receta" directo desde el detalle — solo tiene
        // sentido para un producto que aún no está en la receta (los ya
        // añadidos se abren vía previewIngredient, con ingredientIndex).
        // Cierra también el buscador (closeOuter): tras añadir, el trainer
        // debe ver la receta creciendo, no seguir mirando resultados.
        onAdd:
          ingredientIndex === null && item.kind === 'product' && item.product
            ? (quantity: number) => {
                this.ingredients.push({ product: item.product!, quantity });
                closeOuter?.();
              }
            : undefined,
        addLabel: 'Añadir a la receta',
      },
      // 2 paneles de 420px delante (receta + buscador) mientras el
      // buscador esté abierto; solo 1 (la receta) si ya se cerró.
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

  // Tocar un ingrediente YA añadido (no un resultado de búsqueda): cierra
  // el buscador si estaba abierto y muestra su detalle pegado a la receta
  // — quedan solo 2 paneles (receta + detalle), como pide el flujo.
  public async previewIngredient(index: number): Promise<void> {
    const ingredient = this.ingredients[index];
    if (!ingredient) return;
    if (this.pickerModal) {
      this.suppressNextPickerCleanup = true;
      await this.pickerModal.dismiss();
      // Sin esto, showDetailPanel podía leer this.pickerModal todavía como
      // "abierto" (la limpieza real vive en el continue-after-await de
      // openIngredientPicker, que puede no haber corrido aún) y elegir el
      // offset de 3 paneles cuando ya solo quedan 2 — el panel de detalle
      // se posicionaba fuera de sitio.
      this.pickerModal = null;
    }
    await this.showDetailPanel({ kind: 'product', product: ingredient.product, quantity: ingredient.quantity }, index);
  }

  private addIngredients(items: TrainerFoodSelection[], replaceIndex: number | null): void {
    items.forEach((item, i) => {
      if (item.kind !== 'product' || !item.product) return;
      const ingredient = { product: item.product, quantity: item.quantity ?? 100 };
      if (replaceIndex !== null && i === 0) {
        this.ingredients[replaceIndex] = ingredient;
      } else {
        this.ingredients.push(ingredient);
      }
    });
  }

  private async createIngredientProduct(closeOuter: () => void, replaceIndex: number | null): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateProductPage,
      componentProps: { modalMode: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<{ product: IProduct }>();
    if (role === 'confirm' && data?.product) {
      const ingredient = { product: data.product, quantity: 100 };
      if (replaceIndex !== null) {
        this.ingredients[replaceIndex] = ingredient;
      } else {
        this.ingredients.push(ingredient);
      }
    }
    closeOuter();
  }

  public toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
    if (this.showInstructions && this.instructions.length === 0) {
      this.instructions.push('');
    }
  }

  public addInstructionStep(): void {
    if (this.instructions.length >= this.maxInstructionSteps) return;
    this.instructions.push('');
  }

  public removeInstructionStep(index: number): void {
    this.instructions.splice(index, 1);
  }

  public onInstructionChange(index: number, value: string): void {
    this.instructions[index] = value.slice(0, this.maxInstructionStepLength);
  }

  public async save(): Promise<void> {
    if (!this.canSave || this.isSaving) return;
    this.isSaving = true;

    const customProducts = this.ingredients.map((ingredient) => ({
      product: ingredient.product._id,
      quantity: ingredient.quantity,
    }));
    const description = this.instructions.map((step) => step.trim()).filter(Boolean).join('\n');

    this.recipeService
      .compose({ recipe: { name: this.name.trim(), customProducts, description: description || undefined } })
      .subscribe({
      next: (result: { recipe: unknown }) => {
        this.isSaving = false;
        void this.modalController.dismiss(result.recipe, 'confirm');
      },
      error: (err) => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo crear la receta',
          'Error',
          3000
        );
      },
    });
  }
}
