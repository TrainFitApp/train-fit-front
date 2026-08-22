import { Component, DestroyRef, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertOptions, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { TableService } from 'src/app/core/services/table/table.service';
import { SplitService } from 'src/app/core/services/split/split.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { PlannerRowSyncService } from './services/planner-row-sync.service';
import { PlannerExerciseCopyService } from './services/planner-exercise-copy.service';
import { PlannerReorderLockService } from './services/planner-reorder-lock.service';

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
  // Reordenar (2026-08) — PlannerReorderLockService, mismo criterio: una
  // instancia por rutina, compartida por columnas y tablero para que ningún
  // drag (de columna o de entrenamiento) se solape con otro en curso.
  providers: [PlannerRowSyncService, PlannerExerciseCopyService, PlannerReorderLockService],
})
export class PlannerPage {
  public table: Table | null = null;
  public selectedSplitId: string | null = null;
  public busy = false;

  // Tarea (2026-08) — mientras se arrastra un entrenamiento dentro de un
  // microciclo, las DEMÁS columnas se atenúan (ver planner-column.component)
  // para que quede claro que solo se puede reordenar dentro del mismo
  // microciclo — arrastrar y soltar entre columnas nunca fue posible (cada
  // cdkDropList es independiente, sin cdkDropListConnectedTo), pero sin
  // señal visual el entrenador podía no saberlo. splitId de la columna
  // ORIGEN del drag activo (null = nada en curso).
  public draggingFromSplitId: string | null = null;

  // Tarea (2026-08) — "Añadir desde plantilla" hace varias llamadas seguidas
  // (una por plantilla × microciclo); mientras dura la secuencia, el tablero
  // entero queda cubierto por un overlay (ver planner-column.component.ts,
  // templatesApplyStarted/Ended) para que el resultado se revele de golpe en
  // vez de ir apareciendo microciclo a microciclo según llega cada respuesta.
  public applyingTemplates = false;

