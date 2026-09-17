import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/core/models/exercise';
import { UserService } from 'src/app/core/services/user/user.service';

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

  public get muscleGroups(): string[] {
    return [
      ...(this.exercise?.muscleGroups1 || []),
      ...(this.exercise?.muscleGroups2 || []),
    ].filter((g) => g && g.trim().length > 0);
  }

  public get categories(): string[] {
    const category = this.exercise?.category;
    if (!category) return [];
    return Array.isArray(category) ? category : [category];
  }

  public get exerciseTypeLabel(): string {
    if (this.exercise?.isCardio) return 'Cardio';
    if (this.exercise?.isIsometric) return 'Isométrico';
    return 'Fuerza';
  }

  // Mismo criterio que config-exercise.page.ts#parseYouTubeIdFromUrl +
  // updateVideoEmbedSrc — proxy propio para evitar restricciones de embed
  // directo de YouTube.
  private buildVideoEmbedSrc(url?: string): SafeResourceUrl | null {
    const id = this.parseYouTubeId(url);
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://trainfit.net/youtube-embed.html?v=${id}`
    );
  }

  private parseYouTubeId(url?: string): string {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || '';
    }
    return '';
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
