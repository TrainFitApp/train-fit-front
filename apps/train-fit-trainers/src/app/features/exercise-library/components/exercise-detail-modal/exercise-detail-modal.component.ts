import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/core/models/exercise';

// TASK-042 (MASTER_BACKLOG.md) — vista de solo lectura de un ejercicio del
// catálogo, para la Biblioteca de ejercicios (fuera del flujo de construir
// una rutina). A diferencia de ConfigExercisePage (que exige contexto de
// `workout`/`tableInUse` real para poder guardar cambios), este modal no
// guarda nada — solo muestra descripción, vídeo y taxonomía.
@Component({
  selector: 'app-exercise-detail-modal',
  templateUrl: './exercise-detail-modal.component.html',
  styleUrls: ['./exercise-detail-modal.component.scss'],
})
export class ExerciseDetailModalComponent implements OnInit {
  @Input() exercise: Exercise;

  public videoEmbedSrcSafe: SafeResourceUrl | null = null;

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.videoEmbedSrcSafe = this.buildVideoEmbedSrc(this.exercise?.videoUrl);
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
