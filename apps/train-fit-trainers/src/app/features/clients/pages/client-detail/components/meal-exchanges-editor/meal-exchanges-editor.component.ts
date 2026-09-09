import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ExchangeRole,
  MacroDiff,
  MacroKey,
  PlanGroup,
  cuadre,
  proposeReparto,
  roundToStep,
  suggestFix,
  sumReparto,
} from 'src/app/core/utils/exchange-plan.util';
import { FoodExchangeGroup } from 'src/app/features/food-exchanges/models/food-exchange.model';
import { FoodExchangesApiService } from 'src/app/features/food-exchanges/services/food-exchanges-api.service';
import { GoalMeal, GoalMealExchange } from '../../models/client-progress.model';

// Los nombres con los que un entrenador reparte el día. Se ofrecen como
// atajo, no como enum cerrado: el nombre real es texto libre, porque cada
// metodología reparte a su manera (hay quien pauta "post-entreno" y quien
// pauta cinco tomas numeradas).
const MEAL_PRESETS = ['Desayuno', 'Media mañana', 'Comida', 'Merienda', 'Cena', 'Post-entreno'];

// Las comidas que se crean solas al proponer un reparto sobre un objetivo en
// blanco. Cuatro y no seis: es el reparto más común, y quitar una comida es
// más rápido que añadirla.
const DEFAULT_MEALS = ['Desayuno', 'Comida', 'Merienda', 'Cena'];

// Medio intercambio es la unidad más pequeña que se pauta de verdad, así que
// es el paso de los botones +/−. Ver PLAN_STEP en exchange-plan.util.ts.
const STEP = 0.5;

const MACRO_LABEL: Record<MacroKey, string> = {
  kcal: 'Kcal',
  protein: 'Proteína',
  carbs: 'Hidratos',
  fat: 'Grasa',
};

const MACRO_UNIT: Record<MacroKey, string> = {
  kcal: 'kcal',
  protein: 'g',
  carbs: 'g',
  fat: 'g',
};

const ROLE_LABEL: Record<string, string> = {
  vegetable: 'Verdura',
  fruit: 'Fruta',
  dairy: 'Lácteo',
  carb: 'Hidratos',
  protein: 'Proteína',
  fat: 'Grasa',
  targets: 'Objetivo',
};

/**
 * El reparto del día en INTERCAMBIOS, y su cuadre contra los gramos.
 *
 * Convive con los gramos, no los sustituye: son dos formas de pautar el mismo
 * día. Lo que faltaba —y es la razón de esta pantalla— es que nada comprobaba
 * que dijeran lo mismo. Ahora el cuadre está siempre a la vista, y cuando no
 * se puede calcular lo dice en vez de enseñar un total incompleto que parece
 * correcto.
 *
 * Componente propio y no ochenta líneas más dentro del panel de objetivos: es
 * una estructura anidada (comidas -> raciones) dentro de una página que ya
 * pasa de dos mil líneas.
 */
@Component({
  selector: 'app-meal-exchanges-editor',
  templateUrl: 'meal-exchanges-editor.component.html',
  styleUrls: ['meal-exchanges-editor.component.scss'],
})
export class MealExchangesEditorComponent implements OnInit {
  @Input() public meals: GoalMeal[] = [];
  /** Los gramos del mismo objetivo. Sin ellos no hay contra qué cuadrar. */
  @Input() public targets: Partial<Record<MacroKey, number | null>> = {};
  @Output() public mealsChange = new EventEmitter<GoalMeal[]>();

  public readonly mealPresets = MEAL_PRESETS;
  public groups: FoodExchangeGroup[] = [];
  public isLoadingGroups = true;

  // Arranca plegado: un entrenador que pauta en gramos no tiene por qué ver
  // esto cada vez que toca las kcal de un cliente.
  public expanded = false;

  // Lo que se fija por criterio antes de calcular el resto. No sale de una
  // ecuación: cuánta verdura come alguien lo decide él.
  public fixedServings: Record<string, number> = { vegetable: 2, fruit: 2, dairy: 1 };
  public proposalNotes: string[] = [];

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

