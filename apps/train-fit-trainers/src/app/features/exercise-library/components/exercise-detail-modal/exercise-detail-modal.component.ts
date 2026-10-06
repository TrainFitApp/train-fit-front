import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/core/models/exercise';
import { UserService } from 'src/app/core/services/user/user.service';
import { parseYouTubeId, youTubeEmbedUrl } from '../../utils/youtube-embed';
import {
  MUSCLE_ROLES,
  MUSCLE_ROLE_LABEL,
  MuscleRole,
  muscleGroupOf,
  muscleLabel,
  muscleNeedsGroup,
  normalizeMuscles,
} from 'src/app/core/constants/muscle-catalog';

interface MuscleRoleRow {
  role: MuscleRole;
  label: string;
  muscles: { id: string; label: string; group: string | null }[];
}

// TASK-042 (MASTER_BACKLOG.md) — vista de solo lectura de un ejercicio del
// catálogo, para la Biblioteca de ejercicios (fuera del flujo de construir
// una rutina). A diferencia de ConfigExercisePage (que exige contexto de
// `workout`/`tableInUse` real para poder guardar cambios), este modal no
// guarda nada: muestra descripción, vídeo y taxonomía, y si el ejercicio es
// propio delega editar/borrar en la página que lo abrió.
@Component({
  selector: 'app-exercise-detail-modal',
  templateUrl: './exercise-detail-modal.component.html',
  styleUrls: ['./exercise-detail-modal.component.scss'],
})
export class ExerciseDetailModalComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() exercise: Exercise;

  public videoEmbedSrcSafe: SafeResourceUrl | null = null;

  // Los ejercicios del catálogo global no tienen userId: editar y borrar solo
  // se ofrecen sobre los creados por este entrenador (el backend lo vuelve a
  // comprobar en PATCH/DELETE /exercises/:id).
  public isOwnExercise = false;

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.videoEmbedSrcSafe = this.buildVideoEmbedSrc(this.exercise?.videoUrl);

    const userId = this.userService.getLocalUser?._id;
    this.isOwnExercise = !!userId && this.exercise?.userId === userId;
  }

  public requestEdit(): void {
    this.modalController.dismiss({ action: 'edit' });
  }

  public requestDelete(): void {
    this.modalController.dismiss({ action: 'delete' });
  }

  // Músculos por énfasis (2026-09). Las porciones que sueltas no dicen de
  // qué músculo son llevan su grupo al lado ("Tríceps · Cabeza larga").
  public get muscleRoles(): MuscleRoleRow[] {
    const muscles = normalizeMuscles(this.exercise?.muscles);
    return MUSCLE_ROLES.map((role) => ({
      role,
      label: MUSCLE_ROLE_LABEL[role],
      muscles: muscles
        .filter((item) => item.role === role)
        .map(({ muscle }) => ({
          id: muscle,
          label: muscleLabel(muscle),
          group: muscleNeedsGroup(muscle) ? muscleGroupOf(muscle)?.label || null : null,
        })),
    })).filter((row) => row.muscles.length > 0);
  }

  public get categories(): string[] {
    const category = this.exercise?.category;
    if (!category) return [];
    return Array.isArray(category) ? category : [category];
  }

  public get exerciseTypeLabel(): string {
    if (this.exercise?.isCardio) return this.translate.instant('EXERCISE_LIBRARY.CARDIO');
    if (this.exercise?.isIsometric) return this.translate.instant('EXERCISE_LIBRARY.ISOMETRICO');
    return this.translate.instant('EXERCISE_LIBRARY.FUERZA');
  }

  private buildVideoEmbedSrc(url?: string): SafeResourceUrl | null {
    const id = parseYouTubeId(url);
    return id ? this.sanitizer.bypassSecurityTrustResourceUrl(youTubeEmbedUrl(id)) : null;
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
