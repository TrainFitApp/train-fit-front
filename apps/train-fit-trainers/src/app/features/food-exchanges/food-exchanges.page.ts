import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  ExchangeCount,
  exchangesFor,
} from 'src/app/core/utils/exchange-math.util';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
// Ruta relativa y no 'src/app/shared/...': ese alias apunta al paquete
// shared-ui, no al shared local de esta app (ver paths en tsconfig.json).
} from '../../shared/components/product-search-modal/product-search-modal.component';
import { FoodExchangesApiService } from './services/food-exchanges-api.service';
import {
  EXCHANGE_BASES,
  EXCHANGE_CATEGORY_SUGGESTIONS,
  EXCHANGE_UNITS,
  ExchangeBasis,
  FoodExchangeGroup,
  FoodExchangeItem,
} from './models/food-exchange.model';

type ViewState = 'loading' | 'error' | 'loaded';

// Fase 5 Coach Pro — grupos de intercambio (§16).
//
// El primer alimento de la lista es la REFERENCIA: el resto se leen contra
// él ("100 g de pollo ≈ 120 g de pavo"). Eso hace innecesario un campo
// "cantidad base" aparte y evita que el coach tenga que repetirla en cada
// fila.
@Component({
  selector: 'app-food-exchanges',
  templateUrl: 'food-exchanges.page.html',
  styleUrls: ['food-exchanges.page.scss'],
})
export class FoodExchangesPage {
  public readonly categorySuggestions = EXCHANGE_CATEGORY_SUGGESTIONS;
  public readonly units = EXCHANGE_UNITS;

  public state: ViewState = 'loading';
  public groups: FoodExchangeGroup[] = [];

  // --- Editor ---
  public showEditor = false;
  public editingId: string | null = null;
  public isSaving = false;
  public name = '';
  public category = '';
  public equivalenceNote = '';
  public items: FoodExchangeItem[] = [];

  // --- Movimiento 5 Coach Pro: base numérica y calculadora de etiquetas ---
  //
  // Esto NO convierte un alimento en otro: la regla de fondo del componente
  // sigue siendo que el sistema no asume equivalencias. Lo que permite es
  // que, cuando el coach YA ha decidido que su ración de hidratos son 15 g,
  // la app le diga que un producto con 30 g por ración son 2 raciones. La
  // aritmética la hace la app; la decisión, él — y por eso es opcional.
  public readonly bases = EXCHANGE_BASES;
  public basis: ExchangeBasis | null = null;
  public basisAmount: number | null = null;

  // Lo que el coach teclea de la etiqueta que tiene delante. No se guarda:
  // es una cuenta de usar y tirar mientras define el grupo.
  public labelAmount: number | null = null;

