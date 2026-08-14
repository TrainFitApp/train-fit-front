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
import { SplitClipboard } from './models/split-clipboard';

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
})
export class PlannerPage {
  public table: Table | null = null;
  public selectedSplitId: string | null = null;
  public splitClipboard: SplitClipboard | null = null;
  public busy = false;

  private readonly tableService = inject(TableService);
  private readonly splitService = inject(SplitService);
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
  // otra sesión de navegación). Navegación explícita a la ficha del cliente
  // en vez de "volver a donde sea que estuviera antes" — mismo criterio que
  // el "Volver" de RoutineBuilderPage (TASK-043/planificador). table.userId
  // es el clientId (ver Table#userId); se usa el de la ruta como fallback
  // por si se cierra antes de que el resolver termine de poblar this.table.
  public close(): void {
    const clientId = this.table?.userId || this.route.snapshot.paramMap.get('clientId');
    void this.router.navigate(clientId ? ['/tabs', 'clients', clientId] : ['/tabs', 'clients']);
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

  public async addWeek(): Promise<void> {
    if (!this.table || this.busy) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('PLANNER.ADD_WEEK'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translate.instant('PLANNER.WEEK_NAME_PLACEHOLDER'),
          value: `${this.translate.instant('PLANNER.WEEK_DEFAULT_PREFIX')} ${
            (this.table.splits?.length || 0) + 1
          }`,
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data: any) => {
            const name = (data?.name || '').trim();
            this.createWeek(name);
            return true;
          },
        },
      ],
    };

    await this.ionicUtilService.showAlert(alertOptions);
  }

  private createWeek(name: string): void {
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

  public copySelectedWeek(): void {
    if (!this.selectedSplit) return;
    this.splitClipboard = new SplitClipboard(this.selectedSplit._id, this.selectedSplit.name || '');
    this.ionicUtilService.showToast({
      message: this.translate.instant('PLANNER.WEEK_COPIED'),
      duration: 1200,
    });
  }

  public pasteWeek(): void {
    if (!this.table || !this.splitClipboard || this.busy) return;
    this.busy = true;

    this.splitService.addSplitToTable(this.table._id, this.splitClipboard.splitId, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (newSplit) => {
        this.table.splits.push(newSplit);
        this.persistTable();
        this.busy = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.WEEK_PASTED'),
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
        name: this.selectedSplit.name || '',
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

  // --- Renombrar semana (cabecera de columna) ---

  public async renameSplit(split: Split): Promise<void> {
    if (!this.table) return;

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PLANNER.RENAME_WEEK'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: split.name || '',
          attributes: { maxlength: 100 },
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data: any) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            split.name = name;
            this.persistTable();
            this.splitService.updateSplit(split._id, { name }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
              error: () => {
                this.ionicUtilService.showToast({
                  message: this.translate.instant('PLANNER.RENAME_WEEK_ERROR'),
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
}
