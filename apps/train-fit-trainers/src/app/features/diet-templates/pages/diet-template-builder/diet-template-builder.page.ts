import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
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
import { DietPhaseApiService } from '../../../../shared/services/diet-phase-api.service';
import { formatIsoDay } from '../../../../shared/utils/phase-start.util';
import { PhaseStartSheetComponent } from '../../components/phase-start-sheet/phase-start-sheet.component';
import { PhaseStartSettings } from '../../../../shared/models/diet-phase.model';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { alternativeTotals, MacroKey, MacroTotals, sameMacros } from '../../utils/alternative-macros';
import { fitsTarget, isWithinTarget, targetDeviation } from '../../utils/menu-target-fit';
import { filledAlternatives, isMissingQuantity, pruneEmptyAlternatives } from '../../utils/meal-alternatives';
import { computeItemMicros, TOTALS_NUTRIENT_FIELDS } from '../../utils/nutrient-fields';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { dietaryFlagUi } from '../../../../shared/utils/dietary-flag-ui.util';

type ViewState = 'loading' | 'error' | 'loaded';

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
// client-detail.page.ts#goToCreateDiet): sin formulario previo, el nombre
// llega vacío — el cajón de sugerencias ("empezar de cero") sí manda el suyo
// ya decidido, más `phase` (nombre y objetivo de la fase). El contenido se
// construye en esta misma pantalla; al guardar se elige desde qué día empieza
// (PhaseStartSheetComponent), se crea la dieta propia del cliente y se aplica
// como fase de una vez.
interface ForClientNavigationState {
  clientName?: string;
  name?: string;
  phase?: PhaseStartSettings;
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
  private readonly translate = inject(TranslateService);

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

  // El editor de comida es un panel sin velo (showSidePanel): el tablero
  // sigue clicable debajo. mealEditorSeq evita que el cierre del editor
  // anterior marque como cerrado el que se acaba de abrir en otra celda.
  public mealEditorOpen = false;
  private mealEditorSeq = 0;

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
    { key: 'vegan', label: this.translate.instant('INTAKE.DIETARY.vegan') },
    { key: 'vegetarian', label: this.translate.instant('INTAKE.DIETARY.vegetarian') },
    { key: 'lactoseFree', label: this.translate.instant('INTAKE.DIETARY.lactoseFree') },
    { key: 'glutenFree', label: this.translate.instant('INTAKE.DIETARY.glutenFree') },
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
  // Editar el contenido de una fase de un cliente (ruta
  // phase/:clientId/:phaseId/:contentId): una versión concreta (la primera o
  // una semana preparada). Guardar escribe esa versión; nunca crea ni aplica
  // nada nuevo ni toca la plantilla de la que salió.
  public isEditingPhaseContent = false;
  private phaseId = '';
  private contentId = '';
  private phaseName = '';
  // Hoja del día de inicio abierta (al guardar "para este cliente"): ni el
  // botón ni el Enter vuelven a abrirla encima.
  private isPickingStart = false;
  // g/kg del cajón de sugerencias: aquí no se editan, se pasan tal cual al
  // aplicar.
  private phaseProteinPerKg: number | null = null;
  private phaseFatPerKg: number | null = null;
  // El objetivo de la fase lo teclea el entrenador aquí (o llega ya decidido
  // del cajón): `clientTargetSource` dice si sigue siendo el calculado.
  public clientTargetSource: 'calculated' | 'manual' = 'calculated';
  // Con lo que se abrió el objetivo editable, para "Recalcular".
  private initialClientTarget: { target: MacroTarget; source: 'calculated' | 'manual' } | null = null;

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

