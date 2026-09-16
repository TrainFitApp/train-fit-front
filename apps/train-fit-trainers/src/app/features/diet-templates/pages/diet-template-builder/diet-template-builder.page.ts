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
import { PhasePayload } from '../../../../shared/models/plan-assignment.model';
import { DietSuggestionApiService } from '../../services/diet-suggestion-api.service';
import { PhaseFocus } from '../../models/diet-suggestion.model';
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
//   'assigned' — la copia YA ASIGNADA (fase/ciclo vigente o pasado): edita
//                esa copia in-place por su propio _id, nunca una plantilla
//                de biblioteca. Único modo que sirve también para ciclos 2+
//                (sin sourceTemplateId).
// La distinción importa por lo que se puede prometer: en 'own'/'shared' se
// edita la plantilla, NUNCA la copia congelada que rige su plan (ver
// diet-template-schema.js), y en 'shared' además hay más clientes detrás.
type ClientContextKind = 'new' | 'own' | 'shared' | 'assigned' | 'next-cycle';

interface MacroTarget {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Lo que trae la navegación a "Crear dieta" (ver
// client-detail.page.ts#goToCreateDiet): sin formulario previo, name/
// startDate llegan ya con sus defaults (vacío/hoy) — el cajón de sugerencias
// ("empezar de cero") sí manda los suyos ya decididos, más `phase` (objetivo
// de la fase) y `cycleTarget` (solo informativo). El contenido se construye
// en esta misma pantalla; al guardar se crea la dieta propia del cliente y
// se aplica como fase de una vez.
interface ForClientNavigationState {
  clientName?: string;
  name?: string;
  startDate?: string;
  phase?: PhasePayload;
  cycleTarget?: { kcal: number; macros: { protein: number; carbs: number; fat: number } };
  // Sugerencias de dieta — "Editar antes de aplicar" (diet-suggestion-drawer):
  // contenido de la plantilla elegida, para precargar el tablero en vez de
  // arrancar en blanco. La plantilla elegida en sí nunca se toca.
  prefill?: {
    name: string;
    mode: TemplateMode;
    days: DietTemplateDayPayload[];
    dayPatterns: DietTemplateDayPatternPayload[];
  };
}

// Objetivo de la fase, editable en el builder al crear el C1 (plan ciclos
// por contenido §8). Mismos presets que el cajón de sugerencias.
const FOCUS_DEFAULTS: Record<PhaseFocus, { delta: number; rate: number; label: string }> = {
  cut: { delta: -500, rate: -100, label: 'Definir' },
  maintain: { delta: 0, rate: 0, label: 'Mantener' },
  bulk: { delta: 300, rate: 100, label: 'Volumen' },
};

interface BoardCellRef {
  dayIndex: number;
  mealIndex: number;
}

// Portapapeles del tablero — una COMIDA (celda) o un DÍA/patrón entero.
// Mientras hay algo copiado el tablero entra en "modo copia": solo se ofrece
// pegar en el mismo tipo de destino (comida -> comidas, día -> días) y el
// resto de iconos/inputs quedan bloqueados hasta pegar o cancelar.
type BoardClipboard =
  | { kind: 'meal'; source: BoardCellRef; label: string; alternatives: TemplateMealAlternative[] }
  | { kind: 'day'; sourceIndex: number; label: string; meals: TemplateMeal[] };

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
export class DietTemplateBuilderPage implements OnInit, AfterViewInit, OnDestroy, PendingChangesComponent {
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
  // Objetivo de la fase (plan §8): foco + delta kcal + ritmo por ciclo. Lo
  // trae el cajón ya decidido, o lo pone aquí el entrenador. Es lo que usa
  // la sugerencia del siguiente ciclo para saber "cómo esperaba que fuera".
  public phaseFocus: PhaseFocus = 'maintain';
  public phaseKcalDelta = 0;
  public phaseRatePerCycle = 0;
  // g/kg del cajón de sugerencias (docs/plan-info-calculo-fase.md): aquí no
  // se editan, se pasan tal cual al aplicar.
  private phaseProteinPerKg: number | null = null;
  private phaseFatPerKg: number | null = null;
  public readonly focusOptions: { key: PhaseFocus; label: string }[] = (
    ['cut', 'maintain', 'bulk'] as PhaseFocus[]
  ).map((key) => ({ key, label: FOCUS_DEFAULTS[key].label }));

  // Solo en mode 'choice': días que dura un ciclo (plan §1).
  public choiceCycleDays = 7;

  // Preparar el SIGUIENTE ciclo de una fase (ruta next-cycle/:clientId/
  // :phaseId?kcal=): entra con el contenido del ciclo vigente escalado a esas
  // kcal, se retoca y al guardar se persiste el ciclo (o no, si no cambia
  // nada — el servidor responde 204).
  public isPreparingNextCycle = false;
  private nextCyclePhaseId = '';
  // Reparto elegido en el modal (kcal de referencia + gramos), o null.
  private nextCycleTarget: MacroTarget | null = null;
  public nextCycleNumber = 0;
  public nextCycleRange = '';
  public nextCycleKcal = 0;
  public nextCycleBaseKcal = 0;
  public rescaling = false;

  // --- Contexto de cliente (2026-09) ---
  //
  // Antes esta pantalla era idéntica viniera de donde viniera: al abrir la
  // plantilla de una fase desde la ficha de un cliente no se decía de quién
  // era, ni contra qué cifras había que ajustarla — el objetivo que la
  // fase tiene que cumplir se quedaba en la pantalla anterior, justo cuando
  // hace falta para montar las comidas.
  public clientContextKind: ClientContextKind | null = null;
  public clientContextName = '';
  public clientTarget: MacroTarget | null = null;
  public clientTargetLabel = '';
  // Cliente del que se viene al EDITAR una plantilla (ruta :id) — llega por
  // query param desde openPhaseTemplate en la ficha.
  private fromClientId = '';

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
    private dietSuggestionApi: DietSuggestionApiService
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
        this.startForNextCycle(clientId, phaseId);
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
  // improvisa ciclo a ciclo, una duración estimada de antemano no le sirve
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
      this.phaseFocus = nav.phase.focus || 'maintain';
      this.phaseKcalDelta = nav.phase.targetKcalDelta || 0;
      this.phaseRatePerCycle = nav.phase.ratePerCycle || 0;
      this.phaseProteinPerKg = nav.phase.proteinPerKg ?? null;
      this.phaseFatPerKg = nav.phase.fatPerKg ?? null;
    }
    this.clientContextKind = 'new';
    this.clientContextName = this.clientName;
    // Si se llegó desde el cajón ("empezar de cero"), el objetivo del ciclo 1
    // ya viene calculado: la fase todavía no se ha aplicado. Si se llegó por
    // "Crear dieta" a secas, la referencia es la necesidad del ciclo en curso
    // de su fase activa, si tiene.
    if (nav.cycleTarget) {
      this.clientTarget = {
        kcal: nav.cycleTarget.kcal,
        protein: nav.cycleTarget.macros?.protein || 0,
        carbs: nav.cycleTarget.macros?.carbs || 0,
        fat: nav.cycleTarget.macros?.fat || 0,
      };
      this.clientTargetLabel = nav.phase?.name
        ? `Objetivo del ciclo 1 · ${nav.phase.name}`
        : 'Objetivo de la fase';
    } else {
      this.loadClientTarget(clientId);
    }
    if (nav.prefill) {
      this.applyTemplate(nav.prefill as unknown as DietTemplate);
    } else {
      this.mode = 'sequential';
      this.days = [];
      this.dayPatterns = [];
    }
    this.savedSnapshot = this.snapshot();
    this.state = 'loaded';
  }

