import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import {
  TemplateFoodItem,
  TemplateMeal,
  TemplateMealAlternative,
  TemplateMode,
} from '../../../../models/diet-template.model';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../../../shared/components/product-search-modal/product-search-modal.component';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
  TrainerSelectionApi,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import { MealSnippetPickerComponent } from '../../../../../../shared/components/meal-snippet-picker/meal-snippet-picker.component';
import { MealSnippetApiService } from '../../../../../../shared/services/meal-snippet-api.service';
import { MealSnippet } from '../../../../../../shared/models/meal-snippet.model';
import { RecipeBuilderModalComponent } from '../../../../../../shared/components/recipe-builder-modal/recipe-builder-modal.component';
import {
  RecipeIngredientsEditorModalComponent,
  RecipeIngredientsEditResult,
} from '../../../../../../shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.component';
import { ProductDetailPanelComponent } from '../../../../../../shared/components/product-detail-panel/product-detail-panel.component';

// Extraído de diet-template-builder.page.ts a un modal standalone real —
// mismo motivo y mismo arreglo que ApplyCheckinTemplateModalComponent
// (ver comentario ahí): el panel "editor de celda" vivía como un
// <div position:fixed> hecho a mano DENTRO de la página que lo abría, y
// Ionic marca `.ion-page` con `contain: layout` (la convierte en containing
// block de ese `fixed`) — el panel dejaba de posicionarse contra el
// viewport y se apilaba codo a codo con el <ion-header> de esa misma
// página, quedando tapado por él en escritorio. Un ion-modal real
// (ModalController) se adjunta fuera de `.ion-page`, en la capa de
// overlays de Ionic — mismo mecanismo que ya usan sin problema los
// buscadores de productos/ejercicios. cssClass: 'tf-panel-modal' le da el
// mismo aspecto de panel anclado a la derecha en escritorio que tenía el
// div original.
//
// `meal` se recibe por referencia (mismo objeto que vive dentro de
// `days`/`dayPatterns` en la página): las mutaciones aquí dentro
// (añadir/quitar alternativas, alimentos...) se reflejan directamente en
// el tablero al cerrar, sin eventos de salida ni copia de datos.
@Component({
  selector: 'app-day-meal-editor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './day-meal-editor-modal.component.html',
  styleUrls: ['./day-meal-editor-modal.component.scss'],
})
export class DayMealEditorModalComponent {
  @Input() meal!: TemplateMeal;
  @Input() dayLabel = '';
  @Input() mode: TemplateMode = 'sequential';

  public readonly maxAlternatives = 4;
  // Sin límite real de alimentos por alternativa — Infinity mantiene las
  // comparaciones (>=/<) ya escritas en todo el archivo sin tocar cada
  // sitio uno a uno.
  public readonly maxFoodItemsPerAlternative = Infinity;

  // Fix4 — sin esto, un doble tap disparaba openProductSearch() dos veces
  // antes de que el primer `await modalController.create()` resolviera,
  // apilando dos SearchFoodsPage y obligando a cerrar el panel dos veces.
  public isOpeningPicker = false;

  constructor(
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private mealSnippetApi: MealSnippetApiService,
    private customProductService: CustomProductService,
    private recipeService: RecipeService
  ) {}

  public dismiss(): void {
    this.modalController.dismiss();
  }

  // Fase 9 — igual criterio que client-detail.page.ts#prescribeIsMultiple:
  // la etiqueta de cada alternativa solo se pide/muestra cuando hay 2+.
  public get isMultiple(): boolean {
    return (this.meal?.alternatives.length || 0) >= 2;
  }

  private emptyFoodItem(): TemplateFoodItem {
    return {};
  }

  // Sin item semilla — antes una alternativa nueva arrancaba con un
  // "Alimento 1" en blanco que exigía un segundo tap ("Buscar producto o
  // receta real") para hacer algo útil. Vacía del todo: solo se ven los
  // botones "Añadir alimento"/"Insertar snippet", y "Añadir alimento" ya
  // abre el buscador real directamente (ver addFoodItem).
  private emptyAlternative(): TemplateMealAlternative {
    return { label: '', items: [] };
  }

  // Cada alternativa nueva se pone ARRIBA de las anteriores (más reciente
  // primero) — así lo pidió el trainer, en vez de acumularse al final.
  public addAlternative(): void {
    if (this.meal.alternatives.length >= this.maxAlternatives) return;
    this.meal.alternatives.unshift(this.emptyAlternative());
  }

