import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/core/models/exercise';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  EXERCISE_CATEGORIES,
  EXERCISE_EQUIPMENT,
} from '../../constants/exercise-taxonomy';
import {
  ExerciseMuscle,
  MUSCLE_GROUPS,
  MUSCLE_ROLES,
  MUSCLE_ROLE_LABEL,
  MuscleRole,
  muscleFullLabel,
  normalizeMuscles,
} from 'src/app/core/constants/muscle-catalog';
import { parseYouTubeId, youTubeEmbedUrl } from '../../utils/youtube-embed';

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
  private readonly translate = inject(TranslateService);

  @Input() exercise?: Exercise;

  public readonly categories = EXERCISE_CATEGORIES;
  public readonly muscleGroups = MUSCLE_GROUPS;
  public readonly roleLabel = MUSCLE_ROLE_LABEL;
  public readonly roles = MUSCLE_ROLES;
  public readonly equipment = EXERCISE_EQUIPMENT;

  public name = '';
  public description = '';
  public videoUrl = '';
  public videoEmbedSrc: SafeResourceUrl | null = null;
  public videoUrlInvalid = false;
  private videoId = '';
  public mode: ExerciseMode = 'fuerza';
  public selectedCategories: string[] = [];
  // Músculo → rol (ver constants/muscle-catalog.ts). Sustituye a las dos
  // listas sueltas de principales/secundarios: ahora cada músculo lleva su
  // énfasis, y el backend proyecta muscleGroups1/2 a partir de aquí.
  public muscleRoles: Record<string, MuscleRole> = {};
  public selectedEquipment: string[] = [];
  public saving = false;

  constructor(
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private ionicUtilService: IonicUtilService,
    private sanitizer: DomSanitizer
  ) {}

  public get isEdit(): boolean {
    return !!this.exercise?._id;
  }

  // Solo se rehace el iframe cuando cambia el id: teclear o borrar sin
  // cambiarlo no debe recargar el vídeo a cada pulsación.
  public onVideoUrlChange(): void {
    const url = (this.videoUrl || '').trim();
    const id = parseYouTubeId(url);
    this.videoUrlInvalid = !!url && !id;
    if (id === this.videoId) return;
    this.videoId = id;
    this.videoEmbedSrc = id ? this.sanitizer.bypassSecurityTrustResourceUrl(youTubeEmbedUrl(id)) : null;
  }

  public clearVideoUrl(): void {
    this.videoUrl = '';
    this.onVideoUrlChange();
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
    this.onVideoUrlChange();
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
    for (const { muscle, role } of normalizeMuscles(exercise.muscles)) {
      this.muscleRoles[muscle] = role;
    }
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

  // Un toque recorre principal → secundario → estabilizador → quitar. Es la
  // acción que el entrenador repite en cada ejercicio: un solo gesto por
  // músculo, sin menú ni segundo paso.
  public cycleMuscle(muscle: string): void {
    const next: Record<string, MuscleRole | null> = {
      none: 'primary',
      primary: 'secondary',
      secondary: 'stabilizer',
      stabilizer: null,
    };
    const role = next[this.muscleRoles[muscle] || 'none'];
    const roles = { ...this.muscleRoles };
    if (role) roles[muscle] = role;
    else delete roles[muscle];
    this.muscleRoles = roles;
  }

  public roleOf(muscle: string): MuscleRole | null {
    return this.muscleRoles[muscle] || null;
  }

  public muscleAriaLabel(label: string, muscle: string): string {
    const role = this.roleOf(muscle);
    return `${label}: ${role ? this.roleLabel[role].toLowerCase() : this.translate.instant('EXERCISE_LIBRARY.SIN_MARCAR')}`;
  }

  public get selectedMuscles(): ExerciseMuscle[] {
    return normalizeMuscles(
      Object.entries(this.muscleRoles).map(([muscle, role]) => ({ muscle, role }))
    );
  }

  public musclesWithRole(role: MuscleRole): string {
    return this.selectedMuscles
      .filter((item) => item.role === role)
      .map((item) => muscleFullLabel(item.muscle))
      .join(', ');
  }

  public get missingPrimary(): boolean {
    return this.mode !== 'cardio' && !this.selectedMuscles.some((item) => item.role === 'primary');
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
      muscles: this.mode === 'cardio' ? [] : this.selectedMuscles,
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
          this.isEdit ? this.translate.instant('EXERCISE_LIBRARY.EJERCICIO_ACTUALIZADO') : this.translate.instant('EXERCISE_LIBRARY.EJERCICIO_CREADO')
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
          this.translate.instant('EXERCISE_LIBRARY.NO_SE_PUDO_GUARDAR_EL')
        );
      },
    });
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
