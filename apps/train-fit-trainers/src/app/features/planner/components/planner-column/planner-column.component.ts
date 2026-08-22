import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Split } from 'src/app/core/models/split';
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
export class PlannerColumnComponent {
  @Input() split: Split;
  @Input() table: Table;
  @Input() selected = false;
  // Tarea (2026-08) — atenuada mientras se arrastra un entrenamiento en OTRA
  // columna (ver planner.page.ts#draggingFromSplitId): deja claro que solo
  // se puede reordenar dentro del mismo microciclo.
  @Input() dimmed = false;

  // <app-workout> gatea varias acciones (botón "Agregar ejercicios", menú
  // "⋮") a stateSelected === STATES.static — sin pasarlo explícitamente
  // queda undefined y esas acciones desaparecen/se deshabilitan. El
  // Planificador no tiene el modo STATES.move (reordenar vía drag de Ionic);
  // el drag de cards aquí es CDK, así que siempre es "static".
  public readonly STATES = STATES;

  @Output() columnSelected = new EventEmitter<void>();
  @Output() columnRenamed = new EventEmitter<void>();
  @Output() cardDragStarted = new EventEmitter<void>();
  @Output() cardDragEnded = new EventEmitter<void>();
  // Tarea (2026-08) — "Añadir desde plantilla" tarda varias llamadas
  // seguidas (una por plantilla × microciclo). El padre cubre TODO el
  // tablero con un overlay mientras tanto, así el resultado se revela de
  // golpe en vez de ir apareciendo microciclo a microciclo.
  @Output() templatesApplyStarted = new EventEmitter<void>();
  @Output() templatesApplyEnded = new EventEmitter<void>();

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

  // Tarea 4 (2026-08) — comparar el mismo día entre microciclos: si esta
  // FILA (índice, no workout._id — distinto en cada split) está marcada como
  // sincronizada (checkbox propio, ver toggleRowSync), el estado abierto/
  // cerrado sale del servicio compartido (mismo para todas las columnas) en
  // vez del Set local de esta columna.
  public isCardOpen(workoutId: string, index: number): boolean {
    if (this.rowSync.isSynced(index)) return this.rowSync.isOpen(index);
    return !this.collapsedCardIds.has(workoutId);
  }

  public onCardAccordionChange(event: CustomEvent, workoutId: string, index: number): void {
    const isOpen = event.detail?.value === 'open';
    if (this.rowSync.isSynced(index)) {
      this.rowSync.setOpen(index, isOpen);
      return;
    }
    if (isOpen) this.collapsedCardIds.delete(workoutId);
    else this.collapsedCardIds.add(workoutId);
  }

  public toggleRowSync(event: Event, workoutId: string, index: number): void {
    event.stopPropagation();
    this.rowSync.toggleSynced(index, this.isCardOpen(workoutId, index));
  }

  public selectColumn(): void {
    this.columnSelected.emit();
  }

  public requestRename(event: Event): void {
    event.stopPropagation();
    this.columnRenamed.emit();
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
    this.addCard();
  }

  public chooseCardFromTemplate(): void {
    this.showAddCardPanel = false;
    this.applyTemplateAlert();
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
          .showModal({
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
  public addCard(): void {
    if (this.addingCard) return;
    this.addingCard = true;

    const workout = new Workout();
    workout.name = this.translate.instant('PLANNER.NEW_CARD_DEFAULT_NAME');
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
  public onCardsDropped(event: CdkDragDrop<Workout[]>): void {
    if (!this.table || event.previousIndex === event.currentIndex) return;

    // Snapshot (referencias a los arrays previos, no deep clone — basta para
    // restaurar el orden si falla la persistencia) — con el reorder ahora
    // aplicándose a TODA la tabla, un error a medias dejaría el tablero
    // entero desalineado en vez de solo esta columna.
    const previousOrders = this.table.splits.map((split) => [...split.workouts]);

    this.table.splits.forEach((split) =>
      moveItemInArray(split.workouts, event.previousIndex, event.currentIndex)
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