  constructor(
    private foodExchangesApi: FoodExchangesApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.foodExchangesApi.getMine().subscribe({
      next: (groups) => {
        this.groups = groups;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public openEditor(group?: FoodExchangeGroup): void {
    this.editingId = group?._id || null;
    this.name = group?.name || '';
    this.category = group?.category || '';
    this.equivalenceNote = group?.equivalenceNote || '';
    this.basis = group?.basis || null;
    this.basisAmount = group?.basisAmount ?? null;
    this.labelAmount = null;
    // Un grupo nuevo arranca con dos filas: uno solo no es un intercambio, y
    // empezar con cero obliga a entender el modelo antes de poder escribir.
    this.items = group
      ? group.items.map((item) => ({ ...item }))
      : [this.emptyItem(), this.emptyItem()];
    this.showEditor = true;
  }

  // --- Movimiento 5 Coach Pro: calculadora de etiquetas ---

  public get hasBasis(): boolean {
    return !!this.basis && Number(this.basisAmount) > 0;
  }

  public get basisUnit(): string {
    return this.bases.find((base) => base.key === this.basis)?.unit || 'g';
  }

  public get basisLabel(): string {
    return this.bases.find((base) => base.key === this.basis)?.label || '';
  }

  /**
   * Cuántas raciones son los `labelAmount` que el coach acaba de leer en una
   * etiqueta. Redondeado a media ración: "1,37 raciones de pan" no es una
   * instrucción que nadie pueda seguir.
   *
   * Devuelve null cuando falta algo, en vez de un 0 que se leería como "este
   * producto no cuenta".
   */
  public get calculatedExchanges(): ExchangeCount | null {
    return exchangesFor(
      { basis: this.basis, basisAmount: Number(this.basisAmount) },
      Number(this.labelAmount)
    );
  }

  public setBasis(basis: ExchangeBasis): void {
    // Volver a pulsar la base marcada la quita: el grupo vuelve a ser una
    // lista escrita a mano, que es un estado válido y el que tenían todos
    // los grupos antes de esto.
    this.basis = this.basis === basis ? null : basis;
  }

  public closeEditor(): void {
    this.showEditor = false;
  }

  private emptyItem(): FoodExchangeItem {
    return { name: '', quantity: 100, unit: 'g', note: '', productId: null, product: null };
  }

  // --- Vincular el alimento al catálogo real ---
  //
  // Opcional, y así se queda: un grupo escrito a mano sigue siendo válido y es
  // lo que eran todos hasta ahora. Vincular es lo que permite luego generar
  // alternativas de una comida desde este grupo, porque una pauta necesita un
  // producto con macros, no un nombre suelto.
  public async linkProduct(index: number): Promise<void> {
    const item = this.items[index];
    if (!item) return;

    const modal = await this.modalController.create({
      component: ProductSearchModalComponent,
      // Sin recetas: un item solo guarda productId, una receta no cabría.
      componentProps: { productsOnly: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || data?.kind !== 'product' || !data.product) return;

    item.productId = data.product._id;
    item.product = data.product;
    // El nombre sigue siendo del coach: solo se rellena si estaba en blanco,
    // porque "Pechuga de pollo (sin piel)" que él escribió vale más para su
    // cliente que el nombre del catálogo.
    if (!item.name.trim()) item.name = data.product.name;
    // La cantidad que trae el buscador es la del producto, no la equivalencia
    // que el coach quiere para SU ración — esa la decide él, y por eso no se
    // toca lo que ya hubiera escrito.
    if (!(Number(item.quantity) > 0)) item.quantity = data.quantity || 100;
  }

  public unlinkProduct(index: number): void {
    const item = this.items[index];
    if (!item) return;
    item.productId = null;
    item.product = null;
  }

  public addItem(): void {
    if (this.items.length >= 20) return;
    this.items = [...this.items, this.emptyItem()];
  }

  public removeItem(index: number): void {
    if (this.items.length <= 2) return;
    this.items = this.items.filter((_, i) => i !== index);
  }

  public get validationError(): string | null {
    if (!this.name.trim()) return 'Ponle un nombre al grupo.';
    if (this.items.length < 2) return 'Un intercambio necesita al menos 2 alimentos.';
    for (const item of this.items) {
      if (!item.name.trim()) return 'Todos los alimentos necesitan un nombre.';
      if (!(Number(item.quantity) > 0)) {
        return `"${item.name || 'Sin nombre'}" necesita una cantidad mayor que 0.`;
      }
    }
    return null;
  }

  public save(): void {
    const error = this.validationError;
    if (error) {
      void this.ionicUtilService.showWarningToast(error);
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;

    const payload: Partial<FoodExchangeGroup> = {
      name: this.name.trim(),
      category: this.category.trim(),
      equivalenceNote: this.equivalenceNote.trim(),
      // Los dos van juntos o no van: una base sin cantidad ("iguala
      // hidratos", ¿cuántos?) no permite calcular nada, y una cantidad sin
      // base no significa nada. El backend aplica la misma regla.
      basis: this.hasBasis ? this.basis : null,
      basisAmount: this.hasBasis ? Number(this.basisAmount) : null,
      // `product` fuera: es de solo lectura, lo pone el backend al listar, y
      // reenviarlo sería mandar el producto entero por la red para que lo
      // descarte.
      items: this.items.map(({ product, ...item }) => ({
        ...item,
        name: item.name.trim(),
        quantity: Number(item.quantity),
        note: (item.note || '').trim(),
      })),
    };

    const request$ = this.editingId
      ? this.foodExchangesApi.update(this.editingId, payload)
      : this.foodExchangesApi.create(payload);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditor = false;
        this.load();
      },
      error: (error) => {
        this.isSaving = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo guardar el grupo');
      },
    });
  }

  public async confirmDelete(group: FoodExchangeGroup): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Eliminar grupo',
      message: `"${group.name}" dejará de estar disponible para tus clientes.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.foodExchangesApi.remove(group._id).subscribe({
              next: () => {
                this.groups = this.groups.filter((g) => g._id !== group._id);
              },
              error: (error) =>
                void this.ionicUtilService.showErrorToast(error, 'No se pudo eliminar el grupo'),
            });
          },
        },
      ],
    });
  }

  // "100 g de pollo" — la referencia contra la que se leen los demás.
  public referenceLabel(group: FoodExchangeGroup): string {
    const first = group.items?.[0];
    if (!first) return '';
    return `${first.quantity} ${first.unit} de ${first.name}`;
  }

  public trackByGroupId(_index: number, group: FoodExchangeGroup): string {
    return group._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
