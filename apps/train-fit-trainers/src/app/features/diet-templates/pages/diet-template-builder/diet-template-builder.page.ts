import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { PendingChangesComponent } from 'src/app/core/guards/pending-changes.guard';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { confirmDiscardChanges } from '../../../../shared/navigation/confirm-discard-changes';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { DietTemplateApiService } from '../../services/diet-template-api.service';
import {
  DietTemplate,
  DietTemplateDayPatternPayload,
  DietTemplateDayPayload,
  DietTemplateMealPayload,
  MEAL_SLOTS,
  TemplateDay,
  TemplateDayPattern,
  TemplateFoodItem,
  TemplateMeal,
  TemplateMealAlternative,
  TemplateMode,
  WEEKDAYS,
} from '../../models/diet-template.model';
import { DayMealEditorModalComponent } from './components/day-meal-editor-modal/day-meal-editor-modal.component';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { DurationUnit, PlanEndMode } from '../../../../shared/models/plan-assignment.model';
import { switchMap } from 'rxjs/operators';

type ViewState = 'loading' | 'error' | 'loaded';

// Lo que trae el modal de "Crear dieta" (ver ApplyDietTemplateModalComponent
// #forDirectCreate) antes de llegar aquí: el nombre y CUÁNDO va a regir. El
// contenido se construye en esta misma pantalla; al guardar se crea la dieta
// propia del cliente y, con estas fechas, se aplica como fase de una vez.
interface ForClientNavigationState {
  clientName?: string;
  name?: string;
  startDate?: string;
  endMode?: PlanEndMode;
  fixedEndDate?: string;
  durationValue?: number;
  durationUnit?: DurationUnit;
}

interface BoardCellRef {
  dayIndex: number;
  mealIndex: number;
}

// Replanteamiento MVP (nutrición) — constructor de la plantilla: días con sus
// 6 comidas fijas (mismo enum que DietDay real), cada comida con una o varias
// alternativas (Fase 9 — mismo patrón multi-alternativa que client-detail.page.ts
// #panel de pautar). Se guarda explícitamente (sin autosave) para no disparar
// un PUT por cada pulsación.
@Component({
  selector: 'app-diet-template-builder',
  templateUrl: 'diet-template-builder.page.html',
  styleUrls: ['diet-template-builder.page.scss'],
})
export class DietTemplateBuilderPage implements OnInit, PendingChangesComponent {
  public state: ViewState = 'loading';

  // Referencia de "lo último guardado" (pendingChangesGuard): el builder no
  // autoguarda — una dieta a medio componer se pierde entera al salir.
  private savedSnapshot = '';
  public templateId = '';
  public name = '';
  public days: TemplateDay[] = [];
  public isSaving = false;
  public readonly mealSlots = MEAL_SLOTS;
  public readonly maxDays = 14;

  // Auditoría de arquitectura (Fase 8/9) — "sequential" es el tablero
  // Día 1..N de siempre; "recurring" y "choice" comparten `dayPatterns[]`
  // (patrones por día de la semana fijo, o elegidos por el cliente cada día
  // respectivamente) para no perder los días secuenciales si el entrenador
  // cambia de modo y vuelve a cambiar.
  public mode: TemplateMode = 'sequential';
  public dayPatterns: TemplateDayPattern[] = [];
  public readonly maxPatterns = 10;
  public readonly weekdays = WEEKDAYS;

  // TAREA5 (auditoría UX, Fase C) — tablero semanal: días × comidas en
  // rejilla, en vez del acordeón día→comida→alimentos anterior. Una celda
  // se edita en DayMealEditorModalComponent (ver ese archivo para el porqué
  // de un modal real en vez de un panel propio), y se puede arrastrar
  // entera (con todas sus alternativas) a otra celda para moverla, o
  // duplicarla a otro día sin moverla del origen.
  private draggedFrom: BoardCellRef | null = null;
  public dragOverCell: BoardCellRef | null = null;

