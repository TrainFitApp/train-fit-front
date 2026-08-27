import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { MEAL_SLOTS, MealSlot } from '../../../diet-templates/models/diet-template.model';
import { ComposeMealFoodItem, BulkApplyResult } from '../../models/meal-compose.model';
import { MealComposeApiService } from '../../services/meal-compose-api.service';
import { SelectClientsModalComponent } from '../../../clients/components/select-clients-modal/select-clients-modal.component';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../shared/components/product-search-modal/product-search-modal.component';
import { MealSnippetPickerComponent } from '../../../../shared/components/meal-snippet-picker/meal-snippet-picker.component';
import { MealSnippetApiService } from '../../../../shared/services/meal-snippet-api.service';
import { MealSnippet } from '../../../../shared/models/meal-snippet.model';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// TAREA5 (auditoría UX, Fase D) — punto de entrada propio para pautar la
// MISMA comida a un grupo de clientes de una sola vez, en vez de que
// "aplicar a otros clientes" sea solo una opción secundaria al final del
// flujo de un cliente concreto (bulkApplyPrescribedMeal en client-detail).
// Reutiliza SearchFoodsPage/ProductSearchModalComponent con un
// trainerContext "sin cliente real" (clientUser/dietDay/meal vacíos, igual
// que diet-template-builder cuando compone localmente) y el endpoint nuevo
// POST /trainer/meals/apply-to-clients (sin cliente origen en la URL).
@Component({
  selector: 'app-compose-meal',
  templateUrl: 'compose-meal.page.html',
  styleUrls: ['compose-meal.page.scss'],
})
export class ComposeMealPage {
  public readonly mealSlots = MEAL_SLOTS;
  public mealSlot: MealSlot = MEAL_SLOTS[0];
  public date = todayIsoDate();
  public items: ComposeMealFoodItem[] = [];
  public readonly maxItems = 8;
  public isApplying = false;

