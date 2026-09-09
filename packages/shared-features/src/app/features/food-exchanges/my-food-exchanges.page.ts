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

  /**
   * "1 ración = 110 kcal · 20 g de proteína".
   *
   * Sustituye a la antigua línea "Referencia: 100 g de pollo", que decía que
   * el primer alimento era especial y los demás se leían contra él. No lo
   * era: cada alimento de la lista, en su cantidad, vale una ración — y así
   * es como los multiplica `amountForExchanges` desde siempre.
   */
  public servingLabel(group: MyExchangeGroup): string {
    if (group.freeQuantity) return 'Cantidad libre: no hace falta pesarlo';
    const serving = group.serving;
    const parts: string[] = [];
    if (serving?.kcal !== null && serving?.kcal !== undefined) parts.push(`${serving.kcal} kcal`);
    if (serving?.protein !== null && serving?.protein !== undefined) {
      parts.push(`${serving.protein} g de proteína`);
    }
    if (serving?.carbs !== null && serving?.carbs !== undefined) {
      parts.push(`${serving.carbs} g de hidratos`);
    }
    if (serving?.fat !== null && serving?.fat !== undefined) parts.push(`${serving.fat} g de grasa`);
    return parts.length ? `1 ración = ${parts.join(' · ')}` : '';
  }

  /**
   * Los grupos que NO salen en su reparto.
   *
   * Antes esta sección repetía TODOS los grupos, incluidos los de arriba, y
   * con peor información: los de arriba ya vienen con las cantidades
   * multiplicadas por sus raciones, y aquí salían en crudo. Eran los mismos
   * alimentos leídos dos veces, y la segunda lectura era la mala.
   */
  public get otherGroups(): MyExchangeGroup[] {
    const used = new Set(
      this.meals.flatMap((meal) => (meal.exchanges || []).map((exchange) => exchange.groupId))
    );
    return this.groups.filter((group) => !used.has(group._id));
  }

  public trackByGroupId(_index: number, group: MyExchangeGroup): string {
    return group._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