  // "Crear dieta" (ver diet-templates-routing.module.ts, ruta
  // for-client/:clientId) — mismo tablero, pero sin plantilla que cargar:
  // guardar crea una dieta de biblioteca PROPIA de este cliente
  // (ownerClientId), que no rige hasta aplicarse como fase.
  public isCreatingForClient = false;
  public clientId = '';
  public clientName = '';
  // Fechas elegidas en el modal previo — se guardan tal cual para aplicarlas
  // sin volver a preguntar. Sin ellas no se puede crear (ver startForClient).
  private phaseDates: {
    startDate: string;
    endMode: PlanEndMode;
    fixedEndDate?: string;
    durationValue?: number;
    durationUnit?: DurationUnit;
  } | null = null;

  private readonly destroyRef = inject(DestroyRef);
  // Solo fiable en el constructor (getCurrentNavigation() vuelve a null en
  // cuanto la navegación termina, y ngOnInit ya corre después) — mismo
  // motivo por el que Angular documenta leerlo aquí y no más abajo.
  //
  // Se asigna en el CUERPO del constructor, no como inicializador de campo:
  // con target es2022, los inicializadores de campo corren antes que las
  // parameter properties (this.router = router), así que un inicializador
  // aquí arriba llamaría a this.router.getCurrentNavigation() con
  // this.router todavía undefined. Bug real, no de este cambio — ya venía
  // así desde que se añadió este campo.
  private readonly navigationState: Partial<ForClientNavigationState> & { clientName?: string };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigation: TrainerNavigationService,
    private dietTemplateApi: DietTemplateApiService,
    private planAssignmentApi: PlanAssignmentApiService,
    private ionicUtilService: IonicUtilService,
    private customProductService: CustomProductService,
    private recipeService: RecipeService
  ) {
    this.navigationState = (this.routerNavigationState() || {}) as Partial<ForClientNavigationState> & {
      clientName?: string;
    };
  }

  private routerNavigationState(): unknown {
    return this.router.getCurrentNavigation()?.extras?.state ?? history.state;
  }

  // TASK-051 (MASTER_BACKLOG.md) — antes leía el :id una sola vez de
  // route.snapshot en ngOnInit. Sin explotar hoy (la lista no navega de una
  // plantilla abierta directamente a otra), pero defiende contra el caso en
  // que Angular reutilice esta instancia entre dos ':id' distintos de la
  // misma ruta (comportamiento por defecto cuando solo cambia el
  // parámetro) — mismo criterio aplicado en RoutineBuilderPage.
  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const clientId = params.get('clientId');
      if (clientId) {
        this.startForClient(clientId);
        return;
      }
      this.templateId = params.get('id') || '';
      this.load();
    });
  }

  // Sin plantilla que cargar — arranca en blanco, listo para construir. El
  // nombre ya se decidió en el modal previo (ver
  // ApplyDietTemplateModalComponent#forDirectCreate); si por lo que sea no
  // llegó (refresco de página, navegación directa a la URL), no hay nada con
  // lo que crear — mejor un error claro que una dieta sin nombre.
  private startForClient(clientId: string): void {
    const nav = this.navigationState;
    // Nombre Y fechas vienen del modal. Si falta cualquiera de los dos (una
    // recarga de página o entrar a la URL a pelo pierde el state de la
    // navegación), no hay con qué crear nada: mejor un error claro que una
    // dieta a medias o una fase con fechas inventadas.
    if (!nav.name || !nav.startDate || !nav.endMode) {
      this.state = 'error';
      return;
    }
    this.isCreatingForClient = true;
    this.clientId = clientId;
    this.clientName = nav.clientName || 'este cliente';
    this.name = nav.name;
    this.phaseDates = {
      startDate: nav.startDate,
      endMode: nav.endMode,
      fixedEndDate: nav.fixedEndDate,
      durationValue: nav.durationValue,
      durationUnit: nav.durationUnit,
    };
    this.mode = 'sequential';
    this.days = [];
    this.dayPatterns = [];
    this.savedSnapshot = this.snapshot();
    this.state = 'loaded';
  }

  public load(): void {
    this.state = 'loading';
    this.dietTemplateApi.list({ includeOwned: true }).subscribe({
      next: (templates) => {
        const template = (templates || []).find((t) => t._id === this.templateId);
        if (!template) {
          this.state = 'error';
          return;
        }
        this.applyTemplate(template);
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private applyTemplate(template: DietTemplate): void {
    this.name = template.name;
    this.mode = template.mode || 'sequential';
    this.days = (template.days || []).map((day: any) => ({
      dayLabel: day.dayLabel,
      meals: this.mealsFromPayload(day.meals),
    }));
    this.dayPatterns = (template.dayPatterns || []).map((pattern: any) => ({
      name: pattern.name,
      appliesTo: Array.isArray(pattern.appliesTo) ? pattern.appliesTo : [],
      meals: this.mealsFromPayload(pattern.meals),
    }));
  }

  private mealsFromPayload(meals: any[] | undefined): TemplateMeal[] {
    return this.mealSlots.map((slot) => {
      const existing = (meals || []).find((m: any) => m.slot === slot);
      return {
        slot,
        alternatives: (existing?.alternatives || []).map((alt: any) => ({
          label: alt.label || '',
          items: [...this.customProductsToItems(alt.customProducts), ...this.customRecipesToItems(alt.customRecipes)],
        })),
      };
    });
  }

  // --- Filas activas del tablero: días secuenciales o patrones (semanales o
  // elegidos por el cliente), según el modo. Ambos comparten forma
  // {meals: TemplateMeal[]}, así que el resto de métodos (editor de celda,
  // drag&drop, snippets...) operan sobre esta lista sin duplicarse por modo. ---
  public get activeRows(): (TemplateDay | TemplateDayPattern)[] {
    return this.mode === 'sequential' ? this.days : this.dayPatterns;
  }

  public get activeRowsLimit(): number {
    return this.mode === 'sequential' ? this.maxDays : this.maxPatterns;
  }

  // F20-duodecies — antes "Añadir menú"/"Eliminar menú" se usaba tal cual
  // para recurring Y choice por igual (el código solo distinguía
  // sequential de "todo lo demás"), aunque solo en choice es de verdad un
  // menú intercambiable — en recurring es un patrón que decide el
  // calendario, no el cliente (ver explicación dada al usuario). Un único
  // getter para no repetir el ternario de 3 vías en cada sitio del html.
  public get rowNoun(): string {
    if (this.mode === 'sequential') return 'día';
    if (this.mode === 'recurring') return 'patrón';
    return 'menú';
  }

  public get emptyRowsHint(): string {
    if (this.mode === 'sequential') return 'Añade el primer día para empezar a construir la plantilla.';
    return `Añade el primer ${this.rowNoun} para empezar.`;
  }

  public setMode(mode: TemplateMode): void {
    this.mode = mode;
  }

  public rowLabel(row: TemplateDay | TemplateDayPattern): string {
    return this.mode === 'sequential' ? (row as TemplateDay).dayLabel : (row as TemplateDayPattern).name;
  }

  public setRowLabel(row: TemplateDay | TemplateDayPattern, value: string): void {
    if (this.mode === 'sequential') {
      (row as TemplateDay).dayLabel = value;
    } else {
      (row as TemplateDayPattern).name = value;
    }
  }

  // Angular templates no admiten "as" de TypeScript — este helper evita
  // repetir "$any(row)" por todo el HTML del tablero en modo recurrente/choice.
  public asPattern(row: TemplateDay | TemplateDayPattern): TemplateDayPattern {
    return row as TemplateDayPattern;
  }

  // F20-decies — un día solo puede pertenecer a UN patrón a la vez: al
  // marcarlo aquí, se quita automáticamente de cualquier otro patrón que ya
  // lo tuviera. Antes cada patrón tenía su propia selección de días sin
  // relación con las demás, así que nada impedía marcar el mismo día en dos
  // sitios — solo se avisaba a posteriori (ver duplicateWeekdaysWarning).
  // Con exclusión mutua, la ambigüedad deja de poder CONSTRUIRSE desde el
  // editor (no hace falta detectarla si no puede existir) — mismo criterio
  // por el que "sequential" nunca tiene este problema: cada día solo puede
  // estar en un sitio, por construcción. duplicateWeekdaysWarning se queda
  // como red de seguridad para plantillas guardadas ANTES de este cambio.
  public toggleWeekday(pattern: TemplateDayPattern, weekday: number): void {
    const i = pattern.appliesTo.indexOf(weekday);
    if (i >= 0) {
      pattern.appliesTo.splice(i, 1);
      return;
    }
    for (const other of this.dayPatterns) {
      if (other === pattern) continue;
      const otherIndex = other.appliesTo.indexOf(weekday);
      if (otherIndex >= 0) other.appliesTo.splice(otherIndex, 1);
    }
    pattern.appliesTo.push(weekday);
  }

  // Aviso suave (no bloquea guardar) de qué días de la semana no quedan
  // cubiertos por ningún patrón — ese día concreto simplemente no tocará
  // nada del plan (ver plan-resolver.js), pero conviene que sea explícito.
  // Solo aplica en modo "recurring" — en "choice" no hay días de la semana.
  public get uncoveredWeekdays(): string {
    if (this.mode !== 'recurring') return '';
    const covered = new Set(this.dayPatterns.flatMap((p) => p.appliesTo));
    const missing = this.weekdays.filter((w) => !covered.has(w.value));
    return missing.map((w) => w.label).join(', ');
  }

  // Red de seguridad, no un caso esperado: toggleWeekday ya impide crear
  // solapes NUEVOS (exclusión mutua entre patrones), pero una plantilla
  // guardada ANTES de ese cambio (o tocada directamente por API) podría
  // seguir teniendo un día en 2+ patrones. Si eso ocurre, deja claro cuál
  // gana — plan-resolver.js#resolvePlanForDate resuelve por orden de
  // aparición en dayPatterns (.find), el primer patrón de la lista que
  // cubra ese día es el que se aplica; el resto queda silenciosamente
  // ignorado para esa fecha.
  public get duplicateWeekdaysWarning(): string {
    if (this.mode !== 'recurring') return '';
    const parts: string[] = [];
    for (const w of this.weekdays) {
      const patterns = this.dayPatterns.filter((p) => p.appliesTo.includes(w.value));
      if (patterns.length < 2) continue;
      const winner = patterns[0].name.trim() || 'sin nombre';
      parts.push(`${w.short} (gana "${winner}")`);
    }
    return parts.join(', ');
  }

  // El backend persiste cada alimento como ref REAL a CustomProduct (refactor
  // 2026-08, ver diet-template-schema.js), no como blob "clipboard" crudo —
  // autopopulate ya trae `cp.product` (Product real) en cada find/findOne.
  // Antes este método ignoraba eso y ponía un nombre genérico; ahora lee el
  // nombre real y cachea las macros con el mismo cálculo que usa
  // day-meal-editor-modal al elegir un alimento nuevo (CustomProductService
  // .getMacros), para que una plantilla reabierta se vea igual que una recién
  // compuesta.
  private customProductsToItems(customProducts: any[] | undefined): TemplateFoodItem[] {
    if (!Array.isArray(customProducts)) return [];
    return customProducts
      .filter((cp) => cp?.product)
      .map((cp) => {
        const macros = this.customProductService.getMacros(cp as CustomProduct);
        return {
          productId: typeof cp.product === 'string' ? cp.product : cp.product?._id,
          productName: cp.product?.name || 'Alimento guardado',
          quantity: cp.quantity,
          kcal: macros.kcal,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          // Cacheado para edición de cantidad in situ (ver day-meal-editor-modal
          // .onQuantityChange) — solo disponible cuando cp.product ya venía
          // poblado (siempre, salvo datos muy antiguos).
          product: typeof cp.product === 'object' ? cp.product : undefined,
        };
      });
  }

  // Mismo criterio que customProductsToItems — `cr.recipe` ya llega
  // autopoblado (Recipe real), y las macros se calculan con
  // RecipeService.calculateCustomRecipeTotals (mismo cálculo reutilizado en
  // day-meal-editor-modal).
  private customRecipesToItems(customRecipes: any[] | undefined): TemplateFoodItem[] {
    if (!Array.isArray(customRecipes)) return [];
    return customRecipes
      .filter((cr) => cr?.recipe)
      .map((cr) => {
        const macros = this.recipeService.calculateCustomRecipeTotals(
          cr.recipe,
          cr as CustomRecipe
        ).portionMacros;
        return {
          recipeId: typeof cr.recipe === 'string' ? cr.recipe : cr.recipe?._id,
          recipeName: cr.recipe?.name || 'Receta guardada',
          quantity: cr.quantity,
          kcal: macros.kcal,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          recipe: typeof cr.recipe === 'object' ? cr.recipe : undefined,
          // Personalización ya guardada de esta receta para esta comida
          // (ver RecipeIngredientsEditorModalComponent) — autopoblada igual
          // que cr.recipe, se conserva al reabrir la plantilla.
          addedCustomProducts: cr.addedCustomProducts,
          modifiedBaseCustomProducts: cr.modifiedBaseCustomProducts,
          removedBaseCustomProductIds: cr.removedBaseCustomProductIds,
        };
      });
  }

  // Espejo de alternativeToCustomEntries en client-detail.page.ts — mismo
  // formato "clipboard" que ya acepta mealModel.pasteMeal (F12/F28). Cada
  // alimento es siempre un producto o una receta real (ver canSave), nunca
  // macros tecleadas a mano.
  private itemsToCustomEntries(
    items: TemplateFoodItem[]
  ): { customProducts: Record<string, unknown>[]; customRecipes: Record<string, unknown>[] } {
    const customProducts: Record<string, unknown>[] = [];
    const customRecipes: Record<string, unknown>[] = [];

    for (const item of items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          quantity: item.quantity || null,
          // Personalización de ingredientes para esta comida en concreto
          // (ver RecipeIngredientsEditorModalComponent) — backend ya la
          // materializa igual que el resto (custom-recipe-dao.js
          // #createCustomRecipe).
          addedCustomProducts: (item.addedCustomProducts || []).map((cp) =>
            this.recipeService.serializeCustomProductForPersistence(cp)
          ),
          modifiedBaseCustomProducts: item.modifiedBaseCustomProducts || [],
          removedBaseCustomProductIds: item.removedBaseCustomProductIds || [],
        });
      } else if (item.productId) {
        customProducts.push({ product: item.productId, quantity: item.quantity || 100 });
      }
    }

    return { customProducts, customRecipes };
  }

  public addRow(): void {
    if (this.activeRows.length >= this.activeRowsLimit) return;
    if (this.mode === 'sequential') {
      this.days.push({
        dayLabel: `Día ${this.days.length + 1}`,
        meals: this.mealSlots.map((slot) => ({ slot, alternatives: [] })),
      });
    } else {
      this.dayPatterns.push({
        name: this.mode === 'choice' ? `Menú ${this.dayPatterns.length + 1}` : `Patrón ${this.dayPatterns.length + 1}`,
        appliesTo: [],
        meals: this.mealSlots.map((slot) => ({ slot, alternatives: [] })),
      });
    }
  }

  public removeRow(index: number): void {
    this.activeRows.splice(index, 1);
  }

  // F20-septies — total de macros del día/patrón: suma la PRIMERA
  // alternativa de cada comida (la que rige cuando no hay elección — con
  // 2+ alternativas no hay un "total real" único, esta es la lectura más
  // representativa sin inventar una media rara). kcal/protein/carbs/fat de
  // cada TemplateFoodItem ya vienen calculados para su quantity actual
  // (mismo snapshot que pinta el resto del builder), no hace falta volver
  // a tocar producto/receta real.
  public dayTotals(row: TemplateDay | TemplateDayPattern): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    for (const meal of row.meals) {
      for (const item of meal.alternatives?.[0]?.items || []) {
        totals.kcal += item.kcal || 0;
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
      }
    }
    return totals;
  }

  public hasAnyItems(row: TemplateDay | TemplateDayPattern): boolean {
    return row.meals.some((meal) => (meal.alternatives?.[0]?.items?.length || 0) > 0);
  }

  // Proporción de cada macro sobre el total de KCAL del día (no de gramos:
  // 1g de grasa aporta más del doble de kcal que 1g de proteína/carbo, una
  // barra por gramos sería visualmente engañosa) — para la barra
  // segmentada bajo el número de kcal.
  public macroBarSegments(row: TemplateDay | TemplateDayPattern): {
    protein: number;
    carbs: number;
    fat: number;
  } {
    const totals = this.dayTotals(row);
    const proteinKcal = totals.protein * 4;
    const carbsKcal = totals.carbs * 4;
    const fatKcal = totals.fat * 9;
    const sum = proteinKcal + carbsKcal + fatKcal;
    if (sum <= 0) return { protein: 0, carbs: 0, fat: 0 };
    return {
      protein: (proteinKcal / sum) * 100,
      carbs: (carbsKcal / sum) * 100,
      fat: (fatKcal / sum) * 100,
    };
  }

  public mealSummary(meal: TemplateMeal): string {
    const alternatives = meal.alternatives || [];
    if (!alternatives.length) return 'Vacía';
    if (alternatives.length === 1) {
      const n = alternatives[0].items.length;
      return `${n} alimento${n === 1 ? '' : 's'}`;
    }
    return `${alternatives.length} alternativas`;
  }

  // La celda del tablero ya no pinta un contador ("3 alimentos") sino lo que
  // hay dentro: nombre y gramos de cada alimento más los macros de esa
  // alternativa — que es justo lo que se quiere comparar de un vistazo entre
  // columnas sin abrir el editor. Mismo criterio que dayTotals(): los macros
  // de cada TemplateFoodItem ya vienen calculados para su quantity actual.
  // Devuelve null (y no un total de ceros) cuando la alternativa aún no tiene
  // ningún alimento elegido — así la fila de macros no aparece vacía en la
  // celda mientras se está componiendo la comida.
  public alternativeTotals(alt: TemplateMealAlternative): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null {
    const items = (alt.items || []).filter((item) => item.productId || item.recipeId);
    if (!items.length) return null;
    const totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    for (const item of items) {
      totals.kcal += item.kcal || 0;
      totals.protein += item.protein || 0;
      totals.carbs += item.carbs || 0;
      totals.fat += item.fat || 0;
    }
    return totals;
  }

  public itemLabel(item: TemplateFoodItem): string {
    return (item.recipeId ? item.recipeName : item.productName) || 'Sin alimento';
  }

  // Misma numeración descendente que las cabeceras del editor de comida
  // (day-meal-editor-modal.component.html), para que "Opción 2" sea la misma
  // en el tablero y dentro del modal.
  public alternativeLabel(alt: TemplateMealAlternative, index: number, total: number): string {
    return alt.label?.trim() || `Opción ${total - index}`;
  }

  // --- Editor de celda (día × comida) ---
  // meal se pasa por referencia al modal: las mutaciones que haga dentro
  // (añadir/quitar alternativas, alimentos...) se reflejan directamente
  // aquí, en el mismo objeto que vive dentro de days/dayPatterns — no hace
  // falta releer nada al cerrar.
  public async openMealEditor(dayIndex: number, mealIndex: number): Promise<void> {
    const row = this.activeRows[dayIndex];
    const meal = row.meals[mealIndex];
    // Siempre se edita con al menos una alternativa visible en pantalla,
    // aunque la celda esté vacía — igual que el panel de "Pautar" en
    // client-detail.page.ts.
    if (!meal.alternatives.length) {
      meal.alternatives.push({ label: '', items: [{}] });
    }

    await this.ionicUtilService.showModal({
      component: DayMealEditorModalComponent,
      componentProps: { meal, dayLabel: this.rowLabel(row), mode: this.mode },
      cssClass: 'tf-panel-modal',
    });
  }

  // --- Arrastrar y soltar: mover una comida completa (con todas sus
  // alternativas) de una celda a otra. Si el destino ya tiene algo, pide
  // confirmación antes de sobrescribir — perder una comida ya compuesta por
  // un arrastre accidental sería un desastre silencioso. ---
  public onCellDragStart(dayIndex: number, mealIndex: number, event: DragEvent): void {
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (!meal.alternatives.length) {
      event.preventDefault();
      return;
    }
    this.draggedFrom = { dayIndex, mealIndex };
    event.dataTransfer?.setData('text/plain', 'meal');
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  public onCellDragOver(dayIndex: number, mealIndex: number, event: DragEvent): void {
    if (!this.draggedFrom) return;
    event.preventDefault();
    this.dragOverCell = { dayIndex, mealIndex };
  }

  public onCellDragLeave(): void {
    this.dragOverCell = null;
  }

  public async onCellDrop(dayIndex: number, mealIndex: number, event: DragEvent): Promise<void> {
    event.preventDefault();
    this.dragOverCell = null;
    const from = this.draggedFrom;
    this.draggedFrom = null;
    if (!from) return;
    if (from.dayIndex === dayIndex && from.mealIndex === mealIndex) return;

    const targetMeal = this.activeRows[dayIndex].meals[mealIndex];
    if (targetMeal.alternatives.length) {
      await this.ionicUtilService.showAlert({
        header: `¿Sobrescribir "${this.rowLabel(this.activeRows[dayIndex])} · ${targetMeal.slot}"?`,
        message: 'Ya tiene alimentos compuestos — se reemplazan por los de la comida que arrastraste.',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Sobrescribir', role: 'destructive', handler: () => this.moveMeal(from, { dayIndex, mealIndex }) },
        ],
      });
      return;
    }
    this.moveMeal(from, { dayIndex, mealIndex });
  }

  private moveMeal(from: BoardCellRef, to: BoardCellRef): void {
    const sourceMeal = this.activeRows[from.dayIndex].meals[from.mealIndex];
    const targetMeal = this.activeRows[to.dayIndex].meals[to.mealIndex];
    targetMeal.alternatives = sourceMeal.alternatives;
    sourceMeal.alternatives = [];
  }

  // --- Duplicar (copiar, sin mover) una comida a otro día/patrón, mismo slot ---
  public async duplicateMealTo(dayIndex: number, mealIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (!meal.alternatives.length) return;

    const otherRows = this.activeRows
      .map((row, i) => ({ row, i }))
      .filter(({ i }) => i !== dayIndex);
    if (!otherRows.length) return;

    await this.ionicUtilService.showActionSheet({
      header: `Copiar "${meal.slot}" a...`,
      buttons: [
        ...otherRows.map(({ row, i }) => ({
          text: this.rowLabel(row),
          handler: () => {
            this.activeRows[i].meals[mealIndex].alternatives = meal.alternatives.map((alt) => ({
              label: alt.label,
              items: alt.items.map((item) => ({ ...item })),
            }));
          },
        })),
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
  }

  public trackByIndex(index: number): number {
    return index;
  }

  private mealValid(meal: TemplateMeal): boolean {
    const isMultiple = meal.alternatives.length >= 2;
    return meal.alternatives.every(
      (alt) =>
        alt.items.length > 0 &&
        alt.items.every((item) => !!(item.productId || item.recipeId)) &&
        (!isMultiple || alt.label.trim())
    );
  }

  public get canSave(): boolean {
    if (!this.name.trim()) return false;
    const rowsValid = this.activeRows.every((row) => row.meals.every((meal) => this.mealValid(meal)));
    if (!rowsValid) return false;
    if (this.mode === 'recurring') {
      return this.dayPatterns.every((p) => p.name.trim() && p.appliesTo.length > 0);
    }
    if (this.mode === 'choice') {
      return this.dayPatterns.every((p) => p.name.trim());
    }
    return true;
  }

  private mealsToSave(meals: TemplateMeal[]): DietTemplateMealPayload[] {
    return meals
      .filter((meal) => meal.alternatives.length > 0)
      .map((meal) => ({
        slot: meal.slot,
        alternatives: meal.alternatives
          .filter((alt) => alt.items.length > 0)
          .map((alt) => ({ label: alt.label.trim(), ...this.itemsToCustomEntries(alt.items) })),
      }));
  }

  public save(): void {
    if (!this.canSave || this.isSaving) return;
    this.isSaving = true;
    // Solo se envían las comidas con al menos una alternativa — un slot
    // vacío no aporta nada al aplicar la plantilla. Cada alimento se
    // convierte a formato "clipboard" (customProducts/customRecipes) — el
    // que realmente espera el backend, no el TemplateFoodItem de la UI.
    const daysToSave = this.days.map((day) => ({
      dayLabel: day.dayLabel.trim() || 'Día',
      meals: this.mealsToSave(day.meals),
    }));

    const dayPatternsToSave = this.dayPatterns.map((pattern) => ({
      name: pattern.name.trim() || 'Patrón',
      appliesTo: this.mode === 'recurring' ? pattern.appliesTo : [],
      meals: this.mealsToSave(pattern.meals),
    }));

    if (this.isCreatingForClient) {
      this.saveForClient(daysToSave, dayPatternsToSave);
      return;
    }

    this.dietTemplateApi.update(this.templateId, this.name.trim(), daysToSave, this.mode, dayPatternsToSave).subscribe({
      next: () => {
        this.isSaving = false;
        this.savedSnapshot = this.snapshot();
        this.ionicUtilService.showToast({ message: 'Plantilla guardada', duration: 2000 });
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast('No se pudo guardar la plantilla', 'Error', 3000);
      },
    });
  }

  // Dos pasos, en este orden:
  //   1. Crear la dieta de BIBLIOTECA propia del cliente (ownerClientId) —
  //      queda reutilizable, se puede volver a aplicar más adelante.
  //   2. Aplicarla como fase con las fechas que se eligieron en el modal.
  //
  // No se usa createDirect (plan-assignment-api.service.ts), que haría esto
  // en una sola llamada, precisamente porque ese endpoint crea SOLO la copia
  // congelada de la asignación: la dieta no quedaría en la biblioteca del
  // cliente y "crear una dieta suya" no habría creado ninguna.
  //
  // Si el paso 2 falla (lo normal: 409, las fechas pisan otra fase), el paso
  // 1 NO se deshace: la dieta ya construida es trabajo bueno que no hay por
  // qué tirar. Se dice que quedó guardada y que solo faltan las fechas, que
  // se pueden reelegir desde "Siguiente fase".
  private saveForClient(daysToSave: DietTemplateDayPayload[], dayPatternsToSave: DietTemplateDayPatternPayload[]): void {
    const fechas = this.phaseDates;
    if (!fechas) {
      this.isSaving = false;
      return;
    }

    this.dietTemplateApi
      .create(this.name.trim(), daysToSave, this.clientId, this.mode, dayPatternsToSave)
      .pipe(
        switchMap((creada) =>
          this.planAssignmentApi.apply(this.clientId, creada._id, {
            startDate: fechas.startDate,
            endMode: fechas.endMode,
            fixedEndDate: fechas.fixedEndDate,
            durationValue: fechas.durationValue,
            durationUnit: fechas.durationUnit,
          })
        )
      )
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({
            message: `Dieta creada y aplicada a ${this.clientName} desde el ${fechas.startDate}.`,
            duration: 3000,
          });
          this.router.navigate(['/tabs/clients', this.clientId]);
        },
        error: (err) => {
          this.isSaving = false;
          if (err?.status === 409) {
            // La dieta SÍ quedó creada (paso 1); solo faltan las fechas. No
            // hay cambios que perder al salir hacia la ficha del cliente.
            this.savedSnapshot = this.snapshot();
            this.ionicUtilService.showErrorToast(
              err?.error?.message ||
                `La dieta quedó guardada como dieta de ${this.clientName}, pero esas fechas se solapan con otra fase. Aplícala desde "Siguiente fase".`,
              'Fechas ocupadas',
              5000
            );
            this.router.navigate(['/tabs/clients', this.clientId]);
            return;
          }
          this.ionicUtilService.showErrorToast('No se pudo crear la dieta', 'Error', 3500);
        },
      });
  }

  private snapshot(): string {
    return JSON.stringify({
      name: this.name.trim(),
      mode: this.mode,
      days: this.days,
      dayPatterns: this.dayPatterns,
    });
  }

  public async canDeactivate(): Promise<boolean> {
    if (this.state !== 'loaded' || this.snapshot() === this.savedSnapshot) return true;
    return confirmDiscardChanges(this.ionicUtilService);
  }

  // El botón de la cabecera lo resuelve app-page-header; esto lo usa el
  // estado de error de la plantilla ("Volver").
  public goBack(): void {
    this.navigation.back();
  }
}