  // --- El cuadre ---

  public get sum() {
    return sumReparto(this.meals);
  }

  public get hasTargets(): boolean {
    return Object.values(this.targets || {}).some((value) => Number(value) > 0);
  }

  public get cuadreRows(): MacroDiff[] {
    return cuadre(this.sum.totals, this.targets).filter((row) => row.withinTolerance !== null);
  }

  /**
   * Si el cuadre se puede dar por bueno.
   *
   * Un reparto al que le faltan grupos NO cuadra aunque los números salgan:
   * el total está sacado de la mitad de las raciones y parece correcto. Los
   * grupos libres sí se descuentan sin penalizar — no sumar es su función.
   */
  public get isBalanced(): boolean {
    if (!this.hasTargets || this.sum.incomplete.length) return false;
    return this.cuadreRows.every((row) => row.withinTolerance === true);
  }

  public get incompleteLabel(): string {
    return this.sum.incomplete
      .map((row) => `${row.count}× ${row.groupName}`)
      .join(', ');
  }

  public get freeLabel(): string {
    return this.sum.free.map((row) => `${row.count}× ${row.groupName}`).join(', ');
  }

  public macroLabel(macro: MacroKey): string {
    return MACRO_LABEL[macro];
  }

  public macroUnit(macro: MacroKey): string {
    return MACRO_UNIT[macro];
  }

  /** Las kcal de una comida: un día que cuadra puede estar mal repartido. */
  public mealKcal(meal: GoalMeal): number {
    return sumReparto([meal]).totals.kcal;
  }

  // --- La sugerencia de un paso ---

  public get fix() {
    if (!this.hasTargets || this.sum.incomplete.length) return null;
    return suggestFix(this.meals, this.targets);
  }

  public fixLabel(fix: { groupName: string; delta: number }): string {
    const amount = Math.abs(fix.delta) === 1 ? '1 ración' : `${Math.abs(fix.delta)} raciones`;
    return `${fix.delta > 0 ? 'Añade' : 'Quita'} ${amount} de ${fix.groupName}`;
  }

  /**
   * Aplica el paso sugerido donde menos molesta: la comida que más raciones
   * tiene de ese grupo si hay que quitar, la primera que ya lo lleva si hay
   * que añadir.
   */
  public applyFix(): void {
    const fix = this.fix;
    if (!fix) return;

    const candidates = (this.meals || [])
      .map((meal, mealIndex) => ({
        mealIndex,
        exchangeIndex: (meal.exchanges || []).findIndex(
          (exchange) => exchange.groupId === fix.groupId
        ),
      }))
      .filter((row) => row.exchangeIndex >= 0);
    if (!candidates.length) return;

    const target =
      fix.delta < 0
        ? candidates.reduce((best, row) =>
            this.meals[row.mealIndex].exchanges[row.exchangeIndex].count >
            this.meals[best.mealIndex].exchanges[best.exchangeIndex].count
              ? row
              : best
          )
        : candidates[0];

    this.changeCount(target.mealIndex, target.exchangeIndex, fix.delta);
  }

  // --- Proponer el reparto ---

  public get planGroups(): PlanGroup[] {
    return this.groups.map((group) => ({
      _id: group._id,
      name: group.name,
      serving: group.serving,
      role: group.role || null,
      freeQuantity: group.freeQuantity,
    }));
  }

  public get rolesToFix(): { key: ExchangeRole; label: string }[] {
    return (['vegetable', 'fruit', 'dairy'] as ExchangeRole[])
      .filter((role) => this.groups.some((group) => group.role === role))
      .map((role) => ({ key: role, label: ROLE_LABEL[role] }));
  }

  public get canPropose(): boolean {
    return (
      Number(this.targets?.carbs) > 0 &&
      Number(this.targets?.protein) > 0 &&
      this.groups.some((group) => group.role === 'carb') &&
      this.groups.some((group) => group.role === 'protein')
    );
  }