  // Editar la copia YA ASIGNADA de un cliente — por su propio _id, nunca por
  // sourceTemplateId (los ciclos 2+ creados con "Siguiente ciclo" no lo
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

  // Preparar el siguiente ciclo: contenido del ciclo vigente ya escalado a
  // las kcal elegidas en el modal (query param). Nunca toca el ciclo actual.
  private startForNextCycle(clientId: string, phaseId: string): void {
    this.isPreparingNextCycle = true;
    this.nextCyclePhaseId = phaseId;
    this.clientId = clientId;
    this.clientName = this.route.snapshot.queryParamMap.get('name') || 'este cliente';
    this.clientContextKind = 'next-cycle';
    this.clientContextName = this.clientName;
    const query = this.route.snapshot.queryParamMap;
    const kcal = Number(query.get('kcal')) || 0;
    // Reparto ajustado en el modal "Siguiente ciclo" (p/c/f en gramos):
    // se enseña como objetivo del ciclo, con deltas por fila. Sin él, el
    // escalado proporcional ya lo cumple todo y no hay nada que comparar.
    const protein = Number(query.get('p'));
    const carbs = Number(query.get('c'));
    const fat = Number(query.get('f'));
    this.nextCycleTarget =
      kcal > 0 && [protein, carbs, fat].every((n) => Number.isFinite(n) && n >= 0) && protein + carbs + fat > 0
        ? { kcal, protein, carbs, fat }
        : null;
    this.loadScaledNextCycle(kcal);
  }

