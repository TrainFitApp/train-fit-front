import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';

// "Copiar ejercicios" — arreglo (2026-08). El botón real de "Pegar" en
// <app-workout> (workout.component.html línea ~95) está gateado por el
// @Input `exercisePasteMode`: `*ngIf="load && exercisePasteMode &&
// canPasteExercises()"`. planner-column.component.html pasaba ese Input (y
// `exerciseCopyActive`/`exerciseOriginWorkoutId`) hardcodeados sin más — el
// entrenador podía ENTRAR en modo selección y copiar ejercicios (eso es
// self-contenido vía WorkoutService.exerciseClipboard$, funciona igual en
// cualquier sitio), pero el botón "Pegar" no llegaba a existir en NINGUNA
// otra card del tablero: pegar era imposible, la función se veía "rota" a
// medio camino.
//
// La app de cliente (mesocycle.page.ts) resuelve esto con estado a nivel de
// PÁGINA, suscrito una vez a exerciseClipboard$ y repartido a todas las
// cards. Aquí el Planificador tiene VARIAS columnas (una por microciclo) que
// deben compartir el mismo estado — igual que copiar en un microciclo y
// pegar en otro debe funcionar tal cual entre workouts de la misma semana —
// así que este servicio se provee UNA VEZ en PlannerPage (mismo patrón que
// PlannerRowSyncService) e inyecta la misma instancia en cada
// PlannerColumnComponent.
@Injectable()
export class PlannerExerciseCopyService implements OnDestroy {
  private readonly workoutService = inject(WorkoutService);

  // Hay portapapeles con ejercicios seleccionados (de cualquier card) — activa
  // el botón "Pegar" en cualquier OTRA card (canPasteExercises() ya excluye
  // la card de origen).
  private readonly _pasteMode = signal(false);
  public readonly pasteMode = this._pasteMode.asReadonly();

  // Alguna card está en modo selección activa ahora mismo (aunque el
  // portapapeles esté vacío) — deshabilita "+ Agregar ejercicios" en el
  // resto mientras se decide qué copiar, mismo criterio que mesocycle.page.ts.
  private readonly _copyActive = signal(false);
  public readonly copyActive = this._copyActive.asReadonly();

  private readonly _originWorkoutId = signal<string | undefined>(undefined);
  public readonly originWorkoutId = this._originWorkoutId.asReadonly();

  // Cuántos ejercicios hay marcados ahora mismo — para el banner "Cancelar"
  // del tablero (ver planner.page.html).
  private readonly _selectedCount = signal(0);
  public readonly selectedCount = this._selectedCount.asReadonly();

  private readonly clipboardSub = this.workoutService.exerciseClipboard$.subscribe((clipboard) => {
    this._pasteMode.set(!!clipboard);
  });

  // Recibe tal cual el (exerciseCopyEvent) de cualquier <app-workout> del
  // tablero — mismo shape que ya emite el componente compartido.
  public onCopyEvent(event: {
    workoutId: string | null;
    selectionMode: boolean;
    selectedIndices?: Set<number>;
  }): void {
    if (!event.selectionMode) {
      this._copyActive.set(false);
      this._originWorkoutId.set(undefined);
      this._selectedCount.set(0);
      return;
    }
    this._originWorkoutId.set(event.workoutId ?? undefined);
    this._copyActive.set(true);
    this._selectedCount.set(event.selectedIndices?.size ?? 0);
  }

  // Cancelar modo copiar (2026-08) — exitExerciseSelectionMode() de
  // <app-workout> existe pero solo la card de ORIGEN puede llamarlo sobre sí
  // misma, y no hay ningún botón en su plantilla que lo dispare (hueco real,
  // preexistente en la app de cliente también — mesocycle.page.ts nunca lo
  // usa). Aquí se resuelve a nivel de tablero: limpiar el portapapeles
  // compartido (WorkoutService, el mismo que lee canPasteExercises()) y
  // apagar copyActive — como exerciseCopyActive se reparte a TODAS las
  // cards por igual (incluida la de origen), su propio ngOnChanges (ver
  // workout.component.ts línea ~245) recoge el cambio y limpia su
  // exerciseSelectionMode/selectedExerciseIndices locales solo — mismo
  // resultado que si la propia card llamara a exitExerciseSelectionMode().
  public cancel(): void {
    this.workoutService.clearExerciseClipboard();
    this._copyActive.set(false);
    this._originWorkoutId.set(undefined);
    this._selectedCount.set(0);
  }

  ngOnDestroy(): void {
    this.clipboardSub.unsubscribe();
  }
}
