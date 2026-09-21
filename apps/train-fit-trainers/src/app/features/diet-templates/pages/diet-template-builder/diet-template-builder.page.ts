import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
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
  DietTemplateMenuPayload,
  DietTemplateMealPayload,
  MEAL_SLOTS,
  TemplateMenu,
  TemplateFoodItem,
  TemplateMeal,
  TemplateMealAlternative,
} from '../../models/diet-template.model';
import { DayMealEditorModalComponent } from './components/day-meal-editor-modal/day-meal-editor-modal.component';
import { ClientDetailApiService } from '../../../clients/pages/client-detail/services/client-detail-api.service';
import {
  ClientNutritionPreferences,
  Supplement,
} from '../../../clients/pages/client-detail/models/client-detail.model';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { PhasePayload } from '../../../../shared/models/plan-assignment.model';
import { DietSuggestionApiService } from '../../services/diet-suggestion-api.service';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { alternativeTotals, MacroTotals } from '../../utils/alternative-macros';
import { computeItemMicros, TOTALS_NUTRIENT_FIELDS } from '../../utils/nutrient-fields';

type ViewState = 'loading' | 'error' | 'loaded';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// De quién es la dieta que se está tocando, cuando se llega con un cliente
// detrás:
//   'new'      — "Crear dieta": nace para él y se le aplica al guardar.
//   'own'      — plantilla SUYA (ownerClientId), abierta desde su ficha.
//   'shared'   — plantilla GENERAL de la biblioteca, abierta desde su ficha.
//   'assigned' — la copia YA ASIGNADA (fase/semana vigente o pasada): edita
//                esa copia in-place por su propio _id, nunca una plantilla
//                de biblioteca. Único modo que sirve también para semanas 2+
//                (sin sourceTemplateId).
// La distinción importa por lo que se puede prometer: en 'own'/'shared' se
// edita la plantilla, NUNCA la copia congelada que rige su plan (ver
// diet-template-schema.js), y en 'shared' además hay más clientes detrás.
type ClientContextKind = 'new' | 'own' | 'shared' | 'assigned' | 'next-week';

