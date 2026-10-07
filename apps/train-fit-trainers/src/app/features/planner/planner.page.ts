import { Component, DestroyRef, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertOptions, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Split, SPLIT_PURPOSES, SplitPurpose } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { TableService } from 'src/app/core/services/table/table.service';
import { SplitService } from 'src/app/core/services/split/split.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CompareSplitsModalComponent } from './components/compare-splits-modal/compare-splits-modal.component';
import { PlannerRowSyncService } from './services/planner-row-sync.service';
import { PlannerExerciseCopyService } from './services/planner-exercise-copy.service';
import { ClientDetailApiService } from '../clients/pages/client-detail/services/client-detail-api.service';
import { latestPlannerPain, PlannerPain } from './utils/planner-pain';
import { TrainerInvitesApiService } from '../invites/services/trainer-invites-api.service';
import { RoutineTemplateApiService } from 'src/app/core/services/routine-template/routine-template-api.service';
import {
  ClientIntake,
  EquipmentTag,
  EQUIPMENT_TAG_LABELS,
  TrainingLocation,
  TRAINING_LOCATION_LABELS,
} from '../invites/models/trainer-invite.model';

// Planificador visual de periodización (Fase C) — sustituye a mesocycle.page.ts
// como constructor de rutinas de train-fit-trainers. Tablero Kanban: columnas
// = semanas (Split), cards = entrenamientos (Workout). Se abre como ruta
// completa (/tabs/clients/:clientId/tables/:tableId/planner, anidada bajo
// 'tabs' desde TASK-026 — ver shell-routing.module.ts), no como modal —
// necesita todo el ancho para mostrar varias semanas a la vez. La tabla se
// siembra vía TableInContextResolver (ya existente, reutilizado sin
// cambios) en TableService.currentTable().
@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
  // Tarea 4 (2026-08) — una sola instancia de PlannerRowSyncService por
  // rutina abierta, compartida por todas las columnas (ver
  // planner-column.component.ts). A nivel de componente, no de módulo: cada
  // vez que se abre el Planificador (otra rutina) empieza sin nada
  // sincronizado, no arrastra estado de la rutina anterior.
  // "Copiar ejercicios" (2026-08) — mismo criterio que PlannerRowSyncService:
  // una instancia por rutina abierta, compartida por todas las columnas (ver
  // planner-exercise-copy.service.ts) para que copiar en un microciclo y
  // pegar en otro funcione igual que entre workouts de la misma semana.
  providers: [PlannerRowSyncService, PlannerExerciseCopyService],
})
export class PlannerPage {
  public table: Table | null = null;
  public selectedSplitId: string | null = null;

  // Movimiento 6 Coach Pro — la sesión que el entrenador está mirando, para
  // el panel de carga. Sale de abrir una card (ver planner-column), que es
  // la señal más honesta que da el tablero: no hay un concepto de "sesión
  // seleccionada" y no merece la pena inventarlo solo para esto.
  public focusedWorkout: Workout | null = null;
  public busy = false;

  // Reordenar microciclos (2026-09) — antes cdkDrag SIEMPRE activo en la
  // columna; en móvil el gesto de arrastre choca con el scroll horizontal
  // del tablero y no engancha bien. Ahora el drag solo se activa con este
  // modo explícito (botón en la toolbar, mismo patrón que "Alinear filas"),
  // así el scroll normal del dedo nunca se confunde con "quiero mover esto".
  public reorderMode = false;

  public toggleReorderMode(): void {
    this.reorderMode = !this.reorderMode;
    if (this.reorderMode) this.reorderCardsMode = false;
  }

  // Reordenar entrenamientos (2026-09) — ion-reorder dentro de cada
  // microciclo, con su propio botón. Excluyente con reorderMode: los dos a
  // la vez mezclarían dos gestos de arrastre sobre la misma card.
  public reorderCardsMode = false;

  public toggleReorderCardsMode(): void {
    this.reorderCardsMode = !this.reorderCardsMode;
    if (this.reorderCardsMode) this.reorderMode = false;
  }

  // Tarea (2026-08) — "Añadir desde plantilla" hace varias llamadas seguidas
  // (una por plantilla × microciclo); mientras dura la secuencia, el tablero
  // entero queda cubierto por un overlay (ver planner-column.component.ts,
  // templatesApplyStarted/Ended) para que el resultado se revele de golpe en
  // vez de ir apareciendo microciclo a microciclo según llega cada respuesta.
  public applyingTemplates = false;