  /**
   * Rellena el reparto entero desde los gramos del objetivo.
   *
   * Es la cuenta que él hace con la calculadora cada vez que monta una dieta
   * por intercambios, resuelta en el mismo orden y descontando en cada paso lo
   * que aportan los anteriores — que es justo lo que se olvida a mano.
   *
   * PROPUESTA, no decisión: sale en el editor con todo editable y el cuadre en
   * vivo debajo. Las equivalencias siguen siendo las suyas; esto solo dice
   * cuántas raciones de cada grupo llegan a sus gramos.
   */
  public propose(): void {
    const fixed = Object.fromEntries(
      this.rolesToFix.map((role) => [role.key, Number(this.fixedServings[role.key]) || 0])
    ) as Partial<Record<ExchangeRole, number>>;

    const { counts, missing } = proposeReparto(this.targets, this.planGroups, fixed);
    this.proposalNotes = missing.map(
      (row) => `${ROLE_LABEL[row.role] || row.role}: ${row.reason}`
    );
    if (!counts.length) return;

    // Se conservan los nombres de comida que ya tuviera: si reparte en cinco
    // tomas, reescribírselas a cuatro sería deshacerle el trabajo.
    const mealNames = (this.meals || []).length
      ? this.meals.map((meal) => meal.name)
      : DEFAULT_MEALS;

    const next: GoalMeal[] = mealNames.map((name) => ({ name, exchanges: [] }));
    for (const row of counts) {
      const group = this.groups.find((candidate) => candidate._id === row.groupId);
      const shares = this.spread(row.count, mealNames.length);
      shares.forEach((count, index) => {
        if (count > 0) next[index].exchanges.push(this.buildExchange(group, count));
      });
    }

    this.emit(next.filter((meal) => meal.exchanges.length));
  }

  /**
   * Reparte `count` raciones entre `slots` comidas, en múltiplos de media.
   *
   * A partes iguales a propósito: cualquier reparto automático por comida
   * sería adivinar (¿desayuno ligero? ¿carga post-entreno?), y eso lo decide
   * él moviendo los contadores. Lo que no tiene que volver a hacer es la
   * cuenta del día.
   */
  private spread(count: number, slots: number): number[] {
    if (slots <= 0) return [];
    const steps = Math.round(count / STEP);
    const base = Math.floor(steps / slots);
    const extra = steps - base * slots;
    return Array.from({ length: slots }, (_, index) => (base + (index < extra ? 1 : 0)) * STEP);
  }

  // --- Edición manual ---

  /**
   * Una ración con el perfil del grupo pegado.
   *
   * El backend vuelve a estamparlo al guardar (es la copia que manda), pero
   * el front lo necesita YA para cuadrar en vivo: sin él, añadir un grupo
   * dejaría el cuadre en "no calculable" hasta guardar y recargar.
   */
  private buildExchange(group: FoodExchangeGroup | undefined, count: number): GoalMealExchange {
    if (!group) return { groupId: '', groupName: '', count };
    if (group.freeQuantity) {
      return { groupId: group._id, groupName: group.name, count, freeQuantity: true };
    }
    return {
      groupId: group._id,
      groupName: group.name,
      count,
      serving: group.serving || null,
    };
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
      exchanges: [...(meal.exchanges || []), this.buildExchange(group, 1)],
    };
    this.emit(next);
  }

  public changeCount(mealIndex: number, exchangeIndex: number, delta: number): void {
    const next = [...this.meals];
    const exchanges = [...(next[mealIndex].exchanges || [])];
    const count = roundToStep(exchanges[exchangeIndex].count + delta);

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

  /** Que una ración no tenga perfil se ve en su fila, no solo en el total. */
  public isExchangeIncomplete(exchange: GoalMealExchange): boolean {
    if (exchange.freeQuantity) return false;
    const serving = exchange.serving;
    return (['kcal', 'protein', 'carbs', 'fat'] as const).some(
      (macro) => serving?.[macro] === null || serving?.[macro] === undefined
    );
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
