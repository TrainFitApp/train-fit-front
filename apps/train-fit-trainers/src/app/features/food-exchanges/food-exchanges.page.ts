import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { IProduct } from 'src/app/core/models/product';
import {
  ReferenceProfile,
  ScaledReference,
  applyReference,
  referenceCandidates,
} from 'src/app/core/utils/exchange-plan.util';
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
  EXCHANGE_ROLES,
  EXCHANGE_UNITS,
  ExchangeBasis,
  ExchangeRole,
  ExchangeServing,
  FoodExchangeGroup,
  FoodExchangeItem,
} from './models/food-exchange.model';

type ViewState = 'loading' | 'error' | 'loaded';

// Las macros por 100 g que trae un producto del catálogo, por el macro que
// iguala el grupo. Sirve para sugerir la cantidad que hace UNA ración.
const PRODUCT_FIELD: Record<ExchangeBasis, keyof IProduct> = {
  kcal: 'energyKcal100g',
  protein: 'protein100g',
  carbs: 'carbohydrates100g',
  fat: 'fat100g',
};

// Tabla de intercambios (§16).
//
// Cada alimento del grupo, en la cantidad escrita, vale UNA ración. El primero
// no es especial: durante un tiempo la interfaz lo llamaba "la referencia" y
// decía que los demás se leían contra él, pero la aritmética nunca lo trató
// así — `amountForExchanges` multiplica cualquier alimento por las raciones
// pautadas, y eso solo es correcto si todos valen lo mismo.
@Component({
  selector: 'app-food-exchanges',
  templateUrl: 'food-exchanges.page.html',
  styleUrls: ['food-exchanges.page.scss'],
})
export class FoodExchangesPage {
  public readonly categorySuggestions = EXCHANGE_CATEGORY_SUGGESTIONS;
  public readonly units = EXCHANGE_UNITS;
  public readonly bases = EXCHANGE_BASES;
  public readonly roles = EXCHANGE_ROLES;

  public state: ViewState = 'loading';
  public groups: FoodExchangeGroup[] = [];
  // Los perfiles de la tabla estándar. Se piden una vez y se usan para
  // ofrecerle a los grupos heredados —- los que declaran una sola cifra—- las
  // otras tres macros ya escaladas a su ración.
  public references: ReferenceProfile[] = [];
  public isImportingPack = false;
  /** Filtro de un solo golpe para lo que hay que rematar. */
  public onlyIncomplete = false;

  // --- Editor ---
  public showEditor = false;
  public editingId: string | null = null;
  public isSaving = false;
  public name = '';
  public category = '';
  public equivalenceNote = '';
  public items: FoodExchangeItem[] = [];

  // El perfil de UNA ración. Cuatro macros y no una cifra: con una sola, el
  // reparto del día no se puede comparar contra las kcal ni contra los otros
  // dos macros del objetivo, y el cuadre es imposible por el modelo.
  public anchor: ExchangeBasis | null = null;
  public serving: ExchangeServing = { kcal: null, protein: null, carbs: null, fat: null };
  public role: ExchangeRole | null = null;
  public freeQuantity = false;
  public tolerancePct = 10;