interface MacroTarget {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Lo que trae la navegación a "Crear dieta" (ver
// client-detail.page.ts#goToCreateDiet): sin formulario previo, name/
// startDate llegan ya con sus defaults (vacío/hoy) — el cajón de sugerencias
// ("empezar de cero") sí manda los suyos ya decididos, más `phase` (nombre y
// objetivo de la fase). El contenido se construye en esta misma pantalla; al
// guardar se crea la dieta propia del cliente y se aplica como fase de una
// vez.
interface ForClientNavigationState {
  clientName?: string;
  name?: string;
  startDate?: string;
  phase?: PhasePayload;
  // Sugerencias de dieta — "Editar antes de aplicar" (diet-suggestion-drawer):
  // contenido de la plantilla elegida, para precargar el tablero en vez de
  // arrancar en blanco. La plantilla elegida en sí nunca se toca.
  prefill?: { name: string; menus: DietTemplateMenuPayload[] };
}

interface BoardCellRef {
  dayIndex: number;
  mealIndex: number;
}

// Portapapeles del tablero — una COMIDA (celda) o un MENÚ entero. Mientras
// hay algo copiado el tablero entra en "modo copia": solo se ofrece pegar en
// el mismo tipo de destino (comida -> comidas, menú -> menús) y el resto de
// iconos/inputs quedan bloqueados hasta pegar o cancelar.
type BoardClipboard =
  | { kind: 'meal'; source: BoardCellRef; label: string; alternatives: TemplateMealAlternative[] }
  | { kind: 'day'; sourceIndex: number; label: string; meals: TemplateMeal[] };

// Replanteamiento MVP (nutrición) — constructor de la plantilla: MENÚS con
// sus 6 comidas fijas (mismo enum que DietDay real), cada comida con una o
// varias alternativas (mismo patrón multi-alternativa que
// client-detail.page.ts #panel de pautar). Se guarda explícitamente (sin
// autosave) para no disparar un PUT por cada pulsación.
@Component({
  selector: 'app-diet-template-builder',
  templateUrl: 'diet-template-builder.page.html',
  styleUrls: ['diet-template-builder.page.scss'],
})
export class DietTemplateBuilderPage implements OnInit, AfterViewInit, OnDestroy, PendingChangesComponent {
  public state: ViewState = 'loading';

  // Referencia de "lo último guardado" (pendingChangesGuard): el builder no
  // autoguarda — una dieta a medio componer se pierde entera al salir.
  private savedSnapshot = '';
  public templateId = '';
  public name = '';
  public menus: TemplateMenu[] = [];
  public isSaving = false;
  public readonly mealSlots = MEAL_SLOTS;
  public readonly maxMenus = 10;

  // TAREA5 (auditoría UX, Fase C) — tablero semanal: días × comidas en
  // rejilla, en vez del acordeón día→comida→alimentos anterior. Una celda
  // se edita en DayMealEditorModalComponent (ver ese archivo para el porqué
  // de un modal real en vez de un panel propio), y se puede arrastrar
  // entera (con todas sus alternativas) a otra celda para moverla, o
  // duplicarla a otro día sin moverla del origen.
  private draggedFrom: BoardCellRef | null = null;
  public dragOverCell: BoardCellRef | null = null;

  // Celda "en edición": la última en la que se abrió el editor de comida,
  // marcada en naranja hasta que se abra otra — así, al volver del modal, el
  // entrenador ve de un vistazo dónde estaba sin tener que releer la rejilla.
  public activeCell: BoardCellRef | null = null;

  // Portapapeles de copiar/pegar — ver copyCell()/copyDay() y pasteCell()/
  // pasteDay() más abajo (unificar vs sobrescribir si el destino ya tiene
  // comida). Se pinta en el panel lateral derecho del tablero.
  public clipboard: BoardClipboard | null = null;
  private readonly maxAlternatives = 4;

  // Panel lateral del portapapeles. Se traslada al body al montar (mismo
  // patrón que supplements-panel): dentro de ion-content su position:fixed
  // lo captura el `contain` del scroll y no se pega al borde de la ventana.
  @ViewChild('clipboardHost', { static: true }) private clipboardHost!: ElementRef<HTMLElement>;

  // Sugerencias de dieta — aptitud dietética. `suitableForDerived` lo calcula
  // el backend en cada guardado (solo lectura aquí); `suitableForOverride`
  // son las que el entrenador fuerza cuando la deriva no basta (productos sin
  // el flag rellenado). Solo aplican al editar una plantilla ya guardada.
  public readonly dietaryFlagOptions: { key: string; label: string }[] = [
    { key: 'vegan', label: 'Vegana' },
    { key: 'vegetarian', label: 'Vegetariana' },
    { key: 'lactoseFree', label: 'Sin lactosa' },
    { key: 'glutenFree', label: 'Sin gluten' },
  ];
  public suitableForDerived: string[] = [];
  public suitableForOverride = new Set<string>();

  // "Crear dieta" (ver diet-templates-routing.module.ts, ruta
  // for-client/:clientId) — mismo tablero, pero sin plantilla que cargar:
  // guardar crea una dieta de biblioteca PROPIA de este cliente
  // (ownerClientId), que no rige hasta aplicarse como fase.
  public isCreatingForClient = false;
  public clientId = '';
  public clientName = '';
  // Editar la dieta YA ASIGNADA a un cliente (ver diet-templates-routing.module.ts,
  // ruta edit-assignment/:clientId/:planId) — guardar hace PUT sobre esa
  // copia por su propio _id, nunca crea ni aplica nada nuevo.
  public isEditingAssignedCopy = false;
  private assignedPlanId = '';
  // Desde cuándo se aplica la fase al guardar — hoy por defecto (ver
  // startForClient), o lo que traiga la navegación (cajón de sugerencias).
  private phaseStartDate = '';
  // g/kg del cajón de sugerencias: aquí no se editan, se pasan tal cual al
  // aplicar.
  private phaseProteinPerKg: number | null = null;
  private phaseFatPerKg: number | null = null;
  // El objetivo de la fase lo teclea el entrenador aquí (o llega ya decidido
  // del cajón): `clientTargetSource` dice si sigue siendo el calculado.
  public clientTargetSource: 'calculated' | 'manual' = 'calculated';

  // Preparar la SIGUIENTE semana de una fase (ruta next-week/
  // :clientId/:phaseId?kcal=): entra con el contenido vigente escalado a
  // esas kcal, se retoca y al guardar se persiste (o no, si no cambia nada
  // — el servidor responde 204).
  public isPreparingNextWeek = false;
  private nextWeekPhaseId = '';
  // Reparto elegido en el modal (kcal de referencia + gramos), o null.
  private nextWeekTarget: MacroTarget | null = null;
  public nextWeekNumber = 0;
  public nextWeekRange = '';
  public nextWeekKcal = 0;
  public nextWeekBaseKcal = 0;
  public rescaling = false;

  // --- Contexto de cliente (2026-09) ---
  //
  // Antes esta pantalla era idéntica viniera de donde viniera: al abrir la
  // plantilla de una fase desde la ficha de un cliente no se decía de quién
  // era, ni contra qué cifras había que ajustarla — el objetivo que la
  // fase tiene que cumplir se quedaba en la pantalla anterior, justo cuando
  // hace falta para montar las comidas.
  public clientContextKind: ClientContextKind | null = null;
  // Alergias/preferencias y suplementación del cliente: al construir una
  // dieta para alguien concreto, lo que NO puede llevar pesa tanto como las
  // kcal (docs/plan-semanas.md/§6).
  public clientPreferences: ClientNutritionPreferences | null = null;
  public clientSupplements: Supplement[] = [];
  public clientContextName = '';
  public clientTarget: MacroTarget | null = null;
  public clientTargetLabel = '';
  // Cliente del que se viene al EDITAR una plantilla (ruta :id) — llega por
  // query param desde openPhaseTemplate en la ficha.
  private fromClientId = '';

  // Iniciales para el avatar de la tarjeta de contexto (mismo criterio que
  // la ficha del cliente: primera y última palabra del nombre).
  public get clientInitials(): string {
    const parts = (this.clientContextName || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }

  // Margen con el que un día se da por bueno contra el objetivo. No hay un
  // estándar: ±100 kcal es el escalón con el que ya trabaja el cajón de
  // sugerencias (mueve el delta de 100 en 100) y ±10 g es el grano al que
  // se pauta una comida.
  private readonly targetTolerance = { kcal: 100, macro: 10 };

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
    private recipeService: RecipeService,
    private dietSuggestionApi: DietSuggestionApiService,
    private clientDetailApi: ClientDetailApiService
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
      const planId = params.get('planId');
      const phaseId = params.get('phaseId');
      if (clientId && phaseId) {
        this.startForNextWeek(clientId, phaseId);
        return;
      }
      if (clientId && planId) {
        this.startForAssignedCopy(clientId, planId);
        return;
      }
      if (clientId) {
        this.startForClient(clientId);
        return;
      }
      this.templateId = params.get('id') || '';
      // De qué cliente se viene, si se viene de alguno (ver openPhaseTemplate
      // en la ficha). Por query param para que un F5 no lo pierda.
      const query = this.route.snapshot.queryParamMap;
      this.fromClientId = query.get('clientId') || '';
      this.clientContextName = query.get('name') || 'este cliente';
      this.load();
    });
  }

