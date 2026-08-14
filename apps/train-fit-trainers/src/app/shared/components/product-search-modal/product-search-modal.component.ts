import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { ProductAPIService } from 'src/app/core/services/product/product-api.service';
import { RecipeApiService } from 'src/app/core/services/recipe/recipe-api.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

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
  @Input() startInCreateProduct = false;

  private readonly productApi = inject(ProductAPIService);
  private readonly recipeApi = inject(RecipeApiService);
  private readonly recipeService = inject(RecipeService);
  private readonly userService = inject(UserService);
  private readonly ionicUtilService = inject(IonicUtilService);
  private readonly modalController = inject(ModalController);

  public mode: SearchMode = 'products';
  public state: ViewState = 'idle';
  public searchTerm = '';
  public products: IProduct[] = [];
  public recipes: Recipe[] = [];

  public selectedProduct: IProduct | null = null;
  public selectedRecipe: Recipe | null = null;
  public quantity: number | null = 100;

  public showCreateProduct = false;
  public isSavingProduct = false;
  public newProduct = this.emptyNewProduct();

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
    if (this.startInCreateProduct) this.openCreateProduct();
  }

  public ngOnDestroy(): void {
    this.searchTerm$.complete();
  }

  public setMode(mode: SearchMode): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.showCreateProduct = false;
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

  public trackByProductId(_index: number, product: IProduct): string {
    return product._id;
  }

  public trackByRecipeId(_index: number, recipe: Recipe): string {
    return recipe._id || _index.toString();
  }

  // --- Crear producto ---
  private emptyNewProduct() {
    return {
      name: '',
      energyKcal100g: null as number | null,
      protein100g: null as number | null,
      carbohydrates100g: null as number | null,
      fat100g: null as number | null,
    };
  }

  public openCreateProduct(): void {
    this.showCreateProduct = true;
    this.newProduct = this.emptyNewProduct();
  }

  public closeCreateProduct(): void {
    this.showCreateProduct = false;
  }

  public get canSaveNewProduct(): boolean {
    return (
      !!this.newProduct.name.trim() &&
      this.newProduct.energyKcal100g !== null &&
      this.newProduct.energyKcal100g >= 0
    );
  }

  public saveNewProduct(): void {
    if (!this.canSaveNewProduct || this.isSavingProduct) return;

    this.isSavingProduct = true;
    const userId = this.userService.localUser()?._id;
    this.productApi
      .saveProduct({
        name: this.newProduct.name.trim(),
        energyKcal100g: this.newProduct.energyKcal100g || 0,
        protein100g: this.newProduct.protein100g || 0,
        carbohydrates100g: this.newProduct.carbohydrates100g || 0,
        fat100g: this.newProduct.fat100g || 0,
        productQuantity: 100,
        userId,
      } as IProduct)
      .subscribe({
        next: (product) => {
          this.isSavingProduct = false;
          this.showCreateProduct = false;
          this.ionicUtilService.showToast({ message: `"${product.name}" creado`, duration: 2000 });
          this.selectProduct(product);
        },
        error: (err) => {
          this.isSavingProduct = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo crear el producto',
            'Error',
            3000
          );
        },
      });
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
