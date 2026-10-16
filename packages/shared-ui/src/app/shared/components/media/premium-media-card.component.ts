import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

interface MediaPerk {
  icon: string;
  title: string;
  text: string;
}

const PHOTO_PERKS: readonly MediaPerk[] = [
  { icon: 'body-outline', title: 'MEDIA.PREMIUM_PHOTOS_PERK_POSE', text: 'MEDIA.PREMIUM_PHOTOS_PERK_POSE_TEXT' },
  { icon: 'swap-horizontal-outline', title: 'MEDIA.PREMIUM_PHOTOS_PERK_COMPARE', text: 'MEDIA.PREMIUM_PHOTOS_PERK_COMPARE_TEXT' },
  { icon: 'lock-closed-outline', title: 'MEDIA.PREMIUM_PERK_PRIVATE', text: 'MEDIA.PREMIUM_PERK_PRIVATE_TEXT' },
];

const VIDEO_PERKS: readonly MediaPerk[] = [
  { icon: 'videocam-outline', title: 'MEDIA.PREMIUM_VIDEOS_PERK_RECORD', text: 'MEDIA.PREMIUM_VIDEOS_PERK_RECORD_TEXT' },
  { icon: 'calendar-outline', title: 'MEDIA.PREMIUM_VIDEOS_PERK_TIMELINE', text: 'MEDIA.PREMIUM_VIDEOS_PERK_TIMELINE_TEXT' },
  { icon: 'lock-closed-outline', title: 'MEDIA.PREMIUM_PERK_PRIVATE', text: 'MEDIA.PREMIUM_PERK_PRIVATE_TEXT' },
];

/**
 * Venta para quien no puede subir fotos ni vídeos (decisión 1 del plan:
 * gratis para entrenadores, premium y clientes con entrenador activo).
 *
 *   showcase=false: banner compacto (`app-premium-banner`, el mismo de toda
 *     la app). Sale cuando ya hay material subido (que se sigue viendo).
 *   showcase=true: ocupa el estado vacío. Enseña la herramienta con una
 *     muestra (sin fotos ni vídeos de nadie), qué se gana y un botón.
 */
@Component({
  selector: 'app-premium-media-card',
  templateUrl: './premium-media-card.component.html',
  styleUrls: ['./premium-media-card.component.scss'],
})
export class PremiumMediaCardComponent {
  @Input() public variant: 'photos' | 'videos' = 'photos';
  @Input() public showcase = false;

  constructor(private navigationService: NavigationService) {}

  public get isVideos(): boolean {
    return this.variant === 'videos';
  }

  public get perks(): readonly MediaPerk[] {
    return this.isVideos ? VIDEO_PERKS : PHOTO_PERKS;
  }

  public trackPerk(_index: number, perk: MediaPerk): string {
    return perk.title;
  }

  public goToPremium(): void {
    this.navigationService.goToPremium();
  }
}
