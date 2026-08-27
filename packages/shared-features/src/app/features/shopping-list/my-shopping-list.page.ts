import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

type ViewState = 'loading' | 'error' | 'loaded';

export interface ShoppingListItem {
  name: string;
  // Siempre en gramos (o ml): es la unidad en la que CustomProduct guarda
  // las cantidades, no hay conversión que hacer.
  quantity: number;
  // En cuántos días del rango aparece. Distingue el pollo de todos los días
  // del aguacate del domingo, que se compran de forma distinta.
  dayCount: number;
}

export interface ShoppingList {
  items: ShoppingListItem[];
  // Días del rango que REALMENTE tenían plan. Sin esto, una lista corta
  // parecería un plan flojo cuando lo que pasa es que solo hay tres días
  // pautados de los siete pedidos.
  daysWithPlan: number;
  period: { from: string; to: string } | null;
}

@Injectable({ providedIn: 'root' })
export class MyShoppingListApiService {
  constructor(private http: HttpService) {}

  public getMine(from: string, to: string): Observable<ShoppingList> {
    return this.http.get<ShoppingList>(`diet-days/shopping-list?from=${from}&to=${to}`);
  }
}

// Los rangos con los que se hace la compra de verdad. Cerrados a propósito:
// un selector de fechas libre convertiría una pantalla de dos toques en un
// formulario.
const RANGES = [
  { days: 7, label: 'Esta semana' },
  { days: 14, label: '2 semanas' },
  { days: 30, label: 'Un mes' },
];

/**
 * Movimiento 5 Coach Pro — qué comprar para cumplir el plan.
 *
 * No hay modelo nuevo detrás: es una lectura distinta de los mismos días de
 * dieta que el cliente ya ve en su calendario, sumados por producto. Se
 * calcula al pedirla y no se guarda, porque el plan cambia.
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

  private checked = new Set<string>();

  constructor(
    private myShoppingListApi: MyShoppingListApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public close(): void {
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
    const from = new Date().toISOString().slice(0, 10);
    const to = new Date(Date.now() + (this.selectedDays - 1) * 86400000)
      .toISOString()
      .slice(0, 10);

    this.myShoppingListApi.getMine(from, to).subscribe({
      next: (list) => {
        this.list = list;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public get isEmpty(): boolean {
    return this.state === 'loaded' && !this.list?.items?.length;
  }

  public isChecked(item: ShoppingListItem): boolean {
    return this.checked.has(item.name);
  }

  public toggle(item: ShoppingListItem): void {
    if (this.checked.has(item.name)) this.checked.delete(item.name);
    else this.checked.add(item.name);
  }

  public get checkedCount(): number {
    return this.checked.size;
  }

  // Cantidades por encima del kilo en kg: "3400 g de pollo" obliga a hacer
  // la división mentalmente delante del mostrador.
  public quantityLabel(item: ShoppingListItem): string {
    if (item.quantity >= 1000) {
      return `${Math.round(item.quantity / 100) / 10} kg`;
    }
    return `${item.quantity} g`;
  }

  public daysLabel(item: ShoppingListItem): string {
    return item.dayCount === 1 ? '1 día' : `${item.dayCount} días`;
  }

  public trackByName(_index: number, item: ShoppingListItem): string {
    return item.name;
  }

  public trackByDays(_index: number, range: { days: number }): number {
    return range.days;
  }
}