  // TAREA5 (auditoría UX, Fase E) — la mayoría de alternativas comparten casi
  // todos los alimentos. Duplicar copia la composición entera para editar
  // solo lo que cambia, en vez de repetir el ciclo de búsqueda completo.
  public duplicateAlternative(altIndex: number): void {
    if (this.meal.alternatives.length >= this.maxAlternatives) return;
    const source = this.meal.alternatives[altIndex];
    this.meal.alternatives.splice(altIndex + 1, 0, {
      label: source.label ? `${source.label} (copia)` : '',
      items: source.items.map((item) => ({ ...item })),
    });
  }

  public removeAlternative(altIndex: number): void {
    if (this.meal.alternatives.length <= 1) return;
    this.meal.alternatives.splice(altIndex, 1);
  }

  // Va directo al buscador real (mismo criterio que "Buscar producto o
  // receta real" en un item ya existente) en vez de crear un placeholder
  // "Alimento N" en blanco que hubiera que rellenar en un segundo paso.
  // itemIndex=null en openProductSearch/applyTrainerSelection significa
  // "añade uno nuevo al final", no "rellena este hueco".
  public addFoodItem(altIndex: number): void {
    const alt = this.meal.alternatives[altIndex];
    if (!alt || alt.items.length >= this.maxFoodItemsPerAlternative) return;
    void this.openProductSearch(altIndex, null);
  }

  public removeFoodItem(altIndex: number, itemIndex: number): void {
    const alt = this.meal.alternatives[altIndex];
    if (!alt || alt.items.length <= 1) return;
    alt.items.splice(itemIndex, 1);
  }

  // TAREA5 — mismo buscador real search-foods que client-detail (ver ahí el
  // porqué del trainerContext). Aquí no hay cliente/dieta real de por medio
  // (una plantilla es local hasta pulsar "Guardar"), así que los callbacks
  // solo abren el panel de cantidad/confirmar y escriben en el array local.
  // itemIndex: null = añade uno nuevo al final de la alternativa (desde
  // "Añadir alimento"); un índice concreto = rellena/reemplaza ESE hueco
  // (desde "Añadir alimento" sobre un hueco vacío, o al tocar el nombre de
  // un alimento ya elegido para cambiarlo por otro).
  public async openProductSearch(altIndex: number, itemIndex: number | null): Promise<void> {
    if (this.isOpeningPicker) return;
    this.isOpeningPicker = true;
    try {
      const outerModal = await this.modalController.create({
        component: SearchFoodsPage,
        componentProps: {
          trainerContext: this.buildSearchFoodsTrainerContext(altIndex, itemIndex, () =>
            void outerModal.dismiss()
          ),
        },
        cssClass: 'tf-panel-modal',
      });
      this.pickerModal = outerModal;
      await outerModal.present();
      await outerModal.onDidDismiss();
      this.pickerModal = null;
      await this.closeDetailPanel();
    } finally {
      this.isOpeningPicker = false;
    }
  }

  private buildSearchFoodsTrainerContext(
    altIndex: number,
    itemIndex: number | null,
    closeOuter: () => void
  ): SearchFoodsTrainerContext {
    return {
      clientUser: {} as any,
      dietDay: {} as any,
      meal: {} as any,
      targetLabel: this.meal.slot,
      confirmSelection: (items) => this.applyTrainerSelection(altIndex, itemIndex, items),
      closeSelf: closeOuter,
      registerSelectionApi: (api) => (this.selectionApi = api),
      // Fix5 — CreateProductPage es la pantalla real del cliente (macros/
      // micros/alérgenos/vegano/escáner), no el form reducido de
      // ProductSearchModalComponent. modalMode:true hace que, al guardar,
      // se cierre con {kind:'product', product, quantity:100} — mismo shape
      // que ProductSearchResult, sin importar ese tipo en shared-features.
      pickCreateProduct: () =>
        void this.pickFromModal(CreateProductPage, { modalMode: true }, altIndex, itemIndex, closeOuter),
      pickCreateRecipe: () => void this.confirmPickedRecipe(altIndex, itemIndex, closeOuter),
      // Tocar una card en el buscador solo previsualiza (naranja + panel de
      // detalle aparte) — nunca añade directamente. Pulsar "Añadir a
      // {slot}" DENTRO del panel de detalle marca el alimento en la cesta
      // del buscador (como si se tocara el checkbox, con la cantidad puesta
      // ahí) y solo cierra el propio panel de detalle — el buscador sigue
      // abierto para seguir eligiendo. "Añadir N a {slot}" (abajo del
      // buscador) es quien de verdad confirma y cierra todo.
      onFocusItem: (item) =>
        void this.showDetailPanel(item, (quantity) => {
          this.selectionApi?.setSelected(item, quantity);
        }),
    };
  }