  // «Sin lactosa, Vegana», no las claves («lactoseFree»).
  public dietaryFlagLabels(flags: readonly string[] | null | undefined): string {
    return (flags || []).map((flag) => dietaryFlagUi(flag).label).join(', ');
  }
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly modalController = inject(ModalController);
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
    private dietPhaseApi: DietPhaseApiService,
    private ionicUtilService: IonicUtilService,
    private customProductService: CustomProductService,
    private recipeService: RecipeService,
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
      const phaseId = params.get('phaseId');
      const contentId = params.get('contentId');
      if (clientId && phaseId && contentId) {
        this.startForPhaseContent(clientId, phaseId, contentId);
        return;
      }
      if (clientId && phaseId) {
        this.startForNextWeek(clientId, phaseId);
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
      this.clientContextName = query.get('name') || this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');
      this.load();
    });
  }

  // Sin plantilla que cargar — arranca en blanco, listo para construir.
  // "Crear dieta" ya no pasa por ningún formulario previo (el nutricionista
  // improvisa semana a semana, una duración estimada de antemano no le sirve
  // de nada — ver client-detail.page.ts#goToCreateDiet): nombre en blanco,
  // editable aquí mismo (campo de arriba), y fase abierta sin fin estimado
  // desde el día que se elige al guardar. El objetivo de la fase
  // (foco/delta/ritmo) se pone aquí (bloque "Objetivo de la fase"); el cajón
  // de sugerencias ("empezar de cero") lo manda ya decidido junto con `name`
  // — se respetan tal cual.
  private startForClient(clientId: string): void {
    const nav = this.navigationState;
    this.isCreatingForClient = true;
    this.clientId = clientId;
    this.clientName = nav.clientName || this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');
    this.name = nav.name || '';
    if (nav.phase) {
      this.phaseProteinPerKg = nav.phase.proteinPerKg ?? null;
      this.phaseFatPerKg = nav.phase.fatPerKg ?? null;
      if (nav.phase.target) {
        const { kcal, protein, carbs, fat, source } = nav.phase.target;
        this.setInitialClientTarget({ kcal, protein, carbs, fat }, source);
      }
    }
    this.clientContextKind = 'new';
    this.clientContextName = this.clientName;
    // Si se llegó desde el cajón ("empezar de cero"), el objetivo ya viene
    // decidido. Si se llegó por "Crear dieta" a secas, se calcula aquí con
    // los datos del cliente — es lo primero que hay que ver para montar las
    // comidas (docs/plan-semanas.md).
    if (this.clientTarget) {
      this.clientTargetLabel = this.translate.instant('DIET_TEMPLATES.OBJETIVO_DE_LA_FASE');
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

  // Editar una versión del contenido de una fase de un cliente. El nombre que
  // se edita arriba es el de la fase.
  private startForPhaseContent(clientId: string, phaseId: string, contentId: string): void {
    this.isEditingPhaseContent = true;
    this.phaseId = phaseId;
    this.contentId = contentId;
    this.clientId = clientId;
    this.clientName = this.route.snapshot.queryParamMap.get('name') || this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');
    this.clientContextKind = 'assigned';
    this.clientContextName = this.clientName;

    this.dietPhaseApi.get(clientId, phaseId).subscribe({
      next: (phase) => {
        const content = phase.contents.find((c) => c._id === contentId);
        if (!content) {
          this.state = 'error';
          return;
        }
        this.phaseName = phase.name;
        this.loadClientTarget(clientId, phaseId, content.startDate);
        this.applyTemplate({ name: phase.name, menus: content.menus } as DietTemplate);
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
    this.clientName = this.route.snapshot.queryParamMap.get('name') || this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');
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
    this.dietPhaseApi.scaleNextWeek(this.clientId, this.nextWeekPhaseId, kcal || 1).subscribe({
      next: (scaled) => {
        this.nextWeekNumber = scaled.weekNumber;
        this.nextWeekRange = `${this.fmtDay(scaled.start)} – ${this.fmtDay(scaled.end)}`;
        this.nextWeekBaseKcal = scaled.baseKcal;
        this.nextWeekKcal = kcal || scaled.baseKcal;
        this.applyTemplate({
          name: `S${scaled.weekNumber}`,
          menus: scaled.menus as DietTemplateMenuPayload[],
        } as DietTemplate);
        this.clientTarget = this.nextWeekTargetAt(this.nextWeekKcal);
        this.clientTargetLabel = this.translate.instant('DIET_TEMPLATES.OBJETIVO_DE', { weekNumber: scaled.weekNumber });
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
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
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
          this.setInitialClientTarget(
            { kcal: goal.kcalTotal, protein: goal.proteinsGTotal, carbs: goal.carbohydratesGTotal, fat: goal.fatGTotal },
            goal.source
          );
        } else if (calculated) {
          const { kcal, protein, carbs, fat } = calculated;
          this.setInitialClientTarget({ kcal, protein, carbs, fat }, 'calculated');
        }
        this.clientTargetLabel = this.translate.instant('DIET_TEMPLATES.OBJETIVO_DE_LA_FASE');
      },
      error: () => undefined,
    });
  }

  // El entrenador teclea el objetivo en la card de contexto: deja de ser el
  // calculado y es lo que se guardará como objetivo de la fase.
  public onClientTargetEdited(): void {
    this.clientTargetSource = 'manual';
  }

  private setInitialClientTarget(target: MacroTarget, source: 'calculated' | 'manual'): void {
    this.initialClientTarget = { target: { ...target }, source };
    this.clientTarget = { ...target };
    this.clientTargetSource = source;
  }

  // "Recalcular": deshace lo tecleado y vuelve al objetivo con el que se
  // abrió la dieta (el del cliente, o el que trajo el cajón de sugerencias).
  public get canResetClientTarget(): boolean {
    return !!this.initialClientTarget && !sameMacros(this.clientTarget, this.initialClientTarget.target);
  }

  public resetClientTarget(): void {
    if (!this.initialClientTarget) return;
    this.clientTarget = { ...this.initialClientTarget.target };
    this.clientTargetSource = this.initialClientTarget.source;
  }

  // Referencia contra la que ajustar: la necesidad calculada de la semana
  // (misma cuenta que ve el entrenador en su resumen). Sin `phaseId`, la de
  // la fase que rige hoy; `date` elige la semana que la contiene (la versión
  // que se edita), si no la que corre. Sin fase, no hay referencia.
  private loadClientTarget(clientId: string, phaseId?: string | null, date?: string | null): void {
    const phaseId$ = phaseId
      ? of(phaseId)
      : this.dietPhaseApi.getCurrent(clientId).pipe(map((current) => current?._id ?? null));
    phaseId$
      .pipe(
        switchMap((id) => {
          if (!id) return of(null);
          return this.dietPhaseApi.getWeeks(clientId, id).pipe(
            switchMap((weeks) => {
              const number =
                (date && weeks.weeks.find((w) => w.start <= date && date <= w.end)?.number) || weeks.current?.number || 1;
              return this.dietPhaseApi.getWeekNeed(clientId, id, number);
            })
          );
        })
      )
      .subscribe({
        next: (res) => {
          const target = res?.need?.target;
          if (!res || !target) return;
          this.clientTarget = { kcal: target.kcal, protein: target.protein, carbs: target.carbs, fat: target.fat };
          this.clientTargetLabel = this.translate.instant('DIET_TEMPLATES.NECESIDAD_DE', { weekNumber: res.weekNumber });
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
    return this.translate.instant('DIET_TEMPLATES.ANADE_EL_PRIMER_MENU_PARA');
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
          productName: cp.product?.name || this.translate.instant('DIET_TEMPLATES.ALIMENTO_GUARDADO'),
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
          recipeName: cr.recipe?.name || this.translate.instant('DIET_TEMPLATES.RECETA_GUARDADA'),
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
  // alimento es siempre un producto o una receta real (ver validationError), nunca
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
      name: this.translate.instant('DIET_TEMPLATES.MENU', { p0: this.menus.length + 1 }),
      meals: this.mealSlots.map((slot) => ({ slot, alternatives: [] })),
    });
  }

  public removeRow(index: number): void {
    this.activeRows.splice(index, 1);

    // El botón de eliminar no existe en modo copia (ver html), así que el
    // portapapeles nunca apunta a una fila que se esté quitando.
    if (this.activeCell?.dayIndex === index) {
      // El editor abierto apuntaría a una comida que ya no está en el tablero.
      void this.closeMealEditor();
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
    return targetDeviation(this.dayTotals(row), this.clientTarget);
  }

  // "Editar dieta": aviso cuando algún menú con alimentos no cuadra con la
  // necesidad de la semana. Solo los nombra (qué macro se sale lo dicen los
  // chips de su columna) y no bloquea guardar.
  public get offTargetMessage(): string {
    const target = this.clientTarget;
    if (!this.isEditingPhaseContent || !target) return '';
    // Sin nombre, el mismo que le pone el guardado ("Menú N").
    const names = this.activeRows
      .map((row, i) => ({ row, name: this.rowLabel(row).trim() || this.translate.instant('DIET_TEMPLATES.MENU', { p0: i + 1 }) }))
      .filter(({ row }) => this.hasAnyItems(row) && !fitsTarget(this.dayTotals(row), target))
      .map(({ name }) => name);
    if (!names.length) return '';
    const key = names.length === 1 ? 'DIET_TEMPLATES.MENU_NO_CUADRA' : 'DIET_TEMPLATES.MENUS_NO_CUADRAN';
    return this.translate.instant(key, { menus: names.join(', ') });
  }

  public deviationLabel(value: number): string {
    // El signo SIEMPRE, también en el 0 ("±0"): un número pelado al lado de
    // los gramos del total se confunde con otro total más.
    if (value === 0) return '±0';
    return `${value > 0 ? '+' : '−'}${Math.abs(value)}`;
  }

  public isOnTarget(value: number, key: MacroKey): boolean {
    return isWithinTarget(value, key);
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
    if (!alternatives.length) return this.translate.instant('DIET_TEMPLATES.VACIA');
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
    return (item.recipeId ? item.recipeName : item.productName) || this.translate.instant('DIET_TEMPLATES.SIN_ALIMENTO');
  }

  // Misma numeración descendente que las cabeceras del editor de comida
  // (day-meal-editor-modal.component.html), para que "Opción 2" sea la misma
  // en el tablero y dentro del modal.
  public alternativeLabel(alt: TemplateMealAlternative, index: number, total: number): string {
    return alt.label?.trim() || this.translate.instant('DIET_TEMPLATES.OPCION_2', { p0: total - index });
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
    if (this.mealEditorOpen && this.activeCell?.dayIndex === dayIndex && this.activeCell?.mealIndex === mealIndex) return;
    // Otra celda con el editor abierto: se sustituye, no se apila.
    await this.closeMealEditor();
    const row = this.activeRows[dayIndex];
    const meal = row.meals[mealIndex];
    // Siempre se edita con al menos una alternativa visible en pantalla,
    // aunque la celda esté vacía. Arranca sin alimentos: "Añadir alimento"
    // abre el buscador directamente (ver DayMealEditorModalComponent). Es
    // solo un hueco: al cerrar se quita si no se le añadió nada.
    if (!meal.alternatives.length) {
      meal.alternatives.push({ label: '', items: [] });
    }

    this.activeCell = { dayIndex, mealIndex };

    const seq = ++this.mealEditorSeq;
    this.mealEditorOpen = true;
    await this.ionicUtilService.showSidePanel({
      component: DayMealEditorModalComponent,
      componentProps: { meal, menuName: this.rowLabel(row) },
      cssClass: 'tf-panel-modal',
    });
    pruneEmptyAlternatives(meal);
    if (seq === this.mealEditorSeq) this.mealEditorOpen = false;
  }

  private async closeMealEditor(): Promise<void> {
    if (this.mealEditorOpen) await this.ionicUtilService.closeSidePanels();
  }

  // Con el tablero clicable se puede guardar o salir con el editor abierto:
  // el panel vive fuera de la página y se quedaría flotando en la siguiente.
  public ionViewWillLeave(): void {
    void this.closeMealEditor();
  }

  // --- Arrastrar y soltar: mover una comida completa (con todas sus
  // alternativas) de una celda a otra. Si el destino ya tiene algo, pide
  // confirmación antes de sobrescribir — perder una comida ya compuesta por
  // un arrastre accidental sería un desastre silencioso. ---
  public onCellDragStart(dayIndex: number, mealIndex: number, event: DragEvent): void {
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (this.copyMode || !this.mealHasFood(meal)) {
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
    if (this.mealHasFood(targetMeal)) {
      await this.ionicUtilService.showAlert({
        header: this.translate.instant('DIET_TEMPLATES.SOBRESCRIBIR', { p0: this.rowLabel(this.activeRows[dayIndex]), slot: targetMeal.slot }),
        message: this.translate.instant('DIET_TEMPLATES.YA_TIENE_ALIMENTOS_COMPUESTOS_SE'),
        buttons: [
          { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
          { text: this.translate.instant('DIET_TEMPLATES.SOBRESCRIBIR_2'), role: 'destructive', handler: () => this.moveMeal(from, { dayIndex, mealIndex }) },
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
    // El panel del portapapeles sale donde está el editor: se cierra.
    void this.closeMealEditor();
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
    void this.closeMealEditor();
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
      header: this.translate.instant('DIET_TEMPLATES.YA_TIENE_COMIDA', { slot: targetMeal.slot }),
      buttons: [
        {
          text: this.translate.instant('DIET_TEMPLATES.UNIFICAR_ANADIR_COMO_ALTERNATIVA'),
          handler: () => this.mergeAlternativesInto(targetMeal, clip.alternatives),
        },
        {
          text: this.translate.instant('DIET_TEMPLATES.SOBRESCRIBIR_2'),
          role: 'destructive',
          handler: () => {
            targetMeal.alternatives = this.cloneAlternatives(clip.alternatives);
          },
        },
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
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
      header: this.translate.instant('DIET_TEMPLATES.YA_TIENE_COMIDA_2', { p0: this.rowLabel(row) }),
      buttons: [
        {
          text: this.translate.instant('DIET_TEMPLATES.UNIFICAR_ANADIR_COMO_ALTERNATIVAS'),
          handler: () => {
            row.meals.forEach((meal, i) => {
              const source = clip.meals[i]?.alternatives || [];
              if (source.length) this.mergeAlternativesInto(meal, source);
            });
          },
        },
        { text: this.translate.instant('DIET_TEMPLATES.SOBRESCRIBIR_2'), role: 'destructive', handler: overwrite },
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
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
        message: this.translate.instant('DIET_TEMPLATES.SOLO_SE_HAN_ANADIDO_HASTA', { maxAlternatives: this.maxAlternatives }),
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
      header: this.translate.instant('DIET_TEMPLATES.VACIAR', { p0: this.rowLabel(row), slot: meal.slot }),
      message: this.translate.instant('DIET_TEMPLATES.SE_ELIMINAN_LOS_ALIMENTOS_DE'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        { text: this.translate.instant('DIET_TEMPLATES.VACIAR_2'), role: 'destructive', handler: () => (meal.alternatives = []) },
      ],
    });
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByLabel(_index: number, row: { label: string }): string {
    return row.label;
  }

  // La etiqueta de una alternativa es opcional: sin ella se muestra "Opción N"
  // (alternativeLabel) y el back la guarda vacía. Las opciones sin alimentos
  // no cuentan (filledAlternatives): se puede guardar con el editor abierto
  // sobre una celda vacía, o tras borrar todos sus alimentos.
  private mealProblem(menu: TemplateMenu, meal: TemplateMeal): string | null {
    const alternatives = filledAlternatives(meal);
    const isMultiple = alternatives.length >= 2;
    for (const [i, alt] of alternatives.entries()) {
      const where = `${this.rowLabel(menu)} · ${meal.slot}${isMultiple ? this.translate.instant('DIET_TEMPLATES.OPCION_3', { p0: alternatives.length - i }) : ''}`;
      if (!alt.items.every((item) => item.productId || item.recipeId)) return this.translate.instant('DIET_TEMPLATES.HAY_UN_ALIMENTO_SIN_ELEGIR', { where });
      const withoutQuantity = alt.items.find(isMissingQuantity);
      if (withoutQuantity) {
        return this.translate.instant('DIET_TEMPLATES.ALIMENTO_SIN_CANTIDAD', { where, food: withoutQuantity.productName });
      }
    }
    return null;
  }

  // Primer motivo por el que no se puede guardar, o null si todo está bien.
  // El botón no se deshabilita: save() lo muestra en un aviso para que el
  // entrenador sepa qué falta.
  private get validationError(): string | null {
    if (!this.name.trim()) return this.translate.instant('DIET_TEMPLATES.FALTA_EL_NOMBRE_DE_LA');
    return this.menusValidationError;
  }

  // Lo mismo sin el nombre de la dieta: "Guardar como plantilla" pide el suyo.
  // Una dieta sin ningún menú no se guarda por ninguna vía (la lista de
  // plantillas sí la crea vacía, pero solo para abrir este editor).
  private get menusValidationError(): string | null {
    if (!this.menus.length) return this.translate.instant('DIET_TEMPLATES.ANADE_AL_MENOS_UN_MENU');
    const unnamed = this.menus.findIndex((menu) => !menu.name.trim());
    if (unnamed >= 0) return this.translate.instant('DIET_TEMPLATES.FALTA_EL_NOMBRE_DEL_MENU', { p0: unnamed + 1 });
    if (this.duplicateMenuNamesWarning) return this.translate.instant('DIET_TEMPLATES.HAY_MENUS_CON_EL_MISMO_2', { duplicateMenuNamesWarning: this.duplicateMenuNamesWarning });
    for (const menu of this.menus) {
      for (const meal of menu.meals) {
        const problem = this.mealProblem(menu, meal);
        if (problem) return problem;
      }
    }
    return null;
  }

  private mealsToSave(meals: TemplateMeal[]): DietTemplateMealPayload[] {
    return meals
      .filter((meal) => filledAlternatives(meal).length > 0)
      .map((meal) => ({
        slot: meal.slot,
        alternatives: filledAlternatives(meal)
          .map((alt) => ({ label: alt.label.trim(), ...this.itemsToCustomEntries(alt.items) })),
      }));
  }

  public save(): void {
    if (this.isSaving || this.isPickingStart) return;
    const problem = this.validationError;
    if (problem) {
      this.ionicUtilService.showToast({ message: problem, duration: 4000, color: 'warning' });
      return;
    }

    if (this.isCreatingForClient) {
      void this.saveForClient();
      return;
    }

    this.isSaving = true;
    const menusToSave = this.menusToSave();

    if (this.isPreparingNextWeek) {
      this.saveNextWeek(menusToSave);
      return;
    }

    if (this.isEditingPhaseContent) {
      this.savePhaseContent(menusToSave);
      return;
    }

    this.dietTemplateApi
      .update(this.templateId, this.name.trim(), menusToSave, [...this.suitableForOverride])
      .subscribe({
      next: () => {
        this.isSaving = false;
        this.savedSnapshot = this.snapshot();
        this.ionicUtilService.showToast({ message: this.translate.instant('TABLES.TEMPLATE_SAVED'), duration: 2000 });
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(this.translate.instant('TABLES.TEMPLATE_SAVE_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
      },
    });
  }

  // Solo se envían las comidas con al menos una alternativa — un slot
  // vacío no aporta nada al aplicar la plantilla. Cada alimento se
  // convierte a formato "clipboard" (customProducts/customRecipes) — el
  // que realmente espera el backend, no el TemplateFoodItem de la UI.
  private menusToSave(): DietTemplateMenuPayload[] {
    return this.menus.map((menu, i) => ({
      name: menu.name.trim() || this.translate.instant('DIET_TEMPLATES.MENU', { p0: i + 1 }),
      meals: this.mealsToSave(menu.meals),
    }));
  }

  // "Guardar como plantilla" mientras se crea la dieta de un cliente: copia
  // lo construido a la biblioteca general (sin ownerClientId), con el nombre
  // que se elija en el aviso. No asigna nada ni sale del editor: la dieta
  // del cliente se sigue creando con "Crear y asignar".
  public async saveAsTemplate(): Promise<void> {
    if (this.isSaving) return;
    const problem = this.menusValidationError;
    if (problem) {
      this.ionicUtilService.showToast({ message: problem, duration: 4000, color: 'warning' });
      return;
    }

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('DIET_TEMPLATES.GUARDAR_COMO_PLANTILLA'),
      message: this.translate.instant('DIET_TEMPLATES.GUARDAR_COMO_PLANTILLA_HINT'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          label: this.translate.instant('DIET_TEMPLATES.NOMBRE_DE_LA_PLANTILLA'),
          // "Plantilla <nombre de la dieta>", o solo "Plantilla" si aún no
          // tiene nombre.
          value: this.translate.instant('DIET_TEMPLATES.PLANTILLA_NOMBRE_POR_DEFECTO', { name: this.name.trim() }).trim(),
          attributes: { maxlength: 100 },
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.SAVE'),
          cssClass: 'alert-button-primary',
          handler: (data: { name?: string }) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            this.isSaving = true;
            this.dietTemplateApi.create(name, this.menusToSave()).subscribe({
              next: () => {
                this.isSaving = false;
                this.ionicUtilService.showToast({ message: this.translate.instant('TABLES.TEMPLATE_SAVED'), duration: 2000 });
              },
              error: () => {
                this.isSaving = false;
                this.ionicUtilService.showErrorToast(this.translate.instant('TABLES.TEMPLATE_SAVE_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
              },
            });
            return true;
          },
        },
      ],
    });
  }

  // Primero se elige desde qué día empieza, en el calendario del cliente
  // (PhaseStartSheetComponent: hoy o un día libre). Cerrar la hoja sin
  // elegir no guarda nada. Después, dos pasos, en este orden:
  //   1. Crear la dieta de BIBLIOTECA propia del cliente (ownerClientId):
  //      queda reutilizable, se puede volver a aplicar más adelante.
  //   2. Empezar con ella una fase desde ese día.
  //
  // Si el paso 2 falla (409: otra fase ocupó el día mientras tanto), el paso
  // 1 NO se deshace: la dieta ya construida es trabajo bueno que no hay por
  // qué tirar. Se dice que quedó guardada y que solo faltan las fechas, que
  // se pueden reelegir desde "Siguiente fase".
  private async saveForClient(): Promise<void> {
    const name = this.name.trim();
    this.isPickingStart = true;
    const startDate = await PhaseStartSheetComponent.open(this.modalController, {
      clientId: this.clientId,
      clientName: this.clientName,
      phaseName: name,
    });
    this.isPickingStart = false;
    if (!startDate) return;

    this.isSaving = true;
    const menusToSave = this.menusToSave();
    // La fase arranca con el objetivo que se ve arriba: el del cliente, o el
    // que el profesional haya tecleado.
    const target = this.clientTarget;

    this.dietTemplateApi
      .create(name, menusToSave, this.clientId)
      .pipe(
        switchMap((creada) =>
          this.dietPhaseApi.create(this.clientId, {
            templateId: creada._id,
            startDate,
            name,
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
          })
        )
      )
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({
            message:
              startDate === localIsoDate()
                ? this.translate.instant('DIET_TEMPLATES.DIETA_CREADA_APLICADA_HOY', { clientName: this.clientName })
                : this.translate.instant('DIET_TEMPLATES.DIETA_CREADA_APLICADA_DESDE_EL', {
                    clientName: this.clientName,
                    startDate: formatIsoDay(startDate, uiLocale(), { day: 'numeric', month: 'long' }),
                  }),
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
                this.translate.instant('DIET_TEMPLATES.LA_DIETA_QUEDO_GUARDADA_COMO', { clientName: this.clientName }),
              this.translate.instant('DIET_TEMPLATES.FECHAS_OCUPADAS'),
              5000
            );
            this.router.navigate(['/tabs/clients', this.clientId]);
            return;
          }
          this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_CREAR_LA'), this.translate.instant('COMMON.ERROR'), 3500);
        },
      });
  }

  // Persistir la siguiente semana. 204 (null) = el contenido es igual al que
  // heredaría: no se escribe nada y se dice.
  private saveNextWeek(menusToSave: DietTemplateMenuPayload[]): void {
    this.dietPhaseApi
      .prepareNextWeek(this.clientId, this.nextWeekPhaseId, menusToSave)
      .subscribe({
        next: (week) => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({
            message: week
              ? this.translate.instant('DIET_TEMPLATES.PREPARADA_PARA', { nextWeekNumber: this.nextWeekNumber, clientName: this.clientName })
              : this.translate.instant('DIET_TEMPLATES.SIN_CAMBIOS_REPETIRA_LO_ANTERIOR', { nextWeekNumber: this.nextWeekNumber }),
            duration: 3000,
          });
          this.router.navigate(['/tabs/clients', this.clientId]);
        },
        error: (err) => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(err?.error?.message || this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_PREPARAR_LA'), this.translate.instant('COMMON.ERROR'), 3500);
        },
      });
  }

  // Guarda la versión del contenido que se edita (y el nombre de la fase, si
  // se cambió). Nunca crea ni aplica nada ni toca ninguna plantilla.
  private savePhaseContent(menusToSave: DietTemplateMenuPayload[]): void {
    const name = this.name.trim();
    const rename$ =
      name && name !== this.phaseName ? this.dietPhaseApi.update(this.clientId, this.phaseId, { name }) : of(null);
    rename$
      .pipe(switchMap(() => this.dietPhaseApi.updateContent(this.clientId, this.phaseId, this.contentId, menusToSave)))
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.savedSnapshot = this.snapshot();
          this.ionicUtilService.showToast({ message: this.translate.instant('DIET_TEMPLATES.DIETA_ACTUALIZADA_PARA', { clientName: this.clientName }), duration: 2500 });
          this.router.navigate(['/tabs/clients', this.clientId]);
        },
        error: () => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDIERON_GUARDAR_LOS'), this.translate.instant('COMMON.ERROR'), 3000);
        },
      });
  }

  // Sin las opciones vacías: abrir una celda y cerrarla sin añadir nada no
  // es un cambio.
  private snapshot(): string {
    return JSON.stringify({
      name: this.name.trim(),
      menus: this.menus.map((menu) => ({
        ...menu,
        meals: menu.meals.map((meal) => ({ ...meal, alternatives: filledAlternatives(meal) })),
      })),
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