  // Sin plantilla que cargar — arranca en blanco, listo para construir.
  // "Crear dieta" ya no pasa por ningún formulario previo (el nutricionista
  // improvisa semana a semana, una duración estimada de antemano no le sirve
  // de nada — ver client-detail.page.ts#goToCreateDiet): nombre en blanco,
  // editable aquí mismo (campo de arriba), y fase abierta desde HOY sin fin
  // estimado. El objetivo de la fase (foco/delta/ritmo) se pone aquí (bloque
  // "Objetivo de la fase"); el cajón de sugerencias ("empezar de cero") lo
  // manda ya decidido junto con `name`/`startDate` — se respetan tal cual.
  private startForClient(clientId: string): void {
    const nav = this.navigationState;
    this.isCreatingForClient = true;
    this.clientId = clientId;
    this.clientName = nav.clientName || 'este cliente';
    this.name = nav.name || '';
    this.phaseStartDate = nav.startDate || todayIsoDate();
    if (nav.phase) {
      this.phaseProteinPerKg = nav.phase.proteinPerKg ?? null;
      this.phaseFatPerKg = nav.phase.fatPerKg ?? null;
      if (nav.phase.target) {
        this.clientTarget = { ...nav.phase.target };
        this.clientTargetSource = nav.phase.target.source;
      }
    }
    this.clientContextKind = 'new';
    this.clientContextName = this.clientName;
    // Si se llegó desde el cajón ("empezar de cero"), el objetivo ya viene
    // decidido. Si se llegó por "Crear dieta" a secas, se calcula aquí con
    // los datos del cliente — es lo primero que hay que ver para montar las
    // comidas (docs/plan-semanas.md).
    if (this.clientTarget) {
      this.clientTargetLabel = 'Objetivo de la fase';
    } else {
      this.loadClientGoal(clientId);
    }
    this.loadClientContext(clientId);
    if (nav.prefill) {
      this.applyTemplate(nav.prefill as unknown as DietTemplate);
    } else {
      this.menus = [];
    }
    this.savedSnapshot = this.snapshot();
    this.state = 'loaded';
  }