  // Punto 1 (mejoras Planner, 2026-09) — "Equipamiento utilizado" del
  // cliente, consultable desde el botón "Material" de la barra (panel
  // lateral, ver planner.page.html) sin salir a la ficha. Mismo endpoint que
  // ya usa client-detail.page.ts#loadClientIntake — null mientras carga, en
  // templateMode (biblioteca de plantillas propia del profesional, sin
  // cliente real) o si el cliente no ha respondido cuestionario aún.
  public clientIntake: ClientIntake | null = null;
  // "Salud / lesiones" del intake, junto al dolor. null si no puso nada.
  public get intakeInjuries(): string | null {
    return this.clientIntake?.healthConditions?.trim() || null;
  }
  public showEquipmentPanel = false;
  public clientPain: PlannerPain[] = [];
  public painEnabled = false;
  public get activeClientPain(): PlannerPain[] { return this.clientPain.filter((entry) => entry.level > 0); }
  public painState: 'loading' | 'loaded' | 'error' = 'loading';
  private readonly clientDetailApi = inject(ClientDetailApiService);

  private readonly tableService = inject(TableService);
  private readonly splitService = inject(SplitService);
  private readonly trainerInvitesApi = inject(TrainerInvitesApiService);
  private readonly routineTemplateApi = inject(RoutineTemplateApiService);
  // "Copiar ejercicios" — banner "Cancelar" (2026-08, ver planner.page.html)
  // — misma instancia que inyectan las columnas, expuesta aquí para el botón
  // de cancelar a nivel de tablero completo.
  public readonly exerciseCopy = inject(PlannerExerciseCopyService);
  // Punto 4 (mejoras Planner, 2026-09) — misma instancia que inyectan las
  // columnas (ver planner-column.component.ts), expuesta aquí para el
  // interruptor global "Modo comparación" de la barra de herramientas.
  public readonly rowSync = inject(PlannerRowSyncService);
  // TASK-017 (MASTER_BACKLOG.md) — ninguno de los subscribe() de abajo
  // cancelaba su suscripción al destruirse el componente: una respuesta HTTP
  // tardía de una acción sobre el cliente A podía llegar y escribir sobre
  // TableService.currentTable (señal GLOBAL) después de que el usuario ya
  // hubiera navegado al Planner del cliente B, mezclando datos entre
  // clientes. destroyRef + takeUntilDestroyed() corta cualquier callback
  // pendiente en cuanto el componente se destruye.
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {
    const query = this.route.snapshot.queryParamMap;
    if (query.get('split') || query.get('workout') || query.get('exercise')) {
      this.pendingFocus = { split: query.get('split'), workout: query.get('workout'), exercise: query.get('exercise') };
    }

    effect(() => {
      const table = this.tableService.currentTable();
      if (table) {
        this.table = table;
        this.focusFromQuery();
      }
    });

    this.loadClientIntake();
  }

  // Notas del cliente (ficha > Plan) — al pulsar una nota se llega aquí con
  // ?split=&workout=&exercise=: se selecciona ese microciclo, se lleva el
  // ejercicio (o el día) a la vista y se resalta un momento. Solo una vez:
  // después el tablero es del entrenador.
  private pendingFocus: { split: string | null; workout: string | null; exercise: string | null } | null = null;

  private focusFromQuery(): void {
    const focus = this.pendingFocus;
    if (!focus || !this.table) return;
    // currentTable es una señal global: mientras resuelve, puede seguir
    // siendo la tabla anterior. Se espera a la que contiene el microciclo.
    const split = focus.split ? this.table.splits.find((candidate) => candidate._id === focus.split) : null;
    if (focus.split && !split) return;
    this.pendingFocus = null;
    if (split) this.selectedSplitId = split._id;
    setTimeout(() => this.scrollToFocus(focus), 300);
  }

  private scrollToFocus(focus: { split: string | null; workout: string | null; exercise: string | null }): void {
    const element =
      (focus.exercise && document.querySelector<HTMLElement>(`[data-exercise-id="${focus.exercise}"]`)) ||
      (focus.workout && document.getElementById(`planner-workout-${focus.workout}`)) ||
      (focus.split && document.getElementById(`planner-split-${focus.split}`));
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    element.classList.add('planner-note-focus');
    setTimeout(() => element.classList.remove('planner-note-focus'), 2400);
  }

  public ionViewWillEnter(): void { this.loadClientPain(); }

  public ionViewWillLeave(): void {
    this.showEquipmentPanel = false;
    void this.ionicUtilService.closeSidePanels();
  }

