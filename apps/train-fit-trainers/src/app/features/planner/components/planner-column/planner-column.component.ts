import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Split, SPLIT_PURPOSES } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { TableService } from 'src/app/core/services/table/table.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { STATES } from 'src/app/shared/constants/states';
import { TemplatePickerModalComponent } from '../template-picker-modal/template-picker-modal.component';
import { PlannerRowSyncService } from '../../services/planner-row-sync.service';
import { PlannerExerciseCopyService } from '../../services/planner-exercise-copy.service';
// Movidas a utils/planner-metrics.ts (2026-09): el modal de comparación
// necesita EXACTAMENTE estos mismos números, y dos copias de las fórmulas se
// desincronizarían dejando dos cifras distintas para lo mismo en la misma
// pantalla.
import { averageRir, formatSignedDelta, sumSets } from '../../utils/planner-metrics';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

// Planificador visual (Fase C) — una columna del tablero (una semana/Split).
// Cabecera seleccionable (activa los botones de la toolbar superior del
// padre) + lista vertical de cards (Workout), cada una renderizada con
// <app-workout [plannerMode]="true">, reutilizando el editor real en vez de
// construir una card desde cero.
@Component({
  selector: 'app-planner-column',
  templateUrl: './planner-column.component.html',
  styleUrls: ['./planner-column.component.scss'],
})
export class PlannerColumnComponent implements AfterViewInit, OnDestroy {
  @ViewChild('columnBody') private bodyRef?: ElementRef<HTMLElement>;

  @Input() split: Split;
  @Input() table: Table;
  @Input() selected = false;
  // Rediseño (2026-09) — posición real de esta columna en table.splits,
  // pasada por el padre (*ngFor; let i = index). Sustituye a split.name
  // como etiqueta ("Microciclo N") y al findIndex por _id que usaba
  // previousSplit: los microciclos ya no se pueden renombrar (deben seguir
  // el mismo orden numérico que la app de cliente, ver mesocycle.page.html),
  // así que la posición es la única fuente de verdad para el nombre.
  @Input() columnIndex = 0;

  // Reordenar microciclos (2026-09) — mismo modo que activa cdkDrag en la
  // columna (ver planner.page.ts#reorderMode). Mientras está activo, las
  // cards se fuerzan cerradas y bloqueadas (ver isCardOpen +
  // ion-accordion-group[disabled] en el template): arrastrar toda la
  // columna con una card abierta debajo invita a soltar el drag encima del
  // acordeón y toquetear su contenido sin querer, además de que el
  // scroll/gesto de abrir choca con el de arrastrar en móvil.
  @Input() reorderMode = false;
  // Reordenar entrenamientos (2026-09) — modo propio, distinto del de
  // microciclos (ver planner.page.ts#reorderCardsMode). Activa el
  // ion-reorder-group de la columna y, igual que reorderMode, pliega y
  // bloquea las cards: arrastrar una card abierta de cientos de px no se
  // puede apuntar bien.
  @Input() reorderCardsMode = false;

  // <app-workout> gatea varias acciones (botón "Agregar ejercicios", menú
  // "⋮") a stateSelected === STATES.static — sin pasarlo explícitamente
  // queda undefined y esas acciones desaparecen/se deshabilitan. El
  // Planificador no usa STATES.move (el ion-reorder de la app de cliente
  // dentro de <app-workout>); reordenar cards va por reorderCardsMode, así
  // que siempre es "static".
  public readonly STATES = STATES;

  @Output() columnSelected = new EventEmitter<void>();
  // Tarea (2026-08) — "Añadir desde plantilla" tarda varias llamadas
  // seguidas (una por plantilla × microciclo). El padre cubre TODO el
  // tablero con un overlay mientras tanto, así el resultado se revela de
  // golpe en vez de ir apareciendo microciclo a microciclo.
  @Output() templatesApplyStarted = new EventEmitter<void>();
  @Output() templatesApplyEnded = new EventEmitter<void>();
  // Movimiento 6 Coach Pro — qué sesión está mirando el entrenador, para el
  // panel de carga. Se emite al ABRIR una card, que es la señal más honesta
  // que da el tablero: no hay un concepto de "sesión seleccionada".
  @Output() workoutFocused = new EventEmitter<Workout>();
  // Movimiento 6 Coach Pro — el objetivo y el tipo del bloque se editan en la
  // página, no aquí: la columna solo dice que se han pedido.
  @Output() purposeRequested = new EventEmitter<void>();
  @Output() objectiveRequested = new EventEmitter<void>();