  // Editar la copia YA ASIGNADA de un cliente — por su propio _id, nunca por
  // sourceTemplateId (las semanas 2+ creadas con "Siguiente semana" no lo
  // tienen). Nunca toca ninguna plantilla de biblioteca.
  private startForAssignedCopy(clientId: string, planId: string): void {
    this.isEditingAssignedCopy = true;
    this.assignedPlanId = planId;
    this.clientId = clientId;
    this.clientName = this.route.snapshot.queryParamMap.get('name') || 'este cliente';
    this.clientContextKind = 'assigned';
    this.clientContextName = this.clientName;

    this.planAssignmentApi.getContent(clientId, planId).subscribe({
      next: (plan) => {
        this.loadClientTarget(clientId, plan.phaseId || plan._id, plan.startDate);
        this.applyTemplate(plan as unknown as DietTemplate);
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Preparar la siguiente semana: contenido de la semana vigente ya escalado a
  // las kcal elegidas en el modal (query param). Nunca toca la semana actual.
  private startForNextWeek(clientId: string, phaseId: string): void {
    this.isPreparingNextWeek = true;
    this.nextWeekPhaseId = phaseId;
    this.clientId = clientId;
    this.clientName = this.route.snapshot.queryParamMap.get('name') || 'este cliente';
    this.clientContextKind = 'next-week';
    this.clientContextName = this.clientName;
    const query = this.route.snapshot.queryParamMap;
    const kcal = Number(query.get('kcal')) || 0;
    // Reparto ajustado en el modal "Siguiente semana" (p/c/f en gramos):
    // se enseña como objetivo de la semana, con deltas por fila. Sin él, el
    // escalado proporcional ya lo cumple todo y no hay nada que comparar.
    const protein = Number(query.get('p'));
    const carbs = Number(query.get('c'));
    const fat = Number(query.get('f'));
    this.nextWeekTarget =
      kcal > 0 && [protein, carbs, fat].every((n) => Number.isFinite(n) && n >= 0) && protein + carbs + fat > 0
        ? { kcal, protein, carbs, fat }
        : null;
    this.loadScaledNextWeek(kcal);
  }

  // Al reescalar a otras kcal, el objetivo de la semana se mueve en la misma
  // proporción: el reparto (%) que eligió el entrenador se mantiene.
  private nextWeekTargetAt(kcal: number): MacroTarget | null {
    const t = this.nextWeekTarget;
    if (!t || !(t.kcal > 0) || !(kcal > 0)) return null;
    const factor = kcal / t.kcal;
    return {
      kcal: Math.round(kcal),
      protein: Math.round(t.protein * factor),
      carbs: Math.round(t.carbs * factor),
      fat: Math.round(t.fat * factor),
    };
  }

  private loadScaledNextWeek(kcal: number): void {
    this.rescaling = true;
    this.dietSuggestionApi.scaleNextWeek(this.clientId, this.nextWeekPhaseId, kcal || 1).subscribe({
      next: (scaled) => {
        this.nextWeekNumber = scaled.weekNumber;
        this.nextWeekRange = scaled.end
          ? `${this.fmtDay(scaled.start)} – ${this.fmtDay(scaled.end)}`
          : `desde ${this.fmtDay(scaled.start)}`;
        this.nextWeekBaseKcal = scaled.baseKcal;
        this.nextWeekKcal = kcal || scaled.baseKcal;
        this.applyTemplate({
          name: `S${scaled.weekNumber}`,
          menus: scaled.content.menus as DietTemplateMenuPayload[],
        } as unknown as DietTemplate);
        this.clientTarget = this.nextWeekTargetAt(this.nextWeekKcal);
        this.clientTargetLabel = `Objetivo de S${scaled.weekNumber}`;
        this.rescaling = false;
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.rescaling = false;
        this.state = 'error';
      },
    });
  }

  // Cambiar las kcal desde el propio builder: se vuelve a pedir el contenido
  // escalado (mismo % a todo). Pisa los retoques hechos a mano, así que se
  // avisa antes si los hay.
  public async rescaleNextWeek(): Promise<void> {
    if (!this.isPreparingNextWeek || !(this.nextWeekKcal > 0)) return;
    if (this.snapshot() !== this.savedSnapshot) {
      const ok = await confirmDiscardChanges(this.ionicUtilService);
      if (!ok) return;
    }
    this.loadScaledNextWeek(this.nextWeekKcal);
  }

  private fmtDay(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });
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
        // `ownerClientId` decide qué se puede decir del banner: una plantilla
        // suya es "su dieta"; una general la comparte con otros clientes y
        // tocarla les afecta a todos.
        if (this.fromClientId) {
          const owner = template.ownerClientId ? String(template.ownerClientId) : '';
          this.clientContextKind = owner === this.fromClientId ? 'own' : 'shared';
          this.loadClientTarget(this.fromClientId);
        }
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Alergias, preferencias y suplementación del cliente: lo que condiciona
  // QUÉ alimentos se pueden pautar, junto al objetivo. Silencioso si falla:
  // es contexto, no hace falta para construir.
  private loadClientContext(clientId: string): void {
    this.clientDetailApi.getNutritionPreferences(clientId).subscribe({
      next: (preferences) => (this.clientPreferences = preferences),
      error: () => (this.clientPreferences = null),
    });
    this.clientDetailApi.getSupplements(clientId).subscribe({
      next: (supplements) => (this.clientSupplements = (supplements || []).filter((s) => s.active !== false)),
      error: () => (this.clientSupplements = []),
    });
  }

  // El objetivo nutricional del cliente, tal cual lo ve él en su app: es el
  // punto de partida de la dieta que se va a construir.
  private loadClientGoal(clientId: string): void {
    this.clientDetailApi.getNutritionalGoal(clientId).subscribe({
      next: (res) => {
        const goal = res?.goal;
        const calculated = res?.calculated?.target;
        if (goal) {
          this.clientTarget = {
            kcal: goal.kcalTotal,
            protein: goal.proteinsGTotal,
            carbs: goal.carbohydratesGTotal,
            fat: goal.fatGTotal,
          };
          this.clientTargetSource = goal.source;
        } else if (calculated) {
          this.clientTarget = { ...calculated };
          this.clientTargetSource = 'calculated';
        }
        this.clientTargetLabel = 'Objetivo de la fase';
      },
      error: () => undefined,
    });
  }

  // El entrenador teclea el objetivo en la card de contexto: deja de ser el
  // calculado y es lo que se guardará como objetivo de la fase.
  public onClientTargetEdited(): void {
    this.clientTargetSource = 'manual';
  }

  // Referencia contra la que ajustar: la necesidad calculada de la semana
  // (misma cuenta que ve el entrenador en su resumen). Sin `phaseId`, la de
  // la fase activa del cliente; `date` elige la semana que la contiene
  // (una copia asignada), si no la que corre. Sin fase, no hay referencia.
  private loadClientTarget(clientId: string, phaseId?: string | null, date?: string | null): void {
    const phaseId$ = phaseId
      ? of(phaseId)
      : this.planAssignmentApi.getActive(clientId).pipe(map((active) => (active ? active.phaseId || active._id : null)));
    phaseId$
      .pipe(
        switchMap((id) => {
          if (!id) return of(null);
          return this.dietSuggestionApi.getPhaseWeeks(clientId, id).pipe(
            switchMap((weeks) => {
              const windows = weeks.weeks || [];
              const number =
                (date && windows.find((w) => w.start <= date && (!w.end || date <= w.end))?.number) ||
                weeks.current?.number ||
                1;
              return this.dietSuggestionApi.getWeekNeed(clientId, id, number);
            })
          );
        })
      )
      .subscribe({
        next: (res) => {
          const target = res?.need?.target;
          if (!res || !target) return;
          this.clientTarget = { kcal: target.kcal, protein: target.protein, carbs: target.carbs, fat: target.fat };
          this.clientTargetLabel = `Necesidad de S${res.weekNumber}`;
        },
        // En silencio: la referencia ayuda a ajustar, no hace falta para
        // editar. Un error aquí no debe estorbar el trabajo de la pantalla.
        error: () => undefined,
      });
  }

  private applyTemplate(template: DietTemplate): void {
    this.name = template.name;
    this.menus = (template.menus || []).map((menu: any) => ({
      name: menu.name,
      meals: this.mealsFromPayload(menu.meals),
    }));
    this.suitableForDerived = template.suitableFor || [];
    this.suitableForOverride = new Set(template.suitableForOverride || []);
  }

  // Sugerencias de dieta — la aptitud efectiva que verá el filtro del cajón.
  public isSuitable(flag: string): boolean {
    return this.suitableForDerived.includes(flag) || this.suitableForOverride.has(flag);
  }

  public isForced(flag: string): boolean {
    return !this.suitableForDerived.includes(flag) && this.suitableForOverride.has(flag);
  }

  public toggleSuitableOverride(flag: string): void {
    // No tiene sentido "forzar" algo que la deriva ya da por bueno.
    if (this.suitableForDerived.includes(flag)) return;
    if (this.suitableForOverride.has(flag)) this.suitableForOverride.delete(flag);
    else this.suitableForOverride.add(flag);
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
  public ngAfterViewInit(): void {
    document.body.appendChild(this.clipboardHost.nativeElement);
  }

  // El portal ya no cuelga de la página: hay que retirarlo a mano.
  public ngOnDestroy(): void {
    this.clipboardHost?.nativeElement?.remove();
  }

  public get activeRows(): TemplateMenu[] {
    return this.menus;
  }

  public get activeRowsLimit(): number {
    return this.maxMenus;
  }

  public get emptyRowsHint(): string {
    return 'Añade el primer menú para empezar.';
  }

  public rowLabel(row: TemplateMenu): string {
    return row.name;
  }

  public setRowLabel(row: TemplateMenu, value: string): void {
    row.name = value;
  }

  // El nombre de un menú es la CLAVE con la que el cliente lo elige, así que
  // dos menús no pueden llamarse igual. Se avisa aquí en vez de dejar que el
  // backend lo renombre solo: el entrenador debe ver el nombre que verá su
  // cliente.
  public get duplicateMenuNamesWarning(): string {
    const names = this.menus.map((menu) => menu.name.trim());
    const repeated = names.filter((name, i) => name && names.indexOf(name) !== i);
    return [...new Set(repeated)].join(', ');
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
        const product = typeof cp.product === 'object' ? cp.product : undefined;
        return {
          productId: typeof cp.product === 'string' ? cp.product : cp.product?._id,
          productName: cp.product?.name || 'Alimento guardado',
          quantity: cp.quantity,
          kcal: macros.kcal,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          micros: computeItemMicros(this.customProductService, this.recipeService, {
            product,
            quantity: cp.quantity,
          }),
          // Cacheado para edición de cantidad in situ (ver day-meal-editor-modal
          // .onQuantityChange) — solo disponible cuando cp.product ya venía
          // poblado (siempre, salvo datos muy antiguos).
          product,
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
        const recipe = typeof cr.recipe === 'object' ? cr.recipe : undefined;
        return {
          recipeId: typeof cr.recipe === 'string' ? cr.recipe : cr.recipe?._id,
          recipeName: cr.recipe?.name || 'Receta guardada',
          quantity: cr.quantity,
          kcal: macros.kcal,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          micros: computeItemMicros(this.customProductService, this.recipeService, {
            recipe,
            quantity: cr.quantity,
            addedCustomProducts: cr.addedCustomProducts,
            modifiedBaseCustomProducts: cr.modifiedBaseCustomProducts,
            removedBaseCustomProductIds: cr.removedBaseCustomProductIds,
          }),
          recipe,
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
    if (this.menus.length >= this.maxMenus) return;
    this.menus.push({
      name: `Menú ${this.menus.length + 1}`,
      meals: this.mealSlots.map((slot) => ({ slot, alternatives: [] })),
    });
  }

  public removeRow(index: number): void {
    this.activeRows.splice(index, 1);

    // El botón de eliminar no existe en modo copia (ver html), así que el
    // portapapeles nunca apunta a una fila que se esté quitando.
    if (this.activeCell?.dayIndex === index) {
      this.activeCell = null;
    } else if (this.activeCell && this.activeCell.dayIndex > index) {
      this.activeCell = { ...this.activeCell, dayIndex: this.activeCell.dayIndex - 1 };
    }
  }

  // F20-septies — total de macros del día/patrón: suma la PRIMERA
  // alternativa de cada comida (la que rige cuando no hay elección — con
  // 2+ alternativas no hay un "total real" único, esta es la lectura más
  // representativa sin inventar una media rara). kcal/protein/carbs/fat de
  // cada TemplateFoodItem ya vienen calculados para su quantity actual
  // (mismo snapshot que pinta el resto del builder), no hace falta volver
  // a tocar producto/receta real.
  public dayTotals(row: TemplateMenu): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    micros: Record<string, number>;
  } {
    const totals = { kcal: 0, protein: 0, carbs: 0, fat: 0, micros: {} as Record<string, number> };
    for (const meal of row.meals) {
      for (const item of meal.alternatives?.[0]?.items || []) {
        totals.kcal += item.kcal || 0;
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
        for (const field of TOTALS_NUTRIENT_FIELDS) {
          totals.micros[field.key] = (totals.micros[field.key] || 0) + (item.micros?.[field.key] || 0);
        }
      }
    }
    return totals;
  }

  // Filas de micronutrientes/macros secundarios con datos reales en este
  // día — mismo criterio que ProductDetailPanelComponent.buildRows(): un
  // campo sin ningún alimento que lo aporte no pinta fila vacía a "0 mg".
  public dayMicroRows(row: TemplateMenu): { label: string; value: number; unit: string }[] {
    const micros = this.dayTotals(row).micros;
    return TOTALS_NUTRIENT_FIELDS.filter((field) => micros[field.key] > 0).map((field) => ({
      label: field.label,
      value: micros[field.key] * field.toDisplay,
      unit: field.unit,
    }));
  }

  public hasAnyItems(row: TemplateMenu): boolean {
    return row.meals.some((meal) => (meal.alternatives?.[0]?.items?.length || 0) > 0);
  }

  // Contexto de cliente — cuánto se desvía este día del objetivo, para poder
  // ajustar sin salir a mirar la cifra a otra pantalla. null cuando no hay
  // cliente detrás (plantilla de biblioteca sin más) o el día está vacío:
  // "-2200 kcal" sobre un día sin alimentos no informa de nada.
  public targetDeviation(row: TemplateMenu): MacroTarget | null {
    if (!this.clientTarget || !this.hasAnyItems(row)) return null;
    const totals = this.dayTotals(row);
    return {
      kcal: Math.round(totals.kcal - this.clientTarget.kcal),
      protein: Math.round(totals.protein - this.clientTarget.protein),
      carbs: Math.round(totals.carbs - this.clientTarget.carbs),
      fat: Math.round(totals.fat - this.clientTarget.fat),
    };
  }

  public deviationLabel(value: number): string {
    // El signo SIEMPRE, también en el 0 ("±0"): un número pelado al lado de
    // los gramos del total se confunde con otro total más.
    if (value === 0) return '±0';
    return `${value > 0 ? '+' : '−'}${Math.abs(value)}`;
  }

  public isOnTarget(value: number, kind: 'kcal' | 'macro'): boolean {
    return Math.abs(value) <= this.targetTolerance[kind];
  }

  // Proporción de cada macro sobre el total de KCAL del día (no de gramos:
  // 1g de grasa aporta más del doble de kcal que 1g de proteína/carbo, una
  // barra por gramos sería visualmente engañosa) — para la barra
  // segmentada bajo el número de kcal.
  public macroBarSegments(row: TemplateMenu): {
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
  // columnas sin abrir el editor. Mismo cálculo que el editor de comida
  // (utils/alternative-macros.ts).
  public alternativeTotals(alt: TemplateMealAlternative): MacroTotals | null {
    return alternativeTotals(alt);
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

  // alternatives.length > 0 NO basta para "tiene comida": abrir el editor de
  // una celda vacía ya le mete una alternativa placeholder (ver
  // openMealEditor) aunque no se elija ningún alimento, así que con solo esa
  // condición la celda se quedaba naranja para siempre nada más abrirla.
  public mealHasFood(meal: TemplateMeal): boolean {
    return meal.alternatives.some((alt) => alt.items.some((item) => item.productId || item.recipeId));
  }

  // Igual que mealHasFood pero para la fila entera — hasAnyItems() no sirve
  // aquí porque cuenta el placeholder `{}` que deja abrir el editor.
  public rowHasFood(row: TemplateMenu): boolean {
    return row.meals.some((meal) => this.mealHasFood(meal));
  }

  // --- Editor de celda (día × comida) ---
  // meal se pasa por referencia al modal: las mutaciones que haga dentro
  // (añadir/quitar alternativas, alimentos...) se reflejan directamente
  // aquí, en el mismo objeto que vive dentro de menus — no hace
  // falta releer nada al cerrar.
  public async openMealEditor(dayIndex: number, mealIndex: number): Promise<void> {
    // En modo copia la celda solo admite "Pegar" (icono propio) — el click
    // en el cuerpo no abre el editor.
    if (this.copyMode) return;
    const row = this.activeRows[dayIndex];
    const meal = row.meals[mealIndex];
    // Siempre se edita con al menos una alternativa visible en pantalla,
    // aunque la celda esté vacía — igual que el panel de "Pautar" en
    // client-detail.page.ts.
    if (!meal.alternatives.length) {
      meal.alternatives.push({ label: '', items: [{}] });
    }

    this.activeCell = { dayIndex, mealIndex };

    await this.ionicUtilService.showModal({
      component: DayMealEditorModalComponent,
      componentProps: { meal, menuName: this.rowLabel(row) },
      cssClass: 'tf-panel-modal',
    });
  }

  // --- Arrastrar y soltar: mover una comida completa (con todas sus
  // alternativas) de una celda a otra. Si el destino ya tiene algo, pide
  // confirmación antes de sobrescribir — perder una comida ya compuesta por
  // un arrastre accidental sería un desastre silencioso. ---
  public onCellDragStart(dayIndex: number, mealIndex: number, event: DragEvent): void {
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (this.copyMode || !meal.alternatives.length) {
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

  // --- Copiar/pegar (portapapeles) ---
  // Copiar solo guarda una copia local (no mueve ni toca nada) y entra en
  // "modo copia": el panel lateral muestra lo copiado, y en el tablero solo
  // queda el icono de pegar en los destinos del mismo tipo (comida -> otras
  // comidas, día -> otros días); el resto de iconos e inputs se bloquean
  // hasta pegar y cancelar (o Escape). Si el destino ya tiene comida real,
  // se pregunta si se unifica (se añade como alternativa más) o se
  // sobrescribe.
  public get copyMode(): boolean {
    return this.clipboard !== null;
  }

  public get copyingMeal(): boolean {
    return this.clipboard?.kind === 'meal';
  }

  public get copyingDay(): boolean {
    return this.clipboard?.kind === 'day';
  }

  @HostListener('document:keydown.escape')
  public clearClipboard(): void {
    this.clipboard = null;
  }

  public copyCell(dayIndex: number, mealIndex: number, event: Event): void {
    event.stopPropagation();
    const row = this.activeRows[dayIndex];
    const meal = row.meals[mealIndex];
    if (!this.mealHasFood(meal)) return;
    this.clipboard = {
      kind: 'meal',
      source: { dayIndex, mealIndex },
      label: `${this.rowLabel(row)} · ${meal.slot}`,
      alternatives: this.cloneAlternatives(meal.alternatives),
    };
  }

  public copyDay(dayIndex: number, event: Event): void {
    event.stopPropagation();
    const row = this.activeRows[dayIndex];
    if (!this.rowHasFood(row)) return;
    this.clipboard = {
      kind: 'day',
      sourceIndex: dayIndex,
      label: this.rowLabel(row),
      meals: row.meals.map((meal) => ({ slot: meal.slot, alternatives: this.cloneAlternatives(meal.alternatives) })),
    };
  }

  public isClipboardSource(dayIndex: number, mealIndex: number): boolean {
    return (
      this.clipboard?.kind === 'meal' &&
      this.clipboard.source.dayIndex === dayIndex &&
      this.clipboard.source.mealIndex === mealIndex
    );
  }

  public isDayClipboardSource(dayIndex: number): boolean {
    return this.clipboard?.kind === 'day' && this.clipboard.sourceIndex === dayIndex;
  }

  // Comidas del portapapeles que tienen algo — para el panel lateral en
  // modo día (los huecos vacíos del día copiado no aportan nada ahí).
  public get clipboardMeals(): TemplateMeal[] {
    return this.clipboard?.kind === 'day' ? this.clipboard.meals.filter((meal) => this.mealHasFood(meal)) : [];
  }

  public async pasteCell(dayIndex: number, mealIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const clip = this.clipboard;
    if (clip?.kind !== 'meal') return;
    const targetMeal = this.activeRows[dayIndex].meals[mealIndex];

    if (!this.mealHasFood(targetMeal)) {
      targetMeal.alternatives = this.cloneAlternatives(clip.alternatives);
      return;
    }

    await this.ionicUtilService.showActionSheet({
      header: `"${targetMeal.slot}" ya tiene comida`,
      buttons: [
        {
          text: 'Unificar (añadir como alternativa)',
          handler: () => this.mergeAlternativesInto(targetMeal, clip.alternatives),
        },
        {
          text: 'Sobrescribir',
          role: 'destructive',
          handler: () => {
            targetMeal.alternatives = this.cloneAlternatives(clip.alternatives);
          },
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
  }

  // Pegar un día entero: comida a comida, por posición de hueco (los slots
  // son fijos y van en el mismo orden en todas las filas, ver addRow).
  public async pasteDay(dayIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const clip = this.clipboard;
    if (clip?.kind !== 'day') return;
    const row = this.activeRows[dayIndex];

    const overwrite = (): void => {
      row.meals.forEach((meal, i) => {
        meal.alternatives = this.cloneAlternatives(clip.meals[i]?.alternatives || []);
      });
    };

    if (!this.rowHasFood(row)) {
      overwrite();
      return;
    }

    await this.ionicUtilService.showActionSheet({
      header: `"${this.rowLabel(row)}" ya tiene comida`,
      buttons: [
        {
          text: 'Unificar (añadir como alternativas)',
          handler: () => {
            row.meals.forEach((meal, i) => {
              const source = clip.meals[i]?.alternatives || [];
              if (source.length) this.mergeAlternativesInto(meal, source);
            });
          },
        },
        { text: 'Sobrescribir', role: 'destructive', handler: overwrite },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
  }

  private cloneAlternatives(alternatives: TemplateMealAlternative[]): TemplateMealAlternative[] {
    return alternatives.map((alt) => ({ label: alt.label, items: alt.items.map((item) => ({ ...item })) }));
  }

  private mergeAlternativesInto(targetMeal: TemplateMeal, alternatives: TemplateMealAlternative[]): void {
    const merged = [...targetMeal.alternatives, ...this.cloneAlternatives(alternatives)];
    if (merged.length > this.maxAlternatives) {
      this.ionicUtilService.showToast({
        message: `Solo se han añadido hasta ${this.maxAlternatives} alternativas por comida.`,
        duration: 2500,
      });
    }
    targetMeal.alternatives = merged.slice(0, this.maxAlternatives);
  }

  // --- Vaciar una celda (quita la comida, sin borrar el día/patrón) ---
  public async clearCell(dayIndex: number, mealIndex: number, event: Event): Promise<void> {
    event.stopPropagation();
    const row = this.activeRows[dayIndex];
    const meal = row.meals[mealIndex];

    await this.ionicUtilService.showAlert({
      header: `¿Vaciar "${this.rowLabel(row)} · ${meal.slot}"?`,
      message: 'Se eliminan los alimentos de esta comida.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Vaciar', role: 'destructive', handler: () => (meal.alternatives = []) },
      ],
    });
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByLabel(_index: number, row: { label: string }): string {
    return row.label;
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
    if (!this.menus.every((menu) => menu.meals.every((meal) => this.mealValid(meal)))) return false;
    if (!this.menus.every((menu) => menu.name.trim())) return false;
    return !this.duplicateMenuNamesWarning;
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
    const menusToSave = this.menus.map((menu, i) => ({
      name: menu.name.trim() || `Menú ${i + 1}`,
      meals: this.mealsToSave(menu.meals),
    }));

    if (this.isPreparingNextWeek) {
      this.saveNextWeek(menusToSave);
      return;
    }

    if (this.isEditingAssignedCopy) {
      this.saveAssignedCopy(menusToSave);
      return;
    }

    if (this.isCreatingForClient) {
      this.saveForClient(menusToSave);
      return;
    }

    this.dietTemplateApi
      .update(this.templateId, this.name.trim(), menusToSave, [...this.suitableForOverride])
      .subscribe({
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
  private saveForClient(menusToSave: DietTemplateMenuPayload[]): void {
    const startDate = this.phaseStartDate || todayIsoDate();
    // Toda dieta nueva arranca una FASE (phaseId propio) con el objetivo que
    // se ve arriba: el del cliente, o el que el entrenador haya tecleado.
    const target = this.clientTarget;
    const phase: PhasePayload = {
      name: this.name.trim(),
      target: target
        ? {
            kcal: Math.round(target.kcal),
            protein: Math.round(target.protein),
            carbs: Math.round(target.carbs),
            fat: Math.round(target.fat),
            source: this.clientTargetSource,
          }
        : null,
      proteinPerKg: this.phaseProteinPerKg,
      fatPerKg: this.phaseFatPerKg,
    };

    this.dietTemplateApi
      .create(this.name.trim(), menusToSave, this.clientId)
      .pipe(switchMap((creada) => this.planAssignmentApi.apply(this.clientId, creada._id, { startDate, phase })))
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({
            message: `Dieta creada y aplicada a ${this.clientName} desde el ${startDate}.`,
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

  // Persistir la siguiente semana. 204 (null) = el contenido es igual al que
  // heredaría: no se escribe nada y se dice.
  private saveNextWeek(menusToSave: DietTemplateMenuPayload[]): void {
    this.dietSuggestionApi
      .prepareNextWeek(this.clientId, this.nextWeekPhaseId, { menus: menusToSave })
      .subscribe({
        next: (week) => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({
            message: week
              ? `S${this.nextWeekNumber} preparada para ${this.clientName}`
              : `Sin cambios: S${this.nextWeekNumber} repetirá lo anterior`,
            duration: 3000,
          });
          this.router.navigate(['/tabs/clients', this.clientId]);
        },
        error: (err) => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo preparar la semana', 'Error', 3500);
        },
      });
  }

  // PUT directo sobre la copia asignada (su propio _id) — nunca crea ni
  // aplica nada, y nunca toca ninguna plantilla de biblioteca.
  private saveAssignedCopy(menusToSave: DietTemplateMenuPayload[]): void {
    this.planAssignmentApi
      .updateContent(this.clientId, this.assignedPlanId, { name: this.name.trim(), menus: menusToSave })
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({ message: `Dieta actualizada para ${this.clientName}`, duration: 2500 });
          this.router.navigate(['/tabs/clients', this.clientId]);
        },
        error: () => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast('No se pudieron guardar los cambios', 'Error', 3000);
        },
      });
  }

  private snapshot(): string {
    return JSON.stringify({
      name: this.name.trim(),
      menus: this.menus,
      suitableForOverride: [...this.suitableForOverride].sort(),
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