  // Al reescalar a otras kcal, el objetivo del ciclo se mueve en la misma
  // proporción: el reparto (%) que eligió el entrenador se mantiene.
  private nextCycleTargetAt(kcal: number): MacroTarget | null {
    const t = this.nextCycleTarget;
    if (!t || !(t.kcal > 0) || !(kcal > 0)) return null;
    const factor = kcal / t.kcal;
    return {
      kcal: Math.round(kcal),
      protein: Math.round(t.protein * factor),
      carbs: Math.round(t.carbs * factor),
      fat: Math.round(t.fat * factor),
    };
  }

  private loadScaledNextCycle(kcal: number): void {
    this.rescaling = true;
    this.dietSuggestionApi.scaleNextCycle(this.clientId, this.nextCyclePhaseId, kcal || 1).subscribe({
      next: (scaled) => {
        this.nextCycleNumber = scaled.cycleNumber;
        this.nextCycleRange = `${this.fmtDay(scaled.start)} – ${this.fmtDay(scaled.end)}`;
        this.nextCycleBaseKcal = scaled.baseKcal;
        this.nextCycleKcal = kcal || scaled.baseKcal;
        this.applyTemplate({
          name: `Ciclo ${scaled.cycleNumber}`,
          mode: scaled.content.mode,
          choiceCycleDays: scaled.content.choiceCycleDays,
          days: scaled.content.days as DietTemplateDayPayload[],
          dayPatterns: scaled.content.dayPatterns as DietTemplateDayPatternPayload[],
        } as unknown as DietTemplate);
        this.clientTarget = this.nextCycleTargetAt(this.nextCycleKcal);
        this.clientTargetLabel = `Objetivo del ciclo ${scaled.cycleNumber}`;
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
  public async rescaleNextCycle(): Promise<void> {
    if (!this.isPreparingNextCycle || !(this.nextCycleKcal > 0)) return;
    if (this.snapshot() !== this.savedSnapshot) {
      const ok = await confirmDiscardChanges(this.ionicUtilService);
      if (!ok) return;
    }
    this.loadScaledNextCycle(this.nextCycleKcal);
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

  // Referencia contra la que ajustar: la necesidad calculada del ciclo (misma
  // cuenta que ve el entrenador en el resumen de ciclo). Sin `phaseId`, la de
  // la fase activa del cliente; `date` elige el ciclo que la contiene (una
  // copia asignada), si no el ciclo en curso. Sin fase, no hay referencia.
  private loadClientTarget(clientId: string, phaseId?: string | null, date?: string | null): void {
    const phaseId$ = phaseId
      ? of(phaseId)
      : this.planAssignmentApi.getActive(clientId).pipe(map((active) => (active ? active.phaseId || active._id : null)));
    phaseId$
      .pipe(
        switchMap((id) => {
          if (!id) return of(null);
          return this.dietSuggestionApi.getPhaseCycles(clientId, id).pipe(
            switchMap((cycles) => {
              const windows = cycles.windows || [];
              const number = (date && windows.find((w) => w.start <= date && date <= w.end)?.number) || cycles.current.number;
              return this.dietSuggestionApi.getCycleNeed(clientId, id, number);
            })
          );
        })
      )
      .subscribe({
        next: (res) => {
          const target = res?.need?.target;
          if (!res || !target) return;
          this.clientTarget = { kcal: target.kcal, protein: target.protein, carbs: target.carbs, fat: target.fat };
          this.clientTargetLabel = `Necesidad del ciclo ${res.cycleNumber}`;
        },
        // En silencio: la referencia ayuda a ajustar, no hace falta para
        // editar. Un error aquí no debe estorbar el trabajo de la pantalla.
        error: () => undefined,
      });
  }

  private applyTemplate(template: DietTemplate): void {
    this.name = template.name;
    this.mode = template.mode || 'sequential';
    this.choiceCycleDays = template.choiceCycleDays || 7;
    this.days = (template.days || []).map((day: any) => ({
      dayLabel: day.dayLabel,
      meals: this.mealsFromPayload(day.meals),
    }));
    this.dayPatterns = (template.dayPatterns || []).map((pattern: any) => ({
      name: pattern.name,
      appliesTo: Array.isArray(pattern.appliesTo) ? pattern.appliesTo : [],
      meals: this.mealsFromPayload(pattern.meals),
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

  public setPhaseFocus(focus: PhaseFocus): void {
    this.phaseFocus = focus;
    this.phaseKcalDelta = FOCUS_DEFAULTS[focus].delta;
    this.phaseRatePerCycle = FOCUS_DEFAULTS[focus].rate;
  }

  public setMode(mode: TemplateMode): void {
    this.mode = mode;
    // 'sequential' usa days[] y 'recurring'/'choice' usan dayPatterns[] —
    // un dayIndex de uno no significa nada en el otro. En modo copia el
    // selector está deshabilitado, pero por si acaso se vacía el portapapeles.
    this.activeCell = null;
    this.clipboard = null;
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
  public dayTotals(row: TemplateDay | TemplateDayPattern): {
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
  public dayMicroRows(row: TemplateDay | TemplateDayPattern): { label: string; value: number; unit: string }[] {
    const micros = this.dayTotals(row).micros;
    return TOTALS_NUTRIENT_FIELDS.filter((field) => micros[field.key] > 0).map((field) => ({
      label: field.label,
      value: micros[field.key] * field.toDisplay,
      unit: field.unit,
    }));
  }

  public hasAnyItems(row: TemplateDay | TemplateDayPattern): boolean {
    return row.meals.some((meal) => (meal.alternatives?.[0]?.items?.length || 0) > 0);
  }

  // Contexto de cliente — cuánto se desvía este día del objetivo, para poder
  // ajustar sin salir a mirar la cifra a otra pantalla. null cuando no hay
  // cliente detrás (plantilla de biblioteca sin más) o el día está vacío:
  // "-2200 kcal" sobre un día sin alimentos no informa de nada.
  public targetDeviation(row: TemplateDay | TemplateDayPattern): MacroTarget | null {
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
  public rowHasFood(row: TemplateDay | TemplateDayPattern): boolean {
    return row.meals.some((meal) => this.mealHasFood(meal));
  }

  // --- Editor de celda (día × comida) ---
  // meal se pasa por referencia al modal: las mutaciones que haga dentro
  // (añadir/quitar alternativas, alimentos...) se reflejan directamente
  // aquí, en el mismo objeto que vive dentro de days/dayPatterns — no hace
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
    const rowsValid = this.activeRows.every((row) => row.meals.every((meal) => this.mealValid(meal)));
    if (!rowsValid) return false;
    if (this.mode === 'recurring') {
      return this.dayPatterns.every((p) => p.name.trim() && p.appliesTo.length > 0);
    }
    if (this.mode === 'choice') {
      return this.choiceCycleDays >= 1 && this.dayPatterns.every((p) => p.name.trim());
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

    if (this.isPreparingNextCycle) {
      this.saveNextCycle(daysToSave, dayPatternsToSave);
      return;
    }

    if (this.isEditingAssignedCopy) {
      this.saveAssignedCopy(daysToSave, dayPatternsToSave);
      return;
    }

    if (this.isCreatingForClient) {
      this.saveForClient(daysToSave, dayPatternsToSave);
      return;
    }

    this.dietTemplateApi
      .update(
        this.templateId,
        this.name.trim(),
        daysToSave,
        this.mode,
        dayPatternsToSave,
        [...this.suitableForOverride],
        this.mode === 'choice' ? this.choiceCycleDays : null
      )
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
  private saveForClient(daysToSave: DietTemplateDayPayload[], dayPatternsToSave: DietTemplateDayPatternPayload[]): void {
    const startDate = this.phaseStartDate || todayIsoDate();
    // Toda dieta nueva arranca una FASE (phaseId propio + ciclos por
    // contenido) con el objetivo que se eligió aquí — es lo que usa la
    // sugerencia del siguiente ciclo para saber qué esperaba el entrenador.
    const phase: PhasePayload = {
      name: this.name.trim(),
      focus: this.phaseFocus,
      targetKcalDelta: Number(this.phaseKcalDelta) || 0,
      ratePerCycle: Number(this.phaseRatePerCycle) || 0,
      proteinPerKg: this.phaseProteinPerKg,
      fatPerKg: this.phaseFatPerKg,
    };

    this.dietTemplateApi
      .create(
        this.name.trim(),
        daysToSave,
        this.clientId,
        this.mode,
        dayPatternsToSave,
        this.mode === 'choice' ? this.choiceCycleDays : null
      )
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

  // Persistir el siguiente ciclo. 204 (null) = el contenido es igual al que
  // heredaría: no se escribe nada y se dice.
  private saveNextCycle(daysToSave: DietTemplateDayPayload[], dayPatternsToSave: DietTemplateDayPatternPayload[]): void {
    this.dietSuggestionApi
      .prepareNextCycle(this.clientId, this.nextCyclePhaseId, {
        mode: this.mode,
        days: daysToSave,
        dayPatterns: dayPatternsToSave,
        choiceCycleDays: this.mode === 'choice' ? this.choiceCycleDays : null,
      })
      .subscribe({
        next: (cycle) => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({
            message: cycle
              ? `Ciclo ${this.nextCycleNumber} preparado para ${this.clientName}`
              : `Sin cambios: el ciclo ${this.nextCycleNumber} repetirá el anterior`,
            duration: 3000,
          });
          this.router.navigate(['/tabs/clients', this.clientId]);
        },
        error: (err) => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo preparar el ciclo', 'Error', 3500);
        },
      });
  }

  // PUT directo sobre la copia asignada (su propio _id) — nunca crea ni
  // aplica nada, y nunca toca ninguna plantilla de biblioteca.
  private saveAssignedCopy(daysToSave: DietTemplateDayPayload[], dayPatternsToSave: DietTemplateDayPatternPayload[]): void {
    this.planAssignmentApi
      .updateContent(this.clientId, this.assignedPlanId, {
        name: this.name.trim(),
        mode: this.mode,
        days: daysToSave,
        dayPatterns: dayPatternsToSave,
        choiceCycleDays: this.mode === 'choice' ? this.choiceCycleDays : null,
      })
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
      mode: this.mode,
      choiceCycleDays: this.mode === 'choice' ? this.choiceCycleDays : null,
      days: this.days,
      dayPatterns: this.dayPatterns,
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