  public loadClientPain(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    this.painEnabled = !!clientId && !this.route.snapshot.data['templateMode'];
    if (!clientId || this.route.snapshot.data['templateMode']) {
      this.painState = 'loaded';
      return;
    }
    this.painState = 'loading';
    this.clientDetailApi.getClientPain(clientId, 7).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ entries, thresholds }) => {
        this.clientPain = latestPlannerPain(entries, thresholds);
        this.painState = 'loaded';
      },
      error: () => { this.painState = 'error'; },
    });
  }

  // Punto 1 — clientId sale de la ruta, no de
  // this.table (puede tardar en poblarse vía el resolver). En templateMode
  // no hay cliente real (table.userId es el propio profesional), así que no
  // tiene sentido pedir un cuestionario que no existe.
  private loadClientIntake(): void {
    if (this.route.snapshot.data['templateMode']) return;
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (!clientId) return;

    this.trainerInvitesApi
      .getClientIntake(clientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (intake) => (this.clientIntake = intake),
        error: () => (this.clientIntake = null),
      });
  }

  public trainingLocationLabel(location: TrainingLocation | null): string {
    return location ? TRAINING_LOCATION_LABELS[location] || location : '';
  }

  public equipmentTagLabel(tag: EquipmentTag): string {
    return EQUIPMENT_TAG_LABELS[tag] || tag;
  }

  public get hasEquipmentInfo(): boolean {
    return !!(
      this.clientIntake?.trainingLocation ||
      this.clientIntake?.equipmentTags?.length
    );
  }

  // El "Volver" del Planificador lo resuelve ahora la cabecera común
  // (app-page-header + TrainerNavigationService): historial real primero y,
  // sin él (deep link o F5), el `data.parent` declarado en el routing —
  // '/tabs/routine-templates' en modo plantilla y '/tabs/clients/:clientId'
  // cuando se abre desde la ficha de un cliente. Esto sustituye al antiguo
  // close() y al parche ?returnTab=, que solo servía para que ClientDetailPage
  // reabriera la pestaña correcta: esa pestaña la restaura ahora la propia
  // ficha desde su estado de vista.

  // El título del header no tenía forma de editarse — sobre el propio Table
  // (tableService.updateTableName, ya existente en shared-core, nunca
  // consumido desde esta app). A diferencia de los microciclos (ver punto 2,
  // splitLabel), el nombre de la RUTINA sí sigue siendo editable: es el
  // propio Table.name, no un Split — nada exige que siga un orden numérico.
  public async renameTable(): Promise<void> {
    if (!this.table) return;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.RENAME_ROUTINE'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.table.name || '',
          attributes: { maxlength: 100 },
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data: any) => {
            const name = (data?.name || '').trim();
            if (!name || !this.table) return false;
            this.table.name = name;
            this.persistTable();
            this.tableService.updateTableName(this.table).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
              error: () => {
                this.ionicUtilService.showToast({
                  message: this.translate.instant('PLANNER.RENAME_ROUTINE_ERROR'),
                  duration: 2500,
                });
              },
            });
            return true;
          },
        },
      ],
    });
  }

  // "Guardar como plantilla" solo tiene sentido sobre la rutina de un
  // cliente: en templateMode la tabla YA es una plantilla propia.
  public get canSaveAsTemplate(): boolean {
    return !!this.table && !this.route.snapshot.data['templateMode'];
  }

  public async saveAsTemplate(): Promise<void> {
    if (!this.canSaveAsTemplate) return;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.SAVE_AS_TEMPLATE'),
      message: this.translate.instant('PLANNER.SAVE_AS_TEMPLATE_HINT'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          label: this.translate.instant('PLANNER.SAVE_AS_TEMPLATE_NAME'),
          value: this.translate.instant('PLANNER.SAVE_AS_TEMPLATE_DEFAULT_NAME', { name: this.table?.name || '' }),
          attributes: { maxlength: 100 },
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.SAVE'),
          cssClass: 'alert-button-primary',
          handler: (data: any) => {
            const name = (data?.name || '').trim();
            if (!name || !this.table) return false;
            this.routineTemplateApi
              .createFromTable(this.table._id, name)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: () =>
                  this.ionicUtilService.showToast({
                    message: this.translate.instant('PLANNER.SAVE_AS_TEMPLATE_SUCCESS'),
                    duration: 2500,
                  }),
                error: () =>
                  this.ionicUtilService.showToast({
                    message: this.translate.instant('PLANNER.SAVE_AS_TEMPLATE_ERROR'),
                    duration: 2500,
                    color: 'danger',
                  }),
              });
            return true;
          },
        },
      ],
    });
  }

  public get selectedSplit(): Split | null {
    if (!this.table || !this.selectedSplitId) return null;
    return this.table.splits.find((s) => s._id === this.selectedSplitId) || null;
  }

  public selectSplit(splitId: string): void {
    this.selectedSplitId = this.selectedSplitId === splitId ? null : splitId;

    // Respaldo del foco de sesión (2026-09): si al seleccionar un microciclo
    // no hay ninguna sesión enfocada, o la que había es de OTRO microciclo,
    // se enfoca la primera de este. Sin esto la pestaña "Sesión" del panel
    // se quedaba vacía hasta que el entrenador tocaba una card, y no había
    // nada que le dijera que ese era el gesto que faltaba.
    const split = this.selectedSplit;
    if (!split?.workouts?.length) return;
    const focusBelongsHere = split.workouts.some((w) => w._id === this.focusedWorkout?._id);
    if (!focusBelongsHere) this.focusedWorkout = split.workouts[0];
  }

  // Panel de volumen (Fase B, planner-audit) — el microciclo inmediatamente
  // anterior al seleccionado, para el delta. null si no hay seleccionado o
  // el seleccionado ya es el primero (nada con qué comparar).
  public get previousSplit(): Split | null {
    if (!this.table || !this.selectedSplitId) return null;
    const index = this.table.splits.findIndex((s) => s._id === this.selectedSplitId);
    return index > 0 ? this.table.splits[index - 1] : null;
  }

  public trackBySplitId(_index: number, split: Split): string {
    return split._id;
  }

  private persistTable(): void {
    if (this.table) this.tableService.setCurrentTable = this.table;
  }

  // --- Toolbar: gestión de semanas ---

  // Tarea (2026-08) — "Añadir microciclo" ya NO crea uno vacío cuando ya hay
  // otros: se duplica el ÚLTIMO (mismo criterio que la app de cliente
  // usa con su microciclo "actual" — aquí no hay concepto de diapositiva
  // actual en el tablero Kanban, así que "el último" es lo único predecible
  // sin exigir selección previa), igual que ya hacía "Duplicar microciclo"
  // con el seleccionado. Solo se crea en blanco cuando la tabla está
  // realmente vacía (nada que copiar).
  public async addWeek(): Promise<void> {
    if (!this.table || this.busy) return;

    // Punto 2 (mejoras Planner, 2026-09) — los microciclos ya no se pueden
    // renombrar (deben seguir el mismo orden numérico que la app de cliente,
    // ver mesocycle.page.html), así que pedir un nombre para el primero ya
    // no tiene sentido: se crea directamente como "Microciclo 1".
    if (this.table.splits.length === 0) {
      this.createBlankWeek(`${this.translate.instant('PLANNER.WEEK_DEFAULT_PREFIX')} 1`);
      return;
    }

    await this.promptDuplicateLastWeek();
  }

  private createBlankWeek(name: string): void {
    if (!this.table) return;
    this.busy = true;
    this.splitService.createBlankSplitAndAddToTable(this.table._id, name).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (splits) => {
        this.table.splits = splits;
        this.persistTable();
        this.busy = false;
      },
      error: (error) => {
        this.busy = false;
        this.handleWeekLimitError(error);
      },
    });
  }

  // Mismo alert "Sin series"/"Copia completa" que ya usa la app de cliente
  // (mesocycle.page.ts#addSplitToTable) sobre el mismo endpoint
  // (splitService.addSplitToTable, con withSets true/false) — el entrenador
  // decide si quiere arrastrar también las series prescritas o solo la
  // estructura (nombres/ejercicios) del último microciclo.
  private async promptDuplicateLastWeek(): Promise<void> {
    if (!this.table) return;
    const lastSplit = this.table.splits[this.table.splits.length - 1];

    // Qué se copia y de dónde, dicho antes de elegir: "Añadir" y "Duplicar"
    // parecían lo mismo (los dos copian; cambian el origen y el sitio).
    const alertOptions: AlertOptions = {
      header: this.translate.instant('PLANNER.ADD_WEEK'),
      cssClass: 'alert-grid-buttons',
      message: this.translate.instant('PLANNER.ADD_WEEK_EXPLAIN', {
        source: this.splitLabel(lastSplit),
        next: this.weekLabel(this.table.splits.length),
      }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TABLES.WITHOUT_SERIES'),
          handler: () => this.duplicateLastWeek(lastSplit._id, false),
        },
        {
          text: this.translate.instant('TABLES.COMPLETE_COPY'),
          cssClass: 'alert-button-success',
          handler: () => this.duplicateLastWeek(lastSplit._id, true),
        },
      ],
    };

    await this.ionicUtilService.showAlert(alertOptions);
  }

  private duplicateLastWeek(sourceSplitId: string, withSets: boolean): void {
    if (!this.table || this.busy) return;
    this.busy = true;

    this.splitService.addSplitToTable(this.table._id, sourceSplitId, withSets).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (newSplit) => {
        this.table.splits.push(newSplit);
        this.persistTable();
        this.busy = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.WEEK_DUPLICATED'),
          duration: 1200,
        });
      },
      error: (error) => {
        this.busy = false;
        this.handleWeekLimitError(error);
      },
    });
  }

  public async duplicateSelectedWeek(): Promise<void> {
    if (!this.table || !this.selectedSplit || this.busy) return;
    const source = this.selectedSplit;
    const sourceIndex = this.table.splits.findIndex((s) => s._id === source._id);

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.DUPLICATE_WEEK'),
      message: this.translate.instant('PLANNER.DUPLICATE_WEEK_EXPLAIN', {
        source: this.splitLabel(source),
        next: this.weekLabel(sourceIndex + 1),
      }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('PLANNER.DUPLICATE_WEEK_CONFIRM'),
          cssClass: 'alert-button-primary',
          handler: () => this.duplicateWeek(source._id),
        },
      ],
    });
  }

  // "Microciclo N" de la posición `index` (0 = el primero).
  private weekLabel(index: number): string {
    return `${this.translate.instant('PLANNER.WEEK_DEFAULT_PREFIX')} ${index + 1}`;
  }

  private duplicateWeek(sourceId: string): void {
    if (!this.table || this.busy) return;
    this.busy = true;

    this.splitService.addSplitToTable(this.table._id, sourceId, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (newSplit) => {
        const sourceIndex = this.table.splits.findIndex((s) => s._id === sourceId);
        this.table.splits.splice(sourceIndex + 1, 0, newSplit);
        this.persistTable();
        this.busy = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.WEEK_DUPLICATED'),
          duration: 1200,
        });
      },
      error: (error) => {
        this.busy = false;
        this.handleWeekLimitError(error);
      },
    });
  }

  // Punto 2 — los microciclos ya no tienen nombre editable: la etiqueta sale
  // de la posición en table.splits, igual que en la app de cliente
  // (mesocycle.page.html: originalIndex + 1).
  public splitLabel(split: Split | null): string {
    if (!this.table || !split) return '';
    const index = this.table.splits.findIndex((s) => s._id === split._id);
    return index >= 0
      ? `${this.translate.instant('PLANNER.WEEK_DEFAULT_PREFIX')} ${index + 1}`
      : '';
  }

  // --- Comparar dos microciclos ---

  public get canCompare(): boolean {
    return (this.table?.splits?.length || 0) >= 2;
  }

  // La columna seleccionada solo PRESIEMBRA la comparación (B = la
  // seleccionada, A = la anterior); la elección real vive dentro del modal.
  // Deliberadamente NO se toca selectedSplitId: de él cuelgan Duplicar,
  // Eliminar, el resaltado de columna y el panel lateral, y convertirlo en
  // "selección doble" los rompería a los cuatro.
  public async openCompareSplits(): Promise<void> {
    if (!this.table || !this.canCompare) return;

    const selectedIndex = this.table.splits.findIndex((s) => s._id === this.selectedSplitId);
    const indexB = selectedIndex > 0 ? selectedIndex : this.table.splits.length - 1;
    const indexA = indexB > 0 ? indexB - 1 : 0;

    await this.ionicUtilService.showModal({
      component: CompareSplitsModalComponent,
      componentProps: {
        splits: this.table.splits,
        indexA: indexA === indexB ? 0 : indexA,
        indexB: indexA === indexB ? 1 : indexB,
      },
      // Una tabla emparejada no cabe en los 420px de tf-panel-modal.
      cssClass: 'tf-compare-modal',
    });
  }

  public async confirmDeleteSelectedWeek(): Promise<void> {
    if (!this.table || !this.selectedSplit) return;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.DELETE_WEEK'),
      message: this.translate.instant('PLANNER.DELETE_WEEK_CONFIRM_MSG', {
        name: this.splitLabel(this.selectedSplit),
      }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
          cssClass: 'alert-button-danger',
          handler: () => this.deleteSelectedWeek(),
        },
      ],
    });
  }

  private deleteSelectedWeek(): void {
    if (!this.table || !this.selectedSplitId) return;
    const splitId = this.selectedSplitId;
    this.busy = true;

    this.splitService.deleteSplit(this.table._id, splitId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.table.splits = this.table.splits.filter((s) => s._id !== splitId);
        this.selectedSplitId = null;
        this.persistTable();
        this.busy = false;
      },
      error: () => {
        this.busy = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.DELETE_WEEK_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  private handleWeekLimitError(error: any): void {
    const code = error?.code || error?.error?.code;
    if (code === 'PREMIUM_LIMIT_MICROCYCLES') {
      this.ionicUtilService.showToast({
        message: this.translate.instant('TABLES.MAX_MICROCYCLES_ERROR'),
        duration: 2500,
        color: 'danger',
      });
      return;
    }
    this.ionicUtilService.showToast({
      message: this.translate.instant('PLANNER.ADD_WEEK_ERROR'),
      duration: 2500,
      color: 'danger',
    });
  }

  // --- Tablero: reordenar columnas ---

  public onColumnsDropped(event: CdkDragDrop<Split[]>): void {
    if (!this.table || event.previousIndex === event.currentIndex) return;

    moveItemInArray(this.table.splits, event.previousIndex, event.currentIndex);
    this.persistTable();

    const order = this.table.splits.map((s) => s._id);
    this.splitService.reorderSplits(this.table._id, order).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      error: () => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.REORDER_WEEKS_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  // --- Añadir desde plantilla: overlay de tablero completo ---

  public onTemplatesApplyStarted(): void {
    this.applyingTemplates = true;
  }

  public onTemplatesApplyEnded(): void {
    this.applyingTemplates = false;
  }

  /**
   * Movimiento 6 Coach Pro — objetivo y tipo del microciclo.
   *
   * Aparte de renombrar y no dentro del mismo aviso: cambiar el nombre de una
   * semana es un gesto de cada día, y definir qué busca el bloque se hace una
   * vez. Meterlos juntos convertiría un alert de un campo en uno de tres.
   *
   * ion-alert con radios para el tipo, texto libre para el objetivo: es la
   * misma forma que ya usa el resto del planificador, y no merece una
   * pantalla propia.
   */
  public async editSplitPurpose(split: Split): Promise<void> {
    if (!this.table) return;

    const current = split.purpose || 'regular';
    let chosen: SplitPurpose = current;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.TIPO_DE_MICROCICLO'),
      message:
        this.translate.instant('PLANNER.NOTA_SOLO_PARA_TI_NO_2'),
      inputs: SPLIT_PURPOSES.map((option) => ({
        type: 'radio' as const,
        label: option.label,
        value: option.key,
        checked: option.key === current,
      })),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (value: SplitPurpose) => {
            chosen = value || current;
            return true;
          },
        },
      ],
    });

    if (chosen === current) return;
    this.saveSplitMeta(split, { purpose: chosen });
  }

  public async editSplitObjective(split: Split): Promise<void> {
    if (!this.table) return;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.OBJETIVO_DEL_BLOQUE'),
      message: this.translate.instant('PLANNER.QUE_BUSCAS_CON_ESTE_MICROCICLO'),
      inputs: [
        {
          name: 'objective',
          type: 'textarea',
          value: split.objective || '',
          placeholder: this.translate.instant('PLANNER.EJ_SUBIR_SERIES_DE_ESPALDA'),
          attributes: { maxlength: 300 },
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data: { objective?: string }) => {
            // Vacío es válido: quitar el objetivo es una acción legítima.
            this.saveSplitMeta(split, { objective: (data?.objective || '').trim() });
            return true;
          },
        },
      ],
    });
  }

  // El objeto local se actualiza ANTES de la respuesta y se revierte si
  // falla: mismo criterio optimista que usa el resto del tablero.
  private saveSplitMeta(split: Split, patch: Partial<Split>): void {
    const previous = { objective: split.objective, purpose: split.purpose };
    Object.assign(split, patch);
    this.persistTable();

    this.splitService
      .updateSplit(split._id, patch)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => {
          Object.assign(split, previous);
          this.persistTable();
          this.ionicUtilService.showToast({
            message: this.translate.instant('PLANNER.NO_SE_PUDO_GUARDAR_EL'),
            duration: 2500,
          });
        },
      });
  }
}
