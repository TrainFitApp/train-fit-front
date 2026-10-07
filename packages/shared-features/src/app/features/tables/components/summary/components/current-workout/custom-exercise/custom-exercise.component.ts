import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { AlertButton, AlertInput, AlertOptions, ModalOptions, ToastOptions } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { formatRirValue, isRirFail } from 'src/app/core/models/rir';
import { Set } from 'src/app/core/models/set';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
import { PinnedExerciseNoteService } from 'src/app/core/services/pinned-exercise-note/pinned-exercise-note.service';
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from 'src/app/core/models/pinned-exercise-note';
import { TranslateService } from '@ngx-translate/core';

interface CurrentSetRow {
  type: 'set';
  key: string;
  index: number;
  originalIndex?: number;
  set: Set;
}

@Component({
  selector: 'app-custom-exercise',
  templateUrl: './custom-exercise.component.html',
  styleUrls: ['./custom-exercise.component.scss'],
})
export class CustomExerciseComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public customExercise: CustomExercise;
  @Input()
  public previousWorkoutDate: Date;
  @Input()
  public currentWorkout: Workout;
  @Input()
  public tableInUse: Table;
  @Input()
  public indexCustomExercise: number;

  @Output()
  public reorderModeChange = new EventEmitter<boolean>();
  @Output()
  public setCompleted = new EventEmitter<Set>();

  public previousWorkoutCustomExercise: CustomExercise;
  public currentSplitIndex: number = -1;
  public currentWorkoutIndex: number = -1;
  public historicalSplitIndex: number = -1;
  public animatingLeft: boolean = false;
  public animatingRight: boolean = false;
  public pendingCopyInsertIndex: number | null = null;
  public loadingHistorical: boolean = false;
  public historicalWorkout: Workout | null = null;

  public reorderMode: boolean = false;
  public hasReorderChanges: boolean = false;
  private originalSetsOrder: Set[] = [];
  private originalPositions: Map<string, number> = new Map();

  public pinnedNote: PinnedExerciseNote | null = null;
  private pinnedNoteCacheSub: Subscription | null = null;

  constructor(
    private customExerciseService: CustomExerciseService,
    private ionicUtilService: IonicUtilService,
    private workoutService: WorkoutService,
    private pinnedExerciseNoteService: PinnedExerciseNoteService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.setPreviousCustomExerciseWorkout();
    this.sortCurrentSets();
    this.loadPinnedNote();
    this.pinnedNoteCacheSub = this.pinnedExerciseNoteService.cache$.subscribe(() => {
      this.loadPinnedNote();
    });
  }

  public ngOnDestroy(): void {
    this.pinnedNoteCacheSub?.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Actualizar la sesión anterior cuando cambie el ejercicio o la tabla
    if (changes['customExercise'] || changes['tableInUse']) {
      this.setPreviousCustomExerciseWorkout();
    }

    // Ordenar sets cuando cambie el ejercicio
    if (changes['customExercise'] && this.customExercise?.sets) {
      this.sortCurrentSets();
    }

    // Recargar pinned note si cambia el ejercicio o la tabla
    if (changes['customExercise'] || changes['tableInUse'] || changes['currentWorkout']) {
      this.loadPinnedNote();
    }
  }

  public get hasTrainer(): boolean {
    return !!this.tableInUse?.assignedByTrainerId;
  }

  // 2026-09 — anclada por el entrenador: solo lectura para el cliente, y la
  // posición queda ocupada (el back responde 409 si se intenta pisar).
  public get isTrainerPinned(): boolean {
    return this.pinnedNote?.authorRole === 'trainer';
  }

  private loadPinnedNote(): void {
    if (this.tableInUse?._id && this.currentWorkout?._id) {
      this.currentSplitIndex = -1;
      this.currentWorkoutIndex = -1;

      this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
        splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
          if (this.currentWorkout._id === workoutTemp._id) {
            this.currentSplitIndex = indexSplit;
            this.currentWorkoutIndex = indexWorkout;
          }
        });
      });

      if (this.currentSplitIndex >= 0 && this.currentWorkoutIndex >= 0) {
        this.pinnedExerciseNoteService
          .getByPosition(this.tableInUse._id, this.currentWorkoutIndex, this.indexCustomExercise)
          .subscribe((note) => {
            this.pinnedNote = note;
          });
      }
    }
  }

  public deletePinnedNote(): void {
    if (!this.pinnedNote) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.DELETE_PINNED_TITLE'),
      message: this.translate.instant('NOTES.DELETE_PINNED_CONFIRM'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.pinnedExerciseNoteService.delete(this.pinnedNote._id, this.tableInUse._id).subscribe({
              next: () => {
                this.pinnedNote = null;
                console.debug('[CustomExerciseComponent] Pinned note deleted');
              },
              error: (err) => console.error('[CustomExerciseComponent] Failed to delete pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public editPinnedNote(): void {
    if (!this.pinnedNote) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.TITLE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.pinnedNote.notes,
          placeholder: this.translate.instant('NOTES.PLACEHOLDER'),
          attributes: { maxlength: 500 },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            const newNotes = (data.notes || '').trim();
            const dto: PinnedExerciseNoteUpsertDto = {
              tableId: this.tableInUse._id,
              workoutIndex: this.currentWorkoutIndex,
              exerciseIndex: this.indexCustomExercise,
              notes: newNotes,
            };
            this.pinnedExerciseNoteService.upsert(dto).subscribe({
              next: (updated) => {
                this.pinnedNote = updated;
                console.debug('[CustomExerciseComponent] Pinned note updated');
              },
              error: (err) => console.error('[CustomExerciseComponent] Failed to update pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public setPreviousCustomExerciseWorkout(): void {
    if (this.tableInUse && this.customExercise && this.currentWorkout._id) {
      this.currentSplitIndex = -1;
      this.currentWorkoutIndex = -1;

      this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
        splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
          if (this.currentWorkout._id === workoutTemp._id) {
            this.currentSplitIndex = indexSplit;
            this.currentWorkoutIndex = indexWorkout;
          }
        });
      });

      if (this.currentSplitIndex > 0) {
        this.historicalSplitIndex = this.currentSplitIndex - 1;
        this.updateHistoricalExercise();
      } else {
        this.historicalSplitIndex = -1;
        this.previousWorkoutCustomExercise = undefined;
        this.previousWorkoutDate = undefined;
      }
    }
  }

  public updateHistoricalExercise(): void {
    if (this.historicalSplitIndex < 0 || this.currentWorkoutIndex < 0) return;

    this.historicalWorkout =
      this.tableInUse.splits[this.historicalSplitIndex].workouts[
      this.currentWorkoutIndex
      ];

    this.previousWorkoutDate = this.historicalWorkout.date;

    if (this.historicalWorkout.exercises) {
      this.previousWorkoutCustomExercise = this.historicalWorkout.exercises.find(
        (exerciseTemp) =>
          exerciseTemp.exercise._id === this.customExercise.exercise._id
      );
    } else {
      this.previousWorkoutCustomExercise = undefined;
    }
  }

  public canGoBack(): boolean {
    return this.historicalSplitIndex > 0;
  }

  public canGoForward(): boolean {
    return this.historicalSplitIndex < this.currentSplitIndex - 1;
  }

  public goBack(): void {
    if (this.canGoBack() && !this.loadingHistorical && !this.animatingLeft && !this.animatingRight) {
      this.animatingLeft = true;
      this.loadingHistorical = true;
      setTimeout(() => {
        this.animatingLeft = false;
        this.historicalSplitIndex = Math.max(0, this.historicalSplitIndex - 1);
        this.updateHistoricalExercise();
        this.loadingHistorical = false;
      }, 300);
    }
  }

  public goForward(): void {
    if (this.canGoForward() && !this.loadingHistorical && !this.animatingLeft && !this.animatingRight) {
      this.animatingRight = true;
      this.loadingHistorical = true;
      setTimeout(() => {
        this.animatingRight = false;
        this.historicalSplitIndex = Math.min(this.currentSplitIndex - 1, this.historicalSplitIndex + 1);
        this.updateHistoricalExercise();
        this.loadingHistorical = false;
      }, 300);
    }
  }

  public getMicrocycleLabel(): string {
    return this.translate.instant('TABLES.MICROCYCLE_N', { n: this.historicalSplitIndex + 1 });
  }

  // 2026-09 bis — análisis "casuísticas current-workout con rutina
  // asignada": añadir/copiar/reordenar/borrar series y editar su config ya
  // están bloqueados en el BACKEND para una rutina asignada (ver
  // set-controller.js/custom-exercise-controller.js), pero el cliente podía
  // recorrer toda la UI (abrir el modal, arrastrar, confirmar) y solo
  // enterarse del bloqueo al final, con el 403. Mismo patrón que
  // workout.component.ts#guardReadonly en el Planner.
  public get isReadonly(): boolean {
    return !!this.tableInUse?.assignedByTrainerId;
  }

  private guardReadonly(): boolean {
    if (!this.isReadonly) return false;
    this.ionicUtilService.showToast({
      message: this.translate.instant('TABLES.READONLY_ASSIGNED'),
      duration: 3000,
    });
    return true;
  }

  public openSetManager(): void {
    if (this.guardReadonly()) return;
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        isCardio: this.customExercise.exercise.isCardio,
        isIsometric: this.customExercise.exercise.isIsometric,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        delete res.data.rangeREPSEnd;
        delete res.data.rangeREPStart;
        delete res.data.rangeRIREnd;
        delete res.data.rangeRIRStart;

        const maxOrderSet = this.customExercise.sets.reduce(
          (maxSeries, currentSeries) => {
            if (currentSeries.order > maxSeries.order) {
              return currentSeries;
            } else {
              return maxSeries;
            }
          },
          { order: -Infinity }
        );

        if (this.customExercise.sets.length === 0) res.data.order = 0;
        else res.data.order = maxOrderSet.order + 1;

        this.customExerciseService
          .addSetToCustomExercise(this.customExercise._id, res.data)
          .subscribe((resCustomExercise: CustomExercise) => {
            this.replaceCurrentSets(resCustomExercise.sets);
          });
      }
    });
  }

  public manageNote(): void {
    const showPinOption = !!(this.tableInUse?._id && this.currentWorkoutIndex >= 0) && !this.isTrainerPinned;

    let shouldPin = false;

    const confirmButtons: AlertButton[] = [
      {
        text: this.translate.instant('COMMON.SAVE'),
        handler: () => {
          shouldPin = false;
          return true;
        },
      },
    ];

    if (showPinOption) {
      confirmButtons.push({
        text: this.translate.instant('NOTES.PIN_TO_POSITION'),
        cssClass: 'alert-button-pin',
        handler: () => {
          shouldPin = true;
          return true;
        },
      });
    }

    // Movimiento 2 Coach Pro — el cliente escribe en SU campo (clientNotes),
    // no en el del entrenador. Antes los dos compartían `notes`, así que
    // apuntar aquí "me molestó el hombro" borraba la indicación que el
    // entrenador había dejado en el ejercicio.
    const alertInputs: AlertInput[] = [
      {
        name: 'notes',
        type: 'textarea',
        value: this.customExercise.clientNotes || '',
        placeholder: this.translate.instant('COMMON.WRITE_NOTES_HERE'),
        attributes: { maxlength: 500 },
      },
    ];

    const alertOptions: AlertOptions = {
      header: this.translate.instant('COMMON.NOTES'),
      inputs: alertInputs,
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        ...confirmButtons,
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role === 'cancel') return;

      const notesValue = (result.data?.values?.notes || '').trim();

      // Movimiento 2 Coach Pro — vaciar el texto borra la nota, en vez del
      // "campo obligatorio" de antes. Ahora que la nota del cliente tiene
      // campo propio, dejarla en blanco es la única forma de quitarla —
      // antes ese error no molestaba porque `notes` casi siempre venía del
      // entrenador y el cliente no la borraba.
      //
      // Anclar SÍ exige texto: una nota anclada vacía no tendría sentido.
      if (!notesValue && shouldPin) {
        const errorAlert: AlertOptions = {
          header: this.translate.instant('COMMON.ERROR'),
          message: this.translate.instant('COMMON.FIELD_REQUIRED'),
          buttons: [this.translate.instant('COMMON.OK')],
        };
        this.ionicUtilService.showAlert(errorAlert);
        return;
      }

      if (shouldPin && this.tableInUse?._id && this.currentWorkoutIndex >= 0) {
        const dto: PinnedExerciseNoteUpsertDto = {
          tableId: this.tableInUse._id,
          workoutIndex: this.currentWorkoutIndex,
          exerciseIndex: this.indexCustomExercise,
          notes: notesValue,
        };
        this.pinnedExerciseNoteService.upsert(dto).subscribe({
          next: (note) => {
            this.pinnedNote = note;
          },
          error: (err) => {
            console.error('[CustomExerciseComponent] Failed to save pinned note', err);
            if (err?.error?.code === 'PINNED_NOTE_NOT_AUTHOR') {
              this.ionicUtilService.showToast({ message: this.translate.instant('NOTES.PINNED_NOT_AUTHOR'), duration: 3000 });
            }
          },
        });
        return;
      }

      // 2026-09 — vía dedicada (no updateCustomExercise: esa queda
      // bloqueada en rutinas asignadas por el entrenador, y la nota del
      // cliente tiene que poder guardarse siempre, sea cual sea la rutina).
      const previousClientNotes = this.customExercise.clientNotes;
      this.customExercise.clientNotes = notesValue;
      this.customExerciseService.updateClientNotes(this.customExercise._id, notesValue).subscribe({
        next: () => {
          if (this.currentWorkout) {
            this.workoutService.setCurrentWorkout = this.currentWorkout;
          }
        },
        error: () => {
          this.customExercise.clientNotes = previousClientNotes;
          this.ionicUtilService.showErrorToast(this.translate.instant('TABLES.NOTE_SAVE_ERROR'), this.translate.instant('COMMON.ERROR'), 2500);
        },
      });
    });
  }

  public deleteSet(set: Set): void {
    if (this.guardReadonly()) return;
    const indexSet = this.customExercise.sets.findIndex(
      (setTemp) => setTemp._id === set._id
    );
    this.customExercise.sets.splice(indexSet, 1);
    this.normalizeCurrentSetsOrder();

    if (this.currentWorkout) {
      this.workoutService.setCurrentWorkout = this.currentWorkout;
    }
  }

  public enterReorderMode(): void {
    if (this.guardReadonly()) return;
    this.reorderMode = true;
    this.hasReorderChanges = false;
    this.originalSetsOrder = this.customExercise.sets.map(s => ({ ...s }));
    this.originalPositions = new Map(
      this.customExercise.sets.map((s, i) => [s._id || `set-${i}`, i])
    );
    this.reorderModeChange.emit(true);
  }

  public confirmReorder(): void {
    if (!this.hasReorderChanges) {
      this.reorderMode = false;
      this.reorderModeChange.emit(false);
      return;
    }

    const setsToUpdate = this.customExercise.sets.filter(
      (setTemp) => setTemp._id && !isNaN(Number(setTemp._id)) === false
    );

    const reorderedSets = this.customExercise.sets.map((s, i) => ({ ...s, order: i }));

    this.customExerciseService
      .updateCustomExercise(
        { ...this.customExercise, sets: reorderedSets },
        [],
        setsToUpdate,
        []
      )
      .subscribe({
        next: (resCustomExercise) => {
          this.replaceCurrentSets(resCustomExercise.sets);
          this.reorderMode = false;
          this.hasReorderChanges = false;
          this.reorderModeChange.emit(false);
          this.ionicUtilService.showToast({
            message: this.translate.instant('ORDER_SETS.TOAST_ORDER_SAVED'),
            duration: 2000,
            position: 'bottom',
            color: 'success',
          } as ToastOptions);
        },
        error: () => {
          this.reorderMode = false;
          this.reorderModeChange.emit(false);
        },
      });
  }

  public cancelReorder(): void {
    if (this.hasReorderChanges) {
      this.customExercise.sets = this.originalSetsOrder.map(s => ({ ...s }));
      this.replaceCurrentSets(this.customExercise.sets);
    }
    this.reorderMode = false;
    this.hasReorderChanges = false;
    this.reorderModeChange.emit(false);
  }

  public doReorder(event: any): void {
    this.customExercise.sets = event.detail.complete(this.customExercise.sets);
    this.hasReorderChanges = true;
  }

  public configSet(set: Set): void {
    if (this.guardReadonly()) return;
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        set: set,
        isCardio: this.customExercise.exercise.isCardio,
        isIsometric: this.customExercise.exercise.isIsometric,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((resSet) => {
      if (!resSet.data) return;

      // 2026-09 bis — ManageSetComponent edita config PAUTADA (expectedReps/
      // expectedRir/restSeconds/restPause/drop), no lo REALMENTE hecho, así
      // que este guardado tiene que ir por updateCustomExercise (protegido
      // en rutinas asignadas), no por setService.updateSet (deliberadamente
      // abierto para marcar series hechas — ver set-controller.js#updateSet).
      // Mismo patrón que ya usa el Planner: workout.component.ts#persistSetUpdate.
      const updatedSet = resSet.data as Set;

      // 2026-10 — el objetivo de la serie no se guardaba. El backend
      // persiste SOLO lo que viaja en customExercise.sets
      // (custom-exercise-dao.js#updateCustomExercise recibe setsToUpdate y
      // no lo usa para nada), y el modal devuelve una COPIA del set, así
      // que el array enviado seguía con los valores viejos y la respuesta
      // los repintaba: el cambio desaparecía sin error ninguno. Se mete la
      // copia en el array antes de enviar, igual que el Planner
      // (workout.component.ts#persistSetUpdate).
      const indexSet = this.customExercise.sets.findIndex(
        (setTemp) => setTemp._id === updatedSet._id
      );
      const previousSet =
        indexSet >= 0 ? this.customExercise.sets[indexSet] : null;
      if (indexSet >= 0) this.customExercise.sets[indexSet] = updatedSet;

      this.customExerciseService
        .updateCustomExercise(this.customExercise, [], [updatedSet], [])
        .subscribe({
          next: (resCustomExercise) => {
            this.replaceCurrentSets(resCustomExercise.sets);
          },
          error: () => {
            if (previousSet) this.customExercise.sets[indexSet] = previousSet;
            this.ionicUtilService.showToast({
              message: this.translate.instant('TABLES.UPDATE_SET_ERROR'),
              duration: 2500,
            });
          },
        });
    });
  }

  public copySet(set: Set, indexSet: number): void {
    if (this.guardReadonly()) return;
    const normalizedSets = this.sortSets(this.customExercise.sets).map(
      (setTemp, index) => ({
        ...setTemp,
        order: index,
      })
    );

    const currentIndex = normalizedSets.findIndex(
      (setTemp) => setTemp._id === set._id
    );
    const insertIndex = currentIndex >= 0 ? currentIndex + 1 : indexSet + 1;
    const sourceSet = normalizedSets[currentIndex] || set;
    const newSet = { ...sourceSet };
    delete newSet._id;

    const requestSets = [...normalizedSets];
    requestSets.splice(insertIndex, 0, newSet);
    requestSets.forEach((setTemp, index) => {
      setTemp.order = index;
    });

    this.pendingCopyInsertIndex = insertIndex;

    this.customExerciseService
      .copySetOnCustomExercise(newSet.order, {
        ...this.customExercise,
        sets: requestSets,
      })
      .subscribe({
        next: (resUCE) => {
          this.pendingCopyInsertIndex = null;
          this.replaceCurrentSets(resUCE.sets);
        },
        error: (error) => {
          this.pendingCopyInsertIndex = null;
          console.error('Error copying set:', error);
        },
      });
  }

  private sortCurrentSets(): void {
    this.customExercise.sets.sort((a, b) => a.order - b.order);
  }

  private normalizeCurrentSetsOrder(): void {
    this.customExercise.sets = this.sortSets(this.customExercise.sets);
    this.customExercise.sets.forEach((setTemp, index) => {
      setTemp.order = index;
    });
  }

  private replaceCurrentSets(sets: Set[]): void {
    const normalizedSets = this.sortSets(sets);
    this.customExercise.sets = normalizedSets;

    if (!this.currentWorkout) return;

    const currentCustomExercise = this.currentWorkout.exercises.find(
      (exerciseTemp) => exerciseTemp._id === this.customExercise._id
    );

    if (currentCustomExercise) {
      currentCustomExercise.sets = normalizedSets;
    }

    this.workoutService.setCurrentWorkout = this.currentWorkout;
  }

  public sortSets(sets: any[]): any[] {
    if (!sets) return [];
    return [...sets].sort((a, b) => a.order - b.order);
  }

  public getCurrentSetRows(): CurrentSetRow[] {
    const rows: CurrentSetRow[] = [];
    const sets = this.customExercise?.sets || [];

    for (let setIndex = 0; setIndex < sets.length; setIndex++) {
      const setId = sets[setIndex]._id || `set-${setIndex}`;
      rows.push({
        type: 'set',
        key: setId,
        index: rows.length,
        originalIndex: this.reorderMode ? (this.originalPositions.get(setId) ?? rows.length) : undefined,
        set: sets[setIndex],
      });
    }

    return rows;
  }

  public formatPerformedRir(rir: unknown): string {
    return formatRirValue(rir, { includeUnit: true });
  }

  // Formateo de valores esperados para alinearse con workout.component
  public formatExpectedReps(expectedReps: number[]): string {
    if (!expectedReps || expectedReps.length === 0) return '—';

    const firstExpected =
      expectedReps[0] !== null &&
      expectedReps[0] !== undefined &&
      !isNaN(expectedReps[0]);
    const secondExpected =
      expectedReps[1] !== null &&
      expectedReps[1] !== undefined &&
      !isNaN(expectedReps[1]);

    if (firstExpected && secondExpected) {
      return `${expectedReps[0]} - ${expectedReps[1]}`;
    } else if (firstExpected) {
      return `${expectedReps[0]}`;
    } else if (secondExpected) {
      return `${expectedReps[1]}`;
    } else {
      return '—';
    }
  }

  public formatExpectedRir(expectedRir: number[]): string {
    if (!expectedRir || expectedRir.length === 0) return '— RIR';

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      !isNaN(expectedRir[0]);
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      !isNaN(expectedRir[1]);

    if (firstExpected && secondExpected) {
      return `${expectedRir[0]} - ${expectedRir[1]} RIR`;
    } else if (firstExpected) {
      return `${expectedRir[0]} RIR`;
    } else if (secondExpected) {
      return `${expectedRir[1]} RIR`;
    } else {
      return '— RIR';
    }
  }

  public hasValidExpectedRir(expectedRir: number[]): boolean {
    if (!expectedRir || expectedRir.length === 0) return false;

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      (expectedRir[0] === -1 || !isNaN(expectedRir[0]));
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      (expectedRir[1] === -1 || !isNaN(expectedRir[1]));

    return firstExpected || secondExpected;
  }

  public isFail(set: any): boolean {
    if (set?.doned) {
      return isRirFail(set.rir);
    } else {
      return (
        Array.isArray(set?.expectedRir) &&
        set.expectedRir.some((value) => Number(value) === -1)
      );
    }
  }

  public trackBySetRow(_index: number, row: CurrentSetRow): string {
    return row.key;
  }
}
