import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  ALL_SHOPPING_MENUS,
  ShoppingList,
  ShoppingListItem,
  ShoppingMeal,
  ShoppingMenu,
  ShoppingMenuFilter,
  ShoppingSegment,
  ShoppingSelection,
  aggregateShoppingView,
  alternativeKey,
  defaultShoppingSelection,
  shoppingQuantityLabel,
  unassignedDays,
} from 'src/app/core/utils/shopping-list.util';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

type ViewState = 'loading' | 'error' | 'loaded';

@Injectable({ providedIn: 'root' })
export class MyShoppingListApiService {
  constructor(private http: HttpService) {}

  public getMine(from: string, to: string): Observable<ShoppingList> {
    return this.http.get<ShoppingList>(`dietdays/shopping-list?from=${from}&to=${to}`);
  }
}

// Los rangos con los que se hace la compra de verdad. Cerrados a propósito:
// un selector de fechas libre convertiría una pantalla de dos toques en un
// formulario.
const RANGES = [
  { days: 7, label: 'SHOPPING_LIST.RANGE_WEEK' },
  { days: 14, label: 'SHOPPING_LIST.RANGE_2_WEEKS' },
  { days: 30, label: 'SHOPPING_LIST.RANGE_MONTH' },
];

/**
 * Movimiento 5 Coach Pro — qué comprar para cumplir el plan.
 *
 * No hay modelo nuevo detrás: el servidor la calcula del plan (cantidad por
 * día × días del rango, así que 2 semanas es el doble que 1) y no se guarda,
 * porque el plan cambia. Como el cliente elige menú cada día y cada comida
 * puede tener alternativas, aquí reparte los días entre menús y elige la
 * alternativa; la lista se recalcula en local (shopping-list.util.ts).
 *
 * Marcar lo que ya está en el carro es estado LOCAL de esta pantalla, no del
 * servidor: es una ayuda mientras se recorre el supermercado, no un dato que
 * su entrenador tenga que ver.
 */
@Component({
  selector: 'app-my-shopping-list',
  templateUrl: 'my-shopping-list.page.html',
  styleUrls: ['my-shopping-list.page.scss'],
})
export class MyShoppingListPage implements OnInit {
  public state: ViewState = 'loading';
  public list: ShoppingList | null = null;
  public readonly ranges = RANGES;
  public selectedDays = 7;
  public segments: ShoppingSegment[] = [];
  public items: ShoppingListItem[] = [];
  public selection: ShoppingSelection = {};
  public readonly allMenus = ALL_SHOPPING_MENUS;
  // Menú elegido en el desplegable de cada tramo: filtra la lista y es el
  // que se reparte con el stepper. Sin entrada, «Todos».
  private menuFilter: ShoppingMenuFilter = {};

  private checked = new Set<string>();

