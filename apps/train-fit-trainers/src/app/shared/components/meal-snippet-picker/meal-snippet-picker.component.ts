import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { MealSnippet } from '../../models/meal-snippet.model';
import { MealSnippetApiService } from '../../services/meal-snippet-api.service';

const EMPTY_MACROS = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

type ViewState = 'loading' | 'error' | 'loaded';

// TAREA5 (auditoría UX, Fase C) — picker puro: lista, deja elegir uno
// (dismiss con role 'confirm' y el snippet completo) y permite borrar. La
// acción de CREAR uno nuevo vive en quien compone la comida (el propio
// tablero/composer), no aquí — este modal solo consume la biblioteca.
@Component({
  selector: 'app-meal-snippet-picker',
  templateUrl: 'meal-snippet-picker.component.html',
  styleUrls: ['meal-snippet-picker.component.scss'],
})
export class MealSnippetPickerComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  public state: ViewState = 'loading';
  public snippets: MealSnippet[] = [];
  // TASK-047 (MASTER_BACKLOG.md) — filtro en memoria: mismo criterio que
  // RoutinesPage/TemplatePickerModalComponent, no hace falta paginación de
  // backend para una biblioteca personal de este tamaño esperado.
  public search = '';
  public filteredSnippets: MealSnippet[] = [];

  constructor(
    private mealSnippetApi: MealSnippetApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController,
    private customProductService: CustomProductService,
    private recipeService: RecipeService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.mealSnippetApi.list().subscribe({
      next: (snippets) => {
        this.snippets = snippets || [];
        this.applySearch();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public onSearchChange(): void {
    this.applySearch();
  }

  private applySearch(): void {
    const term = this.search.trim().toLowerCase();
    this.filteredSnippets = term
      ? this.snippets.filter((s) => s.name.toLowerCase().includes(term))
      : this.snippets;
  }

  public itemCount(snippet: MealSnippet): number {
    return (snippet.customProducts?.length || 0) + (snippet.customRecipes?.length || 0);
  }

  // Fix2 — accordion: customProducts/customRecipes vienen autopopulados
  // por el backend (mongoose-autopopulate, ver meal-schema.js), así que el
  // producto/receta real ya está disponible sin llamadas extra.
  public productName(entry: unknown): string {
    const product = (entry as any)?.product;
    return (product && typeof product === 'object' && product.name) || this.translate.instant('SHARED_COMPONENTS.PRODUCTO_GUARDADO');
  }

  public recipeName(entry: unknown): string {
    const recipe = (entry as any)?.recipe;
    return (recipe && typeof recipe === 'object' && recipe.name) || this.translate.instant('SHARED_COMPONENTS.RECETA_GUARDADA');
  }

  public entryQuantity(entry: unknown): string {
    const quantity = (entry as any)?.quantity;
    return quantity ? `${quantity}g` : '';
  }

  // Mismas macros que picked-food-card en day-meal-editor-modal: reutiliza
  // el cálculo canónico (CustomProductService.getMacros/RecipeService
  // .calculateCustomRecipeTotals), no lo reinventa.
  public productMacros(entry: unknown) {
    const product = (entry as any)?.product;
    const quantity = (entry as any)?.quantity ?? 100;
    if (!product || typeof product !== 'object') return EMPTY_MACROS;
    return this.customProductService.getMacros({ product, quantity } as CustomProduct);
  }

  public recipeMacros(entry: unknown) {
    const recipe = (entry as any)?.recipe;
    const quantity = (entry as any)?.quantity ?? undefined;
    if (!recipe || typeof recipe !== 'object') return EMPTY_MACROS;
    return this.recipeService.calculateCustomRecipeTotals(recipe, {
      quantity,
      quantityCooked: null,
    } as CustomRecipe).portionMacros;
  }

  public pick(snippet: MealSnippet): void {
    void this.modalController.dismiss(snippet, 'confirm');
  }

  public async confirmDelete(event: Event, snippet: MealSnippet): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('SHARED_COMPONENTS.BORRAR', { name: snippet.name }),
      message: this.translate.instant('SHARED_COMPONENTS.NO_AFECTA_LAS_COMIDAS_DONDE'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.ERASE'),
          role: 'destructive',
          handler: () => {
            this.mealSnippetApi.delete(snippet._id).subscribe(() => {
              this.snippets = this.snippets.filter((s) => s._id !== snippet._id);
              this.applySearch();
            });
          },
        },
      ],
    });
  }

  // TASK-047 (MASTER_BACKLOG.md) — solo renombrar (ver nota en
  // meal-snippet-api.service.ts sobre por qué no re-componer contenido aquí).
  public async renameSnippet(event: Event, snippet: MealSnippet): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('SHARED_COMPONENTS.RENOMBRAR_SNIPPET'),
      inputs: [{ name: 'name', type: 'text', value: snippet.name, attributes: { maxlength: 80 } }],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            this.mealSnippetApi.rename(snippet._id, name).subscribe({
              next: (updated) => {
                snippet.name = updated.name;
                this.applySearch();
              },
              error: () => {
                this.ionicUtilService.showToast({ message: this.translate.instant('SHARED_COMPONENTS.NO_SE_PUDO_RENOMBRAR_EL'), duration: 2500 });
              },
            });
            return true;
          },
        },
      ],
    });
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public trackBySnippetId(_index: number, snippet: MealSnippet): string {
    return snippet._id;
  }
}