  constructor(
    private modalController: ModalController,
    private mealComposeApi: MealComposeApiService,
    private mealSnippetApi: MealSnippetApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public addFoodItem(): void {
    if (this.items.length >= this.maxItems) return;
    this.items.push({});
  }

  public removeFoodItem(index: number): void {
    this.items.splice(index, 1);
  }

  public clearProduct(index: number): void {
    const item = this.items[index];
    item.productId = undefined;
    item.productName = undefined;
    item.recipeId = undefined;
    item.recipeName = undefined;
    item.quantity = undefined;
  }

  public async openProductSearch(itemIndex: number): Promise<void> {
    const outerModal = await this.modalController.create({
      component: SearchFoodsPage,
      componentProps: {
        trainerContext: this.buildTrainerContext(itemIndex, () => void outerModal.dismiss()),
      },
      cssClass: 'tf-panel-modal',
    });
    await outerModal.present();
    await outerModal.onDidDismiss();
  }

  private buildTrainerContext(itemIndex: number, closeOuter: () => void): SearchFoodsTrainerContext {
    return {
      clientUser: {} as any,
      dietDay: {} as any,
      meal: {} as any,
      targetLabel: this.mealSlot,
      confirmSelection: (selection) => this.applySelection(itemIndex, selection),
      closeSelf: closeOuter,
      pickCreateProduct: () => void this.confirmCreateProduct(itemIndex, closeOuter),
    };
  }

  private applySelection(itemIndex: number, selection: TrainerFoodSelection[]): void {
    if (!selection.length) return;

    selection.forEach((sel, i) => {
      let targetIndex = itemIndex;
      if (i > 0) {
        if (this.items.length >= this.maxItems) return;
        this.items.push({});
        targetIndex = this.items.length - 1;
      }
      const item = this.items[targetIndex];
      if (sel.kind === 'recipe' && sel.recipe) {
        item.recipeId = sel.recipe._id;
        item.recipeName = sel.recipe.name;
        item.productId = undefined;
        item.productName = undefined;
        item.quantity = sel.quantity ?? undefined;
      } else if (sel.kind === 'product' && sel.product) {
        item.productId = sel.product._id;
        item.productName = sel.product.name;
        item.recipeId = undefined;
        item.recipeName = undefined;
        item.quantity = sel.quantity ?? undefined;
      }
    });
  }

  private async confirmCreateProduct(itemIndex: number, closeOuter: () => void): Promise<void> {
    const modal = await this.modalController.create({
      component: ProductSearchModalComponent,
      componentProps: { startInCreateProduct: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || !data) return;

    const item = this.items[itemIndex];
    if (data.kind === 'recipe' && data.recipe) {
      item.recipeId = data.recipe._id;
      item.recipeName = data.recipe.name;
      item.productId = undefined;
      item.productName = undefined;
      item.quantity = data.quantity ?? undefined;
    } else if (data.product) {
      item.productId = data.product._id;
      item.productName = data.product.name;
      item.recipeId = undefined;
      item.recipeName = undefined;
      item.quantity = data.quantity ?? undefined;
    }
    closeOuter();
  }

  public get canCompose(): boolean {
    return this.items.length > 0 && this.items.every((i) => !!(i.productId || i.recipeId));
  }

  private itemsToCustomEntries(): {
    customProducts: Record<string, unknown>[];
    customRecipes: Record<string, unknown>[];
  } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];
    for (const item of this.items) {
      if (item.recipeId) {
        customRecipes.push({ recipe: item.recipeId, quantity: item.quantity || null });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, quantity: item.quantity || 100 });
      }
    }
    return { customProducts, customRecipes };
  }

  // TAREA5 (auditoría UX, Fase C) — insertar un snippet de golpe: cada
  // entrada del snippet rellena/añade un alimento, igual que la selección
  // múltiple del buscador (misma mecánica, distinta fuente).
  public async openSnippetPicker(): Promise<void> {
    const modal = await this.modalController.create({
      component: MealSnippetPickerComponent,
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<MealSnippet>();
    if (role !== 'confirm' || !data) return;
    this.insertSnippet(data);
  }

  private insertSnippet(snippet: MealSnippet): void {
    for (const cp of snippet.customProducts || []) {
      if (this.items.length >= this.maxItems) break;
      const productId = typeof cp.product === 'string' ? cp.product : (cp as any).product?._id;
      if (!productId) continue;
      this.items.push({
        productId,
        productName: (cp as any).productName || 'Producto guardado',
        quantity: (cp as any).quantity ?? undefined,
      });
    }
    for (const cr of snippet.customRecipes || []) {
      if (this.items.length >= this.maxItems) break;
      const recipeId = typeof (cr as any).recipe === 'string' ? (cr as any).recipe : (cr as any).recipe?._id;
      if (!recipeId) continue;
      this.items.push({
        recipeId,
        recipeName: (cr as any).recipeName || 'Receta guardada',
        quantity: (cr as any).quantity ?? undefined,
      });
    }
  }

  public async saveAsSnippet(): Promise<void> {
    if (!this.canCompose) return;
    await this.ionicUtilService.showAlert({
      header: 'Guardar como snippet',
      message: 'Reutilizable en cualquier plantilla o cliente, con 1 clic.',
      inputs: [{ name: 'name', type: 'text', placeholder: 'p. ej. Desayuno alto en proteína' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data: { name?: string }) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            const { customProducts, customRecipes } = this.itemsToSnippetEntries();
            this.mealSnippetApi.create(name, customProducts, customRecipes).subscribe({
              next: () => this.ionicUtilService.showToast({ message: `Snippet "${name}" guardado`, duration: 2000 }),
              error: () => this.ionicUtilService.showErrorToast('No se pudo guardar el snippet', 'Error', 3000),
            });
            return true;
          },
        },
      ],
    });
  }

  private itemsToSnippetEntries(): {
    customProducts: Record<string, unknown>[];
    customRecipes: Record<string, unknown>[];
  } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];
    for (const item of this.items) {
      if (item.recipeId) {
        customRecipes.push({ recipe: item.recipeId, recipeName: item.recipeName, quantity: item.quantity || null });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, productName: item.productName, quantity: item.quantity || 100 });
      }
    }
    return { customProducts, customRecipes };
  }

  public async chooseClientsAndApply(): Promise<void> {
    if (!this.canCompose || this.isApplying) return;

    const modal = await this.modalController.create({
      component: SelectClientsModalComponent,
      componentProps: {
        requiredScope: 'nutrition',
        title: `Aplicar "${this.mealSlot}" a clientes`,
      },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<{ targetClientIds: string[] }>();
    if (role !== 'confirm' || !data?.targetClientIds?.length) return;

    this.isApplying = true;
    const { customProducts, customRecipes } = this.itemsToCustomEntries();
    this.mealComposeApi
      .applyToClients({
        date: this.date,
        mealSlot: this.mealSlot,
        customProducts,
        customRecipes,
        merge: false,
        targetClientIds: data.targetClientIds,
      })
      .subscribe({
        next: (results) => {
          this.isApplying = false;
          this.showResultToast(results);
        },
        error: () => {
          this.isApplying = false;
          this.ionicUtilService.showErrorToast('No se pudo aplicar la comida', 'Error', 3000);
        },
      });
  }

  private showResultToast(results: BulkApplyResult[]): void {
    const successCount = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success);
    if (!failed.length) {
      this.ionicUtilService.showToast({
        message: `"${this.mealSlot}" aplicada a ${successCount} cliente${successCount === 1 ? '' : 's'}`,
        duration: 2500,
      });
      this.items = [];
      return;
    }
    this.ionicUtilService.showErrorToast(
      `Aplicada a ${successCount} de ${results.length} — ${failed[0].error || 'error desconocido'}`,
      'Aplicado parcialmente',
      4000
    );
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public goBack(): void {
    this.router.navigate(['/tabs/templates']);
  }
}
