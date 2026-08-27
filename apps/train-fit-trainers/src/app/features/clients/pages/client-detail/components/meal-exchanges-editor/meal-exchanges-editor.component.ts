import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodExchangeGroup } from 'src/app/features/food-exchanges/models/food-exchange.model';
import { FoodExchangesApiService } from 'src/app/features/food-exchanges/services/food-exchanges-api.service';
import { GoalMeal } from '../../models/client-progress.model';

// Los nombres con los que un entrenador reparte el día. Se ofrecen como
// atajo, no como enum cerrado: el nombre real es texto libre, porque cada
// metodología reparte a su manera (hay quien pauta "post-entreno" y quien
// pauta cinco tomas numeradas).
const MEAL_PRESETS = ['Desayuno', 'Media mañana', 'Comida', 'Merienda', 'Cena', 'Post-entreno'];

// Medio intercambio es la unidad más pequeña que se pauta de verdad, así que
// es el paso de los botones +/−. Ver EXCHANGE_STEP en el backend.
const STEP = 0.5;

/**
 * Movimiento 5 Coach Pro — reparto del día en INTERCAMBIOS por comida.
 *
 * Convive con los gramos, no los sustituye (decisión del usuario): son dos
 * formas de pautar lo mismo y cada entrenador usa la suya. Un objetivo puede
 * tener las dos, una, o ninguna — el array vacío es exactamente lo que
 * tenían todos los objetivos hasta ahora.
 *
 * Componente propio y no ochenta líneas más dentro del panel de objetivos:
 * es una estructura anidada (comidas -> raciones) dentro de una página que
 * ya pasa de dos mil líneas.
 */
@Component({
  selector: 'app-meal-exchanges-editor',
  templateUrl: 'meal-exchanges-editor.component.html',
  styleUrls: ['meal-exchanges-editor.component.scss'],
})
export class MealExchangesEditorComponent implements OnInit {
  @Input() public meals: GoalMeal[] = [];
  @Output() public mealsChange = new EventEmitter<GoalMeal[]>();

  public readonly mealPresets = MEAL_PRESETS;
  public groups: FoodExchangeGroup[] = [];
  public isLoadingGroups = true;

  // Arranca plegado: un entrenador que pauta en gramos no tiene por qué ver
  // esto cada vez que toca las kcal de un cliente.
  public expanded = false;

  constructor(private foodExchangesApi: FoodExchangesApiService) {}

  public ngOnInit(): void {
    // Si ya venía un reparto guardado, se abre solo: esconderlo haría creer
    // que se ha perdido.
    this.expanded = (this.meals || []).length > 0;

    this.foodExchangesApi.getMine().subscribe({
      next: (groups) => {
        this.groups = groups || [];
        this.isLoadingGroups = false;
      },
      error: () => {
        this.groups = [];
        this.isLoadingGroups = false;
      },
    });
  }

  public toggle(): void {
    this.expanded = !this.expanded;
  }

  public get totalExchanges(): number {
    return (this.meals || []).reduce(
      (total, meal) =>
        total + (meal.exchanges || []).reduce((sum, exchange) => sum + exchange.count, 0),
      0
    );
  }

  // Suma del día por GRUPO, no por comida: es lo que el entrenador compara
  // contra lo que quería pautar ("le he puesto 5 raciones de hidratos en
  // total"), y no se ve mirando comida a comida.
  public get totalsByGroup(): { groupName: string; count: number }[] {
    const totals = new Map<string, number>();
    for (const meal of this.meals || []) {
      for (const exchange of meal.exchanges || []) {
        totals.set(exchange.groupName, (totals.get(exchange.groupName) || 0) + exchange.count);
      }
    }
    return [...totals.entries()]
      .map(([groupName, count]) => ({ groupName, count }))
      .sort((a, b) => b.count - a.count);
  }

  public addMeal(name: string): void {
    if (!name.trim()) return;
    this.emit([...(this.meals || []), { name: name.trim(), exchanges: [] }]);
  }

  public removeMeal(index: number): void {
    const next = [...this.meals];
    next.splice(index, 1);
    this.emit(next);
  }

  public renameMeal(index: number, name: string): void {
    const next = [...this.meals];
    next[index] = { ...next[index], name };
    this.emit(next);
  }

  public addExchange(mealIndex: number, groupId: string): void {
    const group = this.groups.find((candidate) => candidate._id === groupId);
    if (!group) return;

    const meal = this.meals[mealIndex];
    // Un grupo repetido en la misma comida sería una fila duplicada que suma
    // lo mismo que subir el contador de la que ya está.
    if ((meal.exchanges || []).some((exchange) => exchange.groupId === groupId)) return;

    const next = [...this.meals];
    next[mealIndex] = {
      ...meal,
      exchanges: [
        ...(meal.exchanges || []),
        // groupName copiado al pautar: si el grupo se renombra o se borra,
        // la pauta que el cliente ya tiene sigue siendo legible.
        { groupId: group._id, groupName: group.name, count: 1 },
      ],
    };
    this.emit(next);
  }

  public changeCount(mealIndex: number, exchangeIndex: number, delta: number): void {
    const next = [...this.meals];
    const exchanges = [...(next[mealIndex].exchanges || [])];
    const count = Math.round((exchanges[exchangeIndex].count + delta) * 2) / 2;

    // Bajar de 0,5 quita la ración: "0 raciones de proteína en la comida" no
    // es una pauta, es no haberla puesto.
    if (count < STEP) {
      exchanges.splice(exchangeIndex, 1);
    } else {
      exchanges[exchangeIndex] = { ...exchanges[exchangeIndex], count };
    }

    next[mealIndex] = { ...next[mealIndex], exchanges };
    this.emit(next);
  }

  public availableGroupsFor(meal: GoalMeal): FoodExchangeGroup[] {
    const used = new Set((meal.exchanges || []).map((exchange) => exchange.groupId));
    return this.groups.filter((group) => !used.has(group._id));
  }

  public presetsNotUsed(): string[] {
    const used = new Set((this.meals || []).map((meal) => meal.name.toLowerCase()));
    return this.mealPresets.filter((preset) => !used.has(preset.toLowerCase()));
  }

  private emit(meals: GoalMeal[]): void {
    this.meals = meals;
    this.mealsChange.emit(meals);
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByGroupId(_index: number, group: FoodExchangeGroup): string {
    return group._id;
  }
}
