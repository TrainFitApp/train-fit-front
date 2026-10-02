import { Component, Input, OnChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import {
  ShoppingListItem,
  ShoppingMeal,
  ShoppingMenu,
  ShoppingSegment,
  ShoppingSelection,
  aggregateShopping,
  alternativeKey,
  defaultShoppingSelection,
  shoppingQuantityLabel,
  unassignedDays,
} from 'src/app/core/utils/shopping-list.util';
import { localizeProp } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'idle' | 'loading' | 'error' | 'loaded';

// Los rangos con los que se hace la compra de verdad. Cerrados a propósito:
// un selector de fechas libre convertiría dos toques en un formulario.
const RANGES = [
  { days: 7, label: '1 semana' },
  { days: 14, label: '2 semanas' },
  { days: 30, label: 'Un mes' },
];
RANGES.forEach((item) => localizeProp(item, 'label', `CLIENTS.SHOPPING_RANGES.${item.days}`));

/**
 * Movimiento 5 Coach Pro — lo que el cliente tiene que comprar para cumplir
 * el plan: cantidad por día × días del rango, sumado por producto, con el
 * mismo reparto de menús y alternativas que ve el cliente
 * (shopping-list.util.ts).
 *
 * Del lado del entrenador sirve para lo contrario que del lado del cliente:
 * él no va a comprarlo, la usa para comprobar de un vistazo que lo que ha
 * pautado es comprable y razonable ("¿de verdad le estoy mandando 3 kg de
 * pollo a la semana?"). Por eso arranca PLEGADA y no carga nada hasta que se
 * abre: es una comprobación puntual, no algo que se mire cada vez que se
 * entra en la ficha.
 */
@Component({
  selector: 'app-shopping-list-panel',
  templateUrl: 'shopping-list-panel.component.html',
  styleUrls: ['shopping-list-panel.component.scss'],
})
export class ShoppingListPanelComponent implements OnChanges {
  private readonly translate = inject(TranslateService);

  @Input() public clientId = '';

  public state: ViewState = 'idle';
  public expanded = false;
  public items: ShoppingListItem[] = [];
  public segments: ShoppingSegment[] = [];
  public selection: ShoppingSelection = {};
  // Menú que se está repartiendo en cada tramo (planId → nombre).
  private activeMenus: Record<string, string> = {};
  public daysWithPlan = 0;
  public readonly ranges = RANGES;
  public selectedDays = 7;

  constructor(private clientDetailApi: ClientDetailApiService) {}

  public ngOnChanges(): void {
    // Al cambiar de cliente se olvida lo cargado: enseñar la compra del
    // anterior sería peor que no enseñar nada.
    this.state = 'idle';
    this.expanded = false;
    this.items = [];
    this.segments = [];
  }

  public toggle(): void {
    this.expanded = !this.expanded;
    if (this.expanded && this.state === 'idle') this.load();
  }

  public selectRange(days: number): void {
    if (this.selectedDays === days) return;
    this.selectedDays = days;
    this.load();
  }

  public load(): void {
    if (!this.clientId) return;
    this.state = 'loading';

    const from = new Date().toISOString().slice(0, 10);
    const to = new Date(Date.now() + (this.selectedDays - 1) * 86400000)
      .toISOString()
      .slice(0, 10);

    this.clientDetailApi.getShoppingList(this.clientId, from, to).subscribe({
      next: (list) => {
        this.items = list?.items || [];
        this.segments = list?.segments || [];
        this.selection = defaultShoppingSelection(this.segments);
        this.activeMenus = {};
        this.daysWithPlan = list?.daysWithPlan || 0;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Solo hay algo que repartir con 2+ menús o alguna comida con 2+
  // alternativas.
  public get hasChoices(): boolean {
    return this.segments.some(
      (segment) => segment.menus.length > 1 || segment.menus.some((menu) => this.mealsWithChoice(menu).length)
    );
  }

  public mealsWithChoice(menu: ShoppingMenu): ShoppingMeal[] {
    return menu.meals.filter((meal) => meal.alternatives.length > 1);
  }

  public menuDays(segment: ShoppingSegment, menu: ShoppingMenu): number {
    return this.selection[segment.planId]?.menuDays[menu.name] || 0;
  }

  public unassigned(segment: ShoppingSegment): number {
    return unassignedDays(segment, this.selection);
  }

  // El total del tramo no pasa de sus días: para dar un día a un menú hay
  // que quitárselo antes a otro.
  public changeMenuDays(segment: ShoppingSegment, menu: ShoppingMenu, delta: number): void {
    const menuDays = this.selection[segment.planId]?.menuDays;
    if (!menuDays) return;
    const next = (menuDays[menu.name] || 0) + delta;
    if (next < 0 || (delta > 0 && this.unassigned(segment) <= 0)) return;
    menuDays[menu.name] = next;
    this.items = aggregateShopping(this.segments, this.selection);
  }

  public activeMenu(segment: ShoppingSegment): ShoppingMenu | null {
    const name = this.activeMenus[segment.planId];
    return segment.menus.find((menu) => menu.name === name) || segment.menus[0] || null;
  }

  public setActiveMenu(segment: ShoppingSegment, name: string): void {
    this.activeMenus[segment.planId] = name;
  }

  // "Menú A 4 d · Menú B 3 d": el reparto entero, ya que el desplegable
  // solo enseña un menú.
  public menuSummary(segment: ShoppingSegment): string {
    return segment.menus.map((menu) => `${menu.name} ${this.menuDays(segment, menu)} d`).join(' · ');
  }

  public selectedAlternative(segment: ShoppingSegment, menu: ShoppingMenu, meal: ShoppingMeal): number {
    return this.selection[segment.planId]?.alternatives[alternativeKey(menu, meal)] ?? 0;
  }

  public selectAlternative(segment: ShoppingSegment, menu: ShoppingMenu, meal: ShoppingMeal, index: number): void {
    const alternatives = this.selection[segment.planId]?.alternatives;
    if (!alternatives) return;
    alternatives[alternativeKey(menu, meal)] = index;
    this.items = aggregateShopping(this.segments, this.selection);
  }

  public alternativeLabel(label: string, index: number): string {
    return label || this.translate.instant('CLIENTS.OPCION', { p0: index + 1 });
  }

  // Tramo con fechas solo si hay más de uno: con uno solo es el rango pedido.
  public segmentLabel(segment: ShoppingSegment): string {
    const fmt = (iso: string) => `${Number(iso.slice(8, 10))}/${Number(iso.slice(5, 7))}`;
    return this.translate.instant('CLIENTS.DEL_AL', { p0: fmt(segment.from), p1: fmt(segment.to) });
  }

  public quantityLabel(item: ShoppingListItem): string {
    return shoppingQuantityLabel(item.quantity);
  }

  public trackByName(_index: number, item: ShoppingListItem): string {
    return item.name;
  }

  public trackByPlan(_index: number, segment: ShoppingSegment): string {
    return segment.planId;
  }

  public trackByDays(_index: number, range: { days: number }): number {
    return range.days;
  }
}
