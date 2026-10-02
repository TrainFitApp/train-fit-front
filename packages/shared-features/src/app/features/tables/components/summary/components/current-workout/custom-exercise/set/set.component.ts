import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverOptions } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Set } from 'src/app/core/models/set';
import { RirValue } from 'src/app/core/models/rir';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { SetService } from 'src/app/core/services/set/set.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit, OnChanges {
  @Input()
  public set: Set;
  @Input()
  public index: number;
  @Input()
  public indexCustomExercise: number;
  @Input()
  public currentWorkout: Workout;
  @Input()
  public reorderMode: boolean = false;
  @Input()
  public originalIndex: number | undefined;
  // 2026-09 ter — "Objetivo" (editSet) y el menú ⋮ (handleActions#edit/
  // #delete) abrían su PROPIO modal / llamaban a la API directamente,
  // esquivando por completo el guardReadonly() del padre (custom-exercise.
  // component.ts) — el mismo bug de fondo que configSet, pero por una vía
  // que ni siquiera pasaba por el padre. Ver guardReadonly() más abajo.
  @Input()
  public isReadonly: boolean = false;

  @Output()
  public deleteSet = new EventEmitter();
  @Output()
  public copySet = new EventEmitter();
  @Output()
  public confSet = new EventEmitter();
  @Output()
  public reorderSets = new EventEmitter<void>();
  // Solo emite en la transición doned false->true (nunca al desmarcar ni al
  // reguardar sin cambios) — dispara el arranque del RestTimerService.
  @Output()
  public setCompleted = new EventEmitter<Set>();

  public isDeleting: boolean;
  public setForm: FormGroup = new FormGroup({});

  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;

  constructor(
    private utilService: UtilService,
    private setService: SetService,
    private workoutService: WorkoutService,
    private customExerciseService: CustomExerciseService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Si el set cambia después de la inicialización, actualizar el formulario
    if (changes['set'] && !changes['set'].firstChange && this.setForm) {
      this.setForm.patchValue(
        {
          doned: this.set?.doned,
          reps: this.set?.reps,
          weight: this.set?.weight,
          rir: this.set?.rir ?? null,
          velocity: this.set?.velocity,
          time: this.set?.time ?? null,
          distance: this.set?.distance,
        },
        { emitEvent: false }
      );
    }
  }

  public get isCardio(): boolean {
    return !!this.currentWorkout?.exercises?.[this.indexCustomExercise]
      ?.exercise?.isCardio;
  }

  public get isIsometric(): boolean {
    return !!this.currentWorkout?.exercises?.[this.indexCustomExercise]
      ?.exercise?.isIsometric;
  }

  public get rirFormControl(): FormControl {
    return this.setForm.get('rir') as FormControl;
  }

  public getFormControl(controlName: string): FormControl {
    return this.setForm.get(controlName) as FormControl;
  }

  private initForm(): void {
    this.setForm = new FormGroup({
      doned: new FormControl(this.set?.doned),
      reps: new FormControl(this.set?.reps, [Validators.min(0), Validators.max(999)]),
      weight: new FormControl(this.set?.weight, [Validators.min(0), Validators.max(2000)]),
      rir: new FormControl(this.set?.rir ?? null),
      velocity: new FormControl(this.set?.velocity, [Validators.min(0), Validators.max(50)]),
      time: new FormControl(this.set?.time ?? null),
      distance: new FormControl(this.set?.distance, [Validators.min(0), Validators.max(100000)]),
    });

    this.setForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((resSetForm) => {
        const justCompleted = !this.set.doned && resSetForm.doned === true;

        // Actualizar solo los valores ejecutados, NO los objetivos
        this.set.velocity = resSetForm.velocity;
        this.set.time = resSetForm.time;
        this.set.distance = resSetForm.distance;
        this.set.doned = resSetForm.doned;
        this.set.reps = resSetForm.reps;
        this.set.weight = resSetForm.weight;

        // Store performed RIR like expectedRir: [-1], [0-10], or [first, second].
        // Explicit null (not `delete`) so a cleared value is still sent to the
        // backend and can be unset there, instead of silently keeping the old one.
        this.set.rir = resSetForm.rir ?? null;

        this.setService.updateSet(this.set).subscribe(() => {
          if (justCompleted) {
            this.setCompleted.emit(this.set);
          }

          if (this.currentWorkout) {
            this.currentWorkout.exercises.forEach(
              (exerciseTemp, indexExercise) => {
                exerciseTemp.sets.forEach((setTemp, indexSet) => {
                  if (setTemp._id === this.set._id) {
                    this.currentWorkout.exercises[indexExercise].sets[
                      indexSet
                    ] = this.set;
                  }
                });
              }
            );

            this.workoutService.setCurrentWorkout = this.currentWorkout;
          }
        });
      });
  }

  public configSet(set: Set): void {
    this.confSet.emit(set);
  }

  // 2026-09 ter — guarda local para las acciones que NO delegan en el padre
  // (a diferencia de configSet/copySet, que solo emiten y dejan que
  // custom-exercise.component.ts decida): showDeleteSweetAlert llama a la
  // API directamente desde aquí, así que necesita su propio guardado.
  private guardReadonly(): boolean {
    if (!this.isReadonly) return false;
    this.ionicUtilService.showToast({
      message: this.translate.instant('TABLES.READONLY_ASSIGNED'),
      duration: 3000,
    });
    return true;
  }

  public onRirValueChange(value: RirValue): void {
    // rir can be: null, [-1] (fail), [0-10], or [first, second] for ranges.
    if (this.rirFormControl?.value === value) {
      return;
    }

    // Keep local object in sync immediately; persistence still happens via form valueChanges.
    // Explicit null (not `delete`) so a cleared value still gets sent and unset on save.
    this.set.rir = value ?? null;

    this.setForm.patchValue({ rir: value });
  }

  public onFormValueChange(controlName: string, value: any): void {
    const control = this.getFormControl(controlName);
    if (!control) {
      return;
    }
    if (control.value === value) {
      return;
    }
    control.patchValue(value);
  }

  public showDeleteSweetAlert(): void {
    if (this.guardReadonly()) return;
    const alertOptions = {
      header: this.translate.instant('TABLES.DELETE_SET'),
      message: this.translate.instant('TABLES.DELETE_SET_CONFIRM'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
          role: 'destructive',
          handler: () => {
            this.setForm.disable({ emitEvent: false });

            this.setService.deleteSet(this.set._id).subscribe(() => {
              this.deleteSet.emit(this.set);
              this.setForm.enable({ emitEvent: false });
            });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public showPopoverOptions(event: Event, set: Set): void {
    if (this.set._id === set._id) {
      const popover: PopoverOptions = {
        component: PopoverActionsComponent,
        componentProps: {
          actionsPopover: this.getActionsPopover(),
        },
        event: event,
      };

      const showPopover = this.ionicUtilService.showPopover(popover);
      showPopover.then((res) => this.handleActions(res.data));
    }

    event.stopPropagation();
  }

  // 2026-09 ter — antes abría su PROPIO modal y guardaba directo por
  // setService.updateSet (esquivando el guardReadonly del padre por
  // completo — ni siquiera pasaba por confSet). Ahora delega en el padre
  // igual que el menú ⋮ "Editar", que es quien decide si toca guardar (guard)
  // y por dónde (updateCustomExercise, protegido en rutina asignada).
  public editSet(): void {
    this.configSet(this.set);
  }

  private getActionsPopover(): ACTION_TYPE[] {
    const actions: ACTION_TYPE[] = [];

    // Orden visual coherente: acciones de contenido y finalmente la destructiva.
    // "Mover series" solo vive en el menú de opciones del ejercicio (arriba),
    // no aquí — es la misma acción, no hace falta duplicarla por serie.
    actions.push(ACTIONS[this.ACTION_TYPES.edit]);
    actions.push(ACTIONS[this.ACTION_TYPES.duplicate]);
    actions.push(ACTIONS[this.ACTION_TYPES.delete]);

    return actions;
  }

  private handleActions(action: ACTION_TYPE): void {
    switch (action?.id) {
      case ACTIONS[this.ACTION_TYPES.duplicate].id:
        this.copySet.emit(this.set);
        break;

      case ACTIONS[this.ACTION_TYPES.edit].id:
        // 2026-09 ter — delega en el padre, mismo motivo que editSet().
        this.configSet(this.set);
        break;

      case ACTIONS[this.ACTION_TYPES.delete].id:
        this.showDeleteSweetAlert();
        break;
    }
  }

  public isFail(set: any): boolean {
    // In the objective header, FAIL must only reflect expected RIR, not executed RIR.
    return (
      Array.isArray(set?.expectedRir) &&
      set.expectedRir.some((value) => Number(value) === -1)
    );
  }
}

