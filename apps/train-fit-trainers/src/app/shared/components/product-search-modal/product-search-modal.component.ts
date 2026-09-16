import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { ProductAPIService } from 'src/app/core/services/product/product-api.service';
import { RecipeApiService } from 'src/app/core/services/recipe/recipe-api.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';

type SearchMode = 'products' | 'recipes';
type ViewState = 'idle' | 'loading' | 'error' | 'loaded';

export interface ProductSearchResult {
  kind: 'product' | 'recipe';
  product?: IProduct;
  recipe?: Recipe;
  quantity: number | null;
}

// TAREA1/TAREA5 — buscador de alimentos reales para pautar comida (biblioteca
// de productos + biblioteca de recetas del entrenador), presentado como panel
// lateral en escritorio (cssClass 'tf-panel-modal' en las llamadas a
// modalController.create). Ya no admite macros tecleadas a mano — un
// profesional pauta un producto o una receta real, nunca un número inventado.
// Reutiliza los mismos servicios que la pantalla search-foods del consumidor
// (ProductAPIService/RecipeApiService/RecipeService) sin heredar su
// acoplamiento a la sesión del consumidor logueado (esa pantalla lee
// UserService.getLocalUser + DietDayService.currentDietDay directamente, sin
// @Input — no es reutilizable tal cual para "cliente del entrenador"; ver
// MVP-trainers/tareas-grandes/TAREA5).
@Component({
  selector: 'app-product-search-modal',
  templateUrl: 'product-search-modal.component.html',
  styleUrls: ['product-search-modal.component.scss'],
})
export class ProductSearchModalComponent implements OnInit, OnDestroy {
  // TAREA5 — cuando el producto/receta ya se eligió en otra pantalla (el
  // buscador real de search-foods, ver SearchFoodsTrainerContext), este
  // panel se abre directo en el paso de cantidad/confirmar en vez de en la
  // búsqueda.
  @Input() preselectedProduct?: IProduct;
  @Input() preselectedRecipe?: Recipe;

  private readonly productApi = inject(ProductAPIService);
  private readonly recipeApi = inject(RecipeApiService);
  private readonly recipeService = inject(RecipeService);
  private readonly modalController = inject(ModalController);

  public mode: SearchMode = 'products';
  public state: ViewState = 'idle';
  public searchTerm = '';
  public products: IProduct[] = [];
  public recipes: Recipe[] = [];

  public selectedProduct: IProduct | null = null;
  public selectedRecipe: Recipe | null = null;
  public quantity: number | null = 100;

  private searchTerm$ = new Subject<string>();

  constructor() {
    this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          this.state = 'loading';
          // catchError DENTRO del switchMap: un error de red no debe matar
          // la suscripción exterior (RxJS propaga errores del observable
          // interno al externo, y eso desuscribe la búsqueda para siempre —
          // sin esto, un único fallo dejaba el modal permanentemente roto).
          // Casteado a un tipo de Observable único: sin esto, el tipo unión
          // Observable<IProduct[]> | Observable<Recipe[]> hace que TypeScript
          // resuelva mal la sobrecarga de .pipe()/catchError() (error crítico
          // de tipos, no solo un aviso — "Expected 0 arguments, but got 1").
          const search$ = (
            this.mode === 'products'
              ? this.productApi.searchProduct(0, term)
              : this.recipeApi.searchRecipes(term, 0, 10)
          ) as Observable<(IProduct | Recipe)[]>;

          return search$.pipe(
            catchError(() => {
              this.state = 'error';
              return of(null);
            })
          );
        })
      )
      .subscribe((results) => {
        if (results === null) return;
        if (this.mode === 'products') {
          this.products = (results as IProduct[]) || [];
        } else {
          this.recipes = (results as Recipe[]) || [];
        }
        this.state = 'loaded';
      });
  }

  public ngOnInit(): void {
    if (this.preselectedProduct) this.selectProduct(this.preselectedProduct);
    if (this.preselectedRecipe) this.selectRecipe(this.preselectedRecipe);
  }

  public ngOnDestroy(): void {
    this.searchTerm$.complete();
  }

  public setMode(mode: SearchMode): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.products = [];
    this.recipes = [];
    this.state = 'idle';
    if (this.searchTerm.trim().length >= 2) {
      this.searchTerm$.next(this.searchTerm.trim());
    }
  }

  public onSearchChange(term: string): void {
    this.searchTerm = term;
    const trimmed = term.trim();
    if (trimmed.length < 2) {
      this.state = 'idle';
      this.products = [];
      this.recipes = [];
      return;
    }
    this.searchTerm$.next(trimmed);
  }

  public selectProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.quantity = 100;
  }

  public selectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.quantity = null;
  }

  public backToResults(): void {
    this.selectedProduct = null;
    this.selectedRecipe = null;
  }

  public recipeMacros(recipe: Recipe) {
    return this.recipeService.calculateRecipeMacros(recipe);
  }

  public recipeIngredientsSummary(recipe: Recipe): string {
    return this.recipeService.getTopIngredients(recipe, 3);
  }

  // Fix7 — con preselectedRecipe (creación de receta nueva desde el trainer,
  // ver RecipeBuilderModalComponent) este modal se abre directo en la vista
  // "cantidad/confirmar" y seguía diciendo "Buscar alimento" aunque la
  // búsqueda ni se mostraba.
  public get headerTitle(): string {
    if (this.selectedProduct || this.selectedRecipe) return 'Confirmar cantidad';
    return 'Buscar alimento';
  }

  public trackByProductId(_index: number, product: IProduct): string {
    return product._id;
  }

  public trackByRecipeId(_index: number, recipe: Recipe): string {
    return recipe._id || _index.toString();
  }

  // --- Crear producto ---
  //
  // Antes reimplementaba un formulario reducido propio (nombre + 4 macros),
  // duplicando lo que ya hace CreateProductPage (la pantalla real y completa:
  // macros+micros+alérgenos+vegano+escáner) — un producto creado desde aquí
  // se guardaba con menos datos que uno creado desde cualquier otro sitio de la app.
  // Mismo patrón que pickCreateProduct en day-meal-editor-modal: se abre la
  // pantalla real como modal (modalMode:true) y, al guardar, se cierra con
  // {kind:'product', product, quantity:100} — el propio CreateProductPage ya
  // muestra su toast de éxito, no hay que duplicarlo aquí.
  public async openCreateProduct(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateProductPage,
      componentProps: { modalMode: true },
      // Mismo marco de panel lateral que el resto de modales de escritorio
      // (ver .tf-panel-modal en theme/tokens.scss): sin esto se abría a
      // pantalla completa, tapando el panel desde el que se pulsó.
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<{ kind: 'product'; product: IProduct }>();
    if (role !== 'confirm' || data?.kind !== 'product' || !data.product) return;
    this.selectProduct(data.product);
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public confirm(): void {
    if (this.selectedProduct) {
      if (!this.quantity || this.quantity <= 0) return;
      const result: ProductSearchResult = {
        kind: 'product',
        product: this.selectedProduct,
        quantity: this.quantity,
      };
      void this.modalController.dismiss(result, 'confirm');
      return;
    }

    if (this.selectedRecipe) {
      const result: ProductSearchResult = {
        kind: 'recipe',
        recipe: this.selectedRecipe,
        quantity: this.quantity && this.quantity > 0 ? this.quantity : null,
      };
      void this.modalController.dismiss(result, 'confirm');
    }
  }
}
