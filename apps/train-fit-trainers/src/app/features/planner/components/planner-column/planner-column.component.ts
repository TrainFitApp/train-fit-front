import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActionSheetOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { TableService } from 'src/app/core/services/table/table.service';
import { SplitService } from 'src/app/core/services/split/split.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { STATES } from 'src/app/shared/constants/states';
import { TemplatePickerModalComponent } from '../template-picker-modal/template-picker-modal.component';

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

  // <app-workout> gatea varias acciones (botón "Agregar ejercicios", menú
  // "⋮") a stateSelected === STATES.static — sin pasarlo explícitamente
  // queda undefined y esas acciones desaparecen/se deshabilitan. El
  // Planificador no tiene el modo STATES.move (reordenar vía drag de Ionic);
  // el drag de cards aquí es CDK, así que siempre es "static".
  public readonly STATES = STATES;

  @Output() columnSelected = new EventEmitter<void>();
  @Output() columnRenamed = new EventEmitter<void>();

  public addingCard = false;

  private readonly tableService = inject(TableService);
  private readonly splitService = inject(SplitService);
  private readonly workoutService = inject(WorkoutService);
  private readonly workoutTemplateApi = inject(WorkoutTemplateApiService);
  // TASK-017 — ver planner.page.ts, mismo fix: evita que una respuesta HTTP
  // tardía de una columna ya destruida (cliente/tabla anterior) escriba
  // sobre TableService.currentTable (señal global) tras navegar a otra.
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
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
  // card empieza expandida (Set vacío = nada colapsado); "Colapsarse/
  // Expandirse" del pedido original se resuelve con este Set, igual que
  // openWorkoutIndex en mesocycle.page.ts pero permitiendo varias abiertas
  // a la vez ([multiple]="true").
  public collapsedCardIds = new Set<string>();

  public isCardOpen(workoutId: string): boolean {
    return !this.collapsedCardIds.has(workoutId);
  }

  public onCardAccordionChange(event: CustomEvent, workoutId: string): void {
    const isOpen = event.detail?.value === 'open';
    if (isOpen) this.collapsedCardIds.delete(workoutId);
    else this.collapsedCardIds.add(workoutId);
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
  // real (bloques/ejercicios/series ya prescritas) en este split.
  public async addCardOptions(): Promise<void> {
    if (this.addingCard) return;

    const actionSheetOptions: ActionSheetOptions = {
      header: this.translate.instant('PLANNER.ADD_CARD'),
      buttons: [
        {
          text: this.translate.instant('PLANNER.ADD_CARD_BLANK'),
          handler: () => this.addCard(),
        },
        {
          text: this.translate.instant('PLANNER.ADD_CARD_FROM_TEMPLATE'),
          handler: () => this.applyTemplateAlert(),
        },
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
      ],
    };

    await this.ionicUtilService.showActionSheet(actionSheetOptions);
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
          return;
        }

        this.ionicUtilService
          .showModal({
            component: TemplatePickerModalComponent,
            componentProps: { templates },
            cssClass: 'tf-panel-modal',
          })
          .then((res) => {
            if (res.data) this.applyTemplateToColumn(res.data);
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

  private applyTemplateToColumn(templateId: string): void {
    this.addingCard = true;

    this.workoutTemplateApi.applyToSplit(this.table.userId, this.split._id, templateId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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

  public addCard(): void {
    if (this.addingCard) return;
    this.addingCard = true;

    const workout = new Workout();
    workout.name = this.translate.instant('PLANNER.NEW_CARD_DEFAULT_NAME');
    workout.exercises = [];

    this.workoutService.createWorkout(workout).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        this.splitService.addWorkoutToSplit(this.split._id, created._id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (updatedSplit) => {
            this.split.workouts = updatedSplit.workouts;
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

  public onCardsDropped(event: CdkDragDrop<Workout[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    moveItemInArray(this.split.workouts, event.previousIndex, event.currentIndex);
    this.persistTable();

    const order = this.split.workouts.map((w) => w._id);
    this.workoutService.reorderWorkoutsInSplit(this.split._id, order).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      error: () => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('PLANNER.REORDER_CARDS_ERROR'),
          duration: 2500,
        });
      },
    });
  }

}