  public addingCard = false;
  public showAddCardPanel = false;

  private readonly tableService = inject(TableService);
  private readonly workoutService = inject(WorkoutService);
  public readonly rowSync = inject(PlannerRowSyncService);
  public readonly exerciseCopy = inject(PlannerExerciseCopyService);
  private readonly workoutTemplateApi = inject(WorkoutTemplateApiService);
  // TASK-017 — ver planner.page.ts, mismo fix: evita que una respuesta HTTP
  // tardía de una columna ya destruida (cliente/tabla anterior) escriba
  // sobre TableService.currentTable (señal global) tras navegar a otra.
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
    private router: Router
  ) {}

  public get totalExercises(): number {
    return (this.split.workouts || []).reduce((sum, w) => sum + (w.exercises?.length || 0), 0);
  }

  // --- Microciclo completado (2026-09) ---
  //
  // "Completado" = todas sus filas están resueltas: entrenadas (workout.date,
  // el sello que pone el cliente al terminar) o saltadas explícitamente
  // (workout.rest), más los descansos pautados por el entrenador
  // (isPlannedRestDay), que nunca hubo que entrenar. Mismo criterio de
  // "hecho" que usa el resto de la app: se mira `date`, no si hay series con
  // doned — duplicar un microciclo arrastra los valores del origen y solo
  // limpia `doned`, así que contar series haría parecer entrenado un
  // microciclo recién copiado.
  //
  // Un microciclo vacío NO cuenta como completado: cero filas resueltas de
  // cero no es "terminado", es "sin empezar a montar".
  public get isCompleted(): boolean {
    const workouts = this.split?.workouts || [];
    if (!workouts.length) return false;
    return workouts.every((w) => !!w.date || !!w.rest || !!w.isPlannedRestDay);
  }

  public isWorkoutCompleted(workout: Workout): boolean {
    return !!workout?.date;
  }

  // El back renombra la fila entera (ese índice en todos los microciclos):
  // se refleja igual aquí, como hace mesocycle.page.ts#onWorkoutNameUpdated
  // en la app de cliente. Sin esto el nombre nuevo solo salía al recargar.
  public onWorkoutNameUpdated(event: { workoutIndex: number; newName: string }): void {
    this.table.splits.forEach((splitTemp) => {
      const workout = splitTemp.workouts?.[event.workoutIndex];
      if (workout) workout.name = event.newName;
    });
  }

  // --- Fase D (planner-audit) — comparación contra el microciclo anterior ---
  //
  // Solo se calcula/pinta cuando la columna está SELECTED: veinte columnas
  // con esto siempre visible sería justo el ruido que el propio Planner ya
  // evita en otros sitios (ver purposeLabel, "una etiqueta 'Normal' en cada
  // columna sería ruido").
  //
  // Deliberadamente SIN color semántico (verde=sube/rojo=baja): el propio
  // editSplitPurpose ya dice por qué — "en una descarga, que el volumen baje
  // es lo previsto". Un delta no es bueno ni malo sin el propósito del
  // bloque, que ya está un clic más arriba (chip de tipo). Aquí solo se
  // informa la magnitud y el sentido.

  public get previousSplit(): Split | null {
    if (!this.table) return null;
    return this.columnIndex > 0 ? this.table.splits[this.columnIndex - 1] : null;
  }

  public get totalSets(): number {
    return sumSets(this.split);
  }

  public get avgRir(): number | null {
    return averageRir(this.split);
  }

  public get avgRirLabel(): string {
    return this.avgRir === null
      ? '—'
      : new Intl.NumberFormat(uiLocale(), { maximumFractionDigits: 1 }).format(this.avgRir);
  }

  public get setsDeltaText(): string | null {
    if (!this.previousSplit) return null;
    return formatSignedDelta(this.totalSets - sumSets(this.previousSplit), (n) =>
      `${Math.round(n)}`
    );
  }

  public get rirDeltaText(): string | null {
    if (!this.previousSplit) return null;
    const current = this.avgRir;
    const previous = averageRir(this.previousSplit);
    if (current === null || previous === null) return null;
    return formatSignedDelta(current - previous, (n) =>
      new Intl.NumberFormat(uiLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)
    );
  }

  public trackByWorkoutId(_index: number, workout: Workout): string {
    return workout._id;
  }

  // <ion-accordion> (raíz del template de workout.component.html) SOLO
  // muestra su slot="content" cuando un <ion-accordion-group> padre lo
  // orquesta — sin ese grupo, Ionic lo trata como colapsado sin importar
  // nada más (bug real encontrado en verificación de navegador: el botón
  // "Agregar ejercicios" funcionaba pero el contenido nunca se veía). Cada
  // card tiene su PROPIO <ion-accordion-group> (uno por workout, no uno
  // compartido por columna) — "varias abiertas a la vez" ya sale gratis de
  // eso, sin necesitar [multiple]="true" en el grupo (que sí hacía falta:
  // con multiple, Ionic trata `value` como array de membresía y lo va
  // ACUMULANDO en vez de reemplazarlo — cada clic sumaba una entrada nueva
  // en vez de sustituir 'open'/'closed', bug real encontrado en
  // verificación — "Comparar con otras semanas" lo hacía mucho más visible
  // al multiplicar los toggles, pero afectaba a CUALQUIER card, sincronizada
  // o no). Cada card empieza expandida (Set vacío = nada colapsado);
  // "Colapsarse/Expandirse" del pedido original se resuelve con este Set,
  // igual que openWorkoutIndex en mesocycle.page.ts.
  public collapsedCardIds = new Set<string>();

  // Tarea 4 (2026-08, interruptor global 2026-09) — comparar el mismo día
  // entre microciclos: con "Modo comparación" activo (ver PlannerRowSyncService
  // #compareAllMode, interruptor único en la toolbar del padre), el estado
  // abierto/cerrado de esta FILA (índice, no workout._id — distinto en cada
  // split) sale del servicio compartido (mismo para todas las columnas) en
  // vez del Set local de esta columna.
  public isCardOpen(workoutId: string, index: number): boolean {
    if (this.reorderMode || this.reorderCardsMode) return false;
    if (this.rowSync.compareAllMode) return this.rowSync.isOpen(index);
    return !this.collapsedCardIds.has(workoutId);
  }

  // Bug real (2026-09) — el panel de carga decía "elige una sesión del
  // tablero" para siempre. La sesión enfocada solo se emitía desde el
  // ionChange del acordeón, pero las cards NACEN abiertas (collapsedCardIds
  // vacío) e ionChange de Ionic solo se emite por interacción del usuario
  // (asignar [value] por binding emite ionValueChange, no ionChange): al
  // entrar al Planner no se disparaba ninguno, así que el panel se quedaba
  // vacío con todas las sesiones abiertas delante, y solo despertaba si el
  // entrenador cerraba y volvía a abrir una card.
  //
  // Tocar la card ES el gesto honesto de "estoy mirando esta sesión". No
  // hace stopPropagation ni preventDefault: solo emite, así que no interfiere
  // con arrastrar, copiar ejercicios ni editar series dentro.
  public focusWorkout(workout: Workout): void {
    this.workoutFocused.emit(workout);
  }

  // --- Scroll sincronizado con "Alinear filas" (2026-09) ---
  //
  // Con el modo activo, desplazar esta columna desplaza las demás a la misma
  // altura (ver PlannerRowSyncService). Sin esto, "alinear filas" solo
  // igualaba abierto/cerrado: el entrenador seguía teniendo que buscar el
  // día 4 columna por columna, que era justo el trabajo que quería evitar.
  // Identidad estable de esta columna dentro del servicio: el _id del split,
  // que es lo que ya usa el trackBy del padre (una instancia por split).
  private get scrollId(): string {
    return this.split?._id || `col-${this.columnIndex}`;
  }

  public onBodyScroll(event: Event): void {
    if (!this.rowSync.compareAllMode) return;
    const target = event.target as HTMLElement | null;
    if (target) this.rowSync.publishScroll(this.scrollId, target.scrollTop);
  }

  public ngAfterViewInit(): void {
    this.rowSync.registerScroll(this.scrollId, (top) => {
      const element = this.bodyRef?.nativeElement;
      if (element && Math.abs(element.scrollTop - top) > 1) element.scrollTop = top;
    });
  }

  public ngOnDestroy(): void {
    this.rowSync.unregisterScroll(this.scrollId);
  }

  public onCardAccordionChange(
    event: CustomEvent,
    workoutId: string,
    index: number,
    workout?: Workout
  ): void {
    // [disabled] en el ion-accordion-group ya evita el toggle por click, pero
    // ionChange sigue siendo un evento del propio componente Ionic — no fiarse
    // solo del atributo si algo lo dispara igualmente.
    if (this.reorderMode || this.reorderCardsMode) return;
    const isOpen = event.detail?.value === 'open';

    // Movimiento 6 Coach Pro — abrir una card es lo más parecido a "estoy
    // mirando esta sesión", y es lo que el panel de carga necesita saber. Se
    // emite antes del reparto de estado abierto/cerrado porque no depende de
    // él: la sesión enfocada es la misma esté activo el modo comparación o no.
    if (isOpen && workout) this.workoutFocused.emit(workout);

    if (this.rowSync.compareAllMode) {
      this.rowSync.setOpen(index, isOpen);
      return;
    }
    if (isOpen) this.collapsedCardIds.delete(workoutId);
    else this.collapsedCardIds.add(workoutId);
  }

  public selectColumn(): void {
    this.columnSelected.emit();
  }

  // --- Movimiento 6 Coach Pro: qué es este bloque y qué busca ---

  public requestPurpose(event: Event): void {
    event.stopPropagation();
    this.purposeRequested.emit();
  }

  public requestObjective(event: Event): void {
    event.stopPropagation();
    this.objectiveRequested.emit();
  }

  // Vacío cuando el microciclo es "normal": una etiqueta "Normal" en cada
  // una de las veinte columnas sería ruido, y lo que hay que ver de un
  // vistazo es dónde están las descargas.
  public get purposeLabel(): string {
    const purpose = this.split?.purpose;
    if (!purpose || purpose === 'regular') return '';
    return SPLIT_PURPOSES.find((option) => option.key === purpose)?.label || '';
  }

  // Punto 3 (mejoras Planner, 2026-09) — confusión real reportada: "no
  // entiendo el Tipo, se sale de mi información en la app principal". Tiene
  // sentido que no aparezca ahí — es una nota exclusiva del entrenador, el
  // cliente nunca la ve. El tooltip lo deja explícito al pasar el cursor,
  // sin esperar a abrir el diálogo de edición para descubrirlo.
  public get purposeTooltip(): string {
    return this.translate.instant('PLANNER.NOTA_SOLO_PARA_TI_NO');
  }

  private persistTable(): void {
    this.tableService.setCurrentTable = this.table;
  }

  // Plantillas de entrenamiento — el botón "+ Añadir tarjeta" ofrece elegir
  // entre una card en blanco (flujo de siempre) o materializar una plantilla
  // real (bloques/ejercicios/series ya prescritas) en este split. Panel
  // propio de la app (mismo patrón bottom-sheet que "Asignar rutina" en
  // client-detail) en vez del ActionSheet nativo de Ionic — se cierra
  // tocando el fondo, sin botón "Cancelar" explícito.
  public addCardOptions(): void {
    if (this.addingCard) return;
    this.showAddCardPanel = true;
  }

  public closeAddCardPanel(): void {
    this.showAddCardPanel = false;
  }

  public chooseBlankCard(): void {
    this.showAddCardPanel = false;
    void this.addCard();
  }

  public chooseCardFromTemplate(): void {
    this.showAddCardPanel = false;
    this.applyTemplateAlert();
  }

  // Tarea 4 (2026-09) — descanso pautado. Mismo fan-out que "En blanco"
  // (addCard), no un mecanismo nuevo: así el invariante de "misma cantidad
  // de filas en todos los microciclos" se mantiene automáticamente.
  public chooseRestDayCard(): void {
    this.showAddCardPanel = false;
    this.addRestDayCard();
  }

  // TASK-043 (MASTER_BACKLOG.md) — antes un AlertOptions de texto plano, un
  // botón por plantilla, sin filtro ni preview (no escalaba más allá de
  // ~10). Ahora abre TemplatePickerModalComponent con las plantillas ya
  // cargadas por este mismo `list()` — cero llamadas nuevas a backend.
  private applyTemplateAlert(): void {
    this.workoutTemplateApi.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (templates) => {
        if (!templates.length) {
          this.ionicUtilService.showToast({
            message: this.translate.instant('PLANNER.NO_TEMPLATES_YET'),
            duration: 2500,
          });
          void this.router.navigateByUrl('/tabs/routines');
          return;
        }

        this.ionicUtilService
          .showSidePanel({
            component: TemplatePickerModalComponent,
            componentProps: { templates },
            cssClass: 'tf-panel-modal',
          })
          .then((res) => {
            const templateIds: string[] = res.data;
            if (templateIds?.length) this.applyTemplatesToAllSplits(templateIds);
          });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.ADD_CARD_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  // Multi-selección (2026-08), fan-out a todos los splits (2026-08) —
  // applyToSplit() es por-plantilla Y por-split (no hay endpoint bulk en el
  // backend), así que cada (plantilla × microciclo) se aplica EN SECUENCIA
  // (una request tras otra, nunca en paralelo: cada respuesta trae
  // table.splits completo y aplicarlas a la vez pisaría el resultado de las
  // demás). Orden plantillas-fuera/splits-dentro a propósito: la plantilla A
  // se añade a TODOS los splits (mismo índice final en cada uno) antes de
  // empezar con la B — si fuera al revés, cada split acabaría con las
  // plantillas en índices distintos entre sí. Mismo criterio de simetría que
  // "En blanco" (addCard, ya hace fan-out) — necesario para que
  // reorderWorkoutRows (mover un entrenamiento) siga funcionando después.
  //
  // Cada job SIGUE siendo una request real al backend (no hay endpoint bulk
  // que las sustituya por una sola) — lo que cambia es que `this.table` NO
  // se toca hasta que TERMINA el último job: antes, cada respuesta pisaba
  // this.table.splits al vuelo y el tablero iba revelando el resultado
  // microciclo a microciclo según llegaba cada respuesta. Ahora el padre
  // (PlannerPage) tapa el tablero entero con un overlay durante toda la
  // secuencia (templatesApplyStarted/Ended) y el resultado se aplica de una
  // sola vez al final, como si fuera una única acción atómica.
  private applyTemplatesToAllSplits(templateIds: string[]): void {
    if (!this.table) return;
    this.addingCard = true;
    this.templatesApplyStarted.emit();
    const jobs = templateIds.flatMap((templateId) =>
      this.table.splits.map((split) => ({ templateId, splitId: split._id }))
    );
    this.runApplyTemplateJob(jobs, 0, null);
  }

  private runApplyTemplateJob(
    jobs: Array<{ templateId: string; splitId: string }>,
    index: number,
    latestSplits: Split[] | null
  ): void {
    if (index >= jobs.length) {
      this.finishApplyTemplates(latestSplits);
      return;
    }
    const job = jobs[index];

    this.workoutTemplateApi
      .applyToSplit(this.table.userId, job.splitId, job.templateId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (splits) => this.runApplyTemplateJob(jobs, index + 1, splits),
        error: () => {
          // Los jobs anteriores YA se guardaron en el backend (cada uno es
          // su propia request confirmada) — se aplica el último resultado
          // conocido en vez de descartarlo, para no dejar la UI
          // desincronizada de lo que el backend realmente tiene.
          this.finishApplyTemplates(latestSplits);
          this.ionicUtilService.showToast({
            message: this.translate.instant('PLANNER.ADD_CARD_ERROR'),
            duration: 2500,
          });
        },
      });
  }

  private finishApplyTemplates(latestSplits: Split[] | null): void {
    if (latestSplits) {
      this.table.splits = latestSplits;
      const updatedSplit = latestSplits.find((s) => s._id === this.split._id);
      if (updatedSplit) this.split.workouts = updatedSplit.workouts;
      this.persistTable();
    }
    this.addingCard = false;
    this.templatesApplyEnded.emit();
  }

  // Crea el nuevo entrenamiento en TODOS los microciclos a la vez, mismo
  // índice (al final de cada split) — igual que ya hace el creador de rutinas
  // de la app de cliente (mesocycle.page.ts, workoutService.addWorkoutsToSplits,
  // POST workouts/multiple/:idTable). Antes solo se creaba en este split
  // (splitService.addWorkoutToSplit), obligando a repetir la acción semana a
  // semana para mantener la misma estructura entre microciclos.
  // Pide nombre antes de crear (antes se creaba directo como "Nuevo
  // entrenamiento" y había que entrar a renombrarlo aparte). Mismo patrón de
  // ion-alert que renameTable() en planner.page.ts.
  public async addCard(): Promise<void> {
    if (this.addingCard) return;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.NEW_CARD_NAME_TITLE'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translate.instant('PLANNER.NEW_CARD_NAME_PLACEHOLDER'),
          attributes: { maxlength: 100 },
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data: any) => {
            const name = (data?.name || '').trim();
            if (!name) {
              this.ionicUtilService.showToast({
                message: this.translate.instant('PLANNER.NEW_CARD_NAME_EMPTY'),
                duration: 2000,
              });
              return false;
            }
            this.createBlankCard(name);
            return true;
          },
        },
      ],
    });
  }

  private createBlankCard(name: string): void {
    this.addingCard = true;

    const workout = new Workout();
    workout.name = name;
    workout.exercises = [];

    this.workoutService.addWorkoutsToSplits(this.table._id, workout).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (splits) => {
        const updatedSplit = splits.find((s) => s._id === this.split._id);
        if (updatedSplit) this.split.workouts = updatedSplit.workouts;
        this.table.splits = splits;
        this.persistTable();
        this.addingCard = false;
      },
      error: () => {
        this.addingCard = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.ADD_CARD_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  // Tarea 4 (2026-09) — idéntico a addCard() salvo por isPlannedRestDay: es
  // el mismo POST workouts/multiple/:idTable con fan-out a todos los splits,
  // solo cambia el payload. Cero cambios en reorderWorkoutRows/borrado.
  public addRestDayCard(): void {
    if (this.addingCard) return;
    this.addingCard = true;

    const workout = new Workout();
    workout.name = this.translate.instant('PLANNER.REST_DAY_DEFAULT_NAME');
    workout.exercises = [];
    workout.isPlannedRestDay = true;

    this.workoutService.addWorkoutsToSplits(this.table._id, workout).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (splits) => {
        const updatedSplit = splits.find((s) => s._id === this.split._id);
        if (updatedSplit) this.split.workouts = updatedSplit.workouts;
        this.table.splits = splits;
        this.persistTable();
        this.addingCard = false;
      },
      error: () => {
        this.addingCard = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.ADD_CARD_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  // Tarea (2026-08) — reordenar un entrenamiento dentro de un microciclo
  // reordena la MISMA posición en TODOS los demás, igual que ya hace la app
  // de cliente (mesocycle.page.ts#handleWorkoutReorder + confirmWorkoutOrder):
  // primero se refleja el mismo movimiento fromIndex→toIndex en cada split en
  // memoria (para que el tablero entero se vea reordenado al instante, no
  // solo la columna arrastrada), y se persiste con una única llamada a
  // workoutService.reorderWorkoutRows (por-tabla, ya usado y probado por la
  // app de cliente) en vez de reorderWorkoutsInSplit (por-split, dejaba las
  // demás columnas desalineadas). Exige que todos los splits tengan el MISMO
  // número de entrenamientos — invariante que ya mantienen crear (addCard/
  // plantillas, fan-out a todos) y borrar (mismo índice en todos, ver
  // workout.component.ts#deleteWorkouts) en toda la app.
  public onCardsReordered(event: CustomEvent<ItemReorderEventDetail>): void {
    const { from, to } = event.detail;
    // false: Ionic no mueve el DOM, solo quita sus transform; lo recoloca
    // el *ngFor al cambiar split.workouts (si no, se moverían dos veces).
    event.detail.complete(false);
    if (!this.table || from === to) return;

    // Snapshot (referencias a los arrays previos, no deep clone — basta para
    // restaurar el orden si falla la persistencia) — con el reorder ahora
    // aplicándose a TODA la tabla, un error a medias dejaría el tablero
    // entero desalineado en vez de solo esta columna.
    const previousOrders = this.table.splits.map((split) => [...split.workouts]);

    this.table.splits.forEach((split) =>
      moveItemInArray(split.workouts, from, to)
    );
    this.persistTable();

    const order = this.split.workouts.map((w) => w._id);
    this.workoutService.reorderWorkoutRows(this.table._id, order).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (splits) => {
        this.table.splits = splits;
        this.persistTable();
      },
      error: () => {
        this.table.splits.forEach((split, index) => (split.workouts = previousOrders[index]));
        this.persistTable();
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.REORDER_CARDS_ERROR'),
          duration: 2500,
        });
      },
    });
  }

}