  constructor(
    private foodExchangesApi: FoodExchangesApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ionViewWillEnter(): void {
    this.load();
    // Sin bloquear la pantalla: si falla, el editor simplemente no ofrece
    // referencias y él escribe las cuatro cifras, que es lo que hacía antes.
    if (!this.references.length) {
      this.foodExchangesApi.getReferenceProfiles().subscribe({
        next: (references) => (this.references = references || []),
        error: () => (this.references = []),
      });
    }
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

  public get visibleGroups(): FoodExchangeGroup[] {
    if (!this.onlyIncomplete) return this.groups;
    return this.groups.filter(
      (group) => group.status === 'incomplete' || group.status === 'no-anchor' || !!group.offCount
    );
  }

  public get incompleteCount(): number {
    return this.groups.filter(
      (group) => group.status === 'incomplete' || group.status === 'no-anchor' || !!group.offCount
    ).length;
  }

  /**
   * Copia la tabla estándar a su biblioteca.
   *
   * Montar esos seis grupos a mano es el trabajo del primer día y es idéntico
   * para todo el mundo. Se copian como grupos SUYOS: editables y borrables,
   * no un catálogo compartido que se actualice por detrás.
   */
  public importStarterPack(): void {
    if (this.isImportingPack) return;
    this.isImportingPack = true;
    this.foodExchangesApi.importStarterPack().subscribe({
      next: ({ created, skipped }) => {
        this.isImportingPack = false;
        void this.ionicUtilService.showSuccessToast(
          created
            ? `${created} grupo(s) añadidos. Ajusta las raciones a tu método.`
            : `Ya tenías los ${skipped} grupos de la tabla estándar.`
        );
        this.load();
      },
      error: (error) => {
        this.isImportingPack = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo importar la tabla estándar');
      },
    });
  }

  public openEditor(group?: FoodExchangeGroup): void {
    this.editingId = group?._id || null;
    this.name = group?.name || '';
    this.category = group?.category || '';
    this.equivalenceNote = group?.equivalenceNote || '';
    this.anchor = group?.anchor ?? group?.basis ?? null;
    this.serving = {
      kcal: group?.serving?.kcal ?? null,
      protein: group?.serving?.protein ?? null,
      carbs: group?.serving?.carbs ?? null,
      fat: group?.serving?.fat ?? null,
    };
    this.role = group?.role || null;
    this.freeQuantity = !!group?.freeQuantity;
    this.tolerancePct = group?.tolerancePct ?? 10;
    // Un grupo nuevo arranca con dos filas: uno solo no es un intercambio, y
    // empezar con cero obliga a entender el modelo antes de poder escribir.
    this.items = group
      ? group.items.map((item) => ({ ...item }))
      : [this.emptyItem(), this.emptyItem()];
    this.showEditor = true;
  }

  public closeEditor(): void {
    this.showEditor = false;
  }

  // --- El perfil de la ración ---

  public setAnchor(basis: ExchangeBasis): void {
    // Volver a pulsar el criterio marcado lo quita: un grupo sin criterio
    // declarado es un estado válido, solo que sin verificación por alimento.
    this.anchor = this.anchor === basis ? null : basis;
  }

  public setRole(role: ExchangeRole): void {
    this.role = this.role === role ? null : role;
  }

  public basisLabel(basis: ExchangeBasis | null): string {
    return this.bases.find((base) => base.key === basis)?.label || '';
  }

  public basisUnit(basis: ExchangeBasis | null): string {
    return this.bases.find((base) => base.key === basis)?.unit || 'g';
  }

  /** Un perfil solo cuadra el día si están los cuatro macros. */
  public get isServingComplete(): boolean {
    return (['kcal', 'protein', 'carbs', 'fat'] as const).every(
      (macro) => this.serving[macro] !== null && Number.isFinite(Number(this.serving[macro]))
    );
  }

  /**
   * Los perfiles de referencia que encajan con este grupo, ya escalados a su
   * ración.
   *
   * Es lo que evita que migrar cobre un peaje: un grupo heredado declara "20 g
   * de proteína" y le faltan las otras tres macros, así que no cuadra el día.
   * En vez de teclearlas grupo a grupo, se le ofrece el perfil estándar
   * estirado a SU ración, y lo acepta de un toque.
   */
  public get referenceOptions(): ScaledReference[] {
    if (this.freeQuantity || this.isServingComplete) return [];
    return referenceCandidates(
      this.references,
      this.anchor,
      this.anchor ? this.serving[this.anchor] : null,
      this.category
    );
  }

  /** Solo rellena huecos: lo que él escribió no se pisa nunca. */
  public useReference(reference: ScaledReference): void {
    const filled = applyReference(this.serving, reference);
    // `ServingProfile` trae los macros opcionales y `ExchangeServing` los
    // quiere presentes (con null si no hay valor): se normaliza aquí en vez
    // de forzar el tipo, que taparía un hueco real.
    this.serving = {
      kcal: filled.kcal ?? null,
      protein: filled.protein ?? null,
      carbs: filled.carbs ?? null,
      fat: filled.fat ?? null,
    };
  }

  public referenceSummary(reference: ScaledReference): string {
    const scaled = reference.scaled;
    return [
      scaled.kcal !== null && scaled.kcal !== undefined ? `${scaled.kcal} kcal` : null,
      scaled.protein !== null && scaled.protein !== undefined ? `${scaled.protein} g P` : null,
      scaled.carbs !== null && scaled.carbs !== undefined ? `${scaled.carbs} g HC` : null,
      scaled.fat !== null && scaled.fat !== undefined ? `${scaled.fat} g G` : null,
    ]
      .filter(Boolean)
      .join(' · ');
  }

  /**
   * Rellena los macros en blanco con lo que dicen los productos vinculados.
   *
   * Solo los que estén en blanco: lo que él escribió no se pisa nunca. Es el
   * atajo para no teclear cuatro cifras cuando el catálogo ya las sabe.
   */
  public fillServingFromProducts(): void {
    const computed = this.computedServing();
    if (!computed) {
      void this.ionicUtilService.showWarningToast(
        'Ningún alimento vinculado con macros: vincula productos o escribe el perfil a mano.'
      );
      return;
    }
    for (const macro of ['kcal', 'protein', 'carbs', 'fat'] as const) {
      if (this.serving[macro] === null && computed[macro] !== null) {
        this.serving[macro] = computed[macro];
      }
    }
  }

  /**
   * La mediana de lo que aportan los alimentos vinculados.
   *
   * Mediana y no media: un alimento raro (el tofu entre pollo y merluza)
   * desplazaría el perfil entero, y lo que interesa es dónde está el grupo.
   */
  private computedServing(): ExchangeServing | null {
    const rows = this.items
      .map((item) => this.macrosOf(item))
      .filter((macros): macros is ExchangeServing => !!macros);
    if (!rows.length) return null;

    const median = (values: number[]): number | null => {
      if (!values.length) return null;
      const sorted = [...values].sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
    };

    const result = {} as ExchangeServing;
    for (const macro of ['kcal', 'protein', 'carbs', 'fat'] as const) {
      const values = rows
        .map((row) => row[macro])
        .filter((value): value is number => value !== null);
      const value = median(values);
      result[macro] = value === null ? null : macro === 'kcal' ? Math.round(value) : Math.round(value * 10) / 10;
    }
    return result;
  }

  /** Las macros reales de un alimento en la cantidad escrita. */
  private macrosOf(item: FoodExchangeItem): ExchangeServing | null {
    const product = item.product;
    if (!product || !(Number(item.quantity) > 0)) return null;
    // Solo g y ml escalan por 100. "2 cucharadas" no se puede contrastar
    // contra un producto que da sus macros por 100 g sin inventar una densidad.
    if (!['g', 'ml'].includes(item.unit || 'g')) return null;

    const factor = Number(item.quantity) / 100;
    const read = (macro: ExchangeBasis): number | null => {
      const per100 = Number(product[PRODUCT_FIELD[macro]]);
      if (!Number.isFinite(per100)) return null;
      return macro === 'kcal'
        ? Math.round(per100 * factor)
        : Math.round(per100 * factor * 10) / 10;
    };
    return { kcal: read('kcal'), protein: read('protein'), carbs: read('carbs'), fat: read('fat') };
  }

  // --- Verificación por alimento ---
  //
  // Se recalcula aquí mientras él edita, contra el perfil que tiene delante.
  // Lo que llega del backend en `item.deviation` es el estado GUARDADO, y
  // sirve para la lista de grupos; dentro del editor haría falsear el aviso
  // en cuanto tocara una cantidad.

  public deviationOf(item: FoodExchangeItem): { pct: number; actual: number } | null {
    if (!this.anchor) return null;
    const expected = Number(this.serving[this.anchor]);
    if (!(expected > 0)) return null;
    const actual = this.macrosOf(item)?.[this.anchor];
    if (actual === null || actual === undefined) return null;
    return { actual, pct: Math.round(((actual - expected) / expected) * 1000) / 10 };
  }

  public isOffTolerance(item: FoodExchangeItem): boolean {
    const deviation = this.deviationOf(item);
    return !!deviation && Math.abs(deviation.pct) > this.tolerancePct;
  }

  /**
   * La cantidad de ESTE alimento que hace exactamente una ración.
   *
   * Redondeada a 5 g: "86,96 g de pollo" no es una instrucción que nadie pese.
   * Es la división que él hace a mano una vez por alimento — la decisión de
   * qué se iguala y con cuánto la sigue tomando él.
   */
  public suggestedQuantity(item: FoodExchangeItem): number | null {
    if (!this.anchor || !item.product) return null;
    if (!['g', 'ml'].includes(item.unit || 'g')) return null;
    const expected = Number(this.serving[this.anchor]);
    const per100 = Number(item.product[PRODUCT_FIELD[this.anchor]]);
    if (!(expected > 0) || !(per100 > 0)) return null;
    return Math.round(((expected / per100) * 100) / 5) * 5;
  }

  public applySuggestedQuantity(index: number): void {
    const item = this.items[index];
    const suggested = item && this.suggestedQuantity(item);
    if (suggested) item.quantity = suggested;
  }

  private emptyItem(): FoodExchangeItem {
    return { name: '', quantity: 100, unit: 'g', note: '', productId: null, product: null };
  }

  // --- Vincular el alimento al catálogo real ---
  //
  // Opcional, y así se queda: un grupo escrito a mano sigue siendo válido, y
  // el perfil se puede declarar sin vincular nada. Vincular es lo que añade la
  // verificación por alimento y el poder generar alternativas de una comida
  // desde este grupo.
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

    // La cantidad que hace UNA ración, ya calculada. Si aún no hay perfil, se
    // cae a la del buscador como antes: la decisión de cuánto es una ración
    // es suya y puede no haberla tomado todavía.
    const suggested = this.suggestedQuantity(item);
    if (suggested) item.quantity = suggested;
    else if (!(Number(item.quantity) > 0)) item.quantity = data.quantity || 100;
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

  /**
   * Lo que le falta al grupo para servir en el cuadre del día.
   *
   * Aviso, no error: un grupo sin perfil se guarda igual y sigue siendo una
   * lista de equivalencias útil para el cliente. Solo no suma.
   */
  public get profileWarning(): string | null {
    if (this.freeQuantity) return null;
    if (this.isServingComplete) return null;
    return 'Sin las cuatro macros de una ración, este grupo no entra en el cuadre del día.';
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
      anchor: this.anchor,
      // Los que deje en blanco los rellena el backend desde los productos
      // vinculados; los que escriba, manda él.
      serving: this.serving,
      role: this.role,
      freeQuantity: this.freeQuantity,
      tolerancePct: Number(this.tolerancePct) || 10,
      // `product`, `macros`, `deviation` y `check` fuera: son de solo lectura,
      // los pone el backend al listar, y reenviarlos sería mandar el producto
      // entero por la red para que lo descarte.
      items: this.items.map(({ product, macros, deviation, check, ...item }) => ({
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

  // --- Lo que se pinta en la lista ---

  /** "1 ración = 80 kcal · 3 g P · 15 g HC · 1 g G" */
  public servingLabel(group: FoodExchangeGroup): string {
    if (group.freeQuantity) return 'Cantidad libre, no se pesa';
    const serving = group.serving;
    const parts: string[] = [];
    if (serving?.kcal !== null && serving?.kcal !== undefined) parts.push(`${serving.kcal} kcal`);
    if (serving?.protein !== null && serving?.protein !== undefined) parts.push(`${serving.protein} g P`);
    if (serving?.carbs !== null && serving?.carbs !== undefined) parts.push(`${serving.carbs} g HC`);
    if (serving?.fat !== null && serving?.fat !== undefined) parts.push(`${serving.fat} g G`);
    return parts.length ? `1 ración = ${parts.join(' · ')}` : 'Sin perfil de ración';
  }

  public statusLabel(group: FoodExchangeGroup): string {
    switch (group.status) {
      case 'free':
        return 'Libre';
      case 'incomplete':
        return 'Sin perfil completo';
      case 'no-anchor':
        return 'Sin criterio';
      default:
        return 'Listo';
    }
  }

  /** La dispersión real entre alimentos: la calidad del grupo, en una línea. */
  public spreadLabel(group: FoodExchangeGroup): string | null {
    const range = group.kcalRange;
    if (!range || range.min <= 0 || range.max === range.min) return null;
    const pct = Math.round(((range.max - range.min) / range.min) * 100);
    return `${range.min}–${range.max} kcal entre alimentos (${pct}% de diferencia)`;
  }

  public trackByGroupId(_index: number, group: FoodExchangeGroup): string {
    return group._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