  constructor(
    private myShoppingListApi: MyShoppingListApiService,
    private router: Router,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // Se abre desde Coach y desde la cabecera de Dietas: vuelve a donde
  // estaba. Sin historial (entrada directa), a Coach.
  public async close(): Promise<void> {
    if (await this.navCtrl.pop()) return;
    void this.router.navigate(['/tabs/coach']);
  }

  public selectRange(days: number): void {
    if (this.selectedDays === days) return;
    this.selectedDays = days;
    // Lo marcado se descarta al cambiar de rango: la lista es otra, y
    // arrastrar las marcas dejaría tachado algo que ya no significa lo mismo.
    this.checked.clear();
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    // Hoy y los días siguientes en el calendario del dispositivo (en UTC,
    // de madrugada en España el rango se quedaba un día corto).
    const last = new Date();
    last.setDate(last.getDate() + this.selectedDays - 1);
    const from = localIsoDate();
    const to = localIsoDate(last);

    this.myShoppingListApi.getMine(from, to).subscribe({
      next: (list) => {
        this.list = list;
        this.segments = list.segments;
        this.selection = defaultShoppingSelection(this.segments);
        this.menuFilter = {};
        this.items = list.items;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public get isEmpty(): boolean {
    return this.state === 'loaded' && !this.items.length && !this.segments.length;
  }

  // Solo hay algo que repartir con 2+ menús o alguna comida con 2+
  // alternativas; con un único menú fijo el bloque sobraría.
  public get hasChoices(): boolean {
    return this.segments.some(
      (segment) => segment.menus.length > 1 || segment.menus.some((menu) => this.mealsWithChoice(menu).length)
    );
  }

  public mealsWithChoice(menu: ShoppingMenu): ShoppingMeal[] {
    return menu.meals.filter((meal) => meal.alternatives.length > 1);
  }

  public menuDays(segment: ShoppingSegment, menu: ShoppingMenu): number {
    return this.selection[segment.id]?.menuDays[menu.name] || 0;
  }

  public unassigned(segment: ShoppingSegment): number {
    return unassignedDays(segment, this.selection);
  }

  // El total del tramo no pasa de sus días: para dar un día a un menú hay
  // que quitárselo antes a otro.
  public changeMenuDays(segment: ShoppingSegment, menu: ShoppingMenu, delta: number): void {
    const menuDays = this.selection[segment.id]?.menuDays;
    if (!menuDays) return;
    const next = (menuDays[menu.name] || 0) + delta;
    if (next < 0 || (delta > 0 && this.unassigned(segment) <= 0)) return;
    menuDays[menu.name] = next;
    this.recompute();
  }

  // El menú que se mira en el tramo; null con «Todos». Un tramo de un solo
  // menú no tiene desplegable y siempre es ese.
  public activeMenu(segment: ShoppingSegment): ShoppingMenu | null {
    if (segment.menus.length === 1) return segment.menus[0];
    const name = this.menuFilter[segment.id];
    return segment.menus.find((menu) => menu.name === name) || null;
  }

  public menuFilterValue(segment: ShoppingSegment): string {
    return this.menuFilter[segment.id] || ALL_SHOPPING_MENUS;
  }

  public setMenuFilter(segment: ShoppingSegment, name: string): void {
    this.menuFilter[segment.id] = name;
    this.recompute();
  }

  // "Menú A 4 d · Menú B 3 d": el reparto entero, ya que el desplegable
  // solo enseña un menú.
  public menuSummary(segment: ShoppingSegment): string {
    return segment.menus.map((menu) => `${menu.name} ${this.menuDays(segment, menu)} d`).join(' · ');
  }

  public selectedAlternative(segment: ShoppingSegment, menu: ShoppingMenu, meal: ShoppingMeal): number {
    return this.selection[segment.id]?.alternatives[alternativeKey(menu, meal)] ?? 0;
  }

  public selectAlternative(segment: ShoppingSegment, menu: ShoppingMenu, meal: ShoppingMeal, index: number): void {
    const alternatives = this.selection[segment.id]?.alternatives;
    if (!alternatives) return;
    alternatives[alternativeKey(menu, meal)] = index;
    this.recompute();
  }

  public alternativeLabel(label: string, index: number): string {
    return label || this.translate.instant('SHOPPING_LIST.OPTION_N', { n: index + 1 });
  }

  // Tramo con fechas solo si hay más de uno: con uno solo es el rango pedido.
  public segmentLabel(segment: ShoppingSegment): string {
    const fmt = (iso: string) => `${Number(iso.slice(8, 10))}/${Number(iso.slice(5, 7))}`;
    return this.translate.instant('MY_CHECKINS.PERIOD_RANGE', { from: fmt(segment.from), to: fmt(segment.to) });
  }

  // Lo marcado en el carro se conserva: el producto es el mismo, solo cambia
  // cuánto.
  private recompute(): void {
    this.items = aggregateShoppingView(this.segments, this.selection, this.menuFilter);
  }

  public isChecked(item: ShoppingListItem): boolean {
    return this.checked.has(item.name);
  }

  public toggle(item: ShoppingListItem): void {
    if (this.checked.has(item.name)) this.checked.delete(item.name);
    else this.checked.add(item.name);
  }

  public get checkedCount(): number {
    return this.items.filter((item) => this.checked.has(item.name)).length;
  }

  public quantityLabel(item: ShoppingListItem): string {
    return shoppingQuantityLabel(item.quantity);
  }

  public daysLabel(item: ShoppingListItem): string {
    return this.translate.instant(item.dayCount === 1 ? 'SHOPPING_LIST.DAYS_ONE' : 'SHOPPING_LIST.DAYS_MANY', { count: item.dayCount });
  }

  public trackByName(_index: number, item: ShoppingListItem): string {
    return item.name;
  }

  public trackBySegment(_index: number, segment: ShoppingSegment): string {
    return segment.id;
  }

  public trackByDays(_index: number, range: { days: number }): number {
    return range.days;
  }
}