  // --- Panel de detalle (ProductDetailPanelComponent) ---
  // Siempre el más a la izquierda de los que estén abiertos: 1 panel de
  // 420px delante (el propio buscador) mientras esté abierto.
  private pickerModal: HTMLIonModalElement | null = null;
  private detailModal: HTMLIonModalElement | null = null;
  private selectionApi: TrainerSelectionApi | null = null;

  // No espera a que el panel anterior se cierre antes de abrir el nuevo
  // (ver comentario largo en RecipeBuilderModalComponent#showDetailPanel):
  // tocar producto A y enseguida producto B debe reemplazar el detalle
  // directamente, sin tener que cerrar y volver a tocar B.
  private async showDetailPanel(item: TrainerFoodSelection, onAdd: (quantity: number) => void): Promise<void> {
    const previous = this.detailModal;
    const modal = await this.modalController.create({
      component: ProductDetailPanelComponent,
      componentProps: {
        product: item.kind === 'product' ? item.product : undefined,
        recipe: item.kind === 'recipe' ? item.recipe : undefined,
        quantity: item.quantity,
        onAdd,
        addLabel: `Añadir a ${this.meal.slot}`,
      },
      // ion-disable-focus-trap: ver comentario largo en
      // RecipeBuilderModalComponent#openIngredientPicker — sin esto, el
      // focus trap global de Ionic secuestraba el foco hacia este panel en
      // cuanto estaba abierto, sin dejar escribir en las cantidades del
      // editor de comida (ni, con el buscador también abierto, en él).
      cssClass: 'tf-panel-modal-detail-1 ion-disable-focus-trap',
      // sin esto, el backdrop invisible (showBackdrop:false NO desactiva
      // backdropDismiss) se comía el primer click sobre otro producto —
      // lo interpretaba como "tocar fuera" y cerraba el panel en vez de
      // dejar pasar el click a la card de debajo.
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

  // TAREA5 (auditoría UX) — igual que client-detail: el primer alimento
  // marcado rellena el hueco actual (si itemIndex apunta a uno), el resto
  // se añade como alimentos nuevos de la misma alternativa, sin repetir la
  // búsqueda. itemIndex=null trata TODAS las selecciones como "nuevas".
  private applyTrainerSelection(
    altIndex: number,
    itemIndex: number | null,
    items: TrainerFoodSelection[]
  ): void {
    const alt = this.meal.alternatives[altIndex];
    if (!alt || !items.length) return;

    items.forEach((selection, i) => {
      let targetIndex: number;
      if (itemIndex !== null && i === 0) {
        targetIndex = itemIndex;
      } else {
        if (alt.items.length >= this.maxFoodItemsPerAlternative) return;
        alt.items.push(this.emptyFoodItem());
        targetIndex = alt.items.length - 1;
      }
      this.assignSelectionToItem(alt.items[targetIndex], selection);
    });
  }

  // Escribe la selección (producto o receta real) en el item Y cachea su
  // snapshot de macros (ver comentario en TemplateFoodItem) reutilizando
  // CustomProductService.getMacros()/RecipeService.calculateCustomRecipeTotals()
  // — el mismo cálculo que ya usan las cards de search-foods, no una copia.
  private assignSelectionToItem(item: TemplateFoodItem, selection: TrainerFoodSelection): void {
    if (selection.kind === 'recipe' && selection.recipe) {
      item.recipeId = selection.recipe._id;
      item.recipeName = selection.recipe.name;
      item.recipe = selection.recipe;
      item.productId = undefined;
      item.productName = undefined;
      item.product = undefined;
      item.quantity = selection.quantity ?? undefined;
      // Receta nueva en este hueco: cualquier personalización de
      // ingredientes de la receta ANTERIOR no aplica a esta.
      item.addedCustomProducts = undefined;
      item.modifiedBaseCustomProducts = undefined;
      item.removedBaseCustomProductIds = undefined;
      this.recalculateItemMacros(item);
    } else if (selection.kind === 'product' && selection.product) {
      item.productId = selection.product._id;
      item.productName = selection.product.name;
      item.product = selection.product;
      item.recipeId = undefined;
      item.recipeName = undefined;
      item.recipe = undefined;
      item.addedCustomProducts = undefined;
      item.modifiedBaseCustomProducts = undefined;
      item.removedBaseCustomProductIds = undefined;
      item.quantity = selection.quantity ?? undefined;
      this.recalculateItemMacros(item);
    }
  }

  // Fix — cantidad editable in situ (mismo criterio que la cesta de
  // selección múltiple en search-foods.page.html): recalcula el snapshot
  // de macros con el producto/receta real ya cacheado en el item, sin
  // reabrir el buscador.
  public onQuantityChange(item: TemplateFoodItem, value: string): void {
    const parsed = parseFloat(value);
    item.quantity = Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
    this.recalculateItemMacros(item);
  }

  private recalculateItemMacros(item: TemplateFoodItem): void {
    if (item.recipe) {
      const macros = this.recipeService.calculateCustomRecipeTotals(item.recipe, {
        quantity: item.quantity ?? undefined,
        quantityCooked: null,
        addedCustomProducts: item.addedCustomProducts,
        modifiedBaseCustomProducts: item.modifiedBaseCustomProducts,
        removedBaseCustomProductIds: item.removedBaseCustomProductIds,
      } as CustomRecipe).portionMacros;
      item.kcal = macros.kcal;
      item.protein = macros.protein;
      item.carbs = macros.carbs;
      item.fat = macros.fat;
    } else if (item.product) {
      const macros = this.customProductService.getMacros({
        product: item.product,
        quantity: item.quantity ?? 100,
      } as CustomProduct);
      item.kcal = macros.kcal;
      item.protein = macros.protein;
      item.carbs = macros.carbs;
      item.fat = macros.fat;
    }
  }

  // Fix7 — crear una receta nueva reutiliza el mismo paso de "confirmar
  // cantidad" que ya existe para recetas EXISTENTES (ProductSearchModalComponent
  // con preselectedRecipe salta directo a ese paso), en vez de duplicar esa UI.
  private async confirmPickedRecipe(
    altIndex: number,
    itemIndex: number | null,
    closeOuter: () => void
  ): Promise<void> {
    const builderModal = await this.modalController.create({
      component: RecipeBuilderModalComponent,
      cssClass: 'tf-panel-modal',
    });
    await builderModal.present();
    const { data: recipe, role } = await builderModal.onDidDismiss();
    if (role !== 'confirm' || !recipe) return;

    await this.pickFromModal(
      ProductSearchModalComponent,
      { preselectedRecipe: recipe },
      altIndex,
      itemIndex,
      closeOuter
    );
  }

  private async pickFromModal(
    component: any,
    componentProps: Record<string, unknown>,
    altIndex: number,
    itemIndex: number | null,
    closeOuter: () => void
  ): Promise<void> {
    const modal = await this.modalController.create({ component, componentProps, cssClass: 'tf-panel-modal' });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || !data) return;

    const alt = this.meal.alternatives[altIndex];
    if (!alt) return;

    let item: TemplateFoodItem | undefined;
    if (itemIndex !== null) {
      item = alt.items[itemIndex];
    } else if (alt.items.length < this.maxFoodItemsPerAlternative) {
      item = this.emptyFoodItem();
      alt.items.push(item);
    }
    if (!item) return;

    this.assignSelectionToItem(item, data);
    closeOuter();
  }

  // Personalizar los ingredientes de la receta YA elegida en este hueco
  // (añadir/quitar/cambiar cantidad) sin tocar la receta base — mismo caso
  // que ConfigRecipePage en modo "add" del cliente. Distinto de tocar el
  // nombre (que SUSTITUYE la receta entera): esto ajusta la instancia.
  public async editRecipeIngredients(altIndex: number, itemIndex: number): Promise<void> {
    const item = this.meal.alternatives[altIndex]?.items[itemIndex];
    if (!item?.recipe) return;

    const modal = await this.modalController.create({
      component: RecipeIngredientsEditorModalComponent,
      componentProps: {
        recipe: item.recipe,
        addedCustomProducts: item.addedCustomProducts || [],
        modifiedBaseCustomProducts: item.modifiedBaseCustomProducts || [],
        removedBaseCustomProductIds: item.removedBaseCustomProductIds || [],
      },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<RecipeIngredientsEditResult>();
    if (role !== 'confirm' || !data) return;

    item.addedCustomProducts = data.addedCustomProducts;
    item.modifiedBaseCustomProducts = data.modifiedBaseCustomProducts;
    item.removedBaseCustomProductIds = data.removedBaseCustomProductIds;
    this.recalculateItemMacros(item);
  }

  // --- Snippets (TAREA5, Fase C): insertar de golpe, o guardar la
  // alternativa actual como snippet reutilizable en cualquier otra
  // plantilla/cliente ---
  public async openSnippetPicker(altIndex: number): Promise<void> {
    const modal = await this.modalController.create({
      component: MealSnippetPickerComponent,
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<MealSnippet>();
    if (role !== 'confirm' || !data) return;
    this.insertSnippet(altIndex, data);
  }

  // Fix3 — snippet.customProducts/customRecipes vienen autopopulados por el
  // backend (mongoose-autopopulate, ver meal-schema.js) con el
  // product/recipe real; el campo productName/recipeName plano nunca
  // existió (se descartaba al guardar, ver mealDao.pasteMeal). Mismo
  // arreglo que customProductsToItems/customRecipesToItems en
  // diet-template-builder.page.ts: leer el nombre del ref poblado, y
  // cachear macros con el mismo cálculo que el resto del constructor.
  private insertSnippet(altIndex: number, snippet: MealSnippet): void {
    const alt = this.meal.alternatives[altIndex];
    if (!alt) return;
    for (const cp of snippet.customProducts || []) {
      if (alt.items.length >= this.maxFoodItemsPerAlternative) break;
      const raw = (cp as any).product;
      const product = raw && typeof raw === 'object' ? raw : null;
      const productId = product?._id || (typeof raw === 'string' ? raw : undefined);
      if (!productId) continue;
      const quantity = (cp as any).quantity ?? undefined;
      const item: TemplateFoodItem = { productId, productName: product?.name || 'Producto guardado', quantity, product: product || undefined };
      if (product) this.recalculateItemMacros(item);
      alt.items.push(item);
    }
    for (const cr of snippet.customRecipes || []) {
      if (alt.items.length >= this.maxFoodItemsPerAlternative) break;
      const raw = (cr as any).recipe;
      const recipe = raw && typeof raw === 'object' ? raw : null;
      const recipeId = recipe?._id || (typeof raw === 'string' ? raw : undefined);
      if (!recipeId) continue;
      const quantity = (cr as any).quantity ?? undefined;
      const item: TemplateFoodItem = {
        recipeId,
        recipeName: recipe?.name || 'Receta guardada',
        quantity,
        recipe: recipe || undefined,
        addedCustomProducts: (cr as any).addedCustomProducts,
        modifiedBaseCustomProducts: (cr as any).modifiedBaseCustomProducts,
        removedBaseCustomProductIds: (cr as any).removedBaseCustomProductIds,
      };
      if (recipe) this.recalculateItemMacros(item);
      alt.items.push(item);
    }
  }

  public async saveAsSnippet(altIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const alt = this.meal.alternatives[altIndex];
    const slot = this.meal.slot;
    if (!alt || !alt.items.length || !alt.items.every((i) => i.productId || i.recipeId)) return;

    await this.ionicUtilService.showAlert({
      header: 'Guardar como snippet',
      message: 'Reutilizable en cualquier plantilla o cliente, con 1 clic.',
      inputs: [{ name: 'name', type: 'text', placeholder: `p. ej. ${slot} habitual` }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data: { name?: string }) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            const { customProducts, customRecipes } = this.snippetEntries(alt.items);
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

  private snippetEntries(
    items: TemplateFoodItem[]
  ): { customProducts: Record<string, unknown>[]; customRecipes: Record<string, unknown>[] } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];
    for (const item of items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          recipeName: item.recipeName,
          quantity: item.quantity || null,
          addedCustomProducts: (item.addedCustomProducts || []).map((cp) =>
            this.recipeService.serializeCustomProductForPersistence(cp)
          ),
          modifiedBaseCustomProducts: item.modifiedBaseCustomProducts || [],
          removedBaseCustomProductIds: item.removedBaseCustomProductIds || [],
        });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, productName: item.productName, quantity: item.quantity || 100 });
      }
    }
    return { customProducts, customRecipes };
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
