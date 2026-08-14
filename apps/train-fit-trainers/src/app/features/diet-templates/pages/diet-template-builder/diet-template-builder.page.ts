import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietTemplateApiService } from '../../services/diet-template-api.service';
import {
  DietTemplate,
  DietTemplateMealPayload,
  MEAL_SLOTS,
  TemplateDay,
  TemplateDayPattern,
  TemplateFoodItem,
  TemplateMeal,
  TemplateMealAlternative,
  TemplateMode,
  WEEKDAYS,
} from '../../models/diet-template.model';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../shared/components/product-search-modal/product-search-modal.component';
import {
  SearchFoodsPage,
  SearchFoodsTrainerContext,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import { MealSnippetPickerComponent } from '../../../../shared/components/meal-snippet-picker/meal-snippet-picker.component';
import { MealSnippetApiService } from '../../../../shared/services/meal-snippet-api.service';
import { MealSnippet } from '../../../../shared/models/meal-snippet.model';

type ViewState = 'loading' | 'error' | 'loaded';

interface BoardCellRef {
  dayIndex: number;
  mealIndex: number;
}

// Replanteamiento MVP (nutrición) — constructor de la plantilla: días con sus
// 6 comidas fijas (mismo enum que DietDay real), cada comida con una o varias
// alternativas (Fase 9 — mismo patrón multi-alternativa que client-detail.page.ts
// #panel de pautar). Se guarda explícitamente (sin autosave) para no disparar
// un PUT por cada pulsación.
@Component({
  selector: 'app-diet-template-builder',
  templateUrl: 'diet-template-builder.page.html',
  styleUrls: ['diet-template-builder.page.scss'],
})
export class DietTemplateBuilderPage implements OnInit {
  public state: ViewState = 'loading';
  public templateId = '';
  public name = '';
  public days: TemplateDay[] = [];
  public isSaving = false;
  public readonly mealSlots = MEAL_SLOTS;
  public readonly maxDays = 14;
  public readonly maxFoodItemsPerAlternative = 8;
  public readonly maxAlternatives = 4;

  // Auditoría de arquitectura (Fase 8/9) — "sequential" es el tablero
  // Día 1..N de siempre; "recurring" y "choice" comparten `dayPatterns[]`
  // (patrones por día de la semana fijo, o elegidos por el cliente cada día
  // respectivamente) para no perder los días secuenciales si el entrenador
  // cambia de modo y vuelve a cambiar.
  public mode: TemplateMode = 'sequential';
  public dayPatterns: TemplateDayPattern[] = [];
  public readonly maxPatterns = 10;
  public readonly weekdays = WEEKDAYS;

  // TAREA5 (auditoría UX, Fase C) — tablero semanal: días × comidas en
  // rejilla, en vez del acordeón día→comida→alimentos anterior. Una celda
  // se edita en un panel aparte (editingCell), y se puede arrastrar entera
  // (con todas sus alternativas) a otra celda para moverla, o duplicarla a
  // otro día sin moverla del origen.
  public editingCell: BoardCellRef | null = null;
  private draggedFrom: BoardCellRef | null = null;
  public dragOverCell: BoardCellRef | null = null;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dietTemplateApi: DietTemplateApiService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private mealSnippetApi: MealSnippetApiService
  ) {}

  // TASK-051 (MASTER_BACKLOG.md) — antes leía el :id una sola vez de
  // route.snapshot en ngOnInit. Sin explotar hoy (la lista no navega de una
  // plantilla abierta directamente a otra), pero defiende contra el caso en
  // que Angular reutilice esta instancia entre dos ':id' distintos de la
  // misma ruta (comportamiento por defecto cuando solo cambia el
  // parámetro) — mismo criterio aplicado en RoutineBuilderPage.
  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.templateId = params.get('id') || '';
      this.load();
    });
  }

  public load(): void {
    this.state = 'loading';
    this.dietTemplateApi.list().subscribe({
      next: (templates) => {
        const template = (templates || []).find((t) => t._id === this.templateId);
        if (!template) {
          this.state = 'error';
          return;
        }
        this.applyTemplate(template);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private applyTemplate(template: DietTemplate): void {
    this.name = template.name;
    this.mode = template.mode || 'sequential';
    this.days = (template.days || []).map((day: any) => ({
      dayLabel: day.dayLabel,
      meals: this.mealsFromPayload(day.meals),
    }));
    this.dayPatterns = (template.dayPatterns || []).map((pattern: any) => ({
      name: pattern.name,
      appliesTo: Array.isArray(pattern.appliesTo) ? pattern.appliesTo : [],
      meals: this.mealsFromPayload(pattern.meals),
    }));
  }

  private mealsFromPayload(meals: any[] | undefined): TemplateMeal[] {
    return this.mealSlots.map((slot) => {
      const existing = (meals || []).find((m: any) => m.slot === slot);
      return {
        slot,
        alternatives: (existing?.alternatives || []).map((alt: any) => ({
          label: alt.label || '',
          items: [...this.customProductsToItems(alt.customProducts), ...this.customRecipesToItems(alt.customRecipes)],
        })),
      };
    });
  }

  // --- Filas activas del tablero: días secuenciales o patrones (semanales o
  // elegidos por el cliente), según el modo. Ambos comparten forma
  // {meals: TemplateMeal[]}, así que el resto de métodos (editor de celda,
  // drag&drop, snippets...) operan sobre esta lista sin duplicarse por modo. ---
  public get activeRows(): (TemplateDay | TemplateDayPattern)[] {
    return this.mode === 'sequential' ? this.days : this.dayPatterns;
  }

  public get activeRowsLimit(): number {
    return this.mode === 'sequential' ? this.maxDays : this.maxPatterns;
  }

  public setMode(mode: TemplateMode): void {
    this.mode = mode;
  }

  public rowLabel(row: TemplateDay | TemplateDayPattern): string {
    return this.mode === 'sequential' ? (row as TemplateDay).dayLabel : (row as TemplateDayPattern).name;
  }

  public setRowLabel(row: TemplateDay | TemplateDayPattern, value: string): void {
    if (this.mode === 'sequential') {
      (row as TemplateDay).dayLabel = value;
    } else {
      (row as TemplateDayPattern).name = value;
    }
  }

  // Angular templates no admiten "as" de TypeScript — este helper evita
  // repetir "$any(row)" por todo el HTML del tablero en modo recurrente/choice.
  public asPattern(row: TemplateDay | TemplateDayPattern): TemplateDayPattern {
    return row as TemplateDayPattern;
  }

  public toggleWeekday(pattern: TemplateDayPattern, weekday: number): void {
    const i = pattern.appliesTo.indexOf(weekday);
    if (i >= 0) pattern.appliesTo.splice(i, 1);
    else pattern.appliesTo.push(weekday);
  }

  // Aviso suave (no bloquea guardar) de qué días de la semana no quedan
  // cubiertos por ningún patrón — ese día concreto simplemente no tocará
  // nada del plan (ver plan-resolver.js), pero conviene que sea explícito.
  // Solo aplica en modo "recurring" — en "choice" no hay días de la semana.
  public get uncoveredWeekdays(): string {
    if (this.mode !== 'recurring') return '';
    const covered = new Set(this.dayPatterns.flatMap((p) => p.appliesTo));
    const missing = this.weekdays.filter((w) => !covered.has(w.value));
    return missing.map((w) => w.label).join(', ');
  }

  // El backend persiste cada alimento como "clipboard" (mismo formato que
  // customProducts en meal-schema.js), no como TemplateFoodItem — se
  // reconstruye la vista editable a partir de eso. No se guarda el nombre
  // real del producto (solo su _id), así que un alimento real reaparece
  // como "picked" con un nombre genérico en vez del nombre original.
  private customProductsToItems(customProducts: any[] | undefined): TemplateFoodItem[] {
    if (!Array.isArray(customProducts)) return [];
    return customProducts
      .filter((cp) => cp?.product)
      .map((cp) => ({
        productId: typeof cp.product === 'string' ? cp.product : cp.product?._id,
        productName: 'Alimento guardado',
        quantity: cp.quantity,
      }));
  }

  // Mismo formato "clipboard" que customRecipes en meal-schema.js — igual
  // limitación que customProductsToItems: no se guarda el nombre real de la
  // receta, solo su _id.
  private customRecipesToItems(customRecipes: any[] | undefined): TemplateFoodItem[] {
    if (!Array.isArray(customRecipes)) return [];
    return customRecipes
      .filter((cr) => cr?.recipe)
      .map((cr) => ({
        recipeId: typeof cr.recipe === 'string' ? cr.recipe : cr.recipe?._id,
        recipeName: 'Receta guardada',
        quantity: cr.quantity,
      }));
  }

  // Espejo de alternativeToCustomEntries en client-detail.page.ts — mismo
  // formato "clipboard" que ya acepta mealModel.pasteMeal (F12/F28). Cada
  // alimento es siempre un producto o una receta real (ver canSave), nunca
  // macros tecleadas a mano.
  private itemsToCustomEntries(
    items: TemplateFoodItem[]
  ): { customProducts: Record<string, unknown>[]; customRecipes: Record<string, unknown>[] } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];

    for (const item of items) {
      if (item.recipeId) {
        customRecipes.push({ recipe: item.recipeId, quantity: item.quantity || null });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, quantity: item.quantity || 100 });
      }
    }

    return { customProducts, customRecipes };
  }

  public addRow(): void {
    if (this.activeRows.length >= this.activeRowsLimit) return;
    if (this.mode === 'sequential') {
      this.days.push({
        dayLabel: `Día ${this.days.length + 1}`,
        meals: this.mealSlots.map((slot) => ({ slot, alternatives: [] })),
      });
    } else {
      this.dayPatterns.push({
        name: this.mode === 'choice' ? `Menú ${this.dayPatterns.length + 1}` : `Patrón ${this.dayPatterns.length + 1}`,
        appliesTo: [],
        meals: this.mealSlots.map((slot) => ({ slot, alternatives: [] })),
      });
    }
  }

  public removeRow(index: number): void {
    this.activeRows.splice(index, 1);
    if (this.editingCell?.dayIndex === index) this.editingCell = null;
  }

  public mealSummary(meal: TemplateMeal): string {
    const alternatives = meal.alternatives || [];
    if (!alternatives.length) return 'Vacía';
    if (alternatives.length === 1) {
      const n = alternatives[0].items.length;
      return `${n} alimento${n === 1 ? '' : 's'}`;
    }
    return `${alternatives.length} alternativas`;
  }

  // --- Editor de celda (día × comida) ---
  public openMealEditor(dayIndex: number, mealIndex: number): void {
    this.editingCell = { dayIndex, mealIndex };
    const meal = this.editingMeal;
    // Siempre se edita con al menos una alternativa visible en pantalla,
    // aunque la celda esté vacía — igual que el panel de "Pautar" en
    // client-detail.page.ts.
    if (meal && !meal.alternatives.length) {
      meal.alternatives.push(this.emptyAlternative());
    }
  }

  public closeMealEditor(): void {
    this.editingCell = null;
  }

  public get editingMeal(): TemplateMeal | null {
    if (!this.editingCell) return null;
    return this.activeRows[this.editingCell.dayIndex]?.meals[this.editingCell.mealIndex] || null;
  }

  public get editingDayLabel(): string {
    if (!this.editingCell) return '';
    const row = this.activeRows[this.editingCell.dayIndex];
    return row ? this.rowLabel(row) : '';
  }

  // Fase 9 — igual criterio que client-detail.page.ts#prescribeIsMultiple:
  // la etiqueta de cada alternativa solo se pide/muestra cuando hay 2+.
  public get editingIsMultiple(): boolean {
    return (this.editingMeal?.alternatives.length || 0) >= 2;
  }

  // --- Arrastrar y soltar: mover una comida completa (con todas sus
  // alternativas) de una celda a otra. Si el destino ya tiene algo, pide
  // confirmación antes de sobrescribir — perder una comida ya compuesta por
  // un arrastre accidental sería un desastre silencioso. ---
  public onCellDragStart(dayIndex: number, mealIndex: number, event: DragEvent): void {
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (!meal.alternatives.length) {
      event.preventDefault();
      return;
    }
    this.draggedFrom = { dayIndex, mealIndex };
    event.dataTransfer?.setData('text/plain', 'meal');
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  public onCellDragOver(dayIndex: number, mealIndex: number, event: DragEvent): void {
    if (!this.draggedFrom) return;
    event.preventDefault();
    this.dragOverCell = { dayIndex, mealIndex };
  }

  public onCellDragLeave(): void {
    this.dragOverCell = null;
  }

  public async onCellDrop(dayIndex: number, mealIndex: number, event: DragEvent): Promise<void> {
    event.preventDefault();
    this.dragOverCell = null;
    const from = this.draggedFrom;
    this.draggedFrom = null;
    if (!from) return;
    if (from.dayIndex === dayIndex && from.mealIndex === mealIndex) return;

    const targetMeal = this.activeRows[dayIndex].meals[mealIndex];
    if (targetMeal.alternatives.length) {
      await this.ionicUtilService.showAlert({
        header: `¿Sobrescribir "${this.rowLabel(this.activeRows[dayIndex])} · ${targetMeal.slot}"?`,
        message: 'Ya tiene alimentos compuestos — se reemplazan por los de la comida que arrastraste.',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Sobrescribir', role: 'destructive', handler: () => this.moveMeal(from, { dayIndex, mealIndex }) },
        ],
      });
      return;
    }
    this.moveMeal(from, { dayIndex, mealIndex });
  }

  private moveMeal(from: BoardCellRef, to: BoardCellRef): void {
    const sourceMeal = this.activeRows[from.dayIndex].meals[from.mealIndex];
    const targetMeal = this.activeRows[to.dayIndex].meals[to.mealIndex];
    targetMeal.alternatives = sourceMeal.alternatives;
    sourceMeal.alternatives = [];
  }

  // --- Duplicar (copiar, sin mover) una comida a otro día/patrón, mismo slot ---
  public async duplicateMealTo(dayIndex: number, mealIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (!meal.alternatives.length) return;

    const otherRows = this.activeRows
      .map((row, i) => ({ row, i }))
      .filter(({ i }) => i !== dayIndex);
    if (!otherRows.length) return;

    await this.ionicUtilService.showActionSheet({
      header: `Copiar "${meal.slot}" a...`,
      buttons: [
        ...otherRows.map(({ row, i }) => ({
          text: this.rowLabel(row),
          handler: () => {
            this.activeRows[i].meals[mealIndex].alternatives = meal.alternatives.map((alt) => ({
              label: alt.label,
              items: alt.items.map((item) => ({ ...item })),
            }));
          },
        })),
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
  }

  private emptyFoodItem(): TemplateFoodItem {
    return {};
  }

  private emptyAlternative(): TemplateMealAlternative {
    return { label: '', items: [this.emptyFoodItem()] };
  }

  // --- Alternativas de la celda en edición (Fase 9) ---
  public addAlternative(): void {
    const meal = this.editingMeal;
    if (!meal || meal.alternatives.length >= this.maxAlternatives) return;
    meal.alternatives.push(this.emptyAlternative());
  }

  // TAREA5 (auditoría UX, Fase E) — la mayoría de alternativas comparten casi
  // todos los alimentos. Duplicar copia la composición entera para editar
  // solo lo que cambia, en vez de repetir el ciclo de búsqueda completo.
  public duplicateAlternative(altIndex: number): void {
    const meal = this.editingMeal;
    if (!meal || meal.alternatives.length >= this.maxAlternatives) return;
    const source = meal.alternatives[altIndex];
    meal.alternatives.splice(altIndex + 1, 0, {
      label: source.label ? `${source.label} (copia)` : '',
      items: source.items.map((item) => ({ ...item })),
    });
  }

  public removeAlternative(altIndex: number): void {
    const meal = this.editingMeal;
    if (!meal || meal.alternatives.length <= 1) return;
    meal.alternatives.splice(altIndex, 1);
  }

  public addFoodItem(altIndex: number): void {
    const alt = this.editingMeal?.alternatives[altIndex];
    if (!alt || alt.items.length >= this.maxFoodItemsPerAlternative) return;
    alt.items.push(this.emptyFoodItem());
  }

  public removeFoodItem(altIndex: number, itemIndex: number): void {
    const alt = this.editingMeal?.alternatives[altIndex];
    if (!alt || alt.items.length <= 1) return;
    alt.items.splice(itemIndex, 1);
  }

  // TAREA5 — mismo buscador real search-foods que client-detail (ver ahí el
  // porqué del trainerContext). Aquí no hay cliente/dieta real de por medio
  // (una plantilla es local hasta pulsar "Guardar"), así que los callbacks
  // solo abren el panel de cantidad/confirmar y escriben en el array local.
  public async openProductSearch(altIndex: number, itemIndex: number): Promise<void> {
    const outerModal = await this.modalController.create({
      component: SearchFoodsPage,
      componentProps: {
        trainerContext: this.buildSearchFoodsTrainerContext(altIndex, itemIndex, () =>
          void outerModal.dismiss()
        ),
      },
      cssClass: 'tf-panel-modal',
    });
    await outerModal.present();
    await outerModal.onDidDismiss();
  }

  private buildSearchFoodsTrainerContext(
    altIndex: number,
    itemIndex: number,
    closeOuter: () => void
  ): SearchFoodsTrainerContext {
    return {
      clientUser: {} as any,
      dietDay: {} as any,
      meal: {} as any,
      confirmSelection: (items) => this.applyTrainerSelection(altIndex, itemIndex, items),
      pickCreateProduct: () =>
        void this.confirmPickedFood(altIndex, itemIndex, { kind: 'create' }, closeOuter),
    };
  }

  // TAREA5 (auditoría UX) — igual que client-detail: el primer alimento
  // marcado rellena el hueco actual, el resto se añade como alimentos
  // nuevos de la misma alternativa, sin repetir la búsqueda.
  private applyTrainerSelection(altIndex: number, itemIndex: number, items: TrainerFoodSelection[]): void {
    const alt = this.editingMeal?.alternatives[altIndex];
    if (!alt || !items.length) return;

    items.forEach((selection, i) => {
      let targetIndex = itemIndex;
      if (i > 0) {
        if (alt.items.length >= this.maxFoodItemsPerAlternative) return;
        alt.items.push(this.emptyFoodItem());
        targetIndex = alt.items.length - 1;
      }
      const item = alt.items[targetIndex];
      if (selection.kind === 'recipe' && selection.recipe) {
        item.recipeId = selection.recipe._id;
        item.recipeName = selection.recipe.name;
        item.productId = undefined;
        item.productName = undefined;
        item.quantity = selection.quantity ?? undefined;
      } else if (selection.kind === 'product' && selection.product) {
        item.productId = selection.product._id;
        item.productName = selection.product.name;
        item.recipeId = undefined;
        item.recipeName = undefined;
        item.quantity = selection.quantity ?? undefined;
      }
    });
  }

  private async confirmPickedFood(
    altIndex: number,
    itemIndex: number,
    _picked: { kind: 'create' },
    closeOuter: () => void
  ): Promise<void> {
    const modal = await this.modalController.create({
      component: ProductSearchModalComponent,
      componentProps: { startInCreateProduct: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || !data) return;

    const item = this.editingMeal?.alternatives[altIndex]?.items[itemIndex];
    if (!item) return;
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

  private insertSnippet(altIndex: number, snippet: MealSnippet): void {
    const alt = this.editingMeal?.alternatives[altIndex];
    if (!alt) return;
    for (const cp of snippet.customProducts || []) {
      if (alt.items.length >= this.maxFoodItemsPerAlternative) break;
      const productId = typeof cp.product === 'string' ? cp.product : (cp as any).product?._id;
      if (!productId) continue;
      alt.items.push({
        productId,
        productName: (cp as any).productName || 'Producto guardado',
        quantity: (cp as any).quantity ?? undefined,
      });
    }
    for (const cr of snippet.customRecipes || []) {
      if (alt.items.length >= this.maxFoodItemsPerAlternative) break;
      const recipeId = typeof (cr as any).recipe === 'string' ? (cr as any).recipe : (cr as any).recipe?._id;
      if (!recipeId) continue;
      alt.items.push({
        recipeId,
        recipeName: (cr as any).recipeName || 'Receta guardada',
        quantity: (cr as any).quantity ?? undefined,
      });
    }
  }

  public async saveAsSnippet(altIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const alt = this.editingMeal?.alternatives[altIndex];
    const slot = this.editingMeal?.slot;
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
        customRecipes.push({ recipe: item.recipeId, recipeName: item.recipeName, quantity: item.quantity || null });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, productName: item.productName, quantity: item.quantity || 100 });
      }
    }
    return { customProducts, customRecipes };
  }

  public clearProduct(altIndex: number, itemIndex: number): void {
    const item = this.editingMeal?.alternatives[altIndex]?.items[itemIndex];
    if (!item) return;
    item.productId = undefined;
    item.productName = undefined;
    item.recipeId = undefined;
    item.recipeName = undefined;
    item.quantity = undefined;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  private mealValid(meal: TemplateMeal): boolean {
    const isMultiple = meal.alternatives.length >= 2;
    return meal.alternatives.every(
      (alt) =>
        alt.items.length > 0 &&
        alt.items.every((item) => !!(item.productId || item.recipeId)) &&
        (!isMultiple || alt.label.trim())
    );
  }

  public get canSave(): boolean {
    if (!this.name.trim()) return false;
    const rowsValid = this.activeRows.every((row) => row.meals.every((meal) => this.mealValid(meal)));
    if (!rowsValid) return false;
    if (this.mode === 'recurring') {
      return this.dayPatterns.every((p) => p.name.trim() && p.appliesTo.length > 0);
    }
    if (this.mode === 'choice') {
      return this.dayPatterns.every((p) => p.name.trim());
    }
    return true;
  }

  private mealsToSave(meals: TemplateMeal[]): DietTemplateMealPayload[] {
    return meals
      .filter((meal) => meal.alternatives.length > 0)
      .map((meal) => ({
        slot: meal.slot,
        alternatives: meal.alternatives
          .filter((alt) => alt.items.length > 0)
          .map((alt) => ({ label: alt.label.trim(), ...this.itemsToCustomEntries(alt.items) })),
      }));
  }

  public save(): void {
    if (!this.canSave || this.isSaving) return;
    this.isSaving = true;
    // Solo se envían las comidas con al menos una alternativa — un slot
    // vacío no aporta nada al aplicar la plantilla. Cada alimento se
    // convierte a formato "clipboard" (customProducts/customRecipes) — el
    // que realmente espera el backend, no el TemplateFoodItem de la UI.
    const daysToSave = this.days.map((day) => ({
      dayLabel: day.dayLabel.trim() || 'Día',
      meals: this.mealsToSave(day.meals),
    }));

    const dayPatternsToSave = this.dayPatterns.map((pattern) => ({
      name: pattern.name.trim() || 'Patrón',
      appliesTo: this.mode === 'recurring' ? pattern.appliesTo : [],
      meals: this.mealsToSave(pattern.meals),
    }));

    this.dietTemplateApi.update(this.templateId, this.name.trim(), daysToSave, this.mode, dayPatternsToSave).subscribe({
      next: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({ message: 'Plantilla guardada', duration: 2000 });
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast('No se pudo guardar la plantilla', 'Error', 3000);
      },
    });
  }

  public goBack(): void {
    this.router.navigate(['/tabs/diet-templates']);
  }
}