  private readonly tableService = inject(TableService);
  private readonly splitService = inject(SplitService);
  // "Copiar ejercicios" — banner "Cancelar" (2026-08, ver planner.page.html)
  // — misma instancia que inyectan las columnas, expuesta aquí para el botón
  // de cancelar a nivel de tablero completo.
  public readonly exerciseCopy = inject(PlannerExerciseCopyService);
  public readonly reorderLock = inject(PlannerReorderLockService);
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
    effect(() => {
      const table = this.tableService.currentTable();
      if (table) this.table = table;
    });
  }

  // TASK-027 (MASTER_BACKLOG.md) — antes usaba location.back(): si el
  // Planner era la primera navegación de la sesión (deep link o F5), no
  // había ninguna entrada previa en el historial DENTRO de la app y el
  // usuario quedaba atascado (o salía de la app, o volvía a una pantalla de
  // otra sesión de navegación). Navegación explícita en vez de "volver a
  // donde sea que estuviera antes" — mismo criterio que el "Volver" de
  // RoutineBuilderPage (TASK-043/planificador).
  // Rutinas -> Plantillas (rediseño 2026-08): el Planificador ahora se abre
  // también sin cliente (biblioteca de plantillas propia del profesional,
  // ver shell-routing.module.ts data.templateMode) — table.userId en ese
  // caso ES el propio profesional, no un clientId real, así que no sirve
  // como destino de "Volver".
  public close(): void {
    if (this.route.snapshot.data['templateMode']) {
      void this.router.navigate(['/tabs', 'routine-templates']);
      return;
    }
    // table.userId es el clientId (ver Table#userId); se usa el de la ruta
    // como fallback por si se cierra antes de que el resolver termine de
    // poblar this.table.
    const clientId = this.table?.userId || this.route.snapshot.paramMap.get('clientId');
    void this.router.navigate(clientId ? ['/tabs', 'clients', clientId] : ['/tabs', 'clients']);
  }

  // El título del header no tenía forma de editarse — mismo patrón que
  // renameSplit() más abajo, pero sobre el propio Table (tableService.updateTableName,
  // ya existente en shared-core, nunca consumido desde esta app).
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

  public get selectedSplit(): Split | null {
    if (!this.table || !this.selectedSplitId) return null;
    return this.table.splits.find((s) => s._id === this.selectedSplitId) || null;
  }

  public selectSplit(splitId: string): void {
    this.selectedSplitId = this.selectedSplitId === splitId ? null : splitId;
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

    if (this.table.splits.length === 0) {
      await this.promptBlankWeek();
      return;
    }

    await this.promptDuplicateLastWeek();
  }

  private async promptBlankWeek(): Promise<void> {
    if (!this.table) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('PLANNER.ADD_WEEK'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translate.instant('PLANNER.WEEK_NAME_PLACEHOLDER'),
          value: `${this.translate.instant('PLANNER.WEEK_DEFAULT_PREFIX')} 1`,
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data: any) => {
            const name = (data?.name || '').trim();
            this.createBlankWeek(name);
            return true;
          },
        },
      ],
    };

    await this.ionicUtilService.showAlert(alertOptions);
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

    const alertOptions: AlertOptions = {
      header: this.translate.instant('PLANNER.ADD_WEEK'),
      cssClass: 'alert-grid-buttons',
      message: this.translate.instant('TABLES.DUPLICATE_MICROCYCLE_MSG_LAST'),
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

  public duplicateSelectedWeek(): void {
    if (!this.table || !this.selectedSplit || this.busy) return;
    this.busy = true;
    const sourceId = this.selectedSplit._id;

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

  // Arreglo de carrera (2026-08) — ver planner-reorder-lock.service.ts.
  // reorderLock.locked() deshabilita el cdkDropList del tablero
  // (planner.page.html) mientras esta petición está en curso, así que
  // event.previousIndex===currentIndex por doble drag ya no puede pasar; el
  // guard de aquí es solo defensivo. Antes tampoco se aplicaba la respuesta
  // del backend (this.table.splits se quedaba con el estado optimista para
  // siempre) — ahora sí, para que el tablero refleje EXACTAMENTE lo que
  // quedó persistido, no una suposición local.
  public onColumnsDropped(event: CdkDragDrop<Split[]>): void {
    if (!this.table || event.previousIndex === event.currentIndex || this.reorderLock.locked()) return;

    moveItemInArray(this.table.splits, event.previousIndex, event.currentIndex);
    this.persistTable();

    const order = this.table.splits.map((s) => s._id);
    this.reorderLock.lock();
    this.splitService.reorderSplits(this.table._id, order).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (splits) => {
        this.table.splits = splits;
        this.persistTable();
        this.reorderLock.unlock();
      },
      error: () => {
        this.reorderLock.unlock();
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.REORDER_WEEKS_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  // --- Arrastrar entrenamiento dentro de un microciclo ---

  public onCardDragStarted(splitId: string): void {
    this.draggingFromSplitId = splitId;
  }

  public onCardDragEnded(): void {
    this.draggingFromSplitId = null;
  }

  // --- Añadir desde plantilla: overlay de tablero completo ---

  public onTemplatesApplyStarted(): void {
    this.applyingTemplates = true;
  }

  public onTemplatesApplyEnded(): void {
    this.applyingTemplates = false;
  }

  // Nombres de microciclo (2026-08) — ya NO son editables: igual que la app
  // de cliente (mesocycle.page.html usa siempre `currentSplitIndex + 1`,
  // nunca un nombre guardado), el microciclo se identifica solo por su
  // posición en el tablero. `split.name` puede seguir guardado en la BD para
  // microciclos ya duplicados antes de este cambio (dato huérfano, inofensivo:
  // ya no se lee en ningún sitio) — se usa este helper en vez de `split.name`
  // en todo lo que necesite mostrar "qué microciclo es este" (aquí, en el
  // mensaje de borrar; el label de la columna vive en planner-column.component.html).
  public splitLabel(split: Split): string {
    const index = this.table?.splits.findIndex((s) => s._id === split._id) ?? -1;
    return `${this.translate.instant('PLANNER.WEEK_DEFAULT_PREFIX')} ${index + 1}`;
  }
}
