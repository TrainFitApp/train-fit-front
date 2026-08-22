import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertOptions, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Exercise } from 'src/app/core/models/exercise';
import { User } from 'src/app/core/models/user';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { SearchFilterGroupExercises } from '../../models/filterGroup';

type ExerciseTypeMode = 'fuerza' | 'cardio' | 'isometrico';

// Ejercicios propios de entrenador (MASTER_BACKLOG) — editor STANDALONE de la
// entidad Exercise (metadata: nombre, vídeo, descripción, categorías/
// músculos/equipamiento, tipo). A diferencia de ConfigExercisePage, este
// modal NO depende de un Workout/Table en curso — habla directo con
// ExerciseService (POST/PATCH/DELETE /exercises), así que sirve tanto para
// la librería propia ("Ejercicios") como para crear uno al vuelo mientras se
// eligen ejercicios (picker en modo plantilla o librería). Los sets se
// siguen configurando donde siempre: al usar el ejercicio dentro de una
// rutina real (ConfigExercisePage), no aquí.
@Component({
  selector: 'app-exercise-editor-modal',
  templateUrl: './exercise-editor-modal.component.html',
  styleUrls: ['./exercise-editor-modal.component.scss'],
})
export class ExerciseEditorModalComponent implements OnInit {
  @Input() public user: User;
  @Input() public exercise: Exercise | null = null;

  public form: FormGroup;
  public exerciseTypeMode: ExerciseTypeMode = 'fuerza';
  public videoUrl = '';
  public details: SearchFilterGroupExercises = new SearchFilterGroupExercises();
  public saving = false;
  public showDetails = false;

  // Mismas listas estáticas que ConfigExercisePage#filterCategories/
  // filterMuscleGroup1/filterEquipment (modo creación) — así el chip que se
  // marca aquí es exactamente el mismo valor que ese editor reconoce después.
  public readonly categoryOptions = [
    'Cardio',
    'Empujes',
    'Tirón',
    'Tirón horizontal',
    'Tirón vertical',
    'Cadena posterior',
    'Cadena anterior',
    'Tren inferior',
    'Torso/Tren superior',
  ];

  public readonly muscleGroupOptions = [
    'Brazos',
    'Bíceps',
    'Tríceps',
    'Antebrazo',
    'Hombro',
    'Deltoides anterior',
    'Deltoides lateral',
    'Deltoides posterior',
    'Pectoral',
    'Pectoral superior',
    'Pectoral inferior',
    'Abdomen',
    'Cuello',
    'Espalda',
    'Espalda alta',
    'Espalda baja',
    'Piernas',
    'Cuádriceps',
    'Aductor',
    'Femoral',
    'Glúteo',
    'Gemelo',
    'Sóleo',
  ];

  public readonly equipmentOptions = [
    'Barra',
    'Mancuernas',
    'Polea',
    'Peso corporal',
    'Kettlebell',
    'Máquina',
    'Máquina smith/multipower',
    'Disco',
    'Banda elástica',
  ];

  public get isEditMode(): boolean {
    return !!this.exercise?._id;
  }

  public get detailsCount(): number {
    return (
      (this.details.category?.length || 0) +
      (this.details.muscleGroups1?.length || 0) +
      (this.details.muscleGroups2?.length || 0) +
      (this.details.equipment?.length || 0)
    );
  }

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.exercise?.name || '', Validators.required],
      description: [this.exercise?.description || ''],
    });

    this.videoUrl = this.exercise?.videoUrl || '';
    this.exerciseTypeMode = this.exercise?.isCardio
      ? 'cardio'
      : this.exercise?.isIsometric
      ? 'isometrico'
      : 'fuerza';

    this.details.category = Array.isArray(this.exercise?.category)
      ? [...this.exercise.category]
      : this.exercise?.category
      ? [this.exercise.category as string]
      : [];
    this.details.muscleGroups1 = [...(this.exercise?.muscleGroups1 || [])];
    this.details.muscleGroups2 = [...(this.exercise?.muscleGroups2 || [])];
    this.details.equipment = [...(this.exercise?.equipment || [])];
  }

  public setExerciseTypeMode(mode: string | number | undefined): void {
    if (mode === 'fuerza' || mode === 'cardio' || mode === 'isometrico') {
      this.exerciseTypeMode = mode;
    }
  }

  public toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  public toggleCategory(category: string): void {
    this.toggleInArray(this.details.category, category);
  }

  public toggleMuscleGroup1(muscle: string): void {
    this.toggleInArray(this.details.muscleGroups1, muscle);
  }

  public toggleMuscleGroup2(muscle: string): void {
    this.toggleInArray(this.details.muscleGroups2, muscle);
  }

  public toggleEquipment(equipment: string): void {
    this.toggleInArray(this.details.equipment, equipment);
  }

  private toggleInArray(list: string[], value: string): void {
    const index = list.indexOf(value);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }

  public async save(): Promise<void> {
    const name = this.form.get('name')?.value?.trim();
    if (!name) {
      await this.ionicUtilService.showAlert({
        header: this.translate.instant('EXERCISE_CONFIG.INCOMPLETE_DATA'),
        message: this.translate.instant('EXERCISE_CONFIG.ENTER_NAME'),
        buttons: [{ text: this.translate.instant('COMMON.OK'), role: 'cancel' }],
      });
      return;
    }

    const exerciseData: Partial<Exercise> = {
      name,
      description: this.form.get('description')?.value?.trim() || '',
      videoUrl: this.videoUrl.trim(),
      category: this.details.category,
      muscleGroups1: this.details.muscleGroups1,
      muscleGroups2: this.details.muscleGroups2,
      equipment: this.details.equipment,
      isCardio: this.exerciseTypeMode === 'cardio',
      isIsometric: this.exerciseTypeMode === 'isometrico',
    };

    this.saving = true;
    const request$ = this.isEditMode
      ? this.exerciseService.updateExercise(this.exercise._id, exerciseData)
      : this.exerciseService.createExercise(exerciseData);

    request$.subscribe({
      next: (result) => {
        this.saving = false;
        this.modalController.dismiss(result, 'confirm');
      },
      error: (error) => {
        this.saving = false;
        if (error?.error?.code === 'PREMIUM_LIMIT_EXERCISES') {
          void this.ionicUtilService.showPremiumLimitAlert({
            message: this.translate.instant('EXERCISE_CONFIG.LIMIT_REACHED'),
          });
          return;
        }
        void this.ionicUtilService.showErrorToast(error, this.translate.instant('COMMON.ERROR'));
      },
    });
  }

  public async confirmDelete(): Promise<void> {
    if (!this.exercise?._id) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('EXERCISE_CONFIG.DELETE_EXERCISE'),
      message: [
        this.translate.instant('EXERCISE_CONFIG.DELETE_IMPACT_1'),
        this.translate.instant('EXERCISE_CONFIG.DELETE_IMPACT_2'),
        this.translate.instant('EXERCISE_CONFIG.DELETE_IMPACT_3'),
      ].join(' '),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('ACTIONS.DELETE'),
          role: 'destructive',
          handler: () => this.deleteExercise(),
        },
      ],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  private deleteExercise(): void {
    const exerciseId = this.exercise._id;
    this.exerciseService.deleteExercise(exerciseId).subscribe({
      next: () => {
        void this.ionicUtilService.showSuccessToast(this.translate.instant('EXERCISE_CONFIG.DELETED'));
        this.modalController.dismiss({ deleted: true, _id: exerciseId }, 'delete');
      },
      error: (error) => {
        void this.ionicUtilService.showErrorToast(error, this.translate.instant('COMMON.ERROR'));
      },
    });
  }
}
