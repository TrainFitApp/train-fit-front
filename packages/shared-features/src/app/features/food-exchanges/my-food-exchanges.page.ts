import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { amountForExchanges } from 'src/app/core/utils/exchange-math.util';
import {
  MyExchangeGroup,
  MyExchangeItem,
  MyExchangePlanApiService,
  MyGoalMeal,
  MyGoalMealExchange,
} from './services/my-exchange-plan-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

/**
 * Fase 5 Coach Pro (§16) + Movimiento 5 — lo que el CLIENTE consulta cuando
 * no tiene lo que le pautaron.
 *
 * UNA pantalla, no dos. Durante un tiempo hubo dos ("Mi reparto del día" y
 * "Intercambios") y enseñaban lo mismo leído de dos formas: el reparto dice
 * CUÁNTO ("2 raciones de proteína en la comida") y los grupos dicen QUÉ
 * ("100 g de pollo, 120 g de pavo"). Una sin la otra no sirve — el reparto
 * sin grupos es un número sin alimentos, y los grupos sin reparto son una
 * lista sin instrucciones. Separarlas obligaba al cliente a saltar entre dos
 * pantallas para responder una sola pregunta.
 *
 * Solo lectura, a propósito. Las equivalencias las decide el profesional; si
 * el cliente pudiera editarlas, dejarían de ser una prescripción.
 */
@Component({
  selector: 'app-my-food-exchanges',
  templateUrl: 'my-food-exchanges.page.html',
  styleUrls: ['my-food-exchanges.page.scss'],
})
export class MyFoodExchangesPage implements OnInit {
  public state: ViewState = 'loading';

  // El reparto por comidas. Vacío = este cliente se pauta en gramos, y la
  // pantalla se queda solo con la lista de grupos, que es exactamente lo que
  // enseñaba antes de existir el reparto.
  public meals: MyGoalMeal[] = [];
  public groups: MyExchangeGroup[] = [];

  // Una sola cosa desplegada a la vez en cada sección: con todo abierto la
  // pantalla vuelve a ser la lista larga que se venía a evitar.
  public expandedMealKey: string | null = null;
  public expandedGroupId: string | null = null;

  private groupsById = new Map<string, MyExchangeGroup>();

  constructor(
    private myExchangePlanApi: MyExchangePlanApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // Mismo destino de vuelta que el resto de pantallas del profesional: el
  // único punto de entrada es la tarjeta del tab Coach.
  public close(): void {
    void this.router.navigate(['/tabs/coach']);
  }

  public load(): void {
    this.state = 'loading';
    // Una sola petición para las dos mitades. Pedirlas por separado dejaría
    // la pantalla a medias mientras llega la segunda.
    this.myExchangePlanApi.getMyPlan().subscribe({
      next: ({ meals, groups }) => {
        this.meals = meals || [];
        this.groups = groups || [];
        this.groupsById = new Map(this.groups.map((group) => [group._id, group]));
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public get isEmpty(): boolean {
    return this.state === 'loaded' && !this.meals.length && !this.groups.length;
  }

  // --- Reparto por comidas ---
  public groupFor(exchange: MyGoalMealExchange): MyExchangeGroup | null {
    return this.groupsById.get(exchange.groupId) || null;
  }

  public toggleMeal(mealIndex: number, exchangeIndex: number): void {
    const key = `${mealIndex}:${exchangeIndex}`;
    this.expandedMealKey = this.expandedMealKey === key ? null : key;
  }

  public isMealExpanded(mealIndex: number, exchangeIndex: number): boolean {
    return this.expandedMealKey === `${mealIndex}:${exchangeIndex}`;
  }

  public countLabel(count: number): string {
    return count === 1 ? '1 ración' : `${count} raciones`;
  }

  /**
   * Cuánto hay que comer de ESE alimento para cubrir las raciones pautadas.
   *
   * Multiplica la cantidad que escribió el entrenador, no calcula nada por su
   * cuenta: si él decidió que su ración de proteína son 100 g de pollo, dos
   * raciones son 200 g. La equivalencia sigue siendo suya.
   */
  public amountFor(item: MyExchangeItem, count: number): string {
    const amount = amountForExchanges(item, count);
    return amount ? `${amount.quantity} ${amount.unit}` : '';
  }

  // --- Lista de grupos ---
  public toggleGroup(group: MyExchangeGroup): void {
    this.expandedGroupId = this.expandedGroupId === group._id ? null : group._id;
  }

  // "100 g de pollo" — la referencia contra la que se leen los demás.
  public referenceLabel(group: MyExchangeGroup): string {
    const first = group.items?.[0];
    return first ? `${first.quantity} ${first.unit} de ${first.name}` : '';
  }

  public alternatives(group: MyExchangeGroup): MyExchangeItem[] {
    return (group.items || []).slice(1);
  }

  public trackByGroupId(_index: number, group: MyExchangeGroup): string {
    return group._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
