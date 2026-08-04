import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IProduct } from 'src/app/core/models/product';
import { ProductAPIService } from 'src/app/core/services/product/product-api.service';

type ViewState = 'idle' | 'loading' | 'error' | 'loaded';

export interface ProductSearchResult {
  product: IProduct;
  quantity: number;
}

// TAREA1 — modal de búsqueda de alimentos reales (biblioteca de productos) para
// que el profesional paute con datos reales en vez de macros tecleadas a mano.
// Reutiliza ProductAPIService.searchProduct (ya stateless e inyectable aquí,
// sin depender del DietDayService/MealService del cliente logueado).
@Component({
  selector: 'app-product-search-modal',
  templateUrl: 'product-search-modal.component.html',
  styleUrls: ['product-search-modal.component.scss'],
})
export class ProductSearchModalComponent implements OnDestroy {
  public state: ViewState = 'idle';
  public searchTerm = '';
  public results: IProduct[] = [];
  public selectedProduct: IProduct | null = null;
  public quantity = 100;

  private searchTerm$ = new Subject<string>();

  constructor(private productApi: ProductAPIService, private modalController: ModalController) {
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
          return this.productApi.searchProduct(0, term).pipe(
            catchError(() => {
              this.results = [];
              this.state = 'error';
              return of(null);
            })
          );
        })
      )
      .subscribe((products) => {
        if (products === null) return;
        this.results = products || [];
        this.state = 'loaded';
      });
  }

  public ngOnDestroy(): void {
    this.searchTerm$.complete();
  }

  public onSearchChange(term: string): void {
    this.searchTerm = term;
    const trimmed = term.trim();
    if (trimmed.length < 2) {
      this.state = 'idle';
      this.results = [];
      return;
    }
    this.searchTerm$.next(trimmed);
  }

  public selectProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.quantity = 100;
  }

  public backToResults(): void {
    this.selectedProduct = null;
  }

  public trackByProductId(_index: number, product: IProduct): string {
    return product._id;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public confirm(): void {
    if (!this.selectedProduct || !this.quantity || this.quantity <= 0) return;
    const result: ProductSearchResult = { product: this.selectedProduct, quantity: this.quantity };
    void this.modalController.dismiss(result, 'confirm');
  }
}
