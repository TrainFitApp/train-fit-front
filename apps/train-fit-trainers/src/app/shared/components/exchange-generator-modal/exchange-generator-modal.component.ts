import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FoodExchangeGroup,
  FoodExchangeItem,
} from 'src/app/features/food-exchanges/models/food-exchange.model';
import { FoodExchangesApiService } from 'src/app/features/food-exchanges/services/food-exchanges-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

export interface ExchangeGeneratorResult {
  group: FoodExchangeGroup;
  items: FoodExchangeItem[];
}

// Un alimento del grupo con el veredicto de si sirve para generar una
// alternativa, y por qué no cuando no sirve. Se calcula una vez al elegir el
// grupo: la plantilla no debe llamar a funciones para decidir si pintar algo
// deshabilitado.
interface CandidateItem {
  item: FoodExchangeItem;
  selected: boolean;
  // null = se puede usar. Con texto = se pinta deshabilitado con ese motivo,
  // en vez de desaparecer: el coach escribió ese alimento y necesita saber por
  // qué no está, o volverá a la biblioteca a buscar un error que no existe.
  blockedReason: string | null;
}

/**
 * Genera las alternativas de una comida a partir de un grupo de intercambio.
 *
 * El porqué: montar "Comida A / B / C" que solo se diferencian en la fuente de
 * proteína es duplicar la alternativa y rehacer la búsqueda de alimento una vez
 * por opción — el trabajo que `duplicateAlternative` intenta aliviar. Y esa
 * sustitución ("pollo 100 g ≈ pavo 120 g ≈ merluza 130 g") el coach YA la
 * escribió en su grupo de intercambio. Esto solo la aplica.
 *
 * Lo que NO hace, igual que el resto del componente de intercambios: decidir
 * equivalencias. Las cantidades que salen son EXACTAMENTE las que el coach
 * escribió en el grupo. Si puso mal una, sale mal — y eso es correcto, porque
 * la equivalencia es suya.
 */
@Component({
  selector: 'app-exchange-generator-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './exchange-generator-modal.component.html',
  styleUrls: ['./exchange-generator-modal.component.scss'],
})
export class ExchangeGeneratorModalComponent implements OnInit {
  /** Alimento de la alternativa que se va a sustituir. Solo para el texto. */
  @Input() pivotName = '';
  /**
   * Producto del alimento a sustituir. Sirve para dos cosas: subir los grupos
   * que lo contienen al principio de la lista, y no ofrecerlo como alternativa
   * de sí mismo.
   */
  @Input() pivotProductId: string | null = null;
  /** Alternativas que aún caben en la comida (maxAlternatives - las que hay). */
  @Input() slotsAvailable = 0;

  private readonly foodExchangesApi = inject(FoodExchangesApiService);
  private readonly modalController = inject(ModalController);

  public state: ViewState = 'loading';
  public groups: FoodExchangeGroup[] = [];
  public selectedGroup: FoodExchangeGroup | null = null;
  public candidates: CandidateItem[] = [];

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.foodExchangesApi.getMine().subscribe({
      next: (groups) => {
        // Los grupos que contienen el alimento que se va a sustituir van
        // primero: es casi siempre el que el coach busca, y con 15 grupos en
        // la biblioteca encontrarlo a ojo es el trabajo que esto evita.
        this.groups = [...groups].sort(
          (a, b) => Number(this.containsPivot(b)) - Number(this.containsPivot(a))
        );
        this.state = 'loaded';
      },
      error: () => (this.state = 'error'),
    });
  }

  public containsPivot(group: FoodExchangeGroup): boolean {
    if (!this.pivotProductId) return false;
    return (group.items || []).some((item) => item.productId === this.pivotProductId);
  }

  /** Cuántos alimentos de este grupo se podrían usar. Es la única cifra que dice si entrar. */
  public usableCount(group: FoodExchangeGroup): number {
    return (group.items || []).filter((item) => !this.blockedReason(item)).length;
  }

  /**
   * Qué lleva una ración del grupo.
   *
   * Sustituye a la antigua "referencia" (el primer alimento de la lista): no
   * era una referencia, todos los alimentos valen una ración. Lo que dice si
   * este grupo sirve para la comida que está montando es su perfil.
   */
  public servingLabel(group: FoodExchangeGroup): string {
    if (group.freeQuantity) return 'Cantidad libre';
    const serving = group.serving;
    const parts: string[] = [];
    if (serving?.kcal !== null && serving?.kcal !== undefined) parts.push(`${serving.kcal} kcal`);
    if (serving?.protein !== null && serving?.protein !== undefined) parts.push(`${serving.protein} g P`);
    if (serving?.carbs !== null && serving?.carbs !== undefined) parts.push(`${serving.carbs} g HC`);
    if (serving?.fat !== null && serving?.fat !== undefined) parts.push(`${serving.fat} g G`);
    return parts.length ? `1 ración = ${parts.join(' · ')}` : 'Sin perfil de ración';
  }

  public selectGroup(group: FoodExchangeGroup): void {
    this.selectedGroup = group;
    this.candidates = (group.items || []).map((item) => {
      const blockedReason = this.blockedReason(item);
      return { item, selected: false, blockedReason };
    });

    // Premarcados hasta llenar los huecos libres. Con un grupo de 6 alimentos y
    // 3 huecos, marcar los 6 y descubrir el tope al pulsar "Generar" sería
    // hacerle elegir dos veces.
    let remaining = this.slotsAvailable;
    for (const candidate of this.candidates) {
      if (candidate.blockedReason || remaining <= 0) continue;
      candidate.selected = true;
      remaining -= 1;
    }
  }

  public backToGroups(): void {
    this.selectedGroup = null;
    this.candidates = [];
  }

  public toggle(candidate: CandidateItem): void {
    if (candidate.blockedReason) return;
    if (!candidate.selected && this.selectedCount >= this.slotsAvailable) return;
    candidate.selected = !candidate.selected;
  }

  public get selectedCount(): number {
    return this.candidates.filter((candidate) => candidate.selected).length;
  }

  public get isFull(): boolean {
    return this.selectedCount >= this.slotsAvailable;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public confirm(): void {
    if (!this.selectedGroup || !this.selectedCount) return;
    const result: ExchangeGeneratorResult = {
      group: this.selectedGroup,
      items: this.candidates.filter((c) => c.selected).map((c) => c.item),
    };
    void this.modalController.dismiss(result, 'confirm');
  }

  public trackByGroupId(_index: number, group: FoodExchangeGroup): string {
    return group._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  /**
   * Por qué este alimento no puede convertirse en una alternativa.
   *
   * Los dos motivos son del mismo tipo: una pauta necesita un producto real con
   * macros y una cantidad en gramos, y un item que no los tenga produciría una
   * comida que no se puede guardar ni sumar. Mejor decirlo que generar algo
   * roto.
   */
  private blockedReason(item: FoodExchangeItem): string | null {
    if (item.productId && item.productId === this.pivotProductId) {
      return 'es el alimento que vas a sustituir';
    }
    if (!item.productId || !item.product) {
      return 'sin producto vinculado';
    }
    if ((item.unit || 'g') !== 'g') {
      return `pautado en ${item.unit}, y una comida se pauta en gramos`;
    }
    return null;
  }
}
