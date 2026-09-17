import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/core/models/exercise';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  EXERCISE_CATEGORIES,
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLE_GROUPS,
} from '../../constants/exercise-taxonomy';

type ExerciseMode = 'fuerza' | 'cardio' | 'isometrico';

// Alta/edición de un ejercicio propio desde Biblioteca → Ejercicios. Hasta
// ahora el entrenador solo podía crear ejercicios de rebote desde el Planner
// (ConfigExercisePage, que exige un `workout` donde colgarlos y guarda vía
// POST /workouts/add-data-exercise). Aquí no hay rutina de por medio: se
// guarda directo contra /exercises y no se tocan series ni notas, que solo
// tienen sentido dentro de un entrenamiento.
@Component({
  selector: 'app-exercise-form-modal',
  templateUrl: './exercise-form-modal.component.html',
  styleUrls: ['./exercise-form-modal.component.scss'],
})
export class ExerciseFormModalComponent implements OnInit {
  @Input() exercise?: Exercise;

  public readonly categories = EXERCISE_CATEGORIES;
  public readonly muscleGroups = EXERCISE_MUSCLE_GROUPS;
  public readonly equipment = EXERCISE_EQUIPMENT;

  public name = '';
  public description = '';
  public videoUrl = '';
  public mode: ExerciseMode = 'fuerza';
  public selectedCategories: string[] = [];
  public selectedMuscleGroups1: string[] = [];
  public selectedMuscleGroups2: string[] = [];
  public selectedEquipment: string[] = [];
  public saving = false;

  constructor(
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private ionicUtilService: IonicUtilService
  ) {}

  public get isEdit(): boolean {
    return !!this.exercise?._id;
  }

  public get canSave(): boolean {
    return !!this.name.trim() && !this.saving;
  }

  public ngOnInit(): void {
    const exercise = this.exercise;
    if (!exercise) return;

    this.name = exercise.name || '';
    this.description = exercise.description || '';
    this.videoUrl = exercise.videoUrl || '';
    this.mode = exercise.isIsometric
      ? 'isometrico'
      : exercise.isCardio
      ? 'cardio'
      : 'fuerza';
    this.selectedCategories = Array.isArray(exercise.category)
      ? [...exercise.category]
      : exercise.category
      ? [exercise.category]
      : [];
    this.selectedMuscleGroups1 = [...(exercise.muscleGroups1 || [])];
    this.selectedMuscleGroups2 = [...(exercise.muscleGroups2 || [])];
    this.selectedEquipment = [...(exercise.equipment || [])];
  }

  public toggle(selection: string[], value: string): void {
    const index = selection.indexOf(value);
    if (index >= 0) {
      selection.splice(index, 1);
      return;
    }
    selection.push(value);
  }

  public save(): void {
    if (!this.canSave) return;

    this.saving = true;
    // userId lo pone el backend a partir del token — nunca se manda desde aquí.
    const payload: Partial<Exercise> = {
      name: this.name.trim(),
      description: this.description.trim(),
      videoUrl: this.videoUrl.trim(),
      category: [...this.selectedCategories],
      muscleGroups1: [...this.selectedMuscleGroups1],
      muscleGroups2: [...this.selectedMuscleGroups2],
      equipment: [...this.selectedEquipment],
      isCardio: this.mode === 'cardio',
      isIsometric: this.mode === 'isometrico',
    };

    const request$ = this.isEdit
      ? this.exerciseService.updateExercise(this.exercise._id, payload)
      : this.exerciseService.createExercise(payload);

    request$.subscribe({
      next: (saved) => {
        this.saving = false;
        void this.ionicUtilService.showSuccessToast(
          this.isEdit ? 'Ejercicio actualizado' : 'Ejercicio creado'
        );
        this.modalController.dismiss({
          saved: true,
          // PATCH responde 204 sin cuerpo: se devuelve el estado local
          // fusionado para que la lista no tenga que esperar a recargar.
          exercise: saved || { ...this.exercise, ...payload },
        });
      },
      error: (error) => {
        this.saving = false;
        void this.ionicUtilService.showErrorToast(
          error,
          'No se pudo guardar el ejercicio'
        );
      },
    });
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
